# AI Tastemakers — Daily Brief — 2026-10-27

_Ranking: delta_7d · 10 repos · generated 2026-10-27T18:41:18.886Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 396382 (+50422 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a Model Context Protocol (MCP) server that gives AI agents local tools for reverse-engineering native binaries, JavaScript and Electron apps, .NET assemblies, and websites, all without source code, installed via `npx rea-agents setup`.

**Why now:** The repo crossed 50,000 stars this week, a spike sharp enough to suggest the MCP tooling space is moving fast toward consolidation.

**Build with it:** Wire REA into Claude Code or any MCP-compatible agent, point it at a closed-source app, and extract enough structure to replicate a specific feature in your own codebase.

## 2. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 46660 (+15943 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency plugin for dsh (a shell-style AI coding tool) that routes requests to frontier models including DeepSeek V4.1 Flash and Kimi K3 through public gateways (OpenCode Zen and Kilo AI), with no login, API key, or usage cap required.

**Why now:** The repo gained nearly 16,000 stars this week and topped both Trendshift's daily and JavaScript weekly charts, reflecting real builder demand for cap-free model access.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL and key config to get free model access without touching upstream credentials.

## 3. alchaincyf/huashu-design <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/alchaincyf/huashu-design · ★ 27698 (+1813 this week) · agent-skills, ai-design, claude-code, claude-skills, codex, cursor, design, html, pptx, prototype

**What it does:** Huashu Design is an agent skill that takes a single text prompt and produces production-ready HTML designs, clickable app prototypes, editable PPTX files, and animations, backed by an 84-style reference library and a per-project appearance ledger that tracks your visual choices across deliverables.

**Why now:** Version 3.0 shipped this week with a six-thumbnail direction-selection flow, the expanded 84-style library with sample images, and a switch to MIT licensing that removes the previous commercial-use restriction.

**Build with it:** Run `npx skills add alchaincyf/huashu-design` inside Claude Code, drop in your logo and color palette as brand assets, then prompt for a product launch animation or app prototype to test the style-matching pipeline against your own brand.

## 4. rddmwmddr/android-ad-cleaner <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/rddmwmddr/android-ad-cleaner · ★ 3136 (+1321 this week) · adb, ai-agent, android, coloros, debloat, hyperos, magicos, originos

**What it does:** Android Ad Cleaner uses ADB commands to disable ads, hot-search feeds, marketing push notifications, and ad components on Chinese Android phones (MIUI, ColorOS, MagicOS) without root access, unlocking, or system partition changes.

**Why now:** The project gained 1,321 stars this week alongside the v0.2.5 release, which added privacy-scrubbing error log reporting and fixed Honor, vivo, and Windows-specific bugs in the desktop client.

**Build with it:** Clone the repo, drop your device's per-app switch sequence into a new machine script under `docs/清单/`, then test it end-to-end by passing the AGENTS.md prompt to an AI agent connected to your phone over ADB.

## 5. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 177976 (+8742 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript skill for AI coding agents (Claude Code, Cursor, and others) that steers code generation toward YAGNI principles, producing shorter outputs, fewer tokens, and higher test coverage on risky logic.

**Why now:** The project gained over 8,700 stars this week, and the v5 release, benchmarked against a real FastAPI and React repo across 39 tasks, shows measurable cost and token reductions compared to running the same agent without the skill.

**Build with it:** Add the npm package `@dietrichgebert/ponytail` to an existing Claude Code project and run a task you already have to compare output length and test generation against your baseline.

## 6. apify/apify-mcp-server

https://github.com/apify/apify-mcp-server · ★ 13460 (+1232 this week) · agents, ai, mcp, mcp-server

**What it does:** Apify MCP Server (MCP is a standard for connecting AI agents to external tools) exposes thousands of Apify Store scrapers and crawlers as agent-callable tools, pulling structured data from social media, search engines, maps, and e-commerce sites via a hosted endpoint at mcp.apify.com.

**Why now:** The repo gained 1,232 stars this week as the legacy SSE transport was dropped in favor of Streamable HTTP, making this a practical migration moment for any client still pointed at the `/sse` endpoint.

**Build with it:** Point Claude.ai or VS Code's MCP config at `https://mcp.apify.com` with your Apify API token to give your agent authenticated access to ready-made web scrapers without running any local server.

## 7. vxcontrol/pentagi

https://github.com/vxcontrol/pentagi · ★ 32574 (+1069 this week) · ai-agents, ai-security-tool, anthropic, autonomous-agents, golang, gpt, graphql, multi-agent-system, offensive-security, open-source, openai, penetration-testing, penetration-testing-tools, react, security-automation, security-testing, security-tools, self-hosted

**What it does:** PentAGI is a self-hosted, fully autonomous multi-agent system written in Go that runs penetration testing tasks end-to-end, with agents that execute tools inside Docker, query a knowledge graph, and surface findings through a GraphQL API.

**Why now:** The repo gained over 1,000 stars this week, signaling enough builder momentum to make integration experiments timely before the autonomous pen-testing tooling space narrows.

**Build with it:** Configure your LLM provider (Ollama, Anthropic, DeepSeek, or any of the dozen supported backends) in the `.env` file, spin up with Docker Compose, and run PentAGI against a CTF or internal test target to check autonomous recon coverage.

## 8. datawhalechina/hello-agents

https://github.com/datawhalechina/hello-agents · ★ 84965 (+1043 this week) · agent, llm, rag, tutorial

**What it does:** Hello-Agents is a Chinese-language open-source tutorial that teaches builders to construct AI agents from scratch, covering core reasoning patterns like ReAct and Plan-and-Solve, popular frameworks like AutoGen and LangGraph, and a custom agent framework built on the OpenAI API.

**Why now:** The repo gained over 1,000 stars this week, reflecting growing demand as the industry's focus shifts toward agent-layer development in 2025 rather than base-model scaling.

**Build with it:** Follow Chapter 7 to implement the HelloAgents custom framework using the OpenAI native API directly, giving you a minimal, inspectable agent loop you control entirely before layering in any third-party framework.

## 9. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 136831 (+6912 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphify, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses codebases, docs, SQL schemas, configs, and PDFs into a queryable knowledge graph using local deterministic AST parsing via tree-sitter, with every graph edge explained and no vector store required.

**Why now:** The repo gained nearly 7,000 stars this week, aligning with active MCP and GraphRAG adoption across Claude Code, Cursor, Codex, and Gemini CLI workflows where structured code context is a practical bottleneck.

**Build with it:** Install the `graphifyy` PyPI package and register it as a `/graphify` skill in Claude Code to get structured, edge-explained graph queries over your codebase instead of embedding-based retrieval.

## 10. Imbad0202/academic-research-skills

https://github.com/Imbad0202/academic-research-skills · ★ 54165 (+1005 this week) · academic-pipeline, academic-writing, ai-research, claude, claude-code, literature-review, peer-review, prompt-engineering

**What it does:** Academic Research Skills is a Claude Code plugin that guides researchers through a full paper pipeline from literature review to final submission, with human-confirmation gates at each stage to block hallucinated citations and fabricated methodology.

**Why now:** The repo gained 1,005 stars this week alongside the v3.24.0 release and a citable Zenodo DOI, signaling active adoption by researchers who need auditable AI writing workflows.

**Build with it:** Run `/plugin marketplace add Imbad0202/academic-research-skills` in Claude Code and use `/ars-plan` to test the Socratic paper-planning dialogue against your own draft outline.
