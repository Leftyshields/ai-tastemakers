# Validation checklist

**Purpose:** Repeatable validation that deliverables meet the backlog’s acceptance criteria (blueprint, backlog, one full path, repair, guardrails) and that guardrails documentation matches runtime behavior.

**Procedure:**  
1. Run `npm test` from repo root (all tests must pass).  
2. Work through the checklist below; verify each item and mark complete when verified.  
3. When all items pass, record the outcome (e.g. checklist sign-off or closure note).

This checklist references `docs/backlog.md` and `lib/README.md`.

---

## Backlog acceptance criteria

- [ ] **Blueprint:** docs/BLUEPRINT.md exists with all 18 sections and implementation-oriented content.
- [ ] **Backlog:** docs/backlog.md exists with one epic and stories in DAG order.
- [ ] **One full path:** One path runs (Build → tissue → cell → molecule); result observable (runPath returns root, overlay, result).
- [ ] **Repair:** Repair receives failure signals; can retry or escalate per genome policy (runPathWithRepair, repair_policy).
- [ ] **Guardrails:** Requests/actions checked against genome constraints; violations blocked and audited (checkGuardrails, blocked return, .logs/guardrails.log).

---

## Guardrails doc and behavior aligned

- [ ] **lib/README.md** Guardrails section describes: path allowlist, default allowlist when no guardrails.md, blocked return shape (`blocked`, `violationReason`), audit file `.logs/guardrails.log`.
- [ ] **Optional .genome/guardrails.md:** When present, format is `allowed_path_prefix: .genome/,.molecules/` and behavior matches doc.
- [ ] **Runtime:** runPath with allowed path (e.g. .genome/mission.md) succeeds; runPath with disallowed path returns `blocked: true`, `violationReason`, and appends to .logs/guardrails.log.

---

## Automated check

- [ ] **npm test** passes (includes guardrails and run tests).

---

## Sign-off

- [ ] All items above verified. Validation date and outcome recorded.

**Tester:** _________________ **Date:** _________________
