import fs from "node:fs/promises";
import path from "node:path";
import type { TokenUsageLogEntry } from "../../src/tastemaker/quality/tokens.js";
import { readTokenLog, rubricSummaryFromEntry } from "../../src/tastemaker/quality/tokens.js";
import { readRubricLog } from "../../src/tastemaker/quality/log.js";
import { loadAllExperiments } from "./aggregate-experiments.js";

export interface TokenUsageDailyRow {
  date: string;
  edition: string;
  runs: number;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  output_words: number;
  avg_output_tokens_per_repo: number;
  prompt_chars: number;
  avg_latency_ms: number;
  enrich_chars: number;
  estimated_usd: number;
  chars_per_input_token?: number;
  rubric_pass_count: number;
  rubric_runs: number;
  shadow_runs: number;
}

export interface TokenUsageExperimentRow {
  experiment_id: string;
  edition: string;
  window: "baseline" | "treatment" | "all";
  runs: number;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  output_words: number;
  avg_output_tokens_per_repo: number;
  prompt_chars: number;
  avg_latency_ms: number;
  enrich_chars: number;
  estimated_usd: number;
  ponytail_runs: number;
  structured_context_runs: number;
  rubric_pass_rate?: number;
}

export interface TokenUsageShadowRow {
  run_id: string;
  date: string;
  edition: string;
  experiment_id?: string;
  control_output_tokens?: number;
  treatment_output_tokens?: number;
  output_token_delta?: number;
  output_token_delta_pct?: number;
  control_output_words?: number;
  treatment_output_words?: number;
  control_prompt_chars?: number;
  treatment_prompt_chars?: number;
  control_latency_ms_avg?: number;
  treatment_latency_ms_avg?: number;
  control_estimated_usd?: number;
  treatment_estimated_usd?: number;
  narrate_ponytail?: boolean;
}

export interface TokenUsageDataFile {
  schema_version: 1;
  generated_at: string;
  entries: number;
  daily: TokenUsageDailyRow[];
  by_experiment: TokenUsageExperimentRow[];
  shadow_comparisons: TokenUsageShadowRow[];
  recent: TokenUsageLogEntry[];
}

function totalTokens(entry: Pick<TokenUsageLogEntry, "input_tokens" | "output_tokens">): number {
  return entry.input_tokens + entry.output_tokens;
}

function dateInWindow(date: string, start?: string, end?: string): boolean {
  if (!start || !end) return false;
  return date >= start && date <= end;
}

function enrichEntry(entry: TokenUsageLogEntry): TokenUsageLogEntry {
  if (entry.rubric || entry.prompt_chars != null) return entry;
  return {
    ...entry,
    prompt_chars: entry.per_repo?.reduce((n, r) => n + (r.prompt_chars ?? 0), 0) ?? 0,
    latency_ms_total: entry.per_repo?.reduce((n, r) => n + (r.latency_ms ?? 0), 0) ?? 0,
    latency_ms_avg: 0,
    enrich_chars_total: entry.per_repo?.reduce((n, r) => n + (r.enrich_chars ?? 0), 0) ?? 0,
    estimated_usd: 0,
  };
}

export function joinRubricToEntries(
  entries: TokenUsageLogEntry[],
  rubricRows: Awaited<ReturnType<typeof readRubricLog>>,
): TokenUsageLogEntry[] {
  const rubricByKey = new Map<string, (typeof rubricRows)[number]>();
  for (const row of rubricRows) {
    rubricByKey.set(`${row.date}|${row.edition}`, row);
  }
  return entries.map((entry) => {
    const normalized = enrichEntry(entry);
    if (normalized.rubric || normalized.variant !== "single") return normalized;
    const rubric = rubricByKey.get(`${normalized.date}|${normalized.edition}`);
    if (!rubric) return normalized;
    return { ...normalized, rubric: rubricSummaryFromEntry(rubric) };
  });
}

