# AI Tastemakers — Daily Brief — 2026-09-02

_Ranking: delta_7d · 10 repos · generated 2026-09-02T17:09:41.736Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 121056 (+9076 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code plugin (and cursor-rules config) that installs a "laziest senior dev" heuristic into your AI agent, pushing it toward native browser APIs, stdlib, and one-liners instead of installing dependencies and scaffolding abstractions.

**Why now:** The repo is trending at +9,076 stars this week, landing as teams are actively tuning Claude Code agent behavior post-launch — the YAGNI/prompt-engineering topic tags signal this is catching on as a practical counter to over-building agents specifically.

**Build with it:** Drop the skill file into your Claude Code project via `npm install @dietrichgebert/ponytail` and wire it to your agent's skill config, then run your existing feature tickets through a headless session and diff the output against your current baseline to measure LOC reduction on your own codebase.

## 2. K-Dense-AI/scientific-agent-skills

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 42038 (+7478 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** Scientific Agent Skills is a Python library of 163 validated research workflows — covering genomics, drug discovery, PK/PD modelling, and metabolomics — that plug into AI coding agents like Claude Code, Cursor, or Codex via the open Agent Skills standard.

**Why now:** The repo gained 7,478 stars this week, coinciding with the release of K-Dense BYOK, a free local AI co-scientist built on top of these skills, which just got a public webinar walkthrough posted to YouTube.

**Build with it:** Drop the skills into a Claude Code or Cursor project via the Agent Skills config, then wire a domain-specific subset — say, the 1000 Genomes query skills plus regulatory-sequence prediction — into a genomics analysis pipeline that runs against your own data without sending it to a third-party server.

## 3. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 124222 (+3036 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** A Python-based AI skill that injects design system reasoning into coding agents (Claude, Cursor, Copilot, Windsurf, etc.) via a CLI, giving them access to 192 reasoning rules and 79 searchable UI styles for generating structured, production-ready UI/UX.

**Why now:** The repo crossed 124k stars with 3k+ added this week, coinciding with active adoption across the agent-IDE wave (Kiro, Trae, Qoder listed as supported targets), making it a current reference point in the "skills for agents" pattern gaining traction alongside tool-use and MCP workflows.

**Build with it:** Install `ui-ux-pro-max-cli` from npm, wire the skill into your agent's context or system prompt, then invoke the Design System Generator to produce a tailored design token set and component pattern before writing any markup — replacing the usual ad-hoc Tailwind guessing loop.

## 4. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 113891 (+3022 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify ingests a codebase—including SQL schemas, configs, docs, and PDFs—and builds a queryable knowledge graph using deterministic AST parsing via tree-sitter, with every edge explicitly explained and no vector store required.

**Why now:** The project is trending at +3,022 stars this week, coinciding with the rapid adoption of agentic coding tools like Claude Code, Cursor, and Gemini CLI that need structured code context rather than flat file retrieval.

**Build with it:** Drop the `/graphify` skill into Claude Code or Cursor, point it at a monorepo, and replace grep-based code search with graph queries—useful for building a refactoring agent that traces call graphs and dependency edges across services.

## 5. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 175618 (+2986 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is an API that scrapes, searches, and crawls websites at scale, returning clean Markdown, structured JSON, or screenshots optimized for LLM consumption — handling JS rendering, proxy rotation, and rate limiting automatically.

**Why now:** Firecrawl gained nearly 3,000 stars this week, coinciding with growing adoption of MCP (Model Context Protocol) clients where Firecrawl offers a one-command integration, making it a live reference point for teams wiring web data into agent pipelines right now.

**Build with it:** Point an agent framework like LangGraph or CrewAI at Firecrawl's `/search` and `/scrape` endpoints to give agents grounded, real-time web context — replacing fragile custom scrapers with a single authenticated API call that returns token-efficient Markdown.

## 6. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 55600 (+4909 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that wires 12 production pipelines and 100+ tools into your AI coding assistant, covering scripting, asset generation (Flux, Stable Diffusion, ElevenLabs), and final composition via FFmpeg and Remotion.

**Why now:** The repo hit #1 on GitHub Trending this week with nearly 5,000 stars in seven days, surfacing at the same moment Remotion and text-to-video tooling are seeing active integration discussions across the open-source AI community.

**Build with it:** Drop the AGENT_GUIDE.md into your Cursor or Claude Projects context, point it at one of the 12 named pipelines (e.g., text-to-video or voiceover), and use the 700+ skill files as a retrieval layer to automate a repeatable short-form content workflow end to end.

## 7. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 60242 (+4429 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that exposes a single OpenAI-compatible endpoint routing across 352 AI providers (150+ free tiers), with quota-aware auto-fallback and RTK+Caveman prompt compression that can cut token usage by 15–95%.

**Why now:** The repo gained 4,429 stars this week, surfacing alongside active Cursor, Claude Code, and Codex CLI adoption cycles where developers are hitting free-tier rate limits and hunting for cost-reduction tooling without switching SDKs.

**Build with it:** Point your existing `OPENAI_BASE_URL` in Claude Code, Cursor, or Cline at your OmniRoute instance, configure a fallback chain in the routing strategies, and the gateway handles provider exhaustion automatically — no client-side changes needed when a quota runs out.

## 8. TauricResearch/TradingAgents

https://github.com/TauricResearch/TradingAgents · ★ 102296 (+3862 this week) · agent, finance, llm, multiagent, trading

**What it does:** TradingAgents is a Python framework that orchestrates multiple specialized LLM agents — analysts, traders, portfolio managers — to simulate a trading firm's research-to-decision pipeline using real market, macro (FRED), and sentiment data.

**Why now:** v0.4.0 shipped this week with point-in-time data fixes for FRED macro and social sentiment (closing look-ahead bias bugs that would silently corrupt any backtest) and adds GPT-5.6 and GLM-5.3 to the model catalog.

**Build with it:** Wire in your own data vendor via the provider registry, configure agents through `TRADINGAGENTS_*` env vars, and run backtests against the corrected data-access contract to evaluate whether a specific LLM (e.g., GLM-5.3 vs. GPT-5.6) produces more consistent buy/sell signals on a given ticker.

## 9. Imbad0202/academic-research-skills

https://github.com/Imbad0202/academic-research-skills · ★ 45456 (+1649 this week) · academic-pipeline, academic-writing, ai-research, claude, claude-code, literature-review, peer-review, prompt-engineering

**What it does:** Academic Research Skills is a Claude Code plugin that structures the full paper pipeline—literature search, citation verification, drafting, peer review simulation, and revision—with human-in-the-loop integrity gates that block hallucinated references and fabricated methodology before they reach submission.

**Why now:** Zhao et al.'s May 2026 audit of 111M references estimated 146,932 hallucinated citations in 2025 papers alone, with a clear mid-2024 inflection point—making citation integrity tooling acutely relevant for anyone publishing right now.

**Build with it:** Install via `/plugin marketplace add Imbad0202/academic-research-skills` in Claude Code, then enable `ARS_CLAIM_AUDIT=1` to wire the opt-in audit pass into your CI or pre-submission checklist, fetching cited sources against locator anchors to flag unsupported claims before they leave your repo.

## 10. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 239960 (+3252 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python agent from Nous Research that creates and refines skills from past sessions, maintains cross-session memory via FTS5 search and LLM summarization, and runs across seven terminal backends including Modal and Daytona serverless environments.

**Why now:** The repo crossed 239K stars with 3,252 added this week, signaling a sharp surge in builder attention likely tied to the broader wave of open agentic frameworks competing with Claude Code and Codex in the coding-agent space.

**Build with it:** Wire it to your own model endpoint via `hermes model` and the OpenRouter integration, then use the built-in cron scheduler to dispatch nightly audit tasks to a Telegram or Discord channel — no code changes required to swap providers mid-workflow.
