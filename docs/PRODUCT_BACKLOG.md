# Product backlog: AI Tastemakers

Follow-on work for the digest app (`src/tastemaker/`). Ordered loosely by priority; no hard dependencies unless noted.

---

## Open

| ID | Title | Status | Done when |
|----|--------|--------|-----------|
| DIST-1 | Slack / Substack distribution | Backlog | Optional channels beyond Resend email |
| RANK-1 | Ranking tuning | Backlog | Bootstrap quality after ~7 days of snapshots; tune `DIGEST_MAX_STARS_BOOTSTRAP`, blocklist |
| UX-1 | Brief page repo cards + TOC | Backlog | Richer brief pages on GitHub Pages |
| OPS-1 | Alert on digest/email failure | Backlog | Notify when GHA digest or Resend send fails |
| QA-1 | Manual `/qa_checklist` pass | Backlog | Checklist run documented |

---

## Shipped (reference)

| Item | Notes |
|------|--------|
| **SUB-1 Firebase subscribe** | Firestore `tastemakers_subscribers` on **epiphoric-prod**; subscribe page uses web SDK; digest reads via Admin SDK |
| Resend daily digest email | Pipeline sends after each digest when configured |
| Subscribe page | `/subscribe.html` on GitHub Pages |
| File-based subscribers fallback | `data/subscribers.json` merged at send time |

### SUB-1 ops checklist (after deploy)

- [ ] Deploy Firestore rules from Epiphoric repo (`firebase deploy --only firestore:rules`)
- [ ] `npm run subscribers:seed-firestore` (seed from JSON)
- [ ] GitHub secrets: `FIREBASE_API_KEY`, `FIREBASE_APP_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`
- [ ] Re-run Pages deploy; test subscribe form on live site

See `firebase/README.md`.
