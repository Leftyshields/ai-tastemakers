#!/usr/bin/env sh
# End to end verification for Genesis tooling in ai-tastemakers.
# Aligns with project-genesis .cursor/skills/verify (npm test + run-path).
set -e
cd "$(dirname "$0")/.."
echo "verify: npm test"
npm test
echo "verify: genesis run-path (.genome)"
node scripts/run-path.js .genome/mission.md
echo "verify: experiments-page genome run-path"
GENOME_DIR=genesis/experiments-page.genome node scripts/run-path.js genesis/experiments-page.genome/mission.md
echo "verify: lab dashboard copy QA"
sh scripts/verify-lab-dashboard-copy.sh
echo "verify: ok"
