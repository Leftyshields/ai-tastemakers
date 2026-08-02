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
  estimated_entries: number;
  daily: TokenUsageDailyRow[];
  by_experiment: TokenUsageExperimentRow[];
  shadow_comparisons: TokenUsageShadowRow[];
  recent: TokenUsageLogEntry[];
}

function entryPriority(entry: TokenUsageLogEntry): number {
  if (entry.metrics_source === "digest_estimate") return 1;
  return 2;
}

/** One production row per date+edition; prefer live API logs over digest backfill. */
export function dedupeTokenEntries(entries: TokenUsageLogEntry[]): TokenUsageLogEntry[] {
  const shadow = entries.filter((e) => e.variant !== "single" || e.shadow);
  const singles = entries.filter((e) => e.variant === "single" && !e.shadow);
  const singleByDay = new Map<string, TokenUsageLogEntry>();
  for (const entry of singles) {
    const key = `${entry.date}|${entry.edition}`;
    const existing = singleByDay.get(key);
    if (!existing || entryPriority(entry) > entryPriority(existing)) {
      singleByDay.set(key, entry);
    }
  }
  return [...singleByDay.values(), ...shadow];
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

  const estimated_entries = production.filter((e) => e.metrics_source === "digest_estimate").length;

  return {
    entries: entries.length,
    estimated_entries,
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

export async function buildTokenUsagePayload(repoRoot: string): Promise<{
  entries: TokenUsageLogEntry[];
  payload: TokenUsageDataFile;
}> {
  const rawEntries = dedupeTokenEntries(await readTokenLog(repoRoot));
  const rubricRows = await readRubricLog(repoRoot);
  const entries = joinRubricToEntries(rawEntries, rubricRows);
  const aggregated = aggregateTokenUsage(entries);
  aggregated.by_experiment = await buildExperimentTokenRows(repoRoot, entries);

  const payload: TokenUsageDataFile = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    ...aggregated,
  };

  return { entries, payload };
}

function fmtNum(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "—";
  return Number(n).toLocaleString("en-US");
}

function fmtUsd(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "—";
  return `$${Number(n).toFixed(4)}`;
}

export function renderTokenUsageDashboardHtml(
  data: TokenUsageDataFile,
  escapeHtml: (text: string) => string,
  options?: { queueSummary?: string },
): string {
  const esc = escapeHtml;
  const latest = data.daily[0];
  const totalUsd = data.daily.reduce((n, row) => n + row.estimated_usd, 0);
  const hasEstimate = data.estimated_entries > 0;

  const summaryCards = `
    <div class="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
        <p class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Days logged</p>
        <p class="mt-1 font-mono text-2xl font-bold text-stone-900 dark:text-stone-100">${fmtNum(data.daily.length)}</p>
      </div>
      <div class="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
        <p class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Latest output tokens</p>
        <p class="mt-1 font-mono text-2xl font-bold text-stone-900 dark:text-stone-100">${latest ? fmtNum(latest.output_tokens) : "—"}</p>
        ${latest ? `<p class="mt-1 text-xs text-stone-500 dark:text-stone-400">${esc(latest.date)} · ${esc(latest.edition)}</p>` : ""}
      </div>
      <div class="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
        <p class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Avg out tok / repo</p>
        <p class="mt-1 font-mono text-2xl font-bold text-stone-900 dark:text-stone-100">${latest ? fmtNum(latest.avg_output_tokens_per_repo) : "—"}</p>
      </div>
      <div class="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
        <p class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Est. USD (all days)</p>
        <p class="mt-1 font-mono text-2xl font-bold text-stone-900 dark:text-stone-100">${fmtUsd(totalUsd)}</p>
      </div>
    </div>`;

  const queueBanner = options?.queueSummary
    ? `<p class="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">${esc(options.queueSummary)}</p>`
    : "";

  const estimateNote = hasEstimate
    ? `<p class="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm leading-relaxed text-blue-950 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-100">Some rows are <strong>estimated from published digests</strong> (brief word counts) until the next live narration run writes API telemetry. Live runs replace estimates automatically.</p>`
    : "";

  if (!data.daily.length) {
    return `${queueBanner}
      <p class="leading-relaxed text-stone-600 dark:text-stone-400">No token logs yet. The next Skills digest appends rows to <code>data/quality/token-usage.jsonl</code> automatically — then this page rebuilds with daily stats.</p>`;
  }

  const dailyRows = data.daily
    .map(
      (row) => `<tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="px-3 py-2 font-mono text-xs">${esc(row.date)}</td>
        <td class="px-3 py-2">${esc(row.edition)}</td>
        <td class="px-3 py-2 font-mono">${fmtNum(row.output_tokens)}</td>
        <td class="px-3 py-2 font-mono">${fmtNum(row.output_words)}</td>
        <td class="px-3 py-2 font-mono">${fmtNum(row.avg_output_tokens_per_repo)}</td>
        <td class="px-3 py-2 font-mono">${fmtNum(row.prompt_chars)}</td>
        <td class="px-3 py-2 font-mono">${row.chars_per_input_token != null ? fmtNum(row.chars_per_input_token) : "—"}</td>
        <td class="px-3 py-2 font-mono">${fmtNum(row.enrich_chars)}</td>
        <td class="px-3 py-2 font-mono">${row.avg_latency_ms ? `${fmtNum(row.avg_latency_ms)}ms` : "—"}</td>
        <td class="px-3 py-2 font-mono">${fmtUsd(row.estimated_usd)}</td>
        <td class="px-3 py-2">${row.rubric_runs ? `${row.rubric_pass_count}/${row.rubric_runs} pass` : "—"}</td>
      </tr>`,
    )
    .join("");

  const meta = `<p class="mb-6 text-sm text-stone-500 dark:text-stone-400">Updated ${esc(data.generated_at)} · ${fmtNum(data.entries)} log entries${hasEstimate ? ` (${fmtNum(data.estimated_entries)} estimated)` : ""}.</p>`;

  return `${queueBanner}${estimateNote}${summaryCards}${meta}
    <section class="mb-10">
      <h2 class="mb-3 font-sans text-lg font-semibold">Daily statistics</h2>
      <p class="mb-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">Production narration runs that ship to briefings. Output tokens and words per digest day; prompt and enrich sizes track context overhead for the ponytail baseline.</p>
      <div class="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-700">
        <table class="min-w-full text-left text-sm">
          <thead class="bg-stone-50 text-xs uppercase tracking-wide text-stone-500 dark:bg-stone-900 dark:text-stone-400">
            <tr>
              <th class="px-3 py-2 font-semibold">Date</th>
              <th class="px-3 py-2 font-semibold">Edition</th>
              <th class="px-3 py-2 font-semibold">Output tok</th>
              <th class="px-3 py-2 font-semibold">Words</th>
              <th class="px-3 py-2 font-semibold">Out tok/repo</th>
              <th class="px-3 py-2 font-semibold">Prompt chars</th>
              <th class="px-3 py-2 font-semibold">Chars/in tok</th>
              <th class="px-3 py-2 font-semibold">Enrich chars</th>
              <th class="px-3 py-2 font-semibold">Latency/repo</th>
              <th class="px-3 py-2 font-semibold">Est. USD</th>
              <th class="px-3 py-2 font-semibold">Rubric</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100 dark:divide-stone-800">${dailyRows}</tbody>
        </table>
      </div>
    </section>
    <div id="token-usage-extra" class="font-sans text-sm"></div>`;
}

export async function writeTokenUsageData(
  repoRoot: string,
  siteLabDir: string,
): Promise<{ entries: number; payload: TokenUsageDataFile }> {
  const { entries, payload } = await buildTokenUsagePayload(repoRoot);

  await fs.mkdir(siteLabDir, { recursive: true });
  await fs.writeFile(
    path.join(siteLabDir, "token-usage-data.json"),
    `${JSON.stringify(payload, null, 2)}\n`,
    "utf8",
  );
  return { entries: entries.length, payload };
}
