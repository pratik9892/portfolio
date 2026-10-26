# Portfolio — context for Claude

Start every session by reading:
1. `task.md`: current phase, what's done and what's next.
2. `decisions/README.md`: the decision index. Open individual ADRs only when needed.

Conventions:
- Every new architectural or tooling decision gets a new ADR in `decisions/` and a row in its index. Don't edit an accepted ADR; supersede it with a new one.
- Tick tasks in `task.md` as they finish and add a line to its Log.
- The UI gets data only through `frontend/src/services/projectsService.js` (ADR-0001). Don't import data JSON directly into components.
- The site is static. The Phase 2 backend was dropped (ADR-0011); data lives in `frontend/src/data/*.json`. If an API is ever revived, it must return the same shapes.
- Secrets live in `.env` only (see `.env.example`).

Run:
- Dev: `cd frontend && npm install && npm run dev`
- Docker: `docker compose up --build` (site on http://localhost:8080, ngrok inspector on http://localhost:4040)
