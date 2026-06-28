import type { EnrichmentSource } from "./types.js";

export function compactEnrichment(sources: EnrichmentSource[], maxChars: number): string {
  const parts: string[] = [];
  let used = 0;

  for (const source of sources) {
    const text = source.text.trim();
    if (!text) continue;

    const header = `[${source.label}]`;
    const block = `${header}\n${text}`;
    const separator = parts.length > 0 ? "\n\n" : "";
    const nextLen = used + separator.length + block.length;
    if (nextLen > maxChars) {
      const remaining = maxChars - used - separator.length - header.length - 1;
      if (remaining > 80) {
        parts.push(`${header}\n${text.slice(0, remaining)}…`);
      }
      break;
    }
    parts.push(block);
    used = nextLen;
  }

  return parts.join("\n\n");
}
