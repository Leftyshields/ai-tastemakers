import { dateLabelInTimezone } from "../weekly/week.js";

const MONTH_ID_RE = /^(\d{4})-(\d{2})$/;

function parseDateLabel(label: string): { y: number; m: number; d: number } {
  const [y, m, d] = label.split("-").map(Number);
  return { y, m, d };
}

function formatDateLocal(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

/** Day of week for civil date (0=Sun … 6=Sat), independent of host timezone. */
function dayOfWeekForLabel(label: string): number {
  const { y, m, d } = parseDateLabel(label);
  return new Date(Date.UTC(y, m - 1, d, 12)).getUTCDay();
}

export function monthIdFromDateLabel(label: string): string {
  const { y, m } = parseDateLabel(label);
  return `${y}-${String(m).padStart(2, "0")}`;
}

export function monthBounds(monthId: string): { month_start: string; month_end: string } {
  const match = MONTH_ID_RE.exec(monthId.trim());
  if (!match) {
    throw new Error(`Invalid month id "${monthId}". Expected YYYY-MM (e.g. 2026-06).`);
  }
  const y = parseInt(match[1], 10);
  const mo = parseInt(match[2], 10);
  if (mo < 1 || mo > 12) {
    throw new Error(`Invalid month number in "${monthId}".`);
  }
  const month_start = formatDateLocal(y, mo, 1);
  const lastDay = new Date(Date.UTC(y, mo, 0)).getUTCDate();
  const month_end = formatDateLocal(y, mo, lastDay);
  return { month_start, month_end };
}

/** Count of Sundays in the civil month on or before `dateLabel`. */
export function sundayOfMonthCount(dateLabel: string): number {
  const { y, m, d } = parseDateLabel(dateLabel);
  let count = 0;
  for (let day = 1; day <= d; day++) {
    const label = formatDateLocal(y, m, day);
    if (dayOfWeekForLabel(label) === 0) count++;
  }
  return count;
}

export function isSundayDateLabel(dateLabel: string): boolean {
  return dayOfWeekForLabel(dateLabel) === 0;
}

export function isFourthSunday(date: Date, timezone: string): boolean {
  const label = dateLabelInTimezone(date, timezone);
  if (!isSundayDateLabel(label)) return false;
  return sundayOfMonthCount(label) === 4;
}

/** Civil date label of the fourth Sunday in `monthId`, or undefined if none. */
export function fourthSundayOfMonth(monthId: string): string | undefined {
  const { month_start, month_end } = monthBounds(monthId);
  const { y, m } = parseDateLabel(month_start);
  const endDay = parseDateLabel(month_end).d;
  let sundayCount = 0;
  for (let day = 1; day <= endDay; day++) {
    const label = formatDateLocal(y, m, day);
    if (dayOfWeekForLabel(label) === 0) {
      sundayCount++;
      if (sundayCount === 4) return label;
    }
  }
  return undefined;
}

export function parseMonthArg(argv: string[]): string | undefined {
  const idx = argv.indexOf("--month");
  if (idx >= 0 && argv[idx + 1]) return argv[idx + 1];
  return undefined;
}
