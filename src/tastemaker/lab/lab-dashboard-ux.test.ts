import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildLabPublicFile,
  findForbiddenLabCopyViolations,
  renderLabDashboardHtml,
  formatAllNullReadStatusLine,
} from "../../../scripts/lab/build-lab-public.js";

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
  });

  it("UX3 details summary has no hardcoded aria-expanded", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    expect(html).not.toMatch(/<summary[^>]*aria-expanded=/);
  });

  it("UX6 timeline bars expose popover hooks", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    expect(html).toContain('data-lab-timeline-bar');
    expect(html).toContain('role="button"');
    expect(html).toContain("aria-describedby=");
    expect(html).toContain("lab-timeline-popover");
  });

  it("UX8 history table has exactly four columns", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    const history = html.match(/lab-history-table[\s\S]*?<\/table>/)?.[0] ?? "";
    const headers = history.match(/<thead[\s\S]*?<\/thead>/)?.[0] ?? "";
    expect((headers.match(/<th>/g) ?? []).length).toBe(4);
    expect(history).toContain('colspan="4"');
    expect(history).toContain("Write up");
    expect(history).toContain("lab-expand-toggle");
    expect(history).not.toMatch(/<th[^>]*>\s*<\/th>/);
  });
});
