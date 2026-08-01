/** GitHub pages worth scraping beyond the default repo root (README). */
export function githubEnrichUrls(htmlUrl: string): string[] {
  const base = htmlUrl.replace(/\/+$/, "");
  const urls = [base];
  for (const suffix of ["/releases", "/discussions"]) {
    urls.push(`${base}${suffix}`);
  }
  return urls;
}
