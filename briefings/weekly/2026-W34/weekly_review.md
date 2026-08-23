# Tastemakers Weekly — 2026-W34

_2026-08-17 – 2026-08-23 · generated 2026-08-23T13:48:06.870Z_

Three reads of the same week, in order: **strategy**, then **the stack**, then **the counts**.

## For executives

The dominant story this week is infrastructure consolidation: teams are standardizing on unified AI gateways and shared memory layers rather than wiring together point solutions. OmniRoute, a self-hosted gateway that routes requests across more than 1,200 models through a single compatible endpoint, held the top of the trending charts all seven days — a signal that provider lock-in anxiety is now a purchasing driver. The week's most-starred project overall was a tool designed to strip AI-origin watermarks from text and files, which should prompt any legal or compliance team to revisit what "AI provenance" means in their workflows. Agent development environments — platforms that let engineers run multiple coding agents side-by-side with shared memory and tooling — are maturing fast, with both holaOS and Orca drawing sustained attention. The quarter's watch item: teams that invest now in model-routing and agent-orchestration infrastructure will be positioned to swap underlying models freely as the cost curve keeps falling.

## For AI generalists

The builder stack shifted noticeably toward *coordination* this week rather than raw model capability. OmniRoute gives you a single local endpoint that spans 340-plus providers and falls back automatically when quotas are hit — practically eliminating the boilerplate of multi-provider failover. Orca and holaOS are both pushing toward the same idea from different angles: run Claude Code, Codex, or OpenCode in parallel inside a single workspace, share memory and file state across sessions, and optionally steer the agents from a mobile app. Ponytail, a Claude Code skill, takes a different but equally practical angle — it trains agents to reach for the simplest native solution first, which the authors measured as cutting generated line counts by roughly half on real codebases.

The skills side of the chart was dominated by something harder to categorize neatly: NousResearch's Hermes Agent, which creates and stores skills from its own experience across sessions, building a persistent model of the user over time. That's less a tool and more a pattern — self-improving, memory-augmented agents as a deployable primitive — and it held the trending charts for the full seven days. The watermarks-remover project also appeared in both the OSS and skills charts simultaneously, which is unusual; it functions as both a standalone Python service and an agent-callable skill, a dual-mode packaging pattern worth watching as more developers ship work this way.

## The numbers

Both editions this week were ranked solely on seven-day star delta, which amplifies anything that caught a single viral moment early in the week and then coasted — watermarks-remover's lead in raw stars gained almost certainly reflects a Monday spike rather than seven days of steady organic growth. The full-week streaks (seven repos held the charts every single day in both editions) are the more reliable signal of durable interest; those repeat appearances are harder to manufacture. Cross-edition overlap was unusually high — seventeen repos appeared in both the OSS and skills tables — so the aggregate star totals should not be added together; they count largely the same audience twice.

- **AI Tastemakers:** 32 unique repos · +108,413 stars gained (max 7d delta per repo) · top topics: llm, claude-code, claude, ai, ai-agents
- **Skill Tastemakers:** 26 unique repos · +82,125 stars gained (max 7d delta per repo) · top topics: claude-code, codex, ai-agents, claude, ai
- **Both lists:** 17 repo(s) appeared in OSS and Skills (DietrichGebert/ponytail, Graphify-Labs/graphify, JuliusBrussee/caveman, Leonxlnx/taste-skill, NousResearch/hermes-agent, Panniantong/Agent-Reach, Wei-Shaw/sub2api, affaan-m/ECC, can1357/oh-my-pi, citrolabs/ego-lite, diegosouzapw/OmniRoute, guillaumemeyer/watermarks-remover, holaboss-ai/holaOS, lidge-jun/opencodex, mukul975/Anthropic-Cybersecurity-Skills, nextlevelbuilder/ui-ux-pro-max-skill, santifer/career-ops)
- **How we ranked this week:** delta_7d
- **Held the OSS list:** diegosouzapw/OmniRoute (7d), DietrichGebert/ponytail (7d), guillaumemeyer/watermarks-remover (7d), harry0703/MoneyPrinterTurbo (6d), holaboss-ai/holaOS (5d), NousResearch/hermes-agent (5d), bojieli/ai-agent-book (3d), santifer/career-ops (3d), firecrawl/firecrawl (2d), Leonxlnx/taste-skill (2d), TencentCloud/TencentDB-Agent-Memory (2d)
- **Held the Skills list:** diegosouzapw/OmniRoute (7d), DietrichGebert/ponytail (7d), guillaumemeyer/watermarks-remover (7d), NousResearch/hermes-agent (7d), stablyai/orca (7d), holaboss-ai/holaOS (5d), santifer/career-ops (4d), Graphify-Labs/graphify (3d), herdrdev/herdr (3d), blader/humanizer (2d), JuliusBrussee/caveman (2d), nextlevelbuilder/ui-ux-pro-max-skill (2d)

Today's ranked lists: [AI Tastemakers](../briefings/2026-08-23.html) · [Skill Tastemakers](../skills/briefings/2026-08-23.html)
