# Skill Tastemakers — Daily Brief — 2026-11-21

_Ranking: delta_7d · 10 repos · generated 2026-11-21T20:53:26.839Z_


## 1. pbakaus/impeccable

https://github.com/pbakaus/impeccable · ★ 114476 (+4357 this week) · agent-skills, ai, anti-slop, design, slop

**What it does:** Impeccable is a design command layer for AI coding agents that adds 24 slash commands (like `/impeccable bolder`, `/impeccable critique`, and `/impeccable audit`) plus a 62-rule deterministic slop detector, letting you steer and review UI output without an API key.

**Why now:** The repo crossed 114k stars with over 4,000 added this week, a sharp signal that builders are hunting for ways to control AI-generated UI aesthetics as vibe-coding workflows mature.

**Build with it:** Run `npx impeccable install` in an existing project, then run `/impeccable critique the pricing cards` inside Claude Code or Cursor to get a ranked, heuristic-scored list of design fixes to work through.

## 2. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 151573 (+3890 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphify, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses a codebase plus its docs, SQL schemas, configs, and PDFs into a queryable knowledge graph using local, deterministic AST parsing via tree-sitter (a code-parsing library), with no vector store required.

**Why now:** The project is surfacing on Hacker News this week across multiple threads framing it around reduced token use in Claude Code, a timely concern as agentic coding tools become the default dev workflow.

**Build with it:** Install the `graphifyy` package and register the `/graphify` skill in your Claude Code or Cursor config to let the agent query your codebase graph instead of dumping raw files into context.

## 3. Appllama/appllama-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Appllama/appllama-skills · ★ 5609 (+3216 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-skill, claude-skills, codex, codex-skill, cursor, design-system, expo, mcp, mobile-app-development, mobile-design, mobile-ui, model-context-protocol, react-native, skills, ui-design

**What it does:** Two agent skills for building mobile apps: one uses the Appllama MCP to study real screens and flows from top-grossing apps, and one enforces a native-quality Expo/React Native build bar covering Apple HIG fidelity, correct navigation patterns, and a full-motion simulator verification loop.

**Why now:** The repo gained over 3,000 stars this week, a clear spike in builder interest around agent-driven mobile UI workflows.

**Build with it:** Run `npx skills@latest add appllama/appllama-skills -a claude-code -y` from your Expo project root to wire both skills into Claude Code and have the agent study competitor screens before generating any new screen.

## 4. morluto/rea

https://github.com/morluto/rea · ★ 472648 (+13118 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is an MCP server that connects AI agents to tools for inspecting native binaries, JavaScript and Electron apps, .NET assemblies, and websites without source code, down to the binary level.

**Why now:** The repo gained over 13,000 stars this week, the fastest growth signal in this batch, pointing to real demand for agent-driven reverse engineering workflows.

**Build with it:** Run `npx rea-agents setup` to wire REA into your existing agent (Claude Code or similar) and have it explain how a competitor feature works by analyzing the shipped binary directly.

## 5. thedotmack/claude-mem

https://github.com/thedotmack/claude-mem · ★ 118823 (+1767 this week) · ai, ai-agents, ai-memory, anthropic, artificial-intelligence, chromadb, claude, claude-agent-sdk, claude-agents, claude-code, claude-code-plugin, claude-skills, embeddings, long-term-memory, mem0, memory-engine, openmemory, rag, sqlite, supermemory

**What it does:** Claude-mem is a TypeScript plugin that captures agent activity during sessions, compresses it with AI, and injects relevant context back into future sessions across Claude Code, Codex, Gemini, Copilot, and other coding agents.

**Why now:** The repo is trending this week with 1,767 stars gained, coinciding with broad multi-agent workflow adoption as developers hit the stateless-session wall across Claude Code and OpenCode.

**Build with it:** Drop claude-mem into an existing Claude Code setup via its plugin config to test whether compressed session memory reduces repeated context re-prompting on a multi-file refactor task.

## 6. jamiepine/voicebox <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/jamiepine/voicebox · ★ 61084 (+1613 this week) · ai, cuda, mlx, qwen3-tts, qwen3-tts-ui, voice-ai, voice-clone, whisper

