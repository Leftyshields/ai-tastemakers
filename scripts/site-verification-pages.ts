/** Google Search Console HTML verification files (plain text, not full site pages). */
export const GOOGLE_SITE_VERIFICATION_HTML = "google65a429d15bd1a67c.html" as const;

export const GOOGLE_SITE_VERIFICATION_LINE =
  "google-site-verification: google65a429d15bd1a67c.html" as const;

/** Matches `google<hex>.html` verification tokens published at the site root. */
export function isGoogleSiteVerificationHtmlFile(name: string): boolean {
  return /^google[a-f0-9]+\.html$/i.test(name);
}

/** Pages excluded from site-wide SEO / navigation / analytics gates. */
export function isSiteGateExemptHtmlBasename(name: string): boolean {
  return isGoogleSiteVerificationHtmlFile(name);
}
