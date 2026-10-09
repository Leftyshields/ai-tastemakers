# Skill Tastemakers — Daily Brief — 2026-10-09

_Ranking: delta_7d · 10 repos · generated 2026-10-09T18:49:58.568Z_


## 1. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 66158 (+36457 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, from-scratch, generative-ai, llm, machine-learning, mcp, nlp, python, reinforcement-learning, rust, swarm-intelligence, transformers, tutorial, typescript

**What it does:** A structured, 523-lesson curriculum (Python, TypeScript, Rust, Julia) for implementing model internals, retrieval pipelines, and agent runtimes from scratch, with runnable labs and evaluation harnesses you keep.

**Why now:** The repo gained 36,000+ stars in a single week, surfacing it as a trending resource at a moment when demand for hands-on LLM and agent engineering skills is peaking.

**Build with it:** Clone the repo and work through the agent runtime phase locally, using the provided test harnesses to inspect and fix failure cases in your own tool-calling loop.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 41193 (+35877 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, ctf, decompiler, developer-tools, disassembler, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, reverse-engineering, static-analysis

**What it does:** REA is a single MCP server that gives AI agents tools to inspect native binaries, Electron/JavaScript apps, .NET assemblies, and websites without source code, using Hopper or Ghidra under the hood.

**Why now:** The repo gained nearly 36,000 stars in one week, surfacing on Hacker News multiple times as interest in agent-driven reverse engineering spiked.

**Build with it:** Run `npx rea-agents setup`, point it at a competitor's Electron app, and let your Claude Code agent explain how a specific feature works down to the decompiled binary level.

## 3. heygen-com/hyperframes

https://github.com/heygen-com/hyperframes · ★ 59677 (+34438 this week) · ai, animation, ffmpeg, framework, gsap, html, mcp, puppeteer, rendering, typescript, video

**What it does:** HyperFrames is an open-source TypeScript framework that converts HTML, CSS, and seekable animations into deterministic MP4 videos via Chrome's BeginFrame API, driven by a CLI or AI coding agent skills.

**Why now:** The repo surged 34k stars this week alongside a Hacker News thread highlighting its BeginFrame-based rendering approach, signaling a wave of builders discovering it simultaneously.

**Build with it:** Wire it into Claude Code by running `claude plugin marketplace add heygen-com/hyperframes` and prompt `/hyperframes` to generate a rendered MP4 from an existing HTML animation.

## 4. D4Vinci/Scrapling

https://github.com/D4Vinci/Scrapling · ★ 86504 (+24663 this week) · ai, ai-scraping, automation, crawler, crawling, crawling-python, data, data-extraction, mcp, mcp-server, playwright, python, scraping, selectors, stealth, web-scraper, web-scraping, web-scraping-python, webscraping, xpath

**What it does:** Scrapling is a Python web scraping framework that handles single requests through full-scale crawls, with built-in stealth (Playwright integration), adaptive CSS/XPath selectors, and an MCP server interface for AI agent use.

**Why now:** The repo gained 24,663 stars this week, signaling a sharp spike in community discovery — likely a good moment to evaluate it before the ecosystem around its MCP server surface solidifies.

**Build with it:** Drop Scrapling's MCP server into an existing AI agent workflow to give the agent structured web-fetch and extraction capabilities without writing custom scraping glue code.

## 5. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 103826 (+3362 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** Agent Skills packages 25 slash-command-driven workflows (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`, and more) that enforce senior-engineer practices — TDD, atomic commits, quality gates — inside AI coding agents like Claude Code, Cursor, and Codex.

**Why now:** The repo gained 3,362 stars this week, signaling a spike in builder interest that tracks the broader surge in agentic coding tool adoption.

**Build with it:** Run `npx skills add addyosmani/agent-skills` to drop all 25 skills into your existing Claude Code or Cursor setup and immediately gate your next feature on `/review` before merge.

## 6. eternity4719/HowToLiveBetter

https://github.com/eternity4719/HowToLiveBetter · ★ 56909 (+13553 this week) · —

**What it does:** HowToLiveBetter is a 676-item, evidence-graded Chinese life-optimization guide covering health, law, finance, and social systems, with every entry citing journal papers or official documents and specifying cost, benefit, and evidence level (A/B/C).

**Why now:** The repo gained 13,553 stars this week, signaling a sharp viral spike that makes it a live dataset for building evidence-based recommendation tooling.

**Build with it:** Load the [structured JSON/CSV dataset](https://github.com/sin0317/htlb-dataset) into a Claude Code skill using the provided [skill config](skills/life-decision-guide/README.md) to surface cited, section-referenced answers to user life-decision queries.

## 7. earendil-works/pi <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/earendil-works/pi · ★ 113778 (+1382 this week) · —

**What it does:** Pi is a minimal TypeScript agent harness with a TUI, unified LLM API, and an extension system (skills, prompt templates, themes, packages) that lets you shape the agent loop to your own workflows rather than adopting an opinionated one.

**Why now:** The repo added 1,382 stars this week, signaling a surge of builder attention worth riding early before the ecosystem fragments into competing Pi packages on npm.

**Build with it:** Write a custom Pi extension using the SDK (`@earendil-works/pi-coding-agent`) and expose it over RPC to drive Pi programmatically from your own tooling, following the OpenClaw integration pattern.

## 8. alibaba/open-code-review <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/alibaba/open-code-review · ★ 45028 (+1361 this week) · agent, agent-skills, code-review, code-review-assistant, harness, repository-level-context

**What it does:** OpenCodeReview is a CLI tool that reads Git diffs, runs them through a configurable LLM agent with tool-use capabilities, and produces structured review comments at line-level precision — with built-in rules for NPE, thread-safety, XSS, and SQL injection.

**Why now:** The repo gained 1,361 stars this week and is trending on Trendshift in both weekly and monthly Go rankings, signaling a breakout moment for community adoption after two years of internal Alibaba validation.

**Build with it:** Point it at an OpenAI- or Anthropic-compatible model endpoint, drop it into a CI step that runs on pull requests, and get automated line-level review comments without writing any review logic yourself.

## 9. firecrawl/firecrawl <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/firecrawl/firecrawl · ★ 189869 (+1343 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl converts any URL into LLM-ready output (markdown, structured JSON, or screenshots) and exposes endpoints for search, crawl, batch scrape, and browser interactions like click and scroll.

**Why now:** The repo gained 1,343 stars this week, tracking with rapid adoption of MCP tooling — Firecrawl ships a one-command MCP client connector that plugs directly into AI agent frameworks.

**Build with it:** Point Firecrawl's `/scrape` endpoint at a JS-heavy site your current pipeline fails on, pull clean markdown, and feed it directly into your LLM prompt to validate the reliability claim against your actual data source.

## 10. yihui-dev/awesome-opus5-5-videos <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/yihui-dev/awesome-opus5-5-videos · ★ 3453 (+1219 this week) · ai-video, awesome, awesome-list, claude, claude-opus, creative-coding, motion-graphics, prompts, threejs

**What it does:** A curated collection of 513 prompts (in `/prompts/` and `data/videos.json`) behind viral Claude Opus 5.5 animations built with HTML Canvas, SVG, Three.js, and GSAP, each linked to the creator's original post and a live remake.

**Why now:** The repo added 38 new motion graphics and explainer entries on 2026-10-08 and is pulling 1,219 stars this week, signaling a sharp spike in builder interest around Opus 5.5's animation capabilities.

**Build with it:** Copy a prompt from `/prompts/`, paste it into a Claude Opus 5.5 session, and use the output HTML file as a drop-in animation asset for your own project.
