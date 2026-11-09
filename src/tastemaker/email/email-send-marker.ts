import path from "node:path";
import { promises as fs } from "node:fs";

export type DailyDigestEmailSentMarker = {
  schema_version: 1;
  date_label: string;
  edition_id: "oss";
  resend_message_id: string;
  sent_at: string;
  github_run_id?: string;
};

export const EMAIL_SENT_MARKER_FILE = "email_sent.json";

export function dailyDigestEmailSentMarkerPath(
  briefingsDir: string,
  dateLabel: string,
): string {
  return path.join(briefingsDir, dateLabel, EMAIL_SENT_MARKER_FILE);
}

export async function readDailyDigestEmailSentMarker(
  briefingsDir: string,
  dateLabel: string,
): Promise<DailyDigestEmailSentMarker | null> {
  const filePath = dailyDigestEmailSentMarkerPath(briefingsDir, dateLabel);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as DailyDigestEmailSentMarker;
    if (
      parsed?.schema_version === 1 &&
      parsed.date_label === dateLabel &&
      parsed.edition_id === "oss" &&
      typeof parsed.resend_message_id === "string" &&
      parsed.resend_message_id.length > 0 &&
      typeof parsed.sent_at === "string"
    ) {
      return parsed;
    }
    return null;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}

export async function writeDailyDigestEmailSentMarker(
  briefingsDir: string,
  dateLabel: string,
  resendMessageId: string,
  sentAt: Date = new Date(),
): Promise<string> {
  const marker: DailyDigestEmailSentMarker = {
    schema_version: 1,
    date_label: dateLabel,
    edition_id: "oss",
    resend_message_id: resendMessageId,
    sent_at: sentAt.toISOString(),
    github_run_id: process.env.GITHUB_RUN_ID?.trim() || undefined,
  };
  const filePath = dailyDigestEmailSentMarkerPath(briefingsDir, dateLabel);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(marker, null, 2)}\n`, "utf8");
  return filePath;
}
