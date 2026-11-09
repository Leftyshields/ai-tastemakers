import { describe, it, expect } from "vitest";
import {
  dailyDigestEmailExpectedForDateLabel,
  isSundayDateLabelInPacific,
} from "./digest-email-day.js";

describe("dailyDigestEmailExpectedForDateLabel", () => {
  it("skips daily email expectation on Sunday", () => {
    expect(isSundayDateLabelInPacific("2026-11-08")).toBe(true);
    expect(dailyDigestEmailExpectedForDateLabel("2026-11-08")).toBe(false);
  });

  it("requires email on weekdays", () => {
    expect(dailyDigestEmailExpectedForDateLabel("2026-11-03")).toBe(true);
  });
});