export function aggregateTokenUsage(entries: TokenUsageLogEntry[]): Omit<TokenUsageDataFile, "schema_version" | "generated_at"> {
  const production = entries.filter((e) => e.variant === "single");
  const dailyMap = new Map<
    string,
    TokenUsageDailyRow & { repos_total: number; latency_total: number; prompt_chars: number }
  >();

  for (const entry of production) {
    const key = `${entry.date}|${entry.edition}`;
    const row =
      dailyMap.get(key) ??
      ({
        date: entry.date,
        edition: entry.edition,
        runs: 0,
        input_tokens: 0,
        output_tokens: 0,
        total_tokens: 0,
        output_words: 0,
        avg_output_tokens_per_repo: 0,
        prompt_chars: 0,
        avg_latency_ms: 0,
        enrich_chars: 0,
        estimated_usd: 0,
        chars_per_input_token: undefined,
        rubric_pass_count: 0,
        rubric_runs: 0,
        shadow_runs: 0,
        repos_total: 0,
        latency_total: 0,
      } as TokenUsageDailyRow & { repos_total: number; latency_total: number; prompt_chars: number });
    row.runs += 1;
    row.repos_total += entry.repos_narrated;
    row.input_tokens += entry.input_tokens;
    row.output_tokens += entry.output_tokens;
    row.total_tokens += totalTokens(entry);
    row.output_words += entry.output_words;
    row.prompt_chars += entry.prompt_chars ?? 0;
    row.latency_total += entry.latency_ms_total ?? 0;
    row.enrich_chars += entry.enrich_chars_total ?? 0;
    row.estimated_usd = Math.round((row.estimated_usd + (entry.estimated_usd ?? 0)) * 1_000_000) / 1_000_000;
    if (entry.rubric) {
      row.rubric_runs += 1;
      if (entry.rubric.pass) row.rubric_pass_count += 1;
    }
    dailyMap.set(key, row);
  }

  for (const entry of entries.filter((e) => e.shadow)) {
    const key = `${entry.date}|${entry.edition}`;
    const row = dailyMap.get(key);
    if (row) row.shadow_runs += 1;
  }

  const daily = [...dailyMap.values()]
    .map(({ repos_total, latency_total, prompt_chars, ...row }) => {
      const chars_per_input_token =
        row.input_tokens > 0 && prompt_chars > 0
          ? Math.round((prompt_chars / row.input_tokens) * 100) / 100
          : undefined;
      return {
        ...row,
        prompt_chars,
        avg_latency_ms: row.runs > 0 ? Math.round(latency_total / repos_total) : 0,
        chars_per_input_token,
        avg_output_tokens_per_repo:
          repos_total > 0 ? Math.round((row.output_tokens / repos_total) * 10) / 10 : 0,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.edition.localeCompare(b.edition));

  const shadowRuns = new Map<string, { control?: TokenUsageLogEntry; treatment?: TokenUsageLogEntry }>();
  for (const entry of entries.filter((e) => e.shadow && e.variant !== "single")) {
    const bucket = shadowRuns.get(entry.run_id) ?? {};
    if (entry.variant === "control") bucket.control = entry;
    if (entry.variant === "treatment") bucket.treatment = entry;
    shadowRuns.set(entry.run_id, bucket);
  }

  const shadow_comparisons: TokenUsageShadowRow[] = [];
  for (const [run_id, pair] of shadowRuns) {
    if (!pair.control || !pair.treatment) continue;
    const delta = pair.treatment.output_tokens - pair.control.output_tokens;
    const pct =
      pair.control.output_tokens > 0
        ? Math.round((delta / pair.control.output_tokens) * 1000) / 10
        : undefined;
    shadow_comparisons.push({
      run_id,
      date: pair.treatment.date,
      edition: pair.treatment.edition,
      experiment_id: pair.treatment.experiment_id ?? pair.control.experiment_id,
      control_output_tokens: pair.control.output_tokens,
      treatment_output_tokens: pair.treatment.output_tokens,
      output_token_delta: delta,
      output_token_delta_pct: pct,
      control_output_words: pair.control.output_words,
      treatment_output_words: pair.treatment.output_words,
      control_prompt_chars: pair.control.prompt_chars,
      treatment_prompt_chars: pair.treatment.prompt_chars,
      control_latency_ms_avg: pair.control.latency_ms_avg,
      treatment_latency_ms_avg: pair.treatment.latency_ms_avg,
      control_estimated_usd: pair.control.estimated_usd,
      treatment_estimated_usd: pair.treatment.estimated_usd,
      narrate_ponytail: pair.treatment.flags.ponytail,
    });
  }
  shadow_comparisons.sort((a, b) => b.date.localeCompare(a.date));

  return {
    entries: entries.length,
    daily,
    by_experiment: [],
    shadow_comparisons,
    recent: [...entries].sort((a, b) => b.logged_at.localeCompare(a.logged_at)).slice(0, 50),
  };
}

export async function buildExperimentTokenRows(
  repoRoot: string,
  entries: TokenUsageLogEntry[],
): Promise<TokenUsageExperimentRow[]> {
  const experiments = await loadAllExperiments(repoRoot);
  const production = entries.filter((e) => e.variant === "single");
  const rows: TokenUsageExperimentRow[] = [];

  for (const exp of experiments) {
    for (const window of ["baseline", "treatment"] as const) {
      const w = window === "baseline" ? exp.baseline_window : exp.treatment_window;
      const matched = production.filter(
        (e) =>
          e.edition === exp.edition &&
          dateInWindow(e.date, w.start, w.end) &&
          (exp.edition !== "skills" || e.flags.enrich_web === (exp.change.flags.DIGEST_ENRICH_WEB === "1")),
      );
      if (!matched.length) continue;
      const input_tokens = matched.reduce((n, e) => n + e.input_tokens, 0);
      const output_tokens = matched.reduce((n, e) => n + e.output_tokens, 0);
      const output_words = matched.reduce((n, e) => n + e.output_words, 0);
      const repos = matched.reduce((n, e) => n + e.repos_narrated, 0);
      const rubricRuns = matched.filter((e) => e.rubric);
      const rubricPass = rubricRuns.filter((e) => e.rubric?.pass).length;
      rows.push({
        experiment_id: exp.id,
        edition: exp.edition,
        window,
        runs: matched.length,
        input_tokens,
        output_tokens,
        total_tokens: input_tokens + output_tokens,
        output_words,
        avg_output_tokens_per_repo: repos > 0 ? Math.round((output_tokens / repos) * 10) / 10 : 0,
        prompt_chars: matched.reduce((n, e) => n + (e.prompt_chars ?? 0), 0),
        avg_latency_ms:
          repos > 0
            ? Math.round(
                matched.reduce((n, e) => n + (e.latency_ms_total ?? 0), 0) / repos,
              )
            : 0,
        enrich_chars: matched.reduce((n, e) => n + (e.enrich_chars_total ?? 0), 0),
        estimated_usd:
          Math.round(matched.reduce((n, e) => n + (e.estimated_usd ?? 0), 0) * 1_000_000) / 1_000_000,
        ponytail_runs: matched.filter((e) => e.flags.ponytail).length,
        structured_context_runs: matched.filter((e) => e.flags.structured_context).length,
        rubric_pass_rate:
          rubricRuns.length > 0 ? Math.round((rubricPass / rubricRuns.length) * 100) / 100 : undefined,
      });
    }
  }

  return rows.sort((a, b) => a.experiment_id.localeCompare(b.experiment_id) || a.window.localeCompare(b.window));
}

export async function writeTokenUsageData(repoRoot: string, siteLabDir: string): Promise<number> {
  const rawEntries = await readTokenLog(repoRoot);
  const rubricRows = await readRubricLog(repoRoot);
  const entries = joinRubricToEntries(rawEntries, rubricRows);
  const aggregated = aggregateTokenUsage(entries);
  aggregated.by_experiment = await buildExperimentTokenRows(repoRoot, entries);

  const payload: TokenUsageDataFile = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    ...aggregated,
  };

  await fs.mkdir(siteLabDir, { recursive: true });
  await fs.writeFile(
    path.join(siteLabDir, "token-usage-data.json"),
    `${JSON.stringify(payload, null, 2)}\n`,
    "utf8",
  );
  return entries.length;
}
