# Experiment Lifecycle Playbook

Step-by-step operator guide when you get a **Lab reminder** email.  
Reminders fire on window boundary dates in `data/experiments/EXP-*.json` (Pacific time).

**Quick links**

| Resource | URL |
|----------|-----|
| Lab dashboard | https://leftyshields.github.io/ai-tastemakers/lab/experiments.html |
| PostHog home | https://us.posthog.com/project/489599/home |
| PostHog web analytics | https://us.posthog.com/project/489599/web |
| PostHog new trend | https://us.posthog.com/project/489599/insights/new |
| This repo | https://github.com/Leftyshields/ai-tastemakers |

---

## What the email means (30-second version)

Each experiment has two measurement windows:

1. **Baseline** — control behavior (flags **off** in production).
2. **Treatment** — changed behavior (flags **on**).

You get an email on **four dates per experiment**:

| Milestone | What it means |
|-----------|----------------|
| Baseline **starts** | Measurement began; keep control config; watch PostHog. |
| Baseline **ends** | Export metrics → import **baseline snapshot** into experiment JSON. |
| Treatment **starts** | Turn on treatment flags in GitHub Actions → redeploy if needed. |
| Treatment **ends** | Export metrics → import **treatment snapshot** → write **verdict** → turn flags off if not keeping. |

Nothing is automatic except the reminder email. You edit JSON, workflows, and commit to `main`.

---

## Registered experiments (as of 2026-07-16)

### Queue & timelines (operator order)

