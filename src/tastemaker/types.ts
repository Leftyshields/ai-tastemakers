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
  firebaseProjectId?: string;
  firebaseClientEmail?: string;
  firebasePrivateKey?: string;
  firebaseServiceAccount?: Record<string, unknown>;
}
