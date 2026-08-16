# AI Tastemakers — Daily Brief — 2026-08-16

_Ranking: delta_7d · 10 repos · generated 2026-08-16T13:43:59.894Z_


## 1. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 10471 (+6172 this week) · agent-skill, ai, c2pa, claude, provenance, synthid, watermark

**What it does:** A Python service plus agent skill that strips AI provenance marks from text and files — covering invisible Unicode, statistical token-sampling watermarks (Claude, SynthID-Text, Kirchenbauer-style), and C2PA/EXIF/XMP metadata from PNG, JPEG, SVG, PDF, DOCX, and HTML.

**Why now:** The project gained 6,172 stars this week, a spike that tracks directly with growing developer awareness of C2PA adoption across major AI platforms and ongoing debate about whether statistical text watermarks survive paraphrasing — making provenance removal a live engineering concern rather than a theoretical one.

**Build with it:** Drop the `skills/remove-ai-marks/` folder into `.grok/skills/`, spin up `python3 service/scripts/server.py`, and wire the `/remove-ai-marks` slash command into any Grok-compatible agent pipeline to get a pre-publish hygiene step that scrubs watermark surfaces before content leaves your workflow.

## 2. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 48892 (+5810 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hostable TypeScript gateway that exposes a single OpenAI-compatible endpoint across 339 AI providers, routing requests with quota-aware fallback and applying RTK+Caveman prompt compression to cut token usage by 15–95%.

**Why now:** The repo gained 5,810 stars this week, coinciding with active pressure on free-tier limits from Claude Code, Codex CLI, and OpenCode users looking for drop-in alternatives when quotas run dry mid-session.

**Build with it:** Point Claude Code or Cursor's `ANTHROPIC_BASE_URL` / `OPENAI_BASE_URL` at your OmniRoute instance, configure a fallback chain (e.g., Claude Sonnet → Gemini 2.5 Flash → DeepSeek) in the routing config, and let the quota-aware router handle failover automatically without changing your editor setup.

## 3. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 103777 (+5161 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code / cursor-rules skill that injects a YAGNI-first heuristic into AI coding agents, steering them toward minimal solutions — an `<input type="date">` instead of a flatpickr wrapper — measured at ~54% fewer lines of code across 12 real feature tasks on a FastAPI + React codebase.

**Why now:** The project is trending this week at +5,161 stars, coinciding with the broader wave of Claude Code agent tooling as developers actively hunt prompt-layer controls to cut runaway token costs and bloated diffs from agentic sessions.

**Build with it:** Drop the npm package `@dietrichgebert/ponytail` into an existing Claude Code project as an agent skill, or copy the cursor-rules config into `.cursor/rules` to apply the constraint at the editor level without changing your agent loop.

## 4. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 168020 (+4838 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is an API that scrapes, searches, and crawls websites—handling JS rendering, rotating proxies, and rate limits—then returns clean Markdown, structured JSON, or screenshots ready for LLM consumption.

**Why now:** Firecrawl added MCP (Model Context Protocol) client support this week, meaning agents built on Claude, Cursor, or any MCP-compatible host can call scrape/search/crawl directly as tool calls without custom glue code.

**Build with it:** Drop Firecrawl into a LangChain or LlamaIndex retrieval pipeline via its Python SDK: use `/search` to fetch live web context and `/scrape` with `formats: ["extract"]` to pull structured JSON from result pages, replacing brittle BeautifulSoup scrapers with a single authenticated endpoint.

## 5. TencentCloud/TencentDB-Agent-Memory

https://github.com/TencentCloud/TencentDB-Agent-Memory · ★ 22125 (+4145 this week) · agent, ai-agent, embedding, llm, local-first, long-term-memory, memory, openclaw-plugin, vector-search

**What it does:** TencentDB Agent Memory is a self-hosted memory server that intercepts LLM API calls via a transparent proxy and converts conversations, docs, and code into four structured memory types — Chat Memory, Skill, LLM-Wiki, and Code-Graph — shared across multiple AI agents without code changes.

**Why now:** The repo jumped 4,145 stars this week, landing it on GitHub Trending, coinciding with growing friction around context-window resets in long-running Claude Code and Codex sessions where teams lose accumulated project knowledge between runs.

**Build with it:** Point Claude Code or Codex at the local proxy by setting `ANTHROPIC_BASE_URL` or `OPENAI_BASE_URL` to `http://localhost:PORT` in your `.env`, run `./start-all.sh`, and every agent session automatically writes to and reads from the shared memory hub at `http://localhost:8125` — no plugin or MCP server required.

