# Skill Tastemakers — Daily Brief — 2026-10-21

_Ranking: delta_7d · 10 repos · generated 2026-10-21T18:03:46.225Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 355989 (+120270 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a TypeScript MCP server (a standardized bridge that lets AI agents call external tools) that connects Claude, Codex, and similar agents to local reverse-engineering tools—Hopper, Ghidra, and decompilers—so they can analyze native binaries, Electron apps, .NET assemblies, and websites without source code.

**Why now:** A Hacker News thread this week hit 100 points and 38 comments, reflecting genuine builder interest in using agents to automate what has historically been slow, manual binary analysis work.

**Build with it:** Run `npx rea-agents setup` to register REA with your agent, then point it at a closed-source Electron app and ask the agent to trace a specific feature down to the decompiled binary.

## 2. ChromeDevTools/chrome-devtools-mcp <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ChromeDevTools/chrome-devtools-mcp · ★ 53945 (+10907 this week) · browser, chrome, chrome-devtools, debugging, devtools, mcp, mcp-server, puppeteer

**What it does:** `chrome-devtools-mcp` is an MCP server that gives AI coding agents—Claude, Cursor, Copilot—direct access to Chrome DevTools: network inspection, source-mapped console traces, screenshots, Puppeteer automation, and performance profiling.

**Why now:** The repo gained roughly 10,900 stars this week alongside active Hacker News discussion, marking a clear inflection in builder interest around agents that can drive and debug a live browser rather than just generate code.

**Build with it:** Add `npx -y chrome-devtools-mcp@latest` to your MCP client's `mcpServers` config and your coding agent can immediately inspect network requests, read console errors, and take screenshots against your local dev server.

## 3. tt-a1i/archify

https://github.com/tt-a1i/archify · ★ 86980 (+3524 this week) · agent-skills, ai-agents, architecture-diagram, claude-code, claude-skills, codex, coding-agents, deepseek-harness, developer-tools, diagrams, diagrams-as-code, dsh-plugin, flowchart, llm, mermaid, opencode, sequence-diagram, software-architecture, system-design, visualization

**What it does:** Archify is a JavaScript agent skill for Claude Code, Codex, Cursor, and OpenCode that turns natural-language descriptions—of an idea, a plan, or an existing codebase—into interactive, shareable HTML diagrams.

**Why now:** The project surfaced on Hacker News this week and pulled in 3,500+ stars in a single week, early enough that integrating it now means you're ahead of the derivative tooling that will follow.

**Build with it:** Install Archify as a skill in Claude Code, point it at an existing codebase, and it generates an interactive system-design diagram you can drop directly into documentation.

## 4. pbakaus/impeccable

https://github.com/pbakaus/impeccable · ★ 84326 (+3188 this week) · —

**What it does:** Impeccable adds a design-review layer to AI coding agents via `npx impeccable install`, providing 24 slash commands (like `polish`, `audit`, `bolder`), a `PRODUCT.md` context file, and 61 deterministic detector rules that flag UI problems without hitting any LLM or API.

**Why now:** The repo crossed 84K stars with 3,188 added this week—timing that tracks with widespread frustration over AI-generated UIs converging on the same defaults: Inter, purple gradients, nested cards.

**Build with it:** Run `/impeccable init` in your Claude project to generate a `PRODUCT.md`, then wire `/impeccable audit` into your PR review step to catch design regressions before shipping.

## 5. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 80049 (+14411 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a local-first, open-source Electron + Python desktop app covering voice cloning, voice design, video dubbing, dictation, transcription, and audiobook generation across 646 languages, using engines including k2-fsa/OmniVoice.

**Why now:** The repo gained 14,411 stars this week—fast enough that evaluating it now puts you ahead of the wave of derivative projects likely to follow.

**Build with it:** Expose its local MCP server to an agent pipeline to get on-device TTS and transcription calls without routing audio through a third-party API.

## 6. Gathin23/cleanyourtv

https://github.com/Gathin23/cleanyourtv · ★ 17886 (+13366 this week) · adb, adblock, android-tv, android-tv-launcher, apple-tv, bloatware-removal, claude-code, debloat, fire-tv, google-tv, launcher, privacy, smart-tv, sony-bravia, tcl, vibe-coding, xiaomi

**What it does:** CleanYourTV uses ADB over Wi-Fi to disable manufacturer bloat, telemetry, and ad services on any Android/Google TV, then installs a 429 KB native launcher as the default home screen—with a one-line restore if you change your mind.

**Why now:** The repo hit #1 trending on GitHub this week after a before/after tweet of a debloated TV reached 7.4M views, pulling in 170+ device-specific bloat lists from 200+ contributors in four days.

**Build with it:** Connect a TV via `adb connect <TV_IP>`, feed Claude Code the repo's brand-specific disable lists, and let it work through which packages to `pm disable-user` before committing the changes.

## 7. alirezarezvani/claude-skills

https://github.com/alirezarezvani/claude-skills · ★ 28496 (+1737 this week) · agent-plugins, agent-skills, agentic-ai, ai-coding-agent, anthropic-claude, claude-ai, claude-code, claude-code-plugins, claude-code-skills, claude-skills, codex-skills, coding-agent-plugins, cursor-skills, developer-tools, gemini-cli-skills, openai-codex, openclaw, openclaw-plugins, openclaw-skills, prompt-engineering

**What it does:** A library of 398 modular SKILL.md packages—covering engineering, security, DevOps, C-level advisory, and research operations—that inject domain expertise into Claude Code, Gemini CLI, Cursor, Codex, and nine other coding agents via a single `scripts/convert.sh`.

**Why now:** The repo gained 1,737 stars this week, coinciding with Claude Code's rapid adoption as a primary agentic coding environment where custom skills are a live differentiator between generic and specialized agent behavior.

**Build with it:** Drop a SKILL.md from the `security/` domain into your Claude Code project and wire a PreToolUse hook to gate destructive shell commands before they execute.

## 8. wheresryan22/anatomy

https://github.com/wheresryan22/anatomy · ★ 18371 (+8739 this week) · agent-skill, open-source, svg, vizualization

**What it does:** Anatomy is a Claude Code skill (compatible with Antigravity, OpenCode, Codex, and MiniMax Code) that takes a technical concept and generates a framed, interactive isometric illustration of a physical machine embodying it—built from SVG parts with optional WebGL shaders and a unified data model driving both visuals and live readouts.

**Why now:** The repo gained 8,739 stars this week, a breakout that tracks with broader momentum around Claude Code's skill and plugin surface as builders push beyond text output toward interactive documentation.

**Build with it:** Run `npx skills add wheresryan22/anatomy -g`, then invoke `/anatomy explain how a token bucket rate limiter works, interactive` inside Claude Code to drop a self-contained interactive figure into a project's docs or README.

## 9. mattpocock/skills

https://github.com/mattpocock/skills · ★ 299627 (+8714 this week) · —

**What it does:** A collection of small, composable agent skills for Claude Code, Codex, Copilot, and Gemini CLI that add structured workflows—issue triage, spec creation, documentation generation—without handing the agent full process control.

**Why now:** The repo crossed 299K stars this week with nearly 9K new stars added, reflecting a visible shift away from all-in-one scaffolding tools like BMAD toward smaller, composable agent primitives.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` in an existing project, invoke `/setup-matt-pocock-skills` to connect your issue tracker, then use `/triage` against real tickets.

## 10. stablyai/orca

https://github.com/stablyai/orca · ★ 100933 (+8596 this week) · ade, agent-ide, ai-agents, automation, bot, claude-code, codex, ghostty, grok-bot, hermes-agent, mobile-app, muse, openclaw, opencode, orchestration, pi, runtime, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop and mobile orchestrator that runs multiple coding agents—Codex, Claude Code, OpenCode, Grok Bot—in parallel git worktrees, letting you send a single prompt to several agents simultaneously, compare outputs, and merge the winner.

**Why now:** The repo gained roughly 8,600 stars this week, a spike that aligns with growing builder appetite for workflows that treat agents as competing implementations rather than a single source of truth.

**Build with it:** Point Orca at an existing repo, fan one bug-fix prompt across three agents in parallel worktrees, then diff and cherry-pick the winning branch from the UI.