| # | Experiment | Surface | Status | Baseline (PT) | Treatment (PT) | Blocked on |
|---|------------|---------|--------|---------------|----------------|------------|
| 1 | [EXP-20260628-web-enrich-skills](#exp-20260628-web-enrich-skills-skills-digest-enrichment) | Skills digest | active | 2026-06-28 → 2026-07-11 | 2026-07-12 → **2026-07-26** | — |
| 2a | [EXP-20260701-landing-layout](#exp-20260701-landing-layout-homepage-layout-v2) | Site (Pages) | draft | 2026-07-27 → 2026-08-09 | 2026-08-10 → 2026-08-23 | #1 complete |
| 2b | [EXP-20260716-firecrawl-enrich-skills](#exp-20260716-firecrawl-enrich-skills-firecrawl-web-enrich) | Skills digest | draft | 2026-07-27 → 2026-08-09 | 2026-08-10 → 2026-08-23 | #1 complete; enrich kept on |
| 3 | [EXP-20260715-soft-dedup-diversity-skills](#exp-20260715-soft-dedup-diversity-skills-skills-soft-dedup-diversity) | Skills digest | draft | 2026-08-24 → 2026-09-06 | 2026-09-07 → 2026-09-20 | #2a + #2b complete |

**Parallelism:** 2a (site) and 2b (digest enrich) share the same calendar window but different surfaces. Do **not** run two Skills digest treatments at once — soft-dedup waits until firecrawl ends.

---

### EXP-20260628-web-enrich-skills (Skills digest enrichment)

| Window | Dates (PT) |
|--------|------------|
| Baseline | 2026-06-28 → **2026-07-11** |
| Treatment | **2026-07-12** → **2026-07-26** |

**Hypothesis:** Post-rank web/HN enrichment improves outbound repo clicks on Skills briefs.

**Treatment flags (digest pipeline):**

- `DIGEST_ENRICH_WEB=1` — fetch Jina/HN context before Claude narration
- `DIGEST_ENRICH_SHADOW=0` in production (use `=1` only for local side-by-side review runs)

**Primary metric:** PostHog event `outbound_repo_click` on Skills briefing pages.

**Lab writeup:** [briefings/lab/posts/EXP-20260628-web-enrich-skills.md](../briefings/lab/posts/EXP-20260628-web-enrich-skills.md)

---

### EXP-20260701-landing-layout (Homepage layout v2)

| Window | Dates (PT) |
|--------|------------|
| Baseline | 2026-07-27 → 2026-08-09 |
| Treatment | 2026-08-10 → 2026-08-23 |

**Queued behind** web-enrich-skills — do not start baseline until prior experiment is complete (~2026-07-26).

**Treatment flag (site build only):**

- `SITE_LANDING_LAYOUT_V2=1` — reflow homepage index pages (OSS + Skills)

**Primary metric:** PostHog event `homepage_index_click` (props: `edition`, `cta`, `target_path`).

---

### EXP-20260716-firecrawl-enrich-skills (Firecrawl web enrich)

| Window | Dates (PT) |
|--------|------------|
| Baseline | 2026-07-27 → 2026-08-09 |
| Treatment | 2026-08-10 → 2026-08-23 |

**Queued behind** web-enrich-skills — start only after that verdict (~2026-07-26) **and** with `DIGEST_ENRICH_WEB=1` still on (Jina = control). Runs **in parallel** with landing-layout (site vs digest).

**Catalog source:** [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) (Lab inventory: context-enrichment).

**Hypothesis:** Firecrawl yields better web context than Jina Reader → higher brief quality on Skills pages (shadow rubric primary).

**Treatment flags (Skills digest; implement adapter before treatment):**

- `DIGEST_ENRICH_WEB=1` — enrichment stays on
- `DIGEST_ENRICH_WEB_PROVIDER=firecrawl` — swap Jina → Firecrawl for the web leg (HN unchanged)
- `DIGEST_ENRICH_SHADOW=0` in production (`=1` for local shadow only)
- Secret: `FIRECRAWL_API_KEY`

**Primary metrics (decide keep/revert on these):**

1. Shadow rubric: Jina (control) vs Firecrawl (treatment) side-by-side
2. Qualitative brief quality on published Skills pages during treatment

**Secondary metrics (collect, do not gate):** PostHog `outbound_repo_click` + Skills pageviews (traffic still low).

**Backlog:** [ENRICH-2](./PRODUCT_BACKLOG.md)

---

### EXP-20260715-soft-dedup-diversity-skills (Skills soft-dedup diversity)

| Window | Dates (PT) |
|--------|------------|
| Baseline | 2026-08-24 → 2026-09-06 |
| Treatment | 2026-09-07 → 2026-09-20 |

**Queued behind** landing-layout **and** firecrawl-enrich-skills — do not start baseline until both complete (~2026-08-23). Also requires web-enrich-skills to be complete (Skills pipeline should not run two treatments at once).

**Hypothesis:** Stronger soft-dedup (longer memory of recent picks + harsher score penalty) opens more list slots for less-repeated repos without abandoning 7-day momentum ranking.

**Treatment flags (Skills digest step in `digest.yml` only):**

- `DIGEST_SOFT_DEDUP_BRIEFINGS=14` (default `5`)
- `DIGEST_SOFT_DEDUP_PENALTY=0.15` (default `0.5`; lower = harsher on repeats)

Leave OSS digest soft-dedup at defaults during this canary.

**Primary metrics (decide keep/revert on these):**

1. Structural diversity from `digest.json`: consecutive-day overlap, unique repos / week, share of `is_new` in top 10
2. Suggested success bar: consecutive-day overlap down ≥15pp vs baseline

**Secondary metrics (collect, do not gate):**

- PostHog `outbound_repo_click` where `edition = skills`, plus Skills briefing pageviews
- Site traffic is still low — expect sparse click counts; record trends for later growth, but do not fail the experiment solely on CTR

**Backlog:** [RANK-2](./PRODUCT_BACKLOG.md)

---

## PostHog export (detailed)

You need numbers from PostHog for each **completed window** (baseline end and treatment end). Save exports under something like `data/experiments/exports/` (gitignored is fine) or your Desktop.

### A. What to collect

For **web-enrich-skills** (Skills edition):

1. **Pageviews** — Skills briefing pages (`/briefings/skills/YYYY-MM-DD.html`) during the window.
2. **Outbound clicks** — event `outbound_repo_click` where `edition = skills` during the window.

For **landing-layout** (both editions):

1. **Pageviews** — `/index.html`, `/skills/index.html`.
2. **Homepage clicks** — event `homepage_index_click` during the window.

### B. PostHog UI steps (manual export)

1. Open [PostHog home](https://us.posthog.com/project/489599/home) (Default project — sidebar on the left).
2. Set **date range** to the experiment window (e.g. baseline: 2026-06-28 through 2026-07-11 inclusive) using the date picker at the top of each view.
3. **Pageviews**
   - Sidebar: **Analytics → Web analytics** ([direct link](https://us.posthog.com/project/489599/web))
   - Filter paths relevant to the experiment (Skills briefs or index pages).
   - Export CSV if available, or copy counts into the simplified format below.
4. **Custom events**
   - Sidebar: **Analytics → Product analytics → Trends** ([new insight](https://us.posthog.com/project/489599/insights/new))
   - Event: `outbound_repo_click` or `homepage_index_click`
   - Add filters (e.g. `edition = skills` for enrich experiment)
   - Note total events; for per-repo breakdown use breakdown by a repo property if you configured one, or use aggregate count.
5. Save the file, e.g. `data/experiments/exports/EXP-20260628-baseline-2026-07-11.csv`

**Ad-blockers** under-count traffic — note that in your verdict if numbers look low.

### C. CSV format the importer accepts

The CLI accepts either PostHog’s **pages export** (columns like `page` + `pageviews`) **or** this **simplified format** (easiest if PostHog export is awkward):

```csv
type,key,count
pageview,/briefings/skills/2026-06-28.html,42
pageview,/briefings/skills/2026-06-29.html,38
outbound_click,owner/repo-name,5
outbound_click,_aggregate,120
```

- `type`: `pageview` or `outbound_click`
- `key`: path (pageviews) or `owner/repo` (clicks); `_aggregate` for a single total
- `count`: integer

You can hand-build this from PostHog screenshots — precision beats perfect automation.

### D. Import snapshot into experiment JSON

From repo root, with dates matching the window you exported:

**Baseline window (web-enrich example):**

```bash
# Preview parsed metrics (does not write JSON)
npm run experiment -- snapshot EXP-20260628-web-enrich-skills \
  --csv data/experiments/exports/EXP-20260628-baseline.csv \
  --period-start 2026-06-28 \
  --period-end 2026-07-11 \
  --dry-run

# Write to data/experiments/EXP-20260628-web-enrich-skills.json
npm run experiment -- snapshot EXP-20260628-web-enrich-skills \
  --csv data/experiments/exports/EXP-20260628-baseline.csv \
  --period-start 2026-06-28 \
  --period-end 2026-07-11
```

**Treatment window (same experiment, later):**

```bash
npm run experiment -- snapshot EXP-20260628-web-enrich-skills \
  --csv data/experiments/exports/EXP-20260628-treatment.csv \
  --period-start 2026-07-12 \
  --period-end 2026-07-26
```

If you omit `--period-start` / `--period-end`, the CLI defaults to **baseline_window** dates only — always pass explicit dates for treatment imports.

**Publish updated dashboard:**

```bash
npm run build:pages
git add data/experiments/EXP-*.json
git commit -m "chore: import experiment snapshot for EXP-… baseline|treatment"
git push origin main
```

Pushing experiment JSON triggers **Deploy GitHub Pages** (see `pages.yml` paths). Confirm at [/lab/experiments.html](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html).

---

## Milestone playbooks

### 1. Baseline window **starts**

**Goal:** Confirm you’re measuring control behavior only.

1. Open [lab experiments dashboard](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html) — note window dates.
2. In `data/experiments/EXP-….json`, set `"status": "baseline"` if still `draft`.
3. **Do not** enable treatment flags in GitHub yet.
4. Spot-check PostHog live: open a briefing page, confirm `$pageview` in PostHog **Live events** (optional).
5. Commit status change if you edited JSON.

---

### 2. Baseline window **ends** ← you are here for web-enrich on 2026-07-11

**Goal:** Freeze baseline metrics in the experiment record.

1. **Export PostHog** for baseline dates (see [PostHog export](#posthog-export-detailed)).
2. **Import snapshot** with `--period-start` / `--period-end` = baseline window ([Import snapshot](#d-import-snapshot-into-experiment-json)).
3. `npm run build:pages` → commit → push.
4. **Shadow rubric (web-enrich only, before treatment):** optional but recommended:
   ```bash
   EXPERIMENT_ID=EXP-20260628-web-enrich-skills \
   DIGEST_ENRICH_WEB=1 \
   DIGEST_ENRICH_SHADOW=1 \
   npm run digest -- --edition skills
   ```
   Review `data/experiments/runs/{run_id}/shadow.json` against [shadow rubric](https://leftyshields.github.io/ai-tastemakers/lab/shadow-rubric.html).
5. Prepare for treatment start **next day** (2026-07-12 for web-enrich).

---

### 3. Treatment window **starts**

**Goal:** Production runs with the change enabled.

#### EXP-20260628-web-enrich-skills

1. Edit `.github/workflows/digest.yml` — add to the **Run digest** step `env:`:
   ```yaml
   DIGEST_ENRICH_WEB: "1"
   DIGEST_ENRICH_SHADOW: "0"
   ```
2. In `data/experiments/EXP-20260628-web-enrich-skills.json`, set `"status": "active"`.
3. Commit and push to `main`.
4. Next scheduled digest runs with enrichment on Skills pipeline (canary: Skills edition only in current design).
5. Monitor first treatment digest in PostHog / briefing quality.

#### EXP-20260701-landing-layout

1. GitHub repo → **Settings → Secrets and variables → Actions → Variables**
2. Set **`SITE_LANDING_LAYOUT_V2`** = `1` (repo variable; already wired in `pages.yml`).
3. Run **Deploy GitHub Pages** workflow (or push any `pages.yml` trigger path).
4. Set experiment `"status": "active"` in JSON; commit.
5. Verify live site homepage layout at OSS and Skills index URLs.

---

### 4. Treatment window **ends**

**Goal:** Measure treatment, decide keep or revert.

1. **Export PostHog** for **treatment** dates (not baseline dates).
2. **Import snapshot** with treatment `--period-start` / `--period-end`.
3. Compare baseline vs treatment snapshots on lab dashboard (outbound CTR or homepage clicks).
4. Edit `data/experiments/EXP-….json`:
   ```json
   "verdict": "One paragraph: what changed, numbers, decision.",
   "keep_change": true,
   "status": "complete"
   ```
   Use `"keep_change": false` if reverting.
5. **If not keeping:** remove treatment flags (`digest.yml` env vars or `SITE_LANDING_LAYOUT_V2` variable), commit, redeploy.
6. `npm run build:pages` → commit experiment JSON → push.

---

## Cheat sheet (copy-paste)

```bash
# List experiments
npm run experiment -- list

# Dry-run reminder email for a date
npm run experiment:reminders -- --dry-run --date 2026-07-11

# Import baseline snapshot (web-enrich)
npm run experiment -- snapshot EXP-20260628-web-enrich-skills \
  --csv path/to/export.csv \
  --period-start 2026-06-28 --period-end 2026-07-11

# Import treatment snapshot (web-enrich)
npm run experiment -- snapshot EXP-20260628-web-enrich-skills \
  --csv path/to/export.csv \
  --period-start 2026-07-12 --period-end 2026-07-26

# Rebuild lab UI after JSON changes
npm run build:pages
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Reminder email but no time to act | Dates are in JSON + [lab dashboard](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html); export can happen a day late if you note actual window in `--period-*` |
| `CSV is empty` | Check file path; run from repo root |
| Snapshot imported wrong window | Re-import with correct `--period-start` / `--period-end`; snapshots append (edit JSON manually to remove bad entry if needed) |
| Lab page stale after import | Push JSON to `main` or run **Deploy GitHub Pages** |
| GHA digest unchanged after flag edit | Confirm change is on `main` in `digest.yml`, not just local `.env` |
| Landing layout not visible | Confirm `SITE_LANDING_LAYOUT_V2` **variable** (not secret) = `1` and Pages deploy ran |

---

## Related docs

- [DEV_RUNBOOK.md — Experiment lifecycle reminders](./DEV_RUNBOOK.md#experiment-lifecycle-reminders)
- [DATA_FORMAT_REFERENCE.md — Experiment record schema](./DATA_FORMAT_REFERENCE.md)
- [CLOSURE EPH-20260628-SRCH](./CLOSURE_EPH-20260628-SRCH.md)
- [CLOSURE EPH-20260701-LAND](./CLOSURE_EPH-20260701-LAND.md)
