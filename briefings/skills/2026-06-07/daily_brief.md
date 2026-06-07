# Skill Tastemakers — Daily Brief — 2026-06-07

_Ranking: bootstrap_total_stars · 10 repos · generated 2026-06-07T14:23:55.944Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_total_stars`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. jarrodwatts/claude-hud

https://github.com/jarrodwatts/claude-hud · ★ 24633 (★ 24633 total) · anthropic, claude, claude-code, cli, plugin, statusline, typescript

Claude HUD is a Claude Code plugin that renders a persistent status bar showing real-time context window usage, active tool calls, running subagents, and todo progress directly in your terminal via Claude Code's native statusline API. It's particularly relevant right now as Claude Code sessions grow more complex with multi-agent workflows and 1M-token context windows, making it genuinely hard to know when you're about to hit limits or what's actually running. A builder could fork it to add custom metrics — like cost tracking per session, per-agent token attribution, or alerts that trigger shell commands when context crosses a threshold.

## 2. VoltAgent/awesome-agent-skills

https://github.com/VoltAgent/awesome-agent-skills · ★ 24504 (★ 24504 total) · agent-skills, ai-agents, antigravity-skills, awesome, awesome-list, awesome-lists, claude-code, claude-code-skills, claude-skills, codex-skills, cursor-skills, gemini-skills, opencode-skills, skills

This repository aggregates 1,400+ hand-curated "agent skills" — reusable instruction files (like CLAUDE.md or similar configs) that prime AI coding agents such as Claude Code, Gemini CLI, and Cursor with domain-specific knowledge from real engineering teams at Anthropic, Stripe, Vercel, Cloudflare, and dozens more. It's particularly relevant right now because agent-native development is exploding and teams are converging on skill/context files as the primary way to encode institutional knowledge into AI workflows, making a high-quality, cross-compatible collection genuinely scarce and valuable. A builder could mine these skills to instantly bootstrap production-grade AI agent behaviors for their stack — for example, dropping in Stripe's official payment skill, Sentry's error-monitoring skill, and Supabase's database skill to give an agent deep, accurate context across their entire backend without writing custom prompts from scratch.

## 3. gastownhall/beads

https://github.com/gastownhall/beads · ★ 24394 (★ 24394 total) · agents, claude-code, coding

Beads is a distributed, graph-based issue tracker built for AI coding agents, using Dolt (a version-controlled SQL database) to give agents persistent, structured task memory across long-horizon sessions instead of throwaway markdown files. It's timely because autonomous coding agents like Claude Code and Codex are hitting real walls with context loss and coordination in multi-agent workflows, and Beads directly addresses that with atomic task claiming, dependency graphs, and conflict-free hash IDs. A builder could wire it into a multi-agent pipeline where several Claude or Codex instances work a shared backlog in parallel—each claiming tasks without collisions, tracking blockers, and accumulating project memory that survives context resets.

## 4. cheahjs/free-llm-api-resources

https://github.com/cheahjs/free-llm-api-resources · ★ 23058 (★ 23058 total) · ai, claude, gemini, llama, llm, openai

This project maintains a curated, auto-updated list of LLM APIs that are genuinely free or offer trial credits, covering providers like Google AI Studio, Groq, OpenRouter, Cerebras, and over a dozen others with their current rate limits and available models. It's particularly relevant right now because the landscape of free inference endpoints is shifting rapidly — new models like DeepSeek, Qwen3, and Gemini keep appearing while limits change weekly, making a single tracked source genuinely useful. A builder could use this as a routing reference to stack multiple free tiers together, cycling across providers to stay under rate limits and effectively run a zero-cost LLM-powered prototype before committing to paid API spend.

## 5. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 22986 (★ 22986 total) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

Agent Reach is a Python CLI that gives AI agents free, authenticated access to Twitter, Reddit, YouTube, Bilibili, XiaoHongShu, GitHub, and a dozen other platforms — scraping past API paywalls and login walls using cookies and open-source tools like yt-dlp and Jina Reader. It's timely because the race to build autonomous agents has hit a hard wall: LLMs can reason but can't see the live web without expensive API keys or brittle scraping setups, and this project collapses that friction into a single install command. A builder could use it to wire a Claude Code or Cursor agent into real-time social sentiment pipelines, competitive research workflows, or content monitoring bots across Chinese and Western platforms simultaneously — with zero recurring API costs.

## 6. OthmanAdi/planning-with-files

https://github.com/OthmanAdi/planning-with-files · ★ 22829 (★ 22829 total) · adal, agent-skills, antigravity, claude, claude-code, claude-skills, copilot, copilot-skills, hermes, hermes-agent, hermes-skill, kilocode, manus, mastra, openclaw, openclaw-skills, pi, pi-agent, planning

Planning-with-files is a Claude Code skill that implements persistent markdown-based task planning, where an AI agent writes and continuously updates a structured plan file instead of losing context between steps — directly mimicking the workflow pattern Manus used before its reported $2B acquisition. It's particularly relevant right now because developers are actively reverse-engineering what made Manus effective, and this distills that into a drop-in skill with documented evals and a growing ecosystem of forks. A builder could use it as a foundation for any long-horizon agentic workflow — coding assistants, research pipelines, or multi-step automation — where maintaining coherent state across many tool calls is the core unsolved problem.

## 7. coleam00/Archon

https://github.com/coleam00/Archon · ★ 22228 (★ 22228 total) · ai, automation, bun, claude, cli, coding-assistant, developer-tools, typescript, workflow-engine, yaml

Archon is an open-source workflow engine that lets you define AI coding processes as YAML files — planning, implementation, testing, review, PR creation — so they run the same way every time instead of depending on an AI's unpredictable choices. It's timely because teams are moving from one-shot AI prompts to structured agentic pipelines, and the tooling for making those pipelines reliable and repeatable is still wide open. A builder could use it to ship a SaaS product where non-technical users define and share reusable AI coding workflows, or build integrations that trigger Archon runs from Slack, GitHub webhooks, or CI/CD systems.

## 8. promptfoo/promptfoo

https://github.com/promptfoo/promptfoo · ★ 21972 (★ 21972 total) · ci, ci-cd, cicd, evaluation, evaluation-framework, llm, llm-eval, llm-evaluation, llm-evaluation-framework, llmops, pentesting, prompt-engineering, prompt-testing, prompts, rag, red-teaming, testing, vulnerability-scanners

Promptfoo is an open-source CLI and library that lets developers systematically test LLM prompts, compare model outputs across providers like GPT and Claude, and run automated red-teaming scans to find security vulnerabilities in AI applications. It's particularly relevant right now because shipping AI features without structured evaluation is a major source of production failures and security risks, and promptfoo just joined OpenAI while remaining MIT-licensed, signaling serious institutional backing. A builder could wire it into their CI/CD pipeline to automatically catch prompt regressions, benchmark a model swap from GPT-4 to DeepSeek on real test cases, or generate a vulnerability report on a RAG chatbot before it ships.

## 9. slopus/happy

https://github.com/slopus/happy · ★ 21673 (★ 21673 total) · claude-code, claude-desktop, claude-mobile, codex, codex-cli, hacktoberfest

Happy is an open-source mobile and web client that wraps Claude Code and OpenAI Codex CLI sessions, letting you monitor, control, and receive push notifications from your AI coding agents entirely from your phone via end-to-end encrypted relay. It's timely because agentic coding workflows are increasingly running long, unsupervised tasks where the bottleneck is human availability rather than model capability—this directly solves the "step away from your desk" problem. A builder could fork the server component to self-host the relay, extend the agent CLI to pipe in custom tool outputs, or use the Expo app as a template for building mobile dashboards over other long-running CLI-based AI agents.

## 10. rohitg00/agentmemory

https://github.com/rohitg00/agentmemory · ★ 21669 (★ 21669 total) · agentmemory, agents, ai, claude, claudecode, codex, copilot, cursor, genai, harness, hermes, memory, openclaw

AgentMemory is an MCP (Model Context Protocol) server that gives AI coding agents like Claude Code, Cursor, and Copilot persistent, searchable memory across sessions using hybrid vector and knowledge-graph search. It's interesting now because context amnesia is one of the sharpest practical pain points in agentic workflows, and the project benchmarks 95%+ retrieval recall while cutting token usage by 92%. A builder could wire it into any MCP-compatible agent to retain project conventions, past decisions, and debugging history—eliminating the constant re-explanation tax on every new session.
