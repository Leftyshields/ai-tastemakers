# Skill Tastemakers — Daily Brief — 2026-08-26

_Ranking: delta_7d · 10 repos · generated 2026-08-26T14:04:14.851Z_


## 1. freestylefly/awesome-gpt-image-2

https://github.com/freestylefly/awesome-gpt-image-2 · ★ 20697 (+9348 this week) · agents, ai-image-generation, chatgpt, dsh-plugin, gpt-image-2, image-prompts, prompt-as-code, prompt-engineering, skills, workflow-automation

**What it does:** A structured library of 530+ reverse-engineered GPT-Image-2 prompts organized into 20+ industrial templates, with a live gallery at gpt-image2.canghe.ai for browsing, copying, and testing prompts directly.

**Why now:** The repo gained 9,348 stars this week, signaling a surge of developer interest likely tied to active GPT-Image-2 adoption across the community.

**Build with it:** Copy a template prompt from the gallery, wire it to the APIMart async API (`$0.006/image`), and run batch image generation jobs using the `task_id` polling pattern the sponsor documents.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 111980 (+6208 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an AI agent skill that steers coding agents (Claude Code, Cursor, and ~18 others) toward the laziest-senior-dev instinct — deleting code, using platform primitives, and skipping libraries that aren't needed.

**Why now:** It hit Hacker News this week (98 points, 17 comments) alongside a new agentic benchmark showing a real Claude Code session on a FastAPI + React repo producing 54% fewer lines of code at 20% lower cost versus the same agent running without the skill.

**Build with it:** Drop the ponytail skill into your Claude Code config and run it against an existing feature branch to measure the `git diff` reduction on your own codebase.

## 3. stablyai/orca

https://github.com/stablyai/orca · ★ 54048 (+5230 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE that runs Codex, Claude Code, OpenCode, or Pi agents in parallel git worktrees, letting you fan one prompt across multiple agents and merge the winning result.

**Why now:** The project surfaced on Hacker News this week as an open-source "Conductor + Ghostty" alternative, pulling early discussion around parallel agent orchestration as a workflow primitive.

**Build with it:** Point Orca at an existing repo, fan a single refactor prompt across three worktrees using different agents, then diff and merge the best output directly from the UI.

## 4. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 55817 (+4891 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a free MIT-licensed AI gateway that routes requests across 353 providers and 1,200+ models through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression saving 15–95% on context size.

**Why now:** The repo gained 4,891 stars this week, signaling a spike in discovery that typically precedes a wave of integrations and community-contributed provider entries — catching it now means access to the catalog before usage patterns stabilize.

**Build with it:** Point your existing Claude Code or Cursor config at OmniRoute's endpoint and let the 19 routing strategies auto-fallback across 90+ free-tier providers to exhaust the ~1.51B monthly free token budget before spending anything.

## 5. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 243370 (+2278 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness operating system that adds skills, instincts, memory, and security to AI coding agents like Claude Code, Codex, Opencode, and Cursor.

**Why now:** The repo hit GitHub's trending repository of the day this week, coinciding with rapid adoption across the Claude Code and MCP ecosystem as those tools gain mainstream traction.

**Build with it:** Drop the `ecc-universal` npm package into an existing Claude Code workflow to layer persistent memory and agent security onto your current setup without rebuilding your toolchain.

## 6. AgriciDaniel/claude-obsidian

https://github.com/AgriciDaniel/claude-obsidian · ★ 13149 (+2122 this week) · agent-skills, ai-note-taking, ai-second-brain, claude-code, claude-code-skill, claude-memory, claude-plugin, karpathy-llm-wiki, knowledge-graph, knowledge-management, note-taking, notion-alternative, obsidian, obsidian-ai, obsidian-plugin, obsidian-second-brain, open-source, personal-knowledge-management, pkm, second-brain

**What it does:** claude-obsidian is a local-first Claude Code plugin that ingests any source file into a provenance-tracked, wiki-linked Obsidian vault of plain Markdown — preserving source citations, claim ledgers, and conflict visibility across ingestion, querying, and maintenance workflows.

**Why now:** The repo gained 2,122 stars this week, signaling a breakout moment likely tied to growing Claude Code plugin adoption and renewed builder interest in Karpathy's LLM Wiki pattern as a structured alternative to ad-hoc AI note-taking.

**Build with it:** Drop a local source file into the vault inbox and run the ingestion skill via Claude Code to see a cited, linked Markdown note appear with its claim ledger intact — validating the core capture-and-ground loop before building anything further.

## 7. herdrdev/herdr

https://github.com/herdrdev/herdr · ★ 32509 (+1956 this week) · agent, agent-orchestration, ai, ai-agents, claude-code, cli, codex, coding-agents, developer-tools, devtools, multiplexer, rust, terminal, terminal-multiplexer, terminal-ui, tmux, tui, workspace-manager

**What it does:** herdr is a Rust-based terminal multiplexer that runs as a persistent background server, keeping Claude Code, Codex, and other coding agents alive across disconnections while surfacing which panes are working, blocked, or idle.

**Why now:** The repo gained nearly 2,000 stars this week, signaling a sharp uptick in developer attention likely driven by the current wave of agentic coding workflows centered on Claude Code and Codex.

**Build with it:** Drop an agent into a herdr pane using the socket API to programmatically spawn sessions and poll pane status — validating whether your agent actually keeps running after you close the lid.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 236708 (+3832 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving AI agent that builds skills from experience, maintains cross-session memory, and runs tasks on remote infrastructure (Docker, SSH, Modal, Daytona) while accepting input from Telegram, Discord, Slack, and other messaging platforms.

**Why now:** The repo crossed 236,000 stars with 3,800+ added this week, signaling a sharp spike in builder attention likely tied to its positioning against Claude Code and Codex as a model-agnostic, self-hosted alternative.

**Build with it:** Point it at your own model endpoint via `hermes model` and wire a Telegram bot token into the gateway process to get a persistent, remotely accessible agent without touching your local machine.

## 9. MadsLorentzen/ai-job-search

https://github.com/MadsLorentzen/ai-job-search · ★ 36069 (+3723 this week) · ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume

**What it does:** A Claude Code workflow that scrapes job portals, scores posting fit against your profile, then runs a drafter-reviewer pipeline to produce tailored LaTeX CVs and cover letters.

**Why now:** The repo gained 3,723 stars this week, driven by the author publishing a verified outcome — 69 applications, 20 first interviews, one signed offer — as a geophysicist who used it on their own 2025–2026 job search.

**Build with it:** Fork the repo, drop your profile into the profile files, then run `/apply <url>` against a live job posting to see the fit score and cover letter draft before committing to the full `/scrape` workflow.

## 10. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 50695 (+1810 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that lets an AI coding assistant (Claude, Cursor, Copilot) handle scripting, asset generation, and final composition across 12 production pipelines and 100+ tools.

**Why now:** The repo hit #1 on GitHub Trending this week, surfacing it to a large builder audience at a moment when agentic coding workflows are a primary focus.

**Build with it:** Point your Claude or Cursor agent at the included `AGENT_GUIDE.md` and run one of the 12 pipelines against a video URL to validate the end-to-end agentic editing loop.
