import type { EditionId } from "./editions.js";

export type RankingMode =
  | "delta_7d"
  | "bootstrap_since_first_seen"
  | "bootstrap_total_stars";

export interface CandidateRepo {
  full_name: string;
  html_url: string;
  stars: number;
  topics: string[];
  description: string | null;
  pushed_at: string;
  language: string | null;
  is_fork: boolean;
  is_archived: boolean;
  readme_excerpt?: string;
}

export interface SnapshotRecord {
  full_name: string;
  stars: number;
  observed_at: string;
}

export interface ScoredRepo extends CandidateRepo {
  stars_gained_7d: number;
  score: number;
}

export interface DigestRepo {
  rank: number;
  full_name: string;
  html_url: string;
  stars: number;
  stars_gained_7d: number;
  topics: string[];
  language: string | null;
  brief: string | null;
  pushed_at: string;
}

export interface Digest {
  schema_version: 1;
  run_id: string;
  generated_at: string;
  ranking_mode: RankingMode;
  topic_queries: string[];
  repos: DigestRepo[];
}

export interface WeeklyRepeatRepo {
  full_name: string;
  days_appeared: number;
}

export interface WeeklyStandout {
  full_name: string;
  total_stars_gained: number;
  days_appeared: number;
  excerpt: string;
}

export interface WeeklyEditionStats {
  unique_repos: number;
  total_stars_gained: number;
  top_topics: string[];
  repeat_repos: WeeklyRepeatRepo[];
  standouts: WeeklyStandout[];
}

export interface WeeklyStats {
  unique_repos: { oss: number; skills: number };
  total_stars_gained: { oss: number; skills: number };
  top_topics: { oss: string[]; skills: string[] };
  repeat_repos: { oss: WeeklyRepeatRepo[]; skills: WeeklyRepeatRepo[] };
  cross_edition_overlap: string[];
  ranking_modes: RankingMode[];
  standouts: { oss: WeeklyStandout[]; skills: WeeklyStandout[] };
}

export interface WeeklyNarrative {
  opening: string;
  oss: string;
  skills: string;
  cross_lane: string;
  takeaway: string;
}

export interface WeeklyReview {
  schema_version: 1;
  week_id: string;
  week_start: string;
  week_end: string;
  days_covered: { oss: number; skills: number };
  stats: WeeklyStats;
  narrative: WeeklyNarrative;
  generated_at: string;
}

export interface LoadedDigestEntry {
  date: string;
  edition: "oss" | "skills";
  digest: Digest;
}

export interface WeeklyAggregate {
  week_id: string;
  week_start: string;
  week_end: string;
  dates: string[];
  entries: LoadedDigestEntry[];
  stats: WeeklyStats;
}

export interface WeeklyConfig {
  rootDir: string;
  timezone: string;
  anthropicApiKey: string;
  anthropicModel: string;
}

export interface AppConfig {
  githubToken: string;
  anthropicApiKey: string;
  anthropicModel: string;
  timezone: string;
  topN: number;
  minStars: number;
  pushedWithinDays: number;
  topics: string[];
  searchPagesPerTopic: number;
  blocklist: Set<string>;
  maxStarsBootstrap: number;
  softDedupBriefingCount: number;
  softDedupPenalty: number;
  readmeMaxChars: number;
  rootDir: string;
  snapshotPath: string;
  briefingsDir: string;
  resendApiKey?: string;
  digestEmailFrom?: string;
  digestEmailTo: string[];
  digestSiteUrl: string;
  editionId: EditionId;
  editionName: string;
  firebaseProjectId?: string;
  firebaseClientEmail?: string;
  firebasePrivateKey?: string;
  firebaseServiceAccount?: Record<string, unknown>;
}
