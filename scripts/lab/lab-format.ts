/** Display formatting for public Lab dashboard (no raw ISO in visible text). */

import type { LabSurface } from "./validate-experiments.js";

const PT = "America/Los_Angeles";

const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function parseIsoDate(iso: string): { y: number; m: number; d: number } {
  const [y, m, d] = iso.split("-").map(Number);
  return { y: y!, m: m!, d: d! };
}

export function formatWindowHuman(start: string | null, end: string | null): string {
  if (!start && !end) return "";
  if (start && !end) return formatDayHuman(start);
  if (!start && end) return formatDayHuman(end);
  const a = parseIsoDate(start!);
  const b = parseIsoDate(end!);
  const left = `${MONTH_SHORT[a.m - 1]!} ${a.d}`;
  const right = `${MONTH_SHORT[b.m - 1]!} ${b.d}`;
  if (a.y === b.y) return `${left} to ${right}`;
  return `${left}, ${a.y} to ${right}, ${b.y}`;
}

export function formatDayHuman(iso: string): string {
  const { y, m, d } = parseIsoDate(iso);
  return `${MONTH_SHORT[m - 1]!} ${d}, ${y}`;
}

/** Short calendar label for read status lines (example: Oct 24). */
export function formatDayShort(iso: string): string {
  const { m, d } = parseIsoDate(iso);
  return `${MONTH_SHORT[m - 1]!} ${d}`;
}

export function formatMonthTick(iso: string): string {
  const { m } = parseIsoDate(iso);
  return MONTH_SHORT[m - 1]!;
}

export function formatSyncedAgoPt(isoUtc: string | null, nowMs: number = Date.now()): string {
  if (!isoUtc) return "Not synced yet";
  const then = Date.parse(isoUtc);
  if (!Number.isFinite(then)) return "Not synced yet";
  const mins = Math.max(0, Math.round((nowMs - then) / 60_000));
  if (mins < 1) return "Synced just now";
  if (mins === 1) return "Synced 1 min ago";
  return `Synced ${mins} min ago`;
}

export function formatSurfaces(entry: { surface: LabSurface | LabSurface[] }): string {
  const list = Array.isArray(entry.surface) ? entry.surface : [entry.surface];
  return list.map((s) => surfaceLabel(s)).join(", ");
}

export function surfaceLabel(surface: string): string {
  switch (surface) {
    case "digest_ui":
      return "Digest UI";
    case "narration_oss":
      return "OSS narration";
    case "narration_skills":
      return "Skills narration";
    case "email":
      return "Email";
    default:
      return surface.replace(/_/g, " ");
  }
}

/** Compact chip labels for Gantt rows (UX13). */
export function surfaceChipLabel(surface: string): string {
  switch (surface) {
    case "digest_ui":
      return "Digest";
    case "narration_oss":
      return "OSS";
    case "narration_skills":
      return "Skills";
    case "email":
      return "Email";
    default:
      return sanitizeVisibleCopy(surface.replace(/_/g, " "));
  }
}

export function surfaceChipLabels(entry: { surface: LabSurface | LabSurface[] }): string[] {
  const list = Array.isArray(entry.surface) ? entry.surface : [entry.surface];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of list) {
    const chip = surfaceChipLabel(s);
    if (!seen.has(chip)) {
      seen.add(chip);
      out.push(chip);
    }
  }
  return out;
}

/** Strip hyphen, en dash, em dash, and ASCII arrow from visible copy (not ids). */
export function sanitizeVisibleCopy(text: string): string {
  return text
    .replace(/\u2013|\u2014/g, " ")
    .replace(/->/g, " to ")
    .replace(/[\u2190-\u21FF]/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Sanitize visible text nodes in static Lab markdown HTML (preserves tag structure). */
export function sanitizeLabVisibleHtml(html: string): string {
  return html.replace(/>([^<]+)</g, (match, text: string) => {
    if (!text.trim()) return match;
    return `>${sanitizeVisibleCopy(text)}<`;
  });
}

export function isoTitleAttr(iso: string | null): string {
  return iso ?? "";
}
