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
  jsonLd?: Record<string, unknown>;
  noindex?: boolean;
}

function normalizeBaseUrl(base: string): string {
  return base.replace(/\/+$/, "");
}

function normalizeCanonicalPath(p: string): string {
  return p.replace(/^\/+/, "");
}

export function absoluteCanonicalUrl(siteBaseUrl: string, canonicalPath: string): string {
  return `${normalizeBaseUrl(siteBaseUrl)}/${normalizeCanonicalPath(canonicalPath)}`;
}

export function defaultOgImageUrl(siteBaseUrl: string, siteSegment = ""): string {
  const prefix = siteSegment ? `${siteSegment}/` : "";
  return absoluteCanonicalUrl(siteBaseUrl, `${prefix}assets/og-card.png`);
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

export function briefOgTitle(
  editionName: string,
  date: string,
  repos: Array<{ full_name: string }>,
): string {
  const dateShort = formatBriefDateShort(date);
  const names = repos
    .slice(0, 2)
    .map((r) => r.full_name.split("/").pop() ?? r.full_name)
    .join(", ");
  const extra = repos.length > 2 ? ` +${repos.length - 2} more` : "";
  const picks = names || "today's picks";
  return `${dateShort} · ${picks}${extra} | ${editionName}`;
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

  if (!seo?.siteBaseUrl || !seo.canonicalPath) {
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
    parts.push(
      `<script type="application/ld+json">${JSON.stringify(seo.jsonLd).replace(/</g, "\\u003c")}</script>`,
    );
  }

  return parts.join("\n  ");
}

export function briefMetaDescription(
  editionName: string,
  date: string,
  topRepos: Array<{ full_name: string; brief?: string | null }>,
): string {
  const names = topRepos
    .slice(0, 3)
    .map((r) => r.full_name.split("/")[1] ?? r.full_name)
    .join(", ");
  const topBrief = topRepos[0]?.brief ?? "";
  const whyNow = extractBriefSection(topBrief, "**Why now:**");
  const hook =
    whyNow ||
    extractBriefSection(topBrief, "**What it does:**") ||
    `Top AI repos ranked by 7-day momentum for ${date}.`;
  return `${editionName} · ${formatBriefDateShort(date)}: ${names}. ${hook}`.slice(0, 300);
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

export async function writeSitemapFromSiteDir(siteDir: string, siteBaseUrl: string): Promise<number> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const base = normalizeBaseUrl(siteBaseUrl);
  const urls: string[] = [];

  async function walk(dir: string, prefix: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const ent of entries) {
      if (ent.name.startsWith(".")) continue;
      const rel = prefix ? `${prefix}/${ent.name}` : ent.name;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        await walk(full, rel);
      } else if (ent.name.endsWith(".html") || ent.name.endsWith(".png")) {
        urls.push(`${base}/${rel}`);
      }
    }
  }

  await walk(siteDir, "");
  urls.sort();

  const body = urls
    .map(
      (loc) => `  <url>\n    <loc>${loc.replace(/&/g, "&amp;")}</loc>\n    <changefreq>daily</changefreq>\n  </url>`,
    )
    .join("\n");

  await fs.writeFile(
    path.join(siteDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
    "utf8",
  );

  return urls.length;
}
