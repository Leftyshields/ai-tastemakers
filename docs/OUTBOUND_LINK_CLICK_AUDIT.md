# Outbound link click tracking audit

Audit-only inventory for Brian’s goal: **every outbound link should register a click**. No implementation in this document—only current behavior, gaps, and a proposed minimal fix.

**Scope:** GitHub Pages site, daily digest email (OSS), Sunday weekly wrap-up email, programmatic Resend sends, and Lab surfaces. **Resend hosted templates:** none in-repo; all subscriber email is HTML built in `src/tastemaker/email/*` and sent via `resend.emails.send()`.

**Tracking mechanisms in use today**

| Mechanism | Event(s) | Where |
|-----------|----------|--------|
| `/go/` redirect page | `repo_click` (email `channel`), `lab_badge_click` (email `surface`) | Email links that use `buildEmailGoUrl` / `buildLabBadgeEmailGoUrl` |
| Digest card click listener | `repo_click` (`channel: pages`, `target: title\|button`) | Daily briefing HTML only; excludes `.digest-repo-card__body` |
| Lab delegated click listener | `lab_link_click` | Lab layout pages only (`labLayout: true` + `labLinkClickScript`) |
| Lab badge listener | `lab_badge_click` (`surface: pages`) | Daily briefing cards with `.lab-tested-badge` |
| Index CTA listener | `homepage_index_click` | OSS/Skills index v2 only (`data-index-cta`) |
| PostHog snippet | `$pageview` (autocapture off) | All built HTML when `POSTHOG_KEY` set |
| Legacy (unused) | `outbound_repo_click` | `briefOutboundTrackingScript()` defined but **never injected** |

---

## Master inventory

