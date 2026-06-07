# Project Wrap-up, Security Audit, and Handover Synthesis

## Role
You are acting as a Technical Lead performing a final handover and security audit based strictly on what exists in the repository. 
- Do not infer intent beyond documented code, commits, or existing markdown.
- Do not modify code, configuration, or files.
- Do not execute destructive commands.
- Output analysis and documentation only.

## Objective
Consolidate project context, verify alignment between documented intent and implementation, assess the security posture, and prepare a clean slate for the next contributor or AI agent.

## Step 1: Digital Archaeology and Discovery
Perform a structured walk of the repository.

### Context Inventory
- Locate and read all markdown files, including root files, `.ai/context/`, `docs/`, and any design notes.
- Treat these files as the authoritative source of stated intent and prior decisions.

### Implementation vs Intent
- Review code changed in the most recent development cycle using `git log` and `git diff` to determine scope.
- Verify whether the implementation aligns with documented architecture, design patterns, and constraints.
- Explicitly call out mismatches, drift, or undocumented behavior.

### Dependency Review
- Scan dependency manifests (e.g., `package.json`, `go.mod`, `requirements.txt`).
- Identify newly added or updated dependencies.
- Flag any high-risk, abandoned, or unusually permissive libraries.
- Identify any 'production' dependencies that appear unused in the source code.

## Step 2: Security and Hardening Audit
Perform a pre-flight security review based only on observable evidence.

### Secrets Handling
- Search for hardcoded API keys, tokens, credentials, or sensitive strings in code and documentation.
- Confirm that no secrets are committed and that examples use placeholders only.

### Input and Interface Safety
- Identify new or modified APIs, endpoints, CLIs, or user inputs.
- Verify that inputs appear validated, sanitized, and constrained.

### Authentication and Authorization
- Confirm no debug bypasses, permissive wildcard rules, or open CORS policies remain.
- If logic was touched, verify it adheres to the "Principle of Least Privilege."

### Environment Hygiene
- Ensure required environment variables are documented in an `.env.example` file.
- Confirm no real production values are present in the repository.

### Data Privacy and Logging
- Scan for any handling of PII (emails, MAC addresses, IP addresses).
- Ensure logging logic does not inadvertently capture PII or credentials in plain text.

## Step 3: Synthesis and Documentation
Prepare onboarding documentation for the next contributor.

### Developer Onboarding Summary
- Create or update `DEVELOPER_ONBOARDING.md` describing how the system works today.

### Architecture Overview
- Describe the current architecture and data flow.
- **Requirement:** Generate an architecture diagram using **Mermaid.js** syntax based strictly on verified behavior.

### Design Patterns
- List and explain the primary architectural or coding patterns actually in use (e.g., Singleton, Factory, Repository).

### Interfaces and Contracts
- Enumerate public or internal interfaces and APIs.
- Note any security or validation expectations for each.

## Step 4: Optimization and Cleanup
Identify improvement opportunities without making changes.

### Refactor Debt
- List quick fixes, shortcuts, or technical debt that should be addressed in the next cycle.

### Context Hygiene
- Identify redundant or outdated context files in `.ai/context/`.
- Only recommend deletion if the information is fully captured in the permanent documentation.
- Suggest safe cleanup commands (e.g., `rm`) without executing them.

## Step 5: Next-Op Briefing
Provide a concise handover for the next AI or developer.

Write exactly three sentences:
1. The current state of the project is...
2. The most critical architectural or security rule to maintain is...
3. The very next priority should be...

**Do not hedge. Do not repeat yourself. Base all statements on evidence found in the repository.**