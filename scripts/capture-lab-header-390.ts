import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactDir = path.join(repoRoot, "artifacts", "lab-header-mobile");
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
    for (const scrollPos of ["scroll-start", "scroll-end"] as const) {
      const page = await browser.newPage({ viewport: { width: 390, height: 320 } });
      await page.goto(fileUrl, { waitUntil: "networkidle" });
      await page.evaluate((dark) => {
        document.documentElement.classList.toggle("dark", dark);
      }, mode === "dark");
      await page.evaluate((pos) => {
        const nav = document.querySelector(".lab-nav--combined");
        if (!nav) return;
        if (pos === "scroll-end") {
          nav.scrollLeft = nav.scrollWidth;
        } else {
          nav.scrollLeft = 0;
        }
        nav.dispatchEvent(new Event("scroll"));
      }, scrollPos);
      const header = page.locator("header").first();
      const outPath = path.join(artifactDir, `lab-header-390-${mode}-${scrollPos}.png`);
      await header.screenshot({ path: outPath });
      console.log(outPath);
      await page.close();
    }
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
