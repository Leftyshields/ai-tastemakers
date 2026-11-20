# Skill Tastemakers — Daily Brief — 2026-11-20

_Ranking: delta_7d · 10 repos · generated 2026-11-20T22:14:53.259Z_


## 1. HKUDS/CLI-Anything

https://github.com/HKUDS/CLI-Anything · ★ 61327 (+5461 this week) · —

**What it does:** CLI-Anything wraps existing desktop and server tools in structured harnesses so AI agents can drive them through a consistent JSON-output interface, treating the CLI as a first-class agent action layer.

**Why now:** An HN thread this week comparing MCP versus CLI for browser automation pulled this repo into active builder debate, putting the CLI-as-agent-interface tradeoff in front of people who are choosing tooling right now.

**Build with it:** Install a community harness with `pip install cli-anything-hub` and `cli-hub install <name>`, then wire the JSON output into your agent's tool-call loop as a drop-in action provider.

## 2. heydamir/unslop

https://github.com/heydamir/unslop · ★ 19207 (+3582 this week) · —

**What it does:** unslop is a Claude Code skill that audits vibecoded UI for purple gradients, emoji labels, uneven spacing, and similar AI-generated patterns, then rewrites the screen pass by pass into an interface with actual visual character.

**Why now:** The repo gained 3,582 stars this week alongside Damir Sokolovsky's Unslopping series going viral on X, surfacing widespread builder frustration with AI-generated UI output.

**Build with it:** Install globally with `claude plugin install unslop --marketplace heydamir/unslop`, then run `/unslop the hero of https://yourdomain.com` for a live-site audit and redline pass without touching local code first.

## 3. JuneYaooo/rea-video

https://github.com/JuneYaooo/rea-video · ★ 11409 (+3473 this week) · agent-skills, ai-video, aigc-detection, claude-code, codex, ffmpeg, prompt-engineering, remotion, reverse-engineering, short-video, shot-detection, subtitles, video-analysis, video-breakdown, video-editing, video-generation, videomd, vlm

**What it does:** rea-video is a Python CLI that breaks any video into individual shots, classifies each as live footage, AI-generated, or code-rendered, and outputs a layered VIDEO.md file with remake instructions.

**Why now:** The repo gained 3,473 stars this week and surfaced on Hacker News, marking a sharp spike in interest around AI video detection and shot-level analysis.

**Build with it:** Point Claude Code at a product demo or ad, let rea-video generate the VIDEO.md breakdown, then feed that file back into a generative video tool to replicate the shot structure.

## 4. tt-a1i/archify

https://github.com/tt-a1i/archify · ★ 98307 (+2100 this week) · agent-skills, ai-agents, architecture-diagram, claude-code, claude-skills, codex, coding-agents, deepseek-harness, developer-tools, diagrams, diagrams-as-code, dsh-plugin, flowchart, llm, mermaid, opencode, sequence-diagram, software-architecture, system-design, visualization

**What it does:** Archify is an agent skill for Claude Code, Codex, Cursor, and OpenCode that converts any idea, codebase, or plan into an interactive HTML diagram covering flowcharts, sequence diagrams, and system architecture visuals.

**Why now:** The repo has crossed 98K total stars with roughly 2,100 added this week and 130K+ installs on skills.sh, signaling rapid adoption across coding-agent workflows.

**Build with it:** Install the skill in Claude Code and prompt it against an existing codebase to generate a shareable interactive architecture diagram as a standalone HTML file.

## 5. morluto/rea

https://github.com/morluto/rea · ★ 471409 (+13969 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (MCP is a standard protocol for wiring tools into AI agents) that lets agents reverse engineer binaries, apps, and runtime behavior without source code, down to the native binary level.

**Why now:** The repo is trending at 471K stars with nearly 14K added this week, reflecting a sharp spike in builder interest around agent-driven reverse engineering.

**Build with it:** Run `npx rea-agents setup` to wire REA into an MCP-compatible agent like Claude Code, then have it inspect a closed app feature and port that behavior into your own project.

## 6. elementalsouls/Claude-BugHunter

