import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildLabPublicFile,
  renderLabDashboardHtml,
} from "../../../scripts/lab/build-lab-public.js";
import {
  formatExperimentMetricHeadline,
  renderExperimentRegistrySectionHtml,
} from "../../../scripts/lab/lab-experiment-registry.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function escapeHtml(t: string): string {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

describe("Lab experiment registry (UX45)", () => {
  it("renders before timeline with visible verdict, metric line, and write up links", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    const regIdx = html.indexOf('id="lab-experiment-registry"');
    const timelineIdx = html.indexOf('id="lab-timeline"');
    expect(regIdx).toBeGreaterThan(-1);
    expect(regIdx).toBeLessThan(timelineIdx);

    const registry = html.match(/id="lab-experiment-registry"[\s\S]*?id="lab-control-panel"/)?.[0] ?? "";
    expect(registry).toContain("Shorter Skills briefs");
    expect(registry).toContain("lab-exp-registry-metric");
    expect(registry).toMatch(/Ship|Revert|Inconclusive/);
    expect(registry).toContain("Treatment cut output about 18%");
    expect(registry).not.toMatch(/lab-exp-registry[\s\S]*Treatment cut[\s\S]*data-open="true"/);
  });

  it("builds metric headlines only from experiments.json fields", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const ponytail = pub.experiments.find((e) => e.id === "EXP-20260802-ponytail-narration-skills")!;
    expect(formatExperimentMetricHeadline(ponytail)).toContain("baseline 2005");
    expect(formatExperimentMetricHeadline(ponytail)).toContain("target 1650");
    const section = renderExperimentRegistrySectionHtml(pub, escapeHtml);
    expect(section).toContain('data-lab-section="experiments"');
    expect(verifyEveryExperimentListed(pub, section)).toBe(true);
  });
});

function verifyEveryExperimentListed(
  pub: ReturnType<typeof buildLabPublicFile>,
  html: string,
): boolean {
  return pub.experiments.every((e) => html.includes(`id="lab-exp-${e.id}"`));
}
