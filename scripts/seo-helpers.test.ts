import { describe, it, expect } from "vitest";
import {
  FAVICON16_SPARK_SCALE,
  briefOgCardSvg,
  defaultOgCardSvg,
  encodePngIco,
  rasterSiteFavicon16Png,
  siteFaviconMarkSvg,
} from "./generate-brief-og.js";
import sharp from "sharp";
import { OG } from "./og-theme.js";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  absoluteCanonicalUrl,
  briefMetaDescription,
  briefSocialDescription,
  briefSocialTitle,
  extractBriefSection,
  normalizeCanonicalPath,
  collectionPageJsonLd,
  digestRepoItemListJsonLd,
  siteFaviconLinksHtml,
  siteRootRelPrefixFromCss,
  writeSitemapFromSiteDir,
} from "./seo-helpers.js";
import {
  GOOGLE_SITE_VERIFICATION_HTML,
  GOOGLE_SITE_VERIFICATION_LINE,
} from "./site-verification-pages.js";
import { EM_DASH } from "./seo-copy.js";

const BRIEF_SOCIAL_DESCRIPTION_FALLBACK =
  "A free daily digest of trending open source AI projects on GitHub, ranked by recent star growth, with a short brief for builders on each one.";

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

  it("uses copywriter fallback when brief has no Why now or What it does", () => {
    const desc = briefSocialDescription([
      { brief: "**Build with it:** Wire into CI only." },
    ]);
    expect(desc).toBe(BRIEF_SOCIAL_DESCRIPTION_FALLBACK);
    expect(desc.includes(EM_DASH)).toBe(false);
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

describe("canonical paths", () => {
  it("maps index.html to site root", () => {
    expect(normalizeCanonicalPath("index.html")).toBe("");
    expect(normalizeCanonicalPath("skills/index.html")).toBe("skills/");
    expect(absoluteCanonicalUrl("https://example.com/ai-tastemakers", "index.html")).toBe(
      "https://example.com/ai-tastemakers/",
    );
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
    expect(xml).toContain("https://example.com/ai-tastemakers/");
    expect(xml).not.toContain(GOOGLE_SITE_VERIFICATION_HTML);
    expect(xml).toMatch(/<lastmod>/);
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

describe("collectionPageJsonLd", () => {
  it("uses directory canonical url for lab index", () => {
    const node = collectionPageJsonLd(
      "https://leftyshields.github.io/ai-tastemakers",
      "lab/",
      "Tastemakers Lab",
      "Experiment registry",
    );
    expect(node["@type"]).toBe("CollectionPage");
    expect(node.url).toBe("https://leftyshields.github.io/ai-tastemakers/lab/");
  });
});

describe("site favicon mark", () => {
  it("BF1 spoon mark SVG uses brand fill and amber spark", () => {
    const svg = siteFaviconMarkSvg();
    expect(svg).not.toContain(">AT<");
    expect(svg).toContain("#1e40af");
    expect(svg).toContain("#f59e0b");
    expect(svg).toContain('fill="#ffffff"');
    expect(svg).not.toContain('rx="96"');
  });

  it("16px favicon omits vector spark for pixel placement", () => {
    const svg16 = siteFaviconMarkSvg({ favicon16: true });
    expect(svg16).not.toContain('fill="#f59e0b"');
    expect(FAVICON16_SPARK_SCALE).toBe(1.3);
  });

  it("16px raster keeps a white bowl ring around the pixel spark", async () => {
    const png = await rasterSiteFavicon16Png();
    const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const w = info.width;
    const amber: Array<[number, number]> = [];
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const r = data[i]!;
        const g = data[i + 1]!;
        const b = data[i + 2]!;
        if (r > 200 && g > 100 && g < 210 && b < 80) amber.push([x, y]);
      }
    }
    expect(amber.length).toBeGreaterThanOrEqual(3);
    expect(amber.length).toBeLessThanOrEqual(7);
    let minX = 99;
    let maxX = -1;
    let minY = 99;
    let maxY = -1;
    for (const [x, y] of amber) {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
    const isWhite = (r: number, g: number, b: number) => r > 245 && g > 245 && b > 245;
    for (let x = minX; x <= maxX; x++) {
      for (const y of [minY - 1, maxY + 1]) {
        if (y < 0 || y >= info.height) continue;
        const i = (y * w + x) * 4;
        expect(isWhite(data[i]!, data[i + 1]!, data[i + 2]!)).toBe(true);
      }
    }
    for (let y = minY; y <= maxY; y++) {
      for (const x of [minX - 1, maxX + 1]) {
        if (x < 0 || x >= w) continue;
        const i = (y * w + x) * 4;
        expect(isWhite(data[i]!, data[i + 1]!, data[i + 2]!)).toBe(true);
      }
    }
  });

  it("encodePngIco packs multiple PNG sizes", () => {
    const png = Buffer.from(
      "89504e470d0a1a0a0000000d49484452000000100000001008060000001ff3ff61000000049454e44ae426082",
      "hex",
    );
    const ico = encodePngIco([
      { width: 16, height: 16, png },
      { width: 32, height: 32, png },
    ]);
    expect(ico.readUInt16LE(4)).toBe(2);
    expect(ico.length).toBeGreaterThanOrEqual(6 + 16 * 2 + png.length * 2);
  });
});

describe("site favicon head links", () => {
  const esc = (t: string) => t;
  it("prefixes icons from css href depth", () => {
    expect(siteRootRelPrefixFromCss("../assets/style.css")).toBe("../");
    expect(siteRootRelPrefixFromCss("../../assets/style.abc123.css")).toBe("../../");
    const html = siteFaviconLinksHtml("../", esc);
    expect(html).toContain('href="../favicon.ico"');
    expect(html).toContain('href="../favicon-32.png"');
    expect(html).toContain('href="../apple-touch-icon.png"');
  });
});

describe("digestRepoItemListJsonLd", () => {
  it("skips repo slugs that do not match owner/repo pattern", () => {
    const list = digestRepoItemListJsonLd(
      ["acme/demo", "bad slug", "../evil/repo", "ok-name/tool.v2"],
      "Test list",
    );
    expect(list.itemListElement).toHaveLength(2);
    expect((list.itemListElement as Array<{ url: string }>)[0]?.url).toBe(
      "https://github.com/acme/demo",
    );
    expect((list.itemListElement as Array<{ url: string }>)[1]?.url).toBe(
      "https://github.com/ok-name/tool.v2",
    );
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
