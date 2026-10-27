import { EM_DASH, SEO_DESCRIPTION_MAX, SEO_TITLE_MAX } from "./seo-copy.js";

export function checkSeoText(text: string, rel: string, kind: "title" | "description"): string[] {
  const issues: string[] = [];
  if (text.includes(EM_DASH)) {
    issues.push(`${rel}: ${kind} contains U+2014 em dash`);
  }
  const max = kind === "title" ? SEO_TITLE_MAX : SEO_DESCRIPTION_MAX;
  if (text.length > max) {
    issues.push(`${rel}: ${kind} length ${text.length} exceeds max ${max}`);
  }
  return issues;
}
