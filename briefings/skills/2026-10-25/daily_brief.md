# Skill Tastemakers — Daily Brief — 2026-10-25

_Ranking: delta_7d · 10 repos · generated 2026-10-25T17:05:14.822Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 383108 (+64670 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a single MCP server (a standardized way to give AI agents access to external tools) that lets agents inspect closed-source binaries, JavaScript/Electron apps, .NET assemblies, and websites — returning decompiled evidence and working reimplementations without ever seeing source code.

**Why now:** A Hacker News thread titled "A MCP for Agents to reverse engineer binary code" surfaced it this week, pulling in 64K+ new stars in seven days.

**Build with it:** Run `npx rea-agents setup` to wire REA into a Claude Code or Codex agent, then prompt it to explain a closed-source app feature and return decompiled evidence alongside a working reimplementation.

## 2. heygen-com/hyperframes

https://github.com/heygen-com/hyperframes · ★ 71957 (+5430 this week) · ai, ai-agents, animation, claude-code, ffmpeg, framework, gsap, html, html-to-video, mcp, motion-graphics, puppeteer, rendering, typescript, video-editor

**What it does:** HyperFrames is a TypeScript framework that renders HTML, CSS, animations, and media into deterministic MP4 videos by driving Chrome's BeginFrame API — meaning every pixel is controlled frame-by-frame rather than captured from a live browser session.

**Why now:** The project hit Hacker News this week, gained 5,400+ stars in seven days, and simultaneously launched native Mac and Linux apps alongside a Claude Code plugin marketplace listing.

**Build with it:** Run `claude plugin marketplace add heygen-com/hyperframes` inside a Claude Code project, then prompt your agent to render an existing HTML component as a video scene.

## 3. hugohe3/ppt-master

https://github.com/hugohe3/ppt-master · ★ 68044 (+4613 this week) · ai-agent, aippt, office, powerpoint, powerpoint-generation, ppt, pptx, presentation, slide, slides

**What it does:** PPT Master is a Python AI agent that converts documents, PDFs, or topic prompts into natively editable PPTX files — real shapes, transitions, animations, data-backed charts, and optional audio narration from speaker notes, not just screenshot slides.

**Why now:** The project gained 4,613 stars this week and recently added integration with Kimi K3 — a 3-trillion-parameter model with a 1M-token context window — which makes converting long technical reports into full decks newly practical.

**Build with it:** Point it at your own `.pptx` template to generate on-brand slide decks from internal documents without touching PowerPoint manually.

## 4. Gathin23/cleanyourtv

https://github.com/Gathin23/cleanyourtv · ★ 34178 (+29658 this week) · adb, adblock, android-tv, android-tv-launcher, apple-tv, bloatware-removal, claude-code, debloat, fire-tv, google-tv, launcher, privacy, smart-tv, sony-bravia, tcl, vibe-coding, xiaomi

**What it does:** CleanYourTV uses ADB over Wi-Fi — Android's wireless debugging bridge, no root or cables required — to disable bloatware and swap the stock Android/Google TV home screen for a 518 KB Apple TV-style launcher, with a one-line restore if you want to undo it.

**Why now:** A before/after tweet posted 17 October 2026 hit 7.4M views in days, pulled in 200+ contributors, and landed coverage in TechCrunch, Tom's Guide, and 190+ other outlets across 32 countries.

**Build with it:** Use the addon surface at cleanyour.tv/addons to ship a custom theme or launcher skin targeting the 300+ supported TV models already mapped in the contributor lists.

## 5. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 140268 (+3142 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** UI UX Pro Max is a Python-based AI skill — a structured set of rules injected into AI coding tools at runtime — that loads 192 reasoning rules and 79 searchable UI styles into Cursor, Windsurf, Claude Code, Copilot, and Codex to guide professional-grade UI/UX generation across React, Tailwind, and mobile frameworks.

**Why now:** The repo gained 3,142 stars this week, tracking a broader shift toward wiring design-aware system prompts directly into agentic coding tools rather than fixing output after the fact.

**Build with it:** Install the `ui-ux-pro-max-cli` npm package, attach the skill to your Cursor or Windsurf project, and get style-constrained UI generation on your next component sprint.

## 6. Nutlope/hallmark <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Nutlope/hallmark · ★ 33296 (+2745 this week) · —

**What it does:** Hallmark is a design system prompt for Claude Code, Cursor, and Codex that picks from 48 material-based themes, structures pages around their primary action, and runs a tiered lint pass to strip the specific patterns — eyebrow headings, tracked-capital labels, single-color headline accents, placeholder-frame layouts — that mark output as AI-generated.

**Why now:** The repo gained 2,745 stars this week, coinciding with growing builder frustration over visually identical AI-scaffolded UIs shipping with the same default component arrangements.

**Build with it:** Drop the Hallmark skill file into your Claude Code project and run `/hallmark redesign <path>` on an existing page to get a theme-matched rebuild that preserves your content and wiring while enforcing the contrast, motion, and layout floor checks automatically.

## 7. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 73654 (+2729 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, dsh, from-scratch, generative-ai, llm, machine-learning, mcp, python, rea, reinforcement-learning, rust, transformers, tutorial, typescript

**What it does:** A structured open-source curriculum of 542 lessons across 20 phases that teaches AI engineering by having you implement model internals, retrieval pipelines, and agent runtimes in Python, TypeScript, Rust, and Julia — not wrap existing APIs.

**Why now:** The repo gained 2,729 stars this week, surfacing alongside rising demand for hands-on MCP and agent runtime implementation rather than tutorials that stop at the API call.

**Build with it:** Jump to the agent runtimes phase, run the local lab code, and use the included evaluation harness to inspect failure cases in your own tool-calling loop.

## 8. awesome-selfhosted/awesome-selfhosted

https://github.com/awesome-selfhosted/awesome-selfhosted · ★ 330319 (+2388 this week) · awesome, awesome-list, cloud, free-software, hosting, privacy, self-hosted, selfhosted

**What it does:** A curated directory of free-software network services and web applications — analytics, email, CMS, file sync, and dozens more categories — that you can run on your own servers instead of paying SaaS providers.

**Why now:** The repo gained roughly 2,400 stars this week, reflecting a fresh wave of builders hunting self-hosted alternatives to cloud services.

**Build with it:** Pick a category you currently pay SaaS for, find the listed alternatives, and filter by license and language at awesome-selfhosted.net before committing to a stack.

## 9. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 256995 (+2123 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving AI agent that builds reusable skills from completed tasks, searches past conversations via FTS5 full-text indexing, and runs across Telegram, Discord, and CLI through a single gateway process with swappable model backends.

**Why now:** The repo crossed 256,000 stars with 2,123 added this week — a spike worth tracking before the tooling ecosystem around it locks in conventions.

**Build with it:** Point it at your own OpenAI-compatible endpoint using `hermes model`, trigger a complex task, and inspect the auto-generated skill files to watch the learning loop in action.

## 10. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 86227 (+11599 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a local-first Electron + Python desktop app for voice cloning, video dubbing, transcription, and audiobook generation across 646 languages, powered by k2-fsa/OmniVoice by default — no usage-based billing, everything runs on your machine.

**Why now:** The repo gained nearly 12,000 stars in a single week, driven largely by its positioning as a fully self-hosted ElevenLabs alternative.

**Build with it:** Use the local MCP (Model Context Protocol) endpoint to wire VoiceStudio's TTS and cloning pipeline directly into an AI agent that generates voiced output without touching a third-party API.
