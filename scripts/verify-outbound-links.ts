import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectDigestRepoAllowlist } from "../src/tastemaker/analytics/digest-allowlist.js";
import { OUTBOUND_DEST_MANIFEST_SITE_REL } from "../src/tastemaker/analytics/outbound-email-manifest-guard.js";
import { findUntrackedExternalHrefs } from "../src/tastemaker/analytics/rewrite-outbound-links.js";
import { renderDigestEmailHtml } from "../src/tastemaker/email/html.js";
import { renderWeeklyEmailHtml } from "../src/tastemaker/email/weekly-html.js";
import type { Digest, WeeklyReview } from "../src/tastemaker/types.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = path.join(repoRoot, "site");
const siteBaseUrl =
  process.env.DIGEST_SITE_URL?.trim() || "https://leftyshields.github.io/ai-tastemakers";

function listHtmlFiles(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name);
    const st = fs.statSync(abs);
    if (st.isDirectory()) listHtmlFiles(abs, out);
    else if (name.endsWith(".html")) out.push(abs);
  }
  return out;
}

const sampleDigest: Digest = {
  schema_version: 1,
  ranking_mode: "delta_7d",
  repos: [
    {
      rank: 1,
      full_name: "acme/demo",
      html_url: "https://github.com/acme/demo",
      stars: 100,
      stars_gained_7d: 10,
      topics: ["llm"],
      brief:
        "See [docs](https://example.com/docs) and [repo](https://github.com/acme/demo) for more.",
    },
  ],
};

const sampleWeekly: WeeklyReview = {
  schema_version: 1,
  week_id: "2026-W33",
  week_start: "2026-08-10",
  week_end: "2026-08-16",
  days_covered: { oss: 7, skills: 7 },
  stats: {
    unique_repos: { oss: 1, skills: 1 },
    total_stars_gained: { oss: 10, skills: 5 },
    top_topics: { oss: [], skills: [] },
    repeat_repos: { oss: [], skills: [] },
    cross_edition_overlap: [],
    ranking_modes: ["delta_7d"],
    standouts: { oss: [], skills: [] },
  },
  narrative: { executive: "", generalist: "", statistician: "" },
  email: {
    verdict: "A week.",
    body: "Try [OmniRoute](https://github.com/diegosouzapw/OmniRoute) and [docs](https://example.com/guide).",
  },
  generated_at: "2026-08-16T12:00:00.000Z",
};

async function main(): Promise<void> {
  const allowlist = await collectDigestRepoAllowlist(repoRoot);
  allowlist["acme/demo"] = "https://github.com/acme/demo";

  const failures: string[] = [];
  const htmlFiles = listHtmlFiles(siteDir);
  if (htmlFiles.length === 0) {
    console.error("verify-outbound-links: no site HTML (run build:pages first)");
    process.exit(1);
  }

  const manifestPath = path.join(repoRoot, OUTBOUND_DEST_MANIFEST_SITE_REL);
  if (!fs.existsSync(manifestPath)) {
    console.error(`verify-outbound-links: missing ${OUTBOUND_DEST_MANIFEST_SITE_REL} (run build:pages first)`);
    process.exit(1);
  }

  for (const abs of htmlFiles) {
    const rel = path.relative(repoRoot, abs);
    const html = fs.readFileSync(abs, "utf8");
    const bad = findUntrackedExternalHrefs(html, siteBaseUrl);
    if (bad.length > 0) {
      failures.push(`${rel}: ${bad.slice(0, 3).join(", ")}${bad.length > 3 ? ` (+${bad.length - 3})` : ""}`);
    }
  }

  const digestHtml = renderDigestEmailHtml(
    sampleDigest,
    "2026-08-16",
    siteBaseUrl,
    undefined,
    "oss",
    undefined,
    allowlist,
  );
  for (const href of findUntrackedExternalHrefs(digestHtml, siteBaseUrl)) {
    failures.push(`daily email fixture: ${href}`);
  }

  const weeklyHtml = renderWeeklyEmailHtml(sampleWeekly, siteBaseUrl, undefined, allowlist);
  for (const href of findUntrackedExternalHrefs(weeklyHtml, siteBaseUrl)) {
    failures.push(`weekly email fixture: ${href}`);
  }

  if (failures.length > 0) {
    console.error("verify-outbound-links failed:");
    for (const f of failures.slice(0, 30)) console.error(`  ${f}`);
    process.exit(1);
  }

  console.log(
    `verify-outbound-links ok (${htmlFiles.length} page(s) + daily/weekly email fixtures)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
