# GitHub repository settings

Recommended settings for [Leftyshields/project-genesis](https://github.com/Leftyshields/project-genesis).

---

## Branch protection for `main` (PRs, excluding yourself)

**Goal:** Require pull request reviews for merges to `main`, with the PR author excluded from counting as a reviewer. You (owner) can still push directly to `main`.

### Steps

1. Go to **Settings** → **Branches** → **Branch protection rules** → **Add rule** (or edit the rule for `main`).
2. **Branch name pattern:** `main`
3. Enable:
   - **Require a pull request before merging**
     - **Required approvals:** `1` (or more if you want)
     - GitHub does **not** count the PR author as an approver by default, so “excluding yourself” is already satisfied: a PR you open will need approval from someone else (or from another collaborator you add).
   - **Require status checks to pass before merging** (optional): add any CI you use later.
   - **Do not allow bypassing the above settings** — leave **unchecked** if you want to push to `main` without a PR.
4. **Allow specified actors to bypass required pull requests** — **enable** this, then add:
   - **Leftyshields** (or your user), or
   - **Repository administrators**
   so you can still commit and push directly to `main` while others must use a reviewed PR.
5. Optionally:
   - **Dismiss stale pull request approvals when new commits are pushed:** enable if you want fresh approval after new pushes.
   - **Require conversation resolution before merging:** enable if you want all comments resolved.
6. Save the rule.

### Summary

| Setting | Value |
|--------|--------|
| Branch name pattern | `main` |
| Require a pull request | Yes |
| Required approvals | 1 (author does not count) |
| Allow bypass | Yes — add Leftyshields (or admins) |
| Restrict pushes | No (so you can push to main) |

Result: You can push to `main`. Contributors (or you when you choose to open a PR) must get at least one approval from someone other than the PR author before merge.

---

## Backlog ↔ GitHub Issues mapping

**Keep issues in sync:** When a backlog story is completed, close the corresponding GitHub issue if you use one (or add a comment with the PR/commit, then close). Issue bodies can include **Done when**, **Depends on**, and a link to `docs/backlog.md`.
