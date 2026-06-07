import { describe, it, expect } from "vitest";
import {
  parseWeekId,
  weekContaining,
  isoWeekIdFromDateLabel,
  dateLabelInTimezone,
} from "./week.js";

describe("weekly week window", () => {
  it("parses ISO week id into Mon–Sun dates", () => {
    const w = parseWeekId("2026-W23");
    expect(w.week_id).toBe("2026-W23");
    expect(w.dates).toHaveLength(7);
    expect(w.week_start).toBe(w.dates[0]);
    expect(w.week_end).toBe(w.dates[6]);
    const [y, m, d] = w.week_start.split("-").map(Number);
    expect(new Date(y, m - 1, d).getDay()).toBe(1);
  });

  it("resolves week containing a Sunday in LA", () => {
    const sunday = new Date("2026-06-14T16:00:00.000Z");
    const w = weekContaining(sunday, "America/Los_Angeles");
    expect(w.dates).toContain(dateLabelInTimezone(sunday, "America/Los_Angeles"));
    expect(w.week_end).toBe(dateLabelInTimezone(sunday, "America/Los_Angeles"));
  });

  it("computes ISO week from date label", () => {
    expect(isoWeekIdFromDateLabel("2026-06-08")).toMatch(/^2026-W\d{2}$/);
  });

  it("rejects invalid week id", () => {
    expect(() => parseWeekId("bad")).toThrow(/Invalid week id/);
  });

  it("Monday of week is stable regardless of civil date (UTC-safe)", () => {
    const w = parseWeekId("2026-W24");
    const [y, m, d] = w.week_start.split("-").map(Number);
    expect(new Date(Date.UTC(y, m - 1, d, 12)).getUTCDay()).toBe(1);
  });
});
