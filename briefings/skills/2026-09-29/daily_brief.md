# Skill Tastemakers — Daily Brief — 2026-09-29

_Ranking: delta_7d · 10 repos · generated 2026-09-29T18:39:55.850Z_


## 1. can1357/oh-my-pi

https://github.com/can1357/oh-my-pi · ★ 33752 (+1052 this week) · ai-agent, ai-coding-agent, anthropic, bun, claude, cli, coding-assistant, llm, mcp, multi-provider, openai, rust, terminal, tui, typescript

**What it does:** Oh My Pi (`omp`) is a terminal coding agent that bundles 60+ LLM providers, 31 built-in tools, LSP and DAP integrations, and a ~80k-line Rust core into a single CLI with IDE-level context.

**Why now:** The repo gained 1,052 stars this week and just opened pull requests to all contributors after previously requiring a vouch, making it an active moment to get changes merged.

**Build with it:** Install via `bun install -g @oh-my-pi/pi-coding-agent` and wire it into an existing project's edit loop using the built-in DAP ops to get breakpoint-aware agent sessions without a separate IDE.

## 2. Egonex-AI/Understand-Anything

https://github.com/Egonex-AI/Understand-Anything · ★ 84669 (+942 this week) · antigravity-skills, business-knowledge, claude-code, claude-skills, codebase-analysis, codex, codex-skills, developer-tools-ai-agent, gemini-cli-skills, karpathy-llm-wiki, knowledge-base, knowledge-graph, memory, opencode-skills, pi-agent, understandcode, vibe-coding

**What it does:** Understand Anything runs a multi-agent pipeline over any codebase to build an interactive knowledge graph of files, functions, classes, and dependencies, with a visual dashboard for panning, zooming, searching, and asking questions.

**Why now:** The repo is trending at 84,669 stars with 942 added this week, coinciding with broad adoption of agentic coding tools (Claude Code, Codex, Gemini CLI) that make context-loading a daily friction point for developers.

**Build with it:** Install it as a Claude Code plugin and point it at a large unfamiliar repo to generate the knowledge graph, then use the plain-English node summaries as onboarding documentation for your team.

## 3. stablyai/orca

https://github.com/stablyai/orca · ★ 81504 (+6095 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE that runs Codex, Claude Code, OpenCode, or Pi in parallel git worktrees, letting you fan a single prompt across multiple agents and merge the winning result.

**Why now:** It surfaced on Hacker News this week as an open-source "Conductor + Ghostty" alternative, drawing early discussion around its parallel-agent orchestration approach.

**Build with it:** Point Orca at an existing repo, split one prompt across three worktrees each running a different agent (e.g. Codex vs. Claude Code vs. OpenCode), then diff and cherry-pick the best output using the built-in worktree comparison workflow.

## 4. EverMind-AI/Raven <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/EverMind-AI/Raven · ★ 4751 (+729 this week) · ai, ai-agents, anthropic, chatgpt, claude, codex, evermind, hermes, hermes-agent, llm, openai, openclaw, openhuman, recursive-self-improvement, rsi, rsi-ai, self-evolving, self-improving

**What it does:** Raven is a Host Agent that generates DAGs and orchestrates built-in specialized agents (Research, Code, Design, Oncall) across sessions, with a modular architecture designed for iterative self-improvement of its own orchestration harness via EverOS.

**Why now:** The repo jumped 729 stars this week alongside the release of a formal technical report, signaling an active launch moment with documentation now available to ground early experiments.

**Build with it:** Point Raven-Code at an existing codebase and run it through a multi-round planning loop to benchmark the Node F1 / Edge F1 orchestration metrics against your own task DAGs.

## 5. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 138617 (+4457 this week) · ai-tools, claude-code, codex, desktop-app, grok, grokbuild, hermes, hermes-agent, mcp, open-source, openclaw, openclaw-ui, opencode, pi, provider-management, rust, skills, skills-management, tauri, wsl-support

**What it does:** CC Switch is a Tauri 2/Rust desktop app that lets you swap API providers (Claude, Codex, Gemini, Grok, and others) and manage MCP servers, Skills, and Prompts across ten AI coding tools through a GUI instead of hand-editing JSON/TOML/YAML configs.

