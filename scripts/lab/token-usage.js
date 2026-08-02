/**
 * Renders shadow A/B, experiment windows, and recent runs (daily stats are build-time HTML).
 */
(function () {
  const extra = document.getElementById("token-usage-extra");
  if (!extra) return;

  function esc(text) {
    const el = document.createElement("span");
    el.textContent = text == null ? "" : String(text);
    return el.innerHTML;
  }

  function fmt(n) {
    if (n == null || Number.isNaN(n)) return "—";
    return Number(n).toLocaleString();
  }

  function fmtUsd(n) {
    if (n == null || Number.isNaN(n)) return "—";
    return `$${Number(n).toFixed(4)}`;
  }

  function pct(n) {
    if (n == null || Number.isNaN(n)) return "—";
    const sign = n > 0 ? "+" : "";
    return `${sign}${n}%`;
  }

  function deltaClass(n) {
    if (n == null) return "";
    if (n < 0) return "text-emerald-700 dark:text-emerald-300";
    if (n > 0) return "text-amber-800 dark:text-amber-200";
    return "text-stone-600 dark:text-stone-400";
  }

  function table(headers, rows) {
    return `<div class="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-700">
      <table class="min-w-full text-left text-sm">
        <thead class="bg-stone-50 text-xs uppercase tracking-wide text-stone-500 dark:bg-stone-900 dark:text-stone-400">
          <tr>${headers.map((h) => `<th class="px-3 py-2 font-semibold">${esc(h)}</th>`).join("")}</tr>
        </thead>
        <tbody class="divide-y divide-stone-100 dark:divide-stone-800">${rows.join("")}</tbody>
      </table>
    </div>`;
  }

  function loadData() {
    const embedded = document.getElementById("token-usage-data");
    if (embedded?.textContent?.trim()) {
      try {
        return Promise.resolve(JSON.parse(embedded.textContent));
      } catch {
        /* fall through */
      }
    }
    return fetch("token-usage-data.json")
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      });
  }

  function renderExtra(data) {
    const expRows = (data.by_experiment || []).map(
      (row) =>
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

    const shadowRows = (data.shadow_comparisons || []).map((row) => {
      const deltaPct = row.output_token_delta_pct;
      return `<tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
          <td class="px-3 py-2 font-mono text-xs"><a href="shadow/${esc(row.run_id)}.html" class="text-blue-800 hover:underline dark:text-blue-400">${esc(row.run_id.slice(0, 8))}…</a></td>
          <td class="px-3 py-2 font-mono text-xs">${esc(row.date)}</td>
          <td class="px-3 py-2 ${deltaClass(deltaPct)}">${pct(deltaPct)} out</td>
          <td class="px-3 py-2">${fmt(row.control_prompt_chars)} → ${fmt(row.treatment_prompt_chars)} prompt</td>
          <td class="px-3 py-2">${fmt(row.control_latency_ms_avg)} → ${fmt(row.treatment_latency_ms_avg)} ms</td>
          <td class="px-3 py-2">${fmtUsd(row.control_estimated_usd)} → ${fmtUsd(row.treatment_estimated_usd)}</td>
        </tr>`;
    });

    const recentRows = (data.recent || []).slice(0, 15).map((row) => {
      const rubric = row.rubric;
      return `<tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
          <td class="px-3 py-2 font-mono text-xs">${esc(row.date)}</td>
          <td class="px-3 py-2">${esc(row.variant)}${row.metrics_source === "digest_estimate" ? " (est.)" : ""}</td>
          <td class="px-3 py-2">${fmt(row.output_tokens)}</td>
          <td class="px-3 py-2">${fmt(row.chars_per_input_token)}</td>
          <td class="px-3 py-2">${fmt(row.latency_ms_avg)}ms</td>
          <td class="px-3 py-2">${fmtUsd(row.estimated_usd)}</td>
          <td class="px-3 py-2">${rubric ? `why=${rubric.why_now} spec=${rubric.specificity} ${rubric.pass ? "pass" : "fail"}` : "—"}</td>
        </tr>`;
    });

    extra.innerHTML = `
      <section class="mb-10">
        <h2 class="mb-3 font-sans text-base font-semibold">Shadow A/B comparisons</h2>
        <p class="mb-4 text-sm text-stone-500 dark:text-stone-400">Control vs treatment on the same run — output tokens, prompt size, latency, and cost.</p>
        ${
          shadowRows.length
            ? table(
                ["Run", "Date", "Δ output %", "Prompt chars", "Latency avg", "Est. USD"],
                shadowRows,
              )
            : "<p class=\"text-sm text-stone-500\">Run <code>DIGEST_ENRICH_SHADOW=1</code> with narration flags to populate comparisons.</p>"
        }
      </section>

      <section class="mb-10">
        <h2 class="mb-3 font-sans text-base font-semibold">Experiment windows</h2>
        <p class="mb-4 text-sm text-stone-500 dark:text-stone-400">Baseline vs treatment aggregates for registered experiments.</p>
        ${
          expRows.length
            ? table(
                ["Experiment", "Window", "Runs", "Output tok", "Prompt chars", "Enrich chars", "Latency/repo", "Est. USD", "Rubric pass"],
                expRows,
              )
            : "<p class=\"text-sm text-stone-500\">No production runs fall inside registered experiment windows yet.</p>"
        }
      </section>

      <section class="mb-10">
        <h2 class="mb-3 font-sans text-base font-semibold">Recent runs</h2>
        <p class="mb-4 text-sm text-stone-500 dark:text-stone-400">Last 15 log entries including shadow variants.</p>
        ${
          recentRows.length
            ? table(
                ["Date", "Variant", "Output tok", "Chars/in tok", "Latency avg", "Est. USD", "Rubric rank-1"],
                recentRows,
              )
            : "<p class=\"text-sm text-stone-500\">No runs yet.</p>"
        }
      </section>`;
  }

  loadData()
    .then(renderExtra)
    .catch(() => {
      extra.innerHTML =
        '<p class="text-amber-800 dark:text-amber-200">Could not load extended token sections.</p>';
    });
})();
