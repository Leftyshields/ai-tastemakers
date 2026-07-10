# Skill Tastemakers — Daily Brief — 2026-07-10

_Ranking: delta_7d · 10 repos · generated 2026-07-10T15:41:42.153Z_


## 1. stablyai/orca

https://github.com/stablyai/orca · ★ 15791 (+4270 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source desktop and mobile IDE that lets you run multiple coding agents (Codex, Claude Code, OpenCode, or Pi) in parallel, each isolated in its own git worktree, with a unified interface for comparing and merging results.

**Why now:** It gained 4,270 GitHub stars this week, signaling a sharp spike in developer interest around multi-agent orchestration workflows as teams look to run agents in parallel rather than sequentially.

**Build with it:** Use Orca to fan a single feature prompt across five agents simultaneously, benchmark their outputs against each other, and ship the best implementation—cutting iteration time on complex coding tasks from hours to minutes.

## 2. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 76571 (+7839 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** Agent Skills is a collection of 24 production-grade slash commands (like `/spec`, `/build`, `/test`, `/ship`) that encode senior engineering workflows—spec writing, TDD, code review, performance auditing—so AI coding agents follow consistent best practices across every phase of development.

**Why now:** The project gained nearly 8,000 stars this week, likely driven by the new `npx skills` CLI that installs the full skill set into 70+ agents including Claude Code, Cursor, and Codex in a single command.

**Build with it:** Drop these skills into your Claude Code or Cursor setup and enforce real engineering gates on an AI-assisted project—run `/spec` to lock requirements before any code is written, then `/build auto` to let the agent implement and commit each task autonomously while still pausing on failures.

## 3. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 55683 (+7661 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** A public GitHub repository that collects and publishes extracted system prompts from major AI products including Claude, ChatGPT, Gemini, Grok, Copilot, and Cursor, updated regularly as new models ship.

**Why now:** The repo gained 7,661 stars this week and was featured in The Washington Post, signaling mainstream attention on AI transparency at a moment when Claude Sonnet 5 and GPT-5.5 Codex prompts were just added.

