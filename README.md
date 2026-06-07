# AI Tastemakers

**Daily intelligence on AI-derivative open source** — discovers trending GitHub repos, ranks by 7-day star momentum, and writes curated briefings with Claude narratives.

**Skill Tastemakers** is a companion edition focused on agent skills, Claude Code extensions, and reusable instruction artifacts.

Instantiated from [Project Genesis](https://github.com/Leftyshields/project-genesis) for structured AI-assisted development.

**Live site:** https://leftyshields.github.io/ai-tastemakers/ · **Skills:** https://leftyshields.github.io/ai-tastemakers/skills/

---

## What it does

Each daily run (both editions):

1. Searches GitHub by topic queries (`llm`, `ai-agent`, `mcp`, … or skill-focused topics for the skills edition)
2. Ranks by stars gained in the last 7 days (bootstrap fallback during the first week)
3. Sends top 10 to Claude for scannable briefs with three sections: **What it does:** / **Why now:** / **Build with it:**
4. Writes `briefings/<edition>/YYYY-MM-DD/daily_brief.md` + `digest.json`
5. Optionally emails subscribers (Resend) and deploys to GitHub Pages

### Editions

| Edition | CLI | Output | Site |
|---------|-----|--------|------|
| AI Tastemakers (OSS) | `npm run digest` | `briefings/YYYY-MM-DD/` | `/` |
| Skill Tastemakers | `npm run digest:skills` | `briefings/skills/YYYY-MM-DD/` | `/skills/` |

---

## Quick start

```bash
npm install
cp .env.example .env   # GITHUB_TOKEN, ANTHROPIC_API_KEY
npm run digest           # OSS edition
npm run digest:skills    # Skills edition (optional)
npm run build:pages      # static site from briefings/
```

Open today's briefing under `briefings/`, or the public site after Pages deploy.

**Production verification:** Prefer `gh workflow run "Daily Digest"` over re-running locally on a day that already has a briefing — same-day re-runs can affect rankings. See [docs/DEV_RUNBOOK.md](docs/DEV_RUNBOOK.md).

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run digest` | Run OSS digest pipeline |
| `npm run digest:skills` | Run Skill Tastemakers pipeline |
| `npm run test:digest` | Unit + integration tests (44) |
| `npm run build:digest` | Compile TypeScript |
| `npm run build:pages` | Build static site from `briefings/` → `site/` (Tailwind CSS) |
| `npm test` | Genesis framework tests |

---

## Scheduling & deploy

**Daily Digest** (`.github/workflows/digest.yml`) runs both editions at ~06:00 Pacific (cron + manual `workflow_dispatch`).

Required repo secret: `ANTHROPIC_API_KEY`. `GITHUB_TOKEN` uses the default Actions token for public search.

Optional:

- **Email:** `RESEND_API_KEY`, `DIGEST_EMAIL_FROM`, `DIGEST_EMAIL_TO`
- **Subscribers:** `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (Firestore list)
- **Subscribe page:** `FIREBASE_API_KEY`, `FIREBASE_APP_ID` (Pages workflow)

**Deploy GitHub Pages** (`.github/workflows/pages.yml`) builds the site on push to `briefings/`, edition scripts, or manual dispatch.

```bash
gh workflow run "Daily Digest" --repo Leftyshields/ai-tastemakers
gh workflow run "Deploy GitHub Pages" --repo Leftyshields/ai-tastemakers
```

---

## Status

| Milestone | Issue | Notes |
|-----------|-------|-------|
| v1 pipeline + GHA + Pages | [EPH-20260606-DIG1](docs/CLOSURE_EPH-20260606-DIG1.md) | Shipped 2026-06-07 |
| Copy + brief format | [EPH-20260607-COPY](docs/CLOSURE_EPH-20260607-COPY.md) | Three-subhead briefs, homepage copy, email bold rendering |

**Repo:** https://github.com/Leftyshields/ai-tastemakers

---

## Docs

| Doc | Purpose |
|-----|---------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Module layout and CLI entry points |
| [docs/DEV_RUNBOOK.md](docs/DEV_RUNBOOK.md) | Ops, troubleshooting, GHA |
| [docs/DATA_FORMAT_REFERENCE.md](docs/DATA_FORMAT_REFERENCE.md) | JSON/markdown schemas |
| [docs/PRODUCT_VS_GENOME_MISSION.md](docs/PRODUCT_VS_GENOME_MISSION.md) | Product vs `.genome/` |
| [Genesis workflow course](https://github.com/Leftyshields/project-genesis/blob/main/docs/WORKFLOW_COURSE.md) | Case studies from this project's development |

---

## Genesis framework

This repo also includes the Project Genesis organism runtime (`lib/`, `.genome/`):

```bash
node scripts/run-path.js .genome/mission.md
```

---

## License

MIT. See [LICENSE](LICENSE).
