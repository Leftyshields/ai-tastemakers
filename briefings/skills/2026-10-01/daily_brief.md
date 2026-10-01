# Skill Tastemakers — Daily Brief — 2026-10-01

_Ranking: delta_7d · 10 repos · generated 2026-10-01T18:54:14.439Z_


## 1. stablyai/orca

https://github.com/stablyai/orca · ★ 83041 (+5677 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE that runs Codex, Claude Code, OpenCode, or Pi in parallel git worktrees, letting you fan one prompt across multiple agents and merge the best result.

**Why now:** The project hit Hacker News this week framed as an open-source "Conductor + Ghostty" combo, surfacing it to builders already experimenting with parallel agent workflows.

**Build with it:** Point Orca at an existing repo, split a single prompt across three worktrees using different agents, and use the built-in comparison view to pick which branch to merge.

## 2. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 45613 (+795 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a native C binary MCP server that indexes a codebase into a persistent SQLite knowledge graph — functions, classes, call chains, and HTTP routes — using tree-sitter AST parsing across 162 languages, answering structural queries in under 1ms with 17 MCP tools.

**Why now:** HN threads this week specifically discuss replacing grep-based code exploration with knowledge graphs, directly citing this repo as a working implementation of that approach.

**Build with it:** Point your Cursor or Claude Code config at the installed binary, run `install` to register it as an MCP server, then query cross-file call chains without feeding raw files to the model.

## 3. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 150217 (+4787 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an agent skill (npm: `@dietrichgebert/ponytail`) that injects a YAGNI-first constraint into AI coding agents like Claude Code and Cursor, pushing them to use native APIs and minimal code instead of installing libraries and generating boilerplate.

**Why now:** The repo hit Hacker News this week and is trending daily and weekly on Trendshift, surfacing active builder discussion around agentic over-engineering.

**Build with it:** Drop the skill into an existing Claude Code or Cursor project via the npm package and run it against a feature branch where your agent recently over-built — the benchmark tasks (FastAPI + React) give you a concrete before/after reference point.

## 4. shanraisshan/claude-code-best-practice

https://github.com/shanraisshan/claude-code-best-practice · ★ 66944 (+656 this week) · agentic-ai, agentic-coding, agentic-engineering, agentic-workflow, ai, ai-agents, anthropic, best-practices, boris, claude, claude-ai, claude-code, claude-code-agents, claude-code-best-practices, claude-code-commands, claude-code-skills, context-engineering, pakistan, pakistani-developer, vibe-coding

**What it does:** A structured reference repo mapping Claude Code's core primitives—subagents (`.claude/agents/`), commands (`.claude/commands/`), skills (`.claude/skills/`), hooks, and orchestration workflows—with best-practice docs and working implementations for each.

**Why now:** The repo hit GitHub Trending #1 this week (656 stars in seven days), coinciding with active community material from Boris Cherny (Claude Code's lead) linked directly in the README across multiple recent tweets.

**Build with it:** Drop the `.claude/commands/weather-orchestrator.md` file into your own project as a template to wire a multi-step orchestration workflow using Claude Code's built-in command runner.

## 5. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 270585 (+3917 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness layer that adds skills, memory, security (via `ecc-agentshield`), and research-first workflows on top of Claude Code, Codex, Opencode, and Cursor.

**Why now:** The repo is trending this week with nearly 4,000 new stars, coinciding with rising builder activity around Claude Code as Anthropic's agentic tooling gains adoption.

**Build with it:** Install `ecc-universal` from npm and drop it into an existing Claude Code project to immediately layer in persistent memory and agent security controls without changing your underlying model setup.

## 6. langgenius/dify

https://github.com/langgenius/dify · ★ 157677 (+580 this week) · agent, agentic-ai, agentic-framework, agentic-workflow, ai, automation, claude, deepseek, genai, gpt, llm, low-code, mcp, nextjs, no-code, openai, python, skills, workflow

