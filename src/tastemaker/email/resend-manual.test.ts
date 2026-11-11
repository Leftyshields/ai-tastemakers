import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { resolveDigestResendManualRunId } from "./resend-manual.js";

describe("resolveDigestResendManualRunId", () => {
  let savedManual: string | undefined;
  let savedRun: string | undefined;

  beforeEach(() => {
    savedManual = process.env.DIGEST_RESEND_MANUAL;
    savedRun = process.env.GITHUB_RUN_ID;
    delete process.env.DIGEST_RESEND_MANUAL;
    delete process.env.GITHUB_RUN_ID;
  });

  afterEach(() => {
    if (savedManual === undefined) delete process.env.DIGEST_RESEND_MANUAL;
    else process.env.DIGEST_RESEND_MANUAL = savedManual;
    if (savedRun === undefined) delete process.env.GITHUB_RUN_ID;
    else process.env.GITHUB_RUN_ID = savedRun;
  });

  it("returns undefined for automatic recovery", () => {
    process.env.GITHUB_RUN_ID = "999";
    expect(resolveDigestResendManualRunId()).toBeUndefined();
  });

  it("returns run id when manual resend is flagged", () => {
    process.env.DIGEST_RESEND_MANUAL = "1";
    process.env.GITHUB_RUN_ID = "run-abc";
    expect(resolveDigestResendManualRunId()).toBe("run-abc");
  });
});
