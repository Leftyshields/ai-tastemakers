import { isSiteGateExemptHtmlFile } from "./site-verification-pages.js";

export interface PageSeoOptions {
  /** Site-relative path, e.g. `briefings/2026-08-01.html` or `skills/briefings/2026-08-01.html` */
  canonicalPath?: string;
  /** Absolute site base, e.g. https://leftyshields.github.io/ai-tastemakers */
  siteBaseUrl?: string;
  ogType?: string;
  /** Social title override (defaults to page title). */
  ogTitle?: string;
  /** Absolute URL to 1200×630 share image. */
  ogImageUrl?: string;
  ogImageAlt?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

function normalizeBaseUrl(base: string): string {
  return base.replace(/\/+$/, "");
}

/** Maps `index.html` and `dir/index.html` to directory-style paths for canonical URLs. */
export function normalizeCanonicalPath(p: string): string {
  let trimmed = p.replace(/^\/+/, "");
  if (trimmed === "index.html") return "";
  if (trimmed.endsWith("/index.html")) {
    return trimmed.slice(0, -"index.html".length);
  }
  return trimmed;
}

export function googleSiteVerificationMetaHtml(escapeHtml: (t: string) => string): string {
  const token = process.env.GOOGLE_SITE_VERIFICATION?.trim() ?? "";
  if (!token) return "";
  return `<meta name="google-site-verification" content="${escapeHtml(token)}">`;
}

export function feedAlternateLinksHtml(siteBaseUrl: string, escapeHtml: (t: string) => string): string {
  const base = normalizeBaseUrl(siteBaseUrl);
  const links = [
    { href: `${base}/feeds/ai.xml`, title: "AI Tastemakers daily briefs", type: "application/atom+xml" },
    { href: `${base}/feeds/skills.xml`, title: "Skill Tastemakers daily briefs", type: "application/atom+xml" },
  ];
  return links
    .map(
      (link) =>
        `<link rel="alternate" type="${escapeHtml(link.type)}" title="${escapeHtml(link.title)}" href="${escapeHtml(link.href)}">`,
    )
    .join("\n  ");
}

export function labFeedAlternateLinkHtml(siteBaseUrl: string, escapeHtml: (t: string) => string): string {
  const base = normalizeBaseUrl(siteBaseUrl);
  const href = `${base}/feeds/lab-changes.xml`;
  const title = "Tastemakers Lab changes";
  return `<link rel="alternate" type="application/rss+xml" title="${escapeHtml(title)}" href="${escapeHtml(href)}">`;
}

export function mergeJsonLdGraph(nodes: Record<string, unknown>[]): Record<string, unknown> {
  const graph = nodes.map((node) => {
    const copy = { ...node };
    delete copy["@context"];
    return copy;
  });
  return { "@context": "https://schema.org", "@graph": graph };
}

export function websiteJsonLd(siteBaseUrl: string, name: string, description: string): Record<string, unknown> {
  return {
    "@type": "WebSite",
    name,
    description,
    url: absoluteCanonicalUrl(siteBaseUrl, ""),
  };
}

export function itemListJsonLd(
  siteBaseUrl: string,
  name: string,
  itemPaths: string[],
): Record<string, unknown> {
  return {
    "@type": "ItemList",
    name,
    itemListElement: itemPaths.map((canonicalPath, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteCanonicalUrl(siteBaseUrl, canonicalPath),
    })),
  };
}

/** GitHub `owner/repo` slug allowed in digest ItemList URLs. */
export const GITHUB_REPO_FULL_NAME_RE = /^[\w.-]+\/[\w.-]+$/;

/** ItemList of GitHub repo URLs for a daily digest page. */
export function digestRepoItemListJsonLd(
  fullNames: string[],
  listName: string,
): Record<string, unknown> {
  const valid = fullNames
    .map((name) => name.trim())
    .filter((name) => GITHUB_REPO_FULL_NAME_RE.test(name));
  return {
    "@type": "ItemList",
    name: listName,
    itemListElement: valid.map((fullName, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://github.com/${fullName.replace(/^\/+/, "")}`,
    })),
  };
}

