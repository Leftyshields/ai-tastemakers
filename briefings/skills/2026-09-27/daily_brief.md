# Skill Tastemakers — Daily Brief — 2026-09-27

_Ranking: delta_7d · 10 repos · generated 2026-09-27T17:45:31.481Z_


## 1. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 90590 (+1836 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste Skill is a collection of portable agent skills — covering layout, typography, motion, and spacing — that you drop into Codex, Cursor, or Claude Code to stop them from generating generic-looking UIs.

**Why now:** The project surfaced on Hacker News this week and is gaining 1,800+ stars in seven days, signaling active builder interest in taming AI-generated frontend slop.

**Build with it:** Load a taste-skill agent skill file into Claude Code as a custom instruction, then prompt it to build a component and compare the output against your baseline to measure the quality delta directly.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 79412 (+6072 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE (Agent Development Environment) that runs multiple coding agents—Codex, Claude Code, OpenCode, or Pi—simultaneously in isolated git worktrees so you can fan out one prompt across parallel branches and merge the best result.

**Why now:** The project hit HN this week via a Show HN post and is gaining rapid traction (6,072 stars this week), coinciding with the moment parallel agentic coding workflows are shifting from experimental to practical.

**Build with it:** Point Orca at an existing repo, split one refactor prompt across three worktrees each running a different agent, then diff the branches to pick and merge the winner—validating whether multi-agent parallelism actually beats single-agent iteration for your codebase.

## 3. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 268259 (+4789 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness optimization system that adds skills, memory, security (AgentShield), and research-first workflows on top of AI coding agents like Claude Code, Codex, and Cursor.

**Why now:** The repo gained nearly 4,800 stars this week, signaling a surge in developer interest likely tied to the current wave of Claude Code adoption and MCP tooling momentum.

**Build with it:** Install `ecc-universal` from npm and drop it into an existing Claude Code or Cursor project to immediately layer in its memory and instinct configuration without rebuilding your agent setup.

## 4. ccch1mneyyy/dsh-TUI <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ccch1mneyyy/dsh-TUI · ★ 3617 (+631 this week) · claude-code, coding-agent, deepseek, deepseek-harness, dsh-plugin, ink, react, terminal, tui

**What it does:** dsh-TUI is a drop-in npm plugin for DeepSeek Harness that adds a terminal UI with a pixel-whale header, streaming Markdown and thinking output, double-Esc time rewind, a context progress bar, and a TPS gauge — no core patches, uninstall-clean.

**Why now:** The repo hit #7 on GitHub Trending (TypeScript) this week and gained 631 stars, coinciding with its feature by the DeepSeek Harness official WeChat account and listing in the dshfind plugin directory.

**Build with it:** Run `npm install @deepseek-harness-tui/dsh-tui` inside a DeepSeek Harness project and use `/agentview` with the VS Code selection channel to pipe live IDE context into a streaming agent session.

## 5. freestylefly/awesome-gpt-image-2

https://github.com/freestylefly/awesome-gpt-image-2 · ★ 33599 (+624 this week) · agents, ai-image-generation, chatgpt, dsh-plugin, gpt-image-2, image-prompts, prompt-as-code, prompt-engineering, skills, workflow-automation

**What it does:** A curated library of 500+ reverse-engineered GPT-Image-2 prompts organized into 20+ reusable industrial templates, with a live gallery site for browsing, filtering, and copying full prompts by style or scenario.

**Why now:** The repo just shipped a GPT Image 2.5 spotlight comparing the new Sunburst and Flare model variants side-by-side using shared prompts and draggable dividers, making it a direct reference for anyone evaluating the 2.5 upgrade.

## 6. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 146827 (+3900 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a skill/prompt layer for AI coding agents (Claude Code, Cursor, and 20 others) that enforces YAGNI-style minimalism — pushing the agent to delete or avoid code rather than over-build, measured at ~54% fewer lines on average across real feature tasks.

**Why now:** The repo is trending on Trendshift with +3,900 stars this week, coinciding with rising community frustration over AI agents that reflexively install dependencies and scaffold boilerplate for trivially simple requests.

**Build with it:** Drop the ponytail skill into an existing Claude Code session and run a feature task you know tends to over-build (a form widget, a date input) to immediately benchmark how much the generated diff shrinks.

## 7. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 137471 (+3655 this week) · ai-tools, claude-code, codex, desktop-app, grok, grokbuild, hermes, hermes-agent, mcp, open-source, openclaw, openclaw-ui, opencode, pi, provider-management, rust, skills, skills-management, tauri, wsl-support

**What it does:** CC Switch is a Tauri 2 desktop app that lets you switch API providers (Claude, Codex, Gemini, Grok, and others) and manage MCP servers, Skills, and Prompts across multiple agentic CLI tools without hand-editing JSON, TOML, or YAML config files.

**Why now:** The repo gained 3,655 stars this week, coinciding with recent additions of Grok Build, OpenClaw, and MiniMax Code support — expanding its reach as a unified config layer across a fast-growing set of competing agentic tools.

**Build with it:** Point CC Switch at your Claude Code setup, add a custom MCP server entry through the GUI, and validate that the generated config is correct before committing it to your dotfiles repo.

## 8. Donchitos/Claude-Code-Game-Studios

https://github.com/Donchitos/Claude-Code-Game-Studios · ★ 25481 (+3560 this week) · ai-agents, ai-assisted-development, anthropic, claude, claude-code, game-design, game-development, gamedev, godot, indie-game-dev, unity, unreal-engine

**What it does:** Claude Code Game Studios layers 49 specialized subagents (directors, department leads, and specialists), 74 slash commands, and 12 automated hooks onto a Claude Code session to enforce studio-grade structure — design reviews, QA gates, and escalation paths — throughout a solo game project.

**Why now:** The repo added 3,560 stars this week, signaling a sharp spike in developer interest likely tied to broader momentum around Claude Code's subagent and hooks capabilities going mainstream.

**Build with it:** Clone the repo into your Godot, Unity, or Unreal project root and run `/start` to trigger the intake workflow, which routes your concept through the creative-director and producer agents before a single line of code is written.

## 9. trailhq/Graft

https://github.com/trailhq/Graft · ★ 9293 (+506 this week) · ai-agents, anthropic, claude-code, cli, code-graph, codex, context-engineering, cursor, developer-tools, gemini, knowledge-graph, llm, mcp, mcp-server, open-source, openai, tree-sitter

**What it does:** Graft builds a code-knowledge graph from your codebase and serves it to coding agents (Claude Code, Cursor, Codex, Gemini) via an MCP server, reducing tool calls by 46% and token usage by 42% compared to cold-context runs.

**Why now:** The repo gained 506 stars this week and is trending daily on Trendshift, coinciding with accelerating Claude Code and Codex adoption where context cost is a live pain point for teams.

**Build with it:** Add Graft's MCP server to your Claude Code config so the agent queries the pre-built code graph instead of re-reading files on every session.

## 10. pacifio/atlas

https://github.com/pacifio/atlas · ★ 7966 (+3238 this week) · ai, ai-coding-assistant, claude-code, codex, coding-agents, git, gitops, kilo-code, mcp, mcp-client, opencode, opencode-ai, opencode-skills, self-hosted, skills

**What it does:** Atlas is a Rust desktop app that wraps Git with agent-aware checkpoints, linking every commit back to the prompts, tool calls, and reasoning that produced it, while letting you run Claude Code, Codex, and ACP-registry agents side by side against the same codebase with shared memory.

**Why now:** The repo gained 3,238 stars this week, signaling a sharp spike in developer attention as multi-agent coding workflows move from experimental to daily use.

**Build with it:** Drop a `CLAUDE.md` or `AGENTS.md` into an existing project, open it in Atlas, and run two agents against the same branch to compare their checkpointed diffs and prompts directly.
