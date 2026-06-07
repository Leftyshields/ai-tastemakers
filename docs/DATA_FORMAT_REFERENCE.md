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
  "pushed_at": "2026-06-01T12:00:00Z"
}
```

`brief` may be `null` if narration failed.

## Markdown briefing (`briefings/YYYY-MM-DD/daily_brief.md`)

Derived from digest JSON. Structure:

```markdown
# AI Tastemakers — Daily Brief — 2026-06-06

_Ranking: delta_7d · 10 repos · generated 2026-06-06T14:00:00Z_

## 1. owner/repo

https://github.com/owner/repo · ★ 1234 (+89 this week) · llm, mcp

Claude brief paragraph here.
```

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
