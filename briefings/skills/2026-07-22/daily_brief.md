# Skill Tastemakers — Daily Brief — 2026-07-22

_Ranking: delta_7d · 10 repos · generated 2026-07-22T15:18:50.030Z_


## 1. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 24617 (+7009 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that exposes 268+ AI providers and 500+ models through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression that cuts token usage by 15–95%.

**Why now:** The repo jumped 7,009 stars this week, signaling a surge of developers looking to dodge rate limits and API costs across Claude, GPT, Gemini, and DeepSeek simultaneously without rewriting their tooling.

**Build with it:** Drop OmniRoute in front of any Claude Code, Cursor, or Cline setup to get ~1.53B free tokens per month with automatic failover, then layer in MCP/A2A support to wire multi-agent workflows across providers without touching provider-specific SDKs.

## 2. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 93645 (+6239 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus docs, SQL schemas, PDFs, and configs—into a queryable knowledge graph using deterministic tree-sitter AST analysis locally, then exposes it as a `/graphify` skill inside Claude Code, Cursor, Codex, or Gemini CLI with every graph edge labeled as either directly extracted or inferred.

**Why now:** The project gained 6,239 stars this week, coinciding with the rapid adoption of agentic coding tools like Claude Code and Gemini CLI where navigating large, unfamiliar codebases is the primary bottleneck slowing AI agents down.

**Build with it:** Wire Graphify into an AI agent pipeline to replace brittle grep-and-embed workflows—use the knowledge graph to answer dependency, call-chain, or schema questions deterministically before letting an LLM make changes, reducing hallucinated refactors on large monorepos.

## 3. stablyai/orca

https://github.com/stablyai/orca · ★ 25778 (+6091 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source Agent Development Environment (ADE) that lets you run multiple coding agents (Claude Code, Codex, OpenCode, Pi) in parallel, each isolated in its own git worktree, with a unified desktop/mobile UI and Ghostty-class WebGL terminals.

**Why now:** It gained over 6,000 GitHub stars this week, signaling a breakout moment as developers look for practical orchestration tooling beyond single-agent workflows—and its parallel worktree model directly addresses the token-waste and context-collision problems of naive multi-agent setups.

**Build with it:** Use Orca to fan a single feature spec across five agent instances simultaneously, compare their implementations, and merge the winner—cutting iteration time for complex refactors or greenfield scaffolding without touching your own API keys.

## 4. tirth8205/code-review-graph

https://github.com/tirth8205/code-review-graph · ★ 25129 (+5641 this week) · ai-coding, claude, claude-code, code-review, graphrag, incremental, knowledge-graph, llm, mcp, python, static-analysis, tree-sitter

**What it does:** `code-review-graph` builds a persistent structural map of your codebase using Tree-sitter, then serves precise, change-aware context to AI coding tools via MCP so they read only the relevant code instead of re-scanning everything on each review.

**Why now:** The project gained 5,641 stars this week, signaling strong developer interest in token-efficient AI workflows at a moment when context costs and LLM rate limits are daily friction for teams using Claude Code, Cursor, Copilot, and similar tools.

**Build with it:** Wire it into a CI pipeline to automatically surface only the changed call graph on every PR, or expose the MCP server to a custom agent that performs targeted security or style audits scoped to genuinely affected functions rather than full-file reads.

## 5. langgenius/dify

https://github.com/langgenius/dify · ★ 149775 (+5517 this week) · agent, agentic-ai, agentic-framework, agentic-workflow, ai, automation, claude, genai, gpt, llm, low-code, mcp, nextjs, no-code, openai, orchestration, python, rag, skills, workflow

**What it does:** Dify is an open-source platform for building agentic AI workflows and RAG pipelines, with native support for LLMs like GPT and Claude, MCP tooling, and deployment options spanning cloud, VPC, or self-hosted infrastructure.

**Why now:** Dify gained 5,517 stars this week, signaling a surge in developer interest likely tied to growing demand for MCP-compatible agentic frameworks and production-ready LLM orchestration outside of vendor-locked stacks.

**Build with it:** Deploy a self-hosted AI assistant that ingests your internal documents via RAG, chains multi-step reasoning with tool calls, and ships as a production API—without rewriting your stack when you move from prototype to scale.

