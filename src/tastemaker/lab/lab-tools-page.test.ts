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
    expect(html).toContain('data-lab-section="tools"');
    expect(html).toContain("What the digest has learned");
  });

  it("keeps More rows collapsed by default and sets Evaluated aria-current", () => {
    const html = renderToolsPageHtml(repoRoot, defaultLabLinkContext(0, {}, "2026-10-19"), escapeHtml);
    expect(html).toContain('data-open="false"');
    expect(html).not.toMatch(/<tr class="lab-expand-row"[^>]*data-open="true"/);
    expect(html).toMatch(/lab-loop-step--current" aria-current="step"/);
    expect(html).toContain(".lab-expand-toggle");
  });

  it("shows ten top candidate rows by default with toggle below the table", () => {
    const html = renderToolsPageHtml(repoRoot, defaultLabLinkContext(0, {}, "2026-10-19"), escapeHtml);
    const topSection = html.match(/lab-tools-top[\s\S]*?<\/section>/)?.[0] ?? "";
    const dataRows = topSection.match(/class="lab-data-row/g) ?? [];
    const hiddenRows = topSection.match(/lab-tools-row-hidden/g) ?? [];
    expect(dataRows.length).toBeGreaterThan(10);
    expect(hiddenRows.length).toBe(dataRows.length - 10);
    const tableEnd = topSection.indexOf("</table>");
    const togglePos = topSection.indexOf("data-lab-tools-toggle");
    expect(togglePos).toBeGreaterThan(tableEnd);
    expect(topSection).toContain('data-show-all="false"');
  });

  it("uses backlog and history table classes and spaced role chips", () => {
    const html = renderToolsPageHtml(repoRoot, defaultLabLinkContext(0, {}, "2026-10-19"), escapeHtml);
    expect(html).toContain("lab-backlog-table");
    expect(html).toContain("lab-history-table");
    expect(html).toContain("lab-tools-role-chips");
    expect(html).toContain("lab-tools-linked-cell");
  });

  it("renders lab queue role column as edition topic chips", () => {
    const html = renderToolsPageHtml(repoRoot, defaultLabLinkContext(0, {}, "2026-10-19"), escapeHtml);
    const queueBlock = html.match(/lab-tools-queue[\s\S]*?<\/table>/)?.[0] ?? "";
    expect(queueBlock).toContain("lab-edition-topic-chip");
    expect(queueBlock).toContain("lab-tools-role-chips");
  });

  it("routes allowlisted queue tool links through go", () => {
    const allowlist = { "NousResearch/hermes-agent": "https://github.com/NousResearch/hermes-agent" };
    const html = renderToolsPageHtml(repoRoot, defaultLabLinkContext(0, allowlist, "2026-10-19"), escapeHtml);
    expect(html).toContain("../go/index.html?");
    expect(html).toContain("data-lab-source-repo=\"NousResearch/hermes-agent\"");
  });
});
