# Skill Tastemakers — Daily Brief — 2026-09-03

_Ranking: delta_7d · 10 repos · generated 2026-09-03T17:03:55.555Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 123086 (+11106 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an AI agent skill that steers coding agents (Claude Code, Cursor, and others) toward minimal output — preferring native browser APIs, stdlib, and existing code over installing dependencies or writing new abstractions.

**Why now:** The project hit Hacker News this week (98 points, 17 comments) alongside a published agentic benchmark showing a mean 54% LOC reduction across 12 real feature tasks on a FastAPI + React repo.

**Build with it:** Drop the ponytail skill config into an existing Claude Code session and run it against a feature ticket to measure the `git diff` reduction on your own codebase.

## 2. K-Dense-AI/scientific-agent-skills

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 42333 (+7773 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** Scientific Agent Skills is a library of 163 validated, ready-to-use skills that give any compatible AI agent (Cursor, Claude Code, Codex, Antigravity) access to 100+ scientific databases spanning genomics, drug discovery, proteomics, and clinical research.

**Why now:** The project released a webinar recording this week walking through K-Dense BYOK, the free local co-scientist powered by these skills, giving builders a concrete on-ramp that didn't exist before.

**Build with it:** Drop the skills into a Claude Code or Cursor project via the Agent Skills standard config and immediately run cancer genomics or PK/PD modelling queries against live databases without writing any data-access code.

## 3. freestylefly/awesome-gpt-image-2

https://github.com/freestylefly/awesome-gpt-image-2 · ★ 27706 (+7009 this week) · agents, ai-image-generation, chatgpt, dsh-plugin, gpt-image-2, image-prompts, prompt-as-code, prompt-engineering, skills, workflow-automation

**What it does:** A curated prompt engineering library for GPT-Image-2 with 500+ reverse-engineered cases and 20+ industrial templates, exposable via a browsable gallery at gpt-image2.canghe.ai where prompts can be copied directly and tested after Google sign-in.

**Why now:** The repo gained 7,009 stars this week, signaling a sharp spike in community attention around GPT-Image-2 prompt patterns as practitioners race to systematize workflows for the model.

**Build with it:** Copy a template prompt from the gallery, wire it to the APIMart async API (`$0.006/image`), and run batch image generation jobs against your own dataset without changing the endpoint when switching models.

## 4. stablyai/orca

https://github.com/stablyai/orca · ★ 60749 (+6701 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile AI orchestrator that runs Codex, Claude Code, OpenCode, or Pi side-by-side in isolated git worktrees, letting you compare agent outputs and merge the winner.

**Why now:** The repo gained 6,701 stars this week, signaling a sharp spike in builder attention likely tied to the parallel-agents workflow going mainstream as Codex and Claude Code both matured into CLI-first tools simultaneously.

**Build with it:** Clone a repo into Orca, fan a single prompt across three worktrees each running a different agent (e.g. Codex vs. Claude Code vs. OpenCode), then diff and cherry-pick the best result directly from the Orca UI.

## 5. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 30228 (+3091 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** Diagram Design is a Claude Code skill that generates 39 editorial SVG/HTML diagram types — architecture, flowchart, sequence, Wardley map, Sankey, and more — as self-contained files with no build step, no shadows, and no generic rounded boxes.

**Why now:** The repo gained 3,091 stars this week and v2.5.10 just shipped ten new layout grammars including Sankey, fishbone, and database schema, making this a fresh surface worth evaluating before the type list stabilizes.

**Build with it:** Drop the skill into Claude Code and point it at an existing draw.io or Mermaid file — it redraws the source at your chosen format, size, and detail level, giving you a direct before/after test of its editorial quality on something you already own.

## 6. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 55939 (+5244 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that gives AI coding assistants (Claude, Cursor, Copilot) access to 12 production pipelines and 100+ tools covering scripting, asset generation, editing, and final composition.

**Why now:** The repo hit #1 on GitHub Trending this week, surfacing it to a large builder audience at a moment when agentic coding workflows are a live topic across the developer community.

**Build with it:** Point your Claude or Cursor agent at the included `AGENT_GUIDE.md` and run one of the 12 named pipelines against a video URL using the "paste a video you already love" entry point to validate the end-to-end generation workflow.

## 7. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 60786 (+4969 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a free MIT-licensed AI gateway that exposes 352 providers and 1,200+ models through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression that cuts usage 15–95%.

**Why now:** The repo crossed 60,000 stars this week with nearly 5,000 added in seven days, driven by active community growth across Discord, Telegram, and WhatsApp as free-tier AI access becomes a practical constraint for solo builders.

**Build with it:** Point your existing Claude Code or Cursor `OPENAI_BASE_URL` config at the OmniRoute endpoint to get automatic fallback across 150+ free-tier providers without changing any other code.

## 8. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 77769 (+2281 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Cursor, Claude Code, etc.) read and search access to Twitter, Reddit, YouTube, Bilibili, GitHub, and XiaoHongShu without API fees or manual scraper setup.

**Why now:** The repo hit GitHub Trending #1 this week, surfacing at a moment when MCP (Model Context Protocol) tooling is the active build surface for agent infrastructure teams.

**Build with it:** Wire it into a Cursor or Claude Code session via MCP config and prompt your agent to pull a Reddit thread or YouTube transcript directly — validating the zero-fee scraping path in one conversation.

## 9. MadsLorentzen/ai-job-search

https://github.com/MadsLorentzen/ai-job-search · ★ 40535 (+4466 this week) · ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume

**What it does:** A Claude Code-based CLI framework that scrapes job portals, scores fit against your profile, and runs a drafter-reviewer pipeline to produce tailored LaTeX CVs and cover letters.

**Why now:** The repo gained 4,466 stars this week, surfacing alongside a wave of Claude Code workflow repos as developers explore agentic CLI tooling post-Claude Code launch.

**Build with it:** Fork the repo, drop your profile into the provided profile files, then run `/apply <url>` against a real job posting to validate the drafter-reviewer critique loop on your own CV.

## 10. Imbad0202/academic-research-skills

https://github.com/Imbad0202/academic-research-skills · ★ 45926 (+2119 this week) · academic-pipeline, academic-writing, ai-research, claude, claude-code, literature-review, peer-review, prompt-engineering

**What it does:** Academic Research Skills is a Claude Code plugin that automates citation verification, reference hunting, and logical consistency checks across a structured research-to-publication pipeline, keeping the human researcher in control of interpretation and argument.

**Why now:** Zhao et al.'s May 2026 audit of 111M references found 146,932 hallucinated citations in 2025 alone, making verifiable source provenance an active, documented problem that ARS v3.8's opt-in claim-audit pass (`ARS_CLAIM_AUDIT=1`) directly addresses.

**Build with it:** Install via `/plugin marketplace add Imbad0202/academic-research-skills` in Claude Code and run `/ars-plan` to walk a paper structure through Socratic dialogue with integrity gates at stages 2.5 and 4.5.
