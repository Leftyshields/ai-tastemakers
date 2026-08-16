# Tastemakers Weekly — 2026-W33

_2026-08-10 – 2026-08-16 · generated 2026-08-16T13:46:50.279Z_

Three reads of the same week, in order: **strategy**, then **the stack**, then **the counts**.

## For executives

If you ship agents this quarter, two problems soaked up the attention: **what each run costs**, and **what the agent remembers next time**. Teams are done stitching paid APIs and extra libraries “just in case.” The projects that held the list all week were the ones that cut spend (route cheaper, generate less code, scrape instead of buying an API) or that persist memory without a custom build. `claude-code` and `ai-agents` topping both charts is the tell: the market is standardizing on coding agents, then shopping for cheaper, more durable ones. Watch those two line items — cost per run, and memory between runs — not another chat UI.

## For AI generalists

The open-source list was plumbing. **OmniRoute** is a gateway across hundreds of model providers; the interesting part is a compression layer that can cut token spend sharply, which is a budget line, not a convenience. **TencentDB Agent Memory** is a persistence hub — chat memory, skills, a wiki, a code graph — so multi-agent setups stop improvising state. **Firecrawl** is still here because turning the live web into clean text for models remains a daily pain. **Agent Reach** lets an agent read six platforms by scraping, with no paid API key.

On the skills list, **Orca** is an opinionated bet: an Electron “agent IDE” that runs Claude Code, Codex, and friends in parallel git worktrees. **Ponytail** is a steering rule for coding agents, not a framework — it fights overbuilding (YAGNI: *you aren’t gonna need it*), and the authors report roughly half as much generated code on a real FastAPI + React app. **Hermes Agent** (Nous Research) is a self-improving agent with session memory and real execution backends (SSH, Docker, Modal), which is why it showed up on both lists.

Sixteen repos appeared as both a tool you run and a skill you give an agent. That line is gone. If you are building this week, design for both from the start.

## The numbers

Headline star totals are inflated by a handful of projects that held trending spots all seven days. Unique-repo counts (30 OSS, 24 skills) are the better size-of-week read. Ranking was 7-day star growth.

- **AI Tastemakers:** 30 unique repos · +104,804 stars gained (max 7d delta per repo) · top topics: llm, claude-code, ai-agent, ai-agents, claude
- **Skill Tastemakers:** 24 unique repos · +82,004 stars gained (max 7d delta per repo) · top topics: claude-code, codex, ai-agents, claude, ai
- **Both lists:** 16 repo(s) appeared in OSS and Skills (DietrichGebert/ponytail, Graphify-Labs/graphify, Leonxlnx/taste-skill, NousResearch/hermes-agent, Panniantong/Agent-Reach, affaan-m/ECC, calesthio/OpenMontage, can1357/oh-my-pi, citrolabs/ego-lite, diegosouzapw/OmniRoute, farion1231/cc-switch, guillaumemeyer/watermarks-remover, holaboss-ai/holaOS, lidge-jun/opencodex, nextlevelbuilder/ui-ux-pro-max-skill, titanwings/colleague-skill)
- **How we ranked this week:** delta_7d
- **Held the OSS list:** diegosouzapw/OmniRoute (7d), DietrichGebert/ponytail (7d), firecrawl/firecrawl (7d), Panniantong/Agent-Reach (7d), TencentCloud/TencentDB-Agent-Memory (7d), NousResearch/hermes-agent (5d), bojieli/ai-agent-book (4d), guillaumemeyer/watermarks-remover (3d), farion1231/cc-switch (2d)
- **Held the Skills list:** diegosouzapw/OmniRoute (7d), DietrichGebert/ponytail (7d), NousResearch/hermes-agent (7d), Panniantong/Agent-Reach (7d), stablyai/orca (7d), addyosmani/agent-skills (6d), herdrdev/herdr (6d), Leonxlnx/taste-skill (4d), guillaumemeyer/watermarks-remover (3d), Graphify-Labs/graphify (2d)

Today's ranked lists: [AI Tastemakers](../briefings/2026-08-16.html) · [Skill Tastemakers](../skills/briefings/2026-08-16.html)
