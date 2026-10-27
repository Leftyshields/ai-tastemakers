import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import { validateSeoCopyFile } from "./seo-copy.js";
import { checkSeoText } from "./site-seo-text-gate.js";
import { absoluteCanonicalUrl, normalizeCanonicalPath } from "./seo-helpers.js";
import { isSiteSeoGateExemptHtmlFile } from "./site-seo-exempt-pages.js";
import { isSiteGateExemptHtmlFile } from "./site-verification-pages.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = path.join(repoRoot, "site");

const SITE_BASE_URL =
  process.env.DIGEST_SITE_URL?.trim() || "https://leftyshields.github.io/ai-tastemakers";

const ALLOWED_JSON_LD_TYPES = new Set([
  "WebSite",
  "ItemList",
  "ListItem",
  "Article",
  "BreadcrumbList",
  "Organization",
  "WebPage",
]);

function listHtmlFiles(dir: string): string[] {
  const out: string[] = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith(".")) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...listHtmlFiles(full));
    else if (ent.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function sitemapLocPath(loc: string): string {
  try {
    const base = new URL(SITE_BASE_URL);
    const url = new URL(loc);
    if (url.origin !== base.origin) return loc;
    let p = url.pathname;
    const basePath = base.pathname.replace(/\/+$/, "");
    if (basePath && p.startsWith(basePath)) {
      p = p.slice(basePath.length) || "/";
    }
    return p.replace(/^\/+/, "");
  } catch {
    return loc;
  }
}

function isSitemapHtmlPageLoc(loc: string): boolean {
  const p = sitemapLocPath(loc);
  if (!p) return true;
  if (p.endsWith("/")) return true;
  return /\.html$/i.test(p);
}

function validateSitemap(): { ok: boolean; urlCount: number; messages: string[] } {
  const messages: string[] = [];
  const sitemapPath = path.join(siteDir, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    return { ok: false, urlCount: 0, messages: ["missing site/sitemap.xml"] };
  }
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
  if (urlBlocks.length === 0) {
    messages.push("sitemap has no url entries");
  }
  for (const block of urlBlocks) {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    const loc = locMatch?.[1]?.trim() ?? "";
    if (!loc) {
      messages.push("sitemap url missing loc");
      continue;
    }
    if (!isSitemapHtmlPageLoc(loc)) {
      messages.push(`sitemap loc is not an HTML page URL: ${loc}`);
    }
    if (!/<lastmod>/.test(block)) {
      messages.push(`sitemap url missing lastmod: ${block.slice(0, 80)}…`);
    }
  }
  return { ok: messages.length === 0, urlCount: urlBlocks.length, messages };
}

function validateAtomFeed(relPath: string): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  const abs = path.join(siteDir, relPath);
  if (!fs.existsSync(abs)) {
    return { ok: false, messages: [`missing ${relPath}`] };
  }
  const xml = fs.readFileSync(abs, "utf8");
  const dom = new JSDOM(xml, { contentType: "application/xml" });
  const doc = dom.window.document;
  const parseError = doc.querySelector("parsererror");
  if (parseError) {
    messages.push(`${relPath} XML parse error: ${parseError.textContent?.slice(0, 120)}`);
    return { ok: false, messages };
  }
  const feed = doc.querySelector("feed");
  if (!feed) {
    messages.push(`${relPath} missing root feed element`);
  }
  const entries = doc.querySelectorAll("entry");
  if (entries.length === 0) {
    messages.push(`${relPath} has no entries`);
  }
  return { ok: messages.length === 0, messages };
}

function walkJsonLdNodes(node: unknown, issues: string[], pathLabel: string): void {
  if (node == null || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((item, i) => walkJsonLdNodes(item, issues, `${pathLabel}[${i}]`));
    return;
  }
  const obj = node as Record<string, unknown>;
  if (typeof obj["@type"] === "string" && !ALLOWED_JSON_LD_TYPES.has(obj["@type"])) {
    issues.push(`${pathLabel}: unexpected @type ${obj["@type"]}`);
  }
  for (const [key, value] of Object.entries(obj)) {
    if (key === "@context") continue;
    walkJsonLdNodes(value, issues, `${pathLabel}.${key}`);
  }
}

function validateJsonLdOnDocument(doc: Document, rel: string): { issues: string[]; types: Set<string> } {
  const issues: string[] = [];
  const types = new Set<string>();
  const scripts = doc.querySelectorAll('script[type="application/ld+json"]');
  for (const script of scripts) {
    const raw = script.textContent?.trim();
    if (!raw) {
      issues.push(`${rel}: empty ld+json script`);
      continue;
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      issues.push(`${rel}: ld+json parse error ${String(err)}`);
      continue;
    }
    if (typeof parsed !== "object" || parsed === null) {
      issues.push(`${rel}: ld+json root must be object`);
      continue;
    }
    const root = parsed as Record<string, unknown>;
    const visitTypes = (node: unknown) => {
      if (node == null || typeof node !== "object") return;
      if (Array.isArray(node)) {
        node.forEach(visitTypes);
        return;
      }
      const obj = node as Record<string, unknown>;
      if (typeof obj["@type"] === "string") types.add(obj["@type"]);
      for (const value of Object.values(obj)) visitTypes(value);
    };
    visitTypes(parsed);
    if (root["@graph"]) {
      walkJsonLdNodes(root["@graph"], issues, `${rel}@graph`);
    } else if (root["@type"]) {
      walkJsonLdNodes(root, issues, rel);
    } else {
      issues.push(`${rel}: ld+json missing @type or @graph`);
    }
  }
  return { issues, types };
}

