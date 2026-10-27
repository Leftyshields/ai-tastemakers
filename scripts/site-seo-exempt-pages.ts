import path from "node:path";
import { isSiteGateExemptHtmlFile } from "./site-verification-pages.js";

/** HTML pages excluded from indexability and uniqueness SEO gates (utility / internal). */
export function siteSeoGateExemptRel(rel: string): boolean {
  const norm = rel.split(path.sep).join("/");
  if (norm === "go/index.html") return true;
  if (norm === "lab/about.html") return true;
  if (norm.startsWith("lab/shadow/")) return true;
  if (norm.includes("/_fixture") || norm.startsWith("_fixture")) return true;
  return false;
}

export function isSiteSeoGateExemptHtmlFile(absPath: string, siteDir: string): boolean {
  if (isSiteGateExemptHtmlFile(absPath)) return true;
  const rel = path.relative(siteDir, absPath).split(path.sep).join("/");
  return siteSeoGateExemptRel(rel);
}
