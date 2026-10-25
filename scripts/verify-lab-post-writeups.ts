/**
 * UX43 (write-ups): rendered lab/posts/*.html — no literal backticks; tables wrapped for mobile.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  findLabPostBacktickViolations,
  findLabPostTableWrapViolations,
} from "./lab/lab-format.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const postsDir = path.join(repoRoot, "site", "lab", "posts");

function main(): void {
  if (!fs.existsSync(postsDir)) {
    console.error("missing site/lab/posts (run npm run build:pages first)");
    process.exit(1);
  }
  const pages = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".html") && f !== "index.html")
    .sort();
  if (pages.length === 0) {
    console.error("no lab post HTML pages to verify");
    process.exit(1);
  }

  let failed = false;
  for (const name of pages) {
    const rel = path.join("site/lab/posts", name);
    const html = fs.readFileSync(path.join(postsDir, name), "utf8");
    for (const v of findLabPostBacktickViolations(html, rel)) {
      failed = true;
      console.error(`verify: lab post write-up failed (UX43): ${v}`);
    }
    for (const v of findLabPostTableWrapViolations(html, rel)) {
      failed = true;
      console.error(`verify: lab post write-up failed (UX43): ${v}`);
    }
  }
  if (failed) process.exit(1);
  console.log(`verify: lab post write-ups ok (${pages.length} page(s), UX43)`);
}

main();
