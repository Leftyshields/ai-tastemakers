# AI Tastemakers — Daily Brief — 2026-08-29

_Ranking: delta_7d · 10 repos · generated 2026-08-29T17:06:53.460Z_


## 1. Zackriya-Solutions/meetily

https://github.com/Zackriya-Solutions/meetily · ★ 30051 (+15401 this week) · ai, ai-meeting-assistant, llm, local-ai, mac, meeting-minutes, meeting-notes, offline-first, ollama, parakeet, privacy-focused, privacy-tools, rust, self-hosted, sortformer, speech-to-text, transcription, whisper, whisper-cpp, windows

**What it does:** Meetily is a local-only meeting recorder that runs Whisper/Parakeet transcription and Ollama-based summarization entirely on-device, with no audio leaving your machine.

**Why now:** The repo gained 15,000+ stars this week, surfacing across HN and Reddit as a credible self-hosted alternative at a moment when enterprise scrutiny of cloud meeting tools (Zoom AI, Otter) is rising around data retention policies.

**Build with it:** Point Meetily's Ollama integration at a locally running `llama3` or `mistral` model, then pipe the generated meeting-minutes JSON into your own ticketing or CRM workflow via the Rust backend's output — no cloud API keys required at any step.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 116207 (+8289 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt-engineering skill (Claude Code plugin, cursor rules, agent config) that steers AI coding agents toward YAGNI-first decisions — replacing overbuilt solutions with the minimal thing that works, like `<input type="date">` instead of a flatpickr wrapper.

**Why now:** The project hit 116K stars with 8,289 added this week, coinciding with a published agentic benchmark against `tiangolo/full-stack-fastapi-template` that gives concrete per-task LOC, token, and cost figures — making it one of the first agent skills with a reproducible, fair baseline rather than cherry-picked single-shot numbers.

**Build with it:** Drop the skill into a Claude Code session via the plugin config or add the cursor rules file to an existing repo, then run it against any feature branch to audit the `git diff` for over-built code before merging.

## 3. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 82116 (+2956 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a set of agent skills (prompt-layer rules and style constraints) you drop into Claude Code, Codex, or similar AI coding agents to push generated frontends away from generic Tailwind-gray defaults toward considered design decisions.

**Why now:** The "vibecoding slop" problem is peaking as a discussion topic across X and dev communities this week, with more builders shipping AI-generated UIs directly to production and noticing the aesthetic homogeneity — this repo's 82k stars and 2,956 gained this week reflects that frustration hitting critical mass.

**Build with it:** Clone the repo, copy the relevant skill files into your Claude Code `CLAUDE.md` or Codex system prompt, then run your next component generation task — the skills constrain the agent's output at the instruction level, so no changes to your component library or build pipeline are needed.

## 4. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 57948 (+4957 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that exposes a single OpenAI-compatible endpoint across 350+ AI providers, with quota-aware auto-fallback and RTK+Caveman prompt compression that cuts token usage by 15–95%.

**Why now:** The repo gained nearly 5,000 stars this week, landing it on GitHub Trending during a period when OpenAI Codex, Claude Code, and Cursor are all tightening free-tier limits — making the gateway's 90+ free-provider fallback chain immediately practical rather than theoretical.

**Build with it:** Point Claude Code or Cursor's API base URL at your OmniRoute instance, set the fallback priority order in the routing config, and get uninterrupted completions that cascade through Gemini, DeepSeek, and Kimi when any single provider rate-limits you.

## 5. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 53870 (+4471 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source Python framework that wraps 12 video production pipelines and 100+ tools into a structured knowledge base your AI coding assistant (Cursor, Claude, Copilot) reads to autonomously handle scripting, asset generation via Flux/Stable Diffusion, voiceover via ElevenLabs, and final composition via FFmpeg/Remotion.

**Why now:** It hit #1 on GitHub Trending this week with 4,471 stars in seven days, surfacing at the same moment the "vibe coding meets video production" workflow is being actively stress-tested across agentic AI communities.

**Build with it:** Drop the `AGENT_GUIDE.md` and pipeline configs into your Cursor or Claude project context, then wire your own ElevenLabs and Flux API keys through the provider config in `docs/PROVIDERS.md` to scaffold a fully automated short-form video pipeline from a single text prompt.

## 6. harry0703/MoneyPrinterTurbo

https://github.com/harry0703/MoneyPrinterTurbo · ★ 118417 (+3983 this week) · ai-video-generator, content-creation, ffmpeg, instagram-reels, llm, python, short-video, subtitles, text-to-speech, tiktok, video-automation, video-workflow, workflow-automation, youtube-shorts

**What it does:** MoneyPrinterTurbo is a Python tool that takes a topic or keyword and automatically generates a short video — script, stock footage, subtitles, background music, and final render — via a web UI or REST API backed by configurable LLMs and FFmpeg.

**Why now:** The project gained nearly 4,000 stars this week, coinciding with Kimi K3's public launch as a 3-trillion-parameter open model with native vision and 1M-token context, which the project now supports directly as a script and keyword generation backend.

**Build with it:** Swap in Kimi K3 (or any OpenAI-compatible endpoint) via the `config.toml` LLM settings, then call the `/api/v1/videos` endpoint to pipe topic strings from your own app into a fully automated short-video render pipeline.

## 7. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 238027 (+3801 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python agent framework from Nous Research that creates and refines skills from experience, maintains persistent cross-session memory, and runs across seven terminal backends (local, Docker, SSH, Modal, Daytona, and others) while routing through Telegram, Discord, Slack, or CLI from a single gateway process.

**Why now:** The repo is trending at 238K stars with 3,801 added this week, coinciding with renewed builder interest in persistent, model-agnostic agent frameworks as alternatives to Claude Code and Codex lock-in.

**Build with it:** Point Hermes at your own OpenRouter or self-hosted endpoint via `hermes model`, deploy the agent backend to Modal for near-zero idle cost, then wire scheduled automations (cron-syntax, natural language) to post nightly build reports or test summaries directly to a Slack or Telegram channel.

## 8. K-Dense-AI/scientific-agent-skills

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 37677 (+3563 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** Scientific Agent Skills is a Python library of 163 validated research functions — covering genomics, drug discovery, PK/PD modelling, and 100+ scientific databases — that drops into any Agent Skills-compatible AI coding environment as ready-to-call tools.

**Why now:** The repo gained 3,563 stars this week alongside the rebranding from "Claude Scientific Skills" to "Scientific Agent Skills," signaling a deliberate push toward multi-agent compatibility (Cursor, Codex, Antigravity) that makes it newly relevant beyond Claude-only workflows.

**Build with it:** Add the library to a Claude Code or Cursor project via the Agent Skills config surface, then wire skills like `pkpd_dose_selection` or `cancer_genomics` directly into an automated analysis pipeline that hits live databases (UniProt, 1000 Genomes, pathogen-variant feeds) without writing bespoke API wrappers.

## 9. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 50890 (+3273 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, from-scratch, generative-ai, llm, machine-learning, mcp, nlp, python, reinforcement-learning, rust, swarm-intelligence, transformers, tutorial, typescript

**What it does:** A structured, 511-lesson open curriculum (Python, TypeScript, Rust) that walks engineers from math fundamentals through LLM engineering, agent loops, MCP servers, and computer vision — each lesson producing a shippable artifact.

**Why now:** The repo gained 3,273 stars this week, surfacing alongside the current MCP (Model Context Protocol) adoption wave where teams are actively hunting structured references for building tool-calling agent infrastructure.

**Build with it:** Start at Phase 14 (Agent Engineering) to wire a working agent loop, then use the MCP server lessons as a concrete integration path to expose your own tools to any MCP-compatible host like Claude Desktop or a custom orchestrator.

## 10. nidhinjs/prompt-master <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/nidhinjs/prompt-master · ★ 11975 (+1627 this week) · claude-ai, claude-skills, llm, prompt-engineering

**What it does:** Prompt Master is a Claude skill that intercepts vague AI requests and rewrites them into precise, tool-specific prompts by extracting nine dimensions of intent and routing to the appropriate prompt architecture before a single token reaches the target model.

**Why now:** Anthropic's rollout of the Claude skills system is generating active builder experimentation this week, making a skill that directly improves prompt quality a natural first install for developers setting up their skills directory.

**Build with it:** Fork the skill and extend the routing logic in the pipeline to add a new target tool entry — for example, wire in a Claude Code–specific template that auto-injects your project's file tree and stack config as a grounding anchor before every coding request.
