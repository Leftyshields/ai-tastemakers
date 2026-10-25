/** Shared /go lab dest samples for allowlist parity and security tests. */

const FIRECRAWL_POST = "/lab/posts/EXP-20260716-firecrawl-enrich-skills.html";
const FIRECRAWL_POST_PREFIXED =
  "/ai-tastemakers/lab/posts/EXP-20260716-firecrawl-enrich-skills.html";

const FROM_SKILLS =
  "from=skills%2Fbriefings%2F2026-08-05.html%23repo-humanizer";
const FROM_OSS = "from=briefings%2F2026-10-25.html%23repo-ponytail";

/** Dest paths that must pass server and client allowlist validators. */
export const LAB_BADGE_DEST_ALLOWED_SAMPLES = [
  FIRECRAWL_POST,
  FIRECRAWL_POST_PREFIXED,
  `${FIRECRAWL_POST}?${FROM_SKILLS}`,
  `/ai-tastemakers/lab/index.html?${FROM_OSS}#lab-exp-EXP-20260913-humanizer-polish-skills`,
  "/lab/index.html#lab-exp-EXP-20260913-humanizer-polish-skills",
  "/ai-tastemakers/lab/index.html#lab-exp-EXP-20260913-humanizer-polish-skills",
] as const;

/** Dest paths that must be rejected (malicious or malformed). */
export const LAB_BADGE_DEST_REJECTED_SAMPLES = [
  `${FIRECRAWL_POST}?${FROM_SKILLS}&next=https://evil.com`,
  `${FIRECRAWL_POST}?from=briefings%2F2026-10-25.html%23repo-EVIL`,
  `${FIRECRAWL_POST}?from=briefings%2F2026-10-25.html`,
  `${FIRECRAWL_POST}?from=`,
  `${FIRECRAWL_POST}?from=from=briefings%2F2026-10-25.html%23repo-ponytail`,
  `${FIRECRAWL_POST}?from=%22%3E%3Cscript%3E`,
  `${FIRECRAWL_POST}?from=briefings%2F2026-10-25.html%23repo-ponytail%0d%0a`,
  `/lab/%2e%2e%2fposts/EXP-20260716-firecrawl-enrich-skills.html?${FROM_SKILLS}`,
  "//evil.com/lab/posts/EXP-20260716-firecrawl-enrich-skills.html",
  "/\\evil.com/lab/posts/EXP-20260716-firecrawl-enrich-skills.html",
  "javascript:alert(1)",
  `${FIRECRAWL_POST}?from=//evil.com/briefings/2026-10-25.html`,
  `${FIRECRAWL_POST}?from=https%3A%2F%2Fevil.com%2Fbriefings%2F2026-10-25.html`,
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
