/**
 * Lab post sample-link fix: compare-section crops and Before/After link checks.
 * Writes PNGs under /opt/cursor/artifacts/screenshots (not committed).
 */
import fs from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium, type Page } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.join(repoRoot, "site");
const artifactDir = "/opt/cursor/artifacts/screenshots";

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

function siteAbsToUrl(origin: string, siteAbs: string): string {
  const rel = path.relative(siteRoot, siteAbs).split(path.sep).join("/");
  return `${origin}/${rel}`;
}

function resolveHrefFromPage(pageAbs: string, href: string): string {
  return path.normalize(path.join(path.dirname(pageAbs), href));
}

async function startStaticSiteServer(): Promise<{ origin: string; close: () => Promise<void> }> {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const pathname = decodeURIComponent(new URL(req.url ?? "/", "http://127.0.0.1").pathname);
      let rel = pathname.replace(/^\//, "");
      if (!rel || rel.endsWith("/")) rel = `${rel}index.html`;
      const abs = path.normalize(path.join(siteRoot, rel));
      if (!abs.startsWith(siteRoot) || !fs.existsSync(abs) || fs.statSync(abs).isDirectory()) {
        res.statusCode = 404;
        res.end("Not found");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
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

async function screenshotCompareSection(
  page: Page,
  headingText: string,
  filename: string,
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
  const x = Math.min(h3Box.x, ulBox.x);
  const y = h3Box.y;
  const right = Math.max(h3Box.x + h3Box.width, ulBox.x + ulBox.width);
  const bottom = ulBox.y + ulBox.height;
  await page.screenshot({
    path: path.join(artifactDir, filename),
    clip: { x, y, width: right - x, height: bottom - y },
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
  page: Page,
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
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto(pageUrl, { waitUntil: "networkidle" });
    await screenshotCompareSection(
      page,
      compareHeading,
      `lab-post-${short}-compare-${tag}.png`,
    );
  }
  await page.goto(pageUrl, { waitUntil: "networkidle" });
  await verifyBeforeAfterLinks(page, pageAbs, pageUrl, compareHeading);
}

async function main(): Promise<void> {
  fs.mkdirSync(artifactDir, { recursive: true });
  const server = await startStaticSiteServer();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    for (const { slug, compareHeading } of LAB_POSTS_AFFECTED_BY_BRIEF_SAMPLE_LINKS) {
      const abs = path.join(siteRoot, "lab/posts", `${slug}.html`);
      if (!fs.existsSync(abs)) {
        console.error(`missing ${abs} (run npm run build:pages first)`);
        process.exit(1);
      }
      const short = slug.replace(/^EXP-\d{8}-/, "").slice(0, 40);
      await capturePost(page, server.origin, abs, compareHeading, short);
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
