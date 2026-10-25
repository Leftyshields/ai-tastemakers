/**
 * UX47: Long-repo fixture at 390px — chip layout (Back row, full-width chip, repo ≥60% of chip).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LONG_FIXTURE = path.join(repoRoot, "site/lab/posts/_fixture-e1-long-repo.html");
const MIN_REPO_SHARE = 0.6;

async function main(): Promise<void> {
  if (!fs.existsSync(LONG_FIXTURE)) {
    console.error(`missing ${LONG_FIXTURE} (run npm run build:pages first)`);
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
  });
  await page.goto(`file://${LONG_FIXTURE}`, { waitUntil: "networkidle" });

  const layout = await page.evaluate((minShare) => {
    const back = document.getElementById("lab-post-back-btn");
    const vdiv = document.querySelector(".lab-post-header__vdiv");
    const chip = document.querySelector(".lab-post-split-chip");
    const repo = document.querySelector(".lab-post-split-chip__repo");
    if (!back || !chip || !repo) {
      return { ok: false, reason: "missing header elements" };
    }
    const backRect = back.getBoundingClientRect();
    const chipRect = chip.getBoundingClientRect();
    const repoRect = repo.getBoundingClientRect();
    const vdivVisible =
      vdiv &&
      getComputedStyle(vdiv).display !== "none" &&
      vdiv.getBoundingClientRect().width > 0;
    const backOwnRow = chipRect.top >= backRect.bottom - 2;
    const chipFullWidth = chipRect.width >= backRect.width * 0.92;
    const repoShare = repoRect.width / chipRect.width;
    return {
      ok: backOwnRow && !vdivVisible && chipFullWidth && repoShare >= minShare,
      backOwnRow,
      vdivVisible,
      chipFullWidth,
      repoShare,
      chipWidth: chipRect.width,
      repoWidth: repoRect.width,
    };
  }, MIN_REPO_SHARE);

  await browser.close();

  if (!layout.ok) {
    console.error("verify: lab post chip mobile layout failed at 390px:", layout);
    process.exit(1);
  }
  console.log(
    `verify: lab post chip mobile layout ok (390px, repo ${(layout.repoShare * 100).toFixed(0)}% of chip)`,
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
