# AI Tastemakers — Daily Brief — 2026-08-17

_Ranking: delta_7d · 10 repos · generated 2026-08-17T13:51:42.565Z_


## 1. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 12873 (+8574 this week) · agent-skill, ai, c2pa, claude, provenance, synthid, watermark

**What it does:** A Python service plus agent skill that strips AI provenance marks from text and files — covering invisible Unicode, statistical token-sampling watermarks (SynthID-Text, Kirchenbauer-style), and C2PA/EXIF/XMP metadata across PNG, JPEG, PDF, DOCX, HTML, and more.

**Why now:** C2PA adoption is accelerating across Adobe, Microsoft, and browser vendors in 2025, and SynthID-Text watermarking shipped in Gemini's stack this year — making provenance stripping a live concern for anyone handling AI-assisted content at scale.

**Build with it:** Drop the skill into `.grok/skills/remove-ai-marks`, spin up `python3 service/scripts/server.py`, and wire `/remove-ai-marks` into your document publishing pipeline as a pre-export hygiene step to sanitize files before they leave your control.

## 2. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 49571 (+5679 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that exposes 1,200+ models across 340 providers through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and token compression (RTK + Caveman) that cuts usage by 15–95%.

**Why now:** The repo is trending at +5,679 stars this week, coinciding with heavy activity around Claude Code and OpenAI Codex CLI adoption — both tools OmniRoute explicitly supports via drop-in endpoint replacement, making it a timely answer to the rate-limit pain those tools surface in daily use.

**Build with it:** Point Claude Code or Cursor at OmniRoute's endpoint by swapping `ANTHROPIC_BASE_URL` or `OPENAI_BASE_URL` in your environment, then configure a fallback chain across free tiers (Gemini 2.5 Flash, GPT-4o mini, DeepSeek) so your coding session never hard-stops on a quota error.

## 3. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 77299 (+2819 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste Skill is a set of portable agent skills (markdown instruction files) that inject layout, typography, spacing, and motion guidelines into AI coding agents like Codex, Cursor, and Claude Code to suppress generic-looking UI output.

**Why now:** The repo gained 2,819 stars this week, coinciding with active discussion around "vibe coding" quality — a recognized gap where AI-generated frontends converge on the same Bootstrap-adjacent aesthetic, making taste-level constraints a practical differentiator.

