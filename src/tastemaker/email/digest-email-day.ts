/** Sunday calendar-day check in America/Los_Angeles (same convention as pipeline / weekly). */
export function isSundayDateLabelInPacific(dateLabel: string, tz = "America/Los_Angeles"): boolean {
  const [y, m, d] = dateLabel.split("-").map(Number);
  const utcNoon = new Date(Date.UTC(y, m - 1, d, 12));
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short" }).format(
    utcNoon,
  );
  return weekday === "Sun";
}

/** Weekdays expect a daily top-10 email; Sunday sends weekly wrap instead. */
export function dailyDigestEmailExpectedForDateLabel(dateLabel: string): boolean {
  return !isSundayDateLabelInPacific(dateLabel);
}
