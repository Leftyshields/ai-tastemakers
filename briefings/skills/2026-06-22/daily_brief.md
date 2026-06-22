# Skill Tastemakers — Daily Brief — 2026-06-22

_Ranking: delta_7d · 10 repos · generated 2026-06-22T16:09:02.099Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 48924 (+35747 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin that injects a "laziest senior dev" heuristic into AI coding agents (Claude Code, Cursor, and 13 others), steering them toward native browser primitives and minimal diffs instead of npm installs and wrapper components.
**Why now:** The agentic coding wave is peaking this week—Claude Code sessions and Cursor usage are compounding daily, and the default agent behavior is to over-build, meaning every autonomous coding run is quietly bloating codebases and burning tokens.
**Build with it:** Drop the skill file into your Claude Code or Cursor config, point it at a legacy frontend, and let it systematically replace custom date pickers, modals, and form components with single `<input>` lines—then benchmark the diff against your current agent setup using the included reproducible harness.

## 2. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 37649 (+7979 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP toolkit that gives AI agents free, zero-API-key access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more by routing around platform restrictions using browser cookies, alternative scrapers, and fallback backends.

**Why now:** The project gained nearly 8,000 stars this week and hit GitHub Trending #1, coinciding with a concrete real-world fix where yt-dlp's Bilibili scraper was blocked by platform risk controls and Agent Reach silently rerouted to bili-cli with no user action required.

**Build with it:** Wire it into Claude Code or Cursor as an MCP server to give your coding agent live internet research capabilities—pull Reddit threads for bug reports, scrape competitor Twitter sentiment, or summarize YouTube tutorials without writing a single scraper yourself.

## 3. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 11162 (+7613 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that parses any codebase into a persistent knowledge graph using tree-sitter AST analysis across 158 languages, answering structural queries (call chains, HTTP routes, cross-service links) in under 1ms with zero dependencies.

**Why now:** It gained over 7,600 GitHub stars this week, signaling rapid adoption across the AI coding agent ecosystem, and it plugs directly into 11 agents including Cursor, Claude Code, Codex, and Windsurf as a drop-in MCP server.

**Build with it:** Wire it into your AI coding agent to replace expensive file-by-file context loading — the benchmarks show 10× fewer tokens and 2.1× fewer tool calls, so you could build a context-efficient coding assistant that navigates large monorepos or multi-service architectures without blowing through context windows.

## 4. tw93/Pake

https://github.com/tw93/Pake · ★ 56665 (+6167 this week) · chatgpt, claude, desktop, gemini, hight-performance, linux, macos, no-electron, package, rust, tauri, windows, youtube

**What it does:** Pake is a Rust/Tauri CLI tool that wraps any URL into a native desktop app for macOS, Windows, and Linux, producing installers under 10MB — roughly 20x smaller than Electron equivalents.

**Why now:** The project gained 6,167 stars this week, signaling strong developer interest in lightweight alternatives to Electron for shipping AI tools like Claude, Gemini, and DeepSeek as desktop apps.

**Build with it:** Run a single `pake` CLI command to turn any internal tool, SaaS dashboard, or AI chat interface into a distributable native app with custom icons, keyboard shortcuts, and ad removal — no Rust knowledge required.

## 5. mvanhorn/last30days-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/mvanhorn/last30days-skill · ★ 45683 (+3021 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** `/last30days` is a Python AI agent skill that searches Reddit, X, YouTube, TikTok, HN, Polymarket, and the web in parallel, then scores and synthesizes results by real engagement signals (upvotes, likes, real-money prediction markets) rather than editorial ranking.

**Why now:** It hit #1 on GitHub Trending this week with 3,000+ new stars, coinciding with the Claude Code marketplace launch that makes it a one-command install for the fast-growing Claude Code user base.

**Build with it:** Drop it into any agent stack to power meeting-prep tools, competitor intelligence dashboards, or trend-detection pipelines that need fresh, crowd-validated signal from walled-garden platforms your LLM can't natively access.

## 6. Egonex-AI/Understand-Anything

https://github.com/Egonex-AI/Understand-Anything · ★ 66009 (+5897 this week) · antigravity-skills, business-knowledge, claude-code, claude-skills, codebase-analysis, codex, codex-skills, developer-tools-ai-agent, gemini-cli-skills, karpathy-llm-wiki, knowledge-base, knowledge-graph, memory, opencode-skills, pi-agent, understandcode, vibe-coding

**What it does:** Understand Anything analyzes any codebase with a multi-agent pipeline and renders every file, function, class, and dependency as an interactive, searchable knowledge graph you can explore visually or query in natural language. It integrates directly with Claude Code, Codex, Gemini CLI, Copilot, and other AI coding tools as a plugin.

**Why now:** The repo hit 66,000 stars with nearly 6,000 added this week, signaling a breakout moment as developer teams rush to onboard AI agents onto large, unfamiliar codebases and need structured context layers beyond raw file dumps.

**Build with it:** Drop this into your AI agent's context pipeline to give it a pre-built semantic map of any repo before it writes a single line — useful for building automated code reviewers, onboarding tools, or dependency-aware refactoring agents that need to reason about structure, not just syntax.

## 7. JuliusBrussee/caveman <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/JuliusBrussee/caveman · ★ 75748 (+2894 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a Claude Code skill that forces AI agents to respond in stripped-down, telegraphic language, cutting output tokens by ~75% while preserving technical accuracy across multiple compression levels (lite, full, ultra) and languages.

**Why now:** It gained nearly 3,000 stars this week, signaling that token costs and response latency are real pain points for developers running AI agents at scale or in tight feedback loops.

**Build with it:** Drop the skill into any Claude Code, Cursor, or Copilot workflow to cut API costs on high-volume agentic pipelines, or fork the prompt logic to build a token-budget enforcement layer for your own LLM-powered tooling.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 199717 (+5509 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent framework from Nous Research that creates and refines skills from experience, maintains persistent memory across sessions, and runs on any model or infrastructure—from a $5 VPS to serverless GPU clusters.

**Why now:** The project crossed 199,717 stars with 5,509 added this week, signaling a sharp surge in developer attention, and its multi-platform messaging support and model-agnostic design make it a timely alternative as Claude Code and Codex lock-in concerns grow louder.

**Build with it:** Wire it to your own backend via OpenRouter or a local endpoint, then use its skill system and cron scheduler to ship an autonomous agent that monitors a codebase, files issues, and reports findings to Telegram—without rewriting logic when you swap models.

## 9. palmier-io/palmier-pro

https://github.com/palmier-io/palmier-pro · ★ 6864 (+5365 this week) · ai-video, claude, macos, mcp, seedance2, swift, video-editor

**What it does:** Palmier Pro is an open-source macOS video editor built in Swift that exposes an MCP server, letting Claude, Cursor, or Codex agents directly manipulate a video timeline alongside a human editor.

**Why now:** It gained 5,365 stars this week, coinciding with macOS 26 (Tahoe) developer previews and the rapid adoption of MCP as a standard for agent-to-app communication.

**Build with it:** Wire Claude Code to the local MCP endpoint and script automated video assembly pipelines—cut clips, arrange sequences, and trigger AI generation from Seedance or Kling without touching the UI.

## 10. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 65251 (+5157 this week) · agent-skills, antigravity, antigravity-ide, claude-code, cursor, skills

**What it does:** Agent Skills is a collection of production-grade slash commands (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`) that encode senior engineering workflows directly into AI coding agents like Claude Code and Cursor, enforcing quality gates at every phase of development.

**Why now:** The repo gained over 5,000 stars this week, coinciding with growing adoption of Claude Code and agentic coding tools where the gap between "it runs" and "it's production-ready" is becoming a real pain point for teams.

**Build with it:** Clone the skills into your Claude Code or Cursor setup and use `/build auto` to let an agent autonomously plan, implement, test, and commit a full feature slice — with human approval required only once upfront, and automatic pauses on failures.
