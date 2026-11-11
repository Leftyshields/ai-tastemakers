import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOME_PAGES = ["site/index.html", "site/skills/index.html"];

function findUntrackedAnchors(html: string, rel: string): string[] {
  const violations: string[] = [];
  const re = /<a\b[^>]*\shref="([^"]+)"[^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const tag = m[0];
    if (/data-index-cta=/.test(tag) || /data-lab-section=/.test(tag)) continue;
    violations.push(`${rel}: untracked anchor ${tag.slice(0, 100)}…`);
  }
  return violations;
}

function main(): void {
  let failed = false;
  for (const rel of HOME_PAGES) {
    const abs = path.join(repoRoot, rel);
    if (!fs.existsSync(abs)) {
      console.error(`missing ${rel}`);
      failed = true;
      continue;
    }
    const html = fs.readFileSync(abs, "utf8");
    if (!html.includes("homepage_index_click")) {
      console.error(`${rel}: missing homepage_index_click script`);
      failed = true;
    }
    const bad = findUntrackedAnchors(html, rel);
    if (bad.length > 0) {
      failed = true;
      console.error(`verify: home index link tracking failed on ${rel}:`);
      for (const v of bad.slice(0, 15)) console.error(`  ${v}`);
    }
  }
  if (failed) process.exit(1);
  console.log("verify: home index link tracking ok");
}

main();