**Why now:** The repo crossed 138K stars with 4,457 added this week, signaling a sharp spike in adoption that correlates with fragmented multi-provider workflows becoming a daily friction point for agentic coding teams.

**Build with it:** Point CC Switch at your existing Claude Code config, add a Kimi or Gemini API key through the GUI, and validate one-click provider switching without touching the underlying JSON files.

## 6. career-ops-hq/career-ops

https://github.com/career-ops-hq/career-ops · ★ 73068 (+642 this week) · ai-agent, ai-job-search, ats, career, careerops, claude-code, cli, cover-letter, cv, interview-prep, job-application, job-hunting, job-search, job-tracker, jobsearch, jobseekers, local-first, open-source, resume, resume-builder

**What it does:** career-ops is a local-first JavaScript CLI agent that scans job portals, scores each listing A–H on a 1–5 scale, flags low-fit roles as "do not apply," and tailors your CV and cover letter — all running inside AI coding CLIs like Claude Code or Codex.

**Why now:** The project hit #1 trending on GitHub this week and landed coverage in WIRED and Business Insider, surfacing a concrete hiring workflow (740 listings → 68 applied → 12 interviews → 1 offer) that's drawing active builder attention.

**Build with it:** Drop your resume and a target job description into the CLI's structured A–H evaluation pipeline to validate whether your own filtering heuristics match the tool's scoring before building any automation on top.

## 7. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 269501 (+4275 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness layer that adds skills, memory, instincts, and security tooling on top of AI coding agents like Claude Code, Codex, Opencode, and Cursor.

**Why now:** The repo is trending this week with 4,275 new stars, coinciding with rising adoption of Claude Code and the broader shift toward agentic coding workflows.

**Build with it:** Drop in the `ecc-universal` npm package to add persistent memory and security guardrails to an existing Claude Code or Cursor workflow without changing your editor setup.

## 8. rtk-ai/rtk

https://github.com/rtk-ai/rtk · ★ 82010 (+579 this week) · agentic-coding, ai-coding, anthropic, claude-code, cli, command-line-tool, cost-reduction, developer-tools, llm, open-source, productivity, rust, token-optimization

**What it does:** RTK is a single Rust binary CLI proxy that intercepts shell commands (ls, grep, git, cargo test, pytest, and 100+ others) and compresses their output before it reaches an LLM agent, cutting token consumption by up to 90%.

**Why now:** The repo is trending this week with 82K stars and a +579 weekly spike, landing as the repository gains Homebrew availability and multi-language README coverage signaling an active release push.

**Build with it:** Drop `rtk` in front of your Claude Code or similar agent's bash tool invocation — no config required — to immediately benchmark how much context compression reduces your actual prompt costs on a real codebase.

## 9. Gaurav-Gosain/tuios <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Gaurav-Gosain/tuios · ★ 4292 (+577 this week) · ai-agents, bubbletea, charm, claude-code, cli, codex, coding-agents, developer-tools, go, golang, multiplexer, pty, ssh, terminal, terminal-emulator, terminal-multiplexer, tiling-window-manager, tmux-alternative, tui, window-manager

**What it does:** TUIOS is a Go-based terminal multiplexer with BSP tiling, persistent daemon sessions, and a built-in agent layer that tracks coding agent state, routes approvals, and lets agents message each other via an Inbox.

**Why now:** The repo gained 577 stars this week and was named Terminal Trove's Tool of the Week, coinciding with the v0.8.1 release that adds documented agent fleet support and MCP grants.

**Build with it:** Drop in the tmux shim (`docs/TMUX_SHIM.md`) to run an existing Claude Code agent team inside TUIOS without changing your agent tooling, then use hooks (`docs/HOOKS.md`) to fire shell commands on agent state changes.

## 10. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 148073 (+3790 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a skill/prompt layer for AI coding agents (Claude Code, Cursor, and 19 others) that enforces a "laziest senior dev" heuristic — steering the agent toward minimal, already-available solutions instead of installing dependencies and generating boilerplate.

**Why now:** The repo hit 148K stars with ~3,800 added this week, riding active Trendshift daily and weekly trending rankings that signal a sharp surge in developer attention right now.

**Build with it:** Drop the ponytail agent skill into your Claude Code setup and run it against an existing feature branch to measure how much generated code it eliminates before you merge.
