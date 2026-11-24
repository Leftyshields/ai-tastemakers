# AI Tastemakers — Daily Brief — 2026-11-24

_Ranking: delta_7d · 10 repos · generated 2026-11-24T23:50:16.894Z_


## 1. pingdotgg/t3code

https://github.com/pingdotgg/t3code · ★ 77396 (+13341 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code is an open-source control plane that runs Claude Code, Codex, Cursor, and other ACP-compatible coding agents on your machine and exposes them through a single interface across desktop, web, iOS, and Android.

**Why now:** The repo gained over 13,000 stars this week, a signal that multi-agent orchestration on personal hardware has moved from niche to mainstream builder concern.

**Build with it:** Install the `t3` CLI via the one-liner, sign into Claude Code or Codex, then use the ACP provider config to route tasks between agents mid-thread without leaving your existing subscriptions.

## 2. elementalsouls/Claude-BugHunter

https://github.com/elementalsouls/Claude-BugHunter · ★ 21423 (+12279 this week) · ai-security, anthropic, application-security, bug-bounty, bugbounty, bugcrowd, claude, claude-code, claude-skills, ethical-hacking, hackerone, offensive-security, pentesting, red-team, security-tools, web-security

**What it does:** Claude-BugHunter is a skill bundle for Claude Code that loads 84 skills and 15 slash commands, giving the agent bug-hunting workflows built from 681 disclosed HackerOne report patterns across 24 vulnerability classes, plus enterprise identity and infrastructure attack chains.

**Why now:** The repo gained over 12,000 stars this week, tracking closely with growing interest in Claude Code's plugin and skills system as a surface for security tooling.

**Build with it:** Install via `/plugin marketplace add elementalsouls/Claude-BugHunter` inside Claude Code, drop into an authorized engagement folder, and let the `hunt` scaffolder wire scope, evidence hygiene, and VRT-mapped reporting without any manual skill invocation.

## 3. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 156893 (+1689 this week) · ai-tools, claude-code, codex, deepseek-harness, desktop-app, grok, grokbuild, hermes, kimi-code, mcp, open-source, opencode, pi, provider-management, rust, skills, skills-management, tauri, wsl-support

**What it does:** CC Switch is a Tauri-based desktop app that lets you swap API providers (Anthropic, OpenAI, Gemini, Grok, DeepSeek, and others) across Claude Code, Codex, OpenCode, and several more CLI coding tools without hand-editing their JSON, TOML, or YAML config files.

**Why now:** The repo earned daily and weekly Rust trending badges on Trendshift this week, reflecting rapid growth as developers juggle an expanding set of competing CLI coding agents.

**Build with it:** Point CC Switch at your existing Claude Code config and use its MCP manager to add or swap MCP servers across all supported tools from one UI, instead of editing each tool's config file separately.

## 4. morluto/rea

https://github.com/morluto/rea · ★ 477078 (+10882 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is an MCP server that connects AI agents to tools for inspecting native binaries, JavaScript and Electron apps, .NET assemblies, and websites without source code, enabling agent-driven reverse engineering workflows.

**Why now:** The repo gained over 10,000 stars this week, a sharp signal that builders are actively wiring agents into closed-source analysis tasks.

**Build with it:** Run `npx rea-agents setup` to wire REA into an existing agent such as Claude Code and have it explain how a closed-source app feature works down to the binary level.

## 5. D4Vinci/Scrapling

https://github.com/D4Vinci/Scrapling · ★ 105537 (+1602 this week) · ai, ai-scraping, automation, crawler, crawling, crawling-python, data, data-extraction, mcp, mcp-server, playwright, python, scraping, selectors, stealth, web-scraper, web-scraping, web-scraping-python, webscraping, xpath

**What it does:** Scrapling is a Python web scraping framework covering single requests through full-scale crawls, with built-in stealth browsing via Playwright, adaptive element tracking across site changes, and an MCP server interface for agents.

**Why now:** The repo gained over 1,600 stars this week and crossed 105,000 total, with the spike tied closely to its MCP server support landing as agent-based scraping workflows gain traction.

