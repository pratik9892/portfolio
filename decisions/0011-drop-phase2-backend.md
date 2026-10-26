# 0011 — Drop the Phase 2 backend; the portfolio stays static

- **Status:** Accepted
- **Date:** 2026-10-27
- **Phase:** 2

## Context
ADR-0005 planned an Express + PostgreSQL backend so project data could be edited through an API and the contact form could store messages. Phases 0 and 1 are done, and the site is live on Vercel at https://www.pratiksawant.in (ADR-0009) with analytics (ADR-0010).

A portfolio exists to show projects and make it easy to get in touch. Phase 2 would add none of that for visitors. By design (ADR-0001), the API would return the same data as the JSON files, so the site would look the same. Meanwhile it brings a server and a database to host (free tiers that sleep), CORS or proxy setup, and more to break. The data changes a few times a year, and editing JSON and pushing handles that. The user's backend skills already show in the featured projects (Shortly, Code Judge, myTube).

## Decision
- Don't build the Phase 2 backend. ADR-0005 is superseded.
- Project and profile data stay in `frontend/src/data/*.json`, edited by hand.
- Contact stays mailto + copy-email. If a form is ever wanted, use a hosted form service or a single serverless function, not a database.
- Keep the data seam (`projectsService.js`, `VITE_DATA_SOURCE`), the commented nginx `/api/` block, and the compose `backend` profile as dormant scaffolding. They cost nothing, and a future API would slot in there.
- Put the time into the showcased projects instead: live demos, screenshots or diagrams, READMEs, case-study pages, and new projects.

## Alternatives considered
- Build Phase 2 as planned: good backend and DevOps practice, but it doesn't help visitors. That practice is better spent deploying a real project (e.g. Code Judge on a VPS with Docker, nginx and HTTPS).
- Serverless contact form now: not needed while mailto + copy-email works.

## Consequences
- The site stays static, free, fast and low-maintenance.
- The ADR-0001 "API must return the same shapes" rule no longer has a consumer. It applies only if an API is revived.
- Phase 3 items that assumed a database (admin UI, DB-backed GitHub sync) are dropped too. CI and the remaining content work still apply.
