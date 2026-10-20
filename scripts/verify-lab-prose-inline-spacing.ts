import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { findLabProseInlineSpacingViolations } from "./lab/lab-format.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const labIndex = path.join(repoRoot, "site/lab/index.html");

function main(): void {
  if (!fs.existsSync(labIndex)) {
    console.error("missing site/lab/index.html (run npm run build:pages first)");
    process.exit(1);
  }
  const html = fs.readFileSync(labIndex, "utf8");
  const violations = findLabProseInlineSpacingViolations(html);
  if (violations.length > 0) {
    console.error("verify: lab prose inline spacing failed (UX26):");
    for (const v of violations.slice(0, 20)) console.error(`  ${v}`);
    if (violations.length > 20) console.error(`  …and ${violations.length - 20} more`);
    process.exit(1);
  }
  console.log("verify: lab prose inline spacing ok");
}

main();