**What it does:** Voicebox is a local-first, open-source voice studio that combines voice cloning, multi-engine TTS across 23 languages, global-hotkey dictation into any app, and MCP-agent voice integration into a single desktop app.

**Why now:** The repo is gaining over 1,600 stars this week, making this a good moment to evaluate it before the surrounding ecosystem solidifies around a different tool.

**Build with it:** Point the local API at an MCP-aware agent and assign it a cloned voice to get a fully self-hosted, voice-output AI assistant with no ElevenLabs dependency.

## 7. elementalsouls/Claude-BugHunter

https://github.com/elementalsouls/Claude-BugHunter · ★ 15804 (+9978 this week) · ai-security, anthropic, application-security, bug-bounty, bugbounty, bugcrowd, claude, claude-code, claude-skills, ethical-hacking, hackerone, offensive-security, pentesting, red-team, security-tools, web-security

**What it does:** claude-bughunter is a Claude Code skill bundle that loads 83 skills and 15 slash commands covering 681 disclosed HackerOne report patterns across 24 vulnerability classes, plus enterprise identity and infrastructure attack chains for authorized red-team and bug-bounty work.

**Why now:** The repo gained nearly 10,000 stars this week, reflecting sharp builder interest in Claude Code's plugin and skills system as a surface for security tooling.

**Build with it:** Install via `/plugin marketplace add elementalsouls/Claude-BugHunter` inside Claude Code, then describe a target in plain English to trigger the matching `hunt-*` skill automatically against a scoped engagement folder.

## 8. msitarzewski/agency-agents

https://github.com/msitarzewski/agency-agents · ★ 169652 (+1341 this week) · —

**What it does:** A collection of personality-driven AI agent prompt files organized by specialty (engineering, community, creative), installable into Claude Code, Cursor, Codex, Gemini CLI, and other tools via shell scripts or a native desktop app.

**Why now:** The repo crossed 169k stars with 1,341 added this week, alongside a freshly released native desktop app for macOS, Linux, and Windows that installs agents into supported tools without cloning or scripting.

**Build with it:** Copy a single agent markdown file from the `engineering/` folder into `~/.claude/agents/` and invoke it by name in a Claude Code session to test whether a specialized persona meaningfully changes output quality for your use case.

## 9. pingdotgg/t3code

https://github.com/pingdotgg/t3code · ★ 69352 (+8913 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code (ACP stands for Agent Control Protocol, a standard for routing tasks between coding agents) is an open-source, MIT-licensed control plane that runs Claude Code, Codex, Cursor, and other ACP-compatible coding agents on your machine and exposes them through a single interface across desktop, web, iOS, and Android.

**Why now:** The repo gained over 8,900 stars this week as developers consolidate around multi-agent coding workflows and want one interface instead of four.

**Build with it:** Install the `t3` CLI via the one-liner, sign into Claude Code or Codex, and use the ACP provider config to route tasks between agents mid-thread without touching each tool's own interface.

## 10. gamedev-skills/awesome-gamedev-agent-skills

https://github.com/gamedev-skills/awesome-gamedev-agent-skills · ★ 9943 (+1068 this week) · agent-skills, ai-agents, awesome-list, bevy, claude-code, codex, cursor, game-dev, game-development, gamedev, gemini-cli, github-copilot, godot, kiro, phaser, roblox, skills, threejs, unity, unreal

**What it does:** A collection of 79 agent skill files plus a router that auto-detects your engine and task, then loads the right skills before your AI coding agent writes game code across Godot, Unity, Unreal, Phaser, Bevy, Roblox, and 6 more engines.

**Why now:** The repo gained over 1,000 stars this week, and skills are pinned to freshly verified engine releases including Godot 4.7.2, Unity 6.3 LTS, and Unreal 5.8, checked 2026-11-11.

**Build with it:** Run `npx skills add gamedev-skills/awesome-gamedev-agent-skills` in your project, then describe what you are building to your agent and let the router select the matching engine and task skills automatically.
