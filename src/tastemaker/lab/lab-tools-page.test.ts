import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defaultLabLinkContext } from "../../../scripts/lab/lab-analytics.js";
import { renderToolsPageHtml } from "../../../scripts/lab/render-tools-page.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function escapeHtml(t: string): string {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

describe("Lab UX43 tools page", () => {
  it("renders queue, top candidates, and role matrix without backticks", () => {
    const html = renderToolsPageHtml(repoRoot, defaultLabLinkContext(0, {}, "2026-10-19"), escapeHtml);
    expect(html).toContain("Evaluated tools");
    expect(html).toContain("Lab queue");
    expect(html).toContain("Top candidates");
    expect(html).toContain("Role matrix");
    expect(html).toContain("lab-loop-step--current");
    expect(html).not.toContain("`");
    expect(html).toContain("data-lab-section=\"tools\"");
  });
});
