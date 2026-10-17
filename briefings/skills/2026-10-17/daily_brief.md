# Skill Tastemakers — Daily Brief — 2026-10-17

_Ranking: delta_7d · 10 repos · generated 2026-10-17T16:25:54.450Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 302989 (+261796 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a TypeScript MCP server (a standardized bridge that lets AI agents call external tools) that connects Claude, Codex, and similar agents to local reverse-engineering tools—Hopper, Ghidra, and JavaScript/Electron/.NET inspectors—so an agent can analyze a closed binary, explain a feature's implementation, and surface the decompiled evidence.

**Why now:** A Hacker News thread titled "Reverse engineer anything with agents, from app behavior down to native binaries" pulled 99 points and 38 comments this week, showing real builder demand.

**Build with it:** Run `npx rea-agents setup` to register REA with your agent, then point it at a target Electron app to have the agent map an undocumented feature's implementation without touching source code.

## 2. yetone/magpie

https://github.com/yetone/magpie · ★ 14880 (+7465 this week) · claude-code, codex, deepseek, gemini-cli, llm, macos

**What it does:** Magpie is a local gateway app (macOS/Windows/Linux/Docker) that routes any AI coding agent—Claude Code, Codex, Gemini CLI—through any model provider or account you own, with automatic failover when a quota runs out, all managed from a single menu-bar UI.

**Why now:** The repo gained 7,465 stars this week as developers running multi-agent CLI workflows across providers like Kimi, DeepSeek, and GLM hit quota limits and needed a routing layer that doesn't require touching each tool's config.

**Build with it:** Add a DeepSeek API key under Providers, assign it to Codex on the Agents page, and Codex will run against DeepSeek V4 Pro without any changes to Codex's own config files.

## 3. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 72665 (+16585 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a self-hosted desktop app (Electron + Python) covering voice cloning, voice design, video dubbing, dictation, transcription, and audiobook generation across 646 languages, using the k2-fsa/OmniVoice engine locally with no audio sent to external servers.

**Why now:** The repo gained 16,585 stars this week and surfaced on Hacker News, driven by builders looking for a self-hosted alternative to ElevenLabs.

**Build with it:** Use the local MCP endpoint to wire VoiceStudio's TTS and cloning capabilities directly into an AI agent workflow without routing audio through any external API.

## 4. mattpocock/skills

https://github.com/mattpocock/skills · ★ 294775 (+12397 this week) · —

**What it does:** A set of small, composable agent skill files for Claude Code, Codex, Copilot, and others that guide coding agents through structured workflows—spec-writing, triaging, issue tracking—without ceding process control to a heavier framework.

**Why now:** The repo crossed 294K stars this week with nearly 12.4K new stars added, a sharp spike coinciding with growing developer frustration at opaque agent frameworks like BMAD.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to drop editable skill files into a Cursor project, run `/setup-matt-pocock-skills` once to connect your issue tracker, then use `/triage` against real tickets.

## 5. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 56835 (+9174 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** An agent skill that converts plain-language prompts into self-contained HTML + SVG diagram files across 45 diagram types, pulling your site's palette and fonts so output matches your brand without manual styling, installable in Cursor, Claude Code, Codex, Copilot, and others via `npx skills add cathrynlavery/diagram-design`.

**Why now:** The repo gained 9,174 stars this week, a breakout driven by the agent-tooling community sharing outputs across diagram types.

**Build with it:** Run `npx skills add cathrynlavery/diagram-design`, then prompt your agent to onboard against your site URL—it pulls your palette and fonts so every subsequent diagram is brand-matched from the first generation.

## 6. lemomo-ai/lemo-opuscar <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/lemomo-ai/lemo-opuscar · ★ 2852 (+1333 this week) · agent-skills, ai-agents, ai-short-film, ai-video, animation, canvas, claude, claude-code, claude-code-plugin, claude-code-skill, creative-coding, ffmpeg, filmmaking, motion-graphics, opus-5-5, prompt-library, text-to-speech, threejs, video-production, webgl

**What it does:** A Claude Code skill that generates short films entirely in code—canvas/WebGL animations, original music, and TTS narration—across 51 named styles, with no video model involved; install via `claude plugin marketplace add lemomo-ai/lemo-opuscar`.

**Why now:** The repo gained 1,333 stars this week following the release of OPUSCAR 98, a 6:31 film where Claude Opus 5.5 redrew all 98 Best Picture winners in style-matched code, with all 98 style prompts now public as reusable JSON.

**Build with it:** Run `claude plugin install lemo-opuscar@lemolab`, pick a style prompt from the public `styles.json`, and direct a film on your own topic—the agent handles storyboard, animation, score, and FFmpeg render from a single natural-language prompt.

## 7. wheresryan22/anatomy

https://github.com/wheresryan22/anatomy · ★ 14876 (+8867 this week) · agent-skill, open-source, svg, vizualization

**What it does:** Anatomy is a Claude Code skill—also compatible with Antigravity, OpenCode, Codex, and MiniMax Code—that takes a technical concept and generates an interactive isometric illustration of a physical analogue built from SVG parts, optional WebGL shaders, and a shared data model driving both the visuals and live readouts.

**Why now:** The repo gained 8,867 stars this week, coinciding with active community buildout of agent skill ecosystems like Claude Code skills and agentskills.io.

**Build with it:** Run `npx skills add wheresryan22/anatomy -g`, then send `/anatomy explain how a token bucket rate limiter works, interactive` to Claude Code to evaluate whether the isometric output fits your docs or onboarding flows.

## 8. mvschwarz/openrig

https://github.com/mvschwarz/openrig · ★ 7652 (+1284 this week) · agent-harness, agent-orchestration, agent-skills, ai-coding, claude-code, cli, codex-cli, multi-agent, multi-agent-systems, tmux, typescript

**What it does:** OpenRig is a TypeScript CLI that lets you define a coordinated team of AI coding agents—Claude Code, Codex, and others—in a YAML file and run them as a persistent system via a tmux-based terminal UI, with a lead agent handling delegation and a shared context across the team.

**Why now:** The repo gained 1,284 stars this week alongside v0.6.8, which added a one-command install script that meaningfully cuts setup friction.

**Build with it:** Install `@openrig/cli` globally, drop a YAML rig definition into your repo, and run `rig setup` to boot a multi-agent team against a real codebase task through the kernel operator interface.

## 9. eternity4719/HowToLiveBetter

https://github.com/eternity4719/HowToLiveBetter · ★ 65077 (+8168 this week) · —

**What it does:** A 765-entry evidence-graded life guide for mainland China covering health, finance, law, social insurance, and family decisions, with every entry citing cost, benefit, and source—either journal papers or official documents.

**Why now:** The repo gained 8,168 stars this week, and the community has already built derivative apps, browser extensions, datasets, and an AI skill layer for Claude Code and Codex that queries entries by natural language.

**Build with it:** Install the provided Claude Code skill (`skills/life-decision-guide/`) and wire it into a Chinese-language chatbot to return cited, section-numbered answers drawn directly from the book's 765 entries.

## 10. Shubhamsaboo/awesome-llm-apps <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Shubhamsaboo/awesome-llm-apps · ★ 142108 (+1179 this week) · agents, llms, python, rag

**What it does:** A curated collection of 100+ end-to-end tested, Apache-2.0-licensed AI agents, agent skills, and RAG apps (retrieval-augmented generation—systems that ground model output in external documents) in Python, compatible with Claude, Gemini, GPT, DeepSeek, Llama, and other models.

**Why now:** The repo gained 1,179 stars this week and holds the #1 trending repository badge on Trendshift.

**Build with it:** Install a single agent skill into your existing Claude Code or Cursor workflow with `npx skills add <skill-url>` and invoke it in plain English—no scaffolding required.
