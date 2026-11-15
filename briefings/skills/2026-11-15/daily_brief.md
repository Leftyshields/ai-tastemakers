# Skill Tastemakers — Daily Brief — 2026-11-15

_Ranking: delta_7d · 10 repos · generated 2026-11-15T20:19:40.325Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 461659 (+18411 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a tool-calling layer for AI agents) that lets agents reverse engineer closed binaries, apps, and runtime behavior down to the native instruction level, no source code required.

**Why now:** The project hit Hacker News this week with 101 points and an active thread focused on its MCP-based approach to agent-driven binary analysis.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent, then point it at a closed app to extract and explain how a specific feature works.

## 2. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 154613 (+1875 this week) · ai-tools, claude-code, codex, deepseek-harness, desktop-app, grok, grokbuild, hermes, kimi-code, mcp, open-source, opencode, pi, provider-management, rust, skills, skills-management, tauri, wsl-support

**What it does:** CC Switch is a cross-platform Tauri desktop app that lets developers switch between AI coding API providers (Claude Code, Codex, Gemini CLI, Grok Build, and others) with one click, and manage MCP servers, Skills, and Prompts without hand-editing JSON, TOML, or YAML config files.

**Why now:** The project hit Hacker News this week and is trending on Trendshift for Rust repositories, drawing fresh builder attention at a moment when switching between providers is a real daily friction.

**Build with it:** Point CC Switch at your existing Claude Code config and use the MCP manager UI to add or swap MCP servers across providers without touching the underlying JSON directly.

## 3. herdrdev/herdr

https://github.com/herdrdev/herdr · ★ 51161 (+1786 this week) · agent, agent-orchestration, ai, ai-agents, claude-code, cli, codex, coding-agents, developer-tools, devtools, multiplexer, rust, terminal, terminal-multiplexer, terminal-ui, tmux, tui, workspace-manager

**What it does:** Herdr is a Rust terminal multiplexer built for coding agents, keeping agent sessions alive in a background server across SSH disconnects and showing per-pane status (working, blocked, or idle) so you always know which agent needs attention.

**Why now:** A native app release drew 368 points and 271 comments on Hacker News this week, putting Herdr in front of a large builder audience actively evaluating agent runtimes.

**Build with it:** Launch your Claude Code or Codex workflow inside a Herdr pane and use the socket API to let the agent spawn sub-panes or poll for blocked status without changing the agent itself.

## 4. arjun988/blender-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/arjun988/blender-skills · ★ 3634 (+1400 this week) · 3d-models, agent, agent-skills, blender, blender-addon, blender-mcp, claude-code, claude-skills, cursor-ai, game-development, mcp

**What it does:** A pack of 94 specialist skills for Cursor, Claude Code, Kiro, and Codex that routes Blender tasks through a `blender-director` orchestrator and executes them via Blender MCP, covering modeling, retopology, UV, materials, rigging, and export pipelines.

**Why now:** The repo gained 1,400 stars this week while its Anthropic marketplace listing is still under review, making direct GitHub install the only current path and signaling active builder interest before the official release.

**Build with it:** Clone the repo, copy `.claude/skills/` into your project's `.claude/skills/` directory, then prompt Claude Code with a game-asset spec like "3k tri sci-fi rifle for Unreal, realistic PBR" to test the full director-to-export routing loop.

## 5. kajisho5/ffmpeg-skill

https://github.com/kajisho5/ffmpeg-skill · ★ 5931 (+1117 this week) · agent-skills, ai-agents, audio-processing, captions, claude-code, codex, coding-agent, cursor, ffmpeg, gemini-cli-extension, loudness-normalization, mcp, mcp-server, model-context-protocol, python, subtitles, transcoding, video, video-editing, whisper

**What it does:** ffmpeg-skill gives coding agents (Claude Code, Cursor, Codex) a local video editor by exposing 42 FFmpeg tools covering cut, captions, reframe, loudness, and platform export, through both a machine-readable `SKILL.md` contract and an MCP server with no cloud dependency.

**Why now:** The repo gained over 1,100 stars this week, coinciding with broader adoption of MCP as a standard tool-calling layer for coding agents.

