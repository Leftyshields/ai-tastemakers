import { describe, it, expect } from "vitest";
import {
  monthBounds,
  monthIdFromDateLabel,
  isFourthSunday,
  isSundayDateLabel,
  sundayOfMonthCount,
  fourthSundayOfMonth,
} from "./month.js";

describe("monthly/month", () => {
  it("monthBounds returns civil month range", () => {
    expect(monthBounds("2026-06")).toEqual({
      month_start: "2026-06-01",
      month_end: "2026-06-30",
    });
  });

  it("monthIdFromDateLabel extracts YYYY-MM", () => {
    expect(monthIdFromDateLabel("2026-06-22")).toBe("2026-06");
  });

  it("detects fourth Sunday in June 2026", () => {
    expect(fourthSundayOfMonth("2026-06")).toBe("2026-06-28");
    expect(sundayOfMonthCount("2026-06-28")).toBe(4);
    expect(isSundayDateLabel("2026-06-28")).toBe(true);
    expect(
      isFourthSunday(new Date("2026-06-28T12:00:00.000Z"), "America/Los_Angeles"),
    ).toBe(true);
  });

  it("fifth Sunday is not fourth Sunday (May 2026)", () => {
    expect(fourthSundayOfMonth("2026-05")).toBe("2026-05-24");
    expect(sundayOfMonthCount("2026-05-31")).toBe(5);
    expect(
      isFourthSunday(new Date("2026-05-31T12:00:00.000Z"), "America/Los_Angeles"),
    ).toBe(false);
  });

  it("non-Sunday is not fourth Sunday", () => {
    expect(
      isFourthSunday(new Date("2026-06-21T12:00:00.000Z"), "America/Los_Angeles"),
    ).toBe(false);
  });
});
