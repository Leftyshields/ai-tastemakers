import type { LabExperimentStatus, LabSurface } from "./validate-experiments.js";
import type {
  LabExperimentsPublicFile,
  PublicControlPanelRunning,
  LabExperimentSource,
  PublicTimelineModel,
  PublicTimelineItem,
} from "./lab-public-types.js";
export type { PublicTimelineModel, PublicTimelineItem };
import {
  formatDayHuman,
  formatDayShort,
  formatSyncedAgoPt,
  formatWindowHuman,
  isoTitleAttr,
  sanitizeVisibleCopy,
  surfaceChipLabels,
  formatMonthTick,
} from "./lab-format.js";
import { renderLabStatusChip } from "./lab-dashboard-ui.js";
import { formatSurfaces } from "./lab-format.js";
import { formatBacklogDependsOn } from "./lab-backlog-deps.js";
import {
  computeTrackStatus,
  renderProgressBarHtml,
  renderReadWindowBarHtml,
} from "./lab-metric-progress.js";
import {
  experimentTechnicalMoreHtml,
  historyResultLine,
  plainHypothesisSentence,
  renderLabMoreButton,
} from "./lab-dashboard-copy.js";

/** Assumed desktop Gantt track width for month tick filtering (UX gate). */
export const GANTT_ASSUMED_TRACK_PX = 650;
const GANTT_MIN_MONTH_LABEL_INSET_PX = 32;
const GANTT_MIN_AXIS_LABEL_GAP_PX = 8;
const GANTT_AXIS_MONTH_FONT_REM = 0.65;
const GANTT_AXIS_FREEZE_FONT_REM = 0.6;

function estimateAxisLabelHalfWidthPx(text: string, fontRem: number): number {
  return (text.length * fontRem * 16 * 0.58) / 2;
}

/** Gap in px between a month tick's right edge and the Freeze label's left edge (negative if overlap). */
export function measureAxisLabelGapPx(
  labelCenterPct: number,
  labelText: string,
  labelFontRem: number,
  tick: { label: string; offset_pct: number },
  tickFontRem: number,
): number {
  const track = GANTT_ASSUMED_TRACK_PX;
  const labelHalf = estimateAxisLabelHalfWidthPx(labelText, labelFontRem);
  const tickHalf = estimateAxisLabelHalfWidthPx(tick.label, tickFontRem);
  const labelCenterPx = (labelCenterPct / 100) * track;
  const tickCenterPx = (tick.offset_pct / 100) * track;
  const labelLeftPx = labelCenterPx - labelHalf;
  const tickRightPx = tickCenterPx + tickHalf;
  return labelLeftPx - tickRightPx;
}

/** Nudge Freeze axis label right so it clears month ticks by at least 8px. */
export function resolveFreezeAxisLabelPct(
  freeze: { offset_pct: number; width_pct: number },
  monthTicks: { label: string; offset_pct: number }[],
): number {
  const defaultCenter = freeze.offset_pct + freeze.width_pct / 2;
  const track = GANTT_ASSUMED_TRACK_PX;
  const freezeHalf = estimateAxisLabelHalfWidthPx("Freeze", GANTT_AXIS_FREEZE_FONT_REM);
  let centerPx = (defaultCenter / 100) * track;

  for (const tick of monthTicks) {
    const tickHalf = estimateAxisLabelHalfWidthPx(tick.label, GANTT_AXIS_MONTH_FONT_REM);
    const tickCenterPx = (tick.offset_pct / 100) * track;
    const tickRightPx = tickCenterPx + tickHalf;
    const freezeLeftPx = centerPx - freezeHalf;
    if (tickCenterPx <= centerPx && freezeLeftPx < tickRightPx + GANTT_MIN_AXIS_LABEL_GAP_PX) {
      centerPx = tickRightPx + GANTT_MIN_AXIS_LABEL_GAP_PX + freezeHalf + 0.5;
    }
  }
  return Math.min(100, (centerPx / track) * 100);
}
function parseIsoMs(iso: string): number {
  return Date.parse(`${iso}T00:00:00Z`);
}

function isoMonthBefore(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() - 1);
  return d.toISOString().slice(0, 10);
}

function pctInRange(
  startIso: string,
  endIso: string,
  rangeStart: string,
  rangeEnd: string,
): { offset_pct: number; width_pct: number } {
  const totalMs = Math.max(parseIsoMs(rangeEnd) - parseIsoMs(rangeStart), 86_400_000);
  const offsetMs = parseIsoMs(startIso) - parseIsoMs(rangeStart);
  const widthMs = parseIsoMs(endIso) - parseIsoMs(startIso) + 86_400_000;
  return {
    offset_pct: Math.max(0, Math.min(100, (offsetMs / totalMs) * 100)),
    width_pct: Math.max(0.5, Math.min(100, (widthMs / totalMs) * 100)),
  };
}

