# AI Tastemakers — Daily Brief — 2026-07-14

_Ranking: delta_7d · 10 repos · generated 2026-07-14T15:02:37.796Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 82883 (+7159 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt/skill layer for AI coding agents (Claude Code, Cursor, etc.) that enforces YAGNI-style minimalism — pushing the agent to delete or skip code rather than generate it, averaging 54% fewer lines of code across real benchmark tasks.

**Why now:** It trended to 82K+ stars this week as developers start measuring the cost of AI-generated bloat; the project includes a reproducible agentic benchmark against a real FastAPI + React repo, giving it unusual credibility at a moment when "AI writes too much" is becoming a concrete complaint.

**Build with it:** Drop the ponytail skill file into your Claude Code or Cursor setup, then instrument your own codebase as a benchmark target — you can fork the included benchmark harness to measure LOC, token, and cost deltas on your specific feature tickets before committing to any agent workflow.

## 2. ruvnet/RuView

https://github.com/ruvnet/RuView · ★ 80624 (+3420 this week) · awesome, claude, densepose, esp32, firmware, home-assistant, home-automation, iot, monitoring, networking, npm, pose-estimation, react, rf, self-learning, skills, spatial-intelligence, typescript, wifi, wifi-security

**What it does:** RuView uses CSI data from ~$9 ESP32 nodes to detect presence, measure breathing and heart rate, classify activity, and map rooms through walls — no cameras, no wearables, just WiFi physics processed on-device with spiking neural networks.

**Why now:** The repo cracked 80K stars this week (+3,420), surfacing renewed builder interest, though early issues flag that the system is difficult to run in practice — meaning there's real opportunity for contributors to close the gap between the ambitious README and working hardware.

**Build with it:** Flash an ESP32, pipe CSI into the Rust edge runtime, and publish the 21 semantic entities (sleeping, fall-risk, bathroom-occupied, etc.) to Home Assistant via MQTT — then layer your own models on top for elder-care alerting, energy optimization, or security without touching a single camera feed.

## 3. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 57641 (+6601 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** This repo collects and publishes extracted system prompts from major AI products—Claude, ChatGPT, Gemini, Grok, Copilot, and more—updated regularly as new model versions ship.

**Why now:** The repo gained 6,600+ stars this week, driven by fresh additions including GPT-5.6, Claude Sonnet 5, and Kimi K2.6 prompts, plus a Washington Post feature exposing how these hidden instructions shape AI behavior.

**Build with it:** Use the extracted prompts as reference architectures to design your own agent system prompts—borrowing tool-calling patterns, safety framing, and persona structures from production systems like Claude Code's 48-tool configuration or GPT-5.6's reasoning scaffolding.

## 4. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 52130 (+2537 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** /last30days is a Python-based AI agent skill that queries Reddit, X, YouTube, HN, Polymarket, TikTok, and the web in parallel, scores results by real engagement metrics (upvotes, likes, prediction market odds), and synthesizes a grounded summary of any topic from the past 30 days.

**Why now:** It hit #1 on GitHub Trending this week with 2,537 stars, signaling strong developer momentum around agent-native search that bypasses Google's editor-curated results in favor of crowd-sourced, real-time signal.

**Build with it:** Drop it into Claude Code via the marketplace and wire it to a CRM or meeting-prep workflow to auto-generate live intelligence briefs on people, companies, or competitors before every call. You could also use it as a scored trend-detection layer inside a product research or content pipeline.

## 5. router-for-me/CLIProxyAPI <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/router-for-me/CLIProxyAPI · ★ 41841 (+2487 this week) · antigravity, claude-code, cluade, codex, gemini, openai

**What it does:** CLIProxyAPI is a Go-based proxy server that wraps CLI tools like Claude Code, Codex, and Antigravity (Google Gemini) behind standard OpenAI, Gemini, and Claude-compatible API interfaces, letting you route requests through multiple accounts locally.

**Why now:** The project gained 2,487 stars this week, likely driven by the recent releases of GPT-5.5/5.6, Grok 4.3/4.5, Gemini 3.x, and Claude Fable—all of which it now supports, making free or subscription-tier access to frontier models suddenly practical via API.

**Build with it:** A builder could use this to run a personal multi-model coding agent that cycles across Claude Fable, Grok 4.5, and Gemini 3.1 Pro using free or cheap CLI subscriptions, without changing any existing OpenAI-compatible SDK code.

## 6. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 150832 (+4936 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is an API that scrapes, searches, and crawls websites at scale, converting raw web content into clean Markdown, structured JSON, or screenshots optimized for LLM consumption.

**Why now:** With 150K+ stars and nearly 5K added this week, momentum is peaking alongside growing demand for reliable web context pipelines that feed AI agents without proxy or JS-rendering headaches.

**Build with it:** Use Firecrawl's Search + Extract endpoints to build a real-time research agent that pulls live web sources, strips the noise, and returns structured data your LLM can reason over directly.

## 7. microsoft/markitdown

https://github.com/microsoft/markitdown · ★ 165843 (+2463 this week) · autogen, autogen-extension, langchain, markdown, microsoft-office, openai, pdf

**What it does:** MarkItDown is a Python library that converts PDFs, Word docs, PowerPoints, Excel files, images, audio, HTML, and more into clean Markdown optimized for LLM ingestion, preserving document structure like headings, tables, and lists.

**Why now:** It crossed 165,000 GitHub stars with 2,463 added this week, signaling rapid community adoption and active maintenance momentum worth building on now rather than later.

**Build with it:** Drop it into a document ingestion pipeline to feed structured Markdown into RAG systems or LLM agents—pair it with a vector store and you have a self-updating knowledge base that handles whatever file format users throw at it.

## 8. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 17192 (+4794 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, gemini-cli, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted AI gateway that exposes a single OpenAI-compatible endpoint routing requests across 250+ providers (90+ free tiers), with built-in token compression that cuts usage by 15–95% and automatic fallback when any provider rate-limits or fails.

**Why now:** The repo gained nearly 5,000 stars this week, signaling a surge of developers actively looking to route Claude Code, Cursor, Cline, and Codex away from paid API limits without rewriting their tooling.

**Build with it:** Drop OmniRoute in front of any OpenAI-SDK-compatible app, point it at free Gemini or Claude tiers, and ship a coding assistant or agent pipeline that survives rate limits automatically—without touching your application code or paying per token during development.

## 9. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 63356 (+4754 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a set of portable agent skills (markdown files) you drop into Codex, Cursor, or Claude Code to enforce opinionated layout, typography, spacing, and motion rules so AI-generated frontends stop looking like Bootstrap defaults.

**Why now:** It gained 4,754 stars this week, signaling a sharp builder frustration with the wave of identical-looking vibe-coded UIs shipping from AI coding agents right now.

**Build with it:** Run `npx skills add https://github.com/Leonxlnx/taste-skill` to inject the design rules into your agent workflow, then pair the image-generation skills with ChatGPT Images to produce reference mood boards that Claude Code or Codex can implement directly.

## 10. vxcontrol/pentagi <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/vxcontrol/pentagi · ★ 20544 (+2375 this week) · ai-agents, ai-security-tool, anthropic, autonomous-agents, golang, gpt, graphql, multi-agent-system, offensive-security, open-source, openai, penetration-testing, penetration-testing-tools, react, security-automation, security-testing, security-tools, self-hosted

**What it does:** PentAGI is a self-hosted, fully autonomous AI agent system that executes real penetration testing workflows inside isolated Docker containers, using 20+ tools like nmap, metasploit, and sqlmap orchestrated by LLMs from OpenAI, Anthropic, Gemini, or local Ollama models.

**Why now:** The project gained 2,375 stars this week alone, signaling a breakout moment for AI-driven offensive security tooling, and its multi-provider LLM support makes it immediately practical as teams evaluate which models perform best on real security tasks.

**Build with it:** A builder could wrap PentAGI's GraphQL API around a bug bounty automation pipeline—submit a target scope, let the agents enumerate and exploit autonomously, then pipe structured findings into a triage dashboard without manual reconnaissance steps.
