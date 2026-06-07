Create a QA checklist for this feature.

## Automated (agent runs first)

- Run `npm test` (root or affected workspaces)
- Run `npm run build` for affected workspaces
- Report pass/fail counts in chat

## Manual (human validation)

Create a checklist the tester can follow. Include:
- Happy path
- Common edge cases
- Failure states
- Visual / UX checks

Save to `.ai/context/qa_checklist_<feature-slug>.md` when the feature is non-trivial.

Format as simple `- [ ]` items with pre-flight section.

---

**Workflow Position:** Run this after `/code_review` (automated review).

**Previous Step:** `/code_review` - Automated security and quality review

**Next Steps:**
1. Fix any issues found during QA
2. Run `/peer_review` for human code review (for complex changes)
3. Address review feedback
4. Deploy the feature

See `.cursor/commands/workflow.md` for the complete development workflow.
