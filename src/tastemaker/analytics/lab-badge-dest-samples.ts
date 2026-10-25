/** Shared /go lab dest samples for allowlist parity and security tests. */

const FIRECRAWL_POST = "/lab/posts/EXP-20260716-firecrawl-enrich-skills.html";
const FIRECRAWL_POST_PREFIXED =
  "/ai-tastemakers/lab/posts/EXP-20260716-firecrawl-enrich-skills.html";

/** Dest paths that must pass server and client allowlist validators. */
export const LAB_BADGE_DEST_ALLOWED_SAMPLES = [
  FIRECRAWL_POST,
  FIRECRAWL_POST_PREFIXED,
  `${FIRECRAWL_POST}?from_list=skills&from_rank=2`,
  "/ai-tastemakers/lab/index.html?from_list=oss&from_rank=1#lab-exp-EXP-20260913-humanizer-polish-skills",
  "/lab/index.html#lab-exp-EXP-20260913-humanizer-polish-skills",
  "/ai-tastemakers/lab/index.html#lab-exp-EXP-20260913-humanizer-polish-skills",
] as const;

/** Dest paths that must be rejected (malicious or malformed). */
export const LAB_BADGE_DEST_REJECTED_SAMPLES = [
  `${FIRECRAWL_POST}?from_list=skills&from_rank=2&next=https://evil.com`,
  `${FIRECRAWL_POST}?from_list=skills&from_rank=0`,
  `${FIRECRAWL_POST}?from_list=skills&from_rank=11`,
  `${FIRECRAWL_POST}?from_list=skills&from_rank=3abc`,
  `${FIRECRAWL_POST}?from_list=skills`,
  `${FIRECRAWL_POST}?from_rank=2`,
  `${FIRECRAWL_POST}?from_list=skills&from_list=oss&from_rank=2`,
  `${FIRECRAWL_POST}?from_list=%22%3E%3Cscript%3E&from_rank=2`,
  `${FIRECRAWL_POST}?from_list=skills&from_rank=1%0d%0a`,
  `/lab/%2e%2e%2fposts/EXP-20260716-firecrawl-enrich-skills.html?from_list=skills&from_rank=2`,
  "//evil.com/lab/posts/EXP-20260716-firecrawl-enrich-skills.html",
  "/\\evil.com/lab/posts/EXP-20260716-firecrawl-enrich-skills.html",
  "javascript:alert(1)",
  `${FIRECRAWL_POST}?from_list=bad&from_rank=2`,
  "https://evil.com/lab/posts/EXP-20260716-firecrawl-enrich-skills.html",
  "/lab/posts/not-an-exp-id.html",
  "/lab/index.html#evil",
  "&next=https://evil.com",
  "",
] as const;

/** All samples (allowed + rejected) for inventory / documentation. */
export const SAMPLE_DESTS = [
  ...LAB_BADGE_DEST_ALLOWED_SAMPLES,
  ...LAB_BADGE_DEST_REJECTED_SAMPLES,
] as const;
