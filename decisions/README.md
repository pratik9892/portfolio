# Decision Records

Each architectural or tooling decision gets one short file here (ADR format, see [`0000-template.md`](0000-template.md)).
To rebuild context, read this index and then open only the records you need.

Rules:
- Number sequentially: `NNNN-short-kebab-title.md`.
- Never rewrite an accepted decision. Write a new ADR and mark the old one `Superseded by NNNN`.
- Reference ADR ids from `task.md` when a task produces or depends on a decision.

| ID | Title | Status | Date |
|----|-------|--------|------|
| [0001](0001-phased-architecture.md) | Phased architecture with a data-access seam | Accepted | 2026-10-26 |
| [0002](0002-frontend-stack-react-vite-tailwind.md) | Frontend stack: React + Vite + Tailwind | Accepted | 2026-10-26 |
| [0003](0003-project-data-curated-json-build-time-fetch.md) | Project data: curated JSON + build-time GitHub fetch | Accepted | 2026-10-26 |
| [0004](0004-serving-docker-nginx-ngrok.md) | Serving: Docker + nginx + ngrok container | Accepted | 2026-10-26 |
| [0005](0005-backend-express-postgres-phase2.md) | Phase 2 backend: Express + PostgreSQL | Accepted | 2026-10-26 |
| [0006](0006-repo-layout-and-git.md) | Monorepo layout and git setup | Accepted | 2026-10-26 |
| [0007](0007-configurable-port-and-build-secret.md) | Configurable host port; GitHub token as build secret | Accepted | 2026-10-26 |
| [0008](0008-ai-review-hook-on-edits.md) | AI code-review hook on every edit | Accepted | 2026-10-26 |
| [0009](0009-host-frontend-on-vercel.md) | Host the frontend on Vercel | Accepted | 2026-10-26 |
| [0010](0010-vercel-web-analytics.md) | Visitor analytics with Vercel Web Analytics | Accepted | 2026-10-27 |
