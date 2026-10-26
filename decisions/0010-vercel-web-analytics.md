# 0010 — Visitor analytics with Vercel Web Analytics

- **Status:** Accepted
- **Date:** 2026-10-27
- **Phase:** 3

## Context
Now that the site is live at https://www.pratiksawant.in, the user wants to see how many people visit, when, from where (country), and how they found it (referrer).

## Decision
- Use Vercel Web Analytics. It's enabled in the Vercel dashboard (project → Analytics).
- Add `@vercel/analytics` (pinned, 2.0.1) and render `<Analytics />` once in `frontend/src/main.jsx`.
- No cookies, no personal data. Visitors are counted with a rotating hash, and location is coarse (from IP, not stored).

## Alternatives considered
- Cloudflare Web Analytics: free and private, but a separate account and less detail.
- Google Analytics 4: most powerful, but heavy, uses cookies (consent banner territory) and is overkill here.
- Self-hosted Umami: nice DevOps exercise; reconsider alongside a VPS in Phase 2.

## Consequences
- Page views, visitors, referrers, countries, devices and browsers show up in the Vercel dashboard.
- It only reports on the Vercel deployment. The Docker/nginx build sends nothing, because the script's endpoint only exists on Vercel.
- Ad blockers hide some visits, and the user's own visits are counted.
- Custom events (e.g. Résumé clicks) may depend on the Vercel plan; not set up yet.
