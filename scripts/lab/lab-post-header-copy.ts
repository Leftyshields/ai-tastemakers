/** Copywriter-owned strings for Lab post header (design E1). Swap literals here only. */

export const LAB_POST_BACK_BUTTON_LABEL = "Back";

/** Optional lead override by experiment id; falls back to first markdown paragraph. */
export const LAB_POST_LEAD: Readonly<Record<string, string>> = {
  "EXP-20260716-firecrawl-enrich-skills":
    "On Aug 1, 2026, we switched to a different tool for reading web pages, aiming for more specific and accurate Skills briefs. We kept it, though we shipped without running the planned before and after comparison.",
  "EXP-20260802-ponytail-narration-skills":
    "On Aug 17, 2026, we tightened Skills brief narration to cut tokens while keeping rubric pass rates steady.",
};

export const LAB_POST_LONG_REPO_FIXTURE_ID = "FIXTURE-e1-long-repo";
export const LAB_POST_LONG_REPO_FIXTURE_SOURCE = "wanshuiyin/auto-claude-code-research-in-sleep";
