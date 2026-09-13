# Shorter enrichment context

_**Queued (#3).** Not started. Baseline planned **2026-10-25** through **2026-11-07**; treatment **2026-11-08** through **2026-11-21**. Soft-dedup diversity is still measuring (treatment through **2026-09-26**)._

## The question, in English

Before Claude writes a Skills blurb, we fetch web/HN/Reddit snippets via Firecrawl. Those bundles can be verbose: long quotes, repeated context, and prose that burns input tokens without adding facts.

We want to **compress enrichment text** before narration: keep paths, numbers, release names, and hooks; drop filler.

That is distinct from Ponytail (how Claude writes the blurb) and Humanizer (post-narration polish). This test is about **what we feed Claude**, not how it sounds after.

Caveman is *where the idea came from*, not a tool we installed.

## What Caveman means here

[Caveman](https://github.com/JuliusBrussee/caveman) is a Claude Code skill (and OmniRoute uses a similar RTK+Caveman pattern) that strips verbose prose in agent context while preserving code, paths, and error messages.

We are **not** installing Caveman on the digest.

We copied the habit: **compress enrichment bundles** before the narrator sees them. Facts in, fluff out.

## How we'll know

| We want | What "good" looks like |
|---------|------------------------|
| Cheaper inputs | Lower enrichment/input tokens per Skills run vs baseline |
| Shorter outputs | Output tokens down or flat (less context to parrot) |
| Quality holds | Rank-1 rubric pass rate unchanged |
| Timely hooks | Why-now rubric score does not regress |

PostHog is secondary. Firecrawl enrich must stay on during this test.

## Windows

| Phase | Dates (PT) |
|-------|------------|
| Before (change off) | 2026-10-25 → 2026-11-07 |
| After (change on) | 2026-11-08 → 2026-11-21 |

## Recommendation

**Not started.** Implement `DIGEST_ENRICH_COMPRESS=1` at treatment start on the Skills digest command only. Keep status `draft` until humanizer polish closes.

---

## Operator notes

| Flag | What it does |
|------|----------------|
| `DIGEST_ENRICH_COMPRESS=1` | Compress Firecrawl/HN enrichment bundles before Skills narration |

Flags go on the **Skills digest command only**. Requires existing Firecrawl enrich flags. Do **not** enable in `digest.yml` until treatment start.

### Optional side-by-side preview (after implementation)

```bash
EXPERIMENT_ID=EXP-20260913-caveman-compress-skills \
DIGEST_ENRICH_WEB=1 \
DIGEST_ENRICH_WEB_PROVIDER=firecrawl \
DIGEST_NARRATE_STRUCTURED_CONTEXT=1 \
DIGEST_NARRATE_PONYTAIL=1 \
DIGEST_ENRICH_COMPRESS=1 \
DIGEST_ENRICH_SHADOW=1 \
npm run digest -- --edition skills
```

Compare token lines on the [Token dashboard](../token-usage.html) and rank-1 rubric scores.

## References

- Experiment ID: `EXP-20260913-caveman-compress-skills`
- Prior in queue: [Humanizer polish](./EXP-20260913-humanizer-polish-skills.md)
- Enrichment layer: [Richer Skills briefs](./EXP-20260628-web-enrich-skills.md)
- Tool inventory: [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) (habit borrowed, not installed)
- Lab dashboard: [/lab/experiments.html](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html)
