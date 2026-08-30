# AI Tastemakers — Daily Brief — 2026-08-30

_Ranking: delta_7d · 10 repos · generated 2026-08-30T17:28:08.633Z_


## 1. Zackriya-Solutions/meetily

https://github.com/Zackriya-Solutions/meetily · ★ 30098 (+15448 this week) · ai, ai-meeting-assistant, llm, local-ai, mac, meeting-minutes, meeting-notes, offline-first, ollama, parakeet, privacy-focused, privacy-tools, rust, self-hosted, sortformer, speech-to-text, transcription, whisper, whisper-cpp, windows

**What it does:** Meetily is a local-first meeting assistant that captures audio, runs real-time transcription via Whisper or Parakeet, performs speaker diarization with SortFormer, and generates summaries through a locally hosted Ollama model — no data leaves the machine.

**Why now:** The project gained 15,448 stars this week, signaling a surge in developer interest likely tied to growing enterprise anxiety around cloud-based meeting tools ingesting sensitive conversations, making this a timely reference architecture for that use case.

**Build with it:** Fork the Rust audio capture layer and swap in your own Ollama model config (`ollama_model` setting) to build a domain-specific summarizer — for example, a legal or clinical meeting noter that outputs structured SOAP or action-item formats without touching external APIs.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 116997 (+8421 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code plugin (and cursor-rules config) that instructs AI agents to apply YAGNI constraints — preferring `<input type="date">` over flatpickr, a stdlib function over a new dependency, nothing over something — measurably cutting generated LOC by ~54% on real FastAPI/React codebases.

**Why now:** Claude Code's agent skill/plugin surface became a practical distribution target this month, and the project's topics (`claude-code-plugin`, `agent-skills`) land it directly in that new ecosystem as teams are actively evaluating what to put in their `.claude` config.

**Build with it:** Drop the npm package (`@dietrichgebert/ponytail`) into your Claude Code skills config or paste the cursor-rules file into `.cursorrules`, then run your existing feature tickets against a branch and diff the output — the benchmark reproduction scripts in `benchmarks/` give you a ready-made harness to measure the delta on your own codebase.

## 3. TauricResearch/TradingAgents

https://github.com/TauricResearch/TradingAgents · ★ 101848 (+3414 this week) · agent, finance, llm, multiagent, trading

**What it does:** TradingAgents is a Python framework that orchestrates multiple LLM-powered agents (analysts, traders, portfolio managers) to simulate a trading firm's research and decision pipeline across stocks and crypto.

**Why now:** v0.3.1 dropped this week with concrete correctness fixes—Alpha Vantage look-ahead filtering and graph-shape-aware checkpoint resume—making backtest results meaningfully less leaky and more reproducible.

**Build with it:** Wire in your own data vendor via the FRED or Polymarket integrations, configure a DeepSeek or Groq backend through `TRADINGAGENTS_*` env vars, and slot the structured-output Trader agent into an existing paper-trading loop to get auditable per-decision logs.

## 4. virgiliojr94/book-to-skill

https://github.com/virgiliojr94/book-to-skill · ★ 27256 (+2890 this week) · agent-skills, ai-agents, book-to-skill, context-engineering, document-processing, edtech, knowledge-base, knowledge-management, llm, pdf-to-markdown, rag, self-study, study-tools

**What it does:** book-to-skill converts PDF, EPUB, DOCX, and other document formats into structured agent skills — per-chapter files plus distilled frameworks and decision rules — that Claude Code, GitHub Copilot CLI, or Amp can load on demand via slash commands.

**Why now:** The repo hit trending this week with 2,890 stars added, coinciding with a surge of interest in context engineering as a discipline distinct from prompt engineering — making structured, token-efficient knowledge retrieval (24×–51× fewer tokens than full-book context injection) a practical concern rather than a theoretical one.

**Build with it:** Run `book-to-skill ./your-spec.pdf` to generate a skill folder, drop it into your `.claude/skills/` or equivalent agent config directory, then wire the slug as a slash command so any teammate can query chapter-level content mid-coding session without leaving the terminal.

## 5. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 58483 (+4916 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an OpenAI-compatible gateway that routes requests across 350+ AI providers (90+ free tiers) through a single endpoint, with quota-aware auto-fallback and RTK+Caveman prompt compression that cuts token usage by 15–95%.

**Why now:** The repo gained nearly 5,000 stars this week, surfacing on GitHub Trending at a moment when Codex CLI and Claude Code are both in active open-beta — two tools OmniRoute explicitly supports via drop-in endpoint substitution.

**Build with it:** Point Claude Code or Codex at OmniRoute's OpenAI-compatible base URL, configure provider priority in the routing strategy, and get automatic fallback across free Gemini, DeepSeek, and Kimi quotas without changing any other tooling or application code.

## 6. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 54539 (+4884 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that exposes 12 production pipelines and 100+ tools so an AI coding assistant (Cursor, Claude, Copilot) can handle scripting, asset generation, voiceover, and final composition from a plain-language prompt.

**Why now:** The repo hit #1 on GitHub Trending this week with nearly 5,000 stars added, surfacing alongside growing builder interest in end-to-end agentic media pipelines that chain models like Flux, Stable Diffusion, and ElevenLabs without custom glue code.

**Build with it:** Drop the included `AGENT_GUIDE.md` and the 700+ skill/knowledge files into your Cursor or Claude project context, then call a named pipeline (e.g., text-to-video or image-generation) directly from your editor's agent chat to produce composited video output via Remotion and FFmpeg.

## 7. K-Dense-AI/scientific-agent-skills

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 38838 (+4663 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** A Python library of 163 validated scientific functions spanning genomics, drug discovery, proteomics, and materials science, exposing 100+ database connections as drop-in skills for AI agents via the open Agent Skills standard.

**Why now:** The project rebranded this week from "Claude Scientific Skills" to "Scientific Agent Skills" to support Cursor, Codex, and Google Antigravity alongside Claude Code, broadening the compatible agent surface significantly.

**Build with it:** Drop the skills into a Claude Code or Cursor workspace via the Agent Skills config, then wire PK/PD modelling and live pathogen-variant surveillance directly into an automated drug-candidate screening pipeline.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 238424 (+3752 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python AI agent from Nous Research that creates and refines skills from experience, maintains cross-session memory, and runs tool-calling workloads across seven terminal backends including Modal and Daytona serverless environments.

**Why now:** The project gained 3,752 stars this week, signaling a surge of builder interest likely tied to its positioning against Claude Code and Codex as a model-agnostic, self-hosted alternative with an open skill standard via agentskills.io.

**Build with it:** Drop in your own OpenRouter or Nous Portal endpoint via `hermes model`, then use the built-in cron scheduler to push nightly batch trajectory outputs to a training pipeline — compressing multi-session tool-call histories into fine-tuning data for your next model iteration.

## 9. harry0703/MoneyPrinterTurbo

https://github.com/harry0703/MoneyPrinterTurbo · ★ 118778 (+3725 this week) · ai-video-generator, content-creation, ffmpeg, instagram-reels, llm, python, short-video, subtitles, text-to-speech, tiktok, video-automation, video-workflow, workflow-automation, youtube-shorts

**What it does:** MoneyPrinterTurbo automates short-video production end-to-end — taking a topic or keyword and producing a scripted, subtitled, music-backed HD video by chaining an LLM, stock footage APIs, TTS, and FFmpeg.

**Why now:** The project gained 3,725 stars this week and added a sponsored integration with Kimi K3, Moonshot AI's newly released open-source 3T-parameter model with 1M-token context, making it a live testbed for that model's video-scripting and footage-keyword extraction capabilities.

**Build with it:** Drop your own LLM endpoint into the config (the tool exposes an OpenAI-compatible API surface), swap in Kimi K3 or any compatible model, and wire the `/generate` API into a content scheduling pipeline to push finished videos directly to TikTok or YouTube Shorts.

## 10. every-app/open-seo

https://github.com/every-app/open-seo · ★ 15007 (+1854 this week) · backlink-analysis, google-search-console-mcp, keyword-research, mcp, seo, seo-tools, site-audit

**What it does:** OpenSEO is a self-hostable TypeScript SEO suite covering keyword research, rank tracking, backlink analysis, and site audits, backed by the DataForSEO API with a pay-per-use cost model instead of a monthly subscription.

**Why now:** The project gained 1,854 stars this week and ships an MCP server, landing it squarely in the current wave of tools being wired into Claude Code and similar agentic workflows as developers look for data sources agents can query directly.

**Build with it:** Drop in the MCP config from `openseo.so/docs/mcp`, then write a custom Agent Skill using `npx skills add every-app/open-seo` to automate a repeatable workflow — say, pulling competitor backlink gaps and surfacing them as structured output inside a Claude Code session.
