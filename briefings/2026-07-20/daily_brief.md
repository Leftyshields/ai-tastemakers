# AI Tastemakers — Daily Brief — 2026-07-20

_Ranking: delta_7d · 10 repos · generated 2026-07-20T15:20:11.365Z_


## 1. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 9265 (+8257 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source Chinese book "Understanding AI Agents In Depth" by Bojie Li, with full text, compiled PDFs in four languages, and runnable Python code examples organized across 10 chapters covering the formula Agent = LLM + Context + Tools.

**Why now:** It gained 8,257 stars this week, signaling a surge of developer interest in structured, engineering-focused AI agent education at exactly the moment context engineering and MCP have become practical production concerns.

**Build with it:** Clone the repo and run the chapter-matched demos to prototype a production coding agent, a multi-turn RAG memory system, or a multi-agent collaboration framework—each backed by real LLM API calls you can swap for your own provider.

## 2. tirth8205/code-review-graph <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/tirth8205/code-review-graph · ★ 22618 (+3164 this week) · ai-coding, claude, claude-code, code-review, graphrag, incremental, knowledge-graph, llm, mcp, python, static-analysis, tree-sitter

**What it does:** `code-review-graph` builds a persistent structural map of your codebase using Tree-sitter, then serves precise, change-aware context to AI coding tools via MCP so they read only the files and symbols relevant to a given review rather than re-scanning everything.

**Why now:** The project gained over 3,000 stars this week, signaling strong momentum around token-cost reduction as teams running Claude Code, Codex, Cursor, and similar tools on large repos start feeling real API cost pressure.

**Build with it:** Drop it into a CI pipeline as a GitHub Action to pre-build the graph on each push, then wire the MCP server into your AI tool so PR reviews automatically get scoped context instead of full-repo dumps—useful starting point for teams building internal code-review automation on top of any MCP-compatible LLM.

## 3. HKUDS/Vibe-Trading

https://github.com/HKUDS/Vibe-Trading · ★ 25582 (+5410 this week) · ai-agent, algorithmic-trading, backtesting, fintech, llm, mcp, multi-agent, python, quantitative-finance, trading

**What it does:** Vibe-Trading is an open-source Python framework that wraps LLM-powered multi-agent pipelines around real brokerage connectors (12 and counting), backtesting, and data sources—deployable via a single pip install with a FastAPI backend and React frontend.

**Why now:** The repo gained 5,410 stars this week, signaling a surge of developer interest, and the latest release adds native Anthropic API support, a MetaTrader 5/Exness connector, and an 80× vectorized signal-alignment engine that materially expands what you can plug in.

**Build with it:** Wire up a paper-trading bot that ingests live Binance funding rates, runs a backtested momentum strategy, and exposes decisions through the MCP API so Claude or GPT can explain each trade to end users in plain language.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 86471 (+5368 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces YAGNI-style minimalism—prompting the agent to reach for the simplest possible solution before writing new code, cutting generated LOC by ~54% on average across real feature tasks.

**Why now:** It's trending at 86K+ stars with 5,368 added this week, likely catching tailwind from Claude Code's rapid adoption and developers noticing their agents over-engineering routine tasks.

**Build with it:** Drop the skill into your Claude Code or Cursor setup and run it against a real codebase to audit how much bloat your current agent workflow generates; then use the benchmark harness in `/benchmarks` to measure LOC, token cost, and time deltas on your own feature tickets.

## 5. microsoft/markitdown

https://github.com/microsoft/markitdown · ★ 167594 (+2531 this week) · autogen, autogen-extension, langchain, markdown, microsoft-office, openai, pdf

**What it does:** MarkItDown is a Python library that converts PDFs, Word docs, PowerPoints, Excel files, images, audio, HTML, and more into clean Markdown optimized for LLM consumption, preserving headings, tables, and lists without bloated formatting overhead.

**Why now:** It hit 167,594 stars with 2,531 added this week, signaling a surge in developer adoption likely driven by teams building document-heavy RAG pipelines and LLM ingestion workflows.

**Build with it:** Drop it into a document processing pipeline to normalize any file type into LLM-ready Markdown before chunking and embedding—especially useful for enterprise tools ingesting mixed-format document libraries like contracts, reports, or slide decks.

## 6. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 21044 (+5033 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that exposes 268+ AI providers and 500+ models through a single OpenAI-compatible endpoint, with quota-aware auto-fallback, token compression (RTK+Caveman), and native support for Claude Code, Cursor, Cline, and Copilot.

**Why now:** The project gained 5,033 stars this week and sits at 21,044 total, signaling a sharp spike in adoption—likely driven by developers hitting rate limits across fragmented free tiers and looking for a unified fallback layer.

**Build with it:** Drop OmniRoute in front of any existing OpenAI SDK call, configure your free-tier provider keys, and get automatic failover across 50+ free models—letting you ship an AI-powered app or agent that stays live even when individual provider quotas run out.

## 7. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 40300 (+2236 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, from-scratch, generative-ai, llm, machine-learning, mcp, nlp, python, reinforcement-learning, rust, swarm-intelligence, transformers, tutorial, typescript

**What it does:** A structured, 503-lesson open curriculum across 20 phases that teaches AI engineering from linear algebra through autonomous agent swarms, in Python, TypeScript, Rust, and Julia, where every lesson produces a working, reusable artifact.

**Why now:** The repo gained 2,236 stars this week, signaling a surge of builders looking for rigorous foundations as AI tooling complexity outpaces tutorial-level content.

**Build with it:** Use it as a hiring rubric or team onboarding spine, working through the transformer and LLM-from-scratch phases to give engineers who can prompt a model the ability to also explain its loss curve and rewrite its attention layer.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 217624 (+4072 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent from Nous Research that creates and refines skills from experience, maintains persistent memory across sessions, and runs on any model or infrastructure — from a $5 VPS to serverless GPU clusters.

**Why now:** The project gained over 4,000 stars this week, signaling a surge in developer interest around persistent, learning-capable agents that aren't locked to a single provider or local machine.

**Build with it:** Use the built-in scheduler, subagent delegation, and multi-platform messaging gateways (Telegram, Discord, Slack) to ship autonomous workflows that improve over time — then export trajectories to fine-tune your own tool-calling models.

## 9. headroomlabs-ai/headroom

https://github.com/headroomlabs-ai/headroom · ★ 60621 (+1958 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 20–95% before they consume context window space, with no code changes required via its proxy mode.

**Why now:** With 60,000+ stars and nearly 2,000 added this week, it's hitting critical mass at the exact moment coding agents like Claude Code, Cursor, and Codex are routinely blowing context limits on real codebases.

**Build with it:** Drop it in front of any existing agent pipeline as a proxy or MCP server to immediately cut token costs and extend effective context, or use the Python/TypeScript library to build a RAG system that compresses retrieved chunks before injection and automatically learns from failed sessions.

## 10. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 153421 (+3703 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is an API that scrapes, searches, and crawls the web at scale, converting any URL into clean Markdown, structured JSON, or screenshots that LLMs and AI agents can consume directly.

**Why now:** With 153K stars and 3,700 new stars this week, the project is surging—likely driven by its MCP integration, which lets any MCP-compatible AI agent connect to live web data with a single command.

**Build with it:** Use the Search and Scrape endpoints to give your AI agent real-time web context—pipe competitor pricing pages, research papers, or news into structured JSON and feed it directly into your LLM pipeline without writing a single parser.
