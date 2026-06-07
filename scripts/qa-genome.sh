#!/usr/bin/env bash
# Automated QA for genome scaffold (EPH-20250314-0003).
# Run from repo root: ./scripts/qa-genome.sh
# Exit 0 = all passed; 1 = one or more failures.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GENOME="$ROOT/.genome"
FAIL=0

fail() { echo "FAIL: $*"; FAIL=1; }
pass() { echo "  OK: $*"; }

echo "QA: Genome scaffold"
echo "---"

# --- Happy path ---
[ -d "$GENOME" ] || fail ".genome/ directory missing"
[ -d "$GENOME" ] && pass ".genome/ exists"

[ -f "$GENOME/mission.md" ] || fail "mission.md missing"
[ -f "$GENOME/mission.md" ] && pass "mission.md exists"
grep -q "Objectives" "$GENOME/mission.md" || fail "mission.md: Objectives section missing"
grep -q "Success Criteria" "$GENOME/mission.md" || fail "mission.md: Success Criteria section missing"
grep -q "Out of Scope" "$GENOME/mission.md" || fail "mission.md: Out of Scope section missing"
[ "$FAIL" -eq 0 ] && pass "mission.md has Objectives, Success Criteria, Out of Scope"

[ -f "$GENOME/constraints.md" ] || fail "constraints.md missing"
[ -f "$GENOME/constraints.md" ] && pass "constraints.md exists"
grep -qi "mutation\|constraint" "$GENOME/constraints.md" || fail "constraints.md: no constraint content"
[ "$FAIL" -eq 0 ] && pass "constraints.md has constraint content"

[ -f "$GENOME/decomposition_rules.md" ] || fail "decomposition_rules.md missing"
[ -f "$GENOME/decomposition_rules.md" ] && pass "decomposition_rules.md exists"
grep -q "organism.*organs.*tissues.*cells.*molecules" "$GENOME/decomposition_rules.md" || true
for id in Build Implementation Worker read_file; do
  grep -q "$id" "$GENOME/decomposition_rules.md" || fail "decomposition_rules.md: missing reference to $id"
done
[ "$FAIL" -eq 0 ] && pass "decomposition_rules references Build, Implementation, Worker, read_file"

[ -f "$GENOME/role_library/organs.md" ] || fail "role_library/organs.md missing"
grep -q "Build" "$GENOME/role_library/organs.md" || fail "organs.md: Build role missing"
grep -q "purpose" "$GENOME/role_library/organs.md" || fail "organs.md: purpose missing"
[ "$FAIL" -eq 0 ] && pass "role_library/organs.md has Build with purpose"

[ -f "$GENOME/role_library/tissues.md" ] || fail "role_library/tissues.md missing"
grep -q "Implementation" "$GENOME/role_library/tissues.md" || fail "tissues.md: Implementation role missing"
[ "$FAIL" -eq 0 ] && pass "role_library/tissues.md has Implementation"

[ -f "$GENOME/role_library/cells.md" ] || fail "role_library/cells.md missing"
grep -q "Worker" "$GENOME/role_library/cells.md" || fail "cells.md: Worker role missing"
[ "$FAIL" -eq 0 ] && pass "role_library/cells.md has Worker"

[ -f "$GENOME/role_library/molecules.md" ] || fail "role_library/molecules.md missing"
grep -q "read_file" "$GENOME/role_library/molecules.md" || fail "molecules.md: read_file role missing"
grep -q "path\|inputs\|outputs\|precondition\|permission" "$GENOME/role_library/molecules.md" || fail "molecules.md: minimal fields (inputs/outputs/pre/post/permissions) missing"
[ "$FAIL" -eq 0 ] && pass "role_library/molecules.md has read_file with minimal fields"

[ -f "$GENOME/contracts/handoffs.md" ] || fail "contracts/handoffs.md missing"
grep -q "Build.*Implementation\|Build → Implementation" "$GENOME/contracts/handoffs.md" || fail "handoffs.md: Build → Implementation handoff missing"
[ "$FAIL" -eq 0 ] && pass "contracts/handoffs.md has Build → Implementation handoff"

[ -d "$GENOME/expression_profiles" ] || fail "expression_profiles/ directory missing"
[ "$FAIL" -eq 0 ] && pass "expression_profiles/ exists"

# --- Failure states: no code under .genome ---
CODE_COUNT=0
for ext in js ts mjs cjs py rb go; do
  count=$(find "$GENOME" -name "*.$ext" 2>/dev/null | wc -l)
  CODE_COUNT=$((CODE_COUNT + count))
done
[ "$CODE_COUNT" -eq 0 ] || fail "No executable code under .genome/ (found $CODE_COUNT .js/.ts/.py/etc files)"
[ "$CODE_COUNT" -eq 0 ] && pass "No code or runtime under .genome/"

# --- Cross-references: handoffs reference role ids ---
grep -q "Build" "$GENOME/contracts/handoffs.md" && grep -q "Implementation" "$GENOME/contracts/handoffs.md" || fail "handoffs.md should reference Build and Implementation"
[ "$FAIL" -eq 0 ] && pass "handoffs references role ids Build and Implementation"

echo "---"
if [ "$FAIL" -eq 1 ]; then
  echo "Result: ONE OR MORE CHECKS FAILED"
  exit 1
fi
echo "Result: ALL CHECKS PASSED"
exit 0
