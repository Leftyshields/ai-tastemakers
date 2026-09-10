# AI Tastemakers — Daily Brief — 2026-09-10

_Ranking: delta_7d · 10 repos · generated 2026-09-10T16:59:24.276Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 134470 (+13414 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin/skill for AI coding agents (Claude Code, Cursor, etc.) that injects YAGNI-first heuristics to make agents prefer minimal solutions—deleting code, using native APIs, and avoiding unnecessary dependencies.

**Why now:** The repo is trending sharply this week (134K+ stars, +13K in seven days), coinciding with surging Claude Code adoption and developer frustration with agents that over-engineer simple features like date pickers into multi-file installations.

**Build with it:** Drop the ponytail skill config into your `.claude` or cursor rules directory, then benchmark before/after on a feature branch using the included `benchmarks/` scripts to measure token cost and line-count delta on your own codebase.

## 2. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 255703 (+9584 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness optimization layer that adds persistent skills, memory, instincts, and security controls on top of AI coding agents like Claude Code, Codex, Cursor, and Opencode via shareable CLAUDE.md-style config files and MCP integration.

**Why now:** Claude Code's rapid adoption as a terminal-native coding agent has surfaced a gap in reusable, composable agent configuration — ECC targets exactly that gap as teams move from one-off prompts to repeatable agent workflows.

**Build with it:** Drop ECC's skill and memory configs into your Claude Code project root to enforce research-first coding instincts, then wire `ecc-agentshield` as an MCP server to gate destructive tool calls before they execute.

## 3. heygen-com/hyperframes

https://github.com/heygen-com/hyperframes · ★ 48662 (+4964 this week) · ai, animation, ffmpeg, framework, gsap, html, mcp, puppeteer, rendering, typescript, video

**What it does:** HyperFrames is an open-source TypeScript framework that renders HTML, CSS, and GSAP animations into deterministic MP4 videos via Puppeteer and FFmpeg, with first-class support for AI coding agents through installable skills.

**Why now:** The repo spiked nearly 5,000 stars this week, coinciding with growing adoption of agent-native tooling (Claude Code, Cursor, Gemini CLI) and MCP as an integration standard — HyperFrames ships an MCP surface alongside its skills system, landing it squarely in both trends simultaneously.

**Build with it:** Run `npx hyperframes skills update` to install the core skill set into Claude Code or Cursor, then prompt the agent to generate a timed HTML scene — the `/hyperframes` router handles the plan-animate-lint-render loop and outputs a ready MP4.

## 4. sgl-project/sglang

https://github.com/sgl-project/sglang · ★ 35762 (+2366 this week) · attention, blackwell, cuda, deepseek, diffusion, glm, gpt-oss, inference, llama, llm, minimax, moe, qwen, qwen-image, reinforcement-learning, transformer, vlm, wan

**What it does:** SGLang is a Python serving framework for large language models and multimodal models, offering high-throughput inference with features like RadixAttention, speculative decoding, and support for MoE architectures including DeepSeek.

**Why now:** This week's 2,366-star spike coincides with a published blog on day-0 support for Kimi K3 and a Google TPU integration bringing full SGLang features to non-NVIDIA hardware, two concrete deployment surface expansions that widen its practical reach.

**Build with it:** Drop SGLang into an OpenAI-compatible serving stack via its `--served-model-name` flag and REST API, then layer on chunked prefill and tensor parallelism config to serve multi-GPU DeepSeek or Qwen-VL workloads without rewriting inference logic.

## 5. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 85982 (+2352 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a collection of agent skills (prompt rules and design heuristics) you drop into Claude Code, Codex, or similar AI coding agents to steer them away from generic UI patterns toward more considered frontend output.

**Why now:** The repo gained 2,352 stars this week, signaling a surge of interest as "vibecoding" workflows mature and builders start noticing that default AI-generated frontends look identical.

**Build with it:** Add the skill files to your Claude Code project's CLAUDE.md or Codex system prompt, then pair them with React Bits components to give the agent concrete, opinionated component choices instead of fallback Tailwind boilerplate.

## 6. microsoft/markitdown

https://github.com/microsoft/markitdown · ★ 182381 (+4631 this week) · autogen, autogen-extension, langchain, markdown, microsoft-office, openai, pdf

**What it does:** MarkItDown is a Python library and CLI that converts PDFs, Office documents, images, audio, HTML, and more into Markdown optimized for LLM ingestion, preserving headings, tables, and links while staying token-efficient.

**Why now:** The project gained 4,631 stars this week, coinciding with active community discussion around using document-to-Markdown pipelines as a preprocessing step for RAG systems and agentic workflows built on AutoGen and LangChain.

**Build with it:** Drop `markitdown` as a preprocessing step in a LangChain document loader or AutoGen agent pipeline—use `convert_stream()` for untrusted input sanitization, install only the format extras you need (e.g., `markitdown[pdf,docx]`), and pipe the Markdown output directly into your chunking and embedding stage.

## 7. miuuyy/codex-chatgpt-web

https://github.com/miuuyy/codex-chatgpt-web · ★ 6177 (+2121 this week) · chatgpt, chatgpt-pro, codex, free-ai, mcp, openai, playwright, quickstart, responses-api, typescript

**What it does:** A local TypeScript bridge that intercepts Codex's Responses API and routes selected model calls through a Playwright-controlled ChatGPT Temporary Chat, exposing ChatGPT Web tiers (including Pro) as native Codex model-picker entries without consuming Codex API quota.

**Why now:** The project gained 2,121 stars this week, likely driven by builders reacting to OpenAI's Codex pricing pressure and the recent availability of the Responses API with SSE streaming as a stable integration surface.

**Build with it:** Point Codex at the local MCP server the launcher configures, select a ChatGPT Web model in Codex's native picker, and wire your existing Codex task's filesystem and shell tools through the full-mode MCP connection to get Pro-tier reasoning against your actual repo without touching your API bill.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 244144 (+4184 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python AI agent from Nous Research that creates and refines skills from experience, maintains cross-session memory via FTS5 search and LLM summarization, and runs across seven terminal backends (local, Docker, SSH, Modal, Daytona, and others) while accepting any OpenAI-compatible model endpoint.

**Why now:** The project is spiking 4,184 stars this week, coinciding with broad builder interest in persistent, model-agnostic agent frameworks as alternatives to Claude Code and Codex for long-running autonomous workflows.

**Build with it:** Wire your own model endpoint via `hermes model` against Nous Portal or OpenRouter, then use the built-in cron scheduler to deploy nightly autonomous workflows — code audits, data pipelines, or report generation — delivered to Telegram or Slack through the single gateway process.

## 9. huggingface/agents-course <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/huggingface/agents-course · ★ 32403 (+1904 this week) · agentic-ai, agents, course, huggingface, langchain, llamaindex, smolagents

**What it does:** A free, structured 4-unit course teaching AI agent development using smolagents, LangGraph, and LlamaIndex — covering agent fundamentals through agentic RAG and a graded final benchmark.

**Why now:** The repo gained nearly 1,900 stars this week, signaling a sharp uptick in developer attention that likely reflects growing demand for structured agent engineering skills as agentic frameworks mature and proliferate.

**Build with it:** Use Unit 2's smolagents module as a lightweight starting point, then extend with the LangGraph unit's production-flow controls and the bonus observability unit's tracing setup to wire a monitored, multi-framework agent pipeline.

## 10. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 64005 (+3763 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hostable TypeScript gateway that exposes 352 AI providers (150+ free tiers) behind a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman prompt compression claiming 15–95% token reduction.

**Why now:** The repo is trending at +3,763 stars this week, coinciding with heavy developer interest in cost-free alternatives as OpenAI Codex and Claude Code usage limits frustrate active coders.

**Build with it:** Point Claude Code, Cursor, or Cline at OmniRoute's endpoint by swapping the `OPENAI_BASE_URL` env var, then configure fallback chains across Gemini, DeepSeek, and Groq free tiers to keep coding sessions running without manual provider switching.
