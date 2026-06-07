# Application Development Workflow (Project Genesis)

This document outlines the recommended workflow for building features in a **Genesis-instantiated application** (your product repo). It is copied from [Project Genesis](https://github.com/Leftyshields/project-genesis) via `instantiate.sh` — **customize** backend paths and doc links for your stack after instantiating.

See also: [Product vs genome mission](docs/PRODUCT_VS_GENOME_MISSION.md).

---

## 🔄 Complete Feature Development Workflow

### Phase 1: Planning & Design

1. **Capture the Issue** (`/capture_issue`)
   - Document the problem, current behavior, desired behavior
   - Assign issue ID and priority
   
   **Next:** Run `/explore` to analyze requirements

2. **Explore Requirements** (`/explore`)
   - Analyze the problem in detail
   - Define success criteria
   - Identify constraints and risks
   - List open questions
   
   **Next:** Run `/create_plan` to create execution plan

3. **Create Execution Plan** (`/create_plan`)
   - Generate detailed implementation plan
   - Include field mappings (if data transformations)
   - Include format conversions (if needed)
   - Include local dev parity checks (if API endpoints)
   - **Issue ID in `last_plan.md` must match `last_capture.md`**
   
   **Next:** Run `/design_decisions` (if not done) or `/pre_implementation_checklist`

4. **Document Design Decisions** (`/design_decisions`)
   - Answer all open questions from planning
   - Define field update strategies
   - Specify rendering approaches (if formatted content)
   - Document integration points
   - **For multi-source data:** document provenance (API vs seed vs manual) and reconnect cleanup
   
   **Note:** May run before or after `/create_plan`, but **both** must exist before `/execute_plan`.
   
   **Next:** Run `/pre_implementation_checklist` to verify readiness

5. **Pre-Implementation Checklist** (`/pre_implementation_checklist`)
   - Verify design decisions exist
   - Verify field mappings are documented
   - Verify format conversions are specified
   - Verify local dev parity plan (if needed)
   - Verify rendering strategy (if needed)
   
   **Next:** Run `/execute_plan` to begin implementation

---

### Phase 2: Implementation

6. **Execute Plan** (`/execute_plan`)
   - Follow the execution plan step-by-step
   - Reference design decisions for guidance
   - Apply backend changes to **all documented entry points** (see `docs/ARCHITECTURE.md`)
   - Use functional state updates when updating state based on props/state
   - Implement format conversions as documented
   - **Ship local dev tooling** (seed scripts, npm scripts, runbook rows) when UI needs data to demo
   
   **Optional:** Run `/tdd` for complex logic (test-driven development)
   
   **Required before next feature:** Run `/code_review`, then `/qa_checklist` (do not skip after MVP milestones)

---

### Phase 3: Quality Assurance

7. **Code Review** (`/code_review`) — *standard*
   - Automated security check, correctness, architecture, code quality, performance
   - Review specified scope (file, recent changes, or feature)
   - When changing README or docs that describe code (e.g. runtime steps, API order), verify step order and names against the actual source.
   
   **Next:** Fix any issues found, then run `/security_scan` (optional) or `/qa_checklist`

8. **Security Scan** (`/security_scan`) — *optional*
   - Dedicated pass: secrets, dependencies, input safety, auth, data at rest, encryption, proprietary/IP
   - Use when handling sensitive data, before release, or for compliance; complements code_review
   
   **Next:** Fix critical/high findings, then run `/qa_checklist`

9. **QA Checklist** (`/qa_checklist`) — *standard*
   - **Automated:** agent runs `npm test` and builds for affected workspaces
   - **Manual:** checklist for happy path, edge cases, error handling, visual/UX
   - Save issue-scoped checklist to `.ai/context/qa_checklist_<feature>.md` when helpful
   
   **Next:** Fix any issues found, then run `/peer_review` (optional)

10. **Peer Review** (`/peer_review`) — *optional*
   - Human code review for complex or high-impact changes
   - Evaluate suggestions critically; accept or reject with rationale
   
   **Next:** Address review feedback, then proceed to deployment

---

### Phase 4: Deployment & Reflection

11. **Deploy**
    - Test in staging (if available)
    - Deploy to production
    - Monitor for issues
   
   **Next:** Run `/postmortem` to reflect on the process

11b. **Ship / Push to Git**
    - To push to GitHub, run in **your terminal**: `git add -A && git commit -m 'Description' && git push origin main`. Staging (`git add -A`) must be done before commit so your changes are included. The agent may not have access to push to your remote.
   
   **Next:** Verify on GitHub; then run `/postmortem` if not already done

12. **Postmortem** (`/postmortem`) — *standard*
    - Analyze friction points, rework, missing docs
    - Document lessons learned; propose workflow/doc updates
    - Create `docs/CLOSURE_EPH-*.md` for the issue
    
    **Next:** Run `/project_wrap_up` (optional) or start next feature

13. **Project Wrap-up** (`/project_wrap_up`) — *optional*
    - Final handover: security audit, context synthesis, onboarding docs, next-op briefing
    - Use when handing off, releasing, or preparing for the next contributor or AI agent
    
    **Next:** Start next feature or hand off

### Backlog / GitHub sync

- When a backlog story is already satisfied (deliverable exists and meets “Done when”): verify the deliverable, close the corresponding GitHub issue, then run `/postmortem` if desired.
- When a story is completed in a run: close (or update) the matching GitHub issue so the tracker stays in sync with progress.

---

## 🚀 Quick Start Workflow

For smaller changes or bug fixes:

1. `/capture_issue` - Document the issue
2. `/execute_plan` - Implement the fix
3. `/code_review` - Automated review
4. `/security_scan` - Optional, if the change touches auth, secrets, or sensitive data
5. `/peer_review` - Review changes (optional for trivial fixes)
6. Deploy

---

## 📋 Standard vs optional steps

| Step | Type | What it does |
|------|------|----------------|
| `/capture_issue` | Standard | Log the problem, current/desired behavior, priority; get issue ID |
| `/explore` | Standard | Deep-dive requirements, constraints, risks; persist exploration snapshot |
| `/create_plan` | Standard | Turn exploration into atomic implementation steps |
| `/design_decisions` | Standard | Lock design choices, field mappings, integration points before coding |
| `/pre_implementation_checklist` | Standard | Confirm plan and design are complete; gate before coding |
| `/execute_plan` | Standard | Implement step-by-step using plan and design decisions |
| `/tdd` | Optional | Red–green–refactor for complex logic during implementation |
| `/code_review` | Standard | Automated review: security, correctness, architecture, quality, performance |
| `/security_scan` | Optional | Dedicated security pass: secrets, deps, auth, data at rest, encryption, proprietary/IP |
| `/qa_checklist` | Standard | Automated tests + human manual-test checklist (happy path, edge cases, UX) |
| `/peer_review` | Optional | Human review of changes; accept/reject feedback with rationale |
| `/postmortem` | Standard | Reflect on friction and rework; improve process and docs |
| `/project_wrap_up` | Optional | Handover: security audit, onboarding docs, next-op briefing |
| `/learning_opportunity` | Optional | Capture insights anytime |
| `/show_context` | Utility | Show current context files |
| `/workflow` | Utility | Show this workflow |

**Standard** = recommended for every feature or bugfix. **Optional** = use when scope, risk, or handover justifies it.

---

## After instantiating a new project

1. Copy [docs/ARCHITECTURE_TEMPLATE.md](docs/ARCHITECTURE_TEMPLATE.md) → `docs/ARCHITECTURE.md` and fill in entry points.
2. Copy [docs/DEV_RUNBOOK_TEMPLATE.md](docs/DEV_RUNBOOK_TEMPLATE.md) → `docs/DEV_RUNBOOK.md` as you debug.
3. Add a **“This repo”** subsection below with your backend paths and runbook link.
4. Read [Product vs genome mission](docs/PRODUCT_VS_GENOME_MISSION.md).

---

## AI Tastemakers (this repo)

**Status:** Instantiated from [Project Genesis](https://github.com/Leftyshields/project-genesis) — product application **not yet built**.

**Backend parity:** Document all HTTP entry points in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) when the stack is chosen (stub today).

**Ops runbook:** [docs/DEV_RUNBOOK.md](docs/DEV_RUNBOOK.md)

**Product mission:** Capture/plan in `.ai/context/` and future `docs/CLOSURE_*.md` — **not** `.genome/mission.md` (framework metadata only). See [docs/PRODUCT_VS_GENOME_MISSION.md](docs/PRODUCT_VS_GENOME_MISSION.md).

**Next step:** Run `/capture_issue` with the AI Tastemakers product goal.

---

## ⚠️ Common Mistakes to Avoid

1. **Skipping Design Decisions** - Always run `/design_decisions` before implementation
2. **Forgetting backend parity** - Document all HTTP entry points in `docs/ARCHITECTURE.md`; update every entry point that mounts your API router (not a fixed pair of filenames)
3. **Skipping MVP QA gate** - After `/execute_plan` on a milestone, run `/qa_checklist` and `/code_review` before the next `/capture_issue`
4. **Confusing product mission with `.genome/mission.md`** - App goals live in capture/plan/closure docs; genome mission is framework metadata
5. **Stale Closures** - Use functional state updates when updating state based on props/state
6. **Missing Format Conversions** - Document and implement all format conversions
7. **Skipping Pre-Implementation Checklist** - Verify all requirements before coding
8. **Forgetting to stage before commit** - Run `git add -A` before `git commit` when shipping changes
9. **Documenting npm scripts that don't exist** - Runbook must not require scripts missing from `package.json`
10. **Stale `last_plan.md`** - Plan issue ID must match current capture before `/execute_plan`
11. **Monorepo shared package drift** - Rebuild shared workspace packages after editing `src/` if consumers import `dist/`
12. **QA-driven silent scope** - New requests during QA need a mini capture or plan note, not ad-hoc patches

---

## 📚 Related Documentation (templates — copy into your app repo)

- [Architecture template](docs/ARCHITECTURE_TEMPLATE.md)
- [Dev runbook template](docs/DEV_RUNBOOK_TEMPLATE.md)
- [Product vs genome mission](docs/PRODUCT_VS_GENOME_MISSION.md)
- [Instantiated app feedback log](docs/INSTANTIATED_APP_FEEDBACK.md)
- [Blueprint](docs/BLUEPRINT.md) — Genesis framework architecture

---

**Last Updated:** 2026-05-31
