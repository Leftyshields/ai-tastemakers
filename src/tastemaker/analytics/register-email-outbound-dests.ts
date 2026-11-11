import path from "node:path";
import { promises as fs } from "node:fs";
import type { Digest, WeeklyReview } from "../types.js";
import { collectDigestRepoAllowlist } from "./digest-allowlist.js";
import {
  digestEmailOutboundContext,
  renderDigestEmailHtml,
} from "../email/html.js";
import {
  renderWeeklyEmailHtml,
  weeklyEmailOutboundContext,
} from "../email/weekly-html.js";
import type { OutboundDestRegistry } from "./outbound-dest-manifest.js";
import { rewriteOutboundLinksInHtml } from "./rewrite-outbound-links.js";

const FIXTURE_DIGEST: Digest = {
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

const FIXTURE_WEEKLY: WeeklyReview = {
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

function collectDestsFromRenderedHtml(html: string, registry: OutboundDestRegistry): void {
  const re = /[?&]event=outbound_link_click(?:&|$)[^"']*[&?]dest=([^"&']+)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    try {
      registry.register(decodeURIComponent(m[1]!.replace(/&amp;/g, "&")));
    } catch {
      registry.register(m[1]!);
    }
  }
}

/** Register outbound dests from email HTML that may not appear on static Pages yet. */
export async function registerEmailOutboundDestsForManifest(
  registry: OutboundDestRegistry,
  repoRoot: string,
  siteBaseUrl: string,
  githubAllowlist?: Record<string, string>,
): Promise<void> {
  const allowlist = githubAllowlist ?? (await collectDigestRepoAllowlist(repoRoot));
  allowlist["acme/demo"] = "https://github.com/acme/demo";
  allowlist["diegosouzapw/OmniRoute"] = "https://github.com/diegosouzapw/OmniRoute";

  const digestHtml = renderDigestEmailHtml(
    FIXTURE_DIGEST,
    "2026-08-16",
    siteBaseUrl,
    undefined,
    "oss",
    undefined,
    allowlist,
    registry,
  );
  collectDestsFromRenderedHtml(digestHtml, registry);

  const weeklyHtml = renderWeeklyEmailHtml(
    FIXTURE_WEEKLY,
    siteBaseUrl,
    undefined,
    allowlist,
    registry,
  );
  collectDestsFromRenderedHtml(weeklyHtml, registry);

  const ossBriefings = path.join(repoRoot, "briefings");
  let dates: string[] = [];
  try {
    dates = (await fs.readdir(ossBriefings))
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort()
      .slice(-3);
  } catch {
    dates = [];
  }

  for (const date of dates) {
    const digestPath = path.join(ossBriefings, date, "digest.json");
    try {
      const digest = JSON.parse(await fs.readFile(digestPath, "utf8")) as Digest;
      const html = renderDigestEmailHtml(
        digest,
        date,
        siteBaseUrl,
        undefined,
        "oss",
        undefined,
        allowlist,
        registry,
      );
      collectDestsFromRenderedHtml(html, registry);
    } catch {
      continue;
    }
  }
}

export function registerDestsFromOutboundGoHtml(html: string, registry: OutboundDestRegistry): void {
  collectDestsFromRenderedHtml(html, registry);
}