**Build with it:** Point the MCP server at an existing AI agent and use Scrapling's XPath and CSS selector engine to extract structured data from bot-protected sites without writing custom stealth logic.

## 6. ZhuLinsen/daily_stock_analysis

https://github.com/ZhuLinsen/daily_stock_analysis · ★ 74318 (+1243 this week) · a-stock, ai-agent, aigc, llm, quant, quantitative-finance, quantitative-trading

**What it does:** An LLM-powered Python system that pulls multi-market stock data (A-share, HK, US, JP, KR, TW) and delivers daily AI decision dashboards with scores, buy/sell levels, and risk alerts via WeChat Work, Feishu, Telegram, Discord, Slack, or email.

**Why now:** The repo gained over 1,200 stars this week, driven by builder interest in automated stock analysis pipelines that require no custom infrastructure.

**Build with it:** Fork the repo, configure your watchlist and an OpenAI-compatible API key, and wire a GitHub Actions scheduled workflow to push daily decision reports to a Slack channel with zero hosting cost.

## 7. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 86005 (+7499 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency, no-build plugin for dsh (a shell-based AI coding tool) that routes requests to free public gateways, OpenCode Zen and Kilo AI, so you can call models like DeepSeek V4.1 Flash and Kimi K3 without an account or API key.

**Why now:** The repo hit number one on both Trendshift's daily and JavaScript weekly charts for the week of 2026-10-05, reflecting a clear demand for no-credential LLM access.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL and key config to route requests through the free model pool without touching your own credentials.

## 8. alchaincyf/huashu-design

https://github.com/alchaincyf/huashu-design · ★ 30828 (+1095 this week) · agent-skills, ai-design, animation, claude-code, claude-code-skills, claude-skills, codex, cursor, deepseek-harness, design, dsh-plugin, html, huashu-skills, infographic, pptx, presentation, prototype, skills, slides, ui-design

**What it does:** Huashu Design is an agent skill that takes a single text prompt and outputs production-ready HTML-native designs covering app prototypes, animated launches, editable PPTX, infographics, and App Store screenshots, backed by a 92-style library with reference images.

**Why now:** The repo gained over 1,000 stars this week alongside the v3.5 release, which adds a WeChat Mini Program module that exports a full delivery package including 750px per-screen screenshots, an app.json skeleton, and design specs ready for native Mini Program handoff.

**Build with it:** Run `npx skills add alchaincyf/huashu-design` inside Claude Code or Cursor, then prompt it with your brand assets (logo, color palette, UI screenshots) to generate three distinct design directions you can ship directly.

## 9. a2ui-project/a2ui <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/a2ui-project/a2ui · ★ 18537 (+977 this week) · a2a, a2ui, agent, angular, flutter, generative-ui, jetpack-compose, lit, llm, mcp, react, swiftui

**What it does:** A2UI is an open-source generative UI framework where agents stream validated layout data over a protocol and native renderers in React, Angular, Flutter, SwiftUI, and Jetpack Compose turn it into real components instead of HTML or WebViews.

**Why now:** The repo gained nearly 1,000 stars this week, tracking with broader momentum around agent-driven interfaces following recent A2A protocol activity in the ecosystem.

**Build with it:** Drop the React renderer into an existing chat UI, connect it to your LLM agent using one of the provided agent SDKs, and use the hosted A2UI Composer to prototype the component schema before writing any app code.

## 10. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 208913 (+6287 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl turns any website into clean markdown via a single API and MCP server, with options to run locally as a Rust binary, self-host, or use the cloud service with access to 550 or more data providers through Firecrawl Alexandria.

**Why now:** The repo gained over 6,000 stars this week, driven largely by the new `firecrawl-local` binary that adds zero-dependency local scraping and one-command MCP integration with Claude Code, Cursor, Windsurf, and Codex.

**Build with it:** Run `firecrawl-local init` to auto-register Firecrawl as an MCP server in your existing Claude Code or Cursor setup, giving your agent live web scraping without any API key or cloud dependency.
