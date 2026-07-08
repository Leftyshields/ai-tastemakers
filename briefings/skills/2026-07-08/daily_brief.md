# Skill Tastemakers — Daily Brief — 2026-07-08

_Ranking: delta_7d · 10 repos · generated 2026-07-08T15:34:43.094Z_


## 1. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 86651 (+7903 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a prompt skill/plugin that instructs AI coding agents (Claude Code, Cursor, Copilot, and 30+ others) to respond in stripped-down "caveman" syntax, cutting output tokens by 65% while preserving all code, commands, and technical accuracy byte-for-byte.

**Why now:** It hit 86,651 stars with 7,903 added this week, signaling a wave of developers actively looking to reduce LLM output costs and latency without switching models or sacrificing correctness.

**Build with it:** Drop the install script into your dev environment or CI onboarding docs to immediately cut per-session token costs across your whole team, or fork the prompt levels ("grunt modes") as a starting point for building your own domain-specific verbosity controls—terse audit logs, concise code review comments, or minimal on-device agent responses.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 77692 (+7678 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that injects a "laziest senior dev" heuristic—steering the agent toward minimal, already-available solutions like native HTML inputs instead of installing full libraries.

**Why now:** It hit 77,692 stars with 7,678 added this week, signaling a fast-moving moment of developer frustration with AI agents that over-engineer by default and burn tokens doing it.

**Build with it:** Drop the skill into your Claude Code or Cursor setup to cut generated code by ~54% on average and reduce session costs ~20%—useful if you're building an AI-assisted dev tool and want a leaner, cheaper agent loop out of the box.

## 3. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 60545 (+6301 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a collection of portable "Agent Skills" — structured markdown instruction files — that you drop into Codex, Cursor, or Claude Code to enforce strong layout, typography, spacing, and motion conventions instead of generic AI-generated UI defaults.

**Why now:** It gained 6,300+ stars this week, signaling that AI-generated frontend slop has become painful enough that developers are actively reaching for guardrails to constrain what coding agents produce.

**Build with it:** Run `npx skills add https://github.com/Leonxlnx/taste-skill` to install the skills into your agent workflow, then use the image-generation skills to create reference boards in ChatGPT Images and hand those frames directly to Claude Code or Codex as visual targets for implementation.

## 4. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 53794 (+6232 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** A public GitHub repository that collects and publishes extracted system prompts from major AI products—Claude, ChatGPT, Gemini, Grok, Copilot, and others—updated regularly as new model versions ship.

**Why now:** Claude Sonnet 5 and Claude Design prompts dropped this week, and the repo crossed 53K stars with 6K+ added in seven days, signaling the developer community is actively watching and contributing.

**Build with it:** Use the leaked prompts as a reverse-engineering baseline to understand how top AI products constrain tone, tools, and behavior, then design tighter or deliberately looser system prompts for your own agent or chatbot product.

## 5. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 114777 (+3040 this week) · ai-tools, claude-code, codex, desktop-app, hermes, hermes-agent, mcp, minimax, omo, open-source, openclaw, openclaw-ui, opencode, provider-management, rust, skills, skills-management, tauri, typescript, wsl-support

**What it does:** CC Switch is a Rust/Tauri desktop app that provides a unified interface for managing multiple AI coding agents—Claude Code, Codex, Gemini CLI, OpenCode, and others—including provider switching, MCP configuration, and WSL support across Windows, macOS, and Linux.

**Why now:** The project gained 3,040 stars this week, signaling rapid adoption at a moment when developers are actively juggling competing AI coding agents and burning time on per-tool configuration overhead.

**Build with it:** Use CC Switch as a foundation to build team-shared provider configuration profiles or a CLI companion that syncs agent settings across machines, since the open-source Rust core gives you direct access to the credential and provider management layer.

## 6. iOfficeAI/OfficeCLI <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/iOfficeAI/OfficeCLI · ★ 11294 (+3024 this week) · agent, ai, claude-code, cli, codex, docx, excel, office, openclaw, pptx, presentation, skills, word, xlsx

**What it does:** OfficeCLI is a single binary that gives AI agents a structured CLI interface to create, read, and edit Word, Excel, and PowerPoint files — including rendering them to HTML or PNG — without requiring Microsoft Office or any external dependencies.

**Why now:** It hit 11,000+ stars this week with a 3,000-star surge, signaling rapid adoption at the exact moment AI coding agents like Claude Code and Cursor are becoming standard dev tools that need reliable file I/O beyond plain text.

**Build with it:** Drop the skill file into your agent and build a pipeline that takes structured data — a sales report, a research dump, a slide outline — and outputs a polished, formatted Office document your client can actually open; or wire it into a backend job that auto-generates weekly Excel dashboards from a database without touching a GUI.

## 7. headroomlabs-ai/headroom

https://github.com/headroomlabs-ai/headroom · ★ 57779 (+2735 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that shrinks tool outputs, logs, RAG chunks, and conversation history by 60–95% before they reach the LLM, using content-aware compressors that preserve the information the model actually needs.

**Why now:** With agentic AI workflows growing rapidly and context windows filling fast, token costs and rate limits are becoming real bottlenecks—Headroom addresses this directly, and its 57K+ GitHub stars this week signal strong builder demand.

**Build with it:** Drop it in as a library (`compress(messages)`), a zero-config proxy, or an MCP server to immediately cut costs and latency in any RAG pipeline, coding agent, or multi-tool workflow—without changing your prompts or model.

## 8. Graphify-Labs/graphify <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Graphify-Labs/graphify · ★ 80120 (+2664 this week) · antigravity, claude-code, codex, gemini, graphrag, knowledge-graph, leiden, openclaw, rag, skills, tree-sitter

**What it does:** Graphify turns any codebase, schema, docs, or media into a queryable knowledge graph via a `/graphify` slash command in AI coding assistants like Claude Code, Cursor, or Gemini CLI, using tree-sitter AST parsing locally for code and LLM passes for unstructured content.

**Why now:** The project gained 2,664 stars this week and recently hit YC S26, signaling strong momentum as developers increasingly reach for graph-based retrieval to outperform naive RAG on large, multi-file codebases.

**Build with it:** Drop `/graphify` into an existing Claude Code or Gemini CLI workflow to let your assistant traverse real dependency edges—function calls, schema foreign keys, infra references—rather than keyword-matching chunks, then query "what breaks if I rename this table" across your entire stack.

## 9. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 53109 (+5132 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP toolkit that gives AI agents free, zero-config access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more by handling authentication, anti-scraping workarounds, and data cleaning under the hood.

**Why now:** The project hit GitHub's #1 trending spot this week with 5,132 stars added, signaling strong developer demand for agent internet tooling at the exact moment agentic workflows are moving from demos to production pipelines.

**Build with it:** Drop `agent-reach` into any Claude Code, Cursor, or Windsurf workflow to let your agent autonomously research competitors on Twitter, summarize YouTube tutorials, or monitor Reddit threads—without paying for a single API key.

## 10. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 28413 (+4973 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that parses a codebase into a persistent knowledge graph using tree-sitter AST analysis across 158 languages, answering structural queries in under 1ms with 99% fewer tokens than file-by-file exploration.

**Why now:** It gained nearly 5,000 stars this week and ships with native support for 11 AI coding agents — including Claude Code, Cursor, Gemini CLI, and Windsurf — making it immediately useful as agentic coding workflows go mainstream.

**Build with it:** Drop this into any AI coding agent to give it instant, cheap structural awareness of a large repo — then build on top of the 14 MCP tools to power features like automated dependency mapping, cross-service call graph visualization, or refactoring agents that understand the full codebase without burning context.
