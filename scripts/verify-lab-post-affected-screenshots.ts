/**
 * Lab post sample-link fix: compare-section crops and Before/After link checks.
 * Writes PNGs under /opt/cursor/artifacts/screenshots (not committed).
 */
import fs from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium, type Browser, type Page } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.join(repoRoot, "site");
const siteRootWithSep = `${siteRoot}${path.sep}`;
const artifactDir = "/opt/cursor/artifacts/screenshots";

const MIME_BY_EXT: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

/** Lab posts touched for briefing sample links (keep in sync with PR report). */
export const LAB_POSTS_AFFECTED_BY_BRIEF_SAMPLE_LINKS = [
  {
    slug: "EXP-20260802-ponytail-narration-skills",
    compareHeading: "Compare two briefs",
  },
  {
    slug: "EXP-20260715-soft-dedup-diversity-skills",
    compareHeading: "Compare two lists",
  },
] as const;

function isPathUnderSiteRoot(abs: string): boolean {
  const normalized = path.resolve(abs);
  if (normalized === siteRoot) return true;
  const rel = path.relative(siteRoot, normalized);
  return rel !== "" && !rel.startsWith(`..${path.sep}`) && rel !== ".." && !path.isAbsolute(rel);
}

function resolveSiteFile(pathname: string): string | null {
  let rel = decodeURIComponent(pathname).replace(/^\//, "");
  if (!rel || rel.endsWith("/")) rel = `${rel}index.html`;
  const abs = path.resolve(siteRoot, rel);
  if (!isPathUnderSiteRoot(abs)) return null;
  if (!fs.existsSync(abs) || fs.statSync(abs).isDirectory()) return null;
  return abs;
}

function siteAbsToUrl(origin: string, siteAbs: string): string {
  const rel = path.relative(siteRoot, siteAbs).split(path.sep).join("/");
  return `${origin}/${rel}`;
}

function resolveHrefFromPage(pageAbs: string, href: string): string {
  return path.normalize(path.join(path.dirname(pageAbs), href));
}

function contentTypeFor(abs: string): string {
  return MIME_BY_EXT[path.extname(abs).toLowerCase()] ?? "application/octet-stream";
}

async function startStaticSiteServer(): Promise<{ origin: string; close: () => Promise<void> }> {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const abs = resolveSiteFile(new URL(req.url ?? "/", "http://127.0.0.1").pathname);
      if (!abs) {
        res.statusCode = 404;
        res.end("Not found");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", contentTypeFor(abs));
      res.end(fs.readFileSync(abs));
    });
    server.listen(0, "127.0.0.1", () => {
      const port = (server.address() as { port: number }).port;
      resolve({
        origin: `http://127.0.0.1:${port}`,
        close: () => new Promise((done) => server.close(() => done())),
      });
    });
    server.on("error", reject);
  });
}

function backgroundLightness(css: string): number | null {
  const oklch = css.match(/oklch\(\s*([\d.]+)/i);
  if (oklch) return Number(oklch[1]);
  const m = css.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!m) return null;
  const r = Number(m[1]) / 255;
  const g = Number(m[2]) / 255;
  const b = Number(m[3]) / 255;
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export async function assertLabPostStylesApplied(
  page: Page,
  scheme: "light" | "dark",
): Promise<void> {
  await page.waitForFunction(() => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    if (links.length === 0) return false;
    return links.every((link) => {
      const sheet = (link as HTMLLinkElement).sheet;
      if (!sheet) return false;
      try {
        return sheet.cssRules.length > 0;
      } catch {
        return Boolean(sheet.href?.includes("style"));
      }
    });
  });

  const article = page.locator("article.lab-prose-capped").first();
  await article.waitFor({ state: "visible" });
  const fontFamily = await article.evaluate((el) => getComputedStyle(el).fontFamily.toLowerCase());
  if (!fontFamily.includes("sans") && fontFamily.includes("serif")) {
    throw new Error(
      `lab post prose looks unstyled (font-family: ${fontFamily}); expected sans from ${siteRootWithSep}assets/style*.css`,
    );
  }

  const shellBg = await page.locator(".lab-post-shell").first().evaluate((el) => {
    return getComputedStyle(el).backgroundColor;
  });
  const lum = backgroundLightness(shellBg);
  if (lum == null) {
    throw new Error(`could not parse lab-post-shell background: ${shellBg}`);
  }
  if (scheme === "dark" && lum > 0.25) {
    throw new Error(`dark mode crop expected dark shell background, got ${shellBg} (lightness ${lum})`);
  }
  if (scheme === "light" && lum < 0.85) {
    throw new Error(`light mode crop expected light shell background, got ${shellBg} (lightness ${lum})`);
  }

  const htmlHasDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
  if (scheme === "dark" && !htmlHasDark) {
    throw new Error("dark mode screenshot requires html.dark (colorScheme + head script)");
  }
  if (scheme === "light" && htmlHasDark) {
    throw new Error("light mode screenshot must not have html.dark");
  }
}

