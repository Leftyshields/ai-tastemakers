# Skill Tastemakers — Daily Brief — 2026-11-26

_Ranking: delta_7d · 10 repos · generated 2026-11-26T23:43:44.407Z_


## 1. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 121971 (+3096 this week) · agent-skills, ai-agents, anti-slop, claude-code, codex, cursor, design-system, frontend, landing-page, ui-design, web-design

**What it does:** Taste Skill is an agent skill (v2.5.1) that instructs coding agents like Cursor, Codex, and Claude Code to build company websites at a Figma or xAI level of polish, enforcing a single design system, real photography, brand icons, shader effects, and micro-interactions instead of generic AI-generated layouts.

**Why now:** The project surfaced on Hacker News this week under the "anti-slop front end framework" framing, arriving as AI-generated UI sameness has become a recognized problem worth tooling against.

**Build with it:** Drop the skill into your Cursor or Claude Code workflow, point it at a new landing page project, and test whether the art-direction constraints produce measurably different output than a bare prompt.

## 2. pingdotgg/t3code

https://github.com/pingdotgg/t3code · ★ 80917 (+14570 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code is an open-source control plane that runs Claude Code, Codex, and other coding agents on your machine and unifies them in one interface across desktop, web, iOS, and Android.

**Why now:** The repo crossed 14,000 stars this week and surfaced across multiple Hacker News threads, marking a sharp spike in builder attention.

**Build with it:** Install the `t3` CLI via the one-liner curl script, connect it to an existing Claude Code or Codex login, and use the ACP provider interface to route tasks between agents mid-thread.

## 3. elementalsouls/Claude-BugHunter

https://github.com/elementalsouls/Claude-BugHunter · ★ 24517 (+12094 this week) · ai-security, anthropic, application-security, bug-bounty, bugbounty, bugcrowd, claude, claude-code, claude-skills, ethical-hacking, hackerone, offensive-security, pentesting, red-team, security-tools, web-security

**What it does:** claude-bughunter is a Claude Code skill bundle that loads 85 skills and 16 slash commands covering 681 disclosed HackerOne report patterns across 24 vulnerability classes, turning Claude Code into a bug-hunting and red-team operator that stays in scope and ships structured deliverables.

**Why now:** A Show HN post this week surfaced the project and it pulled in over 12,000 stars in seven days, pushing it into active builder awareness.

**Build with it:** Install via `/plugin marketplace add elementalsouls/Claude-BugHunter` inside Claude Code, then describe a target surface in plain English to trigger the relevant `hunt-*` skill and get per-class payloads, bypass tables, and chain templates without manual invocation.

## 4. google/elephant-goldfish-model

https://github.com/google/elephant-goldfish-model · ★ 23211 (+1789 this week) · agent-skills, ai-agents, antigravity, claude-code, claude-code-plugin, claude-skills, codex, codex-plugin, coding-agents, context-engineering, developer-tools, gemini, llm, multi-agent, prompt-engineering, spec-driven-development

**What it does:** EGM is an open-source plugin for coding agents (Claude Code, Codex, Antigravity) that runs a structured design-and-review workflow where one agent drafts a software specification with full project context, then fresh "goldfish" reviewer agents critique it without that context to surface unstated assumptions.

**Why now:** The repo gained 1,789 stars this week, likely tied to growing adoption of Claude Code and Codex as daily coding tools where spec discipline is becoming a real workflow gap.

**Build with it:** Install via `claude plugin marketplace add google/elephant-goldfish-model`, then run `/egm:egm-review your-design-doc.md` against an existing PR plan or README to get a structured multi-reviewer critique without writing a new spec from scratch.

## 5. janestreet/agent_skills

https://github.com/janestreet/agent_skills · ★ 11962 (+1684 this week) · —

**What it does:** A collection of `SKILL.md` files for AI agents and chatbots, currently featuring a Socratic tutor that runs diagnostics, builds a 0-5 skill map, and delivers spaced-review question sessions on any topic.

**Why now:** The repo gained over 1,600 stars this week, reflecting a surge of builder interest in structured prompt-layer tooling for agents.

