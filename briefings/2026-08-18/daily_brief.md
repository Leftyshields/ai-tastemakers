# AI Tastemakers — Daily Brief — 2026-08-18

_Ranking: delta_7d · 10 repos · generated 2026-08-18T13:55:40.924Z_


## 1. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 14143 (+9844 this week) · agent-skill, ai, c2pa, claude, provenance, synthid, watermark

**What it does:** A Python service plus agent skill that strips AI provenance marks from text and files — covering invisible Unicode, statistical token-sampling watermarks (SynthID-Text, Kirchenbauer-style), and C2PA/EXIF/XMP metadata from PNG, JPEG, PDF, DOCX, SVG, and more.

**Why now:** The repo spiked nearly 10,000 stars this week, likely tracking renewed attention to C2PA adoption and SynthID-Text's expanding deployment — two provenance systems now shipping in production AI pipelines that creators handling their own content increasingly want to audit or remove.

**Build with it:** Drop the `remove-ai-marks` skill into `.grok/skills/` and stand up `service/scripts/server.py` on port 8765, then wire `/remove-ai-marks` into a document processing pipeline to sanitize AI-generated drafts before publishing — or hit the HTTP service directly from any CI step to strip C2PA metadata from generated images at export time.

## 2. hugohe3/ppt-master

https://github.com/hugohe3/ppt-master · ★ 47700 (+3371 this week) · ai-agent, aippt, office, powerpoint, powerpoint-generation, ppt, pptx, presentation, slide, slides

**What it does:** PPT Master is a Python library that converts documents or topic strings into natively editable `.pptx` files, using an AI agent loop to generate real PowerPoint shapes, transitions, animations, data-backed charts, and audio narration from speaker notes — with support for custom `.pptx` templates.

**Why now:** The project gained 3,371 stars this week, coinciding with the Kimi K3 sponsorship announcement — K3 is a newly released open 3-trillion-parameter model with a 1M-token context window, making long-document-to-deck pipelines newly practical without chunking hacks.

**Build with it:** Point it at a PDF or DOCX via the document ingestion path, supply a corporate `.pptx` template, and wire the output step into a CI job or n8n workflow to auto-generate client-ready slide decks whenever a report drops.

## 3. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 50230 (+5359 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that exposes a single OpenAI-compatible endpoint across 340 AI providers, routing requests with quota-aware fallback and stacking ~1.51B free tokens/month from documented free tiers across 42 provider pools.

**Why now:** The repo gained 5,359 stars this week, likely driven by OpenAI Codex's launch and the concurrent wave of Claude Code and Cursor usage—all three tools are explicitly supported, making OmniRoute a direct answer to users hitting rate limits across competing coding agents simultaneously.

**Build with it:** Point Claude Code, Cursor, or Cline at OmniRoute's endpoint via their `OPENAI_BASE_URL` config, enable RTK+Caveman compression in the dashboard to cut prompt token costs 15–95%, and use the `/dashboard/free-tiers` page to monitor which provider pools are exhausted before your pipeline breaks.

## 4. harry0703/MoneyPrinterTurbo

https://github.com/harry0703/MoneyPrinterTurbo · ★ 107721 (+5259 this week) · ai-video-generator, content-creation, ffmpeg, instagram-reels, llm, python, short-video, subtitles, text-to-speech, tiktok, video-automation, video-workflow, workflow-automation, youtube-shorts

**What it does:** MoneyPrinterTurbo is a Python tool that takes a topic or keyword and automatically generates a short video — writing the script via LLM, fetching stock footage, generating subtitles, adding background music, and rendering a final MP4 through FFmpeg.

**Why now:** The repo gained 5,259 stars this week and sits at #1 on Trendshift, coinciding with its Kimi K3 integration — a newly released open-source 3T-parameter model with 1M token context that the project now uses to drive script writing and footage keyword extraction.

**Build with it:** Fork the repo, point `config.toml` at your preferred LLM API (OpenAI-compatible endpoints work), and plug it into a n8n or Make workflow via its REST API to auto-publish vertical videos to TikTok or YouTube Shorts on a schedule.

## 5. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 105157 (+5222 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code skill/agent plugin that injects "lazy senior dev" heuristics into AI coding agents, steering them toward minimal solutions — native HTML inputs over npm packages, one-liners over wrapper components — measured at ~54% fewer lines of code on real FastAPI + React tasks.

**Why now:** The project is trending at +5,222 stars this week, coinciding with growing community fatigue around AI agents that over-engineer: the `<input type="date">` vs. flatpickr example is exactly the failure mode developers are actively complaining about in Claude Code threads.

