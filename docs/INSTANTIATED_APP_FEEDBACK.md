# Instantiated App Feedback Log

Changelog of workflow improvements derived from real app development (postmortems). Use when updating Genesis templates and Cursor commands.

---

## 2026-05-31 — Wallet Watcher (Transactions, EPH-20260531-H3M8)

**Source:** Greenfield feature after MVP; full Genesis workflow (capture → explore → design → plan → execute → code review → QA → postmortem).

### Friction observed

| Area | Issue |
|------|--------|
| Local dev parity | Runbook referenced seed script before it existed in `package.json` |
| Execute handoff | Feature “done” but UI empty without user-driven seed/debug |
| Monorepo | API imported shared package from `dist/`; edits silent until rebuild |
| Emulator lifecycle | Port conflicts, duplicate emulator instances blocked QA |
| Planning order | `/design_decisions` before `/create_plan`; stale plan file passed gate |
| Multi-source data | Seed + vendor API data indistinguishable until late QA |
| QA scope | Relink, source column, subscription fixes added ad-hoc during validation |

### Changes incorporated into Genesis (PR `improve/workflow-postmortem-h3m8`)

- `/execute_plan` — Local Dev Verification gate
- `/pre_implementation_checklist` — Monorepo & local runtime section; plan ID must match capture
- `/workflow` — Flexible design/plan order; closure docs; common mistakes expanded
- `/qa_checklist` — Automated tests + manual checklist split
- `/postmortem` — Required closure artifact outputs
- `/capture_issue` — Optional `# Environment` field
- `/design_decisions` — Data provenance subsection
- `DEV_RUNBOOK_TEMPLATE` — Script integrity rule + terminology table
- Expression profiles — Happy-path handoff gates

### Root cause (process)

Local dev parity was documented aspirationally but not treated as part of “done.” Demoability should be a deliverable, not a QA surprise.

---

**How to add entries:** After `/postmortem` in an instantiated app, open a PR to [project-genesis](https://github.com/Leftyshields/project-genesis) or append a row here via PR from your app repo.
