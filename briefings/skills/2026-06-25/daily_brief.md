# Skill Tastemakers — Daily Brief — 2026-06-25

_Ranking: delta_7d · 10 repos · generated 2026-06-25T13:59:46.209Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 57158 (+27700 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a plugin/skill for AI coding agents (Claude Code, Cursor, etc.) that installs a "laziest senior dev" heuristic, steering the agent toward using built-in browser primitives, deleting code, and reaching for stdlib before any library.

**Why now:** It gained 27,700 GitHub stars this week, surfacing as a practical counter to a well-known AI agent failure mode—over-building—with a reproducible benchmark showing 54% fewer lines of code and 20% lower cost on real FastAPI + React tasks.

**Build with it:** Drop the skill into your Claude Code or Cursor setup to reduce bloat on any greenfield or refactor project, or fork the benchmark harness to measure over-building tendencies in your own agent workflows.

## 2. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 14564 (+10112 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that parses any codebase into a persistent knowledge graph using tree-sitter AST analysis across 158 languages, answering structural queries about functions, call chains, and cross-file dependencies in under 1ms with zero external dependencies.

**Why now:** The project gained over 10,000 stars this week and pairs directly with the current wave of agentic coding tools — Cursor, Claude Code, Gemini CLI, Windsurf — giving agents a structured graph to navigate instead of burning tokens reading files one by one.

**Build with it:** Drop this into any AI coding agent setup to replace file-by-file context stuffing with sub-millisecond graph queries, then use the 14 MCP tools to build custom agents that reason about refactoring impact, trace HTTP routes across services, or generate architecture documentation from live code structure.

## 3. Leonxlnx/taste-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Leonxlnx/taste-skill · ★ 50755 (+4986 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste Skill is a set of portable agent skills (SKILL.md files) that inject opinionated design rules—layout, typography, motion, spacing—into AI coding agents like Codex, Cursor, and Claude Code to prevent them from producing generic, boilerplate-looking UIs.

**Why now:** It gained nearly 5,000 stars this week, signaling that developers are actively feeling the pain of AI-generated frontend slop and are ready to adopt lightweight, tool-agnostic guardrails rather than fix outputs by hand.

**Build with it:** Drop the skill into your Codex or Claude Code workflow via `npx skills add` and immediately get AI-generated interfaces with deliberate visual hierarchy—then extend the image-generation skills to produce reference boards that feed directly back into the same agent loop.

## 4. Kilo-Org/kilocode <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Kilo-Org/kilocode · ★ 24563 (+4385 this week) · ai, ai-age, ai-coding, ai-developer-tools, chatgpt, claude, cli, gemini, jetbrains, sonnet, vscode, vscode-extension

**What it does:** Kilo Code is an open source AI coding agent that runs inside VS Code, JetBrains, or the CLI, letting you access 500+ models (GPT-5.5, Claude, Gemini) at raw provider pricing with no markup or required API keys.

**Why now:** The project gained 4,385 stars this week, signaling rapid community momentum, and recently shipped native JetBrains support and a standalone CLI alongside its VS Code extension.

**Build with it:** Use Kilo as the agentic backbone for an internal dev tool—wire it to your own model provider via its open pricing model, embed it in a CI pipeline through the CLI, or fork the TypeScript codebase to customize agent behavior for a specific domain like infrastructure or data engineering.

## 5. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 40767 (+7989 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP toolkit that gives AI agents free, authenticated access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more — routing around paywalls and bot blocks through curated, maintained scraping backends.

**Why now:** It hit #1 on GitHub Trending this week with nearly 8,000 new stars, partly because it just patched a live breakage (yt-dlp blocked by Bilibili's anti-bot, swapped to bili-cli with zero user action required) — demonstrating exactly the maintenance model developers don't want to own themselves.

**Build with it:** Wire it into a Claude Code or Cursor agent to build a competitive intelligence tool that monitors Twitter sentiment, Reddit bug reports, and GitHub issues for any product — one install command, no API keys, no per-platform authentication headaches.

## 6. palmier-io/palmier-pro

https://github.com/palmier-io/palmier-pro · ★ 8915 (+7416 this week) · ai-video, claude, macos, mcp, seedance2, swift, video-editor

**What it does:** Palmier Pro is an open-source macOS video editor built in Swift that lets you and AI agents collaborate directly inside a timeline, with built-in generative video/image models (Seedance, Kling) and an MCP server that Claude, Codex, and Cursor can connect to at runtime.

**Why now:** It gained 7,400+ stars this week, signaling strong builder interest, and ships against macOS 26 (Tahoe) and the current wave of MCP-native agent tooling—making it a timely foundation for agent-driven media workflows.

**Build with it:** Fork the open-source editor and use the MCP server to let a Claude or Cursor agent autonomously cut footage, insert generated clips, and sequence a timeline from a plain-text prompt—essentially a programmable Premiere Pro for AI pipelines.

## 7. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 21441 (+7058 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that exposes 12 pipelines and 52 tools so an AI coding assistant can autonomously handle scripting, asset generation, voiceover, editing, and final render — producing real motion-clip videos, not just slideshows of stills.

**Why now:** It hit #1 on GitHub Trending this week with 7,000+ new stars, surfacing at the exact moment developers are actively wiring AI agents into creative workflows and need a production-ready, composable video backend to build on.

**Build with it:** Drop it behind a web form and let users describe a product ad or short film in plain text, then have the agent call Kling/Veo for motion, ElevenLabs for voice, and Remotion for composition — shipping a finished video for under $2 with zero manual asset work.

## 8. tw93/Pake

https://github.com/tw93/Pake · ★ 57520 (+6955 this week) · chatgpt, claude, desktop, gemini, hight-performance, linux, macos, no-electron, package, rust, tauri, windows, youtube

**What it does:** Pake wraps any webpage into a native desktop app using Rust and Tauri, producing installers under 10MB — roughly 20x smaller than Electron equivalents — with one CLI command.

**Why now:** The project spiked 6,955 stars this week, signaling strong developer interest in lightweight alternatives to Electron as AI web apps like DeepSeek, Grok, and Claude become daily-use tools worth wrapping natively.

**Build with it:** Package your internal web tool, SaaS dashboard, or AI chat interface into a shippable cross-platform desktop app in minutes — no Rust knowledge required, just a URL and an optional custom icon.

## 9. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 202769 (+6836 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent from Nous Research that builds skills from experience, maintains persistent memory across sessions, runs on any model provider, and deploys across platforms (Telegram, Discord, CLI) from a single codebase.

**Why now:** The repo crossed 202K stars with nearly 7K added this week, signaling a sharp surge in developer attention, and its multi-provider model switching makes it immediately relevant as builders evaluate alternatives to OpenAI Codex and Claude Code.

**Build with it:** Spin up a serverless agent on Modal or Daytona that monitors a GitHub repo, files issues from nightly audit crons, and delivers summaries to Slack — accumulating reusable skills across runs so each session starts smarter than the last.

## 10. JCodesMore/ai-website-cloner-template <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/JCodesMore/ai-website-cloner-template · ★ 20008 (+2880 this week) · ai, ai-agents, ai-tools, automation, boilerplate, claude, claude-code, clone, developer-tools, nextjs, react, reverse-engineering, shadcn-ui, skills, tailwindcss, template, typescript, web-scraping, website-clone

**What it does:** AI Website Cloner Template is a Next.js boilerplate that lets you point any AI coding agent at a URL and automatically reverse-engineer it into a clean TypeScript/Tailwind codebase through a single `/clone-website` command.

**Why now:** The repo crossed 20,000 stars with nearly 3,000 added this week, signaling rapid adoption at the moment Claude Opus 4.7 and competing CLI agents are mature enough to make multi-section parallel site reconstruction practical.

**Build with it:** Use it to rapidly prototype competitor-inspired redesigns, spin up pixel-close client mockups for faster approval cycles, or bootstrap a design system by extracting tokens from any live site you want to study.
