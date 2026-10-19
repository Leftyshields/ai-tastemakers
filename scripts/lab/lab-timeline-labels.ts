/** Heuristic label width in px (0.55em per char at 12px bold). */
export const TIMELINE_LABEL_MIN_CHARS = 8;
const PX_PER_CHAR = 7;

export function estimateLabelWidthPx(label: string): number {
  return label.length * PX_PER_CHAR;
}

export type TimelineLabelPlacement = "inside" | "outside" | "hidden";

/**
 * Inside label when the label has at least MIN_CHARS and the bar has room for text
 * (ellipsis handles overflow; collision rules apply to outside labels only).
 */
export function shouldRenderInsideTimelineLabel(
  barWidthPx: number,
  labelLength: number,
): boolean {
  if (labelLength < TIMELINE_LABEL_MIN_CHARS) return false;
  return barWidthPx >= 24;
}

export function chooseTimelineLabelPlacement(
  label: string,
  barWidthPx: number,
  spaceAfterBarPx: number,
): TimelineLabelPlacement {
  if (shouldRenderInsideTimelineLabel(barWidthPx, label.length)) return "inside";
  const need = estimateLabelWidthPx(label);
  if (
    label.length >= TIMELINE_LABEL_MIN_CHARS &&
    outsideLabelClearsNextBar(need, spaceAfterBarPx)
  ) {
    return "outside";
  }
  return "hidden";
}

/** Outside label allowed only when the full text box clears the next bar plus 8px. */
export function outsideLabelClearsNextBar(
  labelWidthPx: number,
  gapBeforeNextBarPx: number,
): boolean {
  return gapBeforeNextBarPx >= labelWidthPx + 8;
}
