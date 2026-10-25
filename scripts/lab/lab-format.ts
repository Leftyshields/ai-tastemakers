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

/** Reader facing calendar dates on Lab write ups (America/Los_Angeles calendar day). */
export function formatReaderDatePt(iso: string): string {
  const trimmed = iso.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  const noonPt = new Date(`${trimmed}T12:00:00`);
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: PT,
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return fmt.format(noonPt);
}

/**
 * GFM table delimiter rows need dashes in every column; space-only cells break marked parsing
 * and the table falls through as a single paragraph of pipes.
 */
export function repairGfmTableDelimiterRows(markdown: string): string {
  return markdown.replace(/^(\|[^\n]+\|)\s*$/gm, (line) => {
    const cells = line.split("|").slice(1, -1);
    if (cells.length === 0) return line;
    const delimiterLike = cells.every((c) => /^[\s:\-]*$/.test(c));
    if (!delimiterLike || !cells.some((c) => c.includes("-"))) return line;
    const needsFix = cells.some((c) => {
      const t = c.trim();
      if (t.length === 0) return true;
      return !/^:?-{3,}:?$/.test(t);
    });
    if (!needsFix) return line;
    const fixed = cells.map((c) => {
      const t = c.trim();
      if (t.length === 0 || !/^:?-{3,}:?$/.test(t)) return " --- ";
      return c;
    });
    return `|${fixed.join("|")}|`;
  });
}

/** Normalize write up markdown before render (dates, approximations). */
export function normalizeLabWriteupMarkdown(markdown: string): string {
  let s = markdown;
  s = repairGfmTableDelimiterRows(s);
  s = s.replace(/\bKept\s*\(\s*(\d{4}-\d{2}-\d{2})\s*\)/gi, (_, iso: string) => `Kept on ${formatReaderDatePt(iso)}`);
  s = s.replace(/~\s*(?=\d)/g, "about ");
  s = s.replace(/\b(\d{4}-\d{2}-\d{2})\b/g, (_, iso: string) => formatReaderDatePt(iso));
  return s;
}

export function prepareLabWriteupHtmlFromMarkdown(markdown: string): string {
  return prepareLabProseHtmlFromMarkdown(normalizeLabWriteupMarkdown(markdown));
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

const LAB_POST_CODE_CLASS =
  "lab-post-code rounded bg-stone-100 px-1 py-0.5 text-sm font-sans dark:bg-stone-800";

function convertInlineBacktickMarkers(text: string): string {
  return text.replace(/`([^`\n]+)`/g, `<code class="${LAB_POST_CODE_CLASS}">$1</code>`);
}

/** Turn leftover `inline` markers in text nodes into <code> (UX26). */
export function stripLiteralBackticksToCode(html: string): string {
  return html.replace(/>([^<]*`[^`\n]+`[^<]*)</g, (_match, text: string) => {
    return `>${convertInlineBacktickMarkers(text)}<`;
  });
}

const LAB_POST_INLINE_CODE_TAG = "span";

function inlineCodeHtml(inner: string): string {
  return `<${LAB_POST_INLINE_CODE_TAG} class="${LAB_POST_CODE_CLASS}">${inner}</${LAB_POST_INLINE_CODE_TAG}>`;
}

/** Table cells can sit beside inline tags; scan td/th inner HTML (UX43 stacked cells). */
export function stripLiteralBackticksInTableCells(html: string): string {
  return html.replace(/<t([dh])(\s[^>]*)?>([\s\S]*?)<\/t\1>/gi, (full, tag: string, attrs = "", inner: string) => {
    let out = inner;
    if (out.includes("`")) {
      out = out.replace(/`([^`\n]+)`/g, (_m, code: string) => inlineCodeHtml(code));
    }
    out = out.replace(/<code(\s[^>]*)?>([\s\S]*?)<\/code>/gi, (_m, _attrs, code: string) =>
      inlineCodeHtml(code),
    );
    if (out === inner) return full;
    return `<t${tag}${attrs}>${out}</t${tag}>`;
  });
}

function labPostCellVisibleText(cellHtml: string): string {
  return cellHtml
    .replace(/<(?:code|span)[^>]*class="[^"]*lab-post-code[^"]*"[\s\S]*?<\/(?:code|span)>/gi, "")
    .replace(/<code[\s\S]*?<\/code>/gi, "")
    .replace(/<[^>]+>/g, "");
}

/** Ensure inline <code> in write ups has lab styling (no typography backtick pseudo content). */
export function normalizeLabPostCodeElements(html: string): string {
  return html.replace(/<code(\s[^>]*)?>/gi, (tag) => {
    if (/class="[^"]*lab-post-code/.test(tag)) return tag;
    if (/class="/i.test(tag)) {
      return tag.replace(/class="/i, `class="${LAB_POST_CODE_CLASS} `);
    }
    return `<code class="${LAB_POST_CODE_CLASS}">`;
  });
}

