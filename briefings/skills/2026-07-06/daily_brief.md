# Skill Tastemakers — Daily Brief — 2026-07-06

_Ranking: delta_7d · 10 repos · generated 2026-07-06T16:31:18.849Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 75726 (+9148 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt-based skill/plugin for AI coding agents (Claude Code, Cursor, etc.) that biases them toward minimal solutions—using native browser inputs instead of installing libraries, deleting over adding, and defaulting to the simplest thing that works.

**Why now:** It gained 9,148 GitHub stars this week, surfacing just as teams are running real cost and token budgets through agentic coding sessions; its benchmarks show a measurable ~54% LOC reduction and ~20% cost drop on actual Claude Code runs against a real FastAPI+React codebase.

**Build with it:** Drop the skill into your Claude Code or Cursor setup and immediately reduce the bloat your agent produces on feature tickets—or fork the benchmark harness in `benchmarks/` to measure how your own prompting strategies compare against a reproducible agentic baseline.

## 2. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 85555 (+7664 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a prompt skill/plugin that forces AI coding agents (Claude Code, Cursor, Copilot, and 30+ others) to respond in compressed, filler-free "caveman" language, cutting output token counts by ~65% while leaving code, commands, and error messages untouched.

**Why now:** The repo hit 85,555 stars with 7,664 added this week, signaling viral traction among developers actively looking to reduce API costs as token-priced model usage compounds across long coding sessions.

**Build with it:** Install the skill as a baseline layer in any agentic coding pipeline or internal dev tooling setup where output tokens are billed—especially useful for high-volume code review bots, CI-integrated agents, or multi-turn scaffolding where verbose model responses quietly drain budgets.

## 3. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 51889 (+6529 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP toolkit that gives AI agents (Claude Code, Cursor, Windsurf, etc.) the ability to read and search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more—without paid APIs, by routing through free backends and browser cookie reuse.

**Why now:** The project hit GitHub trending #1 this week with 6,529 stars added, driven by demand for agent internet access as agentic workflows mature and developers hit the wall of paywalled or blocked platform APIs.

**Build with it:** Wire Agent Reach into your AI agent's toolchain to scrape competitive intelligence across Reddit and Twitter, summarize YouTube or Bilibili tutorials on demand, or automate research pipelines that aggregate cross-platform content—all with a single `pip install` and zero API spend.

## 4. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 27225 (+6307 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that parses codebases into a persistent SQLite knowledge graph using tree-sitter AST analysis across 158 languages, enabling AI coding agents to query functions, call chains, classes, and HTTP routes in under 1ms with 99% fewer tokens than file-by-file exploration.

**Why now:** The project gained 6,307 stars this week, signaling rapid adoption among the AI coding agent ecosystem, and its support for 11 agents including Claude Code, Cursor, Codex, and Gemini CLI makes it immediately relevant as those tools become standard in developer workflows.

**Build with it:** Drop it into any agent config to give your AI instant structural awareness of large monorepos, or use its 14 MCP tools to build custom code navigation, dependency analysis, or automated refactoring pipelines without spinning up any external services.

## 5. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 34178 (+6027 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that gives your AI coding assistant 12 pipelines and 52 tools to handle the full stack — research, scripting, asset generation, editing, and final render — producing real motion-clip videos, not just animated slideshows.

**Why now:** It hit #1 on GitHub Trending this week with 6,027 stars in seven days, signaling a breakout moment where the tooling around agentic media production is finally mature enough for builders to fork and ship.

**Build with it:** Drop in your own AI provider keys (OpenAI, Claude, fal.ai, ElevenLabs) and build a fully automated video pipeline for a niche use case — product demos, news summaries, or short-form social content — at costs the demos prove can stay under $2 per finished video.

## 6. JCodesMore/ai-website-cloner-template

https://github.com/JCodesMore/ai-website-cloner-template · ★ 26140 (+2797 this week) · ai, ai-agents, ai-tools, automation, boilerplate, claude, claude-code, clone, developer-tools, nextjs, react, reverse-engineering, shadcn-ui, skills, tailwindcss, template, typescript, web-scraping, website-clone

**What it does:** AI Website Cloner Template is a Next.js boilerplate that lets you point any AI coding agent at a URL, run `/clone-website`, and get a reconstructed version of that site as clean TypeScript components with Tailwind and shadcn-ui.

**Why now:** The repo jumped 2,797 stars this week, signaling a surge of builders using it alongside Claude's newly released Opus 4.8, which the template explicitly recommends for best cloning results.

**Build with it:** Use it to rapidly prototype competitor UI teardowns, spin up client mockups from reference sites, or reverse-engineer design systems from production websites without starting from scratch.

## 7. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 58603 (+5572 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a set of portable agent skills (markdown instruction files) that you drop into Codex, Cursor, or Claude Code to enforce opinionated layout, typography, spacing, and motion rules, preventing AI coding tools from generating generic-looking UIs.

**Why now:** It gained 5,572 stars this week, likely surfing the wave of Claude Code and Codex going mainstream as daily drivers, where the "AI slop UI" problem is now something every frontend builder hits immediately.

**Build with it:** Run `npx skills add https://github.com/Leonxlnx/taste-skill` to inject the design rules into your agent workflow, then use the included image-generation skills to produce reference boards in ChatGPT Images and hand those frames directly to your coding agent for pixel-closer implementation.

## 8. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 70500 (+2614 this week) · agent-skills, antigravity, antigravity-ide, claude-code, cursor, skills

**What it does:** Agent Skills is a collection of production-grade slash commands (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`) that encode senior engineering workflows into AI coding agents like Claude Code and Cursor, enforcing quality gates at every stage of development.

**Why now:** The repo gained 2,600+ stars this week as Claude Code's plugin marketplace went live, making installable agent skill packs a new primitive that developers are actively exploring and adopting.

**Build with it:** Clone it as a starting point to define your own team's engineering standards as versioned, shareable skills — encoding your specific testing requirements, code review checklists, or deployment gates into commands your AI agent follows consistently across every project.

## 9. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 210210 (+4714 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is an open-source Python AI agent from Nous Research with a self-improving learning loop — it creates and refines skills from experience, maintains cross-session memory, and runs across terminals, Telegram, Discord, and serverless infrastructure like Modal or Daytona.

**Why now:** The repo crossed 210K stars with nearly 5K added this week, signaling rapid community adoption and likely active upstream improvements worth tracking before the ecosystem fragments around competing conventions.

**Build with it:** Spawn parallel subagents to run multi-step research or coding pipelines, wire the cron scheduler to deliver automated reports to Slack or Telegram, or use the trajectory generation and compression tooling to produce fine-tuning datasets for your own tool-calling models.

## 10. xbtlin/ai-berkshire

https://github.com/xbtlin/ai-berkshire · ★ 11046 (+4640 this week) · ai, ai-agent, anthropic, berkshire-hathaway, charlie-munger, china-stock, claude, claude-code, financial-analysis, fintech, fundamental-analysis, investment, investment-research, llm, mcp, portfolio-management, stock-analysis, stock-market, value-investing, warren-buffett

**What it does:** AI Berkshire is a Python framework of structured investment research "skills" for Claude Code and Codex that encodes the methodologies of Buffett, Munger, and two prominent Asian value investors into multi-agent workflows that force explicit buy/sell conclusions with price targets instead of hedged AI non-answers.

**Why now:** The repo gained 4,640 GitHub stars this week, likely driven by its verified real-money track record (+69% in 2024, +66% in 2025) and the growing appetite for Claude Code agents doing domain-specific professional work beyond coding.

**Build with it:** Fork the skill templates to create your own adversarial multi-agent research pipeline—swap in different investor frameworks, point it at a sector you know deeply, and use the built-in red-line checklist and cross-validated financial math tools as a starting scaffold for any high-stakes analytical workflow that demands structured conclusions over balanced mush.
