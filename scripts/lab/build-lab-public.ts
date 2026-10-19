import fs from "node:fs";
import path from "node:path";
import {
  inclusiveDaySpan,
  loadExperimentsFile,
  surfacesOf,
  type LabExperimentEntry,
  type LabExperimentsFile,
  type LabExperimentStatus,
  type LabSurface,
  validateExperimentsFile,
} from "./validate-experiments.js";
import type { ExperimentStatusFile } from "./sync-posthog-experiment-status.js";

export type LabVisibility = "public" | "teaser" | "private";
export type LabVerdict = "ship" | "revert" | "inconclusive";

export interface PostHogEndSnapshot {
  captured_at?: string | null;
  exposure_count?: number | null;
  sample_count?: number | null;
  metric_delta?: number | null;
  metric_delta_label?: string | null;
  raw?: Record<string, unknown>;
}

export interface PostHogLiveSnapshot {
  exposure_count?: number | null;
  sample_count?: number | null;
  metric_delta?: number | null;
  metric_delta_label?: string | null;
}

export interface LabExperimentSource extends LabExperimentEntry {
  label: string;
  visibility?: LabVisibility;
  result_summary?: string | null;
  verdict?: LabVerdict | null;
  posthog_snapshot_at_end?: PostHogEndSnapshot | null;
}

export interface LabExperimentsSourceFile {
  schema_version: number;
  experiments: LabExperimentSource[];
}

export interface PublicControlPanel {
  running: PublicControlPanelRunning | null;
}

export interface PublicControlPanelRunning {
  id: string;
  label: string;
  surface: LabSurface | LabSurface[];
  metric: string;
  start: string | null;
  end: string | null;
  day_of_min_read: number | null;
  min_read_days: number;
  exposure_count: number | null;
  sample_count: number | null;
  metric_delta: number | null;
  metric_delta_label: string | null;
}

export interface PublicTimelineBar {
  id: string;
  label: string;
  surface: LabSurface;
  status: LabExperimentStatus;
  start: string;
  end: string;
  offset_pct: number;
  width_pct: number;
}

export interface PublicTimelineGroup {
  surface: LabSurface;
  range_start: string;
  range_end: string;
  bars: PublicTimelineBar[];
}

export interface PublicBacklogItem {
  id: string;
  label: string;
  surface: LabSurface | LabSurface[];
  target_month: string | null;
  metric?: string;
  start?: string | null;
  end?: string | null;
  depends_on?: string[];
  note?: string | null;
  visibility: "public" | "teaser";
}

export interface PublicHistoryItem {
  id: string;
  label: string;
  surface: LabSurface | LabSurface[];
  start: string | null;
  end: string | null;
  metric: string;
  result_summary: string | null;
  verdict: LabVerdict | null;
  posthog_snapshot_at_end: PostHogEndSnapshot | null;
}

export interface LabExperimentsPublicFile {
  schema_version: 2;
  generated_at: string;
  status_sync: {
    generated_at: string | null;
    skipped: boolean;
    skip_reason?: string | null;
  };
  control_panel: PublicControlPanel;
  timeline: PublicTimelineGroup[];
  backlog: PublicBacklogItem[];
  history: PublicHistoryItem[];
}

export function visibilityOf(entry: LabExperimentSource): LabVisibility {
  return entry.visibility ?? "teaser";
}

export function isPublished(entry: LabExperimentSource): boolean {
  return visibilityOf(entry) !== "private";
}

export function targetMonthFromStart(start: string | null): string | null {
  if (!start) return null;
  return start.slice(0, 7);
}

export function dayOfMinRead(
  start: string | null,
  asOfIsoDate: string,
): number | null {
  if (!start) return null;
  if (asOfIsoDate < start) return 0;
  return inclusiveDaySpan(start, asOfIsoDate);
}

function loadExperimentStatus(repoRoot: string): ExperimentStatusFile | null {
  const p = path.join(repoRoot, "lab", "experiment-status.json");
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8")) as ExperimentStatusFile;
}

function liveStatsForExperiment(
  status: ExperimentStatusFile | null,
  experimentId: string,
): PostHogLiveSnapshot {
  const live = status?.live?.[experimentId];
  return live ?? {};
}

