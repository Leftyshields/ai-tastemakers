import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
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
import { notFoundSkipToMainScript, pageShell } from "./edition-pages.js";
import { siteSeoGateExemptRel } from "./site-seo-exempt-pages.js";

const SITE_BASE = "https://leftyshields.github.io/ai-tastemakers";
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function assertSkipLinkFocusesMain(documentUrl: string, activate: "click" | "enter") {
  const html = renderBuiltNotFoundHtml(SITE_BASE, "/ai-tastemakers/", {});
  const dom = new JSDOM(html, { url: documentUrl, runScripts: "dangerously" });
  const { window } = dom;
  const pathBefore = window.location.pathname;
  const main = window.document.getElementById("main-content");
  const skip = window.document.getElementById("skip-to-main");
  expect(main?.getAttribute("tabindex")).toBe("-1");
  expect(skip?.getAttribute("href")).toBe("#main-content");

  if (activate === "click") {
    skip?.click();
  } else {
    skip?.dispatchEvent(
      new window.KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }),
    );
  }

  expect(window.location.pathname).toBe(pathBefore);
  expect(window.document.activeElement).toBe(main);
}

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

  it("includes skip link script so activation stays on the 404 and focuses main", () => {
    const deep =
      "https://leftyshields.github.io/ai-tastemakers/this/path/does-not-exist";
    const at404 = "https://leftyshields.github.io/ai-tastemakers/404.html";
    assertSkipLinkFocusesMain(deep, "click");
    assertSkipLinkFocusesMain(deep, "enter");
    assertSkipLinkFocusesMain(at404, "click");
    assertSkipLinkFocusesMain(at404, "enter");
  });

  it("fails without skip script: fragment href resolves against <base> to site home", () => {
    const fullHtml = renderBuiltNotFoundHtml(SITE_BASE, "/ai-tastemakers/", {});
    const dom = new JSDOM(
      fullHtml.replace(notFoundSkipToMainScript, ""),
      {
        url: "https://leftyshields.github.io/ai-tastemakers/this/path/does-not-exist",
        runScripts: "outside-only",
      },
    );
    const resolved = new URL("#main-content", dom.window.document.baseURI).pathname;
    expect(resolved).toBe("/ai-tastemakers/");
    expect(fullHtml).toContain('tabindex="-1"');
    expect(fullHtml).toContain('getElementById("skip-to-main")');
    expect(fullHtml.replace(notFoundSkipToMainScript, "")).not.toContain(
      'getElementById("skip-to-main")',
    );
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

  it("home CTA uses a scoped focus-visible ring class", () => {
    const html = renderBuiltNotFoundHtml(SITE_BASE, "/ai-tastemakers/", {});
    expect(html).toContain("not-found-home-cta");
    const css = fs.readFileSync(path.join(REPO_ROOT, "site/assets/input.css"), "utf8");
    expect(css).toContain("a.not-found-home-cta:focus-visible");
    expect(css).toContain("#1e40af");
    expect(css).toContain(".dark a.not-found-home-cta:focus-visible");
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
    expect(written).toContain("getElementById(\"skip-to-main\")");
  });

  it("treats 404.html as an SEO utility page (noindex)", () => {
    expect(siteSeoGateExemptRel("404.html")).toBe(true);
  });
});
