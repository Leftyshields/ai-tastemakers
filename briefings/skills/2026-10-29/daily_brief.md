# Skill Tastemakers — Daily Brief — 2026-10-29

_Ranking: delta_7d · 10 repos · generated 2026-10-29T20:07:21.105Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 407158 (+42574 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a Model Context Protocol (MCP) server, meaning it lets AI agents call external tools, and this one points those tools at native binaries, JavaScript and Electron apps, .NET assemblies, and websites, running all analysis locally without source code.

**Why now:** A Hacker News thread this week pulled 101 points and 39 comments, showing real builder interest in using agents for reverse engineering tasks.

**Build with it:** Run `npx rea-agents setup` to connect REA to your MCP-compatible agent, then prompt it to inspect a closed-source app feature and return decompiled evidence you can port to your own project.

## 2. Gathin23/cleanyourtv

https://github.com/Gathin23/cleanyourtv · ★ 45263 (+22089 this week) · adb, adblock, android-tv, android-tv-launcher, apple-tv, bloatware-removal, claude-code, debloat, fire-tv, google-tv, launcher, privacy, smart-tv, sony-bravia, tcl, vibe-coding, xiaomi

**What it does:** CleanYourTV uses ADB over Wi-Fi to disable bloatware and ads on Android TV and Google TV devices, then installs a minimal Apple TV-style launcher without rooting or permanently removing anything.

**Why now:** The repo hit number one on GitHub Trending for the week of Oct 19-25, gained over 22,000 stars in a single week, and landed coverage in TechCrunch, Tom's Guide, and 314 other articles across 44 countries.

**Build with it:** Fork the Python scripts and extend the per-brand debloat lists to support an unlisted TV model, then submit a pull request against the 97-brand device matrix the project already maintains.

## 3. JetBrains/thinkrail <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/JetBrains/thinkrail · ★ 5915 (+2111 this week) · agent, agent-skills, agentic-ai, agentic-workflow, ai-coding, ai-tools, pi-agent, pi-agent-extension, spec-driven, spec-driven-coding, spec-driven-development, vibe-coding, vibecoding

**What it does:** ThinkRail is a JetBrains incubator IDE built around a coding agent called `pi`, giving it isolated git-worktree workspaces (separate sandboxed copies of your repo), persistent project knowledge through living specs, and reusable skills so the agent accumulates context across sessions.

**Why now:** A Hacker News thread this week hit 242 points and 174 comments while the project crossed 5,900 stars, putting it in front of a large builder audience at a moment when agent-native tooling is actively being evaluated.

**Build with it:** Open an existing git repo as a ThinkRail project, cut a worktree workspace from it, and let `pi` run a spec-driven task in isolation before merging only the branch you want.

## 4. HKUDS/DeepTutor <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/HKUDS/DeepTutor · ★ 49732 (+2005 this week) · ai-agents, ai-tutor, clawbot, cli-tool, deepresearch, interactive-learning, learning, multi-agent-systems, rag

**What it does:** DeepTutor is a Python and Next.js app that combines multi-agent RAG pipelines (retrieval-augmented generation, where the model grounds answers in your documents) with lifelong personalization to deliver adaptive tutoring sessions tied to your own PDF corpus.

**Why now:** The repo hit GitHub Trending this week with over 2,000 new stars, coinciding with a tagged release and active collaboration outreach at deeptutor.info.

**Build with it:** Point DeepTutor's RAG pipeline at your own PDF corpus to get an interactive, citation-grounded Q and A tutor without building retrieval logic from scratch.

## 5. milind-soni/OpenMausBot <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/milind-soni/OpenMausBot · ★ 7348 (+1922 this week) · ai-agents, claude-code, codex, computer-use, docker, electron, expo, grok, grok-bot, grok-bot-alternative, self-hosted, typescript

**What it does:** OpenMausBot is an Electron desktop app for Mac, Windows, and Ubuntu that puts Claude and Codex agents in a chat sidebar, each with its own personality, model config, and sandboxed cloud computer, so you interact with them like contacts and approve their actions step by step.

**Why now:** The repo gained nearly 2,000 stars this week, tracking closely with builder interest in chat-native agent interfaces alongside competing releases like Meta Muse, OpenAI dots, and Cue by Manus.

**Build with it:** Download the signed .dmg or .exe release, wire in your own Claude or Codex API key, and test a bring-your-own-agent workflow where a bot handles a scoped task while you approve each step.

## 6. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 94123 (+12630 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a fully local, open-source alternative to ElevenLabs that handles voice cloning, video dubbing, transcription, and audiobook creation across 646 languages, running on laptops, phones, and servers with no external API calls.

**Why now:** The repo gained 12,630 stars this week, a spike that makes it worth evaluating as a dependency now before the crowd drives API-breaking forks.

**Build with it:** Point VoiceStudio's dubbing pipeline at a local video file to produce a cloned-voice translation track without sending audio to any external service.

## 7. kajisho5/ffmpeg-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/kajisho5/ffmpeg-skill · ★ 3890 (+1844 this week) · agent-skills, ai-agents, audio-processing, captions, claude-code, codex, coding-agent, cursor, ffmpeg, loudness-normalization, mcp, mcp-server, model-context-protocol, python, subtitles, transcoding, video, video-editing, video-processing, whisper

**What it does:** ffmpeg-skill gives coding agents such as Claude Code, Cursor, and Codex a local video editor backed by 42 FFmpeg tools covering cuts, captions, loudness normalization, reframing, and platform delivery checks, with no cloud upload required.

**Why now:** The repo gained roughly 1,844 stars this week, coinciding with rising adoption of agent skill patterns and MCP server tooling across Claude Code and Cursor workflows.

**Build with it:** Point any MCP client at the server with `npx ffmpeg-skill` and call tools like `silence.py` or `caption.py` directly from your agent loop to automate footage edits without leaving your coding environment.

## 8. Nutlope/hallmark

https://github.com/Nutlope/hallmark · ★ 41938 (+11303 this week) · —

**What it does:** Hallmark is a design skill for Claude Code, Cursor, and Codex that selects from 50 material-based themes, structures pages around their primary action (booking, selling, subscribing), and lints the result against specific AI-generated UI tells like eyebrow headings, tracked-capital labels, and hero sections that miss the screen.

**Why now:** The repo gained over 11,000 stars this week, surfacing it as a top trending project at a moment when AI-generated UI sameness is a visible pain point for builders shipping with code agents.

**Build with it:** Drop the Hallmark skill into an existing Claude Code session and run `/hallmark redesign <path>` on a landing page to get a theme-matched rebuild that preserves your content and wiring.

## 9. pbakaus/impeccable

https://github.com/pbakaus/impeccable · ★ 95051 (+10189 this week) · agent-skills, ai, anti-slop, design, slop

**What it does:** Impeccable is a set of slash-command skills for coding agents including Claude Code, Cursor, and Codex, adding named design moves like `bolder`, `quieter`, and `polish`, plus a 62-rule static detector that flags defaults like Inter-for-everything and purple-to-blue gradients without requiring an API key.

**Why now:** The repo crossed 95k stars with over 10k added this week, a spike that tracks builder frustration with homogeneous AI-generated UI becoming a recognized, named problem.

**Build with it:** Run `npx impeccable install` in an existing project, then point `/impeccable audit` at one component to get ranked P0-to-P3 accessibility and performance findings before your next deploy.

## 10. K-Dense-AI/scientific-agent-skills

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 55262 (+1405 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** Scientific Agent Skills is a Python library of 177 validated, procedural-knowledge skills for AI agents, covering biology, chemistry, medicine, physics, and drug discovery, with access to 100-plus scientific databases.

**Why now:** The repo gained 1,405 stars this week and recently rebranded from Claude-specific to a broader Agent Skills standard, adding compatibility with Cursor, Codex, and Google Antigravity alongside a free local co-scientist tool called K-Dense BYOK.

**Build with it:** Drop the skills into a Cursor or Claude Code project as an Agent Skills config to give your agent direct, structured access to genomics, proteomics, or cheminformatics databases without writing custom API wrappers.
