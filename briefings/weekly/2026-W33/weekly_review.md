# Tastemakers Weekly — 2026-W33

_2026-08-10 – 2026-08-16 · generated 2026-08-16T13:46:50.279Z_

## Week at a glance

- **AI Tastemakers:** 30 unique repos · +104,804 stars gained (max 7d delta per repo) · top topics: llm, claude-code, ai-agent, ai-agents, claude
- **Skill Tastemakers:** 24 unique repos · +82,004 stars gained (max 7d delta per repo) · top topics: claude-code, codex, ai-agents, claude, ai
- **Both lenses:** 16 repo(s) appeared in OSS and Skills digests (DietrichGebert/ponytail, Graphify-Labs/graphify, Leonxlnx/taste-skill, NousResearch/hermes-agent, Panniantong/Agent-Reach, affaan-m/ECC, calesthio/OpenMontage, can1357/oh-my-pi, citrolabs/ego-lite, diegosouzapw/OmniRoute, farion1231/cc-switch, guillaumemeyer/watermarks-remover, holaboss-ai/holaOS, lidge-jun/opencodex, nextlevelbuilder/ui-ux-pro-max-skill, titanwings/colleague-skill)
- **Ranking modes this week:** delta_7d
- **Sustained OSS momentum:** diegosouzapw/OmniRoute (7d), DietrichGebert/ponytail (7d), firecrawl/firecrawl (7d), Panniantong/Agent-Reach (7d), TencentCloud/TencentDB-Agent-Memory (7d), NousResearch/hermes-agent (5d), bojieli/ai-agent-book (4d), guillaumemeyer/watermarks-remover (3d), farion1231/cc-switch (2d)
- **Sustained Skills momentum:** diegosouzapw/OmniRoute (7d), DietrichGebert/ponytail (7d), NousResearch/hermes-agent (7d), Panniantong/Agent-Reach (7d), stablyai/orca (7d), addyosmani/agent-skills (6d), herdrdev/herdr (6d), Leonxlnx/taste-skill (4d), guillaumemeyer/watermarks-remover (3d), Graphify-Labs/graphify (2d)

## Opening

Week 33 was a density week: 30 OSS repos and 24 skill repos surfaced across the digest, pulling in **104,804** and **82,004** stars respectively — both figures skewed hard by a small cluster of projects that held trending positions all seven days. The throughline wasn't a single capability but a posture: builders are done duct-taping together paid APIs and over-engineered dependencies, and the repos that resonated most were the ones that stripped cost and complexity out of the stack. `claude-code` and `ai-agents` dominated both topic charts simultaneously, which stopped being a coincidence around Wednesday.

## AI Tastemakers

**OmniRoute** (`diegosouzapw/OmniRoute`) ran the table with 44,581 stars across the full week — the headline number is the 290+ provider gateway, but the real story is the RTK+Caveman compression layer cutting token spend by up to 95%; that's not a convenience feature, that's a budget line item. **TencentDB Agent Memory** came in close behind at 42,049 stars, and it's the most structurally interesting OSS drop of the week: four typed asset classes (Chat Memory, Skills, LLM-Wiki, Code-Graph) that persist and share state across agents and sessions, which is exactly the plumbing most multi-agent setups are still improvising. **Firecrawl** continued its long streak with 35,603 stars — it's not new, but seven consecutive days on the chart signals that clean LLM-ready web data remains an unsolved daily frustration for builders. **Agent Reach** rounded out the top five at 30,345, giving agents scraper-based reads on six platforms without a single paid API key.

## Skill Tastemakers

**Orca** from stablyai led the skills lane at 42,904 stars and represents the most opinionated bet of the week: an Electron-based Agent Development Environment that runs parallel coding agents — Codex, Claude Code, OpenCode, Pi — each in isolated git worktrees, with a mobile companion for remote monitoring. That's a workflow assumption baked into an IDE, and builders should stress-test it before buying in. **Ponytail** pulled 37,247 stars and is quietly the most transferable skill on the list — a YAGNI-first steering rule for Claude Code that reportedly cut generated LOC by ~54% on a real FastAPI + React codebase; if that number holds across your stack, it's worth the ten minutes to install. **Hermes Agent** from Nous Research (27,283 stars, seven days on skills, five on OSS) is the week's clearest signal that self-improving, session-persistent agents are moving from research demos into tools builders are actually evaluating — the SSH/Docker/Modal execution backends make it production-adjacent in a way most agent frameworks aren't.

## Cross-Lane Themes

Sixteen repos appeared in both the OSS and skills editions this week — that's not noise, that's the category blurring: a scraping CLI is also an agent skill, a memory hub is also infrastructure, a coding heuristic is also a deployable artifact. The overlap cluster — **OmniRoute**, **Ponytail**, **Agent-Reach**, **hermes-agent**, and eleven others — points to a builder audience that has stopped drawing a clean line between "tool I run" and "skill I give my agent." The practical implication: if you're building something this week, designing for both consumption modes from the start is no longer premature optimization.

## Builder Takeaway

The durable pattern in W33 is **cost surface reduction** — compression at the prompt layer (OmniRoute), minimal code generation (Ponytail), scraper-over-API access (Agent Reach) — and it's showing up across both lanes because inference and data costs are still the first thing builders hit at scale. The secondary pattern is **state persistence**: TencentDB Agent Memory and Hermes Agent both landed hard, which suggests the market is actively shopping for memory primitives that don't require building from scratch. If you're shipping an agent this quarter, those two problems — what your agent costs per run and what it remembers between runs — are where the week's momentum is pointing.

