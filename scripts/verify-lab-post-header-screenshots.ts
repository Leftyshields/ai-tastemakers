/**
 * Design E1: Playwright viewport screenshots (device scale, not full page or element-only).
 * Writes PNGs under /opt/cursor/artifacts/screenshots (not committed).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactDir = "/opt/cursor/artifacts/screenshots";

const FIRECRAWL_POST = path.join(
  repoRoot,
  "site/lab/posts/EXP-20260716-firecrawl-enrich-skills.html",
);
const LONG_FIXTURE = path.join(repoRoot, "site/lab/posts/_fixture-e1-long-repo.html");
const RANK_BOOTSTRAP_POST = path.join(
  repoRoot,
  "site/lab/posts/EXP-20260913-rank-bootstrap-skills.html",
);

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
    const chip = document.querySelector(".lab-post-split-chip");
    if (!chip) return true;
    return chip.getBoundingClientRect().height >= 40;
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
  const allPaths = [FIRECRAWL_POST, LONG_FIXTURE, RANK_BOOTSTRAP_POST];
  for (const p of allPaths) {
    if (!fs.existsSync(p)) {
      console.error(`missing ${p} (run npm run build:pages first)`);
      process.exit(1);
    }
  }

  const shots: Array<[string, string, number]> = [
    ["firecrawl-post-390-light.png", FIRECRAWL_POST, 390],
    ["firecrawl-post-390-dark.png", FIRECRAWL_POST, 390],
    ["firecrawl-post-desktop-light.png", FIRECRAWL_POST, 1280],
    ["firecrawl-post-desktop-dark.png", FIRECRAWL_POST, 1280],
    ["long-repo-post-390-light.png", LONG_FIXTURE, 390],
    ["long-repo-post-390-dark.png", LONG_FIXTURE, 390],
    ["long-repo-post-desktop-light.png", LONG_FIXTURE, 1280],
    ["long-repo-post-desktop-dark.png", LONG_FIXTURE, 1280],
    ["rank-bootstrap-post-390-dark.png", RANK_BOOTSTRAP_POST, 390],
  ];

  const filter = new Set(process.argv.slice(2));
  const selected =
    filter.size > 0 ? shots.filter(([name]) => filter.has(name)) : shots;
  if (selected.length === 0) {
    console.error("no matching screenshot names in argv");
    process.exit(1);
  }

  for (const [name, abs, width] of selected) {
    const scheme = name.includes("dark") ? "dark" : "light";
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
