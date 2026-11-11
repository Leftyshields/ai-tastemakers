# Skill Tastemakers — Daily Brief — 2026-11-03

_Ranking: delta_7d · 10 repos · generated 2026-11-03T20:54:59.376Z_


## 1. yetone/magpie

https://github.com/yetone/magpie · ★ 29037 (+5500 this week) · claude-code, codex, deepseek, gemini-cli, llm, macos

**What it does:** Magpie is a local gateway and menu-bar app that routes any AI coding agent (Claude Code, Codex, Gemini CLI) to whichever model provider you configure, with automatic failover to a backup account when a quota runs out.

**Why now:** The repo gained roughly 5,500 stars this week, a spike that tracks the growing number of competing free-tier providers worth arbitraging against each other.

**Build with it:** Point your existing Claude Code setup at a Kimi or DeepSeek endpoint by installing Magpie and selecting the provider from its Agents page, no manual edits to Claude Code's config required.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 426627 (+30235 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a tool-calling interface for AI agents) that connects agents to reverse-engineering tools, letting them inspect binaries and runtime behavior without source code.

**Why now:** A Hacker News thread this week drew 101 points and 39 comments around agents doing binary-level analysis, confirming real builder interest rather than just curiosity.

**Build with it:** Run `npx rea-agents setup` to wire REA into your agent as an MCP tool, then prompt it to analyze a closed-source app feature and generate a working reimplementation for your own project.

## 3. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 64631 (+2907 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** An agent skill that takes plain-language prompts and outputs self-contained HTML+SVG diagram files across 45 diagram types, styled to your brand, with no external dependencies.

**Why now:** The repo is trending at 64k+ stars with nearly 3,000 added this week, surfacing on Hacker News as a diagram skill built for Claude Code and Codex workflows.

**Build with it:** Run `npx skills add cathrynlavery/diagram-design` in a Cursor or Claude Code project, then prompt your agent to generate an architecture diagram that drops directly into your docs as a double-clickable `.html` file.

## 4. pbakaus/impeccable

https://github.com/pbakaus/impeccable · ★ 101398 (+11112 this week) · agent-skills, ai, anti-slop, design, slop

**What it does:** Impeccable is a command vocabulary layer for coding agents that steers visual design with commands like `bolder` and `quieter`, reviews output with `critique` and `audit`, and runs 62 deterministic rules to flag homogeneous AI-generated patterns such as Inter-for-everything and purple-to-blue gradients before they ship.

**Why now:** The repo crossed 100,000 stars this week, a sharp spike driven by the recurring frustration with cookie-cutter UI coming out of coding agents.

**Build with it:** Run `npx impeccable install` in an existing project, then use `/impeccable audit` inside Claude Code or Cursor to get P0-to-P3 ranked findings on accessibility, performance, and responsive behavior without an API key or LLM call.

## 5. JimLiu/baoyu-design

https://github.com/JimLiu/baoyu-design · ★ 5972 (+1517 this week) · agent-skills, claude, claude-code, claude-design, cursor, design, dsh-plugin, dsh-plugins, prototyping, ui-design

**What it does:** `baoyu-design` is a set of agent skills that bring Claude's artifact types (slide decks, design canvases, design systems, dashboards, and motion films) to local coding agents like Cursor and Claude Code, writing editable file formats into your repo and opening them in locally-served editors.

**Why now:** The repo gained 1,517 stars this week, coinciding with broader interest in running Claude's design capabilities outside claude.ai without a subscription or file upload step.

**Build with it:** Drop the `claude-slides` or `claude-design` skill into your Cursor project and prompt the agent to generate a self-contained prototype, then edit copy and layout directly in the local editor it opens.

## 6. Gathin23/cleanyourtv

https://github.com/Gathin23/cleanyourtv · ★ 51243 (+9885 this week) · adb, adblock, android-tv, android-tv-launcher, apple-tv, bloatware-removal, claude-code, debloat, fire-tv, google-tv, launcher, privacy, smart-tv, sony-bravia, tcl, vibe-coding, xiaomi

