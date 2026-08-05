# AI Tastemakers — Daily Brief — 2026-08-05

_Ranking: delta_7d · 10 repos · generated 2026-08-05T15:26:01.347Z_


## 1. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 32631 (+6641 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source Chinese-authored book (with 13-language translations) covering AI Agent architecture across 10 chapters, paired with 95 runnable experiments spanning RAG, MCP, multi-agent systems, context engineering, and reinforcement learning.

**Why now:** The repo gained 6,641 stars this week alone, landing it on GitHub's Project of the Day trending list — a signal that the "context engineering" framing it centers is actively absorbing developer attention right now.

**Build with it:** Clone the repo, run the chapter-aligned Python experiments locally (e.g., the MCP or coding-agent labs), and use the context-engineering chapter as a structured design checklist when wiring tool calls and memory layers into your own LLM agent.

## 2. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 40423 (+6608 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that routes requests across 290+ AI providers (90+ free tiers) through a single OpenAI-compatible endpoint, with quota-aware fallback and RTK+Caveman prompt compression that cuts token usage by 15–95%.

**Why now:** The repo gained 6,608 stars this week, coinciding with Claude Code and OpenAI Codex CLI both gaining traction as terminal-native coding agents — OmniRoute lets you point either tool at free-tier models without changing any other config.

**Build with it:** Set `OPENAI_BASE_URL` in Claude Code or Codex CLI to your OmniRoute instance, configure a fallback chain across Gemini Flash, GPT-4o mini, and DeepSeek in `routing.config.ts`, and let the quota-aware router handle rate-limit failures automatically — no SDK changes required.

## 3. TencentCloud/TencentDB-Agent-Memory

https://github.com/TencentCloud/TencentDB-Agent-Memory · ★ 14795 (+5441 this week) · agent, ai-agent, embedding, llm, local-first, long-term-memory, memory, openclaw-plugin, vector-search

**What it does:** TencentDB Agent Memory is a self-hosted memory layer for AI agent teams that extracts four structured asset types — Chat Memory, Skills, LLM-Wiki, and Code-Graph — from conversations, documents, and code, then shares them across agents and sessions via vector search.

**Why now:** The repo gained 5,441 stars this week, landing it at the top of GitHub trending, coinciding with the broader push toward persistent, team-scoped agent context as Claude Code and multi-agent workflows become routine engineering infrastructure.

**Build with it:** Drop it into a Claude Code or CodeBuddy setup using the provided `start-all.sh` one-liner and MCP proxy config, then route agent conversations through the Memory Hub so Skills and Code-Graph entries accumulate automatically across sessions without manual re-prompting.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 96474 (+5005 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code / cursor-rules skill that steers AI agents toward minimal solutions — reaching for `<input type="date">` instead of installing flatpickr, measured at ~54% fewer lines of code across 12 real feature tasks on a FastAPI + React codebase.

**Why now:** The project hit the GitHub trending chart this week with 5,005 stars added, landing as agents like Claude Code move from demos to daily pull requests where token cost and diff noise are concrete problems teams are actively complaining about.

**Build with it:** Drop the skill into an existing Claude Code session via the `@dietrichgebert/ponytail` npm package, or wire it into your `.cursorrules` file, and it applies automatically at the agent planning step — no prompt rewriting required per task.

## 5. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 57340 (+2402 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** An AI agent skill that queries Reddit, X, YouTube, HN, Polymarket, and GitHub in parallel, scores results by upvotes, likes, and prediction-market odds, then synthesizes a single grounded brief on any topic or person from the last 30 days.

**Why now:** The skill is trending #1 on GitHub this week with 2,402 stars added, coinciding with the Claude Code plugin marketplace going live — making `/plugin marketplace add mvanhorn/last30days-skill` a one-line install rather than a manual credential wiring project.

**Build with it:** Drop it into a Claude Code workflow via `/plugin install last30days` and wire it as a pre-call research step: pipe the output into a CRM note, a meeting-prep doc, or a competitive-intel prompt chain using the SKILL.md spec as the integration contract.

## 6. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 102886 (+4671 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus its docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using tree-sitter AST locally, then exposes it as a `/graphify` skill inside Claude Code, Cursor, Codex, or Gemini CLI via MCP.

**Why now:** The project is trending at +4,671 stars this week, coinciding with the current wave of developer adoption around Claude Code skills and MCP tooling as structured alternatives to raw RAG for code navigation.

**Build with it:** Drop the MCP server into an existing Claude Code or Cursor workspace, then query cross-file call graphs and schema relationships directly from the chat interface instead of writing grep scripts or maintaining manual architecture docs.

## 7. lyogavin/airllm

https://github.com/lyogavin/airllm · ★ 28890 (+4637 this week) · chinese-llm, chinese-nlp, finetune, generative-ai, instruct-gpt, instruction-set, llama, llm, lora, open-models, open-source, open-source-models, qlora

**What it does:** AirLLM runs large language models — up to 2.8T parameters — on consumer GPUs with as little as 4GB VRAM by streaming individual model layers (or MoE experts) from disk rather than loading the full model into memory, with no quantization required.

**Why now:** The July 2026 update added support for Kimi K3 (2.8T), currently the largest open-source model available, making this the first practical path to running it locally on a single card — a concrete reason for local-inference builders to revisit the library this week.

**Build with it:** Install via `pip install airllm compressed-tensors flash-attn`, then use the `AutoModel` class with any HuggingFace model ID to drop layer-streamed inference into an existing transformers-based pipeline without changing your generation loop.

## 8. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 66835 (+4567 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents structured access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paid APIs, handling authentication, anti-scraping, and HTML cleanup automatically.

**Why now:** The project hit #1 on GitHub Trending this week with 4,567 stars added, coinciding with broader developer frustration around MCP tool fragmentation and the cost of platform APIs for agent pipelines.

**Build with it:** Drop the install instruction URL into your Claude Code or Cursor agent chat, then wire the resulting MCP tools into an existing LangChain or CrewAI workflow to give research agents live social and video data as a retrieval step.

## 9. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 161520 (+3769 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is an API that scrapes, searches, and crawls websites at scale, returning clean Markdown, structured JSON, or screenshots — handling JS rendering, rotating proxies, and rate limits so you don't have to.

**Why now:** Firecrawl gained 3,769 stars this week, coinciding with growing MCP (Model Context Protocol) adoption — the README explicitly ships a one-command MCP client integration, making it a direct fit for the current wave of agent tooling built on that standard.

**Build with it:** Point your LangChain or LlamaIndex RAG pipeline at Firecrawl's `/crawl` endpoint to replace brittle BeautifulSoup scrapers — or wire the MCP server into Claude Desktop to give your agent live web context without managing any browser infrastructure.

## 10. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 225901 (+3726 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving CLI/cloud agent from Nous Research that creates and refines skills from experience, maintains cross-session memory, and runs tool-use workloads across seven execution backends including Modal and Daytona serverless environments.

**Why now:** The repo crossed 225K stars with 3,726 added this week, coinciding with growing builder attention on agentic frameworks that support model-agnostic switching — Hermes lets you swap providers via `hermes model` without code changes, a direct response to OpenAI Codex and Claude Code lock-in concerns circulating in developer communities.

**Build with it:** Wire it to your own OpenAI-compatible endpoint via Nous Portal or OpenRouter, then use the cron scheduler to trigger nightly jobs delivered to Telegram or Discord — the gateway process handles cross-platform continuity without standing up separate bots.
