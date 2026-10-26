import type { EditionId } from "../src/tastemaker/editions.js";

/** Copy for Days (briefings), weekly, and monthly archive index pages. Em dashes replaced with periods for copywriter pass. */

export function daysArchivePageTitle(editionName: string): string {
  return `Daily archive · ${editionName}`;
}

export const DAYS_ARCHIVE_META_DESCRIPTION =
  "Calendar of daily Tastemakers briefings.";

export const DAYS_ARCHIVE_SECTION_HEADING = "Daily archive";

export const DAYS_ARCHIVE_INTRO: Record<EditionId, string> = {
  oss: "Every daily AI Tastemakers briefing in one calendar. Pick a date to read that day's top ten.",
  skills:
    "Every daily Skill Tastemakers briefing in one calendar. Pick a date to read that day's top ten.",
};

export const DAYS_ARCHIVE_EMPTY: Record<EditionId, string> = {
  oss: "No briefings yet.",
  skills:
    "No briefings yet. Run npm run digest:skills locally or wait for the daily workflow.",
};

export const WEEKLY_INDEX_PAGE_TITLE = "Weekly reviews";

export const WEEKLY_INDEX_META_DESCRIPTION =
  "Sunday synthesis across AI Tastemakers and Skill Tastemakers.";

export const WEEKLY_INDEX_SECTION_HEADING = "Weekly reviews";

export const WEEKLY_INDEX_INTRO =
  "Sunday synthesis across AI Tastemakers and Skill Tastemakers. Themes, stats, and builder takeaways.";

export const MONTHLY_INDEX_PAGE_TITLE = "Monthly rollups";

export const MONTHLY_INDEX_META_DESCRIPTION =
  "Monthly editorial synthesis across weekly Tastemakers reviews.";

export const MONTHLY_INDEX_SECTION_HEADING = "Monthly rollups";

export const MONTHLY_INDEX_INTRO =
  "Fourth-Sunday synthesis across weekly reviews. Month-level themes and builder takeaways.";

export function archiveBackLinkLabel(editionId: EditionId): string {
  return editionId === "skills" ? "Skill Tastemakers" : "AI Tastemakers";
}
