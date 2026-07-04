# Skill Tastemakers — Daily Brief — 2026-07-04

_Ranking: delta_7d · 10 repos · generated 2026-07-04T14:46:38.148Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 73593 (+12496 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces a "laziest senior dev" heuristic—steering agents toward minimal, idiomatic solutions like `<input type="date">` instead of installing a full datepicker library.

**Why now:** It hit 73,593 stars with 12,496 added this week alone, signaling a sharp community reaction against AI agents that over-build and over-spend on tokens for tasks that already have native solutions.

**Build with it:** Drop the skill into your Claude Code or Cursor setup to immediately cut generated code volume by ~54% on average, reducing API costs and review burden—especially useful if you're building agent workflows where token spend compounds across many tasks.

## 2. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 25918 (+9397 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that indexes entire codebases into a persistent knowledge graph using tree-sitter AST parsing across 158 languages, answering structural queries about functions, call chains, and HTTP routes in under 1ms with 99% fewer tokens than file-by-file exploration.

**Why now:** The project gained nearly 9,400 stars this week, signaling rapid adoption among developers integrating code intelligence into AI coding agents like Cursor, Claude Code, and Windsurf — and a published arXiv benchmark showing 83% answer quality at 10× token reduction gives it unusual credibility for a new tool.

**Build with it:** Drop this into any agent workflow to give your coding assistant persistent, structured memory of a codebase — especially useful for building code review bots, refactoring agents, or cross-service dependency analyzers that need to reason over large repos without burning context on raw file reads.

## 3. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 32878 (+8276 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that gives AI coding assistants 12 pipelines and 52 tools to handle scripting, asset generation, stock footage retrieval, and final rendering—producing real motion-clip videos, not just slideshows of stills.

**Why now:** It hit #1 on GitHub Trending this week with 8,276 stars in seven days, signaling a breakout moment where the tooling for AI-native video production just crossed a critical adoption threshold.

**Build with it:** Wire it into a Claude or Cursor workflow to ship a fully automated YouTube channel, product demo generator, or news-recap pipeline—complete costs demonstrated at under $2 per finished video.

## 4. stablyai/orca

https://github.com/stablyai/orca · ★ 11915 (+3758 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source desktop and mobile app that lets you run multiple coding agents (Claude Code, Codex, OpenCode) simultaneously, each isolated in its own git worktree, with a unified dashboard to compare outputs and merge winners.

**Why now:** It gained 3,758 GitHub stars this week, signaling a sharp spike in developer interest around parallel agent workflows as teams move from single-agent experiments to production-scale orchestration.

**Build with it:** Use Orca to fan a single feature prompt across five agents in parallel, benchmark which implementation passes tests fastest, then merge the best result—cutting iteration time without multiplying your own attention cost.

## 5. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 50332 (+7262 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP toolkit that gives AI agents free, zero-config read/search access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more — bypassing paywalled APIs and login walls by routing through browser cookies and alternative backends.

**Why now:** It hit GitHub's #1 trending repository this week with 7,262 stars added, partly driven by a live example of its resilience: when yt-dlp was blocked by Bilibili's anti-scraping, the project silently switched to bili-cli with no user action required.

**Build with it:** Wire it into Claude Code or Cursor as an MCP server and you can build agents that autonomously monitor competitor Twitter threads, summarize niche Reddit bug reports, or pull YouTube transcripts — without writing a single scraper or paying for a single API key.

## 6. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 83564 (+6225 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a prompt skill/plugin that forces AI coding agents (Claude Code, Cursor, Copilot, and 30+ others) to drop filler language and respond in terse caveman-speak, cutting output tokens by ~65% while keeping code, commands, and errors intact.

**Why now:** It hit 83,564 stars with 6,225 added this week, signaling that developers are actively hunting ways to reduce token costs as agentic coding workflows scale up and output token bills compound across long sessions.

**Build with it:** Drop this into any team's shared agent config to standardize leaner responses across a codebase, or use the prompt pattern as a baseline to build your own domain-specific compression skills—think "terse mode" for code review agents, documentation bots, or CI failure summarizers.

## 7. xbtlin/ai-berkshire

https://github.com/xbtlin/ai-berkshire · ★ 9543 (+5924 this week) · ai, ai-agent, anthropic, berkshire-hathaway, charlie-munger, china-stock, claude, claude-code, financial-analysis, fintech, fundamental-analysis, investment, investment-research, llm, mcp, portfolio-management, stock-analysis, stock-market, value-investing, warren-buffett

**What it does:** AI Berkshire is a collection of structured investment research prompts and multi-agent workflows for Claude Code/Codex that systematically applies the methodologies of Buffett, Munger, and two prominent Chinese value investors to produce decisive buy/sell/watch verdicts with price targets—not hedged AI non-answers.

**Why now:** The repo gained nearly 6,000 stars this week, likely driven by its verified real-money track record (+69% in 2024, +66% in 2025) and the growing developer interest in Claude Code as an agentic coding and reasoning environment.

**Build with it:** Fork the skill templates to create a parallel multi-agent research pipeline for any asset class—run four adversarial analyst agents simultaneously against a watchlist, pipe outputs into a scoring database, and surface only positions that clear all eight red-line filters before they reach your portfolio.

## 8. cobusgreyling/loop-engineering

https://github.com/cobusgreyling/loop-engineering · ★ 5559 (+2601 this week) · agentic-ai, ai-agents, ai-coding, anthropic, automation, claude, claude-code, codex, coding-agents, devops-automation, devtools, github-actions, grok, llm, loop-engineering, mcp, prompt-engineering

**What it does:** Loop Engineering is a CLI toolkit and pattern library for designing automated prompt systems around AI coding agents (Claude Code, Codex, Grok, etc.), replacing manual prompting with structured loops that include skills, state, and budget files scored by a "Loop Ready" metric.

**Why now:** The repo gained 2,601 stars this week, signaling a surge of developer interest coinciding with the rapid adoption of agentic coding tools like Claude Code and OpenAI Codex as primary dev workflows.

**Build with it:** Run `npx @cobusgreyling/loop-init .` to scaffold a self-prompting agent loop for your codebase, then use `loop-audit` to score and harden it and `loop-cost` to track token spend across automated CI runs in GitHub Actions.

## 9. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 209029 (+4932 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent from Nous Research that maintains a persistent learning loop — creating and refining skills from experience, modeling users across sessions, and running scheduled automations across platforms like Telegram, Discord, and Slack from a single process.

**Why now:** The project gained nearly 5,000 stars this week, signaling strong momentum, and its model-agnostic design means builders can swap between Nous Portal, OpenAI, Anthropic, or any OpenRouter endpoint without touching code.

**Build with it:** Use the subagent delegation and cron scheduler to ship a personal AI that autonomously runs nightly code audits or data pipelines on a $5 VPS, then reports results to your Telegram — with skills that improve each time it runs.

## 10. 0xNyk/council-of-high-intelligence <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/0xNyk/council-of-high-intelligence · ★ 3226 (+2222 this week) · ai-agents, claude, claude-code, claude-plugin, decision-making, deliberation, gemini, multi-agent-debate, multi-llm, ollama, openai, prompt-engineering

**What it does:** Council of High Intelligence is a Shell-based Claude Code plugin that routes a single question across 18 distinct AI personas (mapped to Claude, OpenAI, Gemini, and Ollama) and runs structured multi-round deliberation with dissent quotas, novelty gates, and confidence-weighted verdicts.

**Why now:** It gained 2,222 stars this week, coinciding with growing frustration that single-model prompting produces fluent-sounding but overconfident answers—and with Claude Code's plugin marketplace maturing enough to make one-command installs viable.

**Build with it:** Drop it into any Claude Code, Codex, or Gemini CLI workflow and use `/council` to pressure-test architecture decisions, API design tradeoffs, or product pivots before committing—especially useful when you want the council's "Unresolved Questions" output to drive your next spike rather than a false consensus.
