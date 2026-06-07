# Product mission vs `.genome/mission.md`

Two different “missions” coexist in an instantiated project. Do not conflate them.

| | **Product mission** | **Genome mission** (`.genome/mission.md`) |
|---|---------------------|-------------------------------------------|
| **Purpose** | What your app/product delivers for users | What the Genesis **framework/runtime** blueprint defines |
| **Audience** | You, users, stakeholders | Organism loader, decomposition engine, Genesis meta-tests |
| **Updates** | Capture, plan, closure docs (`docs/CLOSURE_*.md`) | Genome workflow; rarely changed after instantiate |
| **Example** | “Track Amex benefits via Plaid” | “Provide validated blueprint for organism structure…” |

## After `instantiate.sh`

1. **Keep** `.genome/mission.md` as framework metadata unless you are extending Project Genesis itself.
2. **Capture product intent** in `/capture_issue` → `.ai/context/last_capture.md` and your execution plan.
3. **Optionally** add `docs/MISSION.md` or `README.md` for human-readable product goals.
4. **Customize** `.cursor/commands/workflow.md` with stack-specific notes (backend paths, runbook link).

Completing an **app MVP** does not mean the **genome organism runtime** is finished — they are separate concerns.
