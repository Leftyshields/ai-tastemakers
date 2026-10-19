import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildLabPublicFile,
  buildTimelineModel,
  findForbiddenLabCopyViolations,
  renderLabDashboardHtml,
  formatAllNullReadStatusLine,
} from "../../../scripts/lab/build-lab-public.js";
import { chooseTimelineLabelPlacement } from "../../../scripts/lab/lab-timeline-labels.js";
import { formatBacklogDependsOn } from "../../../scripts/lab/lab-backlog-deps.js";

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
    expect(html).not.toMatch(/lab-control-panel[\s\S]*?—/);
    const violations = findForbiddenLabCopyViolations(html);
    expect(violations).toEqual([]);
  });

  it("uses experiment name as the only control panel h2 when running", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    expect(html).toContain('id="lab-control-panel"');
    expect(html).toMatch(/<h2[^>]*>Less AI sounding briefs<\/h2>/);
    expect(html).not.toMatch(/<h2[^>]*>Control panel<\/h2>/);
  });

  it("includes metric_type on every experiment row", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    for (const exp of pub.experiments) {
      expect(exp.success.metric.metric_type).toMatch(/^(editorial|posthog)$/);
      expect(exp.success.metric.metric_label.length).toBeGreaterThan(0);
    }
  });

  it("UX1 all null read line uses window end not sync time", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const run = pub.control_panel.running;
    expect(run).toBeTruthy();
    expect(formatAllNullReadStatusLine(run!)).toBe("Editorial read, Oct 24");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    const panel = html.match(/id="lab-control-panel"[\s\S]*?<\/section>/)?.[0] ?? "";
    expect(panel).toContain("Editorial read, Oct 24");
    expect(panel).not.toContain("Synced");
    expect(panel).not.toContain("Monitoring only");
    expect(panel).not.toContain("Progress to target");
    expect(panel).toContain("Read window");
    expect(panel.match(/lab-read-window[\s\S]*?Day 9 of 14/)).toBeNull();
    expect(panel).toContain("Day 9 of 14");
  });

  it("UX3 details summary has no hardcoded aria-expanded", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    expect(html).not.toMatch(/<summary[^>]*aria-expanded=/);
  });

  it("UX6 timeline bars expose popover hooks", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    expect(html).toContain("data-lab-timeline-bar");
    expect(html).toContain('role="button"');
    expect(html).toContain("aria-describedby=");
    expect(html).toContain("lab-timeline-popover");
    expect(html).toContain("lab-timeline-mobile");
    expect(html).toContain("lab-timeline-tracks");
    expect(html).toContain("z-index: 300");
    expect(html).toContain("positionPopover");
  });

  it("UX6 round 4 timeline bars carry inside label data for key experiments", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    expect(html).toContain('data-label="Less AI sounding briefs"');
    expect(html).toContain('data-label="Shorter enrichment context"');
    expect(html).toContain('data-label="Fresher Why now on repeats"');
    expect(html).toContain('data-label="Smarter early ranking"');
    expect(html).toContain("lab-timeline-bar-running .lab-timeline-label-inside");
    expect(html).toContain("lab-timeline-bar-planned .lab-timeline-label-inside");
  });

  it("UX6 final inside labels omit stubs when eight characters do not fit", () => {
    expect(chooseTimelineLabelPlacement("Less AI sounding briefs", 36, 0)).toBe("hidden");
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    const layoutScript = html.match(/function layoutTimelineLabels\(\)[\s\S]*?\n  \}/)?.[0] ?? "";
    expect(layoutScript).not.toMatch(/outside\.hidden = false;\s*\n\s*return;\s*\n\s*\}\s*\n\s*inside\.textContent = label/);
  });

  it("UX6 final popover shows bold name above muted id", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    expect(html).toContain('class="lab-timeline-popover-name font-bold');
    const pop = html.match(
      /id="lab-timeline-pop-EXP_20260913_humanizer_polish_skills"[\s\S]*?<\/div>\s*<\/div>/,
    )?.[0];
    expect(pop).toBeTruthy();
    const nameIdx = pop!.indexOf("lab-timeline-popover-name");
    const idIdx = pop!.indexOf("EXP-20260913-humanizer-polish-skills");
    expect(nameIdx).toBeGreaterThan(-1);
    expect(idIdx).toBeGreaterThan(nameIdx);
    expect(pop).toContain("Less AI sounding briefs");
  });

  it("UX6 round 3 mobile backlog field labels", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    expect(html).toContain("lab-backlog-starts-long");
    expect(html).toContain("Starts Oct 25, 2026");
    expect(html).toContain("Depends on Less AI sounding briefs");
  });

  it("UX7 humanizer spans OSS and Skills lanes", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const model = buildTimelineModel(pub.experiments, ["running", "done", "planned"], "2026-10-19");
    const humanizer = model?.items.find((i) => i.id === "EXP-20260913-humanizer-polish-skills");
    expect(humanizer?.lane_span).toBeGreaterThanOrEqual(2);
    expect(humanizer?.surfaces).toContain("narration_oss");
    expect(humanizer?.surfaces).toContain("narration_skills");
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

  it("UX6 label placement hides stubs shorter than eight characters", () => {
    expect(chooseTimelineLabelPlacement("Tiny", 200, 200)).toBe("hidden");
    expect(chooseTimelineLabelPlacement("Long enough label", 200, 200)).toBe("inside");
  });
});
