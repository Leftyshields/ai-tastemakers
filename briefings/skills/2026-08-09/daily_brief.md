# Skill Tastemakers — Daily Brief — 2026-08-09

_Ranking: delta_7d · 10 repos · generated 2026-08-09T13:59:08.462Z_


## 1. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 43893 (+6981 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that routes requests across 290+ AI providers (90+ free tiers) through a single OpenAI-compatible endpoint, with quota-aware fallback and RTK+Caveman token compression that can cut token usage by 15–95%.

**Why now:** The repo gained nearly 7,000 stars this week, landing it on GitHub Trending and drawing attention at a moment when both Codex CLI and Claude Code are actively competing for developer workflows—OmniRoute lets you point either tool at free-tier models without reconfiguring your setup.

**Build with it:** Drop OmniRoute's endpoint URL into Claude Code's or Cursor's `OPENAI_BASE_URL` config, enable the `quota-aware-fallback` routing strategy, and wire in the MCP server to give any A2A agent automatic provider failover without touching application code.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 99120 (+5673 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code / cursor-rules skill that instructs AI agents to prefer existing platform primitives over new code, measured at −54% LOC and −20% cost on a real FastAPI + React repo across 12 feature tasks.

**Why now:** It hit Hacker News this week (98 points, 17 comments) alongside a detailed agentic benchmark writeup comparing it against caveman and yagni-oneliner prompts, giving builders an honest apples-to-apples baseline rather than a synthetic claim.

**Build with it:** Drop the `@dietrichgebert/ponytail` npm package into your Claude Code agent config or paste the cursor-rules file into `.cursor/rules`; the skill fires on every code-generation step without changing your existing prompts or safety guards.

## 3. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 69438 (+5581 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that lets AI agents (Claude Code, Cursor, etc.) read and search Twitter, Reddit, YouTube, Bilibili, GitHub, and XiaoHongShu without paid APIs, by bundling pre-configured scrapers and transcript fetchers into a single installable package.

**Why now:** The project hit GitHub's #1 trending repository of the day this week with 5,581 stars added, and HN threads opened this week signal developers actively evaluating it for agent toolchains right now.

**Build with it:** Drop the install URL into Claude Code or any MCP-compatible agent to register the scrapers as tools, then wire the structured output into an agentic research workflow — for example, auto-summarizing Reddit threads or YouTube transcripts as context for a coding or market-research agent.

## 4. stablyai/orca

https://github.com/stablyai/orca · ★ 40555 (+5445 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile/VPS IDE that orchestrates fleets of parallel coding agents (Codex, Claude Code, OpenCode, Pi) across isolated git worktrees, with WebGL terminals and a mobile companion for monitoring and steering runs remotely.

**Why now:** Orca gained 5,445 stars this week, likely riding the wave of Claude Code's recent CLI momentum and the broader shift toward agentic coding workflows where developers run multiple agents simultaneously rather than one at a time.

**Build with it:** Fork a single feature prompt across five worktrees, let Codex and Claude Code race to implement it in parallel, then use Orca's Design Mode to click UI elements in Chromium and pipe their HTML/CSS directly into the winning agent's next prompt for iteration.

## 5. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 74482 (+4496 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste Skill is a collection of portable agent skills (prompt instructions and config files) that constrain AI coding agents—Codex, Cursor, Claude Code—to produce frontend UIs with deliberate typography, spacing, layout, and motion instead of default component-library boilerplate.

**Why now:** The project gained 4,496 stars this week, coinciding with the broader "vibe coding" moment where Claude Code and Codex are shipping real production UIs, making output quality and aesthetic consistency a practical problem teams are actively hitting.

**Build with it:** Drop the skill files into your `.cursorrules`, Claude Code project config, or Codex system prompt, then pair the included image-generation skills with ChatGPT Images to produce reference frames that feed directly into your agent's implementation loop.

## 6. lidge-jun/opencodex

