# Backlog: Biologically Inspired Workflow Framework

**Epic:** Biologically inspired workflow framework — design, backlog, and implementation.

Stories are ordered by dependency (beginning → end). No story appears before its dependencies.

---

## Epic

**Title:** Biologically inspired workflow framework  
**Scope:** Design and documentation (blueprint + backlog) plus optional follow-on implementation (genome scaffold, expression model, organism loader, decomposition engine, signaling, one end-to-end path, guardrails).  
**Outcome:** A single source of truth (blueprint), a dependency-ordered backlog, and—if implementation stories are executed—a scaffoldable genome and minimal runtime.

---

## Stories (dependency order)

| ID | Title | Depends on | Done when |
|----|--------|------------|-----------|
| 1 | Produce full 18-section architecture blueprint | — | docs/BLUEPRINT.md exists with all sections and implementation-oriented content |
| 2 | Produce dependency-ordered epic backlog | 1 | docs/backlog.md exists with one epic and stories in DAG order |
| 3 | Scaffold genome directory and minimal content | 2 | .genome/ exists with mission, decomposition_rules, one role per layer (organ/tissue/cell/molecule), one contract |
| 4 | Document or implement expression profile derivation | 3 | Expression profiles for organism/organ/tissue/cell/molecule are defined (doc or script) from role_library + layer |
| 5 | Stub molecule library (1–2 primitives) | 3 | .molecules/lib/ has at least one primitive (e.g. read_file) with pre/post, permissions, audit |
| 6 | Implement organism loader (read genome; no execution) | 3, 4 | Loader reads .genome/, validates minimum completeness, exposes genome to caller; no orchestration yet |
| 7 | Implement decomposition engine (instantiate from genome) | 6 | Engine applies decomposition rules to produce organ/tissue/cell/molecule instance graph from genome |
| 8 | Add minimal signaling and health aggregation | 7 | Status and health flow bottom-up; organism can aggregate organ health |
| 9 | Implement one full path end-to-end (e.g. Build → tissue → cell → molecule) | 5, 7, 8 | One organ path runs: one tissue, one cell, one molecule execute; result observable |
| 10 | Add Repair organ/tissue within genome repair policy | 8 | Repair receives failure signals; can retry or escalate per genome policy |
| 11 | Add Defense organ / guardrails enforcement | 6 | Requests/actions checked against genome constraints; violations blocked and audited |
| 12 | Validate against acceptance criteria and guardrails | 1, 2, 9, 10, 11 | All acceptance criteria from last_explore met; guardrails doc and behavior aligned |

---

## Dependency graph (summary)

- **1** → 2 (backlog derived from blueprint)
- **2** → 3, 4, 5, 6 (implementation stories depend on design + backlog)
- **3** → 4, 5, 6 (genome scaffold before expression, molecules, loader)
- **4** → 6 (expression used by loader)
- **6** → 7, 11 (loader before decomposition and defense)
- **7** → 8, 9 (decomposition before signaling and full path)
- **5** → 9 (molecules before execution)
- **8** → 9, 10 (signaling before full path and repair)
- **9** → 12 (one path before final validation)
- **10, 11** → 12 (repair and defense before final validation)

No cycles; ordering above is valid (topological order).

---

## Notes

- The first two stories are the design deliverable; the rest are implementation follow-on and may be refined or split using the blueprint and existing workflows.
- “Depends on” uses story IDs; “—” means no dependency.
- Done when: short acceptance condition per story; full acceptance criteria for the epic are in .ai/context/last_explore.md.
