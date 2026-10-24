import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildLabPublicFile,
  renderLabDashboardHtml,
} from "../../../scripts/lab/build-lab-public.js";
import { applyLabIntroVonRestorff, renderLabLoopStripHtml } from "../../../scripts/lab/lab-loop-strip.js";
import {
  renderFromProjectLine,
  renderLabSourceOriginChip,
} from "../../../scripts/lab/lab-dashboard-copy.js";
import { loadExperimentsFile } from "../../../scripts/lab/validate-experiments.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function escapeHtml(t: string): string {
  return t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

describe("Lab UX38 UX39 UX40 UX41", () => {
  it("UX38 intro emphasizes first sentence", () => {
    const html = applyLabIntroVonRestorff(
      "<p>Tastemakers reports on tools every day, evaluates them, and picks ones that could improve its own pipeline. It experiments almost automatically.</p>",
    );
    expect(html).toContain("<strong");
    expect(html).toContain("Tastemakers reports on tools every day, evaluates them, and picks ones that could improve its own pipeline.");
  });

  it("UX39 loop strip has four steps and no dash characters", () => {
    const strip = renderLabLoopStripHtml("lab-home", escapeHtml);
    expect(strip).toContain("Featured in digest");
    expect(strip).toContain("Evaluated");
    expect(strip).toContain("Experiment");
    expect(strip).toContain("Result");
    const visible = strip.replace(/<[^>]+>/g, " ");
    expect(visible).not.toMatch(/[-–—]/);
  });

  it("UX40 UX41 history shows From line for humanizer", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    const humanizerRow = html.match(
      /lab-exp-EXP-20260913-humanizer-polish-skills[\s\S]*?<\/tr>/,
    )?.[0];
    expect(humanizerRow).toContain("From");
    expect(humanizerRow).toContain("blader/humanizer");
    expect(humanizerRow).toContain("../skills/briefings/2026-08-05.html");
    const humanizer = pub.experiments.find((e) => e.id === "EXP-20260913-humanizer-polish-skills");
    expect(renderLabSourceOriginChip("auto", escapeHtml)).toContain("Proposed by pipeline");
    expect(humanizer?.source).toBe("auto");
    expect(renderFromProjectLine({ sourceRepo: null, sourceUrl: null }, escapeHtml)).toBe("");
    expect(renderLabSourceOriginChip("hand", escapeHtml)).toContain("Picked by hand");
  });

  it("UX41 backfilled source rows match expected evidence ids", () => {
    const file = loadExperimentsFile(repoRoot);
    const withSource = file.experiments.filter((e) => e.source === "auto" || e.source === "hand");
    const ids = withSource.map((e) => e.id).sort();
    expect(ids).toEqual(
      [
        "EXP-20260701-landing-layout",
        "EXP-20260716-firecrawl-enrich-skills",
        "EXP-20260802-ponytail-narration-skills",
        "EXP-20260913-caveman-compress-skills",
        "EXP-20260913-humanizer-polish-skills",
      ].sort(),
    );
    expect(withSource.length).toBeLessThanOrEqual(8);
  });
});
