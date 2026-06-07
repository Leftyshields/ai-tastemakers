# AI Tastemakers — Daily Brief — 2026-06-07

_Ranking: bootstrap_since_first_seen · 10 repos · generated 2026-06-07T16:23:49.040Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_since_first_seen`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 30083 (+1319 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** `/last30days` is a Python-based AI agent skill that queries Reddit, X, YouTube, HN, Polymarket, and the web in parallel, scores results by real engagement signals (upvotes, likes, prediction market odds), and synthesizes them into a grounded summary of any topic from the past 30 days.

**Why now:** It hit #1 on GitHub Trending this week with 1,319 new stars, landing as AI agents and multi-platform search orchestration become a primary battleground — and as every major AI lab still lacks unified access across these walled gardens.

**Build with it:** Drop it into a Claude Code or Cursor workflow as a pre-call research step, or wire it into a pipeline that auto-briefs your team on competitors, candidates, or market trends before every meeting.

## 2. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 36178 (+962 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a collection of portable agent skills (markdown files) that inject design constraints—layout, typography, motion, spacing—into AI coding agents like Codex, Cursor, and Claude Code to prevent them from generating generic, boilerplate-looking UIs.

**Why now:** The repo gained nearly 1,000 stars this week, reflecting growing frustration that vibe-coded frontends all look identical; as AI-generated code becomes the default starting point, the quality floor of that output matters more.

**Build with it:** Drop the skill files into your Codex or Cursor project to immediately raise the visual baseline of any AI-generated frontend, or pair the image-generation skills with ChatGPT Images to produce reference mood boards that feed directly into your coding agent's context.

## 3. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 16641 (+835 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 60–95% using six algorithms, available as a Python/TypeScript library, a drop-in proxy, or an MCP server.

**Why now:** With 16,641 stars and 835 added this week, it is gaining rapid traction as agents grow more complex and context window costs become a real bottleneck in production deployments.

**Build with it:** Drop it in front of any LangChain, Claude Code, or Cursor workflow to slash token costs on log-heavy or RAG-heavy pipelines, or run it as an MCP server to give any agent a shared, deduplicated memory store across sessions.

## 4. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 23052 (+764 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) authenticated, structured access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more — no paid APIs required, just cookie-based auth and open-source scrapers wired together.

**Why now:** It gained 764 stars this week, signaling rapid adoption among developers who want agents that can actually pull live internet data rather than hallucinating or hitting paywalls.

**Build with it:** Drop it into any agent workflow to enable real-time competitive research, social sentiment scraping, or automated content monitoring — for example, have Claude Code pull Reddit threads and YouTube transcripts on a topic, then synthesize a daily briefing with zero manual browsing.

## 5. MemPalace/mempalace

https://github.com/MemPalace/mempalace · ★ 54564 (+305 this week) · ai, chromadb, llm, mcp, memory, python

**What it does:** MemPalace is a local-first AI memory system that stores conversation history as verbatim text and retrieves it via semantic search against a structured index of people, projects, and topics — no summarization, no API calls, no data leaving your machine.

**Why now:** It hit 54k+ stars with 305 added this week, ships MCP server support out of the box, and benchmarks at 96.6% R@5 on LongMemEval, making it a credible drop-in for persistent memory in Claude Code and similar agentic workflows right now.

**Build with it:** Wire the Docker MCP server into Claude Code or any MCP-compatible client to give your AI assistant durable, searchable memory across sessions, or use the pluggable backend interface to swap ChromaDB for your own vector store inside a larger RAG pipeline.

## 6. helloianneo/ian-xiaohei-illustrations

https://github.com/helloianneo/ian-xiaohei-illustrations · ★ 3323 (+300 this week) · ai-agent, chinese, codex-skill, handdrawn, illustration, image-generation, xiaohei

**What it does:** Ian Xiaohei Illustrations is a Codex Skill that analyzes Chinese articles and generates 16:9 hand-drawn inline illustrations featuring "Xiaohei," a minimalist black character, translating abstract arguments, workflows, and metaphors into single-concept sketch-style images with sparse red/orange/blue Chinese annotations.

**Why now:** The repo gained 300 stars this week, signaling a surge of interest among Chinese-language content creators looking for a repeatable visual language that sits between bare text and overproduced infographics—likely amplified by growing Codex agent adoption.

**Build with it:** Drop the skill into your Codex setup and wire it into a content pipeline that takes a Markdown article, auto-generates a shot list of 4–8 illustration concepts, and exports labeled PNGs into an `assets/` folder ready for Notion, WeChat articles, or blog CMS uploads.

## 7. nexu-io/html-video

https://github.com/nexu-io/html-video · ★ 1990 (+284 this week) · ai-agent, apache-2, coding-agent, css, ffmpeg, html, html-to-video, hyperframes, mp4, open-design, open-source, programmatic-video, video, video-as-code, video-generation

**What it does:** html-video converts HTML, CSS, and data into real MP4 files locally using pluggable render engines (including FFmpeg), with 21 prebuilt animated templates and optional AI-generated soundtrack and narration.

**Why now:** AI coding agents have become the default way many developers build and prototype, and this week's spike in stars signals the community is actively looking for a local, fee-free way to generate video assets directly inside those agent loops.

**Build with it:** Point your agent (Claude Code, Cursor, Codex, or similar) at an article URL or GitHub repo, let it populate one of the 21 templates with real content, and ship a finished MP4 walkthrough, changelog video, or data-viz clip without touching a cloud render service.

## 8. heygen-com/hyperframes

https://github.com/heygen-com/hyperframes · ★ 25285 (+278 this week) · ai, animation, ffmpeg, framework, gsap, html, mcp, puppeteer, rendering, typescript, video

**What it does:** HyperFrames is an open-source TypeScript framework that renders HTML, CSS, and GSAP animations into deterministic MP4 videos via Puppeteer and FFmpeg, with native MCP support so AI coding agents can plan, write, and render video end-to-end without leaving the chat.

**Why now:** The project just crossed 25,000 stars with 278 added this week, signaling rapid adoption at the intersection of agentic coding workflows and programmatic video generation—two areas seeing heavy builder activity right now.

**Build with it:** Wire it into a Claude Code or Cursor agent to auto-generate product demo videos, animated data visualizations, or social content from a brief, then pipe the MP4 output into a publishing or content pipeline without touching a video editor.

## 9. aaif-goose/goose

https://github.com/aaif-goose/goose · ★ 47267 (+269 this week) · acp, ai, ai-agents, mcp

**What it does:** Goose is an open-source, general-purpose AI agent built in Rust that runs locally as a desktop app, CLI, or API, supporting 15+ LLM providers and 70+ extensions via MCP to autonomously install, execute, edit, and test across code and non-code workflows.

**Why now:** Goose just migrated from `block/goose` to the Linux Foundation's Agentic AI Foundation (AAIF), signaling serious institutional backing, and is gaining 269 stars this week as the community consolidates around the new home.

**Build with it:** Fork the repo to create a custom goose distribution with preconfigured providers, branding, and extensions — or embed the API into your own product to ship a self-hosted AI agent without depending on closed platforms.

## 10. rtk-ai/rtk

https://github.com/rtk-ai/rtk · ★ 59692 (+237 this week) · agentic-coding, ai-coding, anthropic, claude-code, cli, command-line-tool, cost-reduction, developer-tools, llm, open-source, productivity, rust, token-optimization

**What it does:** RTK is a Rust CLI proxy that intercepts commands like `git diff`, `cargo test`, and `grep` before their output hits your LLM context, compressing results to cut token consumption by 60–90% with under 10ms overhead.

**Why now:** The project gained 237 stars this week, signaling growing developer pain around runaway API costs in agentic coding workflows where Claude Code and similar tools repeatedly invoke shell commands in tight loops.

**Build with it:** Drop RTK into any Claude Code or LLM-powered dev agent as a shell hook and immediately reduce per-session API spend—useful as a foundation for cost-aware agent infrastructure or as a benchmark for building smarter output-filtering middleware.
