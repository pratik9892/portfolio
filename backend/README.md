# Backend (Phase 2, not started)

Placeholder for the Express + PostgreSQL API. See [ADR-0005](../decisions/0005-backend-express-postgres-phase2.md) and `task.md` Phase 2.

## Contract
The responses must match the Phase 1 JSON files exactly (ADR-0001):

| Endpoint | Returns | Shape source |
|----------|---------|--------------|
| `GET /api/projects` | array of projects | `frontend/src/data/projects.json` + GitHub fields (`stars`, `language`, `topics`, `updatedAt`, `githubUrl`) |
| `GET /api/profile` | profile object | `frontend/src/data/profile.json` |
| `POST /api/contact` | `201 { id }` | body `{ name, email, message }` |
| `GET /api/healthz` | `200 ok` | for the compose health check |

## Planned tables
- `projects`: one row per curated project, with JSONB for `highlights`, `tech` and `repoUrls`, plus the GitHub stat columns.
- `contact_messages`: `id, name, email, message, created_at`.

## Wiring checklist
1. Add `backend/Dockerfile` (the service listens on port 4000).
2. Uncomment the `/api/` block in `nginx/nginx.conf`.
3. Build `web` with `VITE_DATA_SOURCE: api` in `docker-compose.yml`.
4. Run `docker compose --profile backend up --build`.
