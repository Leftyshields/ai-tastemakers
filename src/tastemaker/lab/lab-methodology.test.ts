import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildLabPublicFile,
  renderLabDashboardHtml,
} from "../../../scripts/lab/build-lab-public.js";
import { labNavHtml } from "../../../scripts/edition-pages.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function escapeHtml(t: string): string {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

describe("Lab methodology layout (round 7 revised)", () => {
  it("keeps dashboard layout without experiment registry section", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    expect(html).not.toContain('id="lab-experiment-registry"');
    const panelIdx = html.indexOf('id="lab-control-panel"');
    const timelineIdx = html.indexOf('id="lab-timeline"');
    expect(panelIdx).toBeGreaterThan(-1);
    expect(panelIdx).toBeLessThan(timelineIdx);
  });

  it("Lab nav exposes Methodology instead of About", () => {
    const nav = labNavHtml("home", escapeHtml);
    expect(nav).toContain("Methodology");
    expect(nav).toContain("methodology.html");
    expect(nav).not.toContain(">About<");
    expect(nav).not.toContain("about.html");
  });
});
