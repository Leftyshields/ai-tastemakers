import type { ExperimentSnapshot, ExperimentSnapshotMetrics, ExperimentWindow } from "./types.js";

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) {
      fields.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  fields.push(current.trim());
  return fields;
}

function normalizeHeader(cell: string): string {
  return cell.toLowerCase().replace(/\s+/g, "_");
}

function findColumn(headers: string[], names: string[]): number {
  for (const name of names) {
    const idx = headers.indexOf(name);
    if (idx >= 0) return idx;
  }
  return -1;
}

export interface ParseSnapshotCsvOptions {
  period?: ExperimentWindow;
  source?: string;
}

/**
 * Parses PostHog/simplified snapshot CSV.
 *
 * Simplified format (recommended for manual import):
 *   type,key,count
 *   pageview,/briefings/2026-06-27.html,42
 *   outbound_click,owner/repo,5
 *
 * Analytics pages export: first column is page path, pageviews in a numeric column.
 */
export function parseSnapshotCsv(
  csvContent: string,
  options: ParseSnapshotCsvOptions = {},
): ExperimentSnapshot {
  const lines = csvContent
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    throw new Error("CSV is empty");
  }

  const headers = parseCsvLine(lines[0]).map(normalizeHeader);
  const metrics: ExperimentSnapshotMetrics = {
    pageviews_by_path: {},
    outbound_clicks: {},
  };

  let period = options.period ?? { start: "", end: "" };

  const typeIdx = findColumn(headers, ["type", "metric_type"]);
  const keyIdx = findColumn(headers, ["key", "page", "pages", "path", "property", "event"]);
  const countIdx = findColumn(headers, ["count", "value", "pageviews", "events", "visitors"]);
  const startIdx = findColumn(headers, ["period_start", "start"]);
  const endIdx = findColumn(headers, ["period_end", "end"]);

  const isSimplified = typeIdx >= 0 && keyIdx >= 0 && countIdx >= 0;

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    if (cols.every((c) => !c)) continue;

    if (isSimplified) {
      const type = cols[typeIdx]?.toLowerCase() ?? "";
      const key = cols[keyIdx] ?? "";
      const count = parseInt(cols[countIdx] ?? "0", 10);
      if (!key || !Number.isFinite(count)) continue;

      if (type === "pageview" || type === "pageviews") {
        metrics.pageviews_by_path![key] = (metrics.pageviews_by_path![key] ?? 0) + count;
      } else if (type === "outbound_click" || type === "outbound") {
        const repo = key.startsWith("repo:") ? key.slice(5) : key;
        metrics.outbound_clicks![repo] = (metrics.outbound_clicks![repo] ?? 0) + count;
      }

      if (startIdx >= 0 && cols[startIdx] && !period.start) period.start = cols[startIdx];
      if (endIdx >= 0 && cols[endIdx] && !period.end) period.end = cols[endIdx];
      continue;
    }

    const pageIdx = findColumn(headers, ["page", "pages", "path"]);
    const pageviewsIdx = findColumn(headers, ["pageviews", "views"]);
    if (pageIdx >= 0 && pageviewsIdx >= 0) {
      const pagePath = cols[pageIdx];
      const count = parseInt(cols[pageviewsIdx] ?? "0", 10);
      if (pagePath && Number.isFinite(count)) {
        metrics.pageviews_by_path![pagePath] = (metrics.pageviews_by_path![pagePath] ?? 0) + count;
      }
      continue;
    }

    const goalIdx = findColumn(headers, ["goal", "event", "event_name", "name"]);
    const eventsIdx = findColumn(headers, ["events", "conversions", "count"]);
    if (goalIdx >= 0 && eventsIdx >= 0) {
      const goal = cols[goalIdx] ?? "";
      const count = parseInt(cols[eventsIdx] ?? "0", 10);
      if (goal.toLowerCase().includes("outbound") && Number.isFinite(count)) {
        metrics.outbound_clicks!["_aggregate"] =
          (metrics.outbound_clicks!["_aggregate"] ?? 0) + count;
      }
    }
  }

  return {
    imported_at: new Date().toISOString(),
    period,
    metrics,
    source: options.source,
  };
}

export function appendSnapshotToExperiment<T extends { snapshots: ExperimentSnapshot[] }>(
  record: T,
  snapshot: ExperimentSnapshot,
): T {
  return {
    ...record,
    snapshots: [...record.snapshots, snapshot],
  };
}
