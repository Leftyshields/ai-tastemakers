# AI Tastemakers — Daily Brief — 2026-11-12

_Ranking: delta_7d · 10 repos · generated 2026-11-12T21:54:39.680Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 455094 (+21068 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a protocol layer that connects AI agents to external tools) that lets agents reverse engineer binaries, mobile apps, and runtime behavior down to the native binary level, no source code required.

**Why now:** The repo is sitting at 455,000 stars with 21,000 added this week, a sharp spike that reflects real builder demand for agent-driven reverse engineering workflows.

**Build with it:** Run `npx rea-agents setup` to wire REA into a Claude Code session, then prompt your agent to inspect a closed app feature and get a working reimplementation for your own project.

## 2. ccch1mneyyy/dsh-Go

https://github.com/ccch1mneyyy/dsh-Go · ★ 20685 (+9317 this week) · ai-agent, android, android-app, coding-agent, deepseek, deepseek-harness, dsh, dsh-plugin, dsh-tui, flutter, llm

**What it does:** DSH Go is a Flutter/Dart Android client (Android 8+) that runs DeepSeek Harness locally on a phone or remotely controls a desktop DSH instance, with animated on-screen pets that reflect agent state: typing, done, or waiting for confirmation.

**Why now:** The repo gained 9,317 stars this week and hit the Trendshift all-language daily top spot, driven by growing interest in mobile-native AI coding agents that don't require a desktop.

**Build with it:** Sideload the arm64 APK from GitHub Releases, point it at an existing DSH instance on your local network, and use the DSH plugin surface to route agent confirmations through the mobile UI instead of a desktop terminal.

## 3. hypit-ai/hypit

https://github.com/hypit-ai/hypit · ★ 29543 (+1380 this week) · agentic-ai, ai, ai-agents, ai-video, compiler, dsl, ffmpeg, generative-ai, llm, markup-language, monorepo, plugin-system, programming-language, text-to-video, typescript, video, video-automation, video-clone, video-editing, video-generation

**What it does:** Hypit gives AI agents like Claude Code a markup language called SVML to describe video workflows anchored to words rather than timecodes, letting agents clone, remix, or generate videos with footage, captions, B-roll, and effects compiled via FFmpeg.

**Why now:** The repo hit number one on Trendshift for both daily and weekly TypeScript repositories, adding over 1,300 stars in seven days as agent-driven content tooling picks up real traction.

**Build with it:** Point Claude Code at an existing viral video, let Hypit extract the SVML workflow, then modify the script layer to swap copy and ship batch variants using the one-command CLI.

## 4. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 71282 (+9039 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency dsh plugin that exposes frontier models including DeepSeek V4.1 Flash and Kimi K3 through the OpenCode Zen and Kilo AI public gateways, with no login, API key, or usage cap required.

**Why now:** The repo hit number one on both Trendshift's daily and JavaScript weekly charts for the week of 2026-10-05, reflecting a surge in builder demand for drop-in free model access.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL and key to route calls through these free model pools without touching your own API credentials.

## 5. milind-soni/OpenMausBot

https://github.com/milind-soni/OpenMausBot · ★ 21685 (+8513 this week) · ai-agents, claude-code, codex, computer-use, docker, electron, grok, grok-bot, grok-bot-alternative, self-hosted, typescript

**What it does:** OpenMausBot is an Electron desktop app for Mac, Windows, and Ubuntu that gives each AI agent (Claude or Codex) its own sidebar contact, personality, model config, and sandboxed cloud computer with connected apps.

**Why now:** The repo gained 8,513 stars this week, tracking closely with Grok Bot's public rollout and builder interest in self-hosted alternatives to Meta Muse, OpenAI dots, and Cue by Manus.

**Build with it:** Download the .dmg or .deb, wire in your own Claude or Codex API key, and test a bring-your-own-agent workflow where the bot requests approval before executing actions on its connected apps.

## 6. coreyhaines31/marketingskills

