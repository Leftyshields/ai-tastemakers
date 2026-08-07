# AI Tastemakers — Daily Brief — 2026-08-07

_Ranking: delta_7d · 10 repos · generated 2026-08-07T14:18:09.770Z_


## 1. TencentCloud/TencentDB-Agent-Memory

https://github.com/TencentCloud/TencentDB-Agent-Memory · ★ 17274 (+7766 this week) · agent, ai-agent, embedding, llm, local-first, long-term-memory, memory, openclaw-plugin, vector-search

**What it does:** TencentDB Agent Memory is a self-hosted memory layer for AI agent teams that extracts four persistent asset types — Chat Memory, Skills, LLM-Wiki, and Code-Graph — from conversations, documents, and code, then shares them across agents and sessions via vector search.

**Why now:** The repo gained 7,766 stars this week, surfacing at the top of GitHub Trending as teams running multi-agent workflows with Claude Code and similar tools hit the wall of context loss between sessions.

**Build with it:** Drop it into a Claude Code or CodeBuddy setup by running `start-all.sh`, pointing the printed one-liner at your client, and letting the OpenClaw plugin route memory reads/writes automatically — your agents inherit prior session Skills and Code-Graph entries without manual prompt stuffing.

## 2. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 42183 (+7365 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that exposes 290+ AI providers through a single OpenAI-compatible endpoint, with quota-aware fallback routing and RTK+Caveman prompt compression that reduces token usage by 15–95%.

**Why now:** The repo gained 7,365 stars this week, landing it on GitHub Trending, which coincides with growing pressure on free-tier limits as Claude Code, Codex CLI, and Cursor usage spikes among developers looking to avoid per-token costs.

**Build with it:** Point your existing Claude Code or Cursor `OPENAI_BASE_URL` config at your OmniRoute instance, define a fallback chain across Gemini Flash, GPT-4o mini, and DeepSeek in the routing config, and let the quota-aware scheduler drain free tiers before touching paid providers.

## 3. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 34211 (+6992 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source Chinese-authored book on AI Agent engineering (with 13 language translations) covering context engineering, RAG, MCP, multi-agent systems, and reinforcement learning across 10 chapters with 95 hands-on coded experiments.

**Why now:** The repo hit GitHub's Project of the Day trending banner this week with ~7K new stars, coinciding with a surge of practitioner interest in "context engineering" as the framing that's replacing prompt engineering in agent design discourse.

**Build with it:** Clone the repo, run the per-chapter Python experiments (covering tool use, agent memory, and MCP integration), and use the coding-agent chapter's code as a scaffold for wiring your own LLM loop with structured tool calls.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 98008 (+5795 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code skill/cursor rule that steers AI agents toward minimal implementations — replacing over-built solutions with native browser inputs, stdlib calls, or single lines where possible.

**Why now:** Claude Code's agent mode is seeing rapid adoption and the "agent writes too much code" complaint is a live conversation this week; Ponytail's own benchmark shows a real agentic session on a public FastAPI + React repo, giving skeptics reproducible numbers rather than marketing claims.

**Build with it:** Drop the skill into your Claude Code `CLAUDE.md` or cursor rules config, point it at a feature branch, and let it audit incoming agent diffs — the `examples/` directory shows concrete before/after substitutions you can use as acceptance criteria in your own prompts.

## 5. citrolabs/ego-lite

https://github.com/citrolabs/ego-lite · ★ 9202 (+2840 this week) · agent-skills, ai-agent, automation, browser, browser-automation, claude-code, codex, hermes-agent, skills, skills-sh

**What it does:** ego lite is a macOS browser that gives AI agents (Codex, Claude Code) isolated "Spaces" to run browser automation tasks using your existing logged-in sessions, cookies, and extensions — without touching your active tabs.

**Why now:** The repo gained 2,840 stars this week, coinciding with the surge in agentic coding tool usage around Codex and Claude Code, which lack a clean way to hand off authenticated browser state to automation tasks.

