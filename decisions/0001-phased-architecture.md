# 0001 — Phased architecture with a data-access seam

- **Status:** Accepted
- **Date:** 2026-10-26
- **Phase:** 0

## Context
Phase 1 must ship without a backend. Later phases will add an API and a database. Moving to that should not require rewriting the UI.

## Decision
- Development happens in phases: 0 setup, 1 static site, 2 Express + Postgres, 3 enhancements (see `task.md`).
- All data access goes through `frontend/src/services/projectsService.js` (`getProjects()`, `getProfile()`), and both functions are async.
- `VITE_DATA_SOURCE` selects the source: `static` (default) reads bundled JSON, and `api` calls `/api/projects` and `/api/profile`.
- The API in Phase 2 must return **the same JSON shape** as the Phase 1 JSON files. That shape is the contract.
- nginx already holds the `/api/` proxy block (commented out), and docker-compose already defines `api` and `db` under the `backend` profile.

## Alternatives considered
- Build the backend now: rejected, the user doesn't need one yet.
- Components import the JSON directly: simpler, but Phase 2 would mean touching every component.

## Consequences
- Components stay unaware of where data comes from.
- Any schema change must update both `projects.json` and the future API and DB together.
