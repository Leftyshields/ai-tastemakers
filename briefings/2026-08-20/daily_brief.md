# AI Tastemakers — Daily Brief — 2026-08-20

_Ranking: delta_7d · 10 repos · generated 2026-08-20T13:57:51.968Z_


## 1. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 15772 (+11473 this week) · agent-skill, ai, c2pa, claude, provenance, synthid, watermark

**What it does:** A Python service plus agent skill that strips AI-provenance signals from text and files — covering invisible Unicode, statistical watermarks (Kirchenbauer green-list, Aaronson keyed-Gumbel), and C2PA/EXIF/XMP metadata across PNG, JPEG, PDF, DOCX, MP4, and a dozen other formats.

**Why now:** The project's 11,000+ stars this week tracks directly with growing awareness of SynthID-Text's expansion and the C2PA coalition's push into browser and OS-level provenance enforcement, making removal tooling suddenly practical to audit.

**Build with it:** Drop the skill into `.grok/skills/remove-ai-marks`, start the stdlib HTTP service with `make serve`, and wire it as a pre-publish step in any content pipeline — Cursor users can install the narrower `clean-user-facing-text` skill and apply the bundled `.mdc` rule per-project for scoped, consistent scrubbing on docs and web copy.

## 2. harry0703/MoneyPrinterTurbo

https://github.com/harry0703/MoneyPrinterTurbo · ★ 112451 (+9693 this week) · ai-video-generator, content-creation, ffmpeg, instagram-reels, llm, python, short-video, subtitles, text-to-speech, tiktok, video-automation, video-workflow, workflow-automation, youtube-shorts

**What it does:** MoneyPrinterTurbo takes a topic or keyword and runs an automated pipeline—LLM script generation, stock footage matching, subtitle rendering, TTS audio, and FFmpeg composition—to produce a finished short-form video without manual editing steps.

