#!/usr/bin/env sh
set -e
cd "$(dirname "$0")/.."
echo "verify: lab dashboard UX (vitest lab-dashboard-ux)"
npm run test:digest -- src/tastemaker/lab/lab-dashboard-ux.test.ts src/tastemaker/lab/lab-timeline-labels.test.ts
echo "verify: lab dashboard copy ok"
