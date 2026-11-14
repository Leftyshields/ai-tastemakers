# Email repo click tracking (investigation)

**Status (2026-10-12):** Blocked on infrastructure. PostHog does not expose a general-purpose redirect URL that logs a custom event and 302s to an arbitrary destination for third-party email (Resend). No email template or Lab snapshot changes were shipped in this investigation PR.

## Problem

Readers of the daily digest email (OSS and Skills editions) often do not realize repo names in the top 10 list are links to GitHub. The owner wants:

1. Clicks recorded in PostHog (event such as `email_repo_click` with `repo`, `rank`, `edition`, digest date, and `EXPERIMENT_ID` when set).
2. Server-side capture via redirect (email link hits our URL, we log, then 302 to the exact GitHub URL).
3. No reliance on GitHub Pages JavaScript for email-origin clicks.

Today, repo links in `src/tastemaker/email/html.ts` point directly at `repo.html_url`. Site clicks use `outbound_repo_click` from the Pages build (`scripts/edition-pages.ts`).

## PostHog investigation

### Capture API (POST only)

The public ingestion endpoints are **POST-only**. They accept JSON and return success; they do **not** redirect the browser.

- [Capture and batch API endpoints](https://posthog.com/docs/api/capture)
- [Using the PostHog API to capture events](https://posthog.com/tutorials/api-capture)

Example endpoint: `https://us.i.posthog.com/i/v0/e/` with body `{ "api_key": "<ph_project_token>", "event": "...", "distinct_id": "...", "properties": { ... } }`.

There is no documented GET variant that accepts query parameters, captures an event, and responds with `302 Location`.

### Workflows email link redirect (`/public/m/redirect`)

PostHog Workflows can rewrite links in **emails sent through PostHog** for open/click tracking. Engagement is surfaced as workflow events such as `$workflows_email_link_clicked` when [engagement events](https://posthog.com/docs/workflows/engagement-events) are enabled. Per-step **Track opens and link clicks** is documented in the [workflow builder](https://posthog.com/docs/workflows/workflow-builder#dispatches) and [content library](https://posthog.com/docs/workflows/library) (including `clicktracking="off"` / `data-ph-no-track` for opt-out links).

Internally, maildev/test uses a redirect handler shaped like:

`/public/m/redirect?ph_id=<signed-tracking-code>&target=<url>`

That `ph_id` is an HMAC-signed code tied to a **specific workflow send and recipient**, not a project token or custom event name. Production click metrics for workflow mail are driven primarily by the ESP (SES) webhooks, not by arbitrary reuse of this URL for external mailers.

**Probe (2026-10-12):** `GET https://us.i.posthog.com/public/m/redirect?target=https://github.com/posthog/posthog` (no `ph_id`) returned **404**. This endpoint is not a drop-in for Resend digest links.

### Community / product gaps

- [Forum: 3rd party email newsletter tracking](https://posthog.com/forum/p/3rd-party-email-newsletter-tracking) (UTM on landing pages; no hosted redirect product).
- [Forum: Track file downloads](https://posthog.com/forum/p/track-file-downloads) (request for a PostHog-owned 302 proxy; no documented product answer).

### Conclusion

**There is no PostHog-hosted URL** that, for arbitrary HTML email from Resend, will:

- accept a destination GitHub URL and metadata (`repo`, `rank`, `edition`, …),
- emit a custom event like `email_repo_click` into project **489599**, and
- return `302` to GitHub.

Implementing the product requirement needs a **small redirect service** (or sending digests through PostHog Workflows with different event semantics).

---

## Realistic options (tradeoffs)

### A. Epiphoric Firebase redirect + PostHog Capture API (recommended)

**Pattern:** Same family as `POST /api/tastemakers-unsubscribe` (see `firebase/README.md`). Add e.g. `GET /api/tastemakers-email-repo-click` that:

1. Validates signed or encoded query params (destination must be `https://github.com/...` or `https://www.github.com/...`).
2. POSTs to `https://us.i.posthog.com/i/v0/e/` with the public project token (`POSTHOG_KEY` / `phc_…` already used at Pages build time). Use anonymous-style capture: random or hashed `distinct_id`, `$process_person_profile: false`, properties `repo`, `rank`, `edition`, `digest_date`, `experiment_id`, `source: email`.
3. Responds `302` with `Location` set to the GitHub URL.

**Pros:** Matches owner requirements; full control of event schema; works with Resend; no PostHog Workflows migration.

**Cons:** New deploy surface in Epiphoric repo; must harden open-redirect checks; capture latency on click (mitigate with short timeout and still redirect if PostHog is slow); public token in server env only (not in email URLs except optional opaque signed blob, not the raw `phc_` key).

**Email link shape (illustrative):**

`https://us-central1-epiphoric-prod.cloudfunctions.net/api/api/tastemakers-email-repo-click?d=<signed-payload>`

Payload encodes destination + analytics dimensions; signature prevents tampering.

### B. Send digests via PostHog Workflows

**Pattern:** Move broadcast to PostHog email dispatch with **Track opens and link clicks** on.

**Pros:** Native click/open tracking; `$workflows_email_link_clicked` in PostHog.

**Cons:** Large pipeline change; event schema is workflow-centric (`$link_url`, workflow IDs), not `email_repo_click` with rank/edition unless you add CDP actions; does not match current Resend + TypeScript template workflow; CNIL/consent toggles apply.

### C. Resend (or ESP) link tracking only

**Pros:** Minimal code.

**Cons:** Metrics live in Resend, not PostHog Lab snapshots; different event model; does not satisfy “recorded in PostHog” without a webhook forwarder.

### D. UTM parameters on direct GitHub links (no redirect)

**Pros:** Trivial.

**Cons:** GitHub does not report UTMs to PostHog; does not satisfy server-side PostHog capture. Not acceptable per owner spec.

### E. Pages intermediate page + JS capture

**Pros:** Uses existing `POSTHOG_KEY` snippet.

**Cons:** Explicitly out of scope (owner asked not to ship Pages JS for email clicks).

---

## Planned implementation (after option A)

When a redirect endpoint exists, implement in **this repo**:

### Email templates

| Surface | File | Repo links today |
|---------|------|------------------|
| Daily OSS/Skills digest | `src/tastemaker/email/html.ts` | Top 10 `repo.html_url` in HTML and plain text |
| Weekly digest | `src/tastemaker/email/weekly-html.ts` | Markdown-derived GitHub links in body |

Changes:

- Wrap repo URLs with `buildEmailRepoClickUrl({ destination, repo, rank, edition, dateLabel, experimentId })` from a new module (e.g. `src/tastemaker/email/repo-click-url.ts`).
- Pass `editionId`, `editionName`, and `config.experimentId` from `sendDigestEmail` in `resend.ts` (today `renderDigestEmailHtml` only gets `siteUrl`).
- Visual affordance: underline repo links and optional trailing `→` in HTML; plain text unchanged apart from tracked URL.
- Leave non-repo links (Read online, Archive, Unsubscribe, site top-10 pages) untouched.

### Tests

- Fixture-rendered HTML/text: every GitHub repo href goes through the tracked base URL; decoding yields original `html_url`.
- Non-repo links unchanged.
- Extend `email.test.ts` and weekly tests similarly.

### Config

- `TASTEMAKERS_EMAIL_REPO_CLICK_BASE_URL` (or reuse pattern from `TASTEMAKERS_UNSUBSCRIBE_API_URL` in `.env.example` / Pages build).
- No new secrets in git; signing secret stays in Firebase/Functions env only.

---

## Lab experiment analytics (ship with tracked clicks)

Keep **website** and **email** click counts separate forever.

### PostHog event

- Name: `email_repo_click`
- Properties (minimum): `repo`, `rank`, `edition` (`oss` | `skills`), `digest_date`, optional `experiment_id`, `source: "email"`.

Do not merge into `outbound_repo_click` (Pages JS, property `source: web` or implicit web context).

### Snapshot CSV format

Extend simplified import (document in [EXPERIMENT_LIFECYCLE_PLAYBOOK.md](./EXPERIMENT_LIFECYCLE_PLAYBOOK.md)):

```csv
type,key,count
pageview,/briefings/2026-10-12.html,42
outbound_click,_aggregate,120
email_repo_click,acme/demo,3
email_repo_click,_aggregate,18
```

- `type`: `email_repo_click` (new row type; **not** `outbound_click`).
- `key`: `owner/repo` or `_aggregate`.

### Code touchpoints (follow-on PR)

| Area | Change |
|------|--------|
| `src/tastemaker/experiments/types.ts` | Add `email_repo_clicks?: Record<string, number>` to `ExperimentSnapshotMetrics` |
| `src/tastemaker/experiments/snapshot.ts` | Parse `email_repo_click` rows into `email_repo_clicks` |
| `src/tastemaker/experiments/snapshot.test.ts` | Coverage for new row type |
| `scripts/lab/experiments.js` | Render “Email clicks to GitHub” table from `email_repo_clicks`; keep “Clicks out to GitHub repos” for `outbound_clicks` only |
| `src/tastemaker/experiment-reminder-content.ts` | PostHog export step: Trends on `email_repo_click`; CSV example lines |
| `docs/EXPERIMENT_LIFECYCLE_PLAYBOOK.md` | PostHog export section + **Pipeline changes** row with deploy date (see below) |

Do **not** change experiment assignment, flags, windows, or retroactively edit past snapshot JSON.

### Humanizer experiment note

**EXP-20260913-humanizer-polish-skills** treatment runs **2026-10-11 through 2026-10-24** and does not gate on CTR. Enabling email click measurement mid-window changes what operators can observe in PostHog but not the experiment’s primary rubric. When email tracking ships, add a playbook pipeline row, for example:

| Date (PT) | Change | Editions | Notes |
|-----------|--------|----------|-------|
| _YYYY-MM-DD_ | Email repo click tracking (`email_repo_click` via redirect) | Both digest emails | Mid **EXP-20260913-humanizer-polish-skills** treatment; separate from `outbound_repo_click`. |

---

## References (PostHog project)

| Resource | URL |
|----------|-----|
| Project home | https://us.posthog.com/project/489599/home |
| Web analytics | https://us.posthog.com/project/489599/web |
| New Trends insight | https://us.posthog.com/project/489599/insights/new |
| Site event today | `outbound_repo_click` (Pages) |

Existing wiring: `POSTHOG_KEY`, `POSTHOG_HOST` at Pages build (`.env.example`, `.github/workflows/pages.yml`).
