import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import type { ExperimentRecord } from "./experiments/types.js";
import type { AppConfig } from "./types.js";
import {
  findMilestonesForDate,
  renderReminderEmail,
  runExperimentReminders,
} from "./experiment-reminders.js";
import { buildChecklist } from "./experiment-reminder-content.js";

vi.mock("./email/resend.js", () => ({
  canSendOpsEmail: vi.fn(),
  sendOpsEmail: vi.fn(),
}));

import { canSendOpsEmail, sendOpsEmail } from "./email/resend.js";

const canSendOpsEmailMock = vi.mocked(canSendOpsEmail);
const sendOpsEmailMock = vi.mocked(sendOpsEmail);

function sampleRecord(overrides: Partial<ExperimentRecord> = {}): ExperimentRecord {
  return {
    schema_version: 1,
    id: "EXP-20260628-web-enrich-skills",
    hypothesis: "test",
    change_summary: "Enable DIGEST_ENRICH_WEB for Skills.",
    status: "baseline",
    edition: "skills",
    baseline_window: { start: "2026-06-28", end: "2026-07-11" },
    treatment_window: { start: "2026-07-12", end: "2026-07-26" },
    change: {
      flags: {
        DIGEST_ENRICH_WEB: "1",
        DIGEST_ENRICH_SHADOW: "1",
      },
    },
    snapshots: [],
    shadow_runs: [],
    verdict: "",
    keep_change: null,
    notes: "",
    ...overrides,
  };
}

describe("findMilestonesForDate", () => {
  it("matches baseline_end on 2026-07-11 for web-enrich-skills", () => {
    const matches = findMilestonesForDate(sampleRecord(), "2026-07-11");
    expect(matches).toHaveLength(1);
    expect(matches[0].milestoneType).toBe("baseline_end");
    expect(matches[0].experimentId).toBe("EXP-20260628-web-enrich-skills");
  });

  it("matches treatment_start on 2026-07-12", () => {
    const matches = findMilestonesForDate(sampleRecord(), "2026-07-12");
    expect(matches).toHaveLength(1);
    expect(matches[0].milestoneType).toBe("treatment_start");
  });

  it("skips complete status", () => {
    const matches = findMilestonesForDate(
      sampleRecord({ status: "complete" }),
      "2026-07-11",
    );
    expect(matches).toHaveLength(0);
  });

  it("includes draft experiments when date matches", () => {
    const matches = findMilestonesForDate(
      sampleRecord({
        id: "EXP-20260701-landing-layout",
        status: "draft",
        baseline_window: { start: "2026-07-18", end: "2026-07-31" },
        treatment_window: { start: "2026-08-01", end: "2026-08-14" },
        change: { flags: {} },
      }),
      "2026-07-18",
    );
    expect(matches).toHaveLength(1);
    expect(matches[0].milestoneType).toBe("baseline_start");
  });

  it("returns no matches for empty window dates", () => {
    const matches = findMilestonesForDate(
      sampleRecord({
        baseline_window: { start: "", end: "" },
        treatment_window: { start: "", end: "" },
      }),
      "2026-07-11",
    );
    expect(matches).toHaveLength(0);
  });
});

describe("buildChecklist", () => {
  it("includes digest flag hints at treatment_start", () => {
    const lines = buildChecklist("treatment_start", sampleRecord());
    expect(lines.some((l) => l.includes("DIGEST_ENRICH_WEB"))).toBe(true);
    expect(lines.some((l) => l.includes("digest.yml"))).toBe(true);
    expect(lines.some((l) => l.includes('DIGEST_ENRICH_SHADOW: "0"'))).toBe(true);
  });

  it("routes SITE_ flags to Pages build env", () => {
    const lines = buildChecklist(
      "treatment_start",
      sampleRecord({
        change: { flags: { SITE_LANDING_LAYOUT_V2: "1" } },
      }),
    );
    expect(lines.some((l) => l.includes("SITE_LANDING_LAYOUT_V2"))).toBe(true);
    expect(lines.some((l) => l.includes("Variables"))).toBe(true);
  });
});

