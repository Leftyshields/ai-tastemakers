# AI Tastemakers — Daily Brief — 2026-11-17

_Ranking: delta_7d · 10 repos · generated 2026-11-17T22:50:27.991Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 466196 (+16502 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a standardized tool-calling interface for AI agents) that lets agents reverse engineer binaries, mobile apps, and running processes down to native binary level, no source code required.

**Why now:** The repo is sitting at 466k stars with 16,500 added this week, a spike that tracks closely with MCP tooling adoption across Claude Code and similar agent workflows.

**Build with it:** Run `npx rea-agents setup` to connect REA to your MCP-compatible agent, then point it at a closed app to extract a specific feature and replicate it in your own codebase.

## 2. hugohe3/ppt-master

https://github.com/hugohe3/ppt-master · ★ 77927 (+2306 this week) · ai-agent, aippt, office, powerpoint, powerpoint-generation, ppt, pptx, presentation, slide, slides

**What it does:** PPT Master is a Python AI agent that converts documents, PDFs, or plain topics into natively editable PPTX files, complete with real shapes, transitions, animations, speaker-note audio narration, and data-backed charts.

**Why now:** The repo gained over 2,300 stars this week and recently added support for Kimi K3, a 3-trillion-parameter model with a 1-million-token context window that can digest long source documents before generating the deck.

**Build with it:** Point the agent at an existing `.pptx` template via its template config, feed it a PDF or DOCX source file, and get back a styled, on-brand deck your team can open and edit directly in PowerPoint.

## 3. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 78506 (+9844 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency plugin for dsh (a shell-based AI coding environment) that exposes frontier models including DeepSeek V4.1 Flash and Kimi K3 through the OpenCode Zen and Kilo AI public gateways, with no login, API key, or build step required.

**Why now:** The repo hit number one on both GitHub Trending daily and Trendshift JavaScript weekly charts from 2026-10-05 to 2026-10-11, marking a clear spike in builder interest.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL and key to route free frontier model calls through your existing workflow without touching credentials.

## 4. modelflare-ai/AnyModelBot

https://github.com/modelflare-ai/AnyModelBot · ★ 4435 (+1422 this week) · ai-agent, ai-assistant, chatbot, claude, computer-use, deepseek, desktop-app, dsh, electron, feishu, gemini, gpt, grok, llm, local-first, modelflare, multi-model, openai-compatible, personal-ai-agent, wechat

**What it does:** AnyModelBot is a local-first desktop app for Windows, macOS, and Linux that runs a team of configurable AI bots connecting GPT, Claude, Gemini, Grok, DeepSeek, and 70+ other models through a single Modelflare key or direct API credentials, with built-in file access, command execution, and connectors for WeChat, Feishu, Telegram, Slack, and Discord.

**Why now:** The project gained 1,422 stars this week and version 0.1.40 shipped 20 pre-built tasks with a dry-run mode, plus an enhanced file preview panel with code highlighting, JSON folding, and CSV rendering.

**Build with it:** Point one of the built-in bots at a local folder as its workspace, enable the included scheduled-task rules, and use the WeChat or Feishu connector to surface bot responses inside your team's existing chat tool without writing any integration glue.

## 5. emilkowalski/skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/emilkowalski/skills · ★ 57779 (+1388 this week) · agent-skills, animation, claude-code, codex, cursor, design-engineering

**What it does:** A collection of Markdown-based skill files for AI coding agents, covering animation easing, choreography, performance, and design principles, installable via `npx skills@latest add emilkowalski/skills`.

**Why now:** The repo gained roughly 1,400 stars this week, reflecting growing builder interest in shaping agent taste, not just agent capability.

**Build with it:** Run `npx skills@latest add emilkowalski/skills` in a Cursor or Codex project to inject the `emil-design-eng` skill and immediately constrain your agent to pick correct easing curves and shadow choices without manual review.

## 6. nexu-io/openmotion <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/nexu-io/openmotion · ★ 10889 (+1370 this week) · agent-skills, ai, ai-agents, animation, claude-code, codex, deepseek-harness, dsh, dsh-plugin, ffmpeg, generative-ai, html, javascript, local-first, mcp, motion-graphics, openmotion, typescript, video-editing, video-generation