function expectedCanonicalForRel(rel: string): string {
  return absoluteCanonicalUrl(SITE_BASE_URL, rel);
}

function isDailyDigestRel(rel: string): boolean {
  return /^(skills\/)?briefings\/\d{4}-\d{2}-\d{2}\.html$/.test(rel);
}

function isHomeRel(rel: string): boolean {
  return rel === "index.html" || rel === "skills/index.html";
}

function validateHtmlPages(): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  const htmlFiles = listHtmlFiles(siteDir);
  const indexableTitles = new Map<string, string[]>();
  const indexableDescriptions = new Map<string, string[]>();

  for (const abs of htmlFiles) {
    if (isSiteGateExemptHtmlFile(abs)) continue;
    const rel = path.relative(siteDir, abs).split(path.sep).join("/");
    const seoExempt = isSiteSeoGateExemptHtmlFile(abs, siteDir);
    const html = fs.readFileSync(abs, "utf8");
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const h1s = doc.querySelectorAll("h1");
    if (h1s.length !== 1) {
      messages.push(`${rel}: expected exactly 1 h1, found ${h1s.length}`);
    } else {
      const h1 = h1s[0]!;
      if (h1.classList.contains("sr-only")) {
        messages.push(`${rel}: h1 must be the visible page headline (sr-only not allowed)`);
      }
    }
    const alternates = doc.querySelectorAll('link[rel="alternate"][type="application/atom+xml"]');
    if (alternates.length < 2) {
      messages.push(`${rel}: expected 2 Atom feed alternate links, found ${alternates.length}`);
    }

    const titleEl = doc.querySelector("title");
    const title = titleEl?.textContent?.trim() ?? "";
    if (!title) {
      messages.push(`${rel}: missing <title>`);
    } else {
      messages.push(...checkSeoText(title, rel, "title"));
    }

    const metaDesc = doc.querySelector('meta[name="description"]');
    const descContent = metaDesc?.getAttribute("content")?.trim() ?? "";
    if (!descContent) {
      if (!seoExempt) messages.push(`${rel}: missing meta description`);
    } else {
      messages.push(...checkSeoText(descContent, rel, "description"));
    }

    const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute("content")?.trim() ?? "";
    const ogDesc =
      doc.querySelector('meta[property="og:description"]')?.getAttribute("content")?.trim() ?? "";
    if (ogTitle) {
      messages.push(...checkSeoText(ogTitle, rel, "title"));
    }
    if (ogDesc) {
      messages.push(...checkSeoText(ogDesc, rel, "description"));
    }

    const robots = doc.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "";
    const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute("href")?.trim() ?? "";
    const ogUrl = doc.querySelector('meta[property="og:url"]')?.getAttribute("content")?.trim() ?? "";

    if (!seoExempt) {
      if (/noindex/i.test(robots)) {
        messages.push(`${rel}: unexpected noindex on indexable page`);
      }
      if (!canonical) {
        messages.push(`${rel}: missing canonical link`);
      } else {
        const expected = expectedCanonicalForRel(rel);
        if (canonical !== expected) {
          messages.push(`${rel}: canonical ${canonical} (expected ${expected})`);
        }
        try {
          const canonUrl = new URL(canonical);
          const baseUrl = new URL(SITE_BASE_URL);
          if (canonUrl.origin !== baseUrl.origin) {
            messages.push(`${rel}: canonical origin ${canonUrl.origin} differs from site base`);
          }
          if (/\/index\.html$/i.test(canonUrl.pathname) && rel.endsWith("index.html")) {
            const norm = normalizeCanonicalPath(rel);
            if (norm === "" || norm.endsWith("/")) {
              messages.push(`${rel}: canonical should use directory URL, not index.html`);
            }
          }
        } catch {
          messages.push(`${rel}: canonical is not a valid URL`);
        }
      }
      if (!ogTitle) messages.push(`${rel}: missing og:title`);
      if (!ogDesc) messages.push(`${rel}: missing og:description`);
      if (!ogUrl) messages.push(`${rel}: missing og:url`);
      if (title) {
        if (!indexableTitles.has(title)) indexableTitles.set(title, []);
        indexableTitles.get(title)!.push(rel);
      }
      if (descContent) {
        if (!indexableDescriptions.has(descContent)) indexableDescriptions.set(descContent, []);
        indexableDescriptions.get(descContent)!.push(rel);
      }
    } else if (!/noindex/i.test(robots)) {
      messages.push(`${rel}: utility page must have noindex robots meta`);
    }

    const jsonLd = validateJsonLdOnDocument(doc, rel);
    messages.push(...jsonLd.issues);

    if (!seoExempt) {
      const types = jsonLd.types;
      if (isHomeRel(rel) && !types.has("WebSite")) {
        messages.push(`${rel}: missing JSON-LD WebSite`);
      }
      if (isDailyDigestRel(rel) && !types.has("ItemList")) {
        messages.push(`${rel}: missing JSON-LD ItemList`);
      }
    }
  }

  for (const [title, pages] of indexableTitles) {
    if (pages.length > 1) {
      messages.push(`duplicate title (${pages.length} pages): "${title.slice(0, 48)}…" → ${pages.slice(0, 4).join(", ")}${pages.length > 4 ? "…" : ""}`);
    }
  }
  for (const [desc, pages] of indexableDescriptions) {
    if (pages.length > 1) {
      messages.push(
        `duplicate meta description (${pages.length} pages): "${desc.slice(0, 40)}…" → ${pages.slice(0, 3).join(", ")}${pages.length > 3 ? "…" : ""}`,
      );
    }
  }

  return { ok: messages.length === 0, messages };
}

