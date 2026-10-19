import { describe, it, expect } from "vitest";
import {
  chooseTimelineLabelPlacement,
  outsideLabelClearsNextBar,
  TIMELINE_LABEL_MIN_CHARS,
} from "../../../scripts/lab/lab-timeline-labels.js";

describe("chooseTimelineLabelPlacement", () => {
  it("uses minimum character threshold", () => {
    expect(TIMELINE_LABEL_MIN_CHARS).toBe(8);
    expect(chooseTimelineLabelPlacement("1234567", 500, 500)).toBe("hidden");
  });

  it("requires outside labels to clear the next bar gap", () => {
    expect(outsideLabelClearsNextBar(100, 50)).toBe(false);
    expect(outsideLabelClearsNextBar(100, 108)).toBe(true);
    expect(chooseTimelineLabelPlacement("Long enough label", 40, 50)).toBe("hidden");
  });
});
