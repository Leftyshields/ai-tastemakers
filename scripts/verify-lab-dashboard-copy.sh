#!/usr/bin/env sh
set -e
cd "$(dirname "$0")/.."
echo "verify: lab dashboard UX (vitest lab-dashboard-ux)"
npm run test:digest -- src/tastemaker/lab/lab-dashboard-ux.test.ts src/tastemaker/lab/lab-timeline-gantt.test.ts src/tastemaker/lab/lab-timeline-id-label.test.ts src/tastemaker/lab/lab-prose-spacing.test.ts src/tastemaker/lab/lab-round4-ux.test.ts src/tastemaker/lab/lab-analytics.test.ts src/tastemaker/lab/lab-tools-page.test.ts src/tastemaker/lab/lab-digest-learned.test.ts src/tastemaker/lab/lab-footer.test.ts src/tastemaker/lab/lab-methodology.test.ts src/tastemaker/lab/lab-about-copy.test.ts
echo "verify: build lab pages for rendered copy QA"
npm run build:pages
echo "verify: lab site href fixtures (UX30)"
npm run test:digest -- src/tastemaker/lab/lab-site-hrefs.test.ts
echo "verify: lab rendered page copy (UX16)"
npx tsx scripts/verify-lab-rendered-copy.ts
