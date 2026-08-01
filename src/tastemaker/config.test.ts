import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { loadConfig } from "./config.js";

describe("loadConfig", () => {
  const env = process.env;
  let tempRoot: string;

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "config-test-"));
    process.env = { ...env };
    delete process.env.GITHUB_TOKEN;
    delete process.env.ANTHROPIC_API_KEY;
  });

  afterEach(() => {
    process.env = env;
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("requires pipeline secrets by default", () => {
    expect(() => loadConfig({ editionId: "oss", rootDir: tempRoot })).toThrow(
      "GITHUB_TOKEN is required",
    );
  });

  it("allows missing pipeline secrets when requirePipelineSecrets is false", () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.DIGEST_EMAIL_FROM = "Digest <digest@example.com>";
    const config = loadConfig({
      editionId: "oss",
      rootDir: tempRoot,
      requirePipelineSecrets: false,
    });
    expect(config.githubToken).toBe("");
    expect(config.anthropicApiKey).toBe("");
    expect(config.resendApiKey).toBe("re_test");
  });
});
