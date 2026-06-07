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

## 2026-06-07 — AI Tastemakers (Daily Digest, EPH-20260606-DIG1)

**Source:** Greenfield instantiate from Project Genesis → full workflow through deploy (capture → explore → design → plan → execute → GitHub + Pages). QA gate skipped.

### Friction observed

| Area | Issue |
|------|--------|
| Instantiate | Wrong seed repo first; delete and re-run `instantiate.sh` from correct URL |
| External APIs | Deprecated Anthropic model ID in `.env.example` / design doc → 404 on all narrations |
| Config edit | Partial refactor dropped `blocklist` from config return object |
| Pipeline perf | First design enriched all candidates; needed reorder to enrich top-N only |
| Ranking UX | Bootstrap mode surfaced mega-repos; user expected “non-obvious” picks day one |
| Git | Placeholder remote `YOU/repo`; push failed until `gh repo create` |
| GHA vs local git | Bot commit caused non-fast-forward push; needed `git pull --rebase` |
| Timezone | Commit message UTC vs briefing folder Pacific date |
| GitHub Pages | Root-absolute `/assets/style.css` → unstyled site on project URL |
| Workflow doc | Stale “product not yet built” after MVP shipped |
| QA gate | `/code_review` and `/qa_checklist` not run before production deploy |

### Root cause (process)

MVP “done” was defined as local CLI success, not **production verification** (GHA dispatch, Pages CSS load, secrets). Genesis templates under-specify deployment boundaries for scheduled/automated products and static hosting path rules.

### Changes incorporated into Genesis (PR `improve/tastemakers-postmortem-dig1`)

See [project-genesis PR #15](https://github.com/Leftyshields/project-genesis/pull/15).

### App-repo fixes already applied

- Model default `claude-sonnet-4-6`; pipeline enrich-top-10; `maxStarsBootstrap`
- Tailwind Pages site with relative asset paths
- Closure: `docs/CLOSURE_EPH-20260606-DIG1.md`

---

**How to add entries:** After `/postmortem` in an instantiated app, open a PR to [project-genesis](https://github.com/Leftyshields/project-genesis) or append a row here via PR from your app repo.
