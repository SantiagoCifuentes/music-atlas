# First Backend Discovery Slice

Phase 4 exposes one persisted discovery journey:

```text
England -> Genre -> Artist -> Album
```

## Routes

Retrieve England and its available contexts:

```text
GET /api/countries/england
```

Retrieve a Genre and its related Artists:

```text
GET /api/genres/{genreId}
```

Retrieve an Artist and its related Albums:

```text
GET /api/artists/{artistId}
```

Successful responses use a `data` wrapper. Related entities are explicit catalog representations containing stable IDs, editorial fields, and approved relationship IDs. Research notes and source metadata are never serialized.

Example response shape:

```json
{
  "data": {
    "artist": {
      "id": "fixture-artist",
      "name": "Fixture Artist",
      "genreIds": ["fixture-post-punk"],
      "sceneIds": []
    },
    "albums": []
  }
}
```

Not-found responses use HTTP `404` and an error object with code `NOT_FOUND`. Invalid lowercase kebab-case IDs use HTTP `400` and code `INVALID_PARAMETER`. Unexpected persistence failures use HTTP `500` and do not expose database details.

## API Integration Tests

Copy `.env.test.example` to `.env.test` at the repository root, ensure Docker PostgreSQL is running, and initialize the protected test database:

```powershell
Copy-Item .env.test.example .env.test
$env:NODE_ENV = "test"
npm run db:init --workspace @music-atlas/backend
npm run test:integration --workspace @music-atlas/backend
```

The integration suite loads `.env.test`, requires the local `music_atlas_test` database, and uses deterministic fixture content rather than the curated pilot catalog. It includes the repository and API tests and runs them without file-level parallelism so fixtures cannot race on the shared test database.
