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

## Phase 2 — Backend + database: DROPPED (ADR-0011, supersedes ADR-0005)
Not needed. A portfolio's job is to show projects, and an API returning the same data as the JSON files adds nothing visitors can see. The data seam, the commented nginx `/api/` block and the compose `backend` profile stay as dormant scaffolding.

## Phase 3 — Enhancements
- ~~Scheduled GitHub sync job writing repo stats into the DB~~ (dropped with Phase 2)
- ~~Admin auth + UI to manage projects~~ (dropped with Phase 2)
- [ ] Screenshots / architecture diagrams for Code Judge, myTube, Whiteboard
- [ ] Deploy Collaborative Whiteboard live (adds a Live demo button)
- [ ] Case-study pages for the top 2 projects
- [ ] Link-preview image (og:image) and initials favicon
- [ ] Lighthouse audit (target 95+)
- [x] Page-view analytics: Vercel Web Analytics (2026-10-27, ADR-0010). Project-click events not yet
- [ ] CI (GitHub Actions): lint, build, push image
- [x] Stable public URL: Vercel, https://frontend-rosy-theta-97.vercel.app/ (2026-10-26, ADR-0009)
- [x] Custom domain: https://www.pratiksawant.in (BigRock DNS: A `@` → 216.198.79.1, CNAME `www` → Vercel; apex 308-redirects to www) (2026-10-27)

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
| 2026-10-26 | First commit (`cc02c29`) pushed to https://github.com/pratik9892/portfolio (public) |
| 2026-10-26 | Deployed to Vercel (ADR-0009). First project image now loads eagerly |
| 2026-10-27 | Custom domain pratiksawant.in live with HTTPS; canonical + og:url point to https://www.pratiksawant.in/ |
| 2026-10-27 | Added Vercel Web Analytics (ADR-0010) |
| 2026-10-27 | Phase 2 backend dropped (ADR-0011 supersedes ADR-0005). Phase 3 refocused on project content |
