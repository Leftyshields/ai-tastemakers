# AI Tastemakers — Daily Brief — 2026-06-17

_Ranking: delta_7d · 10 repos · generated 2026-06-17T14:26:35.878Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 29448 (+25169 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt ruleset/plugin that installs a decision ladder inside AI coding agents (Claude Code, Cursor, etc.), forcing them to prefer native browser APIs, stdlib, and one-liners over new dependencies or custom implementations before writing a single line of code.

**Why now:** It hit 29,000+ stars this week, likely riding the wave of developers frustrated by AI agents that reflexively scaffold entire component libraries to solve a two-line problem—a pain point that's grown sharper as agentic coding sessions get longer and API costs compound per turn.

**Build with it:** Drop the ruleset into your Claude Code or Cursor config and benchmark your own production tasks against the no-skill baseline using the included `promptfoo` setup—or fork the ladder itself to encode your team's specific constraints, approved libraries, and upgrade paths as first-class agent behavior.

## 2. elder-plinius/CL4R1T4S

https://github.com/elder-plinius/CL4R1T4S · ★ 41450 (+14643 this week) · agents, ai, chatgpt, gemini, google, grok, hacking, leak, leaked, openai, prompt, prompt-engineering, prompts, red-team, red-teaming, system, system-info, system-prompts, tools, transparency

**What it does:** CL4R1T4S is a public repository that collects and publishes extracted system prompts from major AI products including ChatGPT, Claude, Gemini, Grok, Cursor, and Replit agents, making the hidden instructions that shape AI behavior openly readable.

**Why now:** The repo gained 14,643 stars this week, signaling a sharp spike in developer and researcher interest in auditing AI behavior at the prompt layer as agentic deployments multiply.

**Build with it:** Use the extracted prompts as a reference corpus to benchmark your own agent's instruction design, identify constraint patterns across competing models, or build a diff tool that tracks how vendor system prompts change over time.

## 3. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 30766 (+9410 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 60–95% before they reach the model—with reversible caching so originals can be retrieved on demand.

**Why now:** Context windows are filling up fast as agents get more capable and agentic loops grow longer, making token costs and context-limit errors a daily friction point for builders shipping in production this week.

**Build with it:** Drop `compress(messages)` into any Python or TypeScript app, run it as a zero-config proxy in front of any OpenAI-compatible endpoint, or wrap Claude Code/Cursor/Codex with one shell command to slash costs and extend effective context without changing your agent logic.

## 4. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 32774 (+6854 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP toolkit that gives AI agents (Claude Code, Cursor, etc.) the ability to read and search Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paid APIs, by routing through free scrapers and browser session cookies stored locally.

**Why now:** The project hit GitHub trending at #1 this week with 6,854 stars gained in seven days, coinciding with a surge in agentic workflow adoption and a concrete real-world fix (yt-dlp blocked by Bilibili's bot detection, patched to bili-cli with zero user action required).

**Build with it:** Run `agent-reach doctor` to audit which platforms are live, then wire the MCP server into any agent loop to build competitive intelligence tools, cross-platform content aggregators, or automated research pipelines that pull live social data without touching a paid API.

## 5. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 195933 (+6360 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent from Nous Research that builds persistent skills from experience, maintains cross-session memory, runs on any LLM backend, and deploys across CLI, Telegram, Discord, and cloud infrastructure from a single codebase.

**Why now:** The repo gained 6,360 stars this week, signaling a surge in developer attention, and its multi-platform model support makes it immediately relevant as builders evaluate alternatives following recent shifts in OpenAI and Anthropic pricing and API access.

**Build with it:** Wire it to your own LLM endpoint, let it generate and self-improve skills from your team's repeated workflows, then deploy it serverlessly on Modal or Daytona so it costs near zero when idle but wakes instantly to handle Telegram or Slack requests from anywhere.

## 6. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 103296 (+6019 this week) · ai-tools, claude-code, codex, desktop-app, hermes, hermes-agent, mcp, minimax, omo, open-source, openclaw, openclaw-ui, opencode, provider-management, rust, skills, skills-management, tauri, typescript, wsl-support

**What it does:** CC Switch is a cross-platform desktop app (built with Tauri/Rust) that centralizes management of multiple AI coding agents—Claude Code, Codex, Gemini CLI, OpenCode, OpenClaw, and Hermes Agent—including provider switching, MCP configuration, and skills management in one interface.

**Why now:** The project gained over 6,000 stars this week, signaling rapid adoption as developers juggle an expanding roster of competing AI coding agents and need a single control plane rather than scattered config files.

**Build with it:** A builder could use CC Switch as a reference architecture for multi-provider AI tooling—specifically how to abstract credential and endpoint management across heterogeneous CLI agents—or extend it to add custom provider integrations via its open plugin surface.

## 7. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 45769 (+5528 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste Skill is a collection of portable agent skills (markdown-based instruction files) that you drop into Codex, Cursor, or Claude Code to enforce opinionated layout, typography, spacing, and motion rules—replacing the generic boilerplate those tools default to.

**Why now:** The repo jumped 5,500+ stars this week, signaling a wave of builders hitting the same wall: AI coding agents that produce structurally correct but visually mediocre UIs at scale.

**Build with it:** Install a skill via `npx skills add` and immediately constrain your AI agent to produce polished frontend output—pair the image-generation skills with ChatGPT Images to generate a reference board, then hand those frames to Claude Code for pixel-closer implementation.

## 8. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 43824 (+5090 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** `/last30days` is a Python AI agent skill that searches Reddit, X, YouTube, HN, TikTok, Polymarket, and GitHub in parallel, scores results by real engagement signals (upvotes, likes, real-money prediction markets), and synthesizes them into a single grounded brief on any topic or person.

**Why now:** It hit #1 on GitHub Trending this week with 5,090 stars in seven days, coinciding with the explosion of agent skill marketplaces across Claude Code, Codex, Cursor, and Gemini CLI—making cross-platform agent tooling suddenly a first-class distribution channel.

**Build with it:** Drop it into a Claude Code or Codex workflow as a pre-call research primitive—wire it to a CRM webhook so every new contact automatically gets a 30-day brief pulled before the first meeting, sourced from platforms no single API touches alone.

## 9. microsoft/markitdown

https://github.com/microsoft/markitdown · ★ 155039 (+5087 this week) · autogen, autogen-extension, langchain, markdown, microsoft-office, openai, pdf

**What it does:** MarkItDown is a Python library that converts PDFs, Word docs, PowerPoints, Excel files, images, audio, HTML, and more into clean Markdown, preserving headings, tables, and lists for downstream LLM consumption.

**Why now:** It crossed 155K GitHub stars with 5,087 added this week, signaling a surge of developer adoption likely driven by growing demand for reliable document ingestion pipelines feeding RAG and agent workflows.

**Build with it:** Drop it into a document Q&A pipeline to preprocess user-uploaded files before chunking and embedding, or wire it into an AutoGen/LangChain agent that can dynamically ingest any file type a user throws at it.

## 10. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 217096 (+4692 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an operator system for AI coding agents that provides reusable skills, memory management, security scanning, and cross-harness workflows compatible with Claude Code, Codex, Cursor, OpenCode, and others.

**Why now:** The project gained nearly 5,000 stars this week alone, signaling a sharp uptick in developer interest in structured agent configuration as AI coding tools mature beyond raw autocomplete.

**Build with it:** A developer could use ECC to standardize agent behavior across multiple harnesses on a single project—defining shared instincts, memory, and MCP configs so Claude Code and Cursor behave consistently without duplicating setup by hand.
