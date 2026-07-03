# Skill Tastemakers — Daily Brief — 2026-07-03

_Ranking: delta_7d · 10 repos · generated 2026-07-03T15:26:43.084Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 72650 (+13178 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces YAGNI-style minimalism—prompting the agent to reach for the simplest possible solution before writing new code, cutting generated LOC by ~54% on average across real agentic sessions.

**Why now:** It hit 72k+ stars with 13k added this week, likely surfacing alongside the Claude Code agent ecosystem maturing to the point where output bloat and token cost are real operational problems for teams running agents at scale.

**Build with it:** Drop the skill into your Claude Code or Cursor setup and run it against a feature-heavy codebase to benchmark how much dead weight your agent typically generates—then use the built-in benchmark harness to quantify cost and token savings before pitching it to your team.

## 2. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 25356 (+10174 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that indexes entire codebases into a persistent SQLite knowledge graph using tree-sitter AST parsing across 158 languages, answering structural queries about functions, call chains, and dependencies in under 1ms with 99% fewer tokens than file-by-file exploration.

**Why now:** It hit 25,000+ stars this week, signaling rapid adoption across major AI coding agents (Cursor, Claude Code, Windsurf, Gemini CLI, Codex), and its backing arXiv paper demonstrates 83% answer quality with 2.1× fewer tool calls — making it a credible infrastructure layer as agent-driven development goes mainstream.

**Build with it:** Drop it into any coding agent workflow to give your AI a persistent, queryable map of a large monorepo or unfamiliar codebase — useful for building autonomous refactoring agents, code review bots, or cross-service dependency trackers that need structural context without burning context windows.

## 3. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 32204 (+9105 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that gives AI coding assistants 12 pipelines, 52 tools, and 500+ skills to handle scripting, asset generation, editing, and final render—producing real motion-clip timelines, not just animated stills.

**Why now:** It hit #1 on GitHub Trending this week with 9,105 stars in seven days, signaling a breakout moment where the tooling around agentic media production just crossed a critical adoption threshold.

**Build with it:** Wire it into a Claude or Cursor workflow to ship a fully automated YouTube channel, a product demo generator, or a low-cost ($1–2) short-film pipeline that goes from text prompt to rendered MP4 without touching a timeline editor.

## 4. safishamsi/graphify

https://github.com/safishamsi/graphify · ★ 76760 (+4375 this week) · antigravity, claude-code, codex, gemini, graphrag, knowledge-graph, leiden, openclaw, rag, skills, tree-sitter

**What it does:** Graphify is a Python tool that ingests any mix of code, SQL schemas, shell scripts, docs, PDFs, images, and videos and builds a queryable knowledge graph from them, exposed as a `/graphify` slash command inside AI coding assistants like Claude Code, Cursor, and Gemini CLI.

**Why now:** It gained 4,375 GitHub stars this week alone, signaling rapid adoption at exactly the moment AI coding assistants are becoming standard dev infrastructure and teams are hitting the wall on context limits with large, multi-layered codebases.

**Build with it:** Wire Graphify into your CI pipeline to auto-index every PR, then query cross-cutting relationships—like which API endpoints touch a given database table or which shell scripts depend on a deprecated env variable—directly from your coding assistant without leaving the editor.

## 5. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 49672 (+7739 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP toolkit that gives AI agents zero-API-fee access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more by routing around paywalls and bot blocks using browser login state and rotating backends.

**Why now:** It hit GitHub's #1 trending repository this week with nearly 50K stars and 7,739 new stars in seven days, signaling a breakout moment for agent-native internet tooling right as Claude Code and Cursor workflows are going mainstream.

**Build with it:** Drop `agent-reach` into any Claude Code or Cursor project to give your agent live web research capabilities—scrape competitor Twitter threads, summarize YouTube tutorials, or pull Reddit bug reports without writing a single scraper yourself.

## 6. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 225560 (+3537 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness operating system that layers skills, memory, security scanning, and research-first workflows on top of AI coding agents like Claude Code, Codex, Cursor, and Opencode.

**Why now:** With 3,537 stars added this week, developer interest in structured agent orchestration is spiking as multi-harness workflows become standard practice for production AI coding setups.

**Build with it:** Drop ECC into your Claude Code or Cursor environment to get persistent agent memory, cross-harness skill sharing, and security scanning out of the box—then extend it to automate your own multi-agent engineering pipelines across 12+ language ecosystems.

## 7. xbtlin/ai-berkshire

https://github.com/xbtlin/ai-berkshire · ★ 9074 (+6205 this week) · ai, ai-agent, anthropic, berkshire-hathaway, charlie-munger, china-stock, claude, claude-code, financial-analysis, fintech, fundamental-analysis, investment, investment-research, llm, mcp, portfolio-management, stock-analysis, stock-market, value-investing, warren-buffett

**What it does:** AI Berkshire is a collection of structured investment research prompts and multi-agent workflows for Claude Code/Codex that systematizes the methodologies of Buffett, Munger, and two prominent Asian value investors into reproducible, decision-forcing stock analysis with built-in anti-bias mechanisms and Python-verified financial calculations.

**Why now:** The repo surged to 9,074 stars with +6,205 added this week, signaling strong community momentum around using Claude Code as an agentic research tool—directly relevant as developers explore practical, high-stakes applications beyond coding assistance.

**Build with it:** Fork the skill templates to create a domain-specific multi-agent research framework for any structured decision process—competitive intelligence, M&A screening, or due diligence—where you need multiple independent agents producing adversarial, conclusion-forcing outputs rather than balanced AI hedging.

## 8. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 82571 (+5441 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a prompt skill/plugin that instructs AI coding agents (Claude Code, Cursor, Copilot, and 30+ others) to strip conversational filler from their responses, cutting output tokens by 65% while keeping code, commands, and errors byte-for-byte identical.

**Why now:** It gained 5,441 GitHub stars this week alone, signaling that developers are actively hunting ways to reduce API costs and latency as they run agents at scale in production workflows.

**Build with it:** Drop this into any token-metered agent pipeline—CI bots, automated code review, or multi-step agentic loops—where you're paying per output token, and immediately cut costs by roughly two-thirds without touching your underlying model or prompts.

## 9. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 208522 (+4979 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is an open-source, self-improving AI agent from Nous Research that builds persistent skills from experience, maintains cross-session memory, and runs on any model or infrastructure — from a $5 VPS to serverless GPU clusters.

**Why now:** The project gained nearly 5,000 stars this week, signaling strong community momentum, and its model-agnostic design makes it immediately relevant as builders weigh options across OpenAI, Anthropic, and open-weight models.

**Build with it:** Use the built-in cron scheduler and multi-platform gateway (Telegram, Discord, Slack) to ship an autonomous personal assistant that learns user-specific workflows over time, or leverage the batch trajectory generation tools to produce fine-tuning data for your own tool-calling models.

## 10. santifer/career-ops <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/santifer/career-ops · ★ 58330 (+2479 this week) · ai-agent, anthropic, automation, beginner-friendly, career, careerops, claude, claude-code, cli, first-timers-only, golang, good-first-issue, interview-prep, job-search, open-source, resume

**What it does:** Career-Ops is an open-source, Claude Code-powered job search system that automates resume tailoring, job listing evaluation, and PDF generation across 14 skill modes with a Go dashboard for tracking progress.

**Why now:** The project surged to 58,330 stars with 2,479 added this week, signaling a breakout moment and an active contributor community with good-first-issue tags making it easy to jump in.

**Build with it:** Fork it to add a new skill mode for a specific industry vertical, or wire in a job board API to replace manual listing imports and submit it as a pull request while the repo has maximum visibility.
