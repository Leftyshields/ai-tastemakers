# Skill Tastemakers — Daily Brief — 2026-09-07

_Ranking: delta_7d · 10 repos · generated 2026-09-07T18:16:40.336Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 130727 (+13730 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a skill/prompt layer for AI coding agents (Claude Code, Cursor, and 19 others) that enforces a YAGNI-first style — steering the agent to reach for native browser APIs and built-ins before installing dependencies or writing boilerplate.

**Why now:** The repo hit Hacker News this week and is trending daily and weekly on Trendshift, surfacing the debate around AI agents that over-build by default.

**Build with it:** Drop the ponytail skill into an existing Claude Code session and run a feature task (e.g., a date picker) to measure token and line-count delta against your baseline agent.

## 2. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 252567 (+7992 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness configuration system that layers skills, memory, security (via `ecc-agentshield`), and research-first workflows on top of AI coding agents like Claude Code, Codex, and Cursor.

**Why now:** The repo gained roughly 8,000 stars this week, coinciding with rapid adoption of Claude Code as a primary agentic coding tool, making ECC's harness patterns immediately applicable to workflows developers are setting up right now.

**Build with it:** Install `ecc-universal` from npm and drop its config into an existing Claude Code project to add structured memory and instinct layers without changing your underlying agent setup.

## 3. stablyai/orca

https://github.com/stablyai/orca · ★ 63394 (+6198 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE that runs multiple coding agents (Codex, Claude Code, OpenCode, Pi) simultaneously, each isolated in its own git worktree, tracked from a single UI.

**Why now:** The project hit a Show HN this week and is gaining rapid traction, landing as the repo picked up 6,198 stars in seven days — the parallel-agent workflow is clearly resonating as Codex and Claude Code adoption spikes.

**Build with it:** Fan a single feature prompt across three parallel worktrees via Orca's UI, let each agent implement independently, then diff and merge the winning branch — validating whether multi-agent parallelism cuts your iteration time.

## 4. blader/humanizer

https://github.com/blader/humanizer · ★ 44897 (+5916 this week) · agent-skills, ai-writing, claude-code, codex, cursor, prompt-engineering, writing-tools

**What it does:** Humanizer is an agent skill that rewrites AI-generated text by detecting 25 named patterns—staged phrasing, dramatic fragments, hollow emphasis—and replacing them with direct, human-sounding prose without altering facts.

**Why now:** The repo gained nearly 6,000 stars this week, signaling a sharp spike in builder interest likely tied to growing demand for AI-to-human post-processing in publishing and content pipelines.

**Build with it:** Wire it into a Claude Code workflow via `/plugin marketplace add blader/humanizer` and call `/humanizer:humanizer` as a post-generation step on any drafted markdown file before review.

## 5. herdrdev/herdr

https://github.com/herdrdev/herdr · ★ 36086 (+2482 this week) · agent, agent-orchestration, ai, ai-agents, claude-code, cli, codex, coding-agents, developer-tools, devtools, multiplexer, rust, terminal, terminal-multiplexer, terminal-ui, tmux, tui, workspace-manager

**What it does:** Herdr is a Rust background server that owns the terminals of coding agents (Claude Code, Codex, Cursor, etc.), keeping sessions alive across disconnects and exposing a CLI and socket API so agents can spawn panes, prompt each other, and surface blocked states without manual supervision.

**Why now:** The repo gained 2,482 stars this week, signaling a surge in builder attention coinciding with the current wave of autonomous coding-agent workflows where session persistence and inter-agent coordination are active pain points.

**Build with it:** Wire an existing Claude Code or Codex workflow into herdr using the [agent skill](https://herdr.dev/docs/agent-skill/) config, then use the socket API to poll pane status and auto-respond when an agent reports `blocked`.

## 6. K-Dense-AI/scientific-agent-skills

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 43590 (+4750 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** Scientific Agent Skills is a Python library of 163 validated, ready-to-use research skills—covering genomics, drug discovery, proteomics, and 100+ scientific databases—that plugs into any AI agent supporting the open Agent Skills standard.

**Why now:** The repo gained 4,750 stars this week alongside the release of K-Dense BYOK, a free open-source desktop co-scientist powered by these skills, with a hands-on webinar walkthrough now publicly available on YouTube.

**Build with it:** Drop the skills into a Cursor or Claude Code workspace via the Agent Skills config to immediately give your coding agent live access to pathogen-variant surveillance, PK/PD modelling, and regulatory-sequence prediction without writing any tool wrappers.

## 7. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 242978 (+4554 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python AI agent that creates and refines skills from experience, searches past sessions, builds a persistent user model via Honcho, and runs across seven execution backends (local, Docker, SSH, Modal, and others) with a single model-switching command.

**Why now:** The repo crossed 242,000 stars with 4,500+ added this week, signaling a sharp spike in builder attention around its closed learning loop and serverless-idle cost model.

**Build with it:** Wire it to Telegram using the built-in gateway process and a Modal backend so the agent hibernates when idle — then test the skill-creation loop by running a multi-step coding task and inspecting what skills it auto-generates.

## 8. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 33212 (+4453 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** Diagram Design is a Claude Code skill that generates 39 editorial diagram types (architecture, flowchart, Sankey, Wardley map, UML class, and more) as self-contained HTML + SVG with no build step, no Mermaid defaults, and no external dependencies.

**Why now:** The repo gained 4,453 stars this week and hit Trendshift trending, coinciding with the v2.5.10 release adding ten new layout grammars including Wardley maps and database schema diagrams.

**Build with it:** Drop the skill into an existing Claude Code project and invoke it against a draw.io or Mermaid source file to redraw it at a chosen format, size, and detail level without touching Figma.

## 9. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 62403 (+3920 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript AI gateway that exposes a single OpenAI-compatible endpoint across 352 providers, with quota-aware auto-fallback and RTK+Caveman token compression (15–95% savings) to maximize ~1.47B catalogued free tokens per month.

**Why now:** The repo gained 3,920 stars this week, signaling a surge of builders actively routing Claude Code, Cursor, and Cline traffic through it right now.

**Build with it:** Point your Claude Code or Cursor `OPENAI_BASE_URL` at a local OmniRoute instance and let its 19 routing strategies auto-fallback across free Gemini, Claude, and Groq tiers before you spend a dollar.

## 10. coreyhaines31/marketingskills

https://github.com/coreyhaines31/marketingskills · ★ 47992 (+1849 this week) · claude, codex, marketing

**What it does:** A collection of markdown skill files that give AI coding agents (Claude Code, Cursor, Codex, Windsurf) specialized frameworks for marketing tasks — CRO, SEO, copywriting, paid ads, and growth engineering — anchored by a `product-marketing` skill that every other skill reads first for context.

**Why now:** The repo crossed 47,000 stars with nearly 1,900 added this week, signaling a rapid surge in adoption as technical marketers move toward agent-driven workflows over manual tooling.

**Build with it:** Drop the `product-marketing` skill file into your Claude Code project, then invoke the `CRO` skill on a landing page to get conversion-focused copy and test hypotheses grounded in your actual product positioning.
