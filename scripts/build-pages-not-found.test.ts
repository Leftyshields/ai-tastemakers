import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  GITHUB_STOCK_NOT_FOUND_SNIPPET,
  NOT_FOUND_BODY,
  NOT_FOUND_HEADING,
  NOT_FOUND_HOME_CTA,
  notFoundSitePaths,
  renderBuiltNotFoundHtml,
  siteHomePathFromBaseUrl,
} from "./build-pages.js";
import { pageShell } from "./edition-pages.js";
import { siteSeoGateExemptRel } from "./site-seo-exempt-pages.js";

const SITE_BASE = "https://leftyshields.github.io/ai-tastemakers";

describe("GitHub Pages not-found document", () => {
  it("uses site-root relative paths with a base href for deep missing URLs", () => {
    const homePath = siteHomePathFromBaseUrl(SITE_BASE);
    expect(homePath).toBe("/ai-tastemakers/");
    const paths = notFoundSitePaths();
    expect(paths.home).toBe("./");
    expect(paths.css).toBe("assets/style.css");
    const html = renderBuiltNotFoundHtml(SITE_BASE, homePath, {});
    expect(html).toContain('<base href="/ai-tastemakers/">');
  });

  it("renders a branded page with home link and site shell, not GitHub stock 404", () => {
    const homePath = siteHomePathFromBaseUrl(SITE_BASE);
    const html = renderBuiltNotFoundHtml(SITE_BASE, homePath, {});
    expect(html).toContain(NOT_FOUND_HEADING);
    expect(html).toContain(NOT_FOUND_BODY);
    expect(html).toContain(NOT_FOUND_HOME_CTA);
    expect(html).toContain('href="./"');
    expect(html).toContain("Tastemakers");
    expect(html).toContain('rel="stylesheet"');
    expect(html).toContain("prefers-color-scheme: dark");
    expect(html).not.toContain(GITHUB_STOCK_NOT_FOUND_SNIPPET);
    expect(html).not.toMatch(/There isn.?t a GitHub Pages site here/i);
  });

  it("includes skip link and main landmark for the 404 page only", () => {
    const html = renderBuiltNotFoundHtml(SITE_BASE, "/ai-tastemakers/", {});
    expect(html).toContain('href="#main-content"');
    expect(html).toContain('Skip to main content');
    expect(html).toContain('<main id="main-content">');
  });

  it("does not add skip link or main wrapper to ordinary pageShell pages", () => {
    const paths = notFoundSitePaths();
    const esc = (t: string) =>
      t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    const plain = pageShell(
      "Fixture",
      "<p>Body</p>",
      paths,
      { name: "Tastemakers", tagline: "tag" },
      undefined,
      esc,
    );
    expect(plain).not.toContain('id="main-content"');
    expect(plain).not.toContain("Skip to main content");
  });
});

describe("published site output", () => {
  const tmpDirs: string[] = [];

  afterEach(() => {
    for (const dir of tmpDirs) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
    tmpDirs.length = 0;
  });

  it("writes 404.html at the site root when buildNotFoundPage runs", async () => {
    const siteDir = fs.mkdtempSync(path.join(os.tmpdir(), "at-404-site-"));
    tmpDirs.push(siteDir);
    const html = renderBuiltNotFoundHtml(SITE_BASE, "/ai-tastemakers/", {});
    const outPath = path.join(siteDir, "404.html");
    fs.writeFileSync(outPath, html, "utf8");
    expect(fs.existsSync(outPath)).toBe(true);
    const written = fs.readFileSync(outPath, "utf8");
    expect(written).toContain(NOT_FOUND_HOME_CTA);
    expect(written).toContain('<base href="/ai-tastemakers/">');
    expect(written).toContain('href="./"');
  });

  it("treats 404.html as an SEO utility page (noindex)", () => {
    expect(siteSeoGateExemptRel("404.html")).toBe(true);
  });
});
