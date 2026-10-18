# AI Tastemakers — Daily Brief — 2026-10-18

_Ranking: delta_7d · 10 repos · generated 2026-10-18T16:31:21.612Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 318401 (+251483 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is an MCP server (a standardized bridge between AI agents and local tools) that lets agents inspect closed-source binaries, JavaScript/Electron apps, .NET assemblies, and websites without access to source code, using Hopper or Ghidra as the analysis backend.

**Why now:** The repository picked up over 250,000 stars this week, making it one of the most-discussed agent tooling projects in the ecosystem right now.

**Build with it:** Run `npx rea-agents setup` to register REA with Claude Code, Codex, or any compatible MCP client, then point it at a closed app to extract and replicate a specific feature.

## 2. hugohe3/ppt-master

https://github.com/hugohe3/ppt-master · ★ 63431 (+4198 this week) · ai-agent, aippt, office, powerpoint, powerpoint-generation, ppt, pptx, presentation, slide, slides

**What it does:** PPT Master is a Python AI agent that converts documents, PDFs, or topic prompts into natively editable `.pptx` files—complete with real shapes, transitions, animations, data-backed charts, and optional audio narration generated from speaker notes.

**Why now:** The repo gained 4,198 stars this week while trending on Trendshift, coinciding with the release of Kimi K3—a 3-trillion-parameter open model with a 1M-token context window that PPT Master explicitly integrates for parsing large source documents.

**Build with it:** Plug in a Kimi API key, feed PPT Master a PDF or DOCX, and point it at your own `.pptx` template file to validate the full document-to-deck pipeline in a single run.

## 3. thedotmack/claude-mem

https://github.com/thedotmack/claude-mem · ★ 101565 (+2402 this week) · ai, ai-agents, ai-memory, anthropic, artificial-intelligence, chromadb, claude, claude-agent-sdk, claude-agents, claude-code, claude-code-plugin, claude-skills, embeddings, long-term-memory, mem0, memory-engine, openmemory, rag, sqlite, supermemory

**What it does:** claude-mem is a persistent memory layer for Claude Code and compatible AI agents that records session activity, compresses it with AI, and retrieves relevant context into future sessions via SQLite and ChromaDB-backed RAG (retrieval-augmented generation).

**Why now:** The repo crossed 2,400 stars this week as demand grows for stateful Claude Code workflows alongside Anthropic's expanding agent SDK ecosystem.

**Build with it:** Add claude-mem as a plugin to an existing Claude Code project, configure the CLAUDE.md hook, and measure whether compressed session memory cuts repeated context setup across multi-day coding tasks.

## 4. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 24438 (+12614 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-configuration dsh plugin that routes requests to frontier models—DeepSeek V4.1 Flash, Kimi K3, and others via OpenCode's Zen and Kilo AI gateways—with no account, API key, or usage cap required.

**Why now:** The repo hit #1 on both Trendshift's daily and JavaScript weekly charts (week of 2026-10-05 to 2026-10-11), with 12,614 stars added this week, signaling a sharp spike in builder adoption.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's built-in forwarding port (configurable via the settings page base URL) to swap in free frontier models without touching your existing API integration code.

## 5. TauricResearch/TradingAgents

https://github.com/TauricResearch/TradingAgents · ★ 111869 (+1377 this week) · agent, finance, llm, multiagent, trading

**What it does:** TradingAgents is a Python framework that coordinates multiple LLM-powered agents—analysts, portfolio managers, and a trader—to research stocks and produce buy/sell decisions, with built-in backtesting over ticker-and-date grids using only point-in-time data to prevent lookahead bias.

**Why now:** v0.7.0 shipped this month with support for running agents directly on a ChatGPT Plus or Pro subscription, removing the OpenAI API billing requirement that had blocked many builders from experimenting.

**Build with it:** Run the CLI with `--ticker` and `--date` flags against a historical date, then compare the HTML report's decision to actual price movement to test whether the multi-agent setup adds signal over a single-model baseline.

## 6. p-e-w/heretic

https://github.com/p-e-w/heretic · ★ 35725 (+1261 this week) · abliteration, llm, transformer

**What it does:** Heretic automates "abliteration"—a technique that removes refusal behavior from open-weight LLMs by modifying specific model weights—using a TPE-based Optuna optimizer that simultaneously minimizes refusal rate and KL divergence (how far the modified model drifts from the original), requiring no knowledge of transformer internals.

**Why now:** The repo hit #1 Repository of the Day on Trendshift and gained 1,261 stars this week, backed by benchmark results showing Heretic-processed models match hand-tuned abliterations on refusal suppression while cutting KL divergence 3–6× versus existing community outputs.

**Build with it:** Run `heretic --model <your-hf-model>` against any dense or MoE transformer to produce a modified checkpoint, then use the built-in `--evaluate-model` flag to measure refusal rate and KL divergence before deploying.

## 7. walkinglabs/learn-harness-engineering

https://github.com/walkinglabs/learn-harness-engineering · ★ 20704 (+1057 this week) · agent, agentic, agentic-ai, ai, ai-agent, ai-agents, dsh, dsh-plugin, harness, harness-engineering, harness-framework, llm

**What it does:** A 14-lecture, 8-project course on building the five subsystems—instructions, tools, environment, state, and feedback—that make AI coding agents reliable rather than brittle.

**Why now:** A "Frontier Harness Design Breakdowns" section shipped in August 2026, reverse-engineering how production products implement those subsystems and giving builders concrete reference architectures instead of abstract principles.

**Build with it:** Work through the included projects to wire a state management layer into your own agent loop using the course's harness framework as the structural template.

## 8. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 283073 (+6709 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an enhancement layer that bolts skills, persistent memory, security (via `ecc-agentshield`), and research-first workflows onto existing AI coding agents—Claude Code, Codex, Cursor, and Opencode—without replacing them.

**Why now:** The repo gained over 6,700 stars this week, tracking closely with accelerating adoption of Claude Code and the MCP tooling ecosystem ECC directly targets.

**Build with it:** Install `ecc-universal` from npm into an existing Claude Code or Cursor setup and use its MCP configuration surface to add persistent memory and agent behavior presets to your current workflow.

## 9. yetone/magpie

https://github.com/yetone/magpie · ★ 15777 (+6670 this week) · claude-code, codex, deepseek, gemini-cli, llm, macos

**What it does:** Magpie is a local gateway—available as a menu bar app, TUI, CLI, or Docker container—that lets any AI coding agent (Claude Code, Codex, Gemini CLI) route through any provider or account, with automatic failover when a quota runs out mid-session.

**Why now:** The repo gained 6,670 stars this week, a spike that tracks with growing frustration over free-tier quota limits across Kimi, DeepSeek, and GLM as competing agent CLIs proliferate.

**Build with it:** Configure a routing group in the Providers page that chains two free-tier keys (e.g., Kimi + DeepSeek), point Claude Code at the Magpie local gateway URL, and let the agent roll over to the second key automatically without any config changes.

## 10. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 166796 (+6513 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent skill that enforces a YAGNI-first ("you aren't gonna need it") coding heuristic inside AI coding agents, benchmarked across 39 real tasks on a FastAPI + React repo to cut generated code by 53%, tokens by 45%, and raise test coverage of risky logic from 68% to 98%.

**Why now:** The v5 release—rebuilt from scratch with those documented benchmark results using Claude Opus 5.5—just landed, pulling in 6,500+ stars this week.

**Build with it:** Add Ponytail to Claude Code via its plugin config and run it against an existing feature branch to see which logic it flags for deletion before you ship.
