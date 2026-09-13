# Less-repeated Skills picks

_Treatment is live from 2026-09-13 through 2026-09-26. Baseline PostHog is frozen. We have not decided keep or revert yet._

## In plain English

The Skills digest ranks repos by 7-day momentum, then soft-dedup pushes down repos that showed up recently so the list does not repeat the same names every day.

For this test we remember **more** of the recent list (14 prior briefings instead of the default 5) and penalize repeats **harder** (penalty 0.15 instead of default 0.5). Ranking still favors real weekly activity; we are only opening more slots for less-repeated repos over a week or two.

**Skills only.** OSS soft-dedup stays at defaults. Ponytail narration flags from the prior experiment stay on.

## What a reader might notice

If this works, day-to-day Skills lists should feel slightly fresher: fewer of the same repos back-to-back, and more **NEW** badges across a week when a repo truly has not appeared before.

## How we'll know

**Primary (decide keep/revert on these):** structural diversity from `digest.json`:

| Signal | What it measures |
|--------|------------------|
| Consecutive-day top-10 overlap | How many of today's top 10 were also in yesterday's top 10 |
| Unique repos / week | Distinct repos across top-10 slots in a 7-day window |
| `is_new` share in top 10 | Share of top-10 slots marked new (never featured before on Skills) |

**Suggested success bar:** consecutive-day overlap down at least **15 percentage points** vs the 70% baseline average.

**Secondary (collect, do not gate):** PostHog Skills briefing pageviews and `outbound_repo_click` where `edition=skills`. Traffic is still sparse; record trends but do not fail the experiment on CTR alone.

## Baseline window (2026-08-30 → 2026-09-12)

Fourteen Skills digests under default soft-dedup (5 briefings, 0.5 penalty). Ponytail narration flags were already on.

| Metric | Value |
|--------|-------|
| Skills digests | 14 |
| Average consecutive-day top-10 overlap | **70.0%** |
| Unique repos across window | **33** (140 top-10 slots) |
| Average `is_new` share in top 10 | **4.3%** |

### PostHog (secondary, frozen)

| Metric | Value |
|--------|-------|
| Skills briefing pageviews | 2 (`/ai-tastemakers/skills/briefings/2026-09-01.html`) |
| Skills index pageviews | 2 |
| Outbound repo clicks (`edition=skills`) | **0** |

## Treatment (2026-09-13 → 2026-09-26)

Flags enabled on the **Skills digest command** in `.github/workflows/digest.yml` as of 2026-09-13:

| Flag | Value | Default |
|------|-------|---------|
| `DIGEST_SOFT_DEDUP_BRIEFINGS` | `14` | `5` |
| `DIGEST_SOFT_DEDUP_PENALTY` | `0.15` | `0.5` |

Ponytail narration stays on:

- `DIGEST_NARRATE_STRUCTURED_CONTEXT=1`
- `DIGEST_NARRATE_PONYTAIL=1`

OSS digest soft-dedup is unchanged.

## Recommendation

**Not decided yet.** Wait until treatment ends 2026-09-26, then compare diversity metrics (especially consecutive-day overlap) against the **70%** baseline.

## Published briefs (baseline samples)

Links go to live Skills digest pages from the baseline window.

- [2026-08-30](../../skills/briefings/2026-08-30.html) · [2026-09-01](../../skills/briefings/2026-09-01.html) · [2026-09-12](../../skills/briefings/2026-09-12.html)

---

## Operator notes

Two soft-dedup flags on the Skills command only. Ranking, discovery, enrichment, and narration rules are unchanged except dedup memory and penalty.

```yaml
EXPERIMENT_ID=EXP-20260715-soft-dedup-diversity-skills \
DIGEST_SOFT_DEDUP_BRIEFINGS=14 \
DIGEST_SOFT_DEDUP_PENALTY=0.15 \
DIGEST_NARRATE_STRUCTURED_CONTEXT=1 \
DIGEST_NARRATE_PONYTAIL=1 \
npm run digest -- --edition skills
```

| Phase | Dates (PT) |
|-------|------------|
| Baseline (defaults) | 2026-08-30 → 2026-09-12 |
| Treatment (stronger dedup) | 2026-09-13 → 2026-09-26 |

Import snapshots after each window: `npm run experiment -- snapshot`.

## References

- Experiment ID: `EXP-20260715-soft-dedup-diversity-skills`
- Lab dashboard: [/lab/experiments.html](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html)
- Prior write-ups: [Shorter Skills briefs](./EXP-20260802-ponytail-narration-skills.md) · [Richer Skills briefs](./EXP-20260628-web-enrich-skills.md)
- Backlog: [RANK-2](../../docs/PRODUCT_BACKLOG.md)
