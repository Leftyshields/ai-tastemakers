/**
 * UX47 / PR 53: Playwright screenshots for Ponytail post and digest badge.
 * Writes PNGs under /opt/cursor/artifacts/screenshots (not committed).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactDir = "/opt/cursor/artifacts/screenshots";

const PONYTAIL_POST = path.join(
  repoRoot,
  "site/lab/posts/EXP-20260802-ponytail-narration-skills.html",
);
const PONYTAIL_DIGEST = path.join(repoRoot, "site/skills/briefings/2026-08-22.html");

async function shot(
  absPath: string,
  filename: string,
  opts: {
    width: number;
    scheme: "light" | "dark";
    search?: string;
    clipSelector?: string;
  },
): Promise<void> {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: opts.width, height: 900 },
    colorScheme: opts.scheme,
  });
  await page.goto(`file://${absPath}${opts.search ?? ""}`, { waitUntil: "networkidle" });
  if (opts.clipSelector) {
    const el = page.locator(opts.clipSelector).first();
    await el.scrollIntoViewIfNeeded();
    await el.screenshot({ path: path.join(artifactDir, filename) });
  } else {
    await page.screenshot({ path: path.join(artifactDir, filename), fullPage: false });
  }
  await browser.close();
}

async function main(): Promise<void> {
  fs.mkdirSync(artifactDir, { recursive: true });
  for (const p of [PONYTAIL_POST, PONYTAIL_DIGEST]) {
    if (!fs.existsSync(p)) {
      console.error(`missing ${p} (run npm run build:pages first)`);
      process.exit(1);
    }
  }

  await shot(PONYTAIL_POST, "pr53-ponytail-post-390-light.png", { width: 390, scheme: "light" });
  await shot(PONYTAIL_POST, "pr53-ponytail-post-390-dark.png", { width: 390, scheme: "dark" });
  await shot(PONYTAIL_POST, "pr53-ponytail-post-desktop-light.png", { width: 1280, scheme: "light" });
  await shot(PONYTAIL_POST, "pr53-ponytail-post-desktop-dark.png", { width: 1280, scheme: "dark" });
  await shot(PONYTAIL_POST, "pr53-ponytail-post-390-from-skills-rank-1.png", {
    width: 390,
    scheme: "light",
    search: "?from_list=skills&from_rank=1",
  });
  await shot(PONYTAIL_POST, "pr53-ponytail-post-390-bad-params.png", {
    width: 390,
    scheme: "light",
    search: "?from_list=evil&from_rank=99",
  });
  await shot(PONYTAIL_POST, "pr53-ponytail-post-390-no-params.png", {
    width: 390,
    scheme: "light",
    search: "",
  });
  await shot(PONYTAIL_DIGEST, "pr53-digest-ponytail-badge-390.png", {
    width: 390,
    scheme: "light",
    clipSelector: 'article.digest-repo-card[data-repo="DietrichGebert/ponytail"]',
  });

  console.log(`verify: lab post header screenshots ok (${artifactDir})`);
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
