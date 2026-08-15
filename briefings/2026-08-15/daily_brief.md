# AI Tastemakers — Daily Brief — 2026-08-15

_Ranking: delta_7d · 10 repos · generated 2026-08-15T13:43:07.708Z_


## 1. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 48347 (+6164 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that exposes 1,200+ models across 339 providers through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman prompt compression that cuts token usage by 15–95%.

**Why now:** The repo gained 6,164 stars this week, spiking alongside Claude Code and OpenAI Codex CLI adoption — both tools work out of the box by pointing their `OPENAI_BASE_URL` at OmniRoute, making free-tier stacking immediately practical for daily agentic coding workflows.

**Build with it:** Drop OmniRoute between Cursor or Cline and your provider by setting `OPENAI_BASE_URL` to your self-hosted instance, then configure a fallback chain (e.g., Gemini 2.5 Flash → GPT-4o mini → DeepSeek) in the routing config so your coding agent never stalls on a rate limit mid-session.

## 2. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 106525 (+2686 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses a codebase with tree-sitter AST locally, then builds a queryable knowledge graph covering code, docs, SQL schemas, configs, and PDFs — exposing it as a `/graphify` skill inside Claude Code, Cursor, Codex, or Gemini CLI.

**Why now:** The project gained 2,686 stars this week, placing it on Trendshift's trending chart, which coincides with the broader developer rush to wire MCP-compatible context tools into the newly released Claude Code and Gemini CLI agentic workflows.

**Build with it:** Drop the `graphifyy` PyPI package into a Claude Code MCP server config, invoke `/graphify` to index your repo, then query cross-file call graphs and SQL schema relationships directly from the chat interface instead of writing custom grep pipelines.

## 3. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 103076 (+5068 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code / Cursor skill (agent prompt layer) that instructs your AI agent to prefer deletion and native primitives over new code — replacing a flatpickr install with `<input type="date">` and so on, measured at -54% LOC and -20% cost on real FastAPI + React sessions.

**Why now:** The project hit 103K stars with +5K this week, coinciding with the broader Claude Code plugin / agent-skills ecosystem maturing to the point where dropping a single config file into a repo is a supported, documented integration pattern rather than a hack.

**Build with it:** Drop the `CLAUDE.md` or `.cursor/rules` config into any existing repo, point it at your agent's skill-loading surface, and immediately constrain code-generation sessions on new feature tickets — the benchmark workflow in `benchmarks/` lets you reproduce the LOC delta against your own codebase before committing to the pattern.

## 4. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 9249 (+4950 this week) · agent-skill, ai, c2pa, claude, provenance, synthid, watermark

**What it does:** watermarks-remover is a Python service and agent skill that strips AI-origin provenance signals from text and files — covering invisible Unicode characters, statistical token-sampling watermarks (SynthID-class, Kirchenbauer-style), and C2PA/EXIF/XMP metadata embedded in PNG, JPEG, PDF, DOCX, SVG, and more.

**Why now:** This week's star surge (4,950 in seven days) tracks directly against growing deployment of C2PA signing in AI image pipelines and Anthropic's documented use of Unicode-layer provenance markers in Claude outputs — both of which landed in mainstream coverage this month, making provenance stripping a suddenly practical concern for anyone republishing AI-assisted content.

**Build with it:** Wire the service into a local content pipeline via `make serve` and call `/remove-ai-marks` as a Grok agent skill — or invoke `clean_file.py` directly in a CI step to sanitize AI-drafted Markdown, DOCX, or images before committing or publishing, without adding any Python dependencies beyond the 3.10+ stdlib.

## 5. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 167633 (+4946 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is an API that scrapes, searches, and crawls websites at scale, returning clean Markdown, structured JSON, or screenshots — handling JS rendering, rotating proxies, and rate limits so callers don't have to.

**Why now:** The project gained nearly 5,000 stars this week, coinciding with growing MCP (Model Context Protocol) adoption — Firecrawl ships a one-command MCP server integration, making it a direct drop-in for agent tool registries being assembled right now.

**Build with it:** Wire Firecrawl's `/scrape` endpoint into a LangChain or LlamaIndex retrieval step to replace fragile `requests` + BeautifulSoup pipelines, or point its MCP server at Claude Desktop to give your local agent live web context without writing any scraping logic.

## 6. TencentCloud/TencentDB-Agent-Memory

