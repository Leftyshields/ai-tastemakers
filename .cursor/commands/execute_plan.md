You are now executing the approved plan.

## ⚠️ Pre-Flight Check

**Before starting implementation, verify:**
- [ ] `/pre_implementation_checklist` has been run (or manually verified)
- [ ] Design decisions document exists: `.ai/context/design_decisions.md`
- [ ] Field mapping matrix is documented (if data transformations are involved)
- [ ] Data format specifications are clear (if API/formats are involved)

**If any items above are missing, stop and inform the user to complete them first.**

---

**Context Integration:**
First, check for and read context files:
- Read the plan file
- `.ai/context/design_decisions.md` (if exists) - use for design guidance
- `.ai/context/last_explore.md` (if exists) - use for validation and scope boundaries

At the start of execution:
- Restate "What we're building" in 3 bullets (derive from plan TLDR or `last_explore.md` Success Criteria)
- List explicit non-goals (derive from `last_explore.md` Constraints and what's explicitly out of scope)
- Reference design decisions document if it exists

Rules:
- Follow the plan exactly
- Follow design decisions from `.ai/context/design_decisions.md`
- Do not introduce new scope
- Do not refactor unrelated code
- If you discover missing information, pause and ask
- **When adding API endpoints:** Update every entry point in `docs/ARCHITECTURE.md`; prefer shared handlers over duplicated route files

Process:
- Implement one step at a time
- Mark completed steps clearly
- Explain briefly what was changed after each step
- **For data format conversions: Verify conversion logic matches documented formats**
- **For state updates: Use functional updates when updating state based on props/state**
- During execution, when making a tradeoff:
  - Check `last_explore.md` Constraints and Risks to avoid scope drift
  - Check `design_decisions.md` for documented decisions
  - Avoid decisions that contradict stated constraints

**Special Checks:**
- **API Endpoints:** Shared handlers + all entry points in `docs/ARCHITECTURE.md` updated
- **Data Formats:** When transforming data, verify format conversions match documented specs
- **React State:** When updating state that depends on props/state, use functional updates
- **Content Rendering:** If adding formatted content, implement rendering strategy from design decisions

Validation (at the end):
- Validate implemented behavior against `last_explore.md` Success Criteria (if exists)
- Validate against Acceptance Criteria from plan or `last_explore.md` (if exists)
- Verify field mappings were implemented correctly (if applicable)
- Verify format conversions work as documented (if applicable)
- Ensure no constraints were violated

## Local Dev Verification (required before handoff)

- [ ] If feature reads persisted user/data store: **seed script or documented integration path** exists in `package.json` (do not document scripts that are not implemented)
- [ ] `docs/DEV_RUNBOOK.md` updated with new scripts, ports, or recovery steps
- [ ] Agent ran `npm test` and `npm run build` for affected workspaces (or stack-equivalent)
- [ ] Agent stated exact commands for the user to see the happy path (e.g. seed → open page)
- [ ] If editing shared workspace packages: noted whether consumers import `dist/` or `src/` — rebuild/restart as needed

If a step feels unsafe or unclear, stop and ask before proceeding.

---

**During implementation (optional):**
- Run `/tdd` for complex logic requiring test-driven development

**After completion:**
- Review implementation against design decisions
- Document any deviations from the plan
- To push to remote: run in your terminal: `git add -A && git commit -m '...' && git push origin main`
- **Last stage (genome ready to build):** When implementation is complete and the genome (or planned deliverable) is in place, **ask the user:** "Is the genome ready to build?" (or "Is this stage complete?"). If the user confirms (e.g. yes, ready), **run the build:** run `node scripts/build.js` (or validate genome then `node scripts/run-path.js .genome/mission.md`). After the build, **show run-the-app instructions:** e.g. "To run the organism: `node scripts/run-path.js .genome/mission.md`" or "See lib/README.md for runtime usage." If the user says not yet, suggest finishing edits and ask again when ready.
- **Next step:** Run `/code_review` for automated security and quality review, then `/qa_checklist` for manual testing.

**Next:** When implementation is done, Cursor will ask "Is the genome ready to build?"; after you confirm, the build runs and you get run-the-app instructions. Then run `/code_review` and `/qa_checklist`. See `.cursor/commands/workflow.md` for the full workflow.
