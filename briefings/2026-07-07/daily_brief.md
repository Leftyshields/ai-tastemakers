# AI Tastemakers — Daily Brief — 2026-07-07

_Ranking: delta_7d · 10 repos · generated 2026-07-07T15:50:21.865Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 76622 (+8086 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces YAGNI discipline—replacing over-engineered solutions with the simplest possible code, averaging 54% fewer lines written per task.

**Why now:** It hit 76K stars with 8K added this week, suggesting it's catching on fast as developers get frustrated watching agents scaffold entire component libraries to solve two-line problems.

**Build with it:** Drop the skill into your Claude Code or Cursor setup and run it against a real feature branch to measure how much dead weight your agent normally produces—then use the built-in benchmark harness to tune the prompt for your own stack.

## 2. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 86104 (+7940 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a prompt-engineering skill/plugin that instructs AI coding agents (Claude Code, Cursor, Copilot, and 30+ others) to respond in stripped-down "caveman speak," cutting output tokens by 65% while keeping code, commands, and error messages byte-for-byte intact.

**Why now:** The repo hit 86,104 stars with 7,940 added this week, signaling a breakout moment as developers actively look for ways to reduce API costs and response latency in agentic workflows without sacrificing technical accuracy.

**Build with it:** A builder running heavy Claude Code sessions or a multi-agent pipeline could drop this in via one curl command and immediately cut output token costs by roughly two-thirds—meaningful savings at scale, and a working template for writing your own terse-mode system prompts tuned to specific domains or cost targets.

## 3. ZhuLinsen/daily_stock_analysis

https://github.com/ZhuLinsen/daily_stock_analysis · ★ 55464 (+3174 this week) · a-stock, ai-agent, aigc, llm, quant, quantitative-finance, quantitative-trading

**What it does:** An LLM-powered stock analysis system that pulls multi-source market data (A-share, HK, US, JP, KR, TW) and generates daily AI decision reports with buy/sell points, risk alerts, and scoring, then pushes them to WeChat Work, Feishu, Telegram, Slack, or email.

**Why now:** The repo gained 3,174 stars this week, signaling a surge in developer interest around automated AI-driven trading workflows — likely accelerated by the growing availability of cheap LLM APIs and free GitHub Actions compute for scheduled tasks.

**Build with it:** Fork the repo, wire in your own stock watchlist and an OpenAI-compatible API key, and extend the 15 built-in agent strategies (moving average, wave theory, trend, event-driven) to prototype a fully automated personal portfolio monitor that runs on zero-cost GitHub Actions infra and delivers daily briefings to your phone.

## 4. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 59910 (+6277 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a set of portable agent skills (markdown files) you drop into Codex, Cursor, or Claude Code to enforce opinionated layout, typography, spacing, and motion rules so AI-generated frontends stop looking generic.

**Why now:** It gained 6,277 stars this week, signaling that "vibe-coded" UIs hitting a quality ceiling is a real, widely-felt problem that builders are actively trying to solve.

**Build with it:** Run `npx skills add https://github.com/Leonxlnx/taste-skill` to inject the design rules into your agent workflow, then pair the image-generation skills with ChatGPT Images to produce reference boards that Claude Code or Codex can implement directly.

## 5. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 52526 (+5894 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP toolkit that gives AI agents authenticated, zero-API-fee access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more through pre-configured scrapers with automatic fallback routing when platforms block existing methods.

**Why now:** It hit GitHub Trending #1 this week with 5,894 new stars, driven by growing demand for agents that can act on live web data without expensive API subscriptions—and a timely real-world example where yt-dlp was blocked by Bilibili and the project silently rerouted to bili-cli with zero user action required.

**Build with it:** Drop the one-liner install prompt into Claude Code or Cursor and ship a research agent that monitors Twitter sentiment, summarizes Reddit threads, and pulls YouTube transcripts—all free, all from a single `agent-reach` command with a built-in `doctor` diagnostic to debug broken platform connections.

## 6. HKUDS/Vibe-Trading

https://github.com/HKUDS/Vibe-Trading · ★ 18403 (+2840 this week) · ai-agent, algorithmic-trading, backtesting, fintech, llm, mcp, multi-agent, python, quantitative-finance, trading

**What it does:** Vibe-Trading is an open-source Python framework that wraps LLM-powered multi-agent workflows around algorithmic trading — covering backtesting, order placement, and portfolio analysis through a FastAPI backend and React frontend, installable via a single `pip install vibe-trading-ai`.

**Why now:** The repo gained 2,840 stars this week and is actively merging infrastructure — value-investing agent presets, IRR/AGL governance scoring, and timezone-aware session handling — making it a stable enough base to build on without fighting the core abstractions.

**Build with it:** Wire up the MCP server to your own LLM (Claude, GPT-4o, etc.) to create a shadow-account trading agent that backtests a strategy, evaluates it against a scorecard, and surfaces buy/sell signals through the REST API you expose to a dashboard or Telegram bot.

## 7. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 27824 (+5474 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that parses any codebase into a persistent SQLite knowledge graph using tree-sitter AST analysis across 158 languages, answering structural queries about functions, call chains, and HTTP routes in under 1ms with 99% fewer tokens than file-by-file exploration.

**Why now:** The project gained 5,474 stars this week, signaling rapid adoption among the growing ecosystem of AI coding agent users on Cursor, Claude Code, Windsurf, and Gemini CLI — all of which it supports out of the box.

**Build with it:** Drop it into any agent configuration to give your AI precise, low-token structural awareness of large repos — then layer custom tooling on top of its 14 MCP tools to build things like automated dependency auditors, cross-service call graph visualizers, or refactoring agents that actually understand what they're touching.

## 8. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 34856 (+5377 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that gives AI coding assistants (Cursor, Copilot, Claude) access to 52 tools across 12 pipelines—covering scripting, stock footage retrieval, AI clip generation, voiceover, captions, and final render—producing real motion-video output, not just animated stills.

**Why now:** The repo hit #1 on GitHub Trending this week with 5,377 new stars, surfacing at the same moment text-to-video models (Kling v3, Veo) became cheap and capable enough to use in production pipelines at under $2 per finished short.

**Build with it:** Wire it into your own agent workflow to auto-produce YouTube shorts, product demo videos, or educational content from a single text prompt—or fork the pipeline system to add custom tools like brand-specific motion templates or proprietary footage archives.

## 9. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 52600 (+5300 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** This repo collects and publishes extracted system prompts from major AI products including Claude Fable 5, GPT-5.5, Gemini 3.5 Flash, and dozens more, giving developers direct visibility into the exact instructions shaping each model's behavior.

**Why now:** The repo gained 5,300 stars this week and added Claude Sonnet 5 and Claude Design's full 48-tool prompt on July 1, 2026, making it the freshest public reference for current production system prompt patterns across every major AI lab.

**Build with it:** Use the prompt diffs and tool schemas to reverse-engineer effective constraint patterns, skill structures, and tool-calling conventions, then apply them directly to your own agent system prompts or benchmark your product's prompt quality against what ships in production.

## 10. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 147055 (+5156 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is an API that scrapes, searches, and crawls websites at scale, converting any web content—including JS-rendered pages—into clean Markdown, structured JSON, or screenshots ready for LLM consumption.

**Why now:** With 147K stars and 5,156 added this week, momentum is peaking alongside surging demand for reliable web context in agentic AI pipelines that need real-time, structured data without brittle scraper maintenance.

**Build with it:** Connect Firecrawl to an AI agent that monitors competitor websites or research sources, automatically extracting and structuring updates into a searchable knowledge base your LLM can query directly.
