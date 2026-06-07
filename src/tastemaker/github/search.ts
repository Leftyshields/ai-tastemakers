import type { GitHubClient } from "./client.js";
import type { CandidateRepo } from "../types.js";

interface GitHubSearchItem {
  full_name: string;
  html_url: string;
  stargazers_count: number;
  topics?: string[];
  description: string | null;
  pushed_at: string;
  language: string | null;
  fork: boolean;
  archived: boolean;
}

interface GitHubSearchResponse {
  items: GitHubSearchItem[];
}

function mapItem(item: GitHubSearchItem): CandidateRepo {
  return {
    full_name: item.full_name,
    html_url: item.html_url,
    stars: item.stargazers_count,
    topics: item.topics ?? [],
    description: item.description,
    pushed_at: item.pushed_at,
    language: item.language,
    is_fork: item.fork,
    is_archived: item.archived,
  };
}

export function mergeCandidates(maps: CandidateRepo[][]): CandidateRepo[] {
  const byName = new Map<string, CandidateRepo>();

  for (const list of maps) {
    for (const repo of list) {
      const existing = byName.get(repo.full_name);
      if (!existing) {
        byName.set(repo.full_name, { ...repo, topics: [...repo.topics] });
        continue;
      }
      const topics = new Set([...existing.topics, ...repo.topics]);
      byName.set(repo.full_name, {
        ...existing,
        stars: Math.max(existing.stars, repo.stars),
        topics: [...topics],
        description: existing.description || repo.description,
      });
    }
  }

  return [...byName.values()];
}

export async function searchByTopics(
  client: GitHubClient,
  topics: string[],
  minStars: number,
  pushedAfter: string,
  pagesPerTopic: number,
): Promise<{ candidates: CandidateRepo[]; succeededTopics: string[]; failedTopics: string[] }> {
  const results: CandidateRepo[][] = [];
  const succeededTopics: string[] = [];
  const failedTopics: string[] = [];

  for (const topic of topics) {
    const topicResults: CandidateRepo[] = [];
    let topicFailed = false;

    for (let page = 1; page <= pagesPerTopic; page++) {
      const q = encodeURIComponent(
        `topic:${topic} stars:>=${minStars} pushed:>${pushedAfter}`,
      );
      const url = `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc&per_page=100&page=${page}`;

      try {
        const data = await client.request<GitHubSearchResponse>(url);
        topicResults.push(...data.items.map(mapItem));
        if (data.items.length < 100) {
          break;
        }
      } catch (err) {
        console.error(`Search failed for topic ${topic} page ${page}:`, err);
        topicFailed = true;
        break;
      }
    }

    if (topicFailed && topicResults.length === 0) {
      failedTopics.push(topic);
    } else {
      succeededTopics.push(topic);
      results.push(topicResults);
    }
  }

  return { candidates: mergeCandidates(results), succeededTopics, failedTopics };
}
