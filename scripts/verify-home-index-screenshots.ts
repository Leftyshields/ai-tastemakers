import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactDir =
  process.env.HOME_INDEX_SCREENSHOT_DIR?.trim() ||
  path.join(repoRoot, "artifacts", "home-index-screenshots");

type PageSpec = { rel: string; slug: string };

const PAGES: PageSpec[] = [
  { rel: "site/index.html", slug: "ai-home" },
  { rel: "site/skills/index.html", slug: "skills-home" },
  { rel: "site/briefings/index.html", slug: "ai-archive-days" },
  { rel: "site/skills/briefings/index.html", slug: "skills-archive-days" },
  { rel: "site/weekly/index.html", slug: "weekly-index" },
  { rel: "site/monthly/index.html", slug: "monthly-index" },
];

const VIEWPORTS = [
  { width: 390, label: "390" },
  { width: 768, label: "768" },
  { width: 1280, label: "desktop" },
] as const;

async function main(): Promise<void> {
  await fs.promises.mkdir(artifactDir, { recursive: true });
  const browser = await chromium.launch();
  const saved: string[] = [];

  for (const pageSpec of PAGES) {
    const abs = path.join(repoRoot, pageSpec.rel);
    if (!fs.existsSync(abs)) {
      console.error(`missing ${pageSpec.rel}`);
      process.exit(1);
    }
    const fileUrl = `file://${abs}`;
    for (const vp of VIEWPORTS) {
      for (const mode of ["light", "dark"] as const) {
        const page = await browser.newPage({ viewport: { width: vp.width, height: 900 } });
        const response = await page.goto(fileUrl, { waitUntil: "networkidle" });
        const stylesheetOk = await page.evaluate(() => {
          const link = document.querySelector('link[rel="stylesheet"]') as HTMLLinkElement | null;
          if (!link?.href || !/style\.[a-f0-9]+\.css/i.test(link.href)) return false;
          const probe =
            document.querySelector(".home-index-main .btn-p") ||
            document.querySelector("h1") ||
            document.body;
          if (!probe) return false;
          const bg = getComputedStyle(probe).backgroundColor;
          const fw = Number(getComputedStyle(probe).fontWeight);
          return (
            (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") ||
            fw >= 600 ||
            link.sheet != null
          );
        });
        if (!response?.ok() || !stylesheetOk) {
          console.error(
            `verify: stylesheet not loaded for ${pageSpec.rel} (${vp.label}, ${mode})`,
          );
          process.exit(1);
        }
        await page.evaluate((dark) => {
          document.documentElement.classList.toggle("dark", dark);
        }, mode === "dark");
        const filename = `${pageSpec.slug}-${vp.label}-${mode}.png`;
        const outPath = path.join(artifactDir, filename);
        await page.screenshot({ path: outPath, fullPage: true });
        saved.push(outPath);
        await page.close();
      }
    }
  }

  await browser.close();
  console.log("verify: home index screenshots saved:");
  for (const p of saved) console.log(`  ${p}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
