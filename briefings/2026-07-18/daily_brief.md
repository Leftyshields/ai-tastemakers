# AI Tastemakers — Daily Brief — 2026-07-18

_Ranking: delta_7d · 10 repos · generated 2026-07-18T14:31:45.434Z_


## 1. HKUDS/Vibe-Trading

https://github.com/HKUDS/Vibe-Trading · ★ 24866 (+5807 this week) · ai-agent, algorithmic-trading, backtesting, fintech, llm, mcp, multi-agent, python, quantitative-finance, trading

**What it does:** Vibe-Trading is a Python-based multi-agent trading framework that combines LLMs, 88+ bundled skills, backtesting, live-trading safety guards, and MCP support into a single pip-installable package for building autonomous trading agents.

**Why now:** The project gained 5,807 stars this week and just shipped a significant hardening pass fixing silent data corruption in multiple data loaders, adding look-ahead-bias guards, atomic daily order limits, and fail-closed live state—making it meaningfully more production-credible than typical AI trading demos.

**Build with it:** Spin up a swarm of specialized agents with custom presets loaded from `~/.vibe-trading`, wire in your own broker via CCXT or Longbridge, and expose the whole stack as an API or MCP server to let an LLM client drive portfolio decisions against a Shadow Account before touching real capital.

## 2. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 90474 (+2864 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a prompt skill/plugin that forces AI coding agents (Claude Code, Cursor, Copilot, and 30+ others) to respond in terse, caveman-style prose, cutting output tokens by ~65% while leaving code, commands, and error messages byte-for-byte intact.

**Why now:** The repo hit 90k+ stars with nearly 3k added this week and 900+ points on Hacker News, surfacing real builder interest in output-token costs as Claude Code and similar agentic tools see heavy daily use.

**Build with it:** Drop the install script into a team dotfiles repo or dev container setup so every engineer automatically runs leaner agent sessions—then instrument your LLM API logs before and after to measure actual cost reduction per sprint.

## 3. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 85442 (+5541 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt-engineering plugin for AI coding agents (Claude Code, Cursor, etc.) that installs a "laziest senior dev" persona, pushing the agent to delete or skip code rather than generate it—averaging 54% fewer lines of code written across real agentic sessions on a FastAPI + React codebase.

**Why now:** It gained 5,500+ GitHub stars this week and is trending on Trendshift, arriving as teams running Claude Code and similar agents are noticing runaway token costs and over-engineered outputs from default agent behavior.

**Build with it:** Drop the npm package into your Claude Code or Cursor setup to immediately cut token spend ~20% on any greenfield or feature-addition workflow, then fork the benchmark harness in `benchmarks/` to measure the LOC and cost delta on your own repo before committing to it in CI.

## 4. bojieli/ai-agent-book <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/bojieli/ai-agent-book · ★ 3198 (+2190 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source Chinese-language book and companion codebase covering AI agent design and engineering, structured around the formula Agent = LLM + Context + Tools, with runnable demos for memory systems, RAG, coding agents, multi-agent coordination, and model fine-tuning across 10 chapters.

**Why now:** The repo gained 2,190 stars this week, signaling a surge of developer interest in systematic, production-grade agent engineering resources at a moment when context engineering and MCP tooling are becoming practical bottlenecks for real deployments.

**Build with it:** Clone the repo and run the standalone demos in chapters 2–5 to benchmark KV cache strategies, test context compression pipelines, or wire up a coding agent with MCP tool integration against your own LLM API keys.

## 5. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 216698 (+4076 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent framework from Nous Research that creates and refines skills from experience, maintains persistent memory across sessions, and runs across terminals, messaging platforms, and cloud infrastructure with any LLM backend.

**Why now:** The project gained over 4,000 stars this week, signaling rapid community traction, and its compatibility with the open agentskills.io standard positions it at the center of an emerging ecosystem for shareable, reusable agent capabilities.

