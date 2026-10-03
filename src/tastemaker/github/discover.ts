import type { GitHubClient } from "./client.js";
import type { AppConfig } from "../types.js";
import type { CandidateRepo } from "../types.js";
import { searchByTopics, mergeCandidates } from "./search.js";
import {
  isGitHubSearchRateLimitError,
  searchSkillsExtraDiscovery,
  SKILLS_EXTRA_DISCOVERY_BUDGET,
} from "./skills-extra-discovery.js";
import { pushedAfterIso } from "../config.js";

export interface DiscoveryResult {
  candidates: CandidateRepo[];
  succeededTopics: string[];
  failedTopics: string[];
  skillsExtraDiscovery?: {
    enabled: boolean;
    succeededQueries: string[];
    failedQueries: string[];
    addedUnique: number;
  };
}

export async function discoverCandidates(
  client: GitHubClient,
  config: AppConfig,
): Promise<DiscoveryResult> {
  const pushedAfter = pushedAfterIso(config.pushedWithinDays);
  const topicResult = await searchByTopics(
    client,
    config.topics,
    config.minStars,
    pushedAfter,
    config.searchPagesPerTopic,
  );

  if (!config.skillsExtraDiscovery || config.editionId !== "skills") {
    return topicResult;
  }

  const beforeExtra = topicResult.candidates.length;

  try {
    const extra = await searchSkillsExtraDiscovery(client, config.minStars, pushedAfter, {
      extraTopicPages: SKILLS_EXTRA_DISCOVERY_BUDGET.extraTopicPages,
      textSearchPages: SKILLS_EXTRA_DISCOVERY_BUDGET.textSearchPages,
    });

    const merged = mergeCandidates([topicResult.candidates, extra.candidates]);
    const addedUnique = merged.length - beforeExtra;

    if (extra.failedQueries.length > 0) {
      console.warn(
        `Skills extra discovery: ${extra.failedQueries.length} queries failed (${extra.failedQueries.join(", ")})`,
      );
    }
    console.error(
      `Skills extra discovery: ${extra.candidates.length} repos from supplemental queries (+${addedUnique} new vs topics-only)`,
    );

    return {
      ...topicResult,
      candidates: merged,
      skillsExtraDiscovery: {
        enabled: true,
        succeededQueries: extra.succeededQueries,
        failedQueries: extra.failedQueries,
        addedUnique,
      },
    };
  } catch (err) {
    if (isGitHubSearchRateLimitError(err)) {
      console.error(
        "Skills extra discovery hit GitHub rate limits; continuing with topic results only:",
        err,
      );
    } else {
      console.error("Skills extra discovery failed; continuing with topic results only:", err);
    }
    return {
      ...topicResult,
      skillsExtraDiscovery: {
        enabled: true,
        succeededQueries: [],
        failedQueries: ["__all__"],
        addedUnique: 0,
      },
    };
  }
}
