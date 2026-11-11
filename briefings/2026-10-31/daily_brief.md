# AI Tastemakers — Daily Brief — 2026-10-31

_Ranking: delta_7d · 10 repos · generated 2026-10-31T19:13:50.201Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 415017 (+38038 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is an MCP (Model Context Protocol) server that connects AI agents to tools for inspecting native binaries, JavaScript and Electron apps, .NET assemblies, and websites without source code, running all analysis locally.

**Why now:** The repo gained over 38,000 stars this week, a sharp signal of builder interest in agent-driven reverse engineering workflows.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent such as Claude Code, then have it inspect a closed app's binary to replicate a specific feature in your own codebase.

## 2. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 54222 (+13220 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-config plugin for dsh (DeepSeek Harness, an agentic coding framework) that adds access to frontier models including DeepSeek V4.1 Flash and Kimi K3 at no cost, with no login, API key, or usage cap, plus an OpenAI-compatible local forwarding port.

**Why now:** The repo hit number one on both the Trendshift daily chart and the JavaScript weekly chart for the week of 2026-10-05 to 2026-10-11, a sharp spike in builder attention.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL and key to route free model calls through your existing workflow without changing your client code.

## 3. Jakeschincariol/day-trader-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Jakeschincariol/day-trader-skill · ★ 3925 (+1345 this week) · backtesting, claude, claude-skills, day-trading, stock-market

**What it does:** A set of 11 Claude skills for day trading that chains chart scanning, news monitoring, entry timing, risk checks, and a 10,000-run Monte Carlo replay called the Time Machine through a shared `trader/` folder, with no order execution unless you explicitly approve it.

**Why now:** The repo gained 1,345 stars this week, worth evaluating before the pattern gets crowded.

**Build with it:** Drop a single `SKILL.md` into a chat (no Claude Code required) to run the Time Machine in isolation and validate its historical-replay odds against a setup you already trade.

## 4. JimLiu/baoyu-design <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/JimLiu/baoyu-design · ★ 5656 (+1201 this week) · agent-skills, claude, claude-code, claude-design, cursor, design, prototyping, ui-design

**What it does:** baoyu-design is a set of agent skills that bring claude.ai's Artifact types, including slide decks, design canvases, design systems, and dashboards, to local coding agents like Cursor, Claude Code, and Codex, generating editable file formats opened in local editor pages.

**Why now:** The repo gained over 1,200 stars this week, likely tied to growing adoption of Claude-based local agents and the release of skills targeting Opus 5.5.

**Build with it:** Drop the `claude-slides` skill into your Cursor project, prompt the agent to generate a `deck.json`, and iterate on slides directly in the local editor using the built-in comment-and-reply workflow.

## 5. ccch1mneyyy/dsh-Go <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ccch1mneyyy/dsh-Go · ★ 3527 (+1169 this week) · ai-agent, android, android-app, coding-agent, deepseek, deepseek-harness, dsh, dsh-plugin, dsh-tui, flutter, llm

**What it does:** DSH Go is an Android app (Flutter/Dart, Android 8+) that runs DeepSeek Harness, an agentic coding framework, locally on your phone or acts as a remote control for a desktop DSH instance.

**Why now:** The repo gained 1,169 stars this week, tracking a surge of interest in on-device DeepSeek agent tooling as the DSH ecosystem expands.

**Build with it:** Install the arm64 APK from GitHub Releases, point it at an existing DSH server over the network, and use the permission-prompt workflow to drive agentic coding tasks from your phone.

## 6. qybaihe/bla <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/qybaihe/bla · ★ 1686 (+1059 this week) · adversarial-ai, claude-code, cursor, electron-security, llm-security, mcp, mcp-server, obfuscation, reverse-engineering, webassembly

**What it does:** BLA (Blind LLM Agents) hardens compiled and bundled artifacts against AI reverse-engineering agents by injecting format-valid decoys, exhausting token budgets, and leaving analyzers with corrupted inventories, while keeping runtime behavior identical.

**Why now:** The repo gained over 1,000 stars this week, a sharp rise in developer interest around protecting shipped binaries from LLM-powered analysis tools like REA.

**Build with it:** Run `npx bla-agents harden .` in your project root to trigger the full audit, protect, and verify pipeline across `dist/`, `.asar`, `.wasm`, and other artifacts automatically.

## 7. agentscope-ai/QwenPaw <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/agentscope-ai/QwenPaw · ★ 37073 (+1033 this week) · agent, agent-harness, agentscope, ai-agent, ai-agents, chatbot, harness-engineering, llm-tools, llms, loop-engineering, mcp, personal-ai-assistant, self-hosted, skills, super-agent, webui

**What it does:** QwenPaw is a self-hosted personal AI assistant that supports multiple chat channels and extends its capabilities through Skills and Plugins, with local or cloud deployment.

**Why now:** The repo gained over 1,000 stars this week, a practical moment to evaluate it before integration patterns solidify.

**Build with it:** Wire a custom Skill into QwenPaw's plugin surface to expose an internal API as a chat-triggered command across your existing messaging channels.

## 8. JCodesMore/ai-website-cloner-template

https://github.com/JCodesMore/ai-website-cloner-template · ★ 38265 (+989 this week) · ai, ai-agents, ai-tools, automation, boilerplate, claude, claude-code, clone, developer-tools, nextjs, react, reverse-engineering, shadcn-ui, skills, tailwindcss, template, typescript, web-scraping, website-clone

**What it does:** A Next.js template that lets AI coding agents including Claude Code, Codex, and Cursor recreate any website as clean TypeScript/Tailwind code by running a single `/clone-website <url>` command.

**Why now:** The repo gained nearly 1,000 stars this week, a sharp spike in builder interest around agentic web-scraping workflows following broader Claude Code adoption.

**Build with it:** Point it at a competitor's landing page using the `/clone-website` slash command in Claude Code with Opus 4.5, then iterate on the output directly inside the same agent session.

## 9. router-for-me/CLIProxyAPI

https://github.com/router-for-me/CLIProxyAPI · ★ 57114 (+977 this week) · antigravity, claude-code, cluade, codex, devin, gemini, muse, openai

**What it does:** CLIProxyAPI is a Go proxy server that wraps Antigravity, Codex, Claude Code, Grok Build, and Kimi behind a unified OpenAI/Gemini/Claude-compatible API, letting you hit multiple CLI-tier accounts through any standard SDK.

**Why now:** The repo gained nearly 1,000 stars this week, coinciding with active model additions including Kimi K3 (a 2.8-trillion-parameter open model) and xAI Grok 4.7, making it a live target for builders chasing new frontier models without direct API billing.

**Build with it:** Point an existing OpenAI-SDK app at the local CLIProxyAPI endpoint and swap model strings to access Claude Fable 5.1 or Gemini 4 Argon through your Codex or Antigravity CLI account, with no API key purchase required.

## 10. linshenkx/prompt-optimizer

https://github.com/linshenkx/prompt-optimizer · ★ 40111 (+968 this week) · ai-prompts, ai-tools, llm, prompt, prompt-engineering, prompt-optimization, prompt-optimizer, prompt-testing, prompt-toolkit, prompt-tuning

**What it does:** Prompt Optimizer is a TypeScript tool that takes a rough AI prompt and iterates it through optimization, testing, and evaluation, producing a reusable, versioned prompt asset deployable across web, Chrome extension, Docker, or desktop.

**Why now:** The repo gained nearly 1,000 stars this week and landed on Trendshift's trending repositories list, a clear spike in builder interest.

**Build with it:** Deploy the Docker image, point it at your existing LLM API key, and use the variable-mode template system to turn one reusable prompt into context-swappable variants for different inputs.
