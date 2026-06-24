# AI Tastemakers — Daily Brief — 2026-06-24

_Ranking: delta_7d · 10 repos · generated 2026-06-24T13:57:58.984Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 54072 (+32269 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code plugin that injects a "laziest senior dev" mindset into AI coding agents, pushing them to delete or skip code rather than generate it—producing an average 54% fewer lines of code while maintaining full safety guardrails.

**Why now:** Claude Code's agent skills ecosystem is maturing fast, and this week's +32K stars signal that developers are actively searching for ways to cut the token waste and bloat that comes with agentic coding sessions—20% cheaper and 27% faster on real benchmarks.

**Build with it:** Drop ponytail into your Claude Code or Cursor workflow to ship leaner features by default, or fork the benchmark harness to measure how much your own codebase shrinks when an agent is forced to justify every line it writes.

## 2. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 13825 (+9932 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that parses any codebase into a persistent knowledge graph using tree-sitter AST analysis across 158 languages, answering structural queries about functions, call chains, classes, and HTTP routes in under 1ms with zero dependencies.

**Why now:** The repo surged nearly 10,000 stars this week, signaling rapid adoption across major AI coding agents (Cursor, Claude Code, Windsurf, Gemini CLI, Codex), and a backing arXiv paper demonstrates 83% answer quality at 10× fewer tokens than file-by-file exploration.

**Build with it:** Drop this into any AI coding agent to give it persistent, queryable memory of a large monorepo or multi-service codebase — enabling agents to trace cross-service call chains, map HTTP routes to handlers, or answer architectural questions without burning context on raw file reads.

## 3. microsoft/markitdown <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/microsoft/markitdown · ★ 158564 (+4048 this week) · autogen, autogen-extension, langchain, markdown, microsoft-office, openai, pdf

**What it does:** MarkItDown is a Python library that converts PDFs, Word docs, PowerPoints, Excel files, images, audio, HTML, and more into clean Markdown optimized for LLM ingestion, preserving headings, tables, and links.

**Why now:** It crossed 158,000 GitHub stars with 4,000 added this week alone, signaling rapid community adoption and active maintenance momentum that makes it a safe dependency bet right now.

**Build with it:** Drop it into a document ingestion pipeline to feed enterprise files into a RAG system or AutoGen agent—one `markitdown path-to-file.pdf` call replaces custom parsers for a dozen file types.

## 4. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 39349 (+7680 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents authenticated, structured access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more—routing around paywalled APIs and platform blocks using free or cookie-based backends, with a single install command you paste to your agent.

**Why now:** It gained 7,680 stars this week and hit GitHub Trending #1, driven by developers frustrated that LLM agents can reason but can't reliably read the live web without expensive API keys or brittle scrapers.

**Build with it:** Wire Agent Reach into a Claude Code or Cursor workflow to build an agent that monitors Twitter sentiment, summarizes Reddit threads, and pulls YouTube transcripts on a research topic—then pipe the output into your own summarization or alerting pipeline, all without touching a paid API.

## 5. calesthio/OpenMontage <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/calesthio/OpenMontage · ★ 18037 (+3659 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that gives AI coding assistants 12 pipelines and 52 tools to handle scripting, asset generation (images, motion clips, TTS), editing, and final composition from a single plain-language prompt—producing real motion-clip videos, not just animated slideshows.

**Why now:** It hit #1 on GitHub Trending this week with 3,659 stars in seven days, surfacing at the exact moment text-to-video models (Kling v3, Veo) and multimodal coding agents have become capable enough to stitch into a coherent production pipeline.

**Build with it:** Drop it into Cursor or Claude and automate a full video content workflow—generate product ads for under a dollar, spin up animated shorts with word-level captions, or build a stock-footage documentary pipeline that pulls real motion clips from open archives and renders a finished cut without touching an editor.

## 6. palmier-io/palmier-pro

https://github.com/palmier-io/palmier-pro · ★ 8726 (+7228 this week) · ai-video, claude, macos, mcp, seedance2, swift, video-editor

**What it does:** Palmier Pro is an open-source macOS video editor built in Swift that lets you and AI agents edit the same timeline together, with built-in generative video/image models (Seedance, Kling) and an MCP server exposing editor controls at `localhost:19789`.

**Why now:** It spiked 7,228 stars this week, likely driven by macOS 26 Tahoe previews and growing demand for agent-native creative tools that go beyond chat interfaces into real application state.

**Build with it:** Connect Claude Code or Cursor to the MCP server and script timeline edits programmatically—auto-cut footage, insert AI-generated clips, or build a pipeline that takes a transcript and assembles a rough cut without touching the GUI.

## 7. tw93/Pake

https://github.com/tw93/Pake · ★ 57250 (+6717 this week) · chatgpt, claude, desktop, gemini, hight-performance, linux, macos, no-electron, package, rust, tauri, windows, youtube

**What it does:** Pake is a Rust/Tauri-based CLI tool that wraps any URL into a native desktop app for macOS, Windows, and Linux, producing installers under 10MB — roughly 20x smaller than Electron equivalents.

**Why now:** It gained 6,717 stars this week, likely driven by builders packaging AI interfaces like DeepSeek, Grok, Claude, and Gemini into lightweight native apps as an alternative to bloated Electron wrappers.

**Build with it:** Run `pake <url>` to ship a polished desktop client for any internal tool, SaaS product, or AI chat interface — with custom icons, keyboard shortcuts, and injected CSS — without writing a line of Rust.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 201662 (+6565 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent framework from Nous Research that builds persistent skills from experience, maintains cross-session memory, and runs across Telegram, Discord, Slack, and CLI from a single process against any LLM backend.

**Why now:** The project gained 6,565 stars this week, signaling a surge of builder interest, and its model-agnostic design means you can immediately plug in newly released models from Kimi, MiniMax, or NVIDIA Nemotron without touching your code.

**Build with it:** Deploy a personal coding assistant on a $5 VPS that learns your codebase conventions over time, spawns parallel subagents for multi-file refactors, and delivers nightly summaries to your Telegram — all running serverless on Modal when idle.

## 9. JuliusBrussee/caveman <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/JuliusBrussee/caveman · ★ 76448 (+3028 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a Claude Code skill/plugin that forces AI agents to respond in stripped-down, telegraphic language, cutting output tokens by ~75% while preserving full technical accuracy across multiple verbosity levels (lite, full, ultra, wenyan).

**Why now:** It's trending at 76k stars with 3k added this week, likely riding the wave of developers hitting Anthropic API cost ceilings and looking for practical ways to reduce token spend without switching models or degrading output quality.

**Build with it:** Drop the caveman CLAUDE.md skill into any project using Claude Code, Cursor, or Windsurf to immediately slash inference costs on long agentic coding sessions—especially useful if you're building multi-step autonomous workflows where verbose responses compound into serious bills.

## 10. bytedance/deer-flow <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/bytedance/deer-flow · ★ 74332 (+3021 this week) · agent, agentic, agentic-framework, agentic-workflow, ai, ai-agents, deep-research, harness, langchain, langgraph, langmanus, llm, multi-agent, nodejs, podcast, python, superagent, typescript

**What it does:** DeerFlow is an open-source super agent harness that orchestrates sub-agents, sandboxes, memory, and extensible skills to autonomously handle long-horizon tasks—research, coding, and content creation—that can run for minutes to hours.

**Why now:** DeerFlow 2.0 just launched as a ground-up rewrite, hitting #1 on GitHub Trending this week with 3,000+ new stars, and ships with fresh integrations including Claude Code and BytePlus InfoQuest for intelligent search and crawling.

**Build with it:** Wire it up with DeepSeek v3.2 or Kimi 2.5, drop in custom MCP servers or skills, and ship a self-directed research or coding agent that handles multi-step workflows—report generation, live code execution in sandboxes, and delivery via IM channels—without babysitting every step.
