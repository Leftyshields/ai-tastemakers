import { describe, it, expect, vi, beforeEach } from "vitest";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import type { AppConfig } from "../types.js";
import { resendDigestEmailForDate } from "./resend-briefing.js";

vi.mock("./resend.js", () => ({
  shouldSendDigestEmail: vi.fn(),
  sendDigestEmail: vi.fn(),
  sendWeeklyDigestEmail: vi.fn(),
}));

vi.mock("../subscribers/load.js", () => ({
  resolveDigestRecipients: vi.fn(),
}));

import { shouldSendDigestEmail, sendDigestEmail, sendWeeklyDigestEmail } from "./resend.js";
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
    vi.mocked(sendWeeklyDigestEmail).mockReset();
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

  it("on Sunday sends the weekly wrap-up when the review exists", async () => {
    const sunday = "2026-08-16";
    await fs.mkdir(path.join(tmpDir, "briefings", "weekly", "2026-W33"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "briefings", "weekly", "2026-W33", "weekly_review.json"),
      JSON.stringify({
        week_id: "2026-W33",
        week_start: "2026-08-10",
        week_end: sunday,
        days_covered: { oss: 7, skills: 7 },
        stats: {
          unique_repos: { oss: 1, skills: 1 },
          total_stars_gained: { oss: 1, skills: 1 },
          top_topics: { oss: [], skills: [] },
          repeat_repos: { oss: [], skills: [] },
          cross_edition_overlap: [],
          ranking_modes: ["delta_7d"],
          standouts: { oss: [], skills: [] },
        },
        narrative: { executive: "Strategy.", generalist: "Stack.", statistician: "" },
        generated_at: `${sunday}T12:00:00.000Z`,
      }),
      "utf8",
    );
    vi.mocked(shouldSendDigestEmail).mockResolvedValue(true);
    vi.mocked(resolveDigestRecipients).mockResolvedValue(["a@example.com"]);
    vi.mocked(sendWeeklyDigestEmail).mockResolvedValue({ id: "week-1" });

    const config: AppConfig = {
      rootDir: tmpDir,
      editionId: "oss",
      editionName: "AI Tastemakers",
      briefingsDir: path.join(tmpDir, "briefings"),
      resendApiKey: "re_test",
      digestEmailFrom: "Digest <digest@example.com>",
      digestSiteUrl: "https://example.com",
    } as AppConfig;

    const result = await resendDigestEmailForDate(config, sunday);
    expect(result.id).toBe("week-1");
    expect(sendWeeklyDigestEmail).toHaveBeenCalled();
    expect(sendDigestEmail).not.toHaveBeenCalled();
  });
});
