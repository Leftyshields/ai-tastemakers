# AI Tastemakers — Daily Brief — 2026-09-11

_Ranking: delta_7d · 10 repos · generated 2026-09-11T17:01:03.019Z_


## 1. kepano/obsidian-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/kepano/obsidian-skills · ★ 48175 (+8066 this week) · agents, agentskills, bases, claude, clawdbot, cli, codex, defuddle, hermes, jsoncanvas, markdown, md, obsidian, openclaw, opencode, skills

**What it does:** A collection of agent skills that teach Claude Code, Codex, and OpenCode how to read and write Obsidian-specific formats — Markdown with wikilinks, Bases `.base` files, JSON Canvas, and vault CLI operations.

**Why now:** The repo gained 8,000+ stars this week, coinciding with the Agent Skills specification gaining traction as a cross-agent standard and Obsidian's own CLI and Bases features reaching stable release.

**Build with it:** Drop the skills into `~/.claude` in your vault root, then prompt Claude Code to scaffold a Bases database from a CSV via the `knap` skill — giving you agent-generated, schema-aware `.base` files without manual syntax lookup.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 135611 (+10611 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, and ~18 others) that injects a YAGNI-first heuristic layer, steering agents toward minimal implementations — replacing, for example, a flatpickr install with a native `<input type="date">`.

**Why now:** The repo gained 10,611 stars this week, coinciding with heavy Claude Code adoption and growing frustration with agents that over-build; the benchmarks page documents a reproducible agentic test against a real FastAPI + React codebase.

**Build with it:** Drop the npm package `@dietrichgebert/ponytail` into your Claude Code or Cursor config as an agent skill, then run it against any feature branch to audit where your agent is adding unnecessary dependencies or boilerplate.

## 3. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 256344 (+8238 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is a performance optimization layer ("agent harness") for AI coding agents — Claude Code, Codex, Opencode, Cursor — adding structured skills, memory, security (AgentShield), and research-first workflows via CLAUDE.md-style configuration and MCP integration.

**Why now:** Claude Code's rapid adoption and Anthropic's push toward agentic workflows this month have made harness tooling a hot surface; this repo hit GitHub's trending list this week with 8,000+ new stars, signaling active builder demand.

**Build with it:** Drop the `ecc-universal` npm package into your Claude Code project, wire up a CLAUDE.md config to define agent instincts and memory scopes, then layer `ecc-agentshield` as a security middleware step before any autonomous tool-use runs.

## 4. heygen-com/hyperframes

https://github.com/heygen-com/hyperframes · ★ 48968 (+5030 this week) · ai, animation, ffmpeg, framework, gsap, html, mcp, puppeteer, rendering, typescript, video

**What it does:** HyperFrames is an open-source TypeScript framework that renders HTML, CSS, and GSAP animations into deterministic MP4 videos via Puppeteer and FFmpeg, designed to be driven by AI coding agents through an MCP-compatible skills system.

**Why now:** The repo spiked 5,030 stars this week, coinciding with growing adoption of agent-native tooling (Claude Code, Cursor, Gemini CLI) and the MCP ecosystem maturing enough to make programmatic video generation a practical agent workflow rather than a prototype.

**Build with it:** Run `npx hyperframes skills update` to install the core skill set into your Claude Code or Cursor project, then wire it into a content pipeline where an agent drafts HTML templates, lints them, and calls the render step to produce MP4s from structured data or LLM-generated scripts.

## 5. microsoft/markitdown

https://github.com/microsoft/markitdown · ★ 182632 (+4505 this week) · autogen, autogen-extension, langchain, markdown, microsoft-office, openai, pdf

**What it does:** MarkItDown is a Python library and CLI that converts PDFs, Office documents, images, audio, HTML, and more into Markdown, preserving headings, tables, and lists for LLM ingestion pipelines.

**Why now:** The project gained 4,500+ stars this week, signaling a surge of community adoption likely tied to growing demand for document preprocessing in agentic RAG and AutoGen workflows.

**Build with it:** Drop `markitdown` as a preprocessing step in a LangChain or AutoGen ingestion pipeline—pipe any uploaded file through `convert_stream()`, then feed the resulting Markdown directly into a vector store chunker or LLM context window.

## 6. harry0703/MoneyPrinterTurbo

https://github.com/harry0703/MoneyPrinterTurbo · ★ 122448 (+1969 this week) · ai-video-generator, content-creation, ffmpeg, instagram-reels, llm, python, short-video, subtitles, text-to-speech, tiktok, video-automation, video-workflow, workflow-automation, youtube-shorts

