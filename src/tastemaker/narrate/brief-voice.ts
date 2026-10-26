/** Verbatim house-style line for OSS/Skills narration prompts. */
export const NO_EM_DASH_VOICE_LINE =
  'Never use em dashes (—). Use a period, comma, or the word "and" instead, or rewrite the sentence. Normal hyphens are fine.';

export const EM_DASH = "\u2014";

/** True when prose contains a Unicode em dash (U+2014). */
export function containsEmDash(text: string): boolean {
  return text.includes(EM_DASH);
}

/**
 * Post-process model prose so published briefs never ship U+2014.
 * Archives may still contain em dashes; new pipeline output is normalized here.
 */
export function stripEmDashesFromProse(text: string): string {
  if (!containsEmDash(text)) return text;
  return text
    .replace(/\s*\u2014\s*/g, ", ")
    .replace(/,\s*,+/g, ", ")
    .replace(/,\s+\./g, ".")
    .replace(/,\s+;/g, ";");
}
