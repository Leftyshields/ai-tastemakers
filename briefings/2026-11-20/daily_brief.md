# AI Tastemakers — Daily Brief — 2026-11-20

_Ranking: delta_7d · 10 repos · generated 2026-11-20T22:12:48.315Z_


## 1. google/elephant-goldfish-model

https://github.com/google/elephant-goldfish-model · ★ 21666 (+3100 this week) · agent-skills, ai-agents, antigravity, claude-code, claude-code-plugin, claude-skills, codex, codex-plugin, coding-agents, context-engineering, developer-tools, gemini, llm, multi-agent, prompt-engineering, spec-driven-development

**What it does:** EGM (Elephant Goldfish Model) is an open-source plugin for Claude Code, Codex, and Antigravity that runs a two-agent workflow: one agent drafts software specifications with full project context, and a second "goldfish" agent reviews the draft cold to surface unstated assumptions.

**Why now:** The repo picked up 3,100 stars this week, reflecting rising developer focus on context-engineering and spec-driven workflows as coding agents become a standard part of the build loop.

**Build with it:** Install via `claude plugin marketplace add google/elephant-goldfish-model`, then run `/egm:egm-review` on an existing design doc or PR plan to get a fresh-eyes audit against your live codebase.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 471409 (+13971 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server that lets AI agents reverse engineer binaries, mobile apps, and runtime behavior without source code, down to the native binary level.

**Why now:** The repo is trending at 471k stars with nearly 14k added this week, signaling a sharp surge in builder interest around MCP-based tooling for agents.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent (Claude Code, for example) and have it inspect a closed app feature, then generate a working reimplementation in your own codebase.

## 3. thedotmack/claude-mem

https://github.com/thedotmack/claude-mem · ★ 118626 (+1809 this week) · ai, ai-agents, ai-memory, anthropic, artificial-intelligence, chromadb, claude, claude-agent-sdk, claude-agents, claude-code, claude-code-plugin, claude-skills, embeddings, long-term-memory, mem0, memory-engine, openmemory, rag, sqlite, supermemory

**What it does:** Claude-Mem is a TypeScript plugin that records agent activity during coding sessions, compresses it with AI, and injects the relevant context back into future sessions across Claude Code, Codex, Copilot, and other agents.

**Why now:** The repo added over 1,800 stars this week as session-based coding agents see wider adoption, and none of them carry memory across sessions natively.

**Build with it:** Drop Claude-Mem into an existing Claude Code workflow via its plugin config to give your agent persistent project context without rewriting your prompts.

## 4. zhouxiaoka/autoclip

https://github.com/zhouxiaoka/autoclip · ★ 12130 (+1726 this week) · ai-agent, ai-video-editor, content-repurposing, desktop-app, douyin, instagram-reels, mcp, open-source, podcast, subtitles, tiktok, video-clipping, video-editing-software, xiaohongshu, youtube-shorts

**What it does:** AutoClip is an open-source desktop app built with Tauri and Python that takes a URL to a long-form video such as a podcast or interview and outputs platform-ready short clips, subtitles, cover images, and post copy for Douyin, TikTok, Reels, YouTube Shorts, and others.

**Why now:** The repo gained 1,726 stars this week on GitHub Trending alongside a fresh release that fixes one-click clipping, subtitle pagination, subject framing, and long-video queue processing.

**Build with it:** Use the MCP interface to wire AutoClip's clip-generation pipeline into an existing agent workflow, calling `get_version` to confirm the endpoint and then passing video URLs programmatically instead of through the GUI.

## 5. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 82067 (+9325 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency dsh (DeepSeek Harness) plugin that exposes frontier LLMs including DeepSeek V4.1 Flash and Kimi K3 through the OpenCode Zen and Kilo AI public gateways, with no login, API key, or build step required.

**Why now:** The repo hit the top of Trendshift's JavaScript weekly chart for October 5-11, 2026, with 9,325 stars added that week, pointing to rapid adoption among developers looking to skip credential setup entirely.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL and key to get free access to the full model roster without touching gateway credentials.

## 6. Portkey-AI/gateway <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Portkey-AI/gateway · ★ 13424 (+1258 this week) · ai-gateway, gateway, generative-ai, hacktoberfest, langchain, llm, llm-gateway, llmops, llms, mcp, mcp-client, mcp-gateway, mcp-servers, model-router, openai

**What it does:** Portkey AI Gateway is an open-source TypeScript proxy that routes requests to over 1,600 LLMs through a single OpenAI-compatible API, with built-in retries, fallbacks, load balancing, and guardrails.

**Why now:** The repo gained 1,258 stars this week alongside a Gateway 2.0 pre-release that merges Portkey's core enterprise features into the open-source codebase for the first time.

**Build with it:** Spin up the gateway locally with `npx @portkey-ai/gateway` and point your existing OpenAI SDK calls at `http://localhost:8787/v1` to test multi-provider fallback routing without changing your application code.

## 7. elementalsouls/Claude-BugHunter

https://github.com/elementalsouls/Claude-BugHunter · ★ 14074 (+8348 this week) · ai-security, anthropic, application-security, bug-bounty, bugbounty, bugcrowd, claude, claude-code, claude-skills, ethical-hacking, hackerone, offensive-security, pentesting, red-team, security-tools, web-security

**What it does:** claude-bughunter is a Claude Code skill bundle that loads 83 skills and 15 slash commands covering 681 disclosed HackerOne report patterns across 24 vulnerability classes, plus enterprise identity and infrastructure attack chains for authorized bug hunting and red-team work.

**Why now:** The repo gained over 8,000 stars this week as Claude Code's plugin and skills system draws attention as a practical surface for security tooling.

**Build with it:** Install via `/plugin marketplace add elementalsouls/Claude-BugHunter` inside Claude Code, then describe a target in plain English to auto-load the relevant `hunt-*` skill and get detection patterns, payloads, and chain templates without manual invocation.

## 8. pingdotgg/t3code

https://github.com/pingdotgg/t3code · ★ 67726 (+8243 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code is an open-source, MIT-licensed control plane that runs Claude Code, Codex, Cursor, and other ACP-compatible coding agents on your machine and exposes them through a single interface across desktop, web, iOS, and Android.

**Why now:** The repo gained over 8,000 stars this week as developers push toward multi-agent orchestration workflows that span multiple devices.

**Build with it:** Install the `t3` CLI via the one-line curl script, connect an already-authenticated Claude Code or Codex session, and use the phone app's approval flow to review and merge agent-generated diffs without sitting at your desk.

## 9. citrolabs/ego-lite

https://github.com/citrolabs/ego-lite · ★ 23883 (+1100 this week) · agent-skills, ai-agent, automation, browser, browser-automation, claude-code, codex, hermes-agent, skills, skills-sh

**What it does:** ego lite is a browser that runs AI agent tasks in isolated Spaces alongside your own session, sharing your real logins and tabs with agents like Codex or Claude Code via the `ego-browser` package without handing the agent full browser control.

**Why now:** The repo gained 1,100 stars this week and sits in GitHub trending charts, coinciding with active Codex and Claude Code adoption cycles where managing separate headless browser sessions is a known friction point.

**Build with it:** Point an existing Claude Code or Codex workflow at `ego-browser` to let the agent act on your already-logged-in tabs instead of spinning up and authenticating a separate headless session.

## 10. ccch1mneyyy/dsh-Go

https://github.com/ccch1mneyyy/dsh-Go · ★ 28986 (+7220 this week) · ai-agent, android, android-app, coding-agent, deepseek, deepseek-harness, dsh, dsh-plugin, dsh-tui, flutter, llm

**What it does:** DSH Go is a Flutter-based Android app that runs DeepSeek Harness, an AI coding agent, on a phone, letting you interact with it locally or use it to remote-control a desktop machine.

**Why now:** The repo gained 7,220 stars this week and hit the Trendshift all-language daily top spot, making it one of the fastest-moving mobile AI projects right now.

**Build with it:** Sideload the arm64 APK from GitHub Releases, point it at an existing DSH-TUI backend on your desktop, and test the mobile-to-desktop agent control workflow directly against your own codebase.