export function breadcrumbJsonLd(
  siteBaseUrl: string,
  crumbs: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteCanonicalUrl(siteBaseUrl, crumb.path),
    })),
  };
}

export function absoluteCanonicalUrl(siteBaseUrl: string, canonicalPath: string): string {
  return `${normalizeBaseUrl(siteBaseUrl)}/${normalizeCanonicalPath(canonicalPath)}`;
}

export function defaultOgImageUrl(siteBaseUrl: string, _siteSegment = ""): string {
  return absoluteCanonicalUrl(siteBaseUrl, "assets/og-card.png");
}

function formatBriefDateShort(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

export function extractBriefSection(brief: string, label: string): string {
  const start = brief.indexOf(label);
  if (start < 0) return "";
  const after = brief.slice(start + label.length);
  const nextLabels = ["**What it does:**", "**Why now:**", "**Build with it:**"].filter((l) => l !== label);
  const nextIdx = nextLabels
    .map((l) => after.indexOf(l))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b)[0];
  return (nextIdx !== undefined ? after.slice(0, nextIdx) : after).replace(/\*\*/g, "").trim();
}

export function briefSocialTitle(date: string): string {
  return `Daily Brief · ${formatBriefDateShort(date)}`;
}

/** Hook-only description — image card already shows date, edition, and repo picks. */
export function briefSocialDescription(
  repos: Array<{ brief?: string | null }>,
): string {
  const topBrief = repos[0]?.brief ?? "";
  const whyNow = extractBriefSection(topBrief, "**Why now:**");
  const whatItDoes = extractBriefSection(topBrief, "**What it does:**");
  const hook =
    whyNow ||
    whatItDoes ||
    "A free daily digest of trending open source AI projects on GitHub, ranked by recent star growth, with a short brief for builders on each one.";
  return hook.slice(0, 200);
}

/** @deprecated Use briefSocialTitle + briefSocialDescription for share previews. */
export function briefOgTitle(
  editionName: string,
  date: string,
  repos: Array<{ full_name: string }>,
): string {
  return briefSocialTitle(date);
}

export function briefMetaDescription(
  _editionName: string,
  _date: string,
  repos: Array<{ full_name: string; brief?: string | null }>,
): string {
  return briefSocialDescription(repos);
}

export function buildSeoHeadHtml(
  title: string,
  description: string | undefined,
  escapeHtml: (t: string) => string,
  seo?: PageSeoOptions,
): string {
  const parts: string[] = [];

  if (description) {
    parts.push(`<meta name="description" content="${escapeHtml(description)}">`);
  }

  if (!seo?.siteBaseUrl || seo.canonicalPath === undefined) {
    return parts.join("\n  ");
  }

  const canonical = absoluteCanonicalUrl(seo.siteBaseUrl, seo.canonicalPath);
  const ogType = seo.ogType ?? "website";
  const socialTitle = seo.ogTitle ?? title;
  const safeTitle = escapeHtml(socialTitle);
  const safeDesc = escapeHtml(description ?? socialTitle);
  const ogImage = seo.ogImageUrl?.trim();

  parts.push(`<link rel="canonical" href="${escapeHtml(canonical)}">`);
  if (seo.noindex) {
    parts.push(`<meta name="robots" content="noindex, nofollow">`);
  } else {
    parts.push(`<meta name="robots" content="index, follow, max-image-preview:large">`);
  }
  parts.push(`<meta property="og:type" content="${escapeHtml(ogType)}">`);
  parts.push(`<meta property="og:title" content="${safeTitle}">`);
  parts.push(`<meta property="og:description" content="${safeDesc}">`);
  parts.push(`<meta property="og:url" content="${escapeHtml(canonical)}">`);
  parts.push(`<meta property="og:site_name" content="AI Tastemakers">`);
  parts.push(`<meta property="og:locale" content="en_US">`);

  if (ogImage) {
    parts.push(`<meta property="og:image" content="${escapeHtml(ogImage)}">`);
    parts.push(`<meta property="og:image:width" content="1200">`);
    parts.push(`<meta property="og:image:height" content="630">`);
    parts.push(
      `<meta property="og:image:alt" content="${escapeHtml(seo.ogImageAlt ?? socialTitle)}">`,
    );
    parts.push(`<meta name="twitter:card" content="summary_large_image">`);
    parts.push(`<meta name="twitter:image" content="${escapeHtml(ogImage)}">`);
  } else {
    parts.push(`<meta name="twitter:card" content="summary">`);
  }

  parts.push(`<meta name="twitter:title" content="${safeTitle}">`);
  parts.push(`<meta name="twitter:description" content="${safeDesc}">`);

  if (seo.jsonLd) {
    const payload = Array.isArray(seo.jsonLd) ? mergeJsonLdGraph(seo.jsonLd) : seo.jsonLd;
    parts.push(
      `<script type="application/ld+json">${JSON.stringify(payload).replace(/</g, "\\u003c")}</script>`,
    );
  }

  return parts.join("\n  ");
}

