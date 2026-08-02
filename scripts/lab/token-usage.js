/**
 * Client-side token usage dashboard (loaded by site/lab/token-usage.html).
 */
(function () {
  const root = document.getElementById("token-usage-root");
  if (!root) return;

  function esc(text) {
    const el = document.createElement("span");
    el.textContent = text == null ? "" : String(text);
    return el.innerHTML;
  }

  function fmt(n) {
    if (n == null || Number.isNaN(n)) return "—";
    return Number(n).toLocaleString();
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

  function render(data) {
    if (!data.entries) {
      root.innerHTML =
        '<p class="leading-relaxed text-stone-600 dark:text-stone-400">No token logs yet. Run a digest — narration tokens append to <code>data/quality/token-usage.jsonl</code> automatically.</p>';
      return;
    }

    const dailyRows = (data.daily || []).map(
      (row) =>
        `<tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
          <td class="px-3 py-2 font-mono text-xs">${esc(row.date)}</td>
          <td class="px-3 py-2">${esc(row.edition)}</td>
          <td class="px-3 py-2">${fmt(row.runs)}</td>
          <td class="px-3 py-2">${fmt(row.input_tokens)}</td>
          <td class="px-3 py-2">${fmt(row.output_tokens)}</td>
          <td class="px-3 py-2 font-semibold">${fmt(row.total_tokens)}</td>
          <td class="px-3 py-2">${fmt(row.output_words)}</td>
          <td class="px-3 py-2">${fmt(row.avg_output_tokens_per_repo)}</td>
          <td class="px-3 py-2">${fmt(row.shadow_runs)}</td>
        </tr>`,
    );

    const expRows = (data.by_experiment || []).map(
      (row) =>
        `<tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
          <td class="px-3 py-2 font-mono text-xs">${esc(row.experiment_id)}</td>
          <td class="px-3 py-2">${esc(row.window)}</td>
          <td class="px-3 py-2">${fmt(row.runs)}</td>
          <td class="px-3 py-2">${fmt(row.output_tokens)}</td>
          <td class="px-3 py-2">${fmt(row.output_words)}</td>
          <td class="px-3 py-2">${fmt(row.avg_output_tokens_per_repo)}</td>
          <td class="px-3 py-2">${fmt(row.ponytail_runs)} / ${fmt(row.structured_context_runs)}</td>
        </tr>`,
    );

    const shadowRows = (data.shadow_comparisons || []).map((row) => {
      const deltaPct = row.output_token_delta_pct;
      return `<tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
          <td class="px-3 py-2 font-mono text-xs"><a href="shadow/${esc(row.run_id)}.html" class="text-blue-800 hover:underline dark:text-blue-400">${esc(row.run_id.slice(0, 8))}…</a></td>
          <td class="px-3 py-2 font-mono text-xs">${esc(row.date)}</td>
          <td class="px-3 py-2">${fmt(row.control_output_tokens)}</td>
          <td class="px-3 py-2">${fmt(row.treatment_output_tokens)}</td>
          <td class="px-3 py-2 ${deltaClass(deltaPct)}">${pct(deltaPct)}</td>
          <td class="px-3 py-2">${fmt(row.control_output_words)} → ${fmt(row.treatment_output_words)} words</td>
        </tr>`;
    });

    root.innerHTML = `
      <p class="mb-6 leading-relaxed text-stone-600 dark:text-stone-400">
        Functional cost telemetry for Claude narration — logged on every digest run.
        Generated ${esc(data.generated_at)} · ${fmt(data.entries)} log entries.
      </p>

      <section class="mb-10">
        <h2 class="mb-3 font-sans text-base font-semibold">Daily production runs</h2>
        <p class="mb-4 text-sm text-stone-500 dark:text-stone-400">Single-variant runs (what ships to briefings). Input + output tokens and brief word counts.</p>
        ${
          dailyRows.length
            ? table(
                ["Date", "Edition", "Runs", "Input", "Output", "Total", "Words", "Out/repo", "Shadows"],
                dailyRows,
              )
            : "<p class=\"text-sm text-stone-500\">No production runs logged yet.</p>"
        }
      </section>

      <section class="mb-10">
        <h2 class="mb-3 font-sans text-base font-semibold">Shadow A/B comparisons</h2>
        <p class="mb-4 text-sm text-stone-500 dark:text-stone-400">Control vs treatment output tokens on the same run — primary metric for ponytail / structured-context experiments.</p>
        ${
          shadowRows.length
            ? table(
                ["Run", "Date", "Control out", "Treatment out", "Δ output %", "Words"],
                shadowRows,
              )
            : "<p class=\"text-sm text-stone-500\">Run <code>DIGEST_ENRICH_SHADOW=1</code> with narration flags to populate comparisons.</p>"
        }
      </section>

      <section class="mb-10">
        <h2 class="mb-3 font-sans text-base font-semibold">Experiment windows</h2>
        <p class="mb-4 text-sm text-stone-500 dark:text-stone-400">Aggregated production tokens grouped by registered experiment baseline/treatment windows.</p>
        ${
          expRows.length
            ? table(
                ["Experiment", "Window", "Runs", "Output tok", "Words", "Out/repo", "Ponytail / structured runs"],
                expRows,
              )
            : "<p class=\"text-sm text-stone-500\">No production runs fall inside registered experiment windows yet.</p>"
        }
      </section>`;
  }

  fetch("token-usage-data.json")
    .then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    })
    .then(render)
    .catch(() => {
      root.innerHTML =
        '<p class="text-amber-800 dark:text-amber-200">Could not load token-usage-data.json — run <code>npm run build:pages</code> after digest runs.</p>';
    });
})();