**What it does:** MoneyPrinterTurbo is a Python pipeline that takes a topic or keyword and automatically generates a script via LLM, fetches stock footage, synthesizes subtitles and background music, and outputs a short-form video ready for TikTok, YouTube Shorts, or Instagram Reels.

**Why now:** The project added Kimi K3 support — Moonshot AI's newly released open-weight 3T-parameter model with 1M-token context — making it a concrete integration point for testing long-context LLMs in a production video workflow rather than in toy demos.

**Build with it:** Fork the repo, swap the LLM provider key in `config.toml` to point at any OpenAI-compatible endpoint (Volcengine, Kimi, or a local Ollama instance), then expose the FastAPI layer to build a scheduled content pipeline that auto-posts platform-specific cuts from a single keyword input.

## 7. jo-inc/camofox-browser <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/jo-inc/camofox-browser · ★ 10929 (+1855 this week) · ai-agent, anti-bot, antidetect-browser, automation, bot-detection, browser-automation, cloudflare-bypass, headless-browser, javascript, nodejs, playwright, puppeteer, scraping, stealth-browser, web-scraping

**What it does:** Camofox-browser wraps the Camoufox Firefox fork (which patches fingerprint signals at the C++ level) in a REST API that serves accessibility snapshots, stable element refs, and search macros for AI agent workflows as a drop-in Puppeteer/Playwright replacement.

**Why now:** The repo gained 1,855 stars this week, signaling a surge of builder interest likely driven by growing frustration with Playwright being blocked on Cloudflare-protected targets that AI agents need to reach.

**Build with it:** Point any Puppeteer/Playwright-based agent at `http://localhost:9377`, swap page HTML reads for the accessibility snapshot endpoint (90% smaller payloads), and wire `@google_search` or `@reddit_subreddit` macros directly into your LLM tool-call schema for structured web retrieval without raw DOM parsing.

## 8. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 64757 (+3606 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hostable TypeScript gateway that exposes a single OpenAI-compatible endpoint across 352 AI providers (150+ free tiers), with quota-aware auto-fallback and RTK+Caveman prompt compression that claims 15–95% token reduction.

**Why now:** The repo gained 3,606 stars this week, a spike likely tied to growing demand for alternatives as OpenAI Codex and Claude Code usage costs compound for solo builders running long agentic sessions.

**Build with it:** Point Claude Code or Cursor at OmniRoute's local endpoint via their `OPENAI_BASE_URL` config, enable the fallback chain across Gemini, DeepSeek, and Groq free tiers, and let quota-aware routing absorb rate limits without changing your editor workflow.

## 9. mksglu/context-mode <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/mksglu/context-mode · ★ 22150 (+1798 this week) · antigravity, claude, claude-code, claude-code-hooks, claude-code-plugins, claude-code-skill, codex, codex-cli, context-mode, copilot, cursor-plugin, kiro, mcp, mcp-server, mcp-tools, openclaw, opencode, pi-agent, skills, zed-extension

**What it does:** Context Mode is a TypeScript MCP server + hooks layer that sandboxes tool output before it hits the context window, claiming 98% token reduction, plus cross-session memory persistence and routing enforcement across 17 AI coding platforms.

**Why now:** The project hit #1 on Hacker News this week with 570+ points, landing as Claude Code hooks and MCP tool chaining become standard workflows—making context bloat from Playwright snapshots and GitHub API dumps a live, daily friction point.

**Build with it:** Wire it into Claude Code via its hooks config to intercept and compress tool responses automatically, then extend the MCP server to add custom sandboxing rules for your own high-volume tools like database query outputs or log fetchers.

## 10. blader/humanizer

https://github.com/blader/humanizer · ★ 46833 (+3579 this week) · agent-skills, ai-writing, claude-code, codex, cursor, prompt-engineering, writing-tools

**What it does:** Humanizer is a Markdown-based agent skill that rewrites AI-generated text using 25 named patterns (e.g., "staged run-up," "one-line closers") to eliminate statistical defaults without altering factual content.

**Why now:** The repo gained 3,579 stars this week, coinciding with Claude Code's native `/plugin marketplace` support landing in v2.1.142, which makes skill distribution a viable first-class workflow for the first time.

**Build with it:** Drop `SKILL.md` into your Claude Code or Cursor project via `npx skills add blader/humanizer`, then wire `/humanizer` into a pre-commit or CI step that pipes draft docs through the rewrite before publish.
