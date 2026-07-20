# Skill Tastemakers — Daily Brief — 2026-07-20

_Ranking: delta_7d · 10 repos · generated 2026-07-20T15:21:39.536Z_


## 1. langgenius/dify <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/langgenius/dify · ★ 149479 (+5221 this week) · agent, agentic-ai, agentic-framework, agentic-workflow, ai, automation, claude, genai, gpt, llm, low-code, mcp, nextjs, no-code, openai, orchestration, python, rag, skills, workflow

**What it does:** Dify is an open-source platform for building agentic workflows and RAG pipelines with a visual editor, supporting models from OpenAI, Anthropic, and others, deployable on cloud, VPC, or self-hosted infrastructure.

**Why now:** The project gained 5,221 stars this week and recently shipped v1.0 with MCP support, making it a timely pick for teams standardizing on agentic tooling as MCP adoption accelerates.

**Build with it:** Use Dify to wire together a multi-step agent that pulls from your own document store via RAG, calls external APIs through MCP tools, and ships as a production API endpoint—without rebuilding the orchestration layer from scratch.

## 2. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 92048 (+9233 this week) · antigravity, claude-code, codex, gemini, graphrag, knowledge-graph, leiden, openclaw, rag, skills, tree-sitter

**What it does:** Graphify is a Python tool that parses any codebase, SQL schemas, docs, PDFs, images, and videos into a queryable knowledge graph using tree-sitter AST for code (fully local, no LLM required) and integrates as a `/graphify` slash command inside AI coding assistants like Claude Code, Codex, and Gemini CLI.

**Why now:** It surged 9,233 stars this week, coinciding with the rapid adoption of agentic coding tools where navigating large, multi-language codebases is the core bottleneck those assistants still struggle with.

**Build with it:** Drop it into a monorepo alongside your app code, database schema, and infrastructure configs to let your AI assistant answer cross-cutting questions like "which API endpoints touch this table" or "what breaks if I rename this function" without manual grep or context-stuffing.

## 3. stablyai/orca

https://github.com/stablyai/orca · ★ 23164 (+6497 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source desktop and mobile app that orchestrates multiple AI coding agents (Claude Code, Codex, OpenCode, Pi) in parallel, each isolated in its own git worktree so you can fan out a single prompt, compare results, and merge the winner.

**Why now:** It gained 6,497 stars this week, signaling rapid community traction, and ships with fresh Windows RC fixes alongside an Android APK — making multi-agent orchestration newly accessible across all three major platforms simultaneously.

**Build with it:** Wire Orca into your existing repo to run five agents against the same bug or feature branch in parallel, then use the mobile companion to approve or redirect agents while away from your desk — cutting iteration cycles without multiplying your attention cost.

## 4. tirth8205/code-review-graph <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/tirth8205/code-review-graph · ★ 22618 (+3164 this week) · ai-coding, claude, claude-code, code-review, graphrag, incremental, knowledge-graph, llm, mcp, python, static-analysis, tree-sitter

**What it does:** `code-review-graph` builds a persistent structural map of your codebase using Tree-sitter, then serves precise, change-aware context to AI coding tools via MCP so they read only the files and symbols that matter for a given review. It supports 14+ platforms including Claude Code, Cursor, Codex, and Gemini CLI with a single install command.

**Why now:** The project gained 3,164 stars this week, signaling strong developer pain around token waste in AI-assisted code review, and its benchmarked 38x–528x token reductions across real repositories give it concrete credibility at a moment when context window costs are a live concern.

**Build with it:** Wire it into a CI pipeline as a GitHub Action to automatically scope AI review context to only the changed call graph on every pull request, or extend its MCP server to expose custom graph queries—like "show all callers of this function across the repo"—to any MCP-compatible agent.

## 5. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 119237 (+3004 this week) · ai-tools, claude-code, codex, desktop-app, hermes, hermes-agent, mcp, minimax, omo, open-source, openclaw, openclaw-ui, opencode, provider-management, rust, skills, skills-management, tauri, typescript, wsl-support

