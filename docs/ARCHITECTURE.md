# Architecture — AI Tastemakers

## Overview

AI Tastemakers v1 is a **batch CLI pipeline** (no HTTP server) that produces daily GitHub AI-derivative repo briefings. Product code lives in `src/tastemaker/`. The Genesis organism runtime (`lib/`, `.genome/`) is separate framework infrastructure.

## Module layout

```
ai-tastemakers/
├── src/tastemaker/           # Product digest pipeline
│   ├── cli.ts                # Entry point
│   ├── pipeline.ts           # Orchestration
│   ├── config.ts
│   ├── github/               # Search, enrich, client
│   ├── snapshot/             # jsonl store, delta math
│   ├── rank/                 # filter, score, top-N
│   ├── narrate/              # Claude client (daily briefs + weekly/monthly synthesis)
│   ├── weekly/               # Week window, load digests, aggregate stats
│   ├── monthly/              # Month window, load weekly reviews, aggregate stats
│   ├── weekly-cli.ts         # Weekly wrap-up entry
│   ├── monthly-cli.ts        # Monthly rollup entry
│   └── writers/              # markdown + json (daily + weekly + monthly)
├── data/snapshots/           # repos.jsonl (star history)
├── briefings/                # Daily + weekly output artifacts
├── .github/workflows/        # digest.yml scheduler
├── lib/                      # Genesis runtime (unchanged)
└── docs/
```

## Entry points

| Environment | Entry | How to run |
|-------------|-------|------------|
| Local dev | `src/tastemaker/cli.ts` | `npm run digest` |
| Local dev | `src/tastemaker/weekly-cli.ts` | `npm run weekly` |
| Local dev | `src/tastemaker/monthly-cli.ts` | `npm run monthly` |
| GitHub Actions | `.github/workflows/digest.yml` | daily digest + Sunday weekly or fourth-Sunday monthly |

**Parity:** GHA invokes the same `npm run digest`, `npm run weekly`, and `npm run monthly` — Sunday gate uses `scripts/sunday-wrap-gate.mjs` (plain Node, no npm install required).

## External services

| Service | Usage | Auth |
|---------|-------|------|
| GitHub REST | Search repositories, get repo, get README | `GITHUB_TOKEN` |
| Anthropic Messages API | Daily repo briefs + weekly/monthly synthesis | `ANTHROPIC_API_KEY` |

## Data flow

```
Daily:
GitHub Search (topics) → dedupe candidates → filter/enrich
  → append snapshot jsonl → rank by 7d delta → Claude narrate top 10
  → write briefings/YYYY-MM-DD/daily_brief.md + digest.json
  (skills edition: briefings/skills/YYYY-MM-DD/)

Weekly (Sundays 1–3, after daily):
Load 7× digest.json (OSS + Skills) → aggregate stats in TypeScript
  → Claude synthesize one combined editorial
  → write briefings/weekly/YYYY-Www/weekly_review.{md,json}
  → build:pages → site/weekly/YYYY-Www.html

Monthly (fourth Sunday of month, after daily):
Load prior weekly_review.json in same calendar month → aggregate month stats
  → Claude synthesize month-level editorial from weekly narratives
  → write briefings/monthly/YYYY-MM/monthly_review.{md,json}
  → build:pages → site/monthly/YYYY-MM.html
  (no weekly artifact for that ISO week)
```

## Security

- Secrets in `.env` only; never written to briefing artifacts
- GitHub token: public repo read scope sufficient
- No user auth, no HTTP surface in v1

## Web → API

**N/A** — v1 has no web client or API.

See [DATA_FORMAT_REFERENCE.md](DATA_FORMAT_REFERENCE.md) for file schemas.
