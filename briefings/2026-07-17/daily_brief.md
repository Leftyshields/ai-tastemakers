# AI Tastemakers — Daily Brief — 2026-07-17

_Ranking: delta_7d · 10 repos · generated 2026-07-18T00:25:34.551Z_


## 1. HKUDS/Vibe-Trading

https://github.com/HKUDS/Vibe-Trading · ★ 24620 (+5561 this week) · ai-agent, algorithmic-trading, backtesting, fintech, llm, mcp, multi-agent, python, quantitative-finance, trading

**What it does:** Vibe-Trading is a Python-based multi-agent trading framework that bundles 88+ skills—backtesting, live trading, factor analysis, and market data ingestion—into a single pip-installable package with a FastAPI backend, React frontend, and MCP server interface.

**Why now:** The project gained 5,561 GitHub stars this week and just shipped a significant correctness pass fixing silent data corruption in multiple brokers (Futu, CCXT, mootdx), look-ahead bias guards, and atomic live-trading safety controls—making it meaningfully more trustworthy for real capital.

**Build with it:** A builder could wire Vibe-Trading's MCP server into Claude or any LLM client to create a natural-language portfolio assistant that runs backtests, monitors live positions, and enforces risk caps—or extend it by adding custom skills to the swarm using the user-defined presets loaded from `~/.vibe-trading`.

## 2. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 118341 (+2724 this week) · ai-tools, claude-code, codex, desktop-app, hermes, hermes-agent, mcp, minimax, omo, open-source, openclaw, openclaw-ui, opencode, provider-management, rust, skills, skills-management, tauri, typescript, wsl-support

**What it does:** CC Switch is a cross-platform Tauri desktop app that centralizes API key and provider management across Claude Code, Codex, Gemini CLI, OpenCode, and other AI coding agents, letting developers switch between providers without manually editing config files.

**Why now:** It gained 2,724 GitHub stars this week, signaling rapid adoption as developers juggle multiple competing AI coding agents and need a single control plane rather than per-tool configuration sprawl.

**Build with it:** A builder could extend CC Switch's provider management layer to add custom MCP server configs or wire in private/self-hosted model endpoints, effectively creating a unified routing layer for an engineering team's entire AI toolchain.

## 3. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 85209 (+5308 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt/skill layer you drop into AI coding agents (Claude Code, Cursor, etc.) that biases the agent toward minimal solutions—using a native `<input type="date">` instead of installing flatpickr, deleting code instead of adding it—averaging 54% fewer lines written across real agentic sessions on a FastAPI + React codebase.

**Why now:** It hit Hacker News this week and is trending at 85k stars with 5k+ added in the past seven days, riding the current wave of Claude Code and agentic coding tool adoption where runaway token costs and bloated diffs are a live pain point.

**Build with it:** Wire the ponytail skill into your Claude Code or Cursor setup to cut token spend ~20% on any project where an agent is doing iterative feature work, or fork the benchmark harness to measure code minimalism regressions in your own CI pipeline.

## 4. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 230677 (+2497 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness operating system that layers skills, memory, instincts, and security scanning on top of AI coding agents like Claude Code, Codex, and Cursor to make them behave more reliably across complex engineering workflows.

**Why now:** With 2,497 new stars this week, ECC is clearly catching momentum as developers push Claude Code and similar agents into serious production use and hit the limits of raw prompting.

**Build with it:** Wire ECC into your existing Claude Code or Cursor setup to add persistent memory and instinct layers, then use its security scanning hooks to catch agent-introduced vulnerabilities before they land in your main branch.

## 5. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 216457 (+3835 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is an open-source, self-improving AI agent from Nous Research that creates and refines skills from experience, maintains persistent memory across sessions, and runs on any model or infrastructure — from a $5 VPS to serverless GPU clusters — with Telegram, Discord, and CLI interfaces out of the box.

**Why now:** The project gained nearly 4,000 stars this week, signaling rapid community traction, and its compatibility with the open agentskills.io standard means skills and workflows built today can travel across the emerging agent ecosystem.

