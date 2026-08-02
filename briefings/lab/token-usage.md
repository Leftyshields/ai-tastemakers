# Token usage · Lab

Open telemetry for **Claude narration cost and quality** on every digest run. Functional metrics only — not PostHog engagement.

## What gets logged

Each digest appends one or more rows to `data/quality/token-usage.jsonl`:

| Field | Meaning |
|-------|---------|
| `input_tokens` / `output_tokens` | Anthropic API usage per narration batch |
| `prompt_chars` | Characters sent in the user prompt (compare to input tokens — structured context overhead) |
| `chars_per_input_token` | `prompt_chars / input_tokens` — lower = denser tokenization |
| `latency_ms_avg` | Wall-clock per repo for Claude `messages.create` |
| `enrich_chars_total` | Firecrawl/HN/Reddit payload chars merged before narration |
| `readme_chars` (per repo) | README excerpt size in prompt |
| `estimated_usd` | List-price estimate from model + token counts |
| `rubric` | Rank-1 heuristic scores when `DIGEST_QUALITY_RUBRIC=1` |
| `variant` | `single` (production), or `control` / `treatment` (shadow A/B) |

Shadow runs log **both** control and treatment on the same `run_id`.

## Dashboard sections

See [token-usage.html](./token-usage.html) after `npm run build:pages`:

1. **Daily production runs** — tokens, prompt chars, enrich payload, latency, USD, rubric pass
2. **Shadow A/B** — output Δ%, prompt chars, latency, cost (ponytail pre-treatment)
3. **Experiment windows** — baseline vs treatment for EXP-20260802
4. **Recent runs** — last 15 entries with rubric join

## Ponytail experiment (baseline active)

| Metric | Pass hint |
|--------|-----------|
| Output tokens / repo | Treatment ≤ baseline (−10% on shadow) |
| Prompt chars / input tok | Track structured-context overhead |
| Enrich chars | Context-fidelity cost outside the model |
| Latency ms / repo | Informational |
| Rubric rank-1 | Pass rate stable; why_now + specificity ≥ 4 |
| Est. USD / digest | Should drop if output tokens drop |

## Operator commands

```bash
# Production baseline (automatic in GHA)
EXPERIMENT_ID=EXP-20260802-ponytail-narration-skills npm run digest -- --edition skills

# Shadow pre-treatment (all measures)
EXPERIMENT_ID=EXP-20260802-ponytail-narration-skills \
DIGEST_ENRICH_WEB=1 DIGEST_ENRICH_SHADOW=1 \
DIGEST_NARRATE_STRUCTURED_CONTEXT=1 DIGEST_NARRATE_PONYTAIL=1 \
npm run digest -- --edition skills

npm run build:pages
```

Raw logs: `data/quality/token-usage.jsonl`, `data/quality/rubric-scores.jsonl`.
