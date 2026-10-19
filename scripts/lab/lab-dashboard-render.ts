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
  formatSyncedAgoPt,
  formatWindowHuman,
  isoTitleAttr,
  sanitizeVisibleCopy,
  surfaceLabel,
  formatMonthTick,
} from "./lab-format.js";
import { renderLabStatusChip } from "./lab-dashboard-ui.js";
import {
  computeTrackStatus,
  renderProgressBarHtml,
  renderSparklineSvg,
} from "./lab-metric-progress.js";
import { formatSurfaces } from "./lab-format.js";

export const SURFACE_LANE_ORDER: LabSurface[] = [
  "digest_ui",
  "narration_oss",
  "narration_skills",
  "email",
];

function parseIsoMs(iso: string): number {
  return Date.parse(`${iso}T00:00:00Z`);
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

  let rangeStart = dated[0].start!;
  let rangeEnd = dated[0].end!;
  for (const e of dated) {
    if (e.start! < rangeStart) rangeStart = e.start!;
    if (e.end! > rangeEnd) rangeEnd = e.end!;
  }
  const totalMs = Math.max(parseIsoMs(rangeEnd) - parseIsoMs(rangeStart), 86_400_000);

  const freezeEntry = entries.find((e) => e.id === "POLICY-DIGEST-UI-FREEZE");
  let freeze: PublicTimelineModel["freeze"] = null;
  if (freezeEntry?.start && freezeEntry?.end) {
    const offsetMs = parseIsoMs(freezeEntry.start) - parseIsoMs(rangeStart);
    const widthMs = parseIsoMs(freezeEntry.end) - parseIsoMs(freezeEntry.start) + 86_400_000;
    freeze = {
      start: freezeEntry.start,
      end: freezeEntry.end,
      offset_pct: Math.max(0, (offsetMs / totalMs) * 100),
      width_pct: Math.max(1, (widthMs / totalMs) * 100),
    };
  }

  const month_ticks: { label: string; offset_pct: number }[] = [];
  let cursor = new Date(`${rangeStart}T00:00:00Z`);
  const endDate = new Date(`${rangeEnd}T00:00:00Z`);
  cursor.setUTCDate(1);
  while (cursor <= endDate) {
    const iso = cursor.toISOString().slice(0, 10);
    const offsetMs = parseIsoMs(iso) - parseIsoMs(rangeStart);
    month_ticks.push({
      label: formatMonthTick(iso),
      offset_pct: Math.max(0, Math.min(100, (offsetMs / totalMs) * 100)),
    });
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }

  let today_offset_pct: number | null = null;
  if (asOfIsoDate >= rangeStart && asOfIsoDate <= rangeEnd) {
    const offsetMs = parseIsoMs(asOfIsoDate) - parseIsoMs(rangeStart);
    today_offset_pct = Math.max(0, Math.min(100, (offsetMs / totalMs) * 100));
  }

  const lanes = SURFACE_LANE_ORDER.filter((lane) =>
    dated.some((e) => surfacesList(e).includes(lane)),
  );

  const laneIndex = new Map(lanes.map((l, i) => [l, i]));

  const items: PublicTimelineItem[] = dated.map((e) => {
    const surfaces = surfacesList(e).filter((s) => laneIndex.has(s));
    const indices = surfaces.map((s) => laneIndex.get(s)!);
    const lane_start = Math.min(...indices);
    const lane_end = Math.max(...indices);
    const offsetMs = parseIsoMs(e.start!) - parseIsoMs(rangeStart);
    const widthMs = parseIsoMs(e.end!) - parseIsoMs(e.start!) + 86_400_000;
    return {
      id: e.id,
      label: e.label,
      status: e.status,
      start: e.start!,
      end: e.end!,
      surfaces,
      offset_pct: Math.max(0, (offsetMs / totalMs) * 100),
      width_pct: Math.max(1, (widthMs / totalMs) * 100),
      lane_start,
      lane_span: lane_end - lane_start + 1,
      show_both_tag: surfaces.length > 1,
    };
  });

  items.sort((a, b) => a.start.localeCompare(b.start) || a.id.localeCompare(b.id));

  return {
    range_start: rangeStart,
    range_end: rangeEnd,
    today_iso: asOfIsoDate,
    today_offset_pct,
    month_ticks,
    freeze,
    lanes,
    items,
  };
}

