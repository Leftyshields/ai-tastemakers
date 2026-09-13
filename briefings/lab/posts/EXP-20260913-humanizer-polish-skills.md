# Less AI-sounding Skills briefs

_**Queued (#2).** Not started. Baseline planned **2026-09-27** through **2026-10-10**; treatment **2026-10-11** through **2026-10-24**. Soft-dedup diversity is still measuring (treatment through **2026-09-26**)._

## The question, in English

Skills blurbs already go through Ponytail (short sections, one try-this step) and Firecrawl enrichment. They can still read like generic AI copy: stock phrases, filler transitions, and "in today's fast-paced landscape" energy.

After Claude writes each blurb, we want a **light polish pass** that strips those tells without changing facts or the Why-now hook.

That is the whole test. Humanizer is *where the idea came from*, not a tool we installed.

## What Humanizer means here

[Humanizer](https://github.com/blader/humanizer) is a Claude Code skill that detects named AI-writing patterns and rewrites prose without inventing facts.

We are **not** installing Humanizer on the digest pipeline.

We copied the habit: **one post-narration edit** on Skills blurbs only. README-grounded specifics stay. Why-now hooks stay. Filler and stock AI phrasing go.

## How we'll know

| We want | What "good" looks like |
|---------|------------------------|
| Less AI-sounding | Editorial spot-check: fewer stock phrases and filler transitions |
| Still accurate | Rank-1 rubric pass rate holds (specificity, accuracy) |
| Still timely | Why-now rubric score does not regress |
| Cost | Token log is secondary; expect a small polish-pass bump |

PostHog CTR is **out of scope** for this experiment. We gate on editorial rubric and human-sounding spot-checks.

## Windows

| Phase | Dates (PT) |
|-------|------------|
| Before (change off) | 2026-09-27 → 2026-10-10 |
| After (change on) | 2026-10-11 → 2026-10-24 |

## Recommendation

**Not started.** Implement `DIGEST_HUMANIZER_POLISH=1` at treatment start on the Skills digest command only. Keep status `draft` until soft-dedup closes.

---

## Operator notes

| Flag | What it does |
|------|----------------|
| `DIGEST_HUMANIZER_POLISH=1` | Post-narrate polish pass on Skills blurbs (strip AI-writing tells; no new facts) |

Flags go on the **Skills digest command only**, not the shared OSS env block. Do **not** enable in `digest.yml` until treatment start.

### Optional side-by-side preview (after implementation)

```bash
EXPERIMENT_ID=EXP-20260913-humanizer-polish-skills \
DIGEST_ENRICH_WEB=1 \
DIGEST_ENRICH_WEB_PROVIDER=firecrawl \
DIGEST_NARRATE_STRUCTURED_CONTEXT=1 \
DIGEST_NARRATE_PONYTAIL=1 \
DIGEST_HUMANIZER_POLISH=1 \
DIGEST_ENRICH_SHADOW=1 \
npm run digest -- --edition skills
```

Output: `data/experiments/runs/{run_id}/`. Score with the [shadow rubric](../shadow-rubric.md).

## References

- Experiment ID: `EXP-20260913-humanizer-polish-skills`
- Prior in queue: soft-dedup diversity (`EXP-20260715-soft-dedup-diversity-skills`)
- Prior narration experiment: [Shorter Skills briefs](./EXP-20260802-ponytail-narration-skills.md)
- Tool inventory: [blader/humanizer](https://github.com/blader/humanizer) (featured on Skills list; habit borrowed, not installed)
- Lab dashboard: [/lab/experiments.html](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html)
