/**
 * UX45: Lab badge card title must not overflow at 390px; long name fixture includes wbr.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";
import {
  buildLabBadgeLookup,
  labBadgeForRepo,
  normalizeOwnerRepoKey,
} from "./lab/lab-tested-badge.js";
import { loadExperimentsFile } from "./lab/validate-experiments.js";
import {
  formatDigestRepoCardTitleHtml,
  LAB_BADGE_LONG_NAME_FIXTURE,
  renderDigestRepoCard,
} from "../src/tastemaker/pages/brief-cards.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.join(repoRoot, "site");
const FIXTURE_NAME = "lab-badge-long-name.html";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildLongNameFixturePage(stylesheetHref: string): string {
  const lookup = buildLabBadgeLookup(loadExperimentsFile(repoRoot).experiments);
  const ponytail = labBadgeForRepo(lookup, "DietrichGebert/ponytail");
  if (!ponytail) {
    throw new Error("missing Ponytail badge fixture in lab/experiments.json");
  }
  lookup.set(normalizeOwnerRepoKey(LAB_BADGE_LONG_NAME_FIXTURE), {
    ...ponytail,
    repoKey: normalizeOwnerRepoKey(LAB_BADGE_LONG_NAME_FIXTURE),
  });

  const card = renderDigestRepoCard(
    {
      rank: 9,
      full_name: LAB_BADGE_LONG_NAME_FIXTURE,
      html_url: "https://github.com/DietrichGebert/ponytail",
      stars: 100,
      stars_gained_7d: 12,
      topics: ["agents"],
      language: "TS",
      brief: "Fixture",
      pushed_at: "2026-08-22T00:00:00Z",
    },
    "oss",
    "2026-08-22",
    "delta_7d",
    escapeHtml,
    { lookup, labPrefix: "../lab/", writeupPostIds: [] },
  );

  if (!card.includes("<wbr>")) {
    throw new Error("long name fixture missing wbr after owner slash");
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="${stylesheetHref}">
</head>
<body class="min-h-screen bg-stone-100 p-4">
  <div class="mx-auto w-full max-w-[390px]">${card}</div>
</body>
</html>`;
}

async function main(): Promise<void> {
  const cssPath = path.join(siteRoot, "assets", "style.css");
  if (!fs.existsSync(cssPath)) {
    console.error("missing site/assets/style.css (run npm run build:pages first)");
    process.exit(1);
  }

  const titleSnippet = formatDigestRepoCardTitleHtml(LAB_BADGE_LONG_NAME_FIXTURE, escapeHtml);
  if (!titleSnippet.includes("<wbr>")) {
    console.error("verify: long name fixture title missing wbr");
    process.exit(1);
  }

  const fixtureDir = path.join(repoRoot, ".cache", "lab-badge-fixtures");
  fs.mkdirSync(fixtureDir, { recursive: true });
  const stylesheetHref = path
    .relative(fixtureDir, cssPath)
    .split(path.sep)
    .join("/");
  const fixtureAbs = path.join(fixtureDir, FIXTURE_NAME);
  fs.writeFileSync(fixtureAbs, buildLongNameFixturePage(stylesheetHref), "utf8");

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
  await page.goto(`file://${fixtureAbs}`, { waitUntil: "networkidle" });

  const layout = await page.evaluate(() => {
    const card = document.querySelector(".digest-repo-card");
    const titleLink = document.querySelector(".digest-repo-card__title-link");
    const rank = document.querySelector(".digest-repo-card__rank");
    if (!card || !titleLink || !rank) {
      return { ok: false, reason: "missing card title or rank node" };
    }
    const cardRect = card.getBoundingClientRect();
    const linkRect = titleLink.getBoundingClientRect();
    const rankRect = rank.getBoundingClientRect();
    const overflowX =
      linkRect.right > cardRect.right + 0.5 ||
      rankRect.right > cardRect.right + 0.5 ||
      card.scrollWidth > card.clientWidth + 1;
    const rankAlone =
      Math.abs(rankRect.bottom - linkRect.top) > 2 && linkRect.top > rankRect.bottom + 1;
    return {
      ok: !overflowX && !rankAlone,
      overflowX,
      rankAlone,
      hasWbr: titleLink.innerHTML.includes("wbr"),
    };
  });

  await browser.close();

  if (!layout.hasWbr) {
    console.error("verify: long name fixture DOM missing wbr");
    process.exit(1);
  }
  if (!layout.ok) {
    console.error("verify: lab badge mobile layout failed at 390px:", layout);
    process.exit(1);
  }

  console.log(`verify: lab badge mobile layout ok (${FIXTURE_NAME} at 390px)`);
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
