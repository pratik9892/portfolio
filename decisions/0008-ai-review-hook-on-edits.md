# 0008 — AI code-review hook on every edit

- **Status:** Accepted
- **Date:** 2026-10-26
- **Phase:** 1

## Context
Changes made through Claude Code should be checked for bugs, leaked secrets and the ADR-0001 data-access rule as they happen, not only at commit time.

## Decision
`.claude/settings.json` defines a `PostToolUse` hook on `Edit|Write|MultiEdit` of type `agent`. After each change, a reviewer agent reads the changed file and checks for correctness bugs, secrets outside `.env`, and direct imports of `frontend/src/data/*.json` into components. If it finds a concrete problem, the problem is fed back to Claude to fix. Non-code files are approved straight away.

## Alternatives considered
- Review once per turn (`Stop` hook): cheaper, but problems surface late and the reviewer has to work out what changed.
- Lint-only `command` hook: deterministic and free, but can't catch logic bugs or project rules. Can be added alongside later.

## Consequences
- Every edit costs one extra model call and a few seconds of latency.
- The hook only covers edits made through Claude Code, not edits you make by hand.
- To disable it, remove the entry or use `/hooks`.
