# Skill Tastemakers — Daily Brief — 2026-10-14

_Ranking: delta_7d · 10 repos · generated 2026-10-14T18:02:51.909Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 235719 (+227506 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a TypeScript MCP server (a tool-exposure layer for AI agents) that lets agents inspect closed-source binaries, Electron apps, .NET assemblies, and websites by plugging into existing Hopper, Ghidra, or IDA installations — no source code required.

**Why now:** A Hacker News thread on using agents for binary reverse engineering pulled 98 points and 37 comments this week, putting REA squarely in front of an audience actively experimenting with the workflow.

**Build with it:** Run `npx rea-agents setup` to register REA as an MCP tool, then prompt your agent to inspect a closed-source Electron app and explain how a specific UI feature is implemented.

## 2. eternity4719/HowToLiveBetter

https://github.com/eternity4719/HowToLiveBetter · ★ 62851 (+16404 this week) · —

**What it does:** A 699-entry Chinese-language guide covering health, law, finance, and social systems, where every entry lists its cost, benefit, and an evidence grade sourced from peer-reviewed journals or official documents.

**Why now:** The repo added 16,404 stars this week — a viral breakout that makes localization and query tooling gaps immediately worth building against.

**Build with it:** Install the provided Claude Code or Codex skill under `skills/life-decision-guide/` and wire it to a chat interface so users can query entries by life situation and get citation-backed answers with section references.

## 3. mattpocock/skills

https://github.com/mattpocock/skills · ★ 290913 (+13009 this week) · —

**What it does:** `mattpocock/skills` is a collection of small, composable agent skills for Claude Code, Codex, Copilot, and other coding agents, designed to give engineers structured control over AI-assisted development without handing off the process entirely.

**Why now:** The repo has attracted over 290,000 stars with 13,000 added this week, and a community project (barbequeue) appeared on HN specifically to run these skills in bulk AFK — signaling active builder adoption.

**Build with it:** Run `claude plugin install mattpocock-skills@claude-plugins-official` in an existing Claude Code project, then invoke `/setup-matt-pocock-skills` once to wire in your issue tracker and label conventions.

## 4. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 65638 (+11472 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a fully local, open-source Electron + Python desktop app covering voice cloning, voice design, video dubbing, dictation, transcription, and audiobook creation across 646 languages, using the k2-fsa/OmniVoice engine by default.

**Why now:** The repo gained 11,472 stars this week as builders actively look for local-first alternatives to ElevenLabs that keep audio data off third-party servers.

**Build with it:** Connect VoiceStudio's local MCP server to wire its TTS and cloning endpoints directly into an agent pipeline — no cloud API key needed.

## 5. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 55200 (+11322 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** An agent skill (installable via `npx skills add cathrynlavery/diagram-design` in Cursor, Claude Code, Copilot, and others) that generates self-contained HTML + SVG diagram files across 45 diagram types, styled to match your brand rather than Mermaid's defaults.

**Why now:** The repo crossed 11,000 stars this week, driven by builder frustration with Mermaid's aesthetic limitations and rapid adoption of agent-skill ecosystems across major coding tools.

**Build with it:** Run `"Onboard diagram-design to https://yoursite.com"` to pull your site's palette and fonts, then generate branded architecture diagrams inside Claude Code that drop straight into docs as double-clickable `.html` files.

## 6. vercel-labs/skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/vercel-labs/skills · ★ 34907 (+1636 this week) · —

**What it does:** A CLI (`npx skills add owner/repo`) that installs shareable, versioned prompt-and-context bundles into coding agents like Claude Code, Cursor, OpenCode, and Codex — think package managers but for agent behavior.

**Why now:** The repo crossed 34,900 stars with 1,636 added this week, as competing coding agents proliferate and teams need a consistent way to inject the same behavioral context across all of them.

**Build with it:** Publish a private Git repo of team-specific skills — coding conventions, API patterns — and add `npx skills add git@github.com:acme/private-skills.git` to your CI so every developer's coding agent inherits the same context automatically.

## 7. herdrdev/herdr

https://github.com/herdrdev/herdr · ★ 44012 (+1375 this week) · agent, agent-orchestration, ai, ai-agents, claude-code, cli, codex, coding-agents, developer-tools, devtools, multiplexer, rust, terminal, terminal-multiplexer, terminal-ui, tmux, tui, workspace-manager

**What it does:** Herdr is a Rust terminal multiplexer built for coding agents — it keeps Claude Code, Codex, Cursor, and similar tools running in a background server across SSH drops and detaches, exposes a CLI and socket API for spawning panes and signaling between agents, and marks each pane as working, blocked, or idle.

**Why now:** The repo gained 1,375 stars this week as multi-agent coding workflows shift from experiments to daily practice and developers hit the limits of standard terminal session management.

**Build with it:** Wire your agent to herdr's socket API via the `agent-skill` interface so it can programmatically spawn panes and poll for blocked state, letting you validate the orchestration loop without touching the agents themselves.

## 8. linshenkx/prompt-optimizer

https://github.com/linshenkx/prompt-optimizer · ★ 37993 (+1365 this week) · ai-prompts, ai-tools, llm, prompt, prompt-engineering, prompt-optimization, prompt-optimizer, prompt-testing, prompt-toolkit, prompt-tuning

**What it does:** Prompt Optimizer is a TypeScript tool that runs a rough prompt through an AI-powered refinement loop, then lets you test, evaluate, and save the result — available as a web app, Chrome extension, Docker image, or MCP server.

**Why now:** The repo gained 1,365 stars this week, likely tracking renewed interest in structured prompt engineering as smaller, cheaper models become the cost-effective production default where prompt quality has outsized impact.

**Build with it:** Deploy the Docker image (`linshen/prompt-optimizer`) with your existing LLM API key to add an optimization step before any prompt reaches your production model.

## 9. K-Dense-AI/scientific-agent-skills

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 49137 (+1358 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** A library of 177 validated, procedure-level skills covering biology, chemistry, medicine, and drug discovery that any compatible AI agent can call to access 100+ scientific databases and run research workflows — without writing custom API wrappers for each one.

**Why now:** The repo gained 1,358 stars this week alongside the public release of K-Dense BYOK, a free local AI co-scientist that runs these skills on your desktop using your own API keys.

**Build with it:** Add the skills to a Cursor or Claude Code project via the Agent Skills standard config and immediately give your coding agent authenticated access to genomics, proteomics, and cheminformatics databases.

## 10. Imbad0202/academic-research-skills

https://github.com/Imbad0202/academic-research-skills · ★ 51965 (+1311 this week) · academic-pipeline, academic-writing, ai-research, claude, claude-code, literature-review, peer-review, prompt-engineering

**What it does:** A Claude Code plugin that automates reference hunting, citation formatting, logical consistency checks, and style calibration across a structured pipeline from research question to final submission, with mandatory human confirmation gates at each stage — v3.7.x added trust-chain frontmatter and three-layer citation anchors specifically to address hallucinated references.

**Why now:** The repo gained 1,311 stars this week as Zhao et al.'s May 2026 audit — finding roughly 147,000 hallucinated references in 2025 papers alone — made AI citation reliability a concrete, documented problem rather than a theoretical one.

**Build with it:** Install via `/plugin marketplace add Imbad0202/academic-research-skills` in Claude Code v3.7.0+, then run `/ars-plan` to start the Socratic paper-structuring dialogue inside your existing writing workflow.