function validateFeedSeoCopy(): string[] {
  const messages: string[] = [];
  const feedTitles = new Map<string, string[]>();
  for (const rel of ["feeds/ai.xml", "feeds/skills.xml"]) {
    const abs = path.join(siteDir, rel);
    if (!fs.existsSync(abs)) continue;
    const xml = fs.readFileSync(abs, "utf8");
    const dom = new JSDOM(xml, { contentType: "application/xml" });
    const title = dom.window.document.querySelector("feed > title")?.textContent?.trim() ?? "";
    const subtitle = dom.window.document.querySelector("feed > subtitle")?.textContent?.trim() ?? "";
    messages.push(...checkSeoText(title, rel, "title"));
    messages.push(...checkSeoText(subtitle, rel, "description"));
    if (title) {
      if (!feedTitles.has(title)) feedTitles.set(title, []);
      feedTitles.get(title)!.push(rel);
    }
  }
  for (const [title, feeds] of feedTitles) {
    if (feeds.length > 1) {
      messages.push(`duplicate atom feed title: "${title}" in ${feeds.join(", ")}`);
    }
  }
  return messages;
}

function main(): void {
  let failed = false;

  const copyIssues = validateSeoCopyFile();
  if (copyIssues.length > 0) {
    failed = true;
    console.error("verify: seo-copy.json failed:");
    for (const m of copyIssues) console.error(`  ${m}`);
  } else {
    console.log("verify: seo-copy.json ok (length + no U+2014)");
  }

  const sitemap = validateSitemap();
  console.log(`verify: sitemap ${sitemap.urlCount} URL(s)`);
  if (!sitemap.ok) {
    failed = true;
    for (const m of sitemap.messages) console.error(`  ${m}`);
  }

  const feeds = ["feeds/ai.xml", "feeds/skills.xml"];
  const feedResults: string[] = [];
  for (const feed of feeds) {
    const result = validateAtomFeed(feed);
    feedResults.push(`${feed}: ${result.ok ? "ok" : "FAIL"}`);
    if (!result.ok) {
      failed = true;
      for (const m of result.messages) console.error(`  ${m}`);
    }
  }
  console.log(`verify: atom feeds — ${feedResults.join("; ")}`);

  const feedSeoIssues = validateFeedSeoCopy();
  if (feedSeoIssues.length > 0) {
    failed = true;
    for (const m of feedSeoIssues) console.error(`  ${m}`);
  }

  const html = validateHtmlPages();
  const emDashMeta = html.messages.filter((m) => m.includes("U+2014"));
  if (emDashMeta.length > 0) {
    console.error(`verify: rendered meta em dash failed (${emDashMeta.length} issue(s))`);
  } else {
    console.log("verify: rendered meta em dash ok (title, og:title, og:description)");
  }
  const jsonLdIssues = html.messages.filter(
    (m) => m.includes("ld+json") || m.includes("@type") || m.includes("@graph") || m.includes("JSON-LD"),
  );
  const otherHtml = html.messages.filter((m) => !jsonLdIssues.includes(m));
  if (jsonLdIssues.length > 0) {
    console.log(`verify: json-ld schema checks (${jsonLdIssues.length} issue(s))`);
    for (const m of jsonLdIssues.slice(0, 30)) console.log(`  ${m}`);
    if (jsonLdIssues.length > 30) console.log(`  … and ${jsonLdIssues.length - 30} more`);
    failed = true;
  } else {
    console.log("verify: json-ld schema checks ok");
  }
  if (otherHtml.length > 0) {
    failed = true;
    for (const m of otherHtml.slice(0, 50)) console.error(`  ${m}`);
    if (otherHtml.length > 50) console.error(`  … and ${otherHtml.length - 50} more`);
  }

  if (failed) process.exit(1);
  console.log("verify: site SEO ok");
}

main();
