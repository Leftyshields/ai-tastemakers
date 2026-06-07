# Dev Runbook — AI Tastemakers

## Terminology

| Term | Meaning |
|------|---------|
| **Digest pipeline** | `npm run digest` — GitHub discovery → rank → Claude → briefing files |
| **Genesis runtime** | `lib/`, `npm test` — framework organism tests |
| **Bootstrap ranking** | First ~7 days before 7-day star deltas are reliable |

## Start commands

| Service | Command | Notes |
|---------|---------|-------|
| Daily digest | `npm run digest` | Requires `.env` with tokens |
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
- `DIGEST_EMAIL_TO` — comma-separated recipients
- `DIGEST_SITE_URL` — link in email footer (default: GitHub Pages URL)

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
| GitHub Pages unstyled | CSS path uses `/assets/…` (domain root) | Rebuild with `npm run build:pages`; links must be relative (`assets/`, `../assets/`) |
| `git push` rejected (non-fast-forward) | GHA bot pushed digest commit | `git pull --rebase origin main` then push |

## GitHub Actions

Workflow: `.github/workflows/digest.yml`

Secrets:

- `ANTHROPIC_API_KEY` (required)
- `RESEND_API_KEY`, `DIGEST_EMAIL_FROM`, `DIGEST_EMAIL_TO` (optional — email after each digest)

Manual run: Actions → Daily Digest → Run workflow.

### Resend setup

1. Verify domain at [resend.com](https://resend.com)
2. Add secrets:
   ```bash
   gh secret set RESEND_API_KEY --repo Leftyshields/ai-tastemakers
   gh secret set DIGEST_EMAIL_FROM --repo Leftyshields/ai-tastemakers  # AI Tastemakers <digest@epiphoric.com>
   gh secret set DIGEST_EMAIL_TO --repo Leftyshields/ai-tastemakers    # you@example.com or a,b@example.com
   ```
3. Add same vars to local `.env` for `npm run digest` testing
4. Email sends automatically at end of pipeline when all three are set

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
