import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { findLabAnalyticsViolations } from "./lab/lab-analytics.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const labRoot = path.join(repoRoot, "site", "lab");

function listLabHtml(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name);
    const st = fs.statSync(abs);
    if (st.isDirectory()) listLabHtml(abs, out);
    else if (name.endsWith(".html")) out.push(abs);
  }
  return out;
}

function main(): void {
  const pages = listLabHtml(labRoot);
  if (pages.length === 0) {
    console.error("verify: no site/lab HTML (run npm run build:pages with POSTHOG_KEY set first)");
    process.exit(1);
  }
  if (!process.env.POSTHOG_KEY?.trim()) {
    console.log(
      "verify: UX42 note. Rebuild uses POSTHOG_KEY from verify:genesis; without a real key, checks markup and lab_link_click wiring only (no live PostHog delivery).",
    );
  }
  let failed = false;
  for (const abs of pages) {
    const rel = path.relative(repoRoot, abs);
    const html = fs.readFileSync(abs, "utf8");
    const violations = findLabAnalyticsViolations(html, rel);
    if (violations.length > 0) {
      failed = true;
      console.error(`verify: lab analytics failed on ${rel} (UX42):`);
      for (const v of violations.slice(0, 20)) console.error(`  ${v}`);
    }
  }
  if (failed) process.exit(1);
  console.log(`verify: lab PostHog and link tracking ok (${pages.length} page(s))`);
}

main();
