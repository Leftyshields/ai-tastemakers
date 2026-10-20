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
echo "verify: lab color contrast light and dark (UX24)"
npx --yes playwright@1.49.0 install chromium >/dev/null 2>&1 || true
npx tsx scripts/verify-lab-color-contrast.ts
echo "verify: lab prose inline spacing (UX26)"
npx tsx scripts/verify-lab-prose-inline-spacing.ts
echo "verify: site internal hrefs and anchors (UX30 link checker)"
npx tsx scripts/verify-lab-internal-hrefs.ts
echo "verify: lab PostHog and link tracking (UX42)"
POSTHOG_KEY="${POSTHOG_KEY:-phc_ci_lab_analytics_gate_only}" DIGEST_AS_OF_DATE="${DIGEST_AS_OF_DATE:-2026-10-19}" npm run build:pages >/dev/null
npx tsx scripts/verify-lab-analytics.ts
echo "verify: ok"
