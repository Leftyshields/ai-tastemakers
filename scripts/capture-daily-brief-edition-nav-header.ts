/**
 * Header screenshots for daily brief edition nav pill (active tab styling).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const VIEWPORTS = [
  { width: 390, label: "390" },
  { width: 1280, label: "desktop" },
] as const;

function resolveBriefRel(): string {
  const briefDir = path.join(repoRoot, "site/briefings");
  const briefDate = fs
    .readdirSync(briefDir)
    .filter((n) => /^\d{4}-\d{2}-\d{2}\.html$/.test(n))
    .sort()
    .reverse()[0];
  if (!briefDate) throw new Error("no brief html in site/briefings");
  return `site/briefings/${briefDate}`;
}

async function capture(
  outDir: string,
  prefix: string,
  modes: readonly ("light" | "dark")[],
): Promise<string[]> {
  await fs.promises.mkdir(outDir, { recursive: true });
  const rel = resolveBriefRel();
  const abs = path.join(repoRoot, rel);
  const browser = await chromium.launch();
  const saved: string[] = [];

  for (const vp of VIEWPORTS) {
    for (const mode of modes) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: 900 } });
      await page.goto(`file://${abs}`, { waitUntil: "networkidle" });
      await page.evaluate((dark) => {
        document.documentElement.classList.toggle("dark", dark);
      }, mode === "dark");
      const header = page.locator("header").first();
      const filename = `${prefix}-daily-brief-edition-nav-${vp.label}-${mode}.png`;
      const outPath = path.join(outDir, filename);
      await header.screenshot({ path: outPath });
      saved.push(outPath);
      await page.close();
    }
  }

  await browser.close();
  return saved;
}

async function main(): Promise<void> {
  const phase = process.argv[2];
  const artifactRoot = path.join(repoRoot, "artifacts", "daily-brief-edition-nav-fix");
  if (phase === "before") {
    const saved = await capture(path.join(artifactRoot, "before"), "before", ["dark"]);
    console.log(saved.join("\n"));
    return;
  }
  if (phase === "after") {
    const savedDark = await capture(path.join(artifactRoot, "after"), "after", ["dark"]);
    const savedLight = await capture(path.join(artifactRoot, "after"), "after", ["light"]);
    console.log([...savedDark, ...savedLight].join("\n"));
    return;
  }
  console.error("usage: capture-daily-brief-edition-nav-header.ts before|after");
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