https://github.com/elementalsouls/Claude-BugHunter · ★ 14076 (+8350 this week) · ai-security, anthropic, application-security, bug-bounty, bugbounty, bugcrowd, claude, claude-code, claude-skills, ethical-hacking, hackerone, offensive-security, pentesting, red-team, security-tools, web-security

**What it does:** claude-bughunter is a Claude Code skill bundle that loads 83 skills and 15 slash commands covering 681 disclosed HackerOne report patterns across 24 vulnerability classes, enterprise identity attack matrices, and red-team workflows directly into Claude Code.

**Why now:** The repo gained 8,350 stars this week, reflecting a sharp surge in builder interest in Claude Code's plugin and skills system as a surface for security tooling.

**Build with it:** Install via `/plugin marketplace add elementalsouls/Claude-BugHunter` inside Claude Code, then use the `hunt` engagement scaffolder to wire Burp MCP and auto-load per-class detection skills against a target scope.

## 7. pingdotgg/t3code

https://github.com/pingdotgg/t3code · ★ 67727 (+8241 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code is an open-source control plane that runs Claude Code, Codex, Cursor, and other ACP-compatible coding agents on your local machine and exposes them through a single interface across desktop, web, iOS, and Android.

**Why now:** The repo gained over 8,000 stars this week, tied to its public launch and app store availability, which lets developers approve agent actions remotely from a phone.

**Build with it:** Install the `t3` CLI via the one-liner, point it at an already-authenticated Claude Code or Codex install, and use the ACP provider config to orchestrate multi-agent threads without touching each agent's own UI.

## 8. stablyai/orca

https://github.com/stablyai/orca · ★ 130963 (+6619 this week) · agent-ide, ai-agents, automation, bot, claude-code, codex, ghostty, grok-bot, hermes-agent, mobile-app, muse, openclaw, opencode, orchestration, pi, runtime, swarm, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop, mobile, and remote app that runs multiple coding agents (Claude Code, Codex, and others) in parallel, each isolated in its own git worktree, with chat, terminal, diffs, and a browser in one interface.

**Why now:** The repo gained over 6,600 stars this week, reflecting a sharp surge in builder interest around parallel, multi-agent coding workflows.

**Build with it:** Point Orca at an existing repo, hand a large feature to a coordinator agent, and let it spin up worker agents in separate worktrees to test the parallel-task orchestration flow against your own codebase.

## 9. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 72221 (+870 this week) · ai, ai-agents, ai-prompts, anthropic, chatbot, chatgpt, claude, claude-code, codex, cursor, gemini, generative-ai, google, grok, llm, openai, prompt, prompt-engineering, system-prompt, system-prompts

**What it does:** A daily-updated archive of full system prompts extracted from ChatGPT, Claude, Gemini, Grok, Cursor, and 30+ other AI products, versioned back to May 2025.

**Why now:** The repo gained 870 stars this week and was cited by Simon Willison as "the most thorough leaked system prompt collection I know of," putting it on many builders' radar right now.

**Build with it:** Diff the versioned prompt files for a tool like Cursor or Claude Code to map how guardrails and tool-use instructions shift across releases, then use those patterns to tighten your own system prompt design.

## 10. aoci-spec/aoci-code <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/aoci-spec/aoci-code · ★ 2781 (+869 this week) · agent-memory, agents-md, ai-coding, ai-context, claude-code, code-indexing, code-intelligence, codex, coding-agent, context-engineering, cursor, database-schema, golang, llm, local-first, mcp, mcp-server, model-context-protocol, opencode, repo-map

**What it does:** AOCI-CODE is a local-first MCP server and CLI that builds a persistent, Git-versioned index of your codebase, one structured line per file covering purpose, dependencies, public API, and gotchas, so coding agents like Claude Code, Codex, and Cursor read the whole system once instead of re-scanning on every task.

**Why now:** The repo gained 869 stars this week and is tracking as a daily and weekly trending Go project on Trendshift, signaling a sharp spike in developer attention around context-engineering for coding agents.

**Build with it:** Point your MCP-compatible agent at an existing repo, run the index-build command, and configure the MCP server so the agent reads the generated index file at the start of every session instead of crawling source files directly.
