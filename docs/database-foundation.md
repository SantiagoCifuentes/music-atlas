# Database and Content Foundation

Phase 2 uses PostgreSQL as the local runtime database. Curated editorial content is authored in the repository and loaded deterministically after validation.

## Local PostgreSQL

Start PostgreSQL with Docker Desktop running:

```powershell
docker compose up -d postgres
docker compose ps
```

The repository maps PostgreSQL to host port `5433` because port `5432` may already be used by a local Windows PostgreSQL installation. The container still listens on its standard port internally.

Copy `.env.example` to the repository root as `.env` and adjust values only for the local environment. The default development connection is:

```text
postgresql://music_atlas:music_atlas@localhost:5433/music_atlas
```

## Validate and Initialize Content

Curated public content is stored in `content/catalog.json`. Internal research traceability is stored separately in `content/research-notes.json` and is validated but is not loaded into the public catalog model.

Run content validation independently:

```powershell
npm run content:validate --workspace @music-atlas/backend
```

Initialize a clean or existing development database by applying migrations and loading the validated catalog:

```powershell
npm run db:init --workspace @music-atlas/backend
```

The loader validates all content before opening the load transaction. Invalid references, missing required associations, and malformed records fail without partially loading the catalog. Re-running the loader replaces the catalog contents transactionally and resolves relationships by stable content identifiers.

To apply migrations without loading content:

```powershell
npm run db:migrate --workspace @music-atlas/backend
```

## Resetting Development Data

Reset is restricted to a local PostgreSQL URL and requires an explicit opt-in flag:

```powershell
$env:ALLOW_DATABASE_RESET = "true"
npm run db:reset --workspace @music-atlas/backend
$env:ALLOW_DATABASE_RESET = "false"
```

The reset command truncates catalog data and reloads the validated content. It does not apply migrations; run `db:migrate` first when the database structure is new or has changed.

## Test Database

Test configuration must be kept separate from development configuration. Copy `.env.test.example` to the repository root as `.env.test`; it points to the local `music_atlas_test` database and sets `NODE_ENV=test`.

Create the test database once when needed:

```powershell
docker compose exec -T postgres createdb -U music_atlas music_atlas_test
```

Initialize it with the same migrations and curated content:

```powershell
$env:NODE_ENV = "test"
npm run db:init --workspace @music-atlas/backend
$env:NODE_ENV = "development"
```

The integration test setup loads `.env.test` itself, overrides a conflicting inherited `DATABASE_URL`, and rejects missing, remote, development, or unexpected database targets. Test initialization and test migrations apply the same guard.

Run Phase 2 tests:

```powershell
npm run test:unit --workspace @music-atlas/backend
npm run test:integration --workspace @music-atlas/backend
```

The integration tests require Docker PostgreSQL and `DATABASE_URL` loaded from `.env.test`.

## General Checks

```powershell
npm run check
npm run build
```

These commands cover the repository type-check, lint, formatting, and workspace builds. API endpoints, frontend catalog behavior, E2E tests, and CI configuration are later phases.
