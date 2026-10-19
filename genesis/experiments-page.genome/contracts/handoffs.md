# Handoff contracts

Contracts between layers define the format and obligations for passing work and results. Role ids refer to `.genome/role_library/` (organs, tissues, cells, molecules).

## Build → Implementation (organ → tissue)

- **From:** Build (organ)  
- **To:** Implementation (tissue)  
- **Format:** Work package: at least a task identifier and optional payload (e.g. path, options).  
- **Obligation:** Build assigns work to Implementation; Implementation acknowledges and returns completion or failure.  
- **SLA:** (Placeholder for v1: no formal SLA; handoff is best-effort.)

This handoff connects the organ role **Build** to the tissue role **Implementation** so that the organism can decompose Build into Implementation tissue, which in turn uses Worker cells and read_file molecules.
