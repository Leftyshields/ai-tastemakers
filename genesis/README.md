# Genesis genomes (ai-tastemakers)

Reproducible Project Genesis blueprints for Lab features. Upstream framework: [project-genesis](https://github.com/Leftyshields/project-genesis) (clone separately; do not modify upstream).

## experiments-page.genome

Blueprint for the Lab experiments dashboard (schema, validation, PostHog sync, static UI).

```bash
# Validate genome loads
GENOME_DIR=genesis/experiments-page.genome node -e "require('./lib/loadGenome').loadGenome({ genomeDir: process.env.GENOME_DIR })"

# Lab gates
npm run lab:validate-experiments
npm run test:digest
npm run build:pages

# Organism path (reads mission via read_file molecule)
GENOME_DIR=genesis/experiments-page.genome node scripts/run-path.js genesis/experiments-page.genome/mission.md

# Full nine-step workflow (orchestrator copied from project-genesis)
npm run genesis:run -- init --autonomous
# … write .ai/context artifacts, then per step:
npm run genesis:run -- validate-gate capture
npm run genesis:run -- step-complete capture --artifacts .ai/context/last_capture.md
```

See `genesis/run-experiments-page-genesis.sh` for the scripted gate sequence used on PR #36.
