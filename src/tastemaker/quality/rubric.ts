/** Heuristic rubric scores aligned with briefings/lab/shadow-rubric.md (1–5). */

export interface RubricScores {
  accuracy: number;
  specificity: number;
  why_now: number;
  build_with_it: number;
  noise: number;
  comment: string;
}

export interface RubricInput {
  full_name: string;
  brief: string | null;
  readme_excerpt?: string;
  external_context?: string;
}

const SECTION_LABELS = ["**What it does:**", "**Why now:**", "**Build with it:**"] as const;

function extractSection(brief: string, label: string): string {
  const start = brief.indexOf(label);
  if (start < 0) return "";
  const after = brief.slice(start + label.length);
  const nextIdx = SECTION_LABELS.map((l) => after.indexOf(l))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b)[0];
  return (nextIdx !== undefined ? after.slice(0, nextIdx) : after).trim();
}

function clampScore(n: number): number {
  return Math.max(1, Math.min(5, Math.round(n)));
}

/** Star-count-only "Why now" detector — e.g. "gained 7,268 stars this week" with no other hook. */
function isStarCountOnlyWhyNow(text: string): boolean {
  const t = text.toLowerCase();
  const hasStars =
    /\d[\d,]*\s*stars?/.test(t) ||
    /star velocity/.test(t) ||
    /gained\s+\d/.test(t);
  const hasTimelyHook =
    /launch|released|trending|hn|hacker news|reddit|thread|demo|show hn|yc|funding|v\d|beta|announcement|viral|coverage/.test(
      t,
    );
  return hasStars && !hasTimelyHook;
}

export function scoreBriefHeuristic(input: RubricInput): RubricScores {
  const brief = input.brief?.trim() ?? "";
  if (!brief) {
    return {
      accuracy: 1,
      specificity: 1,
      why_now: 1,
      build_with_it: 1,
      noise: 3,
      comment: "Missing brief text.",
    };
  }

  const what = extractSection(brief, "**What it does:**");
  const why = extractSection(brief, "**Why now:**");
  const build = extractSection(brief, "**Build with it:**");

  const hasAllSections = what.length > 10 && why.length > 10 && build.length > 10;
  const repoShort = input.full_name.split("/")[1]?.toLowerCase() ?? "";

  let specificity = 2;
  if (hasAllSections) specificity += 1;
  if (repoShort && brief.toLowerCase().includes(repoShort)) specificity += 0.5;
  if (/\d+|MCP|API|CLI|worktree|gateway|skill|agent/.test(brief)) specificity += 0.5;
  if (brief.length > 400) specificity += 0.5;

  let why_now = 2;
  if (why.length > 20) why_now += 1;
  if (isStarCountOnlyWhyNow(why)) why_now -= 1.5;
  else if (/reddit|hn|hacker news|launch|release|trending|thread|coverage/.test(why.toLowerCase()))
    why_now += 1.5;

  let build_with_it = 2;
  if (/wire|drop|point|integrat|fork|extend|config|npm|pip|cursor|claude|deploy|run/.test(build.toLowerCase()))
    build_with_it += 1.5;
  if (build.split(" ").length >= 12) build_with_it += 0.5;

  let accuracy = hasAllSections ? 4 : 3;
  if (input.readme_excerpt && what.length > 15) accuracy += 0.5;

  let noise = 4;
  if (/revolutionary|game-?changer|disrupt|best ever|must-?have/i.test(brief)) noise -= 1;

  const scores: RubricScores = {
    accuracy: clampScore(accuracy),
    specificity: clampScore(specificity),
    why_now: clampScore(why_now),
    build_with_it: clampScore(build_with_it),
    noise: clampScore(noise),
    comment: isStarCountOnlyWhyNow(why)
      ? "Why now relies mostly on star count — add a timely hook (launch, HN, Reddit, release)."
      : hasAllSections
        ? "All three sections present."
        : "Missing or thin section(s).",
  };

  return scores;
}

export function rubricMedian(scores: RubricScores): number {
  const vals = [scores.accuracy, scores.specificity, scores.why_now, scores.build_with_it, scores.noise];
  vals.sort((a, b) => a - b);
  return vals[Math.floor(vals.length / 2)]!;
}

export function rubricPass(scores: RubricScores): boolean {
  return scores.accuracy >= 3 && scores.specificity >= 3 && rubricMedian(scores) >= 3;
}

export interface RubricLogEntry {
  scored_at: string;
  edition: string;
  date: string;
  full_name: string;
  scores: RubricScores;
  pass: boolean;
}
