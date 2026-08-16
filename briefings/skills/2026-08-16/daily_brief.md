# Skill Tastemakers — Daily Brief — 2026-08-16

_Ranking: delta_7d · 10 repos · generated 2026-08-16T13:45:29.160Z_


## 1. stablyai/orca

https://github.com/stablyai/orca · ★ 46375 (+6369 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile/VPS app that orchestrates parallel AI coding agents (Codex, Claude Code, OpenCode, Pi) across isolated git worktrees, with a WebGL terminal, in-browser design mode, and a mobile companion for monitoring and steering agents remotely.

**Why now:** It surfaced on Hacker News this week as an open-source alternative combining Conductor-style agent orchestration with Ghostty-class terminal rendering, landing at 46K+ stars with a fresh release cadence visible in the GitHub releases page.

**Build with it:** Point Orca at an existing repo, fan a single refactor prompt across three worktrees each running a different agent (e.g., Claude Code vs. Codex vs. OpenCode), then use the diff view to cherry-pick the winning implementation before merging — all driven from the mobile app while the agents run on a VPS.

## 2. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 10473 (+6170 this week) · agent-skill, ai, c2pa, claude, provenance, synthid, watermark

**What it does:** A Python service plus agent skill that strips AI provenance marks from text and files — covering invisible Unicode, statistical token-sampling watermarks (SynthID-class, Kirchenbauer-style), and C2PA/EXIF/XMP metadata from PNG, JPEG, SVG, PDF, DOCX, and more.

**Why now:** The v0.5.0 release this week expanded coverage from Claude-specific marks to a multi-vendor surface (Gemini/SynthID-Text, OpenAI provenance, open-LLM schemes), coinciding with growing industry deployment of C2PA signing in AI-generated content pipelines.

**Build with it:** Drop the skill into `.grok/skills/remove-ai-marks` or `~/.cursor/skills/clean-user-facing-text`, spin up the stdlib HTTP server with `make serve`, and pipe any AI-generated draft or exported file through the `/remove-ai-marks` endpoint as a pre-publish workflow step before committing to your docs repo or CMS.

## 3. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 48893 (+5811 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that exposes 1,200+ models across 339 providers through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman prompt compression that cuts token usage 15–95%.

**Why now:** The repo gained 5,811 stars this week, coinciding with renewed interest in Claude Code and Codex CLI workflows where free-tier exhaustion is a daily friction point — OmniRoute's documented ~1.51B free tokens/month directly addresses that ceiling.

**Build with it:** Point Claude Code or Cursor's base URL at your OmniRoute instance, enable the fallback chain across Gemini 2.5 Flash, GPT-4o mini, and Kimi free tiers, and let the quota-aware router transparently reroute mid-session without touching your prompt code.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 103779 (+5163 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code plugin (and cursor-rules config) that installs a "lazy senior dev" decision layer into your AI agent, steering it to reach for `<input type="date">` before it reaches for flatpickr.

**Why now:** Claude Code's agent-skill / plugin surface is new enough that the ecosystem of composable behavioral constraints is still thin — this week's star velocity (+5,163) reflects builders actively searching for that missing layer.

**Build with it:** Drop the npm package `@dietrichgebert/ponytail` into your Claude Code session as an agent skill, then measure the `git diff` it leaves against your baseline using the included benchmark harness in `benchmarks/`.

## 5. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 231319 (+3985 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python agent from Nous Research that creates and refines skills from experience, maintains cross-session memory, and runs across seven terminal backends (local, Docker, SSH, Modal, Daytona, and others) while connecting to Telegram, Discord, Slack, and WhatsApp through a single gateway process.

**Why now:** The project is trending sharply this week (nearly 4K stars in seven days), coinciding with broader developer interest in persistent, self-modifying agents as an alternative to stateless chatbot wrappers.

**Build with it:** Point it at your own model endpoint via `hermes model` and wire the built-in cron scheduler to run nightly jobs — code audits, data backups, or report generation — delivered to a Slack or Telegram channel, all defined in natural language without touching the agent's core config.

## 6. citrolabs/ego-lite

https://github.com/citrolabs/ego-lite · ★ 11260 (+1959 this week) · agent-skills, ai-agent, automation, browser, browser-automation, claude-code, codex, hermes-agent, skills, skills-sh

**What it does:** ego lite is a macOS browser that gives AI agents (Claude Code, Codex, etc.) isolated "Spaces" to run browser automation tasks while sharing your real logged-in session state, exposed via an `ego-browser` skill that agents invoke directly from the CLI.

