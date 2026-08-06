import type { ExperimentRecord } from "../../src/tastemaker/experiments/types.js";
import type {
  TokenUsageDailyRow,
  TokenUsageDataFile,
  TokenUsageExperimentRow,
  TokenUsageShadowRow,
} from "./aggregate-token-usage.js";

type EscapeHtml = (text: string) => string;

interface HeadlineStats {
  hasData: boolean;
  latestDate?: string;
  latestEdition?: string;
  latestCostUsd?: number;
  previousCostUsd?: number;
  costTrendLabel: string;
  costTrendClass: string;
  qualityLabel: string;
  qualityClass: string;
  rubricDetail?: string;
}

function fmt(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "—";
  return Number(n).toLocaleString();
}

function fmtUsd(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "—";
  return `$${Number(n).toFixed(4)}`;
}

function fmtUsdShort(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "—";
  return `$${Number(n).toFixed(2)}`;
}

function pct(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "—";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n}%`;
}

function deltaClass(n: number | null | undefined): string {
  if (n == null) return "text-stone-600 dark:text-stone-400";
  if (n < 0) return "text-emerald-700 dark:text-emerald-300";
  if (n > 0) return "text-amber-800 dark:text-amber-200";
  return "text-stone-600 dark:text-stone-400";
}

function th(label: string, caption: string, esc: EscapeHtml): string {
  return `<th scope="col" class="px-3 py-2 align-bottom font-semibold">
    <div>${esc(label)}</div>
    <div class="mt-1 text-[11px] font-normal normal-case tracking-normal text-stone-500 dark:text-stone-400">${esc(caption)}</div>
  </th>`;
}

function tableWrap(headers: string, rows: string[]): string {
  if (!rows.length) return "";
  return `<div class="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-700">
    <table class="min-w-full text-left text-sm">
      <thead class="bg-stone-50 text-xs uppercase tracking-wide text-stone-500 dark:bg-stone-900 dark:text-stone-400">
        <tr>${headers}</tr>
      </thead>
      <tbody class="divide-y divide-stone-100 dark:divide-stone-800">${rows.join("")}</tbody>
    </table>
  </div>`;
}

function emptyBlock(message: string, esc: EscapeHtml): string {
  return `<p class="rounded-lg border border-dashed border-stone-300 bg-stone-50 px-4 py-3 text-sm leading-relaxed text-stone-600 dark:border-stone-600 dark:bg-stone-900/40 dark:text-stone-400">${esc(message)}</p>`;
}

export function experimentGoalSentence(experiments: ExperimentRecord[]): string {
  const active = experiments.find((e) => e.status === "active" || e.status === "baseline");
  if (!active) {
    return "No active cost experiment right now. This page still shows day-to-day narration cost and writing-quality checks from recent digest runs.";
  }
  if (active.id.includes("ponytail")) {
    if (active.status === "baseline") {
      return "We are measuring today’s narration setup as a baseline, then we will check whether a tighter writing method is about 10% cheaper without making the summaries worse.";
    }
    return "We are checking whether a tighter narration method is about 10% cheaper without making the summaries worse.";
  }
  if (active.change_summary) {
    return active.change_summary.replace(/\bDIGEST_[A-Z0-9_]+\b/g, "").replace(/\s+/g, " ").trim();
  }
  return active.hypothesis;
}

export function computeHeadlineStats(data: TokenUsageDataFile): HeadlineStats {
  const productionRecent = (data.recent ?? [])
    .filter((row) => row.variant === "single")
    .sort((a, b) => b.logged_at.localeCompare(a.logged_at));

  let latestRun = productionRecent[0];
  let previousRun = productionRecent[1];

  if (!latestRun) {
    const productionDaily = [...(data.daily ?? [])].sort(
      (a, b) => b.date.localeCompare(a.date) || b.edition.localeCompare(a.edition),
    );
    if (!productionDaily.length) {
      return {
        hasData: false,
        costTrendLabel: "No runs logged yet",
        costTrendClass: "text-stone-600 dark:text-stone-400",
        qualityLabel: "No quality checks logged yet",
        qualityClass: "text-stone-600 dark:text-stone-400",
      };
    }
    const latestDaily = productionDaily[0];
    const previousDaily = productionDaily[1];
    latestRun = {
      logged_at: `${latestDaily.date}T23:59:59.000Z`,
      run_id: "",
      edition: latestDaily.edition,
      date: latestDaily.date,
      model: "",
      variant: "single",
      shadow: false,
      flags: { enrich_web: false, structured_context: false, ponytail: false },
      repos_narrated: 0,
      repos_failed: 0,
      input_tokens: latestDaily.input_tokens,
      output_tokens: latestDaily.output_tokens,
      output_words: latestDaily.output_words,
      estimated_usd: latestDaily.estimated_usd,
      per_repo: [],
    };
    if (previousDaily) {
      previousRun = {
        ...latestRun,
        date: previousDaily.date,
        edition: previousDaily.edition,
        estimated_usd: previousDaily.estimated_usd,
      };
    }
  }

  let costTrendLabel = "Holding steady";
  let costTrendClass = "text-stone-700 dark:text-stone-300";
  if (
    previousRun &&
    latestRun.estimated_usd != null &&
    previousRun.estimated_usd != null &&
    previousRun.estimated_usd > 0
  ) {
    const deltaPct = ((latestRun.estimated_usd - previousRun.estimated_usd) / previousRun.estimated_usd) * 100;
    const rounded = Math.round(deltaPct * 10) / 10;
    if (rounded < -1) {
      costTrendLabel = `Down ${Math.abs(rounded)}% vs previous run`;
      costTrendClass = "text-emerald-700 dark:text-emerald-300";
    } else if (rounded > 1) {
      costTrendLabel = `Up ${rounded}% vs previous run`;
      costTrendClass = "text-amber-800 dark:text-amber-200";
    }
  } else if (!previousRun) {
    costTrendLabel = "First run logged — no prior comparison";
  }

  let qualityLabel = "Quality checks not run on latest digest";
  let qualityClass = "text-stone-600 dark:text-stone-400";
  let rubricDetail: string | undefined;
  if (latestRun.rubric) {
    const r = latestRun.rubric;
    rubricDetail = `Top pick: ${r.full_name}`;
    if (r.pass) {
      qualityLabel = "Quality holding — latest check passed";
      qualityClass = "text-emerald-700 dark:text-emerald-300";
    } else {
      qualityLabel = "Latest quality check did not pass";
      qualityClass = "text-amber-800 dark:text-amber-200";
    }
  } else {
    const dailyMatch = (data.daily ?? []).find(
      (row) => row.date === latestRun.date && row.edition === latestRun.edition,
    );
    if (dailyMatch && dailyMatch.rubric_runs > 0) {
      const rate = dailyMatch.rubric_pass_count / dailyMatch.rubric_runs;
      qualityLabel =
        rate >= 1
          ? "Quality holding on recent runs"
          : `${dailyMatch.rubric_pass_count} of ${dailyMatch.rubric_runs} recent checks passed`;
      qualityClass = rate >= 1 ? "text-emerald-700 dark:text-emerald-300" : "text-amber-800 dark:text-amber-200";
    }
  }

  return {
    hasData: true,
    latestDate: latestRun.date,
    latestEdition: latestRun.edition,
    latestCostUsd: latestRun.estimated_usd,
    previousCostUsd: previousRun?.estimated_usd,
    costTrendLabel,
    costTrendClass,
    qualityLabel,
    qualityClass,
    rubricDetail,
  };
}

function renderHeadlineCards(stats: HeadlineStats, esc: EscapeHtml): string {
  if (!stats.hasData) {
    return emptyBlock("No runs logged yet. After the next digest finishes, this section will show cost and quality at a glance.", esc);
  }

  return `<div class="mb-8 grid gap-4 sm:grid-cols-3">
    <div class="rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-950/50">
      <p class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">Latest cost per digest</p>
      <p class="mb-2 font-sans text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">${esc(fmtUsdShort(stats.latestCostUsd))}</p>
      <p class="mb-0 text-sm leading-relaxed text-stone-600 dark:text-stone-400">Estimated list price for Claude to write all briefs in the ${esc(stats.latestEdition ?? "latest")} edition on ${esc(stats.latestDate ?? "—")}.</p>
    </div>
    <div class="rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-950/50">
      <p class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">Cost trend</p>
      <p class="mb-2 font-sans text-lg font-semibold ${stats.costTrendClass}">${esc(stats.costTrendLabel)}</p>
      <p class="mb-0 text-sm leading-relaxed text-stone-600 dark:text-stone-400">Compared to the previous logged digest${stats.previousCostUsd != null ? ` (${esc(fmtUsdShort(stats.previousCostUsd))})` : ""}. Lower is better when quality stays the same.</p>
    </div>
    <div class="rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-950/50">
      <p class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">Writing quality</p>
      <p class="mb-2 font-sans text-lg font-semibold ${stats.qualityClass}">${esc(stats.qualityLabel)}</p>
      <p class="mb-0 text-sm leading-relaxed text-stone-600 dark:text-stone-400">${esc(stats.rubricDetail ?? "We spot-check the #1 ranked brief for clarity, timeliness, and accuracy after each run.")}</p>
    </div>
  </div>`;
}

function renderDailySection(data: TokenUsageDataFile, esc: EscapeHtml): string {
  const rows = (data.daily ?? []).map(
    (row: TokenUsageDailyRow) =>
      `<tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="px-3 py-2 font-mono text-xs">${esc(row.date)}</td>
        <td class="px-3 py-2">${esc(row.edition)}</td>
        <td class="px-3 py-2">${fmt(row.output_tokens)}</td>
        <td class="px-3 py-2">${fmt(row.output_words)}</td>
        <td class="px-3 py-2">${fmt(row.prompt_chars)}</td>
        <td class="px-3 py-2">${fmt(row.chars_per_input_token)}</td>
        <td class="px-3 py-2">${fmt(row.enrich_chars)}</td>
        <td class="px-3 py-2">${fmt(row.avg_latency_ms)}ms</td>
        <td class="px-3 py-2">${fmtUsd(row.estimated_usd)}</td>
        <td class="px-3 py-2">${row.rubric_runs ? `${row.rubric_pass_count}/${row.rubric_runs} passed` : "—"}</td>
      </tr>`,
  );

  const headers = [
    th("Date", "Which day this digest ran", esc),
    th("Edition", "OSS or Skills newsletter", esc),
    th("AI output size", "How much text Claude wrote back — smaller usually means cheaper", esc),
    th("Word count", "Human-readable length of those briefs", esc),
    th("Prompt size", "How much background we sent Claude before it wrote", esc),
    th("Prompt efficiency", "Background size vs. billing units — lower can mean tighter packaging", esc),
    th("Extra context fetched", "Web and forum snippets added before narration", esc),
    th("Wait time per repo", "How long Claude took per repository on average", esc),
    th("Est. cost", "Approximate API list price for this run", esc),
    th("Quality checks", "How many automated writing checks passed", esc),
  ].join("");

  const body = rows.length
    ? tableWrap(headers, rows)
    : emptyBlock("No production runs logged yet. Each finished digest adds a row here automatically.", esc);

  return `<section class="mb-10">
    <h2 class="mb-2 font-sans text-base font-semibold">Daily production runs</h2>
    <p class="mb-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">These are the runs that actually ship to readers — one row per edition per day.</p>
    ${body}
  </section>`;
}

function renderShadowSection(data: TokenUsageDataFile, esc: EscapeHtml): string {
  const rows = (data.shadow_comparisons ?? []).map((row: TokenUsageShadowRow) => {
    const deltaPct = row.output_token_delta_pct;
    return `<tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
      <td class="px-3 py-2 font-mono text-xs"><a href="shadow/${esc(row.run_id)}.html" class="text-blue-800 hover:underline dark:text-blue-400">${esc(row.run_id.slice(0, 8))}…</a></td>
      <td class="px-3 py-2 font-mono text-xs">${esc(row.date)}</td>
      <td class="px-3 py-2 ${deltaClass(deltaPct)}">${pct(deltaPct)}</td>
      <td class="px-3 py-2">${fmt(row.control_prompt_chars)} → ${fmt(row.treatment_prompt_chars)}</td>
      <td class="px-3 py-2">${fmt(row.control_latency_ms_avg)} → ${fmt(row.treatment_latency_ms_avg)} ms</td>
      <td class="px-3 py-2">${fmtUsd(row.control_estimated_usd)} → ${fmtUsd(row.treatment_estimated_usd)}</td>
    </tr>`;
  });

  const headers = [
    th("Run", "Internal id for this side-by-side test", esc),
    th("Date", "When the test ran", esc),
    th("Output change", "How much less (or more) Claude wrote with the new method", esc),
    th("Prompt size", "Background sent to Claude — old method vs. new method", esc),
    th("Wait time", "Average seconds per repo — old vs. new", esc),
    th("Est. cost", "Approximate price — old vs. new", esc),
  ].join("");

  const body = rows.length
    ? tableWrap(headers, rows)
    : emptyBlock("No side-by-side test runs logged yet. Shadow tests compare the current method against a candidate on the same digest.", esc);

  return `<section class="mb-10">
    <h2 class="mb-2 font-sans text-base font-semibold">Side-by-side method tests</h2>
    <p class="mb-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">Before changing production, we sometimes run two narration methods on the same digest and compare cost and output size.</p>
    ${body}
  </section>`;
}

function renderExperimentSection(data: TokenUsageDataFile, esc: EscapeHtml): string {
  const rows = (data.by_experiment ?? []).map(
    (row: TokenUsageExperimentRow) =>
      `<tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="px-3 py-2 font-mono text-xs">${esc(row.experiment_id)}</td>
        <td class="px-3 py-2">${esc(row.window)}</td>
        <td class="px-3 py-2">${fmt(row.runs)}</td>
        <td class="px-3 py-2">${fmt(row.output_tokens)}</td>
        <td class="px-3 py-2">${fmt(row.prompt_chars)}</td>
        <td class="px-3 py-2">${fmt(row.enrich_chars)}</td>
        <td class="px-3 py-2">${fmt(row.avg_latency_ms)}ms</td>
        <td class="px-3 py-2">${fmtUsd(row.estimated_usd)}</td>
        <td class="px-3 py-2">${row.rubric_pass_rate != null ? `${Math.round(row.rubric_pass_rate * 100)}%` : "—"}</td>
      </tr>`,
  );

  const headers = [
    th("Experiment", "Registered test name", esc),
    th("Phase", "Baseline (today’s setup) or treatment (candidate change)", esc),
    th("Runs", "How many digests fell in this window", esc),
    th("AI output size", "Total text Claude wrote across those runs", esc),
    th("Prompt size", "Total background sent to Claude", esc),
    th("Extra context", "Web and forum snippets fetched", esc),
    th("Wait time", "Average per-repo latency", esc),
    th("Est. cost", "Total approximate API spend", esc),
    th("Quality pass rate", "Share of automated writing checks that passed", esc),
  ].join("");

  const body = rows.length
    ? tableWrap(headers, rows)
    : emptyBlock("No experiment windows have production runs yet. Baseline and treatment phases will appear here once logged.", esc);

  return `<section class="mb-10">
    <h2 class="mb-2 font-sans text-base font-semibold">Experiment windows</h2>
    <p class="mb-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">Grouped results for registered experiments — baseline measures today’s setup; treatment measures the candidate change.</p>
    ${body}
  </section>`;
}

function renderRecentSection(data: TokenUsageDataFile, esc: EscapeHtml): string {
  const rows = (data.recent ?? []).slice(0, 15).map((row) => {
    const rubric = row.rubric;
    const rubricLabel = rubric
      ? rubric.pass
        ? `Passed (timeliness ${rubric.why_now}/5, detail ${rubric.specificity}/5)`
        : `Did not pass (timeliness ${rubric.why_now}/5, detail ${rubric.specificity}/5)`
      : "—";
    const variantLabel =
      row.variant === "single"
        ? "Production"
        : row.variant === "control"
          ? "Side-by-side (current)"
          : row.variant === "treatment"
            ? "Side-by-side (candidate)"
            : row.variant;
    return `<tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
      <td class="px-3 py-2 font-mono text-xs">${esc(row.date)}</td>
      <td class="px-3 py-2">${esc(variantLabel)}</td>
      <td class="px-3 py-2">${fmt(row.output_tokens)}</td>
      <td class="px-3 py-2">${fmt(row.chars_per_input_token)}</td>
      <td class="px-3 py-2">${fmt(row.latency_ms_avg)}ms</td>
      <td class="px-3 py-2">${fmtUsd(row.estimated_usd)}</td>
      <td class="px-3 py-2">${esc(rubricLabel)}</td>
    </tr>`;
  });

  const headers = [
    th("Date", "When this run finished", esc),
    th("Run type", "Production digest or side-by-side test arm", esc),
    th("AI output size", "How much Claude wrote", esc),
    th("Prompt efficiency", "Background size vs. billing units", esc),
    th("Wait time", "Average seconds per repository", esc),
    th("Est. cost", "Approximate API list price", esc),
    th("Quality spot-check", "Automated score for the top-ranked brief", esc),
  ].join("");

  const body = rows.length
    ? tableWrap(headers, rows)
    : emptyBlock("No runs logged yet. The fifteen most recent entries will appear here after digests run.", esc);

  return `<section class="mb-10">
    <h2 class="mb-2 font-sans text-base font-semibold">Recent runs</h2>
    <p class="mb-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">The last fifteen log entries, including side-by-side tests.</p>
    ${body}
  </section>`;
}

function renderTechnicalReference(esc: EscapeHtml): string {
  return `<section class="mt-12 border-t border-stone-200 pt-10 dark:border-stone-700">
    <h2 class="mb-2 font-sans text-base font-semibold">Technical reference (for engineers)</h2>
    <p class="mb-6 text-sm leading-relaxed text-stone-600 dark:text-stone-400">Field names, operator commands, and raw log paths. Skip this section if you only need the headline results above.</p>

    <h3 class="mb-3 font-sans text-sm font-semibold">Logged fields</h3>
    <div class="mb-8 overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-700">
      <table class="min-w-full text-left text-sm">
        <thead class="bg-stone-50 text-xs uppercase tracking-wide text-stone-500 dark:bg-stone-900 dark:text-stone-400">
          <tr>
            ${th("Field", "JSONL key", esc)}
            ${th("Meaning", "What it measures", esc)}
          </tr>
        </thead>
        <tbody class="divide-y divide-stone-100 dark:divide-stone-800">
          <tr><td class="px-3 py-2 font-mono text-xs">input_tokens / output_tokens</td><td class="px-3 py-2">Anthropic API usage per narration batch</td></tr>
          <tr><td class="px-3 py-2 font-mono text-xs">prompt_chars</td><td class="px-3 py-2">Characters sent in the user prompt</td></tr>
          <tr><td class="px-3 py-2 font-mono text-xs">chars_per_input_token</td><td class="px-3 py-2">prompt_chars / input_tokens — lower = denser tokenization</td></tr>
          <tr><td class="px-3 py-2 font-mono text-xs">latency_ms_avg</td><td class="px-3 py-2">Wall-clock per repo for Claude messages.create</td></tr>
          <tr><td class="px-3 py-2 font-mono text-xs">enrich_chars_total</td><td class="px-3 py-2">Firecrawl/HN/Reddit payload chars merged before narration</td></tr>
          <tr><td class="px-3 py-2 font-mono text-xs">readme_chars</td><td class="px-3 py-2">README excerpt size in prompt (per repo)</td></tr>
          <tr><td class="px-3 py-2 font-mono text-xs">estimated_usd</td><td class="px-3 py-2">List-price estimate from model + token counts</td></tr>
          <tr><td class="px-3 py-2 font-mono text-xs">rubric</td><td class="px-3 py-2">Rank-1 heuristic scores when DIGEST_QUALITY_RUBRIC=1</td></tr>
          <tr><td class="px-3 py-2 font-mono text-xs">variant</td><td class="px-3 py-2">single (production), control, or treatment (shadow A/B)</td></tr>
        </tbody>
      </table>
    </div>

    <h3 class="mb-3 font-sans text-sm font-semibold">Operator commands</h3>
    <pre class="mb-8 overflow-x-auto rounded-lg border border-stone-200 bg-stone-50 p-4 text-xs leading-relaxed text-stone-800 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"><code># Production baseline (automatic in GHA)
