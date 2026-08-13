# Skill Tastemakers — Daily Brief — 2026-08-13

_Ranking: delta_7d · 10 repos · generated 2026-08-13T14:34:28.262Z_


## 1. stablyai/orca

https://github.com/stablyai/orca · ★ 44648 (+5995 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source ADE (Agent Development Environment) that runs Codex, Claude Code, OpenCode, or Pi as parallel agents, each isolated in its own git worktree, with a Ghostty-class WebGL terminal and a mobile companion app for monitoring and steering agents remotely.

**Why now:** The project surfaced on Hacker News this week as "Open Source 'Conductor + Ghostty'" and jumped nearly 6,000 stars in seven days, coinciding with growing developer demand for orchestrating multiple coding agents simultaneously rather than running them sequentially.

**Build with it:** Point Orca at an existing repo, fan a single prompt across five worktrees each running a different agent (e.g., Codex vs. Claude Code), then use the Design Mode browser integration to click live UI elements and pipe their HTML/CSS directly into the winning agent's next prompt.

## 2. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 47055 (+5731 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that exposes 330+ AI providers (90+ free tiers) behind a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman prompt compression that cuts token usage by 15–95%.

**Why now:** The repo is trending at +5,731 stars this week, coinciding with the proliferation of agentic coding tools (Claude Code, Codex, Cursor, Cline) that each require separate API keys and hit rate limits independently—OmniRoute addresses that fragmentation directly.

**Build with it:** Point any OpenAI-compatible client (Cursor, Cline, Copilot) at OmniRoute's single endpoint via its `OPENAI_BASE_URL` config, then define a fallback chain across free-tier providers like Gemini, Kimi, and DeepSeek to keep coding sessions running without manual key rotation.

## 3. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 101958 (+4756 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code / Cursor skill that injects a "laziest senior dev" heuristic into AI agents, steering them toward minimal solutions—like replacing a flatpickr date picker with `<input type="date">`—measured at ~54% fewer lines of code across 12 real FastAPI + React tasks.

**Why now:** The project hit Hacker News this week (98 points, 17 comments) as agentic coding tools face growing criticism for over-engineering; the benchmarks land at a moment when Claude Code usage costs are a live pain point for teams running headless sessions at scale.

**Build with it:** Drop the npm package `@dietrichgebert/ponytail` into your Claude Code or Cursor config as an agent skill, then point it at any feature branch—the skill intercepts generation before code is written, not after, so it reduces tokens and cost at the prompt layer rather than in post-processing.

## 4. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 86776 (+4386 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** A collection of 24 slash-command skills (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`, and more) that encode senior-engineer workflows — spec gates, TDD cycles, five-axis code review — into AI coding agents like Claude Code, Cursor, and Codex.

**Why now:** The repo gained 4,386 stars this week, coinciding with Vercel shipping the open `skills` CLI that makes per-skill installation available across 70+ agents via a single `npx skills add` command, lowering the barrier from manual file copying to one line.

**Build with it:** Run `npx skills add addyosmani/agent-skills --skill test-driven-development` to drop the red-green-refactor enforcement skill directly into your Claude Code or Cursor project config, then wire `/build auto` into your PR workflow to get plan-approval-once, autonomous task execution with per-commit test gates.

## 5. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 71347 (+4033 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP server that gives AI agents (Claude, Cursor, etc.) authenticated, parsed access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without requiring paid API keys — returning clean text instead of raw HTML.

**Why now:** Claude Code and Cursor's MCP plugin ecosystem gained significant traction this month, and Agent Reach ships a ready-made MCP config so agents can call `search_twitter` or `get_youtube_transcript` as native tools in one install step.

**Build with it:** Drop the provided `mcp.json` config into your Claude Code or Cursor workspace, then wire `search_reddit` and `get_github_repo` calls into a research or competitive-analysis agent that surfaces structured results directly inside your coding environment.

## 6. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 126966 (+1902 this week) · ai-tools, claude-code, codex, desktop-app, grok, grokbuild, hermes, hermes-agent, mcp, open-source, openclaw, openclaw-ui, opencode, provider-management, rust, skills, skills-management, tauri, typescript, wsl-support

