import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { loadConfig } from "./config.js";

describe("loadConfig", () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env };
    delete process.env.GITHUB_TOKEN;
    delete process.env.ANTHROPIC_API_KEY;
  });

  afterEach(() => {
    process.env = env;
  });

  it("requires pipeline secrets by default", () => {
    expect(() => loadConfig({ editionId: "oss" })).toThrow("GITHUB_TOKEN is required");
  });

  it("allows missing pipeline secrets when requirePipelineSecrets is false", () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.DIGEST_EMAIL_FROM = "Digest <digest@example.com>";
    const config = loadConfig({ editionId: "oss", requirePipelineSecrets: false });
    expect(config.githubToken).toBe("");
    expect(config.anthropicApiKey).toBe("");
    expect(config.resendApiKey).toBe("re_test");
  });
});
