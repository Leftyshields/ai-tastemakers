# AI Tastemakers — Daily Brief — 2026-11-09

_Ranking: delta_7d · 10 repos · generated 2026-11-09T23:45:00.287Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 446870 (+24153 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a Model Context Protocol (MCP) server that lets AI agents reverse engineer binaries, mobile apps, and runtime behavior without source code, down to the native binary level.

**Why now:** The repo picked up over 24,000 stars this week, a sharp signal of builder momentum around AI-assisted reverse engineering workflows.

**Build with it:** Run `npx rea-agents setup` to connect REA to a Claude Code or MCP-compatible agent, then point it at a closed-source binary to extract feature behavior you want to replicate.

## 2. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 153054 (+1843 this week) · ai-tools, claude-code, codex, deepseek-harness, desktop-app, grok, grokbuild, hermes, kimi-code, mcp, open-source, opencode, pi, provider-management, rust, skills, skills-management, tauri, wsl-support

**What it does:** CC Switch is a Tauri-based cross-platform desktop app for swapping API providers (Claude, Codex, Gemini, Grok, Kimi, and others) across multiple AI coding tools, with a UI for managing MCP, Skills, and Prompts configs so you never hand-edit JSON, TOML, or YAML directly.

**Why now:** The repo crossed 1,800 new stars this week alongside the addition of Kimi K3.1 Pro support, a sponsored integration that adds a 1-million-token-context provider as a switchable target.

**Build with it:** Point CC Switch at your existing Claude Code config and use the MCP management UI to add or swap a Kimi K3.1 Pro endpoint without touching the underlying JSON file.

## 3. ccch1mneyyy/dsh-Go

https://github.com/ccch1mneyyy/dsh-Go · ★ 17537 (+11726 this week) · ai-agent, android, android-app, coding-agent, deepseek, deepseek-harness, dsh, dsh-plugin, dsh-tui, flutter, llm

**What it does:** DSH Go is an Android client (Flutter/Dart, Android 8+) that runs DeepSeek Harness, an AI agent framework, locally on-device or remotely controls a desktop DSH instance, with animated desktop-pet companions that signal agent state across typing, completion, waiting, and idle.

**Why now:** The repo gained 11,726 stars this week, reaching 17,537 total, after taking the Trendshift all-language daily rank-1 position on 2026-10-30.

**Build with it:** Sideload the arm64 APK from GitHub Releases, point it at an existing DSH server over your local network, and use the DSH plugin surface to wire up custom agent confirmations from your phone.

## 4. vercel-labs/agent-desktop

https://github.com/vercel-labs/agent-desktop · ★ 20421 (+10952 this week) · accessibility, accessibility-api, ai-agents, automation, cli, computer-use, computer-use-agent, computer-use-agents, desktop-automation, macos, mcp, rust

**What it does:** agent-desktop reads the OS accessibility tree of desktop apps on macOS, Windows, and Linux and returns JSON snapshots with stable element refs that an AI agent can click or type on, with no screenshots or pixel matching required.

**Why now:** The repo gained nearly 11,000 stars this week, tracking a surge in builder interest around accessibility-tree-based computer control as an alternative to vision-model approaches.

**Build with it:** Point an MCP-compatible agent at a desktop app using `agent-desktop snapshot --app <AppName> -i`, then wire the returned refs into tool calls so the agent can click and verify UI state in a tight loop.

## 5. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 67340 (+10091 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency plugin for dsh, the DeepSeek Harness agent framework, that exposes frontier models including DeepSeek V4.1 Flash and Kimi K3 through the OpenCode Zen and Kilo AI public gateways with no login, API key, or build step.

**Why now:** The repo hit number one on both Trendshift's daily and JavaScript weekly charts for the week of 2026-10-05 to 2026-10-11, reflecting a sharp spike in developer interest in no-auth model access.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL and key to route requests through the free model pool without touching upstream credentials.

## 6. ZhuLinsen/daily_stock_analysis

https://github.com/ZhuLinsen/daily_stock_analysis · ★ 68805 (+1349 this week) · a-stock, ai-agent, aigc, llm, quant, quantitative-finance, quantitative-trading

**What it does:** An LLM-powered stock analysis system that pulls multi-source market data via AkShare, YFinance, and Tushare for A-share, US, HK, and other markets, then generates daily AI decision dashboards pushed to WeChat Work, Feishu, Telegram, Slack, or email.

**Why now:** The repo gained 1,349 stars this week and holds the number-one Python repository of the day ranking on Trendshift, a clear spike in builder interest.

**Build with it:** Fork the repo, drop your OpenAI-compatible API key and watchlist into the GitHub Actions workflow config, and get automated nightly analysis reports delivered to a Telegram channel with zero infrastructure cost.

## 7. milind-soni/OpenMausBot

https://github.com/milind-soni/OpenMausBot · ★ 19633 (+8436 this week) · ai-agents, claude-code, codex, computer-use, docker, electron, grok, grok-bot, grok-bot-alternative, self-hosted, typescript

**What it does:** OpenMausBot is an Electron desktop app for Mac, Windows, and Ubuntu that runs Claude or Codex agents as chat contacts, each with its own model, personality, and sandboxed cloud computer for reviewing and approving actions.

**Why now:** The repo gained 8,400+ stars this week as builders actively compare it to Grok Bot, Meta Muse, OpenAI dots, and Cue by Manus in a category that is heating up fast.

**Build with it:** Download the signed .dmg or .exe release, wire in your existing Claude or Codex API key, and test a bring-your-own-agent workflow against a task you currently handle manually.

## 8. D4Vinci/Scrapling

https://github.com/D4Vinci/Scrapling · ★ 100534 (+7770 this week) · ai, ai-scraping, automation, crawler, crawling, crawling-python, data, data-extraction, mcp, mcp-server, playwright, python, scraping, selectors, stealth, web-scraper, web-scraping, web-scraping-python, webscraping, xpath

**What it does:** Scrapling is a Python web scraping framework covering everything from single HTTP requests to full browser-based crawls, with built-in stealth features, adaptive element tracking, and an MCP server interface for hooking into AI agents.

**Why now:** The repo gained 7,770 stars this week, coinciding with MCP server support landing in its topics and connecting it directly to the current wave of agent tooling built on the Model Context Protocol.

**Build with it:** Point an MCP-compatible AI agent at Scrapling's MCP server endpoint to give it stealth-capable, JavaScript-rendering web access without writing any custom scraper glue code.

## 9. chuspeeism/dashi-ppt-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/chuspeeism/dashi-ppt-skill · ★ 10520 (+1136 this week) · agent-skill, ai-agent, ai-ppt, claude, claude-code, dashial, html-presentation, ppt, pptx, presentation, presentation-generator, skill, slide-generator, slides

**What it does:** Dashi PPT Skill is a JavaScript agent skill that takes documents as input and generates browser-editable HTML presentations across 12 visual themes, with 1,020 layout pages and 8,576 adjustable controls, then exports them to real editable PPTX files.

**Why now:** The repo gained over 1,100 stars this week as builder interest in AI-agent-driven slide generation grows alongside mainstream Claude Code and Codex workflows.

**Build with it:** Run `npx dashi-ppt-skill@latest` to install the skill, then wire it into a Claude Code agent session so it auto-generates a branded deck from any document you drop into the conversation.

## 10. f/prompts.chat

https://github.com/f/prompts.chat · ★ 176737 (+1113 this week) · ai, artificial-intelligence, awesome-list, chatgpt, chatgpt-prompts, claude, gemini, gpt, gpt-4, llm, machine-learning, nextjs, open-source, openai, prompt-engineering, prompts, prompts-chat, typescript

**What it does:** prompts.chat is an open-source library of curated AI prompts for ChatGPT, Claude, Gemini, and other models, browsable via web UI or downloadable as a CSV or Hugging Face dataset.

**Why now:** The repo is gaining over 1,100 stars this week, and the addition of always-on bots and bot teams marks a shift from a static prompt list to a live agent-discovery platform.

**Build with it:** Pull the `prompts.csv` file or the Hugging Face dataset directly into a fine-tuning or RAG pipeline to seed your model with community-validated prompt patterns.