**Build with it:** Add the `ego-browser` skill via `npx skills add citrolabs/ego-lite`, then invoke it directly from your agent CLI with `/ego-browser [task]` to wire authenticated browser sessions into any Claude Code or Codex workflow without managing a separate Playwright or Puppeteer setup.

## 6. lyogavin/airllm

https://github.com/lyogavin/airllm · ★ 29820 (+5518 this week) · chinese-llm, chinese-nlp, finetune, generative-ai, instruct-gpt, instruction-set, llama, llm, lora, open-models, open-source, open-source-models, qlora

**What it does:** AirLLM runs large language models — up to 2.8T parameters — on consumer GPUs with as little as 4GB VRAM by streaming model layers (and individual MoE experts) from disk rather than loading the full model into memory, with no quantization required.

**Why now:** The July 2026 update added Kimi K3 (2.8T) support — currently the largest open-source model available — measured at 3.72GB VRAM on a single RTX 6000 Ada, making this the first practical path to running K3 locally without a multi-GPU rig.

**Build with it:** Drop it into an existing HuggingFace pipeline via `AutoModel` with a `compression_ratio` config and a local `checkpoint_path`, then layer on 8-bit/4-bit quantization flags to trade throughput for further memory headroom on a single consumer card.

## 7. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 68143 (+5363 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents scraping access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongshu without paid APIs, handling auth, IP blocks, and HTML cleanup behind a single install command pasted to your agent.

**Why now:** The repo gained 5,363 stars this week and hit GitHub Trending #1 of the day, signaling a surge of builders actively wiring internet-read access into agent workflows right now.

**Build with it:** Drop the install URL into Claude Code or Cursor's agent chat, then invoke the CLI tools directly from your agent's tool-use loop to pull Reddit threads or YouTube transcripts as clean text into any RAG or summarization pipeline.

## 8. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 103839 (+4914 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus its docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using tree-sitter AST locally, then exposes it as a `/graphify` skill inside Claude Code, Cursor, Codex, or Gemini CLI.

**Why now:** The repo gained nearly 5,000 stars this week, coinciding with the rapid adoption of agentic coding tools (Claude Code, Gemini CLI) where context retrieval over large codebases is an active, unsolved pain point for teams scaling those workflows.

**Build with it:** Wire it into an existing Claude Code or Cursor project via the MCP server config, then query cross-file call graphs and schema relationships directly from the assistant prompt instead of maintaining manual documentation or running grep pipelines.

## 9. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 238479 (+2414 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is a configuration and prompt layer ("agent harness") that adds persistent memory, security guardrails, and reusable skill definitions on top of AI coding agents like Claude Code, Codex, and Cursor.

**Why now:** Claude Code's rapid adoption has exposed a gap in session persistence and safe tool-use defaults; ECC surfaced this week with a large star spike alongside active Claude Code community discussion about reproducible agent workflows.

**Build with it:** Drop the `CLAUDE.md` config into an existing Claude Code project and wire in the `ecc-agentshield` npm package to enforce tool-use policies at the agent boundary — giving teams a concrete security checkpoint without rewriting their prompts.

## 10. esengine/DeepSeek-Reasonix

https://github.com/esengine/DeepSeek-Reasonix · ★ 32815 (+4765 this week) · agent, agent-framework, ai-agent, ai-coding, cli, coding-agent, deepseek, developer-tools, ink, llm, prompt-caching, r1, terminal, tool-use, tui, typescript

**What it does:** DeepSeek-Reasonix is a terminal-based AI coding agent written in Go, configured via `reasonix.toml`, that wraps DeepSeek models (or any OpenAI-compatible endpoint) with prefix-cache-aware session management to keep token costs low across long agentic runs.

**Why now:** The repo spiked 4,765 stars this week, landing it on GitHub Trending, coinciding with sustained developer interest in low-cost DeepSeek R1 workflows as a cheaper alternative to OpenAI-based coding agents.

**Build with it:** Drop a `reasonix.toml` into a project repo, wire in a DeepSeek API key, and configure a two-model setup (executor + planner) with custom tool plugins via the Extensions spec to automate multi-step refactoring or code review loops directly from the terminal.