function surfacesList(e: { surface: LabSurface | LabSurface[] }): LabSurface[] {
  return Array.isArray(e.surface) ? e.surface : [e.surface];
}

function barStatusClass(status: LabExperimentStatus): string {
  if (status === "running") return "lab-timeline-bar-running";
  if (status === "planned") return "lab-timeline-bar-planned";
  return "lab-timeline-bar-done";
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

function renderDefinitionListRow(
  label: string,
  valueHtml: string,
  escapeHtml: (t: string) => string,
): string {
  return `<div><dt class="text-stone-500">${escapeHtml(label)}</dt><dd>${valueHtml}</dd></div>`;
}

function renderLabDashboardStyles(): string {
  return `<style>
.lab-dashboard-section .lab-table-wrap { width: 100%; }
.lab-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
.lab-table th, .lab-table td { padding: 12px 8px; vertical-align: top; text-align: left; }
.lab-table th.lab-num, .lab-table td.lab-num { text-align: right; font-variant-numeric: tabular-nums; }
.lab-table tbody tr.lab-expand-row { display: none; }
.lab-table tbody tr.lab-expand-row[data-open="true"] { display: table-row; }
@media (max-width: 767px) {
  .lab-table thead { display: none; }
  .lab-table tbody tr.lab-data-row { display: block; margin-bottom: 12px; border: 1px solid rgb(231 229 228); border-radius: 8px; padding: 12px; }
  .lab-table tbody tr.lab-data-row td { display: block; border: none; padding: 4px 0; }
  .lab-table tbody tr.lab-expand-row { display: none; }
  .lab-table tbody tr.lab-expand-row[data-open="true"] { display: block; margin-bottom: 12px; padding: 12px; border: 1px dashed rgb(231 229 228); border-radius: 8px; }
}
.lab-timeline-months { position: relative; height: 1.25rem; margin-bottom: 8px; font-size: 0.65rem; color: rgb(120 113 108); }
.lab-timeline-months span { position: absolute; transform: translateX(-50%); }
.lab-timeline-track { position: relative; min-height: 28px; margin-bottom: 12px; }
.lab-timeline-lane-label { width: 7rem; flex-shrink: 0; font-size: 0.7rem; color: rgb(120 113 108); padding-top: 6px; }
.lab-timeline-lane-row { display: flex; gap: 8px; margin-bottom: 12px; }
.lab-timeline-lane-track { position: relative; flex: 1; min-height: 28px; background: rgb(245 245 244); border-radius: 4px; }
.dark .lab-timeline-lane-track { background: rgb(28 25 23); }
.lab-timeline-bar { position: absolute; top: 0; min-height: 28px; border-radius: 4px; display: flex; align-items: center; padding: 0 8px; font-size: 0.75rem; font-weight: 600; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.lab-timeline-bar-running { background: rgb(37 99 235); color: white; }
.lab-timeline-bar-planned { background: transparent; border: 2px solid rgb(37 99 235); color: rgb(30 64 175); }
.dark .lab-timeline-bar-planned { color: rgb(191 219 254); }
.lab-timeline-bar-done { background: rgb(168 162 158 / 0.55); color: rgb(41 37 36); }
.lab-timeline-freeze { position: absolute; top: 0; bottom: 0; background: repeating-linear-gradient(135deg, rgb(120 113 108 / 0.15), rgb(120 113 108 / 0.15) 6px, transparent 6px, transparent 12px); pointer-events: none; z-index: 1; }
.lab-timeline-today { position: absolute; top: 0; bottom: 0; width: 2px; background: rgb(239 68 68); z-index: 2; pointer-events: none; }
.lab-timeline-body { position: relative; }
.lab-timeline-span-grid { display: grid; grid-template-columns: 7rem 1fr; gap: 8px 8px; }
.lab-timeline-bar-span { z-index: 3; }
.lab-sparkline-animate polyline { stroke-dasharray: 240; animation: lab-spark 1.2s ease-out forwards; }
@keyframes lab-spark { from { stroke-dashoffset: 240; } to { stroke-dashoffset: 0; } }
.lab-progress-fill { transition: width 0.6s ease; }
@media (prefers-reduced-motion: reduce) {
  .lab-sparkline-animate polyline { animation: none; stroke-dasharray: none; }
  .lab-progress-fill { transition: none; }
}
.lab-how-to-read { font-size: 0.875rem; color: rgb(87 83 78); margin-bottom: 1.5rem; }
.dark .lab-how-to-read { color: rgb(168 162 158); }
</style>`;
}

export function renderLabDashboardHtml(
  pub: LabExperimentsPublicFile,
  escapeHtml: (t: string) => string,
  options?: { asOfIsoDate?: string; timelineModel?: PublicTimelineModel | null },
): string {
  const sections: string[] = [];
  sections.push(renderLabDashboardStyles());

  sections.push(`<div class="lab-how-to-read font-sans">
    <p><strong>How to read this.</strong> Each row is one change to the public site or digest pipeline with a before window and an after window. <a href="#how-to-read-an-experiment" class="text-blue-800 underline dark:text-blue-400">Full explainer</a></p>
  </div>`);

  sections.push(`<section id="lab-control-panel" class="lab-dashboard-section mb-10 font-sans">`);
  const run = pub.control_panel.running;
  if (!run) {
    sections.push(
      `<p class="text-sm text-stone-600 dark:text-stone-400">No experiment is running on the public Lab calendar right now.</p>`,
    );
  } else {
    const metricType = run.success.metric.metric_type;
    const readDate = latestReadDateIso(run.metric_daily);
    const allNull = metricValuesAllNull(run);
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
      run.day_of_min_read !== null
        ? `Day ${run.day_of_min_read} of ${run.min_read_days}`
        : "";
    const progress = renderProgressBarHtml(run.progress_pct);
    const spark = renderSparklineSvg(run.metric_daily, 160, metricType === "editorial" ? 40 : 48);
    const rubricHeadline = sanitizeVisibleCopy(run.success.metric.pass_threshold);
    const headlineBlock =
      metricType === "posthog"
        ? `<div class="mb-2">${spark}</div>`
        : `<p class="text-sm font-medium text-stone-800 dark:text-stone-100">${escapeHtml(rubricHeadline)}${readDate ? ` · ${escapeHtml(formatDayHuman(readDate))}` : ""}</p>
           <div class="mt-2"><p class="text-xs text-stone-500">Monitoring only</p><div style="max-height:40px;overflow:hidden">${spark}</div></div>`;

    sections.push(`<h2 class="text-lg font-bold tracking-tight">${escapeHtml(title)}</h2>
      <div class="mt-1 flex flex-wrap items-center gap-2 text-sm">
        ${renderLabStatusChip("experiment", "running", escapeHtml)}
        ${track ? renderLabStatusChip("track", track, escapeHtml) : ""}
        ${dayLine ? `<span class="text-stone-600 dark:text-stone-400">${escapeHtml(dayLine)}</span>` : ""}
      </div>
      ${progress}
      <p class="mt-2 font-mono text-xs text-stone-500">${escapeHtml(run.id)}</p>
      <details class="mt-3 text-sm text-stone-700 dark:text-stone-300">
        <summary class="cursor-pointer font-medium" aria-expanded="false">Details</summary>
        <p class="mt-2">${escapeHtml(sanitizeVisibleCopy(run.success.success_criteria))}</p>
      </details>
      <div class="mt-4 rounded-lg border border-stone-200 p-4 dark:border-stone-700">${headlineBlock}`);

    if (allNull) {
      const readLabel = metricType === "editorial" ? "Editorial read" : "PostHog read";
      const when = readDate ? formatDayHuman(readDate) : formatSyncedAgoPt(pub.status_sync.generated_at);
      sections.push(
        `<p class="mt-3 text-sm text-stone-600 dark:text-stone-400">${escapeHtml(readLabel)} · ${escapeHtml(when)}</p>`,
      );
    } else {
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
          renderDefinitionListRow(
            "Current value",
            escapeHtml(String(run.metric_current)),
            escapeHtml,
          ),
        );
      }
      if (run.success.metric.target != null) {
        rows.push(
          renderDefinitionListRow("Target", escapeHtml(String(run.success.metric.target)), escapeHtml),
        );
      }
      if (run.metric_baseline !== 0 || run.success.metric.baseline != null) {
        rows.push(
          renderDefinitionListRow("Baseline", escapeHtml(String(run.metric_baseline)), escapeHtml),
        );
      }
      if (run.start || run.end) {
        const win = formatWindowHuman(run.start, run.end);
        const tStart = isoTitleAttr(run.start);
        const tEnd = isoTitleAttr(run.end);
        rows.push(
          renderDefinitionListRow(
            "Window",
            `<span title="${escapeHtml(tStart)} to ${escapeHtml(tEnd)}">${escapeHtml(win)}</span>`,
            escapeHtml,
          ),
        );
      }
      if (run.exposure_count !== null) {
        rows.push(
          renderDefinitionListRow("Exposure", escapeHtml(String(run.exposure_count)), escapeHtml),
        );
      }
      if (run.sample_count !== null) {
        rows.push(renderDefinitionListRow("Sample", escapeHtml(String(run.sample_count)), escapeHtml));
      }
      if (run.metric_delta !== null) {
        const deltaLabel = run.metric_delta_label
          ? sanitizeVisibleCopy(run.metric_delta_label)
          : "Delta";
        rows.push(
          renderDefinitionListRow(
            deltaLabel,
            escapeHtml(String(run.metric_delta)),
            escapeHtml,
          ),
        );
      }
      rows.push(
        renderDefinitionListRow(
          "Sync",
          escapeHtml(formatSyncedAgoPt(pub.status_sync.generated_at)),
          escapeHtml,
        ),
      );
      sections.push(`<dl class="mt-3 grid gap-2 text-sm sm:grid-cols-2">${rows.join("")}</dl>`);
    }
    sections.push(`</div>`);
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
    const laneBlock = 40;
  const tracksHeight = timeline.lanes.length * laneBlock - 12;
  sections.push(`<div class="lab-timeline-body">
      <div class="flex gap-2">
        <div class="w-28 shrink-0"></div>
        <div class="lab-timeline-months flex-1" aria-hidden="true">
          ${timeline.month_ticks.map((t) => `<span style="left:${t.offset_pct.toFixed(2)}%">${escapeHtml(t.label)}</span>`).join("")}
        </div>
      </div>
      <div class="flex gap-2">
        <div class="w-28 shrink-0 space-y-3 pt-1">
          ${timeline.lanes.map((lane) => `<div class="text-xs text-stone-500" style="min-height:28px">${escapeHtml(surfaceLabel(lane))}</div>`).join("")}
        </div>
        <div class="relative flex-1" style="min-height:${tracksHeight}px">
          ${timeline.freeze ? `<div class="lab-timeline-freeze" style="left:${timeline.freeze.offset_pct.toFixed(2)}%;width:${timeline.freeze.width_pct.toFixed(2)}%;" title="Digest UI freeze"></div>` : ""}
          ${timeline.today_offset_pct != null ? `<div class="lab-timeline-today" style="left:${timeline.today_offset_pct.toFixed(2)}%;" title="Today"></div>` : ""}
          ${timeline.items
            .map((item) => {
              const tip = `${item.id} · ${formatWindowHuman(item.start, item.end)} · ${item.status}`;
              const both = item.show_both_tag
                ? `<span class="ml-1 rounded bg-stone-200 px-1 text-xs font-normal dark:bg-stone-700">Both</span>`
                : "";
              const top = item.lane_start * laneBlock;
              const height = item.lane_span * 28 + (item.lane_span - 1) * 12;
              return `<div class="lab-timeline-bar ${barStatusClass(item.status)}" style="left:${item.offset_pct.toFixed(2)}%;width:${item.width_pct.toFixed(2)}%;top:${top}px;height:${height}px;" tabindex="0" title="${escapeHtml(tip)}">
            <span>${escapeHtml(sanitizeVisibleCopy(item.label))}${both}</span>
          </div>`;
            })
            .join("")}
        </div>
      </div>
    </div>`);
  }
  sections.push(`</section>`);

  sections.push(renderBacklogSection(pub, escapeHtml));
  sections.push(renderHistorySection(pub, escapeHtml));

  return sections.join("\n");
}