| Surface | Link types | How rendered | Tracking today | Not tracked / gap |
|---------|------------|--------------|----------------|-------------------|
| **Daily briefing (OSS & Skills) — repo cards** | GitHub repo title, “View on GitHub” | `renderDigestRepoCard` → direct `repo.html_url` | **`repo_click`** via `digestRepoClickTrackingScript` on title + CTA only | Card shell click without title/CTA; rank &gt; 10 repos have no card analytics distinction beyond pageview |
| **Daily briefing — Lab tested badge** | Lab post or index anchor | `renderLabTestedBadgePagesHtml` → site-relative lab URL | **`lab_badge_click`** (pages) | — |
| **Daily briefing — intro / header markdown** | Rare internal `#` or site links | `renderSafeMarkdown(headerMarkdown)` in `renderDigestBriefArticle` | **None** (same-origin nav) | Any external URL in header markdown |
| **Daily briefing — repo brief body** | GitHub, docs, X, product URLs (LLM markdown links) | `renderSafeMarkdown(repo.brief)` inside `.digest-repo-card__body` | **None** | **High priority:** enrich/narration often emits `[text](https://…)` (e.g. herdr.dev, cookbook.sglang.io, agentskills.io, x.com). Listener explicitly skips `.digest-repo-card__body`. |
| **Daily briefing — nav** | All briefings, sibling edition | Static `<a href>` in `buildEditionSite` | **None** | Internal cross-path only |
| **Daily briefing — site footer** | Subscribe, Lab, Methodology, **github.com/Leftyshields/ai-tastemakers** | `footerLinkRowHtml` (has `data-lab-section` but **no** lab script on edition pages) | **None** | **Footer GitHub = outbound, untracked.** Other footer links untracked on non-Lab pages. |
| **Daily briefing — edition nav** | OSS ↔ Skills | `editionNavHtml` without lab analytics flag | **None** | Internal |
| **Index (OSS & Skills) v2** | Briefing dates, weekly/monthly archives, subscribe, Lab | `ossIndexBodyV2` / `skillsIndexBodyV2` | **`homepage_index_click`** for elements with `data-index-cta` | Links without `data-index-cta`; footer GitHub; calendar day links if not wired |
| **Index v1 (legacy layout)** | Same family | `ossIndexBody` / `skillsIndexBody` | **None** beyond `$pageview` | Most CTAs |
| **Weekly review page** (`/weekly/{week}.html`) | Markdown from `weekly_review.md` (narrative + stats + relative links to briefings) | `renderSafeMarkdown` + `pageShell` | **None** beyond `$pageview` | Any `https://` in LLM narrative; relative briefing links |
| **Monthly rollup page** | Same pattern as weekly | `buildMonthlySite` | **None** beyond `$pageview` | External links in markdown |
| **Subscribe / unsubscribe** | Skills index, home, Firebase/API (not `<a>`) | `buildSubscribePage` / `buildUnsubscribePage` | **None** | Footer GitHub on unsubscribe static HTML |
| **`/go/` redirect** | Allowlisted GitHub; allowlisted Lab dest | `renderGoRedirectPage` | **`repo_click`** or **`lab_badge_click`** then redirect | Only invoked when href is wrapped to `/go/` |
| **Lab — index & methodology prose** | Markdown links in `briefings/lab/*.md` | `prepareLabProseHtmlFromMarkdown` + `ensureLabLinkSections` | **`lab_link_click`** (external flagged `is_external: true`) | GitHub URLs **not** rewritten to `/go` (unlike posts); no `repo_click` |
| **Lab — experiment posts** | Body markdown + header source repo | `prepareLabPostArticleHtml` (allowlisted GitHub → `/go`) + header `renderLabTrackedLink` | **`lab_link_click`**; allowlisted GitHub via **`/go` → `repo_click`** on redirect | Non-allowlisted GitHub/external in body stay direct; **`lab_link_click` only** |
| **Lab — posts index** | Post slugs | Static `<a href="{slug}.html">` | **`lab_link_click`** (internal) | — |
| **Lab — dashboard / timeline / history** | Write-ups, in-page anchors, source repo rows | `lab-dashboard-render.ts`, `lab-dashboard-copy.ts` | **`lab_link_click`** | GitHub “From project” links unless allowlisted `/go` rewrite |
| **Lab — tools / Evaluated** | Tool GitHub URLs, experiment anchors | `renderLabTrackedLink` → `/go` for allowlisted tools | **`lab_link_click`** + **`repo_click`** on `/go` for allowlisted repos | Internal `index.html#…` only `lab_link_click` |
| **Lab — digest learned blocks** | Tool URLs in copy | `digest-learned.ts` + `renderLabTrackedLink` | Same as tools | — |
| **Lab — shadow compare** | Repo title → GitHub; brief bodies | `renderShadowCompareBody` direct `html_url` + `renderBriefMarkdown` | **`lab_link_click`** on anchors (fallback section) | **No `/go` rewrite**; brief body external links like daily digest |
| **Lab — token usage** | Shadow run links | `render-token-usage.ts` internal `shadow/…` | **`lab_link_click`** | — |
| **Lab — footer** | About, **GitHub issues** | `labPublishFooterHtml` | **`lab_link_click`** | issues.github.com outbound |
| **Daily digest email (OSS)** | Repo title, GitHub button | `buildEmailGoUrl` → `/go/` | **`repo_click`** (`source: email`) | — |
| **Daily digest email — Lab badge** | Lab dest | `buildLabBadgeEmailGoUrl` | **`lab_badge_click`** (email) | — |
| **Daily digest email — brief text** | Plain text only | No markdown links in template | **N/A** | — |
| **Daily digest email — footer** | Full digest (UTM), archive home, unsubscribe | Direct site URLs | **None** (destination pageview only) | Not click events |
| **Daily digest email — plain text** | Raw `repo.html_url` per repo | `renderDigestEmailText` | **None** | **Every GitHub URL naked in text** |
| **Sunday weekly email** | **LLM GitHub links in body** | `renderWeeklyMarkup` → direct `https://github.com/…` | **None** | **High priority:** prompt requires `[Name](https://github.com/owner/repo)`; no `/go`, no `repo_click`. Non-GitHub markdown links stripped to text (no href). |
| **Sunday weekly email — list links** | AI Tastemakers & Skill Tastemakers top-10 pages | Direct `/briefings/…` and `/skills/briefings/…` | **None** | Internal cross-site path on same host |
| **Sunday weekly email — receipts** | “Full week on the site” | `weeklyOnlineUrl` | **None** | — |
| **Sunday weekly email — unsubscribe** | Unsubscribe URL | Direct | **None** | Expected |
| **Weekly narrative (site markdown)** | Possible repo names / links in LLM sections | `renderWeeklyMarkdown` → saved MD → weekly HTML | **None** for outbound | LLM may add links in generalist/statistician sections |
| **Ops / experiment reminder email** | PostHog & GitHub URLs in **plain text** | `experiment-reminder-content.ts` | **None** | Ops-only; URLs not `<a href>` in HTML variant if present |
| **Resend templates (hosted)** | — | Not used | — | All email is inline HTML from code |

---

## LLM-generated link surfaces (bypass risk)

These paths render model-written markdown/HTML **without** passing through `/go` or repo-card listeners:

1. **Daily repo brief** (`repo.brief` → `renderSafeMarkdown` in `.digest-repo-card__body`) — confirmed live briefs link to third-party docs, X, etc.
2. **Sunday weekly email body** (`review.email.body` → `renderWeeklyMarkup`) — GitHub links only, but **direct** GitHub hrefs.
3. **Weekly / monthly site articles** — full markdown narratives may include links if the model adds them.
4. **Lab post bodies** — markdown from `briefings/lab/posts/*.md`; only allowlisted GitHub gets `/go` in `prepareLabPostArticleHtml`; other externals stay direct with `lab_link_click` only.
5. **Shadow comparison briefs** — same as daily brief bodies.

