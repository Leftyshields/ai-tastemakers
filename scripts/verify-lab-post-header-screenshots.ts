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
    const chip = document.querySelector(".lab-post-split-chip");
    const btn = document.getElementById("lab-post-back-btn");
    if (!hdr || !chip || !btn) return true;
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
  for (const p of [FIRECRAWL_POST, LONG_FIXTURE]) {
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
  ];

  for (const [name, abs, width] of shots) {
    const scheme = name.includes("dark") ? "dark" : "light";
    const { height, deviceScaleFactor } = viewportForWidth(width);
    await shotViewport(abs, name, { width, height, scheme, deviceScaleFactor });
    console.log(path.join(artifactDir, name));
  }

  console.log(`verify: lab post header screenshots ok (${artifactDir}, 8 PNGs, viewport crop @ device scale)`);
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
