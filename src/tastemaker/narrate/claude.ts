import Anthropic from "@anthropic-ai/sdk";
import type { ScoredRepo } from "../types.js";

function buildPrompt(repo: ScoredRepo): string {
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

  parts.push(
    "",
    "Write exactly 2–3 sentences in English explaining: (1) what this project does, (2) why it is interesting right now, (3) what a builder could do with it.",
    "Be specific and punchy. No markdown headings. No hype or filler.",
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
      max_tokens: 300,
      messages: [{ role: "user", content: buildPrompt(repo) }],
    });

    const block = message.content.find((b) => b.type === "text");
    if (!block || block.type !== "text") {
      return null;
    }

    return block.text.trim().replace(/^```[\s\S]*?```$/gm, "").trim();
  } catch (err) {
    console.warn(`Claude narration failed for ${repo.full_name}:`, err);
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