The email `/go` work **does not** wrap links inside LLM prose—only structured repo title/button/badge fields in `renderDigestEmailHtml`.

---

## Existing verification

| Gate | What it checks | Gap |
|------|----------------|-----|
| `verify:lab-analytics` / UX42 | Lab HTML: PostHog + `lab_link_click` script + every `<a>` has `data-lab-section` | Does not cover edition briefings, weekly/monthly, email |
| `verify:genesis` (UX42/UX45) | Lab + badge fixtures | No global outbound href scan |
| `digest-go-page.test.ts` | `/go` allowlist + events | — |
| `weekly-html.test.ts` | Non-GitHub markdown links not rendered as `<a>` | Does not require tracking on GitHub hrefs |

---

## Proposed minimal fix (implementation follow-up)

### 1. Single link-rewriting pass (shared module)

Add one module (e.g. `src/tastemaker/analytics/rewrite-outbound-links.ts`) used at **render boundaries**:

| Stage | Input | Context props |
|-------|--------|----------------|
| Pages HTML build | HTML string after markdown/card render | `channel: pages`, `section`, `digest_date`, `surface`, `allowlist` |
| Daily email HTML | Final HTML before send | `channel: email` → wrap with existing `buildEmailGoUrl` / extend for non-repo URLs |
| Weekly email HTML | After `renderWeeklyMarkup` | Map each allowlisted GitHub URL to `/go` with `pos`/`repo` parsed from URL; optional `surface: weekly_email` |
| Lab prose (optional unify) | Same as `prepareLabPostArticleHtml` today | Extend to **all** lab markdown surfaces for consistency |

**Rules (sketch):**

- Same-origin relative URLs (`/`, `../`, `#`) → optional lightweight `site_link_click` or exempt (product decision).
- `https://github.com/{allowlisted}` → `/go/?…` (pages: still fire `repo_click` on redirect page **or** keep client listener but href must be `/go` for parity with email).
- Other `https://` externals → `/go/?event=outbound_link_click&dest=…` (new allowlisted dest encoding) **or** extend `/go` with generic outbound event—one redirect handler, one PostHog event family.
- `mailto:`, `tel:`, unsubscribe → exempt.

Run rewriter **last** before write/send so LLM markdown cannot skip it.

### 2. Verify gate (CI)

New script e.g. `scripts/verify-outbound-links.ts`:

1. After `build:pages`, walk `site/**/*.html` plus static samples of `renderDigestEmailHtml` / `renderWeeklyEmailHtml` with fixture data.
2. Regex/DOM parse every `href="http…"`.
3. **Fail** if any absolute external `http(s)` href is not:
   - rewritten to site `/go/…`, or
   - on an explicit exemption list (unsubscribe, mailto, tel, PostHog ingest host if ever linked).

Optionally fail if edition briefing HTML contains `href="https://github.com` outside `/go` (strict mode Brian may want).

Wire into `verify:genesis` or `npm test` fixture—**do not** run `digest.yml`.

### 3. Smallest incremental rollout

1. Implement rewriter + tests using existing allowlist (`collectDigestRepoAllowlist`).
2. Apply to **weekly email HTML** and **digest brief bodies** first (largest LLM gap).
3. Apply to **daily email plain text** (wrap URLs or drop raw GitHub in favor of tracked short links).
4. Turn on verify gate in CI once rewriter is wired everywhere in the table above.

---

## File reference map

| Concern | Primary files |
|---------|----------------|
| Email `/go` | `src/tastemaker/analytics/repo-click.ts`, `scripts/digest-go-page.ts` |
| Daily email HTML | `src/tastemaker/email/html.ts` |
| Weekly email HTML | `src/tastemaker/email/weekly-html.ts`, `src/tastemaker/narrate/weekly.ts` |
| Brief cards / LLM brief | `src/tastemaker/pages/brief-cards.ts`, `scripts/safe-markdown.ts` |
| Pages build | `scripts/edition-pages.ts`, `scripts/build-pages.ts` |
| Lab link tracking | `scripts/lab/lab-analytics.ts`, `scripts/verify-lab-analytics.ts` |
| Resend send | `src/tastemaker/email/resend.ts`, `src/tastemaker/email/resend-briefing.ts` |

---

*Generated: audit branch `cursor/outbound-link-audit-bd9a` — documentation only, no tracking behavior changed.*
