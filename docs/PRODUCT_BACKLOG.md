# Product backlog: AI Tastemakers

Follow-on work for the digest app (`src/tastemaker/`). Ordered loosely by priority; no hard dependencies unless noted.

---

## Open

| ID | Title | Status | Done when |
|----|--------|--------|-----------|
| DIST-1 | Slack / Substack distribution | Backlog | Optional channels beyond Resend email |
| RANK-1 | Ranking / bootstrap tune (Skills) | **Queued (#5)** | [EXP-20260913-rank-bootstrap-skills](../data/experiments/EXP-20260913-rank-bootstrap-skills.json) — baseline planned 2026-12-20; tune `DIGEST_SKILLS_MAX_STARS_BOOTSTRAP` after baseline review |
| ENRICH-2 | Firecrawl web enrich (Skills) | **Shipped** | Firecrawl v2 adapter + `DIGEST_ENRICH_WEB_PROVIDER=firecrawl` in production digest (2026-08-01). Requires `FIRECRAWL_API_KEY` in GHA. Archived record: `data/experiments/archive/EXP-20260716-firecrawl-enrich-skills.json` |
| ENRICH-3 | Caveman enrichment compression (Skills) | **Queued (#3)** | [EXP-20260913-caveman-compress-skills](../data/experiments/EXP-20260913-caveman-compress-skills.json) — baseline planned 2026-10-25; `DIGEST_ENRICH_COMPRESS=1` |
| NARR-1 | Ponytail narration (Skills) | **Complete (keep)** | [EXP-20260802-ponytail-narration-skills](../data/experiments/EXP-20260802-ponytail-narration-skills.json) — closed 2026-08-29; flags kept on Skills digest |
| NARR-2 | Humanizer polish (Skills) | **Queued (#2)** | [EXP-20260913-humanizer-polish-skills](../data/experiments/EXP-20260913-humanizer-polish-skills.json) — baseline planned 2026-09-27 after soft-dedup; `DIGEST_HUMANIZER_POLISH=1` |
| NARR-3 | Why-now cross-digest memory (Skills) | **Queued (#4)** | [EXP-20260913-whynow-memory-skills](../data/experiments/EXP-20260913-whynow-memory-skills.json) — baseline planned 2026-11-22; `DIGEST_WHYNOW_MEMORY=1` |
| RANK-2 | Soft-dedup diversity (Skills) | **Active** | [EXP-20260715-soft-dedup-diversity-skills](../data/experiments/EXP-20260715-soft-dedup-diversity-skills.json) — treatment 2026-09-13→2026-09-26 |
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
