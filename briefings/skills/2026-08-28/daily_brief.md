# Skill Tastemakers — Daily Brief — 2026-08-28

_Ranking: delta_7d · 10 repos · generated 2026-08-28T23:03:37.316Z_


## 1. freestylefly/awesome-gpt-image-2

https://github.com/freestylefly/awesome-gpt-image-2 · ★ 24215 (+12701 this week) · agents, ai-image-generation, chatgpt, dsh-plugin, gpt-image-2, image-prompts, prompt-as-code, prompt-engineering, skills, workflow-automation

**What it does:** A curated prompt engineering library for GPT-Image-2 with 530+ reverse-engineered cases, 20+ industrial templates, and a live gallery at gpt-image2.canghe.ai where prompts can be copied, filtered by style, and tested directly.

**Why now:** The repo gained 12,701 stars this week, signaling a sharp spike in community interest around structured GPT-Image-2 prompting workflows.

**Build with it:** Drop one of the 20+ industrial templates into an async call via APIMart's GPT-Image-2 API (`$0.006/image`) to batch-generate branded visuals without changing code between model switches.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 115309 (+8150 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an agent skill (cursor rules / Claude Code plugin) that steers your AI coding agent toward deleting or skipping code rather than writing it — replacing a flatpickr install with `<input type="date">` and similar YAGNI moves.

**Why now:** It hit Hacker News this week (98 points, 17 comments) while simultaneously trending on Trendshift daily and weekly, putting it in front of the builder audience most likely to adopt it immediately.

**Build with it:** Drop the skill into an existing Claude Code session on any feature branch and compare the `git diff` line count before and after — the benchmarks use exactly that workflow against a real FastAPI + React repo.

## 3. stablyai/orca

https://github.com/stablyai/orca · ★ 56126 (+5640 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an agent development environment (ADE) that runs Codex, Claude Code, OpenCode, or Pi side-by-side in isolated git worktrees, with a mobile companion app for monitoring and steering agents remotely.

**Why now:** The project surfaced on Hacker News this week framed as an open-source "Conductor + Ghostty" combo, drawing early discussion around parallel agent orchestration as a workflow primitive.

**Build with it:** Fan a single prompt across multiple parallel worktrees using Orca's built-in orchestration, compare each agent's output, and merge the winning branch — without leaving the desktop app.

## 4. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 76345 (+2606 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a CLI tool that gives AI agents (Cursor, Claude Code, etc.) read and search access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu — no API fees, no per-platform configuration.

**Why now:** The repo hit GitHub Trending #1 of the day this week, surfacing at a moment when MCP-based tool surfaces are becoming a standard integration layer for coding agents.

**Build with it:** Point your MCP-compatible agent at Agent Reach's CLI config to let it pull YouTube transcripts or Reddit threads as context during a research or code-review task.

## 5. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 57527 (+5172 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a free MIT-licensed AI gateway that exposes 350+ providers and 1,200+ models through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression that cuts token usage by 15–95%.

**Why now:** The repo gained 5,172 stars this week, signaling a spike in developer attention likely tied to cost pressure from Claude Code and Codex CLI adoption driving users toward free-tier alternatives.

**Build with it:** Point your existing Claude Code or Cursor `OPENAI_BASE_URL` config at OmniRoute's endpoint to get automatic fallback across 90+ free-tier providers without changing any other code.

## 6. MadsLorentzen/ai-job-search

https://github.com/MadsLorentzen/ai-job-search · ★ 37695 (+4976 this week) · ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume

**What it does:** A Claude Code workflow that scrapes job portals, scores posting fit against your profile, then runs a drafter-reviewer pipeline to produce tailored LaTeX CVs and cover letters.

**Why now:** The repo gained nearly 5,000 stars this week, signaling a breakout moment on GitHub Trending as AI-assisted job searching moves from novelty to common practice.

**Build with it:** Fork the repo, drop your profile into the provided profile files, and run `/scrape` against your local job boards by swapping the Danish portal configs in `AGENTS.md` for your region's equivalents.

## 7. K-Dense-AI/scientific-agent-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 36523 (+2469 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** Scientific Agent Skills is a library of 163 validated, ready-to-use skills that connect any compatible AI agent to 100+ scientific databases spanning genomics, drug discovery, molecular dynamics, and regulatory literature retrieval.

**Why now:** The project crossed 36,500 GitHub stars with 2,469 added this week, coinciding with its rename from Claude Scientific Skills to Scientific Agent Skills and the release of K-Dense BYOK, a free local AI co-scientist that ships with the full skill set.

**Build with it:** Drop the skills into a Cursor or Claude Code project via the Agent Skills config surface and immediately query live scientific databases — such as pathogen-variant surveillance or PK/PD modelling endpoints — without writing any wrapper code.

## 8. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 53266 (+4063 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source, agentic video production system that lets an AI coding assistant handle the full pipeline — scripting, asset generation, editing, and final composition — across 12 production pipelines and 100+ tools.

**Why now:** The repo hit #1 on GitHub Trending this week, surfacing it to a large wave of builders actively looking for entry points.

**Build with it:** Drop a video URL into the "Paste A Video" workflow and let the agent reverse-engineer its structure into a reusable production pipeline you can modify and re-run.

## 9. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 237733 (+3910 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving AI agent that builds a persistent skill library from experience, searches past conversations, and models the user across sessions — runnable on local hardware, a $5 VPS, or serverless backends like Modal and Daytona.

**Why now:** The repo crossed 237K stars with 3,910 added this week, signaling a sharp spike in builder attention that makes it worth evaluating before the ecosystem around it solidifies.

**Build with it:** Point it at your own model endpoint via `hermes model` and wire a Telegram bot token into the gateway config to get a persistent, cross-session agent you can message remotely while it runs tasks on a cloud VM.

## 10. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 28316 (+3544 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** Diagram Design is a Claude Code skill that generates 39 editorial SVG/HTML diagram types — architecture, flowchart, Sankey, Wardley map, UML class, and more — as self-contained files with no build step, no Mermaid defaults, and no generic rounded boxes.

**Why now:** The repo gained 3,544 stars this week, coinciding with the 2.5.10 release that added ten new layout grammars including dependency graphs, database schema, and story maps.

**Build with it:** Drop the skill into an existing Claude Code project and point it at a draw.io or Mermaid source file to redraw it at your chosen format, size, and detail level.
