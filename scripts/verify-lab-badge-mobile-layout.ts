/**
 * UX45: Lab badge action row at 390px — buttons stay shrink-0; wrap below GitHub when needed.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";
import {
  LAB_BADGE_RUNNING_FIXTURE_REPO,
  renderRunningBadgeFixtureCard,
} from "./lab/lab-tested-badge.js";
import { renderDigestRepoCard } from "../src/tastemaker/pages/brief-cards.js";
import { findBuiltStylesheet } from "./site-css-path.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.join(repoRoot, "site");
const FIXTURE_NAME = "lab-badge-action-row.html";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildActionRowFixturePage(stylesheetHref: string): string {
  const card = renderRunningBadgeFixtureCard(repoRoot, escapeHtml, (repo, ctx) =>
    renderDigestRepoCard(repo, "oss", "2026-10-19", "delta_7d", escapeHtml, ctx),
  );

  if (!card.includes("digest-repo-card__actions")) {
    throw new Error("Running fixture missing digest-repo-card__actions");
  }
  if (!card.includes(LAB_BADGE_RUNNING_FIXTURE_REPO)) {
    throw new Error("Running fixture missing placeholder repo name");
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="${stylesheetHref}">
</head>
<body class="min-h-screen bg-stone-100 p-4 dark">
  <div class="mx-auto w-full max-w-[390px]">${card}</div>
</body>
</html>`;
}

async function main(): Promise<void> {
  let cssPath: string;
  try {
    cssPath = findBuiltStylesheet(path.join(siteRoot, "assets"));
  } catch {
    console.error("missing built stylesheet under site/assets (run npm run build:pages first)");
    process.exit(1);
  }

  const fixtureDir = path.join(repoRoot, ".cache", "lab-badge-fixtures");
  fs.mkdirSync(fixtureDir, { recursive: true });
  const stylesheetHref = path
    .relative(fixtureDir, cssPath)
    .split(path.sep)
    .join("/");
  const fixtureAbs = path.join(fixtureDir, FIXTURE_NAME);
  fs.writeFileSync(fixtureAbs, buildActionRowFixturePage(stylesheetHref), "utf8");

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
  await page.goto(`file://${fixtureAbs}`, { waitUntil: "networkidle" });

  const layout = await page.evaluate(() => {
    const card = document.querySelector(".digest-repo-card");
    const actions = document.querySelector(".digest-repo-card__actions");
    const github = document.querySelector(".digest-repo-card__cta");
    const lab = document.querySelector(".digest-repo-card__lab-badge");
    const heading = document.querySelector(".digest-repo-card__heading");
    if (!card || !actions || !github || !lab || !heading) {
      return { ok: false, reason: "missing action row nodes" };
    }
    if (heading.querySelector(".lab-tested-badge")) {
      return { ok: false, reason: "badge must not appear in title row" };
    }
    const cardRect = card.getBoundingClientRect();
    const ghRect = github.getBoundingClientRect();
    const labRect = lab.getBoundingClientRect();
    const cardInnerWidth = cardRect.width - 40;
    const ghFullWidth = ghRect.width >= cardInnerWidth - 2;
    const labFullWidth = labRect.width >= cardInnerWidth - 2;
    const sameRow = Math.abs(ghRect.top - labRect.top) < 4;
    let rowGapOk = true;
    if (sameRow) {
      rowGapOk = labRect.left - ghRect.right >= 6 && labRect.left - ghRect.right <= 12;
    } else {
      rowGapOk = labRect.top - ghRect.bottom >= 6 && labRect.top - ghRect.bottom <= 12;
      rowGapOk = rowGapOk && labRect.left <= ghRect.left + 2;
    }
    return {
      ok: !ghFullWidth && !labFullWidth && rowGapOk,
      ghFullWidth,
      labFullWidth,
      sameRow,
      rowGapOk,
    };
  });

  await browser.close();

  if (!layout.ok) {
    console.error("verify: lab badge action row layout failed at 390px:", layout);
    process.exit(1);
  }

  console.log(`verify: lab badge action row layout ok (${FIXTURE_NAME} at 390px)`);
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
