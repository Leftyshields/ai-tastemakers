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

  it("defaults skills extra discovery on for skills edition", () => {
    process.env.GITHUB_TOKEN = "gh";
    process.env.ANTHROPIC_API_KEY = "sk";
    delete process.env.DIGEST_SKILLS_EXTRA_DISCOVERY;
    const config = loadConfig({ editionId: "skills", rootDir: tempRoot });
    expect(config.skillsExtraDiscovery).toBe(true);
  });

  it("parses DIGEST_HUMANIZER_POLISH when set", () => {
    process.env.GITHUB_TOKEN = "gh";
    process.env.ANTHROPIC_API_KEY = "sk";
    process.env.DIGEST_HUMANIZER_POLISH = "1";
    const config = loadConfig({ editionId: "oss", rootDir: tempRoot });
    expect(config.humanizerPolish).toBe(true);
  });

  it("defaults skills extra discovery off for oss edition", () => {
    process.env.GITHUB_TOKEN = "gh";
    process.env.ANTHROPIC_API_KEY = "sk";
    process.env.DIGEST_SKILLS_EXTRA_DISCOVERY = "1";
    const config = loadConfig({ editionId: "oss", rootDir: tempRoot });
    expect(config.skillsExtraDiscovery).toBe(false);
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
