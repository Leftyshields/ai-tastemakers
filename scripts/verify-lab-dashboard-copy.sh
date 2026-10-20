#!/usr/bin/env sh
set -e
cd "$(dirname "$0")/.."
echo "verify: lab dashboard UX (vitest lab-dashboard-ux)"
npm run test:digest -- src/tastemaker/lab/lab-dashboard-ux.test.ts src/tastemaker/lab/lab-timeline-gantt.test.ts
echo "verify: build lab pages for rendered copy QA"
npm run build:pages
echo "verify: lab rendered page copy (UX16)"
npx tsx scripts/verify-lab-rendered-copy.ts
