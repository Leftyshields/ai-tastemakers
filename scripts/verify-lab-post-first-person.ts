/**
 * Lab post write-ups: no first-person we / our / us in rendered HTML (site/lab/posts/*.html).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { findLabPostFirstPersonSentences } from "./lab/lab-format.js";

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
    const sentences = findLabPostFirstPersonSentences(html);
    for (const sentence of sentences) {
      failed = true;
      console.error(`${rel}: ${sentence}`);
    }
  }
  if (failed) process.exit(1);
  console.log(`verify: lab post first-person copy ok (${pages.length} post(s))`);
}

main();
