# Portfolio — Task Tracker

This file is the source of truth for progress. Tick a box when a task is done and add the date and any ADR it produced.
Decisions live in [`decisions/`](decisions/README.md).

Legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## Phase 0 — Setup
- [x] Initialise git repo inside `portfolio/` (ADR-0006)
- [x] Create folder layout (`frontend/`, `nginx/`, `backend/`, `decisions/`)
- [x] Write `task.md` (this file)
- [x] Write decision records ADR-0001 … ADR-0006 + index + template
- [x] Write `CLAUDE.md` (context bootstrap for future sessions)
- [x] Add `.gitignore`, `.dockerignore`, `.env.example`

**Done when:** repo initialised, docs in place, nothing secret tracked.

## Phase 1 — Static site (frontend only)
- [x] Scaffold Vite + React + Tailwind in `frontend/` (ADR-0002)
- [x] `src/data/profile.json`: bio, socials, skills, experience, education (placeholders marked `TODO`)
- [x] `src/data/projects.json`: curated featured projects (ADR-0003)
- [x] `scripts/fetch-github.mjs`: build-time enrichment with graceful fallback
- [x] `src/services/projectsService.js`: data seam (`getProjects`, `getProfile`) (ADR-0001)
- [x] Components: Navbar (theme toggle), Hero, About, Skills, Experience, Projects/ProjectCard, Contact, Footer
- [x] `nginx/nginx.conf`: SPA fallback, caching, gzip, `/healthz`, commented `/api` proxy (ADR-0004)
- [x] `frontend/Dockerfile`: multi-stage build → nginx
- [x] `docker-compose.yml`: `web` + `ngrok`; `api` + `db` under `backend` profile; `WEB_PORT` override (ADR-0007)
- [x] `README.md`: dev, docker, ngrok instructions
- [x] Verify: `npm run build`, `docker compose up --build`, `curl` checks, desktop/phone/light/dark screenshots (2026-10-26)
- [x] Verify ngrok public URL (2026-10-26)
- [x] User fills in `TODO` placeholders in `profile.json` / `projects.json` (2026-10-26; `experience` left empty on purpose)

**Done when:** site is reachable via the ngrok URL and shows the curated projects with live GitHub stats.

## Phase 2 — Backend + database (ADR-0005)
- [ ] Scaffold Express app in `backend/` (Dockerfile, health check)
- [ ] PostgreSQL schema: `projects`, `contact_messages` (+ migrations)
- [ ] Seed `projects` from `frontend/src/data/projects.json`
- [ ] Endpoints: `GET /api/projects`, `GET /api/profile`, `POST /api/contact` (same JSON shape as Phase 1)
- [ ] Enable nginx `/api/` proxy block
- [ ] Build frontend with `VITE_DATA_SOURCE=api`; Contact section switches from mailto to form
- [ ] Remove `profiles: [backend]` gating or document `docker compose --profile backend up`

**Done when:** frontend reads all data from the API and contact form messages land in Postgres.

## Phase 3 — Enhancements
- [ ] Scheduled GitHub sync job writing repo stats into the DB
- [ ] Admin auth + UI to manage projects
- [ ] Page-view / project-click analytics
- [ ] CI (GitHub Actions): lint, build, push image
- [ ] Stable public URL (ngrok static domain or real hosting)

---

## Log
| Date | Change |
|------|--------|
| 2026-10-26 | Plan approved; task.md created |
| 2026-10-26 | Phase 0 done; Phase 1 built and verified locally (port 8081 because `short_url` holds 8080). Remaining: ngrok token, profile TODOs |
| 2026-10-26 | ngrok tunnel verified: site and /healthz return 200 through the public URL |
| 2026-10-26 | Profile TODOs filled. Experience section and nav link become "Education" when `experience` is empty. Added review hook (ADR-0008) |
| 2026-10-26 | UI pass 1: Projects moved first, top 4 featured, card buttons and optional `image`; core-stack skills; availability badge and LinkedIn in hero; Certifications in Education section; copyable email; OG tags. New profile fields: `availability`, `coreSkills`, `certifications` (the Phase 2 API must return these too) |
| 2026-10-26 | UI pass 2 (redesign): zinc palette, Geist fonts, eyebrow section headers, scroll reveals (`Reveal`, respects reduced motion), scrollspy navbar + animated mobile menu + skip link, hero code card, About facts panel, certification card, contact CTA card, inline SVG icons. No new dependencies. Placeholder art for projects without `image`; Oracle certification added |
