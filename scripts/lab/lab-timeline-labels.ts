/** Heuristic label width in px (0.55em per char at 12px bold). */
export const TIMELINE_LABEL_MIN_CHARS = 8;
const PX_PER_CHAR = 7;

export function estimateLabelWidthPx(label: string): number {
  return label.length * PX_PER_CHAR;
}

export type TimelineLabelPlacement = "inside" | "outside" | "hidden";

export function chooseTimelineLabelPlacement(
  label: string,
  barWidthPx: number,
  spaceAfterBarPx: number,
): TimelineLabelPlacement {
  const need = estimateLabelWidthPx(label);
  const minNeed = TIMELINE_LABEL_MIN_CHARS * PX_PER_CHAR;
  if (barWidthPx >= need && label.length >= TIMELINE_LABEL_MIN_CHARS) return "inside";
  if (
    spaceAfterBarPx >= need + 8 &&
    label.length >= TIMELINE_LABEL_MIN_CHARS &&
    outsideLabelClearsNextBar(need, spaceAfterBarPx)
  ) {
    return "outside";
  }
  if (barWidthPx >= minNeed && label.length >= TIMELINE_LABEL_MIN_CHARS) return "inside";
  return "hidden";
}

/** Outside label allowed only when the full text box clears the next bar plus 8px. */
export function outsideLabelClearsNextBar(
  labelWidthPx: number,
  gapBeforeNextBarPx: number,
): boolean {
  return gapBeforeNextBarPx >= labelWidthPx + 8;
}
