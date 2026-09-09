# AI Tastemakers — Daily Brief — 2026-09-09

_Ranking: delta_7d · 10 repos · generated 2026-09-09T17:08:58.357Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 133179 (+13484 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that injects a "laziest senior dev" persona via agent skills and cursor rules, pushing the agent to delete or simplify code rather than add to it.

**Why now:** The repo jumped 13,484 stars this week, coinciding with growing practitioner backlash against AI agents that over-engineer solutions — the date-picker-installs-flatpickr problem is a recognized pain point in agentic coding workflows right now.

**Build with it:** Drop the `@dietrichgebert/ponytail` npm package into your Claude Code or Cursor setup via the provided skill/cursor-rules config surface, and it will bias every generation session toward YAGNI-compliant, minimal output without disabling safety guards.

## 2. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 254938 (+9307 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness layer that adds structured skills, memory, instincts, and security guardrails on top of AI coding agents like Claude Code, Codex, Cursor, and Opencode via configuration and MCP integration.

**Why now:** Claude Code's rapid adoption as a terminal-native coding agent has sparked immediate demand for standardized harness tooling to govern agent behavior across sessions — ECC surfaced this week as a top trending repository on GitHub against that backdrop.

**Build with it:** Drop ECC's CLAUDE.md skill definitions and `ecc-agentshield` npm package into an existing Claude Code project to enforce security boundaries and persistent memory across agentic sessions without modifying the underlying model.

## 3. heygen-com/hyperframes

https://github.com/heygen-com/hyperframes · ★ 48310 (+4746 this week) · ai, animation, ffmpeg, framework, gsap, html, mcp, puppeteer, rendering, typescript, video

**What it does:** HyperFrames is an open-source TypeScript framework that renders HTML, CSS, and GSAP animations into deterministic MP4 videos via Puppeteer and FFmpeg, designed to run inside AI coding agents through a skill-based workflow system.

**Why now:** The project spiked nearly 5,000 stars this week, coinciding with growing adoption of agentic coding tools like Claude Code and Cursor where video generation from markup is a natural next step beyond static UI generation.

**Build with it:** Run `npx hyperframes skills update` to install the core skill set into Claude Code or Cursor, then prompt the agent to author seekable GSAP animations in HTML and pipe them through the CLI renderer to produce MP4s — no manual FFmpeg configuration required.

## 4. microsoft/markitdown

https://github.com/microsoft/markitdown · ★ 182136 (+4581 this week) · autogen, autogen-extension, langchain, markdown, microsoft-office, openai, pdf

**What it does:** MarkItDown is a Python library and CLI that converts PDFs, Office documents, images, audio, HTML, and more into Markdown optimized for LLM ingestion, preserving headings, tables, and links.

**Why now:** The project gained 4,581 stars this week, coinciding with active community discussion around structured document preprocessing as a bottleneck in RAG pipelines and agentic workflows built on AutoGen and LangChain.

**Build with it:** Drop `markitdown` as a preprocessing step in a LangChain document loader or AutoGen tool call—pipe any Office file through `convert_local()`, then feed the resulting Markdown directly into a vector store or prompt context.

## 5. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 104511 (+2290 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a Go-based Claude Code skill (plus optional local proxy) that rewrites AI agent prose responses in terse, stripped-down language, claiming a 65% reduction in output tokens and 33% in input tokens without touching code, commands, or file paths.

**Why now:** The repo is trending at +2,290 stars this week, coinciding with growing developer frustration over Anthropic's per-token billing on Claude Code's Max plan, making token reduction tooling immediately cost-relevant.

**Build with it:** Drop it into any Claude Code, Cursor, or Windsurf workflow via `npx skills add JuliusBrussee/caveman`, then layer the local proxy in front of your agent's API calls to compress both sides of the conversation — useful as a cost-control step in team setups where multiple developers share an API key budget.

## 6. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 243760 (+4354 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python AI agent from Nous Research that builds a persistent skill library from experience, maintains cross-session memory and user modeling, and runs on seven terminal backends (local, Docker, SSH, Modal, Daytona, and more) while accepting any OpenAI-compatible model endpoint.

**Why now:** The repo is spiking 4,354 stars this week, coinciding with Nous Research positioning it as a direct open alternative to Claude Code and OpenAI Codex with no model lock-in via `hermes model` switching.

**Build with it:** Wire it to your own model endpoint via Nous Portal or OpenRouter, then use the built-in cron scheduler and Telegram gateway to deploy unattended nightly audit or code-review automations that run on a serverless Modal backend and hibernate between jobs.

## 7. browser-use/browser-use

https://github.com/browser-use/browser-use · ★ 113927 (+1975 this week) · ai-agents, ai-tools, browser-automation, browser-use, llm, playwright, python

**What it does:** Browser-use is a Python library that connects LLMs to a Playwright-controlled browser, letting AI agents click, type, fill forms, and extract data from any website via natural-language task descriptions.

**Why now:** The project gained nearly 2,000 stars this week and recently shipped a hosted Cloud offering with a V4 agent API, signaling a shift from pure library to a managed-infrastructure option builders can evaluate against self-hosted setups.

**Build with it:** Wire it into an existing Python agent via `Agent(task=..., llm=...)`, swap in your preferred LLM (OpenAI, Anthropic, etc.), and expose browser automation as a tool call inside Claude Code, Cursor, or any MCP-compatible orchestrator using the `browser-use-sdk` for the cloud path.

## 8. datawhalechina/hello-agents

https://github.com/datawhalechina/hello-agents · ★ 78028 (+1955 this week) · agent, llm, rag, tutorial

**What it does:** A Chinese-language, hands-on textbook for building AI-native agents from scratch, covering core architectures (ReAct, Plan-and-Solve, Reflection), major frameworks (AutoGen, LangGraph, AgentScope), and a custom agent framework built on the OpenAI API.

**Why now:** The repo gained nearly 2,000 stars this week, coinciding with the broader 2025 "Agent year" inflection point where developer attention is visibly shifting from base-model experimentation to production agent systems.

**Build with it:** Use Chapter 7's from-scratch framework alongside Chapter 6's LangGraph walkthrough to wire a multi-agent loop with tool use, then layer in the Memory and context-engineering modules from Part 3 to add persistent state across turns.

## 9. D4Vinci/Scrapling

https://github.com/D4Vinci/Scrapling · ★ 79627 (+1914 this week) · ai, ai-scraping, automation, crawler, crawling, crawling-python, data, data-extraction, mcp, mcp-server, playwright, python, scraping, selectors, stealth, web-scraper, web-scraping, web-scraping-python, webscraping, xpath

**What it does:** Scrapling is a Python web scraping framework that handles adaptive element selection, stealth fetching via Playwright, and full-scale crawling from a single unified API.

**Why now:** The project gained nearly 2,000 stars this week and recently shipped MCP server support, making it directly callable from AI agents and tools like Claude Desktop.

**Build with it:** Register Scrapling as an MCP tool in your agent's config, then use its adaptive selectors and stealth fetchers as scraping actions your agent can invoke to pull structured data from bot-protected sites without writing custom extraction logic per page.

## 10. genspark-ai/genoffice <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/genspark-ai/genoffice · ★ 6294 (+1912 this week) · agent, agentic, ai, ai-agent, ai-agents, ai-office, docx, excel, markdown-editor, microsoft-office, office, office-agent, office-suite, pdf-converter, pdf-editor, powerpoint, pptx, spreadsheet, word-processor, xlsx

**What it does:** GenOffice is an Apache-2.0 Electron app suite that opens and saves real `.docx`, `.xlsx`, `.pptx`, PDF, and Markdown files locally, with AI editing agents (block-level diffs, web search, image generation) wired directly into each editor.

**Why now:** The project launched publicly this week, spiking 1,900+ GitHub stars and shipping a full demo video alongside downloadable binaries for macOS, Windows, and Linux — marking its first public release moment.

**Build with it:** Use the BYOK config surface (`AI Media & Search` settings) to wire your own OpenAI-compatible endpoint into the document agent, then automate local PDF → `.docx` conversion as a no-upload pipeline step inside any document-processing workflow.
