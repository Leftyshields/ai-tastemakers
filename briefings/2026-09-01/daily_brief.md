# AI Tastemakers — Daily Brief — 2026-09-01

_Ranking: delta_7d · 10 repos · generated 2026-09-01T17:19:12.473Z_


## 1. Zackriya-Solutions/meetily

https://github.com/Zackriya-Solutions/meetily · ★ 30202 (+15552 this week) · ai, ai-meeting-assistant, llm, local-ai, mac, meeting-minutes, meeting-notes, offline-first, ollama, parakeet, privacy-focused, privacy-tools, rust, self-hosted, sortformer, speech-to-text, transcription, whisper, whisper-cpp, windows

**What it does:** Meetily is a local-only AI meeting assistant that captures audio, runs real-time transcription via Whisper/Parakeet, performs speaker diarization, and generates summaries through Ollama — no data leaves your machine.

**Why now:** The repo gained 15,552 stars this week, signaling a spike in developer attention likely tied to growing enterprise friction with cloud-based transcription tools and tightening data-residency regulations pushing teams toward self-hosted alternatives.

**Build with it:** Swap the default Whisper model for a domain-specific fine-tune by pointing the Rust backend at a different `ggml` model file, then pipe the structured transcript output into a local Ollama model (e.g., `llama3`) with a custom system prompt to generate action-item lists formatted for your team's project management tool.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 119695 (+9262 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code skill / cursor-rules plugin that injects a YAGNI-first heuristic into AI agents, nudging them to delete or skip code rather than generate it — producing a measured 54% fewer lines of code on real agentic sessions against a FastAPI + React codebase.

**Why now:** The repo is trending at 119k stars with +9,262 this week, coinciding with Claude Code's rapid adoption as a default agentic coding environment where token waste and over-building are live complaints in developer communities.

**Build with it:** Drop the npm package (`@dietrichgebert/ponytail`) into an existing Claude Code or Cursor setup as an agent skill, then point it at any feature ticket — the skill intercepts the agent's planning step and substitutes native browser primitives or one-liners before any scaffolding gets written.

