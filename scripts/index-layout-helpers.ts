import fs from "node:fs/promises";
import path from "node:path";

export interface ArchiveMonthGroup {
  label: string;
  monthKey?: string;
  dates: string[];
  defaultOpen: boolean;
}

export interface MonthDateGroup {
  monthKey: string;
  label: string;
  dates: string[];
}

export interface CalendarCell {
  day: number | null;
  isoDate?: string;
}

export function landingLayoutV2Enabled(): boolean {
  return process.env.SITE_LANDING_LAYOUT_V2 === "1";
}

export function topRepoShortName(fullName: string, maxLen = 24): string {
  const segment = fullName.includes("/") ? fullName.split("/").pop()! : fullName;
  if (segment.length <= maxLen) return segment;
  return `${segment.slice(0, maxLen - 1)}…`;
}

export function monthKeyFromIsoDate(isoDate: string): string {
  return isoDate.slice(0, 7);
}

/** Calendar months between `monthKey` (YYYY-MM) and `referenceMonthKey` (positive = monthKey is earlier). */
export function monthsBeforeReference(monthKey: string, referenceMonthKey: string): number {
  const [ry, rm] = referenceMonthKey.split("-").map(Number);
  const [y, m] = monthKey.split("-").map(Number);
  return (ry - y) * 12 + (rm - m);
}

export function formatArchiveMonthLabel(monthKey: string): string {
  const [y, m] = monthKey.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

export function groupArchiveDates(dates: string[], referenceDate = new Date()): ArchiveMonthGroup[] {
  if (dates.length === 0) return [];

  const referenceMonthKey = `${referenceDate.getFullYear()}-${String(referenceDate.getMonth() + 1).padStart(2, "0")}`;

  const byMonth = new Map<string, string[]>();
  for (const date of dates) {
    const key = monthKeyFromIsoDate(date);
    const bucket = byMonth.get(key) ?? [];
    bucket.push(date);
    byMonth.set(key, bucket);
  }

  const recentGroups: ArchiveMonthGroup[] = [];
  const olderDates: string[] = [];

  const sortedKeys = [...byMonth.keys()].sort((a, b) => b.localeCompare(a));

  for (const monthKey of sortedKeys) {
    const monthDates = byMonth.get(monthKey)!.sort((a, b) => b.localeCompare(a));
    const age = monthsBeforeReference(monthKey, referenceMonthKey);

    if (age > 2) {
      olderDates.push(...monthDates);
      continue;
    }

    recentGroups.push({
      label: formatArchiveMonthLabel(monthKey),
      monthKey,
      dates: monthDates,
      defaultOpen: monthKey === referenceMonthKey,
    });
  }

  if (olderDates.length > 0) {
    recentGroups.push({
      label: "Older archives",
      dates: olderDates.sort((a, b) => b.localeCompare(a)),
      defaultOpen: false,
    });
  }

  return recentGroups;
}

/** Group briefing dates by calendar month (newest first). No "Older archives" merge. */
export function groupDatesByMonth(dates: string[]): MonthDateGroup[] {
  if (dates.length === 0) return [];

  const byMonth = new Map<string, string[]>();
  for (const date of dates) {
    const key = monthKeyFromIsoDate(date);
    const bucket = byMonth.get(key) ?? [];
    bucket.push(date);
    byMonth.set(key, bucket);
  }

  return [...byMonth.keys()]
    .sort((a, b) => b.localeCompare(a))
    .map((monthKey) => ({
      monthKey,
      label: formatArchiveMonthLabel(monthKey),
      dates: byMonth.get(monthKey)!.sort((a, b) => b.localeCompare(a)),
    }));
}

/** Sun–Sat calendar grid for one month; `isoDate` set only when day has a briefing. */
export function buildMonthCalendarCells(
  year: number,
  month: number,
  briefingDates: Set<string>,
): CalendarCell[] {
  const startWeekday = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: CalendarCell[] = [];

  for (let i = 0; i < startWeekday; i++) {
    cells.push({ day: null });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isoDate = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push(briefingDates.has(isoDate) ? { day: d, isoDate } : { day: d });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ day: null });
  }

  return cells;
}

/** Batch-load rank-1 repo metadata for archive day tooltips (missing dates omitted). */
export async function loadTopRepoMetaMap(
  briefingsDir: string,
  dates: string[],
): Promise<Map<string, { shortName: string; fullName: string }>> {
  const entries = await Promise.all(
    dates.map(async (date) => {
      const meta = await loadTopRepoMeta(briefingsDir, date);
      return meta ? ([date, meta] as const) : null;
    }),
  );
  return new Map(entries.filter((e): e is [string, { shortName: string; fullName: string }] => e !== null));
}

export async function loadTopRepoForDate(
  briefingsDir: string,
  date: string,
): Promise<string | undefined> {
  const meta = await loadTopRepoMeta(briefingsDir, date);
  return meta?.shortName;
}

export async function loadTopRepoMeta(
  briefingsDir: string,
  date: string,
): Promise<{ shortName: string; fullName: string } | undefined> {
  const filePath = path.join(briefingsDir, date, "digest.json");
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as {
      repos?: Array<{ rank?: number; full_name?: string }>;
    };
    const fullName =
      parsed.repos?.find((r) => r.rank === 1)?.full_name?.trim() ??
      parsed.repos?.[0]?.full_name?.trim();
    if (!fullName) return undefined;
    return { fullName, shortName: topRepoShortName(fullName) };
  } catch {
    return undefined;
  }
}
