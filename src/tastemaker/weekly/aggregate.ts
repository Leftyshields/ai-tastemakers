import type {
  LoadedDigestEntry,
  WeeklyAggregate,
  WeeklyEditionStats,
  WeeklyRepeatRepo,
  WeeklyStandout,
  WeeklyStats,
} from "../types.js";
import type { RankingMode } from "../types.js";
import type { WeekWindow } from "./week.js";

const WHAT_IT_DOES_RE = /\*\*What it does:\*\*\s*([^\n]+)/i;

export function extractBriefExcerpt(brief: string | null): string {
  if (!brief?.trim()) return "";
  const match = WHAT_IT_DOES_RE.exec(brief);
  if (match) return match[1].trim();
  const firstSentence = brief.split(/(?<=[.!?])\s+/)[0]?.trim();
  return firstSentence ?? brief.trim().slice(0, 200);
}

function topTopicsByFrequency(
  entries: LoadedDigestEntry[],
  edition: "oss" | "skills",
  limit = 5,
): string[] {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    if (entry.edition !== edition) continue;
    for (const repo of entry.digest.repos) {
      for (const topic of repo.topics) {
        counts.set(topic, (counts.get(topic) ?? 0) + 1);
      }
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([topic]) => topic);
}

function editionStats(
  entries: LoadedDigestEntry[],
  edition: "oss" | "skills",
): WeeklyEditionStats {
  const repoDays = new Map<string, Set<string>>();
  const repoStars = new Map<string, number>();
  const repoMaxDelta = new Map<string, number>();
  const repoExcerpts = new Map<string, string>();
  const unique = new Set<string>();

  for (const entry of entries) {
    if (entry.edition !== edition) continue;
    for (const repo of entry.digest.repos) {
      unique.add(repo.full_name);
      const priorMax = repoMaxDelta.get(repo.full_name) ?? 0;
      const maxDelta = Math.max(priorMax, repo.stars_gained_7d);
      repoMaxDelta.set(repo.full_name, maxDelta);
      repoStars.set(
        repo.full_name,
        (repoStars.get(repo.full_name) ?? 0) + repo.stars_gained_7d,
      );
      if (!repoExcerpts.has(repo.full_name)) {
        const excerpt = extractBriefExcerpt(repo.brief);
        if (excerpt) repoExcerpts.set(repo.full_name, excerpt);
      }
      if (!repoDays.has(repo.full_name)) repoDays.set(repo.full_name, new Set());
      repoDays.get(repo.full_name)!.add(entry.date);
    }
  }

  const repeat_repos: WeeklyRepeatRepo[] = [...repoDays.entries()]
    .filter(([, days]) => days.size >= 2)
    .map(([full_name, days]) => ({ full_name, days_appeared: days.size }))
    .sort((a, b) => b.days_appeared - a.days_appeared || a.full_name.localeCompare(b.full_name));

  const standouts: WeeklyStandout[] = [...repoStars.entries()]
    .map(([full_name, total_stars_gained]) => ({
      full_name,
      total_stars_gained,
      days_appeared: repoDays.get(full_name)?.size ?? 1,
      excerpt: repoExcerpts.get(full_name) ?? "",
    }))
    .sort(
      (a, b) =>
        b.total_stars_gained - a.total_stars_gained ||
        a.full_name.localeCompare(b.full_name),
    )
    .slice(0, 5);

  let totalStars = 0;
  for (const delta of repoMaxDelta.values()) {
    totalStars += delta;
  }

  return {
    unique_repos: unique.size,
    total_stars_gained: totalStars,
    top_topics: topTopicsByFrequency(entries, edition),
    repeat_repos,
    standouts,
  };
}

export function aggregateWeek(
  window: WeekWindow,
  entries: LoadedDigestEntry[],
): WeeklyAggregate {
  const oss = editionStats(entries, "oss");
  const skills = editionStats(entries, "skills");

  const ossRepos = new Set<string>();
  const skillsRepos = new Set<string>();
  const rankingModes = new Set<RankingMode>();

  for (const entry of entries) {
    rankingModes.add(entry.digest.ranking_mode);
    const set = entry.edition === "oss" ? ossRepos : skillsRepos;
    for (const repo of entry.digest.repos) {
      set.add(repo.full_name);
    }
  }

  const cross_edition_overlap = [...ossRepos].filter((name) => skillsRepos.has(name)).sort();

  const stats: WeeklyStats = {
    unique_repos: { oss: oss.unique_repos, skills: skills.unique_repos },
    total_stars_gained: {
      oss: oss.total_stars_gained,
      skills: skills.total_stars_gained,
    },
    top_topics: { oss: oss.top_topics, skills: skills.top_topics },
    repeat_repos: { oss: oss.repeat_repos, skills: skills.repeat_repos },
    cross_edition_overlap,
    ranking_modes: [...rankingModes].sort(),
    standouts: { oss: oss.standouts, skills: skills.standouts },
  };

  return {
    week_id: window.week_id,
    week_start: window.week_start,
    week_end: window.week_end,
    dates: window.dates,
    entries,
    stats,
  };
}
