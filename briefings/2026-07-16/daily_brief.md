# AI Tastemakers — Daily Brief — 2026-07-16

_Ranking: delta_7d · 10 repos · generated 2026-07-16T15:12:55.940Z_


## 1. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 32113 (+3701 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that indexes codebases into a persistent SQLite knowledge graph using tree-sitter AST parsing across 158 languages, answering structural queries about functions, call chains, and HTTP routes in under 1ms with 99% fewer tokens than file-by-file exploration.

**Why now:** The project gained 3,700+ stars this week and is actively being evaluated against AI coding agents like Claude Code, Cursor, and Gemini CLI, with a peer-reviewed arXiv paper benchmarked across 31 real-world repos showing 83% answer quality at 10× token reduction.

**Build with it:** Drop it into any MCP-compatible agent to give it persistent, structured memory of a large codebase — particularly useful for building autonomous refactoring agents, cross-service dependency analyzers, or code review tools that need to reason about call graphs without burning context on raw file reads.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 84497 (+6806 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt-engineering plugin for AI coding agents (Claude Code, Cursor, etc.) that biases the agent toward YAGNI-style minimalism—replacing over-engineered solutions with the simplest working code, measured at 54% fewer lines of code on average across real agentic sessions.

**Why now:** It hit 84k GitHub stars with 6,800 added this week, riding the surge of teams running autonomous Claude Code sessions where unchecked agents bloat codebases and burn API budget on unnecessary abstractions.

**Build with it:** Drop the skill into your Claude Code or Cursor setup to cut token costs ~20% on long agentic runs, or fork the benchmark harness against `full-stack-fastapi-template` to test your own prompt constraints against the included caveman and yagni-oneliner baselines.

## 3. HKUDS/Vibe-Trading

https://github.com/HKUDS/Vibe-Trading · ★ 24216 (+5533 this week) · ai-agent, algorithmic-trading, backtesting, fintech, llm, mcp, multi-agent, python, quantitative-finance, trading

**What it does:** Vibe-Trading is a Python-based multi-agent trading framework that gives LLMs comprehensive trading capabilities—market data, backtesting, portfolio management, and order execution—exposed via a FastAPI backend, React UI, and MCP server, installable with a single `pip install vibe-trading-ai`.

**Why now:** The project jumped 5,533 stars this week and shipped critical fixes including causal backtest rebalancing, Portfolio Studio core features, and a Windows HTTP 500 bug fix for LLM settings—making it meaningfully more reliable for builders evaluating it right now.

**Build with it:** Wire your own LLM to the MCP server to build a natural-language trading assistant that can run historical backtests, manage a shadow portfolio, and surface actionable signals—without writing brokerage integration code from scratch.

## 4. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 58317 (+4525 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** A public GitHub repository that extracts and documents the hidden system prompts powering major AI assistants — Claude, ChatGPT, Gemini, Grok, Copilot, and others — including full tool definitions, skill lists, and version diffs.

**Why now:** The repo crossed 58K stars this week with 4,525 new additions, driven by fresh dumps of GPT-5.6, Claude Sonnet 5, and Kimi K2.6 system prompts, making it the most current public reference for how production AI systems are actually instructed.

**Build with it:** Use the extracted prompts as reverse-engineered blueprints to design your own agent system prompts, benchmark your product's instructions against frontier models, or diff versions over time to track how OpenAI and Anthropic quietly shift model behavior.

## 5. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 17969 (+4427 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, gemini-cli, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that exposes a single OpenAI-compatible endpoint routing requests across 250+ AI providers (90+ free tiers), with built-in token compression that cuts usage by 15–95% and automatic fallback when any provider hits rate limits.

**Why now:** The repo gained 4,427 stars this week, signaling rapid community adoption at a moment when API costs and rate limits are actively blocking developer workflows across Claude Code, Cursor, Codex, and Copilot.

**Build with it:** Drop OmniRoute in front of any tool that speaks the OpenAI API spec, configure a fallback chain across free Gemini, Claude, and GPT tiers, and ship a coding assistant or agent pipeline that survives quota exhaustion without changing a line of client code.

## 6. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 215845 (+4424 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent framework from Nous Research that creates and refines skills from experience, maintains persistent memory across sessions, and runs across any model provider or infrastructure — from a $5 VPS to serverless GPU clusters.

**Why now:** The project gained over 4,400 stars this week, signaling rapid community adoption, and its compatibility with the open agentskills.io standard positions it at the center of an emerging ecosystem for portable, interoperable agent capabilities.

**Build with it:** Developers can use Hermes to build persistent, cross-platform assistants that operate over Telegram or Discord, spawn parallel subagents for complex workflows, and generate compressed training trajectories to fine-tune their own tool-calling models.

## 7. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 151850 (+4190 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is an API that scrapes, searches, and crawls websites at scale, converting any web content—including JS-heavy pages and PDFs—into clean Markdown, structured JSON, or screenshots ready for LLM consumption.

**Why now:** It gained 4,190 stars this week, reflecting surging demand for reliable web data pipelines as AI agents increasingly need real-time, structured context from the open web.

**Build with it:** Connect Firecrawl to an AI agent via its MCP client integration to give it live web search and scraping capabilities—letting it autonomously pull, parse, and act on fresh web data without you managing proxies or rate limits.

## 8. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 57125 (+4017 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, Windsurf, etc.) the ability to read and search Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paying for APIs, by routing through free backends and browser login states stored locally.

**Why now:** It hit #1 on GitHub Trending this week with 57K+ stars and 4K new stars in seven days, and it just shipped a live example of its backend-switching philosophy—yt-dlp was blocked by Bilibili's risk controls, so the project silently rerouted to bili-cli with zero user action required.

**Build with it:** Drop the one-line install prompt into any MCP-compatible agent and immediately add internet-aware tools to your app—scrape competitor Twitter sentiment, summarize Reddit bug threads, or pull YouTube transcripts into a RAG pipeline without touching a paid API key.

## 9. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 39198 (+3738 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that gives AI coding assistants 12 pipelines and 52 tools to handle the full production stack — research, scripting, asset generation, stock footage retrieval, editing, and final render — from a plain-language prompt.

**Why now:** It hit #1 on GitHub Trending this week with nearly 4,000 new stars, signaling a wave of developer interest in agentic media pipelines at the exact moment text-to-video models and Claude-style tool-use are mature enough to wire together reliably.

**Build with it:** Point it at a niche topic, wire in your own stock footage corpus or a Stable Diffusion endpoint, and ship a fully automated video newsletter, product demo generator, or short-doc pipeline without touching a timeline editor.

## 10. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 106462 (+3717 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** UI UX Pro Max is a rules-based AI skill — a set of 161 reasoning rules and 84 UI style definitions — that you install into your AI coding tool (Claude, Cursor, Copilot, etc.) to give it consistent, professional design judgment across React, HTML5, Tailwind, and mobile targets.

**Why now:** AI coding tools are shipping faster than their design taste is improving, and this week's jump to 106k stars suggests builders are actively patching that gap with opinionated skill layers rather than waiting for the tools themselves to catch up.

**Build with it:** Drop the skill into your Claude or Cursor project, describe a product like "minimalist SaaS dashboard for logistics teams," and let the Design System Generator output a full, reasoned design system — color palette, layout pattern, section order, CTA placement — before you write a single component.
