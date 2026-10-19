#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
GENOME_DIR="$ROOT/genesis/experiments-page.genome"
export GENOME_DIR
GENESIS=(node scripts/genesis-run.js)

bash genesis/verify-experiments-page.sh

rm -f .ai/context/run_config.json
"${GENESIS[@]}" init --autonomous

steps=(
  "capture|.ai/context/last_capture.md"
  "explore|.ai/context/last_explore.md"
  "design_decisions|.ai/context/design_decisions.md"
  "create_plan|.ai/context/last_plan.md"
  "pre_implementation_checklist|.ai/context/pre_implementation_result.md"
  "execute_plan|"
  "code_review|.ai/context/code_review_changelog.md"
  "qa|.ai/context/test_results.json,.ai/context/qa_checklist_experiments-page.md"
  "postmortem|.ai/context/postmortem_EPH-20261019-LAB-EXP-PAGE.md,docs/CLOSURE_EPH-20261019-LAB-EXP-PAGE.md"
)

for entry in "${steps[@]}"; do
  step="${entry%%|*}"
  arts="${entry#*|}"
  if [[ -n "$arts" ]]; then
    "${GENESIS[@]}" validate-gate "$step" --artifacts "$arts"
    "${GENESIS[@]}" step-complete "$step" --artifacts "$arts"
  else
    "${GENESIS[@]}" validate-gate "$step"
    "${GENESIS[@]}" step-complete "$step"
  fi
  echo "OK step $step"
done

"${GENESIS[@]}" status