export function buildTimelineGroups(
  entries: LabExperimentSource[],
  statuses: LabExperimentStatus[],
): PublicTimelineGroup[] {
  const dated = entries.filter(
    (e) =>
      isPublished(e) &&
      statuses.includes(e.status) &&
      e.start !== null &&
      e.end !== null,
  );
  if (dated.length === 0) return [];

  let rangeStart = dated[0].start!;
  let rangeEnd = dated[0].end!;
  for (const e of dated) {
    if (e.start! < rangeStart) rangeStart = e.start!;
    if (e.end! > rangeEnd) rangeEnd = e.end!;
  }
  const totalMs = Math.max(parseIsoMs(rangeEnd) - parseIsoMs(rangeStart), 86_400_000);

  const bySurface = new Map<LabSurface, PublicTimelineBar[]>();
  for (const e of dated) {
    for (const surface of surfacesOf(e)) {
      const offsetMs = parseIsoMs(e.start!) - parseIsoMs(rangeStart);
      const widthMs = parseIsoMs(e.end!) - parseIsoMs(e.start!) + 86_400_000;
      const bar: PublicTimelineBar = {
        id: e.id,
        label: e.label,
        surface,
        status: e.status,
        start: e.start!,
        end: e.end!,
        offset_pct: Math.max(0, (offsetMs / totalMs) * 100),
        width_pct: Math.max(1, (widthMs / totalMs) * 100),
      };
      const list = bySurface.get(surface) ?? [];
      list.push(bar);
      bySurface.set(surface, list);
    }
  }

  return [...bySurface.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([surface, bars]) => ({
      surface,
      range_start: rangeStart,
      range_end: rangeEnd,
      bars: bars.sort((a, b) => a.start.localeCompare(b.start) || a.id.localeCompare(b.id)),
    }));
}

function parseIsoMs(iso: string): number {
  return Date.parse(`${iso}T00:00:00Z`);
}

export function buildLabPublicFile(
  repoRoot: string,
  asOfIsoDate: string = new Date().toISOString().slice(0, 10),
): LabExperimentsPublicFile {
  const source = loadExperimentsFile(repoRoot) as LabExperimentsSourceFile;
  const status = loadExperimentStatus(repoRoot);

  const published = source.experiments.filter(isPublished);
  const running = published.find((e) => e.status === "running");

  let control: PublicControlPanelRunning | null = null;
  if (running) {
    const live = liveStatsForExperiment(status, running.id);
    control = {
      id: running.id,
      label: running.label,
      surface: running.surface,
      metric: running.metric,
      start: running.start,
      end: running.end,
      min_read_days: running.min_read_days,
      day_of_min_read: dayOfMinRead(running.start, asOfIsoDate),
      exposure_count: live.exposure_count ?? null,
      sample_count: live.sample_count ?? null,
      metric_delta: live.metric_delta ?? null,
      metric_delta_label: live.metric_delta_label ?? null,
    };
  }

  const backlog: PublicBacklogItem[] = published
    .filter((e) => e.status === "planned")
    .map((e) => {
      const vis = visibilityOf(e);
      if (vis === "teaser") {
        return {
          id: e.id,
          label: e.label,
          surface: e.surface,
          target_month: targetMonthFromStart(e.start),
          visibility: "teaser" as const,
        };
      }
      return {
        id: e.id,
        label: e.label,
        surface: e.surface,
        target_month: targetMonthFromStart(e.start),
        visibility: "public" as const,
        metric: e.metric,
        start: e.start,
        end: e.end,
        depends_on: e.depends_on,
        note: e.note ?? null,
      };
    })
    .sort((a, b) => (a.target_month ?? "9999").localeCompare(b.target_month ?? "9999"));

  const history: PublicHistoryItem[] = published
    .filter((e) => e.status === "done")
    .map((e) => ({
      id: e.id,
      label: e.label,
      surface: e.surface,
      start: e.start,
      end: e.end,
      metric: e.metric,
      result_summary: e.result_summary ?? null,
      verdict: e.verdict ?? null,
      posthog_snapshot_at_end: e.posthog_snapshot_at_end ?? null,
    }))
    .sort((a, b) => (b.end ?? "").localeCompare(a.end ?? ""));

  const timeline = buildTimelineGroups(published, ["running", "done", "planned"]);

  return {
    schema_version: 2,
    generated_at: new Date().toISOString(),
    status_sync: {
      generated_at: status?.generated_at ?? null,
      skipped: status?.skipped ?? true,
      skip_reason: status?.skip_reason ?? "experiment-status.json missing",
    },
    control_panel: { running: control },
    timeline,
    backlog,
    history,
  };
}

