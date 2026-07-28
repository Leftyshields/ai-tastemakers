# AI Tastemakers — Daily Brief — 2026-07-28

_Ranking: delta_7d · 10 repos · generated 2026-07-28T15:33:26.748Z_


## 1. koala73/worldmonitor

https://github.com/koala73/worldmonitor · ★ 75762 (+11696 this week) · agent, ai, dashboard, geopolitics, mcp, mcp-server, monitoring, news, opensource, osint, palantir, situation

**What it does:** World Monitor is an open-source TypeScript dashboard that aggregates real-time news, geopolitical events, and infrastructure signals into a unified situational awareness interface, with themed variants for finance, energy, commodities, and tech. It exposes an MCP server, REST API, and SDKs across npm, PyPI, RubyGems, and Go for programmatic access.

**Why now:** The project gained nearly 12,000 GitHub stars this week, signaling a sharp spike in developer interest in AI-powered OSINT and geopolitical monitoring tooling. Volatility across trade, energy, and financial markets makes real-time situational awareness infrastructure suddenly practical rather than niche.

**Build with it:** Wire the MCP server into an AI agent to trigger automated alerts or briefings when specific geopolitical conditions are detected—say, shipping disruptions in a region affecting your supply chain. The multi-domain API (finance, energy, commodity variants) gives a builder ready-made data feeds to layer into risk dashboards or LLM-powered analyst tools without scraping from scratch.

## 2. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 24147 (+10334 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source Chinese-authored book on AI Agent engineering—covering memory, RAG, MCP, multi-agent systems, and reinforcement learning—with 93 runnable code experiments across 10 chapters, freely available in PDF/EPUB in 9 languages.

**Why now:** The repo gained 10,334 stars this week, signaling a surge of developer interest in structured, engineering-focused AI Agent references at a moment when agent frameworks are proliferating faster than documentation.

**Build with it:** Use the 70+ standalone experiments as a modular learning lab—clone a specific chapter's code to prototype a RAG pipeline, a multi-agent workflow, or an MCP integration without reading the full book.

## 3. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 32801 (+9831 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that routes requests across 290+ AI providers (90+ free tiers) through a single OpenAI-compatible endpoint, with quota-aware fallback and token compression that can cut usage by 15–95%.

**Why now:** The repo gained nearly 10,000 stars this week, signaling rapid community validation, and its free-tier aggregation (~1.53B tokens/month) makes it immediately practical as API costs and rate limits tighten across major providers.

**Build with it:** Drop OmniRoute in front of any tool that speaks the OpenAI API—Claude Code, Cursor, Cline, Copilot—and get automatic fallback across free tiers so your coding agents never stall on a quota error without changing a line of client code.

## 4. op7418/guizang-ppt-skill

https://github.com/op7418/guizang-ppt-skill · ★ 22592 (+2937 this week) · ai-agent, claude-code, codex, html-deck, image-generation, ppt, presentation, skill, skills, swiss-design, web-ppt

**What it does:** Guizang PPT Skill is an AI-agent skill for Claude Code and Codex that generates self-contained single-file HTML slide decks in two distinct visual systems: an editorial magazine style and a Swiss International grid style, with support for image generation, multi-platform social covers, and a WebGL presentation runtime.

**Why now:** The repo gained nearly 3,000 stars this week, signaling strong traction as teams look for agent-native alternatives to PowerPoint and Gamma that stay entirely in code workflows.

**Build with it:** Install the skill into your Claude Code or Codex agent, then pipe in a Markdown document or article and have the agent output a polished 16:10 HTML deck with generated images, a WeChat banner, and a Xiaohongshu cover in one shot—no design tools required.

## 5. ComposioHQ/awesome-claude-skills

https://github.com/ComposioHQ/awesome-claude-skills · ★ 71166 (+5861 this week) · agent-skills, ai-agents, antigravity, automation, claude, claude-code, codex, composio, cursor, developer-tools, gemini-cli, mcp, openai-codex, rube, saas, skill, workflow-automation

**What it does:** A curated collection of 1,000+ reusable "skill" packages for Claude and other coding agents (Cursor, Codex, Gemini CLI), where each skill is a markdown file with structured instructions that teaches the agent how to handle a specific task class, backed by Composio's MCP Gateway for live app integrations.

**Why now:** The repo gained nearly 6,000 stars this week, signaling a rapid community consolidation around shareable, portable agent instruction formats at the same moment Claude Code, Codex, and Gemini CLI are all competing for developer workflow adoption.

