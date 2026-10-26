# 0002 — Frontend stack: React + Vite + Tailwind

- **Status:** Accepted
- **Date:** 2026-10-26
- **Phase:** 1

## Context
We need a fast, familiar stack that builds to static files nginx can serve.

## Decision
React 18, Vite and Tailwind CSS 3, with plain JavaScript (no TypeScript). The site is a single page with anchor navigation and a dark/light theme toggle that uses Tailwind's `class` dark mode.

## Alternatives considered
- Next.js static export: heavier, and its SSR features would go unused behind nginx.
- Astro: lighter output, but a new tool for the user to learn.

## Consequences
- This matches the user's existing projects (react-30-days, pass-generator), so it's familiar ground.
- `npm run build` writes `dist/`, which is copied into the nginx image.
- There's no client-side router yet. nginx still has an SPA fallback in case one is added.