export function writeLabPublicArtifacts(repoRoot: string, siteLabDir: string): LabExperimentsPublicFile {
  const source = loadExperimentsFile(repoRoot) as LabExperimentsSourceFile;
  const issues = validateExperimentsFile(source);
  if (issues.length > 0) {
    throw new Error(`lab/experiments.json validation failed:\n${issues.map((i) => i.message).join("\n")}`);
  }

  const pub = buildLabPublicFile(repoRoot);
  fs.mkdirSync(siteLabDir, { recursive: true });
  fs.writeFileSync(
    path.join(siteLabDir, "experiments.public.json"),
    `${JSON.stringify(pub, null, 2)}\n`,
    "utf8",
  );
  return pub;
}

export function formatSurfaces(entry: { surface: LabSurface | LabSurface[] }): string {
  return Array.isArray(entry.surface) ? entry.surface.join(", ") : entry.surface;
}

export function renderLabDashboardHtml(
  pub: LabExperimentsPublicFile,
  escapeHtml: (t: string) => string,
): string {
  const sections: string[] = [];

  sections.push(`<section id="lab-control-panel" class="lab-dashboard-section mb-10 font-sans">
    <h2 class="mb-3 text-lg font-bold tracking-tight">Control panel</h2>`);
  const run = pub.control_panel.running;
  if (!run) {
    sections.push(
      `<p class="text-sm text-stone-600 dark:text-stone-400">No experiment is running on the public Lab calendar right now.</p>`,
    );
  } else {
    const delta =
      run.metric_delta !== null
        ? `${run.metric_delta_label ? `${escapeHtml(run.metric_delta_label)}: ` : ""}${escapeHtml(String(run.metric_delta))}`
        : "—";
    const dayLine =
      run.day_of_min_read !== null
        ? `Day ${run.day_of_min_read} of ${run.min_read_days}`
        : "—";
    sections.push(`<div class="rounded-lg border border-stone-200 p-4 dark:border-stone-700">
      <p class="text-base font-semibold">${escapeHtml(run.label)}</p>
      <p class="font-mono text-xs text-stone-500">${escapeHtml(run.id)}</p>
      <dl class="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        <div><dt class="text-stone-500">Surface</dt><dd>${escapeHtml(formatSurfaces(run))}</dd></div>
        <div><dt class="text-stone-500">Metric</dt><dd>${escapeHtml(run.metric)}</dd></div>
        <div><dt class="text-stone-500">Window</dt><dd>${escapeHtml(run.start ?? "—")} → ${escapeHtml(run.end ?? "—")}</dd></div>
        <div><dt class="text-stone-500">Read progress</dt><dd>${escapeHtml(dayLine)}</dd></div>
        <div><dt class="text-stone-500">Exposure</dt><dd>${escapeHtml(run.exposure_count !== null ? String(run.exposure_count) : "—")}</dd></div>
        <div><dt class="text-stone-500">Sample</dt><dd>${escapeHtml(run.sample_count !== null ? String(run.sample_count) : "—")}</dd></div>
        <div><dt class="text-stone-500">Latest metric delta</dt><dd>${delta}</dd></div>
        <div><dt class="text-stone-500">PostHog sync</dt><dd>${escapeHtml(pub.status_sync.generated_at ?? "not synced")}${pub.status_sync.skipped ? ` (${escapeHtml(pub.status_sync.skip_reason ?? "skipped")})` : ""}</dd></div>
      </dl>
    </div>`);
  }
  sections.push(`</section>`);

  sections.push(`<section id="lab-timeline" class="lab-dashboard-section mb-10 font-sans">
    <h2 class="mb-3 text-lg font-bold tracking-tight">Timeline</h2>`);
  if (pub.timeline.length === 0) {
    sections.push(`<p class="text-sm text-stone-600 dark:text-stone-400">No dated experiments to show.</p>`);
  } else {
    for (const group of pub.timeline) {
      sections.push(`<div class="mb-6">
        <h3 class="mb-2 text-sm font-semibold uppercase tracking-wide text-stone-500">${escapeHtml(group.surface)}</h3>
        <p class="mb-2 font-mono text-xs text-stone-400">${escapeHtml(group.range_start)} – ${escapeHtml(group.range_end)}</p>
        <div class="relative mb-3 h-8 rounded bg-stone-100 dark:bg-stone-900" aria-hidden="true">
          ${group.bars
            .map(
              (b) =>
                `<div title="${escapeHtml(b.label)}" class="absolute top-1 h-6 rounded bg-blue-600/80 dark:bg-blue-500/80" style="left:${b.offset_pct.toFixed(2)}%;width:${b.width_pct.toFixed(2)}%;"></div>`,
            )
            .join("")}
        </div>
        <ul class="space-y-1 text-xs">${group.bars
          .map(
            (b) =>
              `<li><span class="font-mono">${escapeHtml(b.id)}</span> · ${escapeHtml(b.label)} · ${escapeHtml(b.start)} → ${escapeHtml(b.end)} · ${escapeHtml(b.status)}</li>`,
          )
          .join("")}</ul>
      </div>`);
    }
  }
  sections.push(`</section>`);

  sections.push(`<section id="lab-backlog" class="lab-dashboard-section mb-10 font-sans">
    <h2 class="mb-3 text-lg font-bold tracking-tight">Backlog</h2>`);
  if (pub.backlog.length === 0) {
    sections.push(`<p class="text-sm text-stone-600 dark:text-stone-400">Nothing queued for publication.</p>`);
  } else {
    sections.push(`<ul class="space-y-2 text-sm">${pub.backlog
      .map((b) => {
        if (b.visibility === "teaser") {
          return `<li><strong>${escapeHtml(b.label)}</strong> · ${escapeHtml(formatSurfaces(b))} · target ${escapeHtml(b.target_month ?? "tbd")} <span class="text-xs text-stone-500">(teaser)</span></li>`;
        }
        return `<li><strong>${escapeHtml(b.label)}</strong> · ${escapeHtml(formatSurfaces(b))} · ${escapeHtml(b.start ?? "—")} → ${escapeHtml(b.end ?? "—")} · ${escapeHtml(b.metric ?? "")}</li>`;
      })
      .join("")}</ul>`);
  }
  sections.push(`</section>`);

  sections.push(`<section id="lab-history" class="lab-dashboard-section mb-10 font-sans">
    <h2 class="mb-3 text-lg font-bold tracking-tight">History</h2>`);
  if (pub.history.length === 0) {
    sections.push(`<p class="text-sm text-stone-600 dark:text-stone-400">No completed experiments published yet.</p>`);
  } else {
    sections.push(`<div class="overflow-x-auto"><table class="min-w-full border-collapse border border-stone-200 text-sm dark:border-stone-700">
      <thead class="bg-stone-50 dark:bg-stone-900"><tr>
        <th class="border px-2 py-1 text-left text-xs">Experiment</th>
        <th class="border px-2 py-1 text-left text-xs">Dates</th>
        <th class="border px-2 py-1 text-left text-xs">Metric</th>
        <th class="border px-2 py-1 text-left text-xs">Result</th>
        <th class="border px-2 py-1 text-left text-xs">Verdict</th>
        <th class="border px-2 py-1 text-left text-xs">PostHog at end</th>
      </tr></thead><tbody>
      ${pub.history
        .map((h) => {
          const snap = h.posthog_snapshot_at_end;
          const ph =
            snap &&
            (snap.exposure_count != null ||
              snap.sample_count != null ||
              snap.metric_delta != null)
              ? `exp ${snap.exposure_count ?? "—"} / sample ${snap.sample_count ?? "—"} / Δ ${snap.metric_delta ?? "—"}`
              : "—";
          return `<tr>
            <td class="border px-2 py-1"><div class="font-semibold">${escapeHtml(h.label)}</div><div class="font-mono text-xs">${escapeHtml(h.id)}</div></td>
            <td class="border px-2 py-1 whitespace-nowrap text-xs">${escapeHtml(h.start ?? "—")} → ${escapeHtml(h.end ?? "—")}</td>
            <td class="border px-2 py-1 text-xs">${escapeHtml(h.metric)}</td>
            <td class="border px-2 py-1 text-xs">${escapeHtml(h.result_summary ?? "—")}</td>
            <td class="border px-2 py-1 text-xs">${escapeHtml(h.verdict ?? "—")}</td>
            <td class="border px-2 py-1 text-xs">${escapeHtml(ph)}</td>
          </tr>`;
        })
        .join("")}
      </tbody></table></div>`);
  }
  sections.push(`</section>`);

  return sections.join("\n");
}
