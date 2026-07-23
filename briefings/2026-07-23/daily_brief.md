# AI Tastemakers — Daily Brief — 2026-07-23

_Ranking: delta_7d · 10 repos · generated 2026-07-23T15:23:49.967Z_


## 1. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 18049 (+17041 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source book on AI Agent design and engineering, covering 10 chapters from LLM fundamentals to production systems, with 92 runnable code experiments organized around the formula Agent = LLM + Context + Tools.

**Why now:** The repo gained 17,041 stars this week, signaling a surge in developer interest in structured, first-principles references for building agents as the space matures past demos into real engineering.

**Build with it:** Download the free PDF and run the chapter-paired experiments to implement specific agent capabilities—memory systems, RAG pipelines, multi-agent coordination, MCP integration, and coding agents—with working Python code alongside the theory.

## 2. koala73/worldmonitor

https://github.com/koala73/worldmonitor · ★ 70934 (+9011 this week) · agent, ai, dashboard, geopolitics, mcp, mcp-server, monitoring, news, opensource, osint, palantir, situation

**What it does:** World Monitor is an open-source TypeScript dashboard that aggregates global news, geopolitical events, and infrastructure signals into a unified situational awareness interface, with domain-specific variants for finance, energy, commodities, and tech.

**Why now:** The project spiked to 70,934 stars with 9,011 added this week, and ships an MCP server, making it directly composable with the current wave of agent and Claude-compatible tooling.

**Build with it:** Wire the MCP server into an AI agent to trigger alerts or downstream actions when specific geopolitical or market conditions are detected, or fork one of the themed variants (energy, finance) as a starting point for a specialized monitoring product.

## 3. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 26575 (+8606 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that exposes 278+ AI providers and 500+ models through a single OpenAI-compatible endpoint, with quota-aware auto-fallback, RTK+Caveman token compression (15–95% reduction), and support for MCP/A2A protocols.

**Why now:** The repo gained 8,606 stars this week, signaling rapid community adoption, and its free-tier aggregation (~1.53B tokens/month across 43 provider pools) makes it immediately practical as AI API costs and rate limits tighten across the industry.

**Build with it:** Drop OmniRoute in front of any Claude Code, Cursor, Cline, or Codex workflow to get seamless provider failover and token savings without changing your existing API calls—or use it as the routing backbone for a multi-agent system that needs resilient, cost-efficient LLM access at scale.

## 4. tirth8205/code-review-graph

https://github.com/tirth8205/code-review-graph · ★ 25739 (+6251 this week) · ai-coding, claude, claude-code, code-review, graphrag, incremental, knowledge-graph, llm, mcp, python, static-analysis, tree-sitter

**What it does:** code-review-graph builds a persistent structural map of your codebase using Tree-sitter, then exposes it via MCP so AI coding tools pull only the relevant context instead of re-reading entire repositories on every review.

**Why now:** The project gained 6,251 stars this week, signaling strong developer interest in token-efficient AI workflows at a moment when large-repo context costs are a daily friction point for teams using Claude Code, Cursor, and similar tools.

**Build with it:** Wire it into a CI pipeline as a GitHub Action to gate pull requests with graph-aware AI reviews, or extend the MCP server to expose custom graph queries that surface dependency chains, dead code, or blast-radius estimates for any changed file.

## 5. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 120477 (+2588 this week) · ai-tools, claude-code, codex, desktop-app, grok, grokbuild, hermes, hermes-agent, mcp, open-source, openclaw, openclaw-ui, opencode, provider-management, rust, skills, skills-management, tauri, typescript, wsl-support

**What it does:** CC Switch is a Tauri-built desktop app that centralizes configuration and provider switching for eight AI coding agents—Claude Code, Codex, Gemini CLI, Grok Build, OpenCode, OpenClaw, and Hermes Agent—from a single interface on Windows, macOS, and Linux.

**Why now:** The project gained 2,588 stars this week, signaling that developers are actively frustrated with juggling separate config files and API keys across an increasingly fragmented agentic tooling landscape.

**Build with it:** A builder could fork CC Switch to add MCP server management or custom provider profiles, or use it as a reference architecture for how Tauri + Rust handles multi-tool credential storage and cross-platform desktop distribution.

## 6. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 42763 (+4272 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, from-scratch, generative-ai, llm, machine-learning, mcp, nlp, python, reinforcement-learning, rust, swarm-intelligence, transformers, tutorial, typescript

