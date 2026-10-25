/** Copywriter-owned strings for Lab post header (design E1). Swap literals here only. */

export const LAB_POST_BACK_BUTTON_LABEL = "Back";

export const LAB_POST_LONG_REPO_FIXTURE_ID = "FIXTURE-e1-long-repo";
export const LAB_POST_LONG_REPO_FIXTURE_SOURCE = "wanshuiyin/auto-claude-code-research-in-sleep";

/** E1 header only when `experiments.json` has no sourceRepo (never set sourceRepo to this). */
export const LAB_POST_HEADER_FALLBACK_SOURCE_REPO = "leftyshields/ai-tastemakers";
export const LAB_POST_HEADER_FALLBACK_DISPLAY = "Leftyshields/ai-tastemakers";
export const LAB_POST_HEADER_FALLBACK_GITHUB_URL =
  "https://github.com/Leftyshields/ai-tastemakers";

/** Right half of planned post split chip. */
export const LAB_POST_EXPERIMENT_PLAN_LINK_LABEL = "See the experiment plan";

/** Shown under planned split chip (Copywriter final). */
export const LAB_POST_PLANNED_CHIP_EXPLAINER =
  "This experiment is in the Lab and hasn't run yet. Results land here once it does.";

/** Legacy overrides when a post has no `lead:` front matter; prefer YAML on the markdown file. */
export const LAB_POST_LEAD: Readonly<Record<string, string>> = {};
