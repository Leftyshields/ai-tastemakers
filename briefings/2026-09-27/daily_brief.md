# AI Tastemakers — Daily Brief — 2026-09-27

_Ranking: delta_7d · 10 repos · generated 2026-09-27T17:44:03.484Z_


## 1. rocketride-org/rocketride-server

https://github.com/rocketride-org/rocketride-server · ★ 15646 (+7173 this week) · ai, cpp, data-pipeline, data-processing, machine-learning, mcp, python, sdk, typescript, vscode-extension

**What it does:** RocketRide is an open-source AI pipeline builder with a multithreaded C++ runtime that executes portable JSON-defined pipelines across 100+ nodes covering 15+ LLM providers, 9 vector databases, OCR, NER, and agent orchestration — all composed visually inside VS Code or via CLI.

**Why now:** The repo gained over 7,000 stars this week, signaling a sharp spike in builder attention that makes this a practical moment to evaluate it before the ecosystem consolidates around competing pipeline tools.

**Build with it:** Install the VS Code extension, wire a multimodal retrieval pipeline using the built-in vector database nodes and an LLM provider of your choice, and run it locally against your own infrastructure using the Docker deployment path the README documents.

## 2. corsairdev/corsair <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/corsairdev/corsair · ★ 12513 (+1023 this week) · agentic-ai, agents, ai, ai-agents, aiagents, api-integration, corsair, developer-tools, function-calling, integrations, javascript, llm, managed-oauth, mcp, oauth, oauth2, typescript, unified-api

**What it does:** Corsair is an open-source product integration platform that gives every third-party API a unified REST syntax, handling OAuth refresh and webhooks so backends, agents, and multi-tenant dashboards share the same integration layer.

**Why now:** The repo gained over 1,000 stars this week and is trending on Trendshift, signaling a surge in developer attention likely tied to growing demand for non-MCP-native integration layers for AI agents.

**Build with it:** Wire up a multi-tenant dashboard by self-hosting Corsair and using its unified API syntax to let users connect their own OAuth apps without writing per-service token management code.

## 3. mobile-next/mobile-mcp <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/mobile-next/mobile-mcp · ★ 7779 (+1006 this week) · agent, android, emulator, ios, mcp, mobile, physical, real, simulator

**What it does:** An MCP server that exposes a single tool API for automating iOS and Android apps across simulators, emulators, and real devices by reading the native accessibility tree rather than relying on vision models or screenshots.

**Why now:** The repo gained 1,006 stars this week, coinciding with growing adoption of MCP-compatible agents (Claude Code, Codex, GitHub Copilot) that can now drive mobile UIs without per-platform expertise.

**Build with it:** Point any MCP-compatible client at `npx -y @mobilenext/mobile-mcp@latest` and script a multi-step mobile user journey — login, form fill, navigation — purely through accessibility-tree tool calls.

## 4. datawhalechina/hello-agents

https://github.com/datawhalechina/hello-agents · ★ 80989 (+912 this week) · agent, llm, rag, tutorial

**What it does:** Hello-Agents is a Chinese-language, code-first tutorial series that walks builders from LLM basics through implementing ReAct/Plan-and-Solve/Reflection patterns, mainstream frameworks (AutoGen, LangGraph, AgentScope), and a from-scratch agent framework built on the OpenAI native API.

**Why now:** The repo gained 912 stars this week, reflecting the broader 2025 shift in developer attention from base-model fine-tuning toward agentic application construction.

