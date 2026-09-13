# Fresher Why-now on repeats

_**Queued (#4).** Not started. Baseline planned **2026-11-22** through **2026-12-05**; treatment **2026-12-06** through **2026-12-19**. Soft-dedup diversity is still measuring (treatment through **2026-09-26**)._

## The question, in English

Popular Skills repos come back. Soft-dedup opens ranking slots, but the **narrator** can still remix the same Why-now hook ("trending on GitHub again") even when the facts moved.

When a repo repeats, we want to **remember what we already said** and push Claude toward a fresh angle without inventing news.

That complements soft-dedup (ranking diversity) with **narration memory**. Hermes and ECC are *where the habit came from*, not tools we run.

## What Hermes / ECC memory means here

[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) and [affaan-m/ECC](https://github.com/affaan-m/ECC) both show up on the Skills list with agent memory patterns: carry prior session facts forward so the model does not repeat itself.

We are **not** running Hermes or ECC on the digest.

We copied the habit: for repeat repos, feed **prior Skills brief Why-now lines** (last 7 briefings) into the narrator prompt so the new hook differs from recent ones.

## How we'll know

| We want | What "good" looks like |
|---------|------------------------|
| Fresher hooks | Lower lexical overlap between repeat-repo Why-now lines vs prior briefs |
| Rubric holds | Why-now rubric score stable or up |
| Still accurate | No invented news; rank-1 accuracy pass rate unchanged |

Primary metrics come from digest.json text and rubric logs. PostHog is secondary.

## Windows

| Phase | Dates (PT) |
|-------|------------|
| Before (change off) | 2026-11-22 → 2026-12-05 |
| After (change on) | 2026-12-06 → 2026-12-19 |

## Recommendation

**Not started.** Implement memory flags at treatment start on the Skills digest command only. Keep status `draft` until caveman compress closes.

---

## Operator notes

| Flag | What it does |
|------|----------------|
| `DIGEST_WHYNOW_MEMORY=1` | Enable prior Why-now memory for repeat Skills repos |
| `DIGEST_WHYNOW_MEMORY_BRIEFINGS=7` | Look back 7 prior Skills briefings for the same repo |

Flags go on the **Skills digest command only**. Do **not** enable in `digest.yml` until treatment start.

### Optional side-by-side preview (after implementation)

```bash
EXPERIMENT_ID=EXP-20260913-whynow-memory-skills \
DIGEST_ENRICH_WEB=1 \
DIGEST_ENRICH_WEB_PROVIDER=firecrawl \
DIGEST_NARRATE_STRUCTURED_CONTEXT=1 \
DIGEST_NARRATE_PONYTAIL=1 \
DIGEST_WHYNOW_MEMORY=1 \
DIGEST_WHYNOW_MEMORY_BRIEFINGS=7 \
DIGEST_ENRICH_SHADOW=1 \
npm run digest -- --edition skills
```

Spot-check repeat repos (Ponytail, Caveman, ECC) for hook variety vs baseline briefs.

## References

- Experiment ID: `EXP-20260913-whynow-memory-skills`
- Prior in queue: [Caveman compress](./EXP-20260913-caveman-compress-skills.md)
- Ranking complement: soft-dedup (`EXP-20260715-soft-dedup-diversity-skills`)
- Tool inventory: [affaan-m/ECC](https://github.com/affaan-m/ECC), [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
- Lab dashboard: [/lab/experiments.html](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html)
