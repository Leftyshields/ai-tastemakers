/** Heuristic label width in px (0.55em per char at 12px bold). */
export const TIMELINE_LABEL_MIN_CHARS = 8;
export const TIMELINE_LABEL_PX_PER_CHAR = 7;
/** Matches `.lab-timeline-bar` horizontal padding (8px each side). */
export const TIMELINE_BAR_HORIZONTAL_PADDING_PX = 16;

const PX_PER_CHAR = TIMELINE_LABEL_PX_PER_CHAR;

export function minBarWidthPxForInsideLabel(): number {
  return TIMELINE_LABEL_MIN_CHARS * PX_PER_CHAR + TIMELINE_BAR_HORIZONTAL_PADDING_PX;
}

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
  return barWidthPx >= minBarWidthPxForInsideLabel();
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
