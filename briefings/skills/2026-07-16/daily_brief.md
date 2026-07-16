# Skill Tastemakers — Daily Brief — 2026-07-16

_Ranking: delta_7d · 10 repos · generated 2026-07-16T15:14:42.855Z_


## 1. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 88558 (+8438 this week) · antigravity, claude-code, codex, gemini, graphrag, knowledge-graph, leiden, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase, SQL schema, docs, or media into a queryable knowledge graph using tree-sitter AST for code (fully local, no LLM required) and exposes it as a `/graphify` slash command inside AI coding assistants like Claude Code, Cursor, and Gemini CLI. Every edge is labeled `EXTRACTED` or `INFERRED` so you know exactly what was read from source versus resolved by the tool.

**Why now:** The project surged to 88k stars with 8,400+ added this week, signaling a breakout moment as developers running agentic coding sessions hit the wall of LLMs losing context across large, multi-layered repos. Graph-based retrieval is becoming the practical alternative to naive RAG for codebases that span app code, database schemas, and infra simultaneously.

**Build with it:** Drop Graphify into a monorepo containing your API code, Postgres schemas, and Terraform configs, then query cross-cutting questions like "which endpoints write to tables touched by this migration" without grep-chaining across three directories. You could also wire its graph output into a custom MCP server to give any agent persistent, structured context about your codebase between sessions.

## 2. iOfficeAI/OfficeCLI

https://github.com/iOfficeAI/OfficeCLI · ★ 18228 (+6934 this week) · agent, ai, claude-code, cli, codex, docx, excel, office, openclaw, pptx, presentation, skills, word, xlsx

**What it does:** OfficeCLI is an open-source, single-binary CLI tool that lets AI agents programmatically create, read, and edit `.docx`, `.xlsx`, and `.pptx` files without requiring Microsoft Office, using a built-in HTML rendering engine so agents can visually verify output.

**Why now:** It gained nearly 7,000 stars this week and integrates directly with Claude Code, Cursor, Windsurf, and GitHub Copilot via a one-line skill install, hitting at the moment when agentic coding workflows are actively looking for reliable file I/O primitives.

**Build with it:** Drop OfficeCLI into an AI agent workflow to automate report generation, data export to formatted Excel sheets, or slide deck creation from structured data — closing the full loop from data input to a polished, human-readable Office file with no manual formatting step.

## 3. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 84497 (+6805 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt-engineering plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces YAGNI discipline—pushing the agent to reach for the simplest possible solution (like a native `<input type="date">`) before writing any custom code, averaging 54% fewer lines of code produced across real agentic sessions.

**Why now:** It hit Hacker News this week and gained 6,800+ GitHub stars in seven days, coinciding with widespread adoption of Claude Code and growing frustration that AI agents over-engineer routine features by default.

**Build with it:** Drop the skill into your Claude Code or Cursor setup to cut token costs ~20% and session time ~27% on any greenfield or legacy codebase—especially useful if you're building internal tools where agent verbosity directly inflates your API bill.

## 4. stablyai/orca

https://github.com/stablyai/orca · ★ 20456 (+6453 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source desktop and mobile IDE for orchestrating fleets of parallel AI coding agents (Codex, Claude Code, OpenCode, Pi) across isolated git worktrees, so you can fan out one prompt to five agents and merge the best result.

**Why now:** It jumped 6,453 GitHub stars this week, signaling rapid community adoption at the exact moment parallel agentic coding workflows are becoming practical for individual developers.

**Build with it:** Wire Orca into your existing Claude or Codex subscription to parallelize feature branches, run competing implementations simultaneously, and monitor progress from your phone — cutting iteration cycles that would otherwise be sequential.

## 5. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 78707 (+5453 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** Agent Skills packages production engineering workflows—spec, plan, build, test, review, ship—as slash commands that AI coding agents like Claude Code, Cursor, and Codex follow consistently across a project's full lifecycle.

