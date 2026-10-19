import { describe, it, expect } from "vitest";
import {
  chooseTimelineLabelPlacement,
  minBarWidthPxForInsideLabel,
  outsideLabelClearsNextBar,
  shouldRenderInsideTimelineLabel,
  TIMELINE_LABEL_MIN_CHARS,
} from "../../../scripts/lab/lab-timeline-labels.js";

describe("chooseTimelineLabelPlacement", () => {
  it("uses minimum character threshold", () => {
    expect(TIMELINE_LABEL_MIN_CHARS).toBe(8);
    expect(chooseTimelineLabelPlacement("1234567", 500, 500)).toBe("hidden");
  });

  it("prefers inside labels when eight characters fit", () => {
    const minW = minBarWidthPxForInsideLabel();
    expect(minW).toBe(72);
    expect(shouldRenderInsideTimelineLabel(minW, 20)).toBe(true);
    expect(shouldRenderInsideTimelineLabel(minW - 1, 20)).toBe(false);
    expect(chooseTimelineLabelPlacement("Humanizer polish skills read", minW, 5)).toBe("inside");
    expect(chooseTimelineLabelPlacement("Humanizer polish skills read", 36, 5)).toBe("hidden");
  });

  it("requires outside labels to clear the next bar gap", () => {
    expect(outsideLabelClearsNextBar(100, 50)).toBe(false);
    expect(outsideLabelClearsNextBar(100, 108)).toBe(true);
    expect(chooseTimelineLabelPlacement("Long enough label", 20, 50)).toBe("hidden");
  });
});
