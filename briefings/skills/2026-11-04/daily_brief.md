# Skill Tastemakers — Daily Brief — 2026-11-04

_Ranking: delta_7d · 10 repos · generated 2026-11-04T21:16:30.839Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 430512 (+28841 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a protocol layer that connects AI agents to external tools) that lets agents inspect binaries, app behavior, and native code without needing source access, bridging AI assistants directly to reverse engineering workflows.

**Why now:** A Hacker News thread this week pulled 101 points and 39 comments on agent-driven binary analysis, putting the project inside an active builder conversation.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent, then point it at a closed app to reverse engineer a feature you want to replicate in your own project.

## 2. blader/humanizer

https://github.com/blader/humanizer · ★ 64801 (+2922 this week) · agent-skills, ai-humanizer, ai-writing, chatgpt, claude, claude-code, codex, cursor, humanize-ai-text, humanizer, llm, prompt-engineering, writing-tools

**What it does:** Humanizer is an agent skill that rewrites AI-generated text by targeting 26 specific patterns, like staged run-ups and one-line closers, that Wikipedia editors flag as signs of AI authorship.

**Why now:** The repo surfaced on Hacker News this week and picked up nearly 3,000 stars in seven days.

**Build with it:** Install it into Claude Code with `/plugin marketplace add blader/humanizer` and pipe your draft release notes through `/humanizer` before publishing.

## 3. pbakaus/impeccable

https://github.com/pbakaus/impeccable · ★ 102681 (+10426 this week) · agent-skills, ai, anti-slop, design, slop

**What it does:** Impeccable is a command vocabulary layer for coding agents that steers visual design with commands like `bolder` and `quieter`, reviews output with `critique` and `audit`, and runs 62 deterministic rules to flag AI-generated design slop before it ships.

**Why now:** The repo crossed 100k stars this week, arriving at a moment when AI-generated UIs have become visually homogeneous enough that "anti-slop" is a recognized problem category with real tooling demand behind it.

**Build with it:** Run `npx impeccable install` in an existing project, then point `/impeccable audit` at one component in Claude Code or Cursor to get P0-to-P3 ranked findings without touching any config.

## 4. max-sixty/worktrunk

https://github.com/max-sixty/worktrunk · ★ 10969 (+1429 this week) · agents, claude-code, codex, developer-tools, git, worktrees

**What it does:** Worktrunk is a Rust-built CLI that wraps git worktree management (isolated copies of a repo for parallel work) into three core commands, letting you spin up separate working trees for parallel AI agent runs with copy-on-write build caches and lifecycle hooks.

**Why now:** The project launched earlier this year and gained 1,429 stars this week, tracking a rise in developers standardizing on one-worktree-per-agent setups for tools like Claude Code and Codex.

**Build with it:** Point Worktrunk's hooks config at your existing Claude Code setup to automatically provision a fresh worktree per agent invocation and confirm that parallel tasks stay properly isolated.

## 5. thedotmack/claude-mem

https://github.com/thedotmack/claude-mem · ★ 112725 (+8749 this week) · ai, ai-agents, ai-memory, anthropic, artificial-intelligence, chromadb, claude, claude-agent-sdk, claude-agents, claude-code, claude-code-plugin, claude-skills, embeddings, long-term-memory, mem0, memory-engine, openmemory, rag, sqlite, supermemory

**What it does:** claude-mem is a persistent memory layer for Claude Code and other AI agents that captures session activity, compresses it, and injects relevant context back into future sessions using RAG and embeddings stored in SQLite or ChromaDB.

**Why now:** The repo gained nearly 9,000 stars this week, likely tied to the broader wave of Claude Code tooling and the newly announced Claude agent SDK ecosystem.

**Build with it:** Install the plugin into an existing Claude Code project and configure the memory injection hook to test whether cross-session context cuts repeated re-explanation in a long-running coding agent.

## 6. Gathin23/cleanyourtv

https://github.com/Gathin23/cleanyourtv · ★ 51961 (+8468 this week) · adb, adblock, android-tv, android-tv-launcher, apple-tv, bloatware-removal, claude-code, debloat, fire-tv, google-tv, launcher, privacy, smart-tv, sony-bravia, tcl, vibe-coding, xiaomi

**What it does:** CleanYourTV uses ADB over Wi-Fi to disable bloatware on any Android TV or Google TV and replace the ad-filled home screen with a minimal launcher styled after Apple TV, with no root required and a one-line restore command.

**Why now:** The repo hit number 1 trending on GitHub this week with 8,468 stars added, driven by coverage in TechCrunch, Tom's Guide, XDA, and more than 400 articles across 54 countries.

**Build with it:** Fork the Python scripts, extend the per-brand debloat package lists to cover your own TV model, and submit a pull request against the 433-device compatibility table.

## 7. avelino/awesome-go

https://github.com/avelino/awesome-go · ★ 192078 (+1245 this week) · awesome, awesome-list, go, golang, golang-library, hacktoberfest

**What it does:** Awesome-go is a community-curated index of Go frameworks, libraries, and tools organized by category, covering everything from authentication and bot building to data structures and CI.

**Why now:** The repository gained 1,245 stars this week, a spike in Go developer activity likely tied to Hacktoberfest contribution season.

**Build with it:** Use the categorized index to find and evaluate a vetted Go library for a specific need, such as picking a CLI framework from the Standard CLI section before writing a single line of code.

## 8. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 100906 (+8175 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a fully local, open-source alternative to ElevenLabs that handles voice cloning, video dubbing, transcription, and audiobook creation across 646 languages, running on laptops, phones, and servers without sending audio to any external service.

**Why now:** The repo gained over 8,000 stars this week, crossing 100,000 total and landing on Trendshift's trending list.

**Build with it:** Point the dubbing workflow at a local video file to produce a cloned-voice dub in a target language without touching any external API.

## 9. garrytan/gstack <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/garrytan/gstack · ★ 139264 (+1206 this week) · —

**What it does:** gstack is a collection of 23 Claude Code slash commands that assign specialized roles, including CEO, engineering manager, designer, QA lead, and security officer, to guide an AI coding agent through a structured sprint.

**Why now:** The repo crossed 139,000 stars this week, making it a visible reference implementation for teams adopting Claude Code as a shared engineering workflow.

**Build with it:** Run `/qa` against a staging URL to let gstack open a real browser, reproduce bugs, and apply fixes without leaving Claude Code.

## 10. scenario-labs/skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/scenario-labs/skills · ★ 2353 (+1170 this week) · 3d-models, agent-skills, ai-agents, ai-art, blender, claude-code, claude-skills, codex, game-assets, game-development, generative-ai, image-generation, maya, mcp, model-context-protocol, skills-sh, unity, unreal-engine, video-generation, zbrush

**What it does:** Agent Skills for the Scenario MCP server teaches AI coding agents (Claude Code, Cursor, Codex, and others) to generate images, video, audio, textures, skyboxes, and 3D assets, and includes expert skill sets that drive local creative tools like Blender, Maya, ZBrush, Unreal Engine, and Unity.

**Why now:** The repo gained 1,170 stars this week, tracking broader momentum as the MCP ecosystem gains traction across major coding agents.

**Build with it:** Run `npx skills add scenario-labs/skills --skill scenario-image scenario-model-training` to wire Scenario's image generation and custom model training directly into your agent's context.