function stripHtmlTags(fragment: string): string {
  return fragment.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function escapeHtmlAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/** Plain text from table header HTML (single attr escape; avoids &amp;quot; double encoding). */
function tableHeaderLabelPlainText(thInnerHtml: string): string {
  const stripped = stripHtmlTags(thInnerHtml);
  return stripped
    .replace(/&quot;/gi, '"')
    .replace(/&#0*34;/gi, '"')
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

/** Add data-label on cells for stacked mobile post tables (480px). */
export function labelLabPostTableCells(html: string): string {
  return html.replace(
    /<div class="lab-post-table-wrap"><table class="lab-post-table">([\s\S]*?)<\/table><\/div>/gi,
    (_full, inner: string) => {
      const headers: string[] = [];
      const thead = inner.match(/<thead>[\s\S]*?<\/thead>/i)?.[0] ?? "";
      for (const m of thead.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)) {
        headers.push(tableHeaderLabelPlainText(m[1] ?? ""));
      }
      if (headers.length === 0) {
        return `<div class="lab-post-table-wrap"><table class="lab-post-table">${inner}</table></div>`;
      }
      let labeled = inner.replace(/<tbody>([\s\S]*?)<\/tbody>/i, (_tb, body: string) => {
        const rows = body.replace(/<tr>([\s\S]*?)<\/tr>/gi, (_tr, row: string) => {
          let col = 0;
          const cells = row.replace(/<td(\s[^>]*)?>([\s\S]*?)<\/td>/gi, (_td, attrs = "", content: string) => {
            const label = headers[col] ?? "";
            col += 1;
            const labelAttr = label ? ` data-label="${escapeHtmlAttr(label)}"` : "";
            const mergedAttrs = attrs.includes("data-label") ? attrs : `${attrs}${labelAttr}`;
            return `<td${mergedAttrs}>${content}</td>`;
          });
          return `<tr>${cells}</tr>`;
        });
        return `<tbody>${rows}</tbody>`;
      });
      return `<div class="lab-post-table-wrap"><table class="lab-post-table">${labeled}</table></div>`;
    },
  );
}

/** Scroll/stack-friendly table wrapper for lab post markdown tables (390px). */
export function wrapLabPostTables(html: string): string {
  const wrapped = html
    .replace(/<table(\s[^>]*)?>/gi, (_m, attrs = "") => {
      if (attrs.includes("lab-post-table-wrap")) return `<table${attrs}>`;
      const cls = /class="([^"]*)"/i.exec(attrs);
      const merged = cls
        ? attrs.replace(/class="[^"]*"/i, `class="${cls[1]!.trim()} lab-post-table"`)
        : `${attrs} class="lab-post-table"`;
      return `<div class="lab-post-table-wrap"><table${merged}>`;
    })
    .replace(/<\/table>/gi, "</table></div>");
  return labelLabPostTableCells(wrapped);
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
  const tableBlocks: string[] = [];
  const placeholder = (i: number) => `\u0000LAB_POST_TABLE_${i}\u0000`;
  let withoutTables = html.replace(/<div class="lab-post-table-wrap">[\s\S]*?<\/div>/gi, (block) => {
    tableBlocks.push(block);
    return placeholder(tableBlocks.length - 1);
  });
  withoutTables = withoutTables.replace(/>([^<]+)</g, (match, text: string) => {
    if (!text.trim()) return match;
    const leading = text.match(/^\s*/)?.[0] ?? "";
    const trailing = text.match(/\s*$/)?.[0] ?? "";
    const core = sanitizeVisibleCopy(text.trim());
    if (!core) return match;
    return `>${leading}${core}${trailing}<`;
  });
  return withoutTables.replace(/\u0000LAB_POST_TABLE_(\d+)\u0000/g, (_m, idx: string) => tableBlocks[Number(idx)] ?? "");
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
  let html = renderSafeMarkdown(repairGfmTableDelimiterRows(markdown));
  html = stripLiteralBackticksToCode(html);
  html = stripLiteralBackticksInTableCells(html);
  html = normalizeLabPostCodeElements(html);
  html = wrapLabPostTables(html);
  return sanitizeLabVisibleHtml(html);
}

