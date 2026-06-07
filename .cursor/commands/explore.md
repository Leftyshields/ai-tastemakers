We are now in exploration mode.

Do NOT write code.
Do NOT propose implementation yet.

Your job is to deeply understand the problem and capture an exploration snapshot that can feed planning and execution.

Steps (in THIS response):
1. Restate the problem in your own words
2. Identify the user and their job-to-be-done
3. Describe current behavior and desired behavior
4. Identify what success looks like
5. List constraints and risks
6. **Architecture Check** (if backend/API changes):
   - Identify ALL backend entry points (document in `docs/ARCHITECTURE.md` — do not assume fixed filenames)
   - Document which environments each serves (local dev vs production)
   - Note whether a shared handler module should be updated once vs many entry points
7. Ask clarifying questions that materially affect planning or execution

Rules:
- Challenge unclear assumptions
- Push back if the problem is poorly defined
- Prefer questions over answers, but still produce a complete snapshot
- Think like a strong project manager or strategic planner
- Always produce a complete exploration snapshot in this response, even while asking questions
- You MUST persist a snapshot at the end of THIS response, even if questions remain unanswered

**Output Persistence (MANDATORY):**
After completing the exploration snapshot (including open questions), you MUST persist the findings to `.ai/context/last_explore.md` using this exact structure:

```markdown
# Restated Problem
[restated problem in your own words]

# User + JTBD
[user description and job-to-be-done]

# Current Behavior
[current state description]

# Desired Behavior
[desired state description]

# Success Criteria
[what success looks like, bullet list]

# Constraints
[list of constraints, bullet list]

# Risks / Unknowns
[risks and unknowns, bullet list]

# Architecture Impact (if backend changes)
[List all files that need changes and their environments]
- Local Dev: [files]
- Production: [files]
- Note any parity requirements

# Open Questions
[clarifying questions that materially affect design or architecture, bullet list]

# Acceptance Criteria (Draft)
[preliminary acceptance criteria if applicable, bullet list]

# Timestamp
[ISO 8601 timestamp]

After writing the file, confirm in chat exactly:
WROTE .ai/context/last_explore.md

Then end with:
Once these questions are answered, we can create a plan.

---

**Workflow Position:** This command follows `/capture_issue` and precedes `/create_plan`.

**Next:** Run `/create_plan` to create an execution plan based on this exploration. See `.cursor/commands/workflow.md` for the complete development workflow.