**Build with it:** Use the built-in cron scheduler and Telegram gateway to deploy a personal AI that autonomously runs nightly code audits or data pipelines on a $5 VPS, then ships results to your phone — no laptop required.

## 6. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 152654 (+3886 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is an API that scrapes, searches, and crawls websites at scale, converting any web content—including JS-heavy pages—into clean Markdown, structured JSON, or screenshots ready for LLM consumption.

**Why now:** It gained nearly 4,000 stars this week, signaling a surge in developer interest likely driven by the growing demand for reliable web context feeding into AI agents and MCP-connected tools.

**Build with it:** Use the Search + Scrape endpoints to give your AI agent live, structured web context—pipe results directly into an LLM to answer questions grounded in real-time data without managing proxies or parsing HTML yourself.

## 7. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 18576 (+3766 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, gemini-cli, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted AI gateway that exposes a single OpenAI-compatible endpoint routing requests across 264 providers (90+ free tiers), with automatic fallback, RTK+Caveman token compression saving up to 95%, and native support for Claude Code, Codex, Cursor, Cline, and Copilot.

**Why now:** The project gained 3,766 stars this week, signaling rapid community adoption at a moment when AI API costs and rate limits are a daily friction point for developers shipping agent-heavy applications.

**Build with it:** Drop OmniRoute in front of any OpenAI-SDK-based project to get free inference with zero code changes—then layer in its 18 routing strategies to build cost-aware, fault-tolerant agent pipelines that automatically cascade through free tiers before touching paid quota.

## 8. router-for-me/CLIProxyAPI

https://github.com/router-for-me/CLIProxyAPI · ★ 43308 (+3537 this week) · antigravity, claude-code, cluade, codex, gemini, openai

**What it does:** CLIProxyAPI is a Go-based proxy server that wraps CLI tools from OpenAI Codex, Claude Code, Google Antigravity, xAI Grok, and Kimi into a unified OpenAI/Gemini/Claude-compatible API, letting you hit these services programmatically without official API keys.

**Why now:** The project gained 3,537 stars this week, coinciding with new model releases across providers—GPT-5.6, Gemini 3.5 Flash, Grok 4.5, Claude Fable 5, and Kimi K2.7 Code—making it a live aggregator of the current frontier.

**Build with it:** Point any OpenAI-compatible SDK at the local proxy to route requests across multiple providers and accounts, enabling cost arbitrage, fallback logic, or side-by-side model comparisons without rewriting client code.

## 9. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 107246 (+3361 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** UI UX Pro Max is a prompt-based AI skill that injects design system reasoning into coding agents like Claude, Cursor, and Copilot, giving them 161 rules and 84 UI style patterns to draw from when generating interfaces.

**Why now:** With AI coding agents now writing most frontend code, the missing layer is taste and design consistency — this week's 3,361-star spike suggests developers are actively hunting for that missing layer.

**Build with it:** Drop the skill into your agent workflow and build a multi-page SaaS landing page or mobile UI where the AI picks typography, spacing, color tokens, and layout patterns suited to your product category instead of defaulting to generic scaffolding.

## 10. datawhalechina/hello-agents

https://github.com/datawhalechina/hello-agents · ★ 67014 (+1679 this week) · agent, llm, rag, tutorial

**What it does:** Hello-Agents is a structured Chinese-language tutorial that teaches you to build AI-native agents from first principles—covering ReAct, Plan-and-Solve, Reflection, multi-agent systems, memory, and model training (SFT to GRPO)—culminating in a from-scratch agent framework built on the OpenAI API.

**Why now:** The repo jumped 1,679 stars this week, signaling a surge of developer interest as agent tooling matures and builders look beyond no-code platforms like Dify and Coze toward code-level control.

**Build with it:** Use the chapter-by-chapter code walkthroughs to implement your own lightweight agent framework without framework lock-in, then layer in context engineering, tool use, and multi-agent coordination to ship a production-grade agent system.