/** Unparsed markdown tables: pipe rows leaked outside rendered <table> (UX43). */
export function findLabPostUnrenderedTableViolations(html: string, pageRel: string): string[] {
  const article =
    html.match(/class="[^"]*lab-prose-capped[^"]*"[\s\S]*?<\/article>/i)?.[0] ?? html;
  let outside = article.replace(/<div class="lab-post-table-wrap">[\s\S]*?<\/div>/gi, "");
  outside = outside.replace(/<table[\s\S]*?<\/table>/gi, "");
  const violations: string[] = [];
  if (/\| \|/.test(outside)) {
    violations.push(`${pageRel}: raw markdown table fragment "| |" outside <table>`);
  }
  const text = outside.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, "\n");
  for (const line of text.split(/\n/)) {
    const t = line.trim();
    if (t.startsWith("|") && t.indexOf("|", 1) > 0) {
      violations.push(
        `${pageRel}: line starting with "|" outside <table>: ${t.slice(0, 72)}${t.length > 72 ? "…" : ""}`,
      );
      break;
    }
  }
  return violations;
}

export function findLabPostTableWrapViolations(html: string, pageRel: string): string[] {
  const article =
    html.match(/class="[^"]*lab-prose-capped[^"]*"[\s\S]*?<\/article>/i)?.[0] ?? html;
  if (!article.includes("<table")) return [];
  const violations: string[] = [];
  if (!article.includes("lab-post-table-wrap")) {
    violations.push(`${pageRel}: lab post table missing lab-post-table-wrap`);
  }
  if (article.includes("<table") && !article.includes("lab-post-table")) {
    violations.push(`${pageRel}: lab post table missing lab-post-table class`);
  }
  return violations;
}

/** Literal backticks in rendered lab post article (UX43 write-ups). */
export function findLabPostBacktickViolations(html: string, pageRel: string): string[] {
  const article =
    html.match(/class="[^"]*lab-prose-capped[^"]*"[\s\S]*?<\/article>/i)?.[0] ?? html;
  for (const m of article.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)) {
    const text = labPostCellVisibleText(m[1] ?? "");
    const idx = text.indexOf("`");
    if (idx >= 0) {
      return [
        `${pageRel}: literal backtick in lab post table cell …${text.slice(Math.max(0, idx - 12), idx + 12)}…`,
      ];
    }
  }
  const withoutCode = article.replace(/<code[\s\S]*?<\/code>/gi, "");
  const text = withoutCode.replace(/<[^>]+>/g, " ");
  const idx = text.indexOf("`");
  if (idx >= 0) {
    return [`${pageRel}: literal backtick in lab post …${text.slice(Math.max(0, idx - 12), idx + 12)}…`];
  }
  return [];
}

const ISO_DATE_RE = /\b\d{4}-\d{2}-\d{2}\b/;
const TILDE_APPROX_RE = /~\s*\d/;

/** Reader facing copy must not contain raw ISO dates or ~ approximations. */
export function findLabReaderCopyViolations(html: string, pageRel: string): string[] {
  const withoutDatetime = html.replace(/\sdatetime="[^"]*"/gi, "");
  const main =
    withoutDatetime.match(/<main[\s\S]*?<\/main>/i)?.[0] ??
    withoutDatetime.match(/<article[\s\S]*?<\/article>/i)?.[0] ??
    withoutDatetime;
  const text = main.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ");
  const violations: string[] = [];
  if (ISO_DATE_RE.test(text)) {
    violations.push(`${pageRel}: reader facing ISO date in visible text`);
  }
  if (TILDE_APPROX_RE.test(text)) {
    violations.push(`${pageRel}: reader facing ~ approximation in visible text`);
  }
  return violations;
}

