import type { MonthlyAggregate, MonthlySourceWeek, MonthStats } from "../types.js";
import { monthBounds } from "./month.js";

function unionTopTopics(lists: string[], max = 5): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const list of lists) {
    for (const topic of list) {
      if (!seen.has(topic)) {
        seen.add(topic);
        out.push(topic);
        if (out.length >= max) break;
      }
    }
    if (out.length >= max) break;
  }
  return out;
}

export function aggregateMonth(
  monthId: string,
  sources: MonthlySourceWeek[],
): MonthlyAggregate {
  const { month_start, month_end } = monthBounds(monthId);
  let ossStars = 0;
  let skillsStars = 0;
  const ossTopics: string[] = [];
  const skillsTopics: string[] = [];
  const sourceWeekIds: string[] = [];

  for (const source of sources) {
    sourceWeekIds.push(source.week_id);
    ossStars += source.review.stats.total_stars_gained.oss;
    skillsStars += source.review.stats.total_stars_gained.skills;
    ossTopics.push(...source.review.stats.top_topics.oss);
    skillsTopics.push(...source.review.stats.top_topics.skills);
  }

  const stats: MonthStats = {
    total_stars_gained: { oss: ossStars, skills: skillsStars },
    top_topics: {
      oss: unionTopTopics(ossTopics),
      skills: unionTopTopics(skillsTopics),
    },
    source_week_ids: sourceWeekIds,
  };

  return {
    month_id: monthId,
    month_start,
    month_end,
    sources,
    stats,
  };
}
