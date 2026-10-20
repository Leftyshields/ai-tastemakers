import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildLabPublicFile,
  buildTimelineModel,
  findForbiddenLabCopyViolations,
  renderLabDashboardHtml,
  buildControlPanelSummary,
} from "../../../scripts/lab/build-lab-public.js";
import { formatBacklogDependsOn } from "../../../scripts/lab/lab-backlog-deps.js";
import { colorSchemeHeadScript } from "../../../scripts/edition-pages.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function escapeHtml(t: string): string {
  return t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

describe("Lab dashboard UX copy", () => {
  it("renders without forbidden dashes or arrows outside monospace", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    expect(html).not.toContain("→");
    const violations = findForbiddenLabCopyViolations(html);
    expect(violations).toEqual([]);
  });

  it("UX3 running headline renders without PostHog status sync", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const run = pub.control_panel.running!;
    pub.control_panel.running = {
      ...run,
      metric_current: null,
      metric_daily: [],
      exposure_count: null,
      sample_count: null,
      metric_delta: null,
      progress_pct: null,
      track_status: null,
    };
    pub.status_sync = {
      generated_at: null,
      skipped: true,
      skip_reason: "experiment-status.json missing",
    };
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    const panel = html.match(/id="lab-control-panel"[\s\S]*?<\/section>/)?.[0] ?? "";
    expect(panel).toMatch(/<h2[^>]*>Less AI sounding briefs<\/h2>/);
    expect(panel).toContain("Running");
    expect(panel).toContain("Day 9 of 14");
    expect(panel).toContain("Read window");
    expect(panel).toContain("EXP-20260913-humanizer-polish-skills");
    expect(panel).toContain("<summary");
    expect(panel).not.toMatch(/<summary[^>]*aria-expanded=/);
  });

  it("UX17 control panel shows Testing, Next up, and Last result rows", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    const panel = html.match(/id="lab-control-panel"[\s\S]*?<\/section>/)?.[0] ?? "";
    expect(panel).toContain("Testing");
    expect(panel).toContain("Next up");
    expect(panel).toContain("Last result");
    expect(panel).toContain("Write up");
    const summary = buildControlPanelSummary(pub.experiments);
    expect(summary.testing?.hypothesis.length).toBeGreaterThan(0);
    expect(summary.next_up?.label.length).toBeGreaterThan(0);
  });

  it("includes metric_type and short_hypothesis on every experiment row", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    for (const exp of pub.experiments) {
      expect(exp.success.metric.metric_type).toMatch(/^(editorial|posthog)$/);
      expect(exp.short_hypothesis.length).toBeGreaterThan(0);
      expect(exp.short_hypothesis.length).toBeLessThanOrEqual(120);
    }
  });

  it("UX13 UX15 Gantt desktop markup with legend and focusable rows", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    expect(html).toContain("lab-gantt-legend");
    expect(html).toContain("lab-gantt-row");
    expect(html).toContain("lab-gantt-bar-running");
    expect(html).toContain("lab-gantt-bar-done");
    expect(html).toContain('data-lab-gantt-row');
    expect(html).toContain("lab-timeline-popover");
    expect(html).toContain("z-index: 300");
    expect(html).not.toContain("lab-timeline-label-inside");
    expect(html).toContain("lab-timeline-mobile");
  });

  it("UX18 every timeline row is focusable and popover leads with plain experiment name", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    const timeline = html.match(/id="lab-timeline"[\s\S]*?<\/section>/)?.[0] ?? "";
    const rowTags = timeline.match(/<div class="lab-gantt-row(?:\s|")[^>]*>/g) ?? [];
    expect(rowTags.length).toBeGreaterThan(0);
    for (const tag of rowTags) {
      expect(tag).toContain('tabindex="0"');
    }
    const experimentRows =
      timeline.match(
        /<div class="lab-gantt-row[^"]*"[^>]*data-lab-gantt-row[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g,
      ) ?? [];
    expect(experimentRows.length).toBeGreaterThan(0);
    for (const row of experimentRows) {
      const plainName = row.match(/class="lab-gantt-name">([^<]+)</)?.[1]?.trim();
      expect(plainName).toBeTruthy();
      expect(plainName).not.toMatch(/^EXP-/);
      const popoverBlock = row.match(/class="lab-timeline-popover"[\s\S]*?<\/div>\s*<\/div>/)?.[0];
      expect(popoverBlock).toBeTruthy();
      const firstLine = popoverBlock!.match(
        /lab-timeline-popover-name[^>]*>([^<]+)</,
      )?.[1]?.trim();
      expect(firstLine).toBe(plainName);
      const idIdx = popoverBlock!.indexOf("font-mono");
      const nameIdx = popoverBlock!.indexOf("lab-timeline-popover-name");
      expect(nameIdx).toBeGreaterThan(-1);
      expect(idIdx).toBeGreaterThan(nameIdx);
    }
  });

  it("UX6 round 3 mobile backlog field labels", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    expect(html).toContain("lab-backlog-starts-long");
    expect(html).toContain("Starts Oct 25, 2026");
    expect(html).toContain("Depends on Less AI sounding briefs");
  });

  it("UX13 humanizer is one Gantt row spanning OSS and Skills chips", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    const row = html.match(
      /data-lab-gantt-row[\s\S]*?EXP-20260913-humanizer-polish-skills[\s\S]*?<\/div>\s*<\/div>/,
    )?.[0];
    expect(row).toBeTruthy();
    expect(row).toContain("OSS");
    expect(row).toContain("Skills");
  });

  it("UX8 history table has exactly four columns", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    const history = html.match(/lab-history-table[\s\S]*?<\/table>/)?.[0] ?? "";
    const headers = history.match(/<thead[\s\S]*?<\/thead>/)?.[0] ?? "";
    expect((headers.match(/<th[\s>]/g) ?? []).length).toBe(4);
    expect(history).toContain('colspan="4"');
  });

  it("UX8 backlog table has exactly four columns with plain dependency names", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    const backlog = html.match(/lab-backlog-table[\s\S]*?<\/table>/)?.[0] ?? "";
    const headers = backlog.match(/<thead[\s\S]*?<\/thead>/)?.[0] ?? "";
    expect((headers.match(/<th[\s>]/g) ?? []).length).toBe(4);
    expect(backlog).toContain('colspan="4"');
    expect(backlog).toContain("Less AI sounding briefs");
    const firstRow = backlog.match(/<tr class="lab-data-row">[\s\S]*?<\/tr>/)?.[0] ?? "";
    expect(firstRow).not.toContain("EXP-20260715");
    const caveman = pub.backlog.find((b) => b.id === "EXP-20260913-caveman-compress-skills");
    expect(caveman).toBeTruthy();
    const deps = formatBacklogDependsOn(caveman!.depends_on, pub.experiments);
    expect(deps.plain).toContain("Less AI sounding briefs");
  });

  it("UX14 Show all toggle when collapsed history exists", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const model = buildTimelineModel(pub.experiments, ["running", "done", "planned"], "2026-10-19");
    if ((model?.collapsed_count ?? 0) > 0) {
      const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
      expect(html).toContain("data-lab-gantt-toggle");
      expect(html).toContain("#lab-history");
    }
  });

  it("UX22 OS color scheme script targets html.dark before paint", () => {
    expect(colorSchemeHeadScript).toContain("prefers-color-scheme: dark");
    expect(colorSchemeHeadScript).toContain('classList.add("dark")');
  });

  it("UX21 marks current month on axis", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const model = buildTimelineModel(pub.experiments, ["running", "done", "planned"], "2026-10-19");
    const current = model!.month_ticks.find((t) => t.current);
    expect(current?.label).toBe("Oct");
  });
});
