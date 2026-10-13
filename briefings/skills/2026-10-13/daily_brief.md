# Skill Tastemakers — Daily Brief — 2026-10-13

_Ranking: delta_7d · 10 repos · generated 2026-10-13T19:53:31.834Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 201967 (+193754 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, ctf, decompiler, developer-tools, disassembler, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, reverse-engineering, static-analysis

**What it does:** REA is a Model Context Protocol (MCP) server — a standardized way for AI agents to call external tools — that wires agents to local reverse-engineering tools (Hopper, Ghidra, IDA, and static JS/Electron/.NET analyzers) so they can inspect closed-source binaries without source code.

**Why now:** The repo surfaced on Hacker News this week with 95 points and 32 comments, reflecting genuine builder interest in agent-driven reverse-engineering workflows.

**Build with it:** Run `npx rea-agents setup` to register REA with your agent, point it at a target binary, and ask the agent to explain an undocumented feature using decompiled output from your existing Hopper or Ghidra install.

## 2. tigerless-labs/autoharness

https://github.com/tigerless-labs/autoharness · ★ 11053 (+2883 this week) · agent-skills, claude-code, claude-code-plugin, llm-agents, python

**What it does:** AutoHarness is a Claude Code plugin that watches your live coding sessions and distills reusable patterns into `.claude/skills/`, then automatically merges near-duplicate entries, updates them in later sessions, and prunes unused ones — no manual curation required.

**Why now:** The project gained 2,883 stars this week alongside a Show HN post, putting it firmly in active-discovery territory rather than stale-release noise.

**Build with it:** Install via `/plugin marketplace add tigerless-labs/autoharness` and `/plugin install autoharness@autoharness` in Claude Code, then run `/learn` after solving a non-obvious problem to immediately distill that session into a self-maintaining skill.

## 3. eternity4719/HowToLiveBetter

https://github.com/eternity4719/HowToLiveBetter · ★ 62001 (+15554 this week) · —

**What it does:** A 690-entry, evidence-graded life-optimization guide for mainland China covering health, law, finance, and social systems, with every entry citing cost, benefit, and a source (journal or official document).

**Why now:** The repo gained 15,554 stars this week — a viral spike that makes derivative tooling (apps, bots, datasets) immediately discoverable by an audience already primed to use it.

**Build with it:** Drop the published Claude Code skill (`skills/life-decision-guide/`) into a Claude Code session to get a query interface that returns citations down to specific section and entry numbers.

## 4. wheresryan22/anatomy <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/wheresryan22/anatomy · ★ 7988 (+1979 this week) · agent-skill, open-source, svg, vizualization

**What it does:** Anatomy is a Claude Code skill (also compatible with OpenCode and Codex) that takes a technical concept and generates a framed, interactive isometric illustration — built from SVG, WebGL, and 3D parts — where a physical object's mechanics model the concept being explained.

**Why now:** The repo gained nearly 2,000 stars this week, driven by builders exploring Claude Code's new skills ecosystem after its recent launch.

**Build with it:** Run `npx skills add wheresryan22/anatomy -g -a claude-code`, then invoke `/anatomy explain how a token bucket rate limiter works, interactive` inside Claude Code to get a self-contained, no-dependency SVG figure you can embed directly in docs or a web app.

## 5. mattpocock/skills

https://github.com/mattpocock/skills · ★ 289393 (+11489 this week) · —

**What it does:** A set of small, composable AI agent skills for Claude Code, Codex, Copilot, and Gemini CLI that guide concrete engineering tasks — issue triage, spec writing, and structured planning — without delegating control to a higher-level framework.

**Why now:** The repo crossed 289,000 stars this week with nearly 12,000 added in seven days, as developers push back against opaque "vibe coding" approaches like BMAD and GSD.

**Build with it:** Install via `npx skills@latest add mattpocock/skills -a cursor`, run `/setup-matt-pocock-skills` in your repo to wire up your issue tracker and label conventions, then use `/triage` to automate ticket labeling inside Cursor.

## 6. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 53896 (+10018 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** An agent skill that generates self-contained HTML + SVG diagram files across 45 types — architecture, sequence, quadrant, and more — styled to your brand with no external dependencies.

**Why now:** The repo gained 10,000 stars this week as teams standardize on skills-based workflows in Cursor, Claude Code, and Codex.

**Build with it:** Run `npx skills add cathrynlavery/diagram-design`, then describe your architecture in plain English and get a double-clickable `.html` diagram scoped to your site's palette via the onboarding URL command.

## 7. bojieli/ai-agent-book <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/bojieli/ai-agent-book · ★ 54005 (+1420 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** A 10-chapter open-source book with 109 hands-on labs covering AI agent design around the formula Agent = LLM + Context + Tools, available as a free PDF/EPUB in 15 languages.

**Why now:** The repo hit GitHub Trending Project of the Day this week alongside its 2.0 release, which restructured chapters around multimodal agents and expanded interaction spaces.

**Build with it:** Clone the repo, run one of the 109 numbered lab scripts against your own LLM endpoint, and use the context-engineering chapter as a checklist for your agent's prompt architecture.

## 8. HKUSTDial/Supervisor-Skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/HKUSTDial/Supervisor-Skills · ★ 9461 (+1419 this week) · ai-research, ai-researcher, awesome, awesome-list, phd-research, research-skills, skills, vibe-research

**What it does:** Supervisor-Skills packages publishing experience from top venues (SIGMOD, VLDB, NeurIPS) into LLM-executable skills covering the full academic paper lifecycle — idea generation, intro drafting, peer-review simulation, and figure reconstruction.

**Why now:** The v2.1 release this week added three skills (`paper-writer`, `paper-polish`, `deep-research`) plus discipline-aware routing for evaluation, and the project was deployed as core research functionality inside ByteDance's Doubao office productivity mode.

**Build with it:** Drop a skill like `paper-writer` or `intro-drafter` directly into a Claude or GPT-4 system prompt to add evidence-gated academic writing as a structured step in a research automation pipeline.

## 9. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 62711 (+8545 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, tauri, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a fully local, open-source desktop app for voice cloning, video dubbing, dictation, transcription, and audiobook generation across 646 languages, powered by k2-fsa/OmniVoice with a swappable engine catalog.

**Why now:** The repo gained 8,545 stars this week, likely tied to growing demand for self-hosted ElevenLabs alternatives after recent API pricing scrutiny.

**Build with it:** Point VoiceStudio's watch folder at a directory of script files to run unattended audiobook or batch TTS jobs entirely on local hardware using its built-in workflow recipes.

## 10. nexu-io/open-design <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/nexu-io/open-design · ★ 100940 (+1249 this week) · agent-skills, ai-design, byok, claude-code-for-design, claude-design, codex-design, coding-agents, cursor-design, deepseek, deepseek-harness, design-systems, desktop-app, dsh, dsh-plugin, figma-alternative, hermes-agent, local-first, prototyping, ui-generator, vibe-coding

**What it does:** OpenDesign is a local-first, open-source workspace where AI coding agents (Codex, Claude Code, DSH, and others) generate and iterate on UI prototypes against a shared design system, with team feedback living in the same project.

**Why now:** The repo crossed 100,000 GitHub stars this week, coinciding with a push that doubles API credits for the first month across 10+ models including DeepSeek V4.1 Flash and GPT-6 Luna.

**Build with it:** Point an existing Claude Code or Codex setup at OpenDesign Cloud via the included API access, then feed it a design brief to generate a prototype that inherits your team's design system tokens directly.