export function findLabProseFontViolations(html: string, pageRel: string): string[] {
  const violations: string[] = [];
  for (const m of html.matchAll(/<article\b[^>]*class="([^"]*)"[^>]*>/gi)) {
    const cls = m[1] ?? "";
    if (!cls.includes("font-sans")) {
      violations.push(`${pageRel}: lab article missing font-sans on prose wrapper`);
    }
    if (!cls.includes("prose-p:font-sans") && !cls.includes("lab-prose-capped")) {
      violations.push(`${pageRel}: lab article missing sans body typography utilities`);
    }
  }
  return violations;
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

export const LAB_POST_FIRST_PERSON_WORD_RE = /\b(we|our|us)\b/gi;

const LAB_POST_EXCLUDED_INLINE_RE =
  /<(blockquote|q|code|pre)\b[^>]*>[\s\S]*?<\/\1>/gi;

/** Remove third-party repo names/descriptions marked for the first-person gate. */
export function stripLabThirdPartyHtml(html: string): string {
  let s = html;
  let prev = "";
  while (prev !== s) {
    prev = s;
    s = s.replace(
      /<([a-z][a-z0-9]*)\b[^>]*\bdata-third-party(?:=[^>\s]+)?[^>]*>[\s\S]*?<\/\1>/gi,
      " ",
    );
  }
  return s;
}

/** Remove HTML comments and reader-excluded elements before first-person scan. */
export function stripLabPostHtmlForFirstPersonScan(html: string): string {
  let s = html.replace(/<!--[\s\S]*?-->/g, " ");
  s = s.replace(/<script[\s\S]*?<\/script>/gi, " ");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, " ");
  s = stripLabThirdPartyHtml(s);
  let prev = "";
  while (prev !== s) {
    prev = s;
    s = s.replace(LAB_POST_EXCLUDED_INLINE_RE, " ");
  }
  return s;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&");
}

function labShellTaglinePlain(html: string): string {
  const m = html.match(
    /<header class="mb-8[\s\S]*?<p class="mt-1 font-sans text-sm text-stone-500 dark:text-stone-400">([\s\S]*?)<\/p>/i,
  );
  if (!m?.[1]) return "";
  return decodeHtmlEntities(m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function labMainVisiblePlain(html: string): string {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  const withoutNav = main.replace(/<nav[\s\S]*?<\/nav>/gi, " ");
  const stripped = stripLabPostHtmlForFirstPersonScan(withoutNav);
  let blockAware = stripped.replace(/<\/(?:p|h[1-6]|li|td|th|figcaption|dt|dd)>/gi, ". ");
  blockAware = blockAware.replace(/<(?:br|hr)\s*\/?>/gi, ". ");
  const noTags = blockAware.replace(/<[^>]+>/g, " ");
  return decodeHtmlEntities(noTags).replace(/\s+/g, " ").trim();
}

/** Visible plain text from Lab layout tagline plus `<main>` after first-person exclusions. */
export function labPostVisiblePlainText(html: string): string {
  const tagline = labShellTaglinePlain(html);
  const mainText = labMainVisiblePlain(html);
  return [tagline, mainText].filter(Boolean).join(" ").trim();
}

function splitPlainIntoSentences(text: string): string[] {
  const parts = text.split(/(?<=[.!?])\s+/);
  const out: string[] = [];
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed) out.push(trimmed);
  }
  return out;
}

/** Skip “US” when it heads a region name (example: US East). */
export function isUsGeographicProperNoun(text: string, matchIndex: number): boolean {
  if (text.slice(matchIndex, matchIndex + 2) !== "US") return false;
  const after = text.slice(matchIndex + 2);
  return /^\s+(?:East|West|Central)\b/.test(after);
}

function sentenceContainsFirstPerson(sentence: string): boolean {
  const re = new RegExp(LAB_POST_FIRST_PERSON_WORD_RE.source, LAB_POST_FIRST_PERSON_WORD_RE.flags);
  let m: RegExpExecArray | null;
  while ((m = re.exec(sentence)) !== null) {
    if (!isUsGeographicProperNoun(sentence, m.index)) return true;
  }
  return false;
}

/** Sentences in rendered Lab HTML that contain we / our / us (with exclusions). */
export function findLabPostFirstPersonSentences(html: string): string[] {
  const plain = labPostVisiblePlainText(html);
  if (!plain) return [];
  return splitPlainIntoSentences(plain)
    .map((sentence) => sentence.replace(/\.{2,}/g, "."))
    .filter((sentence) => sentenceContainsFirstPerson(sentence));
}

export function isoTitleAttr(iso: string | null): string {
  return iso ?? "";
}
