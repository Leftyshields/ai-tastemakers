import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  findLabTestedBadgeViolations,
  ponytailDoneFixturePresent,
  resolveBadgeHrefForBuiltPage,
} from "./lab/lab-tested-badge.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.join(repoRoot, "site");

function listBriefingHtml(): string[] {
  const out: string[] = [];
  for (const rel of ["briefings", path.join("skills", "briefings")]) {
    const dir = path.join(siteRoot, rel);
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      if (name.endsWith(".html")) out.push(path.join(dir, name));
    }
  }
  return out.sort();
}

function main(): void {
  if (!fs.existsSync(siteRoot)) {
    console.error("missing site/ (run npm run build:pages first)");
    process.exit(1);
  }

  let failed = false;
  let badgePages = 0;
  let ponytailSeen = false;

  for (const abs of listBriefingHtml()) {
    const html = fs.readFileSync(abs, "utf8");
    if (html.includes("lab-tested-badge")) badgePages += 1;
    if (ponytailDoneFixturePresent(html)) ponytailSeen = true;

    const violations = findLabTestedBadgeViolations(html, abs, repoRoot, (badge, pageAbs) =>
      resolveBadgeHrefForBuiltPage(badge, pageAbs, repoRoot, siteRoot),
    );
    if (violations.length > 0) {
      failed = true;
      const rel = path.relative(repoRoot, abs);
      console.error(`lab tested badge violations in ${rel}:`);
      for (const v of violations) console.error(`  ${v}`);
    }
  }

  if (!ponytailSeen) {
    failed = true;
    console.error(
      "missing Ponytail Done fixture: expected DietrichGebert/ponytail with EXP-20260802-ponytail-narration-skills badge on a built briefing page",
    );
  }

  if (failed) process.exit(1);
  console.log(`verify: lab tested badges ok (${badgePages} page(s) with badges; Ponytail fixture present)`);
}

const isMain =
  typeof process.argv[1] === "string" &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) main();