async function loadStyledPost(
  browser: Browser,
  pageUrl: string,
  width: number,
  scheme: "light" | "dark",
): Promise<{ page: Page; context: Awaited<ReturnType<Browser["newContext"]>> }> {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    colorScheme: scheme,
  });
  const page = await context.newPage();
  const cssResponse = page.waitForResponse(
    (res) => res.url().includes("/assets/style") && res.status() === 200,
    { timeout: 15_000 },
  );
  await page.goto(pageUrl, { waitUntil: "networkidle" });
  await cssResponse;
  await assertLabPostStylesApplied(page, scheme);
  return { page, context };
}

async function screenshotCompareSection(
  page: Page,
  headingText: string,
  filename: string,
  viewportWidth: number,
): Promise<void> {
  const h3 = page.locator("article h3").filter({ hasText: headingText }).first();
  const ul = h3.locator("+ ul");
  await h3.scrollIntoViewIfNeeded();
  await ul.waitFor({ state: "visible" });
  const h3Box = await h3.boundingBox();
  const ulBox = await ul.boundingBox();
  if (!h3Box || !ulBox) {
    throw new Error(`compare section bounding box missing for "${headingText}"`);
  }
  const padTop = 72;
  const padBottom = 32;
  const y = Math.max(0, h3Box.y - padTop);
  const bottom = Math.min(900, ulBox.y + ulBox.height + padBottom);
  await page.screenshot({
    path: path.join(artifactDir, filename),
    clip: { x: 0, y, width: viewportWidth, height: bottom - y },
  });
}

async function verifyBeforeAfterLinks(
  page: Page,
  pageAbs: string,
  pageUrl: string,
  headingText: string,
): Promise<void> {
  const ul = page
    .locator("article h3")
    .filter({ hasText: headingText })
    .first()
    .locator("+ ul");
  const links = ul.locator("li a[href]");
  const count = await links.count();
  if (count < 2) {
    throw new Error(`${pageAbs}: expected 2 compare links under "${headingText}", found ${count}`);
  }
  for (let i = 0; i < 2; i++) {
    const link = links.nth(i);
    const href = await link.getAttribute("href");
    if (!href?.trim()) {
      throw new Error(`${pageAbs}: compare link ${i} missing href`);
    }
    const targetAbs = resolveHrefFromPage(pageAbs, href);
    if (!fs.existsSync(targetAbs)) {
      throw new Error(`${pageAbs}: compare link target missing on disk: ${targetAbs}`);
    }
    const resolvedUrl = new URL(href, pageUrl).href;
    const head = await page.request.get(resolvedUrl);
    const status = head.status();
    const label = i === 0 ? "Before" : "After";
    console.log(`verify: compare ${label} link href=${href} resolved=${resolvedUrl} status=${status}`);
    if (status !== 200) {
      throw new Error(`${pageAbs}: ${label} link ${href} returned HTTP ${status}, expected 200`);
    }
    await link.scrollIntoViewIfNeeded();
    const [response] = await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      link.click(),
    ]);
    const clickStatus = response?.status() ?? 0;
    const afterUrl = page.url();
    console.log(`verify: compare ${label} click resolved=${afterUrl} status=${clickStatus}`);
    if (clickStatus !== 200) {
      throw new Error(`${pageAbs}: ${label} click navigation HTTP ${clickStatus}, expected 200`);
    }
    await page.goto(pageUrl, { waitUntil: "networkidle" });
  }
}

async function capturePost(
  browser: Browser,
  origin: string,
  pageAbs: string,
  compareHeading: string,
  short: string,
): Promise<void> {
  const pageUrl = siteAbsToUrl(origin, pageAbs);
  for (const { width, scheme, tag } of [
    { width: 390, scheme: "dark" as const, tag: "390-dark" },
    { width: 1280, scheme: "light" as const, tag: "desktop-light" },
  ]) {
    const { page, context } = await loadStyledPost(browser, pageUrl, width, scheme);
    try {
      await screenshotCompareSection(
        page,
        compareHeading,
        `lab-post-${short}-compare-${tag}.png`,
        width,
      );
    } finally {
      await context.close();
    }
  }

  const { page, context } = await loadStyledPost(browser, pageUrl, 390, "light");
  try {
    await verifyBeforeAfterLinks(page, pageAbs, pageUrl, compareHeading);
  } finally {
    await context.close();
  }
}

async function main(): Promise<void> {
  fs.mkdirSync(artifactDir, { recursive: true });
  const server = await startStaticSiteServer();
  const browser = await chromium.launch();
  try {
    for (const { slug, compareHeading } of LAB_POSTS_AFFECTED_BY_BRIEF_SAMPLE_LINKS) {
      const abs = path.join(siteRoot, "lab/posts", `${slug}.html`);
      if (!fs.existsSync(abs)) {
        console.error(`missing ${abs} (run npm run build:pages first)`);
        process.exit(1);
      }
      const short = slug.replace(/^EXP-\d{8}-/, "").slice(0, 40);
      await capturePost(browser, server.origin, abs, compareHeading, short);
    }
  } finally {
    await browser.close();
    await server.close();
  }
  console.log(
    `verify: lab post affected screenshots ok (${LAB_POSTS_AFFECTED_BY_BRIEF_SAMPLE_LINKS.length} posts, ${artifactDir})`,
  );
}

const isMain =
  typeof process.argv[1] === "string" &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
