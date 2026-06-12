# AI Tastemakers — Daily Brief — 2026-06-12

_Ranking: bootstrap_since_first_seen · 10 repos · generated 2026-06-12T14:17:03.160Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_since_first_seen`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 40116 (+11352 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** `/last30days` is a Python-based AI agent skill that runs parallel searches across Reddit, X, YouTube, TikTok, HN, Polymarket, and the open web, then scores results by real engagement signals—upvotes, likes, prediction-market odds—to synthesize a grounded 30-day brief on any topic or person.

**Why now:** It hit #1 on GitHub Trending this week with 11,352 stars in seven days, timed precisely to the moment when AI coding agents (Claude Code, Codex, Cursor, Gemini CLI) gained plugin/skill ecosystems that make cross-platform agent orchestration practical for the first time.

**Build with it:** Drop it into a sales or recruiting workflow to auto-generate pre-meeting intel on any person or company from their actual recent activity, or wire it into a trend-detection pipeline that flags emerging topics hours before they surface on SEO-indexed search.

## 2. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 24106 (+8300 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 60–95% tokens while preserving answer quality, available as a Python/TypeScript library, drop-in proxy, or MCP server.

**Why now:** It hit 24,000+ stars with 8,300 added this week, signaling a tipping point in developer frustration with context window costs and agent reliability as token-heavy agentic workflows become standard.

**Build with it:** Wrap an existing Claude Code or Cursor workflow with `headroom wrap claude` to immediately slash API costs, or integrate `compress(messages)` directly into a LangChain or custom RAG pipeline to fit more retrieved chunks into a single context window without hitting limits.

## 3. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 42077 (+6861 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a collection of portable agent skills (markdown files) you drop into Codex, Cursor, or Claude Code to enforce opinionated layout, typography, spacing, and motion rules so AI-generated frontends stop looking like generic boilerplate.

**Why now:** It gained 6,861 stars this week, signaling a growing developer frustration with the visual sameness of AI-vibe-coded UIs and a practical need for lightweight, tool-agnostic guardrails that work across the current generation of coding agents.

**Build with it:** Run `npx skills add https://github.com/Leonxlnx/taste-skill` to inject the design rules into your agent workflow, then pair the image-generation skills with ChatGPT Images to produce reference boards that Codex or Claude Code can implement with consistent visual quality from the first pass.

## 4. elder-plinius/CL4R1T4S <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/elder-plinius/CL4R1T4S · ★ 29325 (+2518 this week) · agents, ai, chatgpt, gemini, google, grok, hacking, leak, leaked, openai, prompt, prompt-engineering, prompts, red-team, red-teaming, system, system-info, system-prompts, tools, transparency

**What it does:** CL4R1T4S is a public repository of extracted and leaked system prompts from major AI platforms including ChatGPT, Claude, Gemini, and Grok, exposing the hidden instructions that shape model behavior.

**Why now:** The repo gained 2,518 stars this week, reflecting heightened developer interest in AI transparency as system prompts become increasingly consequential in agentic and production deployments.

**Build with it:** Use the extracted prompts as a reference corpus to audit your own AI integrations for behavioral blind spots, or benchmark your prompt engineering against the patterns major labs actually ship.

## 5. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 26614 (+4326 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP toolkit that gives AI agents (Claude Code, Cursor, etc.) the ability to read and search Twitter, Reddit, YouTube, GitHub, Bilibili, and Xiaohongshu without paying for APIs, by routing through free scrapers and browser-authenticated backends.

**Why now:** The project gained 4,326 stars this week, signaling strong developer appetite for agent internet access tooling, and it just shipped a live platform-switching example—automatically migrating Bilibili from yt-dlp (blocked by risk controls) to bili-cli with zero user action.

**Build with it:** Wire Agent Reach into an AI research agent that monitors competitor mentions across Twitter, Reddit, and Xiaohongshu in real time, or build a zero-cost content summarization pipeline that pulls YouTube transcripts, RSS feeds, and GitHub issue discussions into a single context window for an LLM.

## 6. santifer/career-ops

https://github.com/santifer/career-ops · ★ 53039 (+3733 this week) · ai-agent, anthropic, automation, career, careerops, claude, claude-code, cli, golang, interview-prep, job-search, open-source, resume

