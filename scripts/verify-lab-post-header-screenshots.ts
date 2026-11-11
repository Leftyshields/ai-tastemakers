/**
 * Design E1: Playwright viewport screenshots (device scale, not full page or element-only).
 * Writes PNGs under /opt/cursor/artifacts/screenshots (not committed).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";
import { listLabWriteupPostIds } from "./lab/lab-format.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactDir = "/opt/cursor/artifacts/screenshots";

const FIRECRAWL_ID = "EXP-20260716-firecrawl-enrich-skills";
const FIRECRAWL_POST = path.join(repoRoot, "site/lab/posts", `${FIRECRAWL_ID}.html`);
const LONG_FIXTURE = path.join(repoRoot, "site/lab/posts/_fixture-e1-long-repo.html");

async function shotViewport(
  absPath: string,
  filename: string,
  opts: { width: number; height: number; scheme: "light" | "dark"; deviceScaleFactor: number },
): Promise<void> {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: opts.width, height: opts.height },
    deviceScaleFactor: opts.deviceScaleFactor,
    colorScheme: opts.scheme,
  });
  await page.goto(`file://${absPath}`, { waitUntil: "networkidle" });
  await page.evaluate((dark) => {
    document.documentElement.classList.toggle("dark", dark);
  }, opts.scheme === "dark");
  await page.waitForFunction(() => {
    const hdr = document.querySelector(".lab-post-header__hdr");
    const btn = document.getElementById("lab-post-back-btn");
    if (!hdr || !btn) return false;
    const chip =
      document.querySelector(".lab-post-split-chip") ||
      document.querySelector(".lab-post-header__repo-link");
    if (!chip) return true;
    const h = chip.getBoundingClientRect().height;
    const minH = chip.classList.contains("lab-post-header__repo-link") ? 32 : 40;
    return h >= minH;
  });
  await page.screenshot({
    path: path.join(artifactDir, filename),
    fullPage: false,
    animations: "disabled",
  });
  await browser.close();
}

function viewportForWidth(width: number): { height: number; deviceScaleFactor: number } {
  if (width <= 390) return { height: 844, deviceScaleFactor: 3 };
  return { height: 900, deviceScaleFactor: 2 };
}

async function main(): Promise<void> {
  fs.mkdirSync(artifactDir, { recursive: true });

  const expIds = listLabWriteupPostIds(repoRoot).filter((id) => id.startsWith("EXP-"));
  const expPosts = expIds.map((id) => path.join(repoRoot, "site/lab/posts", `${id}.html`));

  const allPaths = [...expPosts, LONG_FIXTURE];
  for (const p of allPaths) {
    if (!fs.existsSync(p)) {
      console.error(`missing ${p} (run npm run build:pages first)`);
      process.exit(1);
    }
  }

  const shots: Array<[string, string, number, "light" | "dark"]> = [];

  for (const id of expIds) {
    const abs = path.join(repoRoot, "site/lab/posts", `${id}.html`);
    shots.push([`${id}-390-dark.png`, abs, 390, "dark"]);
  }
  shots.push([`${FIRECRAWL_ID}-desktop-light.png`, FIRECRAWL_POST, 1280, "light"]);

  // Genesis UX47 regression set (Firecrawl + long-repo fixture).
  shots.push(
    ["firecrawl-post-390-light.png", FIRECRAWL_POST, 390, "light"],
    ["firecrawl-post-390-dark.png", FIRECRAWL_POST, 390, "dark"],
    ["firecrawl-post-desktop-light.png", FIRECRAWL_POST, 1280, "light"],
    ["firecrawl-post-desktop-dark.png", FIRECRAWL_POST, 1280, "dark"],
    ["long-repo-post-390-light.png", LONG_FIXTURE, 390, "light"],
    ["long-repo-post-390-dark.png", LONG_FIXTURE, 390, "dark"],
    ["long-repo-post-desktop-light.png", LONG_FIXTURE, 1280, "light"],
    ["long-repo-post-desktop-dark.png", LONG_FIXTURE, 1280, "dark"],
  );

  const filter = new Set(process.argv.slice(2));
  const selected =
    filter.size > 0 ? shots.filter(([name]) => filter.has(name)) : shots;
  if (selected.length === 0) {
    console.error("no matching screenshot names in argv");
    process.exit(1);
  }

  for (const [name, abs, width, scheme] of selected) {
    const { height, deviceScaleFactor } = viewportForWidth(width);
    await shotViewport(abs, name, { width, height, scheme, deviceScaleFactor });
    console.log(path.join(artifactDir, name));
  }

  console.log(
    `verify: lab post header screenshots ok (${artifactDir}, ${selected.length} PNG(s), viewport crop @ device scale)`,
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
