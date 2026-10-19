import { describe, it, expect } from "vitest";
import {
  computeTrackStatus,
  metricProgressPct,
  renderSparklineSvg,
} from "../../../scripts/lab/lab-metric-progress.js";

describe("lab metric progress", () => {
  const metric = {
    posthog: "event:outbound_repo_click?edition=skills",
    direction: "increase" as const,
    baseline: 10,
    target: 20,
    pass_threshold: "≥15% lift",
  };

  it("computes increase progress toward target", () => {
    expect(metricProgressPct(15, metric, 10)).toBe(50);
  });

  it("marks ahead when current beats linear expectation", () => {
    expect(computeTrackStatus(16, metric, 10, 7, 14)).toBe("Ahead");
  });

  it("renders sparkline svg with points", () => {
    const svg = renderSparklineSvg([
      { date: "2026-10-11", value: 1 },
      { date: "2026-10-12", value: 3 },
    ]);
    expect(svg).toContain("<polyline");
  });
});
