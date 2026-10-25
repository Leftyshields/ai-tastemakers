/**
 * UX47: Playwright screenshots for Ponytail and Firecrawl post headers (390px + desktop, light/dark, with/without from_list params).
 * Writes PNGs under /opt/cursor/artifacts/screenshots (not committed).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium, type Page } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactDir = "/opt/cursor/artifacts/screenshots";

const POSTS = [
  "EXP-20260802-ponytail-narration-skills.html",
  "EXP-20260716-firecrawl-enrich-skills.html",
] as const;

type Variant = { suffix: string; search: string };

const VARIANTS: Variant[] = [
  { suffix: "plain", search: "" },
  { suffix: "from-skills-rank-3", search: "?from_list=skills&from_rank=3" },
];

async function screenshotPage(page: Page, absPath: string, name: string): Promise<void> {
  await page.goto(`file://${absPath}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(artifactDir, name), fullPage: false });
}

async function main(): Promise<void> {
  fs.mkdirSync(artifactDir, { recursive: true });
  for (const post of POSTS) {
    const abs = path.join(repoRoot, "site/lab/posts", post);
    if (!fs.existsSync(abs)) {
      console.error(`missing ${abs} (run npm run build:pages first)`);
      process.exit(1);
    }
  }

  const browser = await chromium.launch();
  for (const post of POSTS) {
    const slug = post.replace(/\.html$/, "");
    const abs = path.join(repoRoot, "site/lab/posts", post);
    for (const variant of VARIANTS) {
      for (const width of [390, 1280] as const) {
        for (const scheme of ["light", "dark"] as const) {
          const page = await browser.newPage({
            viewport: { width, height: scheme === "dark" ? 900 : 844 },
            colorScheme: scheme,
          });
          const url = `file://${abs}${variant.search}`;
          await page.goto(url, { waitUntil: "networkidle" });
          const name = `lab-post-header-${slug}-${variant.suffix}-${width}-${scheme}.png`;
          await page.screenshot({ path: path.join(artifactDir, name), fullPage: false });
          await page.close();
        }
      }
    }
  }
  await browser.close();
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
