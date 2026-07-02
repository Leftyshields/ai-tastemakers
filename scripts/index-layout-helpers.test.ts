import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import {
  groupArchiveDates,
  groupDatesByMonth,
  buildMonthCalendarCells,
  monthsBeforeReference,
  topRepoShortName,
  landingLayoutV2Enabled,
  loadTopRepoMeta,
  loadTopRepoMetaMap,
} from "./index-layout-helpers.js";

describe("index-layout-helpers", () => {
  describe("topRepoShortName", () => {
    it("returns segment after slash", () => {
      expect(topRepoShortName("DietrichGebert/ponytail")).toBe("ponytail");
    });

    it("truncates long names", () => {
      const long = "a".repeat(30);
      expect(topRepoShortName(`owner/${long}`, 24).length).toBe(24);
      expect(topRepoShortName(`owner/${long}`, 24).endsWith("…")).toBe(true);
    });
  });

  describe("groupArchiveDates", () => {
    const ref = new Date(2026, 6, 1); // July 2026

    it("groups dates by month descending", () => {
      const groups = groupArchiveDates(
        ["2026-07-01", "2026-06-28", "2026-06-15"],
        ref,
      );
      expect(groups).toHaveLength(2);
      expect(groups[0].label).toBe("July 2026");
      expect(groups[0].defaultOpen).toBe(true);
      expect(groups[1].label).toBe("June 2026");
      expect(groups[1].defaultOpen).toBe(false);
    });

    it("merges months more than two months back into Older archives", () => {
      const groups = groupArchiveDates(
        ["2026-07-01", "2026-04-10", "2026-03-01"],
        ref,
      );
      const older = groups.find((g) => g.label === "Older archives");
      expect(older).toBeDefined();
      expect(older!.dates).toEqual(["2026-04-10", "2026-03-01"]);
      expect(older!.defaultOpen).toBe(false);
    });

    it("handles single date in a month", () => {
      const groups = groupArchiveDates(["2026-07-15"], ref);
      expect(groups).toHaveLength(1);
      expect(groups[0].dates).toEqual(["2026-07-15"]);
    });
  });

  describe("groupDatesByMonth", () => {
    it("groups dates by month descending without Older archives bucket", () => {
      const groups = groupDatesByMonth(["2026-07-01", "2026-06-28", "2026-04-10"]);
      expect(groups).toHaveLength(3);
      expect(groups[0].monthKey).toBe("2026-07");
      expect(groups[1].monthKey).toBe("2026-06");
      expect(groups[2].monthKey).toBe("2026-04");
      expect(groups.every((g) => g.label.includes("2026"))).toBe(true);
    });

    it("handles single date in a month", () => {
      const groups = groupDatesByMonth(["2026-07-15"]);
      expect(groups).toHaveLength(1);
      expect(groups[0].dates).toEqual(["2026-07-15"]);
    });
  });

  describe("buildMonthCalendarCells", () => {
    it("adds leading and trailing padding cells for partial weeks", () => {
      const cells = buildMonthCalendarCells(2026, 6, new Set());
      expect(cells.length % 7).toBe(0);
      expect(cells.length).toBeGreaterThan(28);
      expect(cells.some((c) => c.day === null)).toBe(true);
      expect(cells.some((c) => c.day === 30)).toBe(true);
    });

    it("marks isoDate only for days in briefing set", () => {
      const cells = buildMonthCalendarCells(2026, 6, new Set(["2026-06-15"]));
      const day15 = cells.find((c) => c.day === 15);
      const day14 = cells.find((c) => c.day === 14);
      expect(day15?.isoDate).toBe("2026-06-15");
      expect(day14?.isoDate).toBeUndefined();
    });

    it("handles single-day month with briefing", () => {
      const cells = buildMonthCalendarCells(2026, 7, new Set(["2026-07-01"]));
      const linked = cells.filter((c) => c.isoDate);
      expect(linked).toHaveLength(1);
      expect(linked[0].isoDate).toBe("2026-07-01");
    });

    it("always returns a multiple of seven cells", () => {
      for (const month of [1, 2, 6, 12]) {
        const cells = buildMonthCalendarCells(2026, month, new Set());
        expect(cells.length % 7).toBe(0);
      }
    });
  });

  describe("monthsBeforeReference", () => {
    it("counts calendar month distance", () => {
      expect(monthsBeforeReference("2026-05", "2026-07")).toBe(2);
      expect(monthsBeforeReference("2026-07", "2026-07")).toBe(0);
      expect(monthsBeforeReference("2026-04", "2026-07")).toBe(3);
    });
  });

  describe("landingLayoutV2Enabled", () => {
    it("is true only when env is 1", () => {
      const prev = process.env.SITE_LANDING_LAYOUT_V2;
      process.env.SITE_LANDING_LAYOUT_V2 = "1";
      expect(landingLayoutV2Enabled()).toBe(true);
      process.env.SITE_LANDING_LAYOUT_V2 = "0";
      expect(landingLayoutV2Enabled()).toBe(false);
      if (prev === undefined) delete process.env.SITE_LANDING_LAYOUT_V2;
      else process.env.SITE_LANDING_LAYOUT_V2 = prev;
    });
  });

  describe("loadTopRepoMetaMap", () => {
    let tmpDir: string;

    beforeEach(async () => {
      tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "index-layout-map-"));
    });

    afterEach(async () => {
      await fs.rm(tmpDir, { recursive: true, force: true });
    });

    it("returns map entries only for dates with digest.json", async () => {
      const dateDir = path.join(tmpDir, "2026-06-28");
      await fs.mkdir(dateDir, { recursive: true });
      await fs.writeFile(
        path.join(dateDir, "digest.json"),
        JSON.stringify({ repos: [{ rank: 1, full_name: "owner/repo" }] }),
        "utf8",
      );
      const map = await loadTopRepoMetaMap(tmpDir, ["2026-06-28", "2026-01-01"]);
      expect(map.size).toBe(1);
      expect(map.get("2026-06-28")).toEqual({ fullName: "owner/repo", shortName: "repo" });
    });
  });

  describe("loadTopRepoMeta", () => {
    let tmpDir: string;

    beforeEach(async () => {
      tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "index-layout-meta-"));
    });

    afterEach(async () => {
      await fs.rm(tmpDir, { recursive: true, force: true });
    });

    it("returns short and full name from rank-1 repo", async () => {
      const dateDir = path.join(tmpDir, "2026-06-28");
      await fs.mkdir(dateDir, { recursive: true });
      await fs.writeFile(
        path.join(dateDir, "digest.json"),
        JSON.stringify({
          repos: [
            { rank: 2, full_name: "other/repo" },
            { rank: 1, full_name: "owner/cool-tool" },
          ],
        }),
        "utf8",
      );
      const meta = await loadTopRepoMeta(tmpDir, "2026-06-28");
      expect(meta).toEqual({ fullName: "owner/cool-tool", shortName: "cool-tool" });
    });

    it("returns undefined when digest.json is missing", async () => {
      expect(await loadTopRepoMeta(tmpDir, "2026-01-01")).toBeUndefined();
    });
  });
});
