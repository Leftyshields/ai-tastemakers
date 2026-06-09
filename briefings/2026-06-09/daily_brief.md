# AI Tastemakers — Daily Brief — 2026-06-09

_Ranking: bootstrap_since_first_seen · 10 repos · generated 2026-06-09T13:32:36.759Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_since_first_seen`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 36298 (+7534 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** `/last30days` is a Python AI agent skill that runs parallel searches across Reddit, X, YouTube, TikTok, HN, Polymarket, and GitHub, then scores results by real engagement signals (upvotes, likes, real-money prediction odds) and synthesizes them into a single grounded brief.

**Why now:** It hit #1 on GitHub Trending this week with 7,534 stars in seven days, coinciding with a wave of Claude Code and agent skill infrastructure maturing enough to make multi-platform, bring-your-own-key searches practical for individual developers.

**Build with it:** Drop it into any Claude Code, Cursor, or Codex workflow as a pre-meeting research step, a competitive intel layer, or the retrieval backbone for an agent that needs recency-grounded context rather than stale training data.

## 2. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 19876 (+4070 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 60–95% using six algorithms, available as a Python/TypeScript library, a drop-in proxy, or an MCP server.

**Why now:** With nearly 20k stars and 4,070 added this week, it's hitting at the moment when agent context windows are filling up fastest—long-running Claude Code and Codex sessions routinely burn tokens on verbose tool outputs and repeated file reads that don't need to hit the model verbatim.

**Build with it:** Drop `headroom proxy --port 8787` in front of any existing OpenAI-compatible agent to instantly cut costs with zero code changes, or use the MCP server to wire `headroom_compress` and `headroom_retrieve` directly into Claude Code sessions that churn through large codebases.

## 3. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 39173 (+3957 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a collection of portable agent skills (markdown files) you drop into Codex, Cursor, or Claude Code to enforce opinionated layout, typography, spacing, and motion rules—replacing generic AI-generated UI with intentional design decisions.

**Why now:** It gained nearly 4,000 stars this week as vibe-coding workflows mature and developers hit the ceiling of what default AI output looks like, making design quality the next obvious bottleneck to solve.

**Build with it:** Drop the `design-taste-frontend` skill into your Claude Code or Cursor project and immediately get better component output—then layer in the image-generation skills to produce reference boards in ChatGPT Images and hand those frames directly to your agent for pixel-closer implementation.

## 4. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 25237 (+2949 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) authenticated, structured access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and a dozen more platforms—no paid APIs, no manual scraping setup, installed via a single prompt to your agent.

**Why now:** It gained nearly 3,000 stars this week, signaling rapid adoption at the exact moment developers are hitting the wall of AI agents that can reason but can't reliably read the live web.

**Build with it:** Wire it into a Claude Code or Cursor workflow to build agents that do real-time competitive research, trend monitoring, or content aggregation across Chinese and Western platforms simultaneously—without writing a single scraper or managing a single API key.

## 5. santifer/career-ops

https://github.com/santifer/career-ops · ★ 51152 (+1846 this week) · ai-agent, anthropic, automation, career, careerops, claude, claude-code, cli, golang, interview-prep, job-search, open-source, resume

**What it does:** Career-Ops is an open-source, AI-powered job search system that uses Claude Code and other AI CLIs to automate job evaluation, generate personalized CVs, and manage applications at scale — reportedly processing 740+ listings to land one targeted role.

**Why now:** The repo is trending hard this week with 1,846 new stars, fresh press from WIRED and Business Insider, and a moment where AI-assisted hiring filters are forcing candidates to respond in kind.

**Build with it:** Fork the pipeline to build a niche version — say, a freelance contract scanner or a recruiting tool that scores inbound candidates against a role spec — since the 14 skill modes and batch PDF generation give you a working scaffold for any document-heavy AI workflow.

## 6. D4Vinci/Scrapling

https://github.com/D4Vinci/Scrapling · ★ 62388 (+800 this week) · ai, ai-scraping, automation, crawler, crawling, crawling-python, data, data-extraction, mcp, mcp-server, playwright, python, scraping, selectors, stealth, web-scraper, web-scraping, web-scraping-python, webscraping, xpath

**What it does:** Scrapling is a Python web scraping framework that handles everything from single HTTP requests to full-scale crawls, with built-in stealth capabilities, adaptive selectors, Playwright browser automation, and an MCP server interface for AI agent integration.

**Why now:** It gained 800 stars this week, signaling fresh community momentum, and its MCP server support makes it immediately relevant as developers race to give AI agents reliable, anti-detection web access.

**Build with it:** Wire Scrapling's MCP server into a Claude or GPT-based agent to let it autonomously scrape, monitor, and extract structured data from bot-protected sites without writing custom anti-detection logic from scratch.

## 7. datawhalechina/hello-agents

https://github.com/datawhalechina/hello-agents · ★ 57813 (+751 this week) · agent, llm, rag, tutorial

**What it does:** Hello-Agents is a structured, open-source Chinese-language curriculum that teaches you to build AI-native agents from first principles—covering ReAct/Plan-and-Solve patterns, multi-agent systems, memory, context engineering, and model fine-tuning (SFT to GRPO)—using raw OpenAI APIs rather than no-code wrappers.

**Why now:** The project gained 751 stars this week, signaling a surge in developers moving beyond prompt engineering toward building production agent systems as 2025 consolidates around agentic architectures.

**Build with it:** Use the included HelloAgents micro-framework as a scaffold to wire up your own tool-calling loop, then layer in the Memory and multi-agent coordination chapters to ship a real application like the travel assistant or virtual town demos provided.

## 8. nexu-io/html-video

https://github.com/nexu-io/html-video · ★ 2428 (+722 this week) · ai-agent, apache-2, coding-agent, css, ffmpeg, html, html-to-video, hyperframes, mp4, open-design, open-source, programmatic-video, video, video-as-code, video-generation

**What it does:** html-video converts HTML, CSS, and data into real MP4 files locally, using pluggable render engines (ffmpeg-backed) and 21 pre-built animated templates, with no per-render fees or cloud dependency.

**Why now:** Coding agents like Claude Code, Cursor, and Codex are getting serious traction for generating structured content, and this week's spike suggests builders are discovering a direct path from "agent writes HTML" to "agent exports a finished video" without leaving the local loop.

**Build with it:** Point an agent at a GitHub repo or article URL and have it auto-generate a narrated, animated explainer video — useful for changelogs, data stories, or product demos that ship as standalone MP4s.

## 9. hugohe3/ppt-master

https://github.com/hugohe3/ppt-master · ★ 25511 (+705 this week) · ai-agent, aippt, office, powerpoint, powerpoint-generation, ppt, pptx, presentation, slide, slides

**What it does:** PPT Master is a Python tool that takes any document and generates a fully editable .pptx file with native shapes, animations, speaker notes, and optional audio narration — using your own template if you have one.

**Why now:** It gained 705 stars this week, signaling a surge of developer interest, and v2.9.0 just shipped with narrated slide support that auto-voices speaker notes through PowerPoint's built-in playback.

**Build with it:** Wire it into a document pipeline — feed it research papers, reports, or meeting transcripts — and output client-ready, branded decks programmatically without touching PowerPoint manually.

## 10. esengine/DeepSeek-Reasonix

https://github.com/esengine/DeepSeek-Reasonix · ★ 20206 (+1371 this week) · agent, agent-framework, ai-agent, ai-coding, cli, coding-agent, deepseek, developer-tools, ink, llm, prompt-caching, r1, terminal, tool-use, tui, typescript

**What it does:** DeepSeek-Reasonix is a terminal-based AI coding agent written in Go, built specifically around DeepSeek's prefix-cache architecture to keep token costs low across long, multi-turn sessions.

**Why now:** The project gained 1,371 stars this week and just shipped a ground-up 1.0 rewrite in Go, replacing the legacy TypeScript codebase with a single static binary and a config-driven plugin system.

**Build with it:** Drop it into your workflow via `npm i -g reasonix`, wire up your tools and providers in `reasonix.toml`, and use it as the backbone for an autonomous coding pipeline that can run unattended without blowing through your DeepSeek API budget.
