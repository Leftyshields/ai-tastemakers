# Constraints

- TypeScript lab scripts live under `scripts/lab/`; tests under `src/tastemaker/lab/`.
- Do not add chart libraries; sparklines are inline SVG only.
- PostHog project 489599; host default `https://us.posthog.com`.
- Validation must fail closed on missing `success` fields or invalid windows.
- Genesis organism runtime uses MIT lib in `lib/`; genome directory is `genesis/experiments-page.genome/`.
- Lab status CI: `.github/workflows/lab-experiment-status.yml` needs `permissions.actions: write`, commit step `id: commit` with `changed=true` on push, then `gh workflow run pages.yml --ref main` when changed. Do not modify `digest.yml`, `digest-catchup.yml`, or `digest-verify.yml`.

## Acceptance criteria (Brian approved Lab UX)

- **UX1**: Control panel never shows placeholder dashes or empty metric fields; omit null fields; if all metrics null show one status line with read type and window end date (example Editorial read, Oct 24), never sync time; skip Monitoring only sparkline when `metric_daily` is empty; when `progress_pct` is null omit Progress to target entirely and show optional thin Read window bar without duplicating Day N of M text; Ahead, On track, Behind badge only when current and target are both non null.
- **UX2**: Every `lab/experiments.json` row has `success.metric.metric_type` (`editorial` or `posthog`) and validation passes; editorial headline is rubric target plus read date with sparkline below labeled Monitoring only (max 40px); posthog headline is the sparkline.
- **UX3**: Control panel has exactly one H2 (experiment name); status, Day N of M, and progress bar directly under it; EXP id small muted monospace; hypothesis in collapsed native Details disclosure without hardcoded aria-expanded on summary.
- **UX4**: No raw ISO in visible text (ISO only in title attributes); sync reads Synced N min ago (PT clock); windows read Mon D to Mon D; series use human `metric_label` from JSON.
- **UX5**: Visible Lab dashboard copy has no hyphen, en dash, em dash, or ASCII arrow except monospace identifiers; QA grep via `scripts/verify-lab-dashboard-copy.sh`.
- **UX6**: Timeline has one shared month axis, no per lane range line; bars at least 28px tall with 12px lane gap; inside labels only when at least eight characters fit in the bar (no truncated inside stubs on narrow bars; ellipsis after that); white on running bars, brand color on planned outline bars; next bar collision rule applies to outside labels only; popover shows plain experiment name in bold then muted id, then window and status; fixed popover above freeze and Today z-index, flipped to stay in the viewport; freeze band spans full track height including Digest UI lane; at 390px width render a vertical month grouped list; fill by status (running brand, planned outline, done muted); Today line.
- **UX7**: Each experiment renders once on the timeline; multi surface items span lanes or show Both tag.
- **UX8**: Backlog exactly four columns name, surface, starts, depends on with More in the depends cell and plain dependency names (id in title only); at 390px backlog cards label Starts with full date and Depends on with plain name, date left aligned; omit Both tag when surfaces already name OSS and Skills; history exactly four columns name, window, result chip only, details (Write up link plus More toggle); result_summary and ids and metric text in expandable row with colspan 4; 12px vertical cell padding; left aligned text and right aligned numbers; no horizontal scroll at 1280px or 390px; stacked cards below 768px.
- **UX10**: How to read this summary (max two sentences) under the dashboard title with link to full explainer.
- **UX11**: Under `prefers-reduced-motion: reduce`, progress bar and sparkline do not animate.
- **UX12**: One shared status chip component shape and color per status across control panel, timeline, backlog, and history.

## Acceptance criteria (Brian approved Lab UX round 2)

