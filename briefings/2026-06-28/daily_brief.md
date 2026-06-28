# AI Tastemakers — Daily Brief — 2026-06-28

_Ranking: delta_7d · 10 repos · generated 2026-06-28T13:54:36.504Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 62888 (+21242 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt-engineering skill/plugin for AI coding agents (Claude Code, Cursor, etc.) that instructs them to default to the simplest possible solution—native browser APIs, stdlib, one-liners—before reaching for libraries or abstractions, measurably cutting generated code by ~54% on average.

**Why now:** It hit 62,888 stars with 21,242 added this week, making it one of the fastest-rising repos on GitHub right now, likely driven by the surge in Claude Code adoption and developers noticing their agents over-engineering everything.

**Build with it:** Drop the ponytail skill into your Claude Code or Cursor setup to immediately tighten any AI-assisted codebase—particularly useful if you're scaffolding a new product and want the agent to stay lean rather than pulling in unnecessary dependencies from the start.

## 2. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 26315 (+11937 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that gives AI coding assistants 12 pipelines, 52 tools, and 500+ skills to handle scripting, asset generation, editing, and final render—producing real motion-clip videos, not just slideshows of stills.

**Why now:** It hit #1 on GitHub Trending this week with nearly 12,000 new stars, signaling a breakout moment where developers are actively exploring and stress-testing its capabilities in real projects.

**Build with it:** Wire it into a Claude or Cursor workflow to automate end-to-end video content pipelines—think auto-generated product demos, explainer videos, or social clips triggered from a single text prompt for under $2 a run.

## 3. mukul975/Anthropic-Cybersecurity-Skills

https://github.com/mukul975/Anthropic-Cybersecurity-Skills · ★ 22459 (+5537 this week) · ai-agents, claude-code, cloud-security, cybersecurity, devsecops, ethical-hacking, incident-response, infosec, llm, malware-analysis, mcp, mitre-attack, nist-csf, osint, penetration-testing, red-team, security, security-automation, threat-hunting, threat-intelligence

**What it does:** This repo provides 817 structured cybersecurity skills for AI agents across 29 domains—covering red team, threat hunting, malware analysis, and incident response—each mapped to six industry frameworks (MITRE ATT&CK, NIST CSF 2.0, D3FEND, ATLAS, AI RMF, and F3) and following the agentskills.io standard for direct agent consumption.

**Why now:** The project gained 5,537 stars this week, signaling strong builder momentum, and its recent addition of MITRE F3 v1.1 fraud framework mapping makes it timely for teams building AI security tooling against an expanding threat surface.

**Build with it:** Drop these skills into Claude Code, Cursor, or any of the 26+ supported platforms to give your security agent the procedural knowledge to triage memory dumps with Volatility3, write Sigma detection rules, or scope a multi-cloud breach—without hand-coding that domain expertise yourself.

## 4. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 18745 (+9854 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that indexes entire codebases into a persistent SQLite knowledge graph using tree-sitter AST parsing across 158 languages, answering structural queries about functions, call chains, and HTTP routes in under 1ms with 99% fewer tokens than file-by-file exploration.

**Why now:** The project gained nearly 10,000 stars this week, signaling rapid adoption across the major AI coding agents (Cursor, Claude Code, Windsurf, Gemini CLI, and 7 others) at exactly the moment teams are hitting token-limit and context-management walls in large codebases.

**Build with it:** Drop this into any agent workflow to give your LLM a queryable map of a large monorepo — then build on top of the 14 MCP tools to power custom refactoring agents, dependency auditors, or cross-service call-graph visualizers without burning context on raw file reads.

## 5. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 44055 (+8551 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI tool that gives AI agents free, zero-configuration access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu by handling authentication, scraping, and data cleaning under the hood.

**Why now:** The project jumped 8,551 stars this week, hitting #1 on GitHub Trending, likely driven by growing demand for agent tooling that bypasses expensive platform APIs as developers build real-world agentic workflows.

**Build with it:** Drop the one-line install prompt into any Claude Code, Cursor, or Windsurf session to give your agent live internet research capabilities—useful for building competitive intelligence tools, content summarizers, or social listening pipelines without writing a single scraper yourself.

## 6. xbtlin/ai-berkshire <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/xbtlin/ai-berkshire · ★ 5013 (+4193 this week) · ai, ai-agent, anthropic, berkshire-hathaway, charlie-munger, china-stock, claude, claude-code, financial-analysis, fintech, fundamental-analysis, investment, investment-research, llm, mcp, portfolio-management, stock-analysis, stock-market, value-investing, warren-buffett

**What it does:** AI Berkshire is a Python framework of structured investment research prompts and multi-agent workflows that enforces four value investing methodologies (Buffett, Munger, Duan Yongping, Li Lu) into reproducible, opinionated buy/sell decisions with price targets rather than hedge-everything non-answers.

**Why now:** The repo exploded to 5,000+ stars this week, signaling strong builder appetite for financial AI tooling that goes beyond generic LLM wrappers—and Claude Code's multi-agent capabilities make the parallel analyst architecture actually viable to run today.

**Build with it:** Fork the agent framework to build a personalized stock screener that runs four independent research agents against any ticker via MCP-connected financial data sources, then surfaces structured pass/fail verdicts with confidence ratings into a Notion or Obsidian investment journal.

## 7. hugohe3/ppt-master

https://github.com/hugohe3/ppt-master · ★ 33539 (+3974 this week) · ai-agent, aippt, office, powerpoint, powerpoint-generation, ppt, pptx, presentation, slide, slides

**What it does:** PPT Master is a Python AI agent that converts any document into a fully editable PPTX file using native PowerPoint shapes and animations, complete with speaker notes rendered as audio narration and support for custom .pptx templates.

**Why now:** The project gained nearly 4,000 stars this week alone, signaling strong developer momentum and likely active community contributions, bug fixes, and new model integrations worth following closely.

**Build with it:** Drop it into a document-heavy workflow—legal briefs, research reports, sales decks—and wire it to an LLM API to auto-generate client-ready presentations on demand, with your own branded .pptx template as the style baseline.

## 8. ZhuLinsen/daily_stock_analysis

https://github.com/ZhuLinsen/daily_stock_analysis · ★ 50895 (+7519 this week) · a-stock, ai-agent, aigc, llm, quant, quantitative-finance, quantitative-trading

**What it does:** An LLM-powered stock analysis system that pulls multi-source market data (A-share, HK, US, JP, KR), generates AI decision reports with buy/sell levels and risk alerts, and pushes results to WeChat/Feishu/Telegram/Slack on a schedule via GitHub Actions at zero cost.

**Why now:** The repo jumped 7,519 stars this week, landing it as the #1 Python repository of the day on Trendshift, signaling a surge of builder interest in automated, LLM-driven financial tooling.

**Build with it:** Fork the repo, wire in your own watchlist and a compatible LLM API (DeepSeek, Gemini, OpenAI-compatible), and extend the 15 built-in agent strategies to run a custom multi-market daily briefing delivered straight to your messaging platform.

## 9. palmier-io/palmier-pro

https://github.com/palmier-io/palmier-pro · ★ 9247 (+6745 this week) · ai-video, claude, macos, mcp, seedance2, swift, video-editor

**What it does:** Palmier Pro is an open-source macOS video editor built in Swift that lets you and an AI agent collaborate directly inside a timeline, with built-in support for generative video models like Seedance and Kling.

**Why now:** It launched this week to 9,247 stars and requires macOS 26 (Tahoe), making it one of the first native apps targeting Apple's just-announced OS—and it ships an MCP server out of the box for Claude, Codex, and Cursor integration.

**Build with it:** Connect Claude Code to the local MCP server at `http://127.0.0.1:19789/mcp` and write agents that programmatically edit timelines, trigger video generation, and automate post-production workflows without touching the UI.

## 10. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 204705 (+6687 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is an open-source, self-improving AI agent from Nous Research that runs across Telegram, Discord, Slack, and CLI, using any LLM backend while building persistent memory, autonomous skills, and a user model across sessions.

**Why now:** It gained 6,687 stars this week, signaling strong community momentum, and its compatibility with the open agentskills.io standard makes it a timely foundation for portable, composable agent tooling.

**Build with it:** Deploy Hermes on a $5 VPS or serverless Modal instance, wire it to your Telegram, and use its skill-creation and cron scheduler APIs to build a personal automation layer that learns from your workflows and improves itself over time.
