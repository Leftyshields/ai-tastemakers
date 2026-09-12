# AI Tastemakers — Daily Brief — 2026-09-12

_Ranking: delta_7d · 10 repos · generated 2026-09-12T16:18:18.076Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 136406 (+8937 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent-skill plugin for Claude Code and Cursor that injects a "laziest senior dev" heuristic into AI coding agents, steering them to delete or skip code rather than generate it.

**Why now:** The project is trending sharply this week (136K stars, +8.9K), coinciding with rising community frustration over AI agents over-building simple features—the date-picker-to-flatpickr problem it directly targets.

**Build with it:** Drop the `@dietrichgebert/ponytail` npm package into an existing Claude Code or Cursor setup as a plugin skill, then measure token and line-count deltas on your next feature task using the included benchmark scripts in `/benchmarks/`.

## 2. kepano/obsidian-skills

https://github.com/kepano/obsidian-skills · ★ 48217 (+8108 this week) · agents, agentskills, bases, claude, clawdbot, cli, codex, defuddle, hermes, jsoncanvas, markdown, md, obsidian, openclaw, opencode, skills

**What it does:** A collection of agent skills that teach Claude Code, Codex, and OpenCode how to read and write Obsidian-specific formats—Markdown with wikilinks, Bases, JSON Canvas, and CLI interactions—using the emerging Agent Skills specification.

**Why now:** The repo gained 8,000+ stars this week, coinciding with rapid adoption of the Agent Skills spec across multiple coding agents (Claude Code, Codex, OpenCode) making cross-agent skill portability newly practical.

**Build with it:** Drop the skills into `~/.claude` in your vault root, then wire Claude Code to auto-generate Bases (`.base`) files from CSV data via Knap—giving you agent-driven database views inside Obsidian without manual formatting.

## 3. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 256895 (+7521 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is a performance optimization layer for AI coding agents — Claude Code, Codex, Cursor, and Opencode — adding structured skills, persistent memory, instincts, and security guardrails via MCP-compatible configuration.

**Why now:** Claude Code has seen a sharp surge in adoption following Anthropic's recent push to position it as a primary agentic coding interface, making agent harness tooling immediately practical rather than speculative.

**Build with it:** Drop the `ecc-universal` npm package into an existing Claude Code or Cursor project to wire in memory persistence and AgentShield security policies without rewriting your prompt setup.

## 4. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 179466 (+2687 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is a TypeScript API that scrapes, searches, and crawls websites at scale, converting pages—including JS-rendered ones—into clean Markdown, structured JSON, or screenshots ready for LLM consumption.

**Why now:** The project gained 2,687 stars this week, coinciding with growing MCP (Model Context Protocol) adoption that makes Firecrawl directly connectable to AI agents via a single CLI command.

## 5. heygen-com/hyperframes

https://github.com/heygen-com/hyperframes · ★ 49142 (+5035 this week) · ai, animation, ffmpeg, framework, gsap, html, mcp, puppeteer, rendering, typescript, video

**What it does:** HyperFrames is an open-source TypeScript framework that renders HTML, CSS, and GSAP animations into deterministic MP4 videos via Puppeteer and FFmpeg, designed to be driven by AI coding agents through a skill-based interface.

**Why now:** The repo spiked 5,035 stars this week, coinciding with growing adoption of MCP-compatible agent tooling and the rise of Claude Code/Cursor workflows that need programmatic video output beyond static assets.

**Build with it:** Run `npx hyperframes skills update` inside a Claude Code or Cursor project, then wire the `/hyperframes` skill router into an existing content pipeline to let agents generate MP4s directly from templated HTML components.

## 6. microsoft/markitdown

https://github.com/microsoft/markitdown · ★ 183091 (+4803 this week) · autogen, autogen-extension, langchain, markdown, microsoft-office, openai, pdf

**What it does:** MarkItDown is a Python library and CLI that converts PDFs, Office documents, images, audio, HTML, and more into Markdown optimized for LLM ingestion, preserving headings, tables, and lists while staying token-efficient.

**Why now:** The project gained ~4,800 stars this week, coinciding with growing adoption in AutoGen and LangChain pipelines where structured document ingestion is a common bottleneck.

**Build with it:** Drop `markitdown[pdf,docx,pptx]` into a RAG preprocessing step—pipe converted Markdown directly into a chunker like LangChain's `MarkdownTextSplitter` before embedding, replacing brittle custom parsers with a single `convert_local()` call.

## 7. TauricResearch/TradingAgents

https://github.com/TauricResearch/TradingAgents · ★ 104775 (+2184 this week) · agent, finance, llm, multiagent, trading

**What it does:** TradingAgents is a Python framework that orchestrates multiple LLM-powered agents (analysts, traders, portfolio managers) to research and execute financial trading decisions using real market data, sentiment, and macro signals.

**Why now:** Version 0.4.0 just shipped this week with point-in-time data fixes across FRED macro and social sentiment sources — closing look-ahead bias leaks that would have invalidated any backtest built on earlier versions.

**Build with it:** Wire in your own LLM provider (Groq, Mistral, Bedrock, or any OpenAI-compatible endpoint) via `TRADINGAGENTS_*` env vars, then plug the structured-output Trader and Portfolio Manager agents into a paper-trading loop using the CLI checkpoint resume to iterate on decision-log strategies without restarting full runs.

## 8. blader/humanizer

https://github.com/blader/humanizer · ★ 47214 (+3960 this week) · agent-skills, ai-writing, claude-code, codex, cursor, prompt-engineering, writing-tools

**What it does:** Humanizer is a Python-based agent skill (delivered as a Markdown prompt) that rewrites AI-generated text by targeting 25 specific "tells" — staging phrases, dramatic fragments, hollow closers — without altering factual content.

**Why now:** The project gained nearly 4,000 stars this week, likely surfacing alongside growing platform-level scrutiny of AI-written content as publishers and SEO tools roll out AI-detection gates.

**Build with it:** Install via `npx skills add blader/humanizer --global` and wire it into a Claude Code or Cursor post-processing step to auto-humanize generated docs, commit messages, or marketing copy before they leave the repo.

## 9. pascalorg/editor <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/pascalorg/editor · ★ 23826 (+1946 this week) · 3d, agent-skills, ai-agents, architecture, bim, cad, editor, floorplan, gemini-cli-extension, local-first, mcp, mcp-server, model-context-protocol, nextjs, parametric-design, react-three-fiber, threejs, typescript

**What it does:** Pascal Editor is an open-source, local-first 3D architectural editor built on React Three Fiber and WebGPU that exposes an MCP server so AI agents can create and manipulate building models via CLI or browser.

**Why now:** The repo gained nearly 2,000 stars this week, coinciding with the Gemini CLI extension tag and growing adoption of MCP as a standard agent tool interface across major coding assistants.

**Build with it:** Wire an AI agent into Pascal by running `pascal mcp connect` as the MCP server target, then install the `pascal-3d` or `furniture-fit` skill bundles via `npx skills add pascalorg/editor` to give the agent parametric floorplan and layout workflows without writing custom tool definitions.

## 10. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 54343 (+1880 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, from-scratch, generative-ai, llm, machine-learning, mcp, nlp, python, reinforcement-learning, rust, swarm-intelligence, transformers, tutorial, typescript

**What it does:** A 523-lesson, 20-phase open curriculum (~342 hours) teaching AI engineering hands-on across Python, TypeScript, Rust, and Julia, where every lesson produces a shippable artifact — prompt, agent, MCP server, or skill.

**Why now:** The repo gained 1,880 stars this week, likely surfacing alongside rising builder interest in MCP (Model Context Protocol) server development as a concrete, production-relevant skill beyond basic LLM wrappers.

**Build with it:** Start at Phase 14 (Agent Engineering) to wire a custom agent loop, then use the MCP server lessons to expose your agent's tools as a standardized MCP endpoint consumable by Claude Desktop or any MCP-compatible client.
