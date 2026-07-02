# Architecture — AI Tastemakers

## Overview

AI Tastemakers is a **batch CLI pipeline** (no HTTP server) that produces daily GitHub AI-derivative repo briefings, weekly/monthly rollups, and a static GitHub Pages site. Product code lives in `src/tastemaker/`. The Genesis organism runtime (`lib/`, `.genome/`) is separate framework infrastructure.

EPH-20260628-SRCH adds a **Lab** layer: tool inventory from briefing history, PostHog analytics, file-based experiments, and static `/lab/` reporting pages — without changing GitHub discovery.

## Module layout

```
ai-tastemakers/
├── src/tastemaker/           # Product digest pipeline
│   ├── cli.ts                # Daily digest entry
│   ├── inventory-cli.ts      # Scan briefings → tool inventory
│   ├── pipeline.ts           # Orchestration
│   ├── config.ts
│   ├── github/               # Search, enrich, client
│   ├── inventory/            # Tool scan, classify, merge (EPH-20260628-SRCH)
│   ├── enrich/               # Web/HN post-rank enrichment (Jina + HN Algolia)
│   ├── experiments/          # Experiment registry, snapshot import, shadow output
│   ├── experiments-cli.ts    # list | register | snapshot
│   ├── experiment-reminders-cli.ts  # lifecycle reminder emails (EPH-20260702-MAIL)
│   ├── experiment-reminders.ts
│   ├── snapshot/             # jsonl store, delta math
│   ├── rank/                 # filter, score, top-N
│   ├── narrate/              # Claude client (daily briefs + weekly/monthly synthesis)
│   ├── weekly/               # Week window, load digests, aggregate stats
│   ├── monthly/              # Month window, load weekly reviews, aggregate stats
│   ├── weekly-cli.ts         # Weekly wrap-up entry
│   ├── monthly-cli.ts        # Monthly rollup entry
│   └── writers/              # markdown + json (daily + weekly + monthly)
├── data/
│   ├── snapshots/            # repos.jsonl (star history)
│   ├── tool-inventory.json   # Generated tool candidate matrix
│   └── experiments/          # Experiment JSON + shadow run output
├── briefings/                # Daily + weekly + monthly + lab markdown
├── site/                     # Static GitHub Pages output
│   └── lab/                  # Inventory, experiments, posts
├── scripts/
│   ├── build-pages.ts        # Site generator (+ lab pages)
│   └── edition-pages.ts      # Page shell, PostHog snippet at build time
├── .github/workflows/        # digest.yml, pages.yml, experiment-reminders.yml
├── lib/                      # Genesis runtime (unchanged)
└── docs/
```

## Entry points

| Environment | Entry | How to run |
|-------------|-------|------------|
| Local dev | `src/tastemaker/cli.ts` | `npm run digest` |
| Local dev | `src/tastemaker/weekly-cli.ts` | `npm run weekly` |
| Local dev | `src/tastemaker/monthly-cli.ts` | `npm run monthly` |
| Local dev | `src/tastemaker/inventory-cli.ts` | `npm run inventory:tools` |
| Local dev | `src/tastemaker/experiments-cli.ts` | `npm run experiment -- list|register|snapshot` |
| Local dev | `src/tastemaker/experiment-reminders-cli.ts` | `npm run experiment:reminders [-- --dry-run] [-- --date YYYY-MM-DD]` |
| GitHub Actions | `.github/workflows/digest.yml` | daily digest + Sunday weekly or fourth-Sunday monthly |
| GitHub Actions | `.github/workflows/experiment-reminders.yml` | daily experiment lifecycle reminder email (07:00 PT) |
| GitHub Actions | `.github/workflows/pages.yml` | static site deploy |

**Parity:** GHA invokes the same npm scripts as local dev. Enrichment experiment flags (`DIGEST_ENRICH_*`) default **off** in production until operator enables after baseline window.

## External services

| Service | Usage | Auth |
|---------|-------|------|
| GitHub REST | Search repositories, get repo, get README | `GITHUB_TOKEN` |
| Anthropic Messages API | Daily repo briefs + weekly/monthly synthesis | `ANTHROPIC_API_KEY` |
| PostHog | Pageviews + `outbound_repo_click` on GitHub Pages | Public script; `POSTHOG_KEY` + `POSTHOG_HOST` at build time |
| Jina Reader | Post-rank web snippet fetch (`r.jina.ai/{url}`) | No key for basic use |
| HN Algolia | Post-rank story search by repo name | Public API |
| Firebase | Subscribe/unsubscribe + digest recipients only | epiphoric-prod |
| Resend | Daily digest BCC, digest-verify ops alerts, experiment lifecycle reminders | `RESEND_API_KEY`, `DIGEST_EMAIL_FROM`; recipients via Firestore, `DIGEST_ALERT_TO`, or `EXPERIMENT_REMINDER_TO` |

## Data flow

```
Daily:
GitHub Search (topics) → dedupe candidates → filter/enrich
  → append snapshot jsonl → rank by 7d delta → [optional external enrich] → Claude narrate top 10
  → write briefings/YYYY-MM-DD/daily_brief.md + digest.json
  (skills edition: briefings/skills/YYYY-MM-DD/)

Inventory (on demand):
Scan briefings/**/digest.json + weekly JSON → classify → data/tool-inventory.json
  → briefings/lab/tool-inventory.md → site/lab/tools.html

Weekly / Monthly: (unchanged)
  → build:pages → site/

Site:
npm run build:pages → site/ (+ lab/) → GitHub Pages
```

## Security

- Secrets in `.env` or GitHub Actions secrets only; never written to briefing or experiment artifacts
- GitHub token: public repo read scope sufficient
- `/lab/` experiment JSON is public — no secrets in committed records
- No user auth, no HTTP API surface

## Web → API

**N/A** — static site + batch CLI only.

See [DATA_FORMAT_REFERENCE.md](DATA_FORMAT_REFERENCE.md) for file schemas.
