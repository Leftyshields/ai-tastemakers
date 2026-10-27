import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export interface SeoCopyPage {
  title?: string;
  description?: string;
  h1?: string;
  siteName?: string;
  titleTemplate?: string;
  descriptionTemplate?: string;
  descriptionFallback?: string;
  ogAlt?: string;
  summary?: string;
  full_intro?: string;
}

export interface SeoCopyFile {
  _notice: string;
  pages: Record<string, SeoCopyPage>;
}

export const SEO_TITLE_MAX = 60;
export const SEO_DESCRIPTION_MAX = 155;
export const EM_DASH = "\u2014";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const COPY_PATH = path.join(REPO_ROOT, "site", "seo-copy.json");

let cached: SeoCopyFile | null = null;

export function loadSeoCopy(): SeoCopyFile {
  if (cached) return cached;
  const raw = fs.readFileSync(COPY_PATH, "utf8");
  cached = JSON.parse(raw) as SeoCopyFile;
  return cached;
}

export function seoPage(key: string): SeoCopyPage {
  const page = loadSeoCopy().pages[key];
  if (!page) {
    throw new Error(`site/seo-copy.json missing pages.${key}`);
  }
  return page;
}

export function applyTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, name: string) => vars[name] ?? "");
}

/** Display date for SEO copy: "Oct 25, 2026" (UTC). */
export function formatSeoDateLabel(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** Short display date for weekly ranges: "Oct 12". */
export function formatSeoDateShort(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

export function topPickShortName(fullName: string): string {
  const segment = fullName.includes("/") ? fullName.split("/").pop()! : fullName;
  return segment.trim() || fullName;
}

export function parseWeeklyReviewDateRange(markdown: string): {
  start: string;
  end: string;
  year: number;
} | null {
  const m = markdown.match(/_(\d{4}-\d{2}-\d{2})[\s\u2013-]+(\d{4}-\d{2}-\d{2})/);
  if (!m) return null;
  return { start: m[1], end: m[2], year: Number(m[2].slice(0, 4)) };
}

export function shortenAtWord(text: string, maxLen: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLen) return trimmed;
  let cut = trimmed.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace > Math.floor(maxLen * 0.55)) {
    cut = cut.slice(0, lastSpace);
  }
  return cut.trimEnd();
}

export function buildSeoTitleFromTemplate(
  template: string,
  vars: Record<string, string>,
  shortenKeys: string[] = ["postTitle", "topPick", "headline", "title"],
): string {
  const mutable = { ...vars };
  let result = applyTemplate(template, mutable);
  for (const key of shortenKeys) {
    if (result.length <= SEO_TITLE_MAX) break;
    if (!mutable[key]) continue;
    while (mutable[key].length > 1 && result.length > SEO_TITLE_MAX) {
      mutable[key] = shortenAtWord(mutable[key], Math.max(1, mutable[key].length - 4));
      result = applyTemplate(template, mutable);
    }
  }
  if (result.length > SEO_TITLE_MAX) {
    result = shortenAtWord(result, SEO_TITLE_MAX);
  }
  return result;
}

export function metaDescriptionFromLead(lead: string, maxLen = SEO_DESCRIPTION_MAX): string {
  const plain = lead.replace(/\s+/g, " ").trim();
  if (!plain) return "";
  if (plain.length <= maxLen) return plain;
  const window = plain.slice(0, maxLen + 1);
  const breaks = [window.lastIndexOf(". "), window.lastIndexOf("! "), window.lastIndexOf("? ")];
  const at = Math.max(...breaks);
  if (at >= Math.floor(maxLen * 0.45)) {
    return plain.slice(0, at + 1).trim();
  }
  return shortenAtWord(plain, maxLen);
}

export function buildSeoDescriptionFromTemplate(
  template: string,
  vars: Record<string, string>,
  shortenKeys: string[] = ["topPick", "postTitle", "headline", "title"],
): string {
  const mutable = { ...vars };
  let result = applyTemplate(template, mutable);
  for (const key of shortenKeys) {
    if (result.length <= SEO_DESCRIPTION_MAX) break;
    if (!mutable[key]) continue;
    while (mutable[key].length > 1 && result.length > SEO_DESCRIPTION_MAX) {
      mutable[key] = shortenAtWord(mutable[key], Math.max(1, mutable[key].length - 4));
      result = applyTemplate(template, mutable);
    }
  }
  if (result.length > SEO_DESCRIPTION_MAX) {
    result = shortenAtWord(result, SEO_DESCRIPTION_MAX);
  }
  return result;
}

export function assertNoEmDash(text: string, label: string): void {
  if (text.includes(EM_DASH)) {
    throw new Error(`${label} contains U+2014 em dash`);
  }
}

export function validateSeoCopyFile(): string[] {
  const issues: string[] = [];
  const copy = loadSeoCopy();
  const walk = (value: string, pathLabel: string) => {
    if (value.includes(EM_DASH)) {
      issues.push(`${pathLabel} contains U+2014`);
    }
    if (pathLabel.endsWith(".title") && value.length > SEO_TITLE_MAX) {
      issues.push(`${pathLabel} title ${value.length} chars (max ${SEO_TITLE_MAX})`);
    }
    if (
      (pathLabel.endsWith(".description") || pathLabel.endsWith(".descriptionTemplate")) &&
      value.length > SEO_DESCRIPTION_MAX
    ) {
      issues.push(`${pathLabel} description ${value.length} chars (max ${SEO_DESCRIPTION_MAX})`);
    }
  };
  for (const [key, page] of Object.entries(copy.pages)) {
    for (const [field, value] of Object.entries(page)) {
      if (typeof value === "string") walk(value, `pages.${key}.${field}`);
    }
  }
  return issues;
}

export function listAllDraftTitleAndDescriptionStrings(): Array<{ key: string; field: string; value: string }> {
  const copy = loadSeoCopy();
  const rows: Array<{ key: string; field: string; value: string }> = [];
  for (const [key, page] of Object.entries(copy.pages)) {
    for (const field of [
      "title",
      "description",
      "h1",
      "siteName",
      "titleTemplate",
      "descriptionTemplate",
      "descriptionFallback",
      "summary",
      "full_intro",
    ] as const) {
      const value = page[field];
      if (typeof value === "string" && value.trim()) {
        rows.push({ key, field, value });
      }
    }
  }
  return rows;
}
