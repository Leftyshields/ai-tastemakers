# Skill Tastemakers — Daily Brief — 2026-11-05

_Ranking: delta_7d · 10 repos · generated 2026-11-05T21:29:13.139Z_


## 1. mattpocock/skills

https://github.com/mattpocock/skills · ★ 315044 (+8549 this week) · —

**What it does:** A collection of small, composable agent skills for Claude Code, Codex, Copilot, and similar coding agents, giving engineers fine-grained control over AI-assisted workflows without handing off the entire process.

**Why now:** A third-party review published this week at Scott Logic adds outside scrutiny to the framework, making it a good moment to weigh the skills against real project constraints.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to drop editable skill files into a Cursor project, then customize the `/triage` skill to match your existing issue labels.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 434028 (+26870 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a tool-calling interface for AI agents) that connects agents to reverse engineering tools, letting them inspect binaries, applications, and runtime behavior without needing source code.

**Why now:** An HN thread this week drew 101 points and 39 comments around the core pitch of agents doing binary-level reverse engineering, signaling active builder interest.

**Build with it:** Run `npx rea-agents setup` to wire REA into your agent as an MCP tool, then prompt it to inspect a closed-source app feature and return a working reimplementation for your own project.

## 3. wheresryan22/anatomy

https://github.com/wheresryan22/anatomy · ★ 25211 (+2658 this week) · agent-skill, open-source, svg, vizualization

**What it does:** Anatomy is a Claude Code skill that takes a technical concept and generates an interactive, isometric SVG figure of a physical machine demonstrating how it works, with WebGL shaders and live readouts driven by the same model that animates the parts.

**Why now:** The repo gained 2,658 stars this week alongside several HN threads linking directly to the skill and its gallery site, putting it in active builder circulation right now.

**Build with it:** Install via `npx skills add wheresryan22/anatomy -g` and run `/anatomy explain how a token bucket rate limiter works, interactive` inside Claude Code to get a self-contained, embeddable SVG figure you can drop into docs or a dashboard.

## 4. tt-a1i/archify

https://github.com/tt-a1i/archify · ★ 93829 (+2433 this week) · agent-skills, ai-agents, architecture-diagram, claude-code, claude-skills, codex, coding-agents, deepseek-harness, developer-tools, diagrams, diagrams-as-code, dsh-plugin, flowchart, llm, mermaid, opencode, sequence-diagram, software-architecture, system-design, visualization

**What it does:** Archify is an agent skill for Claude Code, Codex, Cursor, and OpenCode that converts natural-language descriptions of ideas, plans, or codebases into interactive HTML diagrams including flowcharts, sequence diagrams, and system architecture visuals.

**Why now:** The repo gained 2,433 stars this week and has crossed 130K installs on skills.sh, a sharp uptick in adoption among coding-agent users.

**Build with it:** Install it as a skill in Claude Code, then prompt your agent to generate an interactive architecture diagram from an existing codebase to validate the diagramming output against a system you already know.

## 5. heydamir/unslop <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/heydamir/unslop · ★ 9693 (+2298 this week) · —

**What it does:** unslop is a Claude Code and Codex skill that audits a UI for AI-default artifacts like purple gradients, emoji labels, and uneven spacing, then rewrites it pass by pass into a designed interface with its own character.

**Why now:** The repo gained over 2,000 stars this week, tracking a sharp rise in builders shipping vibecoded frontends who need a cleanup step before launch.

**Build with it:** Drop the skill into `~/.claude/skills/` and run `/unslop` on any Next.js or Tailwind screen to get an audit and a staged, direction-first redesign without touching your component structure.

## 6. thedotmack/claude-mem

https://github.com/thedotmack/claude-mem · ★ 113492 (+8898 this week) · ai, ai-agents, ai-memory, anthropic, artificial-intelligence, chromadb, claude, claude-agent-sdk, claude-agents, claude-code, claude-code-plugin, claude-skills, embeddings, long-term-memory, mem0, memory-engine, openmemory, rag, sqlite, supermemory

**What it does:** claude-mem is a persistent memory compression system for Claude Code and other AI agents that captures session activity, compresses it with AI, and injects relevant context back into future sessions via RAG and embeddings backed by SQLite or ChromaDB.

**Why now:** The repo gained nearly 9,000 stars this week, tracking a sharp spike in developer interest around persistent agent memory as Claude Code adoption accelerates post-launch.

**Build with it:** Install the plugin into your Claude Code setup and configure the CLAUDE.md hook to automatically compress and restore session context across coding sessions.

## 7. pbakaus/impeccable

https://github.com/pbakaus/impeccable · ★ 103826 (+8775 this week) · agent-skills, ai, anti-slop, design, slop

**What it does:** Impeccable installs a set of slash commands (`/impeccable critique`, `/bolder`, `/audit`, and others) into coding agents like Claude Code, Cursor, and Codex to steer UI design decisions and flag AI-default patterns using 62 deterministic, no-API rules.

**Why now:** The repo crossed 100k stars this week, surfacing a sharp builder pain point: agents left without design guidance reliably produce the same Inter-and-purple-gradient output across every model and project.

**Build with it:** Run `npx impeccable install` in an existing project, then use `/impeccable audit` to get ranked P0-to-P3 findings on accessibility, performance, and responsive behavior before your next deploy.

## 8. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 101826 (+7703 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a fully local, open-source alternative to ElevenLabs that handles voice cloning, video dubbing, transcription, and audiobook creation across 646 languages, running on laptops, phones, and servers without sending audio to any external API.

**Why now:** The repo gained over 7,700 stars this week, a sharp spike in builder interest around local-first voice AI pipelines.

**Build with it:** Point its dubbing workflow at a video file to generate a localized, cloned-voice dub entirely on your own hardware.

## 9. JuneYaooo/rea-video <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/JuneYaooo/rea-video · ★ 1994 (+1144 this week) · agent-skills, ai-video, aigc-detection, claude-code, codex, douyin, ffmpeg, prompt-engineering, remotion, reverse-engineering, short-video, shot-detection, subtitles, tiktok, video-analysis, video-breakdown, video-editing, video-generation, vlm

**What it does:** rea-video is a CLI tool that takes any video file and produces a shot-by-shot breakdown covering whether each shot was filmed live, AI-generated, or coded, plus captions, cuts, audio analysis, and a plan to remake it.

**Why now:** The repo gained over 1,100 stars this week, surfacing alongside active builder interest in reverse-engineering TikTok and AI short-drama production pipelines.

**Build with it:** Point Claude Code at a competitor's AI product video using the one-liner install and `--lang en` flag to get a prompt-per-shot report you can feed directly into a Remotion or text-to-video generation workflow.

## 10. D4Vinci/Scrapling

https://github.com/D4Vinci/Scrapling · ★ 97846 (+7538 this week) · ai, ai-scraping, automation, crawler, crawling, crawling-python, data, data-extraction, mcp, mcp-server, playwright, python, scraping, selectors, stealth, web-scraper, web-scraping, web-scraping-python, webscraping, xpath

**What it does:** Scrapling is a Python web scraping framework covering single requests through full-scale crawls, with built-in stealth, Playwright support, adaptive CSS/XPath selectors, and an MCP server interface for wiring scraping into tool-calling agent workflows.

**Why now:** The repo gained 7,538 stars this week, coinciding with its listed MCP server topic and AI agent skill endpoint, putting it directly in the path of builders adding live web data retrieval to their agents.

**Build with it:** Point an MCP-compatible AI agent at Scrapling's MCP server to give it live web data access without writing custom scraping glue code.
