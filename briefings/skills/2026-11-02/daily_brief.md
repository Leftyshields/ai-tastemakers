# Skill Tastemakers — Daily Brief — 2026-11-02

_Ranking: delta_7d · 10 repos · generated 2026-11-02T23:06:41.848Z_


## 1. thedotmack/claude-mem

https://github.com/thedotmack/claude-mem · ★ 110688 (+7324 this week) · ai, ai-agents, ai-memory, anthropic, artificial-intelligence, chromadb, claude, claude-agent-sdk, claude-agents, claude-code, claude-code-plugin, claude-skills, embeddings, long-term-memory, mem0, memory-engine, openmemory, rag, sqlite, supermemory

**What it does:** claude-mem is a persistent memory layer for AI coding agents that captures session activity, compresses it with AI, and injects relevant context back into future sessions across Claude Code, Codex, Copilot, and similar tools.

**Why now:** An active GitHub issue flagged by HN users warns that installation silently uploads 30 days of prompts to cmem.ai, making this a live privacy risk worth investigating before adopting.

**Build with it:** Drop claude-mem into an existing Claude Code project as a plugin and measure whether injected session context cuts the time spent re-explaining your codebase across multi-day tasks.

## 2. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 295622 (+5976 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is a configuration harness for AI coding agents, layering skills, memory, instincts, and security controls on top of tools like Claude Code, Codex, and Cursor via npm packages and shell config.

**Why now:** The project surfaced on Hacker News this week billed as "the operating system for AI harnesses" and picked up nearly 6,000 stars in seven days.

**Build with it:** Install `ecc-universal` from npm, drop it into an existing Claude Code or Cursor project, and test whether the added configuration layer measurably changes agent output quality on your codebase.

## 3. morluto/rea

https://github.com/morluto/rea · ★ 422721 (+32034 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a Model Context Protocol (MCP) server, a standard interface for connecting AI agents to external tools, that gives agents the ability to inspect native binaries, JavaScript and Electron apps, .NET assemblies, and websites without access to source code.

**Why now:** A Hacker News thread this week drew 101 points and 39 comments on the project, reflecting genuine builder interest in agent-driven reverse engineering workflows.

**Build with it:** Run `npx rea-agents setup` to wire REA into your agent as an MCP tool, then prompt it to inspect a closed-source app feature and return findings you can use to guide your own implementation.

## 4. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 108063 (+4750 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that lets AI agents read and search Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without API keys or login walls, returning clean structured data.

**Why now:** The repo hit GitHub Trending number one this week and gained over 4,750 stars, driven by builders who want to give local agents like Claude Code and Cursor live internet access without paid API subscriptions.

**Build with it:** Wire it into a Cursor or Claude Code workflow via its MCP integration to give your coding agent real-time web search and page-read capabilities in a single config step.

## 5. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 75277 (+3139 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source, agent-driven video production system that gives AI coding assistants 12 production pipelines and 100-plus tools to handle scripting, asset generation, editing, and final composition via Remotion (a code-based video renderer) from a plain-language prompt.

**Why now:** The repo hit number one on GitHub Trending this week and peaked at 75,000-plus stars, fueled by demos showing full motion-clip pipelines rendered for under $2 using Kling v3 via fal.ai.

**Build with it:** Point your Cursor or Claude agent at the repo, pick the stock-footage pipeline, and let it pull free archive clips, assemble a timeline, and render a finished video through Remotion without writing any ffmpeg commands yourself.

## 6. patch-gg/pixelfx <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/patch-gg/pixelfx · ★ 3463 (+2212 this week) · agent-skills, animation, canvas, claude-code-plugin, gamedev, pixel-art, sprite-sheet, vfx

**What it does:** pixelfx is a library of 244 JavaScript pixel art effects, covering fire, lightning, melee, weather, UI, and more, where each effect is a single self-contained file you can import into any canvas-based game engine.

**Why now:** The repo gained 2,212 stars this week, likely tied to its Claude Code skill, which lets the AI agent draft, render, and refine new pixel art effects in the style of the existing library.

**Build with it:** Import a specific effect via `pixelfx/fx/<category>/<name>` into a Phaser or Kaplay project and call `composite()` on your canvas to drop the animation in with no additional dependencies.

## 7. haydenschmitty/floorplan <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/haydenschmitty/floorplan · ★ 2226 (+1855 this week) · ai-coding, architecture-diagram, claude, claude-code, claude-code-plugin, codebase-visualization, codex, codex-plugin, developer-tools, onboarding, openai, vibe-coding

**What it does:** Floorplan is a Claude Code and Codex plugin that reads your codebase and generates an interactive, zoomable map of every component, file, and HTTP endpoint, with plain-English names and drawn connections between them.

**Why now:** The repo gained 1,855 stars this week as a Claude Code plugin at a moment when vibe-coded apps are increasingly common but their internal structure stays opaque to the people who built them.

**Build with it:** Install it as a Claude Code plugin, run a floorplan generation on an existing project, and get an explorable map that updates to show which parts Claude touched after each subsequent code change.

## 8. Gathin23/cleanyourtv

https://github.com/Gathin23/cleanyourtv · ★ 50385 (+11665 this week) · adb, adblock, android-tv, android-tv-launcher, apple-tv, bloatware-removal, claude-code, debloat, fire-tv, google-tv, launcher, privacy, smart-tv, sony-bravia, tcl, vibe-coding, xiaomi

**What it does:** CleanYourTV uses ADB over Wi-Fi to disable bloatware and swap the stock Android TV or Google TV home screen for a minimal, Apple TV-style launcher, with no root access and no cables required.

**Why now:** The repo hit number one on GitHub Trending this week with over 11,000 new stars, after coverage across TechCrunch, Tom's Guide, Android Authority, and 400-plus articles from 54 countries.

**Build with it:** Fork the Python codebase, extend the ADB package blocklist to target a specific TV brand, and test against the 420 supported device models listed in the project's compatibility surface.

## 9. pbakaus/impeccable

https://github.com/pbakaus/impeccable · ★ 100415 (+11481 this week) · agent-skills, ai, anti-slop, design, slop

**What it does:** Impeccable installs slash-commands into coding agents like Claude Code, Cursor, and Codex to steer UI design with moves like `bolder` and `quieter`, review with `critique` and `audit`, and flag AI-default patterns such as Inter-for-everything and purple-to-blue gradients using 62 deterministic, no-API rules.

**Why now:** The repo crossed 100,000 stars this week, reflecting a surge of builders burned by generic agent-generated UI reaching production.

**Build with it:** Run `npx impeccable install` in an existing project, then fire `/impeccable audit` on one component to get ranked P0-to-P3 findings before your next pull request.

## 10. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 98996 (+10219 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a fully local, open-source alternative to ElevenLabs covering voice cloning, video dubbing, transcription, and audiobook creation across 646 languages, running on laptops, phones, and servers without any external API calls.

**Why now:** The repo gained over 10,000 stars this week, and evaluating it now means getting ahead of the wrapper and integration ecosystem before it locks in around particular usage patterns.

**Build with it:** Point VoiceStudio at a short audio sample and use its voice-cloning workflow to generate narration for a local audiobook pipeline, keeping all audio processing on your own hardware.