export function articleJsonLd(
  siteBaseUrl: string,
  canonicalPath: string,
  headline: string,
  description: string,
  datePublished: string,
  imageUrl?: string,
): Record<string, unknown> {
  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    author: { "@type": "Organization", name: "AI Tastemakers" },
    publisher: { "@type": "Organization", name: "AI Tastemakers" },
    mainEntityOfPage: absoluteCanonicalUrl(siteBaseUrl, canonicalPath),
  };
  if (imageUrl) {
    article.image = [imageUrl];
  }
  return article;
}

export async function writeRobotsTxt(siteDir: string, siteBaseUrl: string): Promise<void> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const sitemap = `${normalizeBaseUrl(siteBaseUrl)}/sitemap.xml`;
  await fs.writeFile(
    path.join(siteDir, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`,
    "utf8",
  );
}

export function sitemapLocFromSiteRel(siteBaseUrl: string, siteRel: string): string {
  const base = normalizeBaseUrl(siteBaseUrl);
  const rel = siteRel.replace(/^\/+/, "");
  if (rel.endsWith(".html")) {
    const withoutExt = rel.slice(0, -".html".length);
    if (withoutExt === "index") return `${base}/`;
    if (withoutExt.endsWith("/index")) {
      return `${base}/${withoutExt.slice(0, -"/index".length)}/`;
    }
  }
  return `${base}/${rel}`;
}

export function inferSitemapLastmod(siteRel: string, mtime: Date): string {
  const dayMatch = siteRel.match(/(\d{4}-\d{2}-\d{2})\.html$/);
  if (dayMatch) return dayMatch[1];
  const monthMatch = siteRel.match(/monthly\/(\d{4}-\d{2})\.html$/);
  if (monthMatch) return `${monthMatch[1]}-01`;
  return mtime.toISOString().slice(0, 10);
}

export interface SitemapUrlEntry {
  loc: string;
  lastmod: string;
}

export async function collectSitemapEntriesFromSiteDir(
  siteDir: string,
  siteBaseUrl: string,
): Promise<SitemapUrlEntry[]> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const entries: SitemapUrlEntry[] = [];

  async function walk(dir: string, prefix: string): Promise<void> {
    let dirEntries;
    try {
      dirEntries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const ent of dirEntries) {
      if (ent.name.startsWith(".")) continue;
      const rel = prefix ? `${prefix}/${ent.name}` : ent.name;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        await walk(full, rel);
      } else if (ent.name.endsWith(".html")) {
        if (isSiteGateExemptHtmlFile(full)) continue;
        const stat = await fs.stat(full);
        entries.push({
          loc: sitemapLocFromSiteRel(siteBaseUrl, rel),
          lastmod: inferSitemapLastmod(rel, stat.mtime),
        });
      }
    }
  }

  await walk(siteDir, "");
  entries.sort((a, b) => a.loc.localeCompare(b.loc));
  return entries;
}

export async function writeSitemapFromSiteDir(siteDir: string, siteBaseUrl: string): Promise<number> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const urlEntries = await collectSitemapEntriesFromSiteDir(siteDir, siteBaseUrl);

  const body = urlEntries
    .map(
      (entry) =>
        `  <url>\n    <loc>${entry.loc.replace(/&/g, "&amp;")}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n  </url>`,
    )
    .join("\n");

  await fs.writeFile(
    path.join(siteDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
    "utf8",
  );

  return urlEntries.length;
}

export interface BriefFeedEntry {
  date: string;
  title: string;
  summary: string;
  canonicalPath: string;
  updatedIso?: string;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildAtomFeedXml(options: {
  siteBaseUrl: string;
  selfPath: string;
  feedTitle: string;
  feedSubtitle: string;
  feedId: string;
  entries: BriefFeedEntry[];
}): string {
  const base = normalizeBaseUrl(options.siteBaseUrl);
  const selfUrl = `${base}/${options.selfPath.replace(/^\/+/, "")}`;
  const updated =
    options.entries[0]?.updatedIso ??
    (options.entries[0]?.date ? `${options.entries[0].date}T12:00:00Z` : new Date().toISOString());

  const entryXml = options.entries
    .map((entry) => {
      const link = absoluteCanonicalUrl(options.siteBaseUrl, entry.canonicalPath);
      const updatedEntry = entry.updatedIso ?? `${entry.date}T12:00:00Z`;
      return `  <entry>
    <title>${escapeXml(entry.title)}</title>
    <link href="${escapeXml(link)}" rel="alternate" type="text/html"/>
    <id>${escapeXml(link)}</id>
    <updated>${escapeXml(updatedEntry)}</updated>
    <summary type="html">${escapeXml(entry.summary)}</summary>
  </entry>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(options.feedTitle)}</title>
  <subtitle>${escapeXml(options.feedSubtitle)}</subtitle>
  <link href="${escapeXml(selfUrl)}" rel="self" type="application/atom+xml"/>
  <link href="${escapeXml(base + "/")}" rel="alternate" type="text/html"/>
  <id>${escapeXml(options.feedId)}</id>
  <updated>${escapeXml(updated)}</updated>
${entryXml}
</feed>
`;
}

export async function writeBriefAtomFeed(
  siteDir: string,
  siteBaseUrl: string,
  selfPath: string,
  feedTitle: string,
  feedSubtitle: string,
  feedId: string,
  entries: BriefFeedEntry[],
): Promise<void> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const outDir = path.join(siteDir, path.dirname(selfPath));
  await fs.mkdir(outDir, { recursive: true });
  const xml = buildAtomFeedXml({
    siteBaseUrl,
    selfPath,
    feedTitle,
    feedSubtitle,
    feedId,
    entries,
  });
  await fs.writeFile(path.join(siteDir, selfPath), xml, "utf8");
}

export async function writeLlmsTxtFiles(
  siteDir: string,
  siteBaseUrl: string,
  options: {
    summary: string;
    fullIntro: string;
    latestBriefPath?: string;
    archivePath: string;
    labPath: string;
    methodologyPath: string;
    recentBriefLinks: Array<{ date: string; path: string; title: string }>;
  },
): Promise<void> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const base = normalizeBaseUrl(siteBaseUrl);
  const line = (label: string, p: string) => `- ${label}: ${absoluteCanonicalUrl(siteBaseUrl, p)}`;

  const llms = `# AI Tastemakers

${options.summary}

## Links
${line("Latest AI brief", options.latestBriefPath ?? "briefings/")}
${line("AI brief archive", options.archivePath)}
${line("Skill Tastemakers home", "skills/")}
${line("Lab", options.labPath)}
${line("Methodology", options.methodologyPath)}
${line("AI daily brief Atom feed", "feeds/ai.xml")}
${line("Skills daily brief Atom feed", "feeds/skills.xml")}
`;

  await fs.writeFile(path.join(siteDir, "llms.txt"), llms, "utf8");

  const recentLines = options.recentBriefLinks
    .map((b) => `- ${b.date}: ${absoluteCanonicalUrl(siteBaseUrl, b.path)} (${b.title})`)
    .join("\n");

  const llmsFull = `${llms}
## Recent daily briefs
${recentLines || "- (none yet)"}

## About this site
${options.fullIntro}

Source: ${base}/
`;

  await fs.writeFile(path.join(siteDir, "llms-full.txt"), llmsFull, "utf8");
}
