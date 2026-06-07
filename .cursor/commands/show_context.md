Read and display the latest context snapshots.

Rules:
- Do not write code.
- Do not modify any files.
- If a file does not exist, say "MISSING: <path>".

Steps:
1) If `.ai/context/last_capture.md` exists, print:
   - Title
   - TLDR
   - Priority
   - Timestamp
2) If `.ai/context/last_explore.md` exists, print:
   - Restated Problem
   - Success Criteria
   - Constraints
   - Open Questions
   - Timestamp

Keep output concise and structured.
