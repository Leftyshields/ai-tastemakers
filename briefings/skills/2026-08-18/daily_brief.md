# Skill Tastemakers — Daily Brief — 2026-08-18

_Ranking: delta_7d · 10 repos · generated 2026-08-18T13:57:41.871Z_


## 1. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 14145 (+9842 this week) · agent-skill, ai, c2pa, claude, provenance, synthid, watermark

**What it does:** A Python stdlib service plus agent skill that strips multi-vendor AI provenance marks — invisible Unicode, statistical token-sampling watermarks, and C2PA/EXIF/XMP metadata — from text and a wide range of file formats including PNG, JPEG, PDF, DOCX, and Markdown.

**Why now:** The project surfaced on Hacker News this week alongside a v0.5.0 release that expanded vendor coverage to Claude, Gemini/SynthID-Text, OpenAI provenance surfaces, and Kirchenbauer-style open-LLM marks.

**Build with it:** Drop the `skills/remove-ai-marks/` skill into `.grok/skills/`, start `service/scripts/server.py` locally, and invoke `/remove-ai-marks` inside Grok to scrub AI provenance from any document before publishing.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 47938 (+6467 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE (Agent Development Environment) that runs Codex, Claude Code, OpenCode, or Pi in parallel git worktrees, letting you fan one prompt across multiple agents and merge the winning result.

**Why now:** The project surfaced on Hacker News this week as an open-source "Conductor + Ghostty" alternative, drawing early community attention and discussion.

**Build with it:** Clone a repo into Orca, spawn the same prompt across three parallel worktrees using different agents, and diff the outputs to pick the best implementation before merging.

## 3. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 50235 (+5363 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted AI gateway that routes requests across 340 providers (90+ free tiers) through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression saving 15–95% of tokens.

**Why now:** The repo gained 5,363 stars this week, signaling a sharp spike in developer attention that makes it worth evaluating before the free-tier math changes in the next bi-weekly audit.

**Build with it:** Point Claude Code or Cursor at OmniRoute's local endpoint (replacing the default API base URL) and let the 19 routing strategies exhaust free Gemini and GPT-4o mini quotas before touching paid models.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 105157 (+5220 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an AI agent skill that steers models like Claude toward minimal code — using platform primitives, deleting abstractions, and replacing over-built solutions with single lines.

**Why now:** The project gained 5,220 stars this week and is trending on Trendshift, coinciding with a published agentic benchmark showing −54% LOC and −20% cost versus an unskilled Claude Code baseline on a real FastAPI + React repo.

**Build with it:** Drop the skill into a Claude Code session on an existing project and measure the `git diff` it produces against your current agent baseline.

## 5. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 117824 (+2598 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** UI UX Pro Max is a Python-based AI skill that injects design reasoning into coding agents (Cursor, Claude Code, Copilot, Windsurf, and others) via 192 reasoning rules and 79 searchable UI styles to produce consistent, professional UI/UX output.

**Why now:** The v2.0 release introduced a Design System Generator that analyzes project requirements and outputs a structured design system — including layout pattern, color, typography, and section order — in a single reasoning pass.

**Build with it:** Install the CLI via `npm install -g ui-ux-pro-max-cli`, drop the skill into your existing Cursor or Claude Code project, and invoke the Design System Generator against a real brief to validate whether the 192 rules meaningfully constrain your agent's component output.

## 6. can1357/oh-my-pi

https://github.com/can1357/oh-my-pi · ★ 25600 (+2088 this week) · ai-agent, ai-coding-agent, anthropic, bun, claude, cli, coding-assistant, llm, mcp, multi-provider, openai, rust, terminal, tui, typescript

**What it does:** OMP is a terminal-based AI coding agent that wires in LSP, DAP, a browser, and 31 built-in tools against 60+ model providers, with a ~80k-line Rust core handling hash-anchored edits.

**Why now:** The repo hit 25,600 stars with 2,088 added this week, coinciding with pull requests being opened to all contributors after previously requiring a vouch — a concrete policy shift lowering the barrier to contribute.

**Build with it:** Install via `bun install -g @oh-my-pi/pi-coding-agent` and wire it into an existing project using the `homeManagerModules.default` Nix flake output to declaratively own its settings alongside your system config.

## 7. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 232368 (+4099 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python agent with a built-in learning loop — it creates and refines skills from experience, searches past conversations via FTS5, and builds a persistent user model across sessions using Honcho dialectic modeling.

**Why now:** The repo crossed 232K stars with 4,099 added this week, signaling a sharp spike in community attention likely driven by the Hermes Desktop launch listed prominently in the README header.

**Build with it:** Point it at your own OpenAI-compatible endpoint via `hermes model`, wire it to a Telegram bot using the built-in gateway, and let it run unattended cron jobs — validating the cross-platform scheduling loop without touching any code.

## 8. holaboss-ai/holaOS

https://github.com/holaboss-ai/holaOS · ★ 9677 (+4081 this week) · agent, agent-harness, agent-os, agentic, ai, ai-agent, ai-agents, artificial-intelligence, claude-code, codex, electron, holaboss, holaos, llm, mcp, memory, model-context-protocol, runtime, typescript, workspace

**What it does:** holaOS is a local-first Electron desktop workspace that runs Claude Code, Codex, or its own built-in agent against a single shared memory, toolset, and 100+ integrations — no per-agent reconfiguration required.

**Why now:** The repo gained 4,081 stars this week, signaling a sharp spike in builder interest coincident with the broader wave of multi-agent orchestration tooling landing in mid-2025.

**Build with it:** Point an existing Claude Code or Codex workflow at holaOS by dropping your API keys into BYOK settings, then let the shared memory layer persist project context across both agents without any extra scaffolding.

## 9. santifer/career-ops

https://github.com/santifer/career-ops · ★ 65274 (+1881 this week) · ai, ai-agent, anthropic, ats, automation, beginner-friendly, career, careerops, claude, claude-code, cli, first-timers-only, golang, good-first-issue, interview-prep, job-application, job-hunting, job-search, open-source, resume

**What it does:** career-ops is an open-source multi-agent system that scans job portals, scores listings A–F (1.0–5.0) against your profile, tailors your CV per application, and tracks the pipeline — all running locally inside an AI coding CLI like Claude Code or Codex.

**Why now:** Business Insider and WIRED both ran coverage this week, surfacing the repo to a wider hiring-tools audience at a moment when ATS-evasion tooling is a live conversation.

**Build with it:** Point the agent at a job board URL, supply your base CV, and let the rubric scorer filter listings before you write a single tailored line — the scoring config is the primary surface to customize for your target role or industry.

## 10. herdrdev/herdr

https://github.com/herdrdev/herdr · ★ 30241 (+3400 this week) · agent, agent-orchestration, ai, ai-agents, claude-code, cli, codex, coding-agents, developer-tools, devtools, multiplexer, rust, terminal, terminal-multiplexer, terminal-ui, tmux, tui, workspace-manager

**What it does:** herdr is a Rust terminal multiplexer that runs as a persistent background server, exposing a CLI and socket API so coding agents (Claude Code, Codex, Cursor, etc.) can spawn panes, detect when another agent is blocked, and keep working through disconnects.

**Why now:** The repo gained 3,400 stars this week, signaling a sharp spike in attention from developers actively wiring AI coding agents into their workflows.

**Build with it:** Drop the [agent skill](https://herdr.dev/docs/agent-skill/) config into an existing Claude Code session and use the socket API to have one agent poll another pane's blocked/idle status before handing off a task.
