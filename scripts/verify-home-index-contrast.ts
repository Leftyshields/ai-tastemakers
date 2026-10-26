import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { CONTRAST_CHECK_JS, HOME_INDEX_ACTIVE_TAB_DARK_JS } from "./color-contrast-runtime.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOME_PAGES = ["site/index.html", "site/skills/index.html"];
const CONTRAST_ROOTS = [".home-index-main", ".home-index-edition-nav"];
const MIN_RATIO = 4.5;

async function main(): Promise<void> {
  const browser = await chromium.launch();
  const allFailures: string[] = [];

  for (const rel of HOME_PAGES) {
    const abs = path.join(repoRoot, rel);
    if (!fs.existsSync(abs)) {
      console.error(`missing ${rel} (run SITE_LANDING_LAYOUT_V2=1 npm run build:pages first)`);
      process.exit(1);
    }
    const fileUrl = `file://${abs}`;
    for (const mode of ["light", "dark"] as const) {
      for (const width of [390, 1280]) {
        const page = await browser.newPage({ viewport: { width, height: 900 } });
        await page.goto(fileUrl, { waitUntil: "networkidle" });
        await page.evaluate((dark) => {
          document.documentElement.classList.toggle("dark", dark);
        }, mode === "dark");
        for (const rootSelector of CONTRAST_ROOTS) {
          const failures = (await page.evaluate(
            `${CONTRAST_CHECK_JS}(${MIN_RATIO}, ${JSON.stringify(rootSelector)})`,
          )) as string[];
          for (const f of failures) {
            allFailures.push(`[${rel} ${mode} ${width}px ${rootSelector}] ${f}`);
          }
        }
        if (mode === "dark") {
          const tabFailures = (await page.evaluate(
            `${HOME_INDEX_ACTIVE_TAB_DARK_JS}(${MIN_RATIO})`,
          )) as string[];
          for (const f of tabFailures) {
            allFailures.push(`[${rel} dark ${width}px active-tab] ${f}`);
          }
        }
        await page.close();
      }
    }
  }

  await browser.close();

  if (allFailures.length > 0) {
    console.error("verify: home index contrast failed (need 4.5:1):");
    for (const f of allFailures.slice(0, 40)) console.error(`  ${f}`);
    if (allFailures.length > 40) console.error(`  …and ${allFailures.length - 40} more`);
    process.exit(1);
  }
  console.log(
    "verify: home index contrast ok (light and dark, 390 and desktop, active tab dark gate)",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