## 3. K-Dense-AI/scientific-agent-skills

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 41387 (+6971 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** A Python library of 163 validated scientific skills — covering genomics, drug discovery, proteomics, and materials science — that plugs into AI agents (Cursor, Claude Code, Codex) via the open Agent Skills standard to give them live access to 100+ scientific databases.

**Why now:** The project jumped nearly 7,000 stars this week, coinciding with the release of K-Dense BYOK — a free, local AI co-scientist that bundles all 163 skills with support for 40+ models and optional Modal cloud scaling, lowering the barrier from "configure an agent" to "run a research workflow today."

**Build with it:** Drop the skills into a Claude Code or Cursor workspace via the Agent Skills config, then wire the PK/PD modelling, regulatory-sequence prediction, or pathogen-variant surveillance skills directly into a data analysis pipeline — the BYOK repo gives a working scaffold with file handling and web search already connected.

## 4. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 55303 (+5082 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that exposes 12 production pipelines and 100+ tools so an AI coding assistant (Cursor, Claude, Copilot) can handle scripting, asset generation via Flux/Stable Diffusion, voiceover via ElevenLabs, and final composition via FFmpeg/Remotion end-to-end.

**Why now:** The repo hit #1 on GitHub Trending this week with 5,082 stars in seven days, surfacing as a reference project in discussions around agentic coding workflows where multi-step media tasks are still largely manual.

**Build with it:** Drop the 700+ agent skill files into your Cursor or Claude project context, wire your ElevenLabs and OpenAI keys through the provider config in `docs/PROVIDERS.md`, and prompt your agent to run a text-to-video pipeline — the scaffolding for script → image → voiceover → edit is already decomposed into discrete agent steps.

## 5. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 59706 (+4864 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that exposes a single OpenAI-compatible endpoint routing across 352 AI providers (150+ with free tiers), with quota-aware auto-fallback and RTK+Caveman prompt compression that cuts token usage by 15–95%.

**Why now:** The repo gained 4,864 stars this week, coinciding with the public release of Claude Code and OpenAI Codex CLI—both of which OmniRoute explicitly supports via its OpenAI-compatible proxy, making free-tier substitution immediately practical for teams hitting paid quota limits.

**Build with it:** Point Claude Code or Cursor's API base URL at your OmniRoute instance, configure provider keys in the dashboard, and the fallback router handles quota exhaustion automatically—no changes to your coding tool's prompts or workflows required.

## 6. TauricResearch/TradingAgents

https://github.com/TauricResearch/TradingAgents · ★ 102172 (+3738 this week) · agent, finance, llm, multiagent, trading

**What it does:** TradingAgents is a Python framework that orchestrates multiple LLM-powered agents — analysts, traders, portfolio managers — to simulate collaborative financial decision-making across stocks and crypto.

**Why now:** v0.4.0 dropped this week with point-in-time data fixes (FRED macro, social sentiment, decision-log memory) that previously allowed look-ahead bias, making backtests materially more trustworthy for the first time.

**Build with it:** Wire in your own broker by configuring the `TRADINGAGENTS_*` env vars and an OpenAI-compatible endpoint, then run the CLI with checkpoint resume to backtest a specific ticker date range without restarting from scratch on each iteration.

## 7. hugohe3/ppt-master

https://github.com/hugohe3/ppt-master · ★ 51123 (+1862 this week) · ai-agent, aippt, office, powerpoint, powerpoint-generation, ppt, pptx, presentation, slide, slides

**What it does:** PPT Master is a Python library that converts documents or topic prompts into natively editable `.pptx` files—complete with shapes, transitions, animations, charts, tables, and audio narration generated from speaker notes—while respecting your own `.pptx` templates.

**Why now:** The project gained 1,862 stars this week and landed a sponsorship from Kimi, whose newly released K3 model (a 3-trillion-parameter open model with a 1M-token context window and native vision) is now a first-class input source, making long-document-to-deck pipelines meaningfully more capable.

**Build with it:** Point the library at a PDF or DOCX via the Kimi Open Platform API key, drop in a branded `.pptx` template as the style scaffold, and wire the output step into a document-processing pipeline to auto-generate stakeholder decks from research reports or meeting transcripts.

## 8. p-e-w/heretic <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/p-e-w/heretic · ★ 29950 (+1846 this week) · abliteration, llm, transformer

**What it does:** Heretic automates abliteration — the technique of removing refusal behavior from transformer-based LLMs — by combining directional ablation with an Optuna-powered TPE optimizer that co-minimizes refusal rate and KL divergence from the original model, requiring no understanding of transformer internals.

**Why now:** The repo gained 1,846 stars this week and hit #1 Repository of the Day on Trendshift, coinciding with growing community output of Heretic-processed models on Hugging Face (including GPT-OSS 20B and Gemma 3 12B variants) that are being actively evaluated and shared.

**Build with it:** Drop Heretic into a model-preparation pipeline as a CLI step — run `heretic --model <hf-model-id>` before serving, then validate with the built-in `--evaluate-model` flag to measure refusal suppression and KL divergence against your baseline before pushing to production.

## 9. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 19814 (+1658 this week) · agent-skill, ai, anthropic, c2pa, chatgpt, claude, gemini, openai, provenance, synthid, watermark, watermark-detection, watermark-tools, watermarking, watermarks

**What it does:** A Python service plus agent skill that strips AI provenance marks from content you own — covering Unicode steganography, statistical token-sampling watermarks (SynthID-Text, Kirchenbauer, Aaronson/EXP), and file-level metadata (C2PA, EXIF, XMP, doc props) across two dozen file formats.

**Why now:** The project gained 1,658 stars this week, coinciding with growing practitioner discussion around C2PA adoption and SynthID-Text's expanded rollout making watermark hygiene a real operational concern for teams handling AI-generated assets.

**Build with it:** Drop the `remove-ai-marks` skill into Claude Code via `python3 install_skill.py --skill remove-ai-marks --target claude-code`, point `WATERMARKS_SERVICE_URL` at the local service, and wire it as a post-generation step in any pipeline that produces or relays AI text or files before publishing.

## 10. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 60875 (+1644 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** An AI agent skill that queries Reddit, X, YouTube, HN, Polymarket, and the open web in parallel, scores results by upvotes, likes, and prediction-market odds, then synthesizes a single grounded brief on any topic or person from the last 30 days.

**Why now:** The skill installs into Claude Code via the plugin marketplace at a moment when walled-garden API fragmentation makes cross-platform signal aggregation genuinely hard to ship yourself — each source requires its own auth, and this bridges them through a single `/last30days` command.

**Build with it:** Drop it into a Claude Code workflow via `/plugin marketplace add mvanhorn/last30days-skill` or `npx skills add mvanhorn/last30days-skill -g` for global access, then pipe its output into a sales-prep, due-diligence, or trend-monitoring agent that triggers on a calendar event or CRM webhook.
