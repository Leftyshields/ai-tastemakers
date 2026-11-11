# AI Tastemakers — Daily Brief — 2026-11-03

_Ranking: delta_7d · 10 repos · generated 2026-11-03T20:52:37.735Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 426621 (+30239 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a protocol layer for connecting AI agents to external tools) that lets agents inspect binaries, native apps, and runtime behavior without source code, wiring them directly into reverse-engineering workflows.

**Why now:** The repo crossed 30,000 stars this week, a sharp spike that reflects growing builder interest in agent-driven security and app analysis.

**Build with it:** Run `npx rea-agents setup` to connect REA to any MCP-compatible agent like Claude Code, then point it at a closed app to trace features down to the binary level.

## 2. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 75920 (+3489 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is a Python agentic video production system with 12 pipelines and over 100 tools that takes a plain-language prompt and handles scripting, asset generation, stock footage retrieval, editing, and final composition via Remotion, with no manual editing required.

**Why now:** The repo hit number one on GitHub Trending this week and includes concrete output examples, including a $1.33 animated short built with Kling v3 clips via fal.ai and Google Chirp3-HD narration.

**Build with it:** Point a Cursor or Copilot agent at the repo, pick one of the 12 named pipelines, and run a prompt against the stock-footage workflow to get a rendered video clip without paying for a video-generation API.

## 3. lemomo-ai/lemo-opuscar

https://github.com/lemomo-ai/lemo-opuscar · ★ 11676 (+3077 this week) · agent-skills, ai-agents, ai-short-film, ai-video, animation, canvas, claude, claude-code, claude-code-plugin, claude-code-skill, creative-coding, ffmpeg, filmmaking, motion-graphics, opus-5-5, prompt-library, text-to-speech, threejs, video-production, webgl

**What it does:** Lemo-Opuscar is a library of 66 film-style prompts for Claude Code, each paired with a demo short film rendered entirely in JavaScript, canvas, WebGL, and Three.js, with no video model involved.

**Why now:** The repo gained 3,077 stars this week and added 7 new styles on 2026-10-29, including a Memphis diorama and a metro map, so there is a fresh batch worth testing right now.

**Build with it:** Drop one of the 66 style prompts into a Claude Code session, supply your own topic, and let the agent write the canvas and WebGL render pipeline to produce a styled short film.

## 4. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 58924 (+12264 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency dsh plugin that exposes frontier models including DeepSeek V4.1 Flash and Kimi K3 through the OpenCode Zen and Kilo AI public gateways, with no login, API key, or build step required.

**Why now:** The repo hit number one on both the Trendshift JavaScript weekly chart and the GitHub daily trending board this week, reflecting a sharp spike in interest around no-auth LLM access.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL and key to get free, cap-free model access without touching gateway credentials.

## 5. AhmadHassan-BTed/Jantt

https://github.com/AhmadHassan-BTed/Jantt · ★ 6207 (+1384 this week) · ai-tools, critical-path, dag, data-visualization, gantt, gantt-chart, json, json-schema, kanban, project-management, react, roadmap, timeline, typescript, zero-dependencies

**What it does:** Jantt is a zero-dependency TypeScript library that renders interactive, draggable Gantt charts from a declarative JSON schema, with a built-in critical path solver and support for plain HTML, React, Node.js CLI, and AI agent toolchains.

**Why now:** The repo gained 1,384 stars this week and surfaced as a trending TypeScript project on Trendshift, at a moment when LLM-driven planning tools are actively looking for structured, token-efficient output targets.

**Build with it:** Point an LLM at the published JSON schema contract to generate valid Gantt data, then drop `@jantt/core` into an existing React app to render the output without adding any runtime dependencies.

## 6. Thysrael/Horizon

https://github.com/Thysrael/Horizon · ★ 12256 (+1221 this week) · aggregator, feishu-bot, llm, mcp, news, openclaw, python, webhook

**What it does:** Horizon is a Python pipeline that pulls from configurable news sources, summarizes them with Claude or GPT, and delivers daily briefings in English and Chinese via webhooks or a static website.