function buildMonthTicks(
  rangeStart: string,
  rangeEnd: string,
  asOfIsoDate: string,
): { label: string; offset_pct: number; current: boolean }[] {
  const totalMs = Math.max(parseIsoMs(rangeEnd) - parseIsoMs(rangeStart), 86_400_000);
  const currentMonth = asOfIsoDate.slice(0, 7);
  const minOffsetPct = (GANTT_MIN_MONTH_LABEL_INSET_PX / GANTT_ASSUMED_TRACK_PX) * 100;
  const ticks: { label: string; offset_pct: number; current: boolean }[] = [];
  let cursor = new Date(`${rangeStart}T00:00:00Z`);
  const endDate = new Date(`${rangeEnd}T00:00:00Z`);
  cursor.setUTCDate(1);
  while (cursor <= endDate) {
    const iso = cursor.toISOString().slice(0, 10);
    const offsetMs = parseIsoMs(iso) - parseIsoMs(rangeStart);
    const offset_pct = Math.max(0, Math.min(100, (offsetMs / totalMs) * 100));
    const current = iso.slice(0, 7) === currentMonth;
    if (offset_pct < minOffsetPct && !current) {
      cursor.setUTCMonth(cursor.getUTCMonth() + 1);
      continue;
    }
    ticks.push({
      label: formatMonthTick(iso),
      offset_pct,
      current,
    });
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
  return ticks;
}

function todayOffsetPct(
  asOfIsoDate: string,
  rangeStart: string,
  rangeEnd: string,
): number | null {
  if (asOfIsoDate < rangeStart || asOfIsoDate > rangeEnd) return null;
  const totalMs = Math.max(parseIsoMs(rangeEnd) - parseIsoMs(rangeStart), 86_400_000);
  const offsetMs = parseIsoMs(asOfIsoDate) - parseIsoMs(rangeStart);
  return Math.max(0, Math.min(100, (offsetMs / totalMs) * 100));
}

export function buildTimelineModel(
  entries: LabExperimentSource[],
  statuses: LabExperimentStatus[],
  asOfIsoDate: string,
): PublicTimelineModel | null {
  const dated = entries.filter(
    (e) =>
      e.id !== "POLICY-DIGEST-UI-FREEZE" &&
      statuses.includes(e.status) &&
      e.start !== null &&
      e.end !== null,
  );
  if (dated.length === 0) return null;

  const plannedEnds = dated.filter((e) => e.status === "planned").map((e) => e.end!);
  const runningEnds = dated.filter((e) => e.status === "running").map((e) => e.end!);
  const latestPlannedEnd =
    plannedEnds.length > 0
      ? plannedEnds.sort().reverse()[0]!
      : runningEnds.sort().reverse()[0] ?? dated.map((e) => e.end!).sort().reverse()[0]!;

  const rangeStart = isoMonthBefore(asOfIsoDate);
  const rangeEnd = latestPlannedEnd;

  const doneBeforeWindow = dated.filter((e) => e.status === "done" && e.end! < rangeStart);
  const doneInWindow = dated.filter((e) => e.status === "done" && e.end! >= rangeStart);
  const active = dated.filter((e) => e.status === "running" || e.status === "planned");

  let fullRangeStart = rangeStart;
  for (const e of doneBeforeWindow) {
    if (e.start! < fullRangeStart) fullRangeStart = e.start!;
  }

  const freezeEntry = entries.find((e) => e.id === "POLICY-DIGEST-UI-FREEZE");
  let freeze: PublicTimelineModel["freeze"] = null;
  if (freezeEntry?.start && freezeEntry?.end) {
    const def = pctInRange(freezeEntry.start, freezeEntry.end, rangeStart, rangeEnd);
    const full = pctInRange(freezeEntry.start, freezeEntry.end, fullRangeStart, rangeEnd);
    freeze = {
      start: freezeEntry.start,
      end: freezeEntry.end,
      offset_pct: def.offset_pct,
      width_pct: def.width_pct,
      offset_pct_full: full.offset_pct,
      width_pct_full: full.width_pct,
    };
  }

  const buildItem = (
    e: LabExperimentSource,
    kind: "experiment" | "collapsed",
    extra?: Partial<PublicTimelineItem>,
  ): PublicTimelineItem => {
    const def = pctInRange(e.start!, e.end!, rangeStart, rangeEnd);
    const full = pctInRange(e.start!, e.end!, fullRangeStart, rangeEnd);
    return {
      id: e.id,
      label: e.label,
      status: e.status,
      start: e.start!,
      end: e.end!,
      surfaces: surfacesList(e),
      offset_pct: def.offset_pct,
      width_pct: def.width_pct,
      offset_pct_full: full.offset_pct,
      width_pct_full: full.width_pct,
      kind,
      ...extra,
    };
  };

  let collapsedRow: PublicTimelineItem | null = null;
  const hiddenItems: PublicTimelineItem[] = [];
  if (doneBeforeWindow.length > 0) {
    collapsedRow = {
      id: "lab-collapsed-history",
      label: `${doneBeforeWindow.length} earlier tests, see History`,
      status: "done",
      start: doneBeforeWindow[0]!.start!,
      end: doneBeforeWindow[doneBeforeWindow.length - 1]!.end!,
      surfaces: [],
      offset_pct: 0,
      width_pct: 0,
      offset_pct_full: 0,
      width_pct_full: 0,
      kind: "collapsed",
      collapsed_count: doneBeforeWindow.length,
    };
    for (const e of doneBeforeWindow) {
      hiddenItems.push(
        buildItem(e, "experiment", {
          hidden_until_show_all: true,
        }),
      );
    }
  }

  const runningEntry = dated.find((e) => e.status === "running");
  const runningItem = runningEntry ? buildItem(runningEntry, "experiment") : null;
  const doneItems = doneInWindow
    .sort((a, b) => b.end!.localeCompare(a.end!) || a.id.localeCompare(b.id))
    .map((e) => buildItem(e, "experiment"));
  const plannedItems = dated
    .filter((e) => e.status === "planned")
    .sort((a, b) => a.start!.localeCompare(b.start!) || a.id.localeCompare(b.id))
    .map((e) => buildItem(e, "experiment"));
  const items: PublicTimelineItem[] = [];
  if (runningItem) items.push(runningItem);
  items.push(...doneItems, ...plannedItems);
  if (collapsedRow) items.push(collapsedRow);
  items.push(...hiddenItems);

  return {
    range_start: rangeStart,
    range_end: rangeEnd,
    full_range_start: fullRangeStart,
    today_iso: asOfIsoDate,
    today_offset_pct: todayOffsetPct(asOfIsoDate, rangeStart, rangeEnd),
    today_offset_pct_full: todayOffsetPct(asOfIsoDate, fullRangeStart, rangeEnd),
    month_ticks: buildMonthTicks(rangeStart, rangeEnd, asOfIsoDate),
    month_ticks_full: buildMonthTicks(fullRangeStart, rangeEnd, asOfIsoDate),
    freeze,
    items,
    collapsed_count: doneBeforeWindow.length,
  };
}

function surfacesList(e: { surface: LabSurface | LabSurface[] }): LabSurface[] {
  return Array.isArray(e.surface) ? e.surface : [e.surface];
}

function latestReadDateIso(daily: { date: string }[]): string | null {
  if (daily.length === 0) return null;
  return daily[daily.length - 1]!.date;
}

function metricValuesAllNull(run: PublicControlPanelRunning): boolean {
  return (
    run.metric_current === null &&
    run.exposure_count === null &&
    run.sample_count === null &&
    run.metric_delta === null
  );
}

/** UX1: read type plus window end date; never sync fallback. */
export function formatAllNullReadStatusLine(
  run: PublicControlPanelRunning,
): string {
  const metricType = run.success.metric.metric_type;
  const readLabel = metricType === "editorial" ? "Editorial read" : "PostHog read";
  const dateIso = run.end ?? latestReadDateIso(run.metric_daily);
  if (!dateIso) return readLabel;
  return `${readLabel}, ${formatDayShort(dateIso)}`;
}

function timelinePopoverId(itemId: string): string {
  return `lab-timeline-pop-${itemId.replace(/[^a-zA-Z0-9]/g, "_")}`;
}

function renderDefinitionListRow(
  label: string,
  valueHtml: string,
  escapeHtml: (t: string) => string,
): string {
  return `<div><dt class="text-stone-500">${escapeHtml(label)}</dt><dd>${valueHtml}</dd></div>`;
}

/** UX3 UX30 running experiment headline block; works without PostHog sync data. */
export function renderRunningControlPanelBlock(
  run: PublicControlPanelRunning,
  pub: LabExperimentsPublicFile,
  escapeHtml: (t: string) => string,
): string {
  const source = pub.experiments.find((e) => e.id === run.id);
  const title = sanitizeVisibleCopy(run.label);
  const track =
    run.metric_current !== null && run.success.metric.target != null
      ? computeTrackStatus(
          run.metric_current,
          run.success.metric,
          run.metric_baseline,
          run.day_of_min_read,
          run.min_read_days,
        )
      : null;
  const dayLine =
    run.day_of_min_read !== null ? `Day ${run.day_of_min_read} of ${run.min_read_days}` : "";
  const progress =
    run.progress_pct !== null
      ? renderProgressBarHtml(run.progress_pct)
      : renderReadWindowBarHtml(run.day_of_min_read, run.min_read_days);
  const moreId = escapeHtml(`hero-${run.id}`);

  const parts: string[] = [];
  parts.push(`<h2 class="text-lg font-bold tracking-tight">${escapeHtml(title)}</h2>
    <div class="mt-1 flex flex-wrap items-center gap-2 text-sm">
      ${renderLabStatusChip("experiment", "running", escapeHtml)}
      ${track ? renderLabStatusChip("track", track, escapeHtml) : ""}
      ${dayLine ? `<span class="text-stone-600 dark:text-stone-400">${escapeHtml(dayLine)}</span>` : ""}
    </div>
    ${progress}
    <div class="mt-2">${renderLabMoreButton(moreId, escapeHtml)}</div>
    <div class="lab-more-panel mt-2 text-xs text-stone-600 dark:text-stone-400" data-for="${moreId}" data-open="false">
      ${source ? experimentTechnicalMoreHtml(source, escapeHtml) : `<p class="font-mono">${escapeHtml(run.id)}</p>`}
    </div>`);

  const allNull = metricValuesAllNull(run);
  if (allNull) {
    parts.push(
      `<p class="mt-3 text-sm text-stone-600 dark:text-stone-400">${escapeHtml(formatAllNullReadStatusLine(run))}</p>`,
    );
  } else if (run.metric_daily.length > 0 || run.metric_current !== null) {
    const rows: string[] = [];
    rows.push(
      renderDefinitionListRow("Surface", escapeHtml(sanitizeVisibleCopy(formatSurfaces(run))), escapeHtml),
    );
    rows.push(
      renderDefinitionListRow(
        "Series",
        escapeHtml(sanitizeVisibleCopy(run.success.metric.metric_label)),
        escapeHtml,
      ),
    );
    if (run.metric_current !== null) {
      rows.push(
        renderDefinitionListRow("Current value", escapeHtml(String(run.metric_current)), escapeHtml),
      );
    }
    if (run.success.metric.target != null) {
      rows.push(renderDefinitionListRow("Target", escapeHtml(String(run.success.metric.target)), escapeHtml));
    }
    if (pub.status_sync.generated_at) {
      rows.push(
        renderDefinitionListRow(
          "Sync",
          escapeHtml(formatSyncedAgoPt(pub.status_sync.generated_at)),
          escapeHtml,
        ),
      );
    }
    parts.push(`<dl class="mt-3 grid gap-2 text-sm sm:grid-cols-2">${rows.join("")}</dl>`);
  }

  return parts.join("\n");
}

function renderWriteUpLink(
  experimentId: string,
  writeupPostIds: readonly string[],
  escapeHtml: (t: string) => string,
): string {
  if (!writeupPostIds.includes(experimentId)) return "";
  return `<a class="text-xs text-blue-800 underline dark:text-blue-400" href="posts/${escapeHtml(experimentId)}.html">Write up</a>`;
}

function renderLabDashboardStyles(): string {
  return `<style>
.lab-dashboard-section .lab-table-wrap { width: 100%; }
.lab-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
.lab-table th, .lab-table td { padding: 12px 8px; vertical-align: top; text-align: left; border-bottom: 1px solid rgb(231 229 228); }
.dark .lab-table th, .dark .lab-table td { border-bottom-color: rgb(68 64 60); }
.dark .lab-table { color: rgb(231 229 228); }
.dark .lab-table thead th { color: rgb(231 229 228); }
.lab-table th.lab-num, .lab-table td.lab-num { text-align: right; font-variant-numeric: tabular-nums; }
.lab-table tbody tr.lab-expand-row { display: none; }
.lab-table tbody tr.lab-expand-row[data-open="true"] { display: table-row; }
@media (max-width: 767px) {
  .lab-table thead { display: none; }
  .lab-table tbody tr.lab-data-row { display: block; margin-bottom: 12px; border: 1px solid rgb(231 229 228); border-radius: 8px; padding: 12px; }
  .dark .lab-table tbody tr.lab-data-row { border-color: rgb(68 64 60); }
  .lab-table tbody tr.lab-data-row td { display: block; border: none; padding: 4px 0; }
  .lab-table tbody tr.lab-expand-row { display: none; }
  .lab-table tbody tr.lab-expand-row[data-open="true"] { display: block; margin-bottom: 12px; padding: 12px; border: 1px dashed rgb(231 229 228); border-radius: 8px; }
  .dark .lab-table tbody tr.lab-expand-row[data-open="true"] { border-color: rgb(68 64 60); }
}
.lab-gantt { width: 100%; max-width: 100%; overflow-x: hidden; }
.lab-gantt-legend { display: flex; flex-wrap: wrap; gap: 12px 16px; align-items: center; font-size: 0.7rem; color: rgb(87 83 78); margin-bottom: 8px; }
.dark .lab-gantt-legend { color: rgb(168 162 158); }
.lab-gantt-legend-swatch { width: 1.25rem; height: 0.65rem; border-radius: 3px; display: inline-block; vertical-align: middle; margin-right: 4px; }
.lab-gantt-legend-done { background: rgb(168 162 158 / 0.55); }
.lab-gantt-legend-running { background: rgb(37 99 235); }
.lab-gantt-legend-planned { background: transparent; border: 2px solid rgb(37 99 235); box-sizing: border-box; }
.lab-gantt-legend-freeze { background: repeating-linear-gradient(135deg, rgb(120 113 108 / 0.25), rgb(120 113 108 / 0.25) 4px, transparent 4px, transparent 8px); }
.dark .lab-gantt-legend-done { background: rgb(87 83 78); }
.dark .lab-gantt-legend-planned { border-color: rgb(96 165 250); }
.dark .lab-gantt-legend-freeze { background: repeating-linear-gradient(135deg, rgb(255 255 255 / 0.15), rgb(255 255 255 / 0.15) 4px, transparent 4px, transparent 8px); }
.lab-gantt-axis { position: relative; height: 1.25rem; margin-left: 14rem; margin-bottom: 6px; font-size: 0.65rem; color: rgb(87 83 78); }
.dark .lab-gantt-axis { color: rgb(168 162 158); }
.lab-gantt-axis span { position: absolute; transform: translateX(-50%); white-space: nowrap; }
.lab-gantt-axis span.lab-gantt-month-current { font-weight: 700; color: rgb(41 37 36); }
.dark .lab-gantt-axis span.lab-gantt-month-current { color: rgb(231 229 228); }
.lab-gantt-rows { position: relative; }
.lab-gantt-overlay { position: absolute; left: calc(14rem + 8px); right: 0; top: 0; bottom: 0; pointer-events: none; z-index: 4; }
@media (min-width: 768px) and (max-width: 1024px) {
  .lab-gantt-overlay { left: calc(10rem + 8px); }
}
.lab-gantt-row { display: flex; align-items: stretch; gap: 8px; min-height: 32px; margin-bottom: 8px; cursor: pointer; border-radius: 4px; outline-offset: 2px; position: relative; }
.lab-gantt-row:focus-visible { outline: 2px solid rgb(37 99 235); }
.lab-gantt-row[data-popover-open="true"] { z-index: 50; }
.lab-gantt-name-col { width: 14rem; flex-shrink: 0; font-size: 0.75rem; line-height: 1.25; padding-top: 6px; }
.lab-gantt-name { font-weight: 600; word-wrap: break-word; overflow-wrap: anywhere; }
.lab-gantt-chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
.lab-gantt-chip { font-size: 0.65rem; font-weight: 600; border-radius: 9999px; padding: 2px 6px; background: rgb(231 229 228); color: rgb(68 64 60); }
.dark .lab-gantt-chip { background: rgb(68 64 60); color: rgb(231 229 228); }
.lab-gantt-track-wrap { position: relative; flex: 1; min-width: 0; min-height: 32px; background: rgb(245 245 244); border-radius: 4px; overflow: hidden; }
.dark .lab-gantt-track-wrap { background: rgb(28 25 23); }
.lab-gantt-bar { position: absolute; top: 4px; bottom: 4px; border-radius: 4px; min-height: 24px; pointer-events: none; }
.lab-gantt-bar-running { background: rgb(37 99 235); }
.lab-gantt-bar-planned { background: transparent; border: 2px solid rgb(37 99 235); box-sizing: border-box; }
.dark .lab-gantt-bar-planned { border-color: rgb(96 165 250); }
.lab-gantt-bar-done { background: rgb(168 162 158 / 0.55); display: flex; align-items: center; justify-content: center; color: rgb(41 37 36); }
.dark .lab-gantt-bar-done { background: rgb(87 83 78); color: rgb(231 229 228); }
.lab-gantt-bar-done svg { width: 14px; height: 14px; opacity: 0.85; }
.lab-gantt-freeze-band { position: absolute; top: 0; bottom: 0; background: repeating-linear-gradient(135deg, rgb(120 113 108 / 0.15), rgb(120 113 108 / 0.15) 6px, transparent 6px, transparent 12px); pointer-events: none; z-index: 1; }
.dark .lab-gantt-freeze-band { background: repeating-linear-gradient(135deg, rgb(255 255 255 / 0.15), rgb(255 255 255 / 0.15) 6px, transparent 6px, transparent 12px); }
.lab-gantt-freeze-axis-label { position: absolute; transform: translateX(-50%); font-size: 0.6rem; font-weight: 600; color: rgb(87 83 78); white-space: nowrap; }
.dark .lab-gantt-freeze-axis-label { color: rgb(168 162 158); }
.lab-gantt-today { position: absolute; top: 0; bottom: 0; width: 2px; background: rgb(239 68 68); z-index: 5; pointer-events: none; }
.dark .lab-gantt-name { color: rgb(231 229 228); }
.lab-gantt-row-hidden { display: none !important; }
.lab-gantt[data-show-all="true"] .lab-gantt-row-hidden { display: flex !important; }
.lab-gantt[data-show-all="true"] .lab-gantt-collapsed-row { display: none !important; }
.lab-gantt-show-all { margin-top: 8px; font-size: 0.75rem; }
.lab-gantt-collapsed-link { font-weight: 600; color: rgb(29 78 216); text-decoration: underline; }
.dark .lab-gantt-collapsed-link { color: rgb(96 165 250); }
.lab-timeline-desktop { display: block; }
.lab-timeline-mobile { display: none; }
@media (min-width: 768px) and (max-width: 1024px) {
  .lab-gantt-name-col { width: 10rem; }
  .lab-gantt-axis { margin-left: 10rem; }
  .lab-gantt-chips { width: 100%; }
}
@media (max-width: 767px) {
  .lab-timeline-desktop { display: none; }
  .lab-timeline-mobile { display: block; }
  .lab-timeline-mobile-month { font-size: 0.75rem; font-weight: 700; color: rgb(87 83 78); margin: 12px 0 6px; }
  .dark .lab-timeline-mobile-month { color: rgb(168 162 158); }
  .lab-timeline-mobile-item { border: 1px solid rgb(231 229 228); border-radius: 8px; padding: 10px; margin-bottom: 8px; font-size: 0.8rem; }
  .dark .lab-timeline-mobile-item { border-color: rgb(68 64 60); color: rgb(231 229 228); }
}
@media (max-width: 390px) {
  .lab-backlog-table .lab-backlog-starts-short { display: none; }
  .lab-backlog-table .lab-backlog-starts-long { display: block; text-align: left; }
  .lab-backlog-table .lab-backlog-depends-short { display: none; }
  .lab-backlog-table .lab-backlog-depends-long { display: block; text-align: left; }
  .lab-backlog-table td.lab-num { text-align: left; }
}
.lab-backlog-starts-long, .lab-backlog-depends-long { display: none; }
.lab-sparkline-animate polyline { stroke-dasharray: 240; animation: lab-spark 1.2s ease-out forwards; }
@keyframes lab-spark { from { stroke-dashoffset: 240; } to { stroke-dashoffset: 0; } }
.lab-progress-fill { transition: width 0.6s ease; }
@media (prefers-reduced-motion: reduce) {
  .lab-sparkline-animate polyline { animation: none; stroke-dasharray: none; }
  .lab-progress-fill { transition: none; }
}
.lab-timeline-popover { position: absolute; top: calc(100% + 8px); left: 0; z-index: 300; min-width: 12rem; max-width: 18rem; padding: 8px 10px; border-radius: 6px; border: 1px solid rgb(231 229 228); background: white; font-size: 0.75rem; font-weight: 400; box-shadow: 0 6px 20px rgb(0 0 0 / 0.15); white-space: normal; pointer-events: auto; }
.dark .lab-timeline-popover { background: rgb(28 25 23); border-color: rgb(68 64 60); color: rgb(231 229 228); }
.lab-timeline-popover[hidden] { display: none !important; }
.lab-timeline-popover:not([hidden]) { display: block !important; }
.lab-control-summary { display: grid; gap: 12px; font-size: 0.875rem; }
.lab-control-summary dt { font-weight: 600; color: rgb(87 83 78); }
.dark .lab-control-summary dt { color: rgb(168 162 158); }
.lab-control-summary dd { margin: 0; margin-top: 2px; }
.lab-read-window-fill { transition: width 0.6s ease; }
@media (prefers-reduced-motion: reduce) { .lab-read-window-fill { transition: none; } }
.lab-history-details-links { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.lab-hero-card { border: 1px solid rgb(231 229 228); border-radius: 12px; padding: 16px 18px; background: rgb(255 252 248); }
.dark .lab-hero-card { border-color: rgb(68 64 60); background: rgb(28 25 23); }
.lab-more-panel { display: none; }
.lab-more-panel[data-open="true"] { display: block; }
.lab-freeze-swatch { display: inline-block; width: 1.25rem; height: 0.65rem; border-radius: 3px; vertical-align: middle; margin-right: 6px; background: repeating-linear-gradient(135deg, rgb(120 113 108 / 0.25), rgb(120 113 108 / 0.25) 4px, transparent 4px, transparent 8px); }
.dark .lab-freeze-swatch { background: repeating-linear-gradient(135deg, rgb(255 255 255 / 0.15), rgb(255 255 255 / 0.15) 4px, transparent 4px, transparent 8px); }
.lab-history-row-hidden { display: none !important; }
.lab-history[data-show-all="true"] .lab-history-row-hidden { display: table-row !important; }
@media (max-width: 767px) {
  .lab-history[data-show-all="true"] .lab-history-row-hidden { display: block !important; }
}
.lab-last-updated { font-size: 0.75rem; color: rgb(120 113 108); margin-top: 8px; }
.dark .lab-last-updated { color: rgb(168 162 158); }
</style>`;
}

export function renderLabDashboardHtml(
  pub: LabExperimentsPublicFile,
  escapeHtml: (t: string) => string,
  options?: { asOfIsoDate?: string; timelineModel?: PublicTimelineModel | null },
): string {
  const sections: string[] = [];
  sections.push(renderLabDashboardStyles());

  sections.push(`<section id="lab-control-panel" class="lab-dashboard-section mb-10 font-sans lab-hero-card">`);
  const run = pub.control_panel.running;
  if (run) {
    sections.push(renderRunningControlPanelBlock(run, pub, escapeHtml));
  } else {
    sections.push(
      `<p class="text-sm text-stone-600 dark:text-stone-400">No experiment is running on the public Lab calendar right now.</p>`,
    );
  }
  const summary = pub.control_panel.summary;
  const summaryRows: string[] = [];
  if (summary.testing) {
    summaryRows.push(
      `<div><dt>Testing</dt><dd>${escapeHtml(plainHypothesisSentence(summary.testing.hypothesis))}</dd></div>`,
    );
  }
  if (summary.next_up) {
    const nu = summary.next_up;
    summaryRows.push(
      `<div><dt>Next up</dt><dd>${escapeHtml(sanitizeVisibleCopy(nu.label))}, ${escapeHtml(formatDayHuman(nu.start))}</dd></div>`,
    );
  }
  if (summary.last_result) {
    const lr = summary.last_result;
    summaryRows.push(
      `<div><dt>Last result</dt><dd class="flex flex-wrap items-center gap-2">${escapeHtml(sanitizeVisibleCopy(lr.label))} ${renderLabStatusChip("verdict", lr.verdict, escapeHtml)} ${renderWriteUpLink(lr.id, pub.writeup_post_ids, escapeHtml)}</dd></div>`,
    );
  }
  if (summaryRows.length > 0) {
    sections.push(`<dl class="lab-control-summary mt-8 border-t border-stone-200 pt-6 dark:border-stone-700">${summaryRows.join("")}</dl>`);
  }
  sections.push(`</section>`);

  const timeline =
    options?.timelineModel ??
    buildTimelineModel(pub.experiments, ["running", "done", "planned"], options?.asOfIsoDate ?? pub.generated_at.slice(0, 10));

  sections.push(`<section id="lab-timeline" class="lab-dashboard-section mb-10 font-sans">
    <h2 class="mb-3 text-lg font-bold tracking-tight">Timeline</h2>`);
  if (!timeline) {
    sections.push(`<p class="text-sm text-stone-600 dark:text-stone-400">No dated experiments to show.</p>`);
  } else {
    sections.push(renderTimelineDesktop(timeline, escapeHtml));
    sections.push(renderTimelineMobile(timeline, escapeHtml));
  }
  sections.push(`</section>`);

  sections.push(renderBacklogSection(pub, escapeHtml));
  sections.push(renderHistorySection(pub, escapeHtml));
  sections.push(renderLabDashboardScripts());

  return sections.join("\n");
}

const GANTT_CHECK_SVG =
  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 8.5 L6.5 12 L13 4"/></svg>';

function renderGanttLegend(escapeHtml: (t: string) => string): string {
  return `<div class="lab-gantt-legend" aria-hidden="true">
    <span><span class="lab-gantt-legend-swatch lab-gantt-legend-done"></span>${escapeHtml("Done")}</span>
    <span><span class="lab-gantt-legend-swatch lab-gantt-legend-running"></span>${escapeHtml("Running")}</span>
    <span><span class="lab-gantt-legend-swatch lab-gantt-legend-planned"></span>${escapeHtml("Planned")}</span>
    <span><span class="lab-gantt-legend-swatch lab-gantt-legend-freeze"></span>${escapeHtml("Freeze")}</span>
  </div>`;
}

function renderGanttAxisTicks(
  ticks: PublicTimelineModel["month_ticks"],
  escapeHtml: (t: string) => string,
): string {
  return ticks
    .map(
      (t) =>
        `<span class="${t.current ? "lab-gantt-month-current" : ""}" style="left:${t.offset_pct.toFixed(2)}%">${escapeHtml(t.label)}</span>`,
    )
    .join("");
}

function renderTimelineDesktop(
  timeline: PublicTimelineModel,
  escapeHtml: (t: string) => string,
): string {
  const showAllBtn =
    timeline.collapsed_count > 0
      ? `<button type="button" class="lab-gantt-show-all text-blue-800 underline dark:text-blue-400" data-lab-gantt-toggle aria-pressed="false">Show all</button>`
      : "";
  const rows = timeline.items.map((item) => renderGanttRow(item, escapeHtml)).join("");
  const freeze = timeline.freeze;
  const freezeDefault = freeze
    ? `left:${freeze.offset_pct.toFixed(2)}%;width:${freeze.width_pct.toFixed(2)}%;`
    : "";
  const freezeFull = freeze
    ? `left:${freeze.offset_pct_full.toFixed(2)}%;width:${freeze.width_pct_full.toFixed(2)}%;`
    : "";
  const todayPct = timeline.today_offset_pct;
  const todayFull = timeline.today_offset_pct_full;
  const freezeLabelPct =
    freeze != null ? resolveFreezeAxisLabelPct(freeze, timeline.month_ticks) : null;
  const freezeAxisLabel =
    freeze != null && freezeLabelPct != null
      ? `<span class="lab-gantt-freeze-axis-label" style="left:${freezeLabelPct.toFixed(2)}%">${escapeHtml("Freeze")}</span>`
      : "";
  const overlay = `<div class="lab-gantt-overlay" aria-hidden="true">
      ${freeze ? `<div class="lab-gantt-freeze-band" data-lab-freeze data-style-default="${freezeDefault}" data-style-full="${freezeFull}" style="${freezeDefault}"></div>` : ""}
      ${todayPct != null ? `<div class="lab-gantt-today" data-lab-today data-left-default="${todayPct.toFixed(2)}" data-left-full="${todayFull != null ? todayFull.toFixed(2) : ""}" style="left:${todayPct.toFixed(2)}%;"></div>` : ""}
    </div>`;
  return `<div class="lab-timeline-desktop lab-gantt" data-show-all="false">
    ${renderGanttLegend(escapeHtml)}
    <div class="lab-gantt-axis" data-lab-gantt-axis aria-hidden="true">${renderGanttAxisTicks(timeline.month_ticks, escapeHtml)}${freezeAxisLabel}</div>
    <div class="lab-gantt-rows" data-lab-gantt-rows>
      ${overlay}
      ${rows}
    </div>
    ${showAllBtn}
    <template data-lab-axis-full>${renderGanttAxisTicks(timeline.month_ticks_full, escapeHtml)}</template>
  </div>`;
}

function renderGanttRow(item: PublicTimelineItem, escapeHtml: (t: string) => string): string {
  if (item.kind === "collapsed") {
    return `<div class="lab-gantt-row lab-gantt-collapsed-row" tabindex="0">
      <div class="lab-gantt-name-col"><a class="lab-gantt-collapsed-link" href="#lab-history">${escapeHtml(sanitizeVisibleCopy(item.label))}</a></div>
      <div class="lab-gantt-track-wrap" aria-hidden="true"></div>
    </div>`;
  }
  const popId = timelinePopoverId(item.id);
  const label = sanitizeVisibleCopy(item.label);
  const win = formatWindowHuman(item.start, item.end);
  const chips =
    item.surfaces.length > 0
      ? surfaceChipLabels({ surface: item.surfaces })
          .map((c) => `<span class="lab-gantt-chip">${escapeHtml(c)}</span>`)
          .join("")
      : "";
  const hiddenClass = item.hidden_until_show_all ? " lab-gantt-row-hidden" : "";
  const barClass =
    item.status === "running"
      ? "lab-gantt-bar-running"
      : item.status === "planned"
        ? "lab-gantt-bar-planned"
        : "lab-gantt-bar-done";
  const doneInner = item.status === "done" ? GANTT_CHECK_SVG : "";
  return `<div class="lab-gantt-row${hiddenClass}" data-lab-gantt-row tabindex="0" role="button" aria-describedby="${escapeHtml(popId)}" aria-expanded="false" data-offset="${item.offset_pct.toFixed(4)}" data-width="${item.width_pct.toFixed(4)}" data-offset-full="${item.offset_pct_full.toFixed(4)}" data-width-full="${item.width_pct_full.toFixed(4)}">
    <div class="lab-gantt-name-col">
      <div class="lab-gantt-name">${escapeHtml(label)}</div>
      <div class="lab-gantt-chips">${chips}</div>
    </div>
    <div class="lab-gantt-track-wrap">
      <div class="lab-gantt-bar ${barClass}" style="left:${item.offset_pct.toFixed(2)}%;width:${item.width_pct.toFixed(2)}%;">${doneInner}</div>
    </div>
    <div id="${escapeHtml(popId)}" class="lab-timeline-popover" role="tooltip" hidden>
      <p class="lab-timeline-popover-name font-bold text-stone-900 dark:text-stone-100">${escapeHtml(label)}</p>
      <p class="mt-1" title="${escapeHtml(isoTitleAttr(item.start))} to ${escapeHtml(isoTitleAttr(item.end))}">${escapeHtml(win)}</p>
      <p class="mt-1">${renderLabStatusChip("experiment", item.status, escapeHtml)}</p>
      <div class="mt-2">${renderLabMoreButton(popId, escapeHtml)}</div>
      <div class="lab-more-panel mt-1 text-xs text-stone-600 dark:text-stone-400" data-for="${escapeHtml(popId)}" data-open="false">
        <p class="font-mono">${escapeHtml(item.id)}</p>
      </div>
    </div>
  </div>`;
}

function renderTimelineMobile(
  timeline: PublicTimelineModel,
  escapeHtml: (t: string) => string,
): string {
  const byMonth = new Map<string, PublicTimelineItem[]>();
  for (const item of timeline.items) {
    if (item.kind === "collapsed") continue;
    const key = item.start.slice(0, 7);
    const list = byMonth.get(key) ?? [];
    list.push(item);
    byMonth.set(key, list);
  }
  const months = [...byMonth.keys()].sort();
  const blocks = months.map((key) => {
    const monthLabel = formatMonthTick(`${key}-01`) + " " + key.slice(0, 4);
    const rows = (byMonth.get(key) ?? [])
      .map((item) => {
        const win = formatWindowHuman(item.start, item.end);
        const chips = surfaceChipLabels({ surface: item.surfaces })
          .map((c) => `<span class="lab-gantt-chip">${escapeHtml(c)}</span>`)
          .join(" ");
        return `<li class="lab-timeline-mobile-item">
          <div class="font-semibold">${escapeHtml(sanitizeVisibleCopy(item.label))}</div>
          ${chips ? `<div class="mt-1">${chips}</div>` : ""}
          <div class="mt-1 text-stone-600 dark:text-stone-400">${escapeHtml(win)}</div>
          <div class="mt-1">${renderLabStatusChip("experiment", item.status, escapeHtml)}</div>
        </li>`;
      })
      .join("");
    return `<div class="lab-timeline-mobile-month">${escapeHtml(monthLabel)}</div><ul class="list-none p-0">${rows}</ul>`;
  });
  return `<div class="lab-timeline-mobile">${blocks.join("")}</div>`;
}

function renderLabDashboardScripts(): string {
  return `<script>
document.querySelectorAll('.lab-expand-toggle').forEach(function(btn){
  btn.addEventListener('click', function(e){
    e.stopPropagation();
    var id = btn.getAttribute('data-target');
    var row = document.querySelector('.lab-expand-row[data-for="'+id+'"], .lab-more-panel[data-for="'+id+'"]');
    if(!row) return;
    var open = row.getAttribute('data-open') === 'true';
    row.setAttribute('data-open', open ? 'false' : 'true');
    btn.textContent = open ? 'More' : 'Less';
  });
});
(function(){
  document.querySelectorAll('[data-lab-history-toggle]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var root = btn.closest('.lab-history');
      if(!root) return;
      var showing = root.getAttribute('data-show-all') === 'true';
      root.setAttribute('data-show-all', showing ? 'false' : 'true');
      btn.setAttribute('aria-pressed', showing ? 'false' : 'true');
      btn.textContent = showing ? 'Show all' : 'Show latest 5';
    });
  });
})();
(function(){
  var openPop = null;
  var openRow = null;
  function closePopover(){
    if(openPop){
      openPop.hidden = true;
      openPop = null;
    }
    if(openRow){
      openRow.removeAttribute('data-popover-open');
      openRow.setAttribute('aria-expanded','false');
      openRow = null;
    }
  }
  function openForRow(row){
    if(row.classList.contains('lab-gantt-collapsed-row')) return;
    var pop = row.querySelector('.lab-timeline-popover');
    if(!pop) return;
    closePopover();
    row.setAttribute('data-popover-open','true');
    pop.hidden = false;
    openPop = pop;
    openRow = row;
    row.setAttribute('aria-expanded','true');
  }
  document.querySelectorAll('[data-lab-gantt-row]').forEach(function(row){
    row.addEventListener('click', function(e){
      if(e.target.closest('a')) return;
      e.stopPropagation();
      openForRow(row);
    });
    row.addEventListener('focus', function(){ openForRow(row); });
    row.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){ closePopover(); row.blur(); }
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openForRow(row); }
    });
  });
  document.addEventListener('click', function(e){
    if(e.target.closest('[data-lab-gantt-row]') || e.target.closest('.lab-timeline-popover')) return;
    closePopover();
  });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closePopover(); });
  window.addEventListener('scroll', function(){ closePopover(); }, true);
})();
(function(){
  document.querySelectorAll('[data-lab-gantt-axis]').forEach(function(axis){
    axis.setAttribute('data-default-html', axis.innerHTML);
  });
  document.querySelectorAll('[data-lab-gantt-toggle]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var root = btn.closest('.lab-gantt');
      if(!root) return;
      var showingAll = root.getAttribute('data-show-all') === 'true';
      var nextAll = !showingAll;
      root.setAttribute('data-show-all', nextAll ? 'true' : 'false');
      btn.setAttribute('aria-pressed', nextAll ? 'true' : 'false');
      btn.textContent = nextAll ? 'Show default window' : 'Show all';
      var axis = root.querySelector('[data-lab-gantt-axis]');
      var fullTpl = root.querySelector('[data-lab-axis-full]');
      if(axis && fullTpl){
        axis.innerHTML = nextAll ? fullTpl.innerHTML : (axis.getAttribute('data-default-html') || axis.innerHTML);
      }
      root.querySelectorAll('[data-lab-gantt-row]').forEach(function(row){
        var bar = row.querySelector('.lab-gantt-bar');
        if(!bar) return;
        var off = nextAll ? row.getAttribute('data-offset-full') : row.getAttribute('data-offset');
        var wid = nextAll ? row.getAttribute('data-width-full') : row.getAttribute('data-width');
        if(off != null && wid != null){
          bar.style.left = parseFloat(off).toFixed(2) + '%';
          bar.style.width = parseFloat(wid).toFixed(2) + '%';
        }
      });
      var freeze = root.querySelector('[data-lab-freeze]');
      if(freeze){
        var st = nextAll ? freeze.getAttribute('data-style-full') : freeze.getAttribute('data-style-default');
        if(st) freeze.setAttribute('style', st);
      }
      var today = root.querySelector('[data-lab-today]');
      if(today){
        var left = nextAll ? today.getAttribute('data-left-full') : today.getAttribute('data-left-default');
        if(left) today.style.left = left + '%';
      }
    });
  });
})();
</script>`;
}

function renderBacklogSection(pub: LabExperimentsPublicFile, escapeHtml: (t: string) => string): string {
  const freezePolicy = pub.experiments.find((e) => e.id === "POLICY-DIGEST-UI-FREEZE");
  const parts = [`<section id="lab-backlog" class="lab-dashboard-section mb-10 font-sans">
    <h2 class="mb-3 text-lg font-bold tracking-tight">Backlog</h2>`];
  if (pub.backlog.length === 0 && !freezePolicy) {
    parts.push(`<p class="text-sm text-stone-600 dark:text-stone-400">Nothing queued for publication.</p>`);
  } else {
    parts.push(`<div class="lab-table-wrap"><table class="lab-table lab-backlog-table border border-stone-200 text-sm dark:border-stone-700">
      <thead class="bg-stone-50 dark:bg-stone-900"><tr>
        <th>Name</th><th>Surface</th><th class="lab-num">Starts</th><th>Depends on</th>
      </tr></thead><tbody>`);
    if (freezePolicy?.start) {
      const freezeId = escapeHtml("POLICY-DIGEST-UI-FREEZE");
      const freezeStart = formatDayHuman(freezePolicy.start);
      parts.push(`<tr class="lab-data-row lab-backlog-freeze-row">
        <td><span class="lab-freeze-swatch" aria-hidden="true"></span><span class="font-semibold">${escapeHtml(sanitizeVisibleCopy(freezePolicy.label))}</span> <span class="inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold leading-none border border-stone-400 bg-transparent text-stone-800 dark:border-stone-500 dark:text-stone-200">Freeze</span></td>
        <td>${escapeHtml(sanitizeVisibleCopy(formatSurfaces(freezePolicy)))}</td>
        <td class="lab-num lab-backlog-starts" title="${escapeHtml(isoTitleAttr(freezePolicy.start))}">${escapeHtml(freezeStart)}</td>
        <td class="text-xs">${renderLabMoreButton(freezeId, escapeHtml)}</td>
      </tr>
      <tr class="lab-expand-row" data-for="${freezeId}" data-open="false"><td colspan="4" class="text-xs text-stone-600 dark:text-stone-400">
        ${experimentTechnicalMoreHtml(freezePolicy, escapeHtml)}
      </td></tr>`);
    }
    for (const b of pub.backlog) {
      const starts = b.start ? formatDayHuman(b.start) : "";
      const surfacesText = sanitizeVisibleCopy(formatSurfaces(b));
      const deps = formatBacklogDependsOn(b.depends_on, pub.experiments);
      const rowId = escapeHtml(b.id);
      const moreBtn = renderLabMoreButton(rowId, escapeHtml);
      const source = pub.experiments.find((e) => e.id === b.id);
      parts.push(`<tr class="lab-data-row">
        <td><span class="font-semibold">${escapeHtml(sanitizeVisibleCopy(b.label))}</span></td>
        <td>${escapeHtml(surfacesText)}</td>
        <td class="lab-num lab-backlog-starts" title="${escapeHtml(isoTitleAttr(b.start))}">${escapeHtml(starts)}</td>
        <td class="text-xs lab-backlog-depends">${deps.htmlNames ? deps.htmlNames : ""} ${moreBtn}</td>
      </tr>
      <tr class="lab-expand-row" data-for="${rowId}" data-open="false"><td colspan="4" class="text-xs text-stone-600 dark:text-stone-400">
        ${source ? experimentTechnicalMoreHtml(source, escapeHtml) : `<p class="font-mono">${escapeHtml(b.id)}</p>`}
      </td></tr>`);
    }
    parts.push(`</tbody></table></div>`);
  }
  parts.push(`</section>`);
  return parts.join("\n");
}

function renderHistorySection(pub: LabExperimentsPublicFile, escapeHtml: (t: string) => string): string {
  const parts = [`<section id="lab-history" class="lab-dashboard-section mb-10 font-sans lab-history" data-show-all="false">
    <h2 class="mb-3 text-lg font-bold tracking-tight">History</h2>`];
  if (pub.history.length === 0) {
    parts.push(`<p class="text-sm text-stone-600 dark:text-stone-400">No completed experiments published yet.</p>`);
  } else {
    const showAllBtn =
      pub.history.length > 5
        ? `<button type="button" class="lab-history-show-all mb-3 text-sm text-blue-800 underline dark:text-blue-400" data-lab-history-toggle aria-pressed="false">Show all</button>`
        : "";
    parts.push(showAllBtn);
    parts.push(`<div class="lab-table-wrap"><table class="lab-table lab-history-table border border-stone-200 text-sm dark:border-stone-700">
      <thead class="bg-stone-50 dark:bg-stone-900"><tr>
        <th>Name</th><th>Window</th><th>Result</th><th>Details</th>
      </tr></thead><tbody>`);
    pub.history.forEach((h, index) => {
      const win = formatWindowHuman(h.start, h.end);
      const rowId = escapeHtml(h.id);
      const resultLine = historyResultLine(h);
      const verdictChip = h.verdict ? renderLabStatusChip("verdict", h.verdict, escapeHtml) : "";
      const resultCell = resultLine
        ? `<span class="text-stone-700 dark:text-stone-300">${escapeHtml(resultLine)}</span>`
        : verdictChip;
      const hiddenClass = index >= 5 ? " lab-history-row-hidden" : "";
      const source = pub.experiments.find((e) => e.id === h.id);
      parts.push(`<tr class="lab-data-row${hiddenClass}">
        <td><span class="font-semibold">${escapeHtml(sanitizeVisibleCopy(h.label))}</span></td>
        <td title="${escapeHtml(isoTitleAttr(h.start))} to ${escapeHtml(isoTitleAttr(h.end))}">${escapeHtml(win)}</td>
        <td>${resultCell}</td>
        <td><div class="lab-history-details-links">${renderWriteUpLink(h.id, pub.writeup_post_ids, escapeHtml)} ${renderLabMoreButton(rowId, escapeHtml)}</div></td>
      </tr>
      <tr class="lab-expand-row${hiddenClass}" data-for="${rowId}" data-open="false"><td colspan="4" class="text-xs">
        ${source ? experimentTechnicalMoreHtml(source, escapeHtml) : `<p class="font-mono">${escapeHtml(h.id)}</p>`}
      </td></tr>`);
    });
    parts.push(`</tbody></table></div>`);
  }
  parts.push(`</section>`);
  return parts.join("\n");
}

/** QA helper: forbidden punctuation in visible lab dashboard HTML (outside monospace and title attrs). */
export function findForbiddenLabCopyViolations(html: string): string[] {
  let stripped = html.replace(/<style[\s\S]*?<\/style>/gi, "");
  stripped = stripped.replace(/<script[\s\S]*?<\/script>/gi, "");
  stripped = stripped.replace(/\stitle="[^"]*"/gi, "");
  stripped = stripped.replace(/<[^>]*class="[^"]*font-mono[^"]*"[^>]*>[\s\S]*?<\/[^>]+>/gi, "");
  stripped = stripped.replace(/<code>[\s\S]*?<\/code>/gi, "");
  stripped = stripped.replace(/<pre[\s\S]*?<\/pre>/gi, "");
  stripped = stripped.replace(/<footer[\s\S]*?<\/footer>/gi, "");
  stripped = stripped.replace(/<nav[^>]*site-footer[\s\S]*?<\/nav>/gi, "");
  stripped = stripped.replace(/<t[dh][^>]*>\s*[-|:]+\s*<\/t[dh]>/gi, " ");
  const text = stripped.replace(/<[^>]+>/g, " ");
  const cleaned = text
    .replace(/\s[-–—|]{3,}\s/g, " ")
    .replace(/\|[-|\s:]+\|/g, " ");
  const violations: string[] = [];
  const re = /[\u2013\u2014]|->|→|–|—|-/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(cleaned)) !== null) {
    violations.push(cleaned.slice(Math.max(0, m.index - 20), m.index + 20));
    if (violations.length >= 5) break;
  }
  return violations;
}
