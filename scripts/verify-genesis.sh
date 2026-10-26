#!/usr/bin/env sh
# End to end verification for Genesis tooling in ai-tastemakers.
# Aligns with project-genesis .cursor/skills/verify (npm test + run-path).
set -e
cd "$(dirname "$0")/.."
TSX="./node_modules/.bin/tsx"
VITEST="./node_modules/.bin/vitest"
echo "verify: npm test"
npm test
echo "verify: brief narration em dash gate"
"$TSX" scripts/verify-brief-no-em-dash.ts
echo "verify: home index layout unit tests"
"$VITEST" run scripts/home-index-layout.test.ts
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
"$TSX" scripts/verify-lab-color-contrast.ts
echo "verify: lab prose inline spacing and write up fonts (UX26 UX46)"
"$TSX" scripts/verify-lab-prose-inline-spacing.ts
echo "verify: lab post write-ups tables and backticks (UX43)"
"$TSX" scripts/verify-lab-post-writeups.ts
echo "verify: lab post affected screenshots (brief sample links)"
"$TSX" scripts/verify-lab-post-affected-screenshots.ts
echo "verify: lab write up reader copy (UX46)"
"$TSX" scripts/verify-lab-writeup-reader-copy.ts
echo "verify: lab rendered first-person copy (we/our/us)"
"$TSX" scripts/verify-lab-post-first-person.ts
echo "verify: lab post title above fold (UX46)"
"$TSX" scripts/verify-lab-post-title-fold.ts
echo "verify: lab post header order (UX47)"
"$TSX" scripts/verify-lab-post-header-order.ts
echo "verify: lab post split chip contrast (UX47)"
"$TSX" scripts/verify-lab-post-chip-contrast.ts
echo "verify: lab post and index render contrast (UX47 dark-mode regression gate)"
"$TSX" scripts/verify-lab-post-render-contrast.ts
echo "verify: lab post chip mobile layout (UX47)"
"$TSX" scripts/verify-lab-post-chip-mobile.ts
echo "verify: lab post plain repo link mobile (UX47)"
"$TSX" scripts/verify-lab-post-plain-repo-link-mobile.ts
echo "verify: lab post header screenshots (UX47)"
"$TSX" scripts/verify-lab-post-header-screenshots.ts
echo "verify: lab email flask asset (UX46)"
"$TSX" scripts/verify-lab-email-flask-asset.ts
echo "verify: site internal hrefs and anchors (UX30 link checker)"
"$TSX" scripts/verify-lab-internal-hrefs.ts
echo "verify: lab tested badges on daily top 10 (UX45)"
"$TSX" scripts/verify-lab-tested-badges.ts
echo "verify: badged experiments have post or lab index anchor"
"$TSX" scripts/verify-lab-badge-destinations.ts
echo "verify: lab badge action row layout (UX45)"
"$TSX" scripts/verify-lab-badge-mobile-layout.ts
echo "verify: lab PostHog and link tracking (UX42)"
POSTHOG_KEY="${POSTHOG_KEY:-phc_ci_lab_analytics_gate_only}" DIGEST_AS_OF_DATE="${DIGEST_AS_OF_DATE:-2026-10-19}" SITE_LANDING_LAYOUT_V2=1 npm run build:pages >/dev/null
"$TSX" scripts/verify-lab-analytics.ts
echo "verify: home index link tracking (UX49)"
"$TSX" scripts/verify-home-index-tracking.ts
echo "verify: home index copy (UX49)"
"$TSX" scripts/verify-home-index-copy.ts
echo "verify: home index contrast light and dark (UX49)"
"$TSX" scripts/verify-home-index-contrast.ts
echo "verify: home index screenshots (UX49 artifacts)"
"$TSX" scripts/verify-home-index-screenshots.ts
echo "verify: archive index screenshots (390 and desktop)"
"$TSX" scripts/verify-archive-index-screenshots.ts
echo "verify: lab header mobile nav (390px scroll and fade)"
"$TSX" scripts/verify-lab-header-mobile-nav.ts
echo "verify: lab header mobile screenshots (390 scroll start/end)"
"$TSX" scripts/capture-lab-header-390.ts
echo "verify: site sitemap gate (Search Console verification HTML)"
"$TSX" scripts/verify-site-sitemap-gate.ts
echo "verify: outbound link tracking (/go) on site and email fixtures"
"$TSX" scripts/verify-outbound-links.ts
echo "verify: ok"