**What it does:** A 503-lesson, 20-phase open curriculum that teaches AI engineering from raw math (backprop, tokenizers, attention) through production-ready systems (LLM engines, agents, MCP servers) using Python, TypeScript, Rust, and Julia, with every lesson producing a reusable artifact.

**Why now:** The repo gained 4,272 stars this week, signaling a surge of developers looking for structured, ground-up AI education rather than surface-level tutorials—likely accelerated by the current wave of agent and MCP tooling adoption.

**Build with it:** Follow the linear phase structure to go from implementing attention by hand to shipping a working MCP server or autonomous agent, using the curriculum as a spine to fill gaps in your existing AI knowledge without relying on scattered blog posts or paywalled courses.

## 7. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 232455 (+2127 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an operator system for AI coding agents (Claude Code, Codex, Cursor, etc.) that layers skills, memory, security scanning, and instinct-like behavioral patterns on top of existing agent harnesses to make them more consistent and capable across complex engineering workflows.

**Why now:** With 2,127 stars added this week, the project is hitting a growth inflection that signals rapid community adoption—likely driven by the current explosion of Claude Code and agentic coding tool usage where practitioners are actively looking for ways to standardize agent behavior across projects.

**Build with it:** Drop ECC into an existing Claude Code or Cursor setup to give your agent persistent memory, reusable skill definitions, and prompt-injection security scanning out of the box—or extend it to build a custom multi-agent workflow that shares learned instincts across different harnesses on the same codebase.

## 8. ruvnet/RuView

https://github.com/ruvnet/RuView · ★ 84863 (+3995 this week) · awesome, claude, densepose, esp32, firmware, home-assistant, home-automation, iot, monitoring, networking, npm, pose-estimation, react, rf, self-learning, skills, spatial-intelligence, typescript, wifi, wifi-security

**What it does:** RuView uses ESP32 sensors (~$9/node) to extract Channel State Information from existing WiFi signals, converting radio disturbances into real-time presence detection, breathing/heart rate monitoring, fall detection, and room-level activity classification — no cameras, no wearables, no cloud required.

**Why now:** The project gained nearly 4,000 stars this week and ships native integrations for Home Assistant, Apple Home, Google Home, Alexa, and Matter out of the box, making it immediately deployable into the smart home stacks millions of people already run.

**Build with it:** Wire up a mesh of ESP32 nodes, point the MQTT publisher at your Home Assistant instance, and build elder-care monitoring, occupancy-based HVAC automation, or sleep-quality dashboards that work through walls and in total darkness using radio physics instead of surveillance hardware.

## 9. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 88266 (+3769 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces a "laziest senior dev" heuristic—pushing agents to reach for native browser features, stdlib, or a single line before writing any custom code, measurably cutting generated LOC by ~54% on average.

**Why now:** The repo gained 3,769 stars this week, signaling a wave of developers frustrated with AI agents that over-engineer simple requests; the `<input type="date">` vs. flatpickr example is resonating as a concrete, relatable failure mode.

**Build with it:** Drop the skill into your Claude Code or Cursor workflow to reduce token spend (~20% cheaper) and review burden on greenfield features, or fork the benchmark suite against your own codebase to quantify exactly how much bloat your current agent setup is producing.

## 10. lidge-jun/opencodex

https://github.com/lidge-jun/opencodex · ★ 4015 (+3622 this week) · ai-gateway, ai-tools, anthropic, chatgpt, claude, claude-code, codex, codex-cli, deepseek, developer-tools, gemini, grok, kiro, llm, llm-proxy, ollama, openai, openrouter, proxy, typescript

**What it does:** opencodex is a local TypeScript proxy that intercepts OpenAI Codex and Claude Code API calls and translates them to any LLM provider—Claude, Gemini, Grok, DeepSeek, Ollama, and others—including full support for streaming, tool calls, and reasoning tokens.

**Why now:** The project gained 3,622 stars this week, likely driven by developers frustrated with Codex and Claude Code's locked provider model and looking for immediate alternatives as both tools see heavy production adoption.

**Build with it:** Route Codex CLI or Claude Code through a self-hosted Ollama instance for fully air-gapped coding workflows, or build a multi-tenant dev environment that load-balances across provider accounts to avoid quota limits mid-session.
