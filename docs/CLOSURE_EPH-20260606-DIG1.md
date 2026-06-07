# Closure — EPH-20260606-DIG1

**Title:** Daily AI Open Source Intelligence Digest (v1)  
**Status:** Shipped  
**Closed:** 2026-06-07

---

## What shipped

### Core pipeline (`src/tastemaker/`)

- GitHub topic discovery → snapshot (`data/snapshots/repos.jsonl`) → rank (7-day delta or bootstrap) → enrich top 10 → Claude narration → write briefing
- CLI: `npm run digest`
- Filters: min stars, 30-day push, blocklist, bootstrap max stars (80k default)
- Skip-on-failure for Claude; placeholder in markdown when narration fails

### Outputs

- `briefings/YYYY-MM-DD/daily_brief.md`
- `briefings/YYYY-MM-DD/digest.json`

### Automation

- `.github/workflows/digest.yml` — daily cron 06:00 Pacific + manual dispatch; commits briefings + snapshots
- Repo secret: `ANTHROPIC_API_KEY`
- `.github/workflows/pages.yml` — builds Tailwind site from briefings; deploys GitHub Pages

### Public site

- **https://leftyshields.github.io/ai-tastemakers/**
- Hero + about copy, archive, styled brief pages
- Tailwind compiled at build time (`site/assets/input.css` → `style.css`)
- Relative asset paths for project-site hosting

### Tests & docs

- `npm run test:digest` (11 tests)
- `README.md`, `docs/ARCHITECTURE.md`, `docs/DEV_RUNBOOK.md`, `docs/DATA_FORMAT_REFERENCE.md`

### Repository

- **https://github.com/Leftyshields/ai-tastemakers**

---

## Deferred (v2+)

| Item | Notes |
|------|--------|
| 7-day delta ranking quality | Needs ~7 days of daily snapshots; bootstrap still active |
| Ranking tuning | `DIGEST_MAX_STARS_BOOTSTRAP`, blocklist expansion |
| Email / Slack / Substack distribution | Discussed; not implemented |
| Brief page repo cards | UX medium polish |
| `/code_review` + `/qa_checklist` | Skipped; run before next feature |
| GitHub issue close | Create/close issue on tracker if used |
| Node 24 on Actions | Deprecation warning on checkout/setup-node |

---

## Ship commands (reference)

```bash
# Local digest
cp .env.example .env   # GITHUB_TOKEN, ANTHROPIC_API_KEY, ANTHROPIC_MODEL=claude-sonnet-4-6
npm install
npm run digest

# Tests
npm run test:digest

# Static site preview
npm run build:pages
npx serve site

# GitHub
gh secret set ANTHROPIC_API_KEY --repo Leftyshields/ai-tastemakers
gh workflow run "Daily Digest" --repo Leftyshields/ai-tastemakers
```

---

## Acceptance criteria (from execution plan)

| Criterion | Met |
|-----------|-----|
| Daily unattended run (GHA) | Yes |
| Top 10 ranked (delta or bootstrap + banner) | Yes |
| Filters enforced | Yes |
| Claude briefs with fallback | Yes |
| `npm run test:digest` passes | Yes |
| Readable public output | Yes (GitHub Pages) |

---

## Postmortem

`.ai/context/postmortem_EPH-20260606-DIG1.md`

---

## Next feature candidates

1. Ranking quality after bootstrap week (monitor delta mode switch)  
2. Repo cards + brief TOC on Pages  
3. Distribution (Buttondown / RSS)  
4. Alerting if digest or Pages deploy fails
