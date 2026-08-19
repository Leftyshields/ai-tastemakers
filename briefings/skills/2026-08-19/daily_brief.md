# Skill Tastemakers — Daily Brief — 2026-08-19

_Ranking: delta_7d · 10 repos · generated 2026-08-19T13:58:02.550Z_


## 1. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 14981 (+10678 this week) · agent-skill, ai, c2pa, claude, provenance, synthid, watermark

**What it does:** `watermarks-remover` is a Python stdlib service + agent skill that strips multi-vendor AI provenance marks — invisible Unicode, statistical text watermarks (Kirchenbauer/SynthID-style), and C2PA/EXIF/XMP metadata — from text and files including PNG, JPEG, PDF, DOCX, SVG, and MP4.

**Why now:** The project hit Hacker News this week and gained 10,678 stars in seven days, landing alongside active industry debate over AI provenance and C2PA adoption.

**Build with it:** Point Cursor at the self-contained `skills/clean-user-facing-text/` skill via `python3 install_skill.py` to automatically scrub AI marks from documentation and web copy before it ships.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 48818 (+6533 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE that runs multiple coding agents (Codex, Claude Code, OpenCode, Pi) in parallel git worktrees, letting you fan out a single prompt across isolated branches and merge the best result.

**Why now:** A "Show HN" thread surfaced this week, and the repo gained 6,533 stars in seven days, signaling a sharp spike in builder attention around parallel-agent workflows.

**Build with it:** Point Orca at an existing repo, spin up three worktrees from one prompt using the parallel worktree UI, and compare diffs before merging the winning branch.

## 3. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 78047 (+2713 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste Skill is a set of portable agent skills that replace boilerplate-looking AI-generated UIs with stronger layout, typography, motion, and spacing, plus image-generation skills for reference boards across web, mobile, and brand contexts.

**Why now:** The project surfaced on Hacker News this week and is trending at 78K+ stars, signaling active community discovery at the moment vibe-coding workflows are becoming mainstream.

**Build with it:** Drop the skill files into Cursor or Claude Code and use them as context when prompting for a new UI component — the agent will follow the taste constraints instead of defaulting to generic Tailwind boilerplate.

## 4. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 50926 (+5272 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a free MIT-licensed AI gateway that routes requests across 341 providers (90+ free tiers) through a single OpenAI-compatible endpoint, with quota-aware fallback and RTK+Caveman token compression cutting usage by 15–95%.

**Why now:** The repo gained 5,272 stars this week, signaling a sharp surge in developer attention likely tied to cost pressure from Claude Code and Codex CLI adoption where per-token bills accumulate fast.

**Build with it:** Point your Claude Code or Cursor `OPENAI_BASE_URL` at your OmniRoute instance and let its 19 routing strategies automatically fall back across free Gemini, GPT-4o mini, and DeepSeek tiers when any single quota runs out.

## 5. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 105772 (+5175 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an agent skill (compatible with Claude Code, Cursor, and 20 other agents) that steers AI coding sessions toward minimal output — replacing over-built solutions with the smallest working code, like swapping a flatpickr installation for a native `<input type="date">`.

**Why now:** The project hit 105,772 stars with 5,175 added this week, spiking alongside a published agentic benchmark showing a measurable 54% LOC reduction and 20% cost drop against a fair no-skill baseline on a real FastAPI + React repo.

**Build with it:** Drop the ponytail skill into an existing Claude Code session and run it against a feature branch to measure the `git diff` shrinkage on your own codebase.

## 6. holaboss-ai/holaOS

https://github.com/holaboss-ai/holaOS · ★ 10062 (+4337 this week) · agent, agent-harness, agent-os, agentic, ai, ai-agent, ai-agents, artificial-intelligence, claude-code, codex, electron, holaboss, holaos, llm, mcp, memory, model-context-protocol, runtime, typescript, workspace

**What it does:** holaOS is a local-first Electron desktop workspace that runs Claude Code, Codex, or its own built-in agent over a single shared memory, toolset, and file system — with 100+ integrations and MCP support.

**Why now:** The repo gained 4,337 stars this week, signaling a sharp spike in builder attention that makes this a timely moment to evaluate it before the ecosystem around it solidifies.

**Build with it:** Connect an existing MCP server to holaOS and run Claude Code against it to validate whether shared memory actually persists context across agent switches — the core claim worth stress-testing.

## 7. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 232876 (+4034 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python agent that creates and refines skills from experience, searches past conversations, and runs across seven execution backends (local, Docker, SSH, Modal, and others) while accepting any OpenAI-compatible model endpoint.

**Why now:** The repo crossed 232,000 stars with 4,034 added this week, signaling a sharp spike in builder attention worth catching before the crowd.

**Build with it:** Point it at your own model endpoint via `hermes model`, then wire the built-in Telegram gateway to a Modal serverless backend so the agent hibernates between sessions and costs nearly nothing when idle.

## 8. mukul975/Anthropic-Cybersecurity-Skills

https://github.com/mukul975/Anthropic-Cybersecurity-Skills · ★ 29581 (+1980 this week) · ai-agents, claude-code, cloud-security, cybersecurity, devsecops, ethical-hacking, incident-response, infosec, llm, malware-analysis, mcp, mitre-attack, nist-csf, osint, penetration-testing, red-team, security, security-automation, threat-hunting, threat-intelligence

**What it does:** A structured library of 817 cybersecurity skills across 29 domains — covering forensics, red-team C2, OSINT, cloud breach scoping, and more — formatted to the agentskills.io standard so AI agents can consume them directly.

**Why now:** The repo gained ~1,980 stars this week, signaling active circulation in security and AI-agent communities at a moment when framework-mapped agent tooling (MITRE ATT&CK, NIST CSF 2.0, ATLAS) is a concrete gap builders are trying to close.

**Build with it:** Drop the relevant skill YAML files into your Claude Code or Cursor workspace as context, then prompt your agent against a real triage task — like analyzing a memory dump with Volatility3 — to test whether framework-mapped skills measurably sharpen its responses.

## 9. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 128258 (+1830 this week) · ai-tools, claude-code, codex, desktop-app, grok, grokbuild, hermes, hermes-agent, mcp, open-source, openclaw, openclaw-ui, opencode, provider-management, rust, skills, skills-management, tauri, typescript, wsl-support

**What it does:** CC Switch is a cross-platform Tauri desktop app that manages API providers, credentials, and configuration for eight AI coding agents — Claude Code, Codex, Gemini CLI, Grok Build, OpenCode, OpenClaw, and Hermes Agent — from a single interface.

**Why now:** The repo hit 128K stars with 1,830 added this week, signaling a surge in builders consolidating multi-agent workflows as Kimi K3 (a 2.8T-parameter model) just launched and is already listed as a supported provider.

**Build with it:** Point CC Switch at your existing Claude Code or Codex setup, add a Kimi K3 API key via the provider switcher, and compare output quality across agents without touching shell config files.

## 10. NanoNets/Graft <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/NanoNets/Graft · ★ 3734 (+1742 this week) · ai-agents, anthropic, claude-code, cli, code-graph, codex, context-engineering, cursor, developer-tools, gemini, knowledge-graph, llm, mcp, mcp-server, open-source, openai, tree-sitter

**What it does:** Graft builds a code-knowledge graph from your repo using Tree-sitter and serves it to coding agents (Claude Code, Cursor, Codex, Gemini) via an MCP server, cutting token usage by 42% and tool calls by 46% by injecting only the relevant nodes into each prompt.

**Why now:** The repo gained 1,742 stars this week, signaling rapid discovery in the Claude Code and MCP ecosystem right as context-engineering is becoming a first-class concern for agent workflows.

**Build with it:** Run `npm install -g @nanonets/graft && graft init` in an existing repo to wire the MCP server into Claude Code and immediately benchmark prompt cost against your own codebase.