**Build with it:** Run `npx ffmpeg-skill` to start the MCP server, then point Claude Code or Cursor at it to let the agent probe, edit, and verify local video files end-to-end using the core 12 advertised tools.

## 6. obsidianmd/obsidian-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/obsidianmd/obsidian-skills · ★ 52798 (+1099 this week) · agents, agentskills, bases, chatgpt, claude, claude-code, claude-skills, cli, codex, defuddle, grok-bot, hermes, jsoncanvas, knap, markdown, md, obsidian, openclaw, opencode, skills

**What it does:** obsidian-skills packages Obsidian's core file formats (Markdown, Bases, JSON Canvas) and CLI access as Agent Skills so any compatible agent (Claude Code, Codex, OpenCode) can read and write Obsidian vault files directly.

**Why now:** The repo gained over 1,000 stars this week, likely tied to growing adoption of agent skill frameworks across Claude Code and Codex toolchains.

**Build with it:** Run `npx skills add https://github.com/obsidianmd/obsidian-skills` in your vault root, then prompt Claude Code to generate or update `.base` files using the obsidian-bases skill.

## 7. Ryze-AI-Adgent/open-seo-mcp-skills

https://github.com/Ryze-AI-Adgent/open-seo-mcp-skills · ★ 9959 (+1000 this week) · ai-seo, ai-visibility, backlinks, claude, claude-code, claude-skills, dataforseo, generative-engine-optimization, geo, geo-mcp, keyword-research, llm-seo, mcp, mcp-server, open-source-seo, rank-tracking, seo, seo-audit, seo-mcp, seo-mcp-server

**What it does:** Open-source Claude skills that run SEO audits, keyword research, rank tracking, backlink checks, and AI-visibility reports against your actual Google Search Console, GA4, and Google Ads data via a free MCP server, with DataForSEO wired in for competitor gaps and SERPs.

**Why now:** The repo gained roughly 1,000 stars this week at a moment when most competing open-source SEO tools still charge a markup on every DataForSEO API call, and MCP-based Claude tooling is seeing rapid adoption.

**Build with it:** Run `claude plugin marketplace add Ryze-AI-Adgent/open-seo-mcp-skills` inside Claude Code, connect your GSC account through the Ryze connector, then invoke `seo-audit` on your domain to surface indexation anomalies and CTR decays from real position data.

## 8. mattpocock/skills

https://github.com/mattpocock/skills · ★ 325027 (+6637 this week) · —

**What it does:** A collection of small, composable agent skills for Claude Code, Codex, Copilot, and other coding agents, designed to give engineers fine-grained control over planning, triaging, and spec workflows without handing the process entirely to the agent.

**Why now:** The repo gained over 6,600 stars this week, reflecting a sharp surge in interest around structured, deliberate agent workflows as an alternative to full autonomous coding.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to drop editable skill files into an existing Cursor project, then invoke `/setup-matt-pocock-skills` to wire in your issue tracker and label config.

## 9. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 111254 (+6511 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a fully local, open-source alternative to ElevenLabs that handles voice cloning, video dubbing, transcription, dictation, and audiobook creation across 646 languages, running on laptops, phones, and servers.

**Why now:** The repo gained over 6,500 stars this week, making it worth evaluating before the local TTS ecosystem consolidates around a handful of dominant tools.

**Build with it:** Point the dubbing workflow at a local video file to test cross-language voice cloning without sending any audio to an external API.

## 10. stablyai/orca

https://github.com/stablyai/orca · ★ 125662 (+6501 this week) · agent-ide, ai-agents, automation, bot, claude-code, codex, ghostty, grok-bot, hermes-agent, mobile-app, muse, openclaw, opencode, orchestration, pi, runtime, swarm, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop, mobile, and remote app that runs multiple coding agents (Claude Code, Codex, and others) in parallel across isolated git worktrees, with chat and terminal interfaces in one window.

**Why now:** The repo gained over 6,500 stars this week as Claude Code and Codex usage accelerates and teams start hitting the limits of single-agent, single-branch workflows.

**Build with it:** Point Orca at an existing repo, hand a large feature to a coordinator agent, and let it spin up worker agents in separate worktrees to tackle subtasks concurrently using the built-in orchestration mode.
