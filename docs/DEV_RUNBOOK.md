# Dev Runbook — AI Tastemakers

## Terminology

| Term | Meaning |
|------|---------|
| **Digest pipeline** | `npm run digest` — GitHub discovery → rank → Claude → briefing files |
| **Weekly wrap-up** | `npm run weekly` — aggregate 7 days of digests → Claude editorial → `briefings/weekly/` |
| **Monthly rollup** | `npm run monthly` — aggregate weekly reviews in month → Claude editorial → `briefings/monthly/` |
| **Genesis runtime** | `lib/`, `npm test` — framework organism tests |
| **Bootstrap ranking** | First ~7 days before 7-day star deltas are reliable |

## Start commands

| Service | Command | Notes |
|---------|---------|-------|
| Daily digest | `npm run digest` | Requires `.env` with tokens |
| Weekly wrap-up | `npm run weekly` | Requires 7 full days × both editions; `--week 2026-W23` to target ISO week |
| Monthly rollup | `npm run monthly` | Requires 2+ weekly reviews in month before rollup week; `--month 2026-06` |
| Skills digest | `npm run digest:skills` | Same tokens as daily |
| Digest tests | `npm run test:digest` | Mocked GitHub/Claude |
| Typecheck/build | `npm run build:digest` | Emits `dist/tastemaker/` |
| Genesis tests | `npm test` | Organism unit tests |

## Environment variables

See `.env.example`. Required:

- `GITHUB_TOKEN` — PAT or fine-grained token with public repo read
- `ANTHROPIC_API_KEY` — Claude narration

Optional: `TZ`, `DIGEST_TOP_N`, `DIGEST_MIN_STARS`, `ANTHROPIC_MODEL`

Optional email (Resend — skipped if `RESEND_API_KEY` unset):

- `RESEND_API_KEY`
- `DIGEST_EMAIL_FROM` — verified sender, e.g. `AI Tastemakers <digest@epiphoric.com>`
- `DIGEST_SITE_URL` — link in email footer (default: GitHub Pages URL)

Optional Firebase (epiphoric-prod — subscribe + digest recipients):

- `FIREBASE_PROJECT_ID`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_API_KEY`, `FIREBASE_APP_ID` — public web config (subscribe page build)
- `FIREBASE_CLIENT_EMAIL` + `FIREBASE_PRIVATE_KEY` — Admin SDK (digest reads Firestore; optional `FIREBASE_SERVICE_ACCOUNT` JSON instead)

See `firebase/README.md` for setup.

## Hard requirements

| Rule | Why |
|------|-----|
| Never commit `.env` | Secrets |
| Run from repo root | Paths resolve to `data/` and `briefings/` |
| Product code in `src/tastemaker/` | Keep separate from Genesis `lib/` |

## Symptom → fix

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `GITHUB_TOKEN is required` | Missing `.env` | `cp .env.example .env` and fill in |
| Discovery failed: only N topics succeeded | Search rate limit or query error | Wait 1 min; check token; see API logs |
| All repos bootstrap ranking | First week of snapshots | Normal; deltas improve after 7 days |
| `[brief unavailable]` in output | Claude API error for that repo | Check key/quota; verify `ANTHROPIC_MODEL` is current |
| Claude 404 `model: …` | Deprecated Anthropic model ID | Set `ANTHROPIC_MODEL=claude-sonnet-4-6` (or latest Sonnet) |
| Empty briefing | Filters too strict or search returned nothing | Lower `DIGEST_MIN_STARS` temporarily for debug |
| GHA commit step skipped | No file changes | Expected if digest identical; check workflow logs |
| `Skipping weekly … Incomplete week` | Fewer than 7 days × both editions | Normal until ~7 daily runs complete; first weekly ~Sunday after full week |
| `Skipping monthly … Incomplete month` | Fewer than 2 weekly reviews in month before rollup week | Normal early in month or if weekly runs failed |
| `Weekly skipped` locally | Same completeness gate | Seed 14 `digest.json` files or wait for production data |
| Same-day re-run reshuffled top 10 | Soft-dedup penalized today's existing `briefings/YYYY-MM-DD/` | Fixed: pipeline excludes current date from dedup; still prefer GHA over local re-run for verification |
| Digest stars ≠ snapshot stars | Enrich re-fetched live GitHub counts | Fixed: pipeline keeps `stars` from discovery/snapshot; enrich supplies metadata only |
| Pages stale after GHA digest | Fixed: digest dispatches Pages after commit (`actions: write`). Manual fallback: `gh workflow run "Deploy GitHub Pages"` | Check **Deploy GitHub Pages** run after **Daily Digest**; verify `/briefings/YYYY-MM-DD.html` |
| GitHub Pages unstyled | CSS path uses `/assets/…` (domain root) | Rebuild with `npm run build:pages`; links must be relative (`assets/`, `../assets/`) |
| Subscribe form permission-denied | Firestore rules not deployed to epiphoric-prod | Deploy rules from Epiphoric repo: `firebase deploy --only firestore:rules` |
| Digest sends to env only, not Firestore list | Firebase Admin not in GHA secrets | Set `FIREBASE_CLIENT_EMAIL` + `FIREBASE_PRIVATE_KEY` on repo |
| Scheduled digest missing at expected time | GitHub `schedule` delay/drop (worse at minute :00) | Wait up to ~90 min; check Actions; manual **Run workflow** if needed |

## GitHub Actions

Workflow: `.github/workflows/digest.yml`

After a successful briefing commit, the workflow runs `gh workflow run "Deploy GitHub Pages"` (bot pushes do not trigger `on: push` for other workflows). Requires `permissions: actions: write`.

**Schedule:** ~06:17 `America/Los_Angeles` daily (`cron: "17 6 * * *"` with `timezone`). GitHub does not guarantee exact timing — treat manual dispatch as the backup verification path.

Secrets:

- `ANTHROPIC_API_KEY` (required)
- `RESEND_API_KEY`, `DIGEST_EMAIL_FROM` (optional — email after each digest; recipients from Firestore)
- `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (optional — read Firestore subscribers)

