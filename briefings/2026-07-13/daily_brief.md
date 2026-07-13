# AI Tastemakers — Daily Brief — 2026-07-13

_Ranking: delta_7d · 10 repos · generated 2026-07-13T15:51:24.489Z_


## 1. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 57116 (+7584 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** This repository collects and publishes extracted system prompts from major AI assistants—Claude, ChatGPT, Gemini, Grok, Copilot, and others—making the hidden instructions that govern their behavior publicly readable.

**Why now:** The repo gained 7,584 stars this week, driven by fresh extractions of GPT-5.6, Claude Sonnet 5, and Claude Design's full 48-tool prompt, putting the latest model constraints in front of builders the moment they ship.

**Build with it:** Use the leaked prompts as a reference layer when designing your own agents—study how frontier labs enforce tone, tool use, and refusals, then write tighter system prompts for your product by knowing exactly what you're competing against or emulating.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 82012 (+7579 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces YAGNI-style minimalism, steering the agent toward the simplest possible implementation—often a native browser feature or a single line—rather than over-engineered solutions.

**Why now:** It's trending at 82K stars with 7,579 added this week, and its benchmarks against a real FastAPI + React repo show a measurable 54% reduction in generated code, 20% lower token cost, and no safety regressions compared to a baseline agent.

**Build with it:** Drop the skill into your Claude Code or Cursor setup to keep AI-generated PRs lean by default, or fork the benchmark harness to test your own prompting strategies against a reproducible open-source codebase and publish your own reduction numbers.

## 3. HKUDS/Vibe-Trading

https://github.com/HKUDS/Vibe-Trading · ★ 21405 (+3524 this week) · ai-agent, algorithmic-trading, backtesting, fintech, llm, mcp, multi-agent, python, quantitative-finance, trading

**What it does:** Vibe-Trading is an open-source Python framework that gives LLM agents comprehensive trading capabilities—market analysis, backtesting with a sandboxed execution environment, portfolio management, and brokerage integration—deployable via a single pip install with a FastAPI backend and React frontend.

**Why now:** The project surged to 21,405 stars with 3,524 added this week, coinciding with a major security hardening patch that closed all 10 findings from an external audit, making it more credible for builders who need production-grade guardrails around LLM-driven financial execution.

**Build with it:** Wire it into Claude or any MCP-compatible agent to create a personal quant assistant that can run sandboxed backtests, stream live trade signals via SSE, and execute orders through Alpaca—then extend it with custom strategy modules exposed as MCP tools.

## 4. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 62842 (+5780 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a set of portable agent skills (markdown instruction files) that you drop into Codex, Cursor, or Claude Code to enforce opinionated layout, typography, spacing, and motion rules, steering AI away from generic boilerplate UI toward polished frontend output.

**Why now:** The repo gained 5,780 stars this week, signaling that "vibe coding" fatigue is real and developers are actively hunting for guardrails that make AI-generated interfaces look intentional rather than templated.

**Build with it:** Install the skill with one `npx skills add` command, then use it alongside ChatGPT Images to generate a reference design board and hand it to Claude Code or Codex to produce a production-ready frontend that actually respects visual hierarchy and spacing.

## 5. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 150263 (+5408 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is an API that scrapes, searches, and crawls the web at scale, converting any URL into clean Markdown, structured JSON, or screenshots that LLMs can consume directly without preprocessing.

**Why now:** With 5,408 stars added this week and 150K+ total, the project is clearly hitting a nerve as developers building AI agents increasingly need reliable, JS-rendered web data without managing proxy infrastructure themselves.

**Build with it:** Wire Firecrawl into an AI research agent that accepts a natural language query, searches the web, scrapes the top results into structured JSON, and returns cited, token-efficient answers—skipping the entire HTML-parsing and proxy-rotation problem entirely.

