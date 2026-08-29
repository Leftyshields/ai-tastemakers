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

  /** @type {object[]} */
  let allExperiments = [];
  /** @type {object | null} */
  let selected = null;
  /** @type {string} */
  let queueSummary = "";

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

  function statusModifier(label) {
    const map = {
      Kept: "kept",
      Shipped: "shipped",
      Reverted: "reverted",
      Finished: "finished",
      "On hold": "hold",
      "Measuring before": "running",
      "Measuring after": "running",
    };
    return map[label] || "finished";
  }

  function statusBadge(exp) {
    const label = exp.status_label || exp.status;
    return `<span class="experiment-status experiment-status--${statusModifier(label)}">${esc(label)}</span>`;
  }

  function cardHtml(exp) {
    return `
      <button type="button" class="experiment-card" data-id="${esc(exp.id)}" aria-label="${esc(exp.title)}">
        <div class="experiment-card__meta">
          ${statusBadge(exp)}
          <span class="experiment-card__edition">${esc(exp.edition_label || exp.edition)}</span>
        </div>
        <h3 class="experiment-card__title">${esc(exp.title)}</h3>
        <p class="experiment-card__summary">${esc(exp.reader_summary || exp.change_summary)}</p>
        ${exp.outcome_line ? `<p class="experiment-card__outcome">${esc(exp.outcome_line)}</p>` : ""}
      </button>`;
  }

  function liveRowHtml(exp) {
    return `<li>
      <button type="button" class="experiment-live" data-id="${esc(exp.id)}" aria-label="${esc(exp.title)}">
        <span class="experiment-live__title">${esc(exp.title)}</span>
        <span class="experiment-live__note">${esc(exp.outcome_line || exp.reader_summary)}</span>
      </button>
    </li>`;
  }

  function queueCalloutHtml() {
    if (!queueSummary) return "";
    const running = allExperiments.some((e) => e.status === "baseline" || e.status === "active");
    const cls = running ? "lab-callout lab-callout--running" : "lab-callout";
    return `<aside class="${cls}" aria-label="Current status">
      <p>${esc(queueSummary)} <a href="token-usage.html">Token dashboard</a></p>
    </aside>`;
  }

  function sectionHtml(title, intro, inner) {
    if (!inner) return "";
    return `<section class="experiment-section">
      <h3 class="experiment-section__title">${esc(title)}</h3>
      ${intro ? `<p class="experiment-section__intro">${intro}</p>` : ""}
      ${inner}
    </section>`;
  }

  function renderList() {
    if (!allExperiments.length) {
      tableWrap.innerHTML =
        '<p class="experiment-empty">No experiments yet. We publish them here when we try a change.</p>';
      return;
    }

    const running = allExperiments.filter((e) => e.status === "baseline" || e.status === "active");
    const held = allExperiments.filter((e) => e.status === "draft" && !e.archived);
    const live = allExperiments.filter((e) => e.keep_change === true);
    const tried = allExperiments.filter((e) => e.status === "complete" || e.archived);

    tableWrap.innerHTML = `
      ${queueCalloutHtml()}
      ${sectionHtml(
        "In progress",
        "Before = change off. After = change on. Pages rebuild once a day, so this is a calendar window, not a coin-flip A/B test.",
        running.length ? `<div class="experiment-card-list">${running.map(cardHtml).join("")}</div>` : "",
      )}
      ${sectionHtml(
        "On the site today",
        "Changes we kept. They are live for readers even if we skipped a full measured window.",
        live.length ? `<ul class="experiment-live-list">${live.map(liveRowHtml).join("")}</ul>` : "",
      )}
      ${sectionHtml(
        "On hold",
        "Ideas we still want to test after the current window ends.",
        held.length ? `<div class="experiment-card-list">${held.map(cardHtml).join("")}</div>` : "",
      )}
      ${sectionHtml(
        "What we tried",
        "Open a card for the question we asked and what we learned.",
        tried.length ? `<div class="experiment-card-list">${tried.map(cardHtml).join("")}</div>` : "",
      )}`;

    tableWrap.querySelectorAll("[data-id]").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-id");
        const exp = allExperiments.find((e) => e.id === id);
        if (exp) showDetail(exp);
      });
    });
  }

  const TOKEN_METRIC_LABELS = {
    _runs: "Digest runs",
    _avg_output_tokens: "Avg output tokens / run",
    _avg_output_words: "Avg output words / run",
    _rubric_pass: "Rank-1 rubric pass",
    _rubric_runs: "Rank-1 rubric runs",
    _why_now_avg: "Why-now avg (1–5)",
    _specificity_avg: "Specificity avg (1–5)",
  };

  function tokenMetricsTable(raw) {
    const entries = Object.entries(raw || {}).filter(([k]) => k.startsWith("_"));
    if (!entries.length) return "";
    const pass = raw._rubric_pass;
    const runs = raw._rubric_runs;
    const rows = entries
      .map(([k, v]) => {
        let display = v;
        if (k === "_rubric_pass" && pass != null && runs != null) {
          display = `${pass}/${runs}`;
        }
        const label = TOKEN_METRIC_LABELS[k] || k;
        return `<tr><th scope="row">${esc(label)}</th><td>${esc(display)}</td></tr>`;
      })
      .join("");
    return `
      <h4 class="experiment-subhead">Writing cost &amp; quality (token log)</h4>
      <table class="experiment-metrics">${rows}</table>`;
  }

  function metricsTable(metrics) {
    if (!metrics) return '<p class="experiment-muted">No numbers imported for this window.</p>';
    const pv = metrics.pageviews_by_path || {};
    const oc = metrics.outbound_clicks || {};
    const tokenBlock = tokenMetricsTable(oc);
    if (tokenBlock) return tokenBlock;
    const pvRows = Object.entries(pv)
      .map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`)
      .join("");
    const ocRows = Object.entries(oc)
      .map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`)
      .join("");
    return `
      <h4 class="experiment-subhead">Pageviews</h4>
      <table class="experiment-metrics">${pvRows || '<tr><td class="experiment-muted">None recorded</td></tr>'}</table>
      <h4 class="experiment-subhead">Clicks out to GitHub repos</h4>
      <table class="experiment-metrics">${ocRows || '<tr><td class="experiment-muted">None recorded</td></tr>'}</table>`;
  }

  function setHash(id) {
    const next = id ? `#${id}` : "";
    if (location.hash !== next) {
      history.replaceState(null, "", next || location.pathname + location.search);
    }
  }

  function showDetail(exp, opts) {
    selected = exp;
    tableWrap.classList.add("hidden");
    detail.classList.remove("hidden");
    detailTitle.textContent = exp.title || exp.id;
    if (!opts?.skipHash) setHash(exp.id);

    const flags = exp.change?.flags
      ? Object.entries(exp.change.flags)
          .map(([k, v]) => `<li><code>${esc(k)}</code> = ${esc(v)}</li>`)
          .join("")
      : "";

    const snapshots = (exp.snapshots || [])
      .map(
        (snap, i) => `
        <section class="experiment-snapshot">
          <p class="experiment-muted">Window ${i + 1} · ${esc(snap.period?.start)} → ${esc(snap.period?.end)}</p>
          ${metricsTable(snap.metrics)}
        </section>`,
      )
      .join("");

    const shadows = (exp.shadow_runs || [])
      .map(
        (run) =>
          `<li><a href="shadow/${esc(run.run_id)}.html">${esc(run.date)} · ${esc(run.edition)}</a></li>`,
      )
      .join("");

    const showTokens =
      exp.status === "active" || exp.status === "baseline" || String(exp.id).includes("ponytail");

    const glossary = (exp.reader_glossary || []).filter((item) => item?.term && item?.meaning);
    const glossaryHtml = glossary.length
      ? `<h3>Where the names come from</h3>
      <p>These are source ideas, not tools we installed.</p>
      <dl class="experiment-glossary">${glossary
        .map(
          (item) =>
            `<div class="experiment-glossary__item"><dt>${esc(item.term)}</dt><dd>${esc(item.meaning)}</dd></div>`,
        )
        .join("")}</dl>`
      : "";

    const measure = exp.how_we_measure?.trim()
      ? `<h3>How we'll know</h3>
      <p>${esc(exp.how_we_measure)}</p>
      ${showTokens ? `<p><a href="token-usage.html">See writing cost and quality</a></p>` : ""}`
      : showTokens
        ? `<p><a href="token-usage.html">See writing cost and quality</a></p>`
        : "";

    const defaultVerdict =
      exp.status === "active"
        ? "The new writing style is on. After each Skills digest, check whether briefs got shorter without getting worse."
        : exp.status === "baseline"
          ? "We are still collecting the before picture. The change is off."
          : exp.status === "complete"
            ? "No written verdict yet."
            : "Not started — we write a verdict after the after-window ends.";

    const verdict = exp.verdict?.trim() || defaultVerdict;
    const writeup = exp.writeup_href
      ? `<p class="experiment-writeup"><a href="${esc(exp.writeup_href)}">Longer write-up, with commands</a></p>`
      : "";
    const keep =
      exp.keep_change == null
        ? "Not decided yet."
        : exp.keep_change
          ? "Yes — it is still on."
          : "No — we turned it off.";

    detailBody.innerHTML = `
      <p class="experiment-detail__lede">${esc(exp.reader_summary || exp.change_summary)}</p>
      <p class="experiment-detail__meta">${statusBadge(exp)} <span>${esc(exp.edition_label || exp.edition)}</span></p>
      ${writeup}
      <h3>What we're trying</h3>
      <p>${esc(exp.hypothesis)}</p>
      ${glossaryHtml}
      <h3>When</h3>
      <p><strong>Before</strong> (old writing): ${esc(windowLabel(exp.baseline_window?.start, exp.baseline_window?.end))}<br>
      <strong>After</strong> (new writing): ${esc(windowLabel(exp.treatment_window?.start, exp.treatment_window?.end))}</p>
      ${measure}
      <h3>What we learned</h3>
      <p>${esc(verdict)}</p>
      <p><strong>Still on the live site?</strong> ${esc(keep)}</p>
      <details class="experiment-ops">
        <summary>Numbers and operator notes</summary>
        <p class="experiment-muted">Internal id: <code>${esc(exp.id)}</code></p>
        ${flags ? `<h4 class="experiment-subhead">Flags</h4><ul>${flags}</ul>` : ""}
        <h4 class="experiment-subhead">Imported analytics</h4>
        ${snapshots || '<p class="experiment-muted">No click analytics imported. For this test we use writing cost and quality, not pageviews.</p>'}
        <h4 class="experiment-subhead">Preview runs</h4>
        ${shadows ? `<ul>${shadows}</ul>` : '<p class="experiment-muted">No side-by-side preview stored for this experiment.</p>'}
        ${exp.notes ? `<p class="experiment-muted">${esc(exp.notes)}</p>` : ""}
      </details>`;
  }

  function hideDetail() {
    selected = null;
    detail.classList.add("hidden");
    tableWrap.classList.remove("hidden");
    setHash("");
  }

  function exportMarkdown(exp) {
    const lines = [
      `# ${exp.title || exp.id}`,
      "",
      `_${exp.reader_summary || exp.change_summary}_`,
      "",
      `Experiment ID: ${exp.id}`,
      "",
      "## What we're trying",
      exp.hypothesis,
      "",
      ...(exp.reader_glossary || []).flatMap((item) =>
        item?.term ? [`### ${item.term}`, item.meaning || "", ""] : [],
      ),
      "## Setup",
      `- **Status:** ${exp.status_label || exp.status}`,
      `- **Edition:** ${exp.edition_label || exp.edition}`,
      `- **Before window:** ${windowLabel(exp.baseline_window?.start, exp.baseline_window?.end)}`,
      `- **After window:** ${windowLabel(exp.treatment_window?.start, exp.treatment_window?.end)}`,
      "",
      "## What we learned",
      exp.verdict?.trim() || "_Fill in after the after-window._",
      "",
      "## Still on the live site?",
      exp.keep_change == null ? "_Not decided yet._" : exp.keep_change ? "Yes." : "No.",
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

  function showFromHash() {
    const id = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (!id) {
      if (selected) hideDetail();
      return;
    }
    const exp = allExperiments.find((e) => e.id === id);
    if (exp) showDetail(exp, { skipHash: true });
  }

  backBtn?.addEventListener("click", hideDetail);
  exportBtn?.addEventListener("click", downloadMarkdown);
  window.addEventListener("hashchange", showFromHash);

  fetch("experiments-data.json")
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then((data) => {
      queueSummary = data.queue_summary || "";
      allExperiments = data.experiments || [];
      renderList();
      showFromHash();
    })
    .catch((err) => {
      tableWrap.innerHTML = `<p class="experiment-error">Could not load experiments: ${esc(err.message)}</p>`;
    });
})();
