# Skill Tastemakers — Daily Brief — 2026-11-16

_Ranking: delta_7d · 10 repos · generated 2026-11-16T23:44:46.253Z_


## 1. Nutlope/hallmark

https://github.com/Nutlope/hallmark · ★ 56106 (+5290 this week) · —

**What it does:** Hallmark is a design skill for Claude Code, Cursor, and Codex (AI coding assistants that generate frontend code) that picks from 50 material-based themes, structures pages around their primary action, and lints the result in a real browser for specific AI-slop patterns like eyebrow headings, tracked-capital labels, and hero sections that don't fit the screen.

**Why now:** Built by Together AI, the project surfaced on Hacker News this week just as AI coding tools have become the default way teams ship frontends.

**Build with it:** Drop Hallmark into an existing Claude Code project and run `/hallmark audit <path>` against a page you already shipped to get a concrete report of AI-generated design patterns before your next deploy.

## 2. lemomo-ai/lemo-opuscar

https://github.com/lemomo-ai/lemo-opuscar · ★ 17258 (+3593 this week) · agent-skills, ai-agents, ai-short-film, ai-video, animation, canvas, claude, claude-code, claude-code-plugin, claude-code-skill, creative-coding, ffmpeg, filmmaking, motion-graphics, opus-5-5, prompt-library, text-to-speech, threejs, video-production, webgl

**What it does:** Lemo-Opuscar gives Claude Code a library of 99 film-style visual prompts, each paired with a demo short film generated entirely in code using WebGL, Three.js, Canvas, and FFmpeg, with no video model required.

**Why now:** The project added 33 new styles this week, reaching 99 across 15 categories, rebuilt its English and Chinese gallery with per-style pages, and picked up 3,593 stars in that window.

**Build with it:** Install the Claude Code plugin with `claude plugin marketplace add lemomo-ai/lemo-opuscar`, then prompt your agent with a single sentence naming a style and a subject to get a rendered film dropped into your working folder.

## 3. morluto/rea

https://github.com/morluto/rea · ★ 464078 (+20830 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a protocol for connecting tools to AI agents) that lets AI agents reverse engineer closed binaries, mobile apps, and runtime behavior down to the native instruction level, without source code.

**Why now:** A Hacker News thread this week drew 101 points and 39 comments discussing agent-driven binary analysis, putting the tool in front of a large builder audience.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent such as Claude Code, then have it inspect a closed app feature and export the findings as a starting point for your own implementation.

## 4. elementalsouls/Claude-BugHunter

https://github.com/elementalsouls/Claude-BugHunter · ★ 7428 (+1935 this week) · ai-security, anthropic, application-security, bug-bounty, bugbounty, bugcrowd, claude, claude-code, claude-skills, ethical-hacking, hackerone, offensive-security, pentesting, red-team, security-tools, web-security

**What it does:** Claude-BugHunter is a Claude Code skill bundle that loads 83 skills and 15 slash commands covering 681 disclosed HackerOne report patterns across 24 vulnerability classes, plus enterprise identity and infrastructure attack chains for authorized red-team and bug-bounty work.

**Why now:** The repo gained nearly 2,000 stars this week, tracking a sharp spike in builder interest around Claude Code's plugin and skills system as a surface for security tooling.

**Build with it:** Install via `/plugin marketplace add elementalsouls/Claude-BugHunter` inside Claude Code, then describe a target surface in plain English to trigger the matching `hunt-*` skill and get detection patterns, payloads, and chain templates without manual invocation.

## 5. eternity4719/HowToLiveBetter

https://github.com/eternity4719/HowToLiveBetter · ★ 76112 (+1736 this week) · —

**What it does:** A Chinese-language life-optimization reference with 772 evidence-graded tips covering health, law, finance, and social systems in mainland China, each entry citing peer-reviewed journals or official documents with cost-benefit breakdowns.

**Why now:** The repo gained over 1,700 stars this week, making it a timely data source for tools targeting Chinese-speaking users who need practical, cited guidance on everyday decisions.

**Build with it:** Install the included Claude Code or Codex skill from the `skills/life-decision-guide/` directory to wire the book's indexed entries into an AI assistant, letting users query specific tips by section and item number.

