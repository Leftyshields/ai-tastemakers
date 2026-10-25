import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildLabBadgeLookup,
  labBadgeForRepo,
  normalizeOwnerRepoKey,
  labBadgeEmailFlaskSrc,
  renderLabTestedBadgeEmailPillCellHtml,
  renderLabTestedBadgeEmailPillHtml,
  renderLabTestedBadgePagesHtml,
  renderRunningBadgeFixtureCard,
  resolveLabBadgeHref,
  runningBadgeFixtureMarkupValid,
} from "../../../scripts/lab/lab-tested-badge.js";
import { loadExperimentsFile } from "../../../scripts/lab/validate-experiments.js";
import { renderDigestRepoCard } from "../pages/brief-cards.js";
import { DEFAULT_DIGEST_SITE_URL, digestSiteUrlFromEnv } from "../config.js";
import { renderDigestEmailHtml } from "../email/html.js";
import { labBadgeClickTrackingScript, digestRepoClickTrackingScript } from "../../../scripts/edition-pages.js";
import { buildLabBadgeEmailGoUrl } from "../analytics/repo-click.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function escapeHtml(t: string): string {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

describe("UX45 lab tested badge", () => {
  it("matches owner/repo exactly with lowercase keys", () => {
    const lookup = buildLabBadgeLookup(loadExperimentsFile(repoRoot).experiments);
    const badge = labBadgeForRepo(lookup, "DietrichGebert/ponytail");
    expect(badge?.id).toBe("EXP-20260802-ponytail-narration-skills");
    expect(badge?.status).toBe("done");
    expect(normalizeOwnerRepoKey("DietrichGebert/ponytail")).toBe("dietrichgebert/ponytail");
    expect(labBadgeForRepo(lookup, "Other/ponytail")).toBeNull();
  });

  it("renders badge in footer action row on top 10 repo cards only", () => {
    const lookup = buildLabBadgeLookup(loadExperimentsFile(repoRoot).experiments);
    const ctx = { lookup, labPrefix: "../lab/", writeupPostIds: [] as string[] };
    const withBadge = renderDigestRepoCard(
      {
        rank: 1,
        full_name: "DietrichGebert/ponytail",
        html_url: "https://github.com/DietrichGebert/ponytail",
        stars: 1,
        stars_gained_7d: 1,
        topics: [],
        language: "TS",
        brief: "x",
        pushed_at: "2026-01-01",
      },
      "oss",
      "2026-08-22",
      "delta_7d",
      escapeHtml,
      ctx,
    );
    expect(withBadge).toContain("lab-tested-badge--action");
    expect(withBadge).toContain("digest-repo-card__actions");
    expect(withBadge).toContain("Lab tested");
    expect(withBadge).not.toContain("lab-tested-badge--pinned");
    const headingEnd = withBadge.indexOf("</h2>");
    const badgeIdx = withBadge.indexOf("lab-tested-badge");
    expect(badgeIdx).toBeGreaterThan(headingEnd);

    const rank11 = renderDigestRepoCard(
      {
        rank: 11,
        full_name: "DietrichGebert/ponytail",
        html_url: "https://github.com/DietrichGebert/ponytail",
        stars: 1,
        stars_gained_7d: 1,
        topics: [],
        language: "TS",
        brief: "x",
        pushed_at: "2026-01-01",
      },
      "oss",
      "2026-08-22",
      "delta_7d",
      escapeHtml,
      ctx,
    );
    expect(rank11).not.toContain("lab-tested-badge");
  });

  it("Running fixture renders In the Lab beside GitHub CTA", () => {
    const html = renderRunningBadgeFixtureCard(repoRoot, escapeHtml, (repo, ctx) =>
      renderDigestRepoCard(repo, "oss", "2026-10-19", "delta_7d", escapeHtml, ctx),
    );
    expect(runningBadgeFixtureMarkupValid(html)).toBe(true);
    expect(html).toContain("lab-tested-badge--running");
  });

  it("links done experiments to lab history anchor when no write up", () => {
    const lookup = buildLabBadgeLookup(loadExperimentsFile(repoRoot).experiments);
    const badge = labBadgeForRepo(lookup, "DietrichGebert/ponytail")!;
    const href = resolveLabBadgeHref(badge, "../lab/", []);
    expect(href).toBe("../lab/index.html#lab-exp-EXP-20260802-ponytail-narration-skills");
    const html = renderLabTestedBadgePagesHtml(badge, href, escapeHtml);
    expect(html).toContain('aria-label="Lab tested: read the');
    expect(html).not.toContain('title="');
    expect(html).toContain('stroke="currentColor"');
  });

  it("links running experiments to lab-exp anchor when no write up", () => {
    const href = resolveLabBadgeHref(
      {
        id: "EXP-20260913-humanizer-polish-skills",
        title: "Humanizer",
        status: "running",
        repoKey: "blader/humanizer",
      },
      "../lab/",
      [],
    );
    expect(href).toBe("../lab/index.html#lab-exp-EXP-20260913-humanizer-polish-skills");
  });

  it("links to write up post when markdown exists", () => {
    const lookup = buildLabBadgeLookup(loadExperimentsFile(repoRoot).experiments);
    const badge = labBadgeForRepo(lookup, "DietrichGebert/ponytail")!;
    const writeups = ["EXP-20260802-ponytail-narration-skills"];
    expect(resolveLabBadgeHref(badge, "../lab/", writeups)).toBe(
      "../lab/posts/EXP-20260802-ponytail-narration-skills.html",
    );
  });

  it("tracks lab_badge_click without repo_click on badge taps", () => {
    const prev = process.env.POSTHOG_KEY;
    process.env.POSTHOG_KEY = "phc_ci_lab_analytics_gate_only";
    expect(labBadgeClickTrackingScript()).toContain("lab_badge_click");
    expect(labBadgeClickTrackingScript()).toContain("experiment_id");
    expect(labBadgeClickTrackingScript()).toContain('surface: "pages"');
    expect(labBadgeClickTrackingScript()).toContain('channel: "pages"');
    expect(labBadgeClickTrackingScript()).toContain("source_repo");
    expect(digestRepoClickTrackingScript()).toContain('closest("a.lab-tested-badge")');
    process.env.POSTHOG_KEY = prev;
  });

  it("builds email go URL for lab badge clicks", () => {
    const url = buildLabBadgeEmailGoUrl("https://example.com/app", {
      repo: "DietrichGebert/ponytail",
      section: "oss",
      rank: 1,
      expId: "EXP-20260802-ponytail-narration-skills",
      status: "done",
      digestDate: "2026-08-22",
      destPath: "/app/lab/index.html#lab-exp-EXP-20260802-ponytail-narration-skills",
    });
    expect(url).toContain("event=lab_badge_click");
    expect(url).toContain("channel=email");
    expect(url).toContain("exp=EXP-20260802-ponytail-narration-skills");
  });

  it("renders lab badge email status pill beside GitHub", () => {
    const lookup = buildLabBadgeLookup(loadExperimentsFile(repoRoot).experiments);
    const badge = labBadgeForRepo(lookup, "DietrichGebert/ponytail")!;
    const siteUrl = "https://example.com/app";
    const pill = renderLabTestedBadgeEmailPillHtml(badge, "https://example.com/go", siteUrl, escapeHtml);
    const cell = renderLabTestedBadgeEmailPillCellHtml(badge, "https://example.com/go", siteUrl, escapeHtml);
    expect(cell).toContain("padding:0 0 0 8px");
    expect(pill).toContain("border-radius:9999px");
    expect(pill).toContain("Lab tested");
    expect(pill).toContain(labBadgeEmailFlaskSrc(siteUrl));
    expect(pill).not.toContain("&#9879;");
    const emailHtml = renderDigestEmailHtml(
      {
        schema_version: 1,
        run_id: "t",
        generated_at: "2026-08-22T00:00:00Z",
        ranking_mode: "delta_7d",
        topic_queries: [],
        repos: [
          {
            rank: 1,
            full_name: "DietrichGebert/ponytail",
            html_url: "https://github.com/DietrichGebert/ponytail",
            stars: 1,
            stars_gained_7d: 1,
            topics: [],
            language: "TS",
            brief: "Brief",
            pushed_at: "2026-08-22",
          },
        ],
      },
      "2026-08-22",
      DEFAULT_DIGEST_SITE_URL,
      undefined,
      "oss",
      lookup,
    );
    expect(emailHtml).toContain("View on GitHub");
    expect(emailHtml).toContain("event=lab_badge_click");
    expect(emailHtml).not.toMatch(/DietrichGebert\/ponytail<\/a>[^<]*Lab tested/);
    expect(emailHtml).toContain(labBadgeEmailFlaskSrc(DEFAULT_DIGEST_SITE_URL));

    const buttonTd = emailHtml.match(
      /<td[^>]*background-color:\s*#1e40af[^>]*>([\s\S]*?)<\/td>/i,
    )?.[1];
    expect(buttonTd).toBeDefined();
    expect(buttonTd).toContain("View on GitHub");
    expect(buttonTd).not.toContain("Lab tested");
    expect(emailHtml).toMatch(
      /background-color:\s*#1e40af[\s\S]*?<\/td>\s*<td[^>]*>[\s\S]*Lab tested/,
    );
  });

  it("uses production digest site URL from env defaults for flask src", () => {
    const prevDigest = process.env.DIGEST_SITE_URL;
    const prevSite = process.env.SITE_URL;
    delete process.env.DIGEST_SITE_URL;
    delete process.env.SITE_URL;
    expect(digestSiteUrlFromEnv()).toBe(DEFAULT_DIGEST_SITE_URL);
    expect(digestSiteUrlFromEnv()).not.toContain("example.com");
    process.env.DIGEST_SITE_URL = prevDigest;
    process.env.SITE_URL = prevSite;
  });
});
