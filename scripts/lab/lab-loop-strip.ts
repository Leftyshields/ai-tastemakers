/** UX39 Gestalt loop strip (Featured → Evaluated → Experiment → Result). */

export type LabLoopHrefMode = "lab-home" | "about";

export interface LabLoopStep {
  n: number;
  label: string;
  href: string;
  aboutSentence: string;
}

export function labLoopSteps(mode: LabLoopHrefMode): LabLoopStep[] {
  const digest =
    mode === "lab-home" ? "../index.html" : "../index.html";
  const tools = mode === "lab-home" ? "tools.html" : "tools.html";
  const experiment = mode === "lab-home" ? "#lab-control-panel" : "index.html#lab-control-panel";
  const result = mode === "lab-home" ? "#lab-history" : "index.html#lab-history";
  return [
    {
      n: 1,
      label: "Featured in digest",
      href: digest,
      aboutSentence:
        "Daily briefings surface new open source tools that might fit our pipeline.",
    },
    {
      n: 2,
      label: "Evaluated",
      href: tools,
      aboutSentence:
        "Tool inventory tags briefing history by pipeline role so we know what to try next.",
    },
    {
      n: 3,
      label: "Experiment",
      href: experiment,
      aboutSentence:
        "Registered changes run on baseline and treatment windows with metrics we can audit.",
    },
    {
      n: 4,
      label: "Result",
      href: result,
      aboutSentence:
        "History and posts record what we shipped, reverted, or left inconclusive.",
    },
  ];
}

export function renderLabLoopStripHtml(
  mode: LabLoopHrefMode,
  escapeHtml: (t: string) => string,
): string {
  const steps = labLoopSteps(mode);
  const items = steps
    .map((step, index) => {
      const chevron =
        index < steps.length - 1
          ? `<span class="lab-loop-chevron" aria-hidden="true">›</span>`
          : "";
      return `<a href="${escapeHtml(step.href)}" class="lab-loop-step">
        <span class="lab-loop-num" aria-hidden="true">${step.n}</span>
        <span class="lab-loop-label">${escapeHtml(step.label)}</span>
      </a>${chevron}`;
    })
    .join("");
  return `<nav class="lab-loop-strip" aria-label="Lab feedback loop">${items}</nav>`;
}

export function renderLabLoopAboutBlockHtml(escapeHtml: (t: string) => string): string {
  const strip = renderLabLoopStripHtml("about", escapeHtml);
  const sentences = labLoopSteps("about")
    .map(
      (s) =>
        `<p class="mt-3 text-sm text-stone-700 dark:text-stone-300"><strong>${escapeHtml(s.label)}.</strong> ${escapeHtml(s.aboutSentence)}</p>`,
    )
    .join("");
  return `${strip}<div class="lab-loop-about-copy font-sans">${sentences}</div>`;
}

/** UX38 Von Restorff: emphasize the first intro sentence. */
export function applyLabIntroVonRestorff(html: string): string {
  return html.replace(/<p>([^.<]+)\.\s*([\s\S]*?)<\/p>/, (_m, first: string, rest: string) => {
    const tail = rest.trim();
    const after = tail ? ` ${tail}` : "";
    if (!after.endsWith(".") && after) {
      return `<p><strong class="text-stone-900 dark:text-stone-100">${first}.</strong>${after}</p>`;
    }
    return `<p><strong class="text-stone-900 dark:text-stone-100">${first}.</strong>${after ? ` ${after}` : ""}</p>`;
  });
}
