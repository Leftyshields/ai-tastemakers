# AI Tastemakers — Daily Brief — 2026-10-10

_Ranking: delta_7d · 10 repos · generated 2026-10-10T17:51:03.420Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 66918 (+61605 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, ctf, decompiler, developer-tools, disassembler, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, reverse-engineering, static-analysis

**What it does:** REA is a TypeScript MCP server that connects AI agents (Claude, Codex) to local reverse-engineering tools — Hopper, Ghidra, IDA, and static JS analysis — so an agent can inspect a closed binary or Electron app and explain how a specific feature works, with evidence.

**Why now:** The repo gained over 61,000 stars this week, signaling a sharp spike in community attention that makes this a high-signal moment to evaluate it before the ecosystem of agent workflows around it solidifies.

**Build with it:** Run `npx rea-agents setup`, point it at an Electron app you want to understand, and wire the resulting MCP server into Claude Code to let the agent decompile and narrate a target feature directly inside your coding session.

## 2. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 142417 (+2647 this week) · ai-tools, claude-code, codex, desktop-app, grok, grokbuild, hermes, hermes-agent, mcp, open-source, openclaw, openclaw-ui, opencode, pi, provider-management, rust, skills, skills-management, tauri, wsl-support

**What it does:** CC Switch is a cross-platform Tauri desktop app that lets you swap API providers (Claude, Codex, Gemini, Grok, and others) and manage MCP servers, Skills, and Prompts through a GUI instead of hand-editing JSON/TOML/YAML config files.

**Why now:** The repo gained 2,647 stars this week, placing it on Trendshift's trending list, coinciding with Kimi K3's launch as a newly supported provider — giving builders a timely reason to test model-switching workflows.

**Build with it:** Point CC Switch at your existing Claude Code config and use its MCP management panel to add or swap an MCP server without touching the underlying JSON directly.

## 3. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 74912 (+2328 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted MIT-licensed AI gateway that exposes a single OpenAI-compatible endpoint across 359 providers and 1,200+ models, with quota-aware auto-fallback and RTK+Caveman token compression (15–95% reduction) to keep tools like Claude Code, Cursor, and Cline running against free tiers.

**Why now:** The repo gained 2,328 stars this week, signaling a surge of builder interest likely tied to rising API costs as Claude and GPT-4o pricing pressure mounts.

**Build with it:** Point your existing `OPENAI_BASE_URL` in Cursor or Claude Code at your OmniRoute instance and configure the free-tier fallback chain via `/dashboard/free-tiers` to drain ~1.62B pooled monthly tokens before spending a dollar.

## 4. lexmount/moli

https://github.com/lexmount/moli · ★ 15530 (+9750 this week) · ai-agents, ai-tools, browser, browser-automation, cloud-browser, kitesurf, playwright, puppeteer, rust, servo, web-crawler, web-crawling, web-scraper, web-scraping

**What it does:** Moli is a headless browser built in Rust for AI agents, supporting page fetch, web search, and browser automation via CLI, CDP, WebDriver Classic, or WebDriver BiDi with on-demand layout and rendering.

**Why now:** The repo gained 9,750 stars this week, signaling a sharp spike in adoption that makes it worth evaluating before the ecosystem consolidates around a default agent browser.

**Build with it:** Point an existing AI agent at Moli's `moli-webfetch` skill, install the prebuilt binary via the one-liner installer, and swap it in place of Playwright for structured page extraction using `--dump semantic_tree_text`.

## 5. rehan-remade/universal-modder <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/rehan-remade/universal-modder · ★ 6293 (+1202 this week) · age-of-empires, claude-code, claude-code-plugin, fal, game-assets, game-modding, mcp, modding, reverse-engineering, tmodloader

**What it does:** `universal-modder` gives AI coding agents (Claude Code, Cursor, Codex, Gemini CLI) a shared skill set for modding PC games end-to-end — recon, reverse engineering, asset generation via fal, in-game testing, and video capture.

**Why now:** The repo gained 1,200 stars this week, coinciding with a wave of Claude Code plugin ecosystem activity that has builders actively hunting installable skill packs.

**Build with it:** Install via `/plugin marketplace add rehan-remade/universal-modder` in Claude Code, then point it at a game you own and let the agent discover the engine and mod route using the bundled skills.

## 6. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 160283 (+7382 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent skill that steers AI coding agents (Claude Code, Cursor, and 19 others) toward YAGNI-style decisions — fewer lines, fewer abstractions, and mandatory tests for risky logic.

**Why now:** Version 5 shipped this week with a ground-up rebuild claiming -53% code, -41% time, and -45% token reduction over v4, benchmarked across 39 real tasks on a FastAPI + React repo.

**Build with it:** Drop the skill into an existing Claude Code project via npm (`@dietrichgebert/ponytail`) and run your next feature task to compare output verbosity and test coverage against your current baseline.

## 7. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 95406 (+5830 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) authenticated, cleaned access to Twitter, Reddit, YouTube, Bilibili, Xiaohongshu, GitHub, and web pages via a single MCP integration — no API fees required.

**Why now:** The repo hit GitHub Trending #1 this week with 5,830 new stars, surfacing at a moment when MCP tooling is rapidly becoming the default connectivity layer for agentic workflows.

**Build with it:** Point your MCP-compatible client (e.g., Claude Code or Cursor) at Agent Reach's CLI install, then issue plain-language scraping commands against Twitter or Reddit to validate zero-fee social data retrieval inside an existing agent loop.

## 8. shengjidaguai-china/goutoujunshi

https://github.com/shengjidaguai-china/goutoujunshi · ★ 7574 (+841 this week) · ai-agent, chinese, codex, codex-skill, lgbtq, psychology, relationship-advice

**What it does:** Goutoujunshi is a Codex Skill that ingests chat screenshots, exported logs (via optional ChatLab integration), and user-narrated context to produce emotion-grounded relationship analysis and specific next-step messages, invitations, or conflict responses — backed by a 135-source knowledge base spanning psychology, law, and communication strategy.

**Why now:** The repo gained 841 stars this week, signaling rapid discovery among Chinese-language AI tooling communities where relationship-context AI agents are an active build category.

**Build with it:** Install the skill into a Codex-compatible assistant with the one-line prompt in the README, then pipe in a exported WeChat/messaging text file via ChatLab to get scoped, session-bounded conversation analysis without writing any custom parsing code.

## 9. BerriAI/litellm <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/BerriAI/litellm · ★ 60887 (+805 this week) · ai-gateway, anthropic, azure-openai, bedrock, gateway, langchain, litellm, llm, llm-gateway, llmops, mcp-gateway, openai, openai-proxy, rust, rust-ai, vertex-ai

**What it does:** LiteLLM is a self-hosted AI gateway with a Rust core that routes calls to 100+ LLM providers (OpenAI, Anthropic, Bedrock, Vertex AI, and more) through a single OpenAI-compatible API, with built-in cost tracking, load balancing, and guardrails.

**Why now:** The repo gained 805 stars this week and recently added a Rust core, signaling a meaningful performance shift that makes the self-hosted proxy path more competitive against managed gateway services.

**Build with it:** Drop `litellm --model anthropic/claude-opus-4-5` in front of any existing OpenAI SDK call to instantly switch providers without touching application code.

## 10. every-app/open-seo

https://github.com/every-app/open-seo · ★ 22961 (+714 this week) · backlink-analysis, google-search-console-mcp, keyword-research, mcp, seo, seo-agent, seo-audit, seo-automation, seo-skills, seo-tools, site-audit

**What it does:** OpenSEO is a self-hostable SEO toolkit covering keyword research, rank tracking, backlinks, and site audits, backed by your own DataForSEO API key instead of a fixed subscription.

**Why now:** The repo crossed 22,000 stars with 714 added this week, signaling a rapid community spike around its MCP server launch that lets AI agents like Claude Code consume SEO data directly.

**Build with it:** Point Claude Code at the OpenSEO MCP server and use a pre-built Agent Skill to run automated keyword research inside your existing AI coding workflow.