**What it does:** Career-Ops is an open-source CLI system that uses Claude Code to automate job search workflows — evaluating listings, generating tailored CVs, and running interview prep across 14 skill modes with a Go dashboard and batch PDF output.

**Why now:** It gained 3,733 stars this week and landed press coverage in WIRED and Business Insider, making it a high-visibility project to contribute to or fork right now.

**Build with it:** Fork the repo and add a new skill mode targeting a specific industry vertical, or wire the batch processing pipeline to a job board API to auto-ingest and score listings on a schedule.

## 7. esengine/DeepSeek-Reasonix

https://github.com/esengine/DeepSeek-Reasonix · ★ 21501 (+2666 this week) · agent, agent-framework, ai-agent, ai-coding, cli, coding-agent, deepseek, developer-tools, ink, llm, prompt-caching, r1, terminal, tool-use, tui, typescript

**What it does:** DeepSeek-Reasonix is a terminal-based AI coding agent written in Go that wraps DeepSeek's R1 model in a config- and plugin-driven CLI, deliberately engineered to keep the conversation prefix cache stable so long-running sessions stay cheap.

**Why now:** It gained 2,666 stars this week and just shipped a ground-up Go rewrite (v1.0) replacing the original TypeScript build, making this the first stable week to adopt it without hitting legacy rough edges.

**Build with it:** Drop it into a CI pipeline or a local dev loop to automate multi-step coding tasks — refactors, test generation, or code review — where the prefix-cache optimization directly cuts your DeepSeek API bill on repeated, context-heavy runs.

## 8. Imbad0202/academic-research-skills

https://github.com/Imbad0202/academic-research-skills · ★ 30570 (+2497 this week) · academic-pipeline, academic-writing, ai-research, claude, claude-code, literature-review, peer-review, prompt-engineering

**What it does:** Academic Research Skills is a Claude Code plugin that wraps the full paper pipeline—literature search, citation verification, writing quality checks, and peer review simulation—into staged slash commands like `/ars-plan`, with integrity gates that block hallucinated references and unsupported claims before they reach your draft.

**Why now:** Zhao et al.'s May 2026 audit found ~147,000 hallucinated citations in a single year of preprints, and this week's star velocity (2,497 new stars) suggests researchers are actively looking for tooling that addresses that specific crisis rather than ignoring it.

**Build with it:** Fork the pipeline to build a domain-specific research assistant—swap in your field's citation databases, tune the 7-mode integrity checklist to your journal's standards, and use the opt-in `ARS_CLAIM_AUDIT=1` pass as the backbone of an automated preprint screening service.

## 9. rtk-ai/rtk

https://github.com/rtk-ai/rtk · ★ 61778 (+2323 this week) · agentic-coding, ai-coding, anthropic, claude-code, cli, command-line-tool, cost-reduction, developer-tools, llm, open-source, productivity, rust, token-optimization

**What it does:** RTK is a Rust CLI proxy that intercepts commands like `git diff`, `pytest`, and `cargo test` and strips their output down before it hits your LLM context window, cutting token consumption by 60–90% in tools like Claude Code.

**Why now:** It crossed 61,000 GitHub stars this week with 2,300+ new stars, signaling rapid adoption at the exact moment agentic coding tools are driving real API cost pain for developers running long multi-step sessions.

**Build with it:** Drop RTK into any agentic coding pipeline or AI dev environment product to reduce per-user LLM costs without changing model behavior — it's a single binary with no dependencies, making it trivial to bundle or layer into existing tooling.

## 10. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 71809 (+2278 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a Claude Code skill that rewrites AI agent output in compressed, telegraphic style—dropping filler words while preserving full technical accuracy—cutting output tokens by roughly 75% across Claude Code, Cursor, Copilot, and 30+ other tools.

**Why now:** It hit 71,809 stars with 2,278 added this week, signaling strong developer pain around API costs and response latency as teams scale agentic workflows.

**Build with it:** Drop the CLAUDE.md skill into any project to immediately reduce Claude API costs on long coding sessions, or fork the prompt logic to build a token-optimization layer for your own LLM-powered dev tool.
