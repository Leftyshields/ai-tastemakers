import { describe, it, expect } from "vitest";
import { chooseTimelineLabelPlacement, TIMELINE_LABEL_MIN_CHARS } from "../../../scripts/lab/lab-timeline-labels.js";

describe("chooseTimelineLabelPlacement", () => {
  it("uses minimum character threshold", () => {
    expect(TIMELINE_LABEL_MIN_CHARS).toBe(8);
    expect(chooseTimelineLabelPlacement("1234567", 500, 500)).toBe("hidden");
  });
});
