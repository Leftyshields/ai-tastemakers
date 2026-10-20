import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { findLabProseInlineSpacingViolations } from "./lab/lab-format.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LAB_PROSE_PAGES = ["site/lab/index.html", "site/lab/about.html"];

function main(): void {
  let failed = false;
  for (const rel of LAB_PROSE_PAGES) {
    const abs = path.join(repoRoot, rel);
    if (!fs.existsSync(abs)) {
      console.error(`missing ${rel} (run npm run build:pages first)`);
      failed = true;
      continue;
    }
    const html = fs.readFileSync(abs, "utf8");
    const violations = findLabProseInlineSpacingViolations(html);
    if (violations.length > 0) {
      failed = true;
      console.error(`verify: lab prose inline spacing failed on ${rel} (UX26):`);
      for (const v of violations.slice(0, 20)) console.error(`  ${v}`);
    }
  }
  if (failed) process.exit(1);
  console.log("verify: lab prose inline spacing ok");
}

main();
