# AI Tastemakers — Daily Brief — 2026-06-18

_Ranking: delta_7d · 10 repos · generated 2026-06-18T14:20:41.730Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 34845 (+30566 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt ruleset (a "skill") for AI coding agents that forces them to reach for the simplest possible solution first—native browser APIs, stdlib, one-liners—before writing any custom code, marking every shortcut with an upgrade path comment.

**Why now:** It gained 30,000+ stars this week, likely riding the wave of developers frustrated with AI agents that install three npm packages to validate an email address, and it benchmarks directly against Claude's Haiku, Sonnet, and Opus to show 80–94% code reduction.

**Build with it:** Drop the ruleset into your Claude Code or Cursor setup and build a side-by-side demo app that shows the agent's raw output versus ponytail-constrained output on the same prompts, then publish the diff as a living benchmark for your own stack.

## 2. elder-plinius/CL4R1T4S

https://github.com/elder-plinius/CL4R1T4S · ★ 42170 (+15363 this week) · agents, ai, chatgpt, gemini, google, grok, hacking, leak, leaked, openai, prompt, prompt-engineering, prompts, red-team, red-teaming, system, system-info, system-prompts, tools, transparency

**What it does:** CL4R1T4S is a public repository that collects and publishes extracted system prompts from major AI products including ChatGPT, Claude, Gemini, Grok, Cursor, and Replit, making the hidden instructions that shape AI behavior visible to anyone.

**Why now:** The repo gained over 15,000 stars this week, signaling a surge in developer interest in AI transparency at a moment when agentic AI systems with opaque instructions are being deployed at scale.

**Build with it:** A builder could use these extracted prompts as a reference corpus to audit their own AI product's prompt design, benchmark persona constraints across competitors, or build a monitoring tool that detects when a deployed model's behavior drifts from its stated instructions.

## 3. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 32752 (+11396 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, using six algorithms to shrink tool outputs, logs, RAG chunks, and conversation history by 60–95% before they consume context window tokens—with reversible caching so originals are retrievable on demand.

**Why now:** AI agents are hitting context window limits and token costs at scale, and this week's 32K+ GitHub stars signal the developer community is actively solving for this bottleneck as multi-step agentic workflows become mainstream.

**Build with it:** Drop it in as a Python/TypeScript library, a zero-code proxy in front of any OpenAI-compatible endpoint, or an MCP server to give Claude Code or Cursor dramatically longer effective memory without changing your agent's core logic.

## 4. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 34056 (+8136 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) the ability to read and search Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paying for APIs, handling cookie auth, anti-bot bypassing, and HTML cleaning under the hood.

**Why now:** The project gained 8,136 stars this week, likely driven by developers hitting walls with expensive or blocked platform APIs as they build agentic workflows that need real-time web data.

**Build with it:** Wire Agent Reach into your AI agent as a tool layer so it can autonomously research competitor mentions on Twitter, summarize YouTube tutorials, or pull GitHub issue context — all from a single `agent-reach` command with no per-call API costs.

## 5. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 196713 (+7140 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent from Nous Research that maintains a persistent learning loop — creating and refining skills from experience, modeling users across sessions, and running scheduled automations across Telegram, Discord, Slack, and CLI from a single process.

**Why now:** It gained 7,140 stars this week, signaling strong builder momentum, and its model-agnostic design now spans 200+ models via OpenRouter plus newly added providers like Xiaomi MiMo and GLM.

**Build with it:** Deploy it on a $5 VPS or serverless Modal/Daytona infrastructure and wire it to Telegram as a personal autonomous agent that writes its own skills, searches its own memory, and runs nightly jobs — all without touching your laptop.

## 6. DeusData/codebase-memory-mcp <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/DeusData/codebase-memory-mcp · ★ 6615 (+3503 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that indexes any codebase into a persistent knowledge graph using tree-sitter AST parsing across 158 languages, answering structural queries about functions, classes, and call chains in under 1ms with 99% fewer tokens than file-by-file exploration.

**Why now:** It jumped 3,503 stars this week, signaling rapid adoption among AI coding agent users, and its timing aligns with the proliferation of agents like Claude Code, Cursor, and Gemini CLI that need efficient codebase context without burning token budgets.

**Build with it:** Drop this into any agentic coding workflow to give your AI instant structural awareness of large repos — or build specialized code-review, dependency-mapping, or refactoring agents on top of its 14 MCP tools and queryable knowledge graph without writing a parser yourself.

## 7. JuliusBrussee/caveman <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/JuliusBrussee/caveman · ★ 74381 (+3471 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a Claude Code skill that rewrites AI agent output in compressed, caveman-style prose, cutting output tokens by ~75% while preserving full technical accuracy and multilingual support across configurable intensity levels (lite, full, ultra, wenyan).

**Why now:** The repo hit 74,381 stars with 3,471 added this week, signaling a sharp spike in developer frustration with verbose LLM output inflating API costs and slowing agentic loops.

**Build with it:** Drop the skill into any Claude Code, Cursor, or Cline setup to immediately slash inference costs on long coding sessions, or fork the prompt logic to build a token-budget enforcer that auto-selects compression level based on remaining context window.

## 8. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 104050 (+6773 this week) · ai-tools, claude-code, codex, desktop-app, hermes, hermes-agent, mcp, minimax, omo, open-source, openclaw, openclaw-ui, opencode, provider-management, rust, skills, skills-management, tauri, typescript, wsl-support

**What it does:** CC Switch is a cross-platform desktop app built with Tauri and Rust that centralizes management of multiple AI coding agents—Claude Code, Codex, Gemini CLI, OpenCode, and others—from a single interface, handling provider switching, MCP configuration, and credential management.

**Why now:** The project gained 6,773 stars this week, signaling that developers are actively frustrated with juggling separate configs and auth flows across a rapidly expanding set of AI coding tools.

**Build with it:** A builder could fork CC Switch to create a custom internal tool that enforces company-wide API key policies and provider routing rules across an engineering team's AI coding agents, or extend its MCP support to wire in proprietary internal tools as skills available to any connected agent.

## 9. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 46416 (+6175 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a collection of portable agent skills (markdown files) that inject design constraints—layout, typography, motion, spacing—into AI coding agents like Codex, Cursor, and Claude Code to prevent them from generating generic, boilerplate-looking UIs.

**Why now:** It gained 6,175 stars this week, signaling that "vibe coding" fatigue is real and developers are actively looking for tools to raise the baseline quality of AI-generated frontends beyond default Tailwind slop.

**Build with it:** Drop the skill files into your Codex or Claude Code workflow to get consistently opinionated, design-aware output; pair the image-generation skills with ChatGPT Images to produce reference boards, then hand those frames directly to your agent for implementation.

## 10. microsoft/markitdown

https://github.com/microsoft/markitdown · ★ 155494 (+5542 this week) · autogen, autogen-extension, langchain, markdown, microsoft-office, openai, pdf

**What it does:** MarkItDown is a Python library that converts PDFs, Word docs, PowerPoints, Excel files, images, audio, HTML, and more into clean Markdown, preserving structure like headings, tables, and lists for downstream LLM pipelines.

**Why now:** It crossed 155K GitHub stars with 5,500+ added this week alone, signaling rapid adoption as developers standardize document ingestion for RAG and agentic workflows.

**Build with it:** Drop it into a document Q&A pipeline to reliably convert mixed file uploads into LLM-ready Markdown, or wire it into an AutoGen agent that can ingest office files and URLs on demand without custom parsing logic per format.
