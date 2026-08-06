# AI Tastemakers — Daily Brief — 2026-08-06

_Ranking: delta_7d · 10 repos · generated 2026-08-06T13:52:16.676Z_


## 1. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 72957 (+4069 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste Skill is a collection of portable agent skills — prompt-based instructions covering layout, typography, motion, and spacing — that you drop into Codex, Cursor, or Claude Code to stop those tools from generating generic boilerplate UI.

**Why now:** The repo gained 4,069 stars this week, coinciding with Claude Code's expanded availability and Codex's public rollout, both of which have surfaced the "AI UI looks the same" problem visibly enough that anti-slop tooling is now a named category.

**Build with it:** Add the relevant `.md` skill files to your Claude Code project instructions or Cursor rules directory, then pair the included image-generation skills with ChatGPT Images to produce a reference board — hand that board back to Codex or Claude Code as a visual spec and let the taste skills govern the implementation output.

## 2. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 41322 (+7507 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that proxies 290+ AI providers through a single OpenAI-compatible endpoint, with quota-aware fallback routing and RTK+Caveman prompt compression that can cut token usage by 15–95%.

**Why now:** The repo gained 7,507 stars this week, suggesting a surge driven by developers hitting rate limits across Claude Code, Codex, and Cursor simultaneously as those tools see wider adoption — OmniRoute's free-tier aggregation (~1.53B tokens/month from 43 provider pools) directly addresses that ceiling.

**Build with it:** Point your existing `OPENAI_BASE_URL` in Claude Code, Cursor, or Cline to your OmniRoute instance and configure a fallback chain (e.g., Claude Sonnet → Gemini 2.5 Flash → GPT-4o mini) via the routing strategy config — no SDK changes required.

## 3. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 33458 (+7468 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source Chinese-authored book (with 13 language translations) covering AI Agent design and engineering across 10 chapters, paired with 95 runnable experiments spanning RAG, MCP, multi-agent systems, context engineering, and reinforcement learning.

**Why now:** The repo gained 7,468 stars this week alone and hit GitHub's Project of the Day, signaling a surge of builder interest in structured, code-first Agent learning resources as MCP and context engineering move from hype to production practice.

**Build with it:** Clone the repo, run the chapter-aligned Python experiments locally (e.g., the MCP or multi-agent labs), and use the context-engineering and agent-memory sections as a structured design reference when architecting tool-calling or RAG pipelines in your own LLM stack.

## 4. TencentCloud/TencentDB-Agent-Memory

https://github.com/TencentCloud/TencentDB-Agent-Memory · ★ 15836 (+6482 this week) · agent, ai-agent, embedding, llm, local-first, long-term-memory, memory, openclaw-plugin, vector-search

**What it does:** TencentDB Agent Memory is a self-hosted memory layer for AI agent teams that extracts four structured asset types — Chat Memory, Skills, LLM-Wiki, and Code-Graph — from conversations, documents, and code, then makes them retrievable across agents and sessions.

**Why now:** The repo gained 6,482 stars this week, surfacing as a trending TypeScript project at a moment when teams running multi-agent workflows with Claude Code or similar tools are actively hitting the "re-explain everything each session" wall.

**Build with it:** Drop it into a Claude Code or CodeBuddy setup via the included Docker Compose stack (`deploy/global-images/start-all.sh`), then configure the OpenClaw plugin endpoint so your agent automatically reads and writes Skills and Chat Memory without manual context injection.

## 5. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 97201 (+5732 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt-engineering skill/plugin for AI coding agents (Claude Code, Cursor, and 19 others) that instructs them to default to the simplest possible solution — native browser APIs, stdlib, one-liners — before reaching for libraries or abstractions.

**Why now:** The project hit 97k stars with 5,732 added this week alongside a published agentic benchmark showing measurable, reproducible reductions (54% fewer lines, 20% lower cost) against a real FastAPI + React repo, giving it concrete numbers rather than just a philosophy.

**Build with it:** Drop the skill config into your `.claude/` or cursor rules directory, then run your existing agent sessions — no code changes required; the reduction shows up in `git diff` output on feature tickets you're already writing.

