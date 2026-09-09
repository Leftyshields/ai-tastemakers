# Skill Tastemakers — Daily Brief — 2026-09-09

_Ranking: delta_7d · 10 repos · generated 2026-09-09T17:11:01.989Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 133180 (+13482 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an agent skill (npm: `@dietrichgebert/ponytail`) that injects a YAGNI-first heuristic into AI coding agents like Claude Code and Cursor, steering them toward minimal native solutions instead of installing libraries and generating boilerplate.

**Why now:** A Hacker News thread this week surfaced the project to 98 upvotes, and it hit Trendshift's daily and weekly trending charts — benchmarks in the repo claim ~54% less generated code on average across 12 real feature tasks.

**Build with it:** Drop the skill into an existing Claude Code or Cursor project via the npm package and run it against a feature branch to measure how many dependency installs and wrapper files it eliminates before you merge.

## 2. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 254938 (+9307 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness optimization system that layers skills, memory, security (via `ecc-agentshield`), and research-first workflows onto AI coding agents like Claude Code, Codex, and Cursor.

**Why now:** The repo gained over 9,300 stars this week, coinciding with rising Claude Code adoption as Anthropic's agentic coding tooling becomes a primary developer workflow.

**Build with it:** Install `ecc-universal` from npm and drop the harness config into an existing Claude Code project to immediately add persistent memory and instinct layers to your agent sessions.

## 3. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 36316 (+7083 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** A Claude Code skill that generates 39 editorial diagram types (architecture, flowchart, Sankey, Wardley map, UML class, and more) as self-contained HTML + SVG with no build step, no Mermaid, and no generic rounded boxes.

**Why now:** The repo gained 7,000+ stars this week, signaling a surge of builders hitting the same pain point of AI-generated diagrams that look nothing like their actual site.

**Build with it:** Drop the skill into a Claude Code project and run it against an existing draw.io or Mermaid source to get a brand-matched editorial redraw at a chosen format and detail level.

## 4. blader/humanizer

https://github.com/blader/humanizer · ★ 45878 (+6317 this week) · agent-skills, ai-writing, claude-code, codex, cursor, prompt-engineering, writing-tools

**What it does:** Humanizer is an agent skill that rewrites AI-generated text to sound human by detecting and correcting 25 specific patterns—like staged run-ups, dramatic fragments, and hollow sayings—without altering facts or structure.

**Why now:** The repo gained 6,317 stars this week, signaling a sharp spike in builder interest likely tied to growing scrutiny of AI-written content in published work.

**Build with it:** Add it globally via `npx skills add blader/humanizer --global` and wire `/humanizer` into your doc-generation pipeline as a post-write pass before any content ships.

## 5. stablyai/orca

https://github.com/stablyai/orca · ★ 64941 (+5885 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile IDE that runs multiple coding agents (Codex, Claude Code, OpenCode, Pi) in parallel git worktrees, letting you fan out one prompt to several agents and merge the best result.

**Why now:** The repo gained nearly 6,000 stars this week, signaling a rapid surge in builder attention likely tied to the current wave of agentic coding tool adoption across the dev community.

**Build with it:** Point Orca at an existing repo, spin up three parallel worktrees with the same feature prompt across Claude Code and Codex, then diff the outputs to pick the winning branch.

## 6. Imbad0202/academic-research-skills

https://github.com/Imbad0202/academic-research-skills · ★ 47238 (+2493 this week) · academic-pipeline, academic-writing, ai-research, claude, claude-code, literature-review, peer-review, prompt-engineering

**What it does:** A Claude Code plugin that covers the full academic research pipeline—literature search, citation verification, logical consistency checks, and style calibration—while keeping the researcher in the loop via integrity gates at key stages.

**Why now:** The repo gained 2,493 stars this week, coinciding with the Zhao et al. audit finding 146,932 hallucinated citations in 2025 alone, which makes citation-chain tools acutely relevant.

**Build with it:** Install via `/plugin marketplace add Imbad0202/academic-research-skills` in Claude Code and run `ARS_CLAIM_AUDIT=1` to wire the claim-level citation audit pass into your existing writing workflow.

## 7. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 243760 (+4354 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python AI agent that creates and refines skills from experience, maintains cross-session memory and user modeling, and runs across seven terminal backends (local, Docker, SSH, Modal, and others) while accepting input from Telegram, Discord, Slack, and other messaging platforms.

**Why now:** The repo crossed 243,000 stars with 4,354 added this week, signaling a sharp spike in builder attention likely tied to its recent public launch by Nous Research.

**Build with it:** Point it at your own model endpoint via `hermes model` and deploy to a Modal serverless backend so the agent hibernates between sessions, then wire Telegram as the front-end for remote task dispatch while you're away from your machine.

## 8. MadsLorentzen/ai-job-search

https://github.com/MadsLorentzen/ai-job-search · ★ 41567 (+1917 this week) · ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume

**What it does:** A Claude Code–based CLI framework that scrapes job portals, scores posting fit against your profile, and runs a drafter-reviewer pipeline to produce tailored LaTeX CVs and cover letters.

**Why now:** The repo gained nearly 1,900 stars this week, signaling a sharp spike in community traction that makes it a live benchmark for agentic job-search tooling right now.

**Build with it:** Swap the Danish portal scraping skills in `/scrape` for your local job boards by following the `AGENTS.md` pattern, then run the same `/apply <url>` pipeline against your own profile files.

## 9. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 63364 (+3657 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an MIT-licensed AI gateway that exposes 352 providers and 1,200+ models through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression (15–95% reduction) to keep tools like Claude Code, Cursor, and Cline running across pooled free tiers.

**Why now:** The repo gained 3,657 stars this week, signaling a surge of builders actively hunting free-tier stacking strategies as paid API costs compound across daily coding workflows.

**Build with it:** Point Cursor or Cline's OpenAI base URL at your local OmniRoute instance and let the auto-fallback routing consume the cataloged ~1.47B free monthly tokens before a single paid call is made.

## 10. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 79035 (+1713 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) read and search access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without API fees, handling auth, scraping, and HTML cleanup internally.

**Why now:** The repo hit GitHub Trending #1 this week with 79K+ stars and a 1,713-star weekly spike, signaling rapid adoption among developers integrating web access into agentic workflows.

**Build with it:** Wire it into a Claude Code or Cursor session via its MCP config surface to let your agent pull YouTube transcripts or Reddit threads directly during a research or coding task.
