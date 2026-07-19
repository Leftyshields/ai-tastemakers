# Tastemakers Weekly — 2026-W29

_2026-07-13 – 2026-07-19 · generated 2026-07-19T14:37:40.469Z_

## Week at a glance

- **AI Tastemakers:** 26 unique repos · +97,030 stars gained (max 7d delta per repo) · top topics: claude-code, claude, llm, ai-agents, codex
- **Skill Tastemakers:** 22 unique repos · +103,912 stars gained (max 7d delta per repo) · top topics: claude-code, codex, claude, ai-agents, ai
- **Both lenses:** 15 repo(s) appeared in OSS and Skills digests (DeusData/codebase-memory-mcp, DietrichGebert/ponytail, JuliusBrussee/caveman, Leonxlnx/taste-skill, NousResearch/hermes-agent, Panniantong/Agent-Reach, affaan-m/ECC, asgeirtj/system_prompts_leaks, calesthio/OpenMontage, coreyhaines31/marketingskills, diegosouzapw/OmniRoute, farion1231/cc-switch, mvanhorn/last30days-skill, nextlevelbuilder/ui-ux-pro-max-skill, router-for-me/CLIProxyAPI)
- **Ranking modes this week:** delta_7d
- **Sustained OSS momentum:** diegosouzapw/OmniRoute (7d), DietrichGebert/ponytail (7d), firecrawl/firecrawl (7d), HKUDS/Vibe-Trading (6d), NousResearch/hermes-agent (6d), Panniantong/Agent-Reach (5d), asgeirtj/system_prompts_leaks (4d), router-for-me/CLIProxyAPI (4d), Leonxlnx/taste-skill (3d), nextlevelbuilder/ui-ux-pro-max-skill (3d), bojieli/ai-agent-book (2d), calesthio/OpenMontage (2d)
- **Sustained Skills momentum:** DietrichGebert/ponytail (7d), Graphify-Labs/graphify (7d), iOfficeAI/OfficeCLI (7d), stablyai/orca (7d), diegosouzapw/OmniRoute (6d), addyosmani/agent-skills (4d), asgeirtj/system_prompts_leaks (4d), NousResearch/hermes-agent (4d), router-for-me/CLIProxyAPI (4d), Leonxlnx/taste-skill (3d), nextlevelbuilder/ui-ux-pro-max-skill (3d), Panniantong/Agent-Reach (3d), calesthio/OpenMontage (2d)

## Opening

Week 29 was a volume week with teeth. The OSS lane pulled 97K stars across 26 repos while the Skills lane outpaced it with nearly 104K across 22 — meaning skills-per-repo productivity is running hot and the space is consolidating around fewer, denser projects. Fourteen topics appeared in both lane rankings simultaneously, which hasn't happened at this density before. The through-line: builders are less interested in new models and more interested in making agents cheaper, faster, and harder to break.

## AI Tastemakers

**Ponytail** (44.8K stars, all 7 days) was the week's loudest signal — a JavaScript plugin that does one thing, tells your coding agent to stop over-building, and apparently that's worth nearly half the lane's total star count on its own. Right behind it, **Vibe-Trading** (31.2K, 6 days) showed that vertical-specific agent frameworks are still a reliable star magnet, especially when they ship backtesting sandboxes and brokerage integrations out of the box rather than leaving integration as an exercise for the reader. **OmniRoute** (30.5K, 7 days) and **Firecrawl** (30.2K, 7 days) both held the top of the chart every single day — OmniRoute's 95% token compression claim via RTK+Caveman is the kind of number that earns sustained attention, not a spike. **Hermes Agent** from Nous Research (25.4K, 6 days) is the one to watch for architecture reasons: persistent skill creation across sessions is a different bet than stateless tool-calling, and the community is clearly taking it seriously.

## Skill Tastemakers

**Graphify** led the lane with 56.5K stars across all 7 days, and it deserves the number — the decision to label every graph edge as either deterministically extracted or LLM-inferred is exactly the kind of epistemic honesty that makes a tool usable in production rather than a demo. **OfficeCLI** (44.7K, 7 days) is filling a gap that's obvious in retrospect: agents that need to work with Office documents currently have no clean path, and a single binary with built-in HTML/PNG rendering so the agent can verify its own output is a serious design choice. **Orca** (41.8K, 7 days) is betting on parallel isolated worktrees as the default development model, and with Claude Code, Codex, and OpenCode all supported, it's not a narrow bet. **Addy Osmani's agent-skills** (28.4K in just 4 days) is the week's best efficiency story — 24 slash commands packaged as workflow instructions, and it climbed faster per day than anything else in the lane.

## Cross-Lane Themes

Fifteen repos appeared in both lanes this week, and the pattern is not accidental — **Ponytail**, **OmniRoute**, **Hermes Agent**, and **asgeirtj/system_prompts_leaks** all drew sustained attention from both OSS builders and skills practitioners, which means they're being used in two different ways simultaneously: as infrastructure and as reference material. The dominant topic cluster — `claude-code`, `codex`, `claude`, `ai-agents` — was identical across both lanes, confirming that the agent coding runtime wars (Claude Code vs. Codex vs. Cursor) are now the organizing gravity of the entire open-source AI ecosystem, not just one corner of it. The practical upshot for builders: anything that makes those runtimes cheaper to run (**OmniRoute**, **CLIProxyAPI**) or easier to govern (**Ponytail**, **agent-skills**) is getting traction in both lanes at once, which is where the compounding interest lives.

## Builder Takeaway

The week's meta-lesson is that constraint tooling is outperforming capability tooling. Ponytail tells your agent to do less. Graphify labels what it doesn't know. Agent-skills enforces code review discipline. These aren't features — they're guardrails, and the market is starring them at rates that should recalibrate what you build next. If you're shipping something new, ask whether it makes agents more controllable before asking whether it makes them more powerful.

