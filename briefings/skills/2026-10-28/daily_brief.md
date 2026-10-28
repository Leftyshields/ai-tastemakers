# Skill Tastemakers — Daily Brief — 2026-10-28

_Ranking: delta_7d · 10 repos · generated 2026-10-28T18:53:16.229Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 401671 (+45682 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a Model Context Protocol (MCP) server that connects AI agents to local tools for inspecting native binaries, JavaScript and Electron apps, .NET assemblies, and websites without access to source code.

**Why now:** A Hacker News thread this week pulled 101 points and 39 comments, indicating real traction among builders interested in agent-driven reverse engineering.

**Build with it:** Run `npx rea-agents setup` to wire REA into your agent as an MCP tool, then prompt it to analyze a closed app's feature and return decompiled evidence alongside a working reimplementation.

## 2. Gathin23/cleanyourtv

https://github.com/Gathin23/cleanyourtv · ★ 43493 (+25607 this week) · adb, adblock, android-tv, android-tv-launcher, apple-tv, bloatware-removal, claude-code, debloat, fire-tv, google-tv, launcher, privacy, smart-tv, sony-bravia, tcl, vibe-coding, xiaomi

**What it does:** CleanYourTV uses ADB over Wi-Fi to disable bloatware and sponsored launchers on Android TV and Google TV devices, replacing the default home screen with a clean, Apple TV-style launcher that requires no root and supports one-line restore.

**Why now:** The repo hit number 1 trending on GitHub this week with over 25,000 new stars, and multiple Hacker News threads surfaced it to builders actively discussing debloating workflows.

**Build with it:** Fork the Python ADB scripts and add your own device profile to the supported-TV list to extend coverage to an unlisted Android TV brand.

## 3. elayadesign/ai-design-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/elayadesign/ai-design-skills · ★ 10928 (+3293 this week) · —

**What it does:** A collection of self-contained markdown skill files that give AI coding tools like Claude Code, Cursor, and Windsurf structured design behavior for tasks like building landing pages from scratch, covering intake questions, copy, and a full visual system.

**Why now:** The repo gained over 3,000 stars this week, a spike that makes it a useful reference point right now for teams standardizing how AI tools handle design tasks.

**Build with it:** Clone the `landing-page-design` skill into `.claude/skills/` and ask Claude Code in plain language to build a landing page, with all type, spacing, and color values editable in one section of the skill file.

## 4. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 92731 (+12682 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a fully local, open-source desktop app for voice cloning, voice design, video dubbing, dictation, transcription, and audiobook generation across 646 languages, with no accounts or API keys required.

**Why now:** The repo gained 12,682 stars this week, driven by growing demand for self-hosted alternatives to services like ElevenLabs.

**Build with it:** Point the local MCP endpoint at an agent framework like LangChain to drive on-device text-to-speech generation without any third-party API calls.

## 5. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 115750 (+1671 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a prompt-engineering layer and CLI proxy that rewrites AI coding agent output into stripped-down caveman-speak, cutting input tokens by roughly 33% across a session without changing the actual code or answers.

**Why now:** The project hit number 1 on Hacker News this week, was cited by Adobe Research and A/B tested by JetBrains, and reached number 1 on GitHub Trending with over 115,000 stars.

**Build with it:** Run `npx @caveman-ai/cli@latest` to patch Claude Code, Codex, or any of 30+ supported agents on your machine and immediately measure token reduction against your own codebase sessions.

## 6. Jakeschincariol/day-trader-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Jakeschincariol/day-trader-skill · ★ 2581 (+1585 this week) · backtesting, claude, claude-skills, day-trading, stock-market

**What it does:** Eleven Claude skills for day trading covering chart scanning, news monitoring, entry and exit timing, position sizing, and a Time Machine that runs 10,000 simulated sessions from real historical bars before you risk a dollar.

**Why now:** The repo gained 1,585 stars this week, placing it among the fastest-rising Python projects and reflecting a surge of builder interest in Claude-native trading tooling.

**Build with it:** Drop a single `SKILL.md` into any Claude chat, no install needed, to run the Time Machine method on a ticker you are already watching and validate historical setup odds before writing any order logic.

## 7. nexu-io/open-design

https://github.com/nexu-io/open-design · ★ 104614 (+1570 this week) · agent-skills, ai-design, byok, claude-code-for-design, claude-design, codex-design, cursor-design, deepseek, deepseek-harness, design-systems, desktop-app, desktop-apps, dsh, dsh-plugin, figma-alternative, hermes-agent, local-first, prototyping, ui-generator, vibe-coding

**What it does:** OpenDesign is a local-first, open-source collaborative workspace where AI agents including Claude Code, Codex, and others generate and iterate on prototypes, design systems, and UI components from a plain-language brief.

**Why now:** The project hit 100,000 GitHub stars this week and is marking the milestone with a doubled-credit pricing promotion, making this a practical moment to evaluate its BYOK and API access tiers.

**Build with it:** Point an existing Claude Code or Codex setup at OpenDesign's plugin surface to generate prototypes directly from a design-system brief, then share the result with teammates for in-app feedback.

## 8. Nutlope/hallmark

https://github.com/Nutlope/hallmark · ★ 40449 (+9898 this week) · —

**What it does:** Hallmark is a design ruleset for Claude Code, Cursor, and Codex that selects from fifty material-based themes, structures pages around their primary action, and lints output in a real browser against the specific patterns that make AI-generated UIs look machine-made.

**Why now:** The repo gained nearly 10,000 stars this week alongside a broader builder conversation about the gap between functional and credible-looking AI-generated interfaces.

**Build with it:** Drop the Hallmark skill into an existing Claude Code or Cursor project and run `/hallmark audit <path>` on a page you already ship to get a concrete report of AI-tell violations before touching the redesign commands.

## 9. Donchitos/Claude-Code-Game-Studios

https://github.com/Donchitos/Claude-Code-Game-Studios · ★ 28415 (+1364 this week) · ai-agents, ai-assisted-development, anthropic, claude, claude-code, game-design, game-development, gamedev, godot, indie-game-dev, unity, unreal-engine

**What it does:** Claude Code Game Studios drops 49 specialized subagents, 74 slash commands, and 15 validation hooks into a Claude Code session to simulate a full studio hierarchy spanning directors, department leads, and specialists across design, programming, art, audio, QA, and production.

**Why now:** The repo gained over 1,300 stars this week, reflecting growing builder interest in structured multi-agent workflows for creative projects.

**Build with it:** Clone the repo into an existing Godot, Unity, or Unreal project and run `/start` to let the producer and creative-director agents scaffold a game design document, sprint plan, and folder structure before writing a line of code.

## 10. github/spec-kit <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/github/spec-kit · ★ 143608 (+1329 this week) · ai, copilot, development, engineering, prd, spec, spec-driven

**What it does:** Spec Kit is an open-source toolkit that gives AI coding agents structured processes, templates, and documented outcomes for feature development, bug fixing, and idea assessment through a methodology called Spec-Driven Development, with bundled extensions for each workflow.

**Why now:** The repo is gaining over 1,300 stars this week, a signal that builders are actively looking for ways to impose repeatable structure on agent-assisted development.

**Build with it:** Install the bug-fixing extension and wire it into your existing coding agent using Spec Kit's integration config to get a structured cause-assess-fix-verify loop on a real open issue.