https://github.com/coreyhaines31/marketingskills · ★ 59953 (+1238 this week) · agent-skills, ai-agents, ai-seo, claude, claude-code, claude-code-plugin, claude-skills, codex, content-marketing, conversion-rate-optimization, copywriting, cursor, email-marketing, generative-engine-optimization, growth-marketing, marketing, marketing-automation, saas-marketing, seo, skill-md

**What it does:** A collection of markdown skill files for AI coding agents (Claude Code, Cursor, Codex) covering conversion optimization, copywriting, SEO, analytics, and growth engineering tasks.

**Why now:** The repo is trending at nearly 60,000 stars with 1,238 added this week, coinciding with broad adoption of Claude Code as a daily workflow tool among technical founders.

**Build with it:** Follow the `tools/SETUP.md` guided credential flow to connect a marketing data source and run your first read-only agent query against a live account.

## 7. apify/apify-mcp-server

https://github.com/apify/apify-mcp-server · ★ 15976 (+1050 this week) · agents, ai, mcp, mcp-server

**What it does:** Apify's MCP server exposes thousands of ready-made web scrapers, crawlers, and browser-automation Actors from Apify Store to any MCP-compatible AI agent via a single hosted endpoint at `mcp.apify.com` or a local stdio npm package.

**Why now:** The repo gained over 1,050 stars this week as agents move from prototypes to real data-fetching tasks, and MCP tooling is becoming the connective tissue builders reach for first.

**Build with it:** Point your Claude or Cursor MCP config at `https://mcp.apify.com` with OAuth, then prompt your agent to search Apify Store, inspect an Actor's input schema, and run it to pull structured results without installing any per-site scraper.

## 8. openai/codex-security

https://github.com/openai/codex-security · ★ 12342 (+1036 this week) · ai-security, application-security, cli, code-scanning, codex, codex-security, cybersecurity, devsecops, nodejs, npm, openai, sdk, security, typescript, vulnerability-scanning

**What it does:** Codex Security is a CLI and TypeScript SDK from OpenAI that scans repositories for vulnerabilities, validates findings, generates patches, and exports results as SARIF, JSON, or CSV.

**Why now:** The repo gained over 1,000 stars this week following its public npm release under `@openai/codex-security`, putting automated patch generation within reach of any CI pipeline.

**Build with it:** Add `cs scan . --diff origin/main` to a GitHub Actions workflow using the provided GitHub Action to gate pull requests on new vulnerability findings.

## 9. Ebony-Vinyl/EAC-Desktop <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Ebony-Vinyl/EAC-Desktop · ★ 3376 (+989 this week) · ai-agent, deepseek, deepseek-harness, desktop, desktop-app, dsh, dsh-plugin, dsh-plugins, dshdesktop, electron, tauri, windows

**What it does:** EAC-Desktop is an open-source Tauri-based workbench that wraps the DeepSeek Harness Agent kernel with a native desktop shell, bundled Node.js runtime, project-scoped file views, and a managed plugin ecosystem so users can run multi-step AI agent workflows without separate environment setup.

**Why now:** The repo gained 989 stars this week and shipped v6.0.0 for Windows, adding a standalone EAC-Launcher with a bundled Node 24 runtime for managing multiple kernel instances alongside the main desktop.

**Build with it:** Install a DSH plugin via the in-app plugin directory, point it at a local project directory, and use the file-change view to inspect and roll back agent-driven edits during a long-running task.

## 10. every-app/open-seo

https://github.com/every-app/open-seo · ★ 27486 (+972 this week) · backlink-analysis, google-search-console-mcp, keyword-research, mcp, seo, seo-agent, seo-audit, seo-automation, seo-skills, seo-tools, site-audit

**What it does:** OpenSEO is a self-hostable SEO suite covering keyword research, rank tracking, backlinks, site audits, and competitor insights, backed by pay-per-use DataForSEO API calls instead of a fixed subscription.

**Why now:** The repo gained nearly 1,000 stars this week, and the community patterns around self-hosted SEO tooling are still forming, so it's a good moment to evaluate it before conventions lock in.

**Build with it:** Point Claude Code or ChatGPT at the built-in MCP server using the setup docs at openseo.so/docs/mcp to query your SEO data directly from an AI agent workflow.
