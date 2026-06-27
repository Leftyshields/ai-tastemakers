# Closure — EPH-20260627-NEWF

**Title:** "New" flag only for first-time digest appearance (lifetime, per edition)  
**Status:** Shipped  
**Closed:** 2026-06-27

---

## What shipped

### Pipeline (`src/tastemaker/rank/score.ts`, `pipeline.ts`)

- **`loadBriefingFeaturedSets()`** — single pass over prior `digest.json` files; returns soft-dedup window + lifetime prior sets.
- **`is_new`** — `true` only when `full_name` never appeared in any prior daily digest for that edition (all dates before today).
- **Soft-dedup unchanged** — still uses last N briefings (`DIGEST_SOFT_DEDUP_BRIEFINGS`) for score penalty only.

### Tests

- `rank/score.test.ts` — loader unit tests + combined-set test.
- `integration.test.ts` — refeature outside dedup window → `is_new: false`.

### Docs & ops

- `docs/DATA_FORMAT_REFERENCE.md` — lifetime `is_new` semantics.
- `.env.example` — clarifies dedup env vars are ranking-only.
- `scripts/qa-is-new-spot-check.ts` — archive verification (e.g. `Kilo-Org/kilocode` case).

### QA (automated)

- `npm run test:digest` — **100/100** at ship.
- Spot-check: kilocode seen before 2026-06-25 → `is_new` would be **false** under new logic.

**Not changed:** markdown/email/site renderers, GHA workflow, weekly/monthly pipelines.

---

## Deferred

| Item | Notes |
|------|--------|
| Historical briefing backfill | Forward-only — past incorrect badges remain in archive |
| Cross-edition "seen" union | OSS vs Skills still independent |
| Persistent seen index | Full scan acceptable at current archive size |
| Fix `npm run build:digest` | Pre-existing TS errors in `config.ts` / `firestore.ts` |
| Add spot-check to `package.json` | Script exists; optional `npm run qa:is-new` later |

---

## Ship commands

```bash
# Tests (primary gate)
npm run test:digest

# Archive spot-check (no API keys)
npx tsx scripts/qa-is-new-spot-check.ts

# Production — next daily digest applies fix automatically
gh workflow run "Daily Digest" --repo Leftyshields/ai-tastemakers
gh run watch
git pull   # absorb bot commit if needed

# Verify tomorrow's digest.json — refeatured repos should not have is_new: true
```

---

## Acceptance criteria

| Criterion | Met |
|-----------|-----|
| Prior feature → never `is_new: true` again (same edition) | Yes |
| First feature → `is_new: true` | Yes |
| Soft-dedup independent of badge | Yes |
| OSS / Skills per-edition history | Yes |
| Tests + DATA_FORMAT_REFERENCE updated | Yes |
| Kilo-Org/kilocode regression (spot-check) | Yes |

---

## Postmortem

`.ai/context/postmortem_EPH-20260627-NEWF.md` (local; `.ai/context/` gitignored)

---

## Live verification (manual, post-GHA)

After next daily run:

- [ ] Open `briefings/YYYY-MM-DD/digest.json` — no `is_new: true` on repos featured in any earlier OSS digest
- [ ] Same for `briefings/skills/YYYY-MM-DD/digest.json`
- [ ] Optional: `npm run build:pages` and confirm badges on site

**Live site:** https://leftyshields.github.io/ai-tastemakers/
