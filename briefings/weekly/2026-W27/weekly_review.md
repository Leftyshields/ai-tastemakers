# Tastemakers Weekly — 2026-W27

_2026-06-29 – 2026-07-05 · generated 2026-07-05T14:55:11.383Z_

## Week at a glance

- **AI Tastemakers:** 24 unique repos · +149,273 stars gained (max 7d delta per repo) · top topics: claude-code, claude, llm, mcp, ai
- **Skill Tastemakers:** 24 unique repos · +144,320 stars gained (max 7d delta per repo) · top topics: claude-code, claude, ai, llm, mcp
- **Both lenses:** 18 repo(s) appeared in OSS and Skills digests (DeusData/codebase-memory-mcp, DietrichGebert/ponytail, JCodesMore/ai-website-cloner-template, JuliusBrussee/caveman, Leonxlnx/taste-skill, NousResearch/hermes-agent, Panniantong/Agent-Reach, affaan-m/ECC, asgeirtj/system_prompts_leaks, calesthio/OpenMontage, cobusgreyling/loop-engineering, diegosouzapw/OmniRoute, farion1231/cc-switch, headroomlabs-ai/headroom, mukul975/Anthropic-Cybersecurity-Skills, nextlevelbuilder/ui-ux-pro-max-skill, santifer/career-ops, xbtlin/ai-berkshire)
- **Ranking modes this week:** delta_7d
- **Sustained OSS momentum:** calesthio/OpenMontage (7d), DeusData/codebase-memory-mcp (7d), DietrichGebert/ponytail (7d), Panniantong/Agent-Reach (7d), NousResearch/hermes-agent (6d), xbtlin/ai-berkshire (6d), headroomlabs-ai/headroom (5d), JuliusBrussee/caveman (4d), ZhuLinsen/daily_stock_analysis (3d), affaan-m/ECC (2d), farion1231/cc-switch (2d), nextlevelbuilder/ui-ux-pro-max-skill (2d)
- **Sustained Skills momentum:** calesthio/OpenMontage (7d), DeusData/codebase-memory-mcp (7d), DietrichGebert/ponytail (7d), NousResearch/hermes-agent (7d), Panniantong/Agent-Reach (7d), xbtlin/ai-berkshire (6d), headroomlabs-ai/headroom (4d), JuliusBrussee/caveman (4d), Leonxlnx/taste-skill (3d), asgeirtj/system_prompts_leaks (2d), JCodesMore/ai-website-cloner-template (2d), nextlevelbuilder/ui-ux-pro-max-skill (2d)

## Opening

Week 27 was a high-conviction week: 24 repos on each side of the ledger, with the OSS lane pulling **149,273 stars** and Skills landing **144,320** — a spread of less than 4%, which tells you the community is buying tooling and workflow patterns at nearly identical rates right now. The dominant topic tags — `claude-code`, `claude`, `llm`, `mcp`, `ai` — were identical across both lanes, in the same order, which hasn't happened in recent memory. The week's story isn't any single repo; it's the consolidation of a stack: persistent memory, minimal code generation, and agent-accessible data pipelines are no longer experiments, they're table stakes.

## AI Tastemakers

**Ponytail** (111,732 stars, 7/7 days) was the week's runaway, and its premise is almost contrarian: a plugin whose entire job is to stop Claude Code from writing code. The "laziest senior dev" framing landed because it names a real pain — agents that over-engineer — and solves it at the prompt layer rather than post-hoc review. Close behind it, **OpenMontage** (79,299 stars) demonstrated that agentic video production is now a systems-design problem, not an API-stitching one — 12 pipelines and 52 tools is an architecture, not a demo. **codebase-memory-mcp** (69,731 stars) and **Agent-Reach** (57,973 stars) both held the top five for all seven days, signaling sustained builder demand rather than viral spikes; when a repo appears every day of the week, that's adoption pressure, not hype.

## Skill Tastemakers

The Skills lane's top four are a mirror of OSS — Ponytail, OpenMontage, codebase-memory-mcp, Agent-Reach in near-identical star counts — but the fifth slot diverges meaningfully: **Hermes Agent** (39,455 stars, 7/7 days from Nous Research) made the Skills podium and not the OSS one. A self-improving agent that persists skill graphs across sessions and user-models across conversations is a different category of artifact than a tool or plugin — it's infrastructure for agent continuity, and the Skills audience recognized that first. **nextlevelbuilder/ui-ux-pro-max-skill** appearing twice across both lanes is worth a flag: UI/UX as a packaged agent skill is a quiet but growing sub-genre, and it's starting to develop repeat-visitor behavior.

## Cross-Lane Themes

Eighteen of the week's repos appeared in both the OSS and Skills editions — an unusually high overlap that reflects how blurry the line between "open source tool" and "agent skill" has become when the artifact is an MCP server or a structured prompt framework. The clearest theme cutting across both lanes is **memory and context compression**: codebase-memory-mcp attacks token waste at the code-graph level, Ponytail attacks it at the generation level, and Hermes Agent attacks it at the session-continuity level — three different attack surfaces, same underlying problem. **Agent-Reach** sits in a separate but adjacent theme: once you've solved what the agent *knows*, you need to solve what it can *see*, and frictionless access to social and public data without paid API dependencies is the next unsexy-but-critical layer builders are reaching for.

## Builder Takeaway

If you're shipping an agent or coding-assistant workflow this month, the week's data gives you a clear priority order: first, give your agent structural memory of the codebase (codebase-memory-mcp); second, constrain it from over-generating (Ponytail's philosophy is forkable even if you don't use the plugin); third, extend its reach to live external data (Agent-Reach). The Hermes Agent result is the longer signal to watch — self-improving, session-persistent agents running on commodity infrastructure suggest the next competitive moat isn't the model, it's the skill graph the agent has accumulated. Build the plumbing now before that gap closes.

