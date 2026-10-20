import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  findLabProseBacktickViolations,
  findLabProseFontViolations,
  findLabProseInlineSpacingViolations,
} from "./lab/lab-format.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function listLabProsePages(): string[] {
  const pages = ["site/lab/index.html", "site/lab/methodology.html"];
  const postsDir = path.join(repoRoot, "site/lab/posts");
  if (fs.existsSync(postsDir)) {
    for (const name of fs.readdirSync(postsDir)) {
      if (name.endsWith(".html")) pages.push(path.join("site/lab/posts", name));
    }
  }
  return pages.sort();
}

function main(): void {
  let failed = false;
  for (const rel of listLabProsePages()) {
    const abs = path.join(repoRoot, rel);
    if (!fs.existsSync(abs)) {
      console.error(`missing ${rel} (run npm run build:pages first)`);
      failed = true;
      continue;
    }
    const html = fs.readFileSync(abs, "utf8");
    const spacingViolations = findLabProseInlineSpacingViolations(html);
    if (spacingViolations.length > 0) {
      failed = true;
      console.error(`verify: lab prose inline spacing failed on ${rel} (UX26):`);
      for (const v of spacingViolations.slice(0, 20)) console.error(`  ${v}`);
    }
    const backtickViolations = findLabProseBacktickViolations(html);
    if (backtickViolations.length > 0) {
      failed = true;
      console.error(`verify: lab prose literal backtick failed on ${rel} (UX26 UX35):`);
      for (const v of backtickViolations.slice(0, 20)) console.error(`  ${v}`);
    }
    const fontViolations = findLabProseFontViolations(html, rel);
    if (fontViolations.length > 0) {
      failed = true;
      console.error(`verify: lab prose font failed on ${rel} (UX26 UX46):`);
      for (const v of fontViolations.slice(0, 20)) console.error(`  ${v}`);
    }
  }
  if (failed) process.exit(1);
  console.log("verify: lab prose inline spacing ok");
}

main();