## 6. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 114044 (+2681 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** A prompt-engineering skill layer — delivered as a config file or CLI install — that injects 161 reasoning rules and 84 named UI styles into AI coding tools (Claude, Cursor, Copilot, Windsurf, Kiro) to steer generated code toward defensible design decisions rather than default Bootstrap mediocrity.

**Why now:** Kiro launched this week as Amazon's new spec-driven AI IDE, and the repo already lists it as a supported target alongside Cursor and Windsurf — making this one of the first published skill configs with explicit Kiro support at launch.

**Build with it:** Drop the skill file into your `.cursor/rules`, Claude `CLAUDE.md`, or Kiro spec directory, then prompt for a landing page — the design system generator outputs a structured layout prescription (hero pattern, section order, CTA placement) before any code is written, giving you a reviewable design decision layer between prompt and component.

## 7. lyogavin/airllm

https://github.com/lyogavin/airllm · ★ 29452 (+5199 this week) · chinese-llm, chinese-nlp, finetune, generative-ai, instruct-gpt, instruction-set, llama, llm, lora, open-models, open-source, open-source-models, qlora

**What it does:** AirLLM runs large language models — including 70B Llama, 405B Llama 3.1, 671B DeepSeek-V3, and the 2.8T Kimi K3 — on consumer GPUs with as little as 4GB VRAM by streaming model layers from disk rather than loading the full model into memory, with no quantization required.

**Why now:** Kimi K3 (2.8T parameters), the largest open-source model released to date, just landed with AirLLM support this month, making it the only practical path to running it on a single card — measured at 3.72GB VRAM end-to-end on an RTX 6000 Ada.

**Build with it:** Drop AirLLM into an existing Hugging Face inference workflow via `AutoModel`, point it at a local sharded checkpoint or Hub model ID, and serve DeepSeek-V3 or Qwen3-235B from a single consumer GPU — the `compression_ratio` config and optional FP8 loading are the main tuning surfaces.

## 8. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 103299 (+5084 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus its docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using tree-sitter AST locally, exposing it as a `/graphify` skill inside Claude Code, Cursor, Codex, and Gemini CLI via MCP.

**Why now:** The project is trending at +5,084 stars this week, coinciding with the rapid adoption of Claude Code and Gemini CLI as primary agentic coding environments where context retrieval over large repos is an active pain point.

**Build with it:** Wire Graphify as an MCP server into your Claude Code `settings.json`, then use the `/graphify` skill to answer cross-file dependency questions—replacing ad-hoc grep workflows with structured graph queries over call edges, imports, and schema relationships.

## 9. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 67313 (+5045 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents structured access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paid APIs, by handling authentication, rate limits, and HTML-to-readable-text conversion behind a single install command.

**Why now:** The project hit GitHub Trending #1 this week with 5,045 stars added, coinciding with broad adoption of Claude Code and Cursor as agentic coding tools that lack native web-reading capabilities.

**Build with it:** Drop Agent Reach into a Claude Code or Cursor workflow by pasting the one-line install prompt into your agent chat, then wire its CLI tools as MCP tool calls to let your agent fetch YouTube transcripts or Reddit threads as context during code research tasks.

## 10. lidge-jun/opencodex

https://github.com/lidge-jun/opencodex · ★ 7961 (+2262 this week) · ai-gateway, ai-tools, anthropic, chatgpt, claude, claude-code, codex, codex-cli, deepseek, developer-tools, gemini, grok, kiro, llm, llm-proxy, ollama, openai, openrouter, proxy, typescript

**What it does:** opencodex is a local TypeScript proxy that translates OpenAI's Responses API into provider-specific formats, letting Codex CLI, Claude Code, Claude Desktop, and Grok Build route requests to any LLM backend — Claude, Gemini, DeepSeek, Ollama, and 40+ others — including a ChatGPT account pool manager for quota balancing.

**Why now:** The project gained 2,262 stars this week, likely driven by growing friction around Codex and Claude Code's locked provider models as GPT-5 and Claude Opus 4 pricing pushes teams toward cheaper alternatives like DeepSeek and Ollama for agentic workloads.

**Build with it:** Run `ocx init` to wire the proxy into an existing Claude Code or Codex CLI setup, then use `ocx provider add` and `ocx combo set` against the live proxy to swap in a self-hosted Ollama model mid-workflow — no changes to the client tooling required.