**Why now:** The repo gained over 1,200 stars this week and is trending on Trendshift, pointing to a real spike in builder interest around LLM-powered news aggregation right now.

**Build with it:** Add a custom RSS source to the sources config and wire the output to a Feishu bot webhook to get a team-facing daily digest running in under an hour.

## 7. thedotmack/claude-mem

https://github.com/thedotmack/claude-mem · ★ 111740 (+8080 this week) · ai, ai-agents, ai-memory, anthropic, artificial-intelligence, chromadb, claude, claude-agent-sdk, claude-agents, claude-code, claude-code-plugin, claude-skills, embeddings, long-term-memory, mem0, memory-engine, openmemory, rag, sqlite, supermemory

**What it does:** claude-mem is a persistent memory layer for Claude Code and other AI agents that captures session activity, compresses it with AI, and injects relevant context back into future sessions via RAG and embeddings stored in SQLite or ChromaDB.

**Why now:** The repo gained over 8,000 stars this week, a surge likely tied to growing Claude Code adoption following Anthropic's agent SDK releases.

**Build with it:** Install the plugin and configure it as a Claude Code hook to get cross-session memory without changing your existing prompts or agent logic.

## 8. Usagi-org/ai-goofish-monitor

https://github.com/Usagi-org/ai-goofish-monitor · ★ 16317 (+1087 this week) · ai, ai-assistant, ai-tools, automation, gemini, goofish, open-source, openai, playwright, tool, xian-yu, xianyu, xianyu-bot

**What it does:** ai-goofish-monitor uses Playwright and a multimodal AI model to run concurrent, scheduled searches on Xianyu (China's major secondhand marketplace), filtering listings by keyword, price, region, and AI-generated criteria, then pushing matches to ntfy.sh, Telegram, Bark, or other channels via a FastAPI and SQLite backend with a web UI.

**Why now:** The repo gained over 1,000 stars this week, making this a good time to evaluate it before tooling around its notification and filtering layer solidifies.

**Build with it:** Set the `OPENAI_BASE_URL` and `OPENAI_MODEL_NAME` env vars to any OpenAI-compatible vision model endpoint, import a Xianyu login state via the Chrome extension, and create a cron-scheduled task in the web UI to test AI-driven filtering on a real product category.

## 9. Donchitos/Claude-Code-Game-Studios

https://github.com/Donchitos/Claude-Code-Game-Studios · ★ 34534 (+6735 this week) · ai-agents, ai-assisted-development, anthropic, claude, claude-code, game-design, game-development, gamedev, godot, indie-game-dev, unity, unreal-engine

**What it does:** Claude Code Game Studios installs 49 specialized subagents, 74 slash commands, and 15 validation hooks into a Claude Code session to replicate a full game studio hierarchy, covering roles from creative director down to QA specialist.

**Why now:** The repo gained 6,735 stars this week, reflecting growing adoption of Claude Code's subagent and hooks features as a structured development surface.

**Build with it:** Clone the repo into your project root and run `/start` to let the producer agent scaffold your game design document, sprint plan, and agent assignments from a single prompt.

## 10. t8y2/dbx

https://github.com/t8y2/dbx · ★ 28924 (+999 this week) · ai, cli, clickhouse, database, database-client, database-management, docker, gui, mcp, mongodb, mysql, postgresql, redis, rust, sql-server, sqlite, tauri, vue

**What it does:** DBX is a 25 MB cross-platform database client, written in Rust with a Tauri and Vue frontend, that supports over 100 databases including MySQL, PostgreSQL, SQLite, Redis, MongoDB, DuckDB, and SQL Server, with a built-in AI assistant, MCP server, CLI, desktop GUI, and Docker deployment.

**Why now:** The repo gained roughly 1,000 stars this week, making this a good time to evaluate it before the ecosystem around its MCP server interface solidifies.

**Build with it:** Connect DBX's built-in MCP server to your existing AI agent or coding assistant to give it live, read-write access to any supported database without standing up a separate middleware layer.
