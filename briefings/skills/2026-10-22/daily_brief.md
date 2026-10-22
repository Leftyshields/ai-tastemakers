# Skill Tastemakers — Daily Brief — 2026-10-22

_Ranking: delta_7d · 10 repos · generated 2026-10-22T18:00:41.160Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 364584 (+99614 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is an MCP (Model Context Protocol) server — a standardized way to give AI agents access to external tools — that lets agents reverse-engineer native binaries, Electron/JS apps, .NET assemblies, and websites locally, using Hopper or Ghidra as the disassembly backend.

**Why now:** A Hacker News thread this week hit 100 points and 38 comments, with builders actively discussing agent-driven binary inspection as a real workflow rather than a toy.

**Build with it:** Run `npx rea-agents setup` to register REA with Claude Code, Codex, or similar, then prompt your agent to analyze a closed-source feature and return decompiled evidence alongside a working reimplementation.

## 2. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 132679 (+5862 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphify, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses a codebase — plus docs, SQL schemas, configs, and PDFs — into a queryable knowledge graph using deterministic AST parsing via tree-sitter (no vector store, no embeddings, every edge explained).

**Why now:** The repo is trending on HN this week specifically around cutting token usage with Claude Code, which matters as agentic coding tools like Claude Code, Cursor, and Codex become daily drivers with real cost profiles.

**Build with it:** Install the `graphifyy` PyPI package, add a `/graphify` skill to Claude Code or Cursor, and let your agent query the repo's knowledge graph instead of pasting raw source files into context.

## 3. msitarzewski/agency-agents

https://github.com/msitarzewski/agency-agents · ★ 163193 (+2909 this week) · —

**What it does:** Agency Agents is a collection of AI agent persona files — frontend developer, Reddit ninja, whimsy injector, and others — that install into Claude Code, Cursor, or Gemini CLI to give a session a defined role, workflow, and output style.

**Why now:** The repo crossed 163K stars this week and shipped a native desktop app for macOS, Linux, and Windows that lets you browse the roster and install agents into supported tools without cloning or scripting.

**Build with it:** Copy a single `.md` from the `engineering/` folder into `~/.claude/agents/`, invoke it by name in a Claude Code session, and see whether persona-scoped context tightens output for your specific task.

## 4. Gathin23/cleanyourtv

https://github.com/Gathin23/cleanyourtv · ★ 23174 (+18654 this week) · adb, adblock, android-tv, android-tv-launcher, apple-tv, bloatware-removal, claude-code, debloat, fire-tv, google-tv, launcher, privacy, smart-tv, sony-bravia, tcl, vibe-coding, xiaomi

**What it does:** CleanYourTV uses ADB over Wi-Fi — Android's built-in debugging bridge, no root required — to disable manufacturer telemetry, ad services, and bloatware on Android/Google TV devices via `pm disable-user`, then installs a 471 KB native launcher as the default home screen, with a one-line restore if you want to undo everything.

**Why now:** A before/after tweet on 17 October 2026 hit 7.4M views, pulling in 200+ contributors who documented 170+ TV models in four days and earning coverage in TechCrunch, Tom's Guide, and 83 other outlets.

**Build with it:** Fork the brand-specific disable lists, add your TV model's package names via `adb shell pm list packages`, and submit a PR to extend the 232-model compatibility table.

## 5. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 81493 (+13003 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a local-first, open-source Electron + Python desktop app covering voice cloning, voice design, video dubbing, dictation, transcription, and audiobook generation across 646 languages, with swappable backends including k2-fsa/OmniVoice.

**Why now:** The repo gained 13,000 stars this week — a sharp enough spike that it's worth evaluating now as a self-hosted ElevenLabs alternative before community forks diverge.

**Build with it:** Point the local API or MCP endpoint at an existing agent pipeline to add cloned-voice TTS output without touching a third-party billing account.

## 6. ChromeDevTools/chrome-devtools-mcp

https://github.com/ChromeDevTools/chrome-devtools-mcp · ★ 53992 (+10954 this week) · browser, chrome, chrome-devtools, debugging, devtools, mcp, mcp-server, puppeteer

**What it does:** `chrome-devtools-mcp` is an MCP server that lets coding agents — Claude, Cursor, Copilot — control a live Chrome browser via Puppeteer and the Chrome DevTools Protocol, covering automation, network inspection, console debugging with source-mapped traces, and performance profiling.

**Why now:** The repo gained nearly 11,000 stars this week, and it carries the ChromeDevTools org name, which signals this is closer to an official integration than a community experiment.

**Build with it:** Drop the `npx -y chrome-devtools-mcp@latest` config block into your MCP client's `mcpServers` section, then let your agent record a DevTools performance trace against a local dev server to catch rendering bottlenecks.

## 7. stablyai/orca

https://github.com/stablyai/orca · ★ 102548 (+9315 this week) · ade, agent-ide, ai-agents, automation, bot, claude-code, codex, ghostty, grok-bot, hermes-agent, mobile-app, muse, openclaw, opencode, orchestration, pi, runtime, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop and mobile orchestrator that runs multiple coding agents — Codex, Claude Code, OpenCode, Grok Bot — in parallel git worktrees, so you can fan a single prompt across agents, compare outputs side by side, and merge the winner.

**Why now:** The repo gained 9,315 stars this week at its public GitHub launch, a YC-backed release that also shipped iOS and Android companion apps for monitoring and steering agents remotely.

**Build with it:** Point Orca at an existing repo, send one bug-fix prompt to three agents simultaneously via parallel worktrees, then diff and cherry-pick the winning branch directly from the Orca UI.

## 8. citrolabs/ego-lite

https://github.com/citrolabs/ego-lite · ★ 18777 (+1336 this week) · agent-skills, ai-agent, automation, browser, browser-automation, claude-code, codex, hermes-agent, skills, skills-sh

**What it does:** ego lite is a macOS/Windows desktop browser that runs AI agent automation in isolated "Spaces," letting agents like Codex or Claude Code use your real logged-in sessions without touching your main browser.

**Why now:** The repo gained 1,336 stars this week and is ranking on GitHub trending via Trendshift, reflecting a concentrated spike in interest around agentic browser tooling.

**Build with it:** Point Claude Code or Codex at `ego-browser` to hit authenticated tabs directly — no credential handoff, no Playwright bridge, no extra configuration.

## 9. gamedev-skills/awesome-gamedev-agent-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/gamedev-skills/awesome-gamedev-agent-skills · ★ 2869 (+1333 this week) · agent-skills, ai-agents, antigravity, awesome-list, claude-code, cline, codex, cursor, game-dev, game-development, gamedev, gemini-cli, github-copilot, godot, kiro, oh-my-pi, skills, unity, unreal, windsurf

**What it does:** A collection of 74 versioned `SKILL.md` files — structured context files that tell an AI agent how to handle a specific task — covering Godot, Unity, Unreal, Phaser, Bevy, and six other engines, with a router that auto-detects your engine and task and loads only the relevant files before your agent writes code.

**Why now:** The repo gained 1,333 stars this week, riding the broader adoption of agent-skill formats after Anthropic's Claude Skills launch, with explicit support for Kiro, Gemini CLI, Codex, and Copilot.

**Build with it:** Run `npx skills add gamedev-skills/awesome-gamedev-agent-skills` in an existing game project, then describe a task in plain language — "add a double jump to my Godot player" — and let the router load the matching skill files automatically.

## 10. latent-spaces/brag

https://github.com/latent-spaces/brag · ★ 17431 (+1325 this week) · agent-skills, claude-code, claude-skills, hyperframes, launch-video, video-generation

**What it does:** `/brag` is an agent skill — a structured prompt file that extends Claude Code's capabilities — that takes any project you've built and generates a 20-second shareable launch video with music, motion, and share copy via one command, with a leaner `/brag-slim` path for Claude Opus 4.5 that drops the Hyperframes dependency.

**Why now:** The repo crossed 17K stars this week with 1,325 added in the last seven days, coinciding with the `/brag-slim` release targeting Opus 4.5.

**Build with it:** Install with `/plugin install brag@brag` inside any Claude Code project, then run `/brag --tone "..."` at ship time to generate a `brag-output/` folder ready to post.
