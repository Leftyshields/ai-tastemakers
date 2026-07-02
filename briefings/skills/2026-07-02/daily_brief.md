# Skill Tastemakers — Daily Brief — 2026-07-02

_Ranking: delta_7d · 10 repos · generated 2026-07-02T13:57:17.175Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 71326 (+17251 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt/skill layer you drop into AI coding agents (Claude Code, Cursor, etc.) that biases them toward minimal solutions—deleting code instead of adding it, reaching for native browser APIs before npm, and stopping at "good enough."

**Why now:** It hit 71k stars with 17k added this week, suggesting the developer community is actively pushing back against AI agents that over-engineer by default and inflate token costs.

**Build with it:** Install the npm package or drop the cursor rules into your repo, then benchmark your own agent sessions against the included FastAPI + React fixture to tune how aggressively Ponytail suppresses scaffolding on your specific stack.

## 2. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 31430 (+13388 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that gives your AI coding assistant 12 pipelines, 52 tools, and 500+ skills to handle scripting, asset generation, editing, and final render — producing real motion-clip videos, not just animated slideshows.

**Why now:** It hit #1 on GitHub Trending this week with 13,000+ new stars, meaning the community is actively stress-testing it and merging contributions daily — the best moment to get in early and shape its direction.

**Build with it:** Drop in your own pipeline for a specific niche — product demo reels, automated YouTube shorts, or training data video generation — using the existing tool primitives and provider integrations (Kling, Veo, ElevenLabs, Flux) without building the rendering stack from scratch.

## 3. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 24359 (+10532 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that indexes entire codebases into a persistent knowledge graph using tree-sitter AST parsing across 158 languages, answering structural queries about functions, call chains, and HTTP routes in under 1ms with 99% fewer tokens than file-by-file exploration.

**Why now:** The project surged to 24,000+ stars this week, and with Claude Code, Gemini CLI, Cursor, and Windsurf all maturing simultaneously, a zero-dependency drop-in that plugs into 11 agents without configuration overhead hits a real gap builders are actively feeling.

**Build with it:** Drop it into any AI coding agent to give it instant structural awareness of large repos — especially useful for agents navigating monorepos or legacy codebases where context window exhaustion kills task completion — or use the 14 MCP tools directly to build your own code navigation, dependency analysis, or automated refactoring workflows on top of the knowledge graph.

## 4. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 48859 (+9509 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI toolkit that gives AI agents (Claude Code, Cursor, etc.) the ability to read and search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongshu, and the open web — no paid APIs required, using cookie-based auth and free scraping backends routed through a multi-fallback system.

**Why now:** It hit #1 on GitHub Trending this week with 9,500+ new stars, partly because it just shipped a live fix replacing yt-dlp (blocked by Bilibili's anti-scrape) with bili-cli — a concrete example of its promised "we patch it, you feel nothing" maintenance model in action.

**Build with it:** Wire it into any agent loop to automate competitive research pipelines — for example, have Claude Code pull Reddit threads, Twitter sentiment, and YouTube transcripts on a product name, then synthesize a structured report, all without touching a paid API.

## 5. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 112278 (+4654 this week) · ai-tools, claude-code, codex, desktop-app, hermes, hermes-agent, mcp, minimax, omo, open-source, openclaw, openclaw-ui, opencode, provider-management, rust, skills, skills-management, tauri, typescript, wsl-support

**What it does:** CC Switch is a cross-platform Tauri/Rust desktop app that centralizes management of multiple AI coding agents—Claude Code, Codex, Gemini CLI, OpenCode, and others—from a single interface, including provider switching, MCP configuration, and credential management.

**Why now:** It gained 4,654 GitHub stars this week, signaling a sharp spike in developer interest around multi-agent toolchain management as Claude Code, Codex, and Gemini CLI have all seen major capability releases in the same window.

**Build with it:** Use CC Switch as a reference architecture for building provider-agnostic AI tooling in Tauri—specifically its approach to abstracting credentials and routing across competing CLI agents could inform any desktop app that needs to manage multiple LLM backends without locking users to one vendor.

## 6. xbtlin/ai-berkshire

https://github.com/xbtlin/ai-berkshire · ★ 8542 (+7247 this week) · ai, ai-agent, anthropic, berkshire-hathaway, charlie-munger, china-stock, claude, claude-code, financial-analysis, fintech, fundamental-analysis, investment, investment-research, llm, mcp, portfolio-management, stock-analysis, stock-market, value-investing, warren-buffett

**What it does:** AI Berkshire is a collection of structured investment research prompts and multi-agent workflows for Claude Code/Codex that systematizes the methodologies of Buffett, Munger, and two prominent Asian value investors into reproducible analysis outputs with forced conclusions, scored frameworks, and built-in anti-bias mechanisms.

**Why now:** The repo gained 7,247 stars this week, likely driven by its verified live trading track record (+69% in 2024, +66% in 2025) and growing interest in Claude Code as an agentic coding and reasoning environment following Anthropic's recent push.

**Build with it:** Fork the skill templates to create a parallel multi-agent research pipeline that ingests a stock ticker, spawns four independent Claude agents each applying a different master investor's checklist, and outputs a structured buy/hold/pass decision with price targets and a reconciled scorecard.

## 7. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 79798 (+3350 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a Claude Code skill that rewrites AI agent output in stripped-down, telegraphic style, cutting output tokens by ~75% while preserving full technical accuracy across multiple verbosity levels (lite, full, ultra, wenyan).

**Why now:** It hit nearly 80k GitHub stars with 3,350 added this week, signaling that token cost and response latency are live pain points as developers run AI agents at scale in production workflows.

**Build with it:** Drop the caveman skill into any Claude Code, Cursor, or Copilot setup to immediately reduce API costs on high-volume agentic tasks, or fork the prompt logic to build a custom compression layer tuned to your team's preferred output density.

## 8. headroomlabs-ai/headroom

https://github.com/headroomlabs-ai/headroom · ★ 55619 (+6252 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, reducing token counts by 60–95% across tool outputs, logs, RAG chunks, and conversation history while preserving answer quality—available as a Python/TypeScript library, drop-in proxy, or MCP server.

**Why now:** With 55,000+ stars and 6,000+ new this week, it's clearly hitting a nerve as agentic workloads explode and developers hit context window limits and API cost ceilings daily.

**Build with it:** Wrap any existing agent—Claude Code, Cursor, Codex, LangChain—with a single command or one-line code change to cut costs and latency without touching your prompts or swapping models.

## 9. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 207767 (+6104 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent from Nous Research that runs across platforms (Telegram, Discord, CLI), supports any LLM provider, and closes a learning loop by creating and refining skills from experience across sessions.

**Why now:** The repo gained over 6,000 stars this week, signaling strong community momentum around agents that persist knowledge and improve autonomously rather than resetting every conversation.

**Build with it:** Use the built-in cron scheduler and subagent spawning to deploy a personal AI that monitors a codebase nightly, files issues, and improves its own workflows over time — running serverless on Modal or a $5 VPS with near-zero idle cost.

## 10. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 54815 (+4743 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste Skill is a set of portable agent skills (markdown instruction files) you drop into Codex, Cursor, or Claude Code to steer AI toward stronger layout, typography, spacing, and motion instead of generic boilerplate UI.

**Why now:** It gained 4,743 stars this week, signaling that "vibe coding" fatigue is real and developers are actively hunting for ways to raise the baseline quality of AI-generated frontends without manually prompting for taste every time.

**Build with it:** Run `npx skills add https://github.com/Leonxlnx/taste-skill` to inject the design rules into your AI coding environment, then use the included image-generation skills to produce reference boards in ChatGPT Images and hand them directly to your agent for implementation.
