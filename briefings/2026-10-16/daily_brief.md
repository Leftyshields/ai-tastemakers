# AI Tastemakers — Daily Brief — 2026-10-16

_Ranking: delta_7d · 10 repos · generated 2026-10-16T17:22:50.932Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 287163 (+264510 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is an MCP server (a standardized bridge between AI agents and external tools) that connects Claude, Codex, and similar agents to local reverse-engineering tools—Hopper, Ghidra, IDA—so they can inspect native binaries, Electron apps, .NET assemblies, and websites without source code.

**Why now:** The repo picked up 264,510 stars this week, an unusual spike that marks a live coordination moment for teams evaluating MCP-based tooling.

**Build with it:** Run `npx rea-agents setup` to register REA with your agent and slot it into a Claude Code or Codex workflow already targeting a binary or Electron app you want to understand.

## 2. mksglu/context-mode

https://github.com/mksglu/context-mode · ★ 30110 (+4404 this week) · antigravity, claude, claude-code, claude-code-hooks, claude-code-plugins, claude-code-skill, codex, codex-cli, context-mode, copilot, cursor-plugin, kiro, mcp, mcp-server, mcp-tools, openclaw, opencode, pi-agent, skills, zed-extension

**What it does:** Context Mode intercepts MCP tool output and compresses it before it hits the context window—claiming up to 98% reduction—while persisting session memory and routing tool calls across 17 AI coding platforms via MCP hooks.

**Why now:** It hit #1 on Hacker News this week with 570+ points, driven by real builder frustration around context exhaustion in long Claude Code and Cursor sessions.

**Build with it:** Wire it into an existing Claude Code workflow via its MCP server config to sandbox Playwright or GitHub tool output and measure how much context you recover per session.

## 3. michael-denyer/pstack-claude <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/michael-denyer/pstack-claude · ★ 2635 (+2190 this week) · agent-plugin, agent-skills, agentic-ai, anthropic, chatgpt, claude, claude-code, claude-code-skills, claude-plugin, claude-skills, code-review, codex, codex-cli, codex-plugin, codex-skills, coding-agent, developer-tools, gemini-cli, opencode, pstack

**What it does:** pstack-claude ports Lauren Tan's opinionated Cursor skill stack—a structured set of agent behavior rules—to Claude Code, Codex, GitHub Copilot, Pi, OpenCode, and Gemini CLI, routing tasks through `poteto-mode` to enforce concise, verified agent workflows.

**Why now:** The repo gained 2,190 stars this week, a sharp spike in interest from developers building structured agent skill systems outside of Cursor.

**Build with it:** Install via `/plugin marketplace add michael-denyer/pstack-claude` in Claude Code, run `setup-pstack` to assign reasoning effort levels per role (e.g., `arena runners: opus @xhigh`), and let the routing hook dispatch tasks automatically.

## 4. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 19157 (+7333 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency plugin for dsh (a shell-level AI tool runner) that routes calls to frontier models—DeepSeek V4.1 Flash, Kimi K3—through the OpenCode Zen and Kilo AI public gateways with no account, API key, or build step required.

**Why now:** The repo hit #1 on Trendshift's JavaScript weekly chart for the week of 2026-10-05 to 2026-10-11, marking a clear spike in builder attention.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port (`base URL` + key in settings) to access the full model roster without touching upstream credentials.

## 5. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 165047 (+6772 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent skill that installs a "laziest senior dev" heuristic into AI coding agents, steering them to delete or skip code rather than add it—benchmarked at getting 98% of risky logic shipped with tests versus 68% without.

**Why now:** The v5 release this week claims a ground-up rewrite delivering -53% code, -41% time, -26% cost, and -45% token usage, validated against a real FastAPI + React repo across 39 tasks in Claude Code.

**Build with it:** Install `@dietrichgebert/ponytail` from npm and add it to your Claude Code or Cursor rules config to apply a YAGNI (You Aren't Gonna Need It) constraint layer to your existing agent workflow.

## 6. heygen-com/hyperframes

https://github.com/heygen-com/hyperframes · ★ 65139 (+6057 this week) · ai, animation, ffmpeg, framework, gsap, html, mcp, puppeteer, rendering, typescript, video

**What it does:** HyperFrames is an open-source TypeScript framework that renders HTML, CSS, and seekable GSAP animations into deterministic MP4 videos via a CLI, a Puppeteer/FFmpeg pipeline, or AI coding agents using installable skills.

**Why now:** The repo gained over 6,000 stars this week, coinciding with a native Mac and Linux desktop app release and a Claude Code plugin landing in the marketplace.

**Build with it:** Install the Claude Code plugin (`claude plugin marketplace add heygen-com/hyperframes`), run `/hyperframes`, and the router skill handles the full plan-write-lint-render loop from an HTML template to finished MP4.

## 7. ahujasid/mcp-for-blender <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ahujasid/mcp-for-blender · ★ 31155 (+904 this week) · 3d-modeling, ai, blender, blender-addon, blender-mcp, claude, generative-ai, llm, mcp, model-context-protocol, python

**What it does:** MCP for Blender is a Python addon and MCP server that lets any MCP-compatible LLM—Claude, Cursor, VS Code, and others—control Blender via natural-language prompts to create, modify, and manipulate 3D scenes.

**Why now:** The repo gained 904 stars this week and recently expanded auto-setup support to Codex, Devin, and OpenCode under its renamed PyPI package `mcp-for-blender`.

**Build with it:** Run `uvx mcp-for-blender setup` to wire the server into Claude Desktop's `mcpServers` config, then prompt Blender directly from the chat interface to generate and iterate on 3D geometry without touching the Blender UI.

## 8. mobile-next/mobile-mcp

https://github.com/mobile-next/mobile-mcp · ★ 9667 (+894 this week) · agent, android, emulator, ios, mcp, mobile, physical, real, simulator

**What it does:** mobile-next/mobile-mcp is a Model Context Protocol server that lets LLMs and agents drive iOS and Android apps—on simulators, emulators, or real devices—via the native accessibility tree, falling back to screenshot-based coordinate taps only when needed.

**Why now:** The repo gained ~894 stars this week, signaling a breakout moment likely tied to growing MCP ecosystem adoption across Claude Code, GitHub Copilot, and Gemini toolchains.

**Build with it:** Point any MCP-compatible client (e.g., Claude Code) at `npx -y @mobilenext/mobile-mcp@latest` and script a multi-step mobile test flow against a local iOS simulator using the accessibility-snapshot tools—no Appium or XCUITest setup required.

## 9. browser-use/browser-use

https://github.com/browser-use/browser-use · ★ 118192 (+893 this week) · ai-agents, ai-tools, browser-agent, browser-automation, browser-use, cdp, cloud-browser, computer-use, headless-browser, llm, mcp, playwright, python, remote-browser, stealth-browser, web-automation, web-scraping

**What it does:** Browser-use is an open-source Python library that lets LLMs control a real browser—clicking, form-filling, CAPTCHA handling—either locally against any model or via Browser Use Cloud at $0.02/hour with stealth mode and residential proxies.

**Why now:** The repo gained 893 stars this week alongside Stealth Bench V2 results showing its cloud browsers scoring 90.5%, giving builders a concrete number to evaluate stealth performance against.

**Build with it:** Wire the `Agent` class to any LangChain-compatible LLM and point it at a multi-step booking or form workflow to test whether the browser agent can replace a brittle Playwright script.

## 10. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 281167 (+5932 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is a harness layer that adds persistent skills, memory, security (via `ecc-agentshield`), and research-first workflows on top of coding agents like Claude Code, Codex, Cursor, and Opencode—filling the configuration gap that sits above the model but below your app code.

**Why now:** The repo is trending this week with nearly 6,000 new stars, coinciding with Claude Code and Opencode becoming primary agentic coding environments where session persistence and agent behavior controls are real unmet needs.

**Build with it:** Drop `ecc-universal` from npm into an existing Claude Code project and use its skills and memory config surface to give your agent persistent context across sessions without modifying the underlying model setup.
