import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defaultLabLinkContext } from "../../../scripts/lab/lab-analytics.js";
import {
  buildDigestLearnedModel,
  renderDigestLearnedSectionHtml,
  verifyDigestLearnedClaims,
} from "../../../scripts/lab/digest-learned.js";
import { renderToolsPageHtml } from "../../../scripts/lab/render-tools-page.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function escapeHtml(t: string): string {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

describe("Lab UX44 digest learned section", () => {
  it("renders section title and maps every claim to repo evidence", () => {
    const ctx = defaultLabLinkContext(0, {}, "2026-10-19");
    const section = renderDigestLearnedSectionHtml(repoRoot, ctx, escapeHtml);
    expect(section).toContain("What the digest has learned");
    expect(section).toContain("Adopted into the digest");
    expect(section).toContain("Queued next");
    const errors = verifyDigestLearnedClaims(section, repoRoot);
    expect(errors).toEqual([]);
  });

  it("includes shipped Firecrawl and Ponytail habits with inventory tools when present", () => {
    const model = buildDigestLearnedModel(repoRoot);
    const firecrawl = model.adopted.find((c) => c.id === "adopted-EXP-20260716-firecrawl-enrich-skills");
    const ponytail = model.adopted.find((c) => c.id === "adopted-EXP-20260802-ponytail-narration-skills");
    expect(firecrawl?.evidence.some((e) => e.includes("firecrawl"))).toBe(true);
    expect(ponytail?.evidence.some((e) => e.includes("ponytail"))).toBe(true);
    const caveman = model.queued.find((c) => c.id === "queued-EXP-20260913-caveman-compress-skills");
    const whynow = model.queued.find((c) => c.id === "queued-EXP-20260913-whynow-memory-skills");
    expect(caveman).toBeDefined();
    expect(whynow).toBeDefined();
    expect(model.roleGrowth).not.toBeNull();
  });

  it("full tools page verifies all digest learned claims", () => {
    const html = renderToolsPageHtml(repoRoot, defaultLabLinkContext(0, {}, "2026-10-19"), escapeHtml);
    expect(html).toContain("lab-tools-tracked-link");
    expect(html).toContain("lab-edition-topic-chip");
    expect(verifyDigestLearnedClaims(html, repoRoot)).toEqual([]);
  });
});
