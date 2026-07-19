# AI Tastemakers — Daily Brief — 2026-07-19

_Ranking: delta_7d · 10 repos · generated 2026-07-19T14:34:31.016Z_


## 1. HKUDS/Vibe-Trading

https://github.com/HKUDS/Vibe-Trading · ★ 25182 (+5782 this week) · ai-agent, algorithmic-trading, backtesting, fintech, llm, mcp, multi-agent, python, quantitative-finance, trading

**What it does:** Vibe-Trading is a Python-based multi-agent framework that wraps LLMs with quantitative trading tools—backtesting, factor analysis, real-time stock news via Yahoo Finance, and MCP server support—deployable in one command via `pip install vibe-trading-ai`.

**Why now:** The project gained 5,782 stars this week, signaling rapid community adoption, and just shipped real Yahoo Finance article fetching plus MCP `factor_analysis` fixes that make the toolchain actually reliable for production use cases.

**Build with it:** Wire it into Claude or any MCP-compatible client to build a portfolio research agent that pulls live news, runs backtests, and surfaces factor signals—or extend the FastAPI backend to expose custom trading strategies as callable tools.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 85890 (+5329 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt-engineering plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces a "laziest senior dev" heuristic—preferring native browser/platform primitives and minimal diffs over generated boilerplate, measurably cutting lines of code by ~54% and cost by ~20% on real agentic tasks.

**Why now:** It hit 85k+ stars and is trending top repositories this week, coinciding with broad adoption of Claude Code as a daily driver, making agent behavior tuning a live concern for teams shipping with AI assistance.

**Build with it:** Drop the skill into your Claude Code or Cursor setup to immediately reduce token spend and generated surface area on any project; or fork the benchmark harness against your own repo to quantify exactly how much over-building your current agent does before writing your own agent constraints.

## 3. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 19790 (+4300 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, gemini-cli, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that exposes a single OpenAI-compatible endpoint routing requests across 265 AI providers (90+ free tiers), with stacked RTK+Caveman compression cutting token usage by 15–95% and auto-fallback across providers when limits are hit.

**Why now:** The repo gained 4,300 stars this week, signaling rapid community adoption, and the timing aligns with developers hitting rate limits on Gemini CLI, Claude Code, and Codex as those tools proliferate.

**Build with it:** Point Claude Code, Cursor, or Cline at your local OmniRoute instance to cycle through free Gemini, Claude, and GPT tiers automatically—effectively giving a solo developer or small team a multi-model coding backend with near-zero API spend.

## 4. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 217123 (+4037 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is an open-source, self-improving AI agent from Nous Research that maintains a persistent learning loop — creating and refining skills from experience, modeling users across sessions, and running on any backend from a $5 VPS to serverless infrastructure via a single Python install.

**Why now:** The repo crossed 217K stars with 4,037 added this week, signaling a sharp surge in builder interest likely tied to the growing demand for agents that aren't locked to a single model or local machine.

**Build with it:** Point it at your own model endpoint via Nous Portal or OpenRouter, wire it into Telegram or Discord as a persistent personal assistant, then use its batch trajectory generation tools to collect fine-tuning data for training your own specialized tool-calling model.

## 5. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 4840 (+3832 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source Chinese book ("Understanding AI Agents in Depth") with full text, compiled PDFs, and chapter-matched Python code covering the complete stack of LLM-based agent engineering—context, memory, tools, coding agents, multi-agent systems, and post-training.

**Why now:** The repo gained 3,832 stars this week alone, signaling a surge in developer demand for structured, code-backed agent engineering references at a moment when MCP, context engineering, and multi-agent orchestration are moving from research into production.

**Build with it:** Clone the repo and run the self-contained chapter demos to prototype specific agent components—such as the RAG pipeline, MCP tool integration, or multi-agent coordination patterns—using real LLM APIs as validated reference implementations for your own production agent architecture.

## 6. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 153008 (+3823 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is an open-source API that scrapes, searches, and crawls websites at scale, converting any web content—including JS-heavy pages—into clean Markdown, structured JSON, or screenshots ready for LLM consumption.

**Why now:** It gained 3,823 stars this week, signaling strong momentum, and its MCP integration means AI agents can now connect to live web data with a single command—directly relevant as agentic workflows become production-grade.

**Build with it:** Use the `/search` + `/scrape` endpoints to build a real-time research agent that pulls fresh web context into your LLM pipeline, or use batch scrape to extract structured data from thousands of competitor pages for automated market monitoring.

## 7. router-for-me/CLIProxyAPI

https://github.com/router-for-me/CLIProxyAPI · ★ 43590 (+3686 this week) · antigravity, claude-code, cluade, codex, gemini, openai

**What it does:** CLIProxyAPI is a Go-based proxy server that wraps CLI tools from OpenAI Codex, Claude Code, Google Antigravity, xAI Grok, and Kimi into a unified OpenAI/Gemini/Claude-compatible API endpoint, letting you route requests across providers through a single local interface.

**Why now:** The project gained 3,686 stars this week, coinciding with new model releases across every supported provider—GPT-5.6, Claude Fable 5, Gemini 3.5 Flash, Grok 4.5, and Kimi K2.7 Code—making it a timely single integration point for builders evaluating the latest frontier models.

**Build with it:** Drop this in front of any OpenAI-compatible SDK and write a multi-provider routing layer that benchmarks response quality and cost across GPT-5.6, Gemini 3.1 Pro, and Grok 4.5 in parallel, without changing your existing API calls.

## 8. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 107633 (+3357 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** UI UX Pro Max is a prompt-based AI skill that injects 161 reasoning rules and 84 pre-defined UI styles into coding assistants like Claude, Cursor, and Copilot to produce professionally designed interfaces instead of generic scaffolding.

**Why now:** With AI coding tools now capable of generating full components in seconds, the bottleneck has shifted to design quality — this addresses exactly that gap as the ecosystem matures around agent-based development.

**Build with it:** Drop the skill into your preferred AI coding environment and prompt it to generate a landing page, mobile UI, or component library with a specific visual style, getting production-ready markup with intentional typography, spacing, and layout decisions baked in from the first output.

## 9. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 57949 (+3164 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP toolkit that gives AI agents free, zero-config access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more — handling auth, anti-scraping, and data cleaning so agents get readable content instead of raw HTML or 403 errors.

**Why now:** It hit #1 on GitHub Trending this week with 3,164 new stars, driven by growing demand for agents that can actually browse the live internet without paid API keys — and a timely example where yt-dlp's Bilibili support broke and the project silently rerouted to bili-cli with zero user action required.

**Build with it:** Wire it into a Claude Code or Cursor workflow to build a competitive intelligence agent that monitors Twitter sentiment, Reddit bug reports, and GitHub Issues around a product — all from one CLI, no API billing.

## 10. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 65128 (+3110 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a collection of portable agent skills that inject opinionated layout, typography, spacing, and motion rules into AI coding agents like Codex, Cursor, and Claude Code to prevent them from generating generic-looking UIs.

**Why now:** It gained 3,110 stars this week, signaling a growing builder frustration with AI-generated frontends that look identical and lifeless despite functional correctness.

**Build with it:** Drop the skills into your existing Codex or Claude Code workflow via `npx skills add` and immediately get higher-quality component output—pair it with ChatGPT Images to generate reference boards that the agent uses as visual targets during implementation.