## 6. Tencent/LoopForge <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Tencent/LoopForge · ★ 2319 (+1489 this week) · agent-orchestration, agentic-workflow, ai-agents, ai-coding, claude-code, code-review, codebuddy, codex, coding-agents, cursor, developer-tools, human-on-the-loop, llm, mcp, multi-agent, sdlc, self-hosted, sop, workflow-automation, workflow-engine

**What it does:** LoopForge is a self-hosted Go platform where teams ship code by chatting with a Main Bot that spins up Docker sandboxes, runs coding-agent CLIs including CodeBuddy, Codex, and Claude Code, and delivers pull requests through repeatable SOP workflows with human approval gates.

**Why now:** The repo gained 1,489 stars this week, reflecting growing builder attention around platforms that orchestrate multiple coding agents rather than running them one at a time.

**Build with it:** Wire an existing Claude Code or Codex setup into a LoopForge SOP node, add a human-gate step before merge, and validate the full chat-to-PR loop against one real repository.

## 7. Egonex-AI/Understand-Anything

https://github.com/Egonex-AI/Understand-Anything · ★ 92860 (+1381 this week) · antigravity-skills, business-knowledge, claude-code, claude-skills, codebase-analysis, codex, codex-skills, developer-tools-ai-agent, gemini-cli-skills, karpathy-llm-wiki, knowledge-base, knowledge-graph, memory, opencode-skills, pi-agent, understandcode, vibe-coding

**What it does:** Understand Anything is a Claude Code plugin that runs a multi-agent pipeline over any codebase and renders an interactive, searchable knowledge graph of every file, function, class, and dependency.

**Why now:** The repo is trending at nearly 93,000 stars with 1,381 added this week, tracking a surge of interest in AI-assisted codebase onboarding across the Claude Code and Gemini CLI ecosystems.

**Build with it:** Install it as a Claude Code plugin, point it at an unfamiliar repo, and use the generated graph as a navigation layer to answer "where does X get called" questions before writing any new code.

## 8. stablyai/orca

https://github.com/stablyai/orca · ★ 126755 (+7594 this week) · agent-ide, ai-agents, automation, bot, claude-code, codex, ghostty, grok-bot, hermes-agent, mobile-app, muse, openclaw, opencode, orchestration, pi, runtime, swarm, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop, mobile, and remote app that runs multiple coding agents including Claude Code and Codex in parallel git worktrees, with chat, terminal, diffs, and a browser in one interface.

**Why now:** The repo gained roughly 7,500 stars this week, tracking a spike in builder interest around multi-agent coding workflows as Claude Code adoption grows.

**Build with it:** Point Orca at an existing repo, assign a coordinator agent a large feature, and let it spawn worker agents in isolated worktrees to test whether parallel agent orchestration cuts your iteration time on real tasks.

## 9. mattpocock/skills

https://github.com/mattpocock/skills · ★ 325944 (+7554 this week) · —

**What it does:** A collection of small, composable agent skills for Claude Code, Codex, Copilot, and other coding agents that give engineers structured workflows for triage, spec, and setup without handing over full process control.

**Why now:** The repo gained over 7,500 stars this week, likely tied to growing frustration with all-or-nothing agent frameworks like BMAD and GSD.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to drop editable skill files into an existing Cursor project, then invoke `/setup-matt-pocock-skills` to wire in your issue tracker and triage labels.

## 10. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 68100 (+1094 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** An agent skill that queries Reddit, X, YouTube, Hacker News, Polymarket, GitHub, and TikTok in parallel, scores results by upvotes, likes, and prediction-market odds, and returns a synthesized brief on any person or topic from the last 30 days.

**Why now:** The repo hit GitHub Trending number one this week, arriving at a moment when fragmented platform APIs make cross-network recency research a common pain point for builders vetting people before meetings or launches.

**Build with it:** Install via `npx skills add mvanhorn/last30days-skill -g` and wire `/last30days` as a pre-meeting research step inside a Claude Code workflow to pull live context on any name or topic without manual platform-hopping.
