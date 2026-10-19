import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildLabPublicFile,
  findForbiddenLabCopyViolations,
  renderLabDashboardHtml,
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
});