## 6. op7418/guizang-ppt-skill

https://github.com/op7418/guizang-ppt-skill · ★ 22100 (+2445 this week) · ai-agent, claude-code, codex, html-deck, image-generation, ppt, presentation, skill, skills, swiss-design, web-ppt

**What it does:** Guizang PPT Skill is an AI-agent skill for Claude Code and Codex that generates self-contained single-file HTML slide decks in two visual systems—an editorial magazine style and a Swiss International grid style—plus image prompts and multi-platform social covers.

**Why now:** The repo surged 2,445 stars this week, signaling strong demand for agent-native presentation tooling as Claude Code and Codex workflows become mainstream for non-engineering outputs like decks and visual assets.

**Build with it:** Drop a Markdown doc or article into your agent and get a production-ready 16:10 HTML deck with 22 locked layouts, keyboard/swipe navigation, and optional GPT-Image-generated visuals—no design tools, no PowerPoint, no manual layout work.

## 7. 1jehuang/jcode <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/1jehuang/jcode · ★ 10638 (+2301 this week) · ai, ai-agent, ai-coding-agent, claude, cli, coding-agent, llm, mcp, openai, rust, terminal, tui

**What it does:** jcode is a Rust-based terminal UI coding agent that connects LLMs (Claude, OpenAI, etc.) to your codebase with multi-session support, MCP integration, and local memory/embeddings — using as little as 27.8 MB RAM per session.

**Why now:** It gained 2,301 stars this week, signaling rapid community adoption and placing it alongside Claude Code and Codex CLI as a serious open-source alternative worth evaluating before the ecosystem consolidates.

**Build with it:** Spin up parallel agent sessions against a monorepo to run simultaneous refactors or test generation across services, or embed jcode into a CI pipeline where lightweight resource usage makes running multiple LLM agents on a single machine actually viable.

## 8. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 41107 (+2279 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that gives AI coding assistants like Claude or Cursor access to 12 production pipelines and 100+ tools to handle scripting, asset generation, stock footage retrieval, editing, and final video composition from a plain-language brief.

**Why now:** It hit #1 on GitHub Trending this week with 2,279 stars added, signaling a wave of builders actively experimenting with it right now — meaning community tooling, forks, and integrations are being built in real time.

**Build with it:** Wire it into a Claude or Cursor workflow to generate fully edited explainer videos, product demos, or documentary-style clips by describing what you want — then extend one of the 12 pipelines to add your own asset sources, branded templates, or custom narration via ElevenLabs.

## 9. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 87719 (+4023 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces radical minimalism—prompting the agent to reach for native browser APIs, stdlib, or a single line before writing any new code.

**Why now:** It's trending at 87,719 stars with 4,023 added this week, and the benchmarks show a measurable 54% reduction in lines of code and 20% cost savings on real Claude Code sessions against a real open-source repo.

**Build with it:** Drop Ponytail into your Claude Code or Cursor setup to cut bloat on any greenfield or legacy project—especially useful if you're building internal tools or MVPs where every unnecessary dependency and token costs you time and money.

## 10. KnockOutEZ/wigolo <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/KnockOutEZ/wigolo · ★ 3413 (+1809 this week) · agent, ai, ai-agent, claude, cli, developer-tools, local-first, mcp, mcp-server, metasearch, model-context-protocol, nodejs, privacy, rag, search, search-engine, typescript, web-crawler, web-scraping, web-search

**What it does:** Wigolo is a local-first MCP server that gives AI coding agents a unified interface for web search, fetch, crawl, extract, and research — no API keys, no cloud routing, no per-query cost, with all data staying in `~/.wigolo/`.

**Why now:** It gained 1,809 stars this week, signaling rapid adoption as developers look for ways to give agents like Claude Code and Cursor live web access without routing sensitive queries through third-party APIs.

**Build with it:** Drop it into any MCP-compatible agent stack with `npx wigolo init --agents=claude-code` and immediately unlock autonomous web research loops, RAG pipelines fed by live crawls, or a self-hosted metasearch layer for multi-agent workflows running entirely on your own hardware.
