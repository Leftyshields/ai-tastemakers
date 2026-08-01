export interface PageSeoOptions {
  /** Site-relative path, e.g. `briefings/2026-08-01.html` or `skills/briefings/2026-08-01.html` */
  canonicalPath?: string;
  /** Absolute site base, e.g. https://leftyshields.github.io/ai-tastemakers */
  siteBaseUrl?: string;
  ogType?: string;
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
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description ?? title);

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
  parts.push(`<meta name="twitter:card" content="summary">`);
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
  const lead = topRepos[0]?.brief?.replace(/\*\*/g, "").split("\n")[0]?.trim();
  const hook = lead ? lead.slice(0, 120) : `Top AI repos for ${date}`;
  return `${editionName} daily brief for ${date}: ${names}. ${hook}`.slice(0, 300);
}

export function articleJsonLd(
  siteBaseUrl: string,
  canonicalPath: string,
  headline: string,
  description: string,
  datePublished: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    author: { "@type": "Organization", name: "AI Tastemakers" },
    publisher: { "@type": "Organization", name: "AI Tastemakers" },
    mainEntityOfPage: absoluteCanonicalUrl(siteBaseUrl, canonicalPath),
  };
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
      } else if (ent.name.endsWith(".html")) {
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
