# Skill Tastemakers — Daily Brief — 2026-06-07

_Ranking: bootstrap_total_stars · 10 repos · generated 2026-06-07T16:38:41.625Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_total_stars`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. jarrodwatts/claude-hud

https://github.com/jarrodwatts/claude-hud · ★ 24637 (★ 24637 total) · anthropic, claude, claude-code, cli, plugin, statusline, typescript

**What it does:** Claude HUD is a Claude Code plugin that renders a persistent statusline in your terminal showing real-time context window usage, active tool calls, running subagents, and todo progress — pulling native token data directly from Claude Code's stdin/transcript stream.

**Why now:** With Claude Code becoming a primary coding interface for many developers, session visibility has been a genuine gap — you're burning context budget or spawning agents with no feedback until something breaks.

**Build with it:** Fork the statusline renderer to pipe Claude Code session telemetry into external dashboards, build team-wide context monitoring for shared Claude Code environments, or extend the transcript parser to trigger custom alerts when specific tools fire or context crosses a threshold.

## 2. VoltAgent/awesome-agent-skills

https://github.com/VoltAgent/awesome-agent-skills · ★ 24518 (★ 24518 total) · agent-skills, ai-agents, antigravity-skills, awesome, awesome-list, awesome-lists, claude-code, claude-code-skills, claude-skills, codex-skills, cursor-skills, gemini-skills, opencode-skills, skills

**What it does:** Awesome Agent Skills is a curated, community-maintained collection of 1,400+ real-world agent skill files (CLAUDE.md, .cursorrules, Gemini CLI configs, etc.) sourced from official engineering teams at Anthropic, Google, Stripe, Vercel, Cloudflare, and dozens more.

**Why now:** With Claude Code, Gemini CLI, and Codex all shipping production-ready agentic workflows this month, teams are actively hunting for battle-tested skill configs rather than writing prompts from scratch—this repo is the clearest single source for that.

**Build with it:** Drop a Stripe or Supabase official skill file into your Claude Code project to instantly give your agent domain-specific context, or fork the repo to publish your own team's skills and tap into 24,000+ developers already using the collection.

## 3. gastownhall/beads

https://github.com/gastownhall/beads · ★ 24393 (★ 24393 total) · agents, claude-code, coding

**What it does:** Beads (`bd`) is a CLI tool that gives coding agents a persistent, version-controlled issue graph backed by Dolt, replacing throwaway markdown plans with dependency-aware task tracking that survives across sessions and branches.

**Why now:** With Claude Code, Codex, and multi-agent workflows becoming standard practice, agents losing context mid-task is an active pain point—Beads ships first-class integrations for both this week.

**Build with it:** Wire `bd init` and `bd setup claude` into your project, then let your agent use `bd ready` and `bd update --claim` to autonomously pull, work, and close tasks across parallel branches without collision.

## 4. cheahjs/free-llm-api-resources

https://github.com/cheahjs/free-llm-api-resources · ★ 23065 (★ 23065 total) · ai, claude, gemini, llama, llm, openai

**What it does:** This repo catalogs free and trial-credit LLM APIs—OpenRouter, Google AI Studio, Groq, Cerebras, and a dozen others—with current rate limits, model lists, and direct API links, maintained via a Python script that pulls live model availability.

**Why now:** Several high-capability models just appeared in the free tier this week, including OpenAI's GPT-OSS 120B and 20B, Kimi K2.6, and DeepSeek V4 Flash on OpenRouter—all accessible at zero cost within the listed quotas.

**Build with it:** Use this as a sourcing layer to build a model-routing fallback system: chain free endpoints by rate limit and capability so your app automatically shifts traffic when one provider's daily quota runs out.

## 5. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 23058 (★ 23058 total) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) the ability to read and search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more—without paying for any platform APIs, using a combination of open-source scrapers, cookie-based auth, and Jina Reader.

**Why now:** With 23K stars and active maintenance, it's gaining traction as developers hit the wall of AI agents that can reason but can't fetch—and this week's momentum reflects growing demand for zero-cost agent internet access tooling that actually works across Chinese and Western platforms simultaneously.

**Build with it:** Wire Agent Reach into a Claude Code or Cursor workflow to build a competitive intelligence agent that monitors Twitter sentiment, Reddit bug reports, and XiaoHongShu product reviews for any given brand—all from one CLI with no API keys required.

## 6. OthmanAdi/planning-with-files

https://github.com/OthmanAdi/planning-with-files · ★ 22839 (★ 22839 total) · adal, agent-skills, antigravity, claude, claude-code, claude-skills, copilot, copilot-skills, hermes, hermes-agent, hermes-skill, kilocode, manus, mastra, openclaw, openclaw-skills, pi, pi-agent, planning

**What it does:** Planning-with-files gives Claude Code a persistent markdown planning workflow where the agent writes, updates, and tracks a structured plan file across an entire task session, mimicking the approach used by the Manus AI agent.

**Why now:** Meta's reported $2B acquisition of Manus put its agentic workflow patterns in the spotlight this week, and this repo distills that core planning behavior into an installable Claude Code skill anyone can drop in today.

**Build with it:** Add this skill to any Claude Code setup to give your agent reliable multi-step task execution with a written plan it actually follows — useful as a foundation for coding agents, research pipelines, or autonomous task runners that need to stay on track across long sessions.

## 7. coleam00/Archon

https://github.com/coleam00/Archon · ★ 22228 (★ 22228 total) · ai, automation, bun, claude, cli, coding-assistant, developer-tools, typescript, workflow-engine, yaml

**What it does:** Archon is an open-source workflow engine that lets you define AI coding processes—planning, implementation, testing, review, PR creation—as YAML files, making AI-assisted development deterministic and repeatable rather than unpredictable.

**Why now:** AI coding agents are everywhere but remain unreliable in practice; Archon addresses the core frustration that the same prompt produces different results each time, by separating workflow structure (owned by you) from AI inference (filling in each step).

**Build with it:** Wire up a custom `.archon/workflows/` pipeline for your team's exact branching and review standards—mix bash validation gates with AI nodes, add a Slack or Telegram trigger, and ship a "fire and forget" agent that opens reviewed PRs without babysitting each step.

## 8. promptfoo/promptfoo

https://github.com/promptfoo/promptfoo · ★ 21980 (★ 21980 total) · ci, ci-cd, cicd, evaluation, evaluation-framework, llm, llm-eval, llm-evaluation, llm-evaluation-framework, llmops, pentesting, prompt-engineering, prompt-testing, prompts, rag, red-teaming, testing, vulnerability-scanners

**What it does:** Promptfoo is an open-source CLI and library for evaluating LLM prompts, comparing model outputs across providers like GPT, Claude, and Gemini, and running automated red-teaming/vulnerability scans against AI applications.

**Why now:** Promptfoo just announced it is joining OpenAI, signaling it will become a more central part of the AI development toolchain and making it worth integrating before that transition reshapes its roadmap.

**Build with it:** Drop it into your CI/CD pipeline to automatically catch prompt regressions, safety failures, or jailbreak vulnerabilities before they ship—write declarative YAML test configs, run `promptfoo eval`, and get a scored comparison matrix across every model and prompt variant you care about.

## 9. rohitg00/agentmemory

https://github.com/rohitg00/agentmemory · ★ 21696 (★ 21696 total) · agentmemory, agents, ai, claude, claudecode, codex, copilot, cursor, genai, harness, hermes, memory, openclaw

**What it does:** agentmemory is an MCP-compatible persistent memory layer for AI coding agents (Claude Code, Cursor, Copilot CLI, Codex, etc.) that stores context across sessions using hybrid search, confidence scoring, and knowledge graphs so agents stop asking you to re-explain your codebase.

**Why now:** With 21,696 stars and active traction across every major AI coding agent platform simultaneously, it sits at the intersection of the current wave of agentic coding tools that all share the same statelessness problem.

**Build with it:** Drop it into any MCP client to give your agent a persistent project brain—or fork it to build a team-shared memory server where multiple agents and developers pool context about architecture decisions, code conventions, and debugging history across sessions.

## 10. slopus/happy

https://github.com/slopus/happy · ★ 21681 (★ 21681 total) · claude-code, claude-desktop, claude-mobile, codex, codex-cli, hacktoberfest

**What it does:** Happy is an open-source TypeScript CLI and mobile/web client that wraps Claude Code and Codex so you can monitor, control, and interact with your AI coding agents from your phone or browser, with end-to-end encryption and push notifications when the agent needs input.

**Why now:** With Codex CLI and Claude Code both gaining rapid adoption as terminal-based coding agents, the missing piece has been mobile visibility—this project directly bridges that gap and hit 21k stars, signaling strong developer demand right now.

**Build with it:** Drop `happy claude` into your existing Claude Code workflow and immediately get phone notifications when your agent hits a permission wall or error, or use the Happy Agent package to programmatically create and monitor sessions as part of a larger automated coding pipeline.
