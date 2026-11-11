import path from "node:path";
import { promises as fs } from "node:fs";

const ISO_DATE_LABEL = /^\d{4}-\d{2}-\d{2}$/;

export function assertIsoDateLabel(dateLabel: string): void {
  if (!ISO_DATE_LABEL.test(dateLabel)) {
    throw new Error(`Invalid date label (expected YYYY-MM-DD): ${dateLabel}`);
  }
}

export type DailyDigestEmailSentMarker = {
  schema_version: 1;
  date_label: string;
  edition_id: "oss";
  /** UTC timestamp when Resend accepted the last recipient send (no Resend message id in git). */
  sent_at: string;
  recipient_count: number;
};

export const EMAIL_SENT_MARKER_FILE = "email_sent.json";

export function dailyDigestEmailSentMarkerPath(
  briefingsDir: string,
  dateLabel: string,
): string {
  assertIsoDateLabel(dateLabel);
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
      typeof parsed.sent_at === "string" &&
      typeof parsed.recipient_count === "number" &&
      parsed.recipient_count > 0
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
  recipientCount: number,
  sentAt: Date = new Date(),
): Promise<string> {
  assertIsoDateLabel(dateLabel);
  if (recipientCount < 1) {
    throw new Error("Cannot write email send marker with zero recipients");
  }
  const marker: DailyDigestEmailSentMarker = {
    schema_version: 1,
    date_label: dateLabel,
    edition_id: "oss",
    sent_at: sentAt.toISOString(),
    recipient_count: recipientCount,
  };
  const filePath = dailyDigestEmailSentMarkerPath(briefingsDir, dateLabel);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(marker, null, 2)}\n`, "utf8");
  return filePath;
}
