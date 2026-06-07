import { randomUUID } from "node:crypto";
import path from "node:path";
import type { AppConfig, Digest, DigestRepo, ScoredRepo, SnapshotRecord } from "./types.js";
import { formatDateInTimezone, pushedAfterIso } from "./config.js";
import { GitHubClient } from "./github/client.js";
import { searchByTopics } from "./github/search.js";
import { enrichCandidates } from "./github/enrich.js";
import { appendSnapshots, readSnapshots } from "./snapshot/store.js";
import {
  computeDeltasForCandidates,
  resolveRankingMode,
  scoreForRanking,
} from "./snapshot/delta.js";
import { filterCandidates, excludeNegativeDelta, applyBootstrapMaxStars } from "./rank/filter.js";
import { applySoftDedupPenalty, loadRecentBriefingRepos } from "./rank/score.js";
import { narrateRepos } from "./narrate/claude.js";
import { writeDigestJson } from "./writers/json.js";
import { writeDailyBrief } from "./writers/markdown.js";
import { sendDigestEmail, shouldSendDigestEmail } from "./email/resend.js";
import { resolveDigestRecipients } from "./subscribers/load.js";

export interface PipelineResult {
  briefingDir: string;
  markdownPath: string;
  jsonPath: string;
  digest: Digest;
}

export interface PipelineDeps {
  narrate?: typeof narrateRepos;
  search?: typeof searchByTopics;
  enrich?: typeof enrichCandidates;
  sendEmail?: typeof sendDigestEmail;
  now?: Date;
}

export async function runPipeline(
  config: AppConfig,
  deps: PipelineDeps = {},
): Promise<PipelineResult> {
  const now = deps.now ?? new Date();
  const narrate = deps.narrate ?? narrateRepos;
  const search = deps.search ?? searchByTopics;
  const enrich = deps.enrich ?? enrichCandidates;
  const client = new GitHubClient(config.githubToken);
  const pushedAfter = pushedAfterIso(config.pushedWithinDays);

  console.error("Discovering repos…");
  const { candidates: discovered, succeededTopics, failedTopics } = await search(
    client,
    config.topics,
    config.minStars,
    pushedAfter,
    config.searchPagesPerTopic,
  );

  if (succeededTopics.length < 4) {
    throw new Error(
      `Discovery failed: only ${succeededTopics.length} topics succeeded (${failedTopics.join(", ")})`,
    );
  }
  if (failedTopics.length > 0) {
    console.warn(`Warning: topics failed: ${failedTopics.join(", ")}`);
  }

  console.error(`Discovered ${discovered.length} unique candidates`);

  let candidates = filterCandidates(discovered, {
    minStars: config.minStars,
    blocklist: config.blocklist,
    excludeArchived: true,
  });

  console.error(`Snapshotting ${candidates.length} candidates…`);
  const observedAt = now.toISOString();
  const snapshotBatch: SnapshotRecord[] = candidates.map((c) => ({
    full_name: c.full_name,
    stars: c.stars,
    observed_at: observedAt,
  }));
  await appendSnapshots(config.snapshotPath, snapshotBatch);

  const allSnapshots = await readSnapshots(config.snapshotPath);
  const deltaMap = computeDeltasForCandidates(allSnapshots, candidates, now);
  const deltaList = candidates.map((c) => deltaMap.get(c.full_name)!);
  const rankingMode = resolveRankingMode(
    deltaList,
    candidates.map((c) => c.stars),
  );

  console.error(`Ranking mode: ${rankingMode}`);

  candidates = applyBootstrapMaxStars(candidates, rankingMode, config.maxStarsBootstrap);

  const recentlyFeatured = await loadRecentBriefingRepos(
    config.briefingsDir,
    config.softDedupBriefingCount,
  );

  const rawScores = new Map<string, number>();
  let scored: ScoredRepo[] = candidates.map((c) => {
    const delta = deltaMap.get(c.full_name)!;
    const score = scoreForRanking(delta, c.stars, rankingMode);
    rawScores.set(c.full_name, score);
    return {
      ...c,
      stars_gained_7d: delta.stars_gained_7d,
      score,
    };
  });

  const adjustedScores = applySoftDedupPenalty(
    rawScores,
    recentlyFeatured,
    config.softDedupPenalty,
  );

  let ranked = scored
    .map((s) => ({ ...s, score: adjustedScores.get(s.full_name) ?? s.score }))
    .sort((a, b) => b.score - a.score || b.stars - a.stars);

  ranked = excludeNegativeDelta(ranked, rankingMode) as ScoredRepo[];

  const top = ranked.slice(0, config.topN);
  console.error(`Enriching top ${top.length} repos for narration…`);
  const enrichedTop = await enrich(client, top, config.readmeMaxChars);
  for (let i = 0; i < top.length; i++) {
    const enriched = enrichedTop.find((r) => r.full_name === top[i].full_name);
    if (enriched) top[i] = { ...top[i], ...enriched, score: top[i].score, stars_gained_7d: top[i].stars_gained_7d };
  }

  console.error(`Narrating top ${top.length} repos…`);

  const briefs = await narrate(config.anthropicApiKey, config.anthropicModel, top);

  const digestRepos: DigestRepo[] = top.map((repo, i) => ({
    rank: i + 1,
    full_name: repo.full_name,
    html_url: repo.html_url,
    stars: repo.stars,
    stars_gained_7d: repo.stars_gained_7d,
    topics: repo.topics,
    language: repo.language,
    brief: briefs.get(repo.full_name) ?? null,
    pushed_at: repo.pushed_at,
  }));

  const digest: Digest = {
    schema_version: 1,
    run_id: randomUUID(),
    generated_at: now.toISOString(),
    ranking_mode: rankingMode,
    topic_queries: config.topics,
    repos: digestRepos,
  };

  const dateLabel = formatDateInTimezone(now, config.timezone);
  const briefingDir = path.join(config.briefingsDir, dateLabel);

  console.error(`Writing briefing to ${briefingDir}…`);
  const jsonPath = await writeDigestJson(briefingDir, digest);
  const markdownPath = await writeDailyBrief(briefingDir, digest, dateLabel, config.editionName);

  if (config.editionId === "oss" && (await shouldSendDigestEmail(config))) {
    const sendEmail = deps.sendEmail ?? sendDigestEmail;
    const recipients = await resolveDigestRecipients(config);
    console.error(`Sending digest email to ${recipients.length} recipient(s)…`);
    const sent = await sendEmail(config, digest, dateLabel, recipients);
    console.error(`Email sent (id: ${sent.id})`);
  }

  return { briefingDir, markdownPath, jsonPath, digest };
}
