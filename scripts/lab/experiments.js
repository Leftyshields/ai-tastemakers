/**
 * Client-side experiments dashboard (loaded by site/lab/experiments.html).
 */
(function () {
  const root = document.getElementById("experiments-root");
  if (!root) return;

  const tableWrap = document.getElementById("experiments-table-wrap");
  const detail = document.getElementById("experiment-detail");
  const detailTitle = document.getElementById("detail-title");
  const detailBody = document.getElementById("detail-body");
  const exportBtn = document.getElementById("export-markdown");
  const backBtn = document.getElementById("detail-back");

  /** @type {object | null} */
  let selected = null;

  function esc(text) {
    const el = document.createElement("span");
    el.textContent = text == null ? "" : String(text);
    return el.innerHTML;
  }

  function windowLabel(start, end) {
    if (!start && !end) return "—";
    if (start && end) return `${start} → ${end}`;
    return start || end || "—";
  }

  function statusClass(status) {
    const map = {
      draft: "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300",
      baseline: "bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
      active: "bg-blue-50 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200",
      complete: "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200",
    };
    return map[status] || map.draft;
  }

  function renderTable(experiments) {
    if (!experiments.length) {
      tableWrap.innerHTML =
        '<p class="leading-relaxed text-stone-600 dark:text-stone-400">No experiments yet. Add <code>data/experiments/EXP-*.json</code> and rebuild pages.</p>';
      return;
    }

    const cards = experiments
      .map(
        (exp) => `
      <button type="button" class="experiment-card w-full rounded-lg border border-stone-200 bg-white p-4 text-left transition hover:border-blue-300 hover:bg-blue-50/40 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-blue-600 dark:hover:bg-blue-950/20" data-id="${esc(exp.id)}">
        <div class="mb-2 flex flex-wrap items-center gap-2">
          <span class="font-mono text-xs font-semibold text-stone-800 dark:text-stone-200">${esc(exp.id)}</span>
          <span class="rounded-full px-2 py-0.5 text-xs font-semibold ${statusClass(exp.status)}">${esc(exp.status)}</span>
          <span class="text-xs text-stone-500 dark:text-stone-400">${esc(exp.edition)}</span>
        </div>
        <p class="leading-relaxed text-stone-700 dark:text-stone-300">${esc(exp.hypothesis)}</p>
        <p class="mt-3 text-xs text-stone-500 dark:text-stone-400">Baseline ${esc(windowLabel(exp.baseline_window?.start, exp.baseline_window?.end))}</p>
      </button>`,
      )
      .join("");

    tableWrap.innerHTML = cards;

    tableWrap.querySelectorAll(".experiment-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-id");
        const exp = experiments.find((e) => e.id === id);
        if (exp) showDetail(exp);
      });
    });
  }

  function metricsTable(metrics) {
    if (!metrics) return "<p class=\"text-stone-500\">No metrics.</p>";
    const pv = metrics.pageviews_by_path || {};
    const oc = metrics.outbound_clicks || {};
    const pvRows = Object.entries(pv)
      .map(([k, v]) => `<tr><td class="py-1 pr-2 font-mono text-xs">${esc(k)}</td><td class="py-1">${esc(v)}</td></tr>`)
      .join("");
    const ocRows = Object.entries(oc)
      .map(([k, v]) => `<tr><td class="py-1 pr-2 font-mono text-xs">${esc(k)}</td><td class="py-1">${esc(v)}</td></tr>`)
      .join("");
    return `
      <h4 class="mt-4 font-semibold">Pageviews</h4>
      <table class="w-full text-sm">${pvRows || "<tr><td class=\"text-stone-500\">—</td></tr>"}</table>
      <h4 class="mt-4 font-semibold">Outbound repo clicks</h4>
      <table class="w-full text-sm">${ocRows || "<tr><td class=\"text-stone-500\">—</td></tr>"}</table>`;
  }

  function showDetail(exp) {
    selected = exp;
    tableWrap.classList.add("hidden");
    detail.classList.remove("hidden");
    detailTitle.textContent = exp.id;

    const flags = exp.change?.flags
      ? Object.entries(exp.change.flags)
          .map(([k, v]) => `<li><code>${esc(k)}</code> = ${esc(v)}</li>`)
          .join("")
      : "";

    const snapshots = (exp.snapshots || [])
      .map(
        (snap, i) => `
        <section class="mt-4 rounded border border-stone-200 p-3 dark:border-stone-700">
          <p class="text-xs text-stone-500">Snapshot ${i + 1} · ${esc(snap.period?.start)} → ${esc(snap.period?.end)} · imported ${esc(snap.imported_at?.slice(0, 10))}</p>
          ${metricsTable(snap.metrics)}
        </section>`,
      )
      .join("");

    const shadows = (exp.shadow_runs || [])
      .map(
        (run) =>
          `<tr><td class="py-1 font-mono text-xs"><a href="shadow/${esc(run.run_id)}.html" class="text-blue-800 hover:underline dark:text-blue-400">${esc(run.run_id)}</a></td><td class="py-1">${esc(run.date)}</td><td class="py-1">${esc(run.edition)}</td></tr>`,
      )
      .join("");

    const verdict =
      exp.verdict?.trim() ||
      (exp.status === "complete" ? "" : "Pending — import PostHog snapshots after baseline/treatment windows.");

    detailBody.innerHTML = `
      <p class="text-stone-600 dark:text-stone-400">${esc(exp.change_summary)}</p>
      <p class="mt-2"><strong>Hypothesis:</strong> ${esc(exp.hypothesis)}</p>
      <p class="mt-2"><strong>Status:</strong> <span class="rounded-full px-2 py-0.5 text-xs font-semibold ${statusClass(exp.status)}">${esc(exp.status)}</span></p>
      <p class="mt-2 text-sm"><strong>Baseline:</strong> ${esc(windowLabel(exp.baseline_window?.start, exp.baseline_window?.end))}</p>
      <p class="text-sm"><strong>Treatment:</strong> ${esc(windowLabel(exp.treatment_window?.start, exp.treatment_window?.end))}</p>
      ${flags ? `<ul class="mt-2 list-disc pl-5 text-sm">${flags}</ul>` : ""}
      <h3 class="mt-6 text-base font-semibold">Snapshots</h3>
      ${snapshots || '<p class="text-stone-500">No snapshots imported yet.</p>'}
      <h3 class="mt-6 text-base font-semibold">Shadow runs</h3>
      <table class="w-full text-sm">
        <thead><tr class="text-xs text-stone-500"><th class="pb-1 text-left">Run ID</th><th class="pb-1 text-left">Date</th><th class="pb-1 text-left">Edition</th></tr></thead>
        <tbody>${shadows || '<tr><td colspan="3" class="text-stone-500">None</td></tr>'}</tbody>
      </table>
      <p class="mt-1 text-xs text-stone-500">Side-by-side blurbs: <code>lab/shadow/{run_id}.html</code> (rebuilt with <code>npm run build:pages</code>). Raw JSON: <code>data/experiments/runs/{run_id}/</code>.</p>
      <h3 class="mt-6 text-base font-semibold">Verdict</h3>
      <p>${esc(verdict)}</p>
      <p class="mt-2 text-sm"><strong>Keep change:</strong> ${exp.keep_change == null ? "—" : exp.keep_change ? "Yes" : "No"}</p>
      ${exp.notes ? `<p class="mt-2 text-sm text-stone-600 dark:text-stone-400">${esc(exp.notes)}</p>` : ""}`;
  }

  function exportMarkdown(exp) {
    const lines = [
      `# Experiment ${exp.id}`,
      "",
      `_${exp.change_summary}_`,
      "",
      "## Hypothesis",
      exp.hypothesis,
      "",
      "## Setup",
      `- **Status:** ${exp.status}`,
      `- **Edition:** ${exp.edition}`,
      `- **Baseline window:** ${windowLabel(exp.baseline_window?.start, exp.baseline_window?.end)}`,
      `- **Treatment window:** ${windowLabel(exp.treatment_window?.start, exp.treatment_window?.end)}`,
      "",
      "## What we expected",
      exp.hypothesis,
      "",
      "## What happened",
      exp.verdict?.trim() || "_Fill in after treatment window and snapshot import._",
      "",
      "## Metrics",
      ...(exp.snapshots || []).flatMap((snap, i) => [
        `### Snapshot ${i + 1} (${snap.period?.start || "?"} → ${snap.period?.end || "?"})`,
        "",
        "**Pageviews:**",
        ...Object.entries(snap.metrics?.pageviews_by_path || {}).map(([k, v]) => `- ${k}: ${v}`),
        "",
        "**Outbound clicks:**",
        ...Object.entries(snap.metrics?.outbound_clicks || {}).map(([k, v]) => `- ${k}: ${v}`),
        "",
      ]),
      "## Recommendation",
      exp.keep_change == null
        ? "_TBD — set keep_change in experiment JSON when complete._"
        : exp.keep_change
          ? "Keep the change."
          : "Do not keep the change.",
      "",
      "## Notes",
      exp.notes || "",
      "",
    ];
    return lines.join("\n");
  }

  function downloadMarkdown() {
    if (!selected) return;
    const blob = new Blob([exportMarkdown(selected)], { type: "text/markdown;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${selected.id}.md`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  backBtn?.addEventListener("click", () => {
    selected = null;
    detail.classList.add("hidden");
    tableWrap.classList.remove("hidden");
  });

  exportBtn?.addEventListener("click", downloadMarkdown);

  fetch("experiments-data.json")
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then((data) => renderTable(data.experiments || []))
    .catch((err) => {
      tableWrap.innerHTML = `<p class="text-red-700 dark:text-red-400">Failed to load experiments: ${esc(err.message)}</p>`;
    });
})();
