/**
 * Lab pages: no first-person we / our / us in rendered HTML under site/lab/ (after build:pages).
 * Excludes Brian's LinkedIn post (first-person by design).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { findLabPostFirstPersonSentences } from "./lab/lab-format.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const labSiteDir = path.join(repoRoot, "site", "lab");

const EXCLUDED_REL = path.join("site", "lab", "posts", "linkedin-pm-experiment-in-public.html");

function listLabHtmlPages(dir: string, base = labSiteDir): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name);
    const st = fs.statSync(abs);
    if (st.isDirectory()) {
      out.push(...listLabHtmlPages(abs, base));
    } else if (name.endsWith(".html")) {
      out.push(abs);
    }
  }
  return out.sort();
}

function main(): void {
  if (!fs.existsSync(labSiteDir)) {
    console.error("missing site/lab (run npm run build:pages first)");
    process.exit(1);
  }
  const pages = listLabHtmlPages(labSiteDir).filter(
    (abs) => path.relative(repoRoot, abs) !== EXCLUDED_REL,
  );
  if (pages.length === 0) {
    console.error("no lab HTML pages to verify");
    process.exit(1);
  }

  let failed = false;
  for (const abs of pages) {
    const rel = path.relative(repoRoot, abs);
    const html = fs.readFileSync(abs, "utf8");
    const sentences = findLabPostFirstPersonSentences(html);
    for (const sentence of sentences) {
      failed = true;
      console.error(`${rel}: ${sentence}`);
    }
  }
  if (failed) process.exit(1);
  console.log(`verify: lab first-person copy ok (${pages.length} page(s))`);
}

main();
