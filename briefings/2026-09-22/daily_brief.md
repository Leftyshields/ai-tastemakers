# AI Tastemakers — Daily Brief — 2026-09-22

_Ranking: delta_7d · 10 repos · generated 2026-09-22T17:37:56.311Z_


## 1. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 265223 (+6969 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness layer that adds persistent skills, memory, instincts, and security guardrails on top of AI coding agents like Claude Code, Codex, Cursor, and Opencode.

**Why now:** Claude Code's rapid adoption as a primary agentic coding environment has made agent configuration and safety tooling a pressing gap, and ECC directly targets that workflow surface this week.

**Build with it:** Drop ECC's `CLAUDE.md`-based skill configs into an existing Claude Code project to impose research-first development instincts and AgentShield security policies as a reusable, version-controlled layer.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 144283 (+6054 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin/skill layer for AI coding agents (Claude Code, Cursor, and ~18 others) that biases the agent toward YAGNI-style minimal solutions — fewer dependencies, fewer abstractions, less generated code per task.

**Why now:** The repo is trending at +6,054 stars this week, coinciding with growing community pushback against AI agents that over-scaffold (the date-picker-installs-flatpickr pattern it directly addresses is a widely recognized complaint in Claude Code threads).

**Build with it:** Drop the npm package `@dietrichgebert/ponytail` into your Claude Code or Cursor config as an agent skill, then run it against any feature branch to audit and trim agent-generated code before merging.

## 3. Tencent/WeKnora

https://github.com/Tencent/WeKnora · ★ 28887 (+5722 this week) · agent, agentic, ai, chatbot, dsh-plugin, embeddings, evaluation, generative-ai, golang, knowledge-base, llm, multi-tenant, ollama, openai, question-answering, rag, reranking, semantic-search, vector-search, wiki

**What it does:** WeKnora is a Go-based, self-hostable knowledge platform that ingests documents from 10+ sources (Feishu, Notion, GitLab, RSS, etc.), exposes them via RAG Q&A and a ReAct agent with sandbox execution, and auto-generates a self-maintaining interlinked markdown Wiki with revision history.

**Why now:** The repo spiked +5,722 stars this week following its public release under Tencent's GitHub org, surfacing multi-tenant workspace support and Langfuse observability as production-ready features that distinguish it from earlier RAG demos.

**Build with it:** Drop your team's Notion or GitLab content into a workspace, wire the scoped API keys to your existing app via the `/chat` endpoint, and embed the agent widget on an external site using the built-in website embed config — no custom retrieval pipeline needed.

## 4. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 248036 (+2609 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python AI agent from Nous Research that builds persistent skills from experience, maintains cross-session memory with FTS5 search, and runs across seven execution backends (local, Docker, SSH, Modal, Vercel Sandbox, and others) while routing conversations through Telegram, Discord, Slack, and CLI from a single gateway process.

**Why now:** The project is trending at +2,609 stars this week, coinciding with growing developer interest in agents that aren't tied to a single provider or local machine — Hermes directly targets Claude Code and Codex workflows with provider-agnostic model switching via `hermes model`.

**Build with it:** Wire Hermes into a nightly CI pipeline using its built-in cron scheduler and Modal serverless backend — spawn subagents for parallel code review or test generation, then capture trajectories with the batch trajectory compression tooling to fine-tune your own tool-calling model via the agentskills.io open standard.

## 5. hypit-ai/hypit

https://github.com/hypit-ai/hypit · ★ 13754 (+5193 this week) · agentic-ai, ai, ai-agents, ai-video, compiler, dsl, ffmpeg, generative-ai, llm, markup-language, monorepo, plugin-system, programming-language, text-to-video, typescript, video, video-automation, video-clone, video-editing, video-generation

**What it does:** Hypit is a TypeScript monorepo with a custom DSL/compiler and plugin system that lets you describe a viral video template once, then use AI agents to swap faces, voiceover, and B-roll at scale — shipping up to 100 variants in a single CLI command via FFmpeg.

