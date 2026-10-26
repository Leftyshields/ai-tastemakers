/**
 * UX header captures: before (main / h1 logo) vs after (SEO branch / div.site-brand).
 * Asserts stylesheet load, visible h1, and pixel-diff of header region.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { chromium } from "playwright";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactRoot = path.join(repoRoot, "artifacts", "seo-header-captures");
const beforeDir = path.join(artifactRoot, "before-main-h1-logo");
const afterDir = path.join(artifactRoot, "after-seo-div-logo");
const diffDir = path.join(artifactRoot, "diff");

const VIEWPORTS = [
  { width: 390, label: "390" },
  { width: 1280, label: "desktop" },
] as const;

type PageSpec = { rel: string; slug: string };

function resolvePages(): PageSpec[] {
  const labPostsDir = path.join(repoRoot, "site/lab/posts");
  const labPost = fs
    .readdirSync(labPostsDir)
    .filter((n) => n.startsWith("EXP-") && n.endsWith(".html"))
    .sort()[0];
  if (!labPost) throw new Error("no EXP lab post in site/lab/posts");
  const brief = path.join(repoRoot, "site/briefings");
  const briefDate = fs
    .readdirSync(brief)
    .filter((n) => /^\d{4}-\d{2}-\d{2}\.html$/.test(n))
    .sort()
    .reverse()[0]
    ?.replace(/\.html$/, "");
  if (!briefDate) throw new Error("no brief html in site/briefings");
  return [
    { rel: "site/index.html", slug: "ai-home" },
    { rel: "site/skills/index.html", slug: "skills-home" },
    { rel: `site/lab/posts/${labPost}`, slug: "lab-post" },
    { rel: `site/briefings/${briefDate}.html`, slug: "daily-brief" },
  ];
}

async function assertStylesheet(page: import("playwright").Page, rel: string): Promise<void> {
  const ok = await page.evaluate(() => {
    const link = document.querySelector('link[rel="stylesheet"]') as HTMLLinkElement | null;
    if (!link?.href || !/style\.[a-f0-9]+\.css/i.test(link.href)) return false;
    return link.sheet != null || getComputedStyle(document.body).fontFamily.length > 0;
  });
  if (!ok) throw new Error(`stylesheet not loaded for ${rel}`);
}

async function assertVisibleH1(page: import("playwright").Page, rel: string): Promise<void> {
  const result = await page.evaluate(() => {
    const h1s = Array.from(document.querySelectorAll("h1"));
    if (h1s.length !== 1) return { ok: false, reason: `h1 count ${h1s.length}` };
    const h1 = h1s[0]!;
    if (h1.classList.contains("sr-only")) return { ok: false, reason: "h1 is sr-only" };
    const rect = h1.getBoundingClientRect();
    const style = getComputedStyle(h1);
    const hidden =
      style.visibility === "hidden" ||
      style.display === "none" ||
      rect.width < 2 ||
      rect.height < 2;
    if (hidden) return { ok: false, reason: "h1 not visible" };
    return { ok: true, reason: "" };
  });
  if (!result.ok) throw new Error(`${rel}: ${result.reason}`);
}

async function captureSet(
  pages: PageSpec[],
  outDir: string,
  prefix: string,
): Promise<string[]> {
  await fs.promises.mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const saved: string[] = [];
  for (const spec of pages) {
    const abs = path.join(repoRoot, spec.rel);
    if (!fs.existsSync(abs)) throw new Error(`missing ${spec.rel}`);
    const fileUrl = `file://${abs}`;
    for (const vp of VIEWPORTS) {
      for (const mode of ["light", "dark"] as const) {
        const page = await browser.newPage({ viewport: { width: vp.width, height: 900 } });
        await page.goto(fileUrl, { waitUntil: "networkidle" });
        await assertStylesheet(page, spec.rel);
        await page.evaluate((dark) => {
          document.documentElement.classList.toggle("dark", dark);
        }, mode === "dark");
        await assertVisibleH1(page, spec.rel);
        const header = page.locator("header").first();
        const filename = `${prefix}-${spec.slug}-${vp.label}-${mode}.png`;
        const outPath = path.join(outDir, filename);
        await header.screenshot({ path: outPath });
        saved.push(outPath);
        await page.close();
      }
    }
  }
  await browser.close();
  return saved;
}

function pixelDiff(pathA: string, pathB: string, diffPath: string): number {
  const imgA = PNG.sync.read(fs.readFileSync(pathA));
  const imgB = PNG.sync.read(fs.readFileSync(pathB));
  if (imgA.width !== imgB.width || imgA.height !== imgB.height) {
    throw new Error(`size mismatch ${path.basename(pathA)}: ${imgA.width}x${imgA.height} vs ${imgB.width}x${imgB.height}`);
  }
  const diff = new PNG({ width: imgA.width, height: imgA.height });
  const mismatched = pixelmatch(imgA.data, imgB.data, diff.data, imgA.width, imgA.height, {
    threshold: 0.1,
  });
  fs.mkdirSync(path.dirname(diffPath), { recursive: true });
  fs.writeFileSync(diffPath, PNG.sync.write(diff));
  return mismatched;
}

function buildMainWorktree(): string {
  const wt = path.join(repoRoot, ".worktrees", "main-header-baseline");
  fs.mkdirSync(path.dirname(wt), { recursive: true });
  if (!fs.existsSync(path.join(wt, ".git"))) {
    execSync(`git worktree add -f "${wt}" origin/main`, { cwd: repoRoot, stdio: "inherit" });
  } else {
    execSync(`git -C "${wt}" fetch origin main && git -C "${wt}" reset --hard origin/main`, {
      stdio: "inherit",
    });
  }
  execSync("npm ci", { cwd: wt, stdio: "inherit" });
  execSync(
    "POSTHOG_KEY=phc_ci_lab_analytics_gate_only DIGEST_AS_OF_DATE=2026-10-19 SITE_LANDING_LAYOUT_V2=1 npm run build:pages",
    { cwd: wt, stdio: "inherit" },
  );
  return wt;
}

async function main(): Promise<void> {
  const pages = resolvePages();
  const buildEnv =
    "POSTHOG_KEY=phc_ci_lab_analytics_gate_only DIGEST_AS_OF_DATE=2026-10-19 SITE_LANDING_LAYOUT_V2=1 npm run build:pages";
  execSync(buildEnv, { cwd: repoRoot, stdio: "inherit" });

  console.log("capture: after (SEO branch, div.site-brand logo)");
  const afterShots = await captureSet(pages, afterDir, "after");

  console.log("capture: building main baseline worktree");
  const mainWt = buildMainWorktree();

  await captureFromRoot(mainWt, pages, beforeDir, "before");

  await fs.promises.mkdir(diffDir, { recursive: true });
  const diffReport: Array<{ file: string; mismatchedPixels: number }> = [];
  let failed = false;
  for (const afterPath of afterShots) {
    const base = path.basename(afterPath).replace(/^after-/, "before-");
    const beforePath = path.join(beforeDir, base);
    const diffPath = path.join(diffDir, base.replace(".png", "-diff.png"));
    if (!fs.existsSync(beforePath)) {
      console.error(`missing before pair ${beforePath}`);
      failed = true;
      continue;
    }
    const mismatched = pixelDiff(beforePath, afterPath, diffPath);
    diffReport.push({ file: base, mismatchedPixels: mismatched });
    console.log(`  diff ${base}: ${mismatched} px`);
    if (mismatched > 0) failed = true;
  }

  const reportPath = path.join(artifactRoot, "header-pixel-diff-report.json");
  await fs.promises.writeFile(reportPath, `${JSON.stringify({ diffReport }, null, 2)}\n`);

  if (failed) {
    console.error("capture: header pixel diff non-zero (logo h1 vs div should match)");
    process.exit(1);
  }
  console.log("capture: header pixel diffs all zero");
  console.log(`artifacts: ${artifactRoot}`);
}

async function captureFromRoot(
  siteRoot: string,
  pages: PageSpec[],
  outDir: string,
  prefix: string,
): Promise<void> {
  await fs.promises.mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  for (const spec of pages) {
    const abs = path.join(siteRoot, spec.rel.replace(/^site\//, "site/"));
    const fileUrl = `file://${abs}`;
    for (const vp of VIEWPORTS) {
      for (const mode of ["light", "dark"] as const) {
        const page = await browser.newPage({ viewport: { width: vp.width, height: 900 } });
        await page.goto(fileUrl, { waitUntil: "networkidle" });
        await assertStylesheet(page, spec.rel);
        await page.evaluate((dark) => {
          document.documentElement.classList.toggle("dark", dark);
        }, mode === "dark");
        const header = page.locator("header").first();
        const filename = `${prefix}-${spec.slug}-${vp.label}-${mode}.png`;
        await header.screenshot({ path: path.join(outDir, filename) });
        await page.close();
      }
    }
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