**What it does:** Dify is an open-source workspace for building agentic workflows and RAG pipelines, with built-in support for multiple LLMs, tool integrations, and one-click deployment to cloud, VPC, or self-hosted environments.

**Why now:** The repo gained 580 stars this week and its topic list now prominently includes `mcp` (Model Context Protocol), signaling active alignment with the fast-moving MCP ecosystem that builders are currently wiring into agent stacks.

**Build with it:** Connect an MCP server as a tool node inside a Dify workflow to give your agent access to external data sources without writing custom API glue code.

## 7. Wei-Shaw/sub2api

https://github.com/Wei-Shaw/sub2api · ★ 43181 (+566 this week) · 2api, antigravity2api, cc2api, claude, claude-code, codex, crs, crs2, gemini

**What it does:** Sub2API is an open-source gateway that pools Claude, OpenAI, Gemini, and Grok subscriptions behind a single API endpoint, enabling quota sharing and cost splitting across multiple users.

**Why now:** The repo is trending on Trendshift and gaining 566 stars this week, coinciding with rising demand for shared Claude Code and Codex access as subscription costs climb.

**Build with it:** Point Claude Code's API base URL at a self-hosted Sub2API instance (Docker-ready) to distribute a single Anthropic subscription across a team without modifying any client tooling.

## 8. miqdadbadjuber/anti-slop <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/miqdadbadjuber/anti-slop · ★ 4225 (+564 this week) · accessibility, agent-skills, ai-agents, ai-coding-agent, ai-slop, anti-slop, claude-code, copywriting, design-rules, ui-design

**What it does:** Anti-slop is a rulebook for AI coding agents—delivered as per-skill `SKILL.md` files—that filters out generic UI patterns, filler copy, and AI-shaped code noise without prescribing colors, fonts, or layouts.

**Why now:** The repo gained 564 stars this week, signaling a sharp uptick in developer frustration with agents shipping sparkle logos, fake metrics, and emoji-heavy copy by default.

**Build with it:** Drop the relevant `SKILL.md` into your Claude Code agent skills folder and run your next UI or copywriting prompt to see slop-free output against your own `DESIGN.md` direction.

## 9. ahujasid/mcp-for-blender <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ahujasid/mcp-for-blender · ★ 29818 (+525 this week) · 3d-modeling, ai, blender, blender-addon, blender-mcp, claude, generative-ai, llm, mcp, model-context-protocol, python

**What it does:** MCP for Blender exposes Blender's scene, objects, and modeling operations as MCP tools, letting any MCP-compatible LLM (Claude, Cursor, VS Code, etc.) create and manipulate 3D scenes via natural-language prompts.

**Why now:** The repo crossed 29,000 stars and gained 525 this week alongside a package rename from `blender-mcp` to `mcp-for-blender` on PyPI, signaling active maintenance and a broadened client support list (Codex, Devin, OpenCode, Antigravity).

**Build with it:** Run `uvx mcp-for-blender setup` to auto-configure your existing MCP client and install the Blender addon, then prompt your LLM directly to generate or modify scenes inside a live Blender session.

## 10. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 139361 (+2942 this week) · ai-tools, claude-code, codex, desktop-app, grok, grokbuild, hermes, hermes-agent, mcp, open-source, openclaw, openclaw-ui, opencode, pi, provider-management, rust, skills, skills-management, tauri, wsl-support

**What it does:** CC Switch is a Tauri-built cross-platform desktop app that lets you swap API providers (Anthropic, Kimi, and others) across Claude Code, Codex, Gemini CLI, Grok Build, and several other agentic tools from a single GUI, eliminating manual edits to JSON/TOML/YAML config files.

**Why now:** The repo gained nearly 3,000 stars this week, signaling a surge in builders actively juggling multiple AI coding agents who need a unified config layer.

**Build with it:** Use CC Switch's MCP management panel to wire a single MCP server config once and propagate it across Claude Code and OpenCode simultaneously, instead of maintaining duplicate tool entries in separate config files.
