# Skill Tastemakers — Daily Brief — 2026-08-22

_Ranking: delta_7d · 10 repos · generated 2026-08-22T13:45:21.731Z_


## 1. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 16867 (+7617 this week) · agent-skill, ai, anthropic, c2pa, chatgpt, claude, gemini, openai, provenance, synthid, watermark, watermark-detection, watermark-tools, watermarking, watermarks

**What it does:** `watermarks-remover` is a Python service + agent skill that strips multi-vendor AI provenance marks — invisible Unicode, statistical token-sampling watermarks (SynthID-class, Kirchenbauer, Aaronson/EXP), and C2PA/EXIF/XMP metadata — from text and a wide range of file formats including PDF, DOCX, PNG, JPEG, SVG, and MP4.

**Why now:** The project hit Hacker News this week alongside a spike to 16,867 stars (+7,617 in seven days), suggesting a surge of interest likely tied to growing awareness of AI-generated content detection and provenance tagging in production workflows.

**Build with it:** Point a Cursor project at the self-contained `skills/clean-user-facing-text/` skill via `python3 install_skill.py`, then invoke it on documentation or web copy drafts to scrub statistical and Unicode-level marks before publication.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 51012 (+5102 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE that runs Codex, Claude Code, OpenCode, or Pi agents in parallel git worktrees, letting you fan one prompt across multiple agents and merge the winning result.

**Why now:** It surfaced on Hacker News this week as a "Show HN: Open Source 'Conductor + Ghostty'" and is pulling 51K stars with 5,102 added this week, signaling a fast-growing builder audience actively evaluating it.

**Build with it:** Point Orca at an existing repo, spawn three parallel worktrees with the same prompt against Claude Code, then use the built-in diff view to cherry-pick the best implementation into your main branch.

## 3. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 107919 (+4842 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an agent skill that steers AI coding agents (Claude Code, Cursor, and others) toward the laziest-senior-dev heuristic — preferring a native `<input type="date">` over installing flatpickr, and measuring the result in real `git diff` output.

**Why now:** The project hit Hacker News this week (98 points, 17 comments) while also trending on Trendshift daily and weekly, surfacing active builder debate around whether prompt-layer skills can reliably reshape agent behavior.

**Build with it:** Drop the ponytail skill into an existing Claude Code session and run one of the twelve benchmark feature tickets against your own repo to measure LOC reduction on your actual codebase.

## 4. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 52991 (+4644 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a free, open-source AI gateway that routes requests across 348 providers and 1,200+ models through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression that cuts context size by 15–95%.

**Why now:** The repo gained 4,644 stars this week, signaling a spike in discovery, and its ~1.51B free tokens/month figure is actively re-audited against the live catalog — making this a timely moment to lock in free capacity before providers tighten tiers.

**Build with it:** Point your existing Claude Code or Cursor config at OmniRoute's endpoint and enable compression to immediately stress-test how much of your monthly AI spend can be displaced by free-tier fallback chains.

## 5. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 74018 (+2110 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a CLI tool that gives AI agents (Cursor, Claude Code, etc.) authenticated, clean-text access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu — no API fees, no scraping setup.

**Why now:** The repo hit GitHub Trending #1 this week, surfacing as teams actively wire web-reading into agentic workflows and hit the exact platform blocks (403s, login walls, paid APIs) the tool solves.

**Build with it:** Drop it into a Cursor or Claude Code MCP config to let your agent pull Reddit threads or YouTube transcripts as a native tool call, skipping manual scraper setup entirely.

## 6. citrolabs/ego-lite

https://github.com/citrolabs/ego-lite · ★ 12661 (+2012 this week) · agent-skills, ai-agent, automation, browser, browser-automation, claude-code, codex, hermes-agent, skills, skills-sh

**What it does:** ego lite is a macOS browser that gives AI agents (Claude Code, Codex, etc.) isolated "Spaces" to run browser tasks using your real logged-in sessions, without touching your own tabs.

**Why now:** The repo gained 2,012 stars this week, surfacing alongside active Claude Code and Codex adoption where browser access with inherited logins is a common friction point.

**Build with it:** Run `npx skills add citrolabs/ego-lite` to drop the `ego-browser` skill into your agent's skills directory, then invoke it with `/ego-browser <task>` to test authenticated browser automation against your existing cookies.

## 7. santifer/career-ops

https://github.com/santifer/career-ops · ★ 67738 (+3839 this week) · ai, ai-agent, anthropic, ats, automation, beginner-friendly, career, careerops, claude, claude-code, cli, first-timers-only, golang, good-first-issue, interview-prep, job-application, job-hunting, job-search, open-source, resume

**What it does:** career-ops is an open-source multi-agent system that scans job portals, scores listings A–F on a structured rubric (1.0–5.0), tailors your CV per application, and tracks the pipeline — all running locally inside AI coding CLIs like Claude Code, Codex, or OpenCode.

**Why now:** Business Insider and WIRED both covered the project this week, surfacing it from a personal build ("740+ listings evaluated, 1 dream role landed") into a widely watched open-source release with 67k+ stars.

**Build with it:** Drop your resume and a role criteria config into career-ops, run it inside Claude Code, and use the A–F rubric output as a filter layer before you spend time on any application.

## 8. freestylefly/awesome-gpt-image-2 <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/freestylefly/awesome-gpt-image-2 · ★ 12043 (+1799 this week) · agents, ai-image-generation, chatgpt, dsh-plugin, gpt-image-2, image-prompts, prompt-as-code, prompt-engineering, skills, workflow-automation

**What it does:** A curated library of 500+ reverse-engineered GPT-Image-2 prompts organized into 20+ industrial templates, with a live gallery at gpt-image2.canghe.ai for browsing, copying, and testing generations.

**Why now:** The repo gained 1,799 stars this week, signaling a sharp spike in developer interest around structured prompt engineering for GPT-Image-2 specifically.

**Build with it:** Pull a template from the `/data` directory, slot it into the Ciyuan API or APIMart async endpoint, and batch-generate styled images without writing prompts from scratch.

## 9. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 234226 (+3330 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python agent that builds skills from experience, searches past conversations, and runs across terminal backends (local, SSH, Modal, Docker) while connecting to Telegram, Discord, Slack, and other platforms through a single gateway process.

**Why now:** The repo crossed 234K stars with 3,330 added this week, signaling a sharp surge in adoption that makes it a practical reference point for anyone evaluating persistent, cross-session agent architectures right now.

**Build with it:** Point it at your own model endpoint via `hermes model` and wire it to Telegram using the built-in gateway to get a cloud-resident agent you can interrupt and redirect from your phone while it runs tasks on a remote VM.

## 10. lidge-jun/opencodex

https://github.com/lidge-jun/opencodex · ★ 11757 (+1657 this week) · ai-gateway, ai-tools, anthropic, chatgpt, claude, claude-code, codex, codex-cli, deepseek, developer-tools, gemini, grok, kiro, llm, llm-proxy, ollama, openai, openrouter, proxy, typescript

**What it does:** opencodex is a local proxy that translates OpenAI Codex's Responses API into requests any LLM provider can handle — Claude, Gemini, DeepSeek, Ollama, and others — while preserving streaming, tool calls, and reasoning tokens across Codex, Claude Code, Claude Desktop, and Grok Build.

**Why now:** The repo gained 1,657 stars this week, a spike that tracks rising developer frustration with being locked to a single provider inside Codex and Claude Code as those tools become daily coding infrastructure.

**Build with it:** Run `npm install -g @bitkyc08/opencodex && ocx start`, then point Claude Code at `localhost:10100` to swap its backing model to DeepSeek or Ollama without changing any other part of your workflow.
