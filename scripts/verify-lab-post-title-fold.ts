/**
 * UX46: Ponytail write up article title above the fold at 390×844.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POST_REL = "site/lab/posts/EXP-20260802-ponytail-narration-skills.html";

async function main(): Promise<void> {
  const abs = path.join(repoRoot, POST_REL);
  if (!fs.existsSync(abs)) {
    console.error(`missing ${POST_REL} (run npm run build:pages first)`);
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`file://${abs}`, { waitUntil: "networkidle" });

  const layout = await page.evaluate(() => {
    const article = document.querySelector("article");
    const h1 =
      document.querySelector(".lab-post-header h1") ??
      article?.querySelector("h1") ??
      document.querySelector("article h1");
    if (!h1) return { ok: false, reason: "missing article h1" };
    const rect = h1.getBoundingClientRect();
    const vh = window.innerHeight;
    return {
      ok: rect.top >= 0 && rect.bottom <= vh + 1,
      top: rect.top,
      bottom: rect.bottom,
      vh,
    };
  });

  await browser.close();

  if (!layout.ok) {
    console.error("verify: lab post title above fold failed at 390×844:", layout);
    process.exit(1);
  }
  console.log("verify: lab post title above fold ok (ponytail write up at 390×844)");
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