function renderBacklogSection(pub: LabExperimentsPublicFile, escapeHtml: (t: string) => string): string {
  const parts = [`<section id="lab-backlog" class="lab-dashboard-section mb-10 font-sans">
    <h2 class="mb-3 text-lg font-bold tracking-tight">Backlog</h2>`];
  if (pub.backlog.length === 0) {
    parts.push(`<p class="text-sm text-stone-600 dark:text-stone-400">Nothing queued for publication.</p>`);
  } else {
    parts.push(`<div class="lab-table-wrap"><table class="lab-table border border-stone-200 text-sm dark:border-stone-700">
      <thead class="bg-stone-50 dark:bg-stone-900"><tr>
        <th>Name</th><th>Surface</th><th class="lab-num">Starts</th><th>Depends on</th><th></th>
      </tr></thead><tbody>`);
    for (const b of pub.backlog) {
      const starts = b.start ? formatDayHuman(b.start) : "";
      const deps = b.depends_on.length ? b.depends_on.map((d) => d).join(", ") : "";
      const rowId = escapeHtml(b.id);
      parts.push(`<tr class="lab-data-row">
        <td><span class="font-semibold">${escapeHtml(sanitizeVisibleCopy(b.label))}</span></td>
        <td>${escapeHtml(sanitizeVisibleCopy(formatSurfaces(b)))}${Array.isArray(b.surface) && b.surface.length > 1 ? `<span class="ml-1 rounded bg-stone-200 px-1 text-xs dark:bg-stone-700">Both</span>` : ""}</td>
        <td class="lab-num" title="${escapeHtml(isoTitleAttr(b.start))}">${escapeHtml(starts)}</td>
        <td class="font-mono text-xs">${escapeHtml(deps)}</td>
        <td><button type="button" class="text-xs text-blue-800 dark:text-blue-400 lab-expand-toggle" data-target="${rowId}">More</button></td>
      </tr>
      <tr class="lab-expand-row" data-for="${rowId}" data-open="false"><td colspan="5" class="text-xs text-stone-600 dark:text-stone-400">
        <p class="font-mono">${escapeHtml(b.id)}</p>
        <p>${escapeHtml(sanitizeVisibleCopy(b.metric))}</p>
        ${b.note ? `<p>${escapeHtml(sanitizeVisibleCopy(b.note))}</p>` : ""}
      </td></tr>`);
    }
    parts.push(`</tbody></table></div>`);
  }
  parts.push(`</section>`);
  return parts.join("\n");
}

