/**
 * UX47: Plain ai-tastemakers repo link on run-no-source posts at 390px — one tight inline
 * link, wrap after slash only, width fits text (no flex stretch gap).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const POSTS = [
  "EXP-20260628-web-enrich-skills",
  "EXP-20260715-soft-dedup-diversity-skills",
].map((id) => path.join(repoRoot, "site/lab/posts", `${id}.html`));

async function checkPost(absPath: string): Promise<{ ok: boolean; reason?: string; detail?: unknown }> {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    colorScheme: "dark",
  });
  await page.goto(`file://${absPath}`, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    document.documentElement.classList.add("dark");
  });

  const result = await page.evaluate(() => {
    const link = document.querySelector(".lab-post-header__repo-link");
    if (!link) return { ok: false, reason: "missing lab-post-header__repo-link" };
    const owner = link.querySelector(".lab-post-split-chip__owner-line");
    const name = link.querySelector(".lab-post-split-chip__name");
    if (!owner || !name) return { ok: false, reason: "missing owner/name spans" };

    const linkRect = link.getBoundingClientRect();
    const ownerRect = owner.getBoundingClientRect();
    const nameRect = name.getBoundingClientRect();
    const style = getComputedStyle(link);

    const range = document.createRange();
    range.selectNodeContents(link);
    const textRect = range.getBoundingClientRect();

    const padX =
      parseFloat(style.paddingLeft) +
      parseFloat(style.paddingRight) +
      parseFloat(style.borderLeftWidth) +
      parseFloat(style.borderRightWidth);

    const maxAllowed = textRect.width + padX + 2;
    const widthFitsText = linkRect.width <= maxAllowed;

    const hdr = document.querySelector(".lab-post-header__hdr");
    const hdrWidth = hdr?.getBoundingClientRect().width ?? 0;
    const notStretched = linkRect.width < hdrWidth * 0.92;

    const sameRow = Math.abs(ownerRect.top - nameRect.top) < 2;
    const gapIfSameRow = sameRow ? nameRect.left - ownerRect.right : 0;
    const wrappedAfterSlash =
      !sameRow && nameRect.top >= ownerRect.bottom - 2 && nameRect.left <= ownerRect.left + 4;
    const tightInline = (sameRow && gapIfSameRow < 8) || wrappedAfterSlash;

    const wbr = link.querySelector("wbr");
    const wbrHidden = wbr ? getComputedStyle(wbr).display === "none" : false;

    const anchorCount = link.closest(".lab-post-header__hdr")?.querySelectorAll("a.lab-post-header__repo-link").length ?? 0;

    return {
      ok:
        widthFitsText &&
        notStretched &&
        tightInline &&
        !wbrHidden &&
        anchorCount === 1,
      widthFitsText,
      notStretched,
      tightInline,
      wbrHidden,
      anchorCount,
      linkWidth: linkRect.width,
      textWidth: textRect.width,
      hdrWidth,
      padX,
      gapIfSameRow,
      sameRow,
    };
  });

  await browser.close();
  return result;
}

async function main(): Promise<void> {
  for (const p of POSTS) {
    if (!fs.existsSync(p)) {
      console.error(`missing ${p} (run npm run build:pages first)`);
      process.exit(1);
    }
  }

  for (const abs of POSTS) {
    const rel = path.relative(repoRoot, abs);
    const result = await checkPost(abs);
    if (!result.ok) {
      console.error(`verify: plain repo link mobile failed on ${rel}:`, result);
      process.exit(1);
    }
  }

  console.log(
    `verify: plain repo link mobile ok (390px, ${POSTS.length} run-no-source post(s), width fits text)`,
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
