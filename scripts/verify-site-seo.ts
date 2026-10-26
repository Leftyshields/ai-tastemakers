import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import {
  EM_DASH,
  SEO_DESCRIPTION_MAX,
  SEO_TITLE_MAX,
  validateSeoCopyFile,
} from "./seo-copy.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = path.join(repoRoot, "site");

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

function validateSitemap(): { ok: boolean; urlCount: number; messages: string[] } {
  const messages: string[] = [];
  const sitemapPath = path.join(siteDir, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    return { ok: false, urlCount: 0, messages: ["missing site/sitemap.xml"] };
  }
  const xml = fs.readFileSync(sitemapPath, "utf8");
  if (/\.png/i.test(xml)) {
    messages.push("sitemap contains PNG URL");
  }
  const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
  if (urlBlocks.length === 0) {
    messages.push("sitemap has no url entries");
  }
  for (const block of urlBlocks) {
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

function validateJsonLdOnPage(html: string, rel: string): string[] {
  const issues: string[] = [];
  const dom = new JSDOM(html);
  const scripts = dom.window.document.querySelectorAll('script[type="application/ld+json"]');
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
    if (root["@graph"]) {
      walkJsonLdNodes(root["@graph"], issues, `${rel}@graph`);
    } else if (root["@type"]) {
      walkJsonLdNodes(root, issues, rel);
    } else {
      issues.push(`${rel}: ld+json missing @type or @graph`);
    }
  }
  return issues;
}

function checkSeoText(text: string, rel: string, kind: "title" | "description"): string[] {
  const issues: string[] = [];
  if (text.includes(EM_DASH)) {
    issues.push(`${rel}: ${kind} contains U+2014 em dash`);
  }
  const max = kind === "title" ? SEO_TITLE_MAX : SEO_DESCRIPTION_MAX;
  if (text.length > max) {
    issues.push(`${rel}: ${kind} length ${text.length} exceeds max ${max}`);
  }
  return issues;
}

function validateHtmlPages(): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  const htmlFiles = listHtmlFiles(siteDir);
  for (const abs of htmlFiles) {
    const rel = path.relative(siteDir, abs);
    const html = fs.readFileSync(abs, "utf8");
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const h1s = doc.querySelectorAll("h1");
    if (h1s.length !== 1) {
      messages.push(`${rel}: expected exactly 1 h1, found ${h1s.length}`);
    }
    const alternates = doc.querySelectorAll('link[rel="alternate"][type="application/atom+xml"]');
    if (alternates.length < 2) {
      messages.push(`${rel}: expected 2 Atom feed alternate links, found ${alternates.length}`);
    }
    const titleEl = doc.querySelector("title");
    if (titleEl?.textContent) {
      messages.push(...checkSeoText(titleEl.textContent.trim(), rel, "title"));
    }
    const metaDesc = doc.querySelector('meta[name="description"]');
    const descContent = metaDesc?.getAttribute("content");
    if (descContent?.trim()) {
      messages.push(...checkSeoText(descContent.trim(), rel, "description"));
    }
    messages.push(...validateJsonLdOnPage(html, rel));
  }
  return { ok: messages.length === 0, messages };
}

function validateFeedSeoCopy(): string[] {
  const messages: string[] = [];
  for (const rel of ["feeds/ai.xml", "feeds/skills.xml"]) {
    const abs = path.join(siteDir, rel);
    if (!fs.existsSync(abs)) continue;
    const xml = fs.readFileSync(abs, "utf8");
    const dom = new JSDOM(xml, { contentType: "application/xml" });
    const title = dom.window.document.querySelector("feed > title")?.textContent?.trim() ?? "";
    const subtitle = dom.window.document.querySelector("feed > subtitle")?.textContent?.trim() ?? "";
    messages.push(...checkSeoText(title, rel, "title"));
    messages.push(...checkSeoText(subtitle, rel, "description"));
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
  const jsonLdIssues = html.messages.filter(
    (m) => m.includes("ld+json") || m.includes("@type") || m.includes("@graph"),
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
    for (const m of otherHtml) console.error(`  ${m}`);
  }

  if (failed) process.exit(1);
  console.log("verify: site SEO ok");
}

main();