function renderHistorySection(pub: LabExperimentsPublicFile, escapeHtml: (t: string) => string): string {
  const parts = [`<section id="lab-history" class="lab-dashboard-section mb-10 font-sans">
    <h2 class="mb-3 text-lg font-bold tracking-tight">History</h2>`];
  if (pub.history.length === 0) {
    parts.push(`<p class="text-sm text-stone-600 dark:text-stone-400">No completed experiments published yet.</p>`);
  } else {
    parts.push(`<div class="lab-table-wrap"><table class="lab-table border border-stone-200 text-sm dark:border-stone-700">
      <thead class="bg-stone-50 dark:bg-stone-900"><tr>
        <th>Name</th><th>Window</th><th>Result</th><th>Details</th><th></th>
      </tr></thead><tbody>`);
    for (const h of pub.history) {
      const win = formatWindowHuman(h.start, h.end);
      const rowId = escapeHtml(h.id);
      const verdictChip = h.verdict ? renderLabStatusChip("verdict", h.verdict, escapeHtml) : "";
      const summary = h.result_summary ? sanitizeVisibleCopy(h.result_summary) : "";
      parts.push(`<tr class="lab-data-row">
        <td><span class="font-semibold">${escapeHtml(sanitizeVisibleCopy(h.label))}</span></td>
        <td title="${escapeHtml(isoTitleAttr(h.start))} to ${escapeHtml(isoTitleAttr(h.end))}">${escapeHtml(win)}</td>
        <td>${verdictChip}<span class="ml-1 text-xs text-stone-600 dark:text-stone-400">${escapeHtml(summary.slice(0, 80))}${summary.length > 80 ? "..." : ""}</span></td>
        <td><a class="text-xs text-blue-800 dark:text-blue-400" href="posts/${rowId}.html">Write up</a></td>
        <td><button type="button" class="text-xs text-blue-800 dark:text-blue-400 lab-expand-toggle" data-target="${rowId}">More</button></td>
      </tr>
      <tr class="lab-expand-row" data-for="${rowId}" data-open="false"><td colspan="5" class="text-xs">
        <p class="font-mono">${escapeHtml(h.id)}</p>
        <p>${escapeHtml(sanitizeVisibleCopy(h.metric))}</p>
      </td></tr>`);
    }
    parts.push(`</tbody></table></div>`);
  }
  parts.push(`</section>`);
  parts.push(`<script>
document.querySelectorAll('.lab-expand-toggle').forEach(function(btn){
  btn.addEventListener('click', function(){
    var id = btn.getAttribute('data-target');
    var row = document.querySelector('.lab-expand-row[data-for="'+id+'"]');
    if(!row) return;
    var open = row.getAttribute('data-open') === 'true';
    row.setAttribute('data-open', open ? 'false' : 'true');
    btn.textContent = open ? 'More' : 'Less';
  });
});
</script>`);
  return parts.join("\n");
}

/** QA helper: forbidden punctuation in visible lab dashboard HTML (outside monospace and title attrs). */
export function findForbiddenLabCopyViolations(html: string): string[] {
  let stripped = html.replace(/<style[\s\S]*?<\/style>/gi, "");
  stripped = stripped.replace(/<script[\s\S]*?<\/script>/gi, "");
  stripped = stripped.replace(/\stitle="[^"]*"/gi, "");
  stripped = stripped.replace(/<[^>]*class="[^"]*font-mono[^"]*"[^>]*>[\s\S]*?<\/[^>]+>/gi, "");
  stripped = stripped.replace(/<code>[\s\S]*?<\/code>/gi, "");
  const text = stripped.replace(/<[^>]+>/g, " ");
  const violations: string[] = [];
  const re = /[\u2013\u2014]|->|→|–|—|-/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    violations.push(text.slice(Math.max(0, m.index - 20), m.index + 20));
    if (violations.length >= 5) break;
  }
  return violations;
}
