/**
 * Sunday wrap-up gate for GHA (plain Node — no tsx/npm install required).
 * Outputs GitHub Actions step outputs: week_id, month_id, run_weekly, run_monthly.
 */
import fs from "node:fs";

const timezone = "America/Los_Angeles";

function dateLabelInTimezone(date, timezone) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function parseDateLabel(label) {
  const [y, m, d] = label.split("-").map(Number);
  return { y, m, d };
}

function formatDateLocal(y, m, d) {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function dayOfWeekForLabel(label) {
  const { y, m, d } = parseDateLabel(label);
  return new Date(Date.UTC(y, m - 1, d, 12)).getUTCDay();
}

function sundayOfMonthCount(dateLabel) {
  const { y, m, d } = parseDateLabel(dateLabel);
  let count = 0;
  for (let day = 1; day <= d; day++) {
    if (dayOfWeekForLabel(formatDateLocal(y, m, day)) === 0) count++;
  }
  return count;
}

function isSundayDateLabel(dateLabel) {
  return dayOfWeekForLabel(dateLabel) === 0;
}

function isFourthSunday(date, tz) {
  const label = dateLabelInTimezone(date, tz);
  if (!isSundayDateLabel(label)) return false;
  return sundayOfMonthCount(label) === 4;
}

function mondayOfWeekContaining(dateLabel) {
  const dow = dayOfWeekForLabel(dateLabel);
  const daysFromMonday = dow === 0 ? 6 : dow - 1;
  const { y, m, d } = parseDateLabel(dateLabel);
  const dt = new Date(Date.UTC(y, m - 1, d, 12));
  dt.setUTCDate(dt.getUTCDate() - daysFromMonday);
  return formatDateLocal(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
}

function isoWeekIdFromDateLabel(dateLabel) {
  const monday = mondayOfWeekContaining(dateLabel);
  const { y, m, d } = parseDateLabel(monday);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const dayNum = dt.getUTCDay() || 7;
  dt.setUTCDate(dt.getUTCDate() + 4 - dayNum);
  const isoYear = dt.getUTCFullYear();
  const yearStart = new Date(Date.UTC(isoYear, 0, 1));
  const weekNo = Math.ceil(((dt.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${isoYear}-W${String(weekNo).padStart(2, "0")}`;
}

function monthIdFromDateLabel(label) {
  const { y, m } = parseDateLabel(label);
  return `${y}-${String(m).padStart(2, "0")}`;
}

const now = new Date();
const today = dateLabelInTimezone(now, timezone);

let runWeekly = false;
let runMonthly = false;
let weekId = "";
let monthId = "";

if (isSundayDateLabel(today)) {
  weekId = isoWeekIdFromDateLabel(today);
  if (isFourthSunday(now, timezone)) {
    monthId = monthIdFromDateLabel(today);
    const monthlyPath = `briefings/monthly/${monthId}/monthly_review.json`;
    if (!fs.existsSync(monthlyPath)) {
      runMonthly = true;
    }
  } else {
    const weeklyPath = `briefings/weekly/${weekId}/weekly_review.json`;
    if (!fs.existsSync(weeklyPath)) {
      runWeekly = true;
    }
  }
}

for (const line of [
  `week_id=${weekId}`,
  `month_id=${monthId}`,
  `run_weekly=${runWeekly}`,
  `run_monthly=${runMonthly}`,
]) {
  console.log(line);
}
