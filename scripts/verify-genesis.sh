#!/usr/bin/env sh
# End to end verification for Genesis tooling in ai-tastemakers.
# Aligns with project-genesis .cursor/skills/verify (npm test + run-path).
set -e
cd "$(dirname "$0")/.."
TSX="${TSX:-./node_modules/.bin/tsx}"
echo "verify: npm test"
npm test
echo "verify: genesis run-path (.genome)"
node scripts/run-path.js .genome/mission.md
echo "verify: experiments-page genome run-path"
GENOME_DIR=genesis/experiments-page.genome node scripts/run-path.js genesis/experiments-page.genome/mission.md
echo "verify: lab experiments registry"
npm run lab:validate-experiments
echo "verify: lab dashboard copy QA"
sh scripts/verify-lab-dashboard-copy.sh
echo "verify: lab color contrast light and dark (UX24)"
npx --yes playwright@1.49.0 install chromium >/dev/null 2>&1 || true
npx tsx scripts/verify-lab-color-contrast.ts
echo "verify: lab prose inline spacing and write up fonts (UX26 UX46)"
npx tsx scripts/verify-lab-prose-inline-spacing.ts
echo "verify: lab post write-ups tables and backticks (UX43)"
npx tsx scripts/verify-lab-post-writeups.ts
echo "verify: lab post affected screenshots (brief sample links)"
npx tsx scripts/verify-lab-post-affected-screenshots.ts
echo "verify: lab write up reader copy (UX46)"
npx tsx scripts/verify-lab-writeup-reader-copy.ts
echo "verify: lab rendered first-person copy (we/our/us)"
npx tsx scripts/verify-lab-post-first-person.ts
echo "verify: lab post title above fold (UX46)"
npx tsx scripts/verify-lab-post-title-fold.ts
echo "verify: lab post header order (UX47)"
npx tsx scripts/verify-lab-post-header-order.ts
echo "verify: lab post split chip contrast (UX47)"
npx tsx scripts/verify-lab-post-chip-contrast.ts
echo "verify: lab post and index render contrast (UX47 dark-mode regression gate)"
npx tsx scripts/verify-lab-post-render-contrast.ts
echo "verify: lab post chip mobile layout (UX47)"
npx tsx scripts/verify-lab-post-chip-mobile.ts
echo "verify: lab post plain repo link mobile (UX47)"
npx tsx scripts/verify-lab-post-plain-repo-link-mobile.ts
echo "verify: lab post header screenshots (UX47)"
npx tsx scripts/verify-lab-post-header-screenshots.ts
echo "verify: lab email flask asset (UX46)"
npx tsx scripts/verify-lab-email-flask-asset.ts
echo "verify: site internal hrefs and anchors (UX30 link checker)"
npx tsx scripts/verify-lab-internal-hrefs.ts
echo "verify: lab tested badges on daily top 10 (UX45)"
npx tsx scripts/verify-lab-tested-badges.ts
echo "verify: badged experiments have post or lab index anchor"
npx tsx scripts/verify-lab-badge-destinations.ts
echo "verify: lab badge action row layout (UX45)"
npx tsx scripts/verify-lab-badge-mobile-layout.ts
echo "verify: lab PostHog and link tracking (UX42)"
POSTHOG_KEY="${POSTHOG_KEY:-phc_ci_lab_analytics_gate_only}" DIGEST_AS_OF_DATE="${DIGEST_AS_OF_DATE:-2026-10-19}" npm run build:pages >/dev/null
npx tsx scripts/verify-lab-analytics.ts
echo "verify: site SEO (sitemap, feeds, h1, json-ld)"
"$TSX" scripts/verify-site-seo.ts
echo "verify: ok"
