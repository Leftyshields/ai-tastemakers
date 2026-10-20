import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { findLabReaderCopyViolations } from "./lab/lab-format.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
function listLabWriteupHtml(): string[] {
  const out: string[] = [];
  const fixed = [
    path.join(repoRoot, "site/lab/methodology.html"),
    path.join(repoRoot, "site/lab/shadow-rubric.html"),
  ];
  for (const abs of fixed) {
    if (fs.existsSync(abs)) out.push(abs);
  }
  const postsDir = path.join(repoRoot, "site/lab/posts");
  if (fs.existsSync(postsDir)) {
    for (const name of fs.readdirSync(postsDir)) {
      if (name.endsWith(".html") && name !== "index.html") {
        out.push(path.join(postsDir, name));
      }
    }
  }
  return out.sort();
}

function main(): void {
  const pages = listLabWriteupHtml();
  if (pages.length === 0) {
    console.error("missing lab write up HTML (run npm run build:pages first)");
    process.exit(1);
  }
  let failed = false;
  for (const abs of pages) {
    const rel = path.relative(repoRoot, abs);
    const html = fs.readFileSync(abs, "utf8");
    const violations = findLabReaderCopyViolations(html, rel);
    if (violations.length > 0) {
      failed = true;
      console.error(`verify: lab reader copy failed on ${rel}:`);
      for (const v of violations) console.error(`  ${v}`);
    }
  }
  if (failed) process.exit(1);
  console.log(`verify: lab write up reader copy ok (${pages.length} write up page(s))`);
}

main();
