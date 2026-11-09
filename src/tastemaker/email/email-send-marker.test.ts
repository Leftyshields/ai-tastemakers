import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import {
  dailyDigestEmailSentMarkerPath,
  readDailyDigestEmailSentMarker,
  writeDailyDigestEmailSentMarker,
} from "./email-send-marker.js";

describe("daily digest email send marker", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "email-marker-"));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("writes and reads a valid marker", async () => {
    const briefingsDir = path.join(tmpDir, "briefings");
    await writeDailyDigestEmailSentMarker(briefingsDir, "2026-11-02", 3);
    const marker = await readDailyDigestEmailSentMarker(briefingsDir, "2026-11-02");
    expect(marker?.recipient_count).toBe(3);
    expect(marker?.date_label).toBe("2026-11-02");
  });

  it("rejects invalid date labels", () => {
    expect(() => dailyDigestEmailSentMarkerPath("/tmp", "bad")).toThrow(/YYYY-MM-DD/);
  });

  it("returns null when marker is absent", async () => {
    const briefingsDir = path.join(tmpDir, "briefings");
    await expect(readDailyDigestEmailSentMarker(briefingsDir, "2026-11-02")).resolves.toBeNull();
  });
});