## 6. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 16652 (+5063 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, gemini-cli, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hostable TypeScript gateway that exposes a single OpenAI-compatible endpoint routing requests across 250+ AI providers, with 90+ free tiers, automatic fallback, and RTK+Caveman prompt compression that cuts token usage by up to 95%.

**Why now:** The repo gained 5,063 stars this week, signaling rapid adoption at a moment when developers are actively hunting cost relief as Claude, GPT-4o, and Gemini API bills compound across agentic workflows in tools like Cursor, Cline, and Claude Code.

**Build with it:** Drop OmniRoute in front of any OpenAI-compatible client—Claude Code, Codex, Copilot—and immediately route expensive requests to free Gemini or DeepSeek tiers with zero code changes, then layer in smart fallback logic so your agent pipelines never stall on rate limits.

## 7. ZhuLinsen/daily_stock_analysis

https://github.com/ZhuLinsen/daily_stock_analysis · ★ 57041 (+2454 this week) · a-stock, ai-agent, aigc, llm, quant, quantitative-finance, quantitative-trading

**What it does:** An LLM-powered stock analysis system that pulls multi-source market data (A-share, HK, US, JP, KR, TW), aggregates real-time news, runs AI-generated buy/sell decision reports, and pushes results to WeChat Work, Feishu, Telegram, Slack, or email on a schedule via GitHub Actions or Docker.

**Why now:** It gained 2,454 stars this week and hit #1 Python repository of the day on Trendshift, signaling a sharp surge in developer interest around automated, LLM-driven quantitative tooling.

**Build with it:** Fork the repo, wire in a DeepSeek or Gemini API key, define your watchlist across multiple markets, and ship a zero-cost daily stock decision dashboard to your team's Slack or email in under 30 minutes using the built-in GitHub Actions workflow.

## 8. TencentCloud/TencentDB-Agent-Memory <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/TencentCloud/TencentDB-Agent-Memory · ★ 8744 (+2318 this week) · agent, ai-agent, embedding, llm, local-first, long-term-memory, memory, openclaw-plugin, vector-search

**What it does:** TencentDB Agent Memory is a fully local, zero-external-API long-term memory system for AI agents that uses a four-tier progressive pipeline combining symbolic short-term compression (Mermaid diagrams) with layered long-term storage to replace flat vector dumps.

**Why now:** The project spiked to 8,744 stars with 2,318 added this week, coinciding with growing developer frustration around context window costs and agents that forget everything between sessions.

**Build with it:** Drop the npm package into an OpenClaw or Hermes-compatible agent to give it persistent memory across sessions—your agent will stop asking users to re-explain SOPs and project context, and you can benchmark the token savings directly against SWE-bench or PersonaMem.

## 9. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 214129 (+4624 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent framework from Nous Research that maintains a persistent learning loop across sessions — creating and refining skills from experience, modeling the user over time, and running across local, cloud, or serverless infrastructure with any LLM backend.

**Why now:** The repo gained over 4,600 stars this week, signaling rapid community traction, and its serverless-first design (Modal, Daytona) directly addresses the current push toward cost-efficient, always-on agents that don't require dedicated hardware.

**Build with it:** Deploy a personal coding or research agent on a $5 VPS reachable via Telegram, wire it to your own Nous Portal or OpenRouter endpoint, and let it accumulate task-specific skills over time — reducing prompt engineering overhead as it learns your workflows.

## 10. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 55662 (+4612 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) the ability to read and search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more — without paid APIs, by routing through free scrapers and browser login state.

**Why now:** It hit GitHub Trending #1 this week with 55,662 stars and 4,612 new stars in seven days, and just shipped a live fix replacing yt-dlp with bili-cli after Bilibili's bot detection broke the old backend — demonstrating active maintenance on a fast-moving problem.

**Build with it:** Drop it into any agent workflow to add real-time social and web data as a tool layer — for example, build a competitive intelligence agent that pulls live Twitter sentiment, Reddit bug reports, and GitHub issues for any product, all from one CLI with zero API keys.
