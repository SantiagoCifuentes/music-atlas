# First Frontend Discovery Slice

The Phase 5 browser journey is:

```text
Music Atlas -> England -> Genre -> Artist -> Album
```

The React frontend consumes the backend API through the Vite `/api` proxy. It does not read curated JSON directly. The frontend uses `GET /api/countries/:id`, `GET /api/genres/:id`, `GET /api/artists/:id`, and `GET /api/albums/:id`.

## Local development

Copy the example environment file and start PostgreSQL:

```powershell
Copy-Item .env.example .env
docker compose up -d
npm run db:init --workspace @music-atlas/backend
npm run dev:backend
npm run dev:frontend
```

`VITE_API_PROXY_TARGET` defaults to `http://localhost:3001` and can be changed in `.env` when the backend uses another local port. Open the frontend URL printed by Vite.

## E2E tests

E2E tests start both applications automatically and initialize only the protected local `music_atlas_test` database with repository-authored curated JSON.

```powershell
Copy-Item .env.test.example .env.test
docker compose up -d
npm run test:e2e
```

The E2E setup rejects missing test configuration and any database URL that is not the local `music_atlas_test` database. It does not operate on the development database. The primary journey uses the real frontend, backend, and PostgreSQL-backed catalog; focused failure-state tests intercept only the relevant request.
