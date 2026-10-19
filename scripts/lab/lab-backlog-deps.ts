import type { LabExperimentSource } from "./lab-public-types.js";
import { sanitizeVisibleCopy } from "./lab-format.js";

export function experimentLabelById(
  experiments: LabExperimentSource[],
  id: string,
): string | null {
  const hit = experiments.find((e) => e.id === id);
  return hit ? sanitizeVisibleCopy(hit.label) : null;
}

export function formatBacklogDependsOn(
  dependsOn: string[],
  experiments: LabExperimentSource[],
): { htmlNames: string; plain: string } {
  if (dependsOn.length === 0) return { htmlNames: "", plain: "" };
  const parts = dependsOn.map((id) => {
    const name = experimentLabelById(experiments, id) ?? "Prior experiment";
    return { id, name };
  });
  const htmlNames = parts
    .map((p) => `<span title="${idAttr(p.id)}">${escapeText(p.name)}</span>`)
    .join(", ");
  return { htmlNames, plain: parts.map((p) => p.name).join(", ") };
}

function idAttr(id: string): string {
  return id.replace(/"/g, "&quot;");
}

function escapeText(t: string): string {
  return t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** True when multi surface is already clear from formatted surface names. */
export function backlogSurfaceNamesBoth(surfacesFormatted: string): boolean {
  const lower = surfacesFormatted.toLowerCase();
  return lower.includes("oss") && lower.includes("skills");
}
