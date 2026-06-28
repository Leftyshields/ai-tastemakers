# Shadow diff rubric

Use when reviewing `data/experiments/runs/{run_id}/shadow.json` before enabling treatment (`DIGEST_ENRICH_WEB=1` without shadow).

Score each ranked repo **1–5** on:

| Criterion | 1 (poor) | 5 (strong) |
|-----------|----------|------------|
| **Accuracy** | Treatment adds false claims vs README | Treatment matches repo capabilities |
| **Specificity** | Generic hype; could apply to any repo | Concrete names, features, or use cases |
| **Why now** | No timely hook | Clear momentum signal (launch, HN, trend) |
| **Build with it** | Vague “use this tool” | Actionable integration path for a builder |
| **Noise** | Web/HN snippets led model astray | External context helped or was ignored appropriately |

## Pass bar

- **Go:** median ≥ 4 on accuracy + specificity; no repo below 3 on accuracy
- **No-go:** any accuracy ≤ 2, or median specificity < 3

Record scores in experiment `notes` or commit `data/experiments/runs/{run_id}/rubric.json`:

```json
{
  "reviewed_at": "2026-06-28",
  "reviewer": "operator",
  "repos": [
    {
      "full_name": "owner/repo",
      "accuracy": 4,
      "specificity": 4,
      "why_now": 5,
      "build_with_it": 4,
      "noise": 4,
      "comment": "HN thread correctly cited launch week."
    }
  ],
  "decision": "go"
}
```

## Side-by-side fields

When `enrich_web_requested` is true, each repo entry includes:

- `brief_control` — README-only narration
- `brief_treatment` — README + web/HN snippets
- `enrichment_bundle_ref` — `{owner-repo}.json` in the same run directory

Compare control vs treatment before scoring treatment-only repos.
