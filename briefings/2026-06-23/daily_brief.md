# AI Tastemakers — Daily Brief — 2026-06-23

_Ranking: delta_7d · 10 repos · generated 2026-06-23T14:04:38.461Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 51537 (+38365 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt/skill layer that makes AI coding agents default to the simplest possible solution — native browser inputs instead of npm packages, one line instead of fifty — while preserving safety guardrails that bare "write less code" prompts drop.
**Why now:** AI coding agents are trending toward over-building by default, and this week's +38k GitHub stars suggest developers are actively looking for the corrective; the benchmark methodology also just got a credible agentic upgrade over the earlier single-shot numbers.
**Build with it:** Drop the skill into your Claude Code or Cursor setup and use it as a baseline constraint layer for any greenfield tool, internal dashboard, or hackathon project where you want the agent to reach for `<input type="date">` before it reaches for flatpickr.

## 2. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 12422 (+8873 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that parses any codebase into a persistent knowledge graph using tree-sitter AST analysis across 158 languages, answering structural queries (functions, call chains, HTTP routes, cross-service links) in under 1ms with zero dependencies.

**Why now:** The repo gained nearly 9,000 stars this week, signaling rapid adoption across AI coding agents like Cursor, Claude Code, and Windsurf — and its accompanying arXiv paper benchmarks show 10× fewer tokens and 2.1× fewer tool calls versus file-by-file exploration, making it a credible alternative to naive RAG for agentic coding.

**Build with it:** Drop it into any agent's MCP config and build context-aware coding assistants that navigate large monorepos or multi-service backends without burning token budgets — particularly useful for agents that need to trace call chains, resolve types, or map HTTP routes across a codebase they've never seen.

## 3. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 38392 (+8725 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) the ability to read and search Twitter, Reddit, YouTube, GitHub, Bilibili, and Xiaohongshu without paying for APIs, by routing through free backends and handling auth, cookies, and anti-bot measures automatically.

**Why now:** The project jumped 8,725 stars this week, likely driven by growing frustration with AI agents that can reason but can't browse—and a concrete recent example where Bilibili broke yt-dlp and Agent Reach silently switched to bili-cli with zero user action required.

**Build with it:** Wire Agent Reach into your Claude Code or Cursor workflow as an MCP tool to let your agent autonomously pull Reddit threads, YouTube transcripts, or Twitter sentiment in real time—useful for research assistants, competitive monitoring bots, or any agent that needs live web context without a $500/month API bill.

## 4. affaan-m/ECC <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/affaan-m/ECC · ★ 220238 (+4297 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness operating system that layers skills, memory, instincts, and security scanning on top of AI coding agents like Claude Code, Codex, and Cursor, giving them persistent context and optimized behavior across sessions.

**Why now:** The repo jumped over 4,000 stars this week, signaling a surge in developers hitting the limits of vanilla agent setups and actively looking for structured systems to make agentic workflows production-grade.

**Build with it:** Drop ECC into an existing Claude Code or Cursor workflow to add cross-session memory and security scanning, or use its multi-harness architecture as a foundation for building agent pipelines that coordinate work across multiple AI coding tools simultaneously.

## 5. palmier-io/palmier-pro

https://github.com/palmier-io/palmier-pro · ★ 8214 (+6716 this week) · ai-video, claude, macos, mcp, seedance2, swift, video-editor

**What it does:** Palmier Pro is an open-source macOS video editor built in Swift that lets you and AI agents collaborate directly inside a timeline, with built-in generative video/image models (Seedance, Kling) and an MCP server for connecting Claude, Codex, or Cursor.

**Why now:** It gained 6,716 stars this week and targets macOS 26 (Tahoe), which Apple just announced at WWDC — making it the first serious open-source video editor positioned for that platform from day one.

**Build with it:** Wire Claude Code to the MCP endpoint and script automated video edits — cuts, clip arrangements, generative inserts — entirely from the terminal, or fork the Swift codebase to add custom timeline tools that AI agents can call directly.

## 6. mvanhorn/last30days-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/mvanhorn/last30days-skill · ★ 46000 (+3338 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** `/last30days` is a Python-based AI agent skill that runs parallel searches across Reddit, X, YouTube, HN, TikTok, Polymarket, and the web, then scores and synthesizes results by real engagement signals—upvotes, likes, and prediction market odds—rather than editorial ranking.

**Why now:** It hit #1 on GitHub Trending this week with 3,338 stars in seven days, driven by a moment where every major AI has partial platform access but none has all of them—this skill bridges that gap using bring-your-own-keys auth across walled gardens.

**Build with it:** Drop it into Claude Code, Codex, or any of 50+ agent hosts with one command and wire it into a sales intel tool, competitive research pipeline, or pre-meeting briefing agent that surfaces what someone is actually doing this month rather than what their LinkedIn said last year.

## 7. tw93/Pake

https://github.com/tw93/Pake · ★ 56975 (+6477 this week) · chatgpt, claude, desktop, gemini, hight-performance, linux, macos, no-electron, package, rust, tauri, windows, youtube

**What it does:** Pake is a Rust/Tauri-based CLI tool that wraps any URL into a native desktop app for macOS, Windows, and Linux, producing installers under 10MB—roughly 20x smaller than Electron equivalents.

**Why now:** The project gained 6,477 stars this week, signaling a surge of developer interest likely driven by demand for lightweight desktop wrappers around AI tools like DeepSeek, Grok, and Claude.

**Build with it:** Run `pake <url>` to ship a branded, offline-capable desktop client for any internal tool, SaaS product, or AI chat interface—without writing a line of Electron or native UI code.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 200533 (+6328 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent framework from Nous Research that builds persistent memory, creates and refines reusable skills from experience, and runs across Telegram, Discord, CLI, and cloud backends — all switchable between 200+ models with no code changes.

**Why now:** The project pulled 6,328 stars this week alone, signaling strong community momentum, and its compatibility with the open agentskills.io standard makes it a timely foundation as agent interoperability norms are actively being established.

**Build with it:** Deploy a personal coding or research agent on a $5 VPS that learns your workflows over time, schedules nightly summaries to Telegram, and delegates parallel subtasks to isolated subagents — all without touching the model provider or infrastructure layer.

## 9. rtk-ai/rtk <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/rtk-ai/rtk · ★ 65292 (+2779 this week) · agentic-coding, ai-coding, anthropic, claude-code, cli, command-line-tool, cost-reduction, developer-tools, llm, open-source, productivity, rust, token-optimization

**What it does:** RTK is a Rust CLI proxy that intercepts commands like `git diff`, `cargo test`, and `grep` and compresses their output before it hits your LLM context window, cutting token consumption by 60–90% with under 10ms overhead.

**Why now:** It crossed 65K GitHub stars this week with 2,779 new stars, signaling rapid adoption at the exact moment AI coding agents like Claude Code are becoming daily drivers and API costs are a real friction point for teams.

**Build with it:** Drop RTK into any Claude Code or agentic coding workflow to slash per-session API costs, or build on top of it to create cost-aware tooling—such as a dashboard that tracks token burn per command across a dev team.

## 10. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 106925 (+5385 this week) · ai-tools, claude-code, codex, desktop-app, hermes, hermes-agent, mcp, minimax, omo, open-source, openclaw, openclaw-ui, opencode, provider-management, rust, skills, skills-management, tauri, typescript, wsl-support

**What it does:** CC Switch is a cross-platform Tauri desktop app that lets you manage API keys, providers, and configuration across Claude Code, Codex, Gemini CLI, OpenCode, and other AI coding agents from a single GUI instead of manually editing config files per tool.

**Why now:** It gained 5,385 GitHub stars this week, signaling rapid adoption as developers juggle an expanding roster of competing AI coding agents and need a unified way to switch between them without context-switching overhead.

**Build with it:** Fork it to add provider support for a new agent you're shipping, or wire its MCP integration into your own Tauri app to handle multi-provider credential management without building that layer from scratch.
