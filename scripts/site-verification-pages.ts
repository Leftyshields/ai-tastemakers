import fs from "node:fs";
import path from "node:path";

/** Google Search Console HTML verification file at the site root (exact basename only). */
export const GOOGLE_SITE_VERIFICATION_HTML = "google65a429d15bd1a67c.html" as const;

export const GOOGLE_SITE_VERIFICATION_LINE =
  "google-site-verification: google65a429d15bd1a67c.html" as const;

export function normalizeVerificationFileContent(content: string): string {
  return content.replace(/\r\n/g, "\n").replace(/\n$/, "");
}

export function isGoogleSiteVerificationContent(content: string): boolean {
  return normalizeVerificationFileContent(content) === GOOGLE_SITE_VERIFICATION_LINE;
}

/** Gate exemption only for the committed verification file with the exact token line. */
export function isSiteGateExemptHtmlFile(filePath: string): boolean {
  if (path.basename(filePath) !== GOOGLE_SITE_VERIFICATION_HTML) return false;
  try {
    return isGoogleSiteVerificationContent(fs.readFileSync(filePath, "utf8"));
  } catch {
    return false;
  }
}