**Build with it:** Drop the `.md` skill files into your Claude Code or Cursor project context, then pair with ChatGPT Images to generate a reference board that the agent uses as a visual spec — giving your AI a concrete design target instead of free-associating from training data.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 104535 (+5416 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code skill/agent plugin that injects a "laziest senior dev" heuristic into AI coding agents, pushing them to reach for `<input type="date">` instead of installing flatpickr — cutting generated LOC by ~54% on average across real agentic sessions on a FastAPI + React codebase.

**Why now:** The benchmark dropped this week showing ponytail beats competing prompting strategies ("caveman," "yagni-oneliner") on every metric simultaneously — fewer lines, lower token cost, faster runs, and no safety regressions — giving teams a concrete, reproducible result to point at when justifying agent guardrails.

**Build with it:** Drop the skill into an existing Claude Code workflow via `@dietrichgebert/ponytail` on npm, wire it to your `.claude` config or cursor rules file, and let it gate feature tickets before your agent touches the diff — especially effective on UI tasks where agents habitually over-build.

## 5. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 48537 (+2314 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source Python framework that wires 100+ tools and 700+ agent skill files into 12 video production pipelines, letting an AI coding assistant (Cursor, Copilot, Claude) handle scripting, asset generation via Flux/Stable Diffusion, voiceover via ElevenLabs, and final composition via Remotion and FFmpeg from a single plain-language prompt.

**Why now:** The repo hit #1 on GitHub Trending this week with 2,314 stars added, landing the same week Remotion 4.0 shipped updated composition APIs that several of OpenMontage's pipelines directly target.

**Build with it:** Drop `AGENT_GUIDE.md` into your Cursor or Claude project context, point an existing pipeline config at Atlas Cloud's unified inference API to swap model providers without touching pipeline code, and extend with a custom pipeline folder for your own asset style.

## 6. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 168430 (+4547 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is an API that scrapes, searches, and crawls websites at scale, returning clean Markdown, structured JSON, or screenshots from JS-heavy pages without proxy configuration.

**Why now:** Firecrawl gained 4,547 stars this week alongside the launch of its MCP (Model Context Protocol) server integration, making it directly connectable to Claude and other MCP-compatible agents with a single command.

**Build with it:** Drop the Firecrawl MCP server into your Claude Desktop config to give any agent live web scraping and search as a tool call, or pipe its `/scrape` endpoint into a LangChain retrieval chain to ground RAG responses in fresh page content.

## 7. can1357/oh-my-pi

https://github.com/can1357/oh-my-pi · ★ 25384 (+2192 this week) · ai-agent, ai-coding-agent, anthropic, bun, claude, cli, coding-assistant, llm, mcp, multi-provider, openai, rust, terminal, tui, typescript

**What it does:** Oh-my-pi is a terminal-based AI coding agent with 60+ LLM providers, 31 built-in tools, LSP/DAP integration, and hash-anchored file edits — all wired into a Rust/TypeScript TUI.

**Why now:** PRs are temporarily open to everyone this week — the previously required vouch system is lifted — making it an unusually accessible moment to contribute to a fast-moving agent codebase.

**Build with it:** Wire it into an existing dev workflow via its MCP support and `programs.omp` Home Manager module, then extend it by submitting a new tool against the 31-tool harness while the open-PR window is active.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 231828 (+4049 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving AI agent from Nous Research that creates and refines skills from past interactions, maintains cross-session memory, and runs on arbitrary infrastructure (local, Docker, SSH, Modal, Vercel Sandbox) while connecting to any LLM provider via a single `hermes model` switch.

**Why now:** The project crossed 231K stars with 4,049 added this week, a spike consistent with broader builder attention on open, self-hosted alternatives to Claude Code and Codex following OpenAI's and Anthropic's recent agentic product pushes.

**Build with it:** Wire it to your existing Telegram or Discord bot token via the gateway process, point it at a Modal serverless backend so it costs nothing when idle, and use the `agentskills.io`-compatible skill standard to share or import reusable tool behaviors across projects.

## 9. TencentCloud/TencentDB-Agent-Memory

https://github.com/TencentCloud/TencentDB-Agent-Memory · ★ 22519 (+3961 this week) · agent, ai-agent, embedding, llm, local-first, long-term-memory, memory, openclaw-plugin, vector-search

**What it does:** TencentDB Agent Memory is a self-hosted memory server that intercepts LLM API calls via a proxy and converts conversations, docs, and code into four structured memory types — Chat Memory, Skill, LLM-Wiki, and Code-Graph — shared across agents and team members without code changes.

**Why now:** The repo spiked to 22,519 stars with nearly 4,000 added this week, coinciding with broad developer frustration around stateless agents losing context across sessions — a pain point actively discussed in Claude Code and Codex user communities as those tools see heavy adoption.

**Build with it:** Point Claude Code or Codex at the included proxy by swapping the `ANTHROPIC_BASE_URL` or `OPENAI_BASE_URL` to `localhost:8125`, then use the Memory Hub panel at `localhost:8125` to inspect and govern what Skills and Code-Graph entries accumulate across your team's agent sessions.

## 10. holaboss-ai/holaOS

https://github.com/holaboss-ai/holaOS · ★ 8997 (+3504 this week) · agent, agent-harness, agent-os, agentic, ai, ai-agent, ai-agents, artificial-intelligence, claude-code, codex, electron, holaboss, holaos, llm, mcp, memory, model-context-protocol, runtime, typescript, workspace

**What it does:** holaOS is a local-first Electron desktop workspace that runs Claude Code, Codex, or its own built-in agent side-by-side, sharing a single durable memory store, file system, browser, and 100+ MCP-connected tool integrations across sessions.

**Why now:** The repo gained 3,504 stars this week, coinciding with the current wave of Claude Code and Codex CLI adoption — builders are actively hunting for a harness that lets them run both without maintaining separate contexts and key configurations for each.

**Build with it:** Fork the MCP integration layer to wire in a custom tool (database, internal API, or CI system) via the Model Context Protocol config surface, then let Claude Code and the holaOS agent share that tool automatically without duplicating setup per agent.
