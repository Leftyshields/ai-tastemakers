import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { findForbiddenLabCopyViolations } from "./lab/build-lab-public.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const LAB_HTML = [
  "site/lab/index.html",
  "site/lab/about.html",
  "site/lab/tools.html",
  "site/lab/experiments.html",
  "site/lab/token-usage.html",
  "site/lab/shadow-rubric.html",
];

function main(): void {
  let failed = false;
  for (const rel of LAB_HTML) {
    const abs = path.join(repoRoot, rel);
    if (!fs.existsSync(abs)) {
      console.error(`missing rendered lab page: ${rel} (run npm run build:pages first)`);
      failed = true;
      continue;
    }
    const html = fs.readFileSync(abs, "utf8");
    const violations = findForbiddenLabCopyViolations(html);
    if (violations.length > 0) {
      failed = true;
      console.error(`forbidden copy in ${rel}:`);
      for (const v of violations) console.error(`  …${v}…`);
    }
  }
  if (failed) process.exit(1);
  console.log("verify: lab rendered pages copy ok");
}

main();
