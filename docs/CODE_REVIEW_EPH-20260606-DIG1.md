# Code Review: EPH-20260606-DIG1 (Daily Digest v1)

**Date:** 2026-06-07  
**Scope:** `src/tastemaker/`, `scripts/build-pages.ts`, GHA workflows  
**Verdict:** Approve with fixes applied (see below)

---

## Summary

The pipeline is well-structured with dependency injection for tests, clear module boundaries, and sensible skip-on-failure for Claude. No hardcoded secrets in source. Main issues: **bootstrap max-stars filter applied during delta ranking**, missing env parse validation, and **unescaped HTML** in static site shell. Security surface is low (CLI + static site from trusted pipeline output).

---

## Critical

_None._

---

## High

### H1. `maxStarsBootstrap` applied before ranking mode is known

**File:** `pipeline.ts`  
**Issue:** Repos above 80k stars are excluded even after switching to `delta_7d`, contradicting design (bootstrap-only cap).  
**Fix:** Apply max-stars cap only when `rankingMode.startsWith("bootstrap")`.  
**Status:** Fixed

---

## Medium

### M1. Invalid env integers become `NaN`

**File:** `config.ts`  
**Issue:** `parseInt("foo", 10)` silently poisons filters/ranking.  
**Fix:** `parseEnvInt` helper with fallback.  
**Status:** Fixed

### M2. Static site title not HTML-escaped

**File:** `scripts/build-pages.ts`  
**Issue:** `pageShell` injects `title` raw; low risk today (date strings) but fragile.  
**Fix:** `escapeHtml()` for title and meta description.  
**Status:** Fixed

### M3. Claude errors logged with full stack/object to stderr

**File:** `narrate/claude.ts`  
**Issue:** GHA logs may include API response bodies.  
**Fix:** Log `message` only.  
**Status:** Fixed

### M4. Markdown → HTML without sanitization on brief pages

**File:** `scripts/build-pages.ts`  
**Issue:** `marked` allows raw HTML; malicious README → Claude path is unlikely but theoretically XSS if brief content were tampered.  
**Fix:** Deferred — content is pipeline-generated; add DOMPurify if briefs become user-editable.  
**Status:** Accepted risk for v1

---

## Low

### L1. Narration runs sequentially (10 serial API calls)

**File:** `narrate/claude.ts`  
**Impact:** ~10× latency; acceptable for daily batch.  
**Status:** Deferred

### L2. Snapshot file grows ~1k lines/day unbounded

**File:** `snapshot/store.ts`  
**Impact:** Long-term I/O; collapse/compaction is v2.  
**Status:** Deferred

### L3. GHA `GITHUB_TOKEN` search rate limits

**File:** `.github/workflows/digest.yml`  
**Impact:** May need PAT with `public_repo` at scale.  
**Status:** Documented in runbook; monitor

### L4. Forks not excluded globally

**File:** `rank/filter.ts`  
**Note:** Design explicitly allows high-momentum forks. Correct as-is.

### L5. Missing unit test for bootstrap-only max stars

**Status:** Fixed — test added

### L6. Pages deploy lacks CSS artifact smoke check

**Status:** Fixed — verify step in `pages.yml`

---

## Security checklist

| Check | Result |
|-------|--------|
| Hardcoded secrets | Pass — `.env` gitignored |
| Logs leak secrets | Minor — Claude warn trimmed |
| XSS (static site) | Low risk — pipeline-owned content |
| Input validation (CLI) | N/A — no user input |
| Auth on output | N/A — public digest by design |

---

## Testing

| Area | Coverage |
|------|----------|
| Delta/ranking/filter | Good unit tests |
| Pipeline E2E | One integration test with mocks |
| build-pages | None — manual/GHA smoke |
| GHA workflows | Manual dispatch verified in ops |

---

## Approved recommendations (implemented)

- [x] H1 — bootstrap-only max stars
- [x] M1 — env int parsing
- [x] M2 — HTML escape in page shell
- [x] M3 — trim Claude error logs
- [x] L5 — max stars unit test
- [x] L6 — Pages CSS smoke check

## Deferred to v2

- [ ] M4 — HTML sanitization (DOMPurify)
- [ ] L1 — parallel narration with concurrency cap
- [ ] L2 — snapshot compaction
