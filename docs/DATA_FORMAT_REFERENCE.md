# Data Format Reference — AI Tastemakers

## Snapshot record (`data/snapshots/repos.jsonl`)

One JSON object per line, append-only.

```json
{
  "full_name": "owner/repo",
  "stars": 1234,
  "observed_at": "2026-06-06T14:00:00.000Z"
}
```

## Digest envelope (`briefings/YYYY-MM-DD/digest.json`)

```json
{
  "schema_version": 1,
  "run_id": "uuid",
  "generated_at": "2026-06-06T14:00:00.000Z",
  "ranking_mode": "delta_7d",
  "topic_queries": ["llm", "ai-agent", "mcp", "openai", "claude", "langchain", "ai-tools"],
  "repos": []
}
```

`ranking_mode`: `"delta_7d"` | `"bootstrap_total_stars"` | `"bootstrap_since_first_seen"`

## Digest repo entry (`repos[]`)

```json
{
  "rank": 1,
  "full_name": "owner/repo",
  "html_url": "https://github.com/owner/repo",
  "stars": 1234,
  "stars_gained_7d": 89,
  "topics": ["llm", "mcp"],
  "language": "TypeScript",
  "brief": "Two to three sentences from Claude.",
  "pushed_at": "2026-06-01T12:00:00Z",
  "is_new": true
}
```

`brief` may be `null` if narration failed.

`is_new` is `true` when the repo has **never** appeared in any prior daily digest for this edition (all `digest.json` dates before today). Omitted or `false` when the repo was featured on an earlier date. Independent of `DIGEST_SOFT_DEDUP_BRIEFINGS`, which affects ranking penalty only.

## Markdown briefing (`briefings/YYYY-MM-DD/daily_brief.md`)

Derived from digest JSON. Structure:

```markdown
# AI Tastemakers — Daily Brief — 2026-06-06

_Ranking: delta_7d · 10 repos · generated 2026-06-06T14:00:00Z_

## 1. owner/repo — optional `<span class="new-repo-badge">New</span>` when `is_new`

https://github.com/owner/repo · ★ 1234 (+89 this week) · llm, mcp

**What it does:** One or two sentences on what the repo is.

**Why now:** One or two sentences on why it's relevant this week.

**Build with it:** One or two sentences on what a builder could do with it.
```

Older briefings may use a single dense paragraph (legacy format).

## Weekly review envelope (`briefings/weekly/YYYY-Www/weekly_review.json`)

```json
{
  "schema_version": 1,
  "week_id": "2026-W23",
  "week_start": "2026-06-01",
  "week_end": "2026-06-07",
  "days_covered": { "oss": 7, "skills": 7 },
  "stats": {
    "unique_repos": { "oss": 42, "skills": 38 },
    "total_stars_gained": { "oss": 1200, "skills": 800 },
    "top_topics": { "oss": ["llm", "mcp"], "skills": ["ai-skill"] },
    "repeat_repos": { "oss": [{ "full_name": "owner/repo", "days_appeared": 2 }], "skills": [] },
    "cross_edition_overlap": ["owner/repo"],
    "ranking_modes": ["delta_7d"],
    "standouts": { "oss": [], "skills": [] }
  },
  "narrative": {
    "opening": "…",
    "oss": "…",
    "skills": "…",
    "cross_lane": "…",
    "takeaway": "…"
  },
  "generated_at": "2026-06-07T14:00:00.000Z"
}
```

Stats are computed from daily `digest.json` files. `total_stars_gained` sums each unique repo's **max** `stars_gained_7d` seen that week (avoids double-counting repeat appearances). Narrative is Claude-generated from aggregated stats + standouts (not full daily brief text). If synthesis fails, a stats-only fallback opening is written.

## Weekly markdown (`briefings/weekly/YYYY-Www/weekly_review.md`)

```markdown
# Tastemakers Weekly — 2026-W23

_2026-06-01 – 2026-06-07 · generated …_

## Week at a glance
- **AI Tastemakers:** …
- **Skill Tastemakers:** …

## Opening
…

## AI Tastemakers
…
```

Published as `site/weekly/YYYY-Www.html` via `npm run build:pages`.

## Monthly review envelope (`briefings/monthly/YYYY-MM/monthly_review.json`)

```json
{
  "schema_version": 1,
  "month_id": "2026-06",
  "month_start": "2026-06-01",
  "month_end": "2026-06-30",
  "source_week_ids": ["2026-W23", "2026-W24", "2026-W25"],
  "month_stats": {
    "total_stars_gained": { "oss": 1350, "skills": 900 },
    "top_topics": { "oss": ["llm", "mcp"], "skills": ["ai-skill"] },
    "source_week_ids": ["2026-W23", "2026-W24", "2026-W25"]
  },
  "narrative": {
    "opening": "…",
    "oss": "…",
    "skills": "…",
    "cross_lane": "…",
    "takeaway": "…"
  },
  "generated_at": "2026-06-22T14:00:00.000Z"
}
```

