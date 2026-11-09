import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";

const repoRoot = path.resolve(import.meta.dirname, "..");

function writeBriefingTree(root, dateLabel) {
  for (const edition of ["", "skills/"]) {
    const dir = path.join(root, "briefings", edition, dateLabel);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "digest.json"), '{"schema_version":1}\n');
    fs.writeFileSync(
      path.join(dir, "daily_brief.md"),
      "# Daily brief fixture\n\nEnough content for verify size gate.\n",
    );
  }
}

describe("verify-daily-digest email marker gate", () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "verify-digest-"));
    writeBriefingTree(tmpDir, "2026-11-03");
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("fails when weekday briefings exist but email_sent.json is missing", () => {
    const result = spawnSync(
      "node",
      [path.join(repoRoot, "scripts/verify-daily-digest.mjs"), "--skip-pages"],
      {
        cwd: tmpDir,
        env: {
          ...process.env,
          TZ: "America/Los_Angeles",
          VERIFY_DIGEST_DATE: "2026-11-03",
        },
        encoding: "utf8",
      },
    );
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /email_sent\.json/);
  });

  it("passes when email marker exists for a weekday", () => {
    const markerDir = path.join(tmpDir, "briefings", "2026-11-03");
    fs.writeFileSync(
      path.join(markerDir, "email_sent.json"),
      `${JSON.stringify(
        {
          schema_version: 1,
          date_label: "2026-11-03",
          edition_id: "oss",
          resend_message_id: "msg-1",
          sent_at: "2026-11-03T16:00:00.000Z",
        },
        null,
        2,
      )}\n`,
    );

    const result = spawnSync(
      "node",
      [path.join(repoRoot, "scripts/verify-daily-digest.mjs"), "--skip-pages"],
      {
        cwd: tmpDir,
        env: {
          ...process.env,
          TZ: "America/Los_Angeles",
          VERIFY_DIGEST_DATE: "2026-11-03",
        },
        encoding: "utf8",
      },
    );
    assert.equal(result.status, 0, result.stderr);
  });
});
