/**
 * Lab index hero: one visible title (main h1), one intro (.lab-home-lead), no legacy copy.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import { chromium, type Page } from "playwright";
import { seoPage } from "./seo-copy.js";
import {
  LAB_HOME_HEADER_TAGLINE,
  LAB_HOME_LEGACY_INTRO_TEXT,
} from "./lab/lab-home-copy.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const labIndexPath = path.join(repoRoot, "site/lab/index.html");

function verifyLabIndexHtml(html: string): string[] {
  const issues: string[] = [];
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const h1s = doc.querySelectorAll("h1");
  if (h1s.length !== 1) {
    issues.push(`expected exactly 1 h1, found ${h1s.length}`);
  } else if (h1s[0]!.classList.contains("sr-only")) {
    issues.push("lab index h1 must be visible (not sr-only)");
  }

  if (doc.querySelector("header .site-brand")) {
    issues.push("lab index header must not include .site-brand title block");
  }

  if (html.includes(LAB_HOME_HEADER_TAGLINE)) {
    issues.push("lab index must not render header tagline copy");
  }

  const leads = doc.querySelectorAll("main .lab-home-lead");
  if (leads.length !== 1) {
    issues.push(`expected exactly 1 .lab-home-lead in main, found ${leads.length}`);
  } else {
    const lead = leads[0]!;
    const expected = seoPage("lab_index").lead?.trim() ?? "";
    const actual = lead.textContent?.replace(/\s+/g, " ").trim() ?? "";
    if (expected && actual !== expected) {
      issues.push("lab-home-lead text does not match site/seo-copy.json lab_index.lead");
    }
    const cls = lead.getAttribute("class") ?? "";
    if (/\btext-sm\b/.test(cls)) {
      issues.push("lab-home-lead must not use text-sm");
    }
    if (/\btext-stone-[56]00\b/.test(cls) || /\bdark:text-stone-[34]00\b/.test(cls)) {
      issues.push("lab-home-lead must not use muted grey text utility classes");
    }
  }

  const introArticle = doc.querySelector(".lab-intro article");
  if (introArticle?.textContent?.trim()) {
    issues.push("lab-intro article must be empty on lab index (legacy intro removed)");
  }

  const intro = doc.querySelector(".lab-intro");
  if (intro?.querySelector("strong")) {
    issues.push("lab-intro must not contain bold legacy Von Restorff intro");
  }

  const legacySnippet = LAB_HOME_LEGACY_INTRO_TEXT.slice(0, 48);
  if (html.includes(legacySnippet)) {
    issues.push("lab index still contains legacy intro copy from briefings/lab/index.md");
  }

  const cssHref = doc.querySelector('link[rel="stylesheet"]')?.getAttribute("href")?.trim() ?? "";
  if (!cssHref.includes("style.") || !/style\.[a-f0-9]+\.css/.test(cssHref)) {
    issues.push(`lab index stylesheet must be content-hashed (got ${cssHref || "missing"})`);
  }

  return issues;
}

async function verifyRenderedHero(page: Page, label: string): Promise<string[]> {
  const issues: string[] = [];
  const snapshot = await page.evaluate(() => {
    const headerBrand = document.querySelector("header .site-brand");
    const h1Count = document.querySelectorAll("main h1").length;
    const leadEls = document.querySelectorAll("main .lab-home-lead");
    const lead = leadEls[0] as HTMLElement | undefined;
    const introArticle = document.querySelector(".lab-intro article");
    const introStrong = document.querySelector(".lab-intro strong");
    let leadFontSize = 0;
    let leadColor = "";
    let leadWeight = "";
    if (lead) {
      const cs = getComputedStyle(lead);
      leadFontSize = parseFloat(cs.fontSize);
      leadColor = cs.color;
      leadWeight = cs.fontWeight;
    }
    const headerTaglineVisible = Array.from(document.querySelectorAll("header p")).some((p) =>
      /Public notes on how repos get picked/.test(p.textContent ?? ""),
    );
    return {
      headerBrand: Boolean(headerBrand),
      h1Count,
      leadCount: leadEls.length,
      introArticleLen: introArticle?.textContent?.trim().length ?? 0,
      introStrong: Boolean(introStrong),
      leadFontSize,
      leadColor,
      leadWeight,
      headerTaglineVisible,
    };
  });

  if (snapshot.headerBrand) issues.push(`${label}: header .site-brand visible`);
  if (snapshot.h1Count !== 1) issues.push(`${label}: expected 1 main h1, found ${snapshot.h1Count}`);
  if (snapshot.leadCount !== 1) issues.push(`${label}: expected 1 lab-home-lead, found ${snapshot.leadCount}`);
  if (snapshot.introArticleLen > 0) issues.push(`${label}: legacy intro article has visible text`);
  if (snapshot.introStrong) issues.push(`${label}: bold text in .lab-intro`);
  if (snapshot.headerTaglineVisible) issues.push(`${label}: header tagline paragraph visible`);
  if (snapshot.leadFontSize > 0 && snapshot.leadFontSize < 15.5) {
    issues.push(`${label}: lab-home-lead computed font-size ${snapshot.leadFontSize}px (want >= 16px)`);
  }
  if (snapshot.leadWeight === "700" || snapshot.leadWeight === "bold") {
    issues.push(`${label}: lab-home-lead must not be bold`);
  }

  return issues;
}

async function main(): Promise<void> {
  if (!fs.existsSync(labIndexPath)) {
    console.error("missing site/lab/index.html (run npm run build:pages first)");
    process.exit(1);
  }
  const html = fs.readFileSync(labIndexPath, "utf8");
  const staticIssues = verifyLabIndexHtml(html);
  let issues = [...staticIssues];

  const browser = await chromium.launch();
  const fileUrl = `file://${labIndexPath}`;
  for (const width of [390, 1280]) {
    for (const dark of [false, true]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto(fileUrl, { waitUntil: "networkidle" });
      await page.evaluate((isDark) => {
        document.documentElement.classList.toggle("dark", isDark);
      }, dark);
      const mode = `${width}px ${dark ? "dark" : "light"}`;
      issues = issues.concat(await verifyRenderedHero(page, mode));
      await page.close();
    }
  }
  await browser.close();

  if (issues.length > 0) {
    console.error("verify: lab home hero failed:");
    for (const issue of issues) console.error(`  ${issue}`);
    process.exit(1);
  }
  console.log("verify: lab home hero ok (one title, one intro, no legacy copy; 390/1280 light/dark)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