**What it does:** CC Switch is a Tauri-built desktop app that centralizes provider configuration, API key management, and model switching across Claude Code, Codex, Gemini CLI, Grok Build, OpenCode, and Hermes Agent from a single GUI.

**Why now:** Moonshot AI's Kimi K3—a 2.8T-parameter model with a 1M-token context window—just launched this week and is already integrated as a sponsoring provider, making this a practical on-ramp for teams wanting to benchmark it against Claude and Gemini inside the same agentic workflow.

**Build with it:** Use CC Switch's provider-management config surface to wire a self-hosted or relay API endpoint (e.g., via PackyCode or ZetaAPI) into Claude Code or OpenCode, then toggle between providers per project without touching shell environment variables manually.

## 7. herdrdev/herdr

https://github.com/herdrdev/herdr · ★ 28544 (+3653 this week) · agent, agent-orchestration, ai, ai-agents, claude-code, cli, codex, coding-agents, developer-tools, devtools, multiplexer, rust, terminal, terminal-multiplexer, terminal-ui, tmux, tui, workspace-manager

**What it does:** Herdr is a Rust-based terminal multiplexer and background server that runs coding agents (Claude Code, Codex, Cursor, etc.) persistently, exposing a CLI and socket API so agents can spawn panes, query each other's status (working / blocked / idle), and coordinate without human babysitting.

**Why now:** The project gained 3,653 stars this week, coinciding with the current wave of autonomous coding agent workflows where the bottleneck has shifted from "can the agent code?" to "how do I keep ten agents running and know which one is stuck?"

**Build with it:** Wire your own orchestration layer through the socket API — poll pane states to detect `blocked`, then inject a prompt into the stuck pane programmatically; pair this with the `AGENTS.md` agent skill spec to let one Claude Code instance supervise and unblock others across a multi-repo workspace.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 229942 (+3514 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python AI agent from Nous Research that creates and refines skills from experience, maintains cross-session memory, and runs on any backend from a $5 VPS to Modal serverless — accessible via Telegram, Discord, Slack, or CLI.

**Why now:** The project is trending at +3,514 stars this week, coinciding with broad builder interest in agents that aren't locked to a single model or laptop, and its compatibility with the open `agentskills.io` skill-sharing standard gives it a coordination layer that standalone wrappers lack.

**Build with it:** Point it at your own OpenAI-compatible endpoint via `hermes model`, wire up a Telegram gateway for remote access, then use the batch trajectory generation pipeline to collect tool-calling traces for fine-tuning your own model against the compressed trajectory format.

## 9. vitali87/code-graph-rag <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/vitali87/code-graph-rag · ★ 4168 (+1631 this week) · ai, ast, claude-code, code-analysis, code-understanding, codebase-search, developer-tools, graph-database, knowledge-graph, llm, mcp, mcp-server, memgraph, monorepo, multi-language, python, rag, retrieval-augmented-generation, semantic-search, tree-sitter

**What it does:** Code-Graph-RAG parses multi-language codebases with Tree-sitter, stores the structure as a knowledge graph in Memgraph, and exposes an MCP server so LLMs can query, navigate, and edit code in plain English across a monorepo.

**Why now:** The project gained 1,631 stars this week, coinciding with its PyPI release and new Ruby support via an ast-grep pluggable tier — lowering the barrier for teams already running mixed-language monorepos to adopt it without waiting for first-class language parsers.

**Build with it:** Wire it into Claude Code as an MCP server, point it at your monorepo root, and use Cypher queries against the Memgraph backend to build custom refactoring agents or dependency auditors that reason over actual AST relationships rather than text embeddings.

## 10. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 76165 (+3208 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a set of portable agent skills (markdown instruction files) that constrain AI coding agents — Codex, Cursor, Claude Code — to produce tighter layout, typography, spacing, and motion instead of default boilerplate UI patterns.

**Why now:** The repo gained 3,208 stars this week, coinciding with Codex and Claude Code becoming mainstream daily drivers for frontend work, making agent skill files a practical lever rather than an experimental curiosity.

**Build with it:** Drop the `.mdc` or skill files into your Cursor rules directory or Claude Code project context, pair the image-generation skills with ChatGPT Images to produce a reference board, then hand those frames directly to your agent for implementation — no additional tooling required.