Pages workflow secrets: `FIREBASE_API_KEY`, `FIREBASE_APP_ID` (public web config for subscribe form)

Manual run: Actions → Daily Digest → Run workflow.

**Schedule:** Three Pacific-time cron slots daily (06:17, 06:45, 07:30) — GitHub `schedule` is best-effort and may skip or delay runs; backup slots + idempotent skip (if today's `briefings/YYYY-MM-DD/` already exists) avoid duplicate work. If 07:30 passes with no run, dispatch manually:

```bash
gh workflow run "Daily Digest" --repo Leftyshields/ai-tastemakers
```

**Weekly:** Runs automatically on **Sundays** (America/Los_Angeles) after OSS + Skills daily digests in the same workflow. Skips with exit 0 if the Mon–Sun window is incomplete. Weekly step uses `continue-on-error` so a synthesis failure does not block the daily briefing commit.

### Daily digest verification (`.github/workflows/digest-verify.yml`)

Runs **08:00 and 09:00 Pacific** daily. Checks:

- `briefings/YYYY-MM-DD/` and `briefings/skills/YYYY-MM-DD/` exist on `main`
- GitHub Pages serves `/briefings/YYYY-MM-DD.html`

**On failure:** email to `DIGEST_ALERT_TO` (Resend) + open GitHub issue labeled `digest-alert`. Workflow shows red in Actions.

One-time setup:

```bash
gh secret set DIGEST_ALERT_TO --repo Leftyshields/ai-tastemakers --body "you@example.com"
```

Requires existing `RESEND_API_KEY` and `DIGEST_EMAIL_FROM`. Local check:

```bash
npm run verify:digest
```

Manual run: Actions → **Daily Digest Verify** → Run workflow.

**Bot push rejected:** If commit step fails with `Changes must be made through a pull request`, add **GitHub Actions** (or `github-actions[bot]`) to the ruleset bypass list on `main` — see [GITHUB_SETTINGS.md](GITHUB_SETTINGS.md).

### Resend setup

1. Verify domain at [resend.com](https://resend.com)
2. Add secrets:
   ```bash
   gh secret set RESEND_API_KEY --repo Leftyshields/ai-tastemakers
   gh secret set DIGEST_EMAIL_FROM --repo Leftyshields/ai-tastemakers  # AI Tastemakers <digest@epiphoric.com>
   ```
3. Add same vars to local `.env` for `npm run digest` testing
4. Email sends when Resend is configured and at least one subscriber exists in Firestore (production) or `data/subscribers.json` (local dev without Admin). Subscribe at `/subscribe.html` or `npm run subscribers:add`. Subscribers are sent as **BCC** so recipient addresses are not visible to each other.

### Subscribe (Firebase / epiphoric-prod)

Public signup: `/subscribe.html` writes to Firestore collection `tastemakers_subscribers`.

**Setup:** See `firebase/README.md` — deploy rules from Epiphoric repo, seed subscribers, set GitHub secrets.

**Manual add:**

```bash
npm run subscribers:add -- you@example.com
npm run subscribers:seed-firestore   # one-time: JSON → Firestore
```

## GitHub Pages

Workflow: `.github/workflows/pages.yml` (runs on push to `briefings/` or `scripts/build-pages.ts`).

- **Live:** https://leftyshields.github.io/ai-tastemakers/
- **Build locally:** `npm run build:pages` then `npx serve site`
- **CSS:** Tailwind compiles `site/assets/input.css` → `site/assets/style.css` (generated, not committed)
- **Paths:** Use relative asset URLs for project sites (`assets/style.css`, not `/assets/style.css`)

### Deployment verification (MVP checklist)

1. `gh secret set ANTHROPIC_API_KEY` on the repo
2. `gh workflow run "Daily Digest"` — confirm briefing commit on `main`
3. Confirm Pages workflow succeeded after briefing push
4. Hard-refresh live site; verify styled layout (not raw HTML)
5. Open latest brief from homepage CTA

## Local cron (alternative)

```cron
0 6 * * * cd /path/to/ai-tastemakers && /usr/bin/npm run digest >> /tmp/tastemaker-digest.log 2>&1
```
