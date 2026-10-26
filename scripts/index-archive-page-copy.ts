import type { EditionId } from "../src/tastemaker/editions.js";

/** Copy for Days (briefings), weekly, and monthly archive index pages. */

export const DAYS_ARCHIVE_PAGE_TITLE: Record<EditionId, string> = {
  oss: "Every Daily List | AI Tastemakers",
  skills: "Every Daily List | Skill Tastemakers",
};

export const DAYS_ARCHIVE_META_DESCRIPTION =
  "Every daily Tastemakers list in one calendar. Pick a date to see that morning's top 10 picks and why each one mattered.";

export const DAYS_ARCHIVE_SECTION_HEADING = "Every daily list";

export const DAYS_ARCHIVE_EMPTY =
  "No lists yet. The first one lands tomorrow morning.";

export function daysArchiveIntroForEdition(
  editionId: EditionId,
  earliestIsoDate: string | undefined,
): string {
  const sinceJune =
    earliestIsoDate && earliestIsoDate.startsWith("2026-06") ? " since June" : "";
  if (editionId === "skills") {
    return `Every Skill Tastemakers list${sinceJune}, one calendar. Pick a date to see that morning's top 10.`;
  }
  return `Every AI Tastemakers list${sinceJune}, one calendar. Pick a date to see that morning's top 10.`;
}

export const WEEKLY_INDEX_PAGE_TITLE = "Weekly reviews";

export const WEEKLY_INDEX_META_DESCRIPTION =
  "Every Sunday, the week's biggest open source AI projects and agent skills, plus what builders can take from them.";

export const WEEKLY_INDEX_SECTION_HEADING = "Weekly reviews";

export const WEEKLY_INDEX_INTRO =
  "Every Sunday, a look back at the week's biggest projects and skills, and what builders can take from them.";

export const MONTHLY_INDEX_PAGE_TITLE = "Monthly rollups";

export const MONTHLY_INDEX_META_DESCRIPTION =
  "Once a month, the big trends across four weeks of Tastemakers reviews, plus what builders can take from them.";

export const MONTHLY_INDEX_SECTION_HEADING = "Monthly rollups";

export const MONTHLY_INDEX_INTRO =
  "Once a month, the big trends from four weeks of reviews, boiled down to what's worth knowing.";

export function archiveBackLinkLabel(editionId: EditionId): string {
  return editionId === "skills" ? "Skill Tastemakers" : "AI Tastemakers";
}
