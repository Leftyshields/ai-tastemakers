# Instantiated App Feedback Log

Changelog of workflow improvements derived from real app development (postmortems). Use when updating Genesis templates and Cursor commands.

---

## How to add entries (after `/postmortem`)

Each closed issue should produce **one dated section** below, using the same structure as prior entries (Source → Friction → Root cause → Genesis changes → App-repo fixes).

### Path A — App repo (always do this first)

1. Write `.ai/context/postmortem_<ISSUE_ID>.md` (local; gitignored).
2. Write or update `docs/CLOSURE_<ISSUE_ID>.md`.
3. Update `.cursor/commands/workflow.md` (or related commands) if lessons apply.
4. **Append a section to this file** (`docs/INSTANTIATED_APP_FEEDBACK.md`) summarizing friction and recommended Genesis changes.
5. Open a PR from your app repo (or push to `main` if solo):

```bash
git add docs/INSTANTIATED_APP_FEEDBACK.md docs/CLOSURE_*.md .cursor/commands/workflow.md
git commit -m "Docs: postmortem feedback for EPH-XXXX"
git push origin HEAD
```

Link the closure doc and this entry in the PR description.

### Path B — Project Genesis upstream (when templates should change)

When friction points to **missing or wrong Genesis templates/commands**, open a PR to [project-genesis](https://github.com/Leftyshields/project-genesis):

1. Copy the **Recommended Genesis / workflow changes** bullets from this entry.
2. Apply them to the relevant Genesis paths (e.g. `.cursor/commands/`, `docs/WORKFLOW_COURSE.md`, `DEV_RUNBOOK_TEMPLATE.md`).
3. Reference the app-repo issue ID and link back to this file on the app repo.
4. In this entry, add a **Changes incorporated into Genesis** subsection with the PR link (e.g. `improve/tastemakers-postmortem-land`).

**Do both paths when warranted:** log here first (Path A), then upstream template fixes (Path B). Path A alone is sufficient when only app-repo workflow/docs changed.

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

## 2026-06-07 — AI Tastemakers (Copy + Brief Format, EPH-20260607-COPY)

**Source:** Follow-on feature after v1; capture → explore → design_decisions → create_plan (late) → execute → code_review → deploy. `/qa_checklist` skipped.

### Friction observed

| Area | Issue |
|------|--------|
| Planning order | `/design_decisions` before `/create_plan`; checklist blocked on stale DIG1 `execution_plan.md` |
| Verification | Local same-day `npm run digest` treated as harmless smoke test |
| Scope blur | “Copy only” → pipeline fixes for soft-dedup + enrich star drift |
| Deploy | Push vs GHA digest vs Pages unclear; manual Pages dispatch after bot digest |
| Mid-plan ops | Delete `2026-06-06` archive, forward-only — no mini-capture |
| Source doc | `TASTEMAKER_COPY_EDITS.md` referenced but not in repo |

### Root cause (process)

**Same-day scheduled pipeline re-runs are not idempotent** — soft-dedup and live API refresh mutate rankings and star fields. Verification strategy for output-format changes was undocumented.

### Changes incorporated into Genesis (PR `improve/copy-postmortem-eph20260607`)

- `docs/WORKFLOW_COURSE.md` — case study: follow-on / copy-only scope
- `/workflow`, `/execute_plan`, `DEV_RUNBOOK_TEMPLATE` — same-day re-run + post-digest Pages checks
- `/postmortem` — required closure artifact paths

### App-repo fixes already applied

- Three-subhead brief prompt; homepage copy; email bold rendering
- `excludeDate` for same-day ranking stability; snapshot star preservation on enrich merge
- Closure: `docs/CLOSURE_EPH-20260607-COPY.md`

## 2026-07-02 — AI Tastemakers (Landing Layout v2, EPH-20260701-LAND)

**Source:** Full workflow (capture → explore → design → plan → execute → code review → QA → post-MVP footer fix → postmortem → QA closed). Flag-gated static layout experiment.

### Friction observed

| Area | Issue |
|------|--------|
| Direction drift | Partial v2 code implemented sidebar-heavy synthesis; revised capture required reflow-first refactor |
| Experiment JSON | Hypothesis/`change_summary` lagged capture until mid-implementation |
| Footer UX | Tailwind utilities in TS HTML strings did not guarantee spacing; links visually collided (`SubscribeSkill TastemakersLab`) |
| QA gap | Automated tests green; layout/footer bug found only by human browser check |
| Scope during QA | Hero copy + global footer refactor without mini-capture |
| Context files | `last_capture.md` overwritten by unrelated issue (REPL) before postmortem |
| Git | Local main behind GHA bot commits at ship time; rebase conflict in `edition-pages.ts` on push |

### Root cause (process)

Static HTML generators treated Tailwind class strings like React JSX utilities, but Tailwind v4 content scanning does not reliably emit rules from dynamic TS template literals. Combined with adjacent `<a>` tags and no explicit separators, footer spacing failed despite “correct-looking” class names in source.

### Recommended Genesis / workflow changes

- `/explore` — require “conflicts with existing code” table when partial implementations exist
- `/design_decisions` — static sites: component CSS in scanned `input.css` for layout-critical UI
- `/qa_checklist` — manual browser check after `build:pages` for layout/footer changes
- `/workflow` — common mistakes #23–24 (Tailwind in generators; partial impl vs capture)
- Optional: issue-scoped capture files to avoid `last_capture.md` overwrite

### Changes incorporated into Genesis

[project-genesis PR #17](https://github.com/Leftyshields/project-genesis/pull/17) (`improve/tastemakers-postmortem-land`) — explore WIP conflicts, static HTML styling in design_decisions, qa_checklist browser gate, workflow mistakes #21–24, WORKFLOW_COURSE case study C. Builds on open PR #16 (COPY postmortem).

### App-repo fixes already applied

- Reflow v2 layout + month-tile archive (`SITE_LANDING_LAYOUT_V2=1`)
- `.site-footer__*` component CSS + `footerLinkRowHtml()` separators
- `.cursor/commands/workflow.md` — common mistakes #23–24; latest closure link
- Closure: [docs/CLOSURE_EPH-20260701-LAND.md](CLOSURE_EPH-20260701-LAND.md) (QA closed 2026-07-02)
- Shipped on `main`: `d8c3492`, QA closure `160da7c`

---
