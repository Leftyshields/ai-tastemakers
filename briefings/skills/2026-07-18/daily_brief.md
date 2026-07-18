# Skill Tastemakers — Daily Brief — 2026-07-18

_Ranking: delta_7d · 10 repos · generated 2026-07-18T14:33:14.467Z_


## 1. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 90677 (+8933 this week) · antigravity, claude-code, codex, gemini, graphrag, knowledge-graph, leiden, openclaw, rag, skills, tree-sitter

**What it does:** Graphify is a Python tool that parses any codebase, SQL schemas, docs, PDFs, or media into a queryable knowledge graph via a `/graphify` slash command in AI coding assistants like Claude Code, Cursor, or Gemini CLI, using tree-sitter AST for deterministic, local code parsing with no LLM required for code edges.

**Why now:** The project gained nearly 9,000 stars this week, signaling strong builder interest as GraphRAG and agentic coding workflows converge—teams are actively looking for structured, queryable context layers that go beyond naive file-chunking RAG.

**Build with it:** Drop it into a monorepo where app code, database schemas, and infrastructure live together, then query cross-cutting relationships—like "which API endpoints touch this table" or "what services depend on this shared module"—without grepping or manually tracing imports.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 21569 (+5778 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source Agent Development Environment (ADE) that lets you run multiple coding agents (Codex, Claude Code, OpenCode, or Pi) in parallel, each isolated in its own git worktree, with a unified desktop/mobile interface and Ghostty-class terminal splits for monitoring and steering them.

**Why now:** The project jumped nearly 6,000 stars this week, signaling a sharp spike in developer interest around orchestrating fleets of AI coding agents rather than running a single one sequentially.

**Build with it:** Fan a single feature prompt across five parallel agents, compare their implementations in isolated worktrees, merge the winner, and monitor progress from your phone — cutting iteration cycles that typically bottleneck multi-agent workflows.

## 3. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 85442 (+5540 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code plugin/agent skill that injects a "laziest senior dev" heuristic into AI coding agents, pushing them to reach for the simplest possible solution first—like replacing a custom date picker with `<input type="date">`—cutting generated LOC by ~54% on average across real feature tasks.

**Why now:** It hit 85K+ stars with 5,540 added this week, riding the wave of Claude Code's rapid adoption and growing frustration with AI agents that over-engineer simple requests into dependency-heavy messes.

**Build with it:** Drop the skill into your Claude Code or Cursor setup to enforce YAGNI at the agent level—particularly useful when prototyping MVPs, auditing bloated AI-generated diffs, or building internal tools where you want the agent to prefer native browser/platform primitives over third-party libraries.

## 4. Egonex-AI/Understand-Anything

https://github.com/Egonex-AI/Understand-Anything · ★ 75007 (+2490 this week) · antigravity-skills, business-knowledge, claude-code, claude-skills, codebase-analysis, codex, codex-skills, developer-tools-ai-agent, gemini-cli-skills, karpathy-llm-wiki, knowledge-base, knowledge-graph, memory, opencode-skills, pi-agent, understandcode, vibe-coding

**What it does:** Understand Anything converts any codebase or knowledge base into an interactive knowledge graph—mapping files, functions, classes, and dependencies—then lets you explore, search, and query the structure through a visual dashboard that works with Claude Code, Codex, Gemini CLI, and other AI coding tools.

**Why now:** The project surged to 75,000+ stars this week (+2,490), signaling that developers are actively solving the "dropped into a massive unfamiliar codebase" problem as AI-assisted coding workflows become standard on engineering teams.

**Build with it:** Wire this into your onboarding pipeline so new engineers can query "what calls this function" or "what depends on this module" in plain language, or use the knowledge graph as structured context to feed more precise, repo-aware prompts into your AI coding agent.

## 5. iOfficeAI/OfficeCLI

https://github.com/iOfficeAI/OfficeCLI · ★ 19138 (+4929 this week) · agent, ai, claude-code, cli, codex, docx, excel, office, openclaw, pptx, presentation, skills, word, xlsx

**What it does:** OfficeCLI is a single binary that gives AI agents a complete read/write/render API for Word, Excel, and PowerPoint files — no Office installation required, with a built-in HTML/PNG rendering engine so agents can visually verify what they've produced.

**Why now:** It hit 19,138 stars with nearly 5,000 added this week, signaling rapid adoption at exactly the moment coding agents like Claude Code and Codex are becoming standard dev tools that need structured file I/O beyond plain text.

**Build with it:** Drop it into an agent workflow to automate client-ready deliverables — for example, a sales agent that pulls CRM data and generates a formatted Excel pipeline report and a PowerPoint deck in a single tool call, no human formatting step required.

## 6. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 216698 (+4075 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is an open-source, self-improving AI agent from Nous Research that runs on any model and any infrastructure, featuring a closed learning loop that creates and refines skills from experience, persistent cross-session memory, and multi-platform delivery via Telegram, Discord, Slack, and CLI.

**Why now:** The repo just crossed 216K stars with 4,075 added this week, signaling a breakout moment of developer adoption, and its compatibility with the open agentskills.io standard means skills built now will transfer across the emerging ecosystem.

**Build with it:** Wire Hermes to your own model endpoint via Nous Portal or OpenRouter, then use its subagent delegation and cron scheduler to ship an autonomous background worker — one that learns your codebase, runs nightly audits, and reports findings to Telegram while your cloud VM sleeps between tasks.

## 7. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 18577 (+3766 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, gemini-cli, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that exposes a single OpenAI-compatible endpoint routing requests across 264 AI providers, with 90+ free tiers, automatic fallback, and built-in token compression (RTK + Caveman) that cuts prompt size by up to 95%.

**Why now:** The repo gained 3,766 stars this week, signaling rapid community adoption, and the aggregated ~1.6B free tokens/month makes it a practical escape hatch as developers hit rate limits on individual provider free tiers.

**Build with it:** Point Claude Code, Cursor, Cline, or any OpenAI-SDK-compatible tool at `localhost` and get seamless failover across free Gemini, GPT, and Claude endpoints — useful for building cost-zero AI coding assistants, multi-model evaluation harnesses, or token-efficient agentic pipelines without rewriting client code.

## 8. router-for-me/CLIProxyAPI

https://github.com/router-for-me/CLIProxyAPI · ★ 43309 (+3538 this week) · antigravity, claude-code, cluade, codex, gemini, openai

**What it does:** CLIProxyAPI is a Go-based proxy server that wraps CLI AI tools (Claude Code, Codex, Antigravity/Gemini, Grok) and exposes them as standard OpenAI-, Gemini-, or Claude-compatible API endpoints, letting you route requests through multiple accounts.

**Why now:** The project gained 3,538 stars this week, likely driven by the newly listed models—GPT-5.6, Gemini 3.5 Flash, Grok 4.5, and Claude Fable 5—giving builders API access to frontier models through CLI subscriptions rather than paying direct API pricing.

**Build with it:** Point any OpenAI-compatible SDK or tool at your local CLIProxyAPI instance to load-balance across multiple CLI accounts, swap underlying models without changing client code, or run cost-controlled agentic pipelines using subscription-tier access instead of metered API calls.

## 9. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 107247 (+3362 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** UI UX Pro Max is a structured AI skill — a set of reasoning rules and style definitions — that you inject into AI coding tools (Claude, Cursor, Copilot, etc.) to make them produce genuinely polished, design-system-aware UI instead of generic scaffolding.

**Why now:** AI coding tools are everywhere but their default UI output is consistently mediocre; this week's spike in stars suggests builders are hitting that ceiling and looking for a systematic fix rather than prompt-by-prompt tweaking.

**Build with it:** Drop the skill into your agent workflow and generate a complete, opinionated design system for a specific product — spa booking site, SaaS dashboard, mobile app — with layout patterns, component hierarchy, and style tokens already reasoned out, so your AI writes production-quality markup from the first file.

## 10. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 57663 (+3325 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents free, zero-API-key access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more, routing around platform restrictions via a multi-backend fallback system with a built-in `doctor` command for diagnostics.

**Why now:** The project hit GitHub's #1 trending repository this week with 57,663 stars and 3,325 added in seven days, partly driven by a live example of its resilience—when yt-dlp was blocked by Bilibili's risk controls, Agent Reach silently switched to bili-cli with zero user action required.

**Build with it:** Drop `agent-reach` into any Claude Code, Cursor, or Windsurf workflow to give your agent real-time web research capabilities—scrape competitor Twitter threads, summarize YouTube tutorials, or pull Reddit bug reports—without writing a single scraper or paying for a single API.
