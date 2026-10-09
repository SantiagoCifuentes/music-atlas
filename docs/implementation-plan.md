# Music Atlas Implementation Plan

## Purpose

This document translates the approved Music Atlas requirements, domain decisions, curated content, architecture, and technical direction into an incremental implementation roadmap.

The project should be built through small vertical slices. Each meaningful increment should leave the repository in a coherent, runnable, and testable state.

## Implementation Principles

- Build incrementally across domain, persistence, API, frontend, and QA boundaries.
- Validate each increment before expanding scope.
- Treat repository-authored JSON as the editorial source of truth.
- Keep internal research metadata outside the public application contract.
- Keep domain rules independent from framework and database details.
- Introduce database, API, frontend, and QA automation progressively.
- Avoid future features such as search, recommendations, accounts, CMS functionality, and integrations.

## Implementation Phases

### Phase 1: Repository and Development Foundation

Establish the TypeScript project structure and local development workflow.

Outcomes:

- Separate logical frontend and backend applications.
- Node.js and package-management setup.
- TypeScript configuration.
- Formatting, linting, and type-checking.
- Local environment configuration approach.
- Foundational Docker Compose configuration for PostgreSQL.
- Basic application startup boundaries.

Validation:

- Frontend and backend start independently.
- TypeScript compilation succeeds.
- Formatting and linting checks pass.
- Configuration errors are clear.
- PostgreSQL configuration is present and ready for local execution.

Status: **Complete**.

### Phase 2: Database and Content Foundation

Establish the database design, PostgreSQL access, migrations, JSON validation, and deterministic content loading.

Outcomes:

- Approved database design translated into implementation structures.
- Drizzle and Drizzle Kit configured.
- Zod validation for curated JSON.
- Content-loading process.
- Resettable local database initialization.
- Separate development and test data handling.

Validation:

- A clean PostgreSQL instance can be initialized.
- Invalid JSON fails before loading.
- Valid content loads deterministically.
- Repeated initialization produces the same catalog.
- Internal research metadata is not exposed publicly.

### Phase 3: Domain and Persistence Foundation

Implement the approved domain concepts and persistence behavior.

Outcomes:

- Country, Genre, Scene, Artist, and Album representations.
- Required and optional relationship rules.
- Persistence access and relationship queries.
- Database integrity validation.
- Focused integration-test fixtures.

Validation:

- Domain rules can be tested without PostgreSQL.
- Repository tests run against PostgreSQL.
- Required relationships are enforced consistently.
- Optional Album-to-Scene relationships work correctly.
- Scene time-period data is preserved.

### Phase 4: First Backend Vertical Slice

Make one meaningful discovery journey available through the backend.

Recommended slice:

```text
England -> one Genre or Scene -> related Artist -> Album
```

Validation:

- The slice is available through the application boundary.
- Related entities are retrieved correctly.
- Missing content has predictable behavior.
- Internal research metadata is excluded.
- API tests use persisted data.

### Phase 5: First Frontend Vertical Slice

Expose the first backend journey through the browser.

Outcomes:

- England context.
- Genre or Scene navigation.
- Artist navigation.
- Album navigation.
- Loading, error, and not-found states.

Validation:

- A user can complete the first discovery journey.
- Relationship links work.
- Playwright covers the complete journey.

### Phase 6: MVP Expansion and Content Completion

Expand the working slice across the approved Genres, Scenes, Artists, Albums, and relationships.

Validation:

- The complete pilot content set loads successfully.
- Required relationships are valid.
- Albums without Scenes remain valid.
- Genre and Scene distinctions remain clear.
- Core navigation works across all entry types.

### Phase 7: Hardening and Continuous Validation

Make the MVP repeatable and continuously verifiable.

Outcomes:

- Broader unit, domain, integration, API, and E2E coverage.
- GitHub Actions validation.
- PostgreSQL-backed CI tests.
- Build validation.
- E2E execution in CI.
- Local development documentation.

## Vertical Slices

The recommended order is:

1. Local foundation and PostgreSQL configuration.
2. Small validated JSON dataset loaded into PostgreSQL.
3. England context with one Genre or Scene.
4. Context-to-Artist retrieval and navigation.
5. Artist-to-Album retrieval and navigation.
6. Album-to-context retrieval, including optional Scene associations.
7. Complete pilot content expansion.
8. Continuous CI validation.

Each slice should include the persistence, application, and relevant user-facing validation needed to demonstrate coherent progress.

## Database Implementation Order

1. Complete the database design.
2. Configure PostgreSQL connection handling.
3. Establish migration execution.
4. Implement persistence for the core domain concepts.
5. Implement relationship persistence and integrity rules.
6. Implement deterministic content loading.
7. Add database reset and initialization flows.
8. Add test database setup.
9. Add repository and integration tests against PostgreSQL.
10. Add CI database initialization from a clean state.

