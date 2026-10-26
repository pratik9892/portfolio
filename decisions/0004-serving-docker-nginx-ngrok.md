# 0004 — Serving: Docker + nginx + ngrok container

- **Status:** Accepted
- **Date:** 2026-10-26
- **Phase:** 1

## Context
The site must run in Docker, be served by nginx, and be reachable publicly through ngrok. ngrok isn't installed on the host.

## Decision
- `frontend/Dockerfile` is a multi-stage build: `node:20-alpine` builds the site, then `nginx:1.27-alpine` serves `dist/` using `nginx/nginx.conf`. The build context is the repo root so the Dockerfile can reach `nginx/`.
- nginx serves the SPA with `try_files ... /index.html`, a 1-year immutable cache for `/assets/`, `no-cache` for `index.html`, gzip, and `/healthz`. The `/api/` proxy is pre-written but commented out.
- docker-compose has a `web` service (port `8080:80`) and an `ngrok` service running the `ngrok/ngrok` image as `http web:80`, with the inspector on `localhost:4040`.
- `NGROK_AUTHTOKEN` (and optionally `NGROK_DOMAIN`, a static domain) come from `.env`, which is gitignored. `.env.example` documents them.

## Alternatives considered
- ngrok on the host: one more manual step, and it isn't installed.
- Serving with Vite preview or Node: not production-grade, and the user asked for nginx.

## Consequences
- One `docker compose up --build` builds, serves and tunnels the site.
- The free ngrok URL changes on each restart unless a static domain is set.
