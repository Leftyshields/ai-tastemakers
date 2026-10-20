import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.join(repoRoot, "site");

/** GitHub Pages project path prefix (absolute hrefs in built HTML). */
export const SITE_PUBLISH_PREFIX = "/ai-tastemakers";

function listSiteHtmlFiles(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name);
    const st = fs.statSync(abs);
    if (st.isDirectory()) listSiteHtmlFiles(abs, out);
    else if (name.endsWith(".html")) out.push(abs);
  }
  return out;
}

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

function decodeHrefPath(pathPart: string): string {
  try {
    return decodeURIComponent(pathPart);
  } catch {
    return pathPart;
  }
}

/** Resolve an internal href path to an HTML file under site/, or null if missing/outside site. */
export function resolveInternalHrefTarget(pageAbsPath: string, pathPart: string): string | null {
  const pageDir = path.dirname(pageAbsPath);
  const decoded = decodeHrefPath(pathPart);
  let abs: string;
  if (decoded.startsWith("/")) {
    let rel = decoded;
    if (rel === SITE_PUBLISH_PREFIX || rel.startsWith(`${SITE_PUBLISH_PREFIX}/`)) {
      rel = rel.slice(SITE_PUBLISH_PREFIX.length) || "/";
    }
    abs = path.normalize(path.join(siteRoot, rel.replace(/^\//, "")));
  } else {
    abs = path.normalize(path.join(pageDir, decoded));
  }
  if (!abs.startsWith(siteRoot)) return null;
  return resolveExistingHtmlFile(abs);
}

function resolveExistingHtmlFile(abs: string): string | null {
  const candidates: string[] = [abs];
  if (!path.extname(abs)) {
    candidates.push(`${abs}.html`);
  }
  for (const candidate of candidates) {
    if (!fs.existsSync(candidate)) continue;
    const st = fs.statSync(candidate);
    if (st.isDirectory()) {
      const index = path.join(candidate, "index.html");
      if (fs.existsSync(index) && fs.statSync(index).isFile()) return index;
      continue;
    }
    if (st.isFile()) return candidate;
  }
  return null;
}

export function findInternalHrefViolations(
  html: string,
  pageAbsPath: string,
): string[] {
  const violations: string[] = [];
  const pageRelPath = path.relative(repoRoot, pageAbsPath);
  const ids = extractElementIds(html);
  const hrefs = extractAnchorHrefs(html);

  for (const raw of hrefs) {
    if (isExternalHref(raw)) continue;
    const hashIdx = raw.indexOf("#");
    const pathPart = hashIdx >= 0 ? raw.slice(0, hashIdx) : raw;
    const frag = hashIdx >= 0 ? raw.slice(hashIdx + 1) : "";
    const needsFile = pathPart.length > 0;
    const targetPath = needsFile
      ? resolveInternalHrefTarget(pageAbsPath, pathPart)
      : pageAbsPath;
    if (needsFile && targetPath === null) {
      violations.push(`${pageRelPath}: missing file for href ${raw}`);
      continue;
    }
    if (needsFile && targetPath !== null && !targetPath.startsWith(siteRoot)) {
      violations.push(`${pageRelPath}: href ${raw} resolves outside site/`);
      continue;
    }
    if (frag) {
      const docHtml =
        needsFile && targetPath !== null
          ? fs.readFileSync(targetPath, "utf8")
          : html;
      const docIds = needsFile && targetPath !== null ? extractElementIds(docHtml) : ids;
      if (!docIds.has(frag)) {
        violations.push(`${pageRelPath}: href ${raw} missing id ${frag}`);
      }
    }
  }
  return violations;
}

/** @deprecated use findInternalHrefViolations */
export function findLabInternalHrefViolations(html: string, pageRelPath: string): string[] {
  return findInternalHrefViolations(html, path.join(repoRoot, pageRelPath));
}

function main(): void {
  const pages = listSiteHtmlFiles(siteRoot).sort();
  if (pages.length === 0) {
    console.error("no HTML under site/ (run npm run build:pages first)");
    process.exit(1);
  }
  let failed = false;
  for (const abs of pages) {
    const rel = path.relative(repoRoot, abs);
    const html = fs.readFileSync(abs, "utf8");
    const violations = findInternalHrefViolations(html, abs);
    if (violations.length > 0) {
      failed = true;
      console.error(`broken internal links in ${rel}:`);
      for (const v of violations) console.error(`  ${v}`);
    }
  }
  if (failed) process.exit(1);
  console.log(`verify: site internal hrefs ok (${pages.length} pages)`);
}

const isMain =
  typeof process.argv[1] === "string" &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) main();
