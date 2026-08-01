import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gateScript = path.join(repoRoot, "scripts", "sunday-wrap-gate.mjs");

function runGate(cwd: string, dateLabel?: string): Record<string, string> {
  const env = { ...process.env };
  if (dateLabel) {
    env.SUNDAY_GATE_DATE = dateLabel;
  } else {
    delete env.SUNDAY_GATE_DATE;
  }
  const stdout = execFileSync("node", [gateScript], { cwd, env, encoding: "utf8" });
  const out: Record<string, string> = {};
  for (const line of stdout.trim().split("\n")) {
    const idx = line.indexOf("=");
    if (idx === -1) continue;
    out[line.slice(0, idx)] = line.slice(idx + 1);
  }
  return out;
}

describe("sunday-wrap-gate.mjs", () => {
  let tempDir: string;

  afterEach(() => {
    if (tempDir) {
      fs.rmSync(tempDir, { recursive: true, force: true });
      tempDir = "";
    }
    delete process.env.SUNDAY_GATE_DATE;
  });

  it("sets is_sunday=false on a weekday", () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sunday-gate-"));
    const out = runGate(tempDir, "2026-07-02");
    expect(out.is_sunday).toBe("false");
    expect(out.run_weekly).toBe("false");
    expect(out.run_monthly).toBe("false");
  });

  it("sets is_sunday=true and run_weekly when weekly review is missing", () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sunday-gate-"));
    const out = runGate(tempDir, "2026-06-21");
    expect(out.is_sunday).toBe("true");
    expect(out.week_id).toBe("2026-W25");
    expect(out.run_weekly).toBe("true");
    expect(out.run_monthly).toBe("false");
  });

  it("sets run_monthly on fourth Sunday when monthly review is missing", () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sunday-gate-"));
    const out = runGate(tempDir, "2026-06-28");
    expect(out.is_sunday).toBe("true");
    expect(out.run_weekly).toBe("false");
    expect(out.run_monthly).toBe("true");
    expect(out.month_id).toBe("2026-06");
  });
});
