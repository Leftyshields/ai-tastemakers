# Skill Tastemakers — Daily Brief — 2026-06-26

_Ranking: delta_7d · 10 repos · generated 2026-06-26T13:59:31.110Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 59472 (+24622 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces YAGNI discipline—steering the agent toward the simplest possible solution, like swapping a custom date picker component for a native `<input type="date">`.

**Why now:** It hit 59K GitHub stars with 24K added this week alone, signaling a moment when developers are actively rethinking how much code AI agents produce by default.

**Build with it:** Drop the skill into your Claude Code or Cursor setup to cut generated LOC by ~54% on average, then benchmark your own codebase using the included reproduction scripts to measure real cost and token savings on your specific workload.

## 2. farion1231/cc-switch <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/farion1231/cc-switch · ★ 108910 (+4859 this week) · ai-tools, claude-code, codex, desktop-app, hermes, hermes-agent, mcp, minimax, omo, open-source, openclaw, openclaw-ui, opencode, provider-management, rust, skills, skills-management, tauri, typescript, wsl-support

**What it does:** CC Switch is a cross-platform desktop app (built with Tauri/Rust) that centralizes management of multiple AI coding agents—Claude Code, Codex, Gemini CLI, OpenCode, and others—in a single interface with provider switching, MCP support, and skills management.

**Why now:** It gained nearly 5,000 stars this week, signaling rapid developer adoption at the exact moment teams are juggling fragmented AI coding toolchains across incompatible CLIs and authentication systems.

**Build with it:** A builder could use CC Switch as a foundation or reference implementation for a unified agent orchestration layer—extend its provider management API to add custom model endpoints, or integrate its MCP support to expose internal tools across every connected agent simultaneously.

## 3. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 23099 (+8716 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that exposes 12 pipelines and 52 tools to an AI coding assistant, letting it handle the full stack from research and scripting through asset generation, editing, and final render — including real motion video from stock footage archives, not just animated stills.

**Why now:** It hit #1 on GitHub Trending this week with 8,716 stars in seven days, surfacing alongside production-ready examples built with Kling v3, Veo, FLUX, and gpt-image-1 that demonstrate sub-$2 rendered shorts with narration, captions, and music.

**Build with it:** Drop it into a Cursor or Claude project and prompt your way to a finished product ad, cinematic trailer, or animated short — or extend one of the existing pipelines to wire in your own model provider, custom Remotion template, or proprietary footage corpus.

## 4. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 15182 (+8566 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that parses any codebase into a persistent SQLite knowledge graph using tree-sitter AST analysis across 158 languages, answering structural queries about functions, call chains, classes, and HTTP routes in under 1ms with 99% fewer tokens than file-by-file exploration.

**Why now:** The project gained 8,566 GitHub stars this week, signaling rapid adoption across the AI coding agent ecosystem, and it already ships pre-configured for 11 agents including Claude Code, Cursor, Windsurf, Gemini CLI, and Codex.

**Build with it:** Drop this into any AI coding workflow to give your agent a persistent, queryable map of a large monorepo or unfamiliar codebase — particularly powerful for automating refactors, dependency audits, or cross-service call-chain tracing without burning context on raw file reads.

## 5. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 41933 (+7876 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents free, zero-configuration access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu by routing around paywalls, login walls, and IP bans through a unified tool layer.

**Why now:** The project hit 41,933 stars with 7,876 added this week, signaling rapid adoption as developers building with Claude Code, Cursor, and MCP-based agents hit the same wall: agents can reason but can't reliably read the live web without expensive APIs.

**Build with it:** Wire Agent Reach into your MCP-compatible agent to build competitive intelligence tools, content research pipelines, or cross-platform social monitors that pull real data from Twitter, Reddit, and Chinese platforms without paying for a single API key.

## 6. palmier-io/palmier-pro

https://github.com/palmier-io/palmier-pro · ★ 9071 (+7572 this week) · ai-video, claude, macos, mcp, seedance2, swift, video-editor

**What it does:** Palmier Pro is an open-source macOS video editor built in Swift that lets you and AI agents collaboratively edit timelines, with built-in generative video/image models (Seedance, Kling) and an MCP server that connects Claude, Codex, or Cursor directly to your project.

**Why now:** It gained 7,500+ stars this week, likely driven by the macOS 26 Tahoe beta cycle and growing demand for agent-native creative tools that go beyond chat interfaces into real application state.

**Build with it:** Connect Claude Code to the local MCP endpoint and write scripts that programmatically construct or restructure video timelines—useful for automating content pipelines, building batch video workflows, or prototyping an AI director that assembles footage based on a brief.

## 7. tw93/Pake

https://github.com/tw93/Pake · ★ 57764 (+7181 this week) · chatgpt, claude, desktop, gemini, hight-performance, linux, macos, no-electron, package, rust, tauri, windows, youtube

**What it does:** Pake is a Rust/Tauri-based CLI tool that wraps any URL into a native desktop app for macOS, Windows, and Linux, producing installers under 10MB — roughly 20x smaller than Electron equivalents.

**Why now:** The project gained 7,181 stars this week, signaling a surge of developer interest likely tied to demand for lightweight desktop wrappers around AI tools like DeepSeek, Grok, and Claude.

**Build with it:** Run `pake <url>` to ship a native desktop client for any internal tool, SaaS product, or AI interface — no Electron overhead, no complex configuration, and custom icons and window behavior included out of the box.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 203543 (+6830 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent framework from Nous Research that builds persistent skills from experience, maintains cross-session memory, runs on any infrastructure, and connects to 200+ models through a single switchable backend.

**Why now:** The project gained 6,830 stars this week, signaling strong community momentum, and its multi-platform messaging support and serverless deployment options make it practical for builders who want an agent that lives in production rather than a demo notebook.

**Build with it:** Wire it to a $5 VPS with Telegram as the interface, point it at your codebase via SSH backend, and let it autonomously create reusable skills from repeated tasks — shipping a personal dev assistant that gets measurably better at your specific workflows over time.

## 9. shanraisshan/claude-code-best-practice <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/shanraisshan/claude-code-best-practice · ★ 61055 (+2804 this week) · agentic-ai, agentic-coding, agentic-engineering, agentic-workflow, ai, ai-agents, anthropic, best-practices, boris, claude, claude-ai, claude-code, claude-code-agents, claude-code-best-practices, claude-code-commands, claude-code-skills, context-engineering, pakistan, pakistani-developer, vibe-coding

**What it does:** A structured reference repo that organizes Claude Code's core primitives—subagents, commands, skills, hooks, and orchestration workflows—into documented best practices and working implementations you can copy directly into your own projects.

**Why now:** Claude Code's agentic features (subagents, skills, hooks) are actively evolving, and this repo hit #1 on GitHub Trending this week with 61K stars, signaling a critical mass of builders trying to standardize how they structure Claude-powered codebases.

**Build with it:** Fork the `.claude/` directory structure as a starter scaffold for any Claude Code project, then extend the orchestration workflow pattern to wire multiple subagents together for tasks like automated PR review, multi-step test generation, or repo-wide refactoring pipelines.

## 10. mukul975/Anthropic-Cybersecurity-Skills

https://github.com/mukul975/Anthropic-Cybersecurity-Skills · ★ 21647 (+5282 this week) · ai-agents, claude-code, cloud-security, cybersecurity, devsecops, ethical-hacking, incident-response, infosec, llm, malware-analysis, mcp, mitre-attack, nist-csf, osint, penetration-testing, red-team, security, security-automation, threat-hunting, threat-intelligence

**What it does:** This repo provides 817 structured cybersecurity skills formatted for AI agents, covering 29 security domains and mapped across six frameworks including MITRE ATT&CK v19.1 and NIST CSF 2.0, following the agentskills.io open standard.

**Why now:** The project gained 5,282 stars this week, signaling strong community momentum, and its recent addition of the MITRE F3 v1.1 fraud framework makes it one of the most comprehensive cross-framework skill libraries available in open source right now.

**Build with it:** Drop these skills into Claude Code, Cursor, or any of the 26+ supported platforms to give your security agent the context it needs to triage memory dumps, write Sigma rules, or scope cloud breaches without hand-holding.