**Build with it:** Use the published prompts as a benchmark to reverse-engineer competitor product personas, calibrate your own system prompt design, or build a diff-tracking tool that alerts teams when major AI products quietly update their instructions.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 79902 (+7252 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces YAGNI discipline—prompting the agent to reach for the simplest existing solution before writing new code, averaging 54% fewer lines of code generated across real tasks.

**Why now:** It hit 79,902 stars with 7,252 added this week, signaling a sharp community reaction against AI agents that over-build, and its benchmarks were just published against a real FastAPI + React codebase for credibility.

**Build with it:** Drop the skill into your Claude Code or Cursor setup to ship leaner features faster—or fork the benchmark harness to measure how much bloat your own agent produces and tune a custom constraint prompt from there.

## 5. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 61661 (+6248 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a set of portable agent skills (Markdown instruction files) that you drop into Codex, Cursor, or Claude Code to enforce opinionated layout, typography, spacing, and motion rules, steering AI code generation away from generic boilerplate UI.

**Why now:** The repo gained 6,248 stars this week, coinciding with the mainstream adoption of agentic coding tools like Claude Code and Codex where output quality—not just correctness—has become the core complaint.

**Build with it:** Drop the `design-taste-frontend` skill into your Claude Code or Cursor project and use it as a style enforcer when generating a SaaS dashboard, landing page, or component library, then pair the image-generation skills with ChatGPT Images to produce reference frames before handing off to the coding agent.

## 6. iOfficeAI/OfficeCLI

https://github.com/iOfficeAI/OfficeCLI · ★ 14209 (+5872 this week) · agent, ai, claude-code, cli, codex, docx, excel, office, openclaw, pptx, presentation, skills, word, xlsx

**What it does:** OfficeCLI is an open-source, single-binary CLI tool that lets AI agents programmatically read, write, and render Word, Excel, and PowerPoint files without any Office installation, exposing a skill interface that coding agents like Claude Code and Cursor can invoke directly.

**Why now:** The project jumped nearly 6,000 stars this week, signaling sharp community interest at the exact moment AI coding agents are becoming standard developer workflow tools that still largely fumble document generation.

**Build with it:** Wire OfficeCLI into an AI agent pipeline to auto-generate client-ready deliverables — proposals, financial models, slide decks — straight from structured data or LLM output, with HTML/PNG rendering so the agent can visually verify and iterate on what it produced.

## 7. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 87610 (+5039 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a prompt skill/plugin that instructs AI coding agents (Claude Code, Cursor, Copilot, and 30+ others) to drop filler language and respond in minimal caveman-speak, cutting output token counts by roughly 65% while keeping code, commands, and error messages exactly intact.

**Why now:** The repo hit 87,610 stars with 5,039 added this week, signaling it caught a nerve at a moment when developers running agents in tight loops are actively paying attention to output token costs and latency.

**Build with it:** Drop the install script into your team's onboarding dotfiles or dev container setup so every engineer's agent runs leaner by default, then fork the prompt levels to tune verbosity for your specific workflow—verbose for junior devs, caveman-max for CI summarization tasks.

## 8. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 54338 (+4666 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, Windsurf, etc.) the ability to read and search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and the open web — without paid APIs, by routing through free backends and browser login states.

**Why now:** It hit GitHub's #1 trending repository this week with 54,338 stars and a 4,666-star spike, driven partly by a live example of its backend-swapping resilience — yt-dlp got blocked by Bilibili's anti-scraping, and Agent Reach silently rerouted to bili-cli with zero user action required.

**Build with it:** Drop `agent-reach` into any agentic workflow to add real-time social and web data — scrape competitor Twitter sentiment, summarize YouTube tutorials, pull Reddit bug threads, or monitor RSS feeds — all triggered by natural language inside your existing agent loop.

## 9. ogulcancelik/herdr

https://github.com/ogulcancelik/herdr · ★ 15104 (+4595 this week) · agent, agent-orchestration, ai, ai-agents, claude-code, cli, codex, coding-agents, developer-tools, devtools, multiplexer, rust, terminal, terminal-multiplexer, terminal-ui, tmux, tui, workspace-manager

**What it does:** Herdr is a Rust-based terminal multiplexer that lets you run multiple AI coding agents (Claude Code, Codex, etc.) simultaneously in split panes, with a socket API so agents can spawn panes, read output, and coordinate with each other programmatically.

**Why now:** It gained 4,595 GitHub stars this week, signaling a surge of developer interest precisely as multi-agent coding workflows are becoming a practical daily tool rather than a demo concept.

**Build with it:** Wire up a pipeline where one orchestrator agent spawns specialized sub-agents across herdr panes via the socket API, monitors their output for completion signals, and aggregates results — effectively a lightweight local agent runtime without any cloud dependency.

## 10. alirezarezvani/claude-skills

https://github.com/alirezarezvani/claude-skills · ★ 22014 (+2205 this week) · agent-plugins, agent-skills, agentic-ai, ai-coding-agent, anthropic-claude, claude-ai, claude-code, claude-code-plugins, claude-code-skills, claude-skills, codex-skills, coding-agent-plugins, cursor-skills, developer-tools, gemini-cli-skills, openai-codex, openclaw, openclaw-plugins, openclaw-skills, prompt-engineering

**What it does:** Claude Skills is an open-source library of 355 modular instruction packages (SKILL.md files, Python CLI tools, and reference templates) that give AI coding agents like Claude Code, Codex, and Gemini CLI domain expertise in areas ranging from security auditing to CFO-level financial advisory.

**Why now:** The repo gained 2,205 stars this week, likely driven by growing adoption of agentic coding workflows and the recent addition of Gemini CLI support, making it one of the most actively trending agent-tooling projects on GitHub right now.

**Build with it:** Clone the repo and drop a domain-specific SKILL.md into your Claude Code or Gemini CLI setup to instantly give your coding agent specialized behavior — for example, wire the security skill with PreToolUse hooks to audit every file write before it happens, or combine the CFO and CRO personas to prototype a revenue-model advisor that runs entirely in your terminal.
