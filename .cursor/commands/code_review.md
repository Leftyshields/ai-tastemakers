# Automated Code Review

You are now in code review mode. Review the code changes systematically.

---

## What to Review

Specify what to review:
- A specific file: `Review src/components/IdeaCard.jsx`
- Recent changes: `Review changes since last commit`
- A feature: `Review the admin role implementation`

If not specified, review all uncommitted changes.

---

## Review Checklist

### 1. Security (CRITICAL)

- [ ] No hardcoded secrets, API keys, or credentials
- [ ] No sensitive data in logs or error messages
- [ ] Input validation on all user inputs
- [ ] SQL/NoSQL injection prevention
- [ ] XSS prevention (especially in React dangerouslySetInnerHTML)
- [ ] Authentication/authorization checks in place
- [ ] CORS configured correctly

**If security issues found: STOP and flag immediately.**

### 2. Correctness

- [ ] Code does what it claims to do
- [ ] Edge cases handled
- [ ] Error handling is appropriate
- [ ] No obvious bugs or logic errors
- [ ] Race conditions considered (async code)
- [ ] State updates are correct (functional updates when needed)

### 3. Architecture

- [ ] Changes follow existing patterns
- [ ] No unnecessary complexity
- [ ] Separation of concerns maintained
- [ ] Dependencies are appropriate
- [ ] **Backend parity:** All entry points in `docs/ARCHITECTURE.md` updated; shared handlers used (if API changes)

### 4. Code Quality

- [ ] Readable and self-documenting
- [ ] Consistent naming conventions
- [ ] No dead code or unused imports
- [ ] No console.log statements (except intentional logging)
- [ ] Comments explain "why" not "what"
- [ ] Functions are focused (single responsibility)

### 5. Performance

- [ ] No N+1 queries or unnecessary loops
- [ ] Expensive operations are memoized/cached
- [ ] No memory leaks (event listeners cleaned up)
- [ ] Bundle size impact considered
- [ ] React: useMemo/useCallback used appropriately

### 6. Testing

- [ ] New code has tests (or documented reason why not)
- [ ] Tests cover happy path and error cases
- [ ] Tests are readable and maintainable
- [ ] No flaky tests introduced

---

## Output Format

```markdown
# Code Review: [Feature/File Name]

## Summary
[1-2 sentence overview of what was reviewed]

## Security Issues 🔴
[List any security concerns - these are blockers]

## Bugs / Correctness Issues 🟠
[List bugs or logic errors]

## Suggestions 🟡
[Improvements that would be nice but aren't blockers]

## Positive Notes 🟢
[What was done well]

## Verdict
- [ ] ✅ Approved
- [ ] ⚠️ Approved with suggestions
- [ ] ❌ Changes requested

## Next Steps
[Specific actions needed before merge]
```

---

## Severity Levels

| Level | Meaning | Action Required |
|-------|---------|-----------------|
| 🔴 Critical | Security issue or major bug | Must fix before merge |
| 🟠 Major | Bug or significant issue | Should fix before merge |
| 🟡 Minor | Improvement opportunity | Consider fixing |
| 🟢 Nitpick | Style preference | Optional |

---

## Review Principles

1. **Be constructive** - Suggest fixes, not just problems
2. **Be specific** - Point to exact lines/files
3. **Prioritize** - Security > Bugs > Quality > Style
4. **Trust the author** - Assume good intent
5. **Learn** - Reviews are learning opportunities for both sides

---

## Integration with Workflow

This command fits after implementation:

1. `/execute_plan` - Implement feature
2. `/tdd` - Test-driven development (if complex logic)
3. `/code_review` - Automated review (this command)
4. `/qa_checklist` - Manual testing
5. `/peer_review` - Human review (if needed)

---

## When to Run

- Before committing significant changes
- After completing a feature
- Before creating a PR
- When reviewing someone else's code

---

**Note:** This automated review complements but doesn't replace human review for complex changes.