**Why now:** The repo hit #1 TypeScript repository of the day on Trendshift with +5,193 stars this week, coinciding with rising creator demand for programmatic short-form video cloning workflows on platforms like TikTok and YouTube Shorts.

**Build with it:** Fork a viral-video `.hypit` template, wire in your own face-swap and TTS plugins via the plugin system, then run the batch export command to produce 100 localized variants — plugging directly into an FFmpeg post-processing step for watermarking or format conversion.

## 6. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 89259 (+2164 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a collection of portable agent skills (config files or prompt rules) that you drop into AI coding agents—Claude Code, Codex, and similar tools—to steer frontend output away from generic UI patterns toward more deliberate visual and interaction decisions.

**Why now:** Vibe-coding workflows are peaking in builder communities this week, and the "AI slop" problem in generated frontends is a live friction point driving rapid star growth and active discussion around agentic coding quality.

**Build with it:** Drop the skill files into your Claude Code or Codex project config, then use them as a persistent instruction layer when scaffolding new React components—pairing them with React Bits or similar animated component libraries for a concrete stylistic baseline.

## 7. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 98394 (+4108 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** A collection of 25 slash-command-driven engineering skills (spec, plan, build, test, review, ship) that encode senior-engineer workflows into AI coding agents like Claude Code, Cursor, and Codex.

**Why now:** The repo surged 4,100+ stars this week, coinciding with broad adoption of agentic coding tools and the launch of the companion `skills` CLI that deploys these workflows across 70+ agents in one command.

**Build with it:** Run `npx skills add addyosmani/agent-skills` to wire all 25 skills into Claude Code or Cursor, then hook `/build auto` into your CI review step to get spec-driven, test-gated, per-task commits without per-task human intervention.

## 8. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 120475 (+3791 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using deterministic AST parsing via tree-sitter, with every edge labeled and no vector store required.

**Why now:** The project is trending at +3,791 stars this week, coinciding with the explosion of `/skills` support across Claude Code, Cursor, and Gemini CLI, making graph-native code context a practical drop-in for those tools right now.

**Build with it:** Register `/graphify` as a skill in Claude Code or Cursor, then query cross-file call graphs and schema relationships directly from the chat prompt instead of grepping—useful for onboarding agents to unfamiliar monorepos or tracing SQL schema dependencies through application code.

## 9. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 84723 (+3655 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP server that lets AI agents scrape Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paid APIs, handling auth, anti-bot bypasses, and HTML cleanup in one install.

**Why now:** The repo is trending at #1 on GitHub this week with +3,655 stars, coinciding with rapid adoption of Claude Code and Cursor as agentic coding environments that need live web context during tasks.

**Build with it:** Wire it into a Claude Code or Cursor workflow via MCP config to give your coding agent live Reddit issue searches and YouTube transcript lookups mid-session, replacing manual copy-paste with a single tool call.

## 10. miuuyy/codex-chatgpt-web

https://github.com/miuuyy/codex-chatgpt-web · ★ 10608 (+3566 this week) · chatgpt, chatgpt-pro, codex, free-ai, mcp, openai, playwright, quickstart, responses-api, typescript

**What it does:** A launcher that routes OpenAI Codex's model picker to ChatGPT Web (including Pro accounts) via Playwright-driven browser automation, exposing streaming, images, and tool use through an MCP bridge without consuming Codex API quota.

**Why now:** The project spiked 3,566 stars this week, likely tracking renewed interest in Codex following OpenAI's recent Codex agent rollout and developer frustration with quota limits on the API tier.

**Build with it:** Point Codex at the `ChatGPT Web — Full Harness` model, configure the MCP connector in the launcher's MCP tab, and get file-system and terminal tool calls routed through ChatGPT Pro's reasoning models inside your existing Codex task workflow.
