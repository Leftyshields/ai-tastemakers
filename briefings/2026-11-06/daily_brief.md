# AI Tastemakers — Daily Brief — 2026-11-06

_Ranking: delta_7d · 10 repos · generated 2026-11-06T20:48:53.779Z_


## 1. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 298497 (+5184 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC (agent harness layer) wraps coding agents like Claude Code, Codex, Cursor, and Opencode with persistent memory, injectable skills, security controls, and research-first workflows.

**Why now:** The repo picked up over 5,000 stars this week as agent-native editors compete hard for developer workflow share and teams start asking what sits between the agent and the task.

**Build with it:** Install `ecc-universal` from npm, wire it into your Claude Code setup, and test persistent memory and skill injection on a real project task.

## 2. yetone/magpie

https://github.com/yetone/magpie · ★ 31221 (+5006 this week) · claude-code, codex, deepseek, gemini-cli, llm, macos

**What it does:** Magpie is a local gateway and menu-bar app that lets any AI coding agent, including Claude Code, Codex, Gemini CLI, and OpenCode, switch model providers by changing one config value, with automatic failover across accounts when a quota runs out.

**Why now:** The repo gained over 5,000 stars this week, tracking a surge in developer interest around mixing frontier models from providers like Kimi and DeepSeek across multiple agents without manual reconfiguration.

**Build with it:** Install Magpie and select a DeepSeek or Kimi account from its agent config UI to redirect your existing Claude Code setup at a new provider, without touching Claude Code's own config files.

## 3. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 111182 (+4948 this week) · agent-skills, ai-agents, anti-slop, claude-code, codex, cursor, design-system, frontend, landing-page, ui-design, web-design

**What it does:** Taste Skill is an agent skill (v2.5.0) that gives coding agents like Cursor and Claude Code a design ruleset enforcing art direction, real photography, brand icons, and a browser-based output checker, pushing back against the generic AI landing page aesthetic.

**Why now:** The repo gained nearly 5,000 stars this week, riding a live conversation in the dev community about the low quality of AI-generated frontend output and demand for tooling that enforces real design standards automatically.

**Build with it:** Drop the skill into a Cursor or Claude Code session, point it at a single-page brief, and get a browser-checked build that follows a one-section-per-screen, real-asset design system without extra prompting.

## 4. morluto/rea

https://github.com/morluto/rea · ★ 437614 (+25842 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (Model Context Protocol, the standard for wiring tools into AI agents) that connects agents to reverse engineering tools so they can inspect binaries, native apps, and runtime behavior without access to source code.

**Why now:** The repo gained over 25,000 stars this week, pointing to a sharp spike in interest around agent-driven reverse engineering as a practical workflow.

**Build with it:** Run `npx rea-agents setup` to connect REA to your MCP-compatible agent, then prompt it to inspect a closed app feature and get a working reimplementation you can drop into your own project.

## 5. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 261170 (+2324 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python AI agent from Nous Research that builds and refines skills from experience, maintains memory across sessions, and runs on anything from a $5 VPS to serverless Modal or Daytona infrastructure.

**Why now:** The repo crossed 261,000 stars with 2,324 added this week, drawing attention to its learning-loop architecture at a moment when persistent, self-modifying agents are moving from research demos to real deployments.

**Build with it:** Point it at your own model endpoint via `hermes model`, then wire the built-in Telegram gateway to get a cloud-resident agent you can prompt remotely while it runs tasks on a VM.

## 6. vercel-labs/agent-desktop

https://github.com/vercel-labs/agent-desktop · ★ 18016 (+11504 this week) · accessibility, accessibility-api, ai-agents, automation, cli, computer-use, computer-use-agent, computer-use-agents, desktop-automation, macos, mcp, rust

**What it does:** agent-desktop reads the OS accessibility tree of macOS, Windows, and Linux apps and returns structured JSON with actionable refs, giving an AI agent a way to click and type in any desktop app without screenshots or pixel matching.

