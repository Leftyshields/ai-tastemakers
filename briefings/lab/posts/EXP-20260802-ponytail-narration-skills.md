# Ponytail narration — W31-inspired experiment

_EXP-20260802-ponytail-narration-skills. Treatment started 2026-08-16 PT; first treatment digest 2026-08-17._

## Why this experiment

The [W31 weekly takeaway](../../weekly/2026-W31/weekly_review.md#builder-takeaway) distilled four signals from July's agent-tooling momentum:

| Signal | Repo exemplar | Pipeline translation |
|--------|---------------|----------------------|
| Context fidelity | Graphify-Labs/graphify | Tiered context graph in Claude prompt — README ground truth before web/HN signals |
| Runtime isolation | citrolabs/ego-lite, stablyai/orca | Not directly applicable to digest narration (future Lab topic) |
| Ponytail discipline | DietrichGebert/ponytail | YAGNI constraints — one integration path, no architecture sprawl |
| Runnable docs | bojieli/ai-agent-book | This post: copy-paste commands you can run locally |

We already enrich Skills briefs with Firecrawl + HN/Reddit (`DIGEST_ENRICH_WEB=1`). The open question is whether **how we present context to Claude** and **how tightly we constrain the model** improves brief quality without losing timely hooks.

## Onboarding

Two opt-in flags change narration only — ranking, discovery, and enrichment are unchanged:

### `DIGEST_NARRATE_STRUCTURED_CONTEXT=1`

Replaces the flat repo blob with a **priority-ordered context graph**:

1. **Ground truth — README** (capabilities)
2. **Repo metadata** (stars, topics, language)
3. **Timely signals** (web/HN/Reddit — **Why now only**)

This mirrors Graphify's structured-memory idea: separate durable facts from ephemeral signals instead of dumping a single external-context paragraph.

### `DIGEST_NARRATE_PONYTAIL=1`

Adds **ponytail constraints** to the editorial rules:

- One sentence per section when possible
- **Build with it**: exactly one integration step — no multi-tool stacks
- No architectures or "production-ready" setups the README doesn't mention
- Shorter `max_tokens` (350 vs 450)

## Expected outcome

**Hypothesis:** Structured context tiers + ponytail YAGNI constraints improve shadow-rubric scores on **specificity** and **build_with_it** without losing **why_now** timeliness — blurbs stay accurate but become shorter and more actionable.

We expect treatment blurbs to:

- Cite HN/Reddit hooks in **Why now** as often as control
- Name a single concrete integration in **Build with it** (not a three-tool workflow)
- Drop vague architecture advice ("build a production pipeline around…")

## Runnable pre-treatment shadow run

Requires `GITHUB_TOKEN`, `ANTHROPIC_API_KEY`, and optionally `FIRECRAWL_API_KEY` for enrichment.

```bash
# Side-by-side: control = default prompt + enrich; treatment = structured + ponytail + enrich
EXPERIMENT_ID=EXP-20260802-ponytail-narration-skills \
DIGEST_ENRICH_WEB=1 \
DIGEST_ENRICH_SHADOW=1 \
DIGEST_NARRATE_STRUCTURED_CONTEXT=1 \
DIGEST_NARRATE_PONYTAIL=1 \
npm run digest -- --edition skills
```

Output lands in `data/experiments/runs/{run_id}/`:

- `shadow.json` — `brief_control` vs `brief_treatment` per repo (`narrate_ponytail_requested: true`)
- `{owner-repo}.json` — enrichment bundles for audit

Score with the [shadow rubric](../shadow-rubric.md). Record results in `{run_id}/rubric.json` and append the run to the experiment JSON via git.

### Optional: rank-1 rubric log during treatment

```bash
DIGEST_QUALITY_RUBRIC=1 \
DIGEST_NARRATE_STRUCTURED_CONTEXT=1 \
DIGEST_NARRATE_PONYTAIL=1 \
npm run digest -- --edition skills
```

Appends to `data/quality/rubric-scores.jsonl`.

## Measurement plan

| Priority | Metric | Success bar |
|----------|--------|-------------|
| 1 | **Output tokens / repo** (shadow) | Treatment ≤ control (−10% or better) — see [Token dashboard](../token-usage.html) |
| 2 | **Output words / repo** (shadow) | Treatment shorter; no rubric accuracy drop |
| 3 | Shadow rubric (top-3 enriched repos) | Median specificity + build_with_it ≥ 4; no accuracy ≤ 2 |
| 4 | Quality rubric log | Rank-1 pass rate stable or up vs baseline window |
| 5 | Narration failures | `repos_failed` unchanged in token log |

Engagement analytics (PostHog clicks, pageviews) are **out of scope** for this experiment — functional cost + quality only.

Token telemetry logs automatically to `data/quality/token-usage.jsonl` on every digest run and surfaces on the public [Token usage](/lab/token-usage.html) page after `npm run build:pages`.

### Windows

| Phase | Dates (PT) |
|-------|------------|
| **Baseline** | **2026-08-02 → 2026-08-16** (2026-08-16 digest published as control) |
| **Treatment (active)** | **2026-08-17 → 2026-08-29** |

Baseline ran production narration (enrichment on, ponytail flags off). Treatment enables both flags on the Skills digest command only, starting with the **2026-08-17** run.

## Baseline outcome

Fourteen Skills production runs (2026-08-03 through 2026-08-16) in `data/quality/token-usage.jsonl`:

| Metric | Result |
|--------|--------|
| Mean output tokens / run | ~2005 |
| Mean output words / run | ~1239 |
| Rank-1 quality rubric | 14 / 14 pass |
| `structured_context` / `ponytail` flags | Off every run |
| Pre-treatment shadow run | Not stored |

That is the control picture. Treatment success is a drop in output tokens and words **without** a rubric or Why-now regression. Compare on the [Token dashboard](../token-usage.html) after each daily Skills digest.

## Recommendation (in progress)

Treatment is live on Skills. At window end (2026-08-29): **keep both flags** if tokens/words drop and rank-1 still passes with timely Why-now hooks. If Why now loses HN/Reddit hooks, revert ponytail first and keep structured context alone. OSS stays on the default prompt until Skills earns a keep.

## References

- Experiment ID: `EXP-20260802-ponytail-narration-skills`
- W31 takeaway: [weekly/2026-W31](../../weekly/2026-W31/weekly_review.md)
- Pipeline flags: `DIGEST_NARRATE_STRUCTURED_CONTEXT`, `DIGEST_NARRATE_PONYTAIL`
- Prior art: [EXP-20260628-web-enrich-skills](./EXP-20260628-web-enrich-skills.md) (enrichment layer this experiment builds on)
- Lab dashboard: [/lab/experiments.html](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html)
