# Test-Driven Development (TDD) Workflow

You are now in TDD mode. Follow the Red-Green-Refactor cycle strictly.

---

## Pre-Flight Check

Before starting TDD:
- [ ] Feature requirements are clear (check `.ai/context/last_explore.md` if exists)
- [ ] You understand what behavior to test
- [ ] Test files exist or will be created

---

## The TDD Cycle

### 1. RED: Write a Failing Test First

```
1. Define the expected behavior in plain English
2. Write a test that asserts this behavior
3. Run the test - it MUST fail
4. If test passes, you wrote the wrong test
```

**Test Naming Convention:**
```javascript
describe('ComponentName', () => {
  describe('methodName', () => {
    it('should [expected behavior] when [condition]', () => {
      // Arrange, Act, Assert
    });
  });
});
```

### 2. GREEN: Write Minimal Code to Pass

```
1. Write the SIMPLEST code that makes the test pass
2. Do not write more than necessary
3. Do not optimize yet
4. Do not handle edge cases yet (unless tested)
5. Run the test - it MUST pass
```

**Rules:**
- No production code without a failing test first
- One logical assertion per test
- If you're writing code "just in case" - stop

### 3. REFACTOR: Clean Up

```
1. Tests still pass? Good.
2. Remove duplication
3. Improve naming
4. Extract functions/methods if needed
5. Run tests after each change
6. Tests still pass? Done.
```

---

## TDD Checklist Per Feature

- [ ] Happy path test written and passing
- [ ] Edge cases identified and tested
- [ ] Error cases tested
- [ ] No untested code paths
- [ ] Tests are readable and maintainable
- [ ] Test names describe behavior, not implementation

---

## When to Use TDD

**Good for:**
- New features with clear requirements
- Bug fixes (write test that reproduces bug first)
- Refactoring (tests as safety net)
- Complex logic (validation, calculations)

**Skip for:**
- Exploratory prototyping
- UI layout tweaks
- Configuration changes

---

## Test Types (in order of value)

1. **Unit Tests** - Single function/component in isolation
2. **Integration Tests** - Multiple units working together
3. **E2E Tests** - Full user flows (use sparingly)

---

## Output Format

When implementing with TDD, report:

```
## TDD Progress

### Cycle 1: [Feature/Behavior Name]
- RED: [Test description] - FAILING ❌
- GREEN: [Implementation summary] - PASSING ✅
- REFACTOR: [What was cleaned up]

### Cycle 2: [Next Feature/Behavior]
...
```

---

## Common Mistakes

1. **Writing tests after code** - That's not TDD
2. **Testing implementation, not behavior** - Tests break on refactor
3. **Too many assertions per test** - Hard to debug failures
4. **Skipping the refactor step** - Tech debt accumulates
5. **Mocking everything** - Tests pass but integration fails

---

## Integration with Workflow

This command fits into the development workflow after `/execute_plan`:

1. `/execute_plan` - Start implementation
2. `/tdd` - Use TDD for complex logic (optional but recommended)
3. `/qa_checklist` - Manual testing
4. `/code_review` - Automated code review

---

**Remember:** TDD is about design, not testing. The tests are a side effect of good design thinking.
