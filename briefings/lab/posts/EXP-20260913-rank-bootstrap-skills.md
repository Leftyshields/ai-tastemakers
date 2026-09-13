# Smarter early ranking

_**Queued (#5, backlog RANK-1).** Not started. Baseline planned **2026-12-20** through **2027-01-02**; treatment **2027-01-03** through **2027-01-16**. Soft-dedup diversity is still measuring (treatment through **2026-09-26**)._

## The question, in English

Skills ranking uses 7-day star momentum once we have enough snapshots. In **bootstrap weeks** (thin history), mega-repos and noisy one-day spikes can dominate the top 10.

We want to **tune bootstrap guards** (max-stars caps and related filters) so early lists look less random without hiding real momentum picks.

Exact knob values get chosen **after baseline review** at treatment start. This write-up records the hypothesis and measurement plan, not the final caps.

## What we're tuning

Today the Skills pipeline reads `DIGEST_SKILLS_MAX_STARS_BOOTSTRAP` (default **25000** in `.env.example`) when 7-day deltas are unreliable. Treatment will tighten or adjust that cap plus any related filters we identify during baseline.

OSS ranking uses separate `DIGEST_MAX_STARS_BOOTSTRAP`; this experiment is **Skills only**.

## How we'll know

| We want | What "good" looks like |
|---------|------------------------|
| Stable lists | Higher day-over-day overlap of top 10 during bootstrap-like periods (fewer junk swings) |
| Still discovery | Real momentum picks (new skills, timely repos) still surface |
| Less noise | Fewer obvious mega-repo domination days in digest.json |

Primary metrics come from `digest.json` ranking fields. PostHog is secondary.

## Windows

| Phase | Dates (PT) |
|-------|------------|
| Before (change off) | 2026-12-20 → 2027-01-02 |
| After (change on) | 2027-01-03 → 2027-01-16 |

## Recommendation

**Not started.** Confirm bootstrap cap after baseline digest.json review; then enable tuned flags on the Skills digest command only. Keep status `draft` until Why-now memory closes.

---

## Operator notes

Planned treatment flags (placeholder; confirm at treatment start):

| Flag | Planned value | Notes |
|------|---------------|-------|
| `DIGEST_SKILLS_MAX_STARS_BOOTSTRAP` | `20000` (placeholder) | Baseline default today 25000; adjust after baseline analysis |

Do **not** enable in `digest.yml` until treatment start.

### Optional local preview (after implementation)

```bash
EXPERIMENT_ID=EXP-20260913-rank-bootstrap-skills \
DIGEST_SKILLS_MAX_STARS_BOOTSTRAP=20000 \
npm run digest -- --edition skills
```

Compare top-10 stability across consecutive days in `briefings/skills/*/digest.json`.

## References

- Experiment ID: `EXP-20260913-rank-bootstrap-skills`
- Product backlog: [RANK-1](../../../docs/PRODUCT_BACKLOG.md)
- Prior in queue: [Why-now memory](./EXP-20260913-whynow-memory-skills.md)
- Lab dashboard: [/lab/experiments.html](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html)
