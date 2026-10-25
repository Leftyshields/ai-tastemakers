/**
 * Lab post sample-link fix: 390px dark and desktop light crops for affected write-ups.
 * Writes PNGs under /opt/cursor/artifacts/screenshots (not committed).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactDir = "/opt/cursor/artifacts/screenshots";

/** Lab posts touched for briefing sample links (keep in sync with PR report). */
export const LAB_POSTS_AFFECTED_BY_BRIEF_SAMPLE_LINKS = [
  "EXP-20260802-ponytail-narration-skills",
  "EXP-20260715-soft-dedup-diversity-skills",
] as const;

async function shot(
  absPath: string,
  filename: string,
  opts: { width: number; scheme: "light" | "dark" },
): Promise<void> {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: opts.width, height: 900 },
    colorScheme: opts.scheme,
  });
  await page.goto(`file://${absPath}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(artifactDir, filename), fullPage: false });
  await browser.close();
}

async function main(): Promise<void> {
  fs.mkdirSync(artifactDir, { recursive: true });
  for (const slug of LAB_POSTS_AFFECTED_BY_BRIEF_SAMPLE_LINKS) {
    const abs = path.join(repoRoot, "site/lab/posts", `${slug}.html`);
    if (!fs.existsSync(abs)) {
      console.error(`missing ${abs} (run npm run build:pages first)`);
      process.exit(1);
    }
    const short = slug.replace(/^EXP-\d{8}-/, "").slice(0, 40);
    await shot(abs, `lab-post-${short}-390-dark.png`, { width: 390, scheme: "dark" });
    await shot(abs, `lab-post-${short}-desktop-light.png`, { width: 1280, scheme: "light" });
  }
  console.log(
    `verify: lab post affected screenshots ok (${LAB_POSTS_AFFECTED_BY_BRIEF_SAMPLE_LINKS.length} posts, ${artifactDir})`,
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
