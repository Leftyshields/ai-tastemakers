import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const LAB_RENDERED_HTML = [
  "site/lab/index.html",
  "site/lab/tools.html",
  "site/lab/experiments.html",
  "site/lab/token-usage.html",
  "site/lab/shadow-rubric.html",
] as const;

function extractElementIds(html: string): Set<string> {
  const ids = new Set<string>();
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) ids.add(m[1]!);
  return ids;
}

function extractAnchorHrefs(html: string): string[] {
  const hrefs: string[] = [];
  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/gi)) hrefs.push(m[1]!);
  return hrefs;
}

function isExternalHref(href: string): boolean {
  const h = href.trim();
  return /^(https?:|mailto:|tel:)/i.test(h);
}

export function findLabInternalHrefViolations(
  html: string,
  pageRelPath: string,
): string[] {
  const violations: string[] = [];
  const pageAbs = path.join(repoRoot, pageRelPath);
  const pageDir = path.dirname(pageAbs);
  const ids = extractElementIds(html);
  const hrefs = extractAnchorHrefs(html);

  for (const raw of hrefs) {
    if (isExternalHref(raw)) continue;
    const hashIdx = raw.indexOf("#");
    const pathPart = hashIdx >= 0 ? raw.slice(0, hashIdx) : raw;
    const frag = hashIdx >= 0 ? raw.slice(hashIdx + 1) : "";
    const needsFile = pathPart.length > 0;
    const targetPath = needsFile ? path.normalize(path.join(pageDir, pathPart)) : pageAbs;
    const underSite = targetPath.startsWith(path.join(repoRoot, "site"));
    if (!underSite) {
      violations.push(`${pageRelPath}: href ${raw} resolves outside site/`);
      continue;
    }
    if (needsFile && !fs.existsSync(targetPath)) {
      violations.push(`${pageRelPath}: missing file for href ${raw}`);
      continue;
    }
    if (frag) {
      const docHtml = needsFile ? fs.readFileSync(targetPath, "utf8") : html;
      const docIds = needsFile ? extractElementIds(docHtml) : ids;
      if (!docIds.has(frag)) {
        violations.push(`${pageRelPath}: href ${raw} missing id ${frag}`);
      }
    }
  }
  return violations;
}

function main(): void {
  let failed = false;
  for (const rel of LAB_RENDERED_HTML) {
    const abs = path.join(repoRoot, rel);
    if (!fs.existsSync(abs)) {
      console.error(`missing rendered lab page: ${rel} (run npm run build:pages first)`);
      failed = true;
      continue;
    }
    const html = fs.readFileSync(abs, "utf8");
    const violations = findLabInternalHrefViolations(html, rel);
    if (violations.length > 0) {
      failed = true;
      console.error(`broken internal links in ${rel}:`);
      for (const v of violations) console.error(`  ${v}`);
    }
  }
  if (failed) process.exit(1);
  console.log("verify: lab internal hrefs ok");
}

main();
