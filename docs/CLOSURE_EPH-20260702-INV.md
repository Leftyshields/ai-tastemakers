# Closure — EPH-20260702-INV

**Title:** Automate tool inventory refresh after Sunday weekly digest  
**Status:** Code shipped; GHA verification pending next Sunday run  
**Closed:** 2026-07-02  
**Issue:** EPH-20260702-INV

---

## What shipped

### Sunday gate (`scripts/sunday-wrap-gate.mjs`)

- Added `is_sunday` output (America/Los_Angeles), alongside `run_weekly` / `run_monthly`.

### Daily Digest workflow (`.github/workflows/digest.yml`)

- **Refresh tool inventory (Sundays)** step: `npm run inventory:tools` when `is_sunday == true` (after weekly/monthly; not gated on wrap-up success).
- Expanded **setup-node**, **Install dependencies**, and **Commit** `if` conditions to include `is_sunday`.
- Commit stages `data/tool-inventory.json` (+ `briefings/` for markdown).
- Commit messages:
  - Inventory-only skip path: `chore: refresh tool inventory`
  - Otherwise: append ` + tool inventory` on Sundays when briefings also change.
- **Deploy GitHub Pages** unchanged — fires when commit succeeds (including inventory-only).

### Docs

- `docs/ARCHITECTURE.md` — inventory cadence: weekly (Sunday GHA) + on-demand local.
- `docs/DEV_RUNBOOK.md` — Sunday auto-run note on tool inventory row.

### One-time staleness fix (local)

- Ran `npm run inventory:tools` — updated from 45 → **55** briefing artifacts, `generated_at` 2026-06-28 → 2026-07-02.

---

## Not changed (by design)

- `src/tastemaker/inventory-cli.ts` and scan/merge/classify logic
- `.github/workflows/pages.yml`
- Lab UI / static page generator

---

## Verification

| Check | Result |
|-------|--------|
| `node scripts/sunday-wrap-gate.mjs` emits `is_sunday` | ✅ (false on 2026-07-02 Thu) |
| `npm run inventory:tools` exits 0, updates JSON + markdown | ✅ |
| `npm run test:digest` | ✅ (run at ship time) |
| Sunday GHA end-to-end | ⏳ Pending next Sunday cron or manual dispatch on a Sunday |

### Post-deploy operator check (next Sunday)

1. Confirm Daily Digest workflow commit includes `data/tool-inventory.json` and/or `briefings/lab/tool-inventory.md`.
2. Confirm Deploy GitHub Pages succeeds.
3. Confirm https://leftyshields.github.io/ai-tastemakers/lab/tools.html shows updated `Generated … from N briefing artifact(s)`.

---

## Acceptance criteria

- [x] `is_sunday` gate in digest workflow
- [x] Inventory step uses `npm run inventory:tools` (parity with local)
- [x] No new secrets or env vars
- [x] Docs updated
- [ ] Production Sunday GHA run (pending calendar)

---

## Timestamp

2026-07-02T15:58:00Z
