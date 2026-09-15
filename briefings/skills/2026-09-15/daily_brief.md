# Skill Tastemakers — Daily Brief — 2026-09-15

_Ranking: delta_7d · 10 repos · generated 2026-09-15T17:41:41.104Z_


## 1. kepano/obsidian-skills

https://github.com/kepano/obsidian-skills · ★ 48376 (+8267 this week) · agents, agentskills, bases, claude, clawdbot, cli, codex, defuddle, hermes, jsoncanvas, knap, markdown, md, obsidian, openclaw, opencode, skills

**What it does:** A collection of Agent Skills spec–compatible skill files that teach Claude Code, Codex, and OpenCode how to read and write Obsidian-native formats — Markdown with wikilinks, Bases, JSON Canvas — and interact with the Obsidian CLI.

**Why now:** The repo gained 8,267 stars this week, signaling a surge of builder interest likely driven by the Agent Skills specification gaining traction across multiple coding agents simultaneously.

**Build with it:** Run `npx skills add https://github.com/kepano/obsidian-skills` in your Obsidian vault root, then prompt Claude Code to generate or update `.base` files using the `obsidian-bases` skill.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 139199 (+7261 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent skill that injects a "laziest senior dev" heuristic into AI coding agents (Claude Code, Cursor, and 19 others), steering them toward minimal solutions — native `<input type="date">` instead of flatpickr — measured at ~54% fewer lines of generated code on average.

**Why now:** The repo hit Hacker News this week (98 points, 17 comments) while adding 7,000+ stars, surfacing active builder discussion around YAGNI-style agent constraints.

**Build with it:** Drop the ponytail skill into your Claude Code setup via the npm package `@dietrichgebert/ponytail` and run it against your next feature branch to benchmark how much code your agent stops writing.

## 3. tech-leads-club/agent-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/tech-leads-club/agent-skills · ★ 6235 (+1086 this week) · agent, ai, antigravity, claude-code, copilot, cursor, skills

**What it does:** Agent Skills is a curated, security-scanned TypeScript registry of packaged instructions (skills) that extend AI coding agents like Claude Code, Cursor, and Copilot via a hardened CLI with path isolation, content hashing, and Snyk Agent Scan validation.

**Why now:** The project gained over 1,000 stars this week, coinciding with growing industry attention on a reported 13.4% critical-vulnerability rate in open skill marketplaces — making a vetted alternative newly relevant.

**Build with it:** Install `@tech-leads-club/agent-skills` from npm and drop a skill's `SKILL.md` into your Cursor or Claude Code agent config to add a verified, tested workflow without touching your own prompt infrastructure.

## 4. Untrivial-ai/agent-orchestrator <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Untrivial-ai/agent-orchestrator · ★ 12074 (+973 this week) · agent-fleet, agent-ide, agent-orchestration, agent-swarm, claude-code, codex-cli, git-worktrees, multi-agent, orchestration, orchestrator, parallel-agents, parallel-coding, skills

**What it does:** Agent Orchestrator is a local desktop app that assigns each coding task its own agent session, Git worktree, and branch, then surfaces all pull requests, CI runs, and review states in a shared live Kanban.

**Why now:** The repo gained ~973 stars this week and sits in the GitHub top 6k, signaling a sharp uptick in builder interest around parallel agent workflows as Claude Code and Codex CLI usage scales.

**Build with it:** Add an existing repository to AO, spin up two worker sessions against the same codebase using different branches, and use the Kanban to validate that AO's worktree isolation actually prevents the branch collisions it promises.

## 5. router-for-me/CLIProxyAPI

https://github.com/router-for-me/CLIProxyAPI · ★ 51938 (+948 this week) · antigravity, claude-code, cluade, codex, gemini, openai

**What it does:** CLIProxyAPI is a Go proxy server that exposes OpenAI-, Gemini-, and Claude-compatible API endpoints for CLI tools (Claude Code, Codex, Grok Build, Antigravity), letting you route multiple accounts through a single local service.

**Why now:** The repo gained nearly 950 stars this week, coinciding with the README listing Kimi K3—a newly launched 2.8-trillion-parameter model with a 1M-token context window—as a supported backend alongside GPT-5.6 and Grok 4.5.

**Build with it:** Point an existing OpenAI-SDK-based script at the local proxy URL and swap in a Kimi or Grok backend by changing only the `base_url` and API key, with zero changes to client code.

## 6. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 40151 (+5878 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** A Claude Code skill that generates 39 editorial diagram types (architecture, flowchart, Sankey, Wardley map, UML class, and more) as self-contained HTML + SVG with no build step, no shadows, and no generic rounded boxes.

**Why now:** The repo gained nearly 6,000 stars this week, signaling a sharp spike in discovery — likely from builders frustrated with Mermaid's output quality hitting a tipping point.

**Build with it:** Drop the skill into a Claude Code session and point it at an existing draw.io or Mermaid file to redraw it at your chosen format and detail level.

## 7. max-sixty/worktrunk <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/max-sixty/worktrunk · ★ 7755 (+876 this week) · agents, claude-code, codex, developer-tools, git, worktrees

**What it does:** Worktrunk is a Rust CLI that wraps git worktrees into three core commands, letting you spin up isolated working directories so multiple AI agents (Claude Code, Codex) can run in parallel on the same repo.

**Why now:** The project launched earlier this year and gained 876 stars this week, coinciding with surging adoption of Claude Code and Codex for long-running autonomous tasks where parallel isolation matters.

**Build with it:** Wire Worktrunk's hooks into your existing Claude Code workflow to automatically provision a fresh worktree per agent invocation, keeping concurrent runs from stomping on each other's state.

## 8. Vincentwei1021/video-shotcraft <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Vincentwei1021/video-shotcraft · ★ 8666 (+871 this week) · agent-skills, ai-agents, ai-video, claude-code, claude-code-skills, claude-skills, codex, motion-design, motion-graphics, product-video, promo-video, remotion, video-generation, video-production

**What it does:** video-shotcraft is a TypeScript agent skill for Claude Code and Codex that storyboards, animates, and sound-designs cinematic product promo videos using Remotion, drawing from 157 shot recipe cards and 214 named motion styles.

**Why now:** The repo gained 871 stars this week and is trending on Trendshift's daily TypeScript chart, coinciding with the September 2026 launch of the browser-based Motion Workbench that lets builders edit delivered films in a CapCut-style timeline without re-prompting the agent.

**Build with it:** Point Claude Code at an existing product page, let the skill generate a Remotion project, then open the Motion Workbench (`node workbench/scripts/open.mjs <project>`) to drag in alternate shots from the 214-motion library and re-export without touching code.

## 9. getpaseo/paseo

https://github.com/getpaseo/paseo · ★ 17382 (+867 this week) · ade, agents, android, claude-code, codex, copilot, developer-tools, hermes, ios, linux, mobile, opencode, orchestration, pi, windows

**What it does:** Paseo is a self-hosted orchestration layer that runs Claude Code, Codex, Copilot, OpenCode, and Pi agents in parallel, accessible from iOS, Android, desktop, web, and CLI through one interface.

**Why now:** The repo gained 867 stars this week alongside a 0.8 beta release that introduced a TypeScript plugin API for adding custom agent providers, themes, and workspace panels.

**Build with it:** Write a TypeScript plugin using `paseo plugin add <local-dir>` to wire in a custom coding-agent provider and expose it across all connected clients without touching the core daemon.

## 10. lidge-jun/opencodex

https://github.com/lidge-jun/opencodex · ★ 14745 (+801 this week) · ai-gateway, ai-tools, anthropic, chatgpt, claude, claude-code, codex, codex-cli, deepseek, developer-tools, gemini, grok, kiro, llm, llm-proxy, ollama, openai, openrouter, proxy, typescript

**What it does:** opencodex is a local TypeScript proxy that intercepts OpenAI Codex's Responses API and re-routes it to any LLM provider — Claude, Gemini, Grok, DeepSeek, Ollama, and 40+ others — across Codex, Claude Code, Claude Desktop, and Grok Build.

**Why now:** The repo gained 801 stars this week, tracking closely with active developer interest in routing around OpenAI Codex's closed provider lock-in as agentic coding tools proliferate.

**Build with it:** Run `npm install -g @bitkyc08/opencodex && ocx start`, then use the dashboard at `localhost:10100` to swap your Claude Code session's backend model without changing any client-side config.
