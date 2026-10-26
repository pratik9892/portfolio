# 0003 — Project data: curated JSON + build-time GitHub fetch

- **Status:** Accepted
- **Date:** 2026-10-26
- **Phase:** 1

## Context
The site should show selected GitHub projects (GitHub user `pratik9892`) with good descriptions and up-to-date stats, all without a backend.

## Decision
- `frontend/src/data/projects.json` is curated by hand and holds the featured repos with title, summary, highlights, tech, repo URLs and an optional live URL.
- `frontend/scripts/fetch-github.mjs` runs as `prebuild` (and `predev`). It pulls `stars`, `language`, `topics`, `updatedAt` and `githubUrl` from the GitHub REST API and writes `projects.generated.json`, which is gitignored.
- An optional `GITHUB_TOKEN` raises the rate limit. It is used only at build time and never ships to the browser.
- If the GitHub API fails, the script writes curated-only data so the build never breaks.

## Alternatives considered
- Live API calls in the browser: limited to 60 requests/hour per IP, and it allows no custom copy.
- Fully manual JSON: the stats would go stale.

## Consequences
- Stats are refreshed whenever the site is rebuilt (`docker compose up --build`).
- In Phase 2, the DB is seeded from `projects.json`, and a sync job replaces this script (Phase 3).
