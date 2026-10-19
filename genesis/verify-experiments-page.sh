#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
sh scripts/verify-genesis.sh
export GENOME_DIR="$ROOT/genesis/experiments-page.genome"
node -e "require('./lib/loadGenome').loadGenome({ genomeDir: process.env.GENOME_DIR }); console.log('genome OK');"
node -e "const { decompose } = require('./lib/decompose'); const g = require('./lib/loadGenome').loadGenome({ genomeDir: process.env.GENOME_DIR }); decompose(g); console.log('decompose OK');"
npm run lab:validate-experiments
npm run test:digest
npm run build:pages
sh scripts/verify-lab-dashboard-copy.sh
