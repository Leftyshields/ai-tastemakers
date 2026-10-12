# AI Tastemakers — Daily Brief — 2026-10-12

_Ranking: delta_7d · 10 repos · generated 2026-10-12T21:43:39.454Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 152354 (+147041 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, ctf, decompiler, developer-tools, disassembler, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, reverse-engineering, static-analysis

**What it does:** REA is an MCP server (a standardized bridge between AI agents and external tools) that lets agents like Claude Code, Cursor, and Codex reverse-engineer closed-source software — native binaries, Electron apps, .NET assemblies, websites — by delegating decompilation to Hopper, Ghidra, or IDA.

**Why now:** The repo picked up 147,000 stars in a single week, an unusually sharp spike that has seeded active Discord channels with Q&A and real-world showcases worth mining for integration patterns.

**Build with it:** Run `npx rea-agents setup`, point it at an existing Hopper or Ghidra install, and wire it into Claude Code to let your agent trace any closed-source behavior down to disassembled binary evidence.

## 2. vxcontrol/pentagi

https://github.com/vxcontrol/pentagi · ★ 26758 (+1495 this week) · ai-agents, ai-security-tool, anthropic, autonomous-agents, golang, gpt, graphql, multi-agent-system, offensive-security, open-source, openai, penetration-testing, penetration-testing-tools, react, security-automation, security-testing, security-tools, self-hosted

**What it does:** PentAGI is a self-hosted Go system that autonomously plans and executes penetration testing tasks end-to-end, running LLM backends (OpenAI, Anthropic, Gemini, Ollama, and others) with tool access inside isolated Docker containers.

**Why now:** The repo added roughly 1,500 stars this week, marking an early-adopter window where tooling gaps and integration patterns are still being defined by the first people through the door.

**Build with it:** Point it at a local Ollama model via the Ollama provider config, spin up the Docker Compose stack, and connect it to an internal lab network to run automated recon without sending target data to external APIs.

## 3. yetone/magpie <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/yetone/magpie · ★ 10334 (+1227 this week) · claude-code, codex, deepseek, gemini-cli, llm, macos

**What it does:** Magpie is a local menu-bar gateway that routes any AI coding agent — Claude Code, Codex, Gemini CLI, OpenCode — to any model or provider, including paid subscriptions like ChatGPT or Copilot, and automatically fails over to the next account when a quota runs out.

**Why now:** The repo gained 1,227 stars this week alongside releases from DeepSeek V4 Pro, Kimi K3, and GLM-5.3, all models builders want to swap into existing agent workflows without reconfiguring each tool individually.

**Build with it:** Run `magpie provider add deepseek sk-…` then `magpie claude deepseek/deepseek-v4-pro` to redirect Claude Code at a cheaper DeepSeek backend with no manual config-file editing.

## 4. lexmount/moli

https://github.com/lexmount/moli · ★ 17182 (+8105 this week) · ai-agents, ai-tools, browser, browser-automation, cloud-browser, kitesurf, playwright, puppeteer, rust, servo, web-crawler, web-crawling, web-scraper, web-scraping

**What it does:** Moli is a Rust-based headless browser built specifically for AI agents, offering on-demand layout and rendering with CLI, CDP, WebDriver Classic, and WebDriver BiDi interfaces — covering the control surfaces most agent frameworks already expect.

**Why now:** The repo gained 8,105 stars this week, a spike fast enough that the ecosystem hasn't yet consolidated around it, leaving room to shape early tooling and integrations.

**Build with it:** Point an AI agent at the `skills/` directory to auto-install the binary, then call `moli fetch --dump semantic_tree_text` to pull structured, model-ready page content directly into your agent's tool loop.

## 5. t8y2/dbx

https://github.com/t8y2/dbx · ★ 25979 (+1201 this week) · ai, cli, clickhouse, database, database-client, database-management, docker, gui, mcp, mongodb, mysql, postgresql, redis, rust, sql-server, sqlite, tauri, vue

**What it does:** DBX is a 25 MB cross-platform database client — desktop app, Docker image, and CLI — that connects to 100+ databases including MySQL, PostgreSQL, Redis, MongoDB, and DuckDB, with a built-in AI assistant and an MCP Server for agent access.

**Why now:** The repo gained 1,200+ stars this week, likely driven by its MCP Server feature as the Model Context Protocol becomes a de facto integration layer across AI tooling stacks.

**Build with it:** Point DBX's MCP Server at an existing SQLite or PostgreSQL database and wire it into a Claude-compatible client to execute natural-language queries without writing any middleware.

## 6. apify/apify-mcp-server

https://github.com/apify/apify-mcp-server · ★ 10806 (+1066 this week) · agents, ai, mcp, mcp-server

**What it does:** Apify MCP Server (MCP being the Model Context Protocol, a standard for connecting AI agents to external tools) exposes thousands of Apify's web scrapers and crawlers to AI agents, letting them pull structured data from social media, maps, search engines, and e-commerce sites as first-class tool calls.

**Why now:** The repo gained 1,066 stars this week alongside a breaking change: the legacy SSE endpoint has been retired in favor of Streamable HTTP at `mcp.apify.com`, pushing active users to migrate and giving early adopters a chance to document the new stack.

**Build with it:** Point any MCP-compatible client — Claude.ai, Cursor, VS Code — at `https://mcp.apify.com` with your Apify API token via OAuth to call any Store Actor as a tool inside your agent loop immediately.

## 7. datawhalechina/hello-agents

https://github.com/datawhalechina/hello-agents · ★ 82758 (+1029 this week) · agent, llm, rag, tutorial

**What it does:** Hello-Agents is a Chinese-language, hands-on curriculum covering AI agent construction from scratch — ReAct, Plan-and-Solve, and Reflection reasoning patterns, mainstream frameworks like AutoGen and LangGraph, and a minimal custom framework called HelloAgents built directly on the OpenAI API.

**Why now:** The repo crossed 1,000 new stars this week, tracking a broader 2025 shift in LLM application work from base-model training toward agent system design.

**Build with it:** Chapter 7 walks through the HelloAgents framework against the raw OpenAI API with no wrapper abstractions, giving you an inspectable agent loop you can extend with the tutorial's context engineering and memory modules.

## 8. Imbad0202/academic-research-skills

https://github.com/Imbad0202/academic-research-skills · ★ 51560 (+1026 this week) · academic-pipeline, academic-writing, ai-research, claude, claude-code, literature-review, peer-review, prompt-engineering

**What it does:** Academic Research Skills is a Claude Code plugin that automates the research-to-publication pipeline — literature review, drafting, citation verification, and integrity gating — with a required human confirmation step at each stage to prevent silent errors.

**Why now:** The repo gained 1,026 stars this week as concern over AI-generated citation hallucinations has sharpened: a 2025 audit of 111 million references by Zhao et al. found nearly 147,000 hallucinated citations in the sample.

**Build with it:** Run `/plugin marketplace add Imbad0202/academic-research-skills` in Claude Code, then use `/ars-plan` to walk a paper structure through Socratic dialogue and observe where the Stage 2.5 integrity gate blocks on your own draft.

## 9. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 161826 (+5902 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent skill that steers AI coding agents (Claude Code, Cursor, and ~18 others) toward YAGNI-style decisions — generating less code, fewer tokens, and higher test coverage for risky logic compared to the same agent running without it.

**Why now:** The v5 release landed this week with a ground-up rewrite benchmarked on a real FastAPI + React repo across 39 tasks, cutting token usage 45% and shipping 98% of risky logic with tests versus 68% unassisted.

**Build with it:** Drop the `@dietrichgebert/ponytail` npm package into your Claude Code config as a skill and immediately measure whether your next feature task produces smaller diffs and higher test coverage than your baseline.

## 10. nidhinjs/prompt-master

https://github.com/nidhinjs/prompt-master · ★ 14380 (+854 this week) · claude-ai, claude-skills, llm, prompt-engineering

**What it does:** Prompt Master is a Claude skill that takes a rough user intent, extracts nine dimensions of context — task, output format, constraints, memory, and others — and returns a single token-efficient prompt block tuned to a specific target tool like Cursor, Midjourney, or Claude Code.

**Why now:** The repo gained 854 stars this week as Claude.ai's sidebar skill surface matures and builders search for reusable primitives that replace ad-hoc prompting with something auditable and repeatable.

**Build with it:** Download the ZIP, upload it to Claude.ai → Customize → Skills, then invoke `/prompt-master` before any Cursor or Claude Code session to replace improvised prompts with a structured, context-complete version on the first attempt.
