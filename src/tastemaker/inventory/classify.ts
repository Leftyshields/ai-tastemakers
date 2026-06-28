const CAPABILITY_RULES: Array<{ tag: string; patterns: RegExp[] }> = [
  {
    tag: "search",
    patterns: [
      /\bweb[- ]search\b/i,
      /\bai-search\b/i,
      /\bretrieval\b/i,
      /\bscraper?\b/i,
      /\breddit\b/i,
      /\btwitter\b/i,
      /\bhackernews\b/i,
      /\bparallel[- ]query\b/i,
      /\bdeep[- ]research\b/i,
      /\bparallel[- ]search\b/i,
    ],
  },
  {
    tag: "compression",
    patterns: [
      /\bcompress/i,
      /\bcompaction\b/i,
      /\btoken[- ]optim/i,
      /\bcontext[- ]window\b/i,
      /\bheadroom\b/i,
    ],
  },
  { tag: "mcp", patterns: [/\bmcp\b/i, /\bmodel context protocol\b/i] },
  {
    tag: "eval",
    patterns: [/\beval\b/i, /\bbenchmark\b/i, /\btest harness\b/i, /\bexperiment\b/i],
  },
  {
    tag: "analytics",
    patterns: [/\bplausible\b/i, /\banalytics\b/i, /\bmetrics\b/i, /\bengagement\b/i],
  },
  {
    tag: "memory",
    patterns: [/\bmemory\b/i, /\bcross[- ]session\b/i, /\bpersistent\b/i],
  },
  {
    tag: "agent-skill",
    patterns: [/\bagent skill\b/i, /\bclaude code\b/i, /\bslash command\b/i, /\bskill file\b/i],
  },
];

const ROLE_BY_TAG: Record<string, string[]> = {
  search: ["context-enrichment", "multi-source-search"],
  compression: ["compaction", "token-optimization"],
  mcp: ["agent-tooling"],
  eval: ["experiment-framework"],
  analytics: ["usage-measurement"],
  memory: ["cross-run-memory"],
  "agent-skill": ["editorial-quality"],
};

function haystack(topics: string[], brief: string | null): string {
  const topicText = topics.join(" ");
  return `${topicText} ${brief ?? ""}`.toLowerCase();
}

export function classifyCapabilityTags(topics: string[], brief: string | null): string[] {
  const text = haystack(topics, brief);
  const tags = new Set<string>();
  for (const rule of CAPABILITY_RULES) {
    if (rule.patterns.some((p) => p.test(text))) {
      tags.add(rule.tag);
    }
  }
  return [...tags].sort();
}

export function pipelineRolesFromTags(capabilityTags: string[]): string[] {
  const roles = new Set<string>();
  for (const tag of capabilityTags) {
    for (const role of ROLE_BY_TAG[tag] ?? []) {
      roles.add(role);
    }
  }
  return [...roles].sort();
}

export function classifyEntry(topics: string[], brief: string | null): {
  capability_tags: string[];
  pipeline_roles: string[];
} {
  const capability_tags = classifyCapabilityTags(topics, brief);
  const pipeline_roles = pipelineRolesFromTags(capability_tags);
  return { capability_tags, pipeline_roles };
}
