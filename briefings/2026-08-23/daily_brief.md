# AI Tastemakers — Daily Brief — 2026-08-23

_Ranking: delta_7d · 10 repos · generated 2026-08-23T13:44:39.885Z_


## 1. harry0703/MoneyPrinterTurbo

https://github.com/harry0703/MoneyPrinterTurbo · ★ 115053 (+10846 this week) · ai-video-generator, content-creation, ffmpeg, instagram-reels, llm, python, short-video, subtitles, text-to-speech, tiktok, video-automation, video-workflow, workflow-automation, youtube-shorts

**What it does:** MoneyPrinterTurbo is a Python tool that takes a topic or keyword and automatically generates a short-form video end-to-end — script, stock footage, subtitles, background music, and final render — via LLM + FFmpeg pipelines exposed through a WebUI or REST API.

**Why now:** The project gained 10,846 stars this week, coinciding with the integration of Kimi K3 (Moonshot AI's newly released open-source 3T-parameter model) as a supported LLM backend, making this a functional test bed for that model's video-workflow reasoning capabilities.

**Build with it:** Drop your own LLM provider into `config.toml`, hit the `/api/v1/videos` endpoint, and wire the output into a scheduling tool like n8n or Airflow to run a daily TikTok/YouTube Shorts publishing pipeline without touching the video assembly logic.

## 2. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 17271 (+6800 this week) · agent-skill, ai, anthropic, c2pa, chatgpt, claude, gemini, openai, provenance, synthid, watermark, watermark-detection, watermark-tools, watermarking, watermarks

**What it does:** A Python service plus agent skill that strips AI provenance marks from text and files — covering invisible Unicode, statistical watermarks (Kirchenbauer green-list, Aaronson keyed-Gumbel), and C2PA/EXIF/XMP metadata across PNG, JPEG, PDF, DOCX, MP4, and a dozen other formats.

**Why now:** The repo spiked 6,800 stars this week, coinciding with intensifying industry debate around C2PA adoption and SynthID-Text's expanded rollout — builders are clearly stress-testing provenance pipelines and looking for practical tools to audit what actually survives in production content.

**Build with it:** Wire the service into a pre-publish CI step using `rewrite_text.py` as a hook, or install the `remove-ai-marks` skill into Claude Code via `python3 install_skill.py --skill remove-ai-marks --target claude-code` to scrub agent-generated drafts before they hit your content store.

## 3. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 79550 (+2538 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a set of portable agent skills (CLAUDE.md, Cursor rules, Codex configs) that inject opinionated frontend design constraints into AI coding agents, steering them away from generic Tailwind-gray layouts toward deliberate typographic and spatial choices.

**Why now:** AI-generated UI slop is a live complaint this week across the vibe-coding community, with Claude Code and Codex workflows shipping production frontends directly from agent output — making the absence of taste a real product liability, not just an aesthetic gripe.

**Build with it:** Drop the `CLAUDE.md` skill file into your project root and Claude Code will inherit layout, color, and component constraints automatically; pair it with the Cursor rules config for enforced taste across both agent and autocomplete surfaces in the same repo.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 108576 (+4799 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code plugin (agent skill) that constrains AI coding agents to prefer existing platform primitives—like `<input type="date">` over installing flatpickr—producing ~54% fewer lines of code across real agentic sessions on a FastAPI + React codebase.

**Why now:** The repo is trending at +4,799 stars this week, coinciding with broader developer frustration about Claude Code and Cursor sessions generating bloated, over-engineered diffs that slow review and inflate token costs.

**Build with it:** Drop the skill into your Claude Code `CLAUDE.md` or Cursor rules file and run it against any feature branch—the benchmark workflow in `benchmarks/` lets you score your own repo's `git diff` for LOC, token spend, and cost reduction against the no-skill baseline.

## 5. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 53567 (+4675 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that exposes 340+ AI providers through a single OpenAI-compatible endpoint, with quota-aware fallback routing and RTK+Caveman prompt compression that claims 15–95% token reduction.

**Why now:** The repo gained 4,675 stars this week, surfacing on GitHub Trending alongside the Claude Code and Codex CLI waves — both tools work out of the box by pointing their `OPENAI_BASE_URL` at OmniRoute's endpoint, making it a direct plug for developers hitting free-tier rate limits on either.

**Build with it:** Set `OPENAI_BASE_URL` to your OmniRoute instance in Cursor, Cline, or Claude Code's config, define a fallback chain across Gemini 2.5 Flash, GPT-4o mini, and Kimi in the routing policy, and let the `/dashboard/free-tiers` page track actual quota burn across all 42 provider pools in one view.

## 6. santifer/career-ops

https://github.com/santifer/career-ops · ★ 67886 (+3859 this week) · ai, ai-agent, anthropic, ats, automation, beginner-friendly, career, careerops, claude, claude-code, cli, first-timers-only, golang, good-first-issue, interview-prep, job-application, job-hunting, job-search, open-source, resume

**What it does:** career-ops is an open-source multi-agent system that scrapes job portals, scores listings A–H with a 1–5 global rating, generates tailored CVs, and tracks applications — all running locally inside AI coding CLIs like Claude Code or OpenCode.

**Why now:** The project hit Trendshift's trending chart and was covered by Business Insider and WIRED this week, surfacing alongside 67K+ stars and 3,859 stars added in seven days — a signal the "candidates using AI to filter companies" framing is landing with a wide audience right now.

**Build with it:** Fork the repo and wire your own job portal scrapers into the agent pipeline via the `CLAUDE.md` skill configuration, then extend the A–H report schema to weight criteria specific to your target role or industry before piping output into your existing ATS tracker.

## 7. TencentCloud/TencentDB-Agent-Memory

https://github.com/TencentCloud/TencentDB-Agent-Memory · ★ 23948 (+1823 this week) · agent, ai-agent, embedding, llm, local-first, long-term-memory, memory, openclaw-plugin, vector-search

**What it does:** TencentDB Agent Memory is a self-hosted memory server that ingests conversations, docs, and code from multiple AI agents and organizes them into four structured stores — Chat Memory, Skill, LLM-Wiki, and Code-Graph — retrievable via vector search across a shared team workspace.

**Why now:** The project gained 1,823 GitHub stars this week and landed on Trendshift's trending list, coinciding with growing developer frustration over agents losing context between sessions and across tools like Claude Code and Codex.

**Build with it:** Point Claude Code or Codex at the bundled proxy by swapping their `OPENAI_BASE_URL` to `http://localhost:8125` — no plugins or MCP server needed — and agents immediately start reading and writing shared memory across sessions without any code changes.

## 8. Wei-Shaw/sub2api

https://github.com/Wei-Shaw/sub2api · ★ 38975 (+1775 this week) · 2api, antigravity2api, cc2api, claude, claude-code, codex, crs, crs2, gemini

**What it does:** Sub2API is a self-hosted Go/Vue gateway that pools Claude, OpenAI, Gemini, and Grok subscriptions behind a single OpenAI-compatible API endpoint, letting multiple users share quota costs.

**Why now:** The repository jumped 1,775 stars this week, tracking directly with the surge in Claude Code and Codex CLI adoption — both tools are explicitly listed as supported targets in the README.

**Build with it:** Point your Claude Code `ANTHROPIC_BASE_URL` or Codex `OPENAI_BASE_URL` at a self-hosted Sub2API instance, configure shared subscription tokens via the admin panel, and split costs across a team without each member needing a separate paid account.

## 9. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 234672 (+3354 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python agent framework from Nous Research that creates and refines skills from experience, maintains cross-session memory, and runs across seven terminal backends (local, Docker, SSH, Modal, Daytona, and others) with support for any OpenAI-compatible model endpoint.

**Why now:** The repo is trending at 234K stars with 3,354 added this week, coinciding with Nous Research's active push into open agent infrastructure and the broader industry consolidation around self-hosted, model-agnostic agent runtimes as alternatives to locked-in products like Claude Code and Codex.

**Build with it:** Wire it to your own model endpoint via `hermes model` and a custom `OPENAI_BASE_URL`, then use the built-in cron scheduler to run nightly code audits or data pipeline reports delivered straight to a Telegram or Discord channel — no additional orchestration layer needed.

## 10. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 41111 (+3336 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source Chinese-language book (with 14 language translations) covering AI Agent design and engineering across 10 chapters, backed by 103 runnable lab experiments spanning RAG, MCP, multi-agent systems, context engineering, and reinforcement learning fine-tuning.

**Why now:** The repo jumped 3,336 stars this week and hit GitHub's Project of the Day trending slot, coinciding with a v2.0 restructure that added a dedicated chapter on multimodal agent interaction and observation/action spaces — a gap most existing resources skip.

**Build with it:** Clone the repo, run the chapter-matched Python experiments locally (e.g., the MCP tool-integration labs or the coding-agent scaffolding), and use the context-engineering chapter as a structured reference for designing your own agent's prompt and memory architecture before wiring in your LLM API.