**Build with it:** Drop in a skill folder to give your Claude Code agent repeatable behaviors—automated PR reviews, Slack digest summaries, or Jira ticket triage—then connect it to real apps via the Composio MCP endpoint without writing auth logic from scratch.

## 6. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 36136 (+2584 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server written in C that indexes entire codebases into a persistent SQLite knowledge graph using tree-sitter AST parsing across 158 languages, enabling sub-millisecond structural queries about functions, call chains, classes, and HTTP routes with 99% fewer tokens than file-by-file exploration.

**Why now:** The project surged to 36K stars this week as AI coding agents (Cursor, Claude Code, Gemini CLI, Codex) become standard developer tooling, creating immediate demand for a low-token, high-accuracy code intelligence layer that plugs directly into those agent surfaces without running a language server or cloud service.

**Build with it:** Drop this into any agentic coding workflow to give your agent precise, graph-queryable answers about unfamiliar codebases — or build on top of the 15 MCP tools to create custom code-review bots, refactoring assistants, or cross-service dependency trackers that operate locally with zero data egress.

## 7. citrolabs/ego-lite

https://github.com/citrolabs/ego-lite · ★ 5662 (+4896 this week) · agent-skills, ai-agent, automation, browser, browser-automation, claude-code, codex, hermes-agent, skills, skills-sh

**What it does:** ego lite is a macOS browser that lets AI agents like Claude Code or Codex run browser automation tasks in isolated "Spaces" while sharing your existing logged-in sessions, cookies, and tabs without conflicts or re-authentication overhead.

**Why now:** The project gained nearly 5,000 stars this week, signaling strong developer interest at the moment when agentic coding tools like Codex and Claude Code are becoming daily drivers that need reliable, frictionless browser access.

**Build with it:** Use the `ego-browser` skill to give your AI agent authenticated access to tools like GitHub, Notion, or Linear—letting it file issues, update docs, or scrape dashboards without you ever handing over passwords or losing your own browser state.

## 8. ruvnet/RuView

https://github.com/ruvnet/RuView · ★ 87159 (+4752 this week) · awesome, claude, densepose, esp32, firmware, home-assistant, home-automation, iot, monitoring, networking, npm, pose-estimation, react, rf, self-learning, skills, spatial-intelligence, typescript, wifi, wifi-security

**What it does:** RuView uses CSI data from ~$9 ESP32 nodes to extract presence, breathing rate, heart rate, sleep staging, and fall detection from ambient WiFi signals — no cameras, no wearables, no cloud required.

**Why now:** The repo gained 4,752 stars this week, signaling a surge of builder interest, and ships native integrations for Home Assistant, Apple Home, Matter, and Alexa out of the box — removing the hardest integration work from your plate.

**Build with it:** Wire a few ESP32s into a rental unit or care facility and ship a room-aware wellness monitor that flags breathing anomalies or nighttime falls and pushes alerts through any major smart-home platform using the included MQTT publisher and 21 pre-built sensor entities.

## 9. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 97554 (+4673 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify turns any codebase—including docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using deterministic tree-sitter AST parsing locally, with every graph edge tagged as either explicitly extracted or LLM-inferred.

**Why now:** It surged to 97,554 stars with 4,673 added this week, and its native `/graphify` skill integration with Claude Code, Cursor, Codex, and Gemini CLI makes it immediately usable inside the AI coding tools developers are already running daily.

**Build with it:** Wire Graphify into your CI pipeline to auto-generate a live knowledge graph of your codebase, then expose it via MCP so your AI coding assistant can answer precise dependency, call-chain, and impact-analysis questions without hallucinating file structure.

## 10. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 43094 (+2330 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source Python framework that turns AI coding assistants like Claude or Cursor into agentic video production pipelines, covering scripting, asset generation, voiceover, and final composition across 12 production pipelines and 100+ tools.

**Why now:** It hit #1 on GitHub Trending this week with 2,330 new stars, surfacing at a moment when agentic AI workflows are moving from demos into practical production tooling.

**Build with it:** Clone the repo, point your AI assistant at the AGENT_GUIDE, and wire together a pipeline that takes a reference video URL, reverse-engineers its structure, and outputs a fully rendered remake using Flux for images, ElevenLabs for voiceover, and FFmpeg for final cut.
