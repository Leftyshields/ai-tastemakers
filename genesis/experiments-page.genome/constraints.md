# Constraints

- TypeScript lab scripts live under `scripts/lab/`; tests under `src/tastemaker/lab/`.
- Do not add chart libraries; sparklines are inline SVG only.
- PostHog project 489599; host default `https://us.posthog.com`.
- Validation must fail closed on missing `success` fields or invalid windows.
- Genesis organism runtime uses MIT lib in `lib/`; genome directory is `genesis/experiments-page.genome/`.

## Acceptance criteria (Brian approved Lab UX)

- **UX1**: Control panel never shows placeholder dashes or empty metric fields; omit null fields; if all metrics null show one status line with read type and window end date (example Editorial read, Oct 24), never sync time; skip Monitoring only sparkline when `metric_daily` is empty; when `progress_pct` is null omit Progress to target entirely and show optional thin Read window bar without duplicating Day N of M text; Ahead, On track, Behind badge only when current and target are both non null.
- **UX2**: Every `lab/experiments.json` row has `success.metric.metric_type` (`editorial` or `posthog`) and validation passes; editorial headline is rubric target plus read date with sparkline below labeled Monitoring only (max 40px); posthog headline is the sparkline.
- **UX3**: Control panel has exactly one H2 (experiment name); status, Day N of M, and progress bar directly under it; EXP id small muted monospace; hypothesis in collapsed native Details disclosure without hardcoded aria-expanded on summary.
- **UX4**: No raw ISO in visible text (ISO only in title attributes); sync reads Synced N min ago (PT clock); windows read Mon D to Mon D; series use human `metric_label` from JSON.
- **UX5**: Visible Lab dashboard copy has no hyphen, en dash, em dash, or ASCII arrow except monospace identifiers; QA grep via `scripts/verify-lab-dashboard-copy.sh`.
- **UX6**: Timeline has one shared month axis, no per lane range line; bars at least 28px tall with 12px lane gap; inside labels whenever at least eight characters fit with ellipsis (white on running bars, brand color on planned outline bars); next bar collision rule applies to outside labels only; id, window, and status in a fixed popover above freeze and Today z-index, flipped to stay in the viewport; freeze band spans full track height including Digest UI lane; at 390px width render a vertical month grouped list; fill by status (running brand, planned outline, done muted); Today line.
- **UX7**: Each experiment renders once on the timeline; multi surface items span lanes or show Both tag.
- **UX8**: Backlog exactly four columns name, surface, starts, depends on with More in the depends cell and plain dependency names (id in title only); at 390px backlog cards label Starts with full date and Depends on with plain name, date left aligned; omit Both tag when surfaces already name OSS and Skills; history exactly four columns name, window, result chip only, details (Write up link plus More toggle); result_summary and ids and metric text in expandable row with colspan 4; 12px vertical cell padding; left aligned text and right aligned numbers; no horizontal scroll at 1280px or 390px; stacked cards below 768px.
- **UX10**: How to read this summary (max two sentences) under the dashboard title with link to full explainer.
- **UX11**: Under `prefers-reduced-motion: reduce`, progress bar and sparkline do not animate.
- **UX12**: One shared status chip component shape and color per status across control panel, timeline, backlog, and history.
