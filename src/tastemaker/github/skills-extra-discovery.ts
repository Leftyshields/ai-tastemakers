import type { GitHubClient } from "./client.js";
import type { CandidateRepo } from "../types.js";
import {
  buildRepositorySearchQuery,
  paginateRepositorySearch,
  mergeCandidates,
} from "./search.js";

/** Additional GitHub topics searched when Skills extra discovery is enabled. */
export const SKILLS_EXTRA_TOPICS = [
  "agent-skills",
  "skills",
  "claude-code-plugin",
  "claude-skills",
  "ai-skills",
] as const;

/**
 * Repository search text clauses (combined with stars/pushed filters).
 * Uses readme/name/description search to surface repos that omit skill-related topics.
 */
export const SKILLS_TEXT_SEARCH_TERMS = [
  "SKILL.md in:readme",
  '"claude skill" in:name,description,readme',
  '"agent skills" in:name,description',
  '"claude code plugin" in:name,description',
] as const;

/** Per-run API budget for Skills extra discovery (see PR description). */
export const SKILLS_EXTRA_DISCOVERY_BUDGET = {
  extraTopicPages: 1,
  textSearchPages: 1,
  extraTopics: SKILLS_EXTRA_TOPICS.length,
  textQueries: SKILLS_TEXT_SEARCH_TERMS.length,
  maxSearchRequests:
    SKILLS_EXTRA_TOPICS.length * 1 + SKILLS_TEXT_SEARCH_TERMS.length * 1,
} as const;

export function isGitHubSearchRateLimitError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return (
    /\b403\b/.test(msg) ||
    /\b422\b/.test(msg) ||
    /rate limit/i.test(msg) ||
    /secondary rate limit/i.test(msg)
  );
}

export interface SkillsExtraDiscoveryResult {
  candidates: CandidateRepo[];
  succeededQueries: string[];
  failedQueries: string[];
}

async function searchOneQuery(
  client: GitHubClient,
  label: string,
  innerQuery: string,
  minStars: number,
  pushedAfter: string,
  maxPages: number,
): Promise<{ label: string; repos: CandidateRepo[]; failed: boolean }> {
  const q = buildRepositorySearchQuery(innerQuery, minStars, pushedAfter);
  try {
    const { items, failed } = await paginateRepositorySearch(client, q, maxPages);
    return { label, repos: items, failed };
  } catch (err) {
    console.error(`Skills extra discovery query "${label}" failed:`, err);
    return { label, repos: [], failed: true };
  }
}

/**
 * Supplemental Skills discovery: extra topics plus text/readme searches.
 * Individual query failures are logged; the function never throws (caller may still wrap).
 */
export async function searchSkillsExtraDiscovery(
  client: GitHubClient,
  minStars: number,
  pushedAfter: string,
  budget: {
    extraTopicPages: number;
    textSearchPages: number;
  } = {
    extraTopicPages: SKILLS_EXTRA_DISCOVERY_BUDGET.extraTopicPages,
    textSearchPages: SKILLS_EXTRA_DISCOVERY_BUDGET.textSearchPages,
  },
): Promise<SkillsExtraDiscoveryResult> {
  const batches: CandidateRepo[][] = [];
  const succeededQueries: string[] = [];
  const failedQueries: string[] = [];

  for (const topic of SKILLS_EXTRA_TOPICS) {
    const { label, repos, failed } = await searchOneQuery(
      client,
      `topic:${topic}`,
      `topic:${topic}`,
      minStars,
      pushedAfter,
      budget.extraTopicPages,
    );
    if (failed && repos.length === 0) {
      failedQueries.push(label);
    } else {
      succeededQueries.push(label);
      if (repos.length > 0) batches.push(repos);
    }
  }

  for (const terms of SKILLS_TEXT_SEARCH_TERMS) {
    const { label, repos, failed } = await searchOneQuery(
      client,
      terms,
      terms,
      minStars,
      pushedAfter,
      budget.textSearchPages,
    );
    if (failed && repos.length === 0) {
      failedQueries.push(label);
    } else {
      succeededQueries.push(label);
      if (repos.length > 0) batches.push(repos);
    }
  }

  return {
    candidates: mergeCandidates(batches),
    succeededQueries,
    failedQueries,
  };
}
