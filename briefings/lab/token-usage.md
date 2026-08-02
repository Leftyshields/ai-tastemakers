# Token usage · Lab

Open telemetry for **Claude narration cost** on every digest run. We log functional metrics — not engagement analytics — so experiments like ponytail narration can be judged on tokens, words, and rubric scores before anything hits production.

## What gets logged

Each digest appends one or more rows to `data/quality/token-usage.jsonl`:

| Field | Meaning |
|-------|---------|
| `input_tokens` / `output_tokens` | Anthropic API usage per narration batch |
| `output_words` | Sum of word counts in generated briefs |
| `variant` | `single` (production), or `control` / `treatment` (shadow A/B) |
| `flags` | `enrich_web`, `structured_context`, `ponytail` |
| `per_repo` | Per-repo token + word breakdown |

Shadow runs log **both** control and treatment on the same `run_id` — the primary before/after comparison for EXP-20260802.

## How to read the dashboard

See [token-usage.html](./token-usage.html) after `npm run build:pages`:

1. **Daily production runs** — what actually shipped each day
2. **Shadow A/B comparisons** — output token delta % (negative = ponytail saved tokens)
3. **Experiment windows** — baseline vs treatment aggregates when formal windows run

## Ponytail experiment success bar (functional)

For `EXP-20260802-ponytail-narration-skills`:

| Metric | Pass hint |
|--------|-----------|
| Output tokens / repo | Treatment ≤ baseline (−10% or better on shadow) |
| Output words / repo | Treatment shorter without rubric accuracy drop |
| Shadow rubric | Median specificity + build_with_it ≥ 4 |
| Narration failures | `repos_failed` unchanged |

PostHog clicks are **out of scope** for this experiment — collect separately when traffic grows.

## Operator commands

```bash
# Shadow run with token logging (automatic)
EXPERIMENT_ID=EXP-20260802-ponytail-narration-skills \
DIGEST_ENRICH_WEB=1 DIGEST_ENRICH_SHADOW=1 \
DIGEST_NARRATE_STRUCTURED_CONTEXT=1 DIGEST_NARRATE_PONYTAIL=1 \
npm run digest -- --edition skills

# Rebuild lab dashboard
npm run build:pages
```

Raw log: `data/quality/token-usage.jsonl` (committed when runs happen in CI or locally).
