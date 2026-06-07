export interface WeekWindow {
  week_id: string;
  week_start: string;
  week_end: string;
  dates: string[];
}

const WEEK_ID_RE = /^(\d{4})-W(\d{2})$/;

function formatDateLocal(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function dateLabelInTimezone(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function parseDateLabel(label: string): { y: number; m: number; d: number } {
  const [y, m, d] = label.split("-").map(Number);
  return { y, m, d };
}

/** Day of week for civil date (0=Sun … 6=Sat), independent of host timezone. */
function dayOfWeekForLabel(label: string): number {
  const { y, m, d } = parseDateLabel(label);
  return new Date(Date.UTC(y, m - 1, d, 12)).getUTCDay();
}

function addDaysToLabel(label: string, days: number): string {
  const { y, m, d } = parseDateLabel(label);
  const dt = new Date(Date.UTC(y, m - 1, d, 12));
  dt.setUTCDate(dt.getUTCDate() + days);
  return formatDateLocal(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
}

function mondayOfWeekContaining(dateLabel: string): string {
  const dow = dayOfWeekForLabel(dateLabel);
  const daysFromMonday = dow === 0 ? 6 : dow - 1;
  return addDaysToLabel(dateLabel, -daysFromMonday);
}

/** ISO week id (YYYY-Www) for the calendar week containing `dateLabel`. */
export function isoWeekIdFromDateLabel(dateLabel: string): string {
  const monday = mondayOfWeekContaining(dateLabel);
  const { y, m, d } = parseDateLabel(monday);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const dayNum = dt.getUTCDay() || 7;
  dt.setUTCDate(dt.getUTCDate() + 4 - dayNum);
  const isoYear = dt.getUTCFullYear();
  const yearStart = new Date(Date.UTC(isoYear, 0, 1));
  const weekNo = Math.ceil(
    ((dt.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7,
  );
  return `${isoYear}-W${String(weekNo).padStart(2, "0")}`;
}

function mondayOfIsoWeek(isoYear: number, week: number): string {
  const jan4 = new Date(Date.UTC(isoYear, 0, 4));
  const day = jan4.getUTCDay() || 7;
  const mondayWeek1 = new Date(jan4);
  mondayWeek1.setUTCDate(jan4.getUTCDate() - day + 1);
  const monday = new Date(mondayWeek1);
  monday.setUTCDate(mondayWeek1.getUTCDate() + (week - 1) * 7);
  return formatDateLocal(
    monday.getUTCFullYear(),
    monday.getUTCMonth() + 1,
    monday.getUTCDate(),
  );
}

export function parseWeekId(weekId: string): WeekWindow {
  const match = WEEK_ID_RE.exec(weekId.trim());
  if (!match) {
    throw new Error(`Invalid week id "${weekId}". Expected YYYY-Www (e.g. 2026-W23).`);
  }
  const isoYear = parseInt(match[1], 10);
  const week = parseInt(match[2], 10);
  if (week < 1 || week > 53) {
    throw new Error(`Invalid ISO week number in "${weekId}".`);
  }

  const week_start = mondayOfIsoWeek(isoYear, week);
  const dates = Array.from({ length: 7 }, (_, i) => addDaysToLabel(week_start, i));
  const week_end = dates[6];

  return { week_id: `${isoYear}-W${String(week).padStart(2, "0")}`, week_start, week_end, dates };
}

export function weekContaining(date: Date, timezone: string): WeekWindow {
  const label = dateLabelInTimezone(date, timezone);
  const week_id = isoWeekIdFromDateLabel(label);
  return parseWeekId(week_id);
}

export function parseWeekArg(argv: string[]): string | undefined {
  const idx = argv.indexOf("--week");
  if (idx >= 0 && argv[idx + 1]) return argv[idx + 1];
  return undefined;
}
