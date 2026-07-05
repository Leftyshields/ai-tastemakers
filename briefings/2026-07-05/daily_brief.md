# AI Tastemakers — Daily Brief — 2026-07-05

_Ranking: delta_7d · 10 repos · generated 2026-07-05T14:52:26.121Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 74433 (+11545 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that applies a "laziest senior dev" heuristic—steering the agent toward minimal, built-in solutions instead of over-engineered ones, cutting generated code by ~54% on average across real feature tasks.

**Why now:** It hit 74,000+ stars with 11,500 added this week, surfacing at a moment when Claude Code and agentic coding workflows are mainstream and token costs are a real line item for teams running automated sessions at scale.

**Build with it:** Drop the ponytail skill into your Claude Code or Cursor setup to reduce bloat in greenfield features, then instrument your own benchmark using the included harness against your codebase to measure actual LOC and cost deltas before committing it to your team's workflow.

## 2. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 26523 (+7778 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that indexes entire codebases into a persistent knowledge graph using tree-sitter AST parsing across 158 languages, answering structural queries in under 1ms with 99% fewer tokens than file-by-file exploration.

**Why now:** It gained 7,778 GitHub stars this week, signaling rapid adoption across the AI coding agent ecosystem — and its support for Claude Code, Cursor, Windsurf, Gemini CLI, and Codex makes it immediately deployable in whatever agent stack you're already using.

**Build with it:** Drop it into your agent setup to give any LLM a precise, low-token map of a large unfamiliar codebase — useful for building code review agents, automated refactoring tools, or cross-service dependency trackers that need structural context without burning context windows.

## 3. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 101071 (+3717 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** UI UX Pro Max is a prompt-based AI skill (a structured rules file you drop into tools like Claude, Cursor, or Copilot) that encodes 161 design reasoning rules and 67 UI styles to push generated interfaces toward professional-grade output rather than generic boilerplate.

**Why now:** AI coding tools are proliferating fast but their default UI output is notoriously mediocre, and this project crossed 101K stars this week, signaling real builder demand for a layer that specifically addresses design quality without switching tools.

**Build with it:** Drop the skill file into your AI coding environment and use it to scaffold a polished landing page, mobile UI, or multi-section web app with consistent typography, spacing, and conversion-aware layout patterns — skipping the usual rounds of design cleanup.

## 4. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 113424 (+3593 this week) · ai-tools, claude-code, codex, desktop-app, hermes, hermes-agent, mcp, minimax, omo, open-source, openclaw, openclaw-ui, opencode, provider-management, rust, skills, skills-management, tauri, typescript, wsl-support

**What it does:** CC Switch is a cross-platform Tauri/Rust desktop app that provides a unified management layer for multiple AI coding agents—Claude Code, Codex, Gemini CLI, OpenCode, OpenClaw, and Hermes—letting you switch providers, manage API keys, and configure MCP from one interface.

**Why now:** It gained 3,593 stars this week, signaling a sharp spike in developer interest around multi-agent tooling as teams juggle competing CLI coding assistants and need a single control plane rather than scattered config files.

**Build with it:** A builder could fork the provider abstraction layer to add support for custom or self-hosted LLM endpoints, effectively turning CC Switch into a local routing hub that benchmarks agent performance across providers on identical tasks.

## 5. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 33465 (+7150 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that gives AI coding assistants 12 pipelines and 52 tools to handle scripting, asset generation, editing, and final rendering from a plain-language prompt—producing real motion-clip videos, not just animated slideshows.

**Why now:** The repo jumped 7,150 stars this week and hit #1 on GitHub Trending, signaling a breakout moment where the tooling and community are accelerating fast enough to make contributions and forks immediately visible.

**Build with it:** Wire it into your own agent loop to auto-produce product demo videos, YouTube explainers, or short-form social content—costs as low as $0.02 per video mean you can iterate aggressively without burning budget.

## 6. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 84553 (+7015 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a prompt skill/plugin for Claude Code, Cursor, Copilot, and 30+ other AI coding agents that forces the model to respond in minimal, stripped-down language—cutting output tokens by 65% while preserving code, commands, and technical accuracy byte-for-byte.

**Why now:** With 84,000+ stars and 7,000 new stars this week alone, it's clearly hitting a nerve at a moment when developers are burning through API token budgets fast and looking for cheap, no-code ways to reduce costs without switching models or losing quality.

**Build with it:** Drop this into any token-heavy agentic workflow—long coding sessions, CI-integrated agents, or multi-step scaffolding tools—to immediately cut output costs on every call, or fork the prompt levels to experiment with your own compression strategies tuned to specific domains like SQL generation or infrastructure-as-code.

## 7. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 51050 (+6995 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP toolkit that gives AI agents authenticated, scrape-ready access to Twitter, Reddit, YouTube, Bilibili, XiaoHongShu, GitHub, and more — routing around API paywalls and IP blocks using free backends with automatic fallback when platforms change their defenses.

**Why now:** The project hit GitHub's #1 trending repository this week with nearly 7,000 new stars, driven by its live example of silently rerouting Bilibili scraping from yt-dlp (blocked by risk controls) to bili-cli — demonstrating exactly the kind of maintenance-free resilience developers need as platforms aggressively tighten access in 2025.

**Build with it:** Wire it into a Claude Code or Cursor workflow to build research agents that autonomously monitor Twitter sentiment, summarize YouTube tutorials, and surface Reddit bug reports — all triggered by a single natural-language instruction to the agent with zero API keys or manual cookie management.

## 8. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 226226 (+3362 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness operating system that layers skills, memory, instincts, and security scanning on top of AI coding agents like Claude Code, Codex, and Cursor, giving them persistent context and optimized behavior across sessions.

**Why now:** The repo gained 3,362 stars this week, signaling a surge in developers moving from single-agent experiments to multi-harness production workflows where raw agent defaults are no longer enough.

**Build with it:** Drop ECC into an existing Claude Code or Cursor setup to add cross-session memory and research-first task planning, then extend its skill system to encode your team's specific engineering patterns as reusable agent instincts.

## 9. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 49532 (+2761 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** This repo catalogues extracted system prompts from major AI assistants—Claude, ChatGPT, Gemini, Grok, Copilot, and more—updated regularly as new models ship.

**Why now:** Claude Sonnet 5 dropped July 1 and GPT-5.5 Codex landed June 18, making this the fastest place to diff exactly what instructions are shaping the models your products run on right now.

**Build with it:** Use the prompts as a reverse-engineering baseline to audit how your own system prompts compare, steal proven patterns for tool-use and agentic behavior, or build a prompt-testing harness that benchmarks your instructions against the ones these labs ship in production.

## 10. xbtlin/ai-berkshire

https://github.com/xbtlin/ai-berkshire · ★ 10073 (+5060 this week) · ai, ai-agent, anthropic, berkshire-hathaway, charlie-munger, china-stock, claude, claude-code, financial-analysis, fintech, fundamental-analysis, investment, investment-research, llm, mcp, portfolio-management, stock-analysis, stock-market, value-investing, warren-buffett

**What it does:** AI Berkshire is a Python framework that runs four parallel AI agents—each embodying the investment methodology of Buffett, Munger, Duan Yongping, or Li Lu—to produce structured, opinionated stock research reports with forced buy/pass verdicts, price targets, and built-in anti-bias mechanisms like red-line veto lists and reverse stress tests.

**Why now:** The repo gained 5,060 GitHub stars this week, likely driven by its verified real-money track record (+69% in 2024, +66% in 2025) and the growing adoption of Claude Code and Codex as agentic coding environments that make multi-agent financial workflows practical to run locally.

**Build with it:** Fork the skills library to target a different asset class—private credit, real estate, or biotech—by swapping in domain-specific master methodologies, then expose the multi-agent research pipeline as an MCP server so Claude Desktop or any MCP-compatible client can trigger full due-diligence reports on demand.