Database schema and SQL are intentionally not defined in this planning document.

## Content Implementation Order

```text
Existing curated material
    -> JSON authoring
    -> Zod validation
    -> reference and relationship validation
    -> deterministic loading
    -> PostgreSQL
    -> application runtime
```

Automated validation should check structure, references, required relationships, Scene periods, release types, and source-note shape.

Human review remains responsible for England attribution, editorial quality, source reliability, and Genre versus Scene classification.

The existing pilot content should be converted carefully into JSON during implementation. The existing editorial documents should remain unchanged during planning.

## API Implementation Order

Implement capabilities in support of actual user journeys:

1. England context retrieval.
2. Genre and Scene discovery.
3. Artist retrieval with related Albums.
4. Album retrieval with Artist, Genre, and optional Scene context.
5. Consistent missing-entry and error behavior.

Detailed endpoint specifications should be designed immediately before the relevant implementation slice.

## Frontend Implementation Order

1. Frontend startup and API communication.
2. England context view.
3. Genre and Scene navigation.
4. Genre and Scene detail views.
5. Artist listing and detail views.
6. Album detail views.
7. Relationship links across entry types.
8. Loading, error, and not-found states.
9. Accessibility and responsive validation.
10. Complete pilot content expansion.

The frontend should consume the backend application boundary rather than embedding the curated catalog.

## Testing Strategy During Implementation

### Unit and domain tests

Introduce these when content and domain rules are implemented. They should validate pure transformations and rules without requiring PostgreSQL.

### Database and integration tests

Introduce these with the first persistence slice. They should validate migrations, loading, relationship queries, database integrity, and reset behavior against PostgreSQL.

### API tests

Introduce these with the first backend vertical slice. They should validate public application behavior using persisted data and should confirm that internal research metadata is excluded.

### E2E tests

Introduce these once the first complete frontend journey exists. Start with one high-value path and expand across representative Genre, Scene, Artist, and Album relationships.

## CI Implementation Order

CI should begin before the MVP is complete and grow incrementally:

1. Dependency installation.
2. Formatting, linting, and type-checking.
3. Unit and domain tests.
4. PostgreSQL provisioning.
5. Migrations and deterministic test-content loading.
6. Integration and repository tests.
7. API tests.
8. Application build validation.
9. Playwright E2E tests.

Deployment automation is deferred and is not required for implementation progress.

## Implementation Milestones

### Milestone 1: Local foundation

The frontend and backend start locally, TypeScript validation passes, and PostgreSQL configuration is available through Docker Compose.

Status: **Complete**.

### Milestone 2: Validated content reaches PostgreSQL

A small JSON dataset can be validated, loaded deterministically, and retrieved from PostgreSQL.

### Milestone 3: First persisted discovery capability

A backend capability retrieves England and one related Genre or Scene from PostgreSQL with domain, repository, and API validation.

### Milestone 4: First complete browser journey

A user can navigate from England through a Genre or Scene to an Artist and Album, with Playwright coverage.

### Milestone 5: Domain relationships complete

The approved relationships between Genres, Scenes, Artists, and Albums are supported, including optional Album-to-Scene associations.

### Milestone 6: Pilot content available

The complete pilot set is validated, loaded, and browsable.

### Milestone 7: Continuous validation

GitHub Actions runs content validation, type checks, unit tests, PostgreSQL integration tests, API tests, builds, and E2E tests.

## Dependencies and Risks

- Database design must precede persistence implementation.
- The content loader must remain deterministic to prevent drift from repository content.
- API and frontend work should proceed through narrow capabilities rather than a large speculative contract.
- Production-like content and focused test fixtures should remain distinguishable.
- E2E tests require stable seeded data and predictable startup.
- CI should run fast checks before slower database and browser checks.
- Shared packages and generic abstractions should be added only for concrete current needs.
- Movements, taxonomies, recommendations, search, accounts, and full discographies remain outside the MVP.

## Ready to Implement

- Approved MVP requirements and acceptance criteria.
- Approved domain decisions and pilot content.
- Closed architecture and technical direction.
- Phase 1 foundation.
- Local frontend and backend startup.
- Local PostgreSQL configuration approach.
- JSON as the curated content format.
- PostgreSQL-backed persistence direction.
- Testing and CI direction.

## Decisions Still Needed

No product, domain, architecture, or deployment decision currently blocks implementation.

The next design task is database design, followed by implementation of migrations, content validation, and deterministic loading.

## Can Be Decided During Implementation

- Exact package-manager commands and version pins.
- Exact directory and file naming.
- Exact JSON file organization.
- Database schema details.
- Migration file structure.
- API endpoint names and payload shapes.
- React component boundaries.
- Environment-variable names beyond the initial foundation.
- Test-fixture organization.
- GitHub Actions workflow details.
- Deployment packaging and provider.
