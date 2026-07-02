# Closure — EPH-20260701-LAND

**Title:** Rebalance landing page grid — reflow main column, compact archive, footer fix  
**Status:** Code shipped (flag-gated; not live in production until experiment treatment)  
**Closed:** 2026-07-02  
**Experiment:** [EXP-20260701-landing-layout](../data/experiments/EXP-20260701-landing-layout.json)

---

## What shipped

### Layout v2 refactor (`SITE_LANDING_LAYOUT_V2=1`)

**Generator:** `scripts/edition-pages.ts`, `scripts/index-layout-helpers.ts`

- **Main column:** Hero → How it works / About → month-tile archive heat-map → Weekly → Monthly
- **Sidebar:** Sibling-edition promo card only (OSS ↔ Skills)
- **Archive:** `groupDatesByMonth` + `buildMonthCalendarCells` — 7-column day grid per month with filled day links
- **Styling:** `.main-block-card`, `.archive-day*` heat-map tokens in `site/assets/input.css`
- **Hero copy:** OSS headline updated (velocity vs static star leaderboard)
- **Analytics:** Reuses `homepage_index_click` with `data-index-cta` on index CTAs
- **Legacy path:** Unchanged when flag unset (production default)

### Global footer component

- `footerLinkRowHtml()` — explicit `&middot;` separators between links
- `.site-footer`, `.site-footer__links`, `.site-footer__link`, `.site-footer__sep`, `.site-footer__meta` in `input.css`
- Applied via `pageShell()` on generated pages + hand-updated `site/unsubscribe.html`

### Tests & config

- `scripts/index-layout-helpers.test.ts` — 16 tests
- `vitest.config.ts` — includes `scripts/**/*.test.ts`
- `loadTopRepoMetaMap()` — batched digest reads (code review fix)

### Docs & ops

- `docs/DEV_RUNBOOK.md` — v2 preview command
- `.env.example` — `SITE_LANDING_LAYOUT_V2` documented
- `.github/workflows/pages.yml` — triggers on `index-layout-helpers.ts`
- `data/experiments/EXP-20260701-landing-layout.json` — hypothesis/change_summary aligned to reflow layout

---

## Deferred

| Item | Notes |
|------|--------|
| **Production v2 layout** | Keep flag off until EXP-20260628 completes and baseline window starts (~2026-07-27 – 2026-08-09) |
| **Treatment deploy** | Set `SITE_LANDING_LAYOUT_V2=1` in Pages build ~2026-08-10 |
| **PostHog baseline snapshots** | After baseline window: `npm run experiment -- snapshot EXP-20260701-landing-layout --csv …` |
| **`npm run build:digest`** | Pre-existing TS errors in inventory/firestore — unrelated |
| **Year-strip heat-map** | Follow-up; month tiles sufficient for v1 |
| **Sticky promo sidebar** | Nice-to-have; not v1 |

---

## Ship commands

```bash
# Tests (primary gate)
npm test
npx vitest run scripts/index-layout-helpers.test.ts

# Preview v2 layout locally
SITE_LANDING_LAYOUT_V2=1 npm run build:pages
cd site && python3 -m http.server 8999
# Open http://localhost:8999/ and http://localhost:8999/skills/
# Verify footer: spaced link row + muted metadata row below

# Commit (from repo root)
git pull --rebase origin main   # absorb GHA digest commits if behind
git add -A
git commit -m "$(cat <<'EOF'
Closes EPH-20260701-LAND: landing layout v2 reflow + footer component

Flag-gated homepage reflow (main column synthesis + month-tile archive,
promo-only sidebar), global footer CSS with explicit link separators,
layout helper tests, and experiment metadata aligned to reflow hypothesis.
EOF
)"
git push origin main

# Production Pages deploy triggers on push when briefings/ or scripts/site/assets change.
# v2 layout NOT active until SITE_LANDING_LAYOUT_V2=1 at treatment start (~2026-08-10).
```

---

## Acceptance criteria

| Criterion | Met |
|-----------|-----|
| Main column holds How it works / About, archive, weekly, monthly | Yes (flag on) |
| Sidebar promo-only on desktop | Yes |
| Month-tile archive heat-map replaces accordion (v2) | Yes |
| Legacy layout unchanged (flag off) | Yes |
| Footer links separated and center-aligned | Yes (component CSS + separators) |
| Metadata row muted below links | Yes |
| Anchors `#archive`, `#weekly-archive`, `#monthly-archive` preserved | Yes |
| Experiment JSON describes reflow hypothesis | Yes |
| Automated tests pass | Yes |
| Manual QA (local v2 preview) | Yes — closed 2026-07-02 |
| Live production v2 treatment | **Deferred** (~2026-08-10) |

---

## Postmortem

`.ai/context/postmortem_EPH-20260701-LAND.md` (local; `.ai/context/` gitignored)

**Key lesson:** Tailwind utilities in TS-generated HTML are unreliable for spacing; use `input.css` component classes and explicit HTML separators.

---

## QA

**Checklist:** `.ai/context/qa_checklist_landing-reflow.md` (closed 2026-07-02)

Automated + browser verification on `SITE_LANDING_LAYOUT_V2=1` local preview (`localhost:8999`): OSS/Skills index layout, footer spacing, mobile promo order, archive links, and anchors — all pass.

---

## Live verification (manual)

After local v2 build:

- [x] OSS index — main column taller blocks, narrow promo sidebar
- [x] Skills index — About block + OSS promo sidebar
- [x] Footer — `Subscribe · Skill Tastemakers · Lab · Source on GitHub` on row 1; metadata on row 2
- [x] Mobile — promo card after weekly/monthly
- [x] Archive day cells link to correct brief dates

**Live site (legacy layout until treatment):** https://leftyshields.github.io/ai-tastemakers/
