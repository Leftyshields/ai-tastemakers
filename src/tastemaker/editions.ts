import path from "node:path";

export type EditionId = "oss" | "skills";

export interface EditionDefinition {
  id: EditionId;
  name: string;
  tagline: string;
  topics: string[];
  minStarsDefault: number;
  maxStarsBootstrapDefault: number;
  /** Subdirectory under `briefings/` (empty = root dates). */
  briefingsSubdir: string;
  snapshotFile: string;
  /** Subdirectory under `site/` for static pages. */
  siteSegment: string;
  inspiration?: { label: string; url: string };
  extraBlocklist?: string[];
}

const SHARED_BLOCKLIST = [
  "langchain-ai/langchain",
  "langchain-ai/langgraph",
  "Significant-Gravitas/AutoGPT",
  "ollama/ollama",
  "openai/openai-python",
  "huggingface/transformers",
  "n8n-io/n8n",
  "open-webui/open-webui",
  "Snailclimb/JavaGuide",
];

export const EDITIONS: Record<EditionId, EditionDefinition> = {
  oss: {
    id: "oss",
    name: "AI Tastemakers",
    tagline: "Daily intelligence on AI-derivative open source",
    topics: ["llm", "ai-agent", "mcp", "openai", "claude", "langchain", "ai-tools"],
    minStarsDefault: 50,
    maxStarsBootstrapDefault: 80_000,
    briefingsSubdir: "",
    snapshotFile: "repos.jsonl",
    siteSegment: "",
  },
  skills: {
    id: "skills",
    name: "Skill Tastemakers",
    tagline: "Daily top AI agent skills on GitHub",
    topics: [
      "ai-skill",
      "claude-code",
      "ai-prompts",
      "deep-research",
      "claude",
      "prompt-engineering",
      "cursor",
    ],
    minStarsDefault: 30,
    maxStarsBootstrapDefault: 25_000,
    briefingsSubdir: "skills",
    snapshotFile: "skills-repos.jsonl",
    siteSegment: "skills",
    inspiration: {
      label: "mvanhorn/last30days-skill",
      url: "https://github.com/mvanhorn/last30days-skill",
    },
    extraBlocklist: [
      "netdata/netdata",
      "lobehub/lobehub",
      "ruvnet/RuView",
      "bytedance/deer-flow",
      "shareAI-lab/learn-claude-code",
      "langchain-ai/langgraph",
    ],
  },
};

export function resolveEditionId(raw?: string): EditionId {
  const id = raw?.trim() || process.env.DIGEST_EDITION?.trim() || "oss";
  if (id === "oss" || id === "skills") return id;
  throw new Error(`Unknown edition "${id}". Use: oss, skills`);
}

export function getEdition(id: EditionId): EditionDefinition {
  return EDITIONS[id];
}

export function sharedBlocklist(): Set<string> {
  return new Set(SHARED_BLOCKLIST);
}

export function blocklistForEdition(edition: EditionDefinition): Set<string> {
  const list = new Set(SHARED_BLOCKLIST);
  for (const repo of edition.extraBlocklist ?? []) {
    list.add(repo);
  }
  return list;
}

export function briefingsDirForEdition(rootDir: string, edition: EditionDefinition): string {
  return edition.briefingsSubdir
    ? path.join(rootDir, "briefings", edition.briefingsSubdir)
    : path.join(rootDir, "briefings");
}

export function snapshotPathForEdition(rootDir: string, edition: EditionDefinition): string {
  return path.join(rootDir, "data/snapshots", edition.snapshotFile);
}