describe("renderReminderEmail", () => {
  it("batches two milestones into one subject", () => {
    const landing = sampleRecord({
      id: "EXP-20260701-landing-layout",
      status: "baseline",
      baseline_window: { start: "2026-07-18", end: "2026-07-31" },
      treatment_window: { start: "2026-08-01", end: "2026-08-14" },
      change: { flags: {} },
    });
    const firecrawl = sampleRecord({
      id: "EXP-20260716-firecrawl-enrich-skills",
      status: "baseline",
      baseline_window: { start: "2026-07-18", end: "2026-07-31" },
      treatment_window: { start: "2026-08-01", end: "2026-08-14" },
      change: {
        flags: {
          DIGEST_ENRICH_WEB: "1",
          DIGEST_ENRICH_WEB_PROVIDER: "firecrawl",
          DIGEST_ENRICH_SHADOW: "0",
        },
      },
    });
    const matches = [
      ...findMilestonesForDate(landing, "2026-07-18"),
      ...findMilestonesForDate(firecrawl, "2026-07-18"),
    ];
    const email = renderReminderEmail(matches, "2026-07-18", "https://example.com");
    expect(email.subject).toBe("Lab reminder — 2 experiment milestones (2026-07-18 PT)");
    expect(email.text).toContain("EXP-20260701-landing-layout");
    expect(email.text).toContain("EXP-20260716-firecrawl-enrich-skills");
    expect(email.text).toContain("Baseline window starts");
  });

  it("escapes HTML in experiment notes", () => {
    const matches = findMilestonesForDate(
      sampleRecord({ notes: '<script>alert("x")</script>' }),
      "2026-07-11",
    );
    const email = renderReminderEmail(matches, "2026-07-11", "https://example.com");
    expect(email.html).not.toContain("<script>");
    expect(email.html).toContain("&lt;script&gt;");
  });
});

describe("runExperimentReminders", () => {
  let tmpDir: string;

  const baseConfig: AppConfig = {
    githubToken: "",
    anthropicApiKey: "",
    anthropicModel: "claude",
    timezone: "America/Los_Angeles",
    topN: 10,
    minStars: 50,
    pushedWithinDays: 30,
    topics: [],
    searchPagesPerTopic: 1,
    blocklist: new Set<string>(),
    maxStarsBootstrap: 80000,
    softDedupBriefingCount: 3,
    softDedupPenalty: 0.8,
    readmeMaxChars: 1000,
    rootDir: "",
    snapshotPath: "",
    briefingsDir: "",
    digestSiteUrl: "https://example.com",
    editionId: "oss",
    editionName: "AI Tastemakers",
    enrichWeb: false,
    enrichShadow: false,
    enrichWebProvider: "jina" as const,
    enrichMaxRepos: 3,
    enrichMaxChars: 1500,
    experimentReminderTo: "ops@example.com",
    resendApiKey: "re_test",
    digestEmailFrom: "Ops <ops@example.com>",
  };

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "exp-reminders-"));
    baseConfig.rootDir = tmpDir;
    canSendOpsEmailMock.mockReset();
    sendOpsEmailMock.mockReset();
    await fs.mkdir(path.join(tmpDir, "data/experiments"), { recursive: true });
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  async function writeExperiment(record: ExperimentRecord): Promise<void> {
    await fs.writeFile(
      path.join(tmpDir, "data/experiments", `${record.id}.json`),
      `${JSON.stringify(record, null, 2)}\n`,
      "utf8",
    );
  }

  it("dry-run prints payload without sending", async () => {
    await writeExperiment(sampleRecord());

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const result = await runExperimentReminders(baseConfig, {
      date: "2026-07-11",
      dryRun: true,
    });

    expect(result.matchCount).toBe(1);
    expect(result.sent).toBe(false);
    expect(sendOpsEmailMock).not.toHaveBeenCalled();
    expect(logSpy.mock.calls.some(([line]) => String(line).includes("Subject:"))).toBe(true);
    logSpy.mockRestore();
  });

  it("returns email_not_configured when matches exist but Resend env is missing", async () => {
    await writeExperiment(sampleRecord());
    canSendOpsEmailMock.mockReturnValue(false);

    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = await runExperimentReminders(baseConfig, { date: "2026-07-11" });

    expect(result.matchCount).toBe(1);
    expect(result.sent).toBe(false);
    expect(result.skippedReason).toBe("email_not_configured");
    expect(sendOpsEmailMock).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it("sends batched email when configured", async () => {
    await writeExperiment(sampleRecord());
    canSendOpsEmailMock.mockReturnValue(true);
    sendOpsEmailMock.mockResolvedValue({ id: "msg_123" });

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const result = await runExperimentReminders(baseConfig, { date: "2026-07-11" });

    expect(result.sent).toBe(true);
    expect(result.emailId).toBe("msg_123");
    expect(sendOpsEmailMock).toHaveBeenCalledWith(
      baseConfig,
      expect.objectContaining({
        to: "ops@example.com",
        subject: expect.stringContaining("1 experiment milestone"),
      }),
    );
    logSpy.mockRestore();
  });

  it("warns and skips corrupt experiment files", async () => {
    await fs.writeFile(
      path.join(tmpDir, "data/experiments", "EXP-20260702-bad.json"),
      "{ not-json",
      "utf8",
    );
    await writeExperiment(sampleRecord());

    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = await runExperimentReminders(baseConfig, {
      date: "2026-07-11",
      dryRun: true,
    });

    expect(result.matchCount).toBe(1);
    expect(warnSpy.mock.calls.some(([line]) => String(line).includes("EXP-20260702-bad"))).toBe(
      true,
    );
    warnSpy.mockRestore();
  });
});
