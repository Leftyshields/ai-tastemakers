# AI Tastemakers — Daily Brief — 2026-06-22

_Ranking: delta_7d · 10 repos · generated 2026-06-22T16:07:15.774Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 48920 (+35748 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt skill/plugin for AI coding agents (Claude Code, Cursor, etc.) that instills a "laziest senior dev" mindset, pushing the agent to delete or avoid code rather than generate it, preferring native browser APIs and built-ins over installed dependencies.

**Why now:** AI coding agents are actively trending toward over-building—installing libraries, scaffolding wrappers, and debating abstractions when a single HTML input would suffice—and this week's 35k+ new stars signal developers are feeling that pain acutely right now.

**Build with it:** Drop the skill file into your agent configuration and prototype a feature-complete web app where every component defaults to a native element first, measuring how much smaller your diff is compared to a vanilla agent session.

## 2. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 37646 (+7979 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents free, zero-API-key access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu by routing around paywalls and blocks using browser cookies, MCP servers, and swappable backend adapters.

**Why now:** It hit #1 on GitHub Trending this week with nearly 8,000 new stars, likely driven by the surge in Claude Code and Cursor users who need their agents to read live internet content without paying for platform APIs.

**Build with it:** Drop it into any CLI-capable agent (Claude Code, Cursor, Windsurf) to build research pipelines that pull real-time social signals—competitor mentions on Twitter, Reddit bug threads, YouTube tutorial summaries—without writing a single scraper yourself.

## 3. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 11158 (+7609 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that indexes codebases into a persistent knowledge graph using tree-sitter AST parsing across 158 languages, answering structural queries about functions, call chains, and cross-service links in under 1ms with 99% fewer tokens than file-by-file exploration.

**Why now:** It gained over 7,600 stars this week, signaling rapid adoption across the AI coding agent ecosystem, and its support for Claude Code, Cursor, Windsuff, Gemini CLI, and 7 other agents makes it immediately applicable to wherever builders are working today.

**Build with it:** Drop it into your agent setup to give any LLM a navigable map of a large monorepo or multi-service codebase without burning context on raw file reads — particularly useful for building refactoring agents, dependency analyzers, or onboarding tools that need to reason about code structure at scale.

## 4. tw93/Pake

https://github.com/tw93/Pake · ★ 56664 (+6166 this week) · chatgpt, claude, desktop, gemini, hight-performance, linux, macos, no-electron, package, rust, tauri, windows, youtube

**What it does:** Pake is a Rust/Tauri-based CLI tool that wraps any webpage into a native desktop app for macOS, Windows, and Linux, producing installers under 10MB — roughly 20x smaller than Electron equivalents.

**Why now:** The project gained 6,166 stars this week, signaling a surge of developer interest likely driven by demand for lightweight AI tool wrappers like the included DeepSeek, Grok, and Claude packages.

**Build with it:** Run `pake <url>` to ship a branded desktop client for your web app in minutes — useful for turning internal tools, SaaS products, or AI interfaces into distributable native apps without maintaining a separate Electron codebase.

## 5. ZhuLinsen/daily_stock_analysis <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ZhuLinsen/daily_stock_analysis · ★ 45619 (+2985 this week) · a-stock, ai-agent, aigc, llm, quant, quantitative-finance, quantitative-trading

**What it does:** An LLM-powered stock analysis system that pulls multi-source market data (A-share, HK, US, JP, KR), runs AI-generated buy/sell decision reports with scoring and risk alerts, and pushes results to Slack, Telegram, WeChat, or email on a schedule via GitHub Actions at zero hosting cost.

**Why now:** It gained nearly 3,000 stars this week, signaling strong community traction around agentic finance tooling at a moment when LLM APIs are cheap enough to make automated daily equity analysis practically free to run.

**Build with it:** Fork the repo, wire in your own watchlist and an OpenAI-compatible API key, then extend the 15 built-in strategy agents (trend, momentum, event-driven, etc.) to prototype a custom quant signal pipeline that delivers daily briefings directly to your team's chat tool.

## 6. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 199715 (+5510 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent framework from Nous Research that creates and refines skills from experience, maintains persistent memory across sessions, and runs on any infrastructure — from a $5 VPS to serverless Modal deployments — while connecting to 200+ models via OpenRouter and similar providers.

**Why now:** The project gained 5,510 GitHub stars this week, signaling a surge in developer attention, and its multi-platform messaging support (Telegram, Discord, Slack, WhatsApp, Signal) makes it immediately deployable as a persistent cloud agent rather than a laptop-bound tool.

**Build with it:** A builder could wire Hermes to a cheap cloud VM, expose it over Telegram, and let it autonomously run nightly data pipelines or cron-scheduled reports — accumulating task-specific skills over time without any manual prompt engineering between sessions.

## 7. palmier-io/palmier-pro

https://github.com/palmier-io/palmier-pro · ★ 6860 (+5362 this week) · ai-video, claude, macos, mcp, seedance2, swift, video-editor

**What it does:** Palmier Pro is an open-source macOS video editor built in Swift that lets you and AI agents collaboratively edit timelines, with built-in access to generative video models like Seedance and Kling, plus an MCP server for connecting Claude, Cursor, or Codex directly to your project.

**Why now:** It gained 5,362 stars this week, likely surfing the wave of macOS 26 (Tahoe) developer excitement and growing demand for agent-native creative tools that go beyond chatbots into real application control.

**Build with it:** Wire up a Claude Code agent via MCP to autonomously cut, arrange, and generate video clips on a live timeline—or extend the open-source Swift editor itself to add custom AI-driven effects, automated captioning, or domain-specific editing workflows.

## 8. mukul975/Anthropic-Cybersecurity-Skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/mukul975/Anthropic-Cybersecurity-Skills · ★ 18359 (+2575 this week) · ai-agents, claude-code, cloud-security, cybersecurity, devsecops, ethical-hacking, incident-response, infosec, llm, malware-analysis, mcp, mitre-attack, nist-csf, osint, penetration-testing, red-team, security, security-automation, threat-hunting, threat-intelligence

**What it does:** This open-source library provides 762 structured cybersecurity skills for AI agents, spanning 26 security domains and mapped across six frameworks including MITRE ATT&CK v19.1 and NIST CSF 2.0, following the agentskills.io standard for consistent skill definitions.

**Why now:** The repo gained 2,575 stars this week, signaling strong community traction, and the addition of the MITRE Fight Fraud Framework (F3 v1.1) mapping makes it one of the first libraries to offer unified cross-framework coverage in a single structured format.

**Build with it:** Drop these skills into Claude Code, Cursor, or any of the 26+ supported platforms to give your security agent the context to triage memory dumps, write Sigma rules, or scope cloud breaches without hand-holding every step.

## 9. asgeirtj/system_prompts_leaks <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/asgeirtj/system_prompts_leaks · ★ 44905 (+2542 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** A regularly updated GitHub repository that extracts and publishes the hidden system prompts governing AI assistants like Claude, ChatGPT, Gemini, Grok, and Copilot, exposing the exact instructions shaping their behavior.

**Why now:** The repo crossed 44,900 stars this week while adding prompts for Claude Fable 5, GPT-5.5 Codex, Claude Design, and GitHub Copilot for macOS, making it the most current public snapshot of how frontier AI systems are actually instructed.

**Build with it:** Use the extracted prompts as a reference library to reverse-engineer tone, constraint patterns, and tool-calling conventions when designing your own agents, or diff consecutive model versions to detect capability and policy shifts before they're officially documented.

## 10. hugohe3/ppt-master <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/hugohe3/ppt-master · ★ 30318 (+2510 this week) · ai-agent, aippt, office, powerpoint, powerpoint-generation, ppt, pptx, presentation, slide, slides

**What it does:** PPT Master is a Python tool that converts any document into a natively editable PPTX file using AI, generating real shapes, animations, speaker notes, and optional audio narration — not slide screenshots — while respecting your own template file.

**Why now:** The repo gained 2,510 stars this week, signaling a spike in developer interest, and v2.11.0 is freshly tagged, making this a good moment to catch an active release cycle before the API stabilizes.

**Build with it:** Wire it into a document-to-deck pipeline — feed it meeting transcripts, research PDFs, or technical specs and auto-generate branded client presentations, investor decks, or internal reports that recipients can actually edit in PowerPoint.
