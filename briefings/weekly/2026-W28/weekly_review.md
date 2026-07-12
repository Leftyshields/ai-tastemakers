# Tastemakers Weekly — 2026-W28

_2026-07-06 – 2026-07-12 · generated 2026-07-12T14:40:00.715Z_

## Week at a glance

- **AI Tastemakers:** 22 unique repos · +103,730 stars gained (max 7d delta per repo) · top topics: claude-code, claude, ai, llm, ai-agents
- **Skill Tastemakers:** 23 unique repos · +117,656 stars gained (max 7d delta per repo) · top topics: claude-code, codex, claude, ai, ai-agents
- **Both lenses:** 16 repo(s) appeared in OSS and Skills digests (DeusData/codebase-memory-mcp, DietrichGebert/ponytail, JCodesMore/ai-website-cloner-template, JuliusBrussee/caveman, Leonxlnx/taste-skill, NousResearch/hermes-agent, Panniantong/Agent-Reach, affaan-m/ECC, asgeirtj/system_prompts_leaks, calesthio/OpenMontage, diegosouzapw/OmniRoute, farion1231/cc-switch, headroomlabs-ai/headroom, mvanhorn/last30days-skill, nextlevelbuilder/ui-ux-pro-max-skill, xbtlin/ai-berkshire)
- **Ranking modes this week:** delta_7d
- **Sustained OSS momentum:** DietrichGebert/ponytail (7d), firecrawl/firecrawl (7d), JuliusBrussee/caveman (7d), Leonxlnx/taste-skill (7d), Panniantong/Agent-Reach (7d), asgeirtj/system_prompts_leaks (6d), DeusData/codebase-memory-mcp (5d), calesthio/OpenMontage (4d), diegosouzapw/OmniRoute (4d), JCodesMore/ai-website-cloner-template (2d), NousResearch/hermes-agent (2d), xbtlin/ai-berkshire (2d)
- **Sustained Skills momentum:** DietrichGebert/ponytail (7d), Leonxlnx/taste-skill (7d), asgeirtj/system_prompts_leaks (6d), JuliusBrussee/caveman (6d), Panniantong/Agent-Reach (6d), addyosmani/agent-skills (5d), iOfficeAI/OfficeCLI (5d), DeusData/codebase-memory-mcp (4d), ogulcancelik/herdr (4d), calesthio/OpenMontage (2d), diegosouzapw/OmniRoute (2d), Graphify-Labs/graphify (2d), JCodesMore/ai-website-cloner-template (2d), NousResearch/hermes-agent (2d), xbtlin/ai-berkshire (2d)

## Opening

Week 28 was the week the community decided AI agents need a stern editor — the dominant theme across both lanes was constraint, not capability. OSS repos pulled in 103,730 stars across 22 projects; Skills came in even hotter at 117,656 across 23, a signal that prompt-layer tooling is outpacing runtime infrastructure in raw developer interest right now. Seven repos held the top charts all seven days without slipping, which is unusual staying power and suggests these aren't viral-for-a-day curiosities. The market is voting for discipline.

## AI Tastemakers

**Ponytail** (55K stars, 7 days straight) led the OSS lane by a wide margin with a simple premise: make Claude Code and Cursor behave like a senior dev who's tired and doesn't want to write unnecessary code — cutting generated output by roughly half. Right behind it, **Caveman** (46K) took the same anti-verbosity instinct to the prose layer, stripping agent responses down to grunts while leaving code untouched. **Agent-Reach** (37K) was the functional outlier — a Python CLI giving agents keyless, zero-config read access to Twitter, Reddit, YouTube, and more — pointing toward a quieter but serious demand for agents that can actually browse the social web without OAuth gymnastics. The thread connecting all three: developers don't want more from their agents, they want less noise and more leverage.

## Skill Tastemakers

The Skills lane mirrored OSS at the top but diverged meaningfully mid-table. **Taste-Skill** (43K stars, 7 days) held its ground as the definitive answer to "why does every AI-generated UI look like a Bootstrap demo," dropping opinionated typography and layout rules directly into Codex, Cursor, and Claude Code as portable markdown files. **Addyosmani/agent-skills** (34K, 5 days) was the week's most substantive new entry — a set of production-grade slash commands (`/spec`, `/plan`, `/build`, `/review`, `/ship`) that encode senior engineering process as agent-executable gates, not just vibes. The **system_prompts_leaks** repo (42K) crossing into the Skills lane confirms that developers are treating leaked system prompts as skill blueprints — studying how Anthropic, OpenAI, and Google prompt their own models to learn how to prompt theirs.

## Cross-Lane Themes

Sixteen repos appeared in both OSS and Skills rankings this week, which is the highest overlap we've tracked — it reflects a blurring line between "a tool you install" and "a prompt you drop in," since the winning projects are often both simultaneously. The dominant cross-lane signal is **agent output reduction**: Ponytail, Caveman, and the leaks repo all attract builders who are frustrated that agents are verbose, over-engineered, and opaque — and who want mechanical, enforceable fixes rather than better prompting habits. **Codebase-memory-mcp** and **OmniRoute** appearing in both lanes for multiple days also hints at a maturing MCP/routing infrastructure layer that's finding its audience across skill authors and OSS contributors alike.

## Builder Takeaway

If you're shipping agent tooling right now, the market is clearly rewarding constraint primitives over feature additions — anything that makes an agent produce less, think smaller, or stay on a tighter rail is getting immediate traction. The Taste-Skill and agent-skills pattern is also worth watching closely: portable markdown instruction files with zero runtime dependency are proving easier to distribute and star than full frameworks. Build the skill first, validate demand, then add the scaffolding. And if you haven't read the **system_prompts_leaks** repo yet, do it for the craft — the gap between how frontier labs prompt their own models and how most developers prompt theirs is still embarrassingly large.