EXPERIMENT_ID=EXP-20260802-ponytail-narration-skills npm run digest -- --edition skills

# Shadow pre-treatment (all measures)
EXPERIMENT_ID=EXP-20260802-ponytail-narration-skills \\
DIGEST_ENRICH_WEB=1 DIGEST_ENRICH_SHADOW=1 \\
DIGEST_NARRATE_STRUCTURED_CONTEXT=1 DIGEST_NARRATE_PONYTAIL=1 \\
npm run digest -- --edition skills

npm run build:pages</code></pre>

    <h3 class="mb-3 font-sans text-sm font-semibold">Raw logs</h3>
    <ul class="mb-0 list-disc pl-5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
      <li><code>data/quality/token-usage.jsonl</code> — one JSON object per narration run</li>
      <li><code>data/quality/rubric-scores.jsonl</code> — automated writing-quality scores</li>
      <li><code>site/lab/token-usage-data.json</code> — aggregated snapshot consumed at build time</li>
    </ul>
  </section>`;
}

export function renderTokenUsagePage(
  data: TokenUsageDataFile,
  experiments: ExperimentRecord[],
  esc: EscapeHtml,
): string {
  const stats = computeHeadlineStats(data);
  const goal = experimentGoalSentence(experiments);
  const generated = data.generated_at ? new Date(data.generated_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) : "—";
  const entryNote =
    data.entries > 0
      ? `${fmt(data.entries)} logged run${data.entries === 1 ? "" : "s"} · last built ${esc(generated)}`
      : "No runs logged yet · rebuild after the next digest";

  return `<div class="font-sans text-sm">
    <p class="mb-6 text-base leading-relaxed text-stone-700 dark:text-stone-300">
      This page tracks how much it costs for Claude to write the daily briefs each time a digest runs, and whether the writing still reads well as we try to spend less. Everything here comes from automatic logs — no manual spreadsheets.
    </p>

    <div class="mb-8 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-900/50 dark:bg-blue-950/30">
      <p class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-blue-900 dark:text-blue-200">What we are testing right now</p>
      <p class="mb-0 text-sm leading-relaxed text-blue-950 dark:text-blue-100">${esc(goal)}</p>
    </div>

    <section class="mb-10">
      <h2 class="mb-2 font-sans text-base font-semibold">Results at a glance</h2>
      <p class="mb-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">${entryNote}</p>
      ${renderHeadlineCards(stats, esc)}
    </section>

    ${renderDailySection(data, esc)}
    ${renderShadowSection(data, esc)}
    ${renderExperimentSection(data, esc)}
    ${renderRecentSection(data, esc)}
    ${renderTechnicalReference(esc)}
  </div>`;
}
