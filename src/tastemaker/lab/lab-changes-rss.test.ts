import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  buildLabChangesFeedItems,
  buildLabChangesRssXml,
  rfc822FromIso,
} from "../../../scripts/lab/lab-changes-rss.js";
import {
  parseVerdictLogLine,
  readVerdictLogEvents,
  sortVerdictLogEventsForFeed,
} from "../../../scripts/lab/lab-verdict-log.js";

const repoRoot = path.resolve(import.meta.dirname, "../../..");
const siteBaseUrl = "https://leftyshields.github.io/ai-tastemakers";

describe("lab verdict log", () => {
  it("parses verdict_set", () => {
    const ev = parseVerdictLogLine(
      JSON.stringify({
        schema_version: 1,
        event: "verdict_set",
        experiment_id: "EXP-20260913-caveman-compress-skills",
        verdict: "ship",
        occurred_at: "2026-11-21T18:00:00.000Z",
      }),
      1,
    );
    expect(ev?.event).toBe("verdict_set");
  });

  it("parses verdict_flip", () => {
    const ev = parseVerdictLogLine(
      JSON.stringify({
        schema_version: 1,
        event: "verdict_flip",
        experiment_id: "EXP-20260913-caveman-compress-skills",
        from_verdict: "ship",
        to_verdict: "revert",
        occurred_at: "2026-11-22T18:00:00.000Z",
      }),
      1,
    );
    expect(ev?.event).toBe("verdict_flip");
  });

  it("parses stale_label_applied", () => {
    const ev = parseVerdictLogLine(
      JSON.stringify({
        schema_version: 1,
        event: "stale_label_applied",
        experiment_id: "EXP-20260628-web-enrich-skills",
        verdict: "ship",
        occurred_at: "2026-10-20T12:00:00.000Z",
      }),
      1,
    );
    expect(ev?.event).toBe("stale_label_applied");
  });

  it("returns no events when log file is missing", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "lab-log-missing-"));
    expect(readVerdictLogEvents(tmp, "lab/verdict-log.jsonl")).toEqual([]);
  });
});

describe("lab changes RSS", () => {
  let tmpDir: string;

  afterEach(() => {
    if (tmpDir && fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      tmpDir = "";
    }
  });

  it("builds zero items when log is empty", () => {
    const events = sortVerdictLogEventsForFeed([]);
    const items = buildLabChangesFeedItems(repoRoot, siteBaseUrl, events);
    expect(items).toHaveLength(0);
    const xml = buildLabChangesRssXml({ siteBaseUrl, items });
    expect(xml).toContain("<rss version=\"2.0\">");
    expect(xml).not.toContain("<item>");
    expect(xml).toContain("Thu, 01 Jan 1970 00:00:00 GMT");
  });

  it("maps set flip and stale events to tracked item links", () => {
    const events = sortVerdictLogEventsForFeed([
      {
        schema_version: 1,
        event: "verdict_set",
        experiment_id: "EXP-20260913-caveman-compress-skills",
        verdict: "ship",
        occurred_at: "2026-11-21T18:00:00.000Z",
      },
      {
        schema_version: 1,
        event: "verdict_flip",
        experiment_id: "EXP-20260913-caveman-compress-skills",
        from_verdict: "ship",
        to_verdict: "inconclusive",
        occurred_at: "2026-11-22T18:00:00.000Z",
      },
      {
        schema_version: 1,
        event: "stale_label_applied",
        experiment_id: "EXP-20260628-web-enrich-skills",
        verdict: "ship",
        occurred_at: "2026-10-20T12:00:00.000Z",
      },
    ]);
    const items = buildLabChangesFeedItems(repoRoot, siteBaseUrl, events);
    expect(items).toHaveLength(3);
    for (const item of items) {
      expect(item.link).toContain("/go/?");
      expect(item.link).toContain("event=lab_badge_click");
      expect(item.link).toContain("surface=rss");
    }
    expect(items[0]!.event).toBe("verdict_flip");
    const xml = buildLabChangesRssXml({ siteBaseUrl, items });
    expect(xml.match(/<item>/g)?.length).toBe(3);
    expect(buildLabChangesRssXml({ siteBaseUrl, items })).toBe(xml);
  });

  it("uses RFC822 pubDates from occurred_at only", () => {
    expect(rfc822FromIso("2026-11-21T18:00:00.000Z")).toBe("Sat, 21 Nov 2026 18:00:00 GMT");
  });
});
