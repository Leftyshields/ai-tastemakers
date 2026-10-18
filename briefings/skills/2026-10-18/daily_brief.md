# Skill Tastemakers — Daily Brief — 2026-10-18

_Ranking: delta_7d · 10 repos · generated 2026-10-18T16:33:26.983Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 318438 (+251478 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a TypeScript MCP server (a standardized way to expose tools to AI agents) that lets agents inspect closed-source binaries, JavaScript/Electron apps, .NET assemblies, and websites by hooking into Hopper and Ghidra, two established disassemblers.

**Why now:** The project landed on Hacker News this week with 99 points and 38 comments, a signal that agent-driven reverse engineering is moving from niche experiment to something builders are actively prototyping.

**Build with it:** Run `npx rea-agents setup` to register REA with your agent, then point it at a closed-source app and ask it to trace a specific feature down to the binary level.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 96248 (+7186 this week) · ade, agent-ide, ai-agents, automation, bot, claude-code, codex, ghostty, grok-bot, hermes-agent, mobile-app, muse, openclaw, opencode, orchestration, pi, runtime, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop and mobile orchestrator that runs multiple coding agents — Codex, Claude Code, OpenCode, Grok Bot — simultaneously in isolated git worktrees, so you can compare their outputs side by side and merge the best result from one interface.

**Why now:** The repo surfaced on Hacker News as an open-source alternative to Conductor and Ghostty, picked up 7,000+ stars in a week, and reflects a real shift: running agents in parallel is becoming a standard workflow, not a curiosity.

**Build with it:** Fan a single refactor prompt across three agents in Orca's parallel worktree UI, diff their outputs, and merge the winner without touching your main branch.

## 3. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 283075 (+6711 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is a harness-level layer that sits on top of AI coding agents — Claude Code, Codex, Cursor, Opencode — and adds persistent memory, custom skills, and a security module called AgentShield, so you get consistent behavior across agents without rewriting prompts from scratch each time.

**Why now:** A Hacker News thread this week framed ECC as "the operating system for AI harnesses," and 6,700+ new stars followed — a sign the multi-agent tooling category is consolidating around this kind of abstraction.

**Build with it:** Install `ecc-universal` from npm, drop the ECC config into an existing Claude Code project, and you immediately get persistent memory and AgentShield security layered onto your current setup.

## 4. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 98962 (+3555 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives MCP-compatible AI agents (Claude Code, Cursor, and others) live read and search access to Twitter, Reddit, YouTube, Bilibili, GitHub, and XiaoHongShu — no paid APIs, no scraper boilerplate.

**Why now:** The repo hit GitHub Trending #1 this week with nearly 4,000 new stars, tracking directly with the wave of builders wiring real-time internet access into agent workflows right now.

**Build with it:** Point your MCP-compatible agent at Agent Reach's CLI to get live Reddit and Twitter search as tool calls — no API keys or custom scraper code required.

## 5. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 69451 (+3396 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is a Python framework that turns an AI coding assistant — Cursor, Copilot, Claude — into a video production pipeline, handling scripting, asset generation, clip retrieval, editing, and final composition via Remotion across 12 pipelines and 100+ agent tools.

**Why now:** The repo hit #1 on GitHub Trending this week alongside a completed demo that produced a 60-second animated short called "The Last Banana" for $1.33 using Kling v3 motion clips via fal.ai — a concrete cost number that makes the stock-footage-and-open-archive approach credible.

**Build with it:** Give your Cursor or Claude agent an existing YouTube URL using the "start from a video you already love" workflow, let it reverse-engineer the scene plan, and render a remixed version through the Remotion composition step.

## 6. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 74628 (+17615 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a local-first, open-source Electron and Python desktop app covering voice cloning, video dubbing, dictation, transcription, and audiobook generation across 646 languages, using k2-fsa/OmniVoice as its default model — everything runs on your machine.

**Why now:** The repo gained 17,615 stars in a single week, a breakout driven largely by builders looking for a self-hosted alternative to ElevenLabs with no usage billing.

**Build with it:** Connect VoiceStudio's local MCP server to your agent workflow to call voice cloning as a tool — no cloud API key, no per-character charges.

## 7. thedotmack/claude-mem

https://github.com/thedotmack/claude-mem · ★ 101565 (+2402 this week) · ai, ai-agents, ai-memory, anthropic, artificial-intelligence, chromadb, claude, claude-agent-sdk, claude-agents, claude-code, claude-code-plugin, claude-skills, embeddings, long-term-memory, mem0, memory-engine, openmemory, rag, sqlite, supermemory

**What it does:** claude-mem is a persistent memory layer for AI coding agents — it captures session activity, compresses it with AI, and injects relevant context back into future sessions across Claude Code, Codex, Gemini, Copilot, and others, so agents stop asking you to re-explain things they've already seen.

**Why now:** The repo gained 2,402 stars this week and appears in Trendshift rankings, tracking the daily friction of session amnesia that grows sharper as multi-agent workflows get longer and more complex.

**Build with it:** Drop it into an existing Claude Code project as a plugin, run one long agent task, and check whether compressed memory recall cuts the repeated context-setting in follow-up sessions.

## 8. mattpocock/skills

https://github.com/mattpocock/skills · ★ 295900 (+11832 this week) · —

**What it does:** `mattpocock/skills` is a collection of small, composable agent skills — for Claude Code, Codex, Copilot, and others — that enforce structured workflows like issue triage, spec writing, and task breakdown, keeping the engineer in control rather than handing the process entirely to the agent.

**Why now:** The repo crossed 295,000 stars with nearly 12,000 added this week, a spike that lines up with growing builder pushback against fully autonomous "vibe coding" where agents make unchecked architectural decisions.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to install into a Cursor project, then run `/setup-matt-pocock-skills` once to connect your issue tracker and label conventions.

## 9. wheresryan22/anatomy

https://github.com/wheresryan22/anatomy · ★ 15817 (+9808 this week) · agent-skill, open-source, svg, vizualization

**What it does:** Anatomy is an agent skill for Claude Code (and compatible with Antigravity, OpenCode, Codex, and MiniMax Code) that takes any technical concept and produces an interactive, isometric SVG or WebGL illustration — a physical machine whose moving parts embody how that concept works, with shaded components, live readouts, and pointer and keyboard interaction.

**Why now:** The repo gained nearly 10,000 stars this week, a burst of attention closely tied to broader community interest in Claude Code's skill infrastructure since it launched.

**Build with it:** Run `npx skills add wheresryan22/anatomy -g`, then invoke `/anatomy explain how a [your concept] works, interactive` inside Claude Code to get a self-contained, inspectable figure dropped directly into your project.

## 10. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 57509 (+8803 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** An agent skill that generates self-contained HTML and SVG diagrams across 45 types — architecture, sequence, quadrant, and more — styled to match your brand palette and fonts, with no external dependencies and no Mermaid defaults.

**Why now:** The repo gained 8,803 stars this week as builders discovered it as a drop-in skill for Cursor, Claude Code, Codex, and Copilot workflows that need publication-ready diagrams rather than generic placeholders.

**Build with it:** Run `npx skills add cathrynlavery/diagram-design`, then prompt your agent to onboard against your site URL so every diagram it generates inherits your palette and typography automatically.
