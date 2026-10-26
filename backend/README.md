# Backend (dropped)

**Not being built.** Phase 2 was dropped in [ADR-0011](../decisions/0011-drop-phase2-backend.md); the portfolio stays static. This file keeps the original plan from [ADR-0005](../decisions/0005-backend-express-postgres-phase2.md) for reference, in case an API is ever needed.

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
