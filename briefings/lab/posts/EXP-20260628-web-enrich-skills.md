# Web/HN enrichment — first experiment cycle

_Onboarding and methodology for EXP-20260628-web-enrich-skills. Metrics verdict pending baseline window._

## Onboarding

We added **post-rank, pre-narrate enrichment** to the Skills digest pipeline. After GitHub discovery and README fetch, the top three ranked repos can receive extra context from:

- **Jina Reader** — plain-text fetch of the repo’s GitHub page
- **Hacker News Algolia** — recent story hits for the repo name

That context is merged, truncated (`DIGEST_ENRICH_MAX_CHARS`), and passed to Claude as an optional block after the README excerpt. Ranking and discovery are unchanged.

**Shadow mode** (`DIGEST_ENRICH_SHADOW=1`) narrates twice — control (README only) vs treatment (README + external) — and writes side-by-side diffs under `data/experiments/runs/{run_id}/` without touching published briefings.

## Expected outcome

**Hypothesis:** Post-rank web/HN enrichment improves outbound repo click rate on Skills editions without hurting digest quality.

We expect treatment blurbs to cite timely hooks (launches, HN threads) more often while staying accurate to the README. If click-through rises after a treatment window and shadow rubric scores pass, we keep the change for Skills and consider OSS later.

## What happened (so far)

| Phase | Status | Notes |
|-------|--------|-------|
| Inventory + Lab UI | Shipped | Tool matrix, experiments dashboard, Lab writeup |
| PostHog baseline | **In progress** | 2026-06-28 → 2026-07-11 |
| Enrich module (E) | Shipped | Jina + HN adapter, side-by-side shadow JSON |
| Shadow run | Done (plumbing) | `bfb156a9-…` pre-enrich-module; re-run with E for rubric |
| Treatment window | Pending | After baseline + rubric go |
| Verdict | Pending | Import PostHog snapshots after both windows |

### Re-run shadow with enrichment

```bash
EXPERIMENT_ID=EXP-20260628-web-enrich-skills \
DIGEST_ENRICH_WEB=1 \
DIGEST_ENRICH_SHADOW=1 \
npm run digest:skills
```

Review `data/experiments/runs/{run_id}/shadow.json` using [shadow rubric](../shadow-rubric.md).

### Import metrics (after windows)

```bash
npm run experiment -- snapshot EXP-20260628-web-enrich-skills --csv path/to/posthog-export.csv
npm run build:pages
```

## Recommendation

**Pending.** Do not enable production treatment until:

1. Baseline snapshot imported (≥ 2026-07-11)
2. Shadow rubric **go** on a post-E run
3. Treatment window completes with second snapshot

If CTR flat and rubric passes, keep enrichment for Skills only. If quality fails rubric, revert flags and document learnings here.

## References

- Experiment ID: `EXP-20260628-web-enrich-skills`
- Lab dashboard: [/lab/experiments.html](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html)
- Shadow rubric: [briefings/lab/shadow-rubric.md](https://github.com/Leftyshields/ai-tastemakers/blob/main/briefings/lab/shadow-rubric.md)
- Pipeline flags: `DIGEST_ENRICH_WEB`, `DIGEST_ENRICH_SHADOW`, `DIGEST_ENRICH_MAX_REPOS`, `DIGEST_ENRICH_MAX_CHARS`