**Build with it:** Drop the skill into your Claude Code config via `@dietrichgebert/ponytail` on npm, then wire it to your existing CLAUDE.md or cursor rules file so every agent session enforces YAGNI constraints before the first token of generated code ships.

## 6. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 117823 (+2597 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** A Python-based AI skill that injects design system reasoning into coding agents (Claude, Cursor, Copilot, Windsurf, Kiro) by encoding 192 layout and styling rules plus 79 searchable UI styles into the agent's context at generation time.

**Why now:** Kiro's launch this week as Amazon's spec-driven AI IDE added a new agentic surface where design coherence breaks down fast — this skill's multi-platform hook pattern directly targets that gap alongside the existing Claude Code and Windsurf integrations already in its topic list.

**Build with it:** Install the `ui-ux-pro-max-cli` npm package, drop the generated skill file into your `.claude`, `.cursor`, or `.kiro` config directory, then invoke the Design System Generator at the start of a new landing page task to get a structured section plan (Hero → Services → Testimonials → Booking) before any code is written.

## 7. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 168934 (+4230 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is an API that scrapes, searches, and crawls websites at scale, returning clean Markdown, structured JSON, or screenshots from any URL — including JS-heavy pages — without requiring proxy configuration or browser orchestration.

**Why now:** Firecrawl gained 4,230 stars this week alongside the release of its MCP (Model Context Protocol) server support, making it directly connectable to Claude and other MCP-compatible agents via a single CLI command.

**Build with it:** Wire Firecrawl's `/scrape` endpoint into a LangChain or LlamaIndex retrieval pipeline to replace brittle BeautifulSoup scrapers, using the `formats: ["markdown"]` parameter to feed clean context directly into an LLM prompt without token-wasting HTML noise.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 232368 (+4100 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python agent from Nous Research that creates and refines skills from experience, maintains cross-session memory, and runs across seven terminal backends (local, Docker, SSH, Modal, Daytona, and others) while accepting any OpenAI-compatible model endpoint.

**Why now:** The repo is pulling 4,100 stars this week, coinciding with growing builder interest in agents that aren't locked to a single provider or local machine — a direct response to the Claude Code and Codex wave forcing comparisons around portability and learning loops.

**Build with it:** Drop in your own model via `hermes model` pointing to an OpenRouter or Nous Portal endpoint, then wire the Telegram gateway to a Modal serverless backend so your agent hibernates when idle and wakes on incoming messages — giving you a persistent, cloud-hosted coding assistant for near-zero cost between sessions.

## 9. lidge-jun/opencodex

https://github.com/lidge-jun/opencodex · ★ 10931 (+2049 this week) · ai-gateway, ai-tools, anthropic, chatgpt, claude, claude-code, codex, codex-cli, deepseek, developer-tools, gemini, grok, kiro, llm, llm-proxy, ollama, openai, openrouter, proxy, typescript

**What it does:** opencodex is a local proxy server that translates OpenAI's Responses API into provider-specific formats, letting Codex CLI, Claude Code, Claude Desktop, and Grok Build route requests to Claude, Gemini, DeepSeek, Ollama, or any OpenAI-compatible endpoint without modifying the client tools.

**Why now:** The project gained 2,049 stars this week, coinciding with active developer frustration around OpenAI Codex CLI's locked provider model and Claude Code's lack of bring-your-own-model support — opencodex directly addresses both by acting as a drop-in shim at the API layer.

**Build with it:** Point Codex CLI or Claude Code at `localhost:10100` via their `OPENAI_BASE_URL` config, then wire in a self-hosted Ollama instance or DeepSeek endpoint through the dashboard's provider routing table to run cost-controlled coding sessions without touching the client tools themselves.

## 10. holaboss-ai/holaOS

https://github.com/holaboss-ai/holaOS · ★ 9677 (+4081 this week) · agent, agent-harness, agent-os, agentic, ai, ai-agent, ai-agents, artificial-intelligence, claude-code, codex, electron, holaboss, holaos, llm, mcp, memory, model-context-protocol, runtime, typescript, workspace

**What it does:** holaOS is a local-first Electron desktop workspace that runs Claude Code, Codex, or its own agent side-by-side, sharing a single structured memory store, 100+ tool integrations, and MCP connections across sessions.

**Why now:** The project gained 4,081 stars this week, coinciding with the broader developer shift toward agent harnesses that aren't tied to a single provider — a pattern accelerated by Anthropic and OpenAI both pushing agentic coding tools simultaneously.

**Build with it:** Drop your own MCP server into the workspace config to expose custom tools, then use the shared memory layer to persist project context across Claude Code and Codex runs — so switching models mid-task doesn't lose accumulated state.
