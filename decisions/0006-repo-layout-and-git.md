# 0006 — Monorepo layout and git setup

- **Status:** Accepted
- **Date:** 2026-10-26
- **Phase:** 0

## Context
The user's home folder `C:\Users\HP` is itself a git repo (originally for 30-days-react). The portfolio needs its own history.

## Decision
- Run `git init` inside `portfolio/`. Git treats the nested repo as separate, so the outer home-folder repo is left untouched. Cleaning up the outer repo is out of scope.
- The portfolio is a single repo with `frontend/`, `backend/`, `nginx/`, `decisions/`, plus `task.md`, `CLAUDE.md` and `docker-compose.yml` at the root.
- Never commit `.env`, `node_modules/`, `dist/` or `projects.generated.json`.

## Alternatives considered
- Separate repos for the frontend and backend: more overhead for a one-person project.

## Consequences
- One `docker compose` file orchestrates every phase.
- Remote: to be decided by the user (e.g. `github.com/pratik9892/portfolio`).
