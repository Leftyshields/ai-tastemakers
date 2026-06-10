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

**Digest bot:** Add **GitHub Actions** (integration bypass actor) to the same ruleset so `github-actions[bot]` can push `chore: daily digest` commits from `.github/workflows/digest.yml`. Without this, scheduled runs may generate briefings locally on the runner but fail at `git push`.

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
| Daily Digest | 06:17 / 06:45 / 07:30 Pacific cron + manual | OSS + Skills digest (idempotent skip if today exists) |
| Deploy GitHub Pages | Path push + manual | Public site |

After GHA digest bot commits, verify Pages deploy ran (see [DEV_RUNBOOK.md](DEV_RUNBOOK.md)).

---

## Backlog ↔ GitHub Issues mapping

When a story ships, close the matching GitHub issue and link `docs/CLOSURE_*.md`.