Stats sum weekly `total_stars_gained` per edition (no cross-week repo dedupe). Narrative is Claude-generated from weekly `narrative` text + `month_stats` (not concatenation). Runs on the **fourth Sunday** of each month; replaces that week's weekly artifact.

## Monthly markdown (`briefings/monthly/YYYY-MM/monthly_review.md`)

```markdown
# Tastemakers Monthly — 2026-06

_2026-06-01 – 2026-06-30 · generated …_

## Month at a glance
- **AI Tastemakers:** …
- **Skill Tastemakers:** …

## Opening
…
```

Published as `site/monthly/YYYY-MM.html` via `npm run build:pages`.

## GitHub Search → candidate (internal)

Maps GitHub API `items[]` fields: `full_name`, `html_url`, `stargazers_count` → `stars`, `topics`, `description`, `pushed_at`, `language`, `fork`, `archived`.

## Claude prompt input (internal)

Structured text block: name, description, topics, stars, delta, readme excerpt (max 4000 chars).

## Conversions

| From | To | Rule |
|------|-----|------|
| GitHub ISO timestamps | stored ISO string | pass-through |
| README base64 (API) | utf-8 excerpt | decode, truncate 4000 |
| Negative star delta | ranking | exclude from top 10 |
| Missing 7d snapshot | ranking_mode | bootstrap per design_decisions |
| 7× daily digest.json (×2 editions) | weekly_review.json stats | aggregate in `weekly/aggregate.ts` |
| weekly_review.json (×2+ in month) | monthly_review.json month_stats | sum in `monthly/aggregate.ts` |
| weekly_review.narrative | monthly_review narrative | Claude synthesis in `narrate/monthly.ts` |
| daily repo.brief | weekly standouts excerpt | parse `**What it does:**` first sentence |

## Tool inventory (`data/tool-inventory.json`)

Generated by `npm run inventory:tools`.

```json
{
  "schema_version": 1,
  "generated_at": "2026-06-28T12:00:00.000Z",
  "scan_sources": ["briefings/2026-06-27/digest.json"],
  "entries": [
    {
      "full_name": "chopratejas/headroom",
      "html_url": "https://github.com/chopratejas/headroom",
      "topics": ["compression", "mcp"],
      "capability_tags": ["compression", "mcp"],
      "pipeline_roles": ["compaction", "token-optimization", "agent-tooling"],
      "appearance_count": 18,
      "first_seen": "2026-06-07",
      "last_seen": "2026-06-27",
      "recommendation": "dogfood-candidate",
      "notes": ""
    }
  ]
}
```

`capability_tags` and `pipeline_roles` are derived from topics + brief keywords on each scan. Operator may set `recommendation` and `notes`; re-scan preserves those fields.

Human-readable report: `briefings/lab/tool-inventory.md` → `site/lab/tools.html`.

## Experiment record (`data/experiments/EXP-*.json`)

Copy from `data/experiments/_template.json`.

```json
{
  "schema_version": 1,
  "id": "EXP-20260628-web-enrich-skills",
  "hypothesis": "README+web context improves outbound CTR on Skills briefs.",
  "change_summary": "Post-rank web/HN snippet enrichment for top 3 repos.",
  "status": "draft",
  "edition": "skills",
  "baseline_window": { "start": "2026-06-28", "end": "2026-07-12" },
  "treatment_window": { "start": "2026-07-13", "end": "2026-07-20" },
  "change": { "flags": { "DIGEST_ENRICH_WEB": "1", "DIGEST_ENRICH_SHADOW": "0" } },
  "snapshots": [],
  "shadow_runs": [],
  "verdict": "",
  "keep_change": null,
  "notes": ""
}
```

`status`: `draft` → `baseline` → `active` → `complete`.

Shipped experiments removed from the dashboard are moved to `data/experiments/archive/EXP-*.json` (see [archive README](../data/experiments/archive/README.md)).

## Shadow run (`data/experiments/runs/{run_id}/shadow.json`)

Written when `DIGEST_ENRICH_SHADOW=1`. Captures ranked repos and briefs for human review; does not write to `briefings/`.

```json
{
  "run_id": "uuid",
  "date": "2026-06-28",
  "edition": "skills",
  "enrich_web_requested": true,
  "generated_at": "2026-06-28T16:48:57.399Z",
  "ranking_mode": "delta_7d",
  "repos": [
    {
      "rank": 1,
      "full_name": "owner/repo",
      "html_url": "https://github.com/owner/repo",
      "brief_control": "**What it does:** … (README only)",
      "brief_treatment": "**What it does:** … (README + web/HN)",
      "enrichment_bundle_ref": "owner-repo.json",
      "is_new": false
    }
  ]
}
```

When `enrich_web_requested` is false, repos use a single `brief` field (legacy).

Per-repo bundle files (`owner-repo.json`) in the same run directory:

```json
{
  "full_name": "owner/repo",
  "sources": [{ "kind": "web", "label": "Web (Jina Reader)", "text": "…" }],
  "combined_text": "[Web (Jina Reader)]\n…",
  "fetched_at": "ISO8601",
  "errors": []
}
```

Human review uses [briefings/lab/shadow-rubric.md](../briefings/lab/shadow-rubric.md).
