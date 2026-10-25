import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { findLabPostHeaderOrderViolations } from "./lab/lab-post-header.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function listPostHtml(): string[] {
  const dir = path.join(repoRoot, "site/lab/posts");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((n) => n.startsWith("EXP-") && n.endsWith(".html"))
    .map((n) => path.join(dir, n))
    .sort();
}

function main(): void {
  const pages = listPostHtml();
  if (pages.length === 0) {
    console.error("missing site/lab/posts EXP pages (run npm run build:pages first)");
    process.exit(1);
  }
  let failed = false;
  for (const abs of pages) {
    const rel = path.relative(repoRoot, abs);
    const html = fs.readFileSync(abs, "utf8");
    const violations = findLabPostHeaderOrderViolations(html, rel);
    if (violations.length > 0) {
      failed = true;
      console.error(`verify: lab post header order failed on ${rel}:`);
      for (const v of violations) console.error(`  ${v}`);
    }
  }
  if (failed) process.exit(1);
  console.log(`verify: lab post header order ok (${pages.length} experiment post(s))`);
}

const isMain =
  typeof process.argv[1] === "string" &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) main();
