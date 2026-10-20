# Skill Tastemakers — Daily Brief — 2026-10-20

_Ranking: delta_7d · 10 repos · generated 2026-10-20T17:59:58.662Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 345980 (+193570 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a Model Context Protocol (MCP) server — a standardized way to give AI agents access to external tools — that wires agents into Hopper, Ghidra, and built-in analyzers so they can inspect native binaries, Electron apps, .NET assemblies, and websites without source code.

**Why now:** A Hacker News thread this week pulled 99 points and 38 comments, a reliable signal that builders are actively experimenting with agent-driven binary analysis rather than just theorizing about it.

**Build with it:** Run `npx rea-agents setup` to register REA with your agent, then prompt it to analyze a closed-source app feature and return decompiled evidence alongside a working reimplementation.

## 2. Gathin23/cleanyourtv <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Gathin23/cleanyourtv · ★ 10611 (+6091 this week) · adb, adblock, android-tv, android-tv-launcher, apple-tv, bloatware-removal, claude-code, debloat, fire-tv, google-tv, launcher, privacy, smart-tv, sony-bravia, tcl, vibe-coding, xiaomi

**What it does:** CleanYourTV sends ADB commands over Wi-Fi to disable bloatware and ad-serving packages on Android TV and Google TV, then sideloads a 390 KB Java launcher that swaps the default home screen for an Apple TV-style interface — no root or USB cable required.

**Why now:** TechCrunch, XDA, Android Authority, and others covered it this week as a showcase of AI-assisted "vibe coding" for TV debloating, driving a 6,000+ star spike in days.

**Build with it:** Fork the repo, add your TV model's package list to the `examples/` directory using any of the existing 107 model files as a template, and submit a PR to extend device coverage.

## 3. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 78867 (+3159 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted, MIT-licensed AI gateway that funnels requests to 375 providers — including 150+ free tiers — through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression cutting token usage by 15–95%.

**Why now:** The repo gained 3,159 stars this week as free-tier limits tighten across major AI providers, making a fallback router meaningfully useful rather than just convenient.

**Build with it:** Point your Claude Code or Cursor config at OmniRoute's local endpoint and let quota-aware fallback cycle through free-tier providers automatically when limits are hit.

## 4. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 78627 (+18365 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a fully local Electron + Python desktop app covering voice cloning, video dubbing, dictation, transcription, and audiobook creation across 646 languages, with OmniVoice as its default engine — a self-hosted alternative to ElevenLabs.

**Why now:** The repo gained 18,365 stars this week, a spike that tracks directly with builder demand for on-device audio processing that keeps sensitive audio off third-party servers.

**Build with it:** Point its local API or MCP interface at an agent pipeline to add on-device TTS or transcription without routing audio through a third-party service.

## 5. blader/humanizer

https://github.com/blader/humanizer · ★ 58813 (+2633 this week) · agent-skills, ai-humanizer, ai-writing, chatgpt, claude, claude-code, codex, cursor, humanize-ai-text, humanizer, llm, prompt-engineering, writing-tools

**What it does:** Humanizer is an agent skill that rewrites AI-generated text by detecting and stripping 26 specific patterns — things like "not X but Y" constructions, one-line closers, and staged run-ups — drawn from Wikipedia's Signs of AI Writing guide.

**Why now:** The repo gained 2,633 stars this week as post-processing AI-written copy becomes a real production concern rather than an academic one.

**Build with it:** Drop it into Claude Code via `/plugin marketplace add blader/humanizer` and pipe your content through `/humanizer docs/launch-post.md` to add a humanization step to any AI-assisted writing workflow.

## 6. MadsLorentzen/ai-job-search

https://github.com/MadsLorentzen/ai-job-search · ★ 59934 (+13574 this week) · ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume

**What it does:** A Claude Code–based CLI framework that scrapes job portals, scores fit against your profile, and runs a drafter-reviewer agent pipeline to produce tailored LaTeX CVs and cover letters.

**Why now:** The repo gained 13,574 stars this week — worth evaluating now before the community standardizes around specific job boards and the scraping layer becomes more opinionated.

**Build with it:** Fork the repo, fill in your `profile` files, and swap the Danish job-portal scrape commands in `/scrape` for your local boards to validate the fit-scoring and application pipeline on your own market.

## 7. wheresryan22/anatomy

https://github.com/wheresryan22/anatomy · ★ 17446 (+11437 this week) · agent-skill, open-source, svg, vizualization

**What it does:** Anatomy is a skill for Claude Code and compatible coding agents (Antigravity, OpenCode, Codex, MiniMax Code) that takes a technical concept and generates a detailed, interactive isometric SVG illustration of a physical object whose mechanics embody that concept, with optional WebGL shaders.

**Why now:** The repo crossed 11,000 stars this week, riding the broader adoption of Claude Code's skill ecosystem as builders wire agents into documentation and technical writing workflows.

**Build with it:** Run `npx skills add wheresryan22/anatomy -g`, then invoke `/anatomy explain how a [your system] works, interactive` inside Claude Code to drop a self-contained, interactive SVG figure directly into your project docs.

## 8. mattpocock/skills

https://github.com/mattpocock/skills · ★ 298422 (+10582 this week) · —

**What it does:** A collection of small, composable agent skill files for Claude Code, Codex, Copilot, and other coding agents — covering issue triage, spec writing, and ticket tracking — that enforce structured engineering workflows without letting the AI own the process.

**Why now:** The repo crossed 298K stars with over 10K added this week, likely driven by builder frustration with open-ended "vibe coding" approaches like BMAD and GSD that offer little process guardrails.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` in an existing project, then execute `/setup-matt-pocock-skills` once to wire in your issue tracker and label conventions.

## 9. headroomlabs-ai/headroom

https://github.com/headroomlabs-ai/headroom · ★ 76634 (+1496 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom compresses tool outputs, logs, RAG chunks, and conversation history locally before they reach the LLM, available as a Python/TypeScript library, an OpenAI-compatible proxy, or a one-command wrap for Claude, Codex, Cursor, and others.

**Why now:** The repo hit #1 Repository of the Day on Trendshift and added nearly 1,500 stars this week — early enough that the compression benchmarks haven't been stress-tested across many real workloads yet.

**Build with it:** Drop `headroom proxy --port 8787` in front of your existing OpenAI-compatible agent and measure token reduction with zero code changes.

## 10. stablyai/orca

https://github.com/stablyai/orca · ★ 99453 (+8837 this week) · ade, agent-ide, ai-agents, automation, bot, claude-code, codex, ghostty, grok-bot, hermes-agent, mobile-app, muse, openclaw, opencode, orchestration, pi, runtime, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop and mobile shell that runs multiple coding agents — Codex, Claude Code, OpenCode, Grok Bot — in parallel git worktrees (isolated copies of your repo), letting you compare outputs side by side and merge the winner from one interface.

**Why now:** The repo gained 8,837 stars this week, timing that tracks directly with Codex's public rollout and the scramble to wire multiple coding agents into a coherent single workflow.

**Build with it:** Point Orca at an existing repo, fan one prompt across three agents in isolated worktrees, and diff the resulting branches to pick the best implementation without manual branch juggling.
