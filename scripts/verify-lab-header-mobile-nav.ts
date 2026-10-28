/**
 * Lab combined header nav at 390px: horizontal scroll, edge fades, tab peeks.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const labIndex = path.join(repoRoot, "site/lab/index.html");
const browserBodyPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "lab-header-mobile-nav-browser.js");

const IDLE =
  "border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-900 dark:border-stone-700 dark:text-stone-400 dark:hover:border-stone-500 dark:hover:text-stone-100";

async function main(): Promise<void> {
  if (!fs.existsSync(labIndex)) {
    console.error("missing site/lab/index.html");
    process.exit(1);
  }

  const browserBody = fs.readFileSync(browserBodyPath, "utf8");
  const browserFn = new Function("idle", browserBody) as (idle: string) => Record<string, unknown>;

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
  await page.goto(`file://${labIndex}`, { waitUntil: "networkidle" });

  const result = await page.evaluate(browserFn, IDLE);

  await browser.close();

  if (!result.ok) {
    console.error("verify: lab header mobile nav failed at 390px:", result);
    process.exit(1);
  }
  console.log(
    "verify: lab header mobile nav ok (390px scroll, fades, peeks, Skills reachable, edition left peek)",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