## 6. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 231318 (+3986 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python agent from Nous Research that creates and refines skills from experience, maintains cross-session memory, and runs across seven terminal backends (local, Docker, SSH, Modal, Daytona, and others) while routing through Telegram, Discord, Slack, or CLI from a single gateway process.

**Why now:** The repo is pulling nearly 4,000 stars this week, placing it among the fastest-rising agent frameworks on GitHub trending — likely driven by its compatibility with the newly prominent Claude and Codex coding agent workflows and its explicit `agentskills.io` open standard support.

**Build with it:** Wire it to your existing OpenRouter or Nous Portal endpoint via `hermes model`, deploy the gateway on a Modal serverless backend so it hibernates when idle, then register a cron automation in natural language to run nightly code audits and deliver results to a Slack channel — no infrastructure babysitting required.

## 7. citrolabs/ego-lite

https://github.com/citrolabs/ego-lite · ★ 11260 (+1960 this week) · agent-skills, ai-agent, automation, browser, browser-automation, claude-code, codex, hermes-agent, skills, skills-sh

**What it does:** ego lite is a macOS browser that runs AI agent browser-automation tasks in isolated "Spaces" while sharing your existing Chrome logins, cookies, and sessions with agents like Codex or Claude Code via the `ego-browser` skill.

**Why now:** The repo spiked 1,960 stars this week, coinciding with Codex and Claude Code's rapid adoption as terminal-first agents that lack a clean way to inherit authenticated browser state without hijacking the user's active tabs.

**Build with it:** Drop the `ego-browser` skill into your Claude Code or Codex workflow with `npx skills add citrolabs/ego-lite`, then trigger authenticated tasks directly from the agent CLI using `/ego-browser <natural language instruction>`, with no separate Playwright or browser-use setup required.

## 8. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 127546 (+1908 this week) · ai-tools, claude-code, codex, desktop-app, grok, grokbuild, hermes, hermes-agent, mcp, open-source, openclaw, openclaw-ui, opencode, provider-management, rust, skills, skills-management, tauri, typescript, wsl-support

**What it does:** CC Switch is a Tauri-based desktop app that centralizes API key management, provider switching, and configuration across Claude Code, Codex, Gemini CLI, Grok Build, OpenCode, and Hermes Agent from a single UI.

**Why now:** The repo is trending at +1,908 stars this week, coinciding with active multi-agent tooling fragmentation — developers are juggling incompatible config files across Claude Code, Codex, and OpenCode simultaneously, making a unified config surface immediately practical.

**Build with it:** Use CC Switch's provider management layer as the config injection point for a team onboarding script — automate switching between a shared API relay (e.g., PackyCode or ZetaAPI) and personal keys by scripting against the tool's config surface, so CI and local dev environments stay in sync without manual credential swaps.

## 9. titanwings/colleague-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/titanwings/colleague-skill · ★ 22716 (+1865 this week) · agent-skills, ai-agent, claude-code, codex, dsh-plugin, hermes-agent, knowledge-distillation, meta-skill, openclaw, skill-generator

**What it does:** dot-skill (formerly colleague.skill) takes chat logs, docs, or other source material from a real person and distills a portable AI Skill that replicates their reasoning patterns and voice, deployable across Claude Code, Codex, DeepSeek Harness, and other agent runtimes.

**Why now:** The project crossed 20K stars this week and shipped native DeepSeek Harness support, making it installable as a filesystem Skill at `~/.dsh/skills/dot-skill` and invocable via `/dot-skill` in DSH workflows without any extra wiring.

**Build with it:** Drop a distilled `.skill` file into your Claude Code project config or point DeepSeek Harness at `.dsh/skills/dot-skill` to give any coding agent a specific person's review style, architectural instincts, or domain heuristics as a callable slash-command mid-session.

## 10. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 72207 (+3640 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP server that gives AI agents structured access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, RSS, and arbitrary web pages — no paid APIs required, with built-in HTML cleaning and platform-specific anti-block handling.

**Why now:** Claude Code's June 2025 MCP support and Cursor's growing agent-mode adoption have created immediate demand for drop-in internet-read tools that don't require per-platform API credentials or scraper maintenance.

**Build with it:** Register Agent Reach as an MCP server in your `claude_desktop_config.json` or Cursor MCP settings, then invoke tools like `twitter_search`, `reddit_post`, or `youtube_transcript` directly from agent prompts to ground research or summarization workflows in live web content.
