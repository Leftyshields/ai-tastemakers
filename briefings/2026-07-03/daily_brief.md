# AI Tastemakers — Daily Brief — 2026-07-03

_Ranking: delta_7d · 10 repos · generated 2026-07-03T15:25:01.571Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 72648 (+13177 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that injects a "laziest senior dev" heuristic—preferring native browser APIs, fewer abstractions, and deleted code over generated code, measurably cutting output by ~54% LOC on average.

**Why now:** It hit 72,000+ stars this week with 13,000 added in seven days, surfacing at a moment when Claude Code and agentic coding workflows are mainstream and developers are actively burning tokens on over-engineered AI output.

**Build with it:** Drop the skill into your Claude Code setup and run it against any feature backlog to benchmark how much code your agent is generating that the platform already provides for free—then use the results to tune your own agent prompts or cursor rules for cheaper, faster iteration.

## 2. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 25355 (+10176 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that parses any codebase into a persistent knowledge graph using tree-sitter AST analysis across 158 languages, answering structural queries about functions, classes, call chains, and HTTP routes in under 1ms with zero dependencies.

**Why now:** The project gained over 10,000 stars this week and sits at the intersection of every major AI coding agent — Cursor, Claude Code, Gemini CLI, Windsurf, and more — making it a timely primitive as agent-driven development workflows become the norm.

**Build with it:** Drop this into your coding agent stack to give it persistent, token-efficient memory of a large codebase — then build on top of the 14 MCP tools to create custom agents that can navigate the Linux kernel or a microservices monorepo without burning context on raw file reads.

## 3. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 32203 (+9106 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that gives AI coding assistants 12 pipelines and 52 tools to handle the full stack — research, scripting, asset generation, editing, and final render — producing real motion-clip videos, not just animated slideshows.

**Why now:** It hit #1 on GitHub Trending this week with 9,106 stars in seven days, signaling a sharp surge in developer interest around agentic media pipelines at a moment when text-to-video APIs (Kling, Veo, fal.ai) have finally reached usable quality and cost.

**Build with it:** Drop it into Cursor or Claude and prompt your way to a finished video — wire in your own stock footage corpus, swap providers, or extend the tool layer to build a niche automated content pipeline (product demos, explainers, short-form social) for under $2 a video.

## 4. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 55411 (+4083 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste Skill is a collection of portable agent skills (markdown instruction files) that you drop into Codex, Cursor, or Claude Code to enforce stronger layout, typography, motion, and spacing decisions instead of generic boilerplate UI output.

**Why now:** The repo gained 4,083 stars this week, signaling real traction among builders who are frustrated with AI-generated frontends that look identical and mediocre, and v2 of the core `design-taste-frontend` skill just shipped as a substantial rewrite.

**Build with it:** Run `npx skills add https://github.com/Leonxlnx/taste-skill` to inject design constraints directly into your AI coding agent, then pair the image-generation skills with ChatGPT Images to produce reference boards that Codex or Claude Code can implement with consistent visual quality.

## 5. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 49671 (+7738 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents zero-cost read/search access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more by routing around API paywalls and login walls using browser cookies, open scrapers, and MCP integrations.

**Why now:** It hit GitHub's #1 trending repository this week with nearly 50K stars and 7,700+ new stars in seven days, and it just shipped a live platform-switching example—replacing yt-dlp with bili-cli after Bilibili's bot detection tightened, proving the multi-backend routing actually works in production.

**Build with it:** Drop `agent-reach` into any Claude Code, Cursor, or Windsurf workflow to let your agent autonomously scrape competitive intelligence, summarize video content, monitor Reddit threads for bug reports, or pull Chinese social media sentiment—without writing a single scraper or paying for a single API key.

## 6. xbtlin/ai-berkshire

https://github.com/xbtlin/ai-berkshire · ★ 9074 (+6205 this week) · ai, ai-agent, anthropic, berkshire-hathaway, charlie-munger, china-stock, claude, claude-code, financial-analysis, fintech, fundamental-analysis, investment, investment-research, llm, mcp, portfolio-management, stock-analysis, stock-market, value-investing, warren-buffett

**What it does:** AI Berkshire is a structured investment research framework for Claude Code and Codex that encodes the methodologies of Buffett, Munger, and two prominent Asian value investors into 18 composable skills, running multiple agents in parallel to produce opinionated buy/pass verdicts with explicit price targets and scoring rubrics.

**Why now:** The repo gained 6,000+ stars this week as Claude Code and Codex usage surges, making prompt-as-workflow toolkits like this suddenly practical—and this one backs its claims with two years of audited real-money returns (+69% and +66%) that give it unusual credibility in a space full of vaporware.

**Build with it:** Fork the skill templates to create domain-specific multi-agent research pipelines for your own field—due diligence on startups, competitive analysis, or M&A screening—replacing the financial scoring rubrics with your own evaluation criteria while reusing the adversarial multi-perspective and anti-bias mechanisms.

## 7. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 82569 (+5440 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a prompt skill/plugin that instructs AI coding agents (Claude Code, Cursor, Copilot, and 30+ others) to strip verbose filler from responses, cutting output tokens by ~65% while keeping code, commands, and error messages byte-for-byte identical.

**Why now:** The repo just crossed 82,000 stars with 5,400 added this week, signaling the developer community is actively feeling the pain of bloated agent verbosity and token costs at scale.

**Build with it:** Drop this into any agent-heavy internal tooling or CI pipeline where LLM output costs compound across thousands of calls—pair it with token usage logging to measure real savings, or fork the prompt levels to tune compression vs. clarity for your specific domain (e.g., tighter for code review, looser for onboarding docs).

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 208520 (+4979 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is an open-source, self-improving AI agent from Nous Research that runs across terminals, Telegram, Discord, and cloud backends, with a built-in learning loop that creates and refines skills from experience and builds a persistent model of the user across sessions.

**Why now:** The repo gained nearly 5,000 stars this week, signaling strong builder momentum, and its support for any OpenAI-compatible endpoint makes it an immediate drop-in layer for teams already experimenting with Nous Portal, OpenRouter, or local models.

**Build with it:** Developers can deploy Hermes on a $5 VPS or serverless Modal/Daytona infrastructure, wire it into Telegram or Slack as a persistent work agent, and use its batch trajectory generation tools to collect fine-tuning data for training specialized tool-calling models.

## 9. santifer/career-ops

https://github.com/santifer/career-ops · ★ 58329 (+2478 this week) · ai-agent, anthropic, automation, beginner-friendly, career, careerops, claude, claude-code, cli, first-timers-only, golang, good-first-issue, interview-prep, job-search, open-source, resume

**What it does:** Career-Ops is an open-source, Claude Code-powered job search automation system that evaluates job listings at scale, generates personalized CVs, and handles batch processing through 14 skill modes and a Go dashboard.

**Why now:** The repo gained 2,478 stars this week and is trending on GitHub, signaling a wave of developer interest in agentic job search tooling built on Claude Code.

**Build with it:** Fork it to add a new skill mode targeting a specific role type (e.g., founding engineer or staff IC) or wire in a job board API to feed live listings directly into the batch evaluation pipeline.

## 10. headroomlabs-ai/headroom

https://github.com/headroomlabs-ai/headroom · ★ 56142 (+4501 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 60–95% before they hit the model—with a Python/TypeScript library, a drop-in proxy, and an MCP server.

**Why now:** Context windows are filling faster than they're growing as agents chain more tools and retrieve more data, and this week's 56K-star surge signals the community is hitting that wall hard enough to go looking for solutions.

**Build with it:** Wrap your existing Claude Code, Cursor, or LangChain agent with `headroom wrap` or point your OpenAI client at the local proxy to immediately slash token costs and extend how far your agent can reason before hitting context limits.
