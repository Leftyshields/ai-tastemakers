# AI Tastemakers — Daily Brief — 2026-07-24

_Ranking: delta_7d · 10 repos · generated 2026-07-24T15:05:19.436Z_


## 1. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 18947 (+17939 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source Chinese-language book (with 7 language translations) covering AI Agent design and engineering, structured around the formula Agent = LLM + Context + Tools, with 92 hands-on coding experiments across 10 chapters.

**Why now:** It gained nearly 18,000 stars this week, signaling a surge in developer demand for structured, practical AI Agent education at a moment when agent architectures are becoming production-critical.

**Build with it:** Clone the repo, run the chapter experiments locally to prototype agent memory systems, multi-agent pipelines, RAG workflows, or MCP integrations, using the companion Python code as a tested starting scaffold.

## 2. koala73/worldmonitor

https://github.com/koala73/worldmonitor · ★ 72901 (+10978 this week) · agent, ai, dashboard, geopolitics, mcp, mcp-server, monitoring, news, opensource, osint, palantir, situation

**What it does:** World Monitor is an open-source TypeScript dashboard that aggregates real-time news, geopolitical events, and infrastructure signals into a unified situational awareness interface, with domain-specific variants for tech, finance, energy, and commodities.

**Why now:** The project gained nearly 11,000 GitHub stars this week, signaling strong community pull toward self-hostable intelligence tooling as an alternative to proprietary OSINT platforms.

**Build with it:** Use the MCP server integration and SDK (available in Python, Go, Ruby, and npm) to pipe live geopolitical or market signals directly into your own AI agents, alerting systems, or decision-support tools.

## 3. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 28280 (+10311 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that routes requests across 290+ AI providers through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and token compression (RTK+Caveman) that cuts token usage by 15–95%.

**Why now:** The project gained 10,311 stars this week, signaling rapid community adoption, and its free-tier aggregation (~1.53B tokens/month across 43 provider pools) makes it immediately practical as API costs and rate limits tighten across major providers.

**Build with it:** Drop OmniRoute in front of any tool that speaks the OpenAI API—Claude Code, Cursor, Cline, Codex—and get automatic failover across free tiers, so you can run uninterrupted coding agents or multi-model pipelines without managing individual provider keys or hitting quota walls.

## 4. ComposioHQ/awesome-claude-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ComposioHQ/awesome-claude-skills · ★ 69851 (+4546 this week) · agent-skills, ai-agents, antigravity, automation, claude, claude-code, codex, composio, cursor, developer-tools, gemini-cli, mcp, openai-codex, rube, saas, skill, workflow-automation

**What it does:** Awesome Claude Skills is a curated collection of 1,000+ reusable instruction packages ("skills") that teach Claude and other AI coding agents like Cursor, Codex, and Gemini CLI how to handle specific task categories, backed by Composio's MCP Gateway for connecting to real external services.

**Why now:** The repo gained 4,546 stars this week, signaling strong momentum as developers standardize how they package and share agent behaviors across the expanding ecosystem of Claude Code, Codex, and similar tools.

**Build with it:** A builder could package domain-specific workflows—say, a legal contract review pipeline or a CI/CD triage agent—as a portable skill folder, then distribute it so any team can drop it into Claude Code or Cursor and immediately have authenticated access to GitHub, Slack, or email without writing glue code.

## 5. tirth8205/code-review-graph

https://github.com/tirth8205/code-review-graph · ★ 26133 (+6645 this week) · ai-coding, claude, claude-code, code-review, graphrag, incremental, knowledge-graph, llm, mcp, python, static-analysis, tree-sitter

**What it does:** code-review-graph builds a persistent structural map of your codebase using Tree-sitter and exposes it to AI coding tools via MCP, so models pull only the relevant context instead of re-reading entire repositories on every review.

**Why now:** The project gained 6,645 stars this week, signaling strong developer demand for token-efficient AI workflows as context costs on large codebases become a real bottleneck in daily development.

**Build with it:** Wire it into your CI pipeline as a GitHub Action to give PR review agents precise, incremental context on every diff, or use the MCP server to build a code-aware assistant that answers architecture questions without flooding the model with irrelevant files.