https://github.com/lidge-jun/opencodex · ★ 8685 (+2246 this week) · ai-gateway, ai-tools, anthropic, chatgpt, claude, claude-code, codex, codex-cli, deepseek, developer-tools, gemini, grok, kiro, llm, llm-proxy, ollama, openai, openrouter, proxy, typescript

**What it does:** opencodex is a local TypeScript proxy that translates OpenAI's Responses API into provider-specific formats, letting Codex CLI, Claude Code, Claude Desktop, and Grok Build route requests to Claude, Gemini, DeepSeek, Ollama, or any OpenAI-compatible endpoint via a web dashboard at localhost:10100.

**Why now:** The project gained 2,246 stars this week, surfacing alongside active developer discussion around Claude Code's locked provider model and the release of competing frontier models (GPT-5, Gemini 2.5, Kimi K3) that Codex and Claude Code users can't natively access.

**Build with it:** Point Claude Code at the proxy by setting `ANTHROPIC_BASE_URL=http://localhost:10100` and configure a DeepSeek or Ollama backend in the dashboard to run cost-free agentic coding sessions with full tool-call and streaming support.

## 7. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 104495 (+4327 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using tree-sitter AST locally, then exposes it as a `/graphify` skill inside Claude Code, Cursor, Codex, or Gemini CLI via MCP.

**Why now:** The project is trending at +4,327 stars this week, coinciding with the current wave of Claude Code and Gemini CLI adoption where developers are actively wiring MCP skills into their daily coding workflows.

**Build with it:** Drop the `/graphify` MCP skill into your Claude Code or Cursor config, then query cross-file call graphs and schema relationships directly from the chat window instead of grepping—useful for onboarding agents to large monorepos or mapping foreign-key chains across SQL migrations.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 227780 (+3999 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving Python agent from Nous Research with a closed learning loop — it creates and refines skills from experience, maintains cross-session memory via FTS5 search and LLM summarization, and runs across seven terminal backends (local, Docker, SSH, Modal, Daytona, and more).

**Why now:** The project is trending at nearly 4,000 new stars this week, coinciding with growing builder interest in agent frameworks that support serverless persistence and model-agnostic backends as an alternative to Claude Code and Codex lock-in.

**Build with it:** Point it at your own OpenRouter or local endpoint via `hermes model`, then wire the cron scheduler to a Telegram gateway to ship a daily async coding assistant that runs on a $5 VPS, hibernates between sessions on Modal, and accumulates task-specific skills without touching your laptop.

## 9. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 84889 (+3655 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** A collection of 24 slash-command-driven engineering skills (spec, plan, build, test, review, ship) that encode senior-engineer workflows into a format AI coding agents like Claude Code, Cursor, and Codex can follow consistently.

**Why now:** The repo gained 3,655 stars this week, coinciding with growing real-world frustration that agents write code but skip the verification steps — the `/build auto` mode and per-phase quality gates directly address that gap.

**Build with it:** Run `npx skills add addyosmani/agent-skills` to drop all 24 skills into your existing Claude Code or Cursor workspace, then wire `/review` into your PR workflow to enforce the five-axis code-health gate before every merge.

## 10. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 46223 (+1722 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that exposes 12 production pipelines and 100+ tools so an AI coding assistant (Cursor, Claude, Copilot) can handle scripting, asset generation via Flux/Stable Diffusion/ElevenLabs, and final composition through FFmpeg and Remotion without manual handoffs.

**Why now:** The repo hit #1 on GitHub Trending this week with 1,722 stars in seven days, coinciding with renewed builder interest in end-to-end agentic media pipelines following recent Remotion and Claude tooling updates.

**Build with it:** Drop the 700+ agent skill files into your Cursor or Claude project context, wire your Atlas Cloud or OpenAI API keys into the provider config, and invoke a text-to-video pipeline directly from a chat prompt to produce a composed video with voiceover in one agent session.
