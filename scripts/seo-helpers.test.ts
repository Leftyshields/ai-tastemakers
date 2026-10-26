import { describe, it, expect } from "vitest";
import { briefOgCardSvg, defaultOgCardSvg } from "./generate-brief-og.js";
import { OG } from "./og-theme.js";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  briefMetaDescription,
  briefSocialDescription,
  briefSocialTitle,
  extractBriefSection,
  writeSitemapFromSiteDir,
} from "./seo-helpers.js";
import {
  GOOGLE_SITE_VERIFICATION_HTML,
  GOOGLE_SITE_VERIFICATION_LINE,
} from "./site-verification-pages.js";

describe("brief social metadata", () => {
  it("uses Why now hook only — no repo list in description", () => {
    const desc = briefSocialDescription([
      {
        brief:
          "**What it does:** A demo tool.\n\n**Why now:** Front page of HN after v2 launch drew 400 comments.\n\n**Build with it:** Wire into CI.",
      },
    ]);
    expect(desc).toContain("HN");
    expect(desc).not.toContain("What it does:");
    expect(desc).not.toContain("ai-agent-book");
  });

  it("social title is date-only (picks live in og:image)", () => {
    expect(briefSocialTitle("2026-08-01")).toBe("Daily Brief · Aug 1");
  });

  it("briefMetaDescription delegates to social description", () => {
    const desc = briefMetaDescription("AI Tastemakers", "2026-08-01", [
      { full_name: "acme/demo", brief: "**Why now:** Trending this week." },
    ]);
    expect(desc).toContain("Trending");
  });
});

describe("OG card SVG (site dark theme)", () => {
  it("uses stone-950 shell matching the live site", () => {
    const svg = briefOgCardSvg({
      date: "2026-08-01",
      editionName: "AI Tastemakers",
      repos: ["acme/demo", "other/tool"],
    });
    expect(svg).toContain(OG.bgOuter);
    expect(svg).toContain(OG.bgShell);
    expect(svg).toContain("Georgia");
    expect(svg).toContain("Daily Brief");
    expect(svg).toContain("demo");
    expect(svg).not.toContain("leftyshields.github.io");
  });

  it("default card includes brand header", () => {
    const svg = defaultOgCardSvg();
    expect(svg).toContain("AI Tastemakers");
    expect(svg).toContain("Curated daily briefings");
  });
});

describe("writeSitemapFromSiteDir", () => {
  it("omits the exact Search Console verification file when content matches", async () => {
    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "sitemap-gate-"));
    await fs.writeFile(
      path.join(tmp, GOOGLE_SITE_VERIFICATION_HTML),
      `${GOOGLE_SITE_VERIFICATION_LINE}\n`,
    );
    await fs.writeFile(path.join(tmp, "index.html"), "<!DOCTYPE html><html><body><h1>Home</h1></body></html>");
    const count = await writeSitemapFromSiteDir(tmp, "https://example.com/ai-tastemakers");
    const xml = await fs.readFile(path.join(tmp, "sitemap.xml"), "utf8");
    expect(count).toBe(1);
    expect(xml).toContain("index.html");
    expect(xml).not.toContain(GOOGLE_SITE_VERIFICATION_HTML);
    await fs.rm(tmp, { recursive: true, force: true });
  });

  it("includes verification basename in sitemap when content does not match", async () => {
    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "sitemap-gate-"));
    await fs.writeFile(path.join(tmp, GOOGLE_SITE_VERIFICATION_HTML), "google-site-verification: tampered\n");
    await fs.writeFile(path.join(tmp, "index.html"), "<!DOCTYPE html><html><body><h1>Home</h1></body></html>");
    const count = await writeSitemapFromSiteDir(tmp, "https://example.com/ai-tastemakers");
    const xml = await fs.readFile(path.join(tmp, "sitemap.xml"), "utf8");
    expect(count).toBe(2);
    expect(xml).toContain(GOOGLE_SITE_VERIFICATION_HTML);
    await fs.rm(tmp, { recursive: true, force: true });
  });

  it("does not omit other google-prefixed HTML names from the sitemap", async () => {
    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "sitemap-gate-"));
    const other = "googledeadbeef.html";
    await fs.writeFile(path.join(tmp, other), `${GOOGLE_SITE_VERIFICATION_LINE}\n`);
    const count = await writeSitemapFromSiteDir(tmp, "https://example.com/ai-tastemakers");
    const xml = await fs.readFile(path.join(tmp, "sitemap.xml"), "utf8");
    expect(count).toBe(1);
    expect(xml).toContain(other);
    await fs.rm(tmp, { recursive: true, force: true });
  });
});

describe("extractBriefSection", () => {
  it("pulls Why now text", () => {
    const why = extractBriefSection(
      "**What it does:** X.\n\n**Why now:** Trending on GitHub this week.\n\n**Build with it:** Y.",
      "**Why now:**",
    );
    expect(why).toContain("Trending on GitHub");
  });
});