https://github.com/TencentCloud/TencentDB-Agent-Memory · ★ 21860 (+4586 this week) · agent, ai-agent, embedding, llm, local-first, long-term-memory, memory, openclaw-plugin, vector-search

**What it does:** TencentDB Agent Memory is a self-hosted memory server that converts agent conversations, docs, and code into four structured assets — Chat Memory, Skill, LLM-Wiki, and Code-Graph — shared across agents and frameworks via a proxy that requires no plugin or code changes.

**Why now:** The project gained 4,586 stars this week, signaling a surge of interest likely tied to teams hitting the stateless-agent wall as Claude Code, Codex, and similar coding agents go mainstream in multi-session, multi-developer workflows.

**Build with it:** Point Claude Code or Codex at the local proxy by setting the agent's `base_url` to the Proxy endpoint after running `./start-all.sh` — your agent immediately reads and writes to shared memory across sessions with zero config beyond the two LLM parameter sets in `.env`.

## 7. holaboss-ai/holaOS <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/holaboss-ai/holaOS · ★ 7538 (+2042 this week) · agent, agent-harness, agent-os, agentic, ai, ai-agent, ai-agents, artificial-intelligence, claude-code, codex, electron, holaboss, holaos, llm, mcp, memory, model-context-protocol, runtime, typescript, workspace

**What it does:** holaOS is a local-first Electron desktop workspace that runs Claude Code, Codex, or its own built-in agent side-by-side, sharing a single memory store, 100+ tool integrations, and MCP connections across sessions.

**Why now:** The repo gained 2,042 stars this week, coinciding with the broader developer push to orchestrate multiple coding agents (Claude Code, Codex) without rebuilding context each time — a friction point actively discussed as both tools have shipped recent updates.

**Build with it:** Wire in your own agent via BYOK, then expose a custom MCP server to give it persistent memory and your existing toolchain — the `workspace` and `memory` config surfaces let you define what context survives across sessions without touching the agent's own setup.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 230896 (+3978 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-hosted AI agent from Nous Research with a built-in learning loop — it generates and refines skills from completed tasks, maintains cross-session memory via FTS5 search and LLM summarization, and runs across seven terminal backends (local, Docker, SSH, Modal, Daytona, and others) while staying reachable over Telegram, Discord, or Slack.

**Why now:** The repo crossed 230K stars with nearly 4K added this week, coinciding with Nous Research's public push around their Portal model provider and the agentskills.io open standard for shareable agent skills — making this a live ecosystem moment, not just a release.

**Build with it:** Point it at your own OpenRouter or Nous Portal endpoint via `hermes model`, then wire the cron scheduler to run nightly code audits or data pipelines delivered to a Slack channel — all configured in natural language without touching the agent's internals.

## 9. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 71907 (+3764 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP server that lets AI agents read and search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and arbitrary web pages without paid APIs, by wrapping platform-specific scraping adapters behind a single unified interface.

**Why now:** Claude Code and Cursor's MCP plugin ecosystems are maturing rapidly this month, and Agent Reach ships a ready-made MCP config that drops directly into both tools — eliminating the adapter-writing step that currently blocks most agent builders from adding live web context.

**Build with it:** Drop the provided `mcp.json` snippet into your Claude Code or Cursor MCP config, then prompt your agent to pull Reddit threads, YouTube transcripts, or XiaoHongShu reviews as structured text inputs for summarization, competitive research, or RAG ingestion pipelines.

## 10. harry0703/MoneyPrinterTurbo

https://github.com/harry0703/MoneyPrinterTurbo · ★ 103778 (+1727 this week) · ai-video-generator, content-creation, ffmpeg, instagram-reels, llm, python, short-video, subtitles, text-to-speech, tiktok, video-automation, video-workflow, workflow-automation, youtube-shorts

**What it does:** MoneyPrinterTurbo is a Python tool that takes a topic or keyword and automatically generates a short-form video end-to-end — writing the script via an LLM, fetching stock footage, generating subtitles, adding background music, and rendering the final MP4 via FFmpeg.

**Why now:** The project gained 1,727 stars this week and recently integrated Kimi K3 (Moonshot AI's newly released 3T-parameter open-source model with 1M-token context) as a supported LLM backend, making this a direct testbed for that model's video-script and keyword-extraction capabilities.

**Build with it:** Wire in your own LLM API key (OpenAI-compatible endpoints are supported) and hit the REST API — documented at `/docs` — to slot automated short-video generation into a content pipeline, or use the `config.toml` surface to swap TTS providers and subtitle styles without touching application code.