## 6. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 92663 (+2558 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a prompt skill/plugin that forces AI coding agents (Claude Code, Cursor, Copilot, and 30+ others) to respond in terse, stripped-down language, cutting output tokens by 65% while keeping code, commands, and error messages completely intact.

**Why now:** It crossed 92,000 GitHub stars this week with 2,558 new stars, signaling the developer community is actively hunting ways to reduce API costs as agentic coding workflows compound token spend across dozens of daily interactions.

**Build with it:** Drop this into a cost-tracking wrapper that logs token usage before and after enabling caveman mode, giving teams a real dashboard of per-developer savings to justify or optimize their AI tooling budget.

## 7. ruvnet/RuView

https://github.com/ruvnet/RuView · ★ 85703 (+4835 this week) · awesome, claude, densepose, esp32, firmware, home-assistant, home-automation, iot, monitoring, networking, npm, pose-estimation, react, rf, self-learning, skills, spatial-intelligence, typescript, wifi, wifi-security

**What it does:** RuView uses ESP32 sensors (~$9/node) to extract Channel State Information from ordinary WiFi signals, translating radio disturbances into real-time presence detection, breathing/heart rate monitoring, fall detection, and room-level activity classification — no cameras, no wearables, no cloud.

**Why now:** The project gained 4,835 stars this week, signaling a surge of builder interest, and ships native integrations for Home Assistant, Apple Home, Matter, and Alexa out of the box, making it immediately deployable into existing smart-home stacks without custom glue code.

**Build with it:** Wire up a mesh of ESP32 nodes, point the MQTT publisher at your Home Assistant instance, and start building privacy-preserving occupancy automations — elderly fall alerts, sleep apnea screening, or meeting-room presence systems — using the 21 pre-built sensor entities and 3 starter Blueprints as your baseline.

## 8. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 43039 (+4548 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, from-scratch, generative-ai, llm, machine-learning, mcp, nlp, python, reinforcement-learning, rust, swarm-intelligence, transformers, tutorial, typescript

**What it does:** A fully open-source, 503-lesson curriculum spanning 20 phases that teaches AI engineering from raw linear algebra through autonomous agent swarms, producing a reusable artifact (prompt, skill, agent, MCP server) at every step across Python, TypeScript, Rust, and Julia.

**Why now:** The repo gained 4,548 stars this week alone, signaling a surge of builders looking for structured depth over scattered tutorials at a moment when "vibe coding" AI wrappers is everywhere but foundational understanding is not.

**Build with it:** Follow the linear phase sequence to go from implementing backprop by hand to shipping production LLM inference engines and multi-agent swarms, ending with artifacts you own and can deploy rather than demos you copy-pasted.

## 9. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 88830 (+4333 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces YAGNI-style minimalism—prompting the agent to reach for the simplest possible solution before writing custom code, cutting generated LOC by ~54% on average across real tasks.

**Why now:** It's trending at 88,830 stars with 4,333 added this week, likely surfacing alongside the Claude Code agent ecosystem maturing to the point where output quality and cost—not just capability—are the real pain points.

**Build with it:** Drop ponytail into your Claude Code or Cursor workflow to automatically rein in over-engineered agent output on any greenfield or legacy codebase, or fork it to craft domain-specific "laziness rules" that steer agents toward your team's preferred primitives and constraints.

## 10. Graphify-Labs/graphify <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Graphify-Labs/graphify · ★ 95028 (+2147 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus its docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using deterministic tree-sitter AST parsing, with every graph edge tagged as either directly extracted or inferred, and no vector store required.

**Why now:** The project gained over 2,100 stars this week and ships as a native `/graphify` skill for Claude Code, Cursor, Codex, and Gemini CLI, making it immediately usable inside the AI coding tools most developers are already running daily.

**Build with it:** Wire Graphify into your CI pipeline to auto-generate a living knowledge graph of your codebase, then expose it via its MCP interface so your AI coding assistant can answer precise dependency, call-graph, and impact-analysis questions without hallucinating file structure.
