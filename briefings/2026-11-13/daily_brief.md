# AI Tastemakers — Daily Brief — 2026-11-13

_Ranking: delta_7d · 10 repos · generated 2026-11-13T21:22:39.961Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 190317 (+4528 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript skill for AI coding agents (Claude Code, Cursor, and others) that injects a "laziest senior dev" heuristic, pushing the agent to delete or skip code rather than over-engineer it.

**Why now:** Version 5 shipped with benchmark-backed results of -53% code, -41% time, and -45% token usage across 39 real tasks on a FastAPI and React repo, giving builders a concrete before/after to measure against their own agent workflows.

**Build with it:** Drop the npm package (`@dietrichgebert/ponytail`) into your Claude Code setup as an agent skill and run it against an existing feature branch to see how much code the agent prunes before shipping.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 457438 (+19824 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a standardized way to give AI agents access to tools) that lets agents reverse engineer binaries, apps, and runtime behavior without source code, down to the native binary level.

**Why now:** The repo gained nearly 20,000 stars this week, a sharp signal of builder interest in MCP-based tooling for security and analysis workflows.

**Build with it:** Run `npx rea-agents setup` to wire REA into a Claude-compatible agent and point it at a closed app to extract and replicate a specific feature.

## 3. paperclipai/paperclip

https://github.com/paperclipai/paperclip · ★ 113662 (+1943 this week) · acpx, agent-orchestration, agent-skills, agentic-ai, ai-agents, ai-engineering, ai-governance, ai-tools, autonomous-agents, claude, claude-code, claude-skills, codex, hermes, llm, mcp, multi-agent, openclaw, project-management, workflow-automation

**What it does:** Paperclip is an open-source Node.js server and React UI that lets you assemble a team of AI agents (CEO, engineers, marketers, any bot from any provider), assign a business goal, set budgets, and monitor work and costs from one dashboard.

**Why now:** The repo gained nearly 2,000 stars this week as tools like OpenClaw, Claude Code, and Codex become practical daily drivers, and builders are actively looking for ways to coordinate them without writing custom orchestration glue.

**Build with it:** Point one of the supported agents (OpenClaw, Claude Code, or Codex) at a concrete goal via the Paperclip UI, wire in a budget cap, and use the dashboard's cost tracking to check whether multi-agent coordination actually reduces task time versus a single-agent loop.

## 4. CopilotKit/OpenBot

https://github.com/CopilotKit/OpenBot · ★ 12075 (+1748 this week) · ag-ui, agent-governance, ai-agents, browser-automation, copilotkit, generative-ui, mcp

**What it does:** OpenBot is a self-hostable workspace where AI coworkers each get a browser, files, and tools, with every action requiring explicit approval before execution and a full log kept afterward.

**Why now:** The repo gained 1,748 stars this week and is trending at number 3 on Trendshift, coinciding with the launch of downloadable Mac and Windows desktop apps that require no terminal or developer tools to run.

**Build with it:** Connect an existing AG-UI-compatible agent to the workspace using the AG-UI protocol endpoint, then configure tool permissions and approval gates through the OpenBot interface to run it in a supervised loop.

## 5. ruvnet/RuView

https://github.com/ruvnet/RuView · ★ 104232 (+1520 this week) · claude, claude-code, esp32, firmware, home-assistant, home-automation, iot, mcp, monitoring, networking, pose-estimation, react, rf, self-learning, spatial-intelligence, typescript, webassembly, wifi, wifi-security

**What it does:** RuView converts commodity WiFi signals into real-time presence detection, breathing and heart-rate monitoring, and room-level spatial tracking using ESP32 nodes and no cameras.

**Why now:** The repo sits at over 104,000 stars with 1,520 added this week, reflecting growing builder interest in passive RF sensing as an alternative to video-based home monitoring.

**Build with it:** Point an existing Home Assistant install at a RuView MQTT broker using the `--mqtt` flag to get 21 sensor entities per node, including presence, vitals, and semantic states like fall-risk and bed-exit, with no custom integrations required.

## 6. ccch1mneyyy/dsh-Go

https://github.com/ccch1mneyyy/dsh-Go · ★ 21766 (+8881 this week) · ai-agent, android, android-app, coding-agent, deepseek, deepseek-harness, dsh, dsh-plugin, dsh-tui, flutter, llm

**What it does:** DSH Go is an Android client (Flutter/Dart, Android 8+) that runs DeepSeek Harness locally on a phone or remotely controls a desktop DSH instance, with animated on-screen pets that reflect agent state such as typing, done, or waiting for confirmation.

**Why now:** The repo gained 8,881 stars this week and hit Trendshift's number-one daily spot across all languages on 2026-10-30, a sharp spike in community attention worth tracking if you build mobile-facing agent tooling.

**Build with it:** Install the arm64 APK from GitHub Releases, point it at an existing DSH server, and use the DSH plugin surface to pipe mobile-triggered agent confirmations into your coding workflow.

## 7. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 72742 (+8866 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency dsh plugin that exposes frontier models including DeepSeek V4.1 Flash and Kimi K3 through the OpenCode Zen and Kilo AI public gateways, with no login, API key, or usage quota required.

**Why now:** The repo hit number one on both GitHub Trending daily and Trendshift's JavaScript weekly chart for the week of 2026-10-05 to 2026-10-11, marking a notable spike in builder attention around free model access.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL and key to get free access to the full model roster without touching upstream credentials.

## 8. DuarteSantos8/openGym

https://github.com/DuarteSantos8/openGym · ★ 21237 (+1281 this week) · apple-watch, bodyweight, docker, fitness, fitness-tracker, gym, health, ios, mcp, nodejs, passkeys, progressive-web-applications, pwa, react, self-hosted, self-hosting, vite, webauthn, weightlifting, workout-tracker

**What it does:** openGym is a self-hosted, open-source workout tracker with a library of over 5,600 exercises, passkey sign-in, offline PWA support, and native iOS and Android apps that keep all data on your own server.

**Why now:** The repo gained 1,281 stars this week and is trending on Trendshift, timed to its App Store launch for iPhone and Apple Watch.

**Build with it:** Run `docker compose up` against the self-hosting guide, then use the exposed MCP surface to pipe workout log data into your own analytics or AI tooling.

## 9. pingdotgg/t3code <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/pingdotgg/t3code · ★ 59483 (+1228 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code is an open-source, MIT-licensed control plane that runs Claude Code, Codex, Cursor, and other ACP-compatible coding agents on your machine and exposes them through a single interface across desktop, web, iOS, and Android.

**Why now:** The repo crossed 59,000 stars with 1,228 added this week, as multi-agent workflows shift from demos to daily use and builders want one place to manage and approve agent actions across devices.

**Build with it:** Install the `t3` CLI via `npx t3@latest`, connect an already-authenticated Claude Code or Codex session, and use the phone app to approve agent commands remotely over Tailscale or T3 Connect.

## 10. QwenLM/qwen-code <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/QwenLM/qwen-code · ★ 30115 (+1064 this week) · agentic, ai, ai-agent, ai-coding, cli, coding-agent, developer-tools, llm, mcp, qwen, terminal, typescript

**What it does:** Qwen Code is an open-source TypeScript coding agent for the terminal that supports OpenAI, Anthropic, Gemini, and Qwen APIs plus local models via Ollama or vLLM, with IDE plugins, a desktop app, and chat integrations for Telegram, DingTalk, WeChat, and Feishu.

**Why now:** The project crossed 30,000 stars this week and shipped a 1.0 Preview release merging Qoder's agent harness with Qwen Code, adding Auto-Memory, SubAgents, Agent Teams, and MCP support in one drop.

**Build with it:** Point it at any OpenAI-compatible local model via Ollama and use the MCP integration surface to wire your own tools into an agentic coding workflow inside the terminal.
