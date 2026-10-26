import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const HOME_PAGES = ["site/index.html", "site/skills/index.html"];

const RENDERED_INDEX_PAGES = [
  "site/index.html",
  "site/skills/index.html",
  "site/briefings/index.html",
  "site/skills/briefings/index.html",
  "site/weekly/index.html",
  "site/monthly/index.html",
];

function extractHomeMainText(html: string): string {
  const match = html.match(/<div class="home-index-main">([\s\S]*?)<\/div><script>/);
  return match?.[1] ?? "";
}

function stripScriptsAndStyles(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
}

function main(): void {
  let failed = false;

  for (const rel of RENDERED_INDEX_PAGES) {
    const abs = path.join(repoRoot, rel);
    if (!fs.existsSync(abs)) {
      console.error(`missing ${rel} (run SITE_LANDING_LAYOUT_V2=1 npm run build:pages first)`);
      process.exit(1);
    }
    const visible = stripScriptsAndStyles(fs.readFileSync(abs, "utf8"));
    if (/[\u2014]/.test(visible) || /&mdash;/.test(visible)) {
      failed = true;
      console.error(`${rel}: em dash (U+2014 or &mdash;) in rendered index page`);
    }
  }

  for (const rel of HOME_PAGES) {
    const abs = path.join(repoRoot, rel);
    const html = fs.readFileSync(abs, "utf8");
    let block = extractHomeMainText(html);
    block = block.replace(/<section class="sec" aria-labelledby="pk">[\s\S]*?<\/section>/, "");
    const text = block.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (/[\u2014—]/.test(text) || /&mdash;/.test(block)) {
      failed = true;
      console.error(`${rel}: em dash found in home copy`);
    }
    if (/\b(we|our|us)\b/i.test(text)) {
      failed = true;
      console.error(`${rel}: first-person we/our/us found in home copy`);
    }
  }

  if (failed) process.exit(1);
  console.log(
    "verify: home index copy ok (no em dashes on index pages, no we/our/us on homes)",
  );
}

main();