**Build with it:** Wire it to your own model endpoint via Nous Portal or OpenRouter, define cron-scheduled automations in natural language, and use its subagent delegation and RPC scripting layer to build parallel, multi-step pipelines that collapse into near-zero context cost.

## 6. heygen-com/hyperframes

https://github.com/heygen-com/hyperframes · ★ 35954 (+1838 this week) · ai, animation, ffmpeg, framework, gsap, html, mcp, puppeteer, rendering, typescript, video

**What it does:** HyperFrames is an open-source TypeScript framework that converts HTML, CSS, and seekable animations (GSAP, etc.) into deterministic MP4 videos via Puppeteer and FFmpeg, exposable to AI coding agents through a skill-based MCP interface.

**Why now:** It crossed 35,000 GitHub stars this week with nearly 2,000 new stars, signaling rapid adoption at the exact moment agentic coding workflows (Claude Code, Cursor, Gemini CLI) need a reliable programmatic video rendering primitive.

**Build with it:** Wire it into an AI agent to auto-generate product demo videos, data-driven animated charts, or slide decks from structured data—just describe the output in a prompt and let the skills handle the HTML-to-MP4 production loop.

## 7. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 152415 (+3647 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is an API that scrapes, searches, and crawls websites at scale, converting any web content—including JS-heavy pages, PDFs, and DOCXs—into clean Markdown or structured JSON ready for LLM consumption.

**Why now:** With 152K stars and 3,647 added this week, Firecrawl just released v2.5 benchmarks showing 96% web coverage and P95 latency of 3.4s, making it one of the most production-validated web data layers available for AI agents right now.

**Build with it:** Connect Firecrawl to an AI agent pipeline to autonomously research, extract, and structure live web data—use the Crawl and Extract endpoints together to build a competitive intelligence tool that monitors rival sites and outputs structured JSON diffs on a schedule.

## 8. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 18380 (+3570 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, gemini-cli, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted AI gateway that routes requests from tools like Claude Code, Cursor, and Copilot across 259 providers (90+ free tiers) through a single OpenAI-compatible endpoint, with built-in token compression that cuts usage by 15–95%.

**Why now:** The repo gained 3,570 stars this week, signaling a surge of developers looking to sidestep rising API costs as Anthropic, OpenAI, and Google all tighten free tier limits simultaneously.

**Build with it:** Drop OmniRoute in front of any existing OpenAI SDK integration and immediately get auto-fallback across free Claude/GPT/Gemini tiers—ship a personal coding assistant or internal tool that runs on ~1.6B free tokens per month without changing a single line of application code.

## 9. router-for-me/CLIProxyAPI

https://github.com/router-for-me/CLIProxyAPI · ★ 43044 (+3273 this week) · antigravity, claude-code, cluade, codex, gemini, openai

**What it does:** CLIProxyAPI is a Go-based proxy server that wraps CLI tools from OpenAI Codex, Claude Code, Google Antigravity, xAI Grok, and Kimi into standard OpenAI/Gemini/Claude-compatible API endpoints, letting you route requests across multiple accounts programmatically.

**Why now:** The project jumped 3,273 stars this week, likely tracking fresh releases across its supported providers—GPT-5.6, Claude Fable 5, Gemini 3.5 Flash, and Grok 4.5—making it a timely single integration point for builders evaluating the new frontier models.

**Build with it:** Point any OpenAI-SDK-compatible app at your local CLIProxyAPI instance to load-balance across Claude Code, Codex, and Gemini CLI accounts simultaneously, enabling cheap multi-provider failover without rewriting client code.

## 10. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 57494 (+3156 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) the ability to read and search Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paying for APIs, by routing through free backends and browser login states.

**Why now:** It hit GitHub's #1 trending repository this week with 57,000+ stars and 3,156 new stars in seven days, signaling a breakout moment for the "agentic browsing" use case as developers race to give LLM workflows real-time internet access.

**Build with it:** Drop it into any MCP-compatible agent to build a no-cost social listening tool, a multi-platform research assistant, or an automated content aggregator that pulls live data from closed platforms like XiaoHongShu and Twitter without a single paid API key.
