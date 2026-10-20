import type { LabExperimentStatus, LabVerdict } from "./validate-experiments.js";
import type { LabTrackStatus } from "./lab-metric-progress.js";
import { sanitizeVisibleCopy } from "./lab-format.js";

export type LabChipKind = "experiment" | "track" | "verdict";

export function labStatusChipClass(
  kind: LabChipKind,
  value: LabExperimentStatus | LabTrackStatus | LabVerdict,
): string {
  const base =
    "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold leading-none";
  if (kind === "track") {
    switch (value as LabTrackStatus) {
      case "Ahead":
        return `${base} bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-100`;
      case "Behind":
        return `${base} bg-amber-100 text-amber-950 dark:bg-amber-900/50 dark:text-amber-100`;
      default:
        return `${base} bg-stone-200 text-stone-900 dark:bg-stone-700 dark:text-stone-100`;
    }
  }
  if (kind === "verdict") {
    switch (value as LabVerdict) {
      case "ship":
        return `${base} bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-100`;
      case "revert":
        return `${base} bg-rose-100 text-rose-950 dark:bg-rose-900/50 dark:text-rose-100`;
      default:
        return `${base} bg-stone-200 text-stone-900 dark:bg-stone-700 dark:text-stone-100`;
    }
  }
  switch (value as LabExperimentStatus) {
    case "running":
      return `${base} bg-blue-700 text-white dark:bg-blue-600`;
    case "planned":
      return `${base} border border-stone-400 bg-transparent text-stone-800 dark:border-blue-400 dark:text-stone-200`;
    default:
      return `${base} bg-stone-300/80 text-stone-800 dark:bg-stone-600 dark:text-stone-100`;
  }
}

export function labStatusChipLabel(
  kind: LabChipKind,
  value: LabExperimentStatus | LabTrackStatus | LabVerdict,
): string {
  if (kind === "verdict") {
    const v = value as LabVerdict;
    if (v === "ship") return "Shipped";
    if (v === "revert") return "Reverted";
    return "Inconclusive";
  }
  if (kind === "track") return value as LabTrackStatus;
  const s = value as LabExperimentStatus;
  if (s === "done") return "Done";
  if (s === "running") return "Running";
  return "Planned";
}

export function renderLabStatusChip(
  kind: LabChipKind,
  value: LabExperimentStatus | LabTrackStatus | LabVerdict,
  escapeHtml: (t: string) => string,
): string {
  const label = sanitizeVisibleCopy(labStatusChipLabel(kind, value));
  return `<span class="${labStatusChipClass(kind, value)}">${escapeHtml(label)}</span>`;
}
