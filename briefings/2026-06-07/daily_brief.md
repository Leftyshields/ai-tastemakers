# AI Tastemakers — Daily Brief — 2026-06-07

_Ranking: bootstrap_since_first_seen · 10 repos · generated 2026-06-07T16:37:16.616Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_since_first_seen`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 30108 (+1344 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** `/last30days` is a Python AI agent skill that queries Reddit, X, YouTube, HN, TikTok, Polymarket, and the open web in parallel, then scores and synthesizes results by real engagement signals—upvotes, likes, and prediction-market odds—rather than editorial ranking.

**Why now:** It hit #1 on GitHub Trending this week with 1,344 stars in seven days, coinciding with Claude Code's plugin marketplace launch, which made one-command installation (`/plugin marketplace add mvanhorn/last30days-skill`) mainstream for agent skill distribution.

**Build with it:** Drop it into any Claude Code, Codex, or Cursor workflow to add a recency-grounded research layer—useful for competitive intelligence tools, pre-meeting briefing agents, or trend-detection pipelines that need live social signal data no single API provides alone.

## 2. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 36192 (+976 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a collection of portable agent skills (structured markdown files) that instruct AI coding agents like Codex, Cursor, and Claude Code to apply stronger layout, typography, motion, and spacing decisions instead of producing generic boilerplate UI.

**Why now:** The repo gained nearly 1,000 stars this week, signaling real traction among builders frustrated with AI-generated interfaces that all look identical, and the newly released v2 skill rewrites the core `design-taste-frontend` prompt with substantial changes.

**Build with it:** Drop the skill into your Codex or Claude Code workflow via `npx skills add` and immediately get more intentional visual output on any frontend project—or pair the image-generation skills with ChatGPT Images to produce a reference board, then hand it off to an agent for implementation.

## 3. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 16655 (+849 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 60–95% tokens while preserving the information needed for correct answers. It ships as a Python/TypeScript library, a drop-in OpenAI-compatible proxy, an MCP server, and a one-command agent wrapper for Claude Code, Cursor, and Codex.

**Why now:** With 16,655 stars and 849 added this week, it is tracking alongside the surge in agentic coding tools that are routinely hitting context limits—Claude Code sessions that blow past 200K tokens on large codebases are a concrete, daily pain point this directly solves.

**Build with it:** Drop `headroom proxy --port 8787` in front of any LangChain or Agno pipeline to cut token costs immediately with zero code changes, or use the MCP server to give Claude Code a shared compressed memory store across long multi-session refactors.

## 4. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 23057 (+769 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents free, zero-configuration access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and a dozen other platforms by wrapping tools like yt-dlp, rdt-cli, and Jina Reader into a single installable package. You hand your agent one URL and it self-installs everything, including MCP server registration.

**Why now:** The project jumped 769 stars this week, signaling rapid community adoption at exactly the moment Claude Code and Cursor are making CLI-native agent workflows mainstream. Builders hitting paywalls on Twitter's API or 403s on Reddit have a ready alternative right now.

**Build with it:** Wire Agent Reach into a Claude Code or Cursor workflow to build a competitive intelligence agent that pulls live Twitter sentiment, Reddit bug reports, and GitHub issue trends on any product without touching a paid API. The `agent-reach doctor` command and cookie-based auth flow mean you can ship a working prototype in under an hour.

## 5. santifer/career-ops

https://github.com/santifer/career-ops · ★ 49760 (+454 this week) · ai-agent, anthropic, automation, career, careerops, claude, claude-code, cli, golang, interview-prep, job-search, open-source, resume

**What it does:** Career-Ops is an open-source CLI pipeline that uses Claude Code and other AI coding agents to evaluate job listings with a structured A-F scoring system, generate ATS-optimized PDFs tailored per job description, and batch-process hundreds of applications automatically.

**Why now:** The repo jumped 454 stars this week and landed press coverage in WIRED and Business Insider, signaling strong builder momentum around agentic job-search tooling as Claude Code and Gemini CLI mature as automation platforms.

**Build with it:** Fork the 14 skill-mode evaluation framework to create a specialized recruiting tool for a specific domain—engineering, design, or finance—or wrap the Go dashboard and batch processor into a SaaS layer that lets job seekers upload a resume and get scored matches across live job boards.

## 6. CopilotKit/CopilotKit

https://github.com/CopilotKit/CopilotKit · ★ 33597 (+410 this week) · agent, agent-native, agentic-ai, agents, ai, ai-agent, ai-assistant, assistant, assistant-chat-bots, copilot, copilot-chat, generative-ui, js, llm, nextjs, open-source, react, reactjs, ts, typescript

**What it does:** CopilotKit is an open-source SDK for embedding AI agents directly into web, mobile, and Slack interfaces — handling chat UI, generative UI, shared state, and human-in-the-loop workflows across React, Angular, and beyond.

**Why now:** It gained 410 stars this week, likely driven by its role as creator of the AG-UI Protocol, now adopted by Google, LangChain, AWS, and Microsoft as a standard for agent-to-frontend communication.

**Build with it:** Wire a LangChain or PydanticAI agent into a Next.js app in minutes, then layer in real-time generative UI components that update as the agent runs — no custom streaming or state-sync infrastructure required.

## 7. Imbad0202/academic-research-skills

https://github.com/Imbad0202/academic-research-skills · ★ 28468 (+395 this week) · academic-pipeline, academic-writing, ai-research, claude, claude-code, literature-review, peer-review, prompt-engineering

**What it does:** Academic Research Skills is a Claude Code plugin that runs a structured research pipeline—planning, writing, peer review, revision, and finalization—with integrity gates that block citation hallucinations and fabricated methodology before they reach your draft.

**Why now:** This week's timing aligns with Zhao et al.'s May 2026 audit finding 146,932 hallucinated citations on preprint servers in 2025 alone, and ARS v3.8's newly shipped claim-audit pass (`ARS_CLAIM_AUDIT=1`) directly addresses that gap by fetching cited sources and verifying claim support at the anchor level.

**Build with it:** Hook ARS into a research automation workflow where `/ars-plan` scaffolds paper structure via Socratic dialogue, the Stage 2.5/4.5 blocking checklists catch AI failure modes programmatically, and the claim-audit pass surfaces HIGH-WARN flags—giving you a reviewable audit trail instead of a finished draft you have to trust blindly.

## 8. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 29769 (+390 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, from-scratch, generative-ai, llm, machine-learning, mcp, nlp, python, reinforcement-learning, rust, swarm-intelligence, transformers, tutorial, typescript

**What it does:** A free, MIT-licensed curriculum of 503 lessons across 20 phases that teaches AI engineering from raw math (backprop, tokenizers, attention) through production systems, agents, and swarms, with every lesson producing a reusable artifact in Python, TypeScript, Rust, or Julia.

**Why now:** The repo gained 390 stars this week and is tracking 150K+ readers monthly, signaling a surge of developers looking to move beyond copy-paste AI tutorials toward genuine, ground-up understanding of the systems they're shipping.

**Build with it:** Follow the linear phase structure to go from implementing attention by hand to deploying MCP servers and multi-agent swarms, using each lesson's artifact as a production-ready component you can drop into real projects.

## 9. esengine/DeepSeek-Reasonix

https://github.com/esengine/DeepSeek-Reasonix · ★ 19159 (+324 this week) · agent, agent-framework, ai-agent, ai-coding, cli, coding-agent, deepseek, developer-tools, ink, llm, prompt-caching, r1, terminal, tool-use, tui, typescript

**What it does:** DeepSeek-Reasonix is a terminal-based AI coding agent written in Go, configured via `reasonix.toml`, that wraps DeepSeek's R1 model with tool use, plugin support, and deliberate prefix-cache stability to keep token costs low across long sessions.

**Why now:** The project gained 324 stars this week and just shipped a ground-up 1.0 rewrite in Go, replacing the legacy TypeScript codebase — making this the right moment to adopt it before community patterns and plugin conventions solidify.

**Build with it:** Drop `reasonix.toml` into a repo and wire it to DeepSeek's API to get a persistent, low-cost coding agent that can run multi-step refactors, answer codebase questions, and execute tools from your terminal without resetting context between tasks.

## 10. MemPalace/mempalace

https://github.com/MemPalace/mempalace · ★ 54566 (+307 this week) · ai, chromadb, llm, mcp, memory, python

**What it does:** MemPalace is a local-first AI memory system that stores conversation history as verbatim text and retrieves it via semantic search against a structured index of people, projects, and topics — no summarization, no API calls, no data leaving your machine.

**Why now:** It hit 54,566 stars with 307 added this week, ships MCP server support out of the box, and benchmarks at 96.6% R@5 on LongMemEval, making it a credible drop-in for persistent memory in Claude Code and other MCP-compatible clients right now.

**Build with it:** Wire the Docker MCP server into Claude Code to give any coding agent durable project memory across sessions, or use the `mine` CLI command to index an existing codebase and build a semantic search layer over your own documentation.
