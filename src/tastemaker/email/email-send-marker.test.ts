import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import {
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
    await writeDailyDigestEmailSentMarker(briefingsDir, "2026-11-02", "msg-abc");
    const marker = await readDailyDigestEmailSentMarker(briefingsDir, "2026-11-02");
    expect(marker?.resend_message_id).toBe("msg-abc");
    expect(marker?.date_label).toBe("2026-11-02");
  });

  it("returns null when marker is absent", async () => {
    const briefingsDir = path.join(tmpDir, "briefings");
    await expect(readDailyDigestEmailSentMarker(briefingsDir, "2026-11-02")).resolves.toBeNull();
  });
});
