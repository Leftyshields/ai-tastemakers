import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactDir = path.join(repoRoot, "artifacts", "lab-header-mobile");
const phase = process.argv[2] === "after" ? "after" : "before";
const labIndex = path.join(repoRoot, "site/lab/index.html");

async function main(): Promise<void> {
  if (!fs.existsSync(labIndex)) {
    console.error("missing site/lab/index.html (run npm run build:pages first)");
    process.exit(1);
  }
  await fs.promises.mkdir(artifactDir, { recursive: true });
  const browser = await chromium.launch();
  const fileUrl = `file://${labIndex}`;

  for (const mode of ["light", "dark"] as const) {
    const page = await browser.newPage({ viewport: { width: 390, height: 320 } });
    await page.goto(fileUrl, { waitUntil: "networkidle" });
    await page.evaluate((dark) => {
      document.documentElement.classList.toggle("dark", dark);
    }, mode === "dark");
    const header = page.locator("header").first();
    const outPath = path.join(artifactDir, `lab-header-390-${mode}-${phase}.png`);
    await header.screenshot({ path: outPath });
    console.log(outPath);
    await page.close();
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