**What it does:** OpenMotion is an open-source, full-stack agentic video studio that takes a reference video and rebuilds it as editable motion graphics using your own brand kit, then exports MP4s sized for YouTube, Shorts, Reels, and TikTok.

**Why now:** Star count jumped by 1,370 in a single week, coinciding with active Claude Code and Codex agent ecosystem momentum that makes agent-driven video tooling newly practical.

**Build with it:** Point your local Claude Code agent at a reference social video using OpenMotion's Motion.md format to get a shot-by-shot breakdown you can edit in Studio and render directly.

## 7. p-e-w/heretic

https://github.com/p-e-w/heretic · ★ 41524 (+1302 this week) · abliteration, anti-censorship, anticensorship, censorship, censorship-resistance, llm, transformer

**What it does:** Heretic modifies local LLMs without retraining by using contrastive prompts and mathematical steering to remove refusals, reduce sycophancy, suppress low-quality filler text, and adjust other behavioral traits.

**Why now:** The repo is trending at over 41,000 stars with 1,300 added this week, and community benchmarks on models like Qwen2.5-7B and Gemma 4 E4B rate Heretic above competing abliteration tools on standard metrics like MMLU and GSM8K.

**Build with it:** Run `pip install -U heretic-llm` against any Hugging Face model, then swap in `config.nosyco.toml` or `config.noslop.toml` to target a specific behavioral change before uploading the modified weights to your own inference setup.

## 8. ethanplusai/sellbird <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ethanplusai/sellbird · ★ 6352 (+1271 this week) · ai-agent, autonomous-agent, claude, claude-code, codex, cold-email, email-verification, harvey, lead-generation, outreach, prospecting, python, sales-automation, sellbird

**What it does:** Sellbird is an open-source cold outreach pipeline that finds companies, identifies decision makers, verifies email addresses, writes personalized sequences using your existing Claude or ChatGPT API key, and holds replies for human approval before anything sends.

**Why now:** The repo gained 1,271 stars this week, coinciding with a rebranding from Harvey to Sellbird and an early-access launch of the hosted version at sellbird.ai, putting it in front of builders evaluating self-hosted alternatives.

**Build with it:** Configure your customer profile and target signals, then run `sellbird export` after the verify step to get a sequencer-ready CSV you can drop into any existing email tool without touching the sending layer.

## 9. walkinglabs/learn-harness-engineering

https://github.com/walkinglabs/learn-harness-engineering · ★ 25297 (+1109 this week) · agent, agentic, agentic-ai, ai, ai-agent, ai-agents, dsh, dsh-plugin, harness, harness-engineering, harness-framework, llm

**What it does:** A 14-lecture, 8-project course covering how to build the environment, state management, verification, and control layers that make AI coding agents run reliably, what practitioners call an "agent harness."

**Why now:** The repo added a "Frontier Harness Design Breakdowns" section in August 2026 that applies a five-subsystem framework to reverse-engineer how real frontier products construct their agent harnesses.

**Build with it:** Work through the project track to wire a tool, environment, and feedback loop into a functioning agent harness using the course's five-subsystem structure as your spec.

## 10. ccch1mneyyy/dsh-Go

https://github.com/ccch1mneyyy/dsh-Go · ★ 25970 (+7338 this week) · ai-agent, android, android-app, coding-agent, deepseek, deepseek-harness, dsh, dsh-plugin, dsh-tui, flutter, llm

**What it does:** DSH Go is a Flutter-based Android app (iOS in development) that runs DeepSeek Harness, an AI coding agent runtime, on-device or uses it to remote-control a desktop machine, with animated pet companions that reflect agent state during coding tasks.

**Why now:** The repo gained 7,338 stars this week and hit the Trendshift all-language daily top spot, marking a sharp spike in builder attention.

**Build with it:** Sideload the arm64 APK from GitHub Releases, point it at your existing DSH-TUI instance, and use the dsh-plugin interface to wire in a custom tool for your workflow.
