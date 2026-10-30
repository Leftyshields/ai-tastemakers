# Skill Tastemakers — Daily Brief — 2026-10-30

_Ranking: delta_7d · 10 repos · generated 2026-10-30T19:59:59.751Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 411781 (+39844 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a Model Context Protocol (MCP) server, meaning it plugs AI agents into external tools, here aimed at reverse engineering: inspecting native binaries, JavaScript and Electron apps, .NET assemblies, and websites without source code, all running locally with evidence-backed conclusions.

**Why now:** A Hacker News thread this week pulled 101 points and 39 comments on the core idea of letting agents drive binary analysis autonomously.

**Build with it:** Run `npx rea-agents setup` to connect REA to your agent as an MCP tool, then prompt it to inspect a closed-source app feature and return decompiled evidence you can use to reimplement it.

## 2. op7418/guizang-ppt-skill

https://github.com/op7418/guizang-ppt-skill · ★ 28974 (+3301 this week) · ai-agent, claude-code, codex, html-deck, image-generation, ppt, presentation, skill, skills, swiss-design, web-ppt

_[brief unavailable]_

## 3. Gathin23/cleanyourtv

https://github.com/Gathin23/cleanyourtv · ★ 46547 (+19287 this week) · adb, adblock, android-tv, android-tv-launcher, apple-tv, bloatware-removal, claude-code, debloat, fire-tv, google-tv, launcher, privacy, smart-tv, sony-bravia, tcl, vibe-coding, xiaomi

**What it does:** CleanYourTV uses ADB over Wi-Fi to strip bloatware and ads from Android TV and Google TV devices, then swaps the stock home screen for a clean, Apple TV-style launcher across 380 supported models.

**Why now:** The repo hit number one on GitHub trending this week, collecting over 19,000 stars in seven days.

**Build with it:** Fork the repo and extend the per-brand debloat config to add an unlisted Android TV model, using the existing Python scripts and ADB command surface as your test harness.

## 4. op7418/guizang-social-card-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/op7418/guizang-social-card-skill · ★ 7862 (+2144 this week) · agent-skill, ai-agent, anthropic, claude-code, claude-skill, codex, editorial-design, html-template, image-generation, playwright, rednote, social-cards, swiss-design, wechat, xiaohongshu

**What it does:** An agent skill for Claude Code and Codex that turns articles, screenshots, or video into Xiaohongshu carousel sets, WeChat 21:9 and 1:1 cover pairs, and Live Photo cards, drawing from 28 layout skeletons across Editorial and Swiss visual systems, then rendering to PNG via single-file HTML and Playwright.

**Why now:** The repo crossed 2,000 stars this week, reflecting demand for agent-native design tooling as Claude Code adoption accelerates.

**Build with it:** Install with `npx skills add https://github.com/op7418/guizang-social-card-skill`, wire it into an existing Claude Code workflow, and prompt the agent with a style and slide count to generate a branded Xiaohongshu carousel from any article.

## 5. career-ops-hq/career-ops

https://github.com/career-ops-hq/career-ops · ★ 78865 (+2075 this week) · agent-skills, ai-agent, ai-job-search, ats, career, career-ops, claude-code, claude-code-plugin, claude-plugin, cover-letter, cv, good-first-issue, interview-preparation, interview-questions, job-application, job-hunting, job-search, latex, open-source, resume

**What it does:** career-ops is an open-source job search agent that scans job boards, scores listings 1-5 against your CV, writes ATS-friendly resumes and cover letters, and tracks applications, all running locally via a Claude Code plugin or AI CLIs like Codex and OpenCode.

**Why now:** The repo is picking up 2,075 stars this week and already ships a Claude Code plugin, putting it in the path of developers already running agentic Claude Code workflows.

**Build with it:** Install the Claude Code plugin, point it at your resume, and extend the scoring rubric in config to weight domain-specific keywords for a target role or industry.

## 6. anthropics/skills

https://github.com/anthropics/skills · ★ 185185 (+1939 this week) · agent-skills

**What it does:** anthropics/skills is a public collection of self-contained Claude skill folders, each with a `SKILL.md` file that Claude loads dynamically to handle specialized tasks like document creation, web app testing, and MCP server generation.

**Why now:** The repo jumped nearly 2,000 stars this week, coinciding with the Agent Skills specification going public and visible traction around Claude's document capabilities.

**Build with it:** Run `/plugin marketplace add anthropics/skills` in Claude Code, install `example-skills` to test the pattern, then write a custom `SKILL.md` for your own workflow.

## 7. Vincentwei1021/video-shotcraft

https://github.com/Vincentwei1021/video-shotcraft · ★ 15119 (+1920 this week) · agent-skills, ai-agents, ai-video, claude-code, claude-code-skills, claude-skills, codex, motion-design, motion-graphics, product-video, promo-video, remotion, video-generation, video-production

**What it does:** video-shotcraft is a Claude Code and Codex agent skill that captures product pages, applies motion recipes from a library of 124 shot cards, and renders a finished MP4 using Remotion with beat sync and sound design.

**Why now:** The shot library received a full refresh in 2026-10, consolidating 216 demos into 150 curated shots with new Gallery previews, making this a reasonable moment to evaluate the current card set.

**Build with it:** Point the agent at a product URL, use the shot recipe cards to constrain which motion styles it storyboards, and export the result directly to a JianYing draft for per-clip editing.

## 8. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 95526 (+12740 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a fully local, open-source alternative to ElevenLabs that handles voice cloning, video dubbing, transcription, and audiobook creation across 646 languages via a Python desktop app.

**Why now:** The repo gained over 12,000 stars this week, a spike worth tracking before the tooling ecosystem around it solidifies.

**Build with it:** Run the local voice-cloning workflow on your own audio samples to replace an ElevenLabs API dependency with a self-hosted pipeline.

## 9. Nutlope/hallmark

https://github.com/Nutlope/hallmark · ★ 42832 (+11612 this week) · —

**What it does:** Hallmark is a design ruleset for Claude Code, Cursor, and Codex that picks from fifty material-based themes, structures pages around a single primary action, and lints output for specific AI-generated visual patterns like eyebrow headings, tracked-capital labels, and hero sections that do not fit the viewport.

**Why now:** The repo gained over 11,000 stars this week, reflecting builder frustration with AI-generated UIs becoming visually indistinguishable across projects.

**Build with it:** Drop Hallmark into an existing Claude Code project and run `/hallmark redesign <path>` on a landing page to get a theme-matched rebuild that preserves your content and wiring.

## 10. pbakaus/impeccable

https://github.com/pbakaus/impeccable · ★ 96857 (+11460 this week) · agent-skills, ai, anti-slop, design, slop

**What it does:** Impeccable is a CLI tool that installs slash-commands into AI coding agents (Claude Code, Cursor, Codex, and others) to steer UI design with targeted commands like `/impeccable bolder` or `/impeccable critique`, and runs 62 deterministic rules locally to catch generic AI design patterns before they ship.

**Why now:** The repo gained over 11,000 stars this week, likely driven by builder fatigue with vibe-coded UIs that all converge on the same Inter-font, purple-gradient defaults.

**Build with it:** Run `npx impeccable install` from your project root, then fire `/impeccable audit` inside Claude Code or Cursor to get a ranked P0-to-P3 accessibility and design report on an existing component.
