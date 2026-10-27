# Domain and Persistence Foundation

Phase 3 keeps Music Atlas domain concepts independent from Drizzle and PostgreSQL. Domain types and relationship rules live under `apps/backend/src/domain`; the PostgreSQL repository maps database rows and join-table relationships into those types under `apps/backend/src/db`.

## Repository Operations

The `CatalogRepository` boundary supports:

- Finding Country, Genre, Scene, Artist, and Album records by stable identifier.
- Finding Genres for a Scene.
- Finding Artists for a Genre or Scene.
- Finding Albums for an Artist, Genre, or Scene.

Missing single records return `null`. Missing relationship targets return an empty array. Database errors are allowed to propagate to the caller; public error behavior belongs to the later API phase.

Domain representations contain only approved catalog concepts and relationship identifiers. Research notes are not part of the domain representation.

## Tests

Domain rules run without PostgreSQL:

```powershell
npm run test:unit --workspace @music-atlas/backend
```

Repository integration tests use the protected local `music_atlas_test` database:

```powershell
Copy-Item .env.test.example .env.test
$env:NODE_ENV = "test"
npm run db:init --workspace @music-atlas/backend
npm run test:integration --workspace @music-atlas/backend
```

Repository tests create and remove a deterministic fixture inside the test database. They do not depend on the curated pilot catalog or incidental insertion order. The fixture covers a Scene with a Genre, a Scene without a Genre, an Album with no Scene, an Album with a Scene, and the approved many-to-many relationships.

The test environment loader requires the exact local `music_atlas_test` database and overrides a conflicting inherited `DATABASE_URL`. Do not use the development `.env` for integration tests.
