import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export interface SeoCopyPage {
  title?: string;
  description?: string;
  h1?: string;
  titleTemplate?: string;
  descriptionTemplate?: string;
  descriptionFallback?: string;
  ogAlt?: string;
  summary?: string;
  full_intro?: string;
}

export interface SeoCopyFile {
  _draft_notice: string;
  pages: Record<string, SeoCopyPage>;
}

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

export function listAllDraftTitleAndDescriptionStrings(): Array<{ key: string; field: string; value: string }> {
  const copy = loadSeoCopy();
  const rows: Array<{ key: string; field: string; value: string }> = [];
  for (const [key, page] of Object.entries(copy.pages)) {
    for (const field of [
      "title",
      "description",
      "h1",
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
