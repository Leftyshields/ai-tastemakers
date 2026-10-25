/**
 * Playwright: briefing card → Lab post → Back restores URL and scroll.
 * Writes artifacts under /opt/cursor/artifacts (not committed).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactDir = "/opt/cursor/artifacts";
const BRIEF = path.join(repoRoot, "site/briefings/2026-10-25.html");
const CARD_SELECTOR = "#repo-ponytail";
const BADGE_SELECTOR = `${CARD_SELECTOR} .digest-repo-card__lab-badge`;

async function main(): Promise<void> {
  if (!fs.existsSync(BRIEF)) {
    console.error(`missing ${BRIEF} (run npm run build:pages first)`);
    process.exit(1);
  }
  fs.mkdirSync(path.join(artifactDir, "screenshots"), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`file://${BRIEF}`, { waitUntil: "networkidle" });

  await page.locator(CARD_SELECTOR).scrollIntoViewIfNeeded();
  const scrollBefore = await page.evaluate(() => window.scrollY);
  await page.screenshot({
    path: path.join(artifactDir, "screenshots", "lab-back-roundtrip-01-brief-scrolled.png"),
  });

  await page.locator(BADGE_SELECTOR).click();
  await page.waitForLoadState("networkidle");
  await page.screenshot({
    path: path.join(artifactDir, "screenshots", "lab-back-roundtrip-02-lab-post.png"),
  });

  await page.locator("#lab-post-back-btn").click();
  await page.waitForLoadState("networkidle");

  const urlAfter = page.url();
  const scrollAfter = await page.evaluate(() => window.scrollY);
  if (!urlAfter.includes("briefings/2026-10-25.html")) {
    throw new Error(`expected brief URL after Back, got ${urlAfter}`);
  }
  const usedHashFallback = urlAfter.includes("#repo-ponytail");
  if (usedHashFallback) {
    const inView = await page.locator(CARD_SELECTOR).evaluate((el) => {
      const r = el.getBoundingClientRect();
      return r.top >= 0 && r.top < window.innerHeight * 0.85;
    });
    if (!inView) {
      throw new Error("expected #repo-ponytail card in viewport after from= fallback");
    }
  } else if (Math.abs(scrollAfter - scrollBefore) > 80) {
    throw new Error(`scroll not restored: before=${scrollBefore} after=${scrollAfter}`);
  }

  await page.screenshot({
    path: path.join(artifactDir, "screenshots", "lab-back-roundtrip-03-brief-restored.png"),
  });
  await browser.close();
  console.log("verify: lab post back roundtrip ok");
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
