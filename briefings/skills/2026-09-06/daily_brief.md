# Skill Tastemakers — Daily Brief — 2026-09-06

_Ranking: delta_7d · 10 repos · generated 2026-09-06T16:17:02.015Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 128933 (+12724 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt skill / agent config layer (npm: `@dietrichgebert/ponytail`) that injects YAGNI-style constraints into AI coding agents — Claude Code, Cursor, and ~18 others — so they reach for the native HTML `<input type="date">` instead of installing flatpickr.

**Why now:** The repo hit Hacker News this week (98 points, 17 comments) while adding ~12,700 stars in seven days, surfacing active builder debate around agentic over-engineering.

**Build with it:** Drop the npm package into your Claude Code project as a skill and run your next feature task against a real codebase to measure token and line-count reduction directly against your current baseline.

## 2. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 250766 (+6648 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness configuration system that adds skills, memory, security (via `ecc-agentshield`), and research-first instincts to AI coding agents like Claude Code, Codex, and Cursor.

**Why now:** The repo gained 6,648 stars this week, tracking alongside the rapid adoption of Claude Code and Opencode as primary agentic development environments.

**Build with it:** Install `ecc-universal` from npm and drop the resulting config into your Claude Code project to immediately apply ECC's pre-built skill and memory layer to your agent sessions.

## 3. stablyai/orca

https://github.com/stablyai/orca · ★ 62633 (+5968 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE that runs multiple coding agents (Codex, Claude Code, OpenCode, Pi) simultaneously, each isolated in its own git worktree, so you can fan out one prompt across agents and merge the best result.

**Why now:** It surfaced on Hacker News this week as an open-source alternative combining conductor-style agent orchestration with Ghostty-class terminal rendering, drawing active discussion around parallel agent workflows.

**Build with it:** Point Orca at an existing repo, spawn three worktrees from one prompt via the parallel worktrees UI, and diff the resulting branches to validate which agent approach you'd actually ship.

## 4. K-Dense-AI/scientific-agent-skills

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 43225 (+5547 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** Scientific Agent Skills is a Python library of 163 validated research skills—covering genomics, drug discovery, proteomics, and more—that plugs into any Agent Skills-compatible AI agent (Cursor, Claude Code, Codex, Antigravity) to give it direct access to 100+ scientific databases.

**Why now:** The repo gained 5,547 stars this week and recently rebranded from Claude-only to a multi-agent standard (agentskills.io), expanding compatibility beyond Claude to any compliant agent runtime.

**Build with it:** Drop the skills into a K-Dense BYOK workspace with your own API keys to run live research workflows—PK/PD modelling, pathogen-variant surveillance, or regulatory-sequence prediction—against real databases without writing API glue code.

## 5. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 84804 (+2688 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a JavaScript framework of agent "skills" that constrain AI coding agents (Claude, Codex, etc.) to produce visually distinctive, non-generic frontend output instead of default boilerplate UI.

**Why now:** The repo gained 2,688 stars this week, signaling a sharp spike in builder interest likely tied to the current wave of vibe-coding workflows where low-effort AI UIs are flooding products.

**Build with it:** Drop a taste-skill skill into your Claude Code or Codex prompt pipeline and run it against an existing component to replace generic shadcn-default output with the framework's opinionated design constraints.

## 6. blader/humanizer

https://github.com/blader/humanizer · ★ 44009 (+5249 this week) · agent-skills, ai-writing, claude-code, codex, cursor, prompt-engineering, writing-tools

**What it does:** Humanizer is a Markdown-based agent skill that rewrites AI-generated text using 35 documented patterns from Wikipedia's AI writing cleanup project, preserving all factual claims while stripping formulaic phrasing.

**Why now:** The repo gained 5,249 stars this week, signaling a sharp spike in developer interest in post-processing AI output before it reaches readers.

**Build with it:** Drop `/humanizer` as a skill into your Claude Code or Cursor workflow to add a prose-cleanup step between AI draft generation and commit.

## 7. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 242362 (+4335 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving AI agent with a built-in learning loop that creates and refines skills from experience, searches past conversations, and persists a user model across sessions — deployable on local terminals, Docker, SSH, or serverless backends like Modal and Daytona.

**Why now:** The repo has accumulated over 242,000 stars with 4,335 added this week, signaling a sharp spike in builder interest coinciding with its public launch by Nous Research.

**Build with it:** Point it at your own model endpoint via `hermes model` and wire the built-in Telegram gateway to a cloud VM so the agent runs unattended, using the cron scheduler to deliver automated daily reports to your phone.

## 8. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 61897 (+3948 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted AI gateway that routes requests from Claude Code, Cursor, Cline, and Codex through a single OpenAI-compatible endpoint across 352 providers, with quota-aware auto-fallback and RTK+Caveman token compression (15–95% reduction) to keep free-tier budgets alive.

**Why now:** The repo gained ~3,948 stars this week, surfacing alongside active builder interest in free-tier stacking as paid API costs climb — the cataloged ~1.47B free tokens/month figure is re-audited bi-weekly and currently live.

**Build with it:** Point Cursor or Claude Code's OpenAI base URL at the OmniRoute local endpoint and let the 19 routing strategies handle provider fallback automatically — no SDK changes needed beyond the one config line.

## 9. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 32125 (+3586 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** Diagram Design is a Claude Code skill that generates 39 editorial diagram types — architecture, flowchart, Sankey, Wardley map, UML class, and more — as self-contained HTML/SVG with no build step, no shadows, and no generic rounded-box defaults.

**Why now:** The repo gained 3,586 stars this week alongside the v2.5.10 release, which added ten new layout grammars including dependency graphs, database schemas, and user journey maps.

**Build with it:** Drop the skill into Claude Code and point it at an existing draw.io or Mermaid file to redraw it at a chosen format, size, and detail level — the fastest way to test whether editorial output holds up against your current diagram source.

## 10. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 20936 (+1737 this week) · agent-skill, ai, anthropic, c2pa, chatgpt, claude, gemini, openai, provenance, synthid, watermark, watermark-detection, watermark-tools, watermarking, watermarks

**What it does:** `watermarks-remover` is a Python service plus agent skill that strips AI provenance marks from text and files—covering invisible Unicode, statistical token-sampling watermarks (Kirchenbauer, Aaronson/EXP), and file-level metadata (C2PA, EXIF, XMP, doc props) across Claude, Gemini/SynthID-Text, and OpenAI surfaces.

**Why now:** The repo gained 1,737 stars this week, coinciding with v0.7.0 shipping multi-vendor statistical watermark support and expanded file format coverage (AVIF, HEIC, EPUB, FLAC).

**Build with it:** Wire the service into a Claude Code workflow by running `python3 install_skill.py --skill remove-ai-marks --target claude-code`, then point `WATERMARKS_SERVICE_URL` at your local instance to automatically sanitize agent-generated content before it ships.
