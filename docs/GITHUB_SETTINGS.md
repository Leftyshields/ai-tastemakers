# GitHub repository settings

Recommended settings for [Leftyshields/ai-tastemakers](https://github.com/Leftyshields/ai-tastemakers).

---

## Branch protection for `main` (configured 2026-06-07)

**Goal:** Block accidental force-push/delete on `main`; require PR review + CI for merges, with **Leftyshields** bypass so you can still push directly.

### Active rules

**Classic branch protection** on `main`:

| Setting | Value |
|--------|--------|
| Allow force pushes | **No** |
| Allow deletions | **No** |

**Repository ruleset:** [Main: require PR + CI (owner bypass)](https://github.com/Leftyshields/ai-tastemakers/rules/17372404)

| Setting | Value |
|--------|--------|
| Require pull request | Yes (1 approval; author does not count) |
| Required status check | `test` (from `.github/workflows/ci.yml`) |
| Bypass | **Leftyshields** — always |

### CI

Workflow: `.github/workflows/ci.yml` — runs `npm test` and `npm run test:digest` on push/PR to `main`.

### Result

- **You (Leftyshields):** Can push directly to `main` (bypass).
- **PR merges:** Need 1 non-author approval + green `test` check.
- **Everyone:** Cannot force-push or delete `main`.

---

## Other workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| Daily Digest | Cron + manual | OSS + Skills digest |
| Deploy GitHub Pages | Path push + manual | Public site |

After GHA digest bot commits, verify Pages deploy ran (see [DEV_RUNBOOK.md](DEV_RUNBOOK.md)).

---

## Backlog ↔ GitHub Issues mapping

When a story ships, close the matching GitHub issue and link `docs/CLOSURE_*.md`.
