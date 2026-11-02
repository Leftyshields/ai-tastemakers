# AI Tastemakers — Daily Brief — 2026-11-02

_Ranking: delta_7d · 10 repos · generated 2026-11-02T23:04:35.534Z_


## 1. thedotmack/claude-mem

https://github.com/thedotmack/claude-mem · ★ 110688 (+7324 this week) · ai, ai-agents, ai-memory, anthropic, artificial-intelligence, chromadb, claude, claude-agent-sdk, claude-agents, claude-code, claude-code-plugin, claude-skills, embeddings, long-term-memory, mem0, memory-engine, openmemory, rag, sqlite, supermemory

**What it does:** claude-mem is a persistent memory compression system for Claude Code and other AI agents that captures session activity, compresses it with AI, stores it in SQLite with embeddings, and injects relevant context back into future sessions.

**Why now:** The repo crossed 7,000 stars this week as Claude Code adoption grows and builders hit the frustration of agents losing context between sessions.

**Build with it:** Drop claude-mem into an existing Claude Code workflow as a plugin and test cross-session context recall immediately, with no memory management logic to write yourself.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 422717 (+32039 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a Model Context Protocol (MCP) server, meaning it exposes tools to AI agents using a standard interface, and it specializes in reverse engineering: inspecting native binaries, JavaScript and Electron apps, .NET assemblies, and websites without access to source code.

**Why now:** The repo picked up over 32,000 stars this week, one of the sharpest single-week surges tracked recently and a strong signal this workflow is hitting a real builder need.

**Build with it:** Run `npx rea-agents setup` to register REA as an MCP server in your agent environment, then prompt your agent to reverse engineer a closed app feature and replicate it in your own codebase.

## 3. TauricResearch/TradingAgents

https://github.com/TauricResearch/TradingAgents · ★ 119949 (+4151 this week) · agent, finance, llm, multiagent, trading

**What it does:** TradingAgents is a Python framework that runs a multi-agent LLM pipeline, with specialized analyst and manager roles, to research stocks and produce buy/sell decisions backed by SEC filings, macroeconomic data, and social sentiment.

**Why now:** The v0.7.1 release this month adds point-in-time correctness for SEC filings and final-close scoring for backtests, closing two data-integrity gaps that previously made backtest results unreliable.

**Build with it:** Run a backtest over a ticker-and-date grid using the `--ticker` and `--date` CLI flags to validate decision quality against historical closes without writing any custom code.

## 4. hugohe3/ppt-master

https://github.com/hugohe3/ppt-master · ★ 72583 (+3708 this week) · ai-agent, aippt, office, powerpoint, powerpoint-generation, ppt, pptx, presentation, slide, slides

**What it does:** PPT Master is a Python AI agent that converts documents, PDFs, and topics into natively editable PPTX files with real shapes, transitions, animations, data-backed charts, and optional audio narration generated from speaker notes.

**Why now:** The repo gained over 3,700 stars this week and landed on Trendshift's trending list, reflecting a clear uptick in interest from builders who want AI-generated slides they can actually edit afterward.

**Build with it:** Point the agent at an existing `.pptx` template to auto-generate on-brand slide decks from any source document, then open the output directly in PowerPoint for final edits.

## 5. vercel-labs/agent-desktop <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/vercel-labs/agent-desktop · ★ 9469 (+2957 this week) · accessibility, accessibility-api, ai-agents, automation, cli, computer-use, computer-use-agent, computer-use-agents, desktop-automation, macos, mcp, rust

**What it does:** `agent-desktop` is a CLI and C library for macOS, Windows, and Linux that exposes the OS accessibility tree as JSON snapshots, letting AI agents read and operate desktop apps through stable element refs rather than pixel matching.

**Why now:** The repo gained nearly 3,000 stars this week as builder interest in computer-use agents has spiked following recent model provider momentum in that space.

**Build with it:** Wire `agent-desktop snapshot --app <YourApp> -i` into an MCP tool call loop so your agent clicks refs, re-snapshots to verify state changes, and drives any desktop app without a browser.

## 6. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 57249 (+12525 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency dsh plugin that routes requests to frontier models including DeepSeek V4.1 Flash and Kimi K3 through public gateways (OpenCode Zen and Kilo AI) with no login, API key, or usage cap required.

**Why now:** The repo hit number one on both Trendshift's daily and JavaScript weekly charts (week of 2026-10-05 to 2026-10-11), reflecting a sharp spike in builder interest around free, uncredentialed LLM access.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's built-in forwarding port using its base URL and key to get free, cap-free access to the full model roster without modifying upstream code.

## 7. p-e-w/heretic

https://github.com/p-e-w/heretic · ★ 38053 (+1494 this week) · abliteration, anti-censorship, anticensorship, censorship, censorship-resistance, llm, transformer

**What it does:** Heretic modifies local LLMs without any retraining by using contrastive prompts and mathematical steering techniques to suppress refusals, reduce sycophancy, cut repetitive filler (slop), and adjust emotional tone.

**Why now:** The repo gained 1,494 stars this week and has crossed 38,000 total, with an active community publishing thousands of Heretic-modified models on Hugging Face and independent benchmarks showing favorable results against competing abliteration tools.

**Build with it:** Install `heretic-llm`, point it at any Hugging Face model ID, and swap in one of the bundled TOML configs such as `config.noslop.toml` or `config.nosyco.toml` to produce a behavior-modified model you can publish directly to Hugging Face.

## 8. walkinglabs/learn-harness-engineering

https://github.com/walkinglabs/learn-harness-engineering · ★ 22981 (+1313 this week) · agent, agentic, agentic-ai, ai, ai-agent, ai-agents, dsh, dsh-plugin, harness, harness-engineering, harness-framework, llm

**What it does:** A 14-lecture, 8-project course on building the environment, state management, verification, and control layers that make AI coding agents reliable, organized around a five-subsystem framework covering instructions, tools, environment, state, and feedback.

**Why now:** An August 2026 addition called "Frontier Harness Design Breakdowns" reverse-engineers how real frontier products implement those five subsystems, giving builders concrete reference points rather than abstract theory.

**Build with it:** Work through the harness-design breakdowns alongside your own agent project and use the five-subsystem framework as a checklist to pinpoint which layer, whether instructions, tools, environment, state, or feedback, is causing reliability failures.

## 9. modelflare-ai/AnyModelBot <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/modelflare-ai/AnyModelBot · ★ 1328 (+1172 this week) · ai-agent, ai-assistant, chatbot, claude, computer-use, deepseek, desktop-app, dsh, electron, feishu, gemini, gpt, grok, llm, local-first, modelflare, multi-model, openai-compatible, personal-ai-agent, wechat

**What it does:** AnyModelBot is a local-first, open-source AI agent app for Windows, macOS, and Linux that runs persona-based bots across WeChat, Feishu, Telegram, Slack, and Discord, backed by 70-plus models including GPT, Claude, Gemini, Grok, and DeepSeek through a single Modelflare API key on a pay-per-token basis.

**Why now:** The repo gained 1,172 stars this week as builders look for self-hosted alternatives to Grok Bot, OpenAI dots, and Claude Duet while those products remain in closed access.

**Build with it:** Connect a Modelflare API key, point a bot's workspace at a project directory, and use the built-in file read/write and command execution tools to automate background tasks that surface approval prompts when the agent needs to act outside its sandbox.

## 10. elder-plinius/L1B3RT4S <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/elder-plinius/L1B3RT4S · ★ 23059 (+956 this week) · 1337, adversarial-attacks, ai, ai-jailbreak, ai-liberation, artificial-intelligence, cybersecurity, hack, hacking, jailbreak, liberation, llm, offsec, prompts, red-teaming, roleplay, scenario

_[brief unavailable]_