**Why now:** The repo gained 5,453 stars this week, signaling a surge of builders who are hitting the limits of raw AI code generation and looking for guardrails that enforce quality gates like TDD and code review automatically.

**Build with it:** Install all 24 skills in one command (`npx skills add addyosmani/agent-skills`) and wire them into your agent to get autonomous, test-driven feature implementation with `/build auto`—the agent plans, codes, tests, and commits each task without you babysitting every step.

## 6. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 58318 (+4524 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** A public GitHub repository that extracts and documents the actual system prompts running inside major AI products — Claude, ChatGPT, Gemini, Grok, Copilot, and more — updated as new model versions ship.

**Why now:** Three major prompt additions landed this week including Kimi K2.6, Perplexity Deep Research, and DeepSeek, and the repo crossed 58K stars after a Washington Post feature on using leaked prompts to understand AI behavior.

**Build with it:** Use the extracted prompts as a reverse-engineering baseline to understand how top AI products constrain tone, tool use, and refusals — then apply those patterns to tighten your own system prompts or benchmark your product's behavior against production-grade deployments.

## 7. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 17970 (+4425 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, gemini-cli, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that exposes a single OpenAI-compatible endpoint routing requests across 250+ AI providers (90+ free tiers), with automatic fallback, RTK+Caveman token compression, and native integrations for Claude Code, Cursor, Cline, Codex, and Copilot.

**Why now:** The repo gained 4,425 stars this week, signaling rapid community adoption, and the aggregated ~1.6B free tokens/month makes it immediately practical as AI API costs and rate limits increasingly block solo builders.

**Build with it:** Drop OmniRoute in front of any OpenAI-SDK-based project to get free-tier failover without changing your application code, or use it as the backbone of a multi-agent system where different agents transparently hit different providers based on cost, speed, or capability constraints.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 215846 (+4424 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is an open-source, self-improving AI agent from Nous Research that maintains persistent memory and skills across sessions, runs on any LLM backend, and deploys across CLI, Telegram, Discord, and serverless infrastructure from a single install.

**Why now:** The project gained 4,424 stars this week, signaling strong community momentum, and its compatibility with the agentskills.io open standard positions it at the center of an emerging ecosystem for shareable, interoperable agent capabilities.

**Build with it:** Wire Hermes to your own model endpoint via OpenRouter or a local server, define custom scheduled automations in natural language, and use its batch trajectory generation pipeline to collect fine-tuning data for training specialized tool-calling models on your domain.

## 9. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 57127 (+4018 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP toolkit that gives AI agents authenticated, scraping-ready access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more — no paid APIs required, handling cookie management, anti-bot routing, and data cleaning automatically.

**Why now:** It hit #1 on GitHub Trending this week with 57K stars and 4K new stars in seven days, and just shipped a live fix routing around Bilibili's crackdown on yt-dlp — signaling it's actively maintained against real platform changes.

**Build with it:** Wire it into a Claude Code or Cursor agent to build a competitive intelligence tool that monitors Twitter sentiment, Reddit threads, and XiaoHongShu reviews for any product — all from a single command loop with zero API spend.

## 10. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 39198 (+3737 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source, agent-driven video production system that gives your AI coding assistant 12 pipelines and 52 tools to handle scripting, asset generation, stock footage retrieval, timeline editing, and final render — producing actual motion-clip video, not just animated stills.

**Why now:** It hit #1 on GitHub Trending this week with nearly 4,000 new stars, signaling a wave of builder interest in agentic media workflows at the exact moment Claude, GPT-4o, and open image/video models are mature enough to chain together reliably.

**Build with it:** Wire OpenMontage into a Cursor or Claude workflow to generate fully produced explainer videos, product demos, or short-form content from a single text prompt — or fork a pipeline to add your own retrieval sources, swap in a local Stable Diffusion model, or automate a recurring video series end to end.
