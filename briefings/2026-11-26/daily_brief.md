# AI Tastemakers — Daily Brief — 2026-11-26

_Ranking: delta_7d · 10 repos · generated 2026-11-26T23:41:35.931Z_


## 1. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 153844 (+3234 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphify, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses a codebase along with its docs, SQL schemas, configs, and PDFs into a queryable knowledge graph using local deterministic AST parsing via tree-sitter, with every graph edge explained and no vector store required.

**Why now:** The repo gained 3,234 stars this week and holds the number 2 spot on the ROSS Index Q3 2026 for fastest-growing open-source startups, reflecting a sharp rise in adoption.

**Build with it:** Install the `graphifyy` PyPI package and register it as a `/graphify` skill in Claude Code to get graph-backed code-search over your repo without touching a vector database.

## 2. pingdotgg/t3code

https://github.com/pingdotgg/t3code · ★ 80916 (+14569 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code is an open-source control plane that runs Claude Code, Codex, Cursor, and other ACP-compatible AI coding agents on your machine and exposes them through a single interface across desktop, web, iOS, and Android.

**Why now:** The repo gained over 14,000 stars this week, the clearest signal yet of how quickly builder attention is consolidating around multi-agent orchestration.

**Build with it:** Install the `t3` CLI via the one-liner install script, connect it to an existing Claude Code or Codex login, and use the phone app to approve agent commands remotely over Tailscale or T3 Connect.

## 3. OpenMontageInc/OpenMontage

https://github.com/OpenMontageInc/OpenMontage · ★ 83643 (+1890 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that handles scripting, asset generation, stock-clip retrieval, and final rendering across 12 pipelines using FFmpeg, Remotion, and Veo, turning an AI coding assistant into a full video studio.

**Why now:** The repo hit number 1 on GitHub Trending this week with nearly 1,900 new stars, driven by demos showing fully agentic motion-clip timelines rather than the animated-stills approach most comparable tools use.

**Build with it:** Point your Cursor or Claude agent at the repo's AGENT_GUIDE.md and run one of the existing pipeline prompts to produce a finished video from a plain-language description.

## 4. elementalsouls/Claude-BugHunter

https://github.com/elementalsouls/Claude-BugHunter · ★ 24516 (+12095 this week) · ai-security, anthropic, application-security, bug-bounty, bugbounty, bugcrowd, claude, claude-code, claude-skills, ethical-hacking, hackerone, offensive-security, pentesting, red-team, security-tools, web-security

**What it does:** claude-bughunter is a Claude Code skill bundle that loads 85 skills and 16 slash commands covering 681 disclosed HackerOne report patterns across 24 vulnerability classes, enterprise identity attack matrices, and engagement scaffolding for authorized bug-hunting and red-team work.

**Why now:** The repo gained over 12,000 stars this week, reflecting a surge in interest around Claude Code's plugin and skills system as a platform for security tooling.

**Build with it:** Install via `/plugin marketplace add elementalsouls/Claude-BugHunter` inside Claude Code, then point it at a scoped target like OWASP Juice Shop to validate how the `hunt-*` skills and 7-Question Gate triage flow behave against a live webapp.

## 5. morluto/rea

https://github.com/morluto/rea · ★ 479741 (+9824 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a Model Context Protocol (MCP) server, a standard for connecting AI agents to external tools, that wires agents into reverse engineering tooling for inspecting native binaries, JavaScript and Electron apps, .NET assemblies, and websites without source code.

**Why now:** The repo gained nearly 10,000 stars this week, pointing to real demand for agent-driven binary analysis workflows.

**Build with it:** Run `npx rea-agents setup` to wire REA into your existing MCP-compatible agent such as Claude Code and have it explain how a closed-source app feature works, down to the disassembly level.

## 6. vercel-labs/agent-desktop

https://github.com/vercel-labs/agent-desktop · ★ 26882 (+1347 this week) · accessibility, accessibility-api, ai-agents, automation, cli, computer-use, computer-use-agent, computer-use-agents, desktop-automation, macos, mcp, rust

**What it does:** agent-desktop reads the OS accessibility tree of macOS, Windows, and Linux desktop apps and returns it as JSON with addressable refs, letting an AI agent click, type, and re-snapshot in a loop without screenshots or pixel matching.

**Why now:** The repo gained over 1,300 stars this week as a Vercel Labs project, with community uptake reflecting growing interest in accessibility-tree-based computer use as a lighter alternative to screenshot-driven agents.

**Build with it:** Install via `npm install -g agent-desktop`, then wire `snapshot --app <YourApp> -i` and `click <ref>` into an AI agent's tool-call loop using the JSON envelope output as the observation step.

## 7. BaaRai/ARTEX

https://github.com/BaaRai/ARTEX · ★ 22247 (+8635 this week) · ai, ai-agents, artex, autonomous-agents, bug-bounty, docker, golang, linux, llm, mcp, nextjs, penetration-testing, pentest, postgresql, rea, red-team, security, security-automation, sqlite, typescript

**What it does:** ARTEX is a self-hosted, LLM-driven penetration testing platform where a planner decomposes goals into intents, workers execute them with real tools, and every finding is tied to captured HTTP traffic through two linked graphs covering asset state and test progress.

**Why now:** The repo gained over 8,600 stars this week, reflecting sharp community interest in autonomous offensive security tooling.

**Build with it:** Point ARTEX at a staging environment, configure an Ollama endpoint under System, set worker concurrency to at least 2, and run a scoped task to validate whether the evidence-backed finding workflow fits your red-team reporting process.

## 8. kunkundi/crossdesk <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/kunkundi/crossdesk · ★ 8468 (+1181 this week) · cli, cplusplus, dsh-plugin, libdatachannel, mcp, remote-control, remote-desktop, rtc, rtp, slint, video-streaming, web-client, webrtc, xmake

**What it does:** CrossDesk is a lightweight C++ remote desktop tool with clients for desktop, browser, mobile, and terminal, plus a DeskHub multi-desktop wall for viewing and controlling several machines at once.

**Why now:** The repo gained 1,181 stars this week, landing it among the top trending C++ repositories on Trendshift for both daily and weekly rankings.

**Build with it:** Install the `@chunkdash/crossdesk-cli` npm package and use it to script headless remote sessions from a terminal workflow.

## 9. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 88152 (+7190 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** dsh-our-free-model is a zero-dependency plugin for the dsh harness that routes requests to frontier models including DeepSeek V4.1 Flash and Kimi K3 through public free-lane gateways, with no account, API key, or quota setup required.

**Why now:** The repo hit number 1 on both the Trendshift daily and JavaScript weekly charts for the week of 2026-10-05 to 2026-10-11, marking a notable spike in developer adoption.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL and key config to get free-tier model access inside your existing workflow.

## 10. superdesigndev/treg <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/superdesigndev/treg · ★ 9560 (+1030 this week) · agents, api-keys, cli, credentials, developer-tools, dsh-plugin, mcp, proxy, python, registry, secrets

**What it does:** Treg is a proxy registry that gives an agent one base URL and one token to call thousands of external API endpoints covering SEO, enrichment, scraping, TTS, and more, with auth injected server-side, per-call billing, and support for registering your own keys, CLIs, and SKILL.md recipes.

**Why now:** The repo gained over 1,000 stars this week, pointing to real builder demand for centralized tool auth in agent workflows.

**Build with it:** Install the CLI with the one-liner from treg.to, run `treg catalog search` to find an endpoint by task description, and call it with `treg call` inside your agent's tool-use loop, no provider account needed.