**What it does:** CC Switch is a cross-platform Tauri/Rust desktop app that centralizes management of multiple AI coding agents—Claude Code, Codex, Gemini CLI, OpenCode, and others—letting you switch providers, manage API keys, and configure MCP tools from a single GUI.

**Why now:** The repo jumped over 3,000 stars this week, signaling a surge of developers actively juggling multiple AI coding agents and hitting friction around credential and provider switching.

**Build with it:** Fork the provider management layer to build a unified API-key vault for your team, or extend the MCP integration to wire your own internal tools into any supported agent without reconfiguring each one separately.

## 6. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 86471 (+5368 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces a "laziest senior dev" philosophy—prompting the agent to reach for the simplest possible solution, like a native HTML `<input type="date">` instead of installing a date picker library.

**Why now:** It's trending at 86k stars with 5,368 added this week, likely surfacing alongside Claude Code's growing adoption as developers look for ways to reduce the bloat those sessions produce—it benchmarks at 54% fewer lines of code and 20% lower API cost on real agentic tasks.

**Build with it:** Drop ponytail into any Claude Code or Cursor workflow to audit whether your AI is over-engineering features, then use the benchmark harness in `benchmarks/` to measure LOC and token reduction on your own codebase before committing to an architecture.

## 7. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 21045 (+5033 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that exposes 268+ AI providers and 500+ models through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression that can cut token usage by up to 95%.

**Why now:** The project gained over 5,000 stars this week, signaling strong community momentum, and its free-tier aggregation currently unlocks roughly 1.4 billion tokens per month across 39 provider pools — a meaningful cost floor for builders shipping AI products today.

**Build with it:** Point Claude Code, Cursor, Cline, or any OpenAI-compatible client at OmniRoute's single endpoint to get seamless fallback across free tiers of Claude, Gemini, GPT-4o, and DeepSeek — then layer in MCP or A2A support to wire multi-agent workflows without rewriting provider integrations each time a quota runs out.

## 8. iOfficeAI/OfficeCLI

https://github.com/iOfficeAI/OfficeCLI · ★ 20033 (+4716 this week) · agent, ai, claude-code, cli, codex, docx, excel, office, openclaw, pptx, presentation, skills, word, xlsx

**What it does:** OfficeCLI is an open-source, single-binary CLI tool that lets AI agents read, write, and render Word, Excel, and PowerPoint files without any Office installation, using a built-in HTML/PNG rendering engine to close the edit-render-verify loop.

**Why now:** The project jumped 4,716 stars this week, signaling rapid adoption at the moment agent-driven workflows are moving from demos to production pipelines that need reliable file I/O beyond plain text.

**Build with it:** Wire OfficeCLI into a Claude Code or Cursor agent to auto-generate client-ready deliverables — slide decks, financial models, or formatted reports — directly from natural language instructions, with rendered PNG previews for the agent to self-correct before handing off.

## 9. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 217624 (+4072 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent framework by Nous Research that builds skills from experience, maintains persistent memory across sessions, and runs on any model or infrastructure — from a $5 VPS to serverless GPU clusters.

**Why now:** The repo gained over 4,000 stars this week, signaling a surge in builder interest around persistent, self-improving agents that aren't locked to a single model provider or local machine.

**Build with it:** Use the built-in skill creation loop and cron scheduler to deploy an autonomous agent that learns your workflows, runs unattended tasks nightly, and stays reachable via Telegram or Discord while executing on remote infrastructure.

## 10. headroomlabs-ai/headroom

https://github.com/headroomlabs-ai/headroom · ★ 60621 (+1958 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 20–95% before they consume context window space, with no code changes required via its proxy mode.

**Why now:** With 60,000+ GitHub stars and nearly 2,000 added this week, it is gaining rapid adoption at the exact moment developers are hitting hard limits running long coding agent sessions in Claude Code, Cursor, and Codex.

**Build with it:** Drop it in front of any existing agent pipeline as a one-line proxy or Python library call, then use `headroom learn` to automatically mine failed sessions and write corrections back to your agent's memory files, compounding improvement over time.
