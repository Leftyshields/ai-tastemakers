# Skill Tastemakers — Daily Brief — 2026-07-19

_Ranking: delta_7d · 10 repos · generated 2026-07-19T14:36:09.547Z_


## 1. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 91380 (+9158 this week) · antigravity, claude-code, codex, gemini, graphrag, knowledge-graph, leiden, openclaw, rag, skills, tree-sitter

**What it does:** Graphify is a Python tool that parses any codebase, SQL schemas, docs, PDFs, images, and videos into a queryable knowledge graph using tree-sitter AST for code (local, no LLM) and your configured model for semantic content, invoked via `/graphify` inside Claude Code, Codex, Cursor, or Gemini CLI. Every graph edge is tagged as either `EXTRACTED` (read directly from source) or `INFERRED` (resolved by Graphify), so you can query cross-cutting relationships instead of grepping.

**Why now:** Graphify gained 9,158 GitHub stars this week, signaling a surge of developer interest at exactly the moment AI coding assistants are becoming primary development interfaces, making structured codebase understanding a practical daily need rather than a research experiment.

**Build with it:** Drop Graphify into an existing monorepo to expose relationships between application code, database migrations, and infrastructure configs, then query "which API endpoints touch this table?" or "what services depend on this shared module?" without reading thousands of files manually.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 22138 (+5913 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source Agent Development Environment (ADE) that lets you run multiple coding agents (Codex, Claude Code, OpenCode, or Pi) in parallel, each isolated in its own git worktree, with a unified desktop/mobile interface for monitoring and steering them.

**Why now:** It gained nearly 6,000 stars this week, signaling strong developer interest at the moment parallel agentic coding workflows are becoming a practical daily driver rather than a novelty.

**Build with it:** Use Orca to fan a single feature prompt across five agents simultaneously, compare their divergent implementations in isolated worktrees, and merge the winning diff — dramatically compressing iteration cycles on complex codebases.

## 3. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 85891 (+5330 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces a "laziest senior dev" heuristic — steering the agent toward minimal, already-available primitives instead of over-engineered solutions, yielding measurably less code, lower token cost, and faster runs.

**Why now:** The repo hit ~85K stars with +5,330 this week and is trending on Trendshift, reflecting a growing developer backlash against AI agents that bloat codebases with unnecessary abstractions and dependencies.

**Build with it:** Drop Ponytail into any Claude Code or Cursor workflow to automatically constrain your agent's output — useful for keeping generated PRs reviewable, reducing LLM API spend on long agentic tasks, or enforcing a YAGNI discipline on a team that's handing off feature work to AI.

## 4. iOfficeAI/OfficeCLI

https://github.com/iOfficeAI/OfficeCLI · ★ 19515 (+4589 this week) · agent, ai, claude-code, cli, codex, docx, excel, office, openclaw, pptx, presentation, skills, word, xlsx

**What it does:** OfficeCLI is a single binary that gives AI agents structured read/write control over Word, Excel, and PowerPoint files — no Office installation required — with a built-in HTML/PNG rendering engine so agents can visually verify what they produce.

**Why now:** It jumped nearly 4,600 GitHub stars this week, signaling a fast-growing ecosystem around agentic document automation, and its one-line skill installer already hooks into Claude Code, Cursor, and Copilot out of the box.

**Build with it:** Drop OfficeCLI into an AI coding agent to build automated report generators, data-to-deck pipelines, or document QA tools that can create, inspect, and iteratively fix Office files without any human in the loop.

## 5. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 19793 (+4300 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, gemini-cli, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source AI gateway that routes requests from tools like Claude Code, Cursor, Cline, and Copilot across 265 providers (90+ free tiers) through a single OpenAI-compatible endpoint, with built-in token compression that cuts usage by up to 95% and automatic fallback when any provider hits a limit.

**Why now:** The repo gained 4,300 stars this week, signaling rapid community traction, and the timing coincides with heavy rate-limit pressure from the Gemini CLI and Claude Code free tier launches driving developers to seek reliable fallback infrastructure.

**Build with it:** Point your existing Claude Code or Cursor config at OmniRoute's local endpoint and immediately get free, rotating access to Claude, GPT-4o, and Gemini without changing your tooling—then layer in its 18 routing strategies to build cost-aware multi-model pipelines that degrade gracefully under load.

## 6. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 217124 (+4038 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is an open-source, self-improving AI agent from Nous Research that maintains persistent memory and user modeling across sessions, runs on any LLM backend, and deploys across terminals, Telegram, Discord, and cloud infrastructure from a single install.

**Why now:** The project gained over 4,000 stars this week, signaling rapid community adoption, and its model-agnostic architecture makes it immediately relevant as builders evaluate alternatives to locked-in agent frameworks like Claude Code and Codex.

**Build with it:** Use the built-in cron scheduler and subagent delegation to ship autonomous background workflows — nightly data pipelines, cross-platform notification bots, or self-improving coding assistants — without rewriting orchestration logic for each new model or platform.

## 7. router-for-me/CLIProxyAPI

https://github.com/router-for-me/CLIProxyAPI · ★ 43590 (+3686 this week) · antigravity, claude-code, cluade, codex, gemini, openai

**What it does:** CLIProxyAPI is a Go-based proxy server that wraps CLI tools from OpenAI Codex, Claude Code, Google Antigravity, xAI Grok, and Kimi into standard OpenAI/Gemini/Claude-compatible API endpoints you can hit locally with any SDK or client.

**Why now:** The project gained 3,686 stars this week, coinciding with new model releases across every major provider it wraps—including GPT-5.6, Claude Fable 5, Gemini 3.5 Flash, and Grok 4.5—making it a single integration point for the current frontier.

**Build with it:** Route multiple CLI subscriptions through one unified API layer to build cost-arbitraged agents or coding assistants that automatically fall back across providers without changing a line of client code.

## 8. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 107634 (+3356 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** UI UX Pro Max is a prompt-based AI skill that injects 161 design reasoning rules and 84 UI styles into coding assistants like Claude, Cursor, and Copilot to generate professional, framework-aware UI components and design systems from plain descriptions.

**Why now:** Agentic coding tools are proliferating fast but still produce generic, visually mediocre output by default — this week's 3,356 new stars suggest builders are actively hunting for ways to upgrade the design layer without hiring a designer.

**Build with it:** Drop the skill into your AI coding environment and generate a complete, opinionated design system for your next SaaS landing page, mobile app, or client project — complete with color palette, layout patterns, and conversion-focused section ordering — in a single prompt.

## 9. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 57949 (+3163 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP toolkit that gives AI agents authenticated, scrape-ready access to Twitter, Reddit, YouTube, Bilibili, XiaoHongShu, GitHub, and more—routing around paywalled APIs and platform blocks without requiring developers to wire up each integration themselves.

**Why now:** It hit GitHub's #1 trending repository this week with 3,163 stars added, partly because it just shipped a live fix replacing yt-dlp with bili-cli after Bilibili's anti-scrape measures killed the previous backend—demonstrating it actively maintains working access as platforms lock down.

**Build with it:** Drop the one-line install prompt into Claude Code or Cursor and immediately build agents that monitor Twitter sentiment, summarize YouTube or Bilibili videos, scrape Reddit threads for bug reports, or track XiaoHongShu product reviews—all without paying for a single platform API.

## 10. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 65128 (+3109 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a collection of portable agent skills that inject opinionated layout, typography, motion, and spacing rules into AI coding tools like Claude Code, Cursor, and Codex to prevent them from generating generic-looking UIs.

**Why now:** It gained over 3,000 stars this week, signaling strong developer frustration with AI-generated frontend slop at the exact moment tools like Claude Code and Codex are becoming primary coding interfaces.

**Build with it:** Run `npx skills add` to drop the skills into your AI agent workflow, then use the included image-generation prompts to produce reference boards that guide Codex or Claude Code toward polished, production-quality frontend output.
