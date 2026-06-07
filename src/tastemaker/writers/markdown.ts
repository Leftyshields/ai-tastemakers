import { promises as fs } from "node:fs";
import path from "node:path";
import type { Digest } from "../types.js";

function bootstrapNote(mode: string): string {
  if (mode === "delta_7d") {
    return "";
  }
  return `\n\n> ⚠️ **Bootstrap ranking** (\`${mode}\`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.\n`;
}

export function renderMarkdown(
  digest: Digest,
  dateLabel: string,
  editionName = "AI Tastemakers",
): string {
  const lines: string[] = [
    `# ${editionName} — Daily Brief — ${dateLabel}`,
    "",
    `_Ranking: ${digest.ranking_mode} · ${digest.repos.length} repos · generated ${digest.generated_at}_`,
    bootstrapNote(digest.ranking_mode),
  ];

  for (const repo of digest.repos) {
    const topics = repo.topics.length ? repo.topics.join(", ") : "—";
    const delta =
      digest.ranking_mode === "bootstrap_total_stars"
        ? `(★ ${repo.stars} total)`
        : `(+${repo.stars_gained_7d} this week)`;

    lines.push(
      "",
      `## ${repo.rank}. ${repo.full_name}`,
      "",
      `${repo.html_url} · ★ ${repo.stars} ${delta} · ${topics}`,
      "",
      repo.brief ?? "_[brief unavailable]_",
    );
  }

  lines.push("");
  return lines.join("\n");
}

export async function writeDailyBrief(
  dir: string,
  digest: Digest,
  dateLabel: string,
  editionName = "AI Tastemakers",
): Promise<string> {
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, "daily_brief.md");
  await fs.writeFile(filePath, renderMarkdown(digest, dateLabel, editionName), "utf-8");
  return filePath;
}
