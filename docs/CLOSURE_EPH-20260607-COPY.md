# Closure — EPH-20260607-COPY

**Title:** Tastemaker copy and brief format improvements  
**Status:** Shipped  
**Closed:** 2026-06-07

---

## What shipped

### Homepage copy (`scripts/edition-pages.ts`)

- **AI Tastemakers:** One-line explainer under hero — tools/agents/frameworks on foundation models, not foundation-model news.
- **Skill Tastemakers:** Distinct curation descriptor for reusable agent instruction artifacts; intentional overlap with main digest.

### Brief format (`src/tastemaker/narrate/claude.ts`)

- Claude prompt outputs three bold subheads: **What it does:** / **Why now:** / **Build with it:**
- `max_tokens` 300 → 450
- `buildPrompt()` exported; tests in `narrate/claude.test.ts`

### Email rendering (`src/tastemaker/email/html.ts`)

- `renderBriefForEmail()` — `**bold**` → `<strong>`, HTML escape, paragraph line breaks

### Pipeline fixes (discovered during verification — `73ddee1`)

- Same-day re-run stability: `excludeDate` in `loadRecentBriefingRepos()` — today’s folder excluded from soft-dedup on regenerate
- Star parity: preserve `stars` / `stars_gained_7d` from discovery/snapshot when merging enrich results

### Tests & docs

- `npm run test:digest` — 44 tests passing at ship
- `docs/DATA_FORMAT_REFERENCE.md`, `docs/ARCHITECTURE.md` updated

### Production artifacts

- Commits on `main`: `40f10ae`, `73ddee1`
- GHA digest: `b6ae695` (`chore: daily digest 2026-06-07`)
- Pages deployed; live site includes new homepage copy and structured briefs

**Live site:** https://leftyshields.github.io/ai-tastemakers/

---

## Deferred

| Item | Notes |
|------|--------|
| Archive backfill | Forward-only — pre-2026-06-07 briefs stay dense paragraphs |
| Formal `/qa_checklist` artifact | Tests + code review only |
| `TASTEMAKER_COPY_EDITS.md` in repo | Source doc referenced at capture; not committed |
| Auto Pages deploy after GHA digest commit | May need `workflow_run` trigger or post-digest step |

---

## Ship commands (reference)

```bash
# Tests
npm run test:digest

# Homepage preview (no Claude)
npm run build:pages
npx serve site

# Production briefs (preferred over same-day local re-run)
gh workflow run "Daily Digest" --repo Leftyshields/ai-tastemakers
gh run watch   # wait for completion
git pull       # absorb bot commit

# Pages (if briefings changed and deploy did not auto-run)
gh workflow run "Deploy GitHub Pages" --repo Leftyshields/ai-tastemakers
```

---

## Acceptance criteria

| Criterion | Met |
|-----------|-----|
| AI-derivative explainer on OSS homepage | Yes |
| Skill Tastemakers distinct descriptor | Yes |
| Forward briefs use three-subhead format | Yes (from GHA run 16:37Z) |
| Claude prompt updated | Yes |
| Voice/tone preserved | Yes |
| No ranking logic change (scope) | **Exceeded** — two stability fixes shipped |
| `npm run test:digest` passes | Yes |

---

## Postmortem

`.ai/context/postmortem_EPH-20260607-COPY.md`

---

## Next feature candidates

1. Pages auto-deploy after digest workflow commits  
2. Narrate-only backfill script (optional, for archive format migration)  
3. Formal QA checklist for output-format changes  
4. Ranking quality after bootstrap week
