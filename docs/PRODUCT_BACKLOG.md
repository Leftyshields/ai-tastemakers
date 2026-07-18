# Product backlog: AI Tastemakers

Follow-on work for the digest app (`src/tastemaker/`). Ordered loosely by priority; no hard dependencies unless noted.

---

## Open

| ID | Title | Status | Done when |
|----|--------|--------|-----------|
| DIST-1 | Slack / Substack distribution | Backlog | Optional channels beyond Resend email |
| RANK-1 | Ranking tuning | Backlog | Bootstrap quality after ~7 days of snapshots; tune `DIGEST_MAX_STARS_BOOTSTRAP`, blocklist |
| ENRICH-2 | Firecrawl web enrich (Skills) | **Baseline** | Experiment [EXP-20260716-firecrawl-enrich-skills](../data/experiments/EXP-20260716-firecrawl-enrich-skills.json) in baseline since 2026-07-18 (Jina control). Parallel with [EXP-20260701-landing-layout](../data/experiments/EXP-20260701-landing-layout.json). Ship Firecrawl adapter before treatment (~2026-08-01). **Shadow rubric primary**, clicks secondary. Done when verdict + keep/revert recorded |
| RANK-2 | Soft-dedup diversity (Skills) | **Queued** | Experiment [EXP-20260715-soft-dedup-diversity-skills](../data/experiments/EXP-20260715-soft-dedup-diversity-skills.json) registered as `draft`. **Blocked on** landing-layout + firecrawl completing (~2026-08-14). Baseline planned 2026-08-15. Verdict on **diversity first** (overlap / uniqueness / NEW share); PostHog clicks **secondary**. Done when verdict + keep/revert recorded |
| UX-1 | Brief page repo cards + TOC | Backlog | Richer brief pages on GitHub Pages |
| OPS-1 | Alert on digest/email failure | **Partial** | Verify workflow + `DIGEST_ALERT_TO` shipped; direct GHA failure alert + non-blocking email still open |
| QA-1 | Manual `/qa_checklist` pass | **Done** | `.ai/context/qa_checklist_daily-digest-reliability.md`; production spot-check 2026-06-27 |

---

## Shipped (reference)

| Item | Notes |
|------|--------|
| **SUB-1 Firebase subscribe** | Firestore `tastemakers_subscribers` on **epiphoric-prod**; subscribe page uses web SDK; digest reads via Admin SDK |
| Resend daily digest email | Pipeline sends after each digest when configured |
| Subscribe page | `/subscribe.html` on GitHub Pages |
| File-based subscribers fallback | `data/subscribers.json` merged at send time |

### SUB-1 ops checklist (after deploy)

- [x] Deploy Firestore rules from Epiphoric repo
- [x] Seed subscribers / GitHub secrets
- [x] Pages deploy + subscribe form

### GitHub secret scanning alerts

Firebase **web** API keys are meant to appear in client apps (and in built `subscribe.html`). GitHub still flags them if committed in git. **Do not commit keys in workflow files** — use repo secrets (`FIREBASE_API_KEY`, `FIREBASE_APP_ID`) for the Pages build only.

If alerted after a bad commit: revert the commit, close the alert in GitHub, and restrict the key in [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials) (HTTP referrers: `leftyshields.github.io/*`, your Epiphoric domains, `localhost/*`). Rotation is optional unless you suspect abuse; the same key is used by Epiphoric prod.

See `firebase/README.md`.
