import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";

const script = path.join(import.meta.dirname, "send-digest-alert.mjs");

describe("send-digest-alert email missing copy", () => {
  it("exits 0 when Resend secrets are absent (dry alert path)", () => {
    const result = spawnSync("node", [script], {
      env: {
        ...process.env,
        RESEND_API_KEY: "",
        DIGEST_EMAIL_FROM: "",
        DIGEST_ALERT_TO: "",
        VERIFY_DIGEST_DATE: "2026-11-02",
        VERIFY_DIGEST_BRIEFINGS_OK: "true",
        VERIFY_DIGEST_PAGES_OK: "true",
        VERIFY_DIGEST_EMAIL_OK: "false",
        VERIFY_DIGEST_EMAIL_REQUIRED: "true",
        VERIFY_DIGEST_ERRORS: "Missing email_sent.json",
        GITHUB_TOKEN: "",
        GH_TOKEN: "",
      },
      encoding: "utf8",
    });
    assert.equal(result.status, 0);
    assert.match(result.stdout + result.stderr, /Alert email skipped/);
  });
});