**What it does:** CleanYourTV uses ADB over Wi-Fi to disable bloatware and sponsored launchers on Android TV and Google TV devices, replacing the default home screen with a minimal, Apple TV-style launcher without rooting or uninstalling anything.

**Why now:** The repo hit number one trending on GitHub this week, gaining nearly 10,000 stars in seven days, driven by coverage in TechCrunch, Tom's Guide, and over 400 articles across 54 countries.

**Build with it:** Fork the Python scripts and extend the per-brand package blocklists in the config layer to add debloat profiles for TV models not yet in the 427-device compatibility list.

## 7. qybaihe/bla <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/qybaihe/bla · ★ 2058 (+1428 this week) · adversarial-ai, claude-code, cursor, electron-security, llm-security, mcp, mcp-server, obfuscation, reverse-engineering, webassembly

**What it does:** BLA (Blind LLM Agents) hardens your shipped build artifacts against AI reverse-engineering agents by injecting format-valid decoys, pushing artifacts past documented resource budgets, and leaving analyzers with truncated inventories while keeping runtime behavior equivalent.

**Why now:** The repo hit GitHub's daily trending chart this week at rank 15, reflecting rising builder interest in countermeasures as AI-powered reverse-engineering tools become more capable and accessible.

**Build with it:** Run `npx bla-agents harden .` against your `dist/` or `build/` folder to auto-discover and protect JS bundles, Electron `.asar` files, or `.wasm` artifacts in a single audit-protect-verify pass.

## 8. Oldcircle/geo-sleuth

https://github.com/Oldcircle/geo-sleuth · ★ 5771 (+1425 this week) · agent-skills, ai-agents, claude-code, codex, computer-vision, cursor, gemini-cli, geoguessr, geoint, geolocation, github-copilot, image-geolocation, opencode, openstreetmap, osint, photo-geolocation, reverse-image-search, satellite-imagery

**What it does:** geo-sleuth is a SKILL.md-based agent skill (a reusable instruction file that coding agents like Claude Code or Cursor can follow) that locates the camera position in a photo using OpenStreetMap geometry, elevation skyline matching, satellite tiles, and street view, then outputs coordinates, bearing, and a satellite evidence image.

**Why now:** The repo gained 1,425 stars this week, a surge that tracks growing adoption of the SKILL.md format across Claude Code, Codex, Cursor, Gemini CLI, and GitHub Copilot.

**Build with it:** Run `npx skills add Oldcircle/geo-sleuth` to wire the skill into your agent, then trigger it by passing any photo with the prompt "find where this photo was taken."

## 9. coreyhaines31/marketingskills

https://github.com/coreyhaines31/marketingskills · ★ 58285 (+1416 this week) · agent-skills, ai-agents, ai-seo, claude, claude-code, claude-code-plugin, claude-skills, codex, content-marketing, conversion-rate-optimization, copywriting, cursor, email-marketing, generative-engine-optimization, growth-marketing, marketing, marketing-automation, saas-marketing, seo, skill-md

**What it does:** A collection of markdown skill files that give AI coding agents (Claude Code, Cursor, Codex, Windsurf) specialized workflows for conversion optimization, SEO, copywriting, and growth engineering.

**Why now:** The repo crossed 58,000 stars with 1,400+ added this week, as teams experiment with agentic marketing workflows following the Claude Code launch.

**Build with it:** Drop a skill file into your project, then run the [guided tool connection workflow](tools/SETUP.md) to wire in scoped credentials and get a first read-only result from your marketing accounts inside your agent session.

## 10. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 99949 (+8923 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a fully local, open-source alternative to ElevenLabs that handles voice cloning, video dubbing, transcription, and audiobook creation across 646 languages, running on laptops, phones, and servers.

**Why now:** The repo gained nearly 9,000 stars this week, making this a practical moment to evaluate it before tooling and community conventions around it solidify.

**Build with it:** Point VoiceStudio at a short audio sample and use its voice-cloning workflow to generate narration for a local text-to-speech pipeline without sending audio to any external API.
