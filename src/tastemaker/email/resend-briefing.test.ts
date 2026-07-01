import { describe, it, expect, vi, beforeEach } from "vitest";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import type { AppConfig } from "../types.js";
import { resendDigestEmailForDate } from "./resend-briefing.js";

vi.mock("./resend.js", () => ({
  shouldSendDigestEmail: vi.fn(),
  sendDigestEmail: vi.fn(),
}));

vi.mock("../subscribers/load.js", () => ({
  resolveDigestRecipients: vi.fn(),
}));

import { shouldSendDigestEmail, sendDigestEmail } from "./resend.js";
import { resolveDigestRecipients } from "../subscribers/load.js";

const sampleDigest = {
  run_id: "test",
  date: "2026-07-01",
  edition: "oss",
  ranking_mode: "delta_7d",
  repos: [],
};

describe("resendDigestEmailForDate", () => {
  let tmpDir: string;

  beforeEach(async () => {
    vi.mocked(shouldSendDigestEmail).mockReset();
    vi.mocked(sendDigestEmail).mockReset();
    vi.mocked(resolveDigestRecipients).mockReset();
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "resend-email-"));
    await fs.mkdir(path.join(tmpDir, "briefings", "2026-07-01"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "briefings", "2026-07-01", "digest.json"),
      `${JSON.stringify(sampleDigest, null, 2)}\n`,
      "utf8",
    );
  });

  it("reads existing briefing and sends email", async () => {
    vi.mocked(shouldSendDigestEmail).mockResolvedValue(true);
    vi.mocked(resolveDigestRecipients).mockResolvedValue(["a@example.com", "b@example.com"]);
    vi.mocked(sendDigestEmail).mockResolvedValue({ id: "msg-123" });

    const config: AppConfig = {
      rootDir: tmpDir,
      editionId: "oss",
      editionName: "AI Tastemakers",
      briefingsDir: path.join(tmpDir, "briefings"),
      resendApiKey: "re_test",
      digestEmailFrom: "Digest <digest@example.com>",
      digestSiteUrl: "https://example.com",
    } as AppConfig;

    const result = await resendDigestEmailForDate(config, "2026-07-01");
    expect(result).toEqual({ id: "msg-123", recipientCount: 2 });
    expect(sendDigestEmail).toHaveBeenCalledWith(
      config,
      sampleDigest,
      "2026-07-01",
      ["a@example.com", "b@example.com"],
    );
  });

  it("rejects non-OSS editions", async () => {
    const config = {
      rootDir: tmpDir,
      editionId: "skills",
      briefingsDir: path.join(tmpDir, "briefings"),
    } as AppConfig;

    await expect(resendDigestEmailForDate(config, "2026-07-01")).rejects.toThrow(
      "OSS edition only",
    );
  });
});
