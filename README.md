# AI Tastemakers

**Daily intelligence on AI-derivative open source** — discovers trending GitHub repos, ranks by 7-day star momentum, and writes a curated markdown briefing with Claude narratives.

Instantiated from [Project Genesis](https://github.com/Leftyshields/project-genesis) for structured AI-assisted development.

---

## Daily digest (v1)

Each run:

1. Searches GitHub by AI topics (`llm`, `ai-agent`, `mcp`, …)
2. Ranks by stars gained in the last 7 days (bootstrap fallback first week)
3. Sends top 10 to Claude for 2–3 sentence briefs
4. Writes `briefings/YYYY-MM-DD/daily_brief.md` + `digest.json`

### Setup

```bash
npm install
cp .env.example .env   # add GITHUB_TOKEN and ANTHROPIC_API_KEY
npm run digest
```

Open `briefings/<today>/daily_brief.md`, or the public site (after Pages deploy):

**https://leftyshields.github.io/ai-tastemakers/**

### Commands

| Command | Description |
|---------|-------------|
| `npm run digest` | Run the daily pipeline |
| `npm run test:digest` | Unit + integration tests |
| `npm run build:digest` | Compile TypeScript |
| `npm run build:pages` | Build static site from `briefings/` → `site/` |
| `npm test` | Genesis framework tests |

### Scheduling

GitHub Actions runs daily at 06:00 Pacific (`.github/workflows/digest.yml`). Requires repo secrets:

- `GITHUB_TOKEN` (default Actions token works for public search)
- `ANTHROPIC_API_KEY`

---

## Docs

| Doc | Purpose |
|-----|---------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Module layout and CLI entry points |
| [docs/DEV_RUNBOOK.md](docs/DEV_RUNBOOK.md) | Ops and troubleshooting |
| [docs/DATA_FORMAT_REFERENCE.md](docs/DATA_FORMAT_REFERENCE.md) | JSON/markdown schemas |
| [docs/PRODUCT_VS_GENOME_MISSION.md](docs/PRODUCT_VS_GENOME_MISSION.md) | Product vs `.genome/` |

---

## Genesis framework

This repo also includes the Project Genesis organism runtime (`lib/`, `.genome/`):

```bash
node scripts/run-path.js .genome/mission.md
```

---

## License

MIT. See [LICENSE](LICENSE).
