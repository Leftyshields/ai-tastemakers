# Tastemakers Weekly — 2026-W39

_2026-09-21 – 2026-09-27 · generated 2026-09-27T17:47:12.485Z_

Three reads of the same week, in order: **strategy**, then **the stack**, then **the counts**.

## For executives

The dominant pattern this week is infrastructure hardening around AI coding agents — tools that manage, constrain, or orchestrate agents like Claude Code and Codex are attracting outsized attention. ECC (an optimization and security layer for coding agents) and Ponytail (a plugin that pushes agents toward minimal, dependency-light solutions) both sustained multi-day momentum, signaling that teams are less focused on raw agent capability and more focused on making agents predictable and cost-controlled in production. Stablyai's Orca, a desktop environment that runs multiple coding agents in parallel and lets you pick the best output, points toward a near-term workflow where developers routinely compare agent outputs rather than trusting a single one. Tencent's WeKnora, a self-hostable knowledge platform with continuous wiki-building, is a credible enterprise alternative to commercial RAG products worth watching for internal knowledge-management procurement decisions. The quarter's bet: teams that invest now in agent governance tooling — guardrails, skill layers, provider-switching — will have a meaningful productivity edge over those still evaluating raw models.

## For AI generalists

The builder story this week was less about new models and more about what sits around them. The most persistent projects across the week were skill and configuration layers — CLAUDE.md files, npm packages, shell scripts — that reshape how coding agents behave without touching the model itself. Ponytail enforces YAGNI discipline (no new libraries if a built-in exists); ECC adds memory, security, and research-first workflows; Claude Code Game Studios goes further, installing 49 subagents, 74 slash commands, and 12 automated hooks to impose the structure of a real game studio on a single agent session. The underlying pattern: the model is becoming a commodity runtime, and the differentiation is happening in the prompt-and-hook layer above it.

On the infrastructure side, two projects stand out. Orca (from stablyai) is an Agent Development Environment that fans a single prompt to Codex, Claude Code, OpenCode, or Pi simultaneously in isolated git worktrees, then lets you merge the best result — a practical answer to "which agent is best for this task?" RocketRide is a C++ pipeline engine with 100+ nodes, support for 15+ LLM providers and 9 vector databases, and a VS Code visual editor, positioning itself as a self-hosted alternative to managed orchestration services. CC Switch rounds out the picture as a Tauri desktop app for centrally managing API keys and provider switching across nine coding tools — unglamorous but clearly filling a real gap.

## The numbers

Star counts here reflect seven-day delta totals, so a repo that appeared every day of the week (like Orca at 7/7 days in the skills edition) will naturally accumulate larger numbers than a project that broke through late in the cycle. The skills and OSS editions track overlapping but distinct populations, which is why the same repo (ECC, Ponytail) can show different star totals between sections — treat the cross-edition overlap list as the week's most durable signal, not the individual counts. All ranking in this edition uses the `delta_7d` mode, meaning recency and consistency of appearance matter more than all-time standing.

- **AI Tastemakers:** 45 unique repos · +112,926 stars gained (max 7d delta per repo) · top topics: claude-code, llm, mcp, ai-agents, ai
- **Skill Tastemakers:** 41 unique repos · +67,185 stars gained (max 7d delta per repo) · top topics: claude-code, ai-agents, claude, codex, mcp
- **Both lists:** 16 repo(s) appeared in OSS and Skills (Asymptote-Labs/agent-beacon, DietrichGebert/ponytail, Donchitos/Claude-Code-Game-Studios, Graphify-Labs/graphify, Imbad0202/academic-research-skills, K-Dense-AI/scientific-agent-skills, Leonxlnx/taste-skill, NousResearch/hermes-agent, Observal/Observal, Panniantong/Agent-Reach, addyosmani/agent-skills, affaan-m/ECC, davila7/claude-code-templates, farion1231/cc-switch, irinabuht12-oss/marketing-skills, pacifio/atlas)
- **How we ranked this week:** delta_7d
- **Held the OSS list:** affaan-m/ECC (5d), DietrichGebert/ponytail (5d), hypit-ai/hypit (5d), Tencent/WeKnora (4d), addyosmani/agent-skills (3d), Donchitos/Claude-Code-Game-Studios (3d), rocketride-org/rocketride-server (3d), farion1231/cc-switch (2d), Graphify-Labs/graphify (2d), helloianneo/ian-xiaohei-illustrations (2d), Panniantong/Agent-Reach (2d)
- **Held the Skills list:** affaan-m/ECC (7d), DietrichGebert/ponytail (7d), stablyai/orca (7d), Donchitos/Claude-Code-Game-Studios (5d), farion1231/cc-switch (4d), addyosmani/agent-skills (3d), Graphify-Labs/graphify (2d), Panniantong/Agent-Reach (2d)

Today's ranked lists: [AI Tastemakers](../briefings/2026-09-27.html) · [Skill Tastemakers](../skills/briefings/2026-09-27.html)