**Why now:** The repo jumped nearly 2,000 stars this week, coinciding with heavy Claude Code and Codex adoption where session-sharing and login state are active friction points developers are hitting in production agent workflows.

**Build with it:** Add the skill via `npx skills add citrolabs/ego-lite`, then wire `ego-browser` as a slash command in your Claude Code or Codex agent to hand off authenticated browser tasks — form submissions, scraping behind login walls, or multi-step workflows — without touching your own tabs.

## 7. herdrdev/herdr

https://github.com/herdrdev/herdr · ★ 29642 (+3829 this week) · agent, agent-orchestration, ai, ai-agents, claude-code, cli, codex, coding-agents, developer-tools, devtools, multiplexer, rust, terminal, terminal-multiplexer, terminal-ui, tmux, tui, workspace-manager

**What it does:** Herdr is a Rust-based terminal multiplexer and background server purpose-built for running multiple coding agents (Claude Code, Codex, Cursor, etc.) simultaneously, with per-pane status tracking (working/blocked/idle) and a socket API for agents to spawn panes and prompt each other.

**Why now:** The project gained 3,829 stars this week, a spike that tracks directly with the current surge in multi-agent coding workflows as Claude Code and Codex usage has gone mainstream and developers are actively hunting for orchestration infrastructure that isn't just a bash script wrapping tmux.

**Build with it:** Use the [agent skill](https://herdr.dev/docs/agent-skill/) and socket API to wire a coordinator agent that monitors pane states and routes blocked agents to a specialist — for example, a Claude Code instance that detects a blocked test-writing pane and dispatches a second agent to unblock it, all configured through herdr's CLI without modifying the agents themselves.

## 8. titanwings/colleague-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/titanwings/colleague-skill · ★ 22716 (+1861 this week) · agent-skills, ai-agent, claude-code, codex, dsh-plugin, hermes-agent, knowledge-distillation, meta-skill, openclaw, skill-generator

**What it does:** dot-skill (formerly colleague.skill) takes source material and a written description of a person — colleague, mentor, author, fictional character — and distills them into a portable AI Skill file that replicates that person's reasoning style and voice across Claude Code, Codex, Hermes, OpenClaw, and DeepSeek Harness.

**Why now:** The project crossed 20K stars this week and simultaneously shipped native DeepSeek Harness support via filesystem Skill discovery, making it drop-in compatible with DSH's `/dot-skill` invocation without any config wiring.

**Build with it:** Install globally at `~/.dsh/skills/dot-skill`, feed it a departing teammate's PRs, docs, and Slack exports, and invoke `/dot-skill` inside DeepSeek Harness to get a reviewable Skill card that stands in for their code-review judgment on future PRs.

## 9. lidge-jun/opencodex

https://github.com/lidge-jun/opencodex · ★ 10354 (+1835 this week) · ai-gateway, ai-tools, anthropic, chatgpt, claude, claude-code, codex, codex-cli, deepseek, developer-tools, gemini, grok, kiro, llm, llm-proxy, ollama, openai, openrouter, proxy, typescript

**What it does:** opencodex is a local proxy that intercepts OpenAI Codex's Responses API and translates requests to any LLM backend — Claude, Gemini, Grok, DeepSeek, Ollama, and others — handling streaming, tool calls, and reasoning tokens in both directions, with a dashboard for managing ChatGPT account pools.

**Why now:** The project gained 1,835 stars this week, coinciding with active developer interest in routing around OpenAI Codex's closed provider lock-in now that Claude Code, Claude Desktop, and Grok Build are all supported as client surfaces.

**Build with it:** Run `ocx start`, point your Codex CLI or Claude Code's base URL to `localhost:10100`, then configure provider routing in the dashboard to swap DeepSeek or Ollama in as the backend without changing any client-side tooling or prompts.

## 10. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 72207 (+3640 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP server that gives AI agents read/search access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paid APIs, handling auth, anti-bot bypasses, and HTML-to-text cleaning in one install.

**Why now:** Claude Code and Cursor's MCP support have made tool-augmented agents a mainstream workflow this month, and Agent Reach sits in GitHub's #1 trending spot this week — signaling the ecosystem is actively looking for zero-cost data-access layers to plug into those setups.

**Build with it:** Add Agent Reach as an MCP server in your `claude_desktop_config.json` or Cursor MCP config, then prompt your agent to search Reddit threads, pull YouTube transcripts, or scrape XiaoHongShu listings as inline research steps inside an existing coding or analysis workflow.
