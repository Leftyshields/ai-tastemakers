# AI Tastemakers — Daily Brief — 2026-09-14

_Ranking: delta_7d · 10 repos · generated 2026-09-14T18:37:15.428Z_


## 1. kepano/obsidian-skills

https://github.com/kepano/obsidian-skills · ★ 48315 (+8206 this week) · agents, agentskills, bases, claude, clawdbot, cli, codex, defuddle, hermes, jsoncanvas, markdown, md, obsidian, openclaw, opencode, skills

**What it does:** A collection of agent skills that teach AI coding assistants (Claude Code, Codex, OpenCode) to read and write Obsidian-specific formats — Markdown with wikilinks, Bases, JSON Canvas, and CLI interactions — following the emerging Agent Skills specification.

**Why now:** The repo gained 8,000+ stars this week, coinciding with the public rollout of the Agent Skills specification at agentskills.io and Obsidian's own CLI and Bases features reaching general availability.

**Build with it:** Install via `npx skills add` into Claude Code pointed at your vault root, then wire the `defuddle` and `knap` skills into a research-to-note pipeline that scrapes URLs, strips clutter, and batch-renders structured markdown files from CSV data.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 138229 (+7503 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that injects a "lazy senior dev" heuristic — steering the agent to delete or skip code rather than over-build, reportedly cutting generated code volume by ~54% on average across real agentic sessions.

**Why now:** The project is trending sharply this week (138k stars, +7.5k in seven days), coinciding with a published agentic benchmark comparing Ponytail against a fair baseline on FastAPI + React tasks, giving the star growth a concrete, reproducible artifact to point at.

**Build with it:** Drop the `@dietrichgebert/ponytail` npm package into an existing Claude Code or Cursor workspace as an agent skill/plugin, then run your normal feature prompts to see which tasks it short-circuits into native HTML or smaller implementations instead of dependency-heavy scaffolding.

## 3. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 258254 (+5687 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness configuration layer that adds persistent memory, security (AgentShield), and cross-tool CLAUDE.md-style instinct files to AI coding agents like Claude Code, Codex, Cursor, and Opencode.

**Why now:** Claude Code's rapid adoption as a terminal-native agentic coding tool has created demand for standardized configuration and safety scaffolding that works across competing agent runtimes — ECC targets exactly that gap with 5,000+ stars added this week.

**Build with it:** Drop the `ecc-universal` npm package into your project and use its skills/memory config surface to share persistent context and tool permissions across multiple agent runtimes without rewriting per-tool setup files.

## 4. headroomlabs-ai/headroom

https://github.com/headroomlabs-ai/headroom · ★ 72094 (+2443 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context-compression layer that shrinks tool outputs, logs, RAG chunks, and conversation history before they reach an LLM — delivering 20% token reduction for coding agents and up to 95% for JSON — via a Python/TypeScript library, an OpenAI-compatible proxy, or an MCP server.

**Why now:** The project hit #1 Repository of the Day on Trendshift this week with 2,400+ stars in seven days, coinciding with widespread builder frustration around context-window costs as long-running coding agents (Claude Code, Codex, Cursor) become standard CI workloads.

**Build with it:** Drop in the proxy with `headroom proxy --port 8787` and point your existing OpenAI-compatible agent at it with zero code changes, or use `headroom wrap claude` to intercept Claude Code sessions and automatically write learned corrections back to `CLAUDE.local.md`.

## 5. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 66656 (+2327 this week) · ai, ai-agents, ai-prompts, anthropic, chatbot, chatgpt, claude, claude-code, codex, cursor, gemini, generative-ai, google, grok, llm, openai, prompt, prompt-engineering, system-prompt, system-prompts

**What it does:** A crowd-sourced collection of verbatim system prompts extracted from ChatGPT, Claude, Gemini, Grok, Cursor, and other major AI products, organized by provider and model version and updated regularly.

**Why now:** The repo gained 2,327 stars this week, coinciding with fresh captures of Claude Fable 5.1, GPT-6-Astra Codex, and Gemini 3.8 Flash — giving builders a current diff across competing frontier models' constraint and persona layers.

**Build with it:** Load competing system prompts as reference configs when writing your own agent instructions — compare tool-call formatting, refusal phrasing, and skill scaffolding patterns (e.g., Claude Design's 53-tool setup) to inform your own prompt architecture in tools like Claude Code or Cursor.

## 6. heygen-com/hyperframes

https://github.com/heygen-com/hyperframes · ★ 49954 (+4547 this week) · ai, animation, ffmpeg, framework, gsap, html, mcp, puppeteer, rendering, typescript, video

**What it does:** HyperFrames is an open-source TypeScript framework that renders HTML, CSS, and GSAP animations into deterministic MP4 videos via Puppeteer and FFmpeg, designed to be driven by AI coding agents through a skills system.

**Why now:** The repo spiked ~4,500 stars this week, coinciding with broad builder interest in agentic video pipelines and MCP-compatible tooling that lets LLM agents author and render video without a GUI.

**Build with it:** Run `npx hyperframes skills update` to install the core skill set into Claude Code or Cursor, then wire it into a content pipeline where an agent receives a brief, writes a timed HTML template, and calls the render CLI to produce MP4s programmatically.

## 7. microsoft/markitdown

https://github.com/microsoft/markitdown · ★ 183943 (+4096 this week) · autogen, autogen-extension, langchain, markdown, microsoft-office, openai, pdf

**What it does:** MarkItDown is a Python library and CLI that converts PDFs, Office documents (Word, Excel, PowerPoint), images, audio, HTML, and more into Markdown optimized for LLM ingestion, preserving headings, tables, and lists.

**Why now:** The project crossed 183K GitHub stars with 4K added this week, coinciding with growing adoption in AutoGen and LangChain pipelines where structured document context is a persistent bottleneck.

**Build with it:** Drop `markitdown[pdf,docx,xlsx]` into a LangChain document-loader step or AutoGen tool call to replace manual text extraction — pipe the output directly into a vector store ingestion workflow using `convert_stream()` for safe, narrow I/O.

## 8. vxcontrol/pentagi

https://github.com/vxcontrol/pentagi · ★ 24395 (+1890 this week) · ai-agents, ai-security-tool, anthropic, autonomous-agents, golang, gpt, graphql, multi-agent-system, offensive-security, open-source, openai, penetration-testing, penetration-testing-tools, react, security-automation, security-testing, security-tools, self-hosted

**What it does:** PentAGI is a self-hosted, multi-agent system written in Go that autonomously plans and executes penetration testing workflows inside sandboxed Docker containers, using 20+ bundled tools (nmap, metasploit, sqlmap) and pluggable LLMs from OpenAI, Anthropic, Gemini, Bedrock, and local Ollama models.

**Why now:** The repo gained 1,890 stars this week, placing it among the top trending repositories on GitHub, signaling a sharp surge in practitioner interest around autonomous offensive-security tooling.

**Build with it:** Point it at an internal staging environment by configuring `TENANT_ID` for multi-instance isolation, wire in a local Ollama model via the custom LLM provider config, and hook Langfuse into the agent trace pipeline to audit every tool call before moving to production targets.

## 9. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 66082 (+3681 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that exposes a single OpenAI-compatible endpoint routing across 352 AI providers (150+ free tiers), with quota-aware auto-fallback and RTK+Caveman token compression claiming 15–95% token savings.

**Why now:** The repo gained 3,681 stars this week, suggesting a viral moment likely driven by cost-cutting interest as paid API budgets tighten and free-tier stacking becomes a practical engineering concern.

**Build with it:** Point Claude Code, Cursor, or Cline at the gateway's OpenAI-compatible endpoint via their custom base URL config, then enable auto-fallback across free Gemini, DeepSeek, and Groq pools to eliminate quota-hit interruptions during long coding sessions.

## 10. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 127581 (+1829 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** UI UX Pro Max is a Python-based AI skill that injects design intelligence into AI coding tools (Claude Code, Cursor, Copilot, Windsurf, etc.) via 192 reasoning rules and 79 searchable UI styles to produce professional-grade HTML/React/Tailwind interfaces.

**Why now:** The repo gained 1,829 stars this week, coinciding with growing adoption of agentic coding tools like Kiro and Trae that lack built-in design judgment, making a drop-in style layer directly useful.

**Build with it:** Install the CLI via `npm install -g ui-ux-pro-max-cli`, point it at your existing React/Tailwind project, and invoke a named UI style during a Claude Code or Cursor session to enforce consistent design decisions without manual prompting.