- **UX13**: Desktop timeline is Gantt rows, one per experiment. Fixed left column about 14rem with full plain name (wrapping allowed, no ellipsis) and surface chips (OSS, Skills, Digest). Bar track on the right. Bars hold no text. Rows are at least 32px tall. Multi surface experiments get one row with several chips.
- **UX14**: Default window runs from one month before today to the latest planned end. Done experiments that end before the window collapse into one row, N earlier tests see History, linking to #lab-history. Show all toggle. No horizontal scroll at any width.
- **UX15**: Done is muted solid fill with check icon, running is brand solid fill, planned is brand outline, freeze is hatched band across all rows labeled Freeze. Legend row above the axis.
- **UX16**: No hyphen, en dash, em dash or ASCII arrow anywhere in visible text on the Lab page, the explainer from briefings/lab/index.md, or Lab subpages. Rewrite phrases like pipeline scan. Prose dates read like Aug 8, 2026, never ISO. Verify script checks the whole rendered page (monospace id spans exempt) and fails CI on a match.
- **UX17**: Control panel gets three rows from experiments.json only. Testing from short_hypothesis at most 120 characters on every entry with validation. Next up is the next planned experiment name and start date. Last result is the latest history name, verdict chip, and write up link. Hide a row when its source is empty.
- **UX18**: Every Gantt row is keyboard focusable and opens the popover (name first, id below). The whole row is the tap target.
- **UX19**: Below 768px, keep the month grouped list. From 768 to 1024px, name column is 10rem and chips sit under the name.
- **UX20**: Pin the running experiment as the first row, with the Today line on top.
- **UX21**: Bold the current month label on the axis.
- **UX22**: Dark mode follows OS `prefers-color-scheme` by default. Inline head script adds `dark` on `html` before first paint. No theme toggle.
- **UX23**: With `html.dark`, Lab surfaces use stone 950 page, stone 900 cards and tables, stone 700 borders, stone 200 body text and stone 400 muted text. Running stays brand blue. Planned outline uses blue 400. Done uses stone 600 fill and stone 200 check. Freeze hatch uses white at 15 percent. Today line stays red 500. All visible text meets WCAG AA 4.5 to 1.
- **UX24**: `verify:genesis` runs Lab index contrast in explicit light and dark and fails below 4.5 to 1.
- **UX25**: Timeline popover is `position: absolute` under its Gantt row (not fixed). One open at a time. Dismiss on scroll, Escape, and outside click.
- **UX26**: Lab markdown preserves whitespace beside inline tags; inline code renders without visible backticks. Prose uses sans. `verify:genesis` fails when a letter touches an inline tag boundary in the prose block.
- **UX27**: Remove stale Right now paragraph from `briefings/lab/index.md`; control panel covers running state.
- **UX28**: No How to read this summary row above the control panel (prose explainer below remains).
- **UX29**: Omit history and control panel Write up links when no `briefings/lab/posts/{id}.md` exists.
- **UX30 (hero)**: Within ten seconds the hero card states what is being tested, what is next, and what we learned; hypothesis is one plain sentence; no PostHog CTR gate copy or editorial rubric jargon in visible hero or Details; EXP id behind More.
- **UX30 (link checker)**: `verify:genesis` fails on unresolved internal hrefs across all of `site/` (files and `#` anchors).
- **UX31**: EXP ids, PR numbers, flag names, and policy notes live behind More on hero, timeline popover, backlog, and history.
- **UX32**: Timeline row labels match `lab/experiments.json`; Oct 25 to Nov 21 caveman row reads Shorter enrichment context; Nov 1 freeze band stays visible.
- **UX33**: Backlog columns Name, Surface, Starts, Depends on without repeating column labels in cells; Digest UI freeze is its own row with hatch swatch and Freeze chip.
- **UX34**: History shows one plain result line from data; verdict when no metric; Write up only when post exists; latest five rows with Show all.
- **UX35**: `lab/about.html` holds long form Lab copy; Lab home keeps two sentence intro; header nav About; Right now paragraph removed.
- **UX36**: Lab footer line: Everything here is safe to publish. About the Lab. Open an issue.
- **UX37 (should)**: Last updated {build date PT} under intro in muted small text.
