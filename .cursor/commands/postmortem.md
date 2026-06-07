We are performing a process postmortem.

Do NOT focus on code correctness.

Analyze:
- Where friction occurred
- Where rework happened
- What was misunderstood
- What instructions or documentation were missing

Then answer:
1. Root cause
2. What should change in prompts or docs
3. How to prevent this next time

Finally, propose updates to:
- System instructions
- Documentation
- Workflow rules

**Required outputs:**
1. `.ai/context/postmortem_<ISSUE_ID>.md` — friction analysis (this session)
2. `docs/CLOSURE_<ISSUE_ID>.md` — what shipped, deferred, ship commands
3. Update `.cursor/commands/workflow.md` or related commands if lessons apply
4. Optional upstream: contribute findings to [Project Genesis](https://github.com/Leftyshields/project-genesis) via PR or `docs/INSTANTIATED_APP_FEEDBACK.md` in your app repo

---

**Workflow Position:** Run this after feature deployment to reflect on the process and improve future workflows.

**Then — Close issue and ship:**
- Close the issue (e.g. create or update a closure doc such as `docs/CLOSURE_EPH-*.md`, or close the GitHub issue if applicable).
- Remind the user: to get changes on GitHub, run in **their terminal**: `git add -A && git commit -m 'Closes EPH-XXXX' && git push origin main`. The agent may not have access to push to the user's remote. Staging (`git add -A`) must be done before commit.

**Next Steps:**
1. Implement suggested documentation updates
2. Update workflow commands based on findings
3. Apply lessons learned to next feature development

See `.cursor/commands/workflow.md` for the complete development workflow.
