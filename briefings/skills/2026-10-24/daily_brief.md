# Skill Tastemakers — Daily Brief — 2026-10-24

_Ranking: delta_7d · 10 repos · generated 2026-10-24T16:36:39.081Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 376990 (+74001 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a TypeScript MCP (Model Context Protocol) server — a standardized bridge that lets AI agents like Claude and Codex talk to local tools — specifically wiring those agents into reverse-engineering software like Ghidra and Hopper so they can analyze native binaries, Electron apps, .NET assemblies, and websites without access to source code.

**Why now:** An HN thread this week hit 100 points and 38 comments, pulling the project in front of a broad developer audience actively debating what agent-assisted binary analysis looks like in practice.

**Build with it:** Run `npx rea-agents setup` to register REA with your agent, then prompt it to inspect a closed-source app feature and return decompiled evidence alongside a working reimplementation in your own codebase.

## 2. yihui-dev/awesome-opus5-5-videos

https://github.com/yihui-dev/awesome-opus5-5-videos · ★ 10337 (+4635 this week) · ai-video, awesome, awesome-list, claude, claude-opus, creative-coding, motion-graphics, prompts, threejs

**What it does:** A curated collection of 703 prompts behind viral Claude Opus 5.5 animation videos — HTML Canvas, SVG, and Three.js — each linked to the creator's original post, with 418 of them paired with a live side-by-side remake on Skillry.

**Why now:** The repo jumped 4,635 stars this week on the back of a batch update on 2026-10-12 that added 285 prompts and 13 new videos spanning explainer and 3D-scene formats.

**Build with it:** Pull any prompt from `prompts/` directly into a Claude Opus 5.5 agent and get back a working animation as a single self-contained HTML file.

## 3. Gathin23/cleanyourtv

https://github.com/Gathin23/cleanyourtv · ★ 30718 (+26198 this week) · adb, adblock, android-tv, android-tv-launcher, apple-tv, bloatware-removal, claude-code, debloat, fire-tv, google-tv, launcher, privacy, smart-tv, sony-bravia, tcl, vibe-coding, xiaomi

**What it does:** CleanYourTV uses ADB over Wi-Fi — Android's debug bridge, no root or USB cable required — to disable bloatware and sponsored home-screen apps on Android TV and Google TV devices, swapping the default launcher for a 497 KB Apple TV-style interface with a one-line restore command.

**Why now:** A before/after tweet showing a parent's cleaned-up TV hit 7.4M views this week, drawing 200+ contributors who documented 170+ compatible TV models in four days and earning coverage in TechCrunch, Tom's Guide, and 194 other outlets.

**Build with it:** Enable USB debugging on a test Android TV, run the project's ADB debloat script over Wi-Fi, then fork the device compatibility list to add brand-specific package blocklists for your target TV model.

## 4. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 194901 (+2494 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is a web scraping and crawling API that converts any URL into LLM-ready markdown, structured JSON, or screenshots, handling JavaScript rendering, proxies, and rate limits so you don't have to.

**Why now:** The repo gained roughly 2,500 stars this week and recently added MCP client support, letting AI agents connect to Firecrawl with a single command.

**Build with it:** Point an AI agent at Firecrawl's `/scrape` endpoint with `outputFormat: markdown` to feed clean, token-efficient web content directly into your LLM pipeline.

## 5. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 110138 (+2435 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** Agent Skills packages 25 slash-command-driven workflows — `/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`, and more — that enforce senior-engineer practices like TDD, atomic commits, and five-axis code review across AI coding agents including Claude Code, Cursor, and Codex.

**Why now:** The repo gained 2,435 stars this week, reflecting a concrete surge of builders trying to impose structured development discipline on otherwise freeform agent-based coding tools.

**Build with it:** Run `npx skills add addyosmani/agent-skills` to install all 25 skills, then trigger `/build auto` to have the agent generate a plan from an existing spec and implement every task autonomously, pausing only on failures.

## 6. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 84483 (+11818 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a local-first, open-source desktop app (Electron + Python) that covers voice cloning, voice design, video dubbing, dictation, transcription, and audiobook generation across 646 languages, running on k2-fsa/OmniVoice by default — everything ElevenLabs does, self-hosted.

**Why now:** The repo gained roughly 11,800 stars this week, a spike that tracks closely with growing developer frustration over ElevenLabs API pricing and the broader push toward self-hosted voice infrastructure.

**Build with it:** Install with `curl -fsSL https://voicestudio.sh/install | sh`, then hit the built-in local API or MCP interface to drop voice cloning into an agent workflow without sending audio to a third-party service.

## 7. ChromeDevTools/chrome-devtools-mcp

https://github.com/ChromeDevTools/chrome-devtools-mcp · ★ 54082 (+11044 this week) · browser, chrome, chrome-devtools, debugging, devtools, mcp, mcp-server, puppeteer

**What it does:** `chrome-devtools-mcp` is an MCP server — a standardized protocol layer for agent tooling — that lets coding agents like Claude, Cursor, and Copilot control a live Chrome browser via Puppeteer and Chrome DevTools to automate actions, capture network requests, take screenshots, and record performance traces.

**Why now:** The repo crossed 11,000 stars this week as builders moved beyond text-only agent workflows and started wiring agents into live browser sessions.

**Build with it:** Add `npx -y chrome-devtools-mcp@latest` to your MCP client's `mcpServers` config block and your coding agent immediately gains access to console logs, source-mapped stack traces, and performance insights against your local dev server.

## 8. earendil-works/pi

https://github.com/earendil-works/pi · ★ 117571 (+1655 this week) · —

**What it does:** Pi is a minimal TypeScript agent harness — a lightweight runtime for building and running AI coding agents — with a CLI, a unified LLM API, and a plugin system built on hot-reloadable extensions, skills, prompt templates, and themes that can be packaged and shared via npm or git.

**Why now:** The repo gained 1,655 stars this week, a clear signal that builders are actively hunting for extensible agent frameworks that don't impose rigid opinions on how workflows should be structured.

**Build with it:** Write a custom Pi extension using the SDK, publish it as an npm package, and wire it into an existing TypeScript project via the RPC interface to automate a specific coding workflow.

## 9. ai-job-search-dev/ai-job-search <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ai-job-search-dev/ai-job-search · ★ 64405 (+1642 this week) · ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume

**What it does:** A Claude Code-powered CLI that scrapes job portals, scores posting fit against your profile, and runs a drafter-reviewer pipeline to produce tailored LaTeX CVs and cover letters.

**Why now:** The repo gained 1,642 stars this week, and the author published a verified personal case study — 69 applications, 20 interviews, one signed offer — giving it rare proof-of-work credibility in a category full of vaporware.

**Build with it:** Fork the repo, fill in your profile files, and swap the Danish job-portal scrape targets in `/scrape` for your local job boards to adapt the fit-scoring pipeline to a new market.

## 10. stablyai/orca

https://github.com/stablyai/orca · ★ 104665 (+9591 this week) · ade, agent-ide, ai-agents, automation, bot, claude-code, codex, ghostty, grok-bot, hermes-agent, mobile-app, muse, openclaw, opencode, orchestration, pi, runtime, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop and mobile app that runs multiple coding agents — Codex, Claude Code, OpenCode, Grok Bot — in parallel git worktrees, letting you fan out a single prompt across agents, compare their outputs, and merge the winner.

**Why now:** The repo gained roughly 9,600 stars this week, a spike that maps directly onto the simultaneous release wave of new agent CLIs — Codex, OpenCode — that Orca is explicitly built to coordinate.

**Build with it:** Point Orca at an existing repo, split a single refactor prompt across three agents using the parallel worktrees feature, then diff and cherry-pick the winning branch from the Orca UI.
