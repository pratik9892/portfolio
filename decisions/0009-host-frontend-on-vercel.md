# 0009 — Host the frontend on Vercel

- **Status:** Accepted
- **Date:** 2026-10-26
- **Phase:** 1

## Context
ADR-0004 serves the site from a Docker + nginx container exposed through ngrok. That URL only works while the user's PC is running, and it can change. A portfolio needs a stable public URL to put on a résumé and LinkedIn.

## Decision
- The frontend is deployed to Vercel from the GitHub repo (`pratik9892/portfolio`), with root directory `frontend/`. Every push to `main` redeploys.
- Vercel runs `npm run build`, which also runs `prebuild` → `fetch-github.mjs`, and serves `dist/` from its CDN. The Dockerfile and nginx config are not used there.
- Live URL: https://frontend-rosy-theta-97.vercel.app/
- `GITHUB_TOKEN` is not set. The fetch script falls back to curated data if the API rate limit is hit.
- The Docker + nginx + ngrok setup (ADR-0004) stays for local runs and as the path to a VPS deployment later.

## Alternatives considered
- Cloudflare Pages / Netlify: equivalent for a static site; Vercel had the simplest setup for Vite.
- GitHub Pages: needs an Actions workflow and a `/portfolio/` base path unless a custom domain is used.
- VPS running docker compose: matches the full architecture, but needs server upkeep. Reconsider in Phase 2.

## Consequences
- Free hosting with HTTPS, a worldwide CDN and automatic deploys.
- Phase 2: the Express API can't run on Vercel as-is. Host it separately (e.g. Render) and either allow the Vercel origin with CORS or proxy `/api/*` with a `vercel.json` rewrite, which keeps the frontend's relative `/api/...` calls working (ADR-0001).
