import Anthropic from "@anthropic-ai/sdk";
import type { ScoredRepo } from "../types.js";

export function buildPrompt(repo: ScoredRepo): string {
  const parts = [
    `Repository: ${repo.full_name}`,
    `URL: ${repo.html_url}`,
    `Stars: ${repo.stars} (+${repo.stars_gained_7d} this week)`,
    `Topics: ${repo.topics.join(", ") || "none"}`,
    `Language: ${repo.language || "unknown"}`,
    `Description: ${repo.description || "none"}`,
  ];

  if (repo.readme_excerpt) {
    parts.push(`README excerpt:\n${repo.readme_excerpt}`);
  } else {
    parts.push("README: unavailable — use description and topics only.");
  }

  if (repo.external_context?.trim()) {
    parts.push(
      "External context (web, Hacker News, Reddit — may include noise; prefer README when they conflict):",
      repo.external_context.trim(),
    );
  }

  parts.push(
    "",
    "Write a brief in English using exactly three labeled sections in this order, each with one to two sentences:",
    "",
    "**What it does:** [what this project is]",
    "**Why now:** [why it is relevant this week]",
    "**Build with it:** [what a builder could do with it]",
    "",
    "Editorial rules (YAGNI / taste-skill style):",
    "- Use those exact bold labels. Be specific, punchy, and builder-focused.",
    "- No hype, filler, or generic praise (avoid: revolutionary, game-changer, must-have).",
    "- **Why now** must cite a concrete timely signal when external context provides one: HN thread, Reddit post, release, launch, demo, coverage, or trend — not star count alone.",
    "- **Build with it** must name a concrete integration path (tool, config surface, or workflow step), not vague 'try this tool'.",
    "- Prefer nouns and features from README/external context over inventing capabilities.",
  );

  return parts.join("\n");
}

export async function narrateRepo(
  client: Anthropic,
  model: string,
  repo: ScoredRepo,
): Promise<string | null> {
  try {
    const message = await client.messages.create({
      model,
      max_tokens: 450,
      messages: [{ role: "user", content: buildPrompt(repo) }],
    });

    const block = message.content.find((b) => b.type === "text");
    if (!block || block.type !== "text") {
      return null;
    }

    return block.text.trim().replace(/^```[\s\S]*?```$/gm, "").trim();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`Claude narration failed for ${repo.full_name}: ${msg}`);
    return null;
  }
}

export async function narrateRepos(
  apiKey: string,
  model: string,
  repos: ScoredRepo[],
): Promise<Map<string, string | null>> {
  const client = new Anthropic({ apiKey });
  const results = new Map<string, string | null>();

  for (const repo of repos) {
    results.set(repo.full_name, await narrateRepo(client, model, repo));
  }

  return results;
}
