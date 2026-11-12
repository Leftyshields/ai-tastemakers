# Skill Tastemakers — Daily Brief — 2026-11-12

_Ranking: delta_7d · 10 repos · generated 2026-11-12T21:56:55.218Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 455098 (+21070 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (MCP stands for Model Context Protocol, a standard for giving AI agents access to external tools) that lets AI agents reverse-engineer closed binaries, apps, and runtime behavior down to the native instruction level, without source code.

**Why now:** A Hacker News thread this week drew 101 points and 39 comments on its MCP-based approach to binary analysis, signaling fresh builder interest in automated reverse engineering.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent, then point it at a compiled binary to extract feature behavior you want to replicate in your own project.

## 2. Donchitos/Claude-Code-Game-Studios

https://github.com/Donchitos/Claude-Code-Game-Studios · ★ 38718 (+2985 this week) · ai-agents, ai-assisted-development, anthropic, claude, claude-code, game-design, game-development, gamedev, godot, indie-game-dev, unity, unreal-engine

**What it does:** Claude Code Game Studios is a Shell-based toolkit that turns Claude Code into a guided game-development pipeline, taking a text description through a question round, a one-page brief, and a playable browser prototype in `prototypes/<name>/`, with iterative growth via slash commands like `/prototype`, `/cut`, and `/dev-story`.

**Why now:** The repo gained nearly 3,000 stars this week, reflecting a sharp surge in builder interest around Claude Code as an agentic coding environment.

**Build with it:** Run `/prototype <your game idea>` inside Claude Code pointed at a clone of this repo to get a double-click-playable browser game from a single description.

## 3. Jakeschincariol/day-trader-skill

https://github.com/Jakeschincariol/day-trader-skill · ★ 7390 (+1837 this week) · backtesting, claude, claude-skills, day-trading, stock-market

**What it does:** Eleven Claude skills for day trading that chain together across a `trader/` folder, covering chart scanning, entry timing, position sizing, and a Time Machine that runs 10,000 simulated sessions plus historical setup replays before you commit real money.

**Why now:** The repo gained 1,837 stars this week, and that spike makes this a good moment to evaluate it before the ecosystem around it solidifies.

**Build with it:** Clone the repo, copy the `trader-timemachine` skill folder into `~/.claude/skills/`, and run `/trader-timemachine` on a ticker you already watch to benchmark the simulation output against your own trade notes.

## 4. github/spec-kit

https://github.com/github/spec-kit · ★ 149535 (+1712 this week) · ai, copilot, development, engineering, prd, spec, spec-driven

**What it does:** Spec Kit gives AI coding agents structured processes, templates, and documented outcomes for spec-driven development, bug fixing, and idea assessment, with composable extensions, presets, and workflows that let teams customize or swap each layer.

**Why now:** The repo is gaining roughly 1,700 stars per week, likely tied to growing adoption of agentic coding tools like GitHub Copilot that need structured process scaffolding to stay predictable.

**Build with it:** Install the bug-fixing extension bundle and wire a workflow overlay to your existing Copilot agent to test whether structured agent processes reduce debugging cycles on a real project.

## 5. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 119402 (+1659 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a prompt-engineering CLI that installs a terse-output "caveman voice" across 30+ coding agents (Claude Code, Codex, Gemini CLI, and others) to cut input tokens by roughly 33% across full sessions without changing code output.

**Why now:** The project hit number 1 on Hacker News this week and was cited in an Adobe Research paper benchmarking caveman-style output across eight models, giving the technique third-party validation beyond the viral framing.

**Build with it:** Run `npx @caveman-ai/cli@latest` to inject the caveman skill into your existing Claude Code setup, then compare token usage on a real coding session using the `/caveman` or `/ultracave` slash commands.

## 6. OpenMontageInc/OpenMontage <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/OpenMontageInc/OpenMontage · ★ 80002 (+1400 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source, agentic video production system that lets an AI coding assistant handle scripting, stock footage retrieval, clip editing, and final rendering across 12 pipelines using tools like Remotion, FFmpeg, and fal.ai.

**Why now:** The repo hit 80k stars and ranked as GitHub's number-one trending repository of the day, putting it in front of a large builder audience this week.

**Build with it:** Point your Cursor or Copilot agent at a prompt and run one of the built-in pipelines to render a finished motion-clip video using free stock archives and Remotion composition.

## 7. milind-soni/OpenMausBot

https://github.com/milind-soni/OpenMausBot · ★ 21685 (+8513 this week) · ai-agents, claude-code, codex, computer-use, docker, electron, grok, grok-bot, grok-bot-alternative, self-hosted, typescript

**What it does:** OpenMausBot is an Electron desktop app for Mac, Windows, and Ubuntu that runs Claude or Codex agents as chat contacts, each with its own personality, model, and sandboxed cloud computer for approving actions.

**Why now:** The repo gained over 8,500 stars this week, coinciding with visible market interest in self-hosted alternatives to closed agent UIs like Grok Bot, Meta Muse, and OpenAI dots.

**Build with it:** Point your existing Claude or Codex API key at the app, wire a bot to a connected app, and use the approval flow as a lightweight human-in-the-loop checkpoint for automating a repeatable task.

## 8. nexu-io/open-design

https://github.com/nexu-io/open-design · ★ 107366 (+1259 this week) · agent-skills, ai-design, byok, claude-code-for-design, claude-design, codex-design, cursor-design, deepseek, deepseek-harness, design-systems, desktop-app, desktop-apps, dsh, dsh-plugin, figma-alternative, hermes-agent, local-first, prototyping, ui-generator, vibe-coding

**What it does:** OpenDesign is a local-first, Apache 2.0 workspace where AI coding agents (Codex, Claude Code, DSH, and others) generate and iterate on UI prototypes inside a shared design-system context.

**Why now:** The repo crossed 107K stars this week and just tied a credit promotion to its Go tier, making bring-your-own-key access to GPT-6 Luna and DeepSeek V4.1 Flash newly cheap for solo builders.

**Build with it:** Point an existing Claude Code or Codex setup at an OpenDesign project via its API access, then use agent skills to generate a prototype that inherits your team's design system tokens directly.

## 9. mattpocock/skills

https://github.com/mattpocock/skills · ★ 322948 (+7904 this week) · —

**What it does:** A collection of small, composable agent skills for Claude Code, Codex, Copilot, and other coding agents, designed to give engineers fine-grained control over planning, triaging, and spec workflows without handing the entire process to the agent.

**Why now:** The repo gained nearly 8,000 stars this week, likely driven by developer frustration with high-abstraction frameworks like BMAD and GSD that offer less control over individual steps.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to drop editable skill files into an existing Cursor project, then call `/setup-matt-pocock-skills` once to wire in your issue tracker and label config.

## 10. elder-plinius/CL4R1T4S

https://github.com/elder-plinius/CL4R1T4S · ★ 52614 (+1179 this week) · agents, ai, chatgpt, gemini, google, grok, hacking, leak, leaked, openai, prompt, prompt-engineering, prompts, red-team, red-teaming, system, system-info, system-prompts, tools, transparency

**What it does:** CL4R1T4S is a crowd-sourced collection of extracted system prompts and internal guidelines from major AI products including ChatGPT, Claude, Gemini, Grok, Cursor, and Devin, making visible the hidden instructions that shape model behavior.

**Why now:** The repo is gaining roughly 1,179 stars per week, reflecting a spike in developer interest around auditing what those hidden instructions actually say across tools they build on.

**Build with it:** Pull the system prompt for a specific model you depend on and diff it against your own application's system prompt to surface conflicting instructions or persona constraints before they hit production.
