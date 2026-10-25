/** Copywriter-owned strings for Lab post header (design C). Swap literals here only. */

export const LAB_POST_BACK_TO_LIST_LABEL = "Back to the daily list";

export const LAB_POST_CARD_LABEL_OSS = "From the OSS top 10";
export const LAB_POST_CARD_LABEL_SKILLS = "From the Skills top 10";

/** GitHub-style repo one-liners shown under the owner/repo link (hidden below 480px). */
export const LAB_POST_REPO_DESCRIPTION: Readonly<Record<string, string>> = {
  "firecrawl/firecrawl":
    "Turn any website into clean, LLM ready markdown or structured data.",
  "dietrichgebert/ponytail":
    "Structured writing rules and context for AI coding agents.",
};

export function labPostRepoDescription(sourceRepo: string): string | null {
  const key = sourceRepo.trim().toLowerCase();
  if (!key) return null;
  return LAB_POST_REPO_DESCRIPTION[key] ?? null;
}
