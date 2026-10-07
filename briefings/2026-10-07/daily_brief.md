# AI Tastemakers — Daily Brief — 2026-10-07

_Ranking: delta_7d · 10 repos · generated 2026-10-07T19:19:39.168Z_


## 1. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 93464 (+1966 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste Skill is a collection of portable agent skills (layout, typography, motion, spacing) plus image-generation prompts for reference boards that you feed to Codex, Cursor, or Claude Code to stop them producing generic boilerplate UIs.

**Why now:** The repo is pulling nearly 2,000 stars this week, coinciding with the team shipping TasteCode — a companion desktop workspace that wraps Codex, Claude Code, and Grok with a built-in design agent for visual UI review.

**Build with it:** Drop the skill files into your Codex or Claude Code project context and use the included image-generation prompts to produce a reference board that the coding agent uses as a visual brief before writing any component code.

## 2. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 124621 (+1880 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphify, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—including docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using local, deterministic AST parsing via tree-sitter, with every graph edge explicitly explained and no vector store required.

**Why now:** The repo gained 1,880 stars this week and ships as a native `/graphify` skill for Claude Code, Cursor, Codex, and Gemini CLI—all four platforms that developers are actively integrating agentic coding workflows into right now.

**Build with it:** Add the Graphify MCP server (listed on Smithery) to your Cursor or Claude Code config and query your repo's call graph directly from the chat interface to answer "what calls this function" questions without leaving your editor.

## 3. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 251896 (+1604 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving AI agent with a built-in learning loop that creates and refines skills from experience, searches past conversations via FTS5, and runs across Telegram, Discord, Slack, and seven terminal backends including Modal and Daytona for serverless persistence.

**Why now:** The repo crossed 250k stars this week with 1,600+ added in seven days, signaling a sharp spike in builder interest around its cloud-portable, model-agnostic architecture.

**Build with it:** Point it at your own OpenAI-compatible endpoint using `hermes model`, then wire a Telegram gateway to a Modal backend so the agent hibernates when idle and wakes on demand — validating the serverless persistence loop without dedicated infrastructure.

## 4. lexmount/moli

https://github.com/lexmount/moli · ★ 12301 (+9642 this week) · ai-agents, ai-tools, browser, browser-automation, cloud-browser, kitesurf, playwright, puppeteer, rust, servo, web-crawler, web-crawling, web-scraper, web-scraping

**What it does:** Moli is a headless browser built in Rust for AI agents, offering on-demand layout and rendering with CLI, CDP, WebDriver Classic, and WebDriver BiDi interfaces for fetching, extracting, and automating web pages.

**Why now:** The repo gained 9,642 stars in a single week, signaling a sharp spike in builder attention that makes this an early-mover moment before the tooling ecosystem around it consolidates.

**Build with it:** Point an existing AI agent at the `moli-webfetch` skill (hosted under `/skills` in the repo) to replace Playwright-based fetch steps with a lighter Rust-native binary via the `moli fetch --dump semantic_tree_text` CLI command.

## 5. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 157467 (+8524 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a single prompt (`SKILL.md`) that installs into AI coding agents to make them default to deleting or skipping code rather than writing it, measurably cutting token usage and cost in benchmarked Claude Code sessions.

**Why now:** The repo gained 8,524 stars this week, signaling a rapid community discovery moment and making it a live reference point for prompt-engineering discussions around agentic coding cost reduction.

**Build with it:** Drop it into Claude Code via `/plugin install ponytail@ponytail` and run it against a feature branch to see how many lines your agent eliminates before touching anything new.

## 6. morluto/rea

https://github.com/morluto/rea · ★ 13819 (+8506 this week) · agent-skills, ai-agent-tools, ai-agents, binary-analysis, cli, coding-agents, cordis, ctf, decompiler, disassembler, dsh, dsh-plugin, ghidra, hopper, mcp, mcp-server, model-context-protocol, reverse-engineering, reverse-engineering-tools, static-analysis

**What it does:** REA is an MCP server that connects AI agents to reverse-engineering tools (Hopper, Ghidra, static JS analysis) so they can inspect native binaries, Electron apps, and .NET assemblies without source code.

**Why now:** The repo gained 8,506 stars this week, signaling a rapid surge in builder interest around agent-driven binary analysis as MCP tooling matures.

**Build with it:** Run `npx rea-agents setup`, register it with your coding agent, and point it at a closed-source app to extract and replicate a specific feature's behavior into your own codebase.

## 7. DuarteSantos8/openGym <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/DuarteSantos8/openGym · ★ 6683 (+1265 this week) · bodyweight, docker, fitness, fitness-tracker, gym, health, mcp, nodejs, passkeys, progressive-web-applications, pwa, react, self-hosted, self-hosting, vite, webauthn, weightlifting, workout-tracker

**What it does:** openGym is a self-hosted PWA (with Android APK) for planning weekly gym routines, running guided workouts, and logging sets and body weight — backed by 1,324 exercises with animated demos, passkey auth, and offline sync via a single `docker compose up`.

**Why now:** The repo gained 1,265 stars this week, signaling a sharp spike in community discovery that makes this a timely moment to evaluate it before the noise settles.

**Build with it:** Fork the repo, load one of the four starter plans (Push/Pull/Legs, Upper/Lower, Full Body, 5×5) via the routine editor, and import existing history from FitNotes, Strong, or Hevy to validate the import pipeline against your own data.

## 8. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 93117 (+6685 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) read and search access to Twitter, Reddit, YouTube, Bilibili, XiaoHongShu, GitHub, and arbitrary web pages — no paid APIs, no per-platform setup.

**Why now:** The repo hit GitHub Trending #1 of the day this week, accumulating 6,685 stars in seven days, signaling a fast-moving window to build on it before the ecosystem fragments into competing solutions.

**Build with it:** Drop it into a Cursor or Claude Code session via its MCP integration and immediately prompt your agent to summarize YouTube transcripts or pull Reddit threads as grounded context for research tasks.

## 9. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 274802 (+4707 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness system that layers skills, memory, security, and research-first workflows onto AI coding agents like Claude Code, Codex, Cursor, and Opencode.

**Why now:** The repo is trending this week with nearly 5,000 new stars, coinciding with active developer interest in structured harnesses as Claude Code and Codex usage accelerates in production workflows.

**Build with it:** Drop the `ecc-universal` npm package into an existing Claude Code setup to immediately add persistent memory and instinct layers to your agent sessions.

## 10. miuuyy/codex-chatgpt-web

https://github.com/miuuyy/codex-chatgpt-web · ★ 13649 (+652 this week) · chatgpt, chatgpt-pro, codex, free-ai, mcp, openai, playwright, quickstart, responses-api, typescript

**What it does:** codex-chatgpt-web is a desktop launcher that injects ChatGPT Web models—including Pro tiers—into Codex's native model picker via an embedded browser and MCP bridge, routing requests through your ChatGPT account's separate usage limits instead of your Codex quota.

**Why now:** The repo gained 652 stars this week, signaling a surge of interest likely tied to builders hitting Codex quota ceilings and looking for workarounds using existing ChatGPT Pro subscriptions.

**Build with it:** Enable Full harness mode in the launcher's MCP settings to give a ChatGPT Web session direct read/write access to your Codex task's files and terminal, then swap to a `(Web)` model entry in Codex's picker to validate tool calls running against your codebase without burning API quota.
