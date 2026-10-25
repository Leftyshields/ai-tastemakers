import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { findBadgedExperimentDestinationViolations } from "./lab/lab-tested-badge.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.join(repoRoot, "site");

function main(): void {
  if (!fs.existsSync(siteRoot)) {
    console.error("missing site/ (run npm run build:pages first)");
    process.exit(1);
  }
  const violations = findBadgedExperimentDestinationViolations(repoRoot, siteRoot);
  if (violations.length > 0) {
    console.error("verify: lab badge destinations failed:");
    for (const v of violations) console.error(`  ${v}`);
    process.exit(1);
  }
  console.log("verify: lab badge destinations ok (each badged experiment has post or index anchor)");
}

const isMain =
  typeof process.argv[1] === "string" &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) main();
