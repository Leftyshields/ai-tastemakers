# Skill Tastemakers — Daily Brief — 2026-08-30

_Ranking: delta_7d · 10 repos · generated 2026-08-30T17:29:40.992Z_


## 1. freestylefly/awesome-gpt-image-2

https://github.com/freestylefly/awesome-gpt-image-2 · ★ 25566 (+13103 this week) · agents, ai-image-generation, chatgpt, dsh-plugin, gpt-image-2, image-prompts, prompt-as-code, prompt-engineering, skills, workflow-automation

**What it does:** A prompt engineering library for GPT-Image-2 with 500+ reverse-engineered cases, 20+ industrial templates, and a browsable gallery at gpt-image2.canghe.ai where prompts can be copied and tested directly.

**Why now:** The repo gained 13,103 stars this week, signaling a spike in developer interest around GPT-Image-2 workflows at a moment when the model's async API pricing (as low as $0.006/image via sponsors like APIMart) makes batch generation practically viable.

**Build with it:** Copy a template prompt from the gallery, wire it into the APIMart async API (`submit task → get ID → poll results`), and run batch image generation without touching model-switching code.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 116997 (+8421 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an AI agent skill that steers code generation toward minimal, already-available primitives — replacing over-built output (flatpickr wrapper, custom date picker) with the one native line that already works.

**Why now:** It hit Hacker News this week (98 points, 17 comments) alongside a published agentic benchmark showing a 54% mean LOC reduction across 12 real feature tasks on a FastAPI + React repo.

**Build with it:** Drop the ponytail skill into a Claude Code session and run it against an existing feature ticket to measure the `git diff` reduction directly against your no-skill baseline.

## 3. stablyai/orca

https://github.com/stablyai/orca · ★ 57196 (+5620 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE that runs Codex, Claude Code, OpenCode, or Pi agents in parallel git worktrees, letting you fan one prompt across multiple isolated branches and merge the best result.

**Why now:** The project surfaced on Hacker News this week as "Open Source 'Conductor + Ghostty,'" drawing early discussion around its terminal and orchestration combination.

**Build with it:** Point Orca at an existing repo, spawn three parallel worktrees from a single prompt using the fan-out feature, and compare diffs before merging the winning branch.

## 4. MadsLorentzen/ai-job-search

https://github.com/MadsLorentzen/ai-job-search · ★ 38388 (+5332 this week) · ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume

**What it does:** A Claude Code workflow that scrapes job portals, scores posting fit against your profile, then runs a drafter-reviewer pipeline to produce tailored LaTeX CVs and cover letters.

**Why now:** The repo gained 5,332 stars this week, surfacing alongside a documented real-world result — 69 applications, 20 first interviews, one signed offer — giving it rare proof-of-concept credibility in a crowded "AI resume" space.

**Build with it:** Fork the repo, drop your career details into the profile files, then run `/apply <url>` on a live posting to validate the fit-scoring and cover letter output against your own background before customizing the evaluation criteria.

## 5. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 58483 (+4914 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a free MIT-licensed AI gateway that exposes 350+ providers and 1,200+ models through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression that cuts usage by 15–95%.

**Why now:** The repo gained 4,914 stars this week, signaling a breakout moment likely driven by developers hitting rate limits on Claude Code and Codex as those tools see surging adoption.

**Build with it:** Point your Claude Code or Cursor `ANTHROPIC_BASE_URL` / `OPENAI_BASE_URL` at OmniRoute's endpoint to get automatic fallback across 90+ free-tier providers without changing any other tooling config.

## 6. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 54539 (+4884 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that lets an AI coding assistant handle research, scripting, asset generation, and final composition across 12 production pipelines using 100+ tools.

**Why now:** The repo hit #1 on GitHub Trending this week, surfacing it to a large wave of builders actively evaluating agentic video workflows.

**Build with it:** Point your Cursor or Claude agent at the repo's AGENT_GUIDE.md, describe a video in plain language, and let the pipeline drive FFmpeg and ElevenLabs from a single prompt.

## 7. K-Dense-AI/scientific-agent-skills

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 38840 (+4665 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** Scientific Agent Skills is a library of 163 validated research skills — spanning cancer genomics, PK/PD modelling, pathogen-variant surveillance, and 100+ scientific databases — that plugs into any Agent Skills-compatible AI agent to give it structured scientific reasoning capabilities.

**Why now:** The project gained 4,665 stars this week, coinciding with a featured webinar recording on K-Dense BYOK that gives non-technical researchers a concrete on-ramp to running these skills locally with their own API keys.

**Build with it:** Drop the skills into an existing Cursor or Claude Code workspace via the Agent Skills config surface, then wire a single PK/PD or genomics skill to your data pipeline to validate whether agent-driven analysis holds up against your current tooling.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 238424 (+3752 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving AI agent that builds skills from experience, stores and searches past conversations, and runs across Telegram, Discord, CLI, and seven terminal backends including serverless Modal and Daytona environments.

**Why now:** The repo crossed 238k stars with 3,752 added this week, signaling a sharp spike in builder attention likely tied to its public launch positioning against Claude Code and Codex.

**Build with it:** Point it at your own OpenAI-compatible endpoint via `hermes model`, then wire a Telegram bot token into the gateway process to get a persistent, memory-carrying agent accessible from your phone while it runs on a $5 VPS.

## 9. can1357/oh-my-pi

https://github.com/can1357/oh-my-pi · ★ 28451 (+1807 this week) · ai-agent, ai-coding-agent, anthropic, bun, claude, cli, coding-assistant, llm, mcp, multi-provider, openai, rust, terminal, tui, typescript

**What it does:** OMP is a terminal coding agent that embeds LSP (14 ops) and DAP (28 ops) directly into its 60+ provider, 31-tool CLI, giving it live language-server and debugger context without an external IDE.

**Why now:** The repo gained 1,807 stars this week and briefly opened pull requests to all contributors without a vouch requirement, making it an active moment to ship changes upstream.

**Build with it:** Wire OMP into an existing project by running `bun install -g @oh-my-pi/pi-coding-agent` and pointing it at your repo — the bundled LSP ops will give it type-aware edits without any additional language-server configuration.

## 10. anthropics/claude-plugins-official <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/anthropics/claude-plugins-official · ★ 35586 (+1732 this week) · claude-code, mcp, skills

**What it does:** Anthropic's official curated directory of Claude Code plugins, organizing both internal Anthropic-built and third-party external plugins with a standardized structure covering MCP servers, slash commands, agents, and skill bundles.

**Why now:** The repo gained 1,732 stars this week, signaling a sharp uptick in developer interest in extending Claude Code through the plugin ecosystem.

**Build with it:** Submit a skill-bundle plugin via the [plugin directory submission form](https://clau.de/plugin-directory-submission) by pointing a marketplace entry at a Git subdirectory containing `SKILL.md` files — no `plugin.json` manifest required when using `strict: false`.
