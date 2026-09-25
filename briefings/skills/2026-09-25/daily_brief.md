# Skill Tastemakers — Daily Brief — 2026-09-25

_Ranking: delta_7d · 10 repos · generated 2026-09-25T17:58:18.916Z_


## 1. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 248920 (+2087 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python AI agent with a closed learning loop — it creates and refines skills from experience, searches past sessions via FTS5, and runs across seven terminal backends (local, Docker, SSH, Modal, and others) with multi-platform messaging support.

**Why now:** A Hacker News thread this week flagged the launch of Hermes Agent's multi-agent capability, adding parallel subagent spawning to an already-shipping project.

**Build with it:** Point it at your own model endpoint via `hermes model` and schedule an unattended nightly task using the built-in cron scheduler with delivery to Telegram.

## 2. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 130598 (+1846 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** UI UX Pro Max is a Python-based AI skill that injects design intelligence into coding assistants (Cursor, Windsurf, Claude Code, Copilot, and others) via 192 reasoning rules and 79 searchable UI styles to generate professional UI/UX across React, Tailwind, HTML5, and mobile targets.

**Why now:** The repo gained 1,846 stars this week, signaling a current surge in builder adoption worth investigating before the pattern saturates.

**Build with it:** Install the `ui-ux-pro-max-cli` npm package and invoke a UI style by name inside your existing Cursor or Claude Code workflow to let the reasoning rules govern component output without changing your framework setup.

## 3. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 107833 (+1292 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a skill + reverse proxy for coding agents (Claude Code, Cursor, etc.) that rewrites system prompts to force caveman-style terse output, cutting token usage by ~65% with no measurable quality loss per JetBrains testing on 86 real tasks.

**Why now:** The HN post hit #1 with 904 points and 366 comments this week, and an Adobe Research paper (CAVEWOMAN) independently measured 1.4–3× cost reduction using the same approach.

**Build with it:** Drop it into any Claude Code workflow with `npx skills add JuliusBrussee/caveman -g` and immediately benchmark your per-session token spend before and after.

## 4. stablyai/orca

https://github.com/stablyai/orca · ★ 78144 (+6396 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile orchestration app that runs multiple coding agents (Codex, Claude Code, OpenCode, Pi) in parallel git worktrees, letting you fan one prompt across several agents and merge the best result.

**Why now:** The repo gained 6,396 stars this week, signaling a surge of builder interest coinciding with active parallel-agent workflows becoming practical via Claude Code and OpenCode reaching wider adoption.

**Build with it:** Point Orca at an existing git repo, split a single prompt across three worktrees each running a different agent, then diff the branches to pick and merge the winning implementation.

## 5. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 267349 (+5594 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness system that layers skills, memory, security, and research-first workflows onto AI coding agents like Claude Code, Codex, Cursor, and Opencode.

**Why now:** The repo gained nearly 5,600 stars this week, coinciding with active community uptake across Claude Code and MCP tooling ecosystems as structured agent configuration becomes a practical need.

**Build with it:** Drop the `ecc-universal` npm package into an existing Claude Code setup and use its MCP config surface to attach persistent memory and instinct profiles to your agent sessions.

## 6. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 145894 (+4003 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a skill/prompt layer for AI coding agents (Claude Code, Cursor, and 19 others) that enforces YAGNI discipline — pushing agents to reach for native browser APIs and built-ins before installing dependencies or scaffolding abstractions.

**Why now:** The repo hit Trendshift's daily and weekly trending charts this week, crossing 145K stars with 4K added in seven days, signaling a sharp spike in developer adoption.

**Build with it:** Drop the ponytail skill into an existing Claude Code session and run a feature task you know tends to over-build — like a date picker or form validator — to benchmark token cost and line count against your current baseline.

## 7. Donchitos/Claude-Code-Game-Studios

https://github.com/Donchitos/Claude-Code-Game-Studios · ★ 25438 (+3517 this week) · ai-agents, ai-assisted-development, anthropic, claude, claude-code, game-design, game-development, gamedev, godot, indie-game-dev, unity, unreal-engine

**What it does:** Claude Code Game Studios structures a single Claude Code session into a 49-agent hierarchy — directors, department leads, and specialists — covering design, programming, art, audio, QA, and production, wired together with 74 slash commands and 12 automated validation hooks.

**Why now:** The repo gained 3,517 stars this week, coinciding with rising builder interest in Claude Code's subagent capabilities following Anthropic's recent push to make multi-agent workflows a first-class feature.

**Build with it:** Clone the repo into your Godot, Unity, or Unreal project root and run `/start` to kick off the structured intake flow, which routes your concept through the creative-director and producer agents before any code is written.

## 8. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 136818 (+3268 this week) · ai-tools, claude-code, codex, desktop-app, grok, grokbuild, hermes, hermes-agent, mcp, open-source, openclaw, openclaw-ui, opencode, pi, provider-management, rust, skills, skills-management, tauri, wsl-support

**What it does:** CC Switch is a cross-platform Tauri desktop app that lets you switch API providers (Claude, Codex, Gemini, Grok, and others) and manage MCP servers, Skills, and Prompts via GUI instead of hand-editing JSON/TOML/YAML config files.

**Why now:** The repo gained 3,268 stars this week, driven by the recent addition of Kimi K3 (Moonshot AI's 2.8T-parameter model) as a supported provider, making it a live target for builders already evaluating frontier model alternatives.

**Build with it:** Point CC Switch at your existing Claude Code config, swap the API endpoint to Kimi K3 or another provider, and validate prompt/MCP behavior across providers without touching config files manually.

## 9. ruvnet/ruflo

https://github.com/ruvnet/ruflo · ★ 73257 (+475 this week) · agentic-ai, agentic-framework, agentic-workflow, agents, ai-agents, ai-assistant, ai-skills, autonomous-agents, claude-code, codex, dsh-plugin, harness, mcp-server, multi-agent, multi-agent-systems, npm, skills, swarm, swarm-intelligence, typescript

**What it does:** Ruflo is a TypeScript meta-harness for Claude Code and Codex that coordinates multi-agent swarms with adaptive memory, vector RAG integration, and federated autonomous workflows via `npx ruflo`.

**Why now:** The repo gained 475 stars this week alongside active ecosystem traction (8.1M+ downloads, 106k git clones in 14 days), signaling a fast-growing builder community converging on this tooling.

**Build with it:** Wire Ruflo into an existing Claude Code project using the published MCP server config to add persistent swarm memory and multi-agent task delegation without changing your core codebase.

## 10. tonhowtf/omniget <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/tonhowtf/omniget · ★ 14337 (+440 this week) · agent-client-protocol, ai-agents, claude-code, codex-cli, coding-agent, course-downloader, download-manager, downloader, hotmart-downloader, instagram-downloader, local-llm, mcp-server, media-downloader, ollama, tiktok-downloader, udemy-downloader, video-downloader, youtube-downloader, yt-dlp, yt-dlp-gui

**What it does:** OmniGet is a Rust desktop app (Windows/macOS/Linux) that combines a yt-dlp GUI for 1,800+ sites, Udemy/Hotmart course downloading, and a local runner for AI coding agents (Claude Code, Codex, Gemini CLI, Ollama) with permissions, undo, job loops, and 156 MCP tools — no terminal required.

**Why now:** The repo gained 440 stars this week, coinciding with active community growth around agentic coding workflows and MCP tooling as Claude Code and Gemini CLI reach wider adoption.

**Build with it:** Point OmniGet's MCP server at an existing Ollama model and use the built-in loop-until-tests-pass job to automate a local coding task without writing any shell tooling.
