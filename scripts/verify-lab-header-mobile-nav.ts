/**
 * Lab combined header nav at 390px: horizontal scroll, visible edge fade, tab peek.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const labIndex = path.join(repoRoot, "site/lab/index.html");
const browserBodyPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "lab-header-mobile-nav-browser.js");

async function main(): Promise<void> {
  if (!fs.existsSync(labIndex)) {
    console.error("missing site/lab/index.html");
    process.exit(1);
  }

  const browserBody = fs.readFileSync(browserBodyPath, "utf8");
  const browserFn = new Function(browserBody) as () => Record<string, unknown>;

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
  await page.goto(`file://${labIndex}`, { waitUntil: "networkidle" });

  const layout = await page.evaluate(browserFn);

  await browser.close();

  if (!layout.ok) {
    console.error("verify: lab header mobile nav failed at 390px:", layout);
    process.exit(1);
  }
  console.log(
    "verify: lab header mobile nav ok (390px scroll, fade, peek, Skills reachable)",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
