/** Shared email_sent.json policy (verify script + digest.yml gate). Dates are PT edition labels (YYYY-MM-DD). */

export const EMAIL_SENT_MARKER_ENFORCE_FROM = '2026-11-10';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function assertIsoDateLabel(dateLabel) {
  if (!ISO_DATE.test(dateLabel)) {
    throw new Error(`Invalid date label (expected YYYY-MM-DD): ${dateLabel}`);
  }
}

export function isSundayDateLabel(dateLabel, tz = 'America/Los_Angeles') {
  assertIsoDateLabel(dateLabel);
  const [y, m, d] = dateLabel.split('-').map(Number);
  const utcNoon = new Date(Date.UTC(y, m - 1, d, 12));
  const weekday = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short' }).format(
    utcNoon,
  );
  return weekday === 'Sun';
}

/** Marker required only on weekdays on/after ENFORCE_FROM (grandfather merge day and earlier). */
export function emailSentMarkerEnforced(dateLabel) {
  if (!ISO_DATE.test(dateLabel)) return false;
  if (isSundayDateLabel(dateLabel)) return false;
  return dateLabel >= EMAIL_SENT_MARKER_ENFORCE_FROM;
}
