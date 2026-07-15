# AI Tastemakers — Daily Brief — 2026-07-15

_Ranking: delta_7d · 10 repos · generated 2026-07-15T15:01:09.148Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 83693 (+7071 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt/skill layer you drop into AI coding agents (Claude Code, Cursor, etc.) that biases them toward minimal solutions—preferring a native `<input type="date">` over installing a date picker library, and averaging 54% fewer lines of code written per task.

**Why now:** It trended to 83k+ stars this week as developers running agentic coding sessions are actively looking for ways to cut token costs and reduce AI-generated bloat before it accumulates into unmaintainable codebases.

**Build with it:** Wrap your existing Claude Code or Cursor workflow with the ponytail skill, then benchmark your own feature tickets against the baseline to measure how much over-engineering your current agent setup actually produces—useful data if you're building or selling an AI dev toolchain.

## 2. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 57987 (+5387 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** A public GitHub repository that extracts and publishes the actual system prompts governing major AI assistants — Claude Opus 4.8/Fable 5, GPT-5.6, Gemini 3.5 Flash, Grok, and dozens more — updated as new model versions ship.

**Why now:** The repo hit 57,987 stars with 5,387 added this week, coinciding with fresh extractions of Kimi K2.6, Perplexity Deep Research, and DeepSeek posted July 14, making it the most current public reference for how frontier models are actually instructed.

**Build with it:** Use the leaked prompts as ground-truth baselines to reverse-engineer competitor AI product behavior, stress-test your own system prompt designs against known production patterns, or build a prompt-diff tool that tracks instruction changes across model versions.

## 3. HKUDS/Vibe-Trading

https://github.com/HKUDS/Vibe-Trading · ★ 23441 (+5038 this week) · ai-agent, algorithmic-trading, backtesting, fintech, llm, mcp, multi-agent, python, quantitative-finance, trading

**What it does:** Vibe-Trading is a Python-based multi-agent trading framework that gives LLMs comprehensive trading capabilities—market data, backtesting, portfolio management, and MCP server integration—installable in a single pip command.

**Why now:** It hit 23,441 stars with 5,038 added this week, reflecting surging developer interest in agentic finance tooling, and recent PRs just fixed critical backtest correctness bugs (causal rebalancing, accurate turnover reporting, finite validation output) making it meaningfully more trustworthy for real strategy development.

**Build with it:** Wire up a custom LLM agent via the MCP server to run causal backtests on quantitative strategies, then expose portfolio analytics through the FastAPI backend to a React frontend—or plug it into an existing Claude/GPT workflow to prototype a shadow-account paper-trading system without touching live capital.

## 4. coreyhaines31/marketingskills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/coreyhaines31/marketingskills · ★ 39483 (+2451 this week) · claude, codex, marketing

**What it does:** A collection of markdown-based skill files that give AI coding agents (Claude Code, Codex, Cursor, etc.) structured marketing knowledge across CRO, SEO, copywriting, ads, growth, and GTM — each skill reads a shared `product-marketing` foundation before executing any task.

**Why now:** The repo gained 2,451 stars this week, signaling a surge of technical founders and marketers actively wiring AI agents into their growth workflows rather than just prompting chatbots.

**Build with it:** Drop these skills into your agent-powered project to automate end-to-end marketing workflows — for example, have Claude Code run an SEO audit, generate schema markup, write landing page copy, and draft cold emails all in one session, with every step grounded in your product's positioning.

## 5. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 17608 (+4625 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, gemini-cli, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hostable TypeScript gateway that exposes a single OpenAI-compatible endpoint routing requests across 250+ AI providers, with 90+ free tiers, automatic fallback, and RTK+Caveman token compression that cuts usage by up to 95%.

**Why now:** The repo gained 4,625 stars this week, signaling a surge of developers looking to route tools like Claude Code, Cursor, and Copilot away from paid API limits—especially as free tier credits from Gemini and others make zero-cost inference newly practical.

**Build with it:** Point any OpenAI-SDK-compatible tool at your OmniRoute instance and implement a cost-aware coding assistant that automatically waterfalls from Claude to Gemini to a no-cap provider when limits are hit, without changing a single line of client code.

## 6. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 215277 (+4450 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent from Nous Research that builds skills from experience, maintains cross-session memory, and runs across terminals, messaging platforms, and cloud infrastructure from a single install.

**Why now:** The project gained 4,450 stars this week, signaling strong community momentum around agents that persist knowledge and improve autonomously rather than resetting each session.

**Build with it:** Use the built-in cron scheduler and subagent delegation to automate multi-step research or coding pipelines that run on a $5 VPS, deliver results to Telegram, and get smarter with each run.

## 7. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 151385 (+4330 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is an API that scrapes, searches, and crawls websites at scale, converting any web content—including JS-rendered pages and PDFs—into clean Markdown or structured JSON ready for LLM consumption.

**Why now:** With 4,330 stars added this week and 151K total, momentum is high, and its recent v2.5 benchmarks claim 96% web coverage with P95 latency of 3.4 seconds, making it a credible backbone for production AI agents right now.

**Build with it:** Connect Firecrawl to an AI agent or MCP client to power real-time research tools, competitive intelligence scrapers, or RAG pipelines that pull live, structured web data without managing proxies or browser orchestration yourself.

## 8. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 56685 (+4159 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP toolkit that gives AI agents authenticated, scrape-ready access to Twitter, Reddit, YouTube, Bilibili, Xiaohongshu, GitHub, and more—without paying for APIs or wrestling with platform blocks.

**Why now:** It hit GitHub's #1 trending repository this week with 56K+ stars and just shipped a live fix replacing yt-dlp with bili-cli after Bilibili's risk controls blocked the old scraper, proving the maintenance model works.

**Build with it:** Wire it into Claude Code or Cursor to create an autonomous research agent that monitors Twitter sentiment, pulls Reddit bug threads, summarizes YouTube tutorials, and surfaces Xiaohongshu product reviews—all triggered from a single agent prompt with zero API spend.

## 9. wonderwhy-er/DesktopCommanderMCP <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/wonderwhy-er/DesktopCommanderMCP · ★ 8303 (+2046 this week) · agent, ai, code-analysis, code-generation, gemini-cli-extension, mcp, terminal-ai, terminal-automation, vibe-coding

**What it does:** Desktop Commander MCP gives AI assistants like Claude direct control over your terminal, file system, and running processes—including reading/writing Excel, PDF, and DOCX files, executing code in memory, and streaming long-running command output.

**Why now:** It gained 2,046 stars this week, signaling a surge of builders discovering that pairing it with Claude Desktop eliminates the need to burn API tokens on file-heavy agentic workflows.

**Build with it:** Wire it into Claude Desktop to create a local AI agent that autonomously refactors codebases, analyzes CSVs, edits Word reports, and SSHs into servers—all from a single chat interface without touching a terminal yourself.

## 10. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 38827 (+3971 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source, agent-driven video production system that gives your AI coding assistant 12 pipelines and 52 tools to handle research, scripting, asset generation, and FFmpeg-based editing — producing actual motion-clip videos, not just slideshows of AI images.

**Why now:** It hit #1 on GitHub Trending this week with nearly 4,000 new stars, signaling a surge of builder interest in agentic media workflows at exactly the moment text-to-video APIs are maturing enough to be useful.

**Build with it:** Wire OpenMontage into Cursor or Claude to auto-produce documentary-style explainers, product demos, or short-form social content by pointing it at a source video URL and describing the output you want.
