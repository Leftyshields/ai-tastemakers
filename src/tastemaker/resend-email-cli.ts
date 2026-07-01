#!/usr/bin/env node
import { loadConfig } from "./config.js";
import { resendDigestEmailForDate } from "./email/resend-briefing.js";

function parseDateArg(): string | undefined {
  const idx = process.argv.indexOf("--date");
  if (idx >= 0 && process.argv[idx + 1]) return process.argv[idx + 1];
  return undefined;
}

function todayPacific(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: process.env.TZ || "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

async function main(): Promise<void> {
  try {
    const dateLabel = parseDateArg() ?? todayPacific();
    const config = loadConfig({ editionId: "oss", requirePipelineSecrets: false });
    const result = await resendDigestEmailForDate(config, dateLabel);
    console.log(
      `Digest email resent for ${dateLabel} to ${result.recipientCount} recipient(s) (id: ${result.id})`,
    );
  } catch (err) {
    console.error("Resend failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
