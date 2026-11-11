# Skill Tastemakers — Daily Brief — 2026-11-06

_Ranking: delta_7d · 10 repos · generated 2026-11-06T20:51:06.275Z_


## 1. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 143487 (+4110 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphify, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses a codebase, along with its docs, SQL schemas, configs, and PDFs, into a queryable knowledge graph using local deterministic AST parsing via tree-sitter, with no vector store required.

**Why now:** It is trending on Hacker News specifically for cutting token use in Claude Code sessions, a concrete cost problem as Claude Code adoption accelerates.

**Build with it:** Register the `/graphify` skill in your Claude Code or Cursor config to give the agent a pre-built graph of your repo's call edges and dependencies before any refactor task.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 437621 (+25840 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is an MCP server (a standard interface for wiring tools into AI agents) that connects agents to reverse engineering tools, letting them inspect binaries and runtime behavior without source code.

**Why now:** An HN thread this week drew 101 points and 39 comments around agent-driven binary analysis, signaling real builder interest rather than casual curiosity.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent and have it explain how a closed-source app feature works down to the binary level.

## 3. msitarzewski/agency-agents

https://github.com/msitarzewski/agency-agents · ★ 166928 (+1475 this week) · —

**What it does:** Agency Agents is a collection of AI agent personality files, each defining a role, workflow, and set of deliverables, installable into Claude Code, Cursor, and Gemini CLI via shell scripts or a native desktop app.

**Why now:** The repo surfaced on Hacker News this week and is tracking nearly 1,500 new stars in seven days.

**Build with it:** Copy a single agent markdown file from the `engineering/` directory into `~/.claude/agents/` and invoke it by role name inside a Claude Code session to test domain-specific behavior immediately.

## 4. mattpocock/skills

https://github.com/mattpocock/skills · ★ 316569 (+9224 this week) · —

**What it does:** A collection of small, composable agent skills for Claude Code, Codex, Copilot, and other coding agents, giving engineers fine-grained control over planning, triaging, and documentation workflows without committing to a heavier opinionated framework.

**Why now:** The repo gained over 9,000 stars this week, a sharp surge likely driven by growing frustration with heavier agent frameworks like BMAD and Spec-Kit.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to drop editable skill files into an existing Cursor project, then call `/setup-matt-pocock-skills` once to wire in your issue tracker and label conventions.

## 5. D4Vinci/Scrapling

https://github.com/D4Vinci/Scrapling · ★ 98774 (+8312 this week) · ai, ai-scraping, automation, crawler, crawling, crawling-python, data, data-extraction, mcp, mcp-server, playwright, python, scraping, selectors, stealth, web-scraper, web-scraping, web-scraping-python, webscraping, xpath

**What it does:** Scrapling is a Python web scraping framework that handles everything from single HTTP requests to full browser-based crawls, with built-in stealth, adaptive element tracking, and an MCP server interface for hooking into AI agents.

**Why now:** The repo gained over 8,000 stars this week, a spike likely tied to its MCP server support landing just as agent-based scraping workflows are becoming a common build target.

**Build with it:** Point Scrapling's MCP server at an existing AI agent to give it structured web scraping as a callable skill, using the integration docs at scrapling.readthedocs.io as the guide.

## 6. gamedev-skills/awesome-gamedev-agent-skills

https://github.com/gamedev-skills/awesome-gamedev-agent-skills · ★ 7204 (+1216 this week) · agent-skills, ai-agents, antigravity, awesome-list, claude-code, cline, codex, cursor, game-dev, game-development, gamedev, gemini-cli, github-copilot, godot, kiro, oh-my-pi, skills, unity, unreal, windsurf

**What it does:** This repo provides 77 game-dev-specific agent skills, portable SKILL.md instruction files covering Godot, Unity, Unreal, Phaser, Bevy, Roblox, and eight other engines, plus a router that auto-selects the right skills based on your engine and task.

**Why now:** The repo gained 1,216 stars this week, aligned with growing adoption of agent-native coding tools like Claude Code, Cursor, and Kiro that consume this skill format natively.

**Build with it:** Run `npx skills add gamedev-skills/awesome-gamedev-agent-skills` in an existing game project and describe your task in plain language to let the router load the matching engine skills before your agent writes any code.

## 7. thedotmack/claude-mem

https://github.com/thedotmack/claude-mem · ★ 113953 (+7971 this week) · ai, ai-agents, ai-memory, anthropic, artificial-intelligence, chromadb, claude, claude-agent-sdk, claude-agents, claude-code, claude-code-plugin, claude-skills, embeddings, long-term-memory, mem0, memory-engine, openmemory, rag, sqlite, supermemory

**What it does:** claude-mem is a persistent memory compression system for Claude Code and other AI agents that captures session activity, compresses it with AI, and injects relevant context back into future sessions via RAG and embeddings backed by SQLite or ChromaDB.

**Why now:** The repo gained nearly 8,000 stars this week, riding the broader wave of Claude Code tooling activity around Anthropic's agent SDK releases.

**Build with it:** Drop the plugin into an existing Claude Code project, configure the memory backend in the plugin settings, and get cross-session context injection without changing your agent prompts.

## 8. pbakaus/impeccable

https://github.com/pbakaus/impeccable · ★ 104718 (+7861 this week) · agent-skills, ai, anti-slop, design, slop

**What it does:** Impeccable installs slash commands such as `/impeccable critique`, `/impeccable bolder`, and `/impeccable audit` into coding agents like Claude Code, Cursor, and Codex to flag AI-generated visual defaults like Inter-for-everything and purple-to-blue gradients using 62 deterministic, no-API-key rules.

**Why now:** The repo crossed 104k stars with nearly 8k added this week, a sharp spike around the specific problem of taming aesthetic slop from coding agents.

**Build with it:** Run `npx impeccable install` from your project root, reload your agent, then run `/impeccable critique the pricing cards` to get a ranked list of usability fixes on one real component.

## 9. vercel-labs/skills

https://github.com/vercel-labs/skills · ★ 38374 (+1105 this week) · —

**What it does:** `skills` is a CLI for installing and managing reusable agent instruction sets across 75+ coding agents including Claude Code, Cursor, and Codex, pulling skill packs from GitHub sources via `npx skills add`.

**Why now:** The repo gained over 1,100 stars this week as shareable, versioned agent instructions are becoming a practical workflow need across an expanding field of coding agents.

**Build with it:** Run `npx skills add vercel-labs/agent-skills` in your project, select a skill like `web-design-guidelines`, and target a specific agent to inject reusable instructions directly into your existing coding agent config.

## 10. FailproofAI/failproofai

https://github.com/FailproofAI/failproofai · ★ 8168 (+1093 this week) · agent-failure, agent-harness, agent-observability, agent-reliability, agent-tracing, ai-agent, claude-code, codex, enforcement, evals, guardrails, hermes, hooks, llm, llm-failures, llm-observability, npm-package, observability, openclaw, reliability

**What it does:** Failproof hooks into 12 agent harnesses, including Claude Code and Codex, to capture every tool call and block dangerous actions before they execute using 40 built-in policies, all running locally with no added latency.

**Why now:** The repo gained over 1,000 stars this week, surfacing alongside rising builder concern about autonomous coding agents that can run shell commands and write files without human review.

**Build with it:** Install the `failproofai` npm package, point it at your Claude Code sessions, and enable one of the 40 built-in policies to gate tool calls before they run.
