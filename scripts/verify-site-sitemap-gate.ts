/**
 * Sitemap gate: Google Search Console verification HTML must not be listed in sitemap.xml.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isSiteGateExemptHtmlBasename } from "./site-verification-pages.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.join(repoRoot, "site");

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

export function runSitemapGate(siteDir = siteRoot): string[] {
  const errors: string[] = [];
  const sitemapPath = path.join(siteDir, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    errors.push("missing site/sitemap.xml (run npm run build:pages first)");
    return errors;
  }
  const xml = fs.readFileSync(sitemapPath, "utf8");
  for (const abs of listSiteHtmlFiles(siteDir)) {
    const base = path.basename(abs);
    if (!isSiteGateExemptHtmlBasename(base)) continue;
    const rel = path.relative(siteDir, abs).split(path.sep).join("/");
    if (xml.includes(rel) || xml.includes(encodeURI(rel))) {
      errors.push(`sitemap gate: ${rel} must not appear in sitemap.xml`);
    }
  }
  return errors;
}

function main(): void {
  const errors = runSitemapGate();
  if (errors.length > 0) {
    console.error("verify-site-sitemap-gate failed:");
    for (const e of errors) console.error(`  ${e}`);
    process.exit(1);
  }
  console.log("verify: site sitemap gate ok");
}

const isMain =
  typeof process.argv[1] === "string" &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) main();
