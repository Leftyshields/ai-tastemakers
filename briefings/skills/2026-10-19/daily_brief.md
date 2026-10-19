# Skill Tastemakers — Daily Brief — 2026-10-19

_Ranking: delta_7d · 10 repos · generated 2026-10-19T19:21:45.243Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 334925 (+238879 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a single MCP server (a standardized way to give AI agents access to external tools) that lets agents inspect closed-source binaries, JavaScript/Electron apps, .NET assemblies, and websites using Hopper or Ghidra as the analysis backend—no source code required.

**Why now:** A Hacker News thread this week titled "Reverse engineer anything with agents, from app behavior down to native binaries" pulled 99 points and 38 comments, driving a notable spike in attention.

**Build with it:** Run `npx rea-agents setup` to register REA with your agent, then point it at a closed-source Electron app and ask it to trace a specific feature down to the binary level.

## 2. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 77216 (+18827 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a local-first, open-source desktop app (Electron + Python) covering voice cloning, voice design, video dubbing, dictation, transcription, and audiobook generation across 646 languages, using k2-fsa/OmniVoice as its default model.

**Why now:** The project hit Hacker News this week and accumulated nearly 19,000 stars in seven days—a clear signal that builders are actively hunting for self-hosted alternatives to ElevenLabs.

**Build with it:** Point VoiceStudio's watch-folder feature at a directory of script files to run a fully local, automated audiobook pipeline with no external API calls.

## 3. mattpocock/skills

https://github.com/mattpocock/skills · ★ 297302 (+11401 this week) · —

**What it does:** A collection of small, composable agent skills for Claude Code, Codex, Copilot, and others that encode opinionated engineering workflows—spec writing, triaging, planning—while keeping the human in control of the process rather than delegating it entirely to the agent.

**Why now:** The repo crossed 297K stars with 11K added this week, and a community-built companion tool (`rvoertmann/barbequeue`) for running these skills in bulk while AFK has already appeared, indicating active ecosystem growth.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` in an existing project, invoke `/setup-matt-pocock-skills` once to connect your issue tracker and label conventions, then fire `/triage` against your backlog.

## 4. wheresryan22/anatomy

https://github.com/wheresryan22/anatomy · ★ 16766 (+10757 this week) · agent-skill, open-source, svg, vizualization

**What it does:** Anatomy is a Claude Code skill (also compatible with Antigravity, OpenCode, Codex, and MiniMax Code) that takes a technical concept and produces a self-contained, interactive isometric SVG/WebGL figure—a physical machine whose mechanics illustrate the concept—with shaded parts, live readouts, and pointer/keyboard interaction.

**Why now:** The repo gained over 10,000 stars this week, and the pattern it introduces—concept-to-interactive-diagram via agent skill—is still early enough to shape before it becomes boilerplate.

**Build with it:** Run `npx skills add wheresryan22/anatomy -g`, then send `/anatomy explain how a token bucket rate limiter works, interactive` to Claude Code to get an embeddable SVG you can drop straight into documentation or a web app.

## 5. MadsLorentzen/ai-job-search

https://github.com/MadsLorentzen/ai-job-search · ★ 56621 (+10561 this week) · ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume

**What it does:** A Claude Code–driven CLI framework that scrapes job portals, scores each posting against your profile, then runs a drafter-reviewer agent pipeline to produce tailored LaTeX CVs and cover letters.

**Why now:** The repo gained 10,561 stars this week and surfaced as a Trendshift daily trending repository, drawing sustained builder attention to local job-board scraping patterns.

**Build with it:** Fork the repo, swap the Danish portal scrape commands in `/scrape` for your local job boards, then run `/apply <url>` end-to-end against a live posting to validate fit scoring and LaTeX output on your own profile.

## 6. stablyai/orca

https://github.com/stablyai/orca · ★ 98015 (+8382 this week) · ade, agent-ide, ai-agents, automation, bot, claude-code, codex, ghostty, grok-bot, hermes-agent, mobile-app, muse, openclaw, opencode, orchestration, pi, runtime, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop and mobile orchestrator that runs multiple coding agents—Codex, Claude Code, OpenCode, Grok Bot—in parallel git worktrees, so you can fan out a single prompt to several agents and merge whichever result wins.

**Why now:** The repo gained 8,382 stars this week as Codex, Claude Code, and OpenCode compete for daily coding-agent workflows, making multi-agent comparison a practical need rather than a novelty.

**Build with it:** Clone a repo into Orca, send the same prompt to Codex and Claude Code in parallel worktrees, then diff the outputs to pick the winning branch.

## 7. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 58294 (+8303 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** An agent skill installable via `npx skills add cathrynlavery/diagram-design` that generates self-contained HTML + SVG diagram files across 45 diagram types, automatically matching your site's brand palette and fonts inside Cursor, Claude Code, Copilot, and other agent hosts.

**Why now:** The repo gained 8,300 stars this week as diagram generation is becoming a routine step in agent-driven development workflows rather than an occasional one-off.

**Build with it:** After installing, run the onboarding command with your site URL (`"Onboard diagram-design to https://yoursite.com"`) so the skill pulls your brand palette once—every subsequent architecture or sequence diagram renders in your own colors without manual styling.

## 8. android/skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/android/skills · ★ 8986 (+1223 this week) · skills

**What it does:** A collection of SKILL.md instruction files that anchor AI coding agents to Android-specific patterns for workflows where LLMs reliably underperform, including R8 shrinking/obfuscation analysis, Wear Compose, and edge-to-edge UI.

**Why now:** The repo gained 1,223 stars this week, tracking closely with rising adoption of agentic coding tools like Claude Code and Codex that the install paths directly target.

**Build with it:** Run `android skills add --all` via the Android CLI to drop the full skill set into your project directory and immediately sharpen agent output on tasks like Wear Compose M3 migrations.

## 9. ahujasid/mcp-for-blender

https://github.com/ahujasid/mcp-for-blender · ★ 31672 (+1198 this week) · 3d-modeling, ai, blender, blender-addon, blender-mcp, claude, generative-ai, llm, mcp, model-context-protocol, python

**What it does:** A Python addon and MCP server that lets any LLM—Claude, Cursor, VS Code, and others—control Blender through natural-language prompts to create and manipulate 3D scenes without writing Blender Python by hand.

**Why now:** The repo gained roughly 1,200 stars this week and recently rebranded from `blender-mcp` to `mcp-for-blender` on PyPI, adding a one-command installer (`uvx mcp-for-blender setup`) that auto-detects and configures supported MCP clients.

**Build with it:** Add the `blender` entry to your MCP config JSON to point Claude Desktop at the server, then prompt it to generate a scene—the shortest path to testing LLM-driven geometry creation.

## 10. yetone/magpie

https://github.com/yetone/magpie · ★ 16928 (+7820 this week) · claude-code, codex, deepseek, gemini-cli, llm, macos

**What it does:** Magpie is a local gateway—available as a menu bar app, TUI, CLI, or Docker container—that lets you route any AI coding agent (Claude Code, Codex, Gemini CLI, OpenCode) across multiple providers or accounts and automatically fails over to the next when a quota runs out.

**Why now:** The repo gained 7,820 stars this week as builders running multiple agents across fragmented provider accounts hit quota limits and need a routing layer that doesn't require touching agent configs each time.

**Build with it:** Add a routing group in Magpie's Providers page with your DeepSeek and Kimi API keys, then point Claude Code at the local gateway endpoint—quota exhaustion on one account silently rolls to the next.
