# AI Tastemakers — Daily Brief — 2026-09-13

_Ranking: delta_7d · 10 repos · generated 2026-09-13T16:58:09.280Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 137136 (+8204 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt-engineering plugin for AI coding agents (Claude Code, Cursor, and ~18 others) that injects a YAGNI-enforcing "lazy senior dev" persona, steering agents toward minimal code solutions rather than over-built ones.

**Why now:** The repo is trending sharply this week (+8,204 stars), coinciding with heavy community discussion around Claude Code's agentic over-building behavior and the growing cost of unchecked token burn in long coding sessions.

**Build with it:** Drop the npm package `@dietrichgebert/ponytail` into your Claude Code or Cursor setup as a skill/plugin, then measure token and line-count deltas on your own codebase using the included benchmark scripts in `/benchmarks/`.

## 2. kepano/obsidian-skills

https://github.com/kepano/obsidian-skills · ★ 48265 (+8156 this week) · agents, agentskills, bases, claude, clawdbot, cli, codex, defuddle, hermes, jsoncanvas, markdown, md, obsidian, openclaw, opencode, skills

**What it does:** A collection of agent skills that teach AI coding agents (Claude Code, Codex, OpenCode) to read and write Obsidian-native formats — Obsidian Flavored Markdown, Bases, JSON Canvas, and CLI interactions — via the emerging Agent Skills specification.

**Why now:** The repo gained 8,000+ stars this week, coinciding with the Agent Skills specification gaining traction as a cross-agent standard and Obsidian's own CLI and Bases features reaching maturity.

**Build with it:** Drop the skills into `~/.claude` in your vault root, then wire Claude Code to automate note generation from CSV data via the `knap` skill or scrape and clean web content directly into your vault using the `defuddle` skill.

## 3. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 257560 (+6795 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness configuration layer that adds persistent memory, security (AgentShield), and workflow instincts to AI coding agents including Claude Code, Codex, Opencode, and Cursor via structured CLAUDE.md-style skill files and MCP integration.

**Why now:** Claude Code's rapid adoption as a terminal-native coding agent has surfaced a gap in reusable, shareable agent configuration—ECC directly fills that niche as Claude Code usage spikes following Anthropic's recent push into agentic developer tooling.

**Build with it:** Drop the `ecc-universal` npm package into any repo to inject pre-built agent skill sets and memory scaffolding, or wire `ecc-agentshield` as an MCP server to add security guardrails to any Claude Code or Cursor session.

## 4. coreyhaines31/marketingskills

https://github.com/coreyhaines31/marketingskills · ★ 49940 (+2593 this week) · claude, codex, marketing

**What it does:** A collection of markdown-based "skills" that give Claude Code, Codex, and other coding agents specialized marketing workflows covering CRO, SEO, copywriting, paid ads, and growth engineering — anchored by a `product-marketing` context file every other skill reads first.

**Why now:** The repo gained 2,593 stars this week, coinciding with growing adoption of Claude Code's custom instructions and the Agent Skills spec as a standard way to extend agent behavior with domain knowledge.

**Build with it:** Drop the skill markdown files into your project's agent context, point Claude Code at the `product-marketing` skill as a foundation, then invoke task-specific skills (e.g., CRO or SEO) to get framework-driven outputs wired to tools like Converly for server-side conversion tracking via its CLI and MCP integration.

## 5. heygen-com/hyperframes

https://github.com/heygen-com/hyperframes · ★ 49432 (+5115 this week) · ai, animation, ffmpeg, framework, gsap, html, mcp, puppeteer, rendering, typescript, video

**What it does:** HyperFrames is an open-source TypeScript framework that renders HTML, CSS, and GSAP-seekable animations into deterministic MP4 videos using Puppeteer for frame capture and FFmpeg for encoding.

**Why now:** The repo spiked 5,115 stars this week, coinciding with growing adoption of MCP-compatible agent tooling — HyperFrames ships an MCP skill set that lets Claude Code, Cursor, and Gemini CLI agents author and render video end-to-end without leaving the coding loop.

**Build with it:** Wire it into an AI coding agent via `npx hyperframes skills update`, then use the `/hyperframes` router skill to drive a full production loop — HTML authoring, animation timing, media layering, and final MP4 render — directly from natural-language prompts.

## 6. microsoft/markitdown

https://github.com/microsoft/markitdown · ★ 183508 (+5051 this week) · autogen, autogen-extension, langchain, markdown, microsoft-office, openai, pdf

**What it does:** MarkItDown is a Python library and CLI that converts PDFs, Office documents, images, audio, HTML, and other formats into Markdown optimized for LLM ingestion, preserving headings, tables, and lists while staying token-efficient.

**Why now:** The repo crossed 183,000 stars with 5,000+ added this week, coinciding with renewed community interest in document-to-LLM pipelines as RAG workflows become standard practice in production AI apps.

**Build with it:** Drop `markitdown[pdf,docx,pptx]` into a LangChain or AutoGen ingestion step—call `convert_local()` on uploaded files before chunking, replacing ad-hoc text-extraction glue with a single consistent Markdown output.

## 7. vastsa/PI-Desktop <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/vastsa/PI-Desktop · ★ 3266 (+2100 this week) · ai-agent, coding-agent, desktop-app, electron, global, i18n, local-first, mcp, pi, pi-agent, pi-desktop, plugins, react, rust, typescript

**What it does:** PI-Desktop is a local-first Electron + Rust desktop app that gives AI coding agents (via an "pi Agent Harness") their own workspace — managing projects, sessions, file diffs, permissions, and model routing without tying you to a single editor or cloud runtime.

**Why now:** The repo jumped 2,100 stars this week alongside a Product Hunt featured launch, signaling a fresh wave of builders evaluating standalone agent desktops as alternatives to editor-embedded tools like Claude Code and Codex.

**Build with it:** Wire in a custom MCP server or installable Plugin using the documented plugin-development surface to expose domain-specific tools (e.g., a database schema inspector or internal API caller) directly inside the agent's permission and diff review loop.

## 8. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 80321 (+1940 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP server that gives AI agents free, authenticated access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paid APIs, returning clean structured data instead of raw HTML.

**Why now:** The repo hit GitHub Trending #1 this week with +1,940 stars, coinciding with surging builder interest in grounding agentic workflows with live web data as Claude Code and Cursor-based agents become mainstream.

**Build with it:** Wire it into a Cursor or Claude Code project via its MCP config surface, then pipe platform-specific scrapers (e.g., `youtube-transcript`, `reddit-scraper`) directly into your agent's tool-call loop to answer research queries without leaving the IDE.

## 9. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 58231 (+1872 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source, agentic video production system that exposes 12 production pipelines and 700+ agent skill files so an AI coding assistant like Cursor or Claude can handle scripting, asset generation (Flux, Stable Diffusion, ElevenLabs TTS), and final composition via FFmpeg and Remotion.

**Why now:** The repo hit #1 on GitHub Trending this week with 1,872 stars added, surfacing it to a wide builder audience at the same moment agentic coding workflows are becoming a primary development pattern.

**Build with it:** Wire your own pipeline by dropping provider credentials into `docs/PROVIDERS.md`, then invoke one of the 12 named pipelines through your AI coding assistant using the `AGENT_GUIDE.md` skill files as the context layer — giving you a scriptable text-to-video workflow without building the orchestration from scratch.

## 10. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 65600 (+3703 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hostable TypeScript gateway that exposes 352 AI providers (150+ free tiers) behind a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman prompt compression claiming 15–95% token reduction.

**Why now:** The repo gained 3,703 stars this week, coinciding with Claude Code and OpenAI Codex CLI both gaining traction as terminal-native coding agents that accept a custom `OPENAI_BASE_URL`—making a free-tier fallback gateway immediately practical rather than theoretical.

**Build with it:** Point Claude Code or Codex CLI at OmniRoute's endpoint via `ANTHROPIC_BASE_URL` / `OPENAI_BASE_URL` env vars, configure a fallback chain across Gemini, DeepSeek, and Groq free tiers in the routing config, and let quota-aware routing handle rate-limit exhaustion automatically across your coding sessions.
