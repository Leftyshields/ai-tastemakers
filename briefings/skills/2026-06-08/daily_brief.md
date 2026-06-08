# Skill Tastemakers — Daily Brief — 2026-06-08

_Ranking: bootstrap_since_first_seen · 10 repos · generated 2026-06-08T16:44:12.891Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_since_first_seen`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 18264 (+1608 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 60–95% using six algorithms, available as a Python/TypeScript library, drop-in proxy, or MCP server.

**Why now:** The project gained 1,608 GitHub stars this week, signaling sharp community interest as developers hit context window limits and token costs running long agentic sessions with Claude Code, Codex, and Cursor.

**Build with it:** Drop `headroom proxy --port 8787` in front of any existing OpenAI-compatible agent to cut token costs immediately, or use the MCP server tools to add compression and cross-agent memory sharing to a multi-agent pipeline without changing application code.

## 2. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 23864 (+806 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) the ability to read and search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more—without paid APIs, using cookie-based auth and open-source scrapers under the hood.

**Why now:** The project gained 806 stars this week, signaling rapid adoption as developers increasingly need their agents to pull live web data rather than rely on stale training knowledge or expensive API subscriptions.

**Build with it:** Wire Agent Reach into a research or monitoring agent that tracks competitor mentions across Twitter, Reddit, and XiaoHongShu simultaneously, then summarizes findings via your LLM of choice—zero API fees, one install command.

## 3. JimLiu/baoyu-design

https://github.com/JimLiu/baoyu-design · ★ 500 (+297 this week) · agent-skills, claude, claude-code, claude-design, cursor, design, prototyping, ui-design

**What it does:** baoyu-design packages Claude's design engine as a portable Agent Skill, letting you generate polished UI mockups, prototypes, wireframes, and decks as self-contained HTML files directly inside Cursor, Claude Code, or any file-capable coding agent.

**Why now:** The repo gained 297 stars this week, likely driven by Claude Opus 4.8's release and the growing demand for design-to-code workflows that don't require a separate subscription or web interface.

**Build with it:** Drop the skill into your local agent, point it at a product idea, and iterate on live HTML previews using your editor's browser tools — then ship the output straight from your repo as a versioned, self-contained design artifact.

## 4. op7418/guizang-ppt-skill

https://github.com/op7418/guizang-ppt-skill · ★ 15806 (+264 this week) · ai-agent, claude-code, codex, html-deck, image-generation, ppt, presentation, skill, skills, swiss-design, web-ppt

**What it does:** Guizang PPT Skill is an AI-agent skill for Claude Code and Codex that generates polished, single-file HTML slide decks in two distinct visual systems—editorial magazine style and Swiss International typography—plus matching social covers and AI-generated slide images.

**Why now:** The repo gained 264 stars this week, signaling a surge of builder interest, and the timing aligns with growing adoption of Claude Code as a native coding agent where HTML-as-presentation is a practical alternative to brittle PowerPoint automation.

**Build with it:** Install the skill, point your agent at a Markdown doc or article, and have it produce a complete 6–10 slide presentation with GPT-Image-generated visuals and correctly sized social covers (WeChat 21:9, Xiaohongshu 3:4, etc.) in one shot—no build step, no server, just a single HTML file ready to present.

## 5. jlcodes99/cockpit-tools

https://github.com/jlcodes99/cockpit-tools · ★ 10659 (+222 this week) · account-manager, ai, antigravity, codebuddy, codex, cursor, github-copilot, kiro, windsurf

**What it does:** Cockpit Tools is a Rust-built desktop app that centralizes account management across 12 AI IDEs—Cursor, Windsurf, GitHub Copilot, Codex, Kiro, and more—letting you switch accounts instantly, monitor quotas in real time, and run multiple isolated instances of the same IDE simultaneously.

**Why now:** With Kiro launching this week and AI IDE fatigue setting in from juggling free-tier limits across multiple tools, demand for exactly this kind of multi-account orchestration spiked—222 stars in a single week reflects that timing.

**Build with it:** Wire Cockpit Tools into a local dev workflow to parallelize agent tasks across accounts—run two Codex instances against different repos simultaneously, or automate quota-aware account rotation so long-running AI pipelines never stall on a rate limit.

## 6. can1357/oh-my-pi

https://github.com/can1357/oh-my-pi · ★ 11238 (+194 this week) · ai-agent, ai-coding-agent, anthropic, bun, claude, cli, coding-assistant, llm, mcp, multi-provider, openai, rust, terminal, tui, typescript

**What it does:** oh-my-pi (omp) is a terminal-based AI coding agent with 40+ LLM providers, 32 built-in tools, LSP/DAP integration, and a Rust core that normalizes edit formats across models so diffs land correctly on the first attempt.

**Why now:** The project gained 194 stars this week, likely driven by its published benchmark results showing dramatic per-model improvements (e.g., Grok Code Fast jumping from 6.7% to 68.3% pass rate) that make a concrete case for tool-harness quality over raw model capability.

**Build with it:** Drop `omp` into a CI pipeline or wrap it with MCP to give any model a reliable edit/read/search loop over your codebase, or use the subagent support to orchestrate parallel coding tasks across multiple providers without rewriting your tooling for each one.

## 7. decolua/9router

https://github.com/decolua/9router · ★ 16922 (+191 this week) · ai-agents, ai-gateway, anthropic, chatgpt, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, gemini-cli, llm, llm-gateway, openai, openai-proxy, qwen, token-saver

**What it does:** 9Router is a local proxy server that routes requests from AI coding tools (Claude Code, Cursor, Cline, Codex) through 40+ providers with automatic fallback across subscription, cheap, and free tiers, while compressing tool output tokens by 20–40% via its RTK system.

**Why now:** It gained 191 stars this week, likely driven by the wave of developers hitting Claude and Codex rate limits as agentic coding workflows go mainstream and free-tier quotas tighten.

**Build with it:** Run it as a drop-in local endpoint to chain multiple free providers (Kiro, OpenCode) behind a single API key, then layer in custom fallback logic or cost tracking to build a personal or team-wide AI gateway that survives any single provider's outage or quota wall.

## 8. NarratorAI-Studio/narrator-ai-cli-skill

https://github.com/NarratorAI-Studio/narrator-ai-cli-skill · ★ 886 (+172 this week) · agent-skills, ai-agent, ai-video, claude-code, claude-code-skill, content-creation, cursor, film-commentary, narrator-ai, openclaw, openclaw-skill, short-drama, skill-md, video-narration, windsurf

**What it does:** A machine-readable `SKILL.md` file that teaches AI agents (Claude Code, Cursor, Windsurf, OpenClaw, etc.) to autonomously produce movie narration videos by orchestrating the `narrator-ai-cli` tool — searching films, selecting templates, generating scripts, and compositing the final video.

**Why now:** The repo jumped 172 stars this week, signaling rapid community uptake around agent skill files as a lightweight primitive for extending coding assistants beyond code tasks.

**Build with it:** Clone the skill into your agent's rules directory and wire it to your own `narrator-ai-cli` API key to batch-produce short-drama narration content at scale, or fork `SKILL.md` as a template to package any CLI tool as an agent-callable skill.

## 9. ogulcancelik/herdr

https://github.com/ogulcancelik/herdr · ★ 5019 (+157 this week) · agent, agent-orchestration, ai, ai-agents, claude-code, cli, codex, coding-agents, developer-tools, devtools, multiplexer, rust, terminal, terminal-multiplexer, terminal-ui, tmux, tui, workspace-manager

**What it does:** Herdr is a Rust-based terminal multiplexer built specifically for running and monitoring multiple AI coding agents (Claude Code, Codex, etc.) simultaneously, with workspaces, tabs, and panes that show each agent's real terminal output alongside status indicators for blocked, working, or done states.

**Why now:** It crossed 5,000 stars this week with 157 new stars, signaling rapid adoption as developers increasingly run parallel agent workflows and need infrastructure beyond a single terminal session to manage them.

**Build with it:** Wire Herdr's socket API into a CI pipeline or custom dashboard to programmatically spin up, monitor, and coordinate multiple coding agents across isolated workspaces—effectively building a lightweight agent orchestration layer without leaving the terminal.

## 10. Imbad0202/academic-research-skills-codex

https://github.com/Imbad0202/academic-research-skills-codex · ★ 3327 (+150 this week) · academic-pipeline, academic-research, academic-writing, ai-research, codex, literature-review, openai-codex, peer-review, prompt-engineering, research-assistant

**What it does:** This repo packages a full academic research workflow suite—literature review, paper writing, peer review, and experiment automation—as a single installable skill for OpenAI Codex, mirroring a parallel Claude Code version.

**Why now:** It gained 150 stars this week, signaling active builder interest, and targets Codex specifically at a moment when developers are actively mapping agentic research workflows onto competing AI coding environments.

**Build with it:** Install the skill into your Codex environment and wire up a human-in-the-loop pipeline that automates citation verification, structured paper drafting, and reviewer feedback loops—useful for anyone building research tooling on top of Codex agents.
