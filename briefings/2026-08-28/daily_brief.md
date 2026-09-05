# AI Tastemakers — Daily Brief — 2026-08-28

_Ranking: delta_7d · 10 repos · generated 2026-08-28T23:01:50.851Z_


## 1. Zackriya-Solutions/meetily

https://github.com/Zackriya-Solutions/meetily · ★ 30025 (+15375 this week) · ai, ai-meeting-assistant, llm, local-ai, mac, meeting-minutes, meeting-notes, offline-first, ollama, parakeet, privacy-focused, privacy-tools, rust, self-hosted, sortformer, speech-to-text, transcription, whisper, whisper-cpp, windows

**What it does:** Meetily is a local-only meeting recorder that pipes audio through Whisper/Parakeet for real-time transcription, runs speaker diarization via Sortformer, and feeds transcripts to a locally hosted Ollama model to produce structured meeting notes — no data leaves your machine.

**Why now:** The repo gained 15,375 stars this week alone, driven by a wave of enterprise teams actively seeking Zoom/Otter alternatives after recurring cloud-data-handling controversies, making it a live case study in the "local-AI tooling" adoption curve.

**Build with it:** Drop Meetily's Rust audio-capture backend into a CI pipeline or internal tooling stack by pointing its Ollama endpoint at a custom `llama3` or `mistral` model config, then pipe the structured transcript JSON output into your own ticketing or wiki system (Notion, Linear, Confluence) for automated action-item extraction.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 115308 (+8150 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code plugin (and cursor-rules config) that installs a YAGNI-enforcing system prompt into your AI agent, steering it toward the smallest working solution — `<input type="date">` instead of a flatpickr wrapper with timezone handling.

**Why now:** The repo gained 8,150 stars this week and hit Trendshift's daily and weekly trending lists, suggesting a wave of Claude Code adopters are hitting the same problem: agents that over-build by default.

**Build with it:** Drop the skill into a Claude Code session via the npm package (`@dietrichgebert/ponytail`) or copy the cursor-rules config, then run it against any feature ticket in your repo and diff the output against your current agent baseline using the included benchmark harness in `benchmarks/`.

## 3. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 76345 (+2608 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP server that lets AI agents read and search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and arbitrary web pages without paid API keys, handling auth, anti-bot bypasses, and HTML-to-text cleaning under one interface.

**Why now:** Claude Code and Cursor's MCP plugin ecosystems are driving demand for zero-config tool servers this week, and Agent Reach ships a ready-made `mcp` entry point that drops straight into those configs alongside its CLI.

**Build with it:** Drop it into a Claude Code or Cursor MCP config via `uvx agent-reach`, then wire the `search_twitter`, `get_youtube_transcript`, or `scrape_url` tools directly into an agent workflow to pull live social signals or documentation without touching a paid scraping API.

## 4. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 57527 (+5173 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that exposes a single OpenAI-compatible endpoint across 350+ AI providers, with quota-aware fallback routing and RTK+Caveman prompt compression to stretch free-tier budgets.

**Why now:** The repo gained 5,173 stars this week, coinciding with Anthropic's Claude Code going GA and OpenAI Codex CLI launching — both tools accept a custom base URL, making a free-tier fallback gateway immediately practical for teams hitting rate limits on paid accounts.

**Build with it:** Point Claude Code or Codex CLI at your OmniRoute instance by setting `ANTHROPIC_BASE_URL` or `OPENAI_BASE_URL` in your environment, then configure a fallback chain in the routing config to cascade through Gemini, DeepSeek, and Kimi free tiers when Claude quota exhausts mid-session.

## 5. K-Dense-AI/scientific-agent-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 36522 (+2468 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** Scientific Agent Skills is a Python library of 163 validated research functions — covering genomics, drug discovery, PK/PD modelling, and 100+ scientific databases — that slot into any Agent Skills-compatible AI coding environment as callable tools.

**Why now:** The project just rebranded from Claude Scientific Skills to Scientific Agent Skills this week, expanding compatibility beyond Claude to Cursor, Codex, and Google Antigravity via the open Agent Skills standard, which is the concrete forcing function behind its 2,468 stars gained in seven days.

**Build with it:** Drop the skills into a Claude Code or Cursor workspace via the Agent Skills config, then wire a drug-discovery workflow that chains `drug_target_binding` → `pk_pd_modelling` → `dose_selection` without writing any of that integration logic yourself.

