/** Display formatting for public Lab dashboard (no raw ISO in visible text). */

import fs from "node:fs";
import path from "node:path";
import { renderSafeMarkdown } from "../safe-markdown.js";
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

/** Calendar date (YYYY-MM-DD) for the build in America/Los_Angeles (UX37). */
export function buildIsoDatePt(now: Date = new Date()): string {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: PT,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(now);
}

export function formatLabLastUpdatedPt(isoDate: string): string {
  return formatDayHuman(isoDate);
}

export const LAB_PROSE_ARTICLE_CLASS =
  "brief-content lab-prose-capped prose prose-stone max-w-none font-sans dark:prose-invert prose-a:text-blue-800 dark:prose-a:text-blue-400 prose-headings:font-sans prose-p:font-sans prose-li:font-sans prose-code:font-sans prose-strong:font-sans";

/** Turn leftover `inline` markers in text nodes into <code> (UX26). */
export function stripLiteralBackticksToCode(html: string): string {
  return html.replace(/>([^<]*`[^`\n]+`[^<]*)</g, (_match, text: string) => {
    const converted = text.replace(
      /`([^`\n]+)`/g,
      '<code class="rounded bg-stone-100 px-1 py-0.5 text-sm font-sans dark:bg-stone-800">$1</code>',
    );
    return `>${converted}<`;
  });
}

export function findLabProseBacktickViolations(html: string): string[] {
  const article =
    html.match(/class="[^"]*lab-prose-capped[^"]*"[\s\S]*?<\/article>/i)?.[0] ?? html;
  const withoutCode = article.replace(/<code[\s\S]*?<\/code>/gi, "");
  const text = withoutCode.replace(/<[^>]+>/g, " ");
  const idx = text.indexOf("`");
  if (idx >= 0) {
    return [`literal backtick in lab prose …${text.slice(Math.max(0, idx - 12), idx + 12)}…`];
  }
  return [];
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
      return sanitizeVisibleCopy(surface.replace(/_/g, " ").replace(/-/g, " "));
  }
}

/** Pipeline role tags for visible chips (plain words, no file like tokens). */
export function pipelineRoleChipLabel(role: string): string {
  return sanitizeVisibleCopy(role.replace(/_/g, " ").replace(/-/g, " "));
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
    const leading = text.match(/^\s*/)?.[0] ?? "";
    const trailing = text.match(/\s*$/)?.[0] ?? "";
    const core = sanitizeVisibleCopy(text.trim());
    if (!core) return match;
    return `>${leading}${core}${trailing}<`;
  });
}

/** Experiment ids with a markdown post under briefings/lab/posts/ (UX29). */
export function listLabWriteupPostIds(repoRoot: string): string[] {
  const dir = path.join(repoRoot, "briefings/lab/posts");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => f.slice(0, -3))
    .sort();
}

export function hasLabWriteupPost(repoRoot: string, experimentId: string, cache?: Set<string>): boolean {
  const ids = cache ?? new Set(listLabWriteupPostIds(repoRoot));
  return ids.has(experimentId);
}

export function prepareLabProseHtmlFromMarkdown(markdown: string): string {
  return sanitizeLabVisibleHtml(stripLiteralBackticksToCode(renderSafeMarkdown(markdown)));
}

export function findLabProseInlineSpacingViolations(html: string): string[] {
  const article = html.match(/class="[^"]*lab-prose-capped[^"]*"[\s\S]*?<\/article>/i)?.[0] ?? html;
  const violations: string[] = [];
  const afterInline = /<\/(?:a|strong|em|b|i|code)>([A-Za-z0-9])/g;
  const beforeInline = /([A-Za-z0-9])<(?:a|strong|em|b|i|code)\b/g;
  let m: RegExpExecArray | null;
  while ((m = afterInline.exec(article)) !== null) {
    violations.push(`…${m[0]}…`);
  }
  while ((m = beforeInline.exec(article)) !== null) {
    violations.push(`…${m[0]}…`);
  }
  return violations;
}

export function isoTitleAttr(iso: string | null): string {
  return iso ?? "";
}