**Why now:** The repo gained over 11,000 stars this week as developers look for alternatives to vision-model computer use, which is slower and less reliable than reading the accessibility API directly.

**Build with it:** Wire `agent-desktop snapshot --app <YourApp> -i` into an LLM tool-call loop and use the returned `ref_id` values as targets for `agent-desktop click` to let the model drive any desktop app without a GUI scraping layer.

## 7. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 63876 (+11172 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency, zero-configuration plugin for the dsh (DeepSeek Harness) runtime that routes calls to frontier models including DeepSeek V4.1 Flash and Kimi K3 through the OpenCode Zen and Kilo AI public gateways, with no login, API key, or usage cap required.

**Why now:** The repo hit number one on both the Trendshift JavaScript daily and weekly charts for the week of 2026-10-05 to 2026-10-11, suggesting a sharp spike in developer demand for free, frictionless access to capable models.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL and key to route free, cap-free model calls without handling gateway credentials yourself.

## 8. ccch1mneyyy/dsh-Go

https://github.com/ccch1mneyyy/dsh-Go · ★ 12885 (+10527 this week) · ai-agent, android, android-app, coding-agent, deepseek, deepseek-harness, dsh, dsh-plugin, dsh-tui, flutter, llm

**What it does:** DSH Go is a Flutter/Dart Android client (Android 8+) that runs DeepSeek Harness locally on your phone or remotely controls a desktop DSH instance, with on-screen animated pets that reflect agent state: typing, done, waiting for confirmation, or idle.

**Why now:** The repo gained over 10,000 stars this week and hit Trendshift's all-language daily top spot, reflecting real community interest in mobile interfaces for AI agents beyond browser chat windows.

**Build with it:** Install the arm64 APK from GitHub Releases, point it at an existing DSH instance on your local network, and use the DSH plugin surface to stream agent task output to your phone as a lightweight remote monitor.

## 9. D4Vinci/Scrapling

https://github.com/D4Vinci/Scrapling · ★ 98774 (+8312 this week) · ai, ai-scraping, automation, crawler, crawling, crawling-python, data, data-extraction, mcp, mcp-server, playwright, python, scraping, selectors, stealth, web-scraper, web-scraping, web-scraping-python, webscraping, xpath

**What it does:** Scrapling is a Python web scraping framework covering everything from single HTTP requests to full browser-based crawls, with built-in stealth, adaptive CSS/XPath selectors that survive layout changes, and an MCP server interface for direct use from AI orchestration pipelines.

**Why now:** The repo gained over 8,000 stars this week alongside active MCP and AI agent tooling adoption, and the project now ships an agent skill endpoint and OpenClaw integration that make it a first-class tool in those pipelines.

**Build with it:** Connect the MCP server to an existing AI agent and use Scrapling's adaptive selectors to extract structured data from pages that break conventional scrapers when element positions or class names shift.

## 10. gamedev-skills/awesome-gamedev-agent-skills

https://github.com/gamedev-skills/awesome-gamedev-agent-skills · ★ 7204 (+1217 this week) · agent-skills, ai-agents, antigravity, awesome-list, claude-code, cline, codex, cursor, game-dev, game-development, gamedev, gemini-cli, github-copilot, godot, kiro, oh-my-pi, skills, unity, unreal, windsurf

**What it does:** This repo provides 77 game-dev-focused Agent Skills, portable SKILL.md files that coding agents read as instructions, covering Godot, Unity, Unreal, Phaser, Bevy, Roblox, and eight other engines, plus a router that auto-selects the right skills based on your engine and task.

**Why now:** The repo gained 1,217 stars this week, aligned with broader adoption of agent-native coding tools like Claude Code, Kiro, and Gemini CLI that now consume the SKILL.md format natively.

**Build with it:** Run `npx skills add gamedev-skills/awesome-gamedev-agent-skills` in an existing game project, describe your task in plain language to your agent, and let the router load matching engine and task skills before code generation starts.
