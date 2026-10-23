# AI Tastemakers — Daily Brief — 2026-10-23

_Ranking: delta_7d · 10 repos · generated 2026-10-23T17:52:09.849Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 371928 (+84765 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is an MCP server (a local tool-access layer for AI agents) that lets agents inspect closed-source binaries, JavaScript/Electron apps, .NET assemblies, and websites using decompilers like Ghidra and Hopper—no source code needed.

**Why now:** The repo pulled 84,765 stars this week, an unusually sharp spike that puts this squarely in live-community territory with an active Discord and a skills.sh skill catalog already forming around it.

**Build with it:** Run `npx rea-agents setup` to register the MCP server with your agent (Claude Code, Codex, etc.), then point it at a closed-source app to extract and replicate a specific feature into your own codebase.

## 2. yihui-dev/awesome-opus5-5-videos

https://github.com/yihui-dev/awesome-opus5-5-videos · ★ 9738 (+4296 this week) · ai-video, awesome, awesome-list, claude, claude-opus, creative-coding, motion-graphics, prompts, threejs

**What it does:** A curated collection of 703 prompts behind viral Claude Opus 5.5 animation videos—covering HTML Canvas, SVG, and Three.js—each linked to the creator's original post and a live side-by-side remake on Skillry.

**Why now:** The repo gained 4,296 stars this week and added 285 prompts on 2026-10-12, making it the densest current snapshot of what Opus 5.5 produces as runnable animation code.

**Build with it:** Copy a prompt from the `prompts/` directory directly into your Claude Opus 5.5 session to get a working animation file with no scaffolding to write yourself.

## 3. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 38934 (+19777 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency plugin for dsh (a shell environment) that routes requests to frontier LLMs—DeepSeek V4.1 Flash, Kimi K3, and others—through OpenCode's Zen and Kilo AI gateways, with no login, API key, or build step required.

**Why now:** The repo hit #1 on Trendshift's JavaScript weekly chart for 2026-10-05 to 2026-10-11 and added nearly 20k stars this week, suggesting developers are actively burning through free quota before it tightens.

**Build with it:** Point any OpenAI-compatible tool at the plugin's local forwarding port using its emitted base URL and key to route requests through the free model pool without touching your own API quotas.

## 4. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 109875 (+2573 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** Agent Skills packages 25 engineering workflows—spec, plan, build, test, review, ship—as slash commands that AI coding agents (Claude Code, Cursor, Codex, Copilot) follow consistently across the development lifecycle.

**Why now:** The repo crossed 109K stars with 2,573 added in seven days, as teams actively look for ways to standardize how agents handle multi-step coding tasks rather than re-prompting from scratch each time.

**Build with it:** Run `npx skills add addyosmani/agent-skills` to install all 25 skills into your Claude Code setup, then use `/build auto` to let the agent generate a plan and implement every task in a single approved pass.

## 5. xerj-org/xerj <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/xerj-org/xerj · ★ 14130 (+1817 this week) · agent-memory, ai-agents, bm25, claude-code, cli, code-search, cursor, elasticsearch, elasticsearch-alternative, full-text-search, hybrid-search, jsonl, local-first, mcp, mcp-server, model-context-protocol, rag, rust, search-engine, vector-search

**What it does:** XERJ is a single Rust binary that indexes code, docs, JSONL/CSV, and PDFs for BM25, vector, and hybrid search, exposing an Elasticsearch-compatible API and a native MCP server so AI agents retrieve exact context instead of crawling files token-by-token.

**Why now:** The repo gained 1,817 stars this week on the back of a controlled study showing a 2.7× token reduction at the same solve rate—a concrete number that lands hard as agent token costs become a primary optimization target.

**Build with it:** Add XERJ as an MCP server in your Claude Code or Cursor config, then issue hybrid search queries against the `/` endpoint to replace file-crawling context retrieval in your agent loop.

## 6. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 174631 (+9584 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent skill that nudges AI coding agents (Claude Code, Cursor, and 19 others) toward YAGNI-style decisions—fewer lines, fewer tokens, higher test coverage on risky logic—by embedding senior-dev judgment into the agent's prompt layer.

**Why now:** Ponytail 5 shipped with a ground-up rewrite benchmarked against a real FastAPI + React repo, showing -53% code, -41% time, and 98% risky-logic test coverage versus 68% without it, driving nearly 10K new stars this week.

**Build with it:** Drop the `@dietrichgebert/ponytail` npm package into an existing Claude Code workflow as a plugin skill and benchmark token spend on a real task against a baseline run without it.

## 7. TencentCloud/Octop

https://github.com/TencentCloud/Octop · ★ 10828 (+1151 this week) · agent, agentic-ai, ai, ai-agent, ai-agents, local-first, long-term-memory

**What it does:** Octop is a self-hosted, multi-user AI assistant that runs multiple specialized agents in parallel, accessible via web dashboard, CLI, and IM platforms including Telegram, Discord, and WeChat.

**Why now:** The repo gained 1,151 stars this week alongside its v1.0.2 release and a Trendshift appearance, suggesting it's at the point where early self-hosters are kicking the tires.

**Build with it:** Wire Octop's MCP gateway to an existing tool and expose it to a team by configuring a Connector—the OAuth + MCP surface handles auth and resource access without custom middleware.

## 8. ethanplusai/harvey <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ethanplusai/harvey · ★ 2263 (+1087 this week) · ai-agent, autonomous-agent, claude, cold-email, prospecting, python, sales-automation

**What it does:** Harvey is a Python autonomous sales agent that finds prospects, researches them, writes personalized cold emails, sends campaigns, and routes replies toward booked meetings—billing against your existing Claude Code or ChatGPT subscription rather than per-token API costs.

**Why now:** The repo gained 1,087 stars this week, tracking closely with broader builder interest in Claude Code as an agent runtime following Anthropic's recent CLI updates.

**Build with it:** Point Harvey at a niche (e.g., HVAC shops hiring dispatchers) by confirming a signal in the dashboard at `localhost:5555`, then approve the drafted email sequence from the outbox to validate the full prospect-to-send loop against your own Claude Pro plan.

## 9. f/prompts.chat

https://github.com/f/prompts.chat · ★ 174197 (+1021 this week) · ai, artificial-intelligence, awesome-list, chatgpt, chatgpt-prompts, claude, gemini, gpt, gpt-4, llm, machine-learning, nextjs, open-source, openai, prompt-engineering, prompts, prompts-chat, typescript

**What it does:** An open-source library of community-curated prompts for ChatGPT, Claude, Gemini, and other LLMs, browsable at prompts.chat and downloadable as a CSV or Hugging Face dataset.

**Why now:** The repo gained 1,021 stars this week and recently rebranded from "Awesome ChatGPT Prompts" to prompts.chat, signaling a deliberate push toward a multi-model platform rather than a static, single-vendor list.

**Build with it:** Pull `prompts.csv` into your app to seed a prompt-picker UI, or self-host the Next.js instance internally so your team gets a private, searchable prompt library without sending data to a third party.

## 10. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 133766 (+6585 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphify, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses a codebase—plus its docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using deterministic AST parsing via tree-sitter, with every edge explained and no vector store required.

**Why now:** The repo gained 6,585 stars this week and ships as a native `/graphify` skill for Claude Code, Cursor, Codex, and Gemini CLI, hitting all four platforms at a moment of active developer adoption.

**Build with it:** Install the `graphifyy` PyPI package and register the `/graphify` skill in your Cursor config to get graph-backed code-search answers inside your existing editor workflow.
