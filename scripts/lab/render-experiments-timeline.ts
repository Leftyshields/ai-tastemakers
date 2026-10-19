import type { LabExperimentEntry, LabExperimentsFile } from "./validate-experiments.js";

export function formatSurfaces(entry: LabExperimentEntry): string {
  return Array.isArray(entry.surface) ? entry.surface.join(", ") : entry.surface;
}

export function renderExperimentsTimelineTable(
  publicFile: LabExperimentsFile,
  escapeHtml: (t: string) => string,
): string {
  const rows = [...publicFile.experiments].sort((a, b) => {
    const sa = a.start ?? "9999";
    const sb = b.start ?? "9999";
    return sa.localeCompare(sb) || a.id.localeCompare(b.id);
  });

  if (rows.length === 0) {
    return `<p class="font-sans text-sm text-stone-600 dark:text-stone-400">No running or completed experiments are published yet.</p>`;
  }

  const tr = rows
    .map((e) => {
      const deps = e.depends_on.length ? e.depends_on.join(", ") : "—";
      const start = e.start ?? "—";
      const end = e.end ?? "—";
      const note = e.note ? `<span class="block text-xs text-stone-500 dark:text-stone-400">${escapeHtml(e.note)}</span>` : "";
      return `<tr>
        <td class="px-3 py-2 font-mono text-xs">${escapeHtml(e.id)}</td>
        <td class="px-3 py-2 text-xs">${escapeHtml(formatSurfaces(e))}</td>
        <td class="px-3 py-2 text-xs">${escapeHtml(e.status)}</td>
        <td class="px-3 py-2 text-xs whitespace-nowrap">${escapeHtml(start)}</td>
        <td class="px-3 py-2 text-xs whitespace-nowrap">${escapeHtml(end)}</td>
        <td class="px-3 py-2 text-xs">${escapeHtml(deps)}</td>
        <td class="px-3 py-2 text-xs">${escapeHtml(e.metric)}${note}</td>
      </tr>`;
    })
    .join("");

  return `<div class="overflow-x-auto font-sans text-sm">
    <table class="min-w-full border-collapse border border-stone-200 dark:border-stone-700">
      <thead class="bg-stone-50 dark:bg-stone-900">
        <tr>
          <th class="border border-stone-200 px-3 py-2 text-left text-xs font-semibold dark:border-stone-700">id</th>
          <th class="border border-stone-200 px-3 py-2 text-left text-xs font-semibold dark:border-stone-700">surface</th>
          <th class="border border-stone-200 px-3 py-2 text-left text-xs font-semibold dark:border-stone-700">status</th>
          <th class="border border-stone-200 px-3 py-2 text-left text-xs font-semibold dark:border-stone-700">start</th>
          <th class="border border-stone-200 px-3 py-2 text-left text-xs font-semibold dark:border-stone-700">end</th>
          <th class="border border-stone-200 px-3 py-2 text-left text-xs font-semibold dark:border-stone-700">depends_on</th>
          <th class="border border-stone-200 px-3 py-2 text-left text-xs font-semibold dark:border-stone-700">metric</th>
        </tr>
      </thead>
      <tbody>${tr}</tbody>
    </table>
  </div>`;
}
