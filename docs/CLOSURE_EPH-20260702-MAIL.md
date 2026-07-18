# Closure — EPH-20260702-MAIL

**Title:** Email notifications for experiment lifecycle reminders  
**Status:** Shipped and production-verified  
**Closed:** 2026-07-02  
**Deployment:** Direct to prod (no experiment-cycle gate)

---

## What shipped

### Reminder pipeline

- **`src/tastemaker/experiment-reminders.ts`** — Scan `data/experiments/EXP-*.json`, match today (PT) to window boundaries, send batched email.
- **`src/tastemaker/experiment-reminder-content.ts`** — Inline milestone runbooks (PostHog export, snapshot CLI, GHA flags, verdict steps).
- **`src/tastemaker/experiment-reminders-cli.ts`** — `npm run experiment:reminders [-- --dry-run] [-- --date YYYY-MM-DD]`.
- **`src/tastemaker/email/resend.ts`** — `sendOpsEmail()` for single-recipient ops mail.

### GitHub Actions

- **`.github/workflows/experiment-reminders.yml`** — Cron **07:00** and **07:30 PT** + `workflow_dispatch` with optional `date` input.
- Secret **`EXPERIMENT_REMINDER_TO`** → `brianshields@gmail.com` (operator-configured).

### Trigger logic

Daily job compares **today (America/Los_Angeles)** to:

- `baseline_window.start` / `end`
- `treatment_window.start` / `end`

Skips `status: complete`. One batched email per day when any milestones match.

### Docs

- `docs/DEV_RUNBOOK.md` — Experiment lifecycle reminders section
- `docs/EXPERIMENT_LIFECYCLE_PLAYBOOK.md` — Full operator guide (backup to email)
- `docs/ARCHITECTURE.md` — CLI + workflow entry points
- `README.md` — `experiment:reminders` script

### Tests

- 13 tests in `experiment-reminders.test.ts` + `sendOpsEmail` in `resend.test.ts`

---

## Production verification

| Check | Result |
|-------|--------|
| GHA **Experiment Reminders #1** | Green (~13s) |
| Live email to `brianshields@gmail.com` | Received (baseline end 2026-07-11 dry-run date) |
| Misconfig without `EXPERIMENT_REMINDER_TO` | CLI exit 1 when milestones match |

---

## Deferred

| Item | Notes |
|------|--------|
| **Day-before reminders** | v1 day-of only |
| **Persistent sent-log / dedup** | Manual same-day re-run may duplicate |
| **Catch-up for missed cron** | Documented limitation |
| **Auto PostHog API export** | Manual CSV + snapshot CLI |
| **Refactor `send-digest-alert.mjs`** | To use `sendOpsEmail()` |

---

## Ship commands

```bash
# Preview email for a milestone date (no send)
npm run experiment:reminders -- --dry-run --date 2026-07-11

# Feature tests
npm run test:digest -- src/tastemaker/experiment-reminders.test.ts

# Live send via GHA
gh workflow run "Experiment Reminders" --repo Leftyshields/ai-tastemakers -f date=2026-07-11

# One-time secret (already set)
gh secret set EXPERIMENT_REMINDER_TO --repo Leftyshields/ai-tastemakers --body "brianshields@gmail.com"
```

---

## Commits on `main`

| Commit | Summary |
|--------|---------|
| `d02e1d6` | Core reminders + GHA workflow + Resend |
| `9f971d9` | Inline runbook content in emails + playbook doc |
| `298e685` | PostHog home / Web analytics / Trends links |

---

## Related

- Capture: `.ai/context/last_capture.md` (EPH-20260702-MAIL)
- Postmortem: `.ai/context/postmortem_EPH-20260702-MAIL.md`
- Active experiments: `EXP-20260701-landing-layout` (baseline), `EXP-20260716-firecrawl-enrich-skills` (baseline)

---

## Next operator milestones (automatic email)

| Date (PT) | Milestone |
|-----------|-----------|
| 2026-07-31 | landing-layout + firecrawl baseline end |
| 2026-08-01 | landing-layout + firecrawl treatment start |
| 2026-08-14 | landing-layout + firecrawl treatment end |

---

**Closes EPH-20260702-MAIL**
