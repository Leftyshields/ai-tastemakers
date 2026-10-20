import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildLabBadgeLookup,
  labBadgeForRepo,
  normalizeOwnerRepoKey,
  renderLabTestedBadgeEmailButtonHtml,
  renderLabTestedBadgePagesHtml,
  renderRunningBadgeFixtureCard,
  resolveLabBadgeHref,
  runningBadgeFixtureMarkupValid,
} from "../../../scripts/lab/lab-tested-badge.js";
import { loadExperimentsFile } from "../../../scripts/lab/validate-experiments.js";
import { renderDigestRepoCard } from "../pages/brief-cards.js";
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

  it("links done experiments to lab history anchor", () => {
    const lookup = buildLabBadgeLookup(loadExperimentsFile(repoRoot).experiments);
    const badge = labBadgeForRepo(lookup, "DietrichGebert/ponytail")!;
    const href = resolveLabBadgeHref(badge, "../lab/", []);
    expect(href).toBe("../lab/index.html#lab-exp-EXP-20260802-ponytail-narration-skills");
    const html = renderLabTestedBadgePagesHtml(badge, href, escapeHtml);
    expect(html).toContain('aria-label="Lab tested:');
    expect(html).toContain('stroke="currentColor"');
  });

  it("tracks lab_badge_click without repo_click on badge taps", () => {
    const prev = process.env.POSTHOG_KEY;
    process.env.POSTHOG_KEY = "phc_ci_lab_analytics_gate_only";
    expect(labBadgeClickTrackingScript()).toContain("lab_badge_click");
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

  it("renders outlined lab badge email button beside GitHub", () => {
    const lookup = buildLabBadgeLookup(loadExperimentsFile(repoRoot).experiments);
    const badge = labBadgeForRepo(lookup, "DietrichGebert/ponytail")!;
    const btn = renderLabTestedBadgeEmailButtonHtml(badge, "https://example.com/go", escapeHtml);
    expect(btn).toContain("padding:0 0 0 8px");
    expect(btn).toContain("Lab tested");
    expect(btn).not.toContain("&#9879;");
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
      "https://example.com/app",
      undefined,
      "oss",
      lookup,
    );
    expect(emailHtml).toContain("View on GitHub");
    expect(emailHtml).toContain("event=lab_badge_click");
    expect(emailHtml).not.toMatch(/DietrichGebert\/ponytail<\/a>[^<]*Lab tested/);
  });
});
