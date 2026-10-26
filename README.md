# Portfolio

Personal portfolio for Pratik Sawant, live at https://www.pratiksawant.in (Vercel, ADR-0009). It shows curated GitHub projects with live repo stats. The Docker + nginx (+ ngrok) setup runs it locally.

- Progress: [`task.md`](task.md)
- Decisions: [`decisions/`](decisions/README.md)
- Backend: dropped, the site is static ([ADR-0011](decisions/0011-drop-phase2-backend.md))

## Edit the content
| What | File |
|------|------|
| Name, bio, skills, experience, education, socials | `frontend/src/data/profile.json` |
| Which projects show, and their text | `frontend/src/data/projects.json` |

Stars, language and last-updated dates are pulled from GitHub on every build (`scripts/fetch-github.mjs`), so don't put them in the JSON.

## Run locally (dev)
```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

## Run in Docker
```bash
cp .env.example .env         # then fill in NGROK_AUTHTOKEN
docker compose up --build -d # site + ngrok tunnel
docker compose logs ngrok    # look for: started tunnel ... url=https://xxxx.ngrok-free.app
```
- Site: http://localhost:8080. If 8080 is taken (e.g. by `short_url`), set `WEB_PORT=8081` in `.env`.
- ngrok inspector, which also shows the public URL: http://localhost:4040
- Site only, no tunnel: `docker compose up --build -d web`
- After editing content, rerun `docker compose up --build -d` to rebuild.
- Stop: `docker compose down`

### Stable ngrok URL (optional)
Claim a free static domain in the ngrok dashboard, then change the ngrok `command` in `docker-compose.yml` to:
```yaml
command: ["http", "web:80", "--url", "your-name.ngrok-free.app", "--log", "stdout"]
```

### GitHub rate limit (optional)
Builds make one unauthenticated GitHub API call per project (limit: 60/hour). If you hit the limit, put a read-only `GITHUB_TOKEN` in `.env`. It's passed to the Docker build as a BuildKit secret, so it never ends up in the image.

## Structure
```
frontend/   React + Vite + Tailwind app, Dockerfile (multi-stage → nginx)
nginx/      nginx.conf (SPA fallback, caching, gzip, /healthz, dormant /api proxy)
backend/    Dropped Express + Postgres plan, kept for reference (ADR-0011)
decisions/  Architecture decision records
```
