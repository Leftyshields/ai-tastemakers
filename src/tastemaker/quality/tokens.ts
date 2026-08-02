import path from "node:path";

/** Anthropic API token counts for a single narration call. */

export interface TokenUsage {
  input_tokens: number;
  output_tokens: number;
}

export function totalTokens(usage: TokenUsage): number {
  return usage.input_tokens + usage.output_tokens;
}

export function sumTokenUsage(usages: Iterable<TokenUsage | undefined>): TokenUsage {
  let input_tokens = 0;
  let output_tokens = 0;
  for (const u of usages) {
    if (!u) continue;
    input_tokens += u.input_tokens;
    output_tokens += u.output_tokens;
  }
  return { input_tokens, output_tokens };
}

export interface PerRepoTokenUsage {
  full_name: string;
  input_tokens: number;
  output_tokens: number;
  output_words: number;
  brief_chars: number;
}

export interface TokenUsageLogEntry {
  logged_at: string;
  run_id: string;
  edition: string;
  date: string;
  model: string;
  /** control | treatment for shadow A/B; single for production runs. */
  variant: "control" | "treatment" | "single";
  shadow: boolean;
  experiment_id?: string;
  flags: {
    enrich_web: boolean;
    structured_context: boolean;
    ponytail: boolean;
  };
  repos_narrated: number;
  repos_failed: number;
  input_tokens: number;
  output_tokens: number;
  output_words: number;
  per_repo: PerRepoTokenUsage[];
}

export function tokenLogPath(rootDir: string): string {
  return path.join(rootDir, "data", "quality", "token-usage.jsonl");
}

export function countWords(text: string | null | undefined): number {
  if (!text?.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

export function buildTokenLogEntry(input: {
  run_id: string;
  edition: string;
  date: string;
  model: string;
  variant: TokenUsageLogEntry["variant"];
  shadow: boolean;
  experiment_id?: string;
  flags: TokenUsageLogEntry["flags"];
  results: Map<string, { brief: string | null; usage?: TokenUsage }>;
}): TokenUsageLogEntry {
  const per_repo: PerRepoTokenUsage[] = [];
  let repos_failed = 0;

  for (const [full_name, result] of input.results) {
    if (!result.brief) repos_failed += 1;
    per_repo.push({
      full_name,
      input_tokens: result.usage?.input_tokens ?? 0,
      output_tokens: result.usage?.output_tokens ?? 0,
      output_words: countWords(result.brief),
      brief_chars: result.brief?.length ?? 0,
    });
  }

  const totals = sumTokenUsage(per_repo.map((r) => ({ input_tokens: r.input_tokens, output_tokens: r.output_tokens })));

  return {
    logged_at: new Date().toISOString(),
    run_id: input.run_id,
    edition: input.edition,
    date: input.date,
    model: input.model,
    variant: input.variant,
    shadow: input.shadow,
    experiment_id: input.experiment_id,
    flags: input.flags,
    repos_narrated: input.results.size,
    repos_failed,
    input_tokens: totals.input_tokens,
    output_tokens: totals.output_tokens,
    output_words: per_repo.reduce((n, r) => n + r.output_words, 0),
    per_repo,
  };
}

export async function appendTokenLog(rootDir: string, entry: TokenUsageLogEntry): Promise<void> {
  const fs = await import("node:fs/promises");
  const logPath = tokenLogPath(rootDir);
  await fs.mkdir(path.dirname(logPath), { recursive: true });
  await fs.appendFile(logPath, `${JSON.stringify(entry)}\n`, "utf8");
}

export async function readTokenLog(rootDir: string): Promise<TokenUsageLogEntry[]> {
  const fs = await import("node:fs/promises");
  const logPath = tokenLogPath(rootDir);
  try {
    const raw = await fs.readFile(logPath, "utf8");
    return raw
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => JSON.parse(line) as TokenUsageLogEntry);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}