## 6. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 243958 (+2338 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness system that layers skills, memory, instincts, and security onto AI coding agents like Claude Code, Codex, Cursor, and Opencode via CLAUDE.md-style config files and MCP tooling.

**Why now:** Claude Code's rapid adoption as a primary agentic coding interface has created a gap between raw agent capability and production-grade workflow control — ECC fills that gap at the moment practitioners are actively wiring up agent stacks.

**Build with it:** Drop ECC's CLAUDE.md templates and AgentShield (`npm install ecc-agentshield`) into an existing Claude Code project to enforce memory persistence, sandboxed tool permissions, and research-before-code instincts across multi-agent sessions.

## 7. harry0703/MoneyPrinterTurbo

https://github.com/harry0703/MoneyPrinterTurbo · ★ 118131 (+4570 this week) · ai-video-generator, content-creation, ffmpeg, instagram-reels, llm, python, short-video, subtitles, text-to-speech, tiktok, video-automation, video-workflow, workflow-automation, youtube-shorts

**What it does:** MoneyPrinterTurbo is a Python tool that takes a topic or keyword and automatically generates a short video end-to-end — writing a script via LLM, fetching stock footage, generating subtitles, adding background music, and rendering the final MP4 using FFmpeg.

**Why now:** The project gained 4,570 stars this week and now lists Kimi K3 — Moonshot AI's newly released open-source 3T-parameter model with 1M token context — as a supported and sponsored LLM backend, making it a concrete testbed for that model's video-scripting and keyword-extraction capabilities.

**Build with it:** Drop it into a content pipeline by pointing `config.toml` at your preferred LLM API (OpenAI-compatible, Kimi, or DeepSeek), then trigger video generation via its REST API to automate bulk short-form content for YouTube Shorts or TikTok without touching the WebUI.

## 8. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 53265 (+4063 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that exposes 12 production pipelines and 100+ tools so an AI coding assistant (Cursor, Copilot, Claude) can handle scripting, asset generation, voice synthesis, and final video composition from a single natural-language prompt.

**Why now:** The repo hit #1 on GitHub Trending this week with 4,063 stars added, landing alongside active discussion of agentic coding workflows where video generation is a frequent missing piece in automated content pipelines.

**Build with it:** Drop the `AGENT_GUIDE.md` knowledge files into your Cursor or Claude project context, wire in your own ElevenLabs and Flux API keys via the providers config, and call a pipeline like text-to-video directly from your agent loop as a composable production step.

## 9. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 237733 (+3911 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python AI agent from Nous Research that creates and refines skills from experience, maintains cross-session memory, runs scheduled automations, and connects to Telegram/Discord/Slack via a single gateway process against any OpenAI-compatible endpoint.

**Why now:** The repo is trending hard this week (nearly 4K stars gained), surfacing alongside the broader Claude Code / Codex agent wave — builders are actively comparing autonomous coding agent architectures and Hermes's open skill-creation loop is a direct counterpoint to closed-loop proprietary agents.

**Build with it:** Point it at your own model endpoint via `hermes model`, wire the Telegram gateway to a $5 VPS, then hook the cron scheduler to run nightly code audits or data pipeline reports — the `agentskills.io`-compatible skill layer means reusable tool definitions accumulate automatically across sessions without manual prompt engineering.

## 10. citrolabs/ego-lite

https://github.com/citrolabs/ego-lite · ★ 14172 (+1745 this week) · agent-skills, ai-agent, automation, browser, browser-automation, claude-code, codex, hermes-agent, skills, skills-sh

**What it does:** ego lite is a macOS browser that gives AI agents (Codex, Claude Code) isolated "Spaces" for browser automation tasks while sharing your real logged-in session state, exposed to agents via an `ego-browser` skill installed through `npx skills add citrolabs/ego-lite`.

**Why now:** The repo is trending at +1,745 stars this week, coinciding with the rapid adoption of Claude Code and OpenAI Codex as terminal-native agents that need authenticated browser access without a separate Playwright or browser-use setup.

**Build with it:** Drop `/ego-browser` commands into a Claude Code or Codex workflow to automate authenticated tasks—form submissions, dashboard scraping, OAuth-gated APIs—by pointing the skill at your existing Chrome profile data during the one-time migration prompt on first launch.
