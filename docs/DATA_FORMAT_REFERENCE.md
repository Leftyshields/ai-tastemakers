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

`is_new` is `true` when the repo was not in any of the recent prior daily briefings (window: `DIGEST_SOFT_DEDUP_BRIEFINGS`, default 5). Omitted or `false` for repeat picks.

## Markdown briefing (`briefings/YYYY-MM-DD/daily_brief.md`)

Derived from digest JSON. Structure:

```markdown
# AI Tastemakers — Daily Brief — 2026-06-06

_Ranking: delta_7d · 10 repos · generated 2026-06-06T14:00:00Z_

## 1. owner/repo · **NEW**

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
| daily repo.brief | weekly standouts excerpt | parse `**What it does:**` first sentence |
