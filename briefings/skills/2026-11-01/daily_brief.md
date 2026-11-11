# Skill Tastemakers — Daily Brief — 2026-11-01

_Ranking: delta_7d · 10 repos · generated 2026-11-01T19:32:13.644Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 418188 (+35080 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is an MCP server (a standardized bridge between AI agents and local tools) that lets agents inspect native binaries, JavaScript and Electron apps, .NET assemblies, and websites without needing source code.

**Why now:** A Hacker News thread titled "Reverse engineer anything with agents, from app behavior down to native binaries" pulled 101 points and 39 comments this week, showing real builder traction.

**Build with it:** Run `npx rea-agents setup` to wire REA into your agent, then prompt it to inspect a closed-source app feature and return working code you can use in your own project.

## 2. eternity4719/HowToLiveBetter

https://github.com/eternity4719/HowToLiveBetter · ★ 72282 (+3341 this week) · —

**What it does:** HowToLiveBetter is a 767-entry Chinese-language life guide covering health, law, finance, social insurance, and entrepreneurship compliance, with each entry listing cost, benefit, and an evidence grade backed by peer-reviewed papers or official documents.

**Why now:** The repo gained over 3,300 stars this week, making it a good moment to pull the canonical text before community forks start diverging.

**Build with it:** Install the included Claude Code or Codex skill from the `skills/life-decision-guide/` directory to add book-grounded, citation-aware answers to any AI assistant workflow.

## 3. lemomo-ai/lemo-opuscar

https://github.com/lemomo-ai/lemo-opuscar · ★ 10513 (+3298 this week) · agent-skills, ai-agents, ai-short-film, ai-video, animation, canvas, claude, claude-code, claude-code-plugin, claude-code-skill, creative-coding, ffmpeg, filmmaking, motion-graphics, opus-5-5, prompt-library, text-to-speech, threejs, video-production, webgl

**What it does:** Lemo-Opuscar is a library of 66 coded film-style prompts for Claude Code, where each style ships with a demo short film rendered frame-by-frame using canvas, WebGL, and Three.js, with no video model involved.

**Why now:** The repo gained 3,298 stars this week and added 7 new styles on 2026-10-29, including a Memphis diorama and a metro map, alongside a new "make a style your own" workflow released the week prior.

**Build with it:** Drop one of the 66 style prompts into a Claude Code session, supply your own topic or data, and let the agent write the canvas/WebGL render pipeline to produce a coded short film in that style.

## 4. Gathin23/cleanyourtv

https://github.com/Gathin23/cleanyourtv · ★ 48943 (+14765 this week) · adb, adblock, android-tv, android-tv-launcher, apple-tv, bloatware-removal, claude-code, debloat, fire-tv, google-tv, launcher, privacy, smart-tv, sony-bravia, tcl, vibe-coding, xiaomi

**What it does:** CleanYourTV uses ADB over Wi-Fi to strip bloatware and ads from any Android TV or Google TV, then replaces the default home screen with a minimal Apple TV-style launcher, no root or cable required.

**Why now:** The repo hit number 1 trending on GitHub this week with nearly 15,000 new stars, driven by coverage in TechCrunch, Tom's Guide, Android Authority, and 400-plus other outlets across 54 countries.

**Build with it:** Fork the Python scripts and add your own ADB package blocklist to the debloat config, then test the end-to-end flow against a real Android TV device using the existing Wi-Fi pairing workflow.

## 5. pbakaus/impeccable

https://github.com/pbakaus/impeccable · ★ 99164 (+11819 this week) · agent-skills, ai, anti-slop, design, slop

**What it does:** Impeccable adds design-steering commands to coding agents, such as `/impeccable bolder` and `/impeccable critique`, plus a 62-rule deterministic detector that flags AI defaults like Inter-for-everything and purple-to-blue gradients without requiring an API key.

**Why now:** The repo crossed 99,000 stars with nearly 12,000 added this week, tracking directly with widespread frustration over homogeneous AI-generated UI output across Claude Code, Cursor, Codex, and a dozen other agents.

**Build with it:** Run `npx impeccable install` in an existing project, then point `/impeccable audit` at one component to get ranked P0-to-P3 accessibility and performance findings before shipping.

## 6. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 97717 (+11490 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a fully local, open-source Python app covering voice cloning, voice design, video dubbing, dictation, transcription, and audiobook creation across 646 languages, with no cloud dependency.

**Why now:** The repo gained over 11,000 stars this week, making it a practical moment to benchmark it against paid alternatives like ElevenLabs before the attention spike passes.

**Build with it:** Drop VoiceStudio into a local Python workflow to add CUDA or MLX-accelerated voice cloning without an API key or per-character billing.

## 7. Nutlope/hallmark

https://github.com/Nutlope/hallmark · ★ 44684 (+11388 this week) · —

**What it does:** Hallmark is a design ruleset for Claude Code, Cursor, and Codex that picks from fifty material-based themes, structures pages around their primary action, and runs lint checks against the visual patterns most associated with AI-generated output.

**Why now:** The repo gained over 11,000 stars this week, reflecting a sharp builder reaction to "AI slop" aesthetics becoming a recognized problem in shipped products.

**Build with it:** Drop the Hallmark skill into an existing Claude Code session and run `/hallmark redesign <path>` on any page to get a theme-matched rebuild that keeps your content and wiring intact.

## 8. jakubkrehel/skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/jakubkrehel/skills · ★ 9986 (+1694 this week) · —

**What it does:** A set of agent skills for Claude Code that audit and fix UI concerns across accessibility, typography, color, layout, and copy via commands like `better-interface` and `break`.

**Why now:** The repo gained nearly 1,700 stars this week, tracking a broader spike in interest around agentic design-engineering workflows.

**Build with it:** Install with `npx skills add jakubkrehel/skills`, then invoke `interface-review` on an open pull request to catch accessibility and layout regressions before merge.

## 9. Egonex-AI/Understand-Anything

https://github.com/Egonex-AI/Understand-Anything · ★ 89601 (+1388 this week) · antigravity-skills, business-knowledge, claude-code, claude-skills, codebase-analysis, codex, codex-skills, developer-tools-ai-agent, gemini-cli-skills, karpathy-llm-wiki, knowledge-base, knowledge-graph, memory, opencode-skills, pi-agent, understandcode, vibe-coding

**What it does:** Understand Anything runs a multi-agent pipeline over any codebase, knowledge base, or docs to build an interactive knowledge graph where every file, function, class, and dependency becomes a searchable, clickable node with plain-English summaries.

**Why now:** The repo gained over 1,300 stars this week and sits on Trendshift's trending list, with developers actively evaluating it as a Claude Code plugin for onboarding to large codebases.

**Build with it:** Install it as a Claude Code plugin and point it at a legacy TypeScript repo to get an interactive dashboard that maps cross-file dependencies without manual tracing.

## 10. ethanplusai/harvey <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ethanplusai/harvey · ★ 3881 (+1363 this week) · ai-agent, autonomous-agent, claude, cold-email, prospecting, python, sales-automation

**What it does:** Harvey is a Python autonomous sales agent that finds prospects, writes personalized cold emails, sends campaigns, and handles replies toward booked meetings, running on a Claude Pro/Max or ChatGPT subscription with no per-token API billing.

**Why now:** The repo gained 1,363 stars this week, a spike likely tied to the broader wave of agentic Claude Code workflows gaining traction after Anthropic's recent tooling updates.

**Build with it:** Point Harvey at a niche (such as HVAC shops or dental practices) by confirming a signal and cohort in the dashboard at `localhost:5555`, then run a live cold-email sequence against real prospects to test whether the zero-API-cost loop holds at your target volume.