**Why now:** The project gained 9,693 stars this week and recently added Kimi K3 (Moonshot AI's newly released 3T-parameter open-source model with 1M-token context) as a supported LLM backend, making this a live integration test for one of the most-discussed new model releases.

**Build with it:** Wire your own LLM API key (OpenAI-compatible endpoint) into `config/config.toml`, swap the TTS provider to Azure or edge-tts, then call the `/api/v1/videos` endpoint from a cron job to auto-publish niche-topic YouTube Shorts on a schedule.

## 3. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 51664 (+5336 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that exposes a single OpenAI-compatible endpoint across 340+ AI providers, with quota-aware fallback routing and RTK+Caveman prompt compression that the project claims cuts token usage by 15–95%.

**Why now:** The repo gained 5,336 stars this week, placing it on GitHub Trending, which coincides with growing developer frustration around Claude Code and Codex quota exhaustion — exactly the use case OmniRoute's auto-fallback chain is designed to absorb.

**Build with it:** Point Claude Code or Cursor's API base URL at your OmniRoute instance, configure a fallback chain across free-tier models (Gemini 2.5 Flash, GPT-4o mini, Kimi), and let the quota-aware router switch providers transparently when rate limits are hit — no client-side changes needed after the initial endpoint swap.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 106474 (+5158 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code / cursor-rules plugin that injects a "laziest senior dev" heuristic into AI agents, pushing them toward minimal diffs — `<input type="date">` instead of a flatpickr installation — averaging 54% fewer lines of code across real agentic sessions on a FastAPI + React codebase.

**Why now:** The repo is trending at +5,158 stars this week, coinciding with broader developer conversation around AI agents over-building and inflating token costs — a concrete pain point as Haiku 4.5 usage scales in production Claude Code workflows.

**Build with it:** Drop the npm package `@dietrichgebert/ponytail` into your Claude Code agent as an agent-skill, or copy the cursor-rules config into `.cursor/rules`, and it will constrain any of the 20 supported agents to prefer deletion and native APIs over new dependencies during feature implementation.

## 5. koala73/worldmonitor

https://github.com/koala73/worldmonitor · ★ 83392 (+2276 this week) · agent, ai, dashboard, geopolitics, mcp, mcp-server, monitoring, news, opensource, osint, palantir, situation

**What it does:** World Monitor is an open-source TypeScript dashboard that aggregates real-time geopolitical news, infrastructure status, and OSINT signals into a single situational awareness interface, with MCP server support for AI agent integration.

**Why now:** The project gained 2,276 stars this week, suggesting a spike in interest likely tied to active geopolitical news cycles driving demand for consolidated open-source intelligence tooling as an alternative to proprietary platforms like Palantir.

**Build with it:** Wire the `wm-mcp` MCP server (available on Smithery) into a Claude or Cursor agent workflow to give your AI assistant live geopolitical context — then fork one of the domain variants (finance, energy, commodity) as a starting point for a narrow vertical intelligence feed.

## 6. holaboss-ai/holaOS

https://github.com/holaboss-ai/holaOS · ★ 10380 (+4418 this week) · agent, agent-harness, agent-os, agentic, ai, ai-agent, ai-agents, artificial-intelligence, claude-code, codex, electron, holaboss, holaos, llm, mcp, memory, model-context-protocol, runtime, typescript, workspace

**What it does:** holaOS is a local-first Electron desktop workspace that runs Claude Code, Codex, or its own built-in agent side-by-side, sharing a single persistent memory store, 100+ tool integrations, and MCP connections across sessions.

**Why now:** The repo gained 4,418 stars this week, coinciding with the broader wave of Claude Code and Codex CLI adoption — builders are actively looking for a harness that lets them run both without maintaining separate contexts and key configurations.

**Build with it:** Wire in your existing MCP server via the MCP config surface, point Claude Code or Codex at holaOS's shared memory, and get persistent project context across agent runs without re-prompting — useful for multi-day coding workflows where session state normally resets.

## 7. Tiger3807861189/J-Space-Cognition-Suite-V3.6 <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Tiger3807861189/J-Space-Cognition-Suite-V3.6 · ★ 2985 (+2076 this week) · agent-skills, ai, ai-agent, ai-agents, claude-code, codex, cognitive-enhancement, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, global-workspace, hermes-agent, inference-time-control, j-space, opencode, react, tailwindcss

**What it does:** J-Space Cognition Suite is an inference-time control system that organizes an AI agent's working memory into a managed workspace, routing tasks through nine selectively loaded modules covering deep reasoning, tool use, verification, and recovery — without touching model weights.

**Why now:** The repo gained over 2,000 stars this week, coinciding with growing developer interest in structured agent orchestration frameworks as alternatives to prompt-stuffing, particularly among teams using Claude Code, OpenCode, and Codex in production workflows.

**Build with it:** Drop the `j-space/` directory into your host's Skills directory, invoke it via `/j-space` or a direct request, and use the `loop` pass with the optional stdlib controller to maintain durable task state across multi-file, multi-turn agent jobs.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 233377 (+3976 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python AI agent from Nous Research that builds persistent skills from experience, models users across sessions, and runs tasks on any backend (SSH, Docker, Modal, Vercel Sandbox) while staying reachable via Telegram, Discord, or CLI.

**Why now:** The repo is trending hard this week (+3,976 stars), landing alongside rising builder interest in persistent, cross-session agents as alternatives to stateless wrappers around OpenAI and Anthropic APIs.

**Build with it:** Point it at your own model endpoint via `hermes model` and wire the cron scheduler to a Modal serverless backend — you get unattended nightly jobs (backups, audits, reports) that cost near-zero when idle, with Telegram delivery and FTS5-indexed session recall out of the box.

## 9. lightningpixel/modly <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/lightningpixel/modly · ★ 6992 (+1956 this week) · 3d, ai-local, ai-tools, desktop-app, modly, open-source, self-hosted

**What it does:** Modly is a desktop app (Windows, Linux, Apple Silicon macOS) that converts images or text prompts into 3D meshes using local AI models like Hunyuan3D 2 and TripoSG, with no cloud dependency.

**Why now:** The project gained nearly 2,000 stars this week, signaling a surge of interest likely tied to growing demand for offline, GPU-local 3D generation workflows as alternatives to paid API-gated tools.

**Build with it:** Use the Modly CLI to drive mesh generation from scripts or agents, wire a custom workflow via the node graph (Image → Generate Mesh → Add to Scene), and install the `modly-triposg-extension` or a GGUF-quantized Trellis2 variant to tune the quality-speed tradeoff for your hardware.

## 10. semantica-agi/semantica <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/semantica-agi/semantica · ★ 9739 (+1952 this week) · agent-memory, ai, ai-governance, ai-infrastructure, artificial-intelligence, context-engineering, context-graphs, data-engineering, decision-intelligence, developer-tools, explainable-ai, generative-ai, graph-rag, knowledge-graph, llm, ontology, provenance, python, reasoning, semantic-search

**What it does:** Semantica is a Python library that ingests enterprise data, extracts entities and relationships into a Context Graph and knowledge graph, and runs graph analytics and causal reasoning over them with full decision provenance tracked end-to-end.

**Why now:** The project gained nearly 2,000 stars this week, surfacing alongside active developer discussion around context engineering as a discipline — the same moment teams are realizing that stuffing raw documents into LLM prompts is not a sustainable retrieval strategy.

**Build with it:** Wire Semantica's Graph-RAG pipeline into an existing LangChain or LlamaIndex agent as the retrieval layer — replace vector-only search with structured context graph queries so your agent's answers carry traceable provenance chains instead of opaque embeddings.
