# 0007 — Configurable host port and GitHub token as a build secret

- **Status:** Accepted
- **Date:** 2026-10-26
- **Phase:** 1

## Context
During verification, host port 8080 was already taken by the user's `short_url` container. Separately, an optional `GITHUB_TOKEN` is needed during the Docker build, and it must not leak into any image layer.

## Decision
- The `web` port mapping is `${WEB_PORT:-8080}:80`, so it can be overridden in `.env`.
- `GITHUB_TOKEN` is passed as a compose build secret (`secrets.github_token.environment`) and read through `RUN --mount=type=secret` in `frontend/Dockerfile`. It is not a build arg.
- `NGROK_AUTHTOKEN` defaults to empty instead of using `:?`, so `docker compose up web` works without ngrok being configured.

## Alternatives considered
- Hard-code a different port: it would just clash with something else later.
- A `GITHUB_TOKEN` build arg: it would be visible in the image history.

## Consequences
- If 8080 is taken, set `WEB_PORT` in `.env`. The ngrok tunnel is unaffected because it reaches `web:80` over the compose network.
