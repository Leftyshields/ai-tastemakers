Create a clear, minimal execution plan as a markdown file.

Before creating the plan, you MUST read these files if they exist:
- `.ai/context/last_capture.md`
- `.ai/context/last_explore.md`

If either file is missing, state that explicitly.

You MUST include a section in the plan called:

## Context Snapshot

It must contain:
- From last_capture.md: Title, TLDR, Priority
- From last_explore.md: Restated Problem, Success Criteria, Constraints, Open Questions

Do not invent details that are not present in these files.
If there is a conflict between capture and explore, call it out in the Context Snapshot.

If BOTH context files are missing, stop and ask the user to run /capture_issue or /explore first.

**Context Integration:**
First, check for and read context files:
- `.ai/context/last_explore.md` (preferred for problem framing and decision context)
- `.ai/context/last_capture.md` (include as "Source Issue" if exists)

Precedence:
- If both exist, prefer `last_explore.md` for problem framing and decision context, and include `last_capture.md` as "Source Issue"
- If only one exists, use it
- If neither exists, proceed normally (backward compatible)

Include:

# TLDR
Short summary of what we are building.
- If `last_explore.md` exists, derive from "Success Criteria" and "Desired Behavior"
- If `last_capture.md` exists, derive from its TLDR and Desired Behavior

# Critical Decisions
Bulleted list of decisions already made.
- If `last_explore.md` exists, include decisions from "Constraints" and "Risks / Unknowns"
- Include any architectural decisions that emerged from exploration

# Issue Context (if `last_capture.md` exists)
Include the captured issue as context:
- Title
- TLDR
- Priority

# Execution Plan
Checklist format with small, atomic steps.

Group tasks by logical categories appropriate to the work type:
- For software projects: Backend, Frontend, Data, Tests, Documentation
- For business projects: Research, Planning, Operations, Marketing, Legal
- For personal projects: Preparation, Execution, Follow-up, Resources
- For events: Logistics, Content, Communications, Materials, Follow-up
- Adapt categories based on the specific idea and domain

## Field Mapping & Update Strategy (if applicable)

If this feature involves generating data, transforming data, or mapping between systems, include a field mapping matrix:

```
| Generated/Input Field | Target Field | Update Strategy | Format Conversion |
|----------------------|--------------|-----------------|-------------------|
| title | idea | replace | none |
| description | description | replace | none |
| tags | tags | merge | tag names → tag IDs |
```

**Update Strategies:**
- **replace**: Overwrite existing field completely
- **merge**: Combine with existing data (e.g., add to array)
- **append**: Add to end of existing data (e.g., append markdown)

**Format Conversions:**
- Specify any transformations needed (e.g., API format → form format)
- Reference `docs/DATA_FORMAT_REFERENCE.md` if formats are complex

## Data Format Conversions (if applicable)

If data formats differ between systems (API vs form, etc.), document required conversions:

```
API Response Format:
{
  "subtasks": [{"task": "string", "completed": false}]
}

Form Data Format:
{
  "subtasks": [{"text": "string", "completed": false, "link": ""}]
}

Conversion Required:
- Map "task" → "text"
- Add "link" property (default: "")
```

## Backend File Mapping (REQUIRED for backend changes)

**Do not assume a fixed file pair** (e.g. `server.js` + `functions/index.js`). Each project defines its own entry points.

Before writing the execution plan:

1. Create or update **`docs/ARCHITECTURE.md`** from [docs/ARCHITECTURE_TEMPLATE.md](docs/ARCHITECTURE_TEMPLATE.md).
2. List **every** environment that serves HTTP (local dev, production, preview, CI).
3. Prefer **one shared router/handler module** imported by all entry points.

**Checklist template:**
```
### Backend changes
- [ ] Update shared handlers (single source of truth)
- [ ] Update each entry point listed in docs/ARCHITECTURE.md
- [ ] Local smoke test (document URL, e.g. curl …/health)
- [ ] Production path check: web client base URL matches hosting rewrites
- [ ] Deploy and verify production (if applicable)
```

## Bootable milestone (greenfield plans)

For new apps, split the execution plan:

1. **Milestone A — Bootable:** auth (if any), health/smoke endpoint, empty shell UI, `.env` documented, one vertical slice testable locally.
2. **Milestone B+ — Features:** remaining plan phases.

Include **First run verification** checklist in Milestone A:
- [ ] All start commands documented
- [ ] One authenticated or public API call succeeds
- [ ] No unhandled promise rejections / server crashes on happy path

Include **Production path check** before calling MVP done:
- [ ] Web build API base URL correct for hosted deploy
- [ ] Hosting rewrites / API mount paths aligned
- [ ] Firestore rules / secrets / CORS documented

# Acceptance Criteria (if `last_explore.md` exists)
Include acceptance criteria from exploration or derive from Success Criteria.

Rules:
- Each step should be executable on its own
- Avoid vague steps like "implement feature"
- Prefer small tasks over large ones
- Do not write code yet
- If `last_explore.md` exists, ensure plan addresses Success Criteria and respects Constraints
- Ask clarifying questions ONLY if critical fields are missing from context (e.g., no success criteria, no desired behavior)

This plan will be used by execution agents.

---

**Next:** Run `/design_decisions` to document design choices before implementation. See `.cursor/commands/workflow.md` for the complete development workflow.