**Build with it:** Drop the `socratic-tutor` directory into your coding agent's skills folder and prompt it with "teach me X" to validate the SKILL.md format against your own agent runtime.

## 6. stablyai/orca

https://github.com/stablyai/orca · ★ 140341 (+10517 this week) · agent-ide, ai-agents, automation, bot, claude-code, codex, ghostty, grok-bot, hermes-agent, mobile-app, muse, openclaw, opencode, orchestration, pi, runtime, swarm, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source agent IDE that lets you run a fleet of AI coding bots (Claude Code, Codex, Grok, and others using your own subscription) across parallel workspaces, with orchestration, chat or terminal modes, and mobile or Slack-based async check-ins.

**Why now:** The repo gained over 10,000 stars this week, pulled along by the current wave of agentic coding tool adoption.

**Build with it:** Connect an existing Claude Code or Codex subscription, then trigger a bot from Slack or Linear to open a pull request, using Orca's bot integration as the entry point for hands-off async coding tasks.

## 7. HKUDS/CLI-Anything

https://github.com/HKUDS/CLI-Anything · ★ 66337 (+10471 this week) · —

**What it does:** CLI-Anything wraps existing desktop and CLI software in structured, agent-callable interfaces so AI agents can drive tools like CAD editors, 3D renderers, and subtitle generators through generated CLIs with JSON output.

**Why now:** The repo gained over 10,000 stars this week and hit GitHub Trending, coinciding with its arXiv tech report (2606.03854) and the launch of the public CLI-Hub registry at clianything.cc.

**Build with it:** Install a community CLI harness with `pip install cli-anything-hub` and `cli-hub install <name>`, then wire the JSON output into your agent's tool-calling loop as a named function.

## 8. morluto/rea

https://github.com/morluto/rea · ★ 479742 (+9824 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a Model Context Protocol (MCP) server, meaning it exposes tools that AI agents can call directly, connecting those agents to reverse engineering tools for inspecting native binaries, JavaScript and Electron apps, .NET assemblies, and websites without source code.

**Why now:** The repo gained nearly 10,000 stars this week, a sharp spike likely driven by recent viral showcases or coverage.

**Build with it:** Run `npx rea-agents setup` to wire REA into a Claude Code or compatible MCP agent, then point it at a closed-source binary to extract feature behavior you want to replicate in your own app.

## 9. kaomei/stickman-video-director <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/kaomei/stickman-video-director · ★ 8524 (+1314 this week) · agent-skills, ai-animation-generator, ai-video-production, animation, claude-code, claude-skills, codex-skill, content-creation, creator-tools, explainer-video, faceless-youtube, generative-ai, stick-figure, stickman, storytelling, text-to-video, tiktok, video-generation, youtube-automation, youtube-shorts

**What it does:** Stickman Video Director is an AI agent skill for Claude Code, Codex, and similar agents that converts a script into a finished animated stickman video with voiceover, captions, and sound effects across 16-plus visual styles.

**Why now:** The repo gained over 1,300 stars this week, coinciding with active creator community interest in faceless YouTube automation as a zero-cost alternative to subscription video tools.

**Build with it:** Point Claude Code at the skill, send a single prompt with your script, and wire the output MP4 into an existing YouTube Shorts upload pipeline to test automated faceless channel publishing end to end.

## 10. getpaseo/paseo

https://github.com/getpaseo/paseo · ★ 25702 (+1239 this week) · ade, agents, android, claude-code, codex, copilot, developer-tools, hermes, ios, linux, mobile, opencode, orchestration, pi, windows

**What it does:** Paseo is an open-source agentic development environment that runs Claude Code, Codex, Copilot, OpenCode, and other coding agents in parallel, each in its own worktree, from a single desktop, mobile, web, or CLI interface.

**Why now:** The repo gained 1,239 stars this week, coinciding with its multi-provider agent orchestration landing across iOS, Android, and desktop alongside a plugin system that surfaces custom UI on every connected client.

**Build with it:** Write a Paseo plugin that adds a slash command or composer pill to trigger a custom agent workflow, then verify it appears identically on desktop and mobile through the daemon.