**Build with it:** Follow Chapter 7 to scaffold a minimal agent loop using the companion [HelloAgents](https://github.com/jjyaoao/helloagents) library, which wraps the OpenAI API directly — no LangChain or other abstraction layer required.

## 5. apify/apify-mcp-server <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/apify/apify-mcp-server · ★ 8713 (+885 this week) · agents, ai, mcp, mcp-server

**What it does:** Apify MCP Server exposes thousands of Apify Store scrapers and automation tools—covering social media, search engines, maps, and e-commerce—to AI agents via the Model Context Protocol at mcp.apify.com.

**Why now:** The repo gained 885 stars this week alongside the removal of the legacy SSE endpoint in favor of Streamable HTTP, making this a forcing function for teams to migrate or integrate fresh.

**Build with it:** Point a Claude.ai or VS Code MCP client at `https://mcp.apify.com` with your Apify API token via OAuth to give your agent live web-scraping capabilities in one config change.

## 6. lidge-jun/opencodex

https://github.com/lidge-jun/opencodex · ★ 16443 (+843 this week) · ai-gateway, ai-tools, anthropic, chatgpt, claude, claude-code, codex, codex-cli, deepseek, developer-tools, gemini, grok, kiro, llm, llm-proxy, ollama, openai, openrouter, proxy, typescript

**What it does:** opencodex is a local proxy that intercepts API calls from OpenAI Codex, Claude Code, Claude Desktop, and Grok Build, routing them to any compatible LLM backend (Gemini, DeepSeek, Ollama, OpenRouter, etc.) via two commands: `npm install -g @bitkyc08/opencodex` and `ocx start`.

**Why now:** The repo gained 843 stars this week, tracking closely with active developer interest in breaking Codex and Claude Code out of their locked provider relationships as those tools mature.

**Build with it:** Point Claude Code at a local Ollama model by running `ocx start` and swapping the API base URL — no code changes required — to validate cost or latency tradeoffs against the hosted default.

## 7. irinabuht12-oss/marketing-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/irinabuht12-oss/marketing-skills · ★ 2450 (+836 this week) · ai-visibility, claude-code, claude-desktop, claude-marketing-skills, claude-plugin, claude-skills, claude-skills-for-marketing, cursor, geo, google-ads, google-ads-mcp, marketing, marketing-skills, mcp, mcp-server, meta-ads, meta-ads-mcp, seo

**What it does:** A collection of 49 Markdown-based Claude skills covering Google Ads audits, Meta creative fatigue detection, SEO, and AI visibility, paired with the Ryze MCP connector that pipes live Google Ads, Meta Ads, GA4, and Search Console data directly into Claude.

**Why now:** The repo gained 836 stars this week, coinciding with growing Claude Code plugin ecosystem adoption and the `claude mcp add` command becoming a standard install path for live-data connectors.

**Build with it:** Run `claude mcp add ryze --transport http https://connector.get-ryze.ai/mcp` to connect your ad accounts, then drop the cloned skills into `~/.claude/skills/` and prompt "audit my Google Ads for wasted spend" against real campaign data.

## 8. helloianneo/ian-xiaohei-illustrations

https://github.com/helloianneo/ian-xiaohei-illustrations · ★ 12144 (+5395 this week) · ai-agent, chinese, codex-skill, handdrawn, illustration, image-generation, xiaohei

**What it does:** Ian Xiaohei Illustrations is a Codex Skill that analyzes Chinese articles and generates 16:9 hand-drawn inline illustrations featuring "Xiaohei" — a minimal black figure — as an active participant in the depicted concept, workflow, or metaphor.

**Why now:** The repo gained 5,395 stars this week, signaling rapid pickup among Chinese-language content creators looking for a repeatable visual style beyond generic PPT infographics.

**Build with it:** Drop the `ian-xiaohei-illustrations/` skill directory into `~/.codex/skills/`, then invoke `Use $ian-xiaohei-illustrations` with a pasted Chinese article to get a shot list and PNG outputs saved to `assets/<article-slug>-illustrations/`.

## 9. t8y2/dbx <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/t8y2/dbx · ★ 21000 (+801 this week) · ai, cli, clickhouse, database, database-client, database-management, docker, gui, mcp, mongodb, mysql, postgresql, redis, rust, sql-server, sqlite, tauri, vue

**What it does:** DBX is a 25 MB cross-platform database client built in Rust/Tauri that connects to 100+ databases (MySQL, PostgreSQL, Redis, MongoDB, DuckDB, and more) with a built-in AI assistant, MCP Server, CLI, and Docker deployment option.

**Why now:** The repo gained 800+ stars this week, signaling a surge of builder interest likely tied to its MCP Server support landing as MCP tooling becomes a standard integration layer for AI agents.

**Build with it:** Point DBX's MCP Server at your existing PostgreSQL or SQLite instance and wire it into a Claude or compatible AI agent to get natural-language database queries without standing up a separate middleware service.

## 10. Imbad0202/academic-research-skills

https://github.com/Imbad0202/academic-research-skills · ★ 49634 (+780 this week) · academic-pipeline, academic-writing, ai-research, claude, claude-code, literature-review, peer-review, prompt-engineering

**What it does:** Academic Research Skills is a Claude Code plugin suite that covers the full research-to-publication pipeline — literature review, drafting, citation verification, and integrity gating — with human confirmation checkpoints at every stage.

**Why now:** The repo gained 780 stars this week, coinciding with growing attention to citation hallucination after Zhao et al.'s May 2026 audit finding ~147K hallucinated references in a single year of preprints.

**Build with it:** Install via `/plugin marketplace add Imbad0202/academic-research-skills` in Claude Code v3.7.0+ and run `/ars-plan` to walk a paper structure through Socratic dialogue with blocking integrity checks at stages 2.5 and 4.5.
