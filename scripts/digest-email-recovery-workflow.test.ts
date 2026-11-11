import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const WORKFLOWS = [
  {
    file: ".github/workflows/digest-verify.yml",
    jobId: "email_recovery",
    sendStepName: "Send digest email from stored briefing",
    sendStepId: "email_send",
    markerStepId: "email_marker_push",
  },
  {
    file: ".github/workflows/digest-catchup.yml",
    jobId: "email_recovery",
    sendStepName: "Send digest email from stored briefing",
    sendStepId: "email_send",
    markerStepId: "email_marker_push",
  },
  {
    file: ".github/workflows/digest.yml",
    jobId: "email_backstop",
    sendStepName: "Resend digest email from existing briefing",
    sendStepId: "email_resend",
    markerStepId: "email_marker_commit",
  },
] as const;

function jobBlock(yml: string, jobId: string): string {
  const lines = yml.split("\n");
  const start = lines.findIndex((line) => line === `  ${jobId}:`);
  expect(start).toBeGreaterThanOrEqual(0);
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^  [a-z0-9_]+:$/.test(lines[i]!)) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join("\n");
}

function stepBlock(job: string, stepName: string): string {
  const marker = `- name: ${stepName}`;
  const start = job.indexOf(marker);
  expect(start).toBeGreaterThanOrEqual(0);
  const next = job.indexOf("\n      - name:", start + marker.length);
  return next === -1 ? job.slice(start) : job.slice(start, next);
}

describe("digest email recovery / backstop workflow guards", () => {
  for (const wf of WORKFLOWS) {
    describe(wf.file, () => {
      const yml = fs.readFileSync(path.join(process.cwd(), wf.file), "utf8");
      const job = jobBlock(yml, wf.jobId);
      const send = stepBlock(job, wf.sendStepName);

      it("continues the job when send/resend fails so alerts can run", () => {
        expect(send).toMatch(/continue-on-error:\s*true/);
      });

      it("continues the job when marker push fails", () => {
        const marker = job.includes(`id: ${wf.markerStepId}`)
          ? job.split(`id: ${wf.markerStepId}`)[1]!.split("- name:")[0]!
          : "";
        expect(marker).toMatch(/continue-on-error:\s*true/);
      });

      it("uses always() on targeted send-failure alerts and fail steps", () => {
        expect(job).toContain(`if: always() && steps.${wf.sendStepId}.outcome == 'failure'`);
        expect(job).toMatch(new RegExp(`Fail when email[\\s\\S]*if: always\\(\\) && steps\\.${wf.sendStepId}\\.outcome == 'failure'`));
      });

      it("uses always() on marker-push failure alerts and fail steps", () => {
        expect(job).toMatch(
          new RegExp(
            `Alert when marker push failed[\\s\\S]*if: always\\(\\) && steps\\.${wf.sendStepId}\\.outcome == 'success' && steps\\.${wf.markerStepId}\\.outcome == 'failure'`,
          ),
        );
        expect(job).toMatch(
          new RegExp(
            `Fail when marker push failed\\n        if: always\\(\\) && steps\\.${wf.sendStepId}\\.outcome == 'success' && steps\\.${wf.markerStepId}\\.outcome == 'failure'`,
          ),
        );
      });

      it("does not use a generic failure\\(\\) alert that implies unsent email", () => {
        expect(job).not.toMatch(/\n      - name: Alert on email backstop job failure/);
        expect(job).not.toMatch(/Alert on email backstop job failure[\s\S]*failure\(\)\n/);
      });

      it("authenticates marker git push with HTTP Basic x-access-token", () => {
        const markerStep = job.split(`id: ${wf.markerStepId}`)[1]!.split("- name:")[0]!;
        expect(markerStep).toContain("x-access-token");
        expect(markerStep).toContain("AUTHORIZATION: basic");
        expect(markerStep).toContain("::add-mask::");
        expect(markerStep).not.toContain("AUTHORIZATION: bearer");
      });

      it("scopes unexpected-failure alerts to non-send non-marker failures", () => {
        expect(job).toMatch(
          /Alert on unexpected[\s\S]*if: \|[\s\S]*always\(\)[\s\S]*failure\(\)[\s\S]*steps\.[^\n]+outcome != 'failure'[\s\S]*!\(steps\.[^\n]+outcome == 'success' && steps\.[^\n]+outcome == 'failure'\)/,
        );
        expect(job).toMatch(
          /Fail on unexpected[\s\S]*if: \|[\s\S]*always\(\)[\s\S]*failure\(\)[\s\S]*steps\.[^\n]+outcome != 'failure'[\s\S]*!\(steps\.[^\n]+outcome == 'success' && steps\.[^\n]+outcome == 'failure'\)/,
        );
      });

      if (wf.file === ".github/workflows/digest-verify.yml") {
        it("re-verify after marker push skips Pages (GITHUB_TOKEN push does not redeploy)", () => {
          const reverify = stepBlock(job, "Re-verify after marker push");
          expect(reverify).toContain("verify-daily-digest.mjs --skip-pages");
          expect(reverify).not.toMatch(/verify-daily-digest\.mjs\s*$/m);
        });
      }
    });
  }
});
