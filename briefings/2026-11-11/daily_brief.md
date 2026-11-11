# AI Tastemakers — Daily Brief — 2026-11-11

_Ranking: delta_7d · 10 repos · generated 2026-11-11T21:50:32.945Z_


## 1. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 146120 (+3753 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphify, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify turns a codebase, its docs, SQL schemas, configs, and PDFs into a queryable knowledge graph using deterministic AST parsing via tree-sitter (a syntax-analysis library), with every graph edge explained and no vector store required.

**Why now:** The repo picked up 3,753 stars this week and is trending on Trendshift, riding active developer interest in MCP (model context protocol) and GraphRAG (graph-based retrieval-augmented generation).

**Build with it:** Install the `graphifyy` PyPI package, register it as a `/graphify` skill in Claude Code or Cursor, and query your codebase's dependency graph directly from your existing AI coding workflow.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 452516 (+22009 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server that lets AI agents reverse engineer binaries, apps, and runtime behavior without source code, down to the native binary level.

**Why now:** The repo is gaining roughly 22,000 stars per week, a signal of fast uptake across security research and AI-agent developer communities.

**Build with it:** Run `npx rea-agents setup` to connect REA to any MCP-compatible agent such as Claude Code, then point it at a closed-source app feature you want to inspect or replicate.

## 3. ccch1mneyyy/dsh-Go

https://github.com/ccch1mneyyy/dsh-Go · ★ 19672 (+10317 this week) · ai-agent, android, android-app, coding-agent, deepseek, deepseek-harness, dsh, dsh-plugin, dsh-tui, flutter, llm

**What it does:** DSH Go is a Flutter/Dart Android client (Android 8+) that runs DeepSeek Harness locally on your phone or remotely controls a desktop DSH instance, with animated desktop-pet companions that show agent state: typing, done, waiting for confirmation, or idle.

**Why now:** The repo gained over 10,000 stars this week and hit Trendshift's top daily rank across all languages, reflecting a sharp spike in community adoption.

**Build with it:** Install the arm64 APK from GitHub Releases, point it at an existing DSH session on your desktop, and use it as a mobile approval interface for agent tool-call confirmations.

## 4. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 69970 (+9329 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency dsh plugin that exposes frontier LLMs including DeepSeek V4.1 Flash and Kimi K3 through the OpenCode Zen and Kilo AI public gateways, with no login, API key, or build step needed.

**Why now:** The repo hit number one on both Trendshift's daily and JavaScript weekly charts for the week of 2026-10-05 to 2026-10-11, reflecting sharp builder interest in no-credential model access.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL and key to route requests through the free model pool without touching upstream credentials.

## 5. milind-soni/OpenMausBot

https://github.com/milind-soni/OpenMausBot · ★ 21201 (+9208 this week) · ai-agents, claude-code, codex, computer-use, docker, electron, grok, grok-bot, grok-bot-alternative, self-hosted, typescript

**What it does:** OpenMausBot is an Electron desktop app for Mac, Windows, and Ubuntu that runs a sidebar of independent AI agents, each with its own personality, model (Claude or Codex), and sandboxed cloud computer, all controlled through a chat interface.

**Why now:** The repo gained over 9,000 stars this week, tracking builder interest in self-hosted alternatives to closed agent UIs like Grok Bot and Cue by Manus.

**Build with it:** Wire in your own Claude or Codex API key, assign it to a new bot persona, and use the built-in approval workflow to control which tool calls the agent can execute autonomously.

## 6. rddmwmddr/android-ad-cleaner

https://github.com/rddmwmddr/android-ad-cleaner · ★ 7544 (+1241 this week) · adb, ai-agent, android, coloros, debloat, hyperos, magicos, originos

**What it does:** A desktop and Android app that uses ADB commands, with no root required, to disable ads, hot-search feeds, marketing notifications, and ad SDK packages on Chinese Android ROMs including MIUI, ColorOS, OriginOS, and MagicOS.

**Why now:** The project gained 1,241 stars this week alongside the v0.4.3 release, which fixes a crash-on-launch bug from v0.4.2 and adds in-app update delivery for the Android client.

**Build with it:** Use the ADB-based `pm suspend` command surface in the existing scripts to add new ad package identifiers to the brand-specific config files for ROMs not yet covered.

## 7. Imbad0202/academic-research-skills

https://github.com/Imbad0202/academic-research-skills · ★ 56524 (+1158 this week) · academic-pipeline, academic-writing, ai-research, claude, claude-code, literature-review, peer-review, prompt-engineering

**What it does:** Academic Research Skills is a Claude Code plugin suite that walks researchers through a full paper pipeline, from literature review to final submission, with human-confirmation gates at every stage to block hallucinated citations and fabricated methodology.

**Why now:** The repo gained over 1,100 stars this week, coinciding with active concern around citation hallucination, including a May 2026 audit of 111 million references that flagged nearly 147,000 hallucinated citations in 2025 papers alone.

**Build with it:** Run `/plugin marketplace add Imbad0202/academic-research-skills` in Claude Code v3.7.0 or later, then use `/ars-plan` to test the Socratic paper-structuring flow against your own draft.

## 8. vercel-labs/agent-desktop

https://github.com/vercel-labs/agent-desktop · ★ 22005 (+7191 this week) · accessibility, accessibility-api, ai-agents, automation, cli, computer-use, computer-use-agent, computer-use-agents, desktop-automation, macos, mcp, rust

**What it does:** `agent-desktop` reads the OS accessibility tree of macOS, Windows, and Linux apps and exposes every interactive element as a JSON reference that an AI agent can click or type on, skipping screenshots and pixel matching entirely.

**Why now:** The repo gained over 7,000 stars this week, tracking a surge of builder interest in accessibility-tree-based computer control as a lighter alternative to vision-model approaches.

**Build with it:** Run `agent-desktop snapshot --app <YourApp> -i` to feed structured UI references into an LLM agent loop, then use the returned `ref_id` values as action targets via `agent-desktop click`.

## 9. OpenMontageInc/OpenMontage <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/OpenMontageInc/OpenMontage · ★ 79678 (+1077 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system where an AI coding assistant handles the full pipeline from scripting and asset generation to timeline editing and final render, using real motion clips from stock footage or AI video models rather than animated stills.

**Why now:** The repo hit number 1 on GitHub Trending this week, putting its 12 production pipelines and over 100 tools in front of a broad builder audience for the first time.

**Build with it:** Point your Cursor or Claude agent at a prompt and run one of the built-in pipelines, such as the Kling v3 animated short workflow via fal.ai, to get a rendered Remotion composition without writing custom glue code.

## 10. elder-plinius/CL4R1T4S

https://github.com/elder-plinius/CL4R1T4S · ★ 52449 (+1014 this week) · agents, ai, chatgpt, gemini, google, grok, hacking, leak, leaked, openai, prompt, prompt-engineering, prompts, red-team, red-teaming, system, system-info, system-prompts, tools, transparency

**What it does:** CL4R1T4S is a crowd-sourced collection of extracted system prompts and guidelines from major AI products including ChatGPT, Claude, Gemini, Grok, Cursor, and Devin, making visible the hidden instructions that shape their behavior.

**Why now:** The repo is gaining over 1,000 stars this week, reflecting a spike in developer interest around auditing AI behavior before shipping integrations.

**Build with it:** Pull the system prompt for whichever AI tool your product integrates, then diff it against your own assumptions to find undocumented refusals or behavioral constraints before they surprise users in production.
