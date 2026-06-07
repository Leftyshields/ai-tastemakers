# Security Scan

You are in **security scan** mode. Perform a systematic security review of the codebase. Do not modify code—analyze and report only.

---

## Scope

Specify what to scan:
- **Recent changes:** `Scan changes since last commit` (default if unspecified)
- **Full codebase:** `Scan entire project`
- **Target area:** `Scan src/auth/` or `Scan API routes`

If not specified, scan all uncommitted changes and recently modified files.

---

## Scan Checklist

### 1. Secrets and Credentials

- [ ] No hardcoded API keys, tokens, passwords, or signing secrets
- [ ] No credentials in config files committed to the repo
- [ ] Environment variables used for secrets; `.env.example` documents required vars without values
- [ ] No secrets in logs, error messages, or client-side code

### 2. Dependencies

- [ ] Dependency manifests reviewed (e.g. `package.json`, `requirements.txt`, `go.mod`)
- [ ] No known-vulnerable or abandoned packages in use
- [ ] No unexpectedly permissive or high-risk libraries
- [ ] Production dependencies are actually used (no unused high-risk deps)

### 3. Input and Interface Safety

- [ ] User inputs validated and sanitized (APIs, forms, CLIs)
- [ ] SQL/NoSQL/command injection vectors addressed
- [ ] XSS prevention (escaping, CSP, no unsafe `dangerouslySetInnerHTML` without sanitization)
- [ ] File upload or path handling validated and constrained

### 4. Authentication and Authorization

- [ ] Auth checks present on protected routes and operations
- [ ] No debug bypasses, test-only backdoors, or permissive wildcards in production paths
- [ ] Principle of least privilege applied (roles/permissions)
- [ ] Session/token handling secure (httpOnly, expiry, revocation considered)

### 5. Configuration and Environment

- [ ] CORS and security headers configured appropriately
- [ ] No production URLs, keys, or credentials in repo or default config
- [ ] Required env vars documented (e.g. `.env.example`)

### 6. Data and Logging

- [ ] No PII or credentials logged in plain text
- [ ] Sensitive data not exposed in API responses beyond what is necessary
- [ ] Data in transit considered (HTTPS, secure channels)

### 7. Data at Rest and Encryption

- [ ] Sensitive data at rest is encrypted (DB fields, file storage, backups) using strong, standard algorithms (e.g. AES-256, library/default encryption)
- [ ] Encryption keys are managed separately from data (key vault, env, or secrets manager—not in repo or next to encrypted payloads)
- [ ] No sensitive or PII stored in plain text when encryption is feasible (assess by data classification and risk)
- [ ] Full-disk or volume encryption considered for environments that hold sensitive data (e.g. production, staging with real-like data)
- [ ] Hashing vs encryption used appropriately (e.g. one-way hashing for passwords; encryption where data must be readable)

### 8. Proprietary and Business-Sensitive Information

*For leadership review: ensure code and shared context do not expose information that could harm the business if seen by AI systems, third parties, or future contributors.*

- [ ] No trade secrets, proprietary algorithms, or “secret sauce” logic documented in plain language in comments or commit messages
- [ ] No unreleased product roadmaps, pricing strategy, or M&A details in repo or context files
- [ ] No customer names, deal terms, or confidential business data in code, config, or logs
- [ ] AI-facing context (e.g. `.ai/context/`, prompts, pasted snippets) contains only what is safe to share—no confidential strategy or IP
- [ ] Clear boundary between “shareable for tooling” and “internal only”; sensitive design decisions not committed where they could be sent to external AI

---

## Output Format

Write the scan report to `.ai/context/last_security_scan.md` (or output in chat if file write is not allowed) using this structure:

```markdown
# Security Scan: [Scope]

## Summary
[1–2 sentence overview of what was scanned]

## Critical
[Issues that must be fixed before merge or release]

## High
[Important issues that should be addressed soon]

## Medium / Low
[Improvements and best-practice gaps]

## Data at rest / encryption
[Gaps in encryption or key management; sensitive data stored unencrypted where it could be; opportunities to align with best practices for data at rest]

## Proprietary / business-sensitive
[Trade secrets, confidential strategy, or IP in code/context that leadership should be aware of—especially before sharing with AI or external tooling]

## Clean
[Areas checked with no issues found]

## Verdict
- [ ] Pass (no critical/high)
- [ ] Fail (critical or high issues present)

## Next Steps
[Concrete actions: fix X, add Y, run Z]
```

---

## Severity

| Level     | Meaning                    | Action                    |
|----------|----------------------------|---------------------------|
| Critical | Active security risk       | Fix before merge/release  |
| High     | Significant exposure       | Fix soon, before release  |
| Medium   | Best-practice or hardening | Plan to address           |
| Low      | Minor or theoretical       | Optional improvement      |

---

## Integration with Workflow

This command fits in Phase 3 (Quality Assurance):

1. `/execute_plan` — Implement feature
2. `/code_review` — Full code review (includes security)
3. **`/security_scan`** — Dedicated security scan (this command)
4. `/qa_checklist` — Manual testing
5. `/peer_review` — Human review (if needed)

Run `/security_scan` when you want a focused pass on security without the full code review checklist, or after code_review for an extra security pass.

---

**Workflow Position:** Run after `/code_review` (or in parallel) during Phase 3: Quality Assurance.

**Next Steps:**
1. Fix any critical or high issues reported
2. Re-run scan after changes if needed
3. Run `/qa_checklist` for manual testing
4. Run `/peer_review` for human review on significant changes

See `.cursor/commands/workflow.md` for the complete development workflow.
