# Tastemakers Weekly — 2026-W32

_2026-08-03 – 2026-08-09 · generated 2026-08-09T14:00:32.772Z_

## Week at a glance

- **AI Tastemakers:** 21 unique repos · +90,671 stars gained (max 7d delta per repo) · top topics: llm, claude-code, mcp, ai-agent, ai-agents
- **Skill Tastemakers:** 25 unique repos · +83,294 stars gained (max 7d delta per repo) · top topics: claude-code, codex, ai-agents, claude, llm
- **Both lenses:** 15 repo(s) appeared in OSS and Skills digests (1jehuang/jcode, DietrichGebert/ponytail, Graphify-Labs/graphify, Leonxlnx/taste-skill, NousResearch/hermes-agent, Panniantong/Agent-Reach, affaan-m/ECC, calesthio/OpenMontage, citrolabs/ego-lite, diegosouzapw/OmniRoute, farion1231/cc-switch, lidge-jun/opencodex, microsoft/generative-ai-for-beginners, mvanhorn/last30days-skill, nextlevelbuilder/ui-ux-pro-max-skill)
- **Ranking modes this week:** delta_7d
- **Sustained OSS momentum:** bojieli/ai-agent-book (7d), diegosouzapw/OmniRoute (7d), DietrichGebert/ponytail (7d), Graphify-Labs/graphify (7d), lyogavin/airllm (7d), Panniantong/Agent-Reach (7d), TencentCloud/TencentDB-Agent-Memory (7d), esengine/DeepSeek-Reasonix (4d), firecrawl/firecrawl (3d), Leonxlnx/taste-skill (2d), NousResearch/hermes-agent (2d)
- **Sustained Skills momentum:** diegosouzapw/OmniRoute (7d), DietrichGebert/ponytail (7d), Graphify-Labs/graphify (7d), NousResearch/hermes-agent (7d), Panniantong/Agent-Reach (7d), stablyai/orca (7d), Leonxlnx/taste-skill (5d), microsoft/generative-ai-for-beginners (3d), addyosmani/agent-skills (2d), calesthio/OpenMontage (2d), lidge-jun/opencodex (2d)

## Opening

Week 32 was the busiest routing week of the summer: 21 OSS repos and 25 skill repos cleared Tastemakers thresholds, generating ~90.7K and ~83.3K new stars respectively across the two lanes. The dominant topics — `claude-code`, `mcp`, `ai-agents`, `codex` — aren't shifting; they're consolidating, which means the crowded ideas are getting crowded fast. Seven repos held the full seven-day chart in at least one lane, a signal that builder attention is less scattered than it was in Q2. If you're still building point solutions, the field is telling you something.

## AI Tastemakers

The headline number is OmniRoute's 49K stars in seven days — nearly half the lane's total weekly gain from a single repo — built on a straightforward premise: one OpenAI-compatible endpoint in front of 290+ providers with quota-aware fallback and aggressive token compression. That's a bet that model fragmentation is a permanent infrastructure problem, not a temporary inconvenience. Close behind it, `bojieli/ai-agent-book` pulled an essentially identical 49K, which is a reminder that high-quality educational material still converts at the same rate as production tooling when the timing is right. TencentCloud's `TencentDB-Agent-Memory` at 42K is the week's most structurally interesting entry: it extracts four distinct asset types from agent conversations and makes them queryable across sessions, pointing toward memory as a first-class infrastructure layer rather than a prompt engineering afterthought.

## Skill Tastemakers

Orca from stablyai was the lane's second-biggest mover at 40K stars, and it's worth reading carefully — parallel coding agents across isolated git worktrees with a browser Design Mode that pipes live HTML/CSS into prompts is not a thin wrapper, it's a rethought developer surface. Graphify's 33K finish is quieter but arguably more durable: parsing codebases into a queryable knowledge graph via tree-sitter and exposing it as a `/graphify` MCP skill means agents stop hallucinating your project structure, which is a real and recurring failure mode. Ponytail's 37K on both charts for a YAGNI-first prompt rule — measured at ~54% fewer lines of code across 12 real tasks — is the week's clearest proof that a single, well-scoped behavioral constraint beats a sprawling system prompt.

## Cross-Lane Themes

Fifteen repos appeared in both the OSS and skills charts this week, the highest overlap count since W18, and the pattern is intentional: tools like OmniRoute, Ponytail, Agent-Reach, and Graphify are being built to function simultaneously as infrastructure and as drop-in agent skills. That dual-mode design — useful as a standalone CLI or library, but also callable inside Claude Code or Codex via MCP — is becoming the expected surface area for anything serious. The `claude-code` and `codex` topics are converging in the standings rather than competing, which suggests builders are targeting agent runtimes plurally from day one rather than picking a side.

## Builder Takeaway

The structural bet that paid off this week: solve a problem agents hit on every project (token cost, provider lock-in, memory loss, codebase blindness), expose it through MCP, and make it measurable. Vague "AI-powered" framing is losing chart share to repos that quote a number — 290 providers, 54% fewer lines, 15–95% token reduction. If you're scoping something for W33, the gap that's still undercrowded is cross-session agent memory outside the database context; TencentDB's entry shows demand, but no general-purpose equivalent landed this week.

