import { describe, it, expect } from "vitest";
import { formatWeekReviewDateRange } from "./week-review-date-range.js";

describe("formatWeekReviewDateRange", () => {
  it("formats same-month range from review JSON dates", () => {
    expect(formatWeekReviewDateRange("2026-10-19", "2026-10-25")).toBe("Oct 19 to 25");
  });

  it("formats cross-month range from review JSON dates", () => {
    expect(formatWeekReviewDateRange("2026-09-28", "2026-10-04")).toBe("Sep 28 to Oct 4");
  });

  it("includes years when the range crosses calendar years", () => {
    expect(formatWeekReviewDateRange("2025-12-29", "2026-01-04")).toBe(
      "Dec 29, 2025 to Jan 4, 2026",
    );
  });
});
