import type { GitHubClient } from "./client.js";
import type { CandidateRepo } from "../types.js";

interface GitHubRepo {
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

interface GitHubReadme {
  content: string;
  encoding: string;
}

function decodeReadme(content: string, encoding: string, maxChars: number): string {
  if (encoding !== "base64") {
    return content.slice(0, maxChars);
  }
  const text = Buffer.from(content, "base64").toString("utf-8");
  return text.slice(0, maxChars);
}

export async function enrichRepo(
  client: GitHubClient,
  candidate: CandidateRepo,
  readmeMaxChars: number,
): Promise<CandidateRepo> {
  const [owner, repo] = candidate.full_name.split("/");
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  const data = await client.request<GitHubRepo>(url);

  let readme_excerpt = "";
  try {
    const readme = await client.requestOptional<GitHubReadme>(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
    );
    if (readme?.content) {
      readme_excerpt = decodeReadme(readme.content, readme.encoding, readmeMaxChars);
    }
  } catch {
    /* README optional */
  }

  const topics = new Set([...candidate.topics, ...(data.topics ?? [])]);

  return {
    full_name: data.full_name,
    html_url: data.html_url,
    stars: data.stargazers_count,
    topics: [...topics],
    description: data.description,
    pushed_at: data.pushed_at,
    language: data.language,
    is_fork: data.fork,
    is_archived: data.archived,
    readme_excerpt,
  };
}

export async function enrichCandidates(
  client: GitHubClient,
  candidates: CandidateRepo[],
  readmeMaxChars: number,
): Promise<CandidateRepo[]> {
  const enriched: CandidateRepo[] = [];
  for (const c of candidates) {
    try {
      enriched.push(await enrichRepo(client, c, readmeMaxChars));
    } catch (err) {
      console.warn(`Enrich failed for ${c.full_name}:`, err);
      enriched.push(c);
    }
  }
  return enriched;
}
