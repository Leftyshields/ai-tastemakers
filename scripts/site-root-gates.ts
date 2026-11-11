/**
 * Shared site HTML gate helpers (h1, inbound links). Exempt Search Console verification files.
 */
import fs from "node:fs";
import path from "node:path";
import { findInternalHrefViolations, SITE_PUBLISH_PREFIX } from "./verify-lab-internal-hrefs.js";
import { isSiteGateExemptHtmlFile } from "./site-verification-pages.js";

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

function siteRel(siteDir: string, abs: string): string {
  return path.relative(siteDir, abs).split(path.sep).join("/");
}

export function runH1Gate(siteDir: string): string[] {
  const errors: string[] = [];
  for (const abs of listSiteHtmlFiles(siteDir)) {
    if (isSiteGateExemptHtmlFile(abs)) continue;
    const html = fs.readFileSync(abs, "utf8");
    if (!/<h1\b/i.test(html)) {
      errors.push(`h1 gate: ${siteRel(siteDir, abs)} missing <h1>`);
    }
  }
  return errors;
}

function normalizeInboundPath(pathPart: string): string {
  let p = pathPart.replace(/^\//, "");
  if (p.startsWith(SITE_PUBLISH_PREFIX.slice(1))) {
    p = p.slice(SITE_PUBLISH_PREFIX.length).replace(/^\//, "");
  }
  if (p.endsWith("/")) p = `${p}index.html`;
  else if (!p.endsWith(".html")) p = `${p}.html`;
  return p;
}

export function runUntrackedLinkGate(siteDir: string): string[] {
  const errors: string[] = [];
  const pages = listSiteHtmlFiles(siteDir);
  const tracked = new Set<string>();

  for (const abs of pages) {
    const html = fs.readFileSync(abs, "utf8");
    for (const v of findInternalHrefViolations(html, abs)) {
      errors.push(`untracked-link gate (broken href): ${v}`);
    }
    for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/gi)) {
      const raw = m[1]!.replace(/&amp;/g, "&");
      if (/^(https?:|mailto:|tel:|#)/i.test(raw.trim())) continue;
      const hashIdx = raw.indexOf("#");
      const pathPart = hashIdx >= 0 ? raw.slice(0, hashIdx) : raw;
      if (!pathPart || pathPart === ".") {
        tracked.add(siteRel(siteDir, abs));
        continue;
      }
      tracked.add(normalizeInboundPath(pathPart.split("?")[0] ?? pathPart));
    }
  }

  for (const abs of pages) {
    if (isSiteGateExemptHtmlFile(abs)) continue;
    const rel = siteRel(siteDir, abs);
    if (!tracked.has(rel)) {
      errors.push(`untracked-link gate: no inbound internal link to ${rel}`);
    }
  }
  return errors;
}
