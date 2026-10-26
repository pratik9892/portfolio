# 0005 — Phase 2 backend: Express + PostgreSQL

- **Status:** Superseded by [0011](0011-drop-phase2-backend.md)
- **Date:** 2026-10-26
- **Phase:** 2

## Context
Later phases need a contact form, editable project data and analytics, which means an API and a database.

## Decision
- Node.js with Express in `backend/`, listening on port 4000 and reached only through nginx at `/api/`.
- `postgres:16-alpine` with a named volume. Connection details come from env (`DATABASE_URL`).
- Planned endpoints: `GET /api/projects`, `GET /api/profile`, `POST /api/contact`, `GET /api/healthz`.
- Planned tables: `projects` (mirrors the `projects.json` shape plus GitHub stats) and `contact_messages`.
- Both services sit under the docker-compose profile `backend` until Phase 2 is done.

## Alternatives considered
- MongoDB: workable, but the data here is structured and relational.
- A BaaS such as Supabase or Appwrite: less to learn from, and it ties the site to a vendor.

## Consequences
- This matches the user's existing JS/TS service experience.
- The response shapes are fixed by ADR-0001.
