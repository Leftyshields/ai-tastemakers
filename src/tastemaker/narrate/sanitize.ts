/** Labels Claude is required to emit. Publish path keeps only these. */
export const BRIEF_SECTION_LABELS = [
  "**What it does:**",
  "**Why now:**",
  "**Build with it:**",
] as const;

/** Imperative jailbreaks aimed at the narrator, not product copy about security. */
const INJECTION_PATTERNS: RegExp[] = [
  /\b(ignore|disregard|forget|skip)\b[\s\S]{0,80}\b(previous|prior|above|all|earlier|preceding)\b[\s\S]{0,80}\b(instructions?|prompts?|rules?|system)\b/i,
  /\b(reveal|dump|output|print|include|share|repeat|list)\b[\s\S]{0,80}\b(your|the|own)\b[\s\S]{0,40}\b(system\s+)?(prompt|instructions?|instructs?)\b/i,
  /\bshift\b[\s\S]{0,40}\bfocus\b/i,
  /\bincluding your own instructs?\b/i,
  /\byou are now\b[\s\S]{0,60}\b(jailbreak|dan|unrestricted|evil)\b/i,
  /\bdo not (follow|obey|listen)\b[\s\S]{0,40}\b(above|previous|editorial|system)\b/i,
];

const HIDDEN_CHARS = /[\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF]/g;

const INJECTION_ASIDE =
  /^\*?Note:[\s\S]*?(prompt injection|system (prompt|instructions?)|instructs?)/im;

function deleet(text: string): string {
  return text
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/7/g, "t")
    .replace(/8/g, "b")
    .replace(/@/g, "a")
    .replace(/\$/g, "s");
}

export function looksLikeInjection(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;
  if (INJECTION_PATTERNS.some((p) => p.test(trimmed))) return true;
  const normalized = deleet(trimmed);
  return normalized !== trimmed && INJECTION_PATTERNS.some((p) => p.test(normalized));
}

function stripHiddenAndComments(text: string): string {
  return text.replace(HIDDEN_CHARS, "").replace(/<!--[\s\S]*?-->/g, "");
}

/** Drop instruction-like sentences from third-party README / web / HN / Reddit text. */
export function sanitizeUntrustedContext(text: string): string {
  const cleaned = stripHiddenAndComments(text);
  const kept = cleaned.split("\n").map((line) => {
    if (!line.trim()) return line;
    return line
      .split(/(?<=[.!?])\s+/)
      .filter((unit) => !looksLikeInjection(unit))
      .join(" ");
  });
  return kept.join("\n").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function wrapUntrusted(kind: string, text: string): string {
  const cleaned = sanitizeUntrustedContext(text);
  if (!cleaned) {
    return `${kind}: unavailable — use description and topics only.`;
  }
  return `<<<UNTRUSTED_${kind}>>>\n${cleaned}\n<<<END_UNTRUSTED_${kind}>>>`;
}

export function extractBriefSection(brief: string, label: string): string {
  const start = brief.indexOf(label);
  if (start < 0) return "";
  const after = brief.slice(start + label.length);
  const nextIdx = BRIEF_SECTION_LABELS.map((l) => after.indexOf(l))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b)[0];
  return (nextIdx !== undefined ? after.slice(0, nextIdx) : after).trim();
}

function stripInjectionAsides(text: string): string {
  return text
    .replace(/^---+\s*$/gm, "")
    .split("\n")
    .filter((line) => !INJECTION_ASIDE.test(line.trim()) && !looksLikeInjection(line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Keep only the three labeled brief sections. Drops jailbreak footnotes
 * (e.g. "Note: The README contains an embedded prompt injection…").
 */
export function sanitizeBriefOutput(brief: string | null): string | null {
  if (brief == null) return null;
  const trimmed = brief.trim();
  if (!trimmed) return null;

  const parts: string[] = [];
  for (const label of BRIEF_SECTION_LABELS) {
    const body = stripInjectionAsides(extractBriefSection(trimmed, label));
    if (body) parts.push(`${label} ${body}`);
  }
  if (parts.length > 0) return parts.join("\n\n");

  const stripped = stripInjectionAsides(trimmed);
  if (!stripped || INJECTION_ASIDE.test(stripped) || looksLikeInjection(stripped)) {
    return null;
  }
  return stripped;
}
