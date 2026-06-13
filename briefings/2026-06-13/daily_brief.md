# AI Tastemakers — Daily Brief — 2026-06-13

_Ranking: bootstrap_since_first_seen · 10 repos · generated 2026-06-13T13:56:01.766Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_since_first_seen`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 40902 (+12138 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** An AI agent skill that queries Reddit, X, YouTube, HN, TikTok, Polymarket, and the web in parallel, scores results by real engagement signals (upvotes, likes, prediction market odds), and synthesizes a grounded summary of any topic from the last 30 days.

**Why now:** It hit #1 on GitHub Trending this week with 12,000+ new stars, and it ships as a first-class plugin for Claude Code via the marketplace, making it immediately usable inside the agent workflow most builders are already running.

**Build with it:** Drop it into a Claude Code or Codex agent to add live, engagement-weighted research as a callable skill — useful for competitive intelligence tools, pre-meeting briefing agents, or any product that needs grounded real-world signal instead of stale model knowledge.

## 2. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 25623 (+9817 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 60–95% using six algorithms, available as a Python/TypeScript library, an OpenAI-compatible proxy, or an MCP server.

**Why now:** It hit 25,623 stars with nearly 10,000 added this week, timing with growing pain around agents hitting context limits and runaway token costs as multi-step agentic workflows become standard.

**Build with it:** Drop `headroom proxy --port 8787` in front of any existing LangChain, Claude Code, or Cursor setup with zero code changes, or call `compress(messages)` directly to cut costs on RAG pipelines where retrieved chunks routinely bloat prompts.

## 3. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 42808 (+7592 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a collection of agent skills (portable SKILL.md files) that inject opinionated design rules—layout, typography, motion, spacing—into AI coding agents like Codex, Cursor, and Claude Code so they stop producing generic-looking UIs.

**Why now:** The repo gained 7,592 stars this week, signaling a real pain point as vibe-coding workflows mature and developers hit the ceiling of AI-generated visual quality.

**Build with it:** Drop the skill into your Codex or Claude Code project with one `npx` command and immediately get tighter, more deliberate frontend output—or pair the image-generation skills with ChatGPT Images to produce reference boards before handing designs off to an agent for implementation.

## 4. elder-plinius/CL4R1T4S

https://github.com/elder-plinius/CL4R1T4S · ★ 32049 (+5242 this week) · agents, ai, chatgpt, gemini, google, grok, hacking, leak, leaked, openai, prompt, prompt-engineering, prompts, red-team, red-teaming, system, system-info, system-prompts, tools, transparency

**What it does:** CL4R1T4S is a public repository collecting extracted and reverse-engineered system prompts from major AI products including ChatGPT, Claude, Gemini, Grok, Cursor, and Replit, making the hidden instructions that shape model behavior openly readable.

**Why now:** The repo gained 5,242 stars this week, signaling a spike in developer interest likely tied to growing scrutiny of how AI labs constrain model outputs and the expanding use of AI agents in production workflows.

**Build with it:** Use the extracted prompts as a reference corpus to audit your own system prompt design, benchmark persona constraints, or build a tool that diffs prompt patterns across competing AI products to surface behavioral divergences.

## 5. rohitg00/ai-engineering-from-scratch <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 31822 (+2443 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, from-scratch, generative-ai, llm, machine-learning, mcp, nlp, python, reinforcement-learning, rust, swarm-intelligence, transformers, tutorial, typescript

**What it does:** A fully open-source, 503-lesson curriculum spanning 20 phases that teaches AI engineering from raw math (linear algebra, backprop) through production systems (LLMs, agents, MCP servers) using Python, TypeScript, Rust, and Julia — every lesson ships a concrete, reusable artifact.

**Why now:** The repo gained 2,443 stars this week, signaling a surge in developers seeking structured depth over scattered tutorials, and its coverage of MCP servers and swarm intelligence maps directly to where agent tooling is moving right now.

**Build with it:** Follow the phase sequence to go from implementing attention by hand to deploying a multi-agent system with persistent memory, using the curriculum's own MCP server lessons as a blueprint for shipping real infrastructure alongside your learning.

## 6. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 27123 (+4835 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP toolkit that gives AI agents free, zero-API-key access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and the open web through a unified command interface with multi-backend routing and built-in diagnostics.

**Why now:** It gained nearly 5,000 stars this week, signaling a surge of builders hitting the same wall—AI agents that can reason but can't read the live internet without expensive APIs or brittle scrapers.

**Build with it:** Wire it into a Claude Code or Cursor workflow to give your agent real-time social listening, competitive research, or content summarization across platforms without writing a single scraper or paying for a single API key.

## 7. santifer/career-ops

https://github.com/santifer/career-ops · ★ 53443 (+4137 this week) · ai-agent, anthropic, automation, career, careerops, claude, claude-code, cli, golang, interview-prep, job-search, open-source, resume

**What it does:** Career-Ops is an open-source, Claude Code-powered job search automation system with 14 skill modes, a Go dashboard, PDF resume generation, and batch processing for applying at scale.

**Why now:** It gained 4,137 stars this week, signaling a surge of developer interest likely tied to growing awareness that AI screening tools already dominate recruiting pipelines—and job seekers want to fight back with their own.

**Build with it:** Fork it to build a specialized vertical—think visa-aware job filtering, contractor rate negotiation prep, or a SaaS wrapper that lets non-technical users run the same pipeline through a UI.

## 8. CopilotKit/CopilotKit <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/CopilotKit/CopilotKit · ★ 34963 (+1776 this week) · agent, agent-native, agentic-ai, agents, ai, ai-agent, ai-assistant, assistant, assistant-chat-bots, copilot, copilot-chat, generative-ui, js, llm, nextjs, open-source, react, reactjs, ts, typescript

**What it does:** CopilotKit is an open-source SDK for building agent-native applications with Generative UI, shared state, and human-in-the-loop workflows across React, Angular, Vue, React Native, and non-browser surfaces like Slack.

**Why now:** It gained 1,776 stars this week, likely driven by its role as the creator of the AG-UI Protocol, which just hit broad industry adoption from Google, LangChain, AWS, and Microsoft as a standard for agent-UI communication.

**Build with it:** Spin up a full-stack AI copilot in minutes — wire a LangChain or PydanticAI agent to a React frontend where it can render live UI components, pause for user confirmation mid-task, and sync state bidirectionally between the agent and your app.

## 9. esengine/DeepSeek-Reasonix

https://github.com/esengine/DeepSeek-Reasonix · ★ 21705 (+2870 this week) · agent, agent-framework, ai-agent, ai-coding, cli, coding-agent, deepseek, developer-tools, ink, llm, prompt-caching, r1, terminal, tool-use, tui, typescript

**What it does:** DeepSeek-Reasonix is a terminal-based AI coding agent written in Go that wraps DeepSeek's R1 model with a plugin and config-driven tool loop, deliberately structured to preserve prefix-cache stability so long sessions stay cheap.

**Why now:** It gained 2,870 stars this week and just shipped a ground-up 1.0 rewrite in Go, replacing the earlier TypeScript implementation with a single static binary installable via `npm i -g reasonix`.

**Build with it:** Drop it into a project directory and let it run persistent, multi-step coding tasks — refactors, test generation, or file-system operations — without manually managing context resets or watching token costs spike mid-session.

## 10. Imbad0202/academic-research-skills

https://github.com/Imbad0202/academic-research-skills · ★ 30899 (+2826 this week) · academic-pipeline, academic-writing, ai-research, claude, claude-code, literature-review, peer-review, prompt-engineering

**What it does:** Academic Research Skills is a Claude Code plugin suite that automates the grunt work of academic writing—reference hunting, citation formatting, logical consistency checks—while keeping humans in control of the intellectually irreplaceable parts like framing arguments and interpreting results.

**Why now:** With Zhao et al.'s recent audit finding nearly 147,000 hallucinated citations in 2025 papers alone, v3.8's new `ARS_CLAIM_AUDIT=1` pass—which fetches cited sources and verifies claims against them—addresses the most urgent credibility problem in AI-assisted research right now.

**Build with it:** A researcher or tool developer could integrate ARS into a writing workflow to enforce citation integrity at scale, or extend its seven-mode integrity gates and trust-chain frontmatter into a standalone academic honesty layer for institutional LLM deployments.
