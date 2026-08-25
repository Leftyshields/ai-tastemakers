# AI Tastemakers — Daily Brief — 2026-08-25

_Ranking: delta_7d · 10 repos · generated 2026-08-25T14:02:27.584Z_


## 1. harry0703/MoneyPrinterTurbo

https://github.com/harry0703/MoneyPrinterTurbo · ★ 116281 (+8560 this week) · ai-video-generator, content-creation, ffmpeg, instagram-reels, llm, python, short-video, subtitles, text-to-speech, tiktok, video-automation, video-workflow, workflow-automation, youtube-shorts

**What it does:** MoneyPrinterTurbo is a Python CLI and web UI that chains an LLM (for script and keyword generation), stock footage APIs, TTS, and FFmpeg to produce narrated, subtitled short videos from a single topic or keyword.

**Why now:** The project gained 8,560 stars this week and added Kimi K3 — Moonshot AI's newly released open 3T-parameter model with 1M-token context — as a supported LLM backend, making it a practical testbed for that model's video-workflow capabilities.

**Build with it:** Point the `config.toml` LLM provider field at any OpenAI-compatible endpoint (Kimi, Volcengine, DeepSeek), then call the `/api/v1/videos` endpoint in a CI job to auto-generate daily short-form content for a YouTube Shorts or TikTok publishing pipeline.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 110433 (+5276 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code skill (and cursor-rules config) that instructs AI agents to prefer deletion and native primitives over new code — replacing a flatpickr installation with `<input type="date">` and similar.

**Why now:** The project is trending on Trendshift with +5,276 stars this week, landing as Claude Code's agent-skill ecosystem matures and developers start auditing the bloat their AI sessions actually ship.

**Build with it:** Drop the skill into a Claude Code session via `@dietrichgebert/ponytail` on npm, then run it against a real feature branch — the benchmark measures output on `git diff` LOC, so you can score before/after on your own repo the same way.

## 3. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 54842 (+4612 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that proxies requests across 350+ AI providers through a single OpenAI-compatible endpoint, with quota-aware fallback routing and RTK+Caveman token compression that the project claims cuts token usage by 15–95%.

**Why now:** The repo gained 4,612 stars this week, coinciding with renewed developer interest in managing multi-provider AI costs as Claude, Gemini, and OpenAI have tightened or restructured their free tiers — making the cataloged 1.51B free tokens/month pool directly practical rather than theoretical.

**Build with it:** Point Claude Code, Cursor, or Cline at OmniRoute's endpoint by swapping the `OPENAI_BASE_URL` config variable, then set a fallback chain across Gemini and Mistral free tiers so your coding session survives rate limits without manual key rotation.

## 4. mukul975/Anthropic-Cybersecurity-Skills

https://github.com/mukul975/Anthropic-Cybersecurity-Skills · ★ 31071 (+2212 this week) · ai-agents, claude-code, cloud-security, cybersecurity, devsecops, ethical-hacking, incident-response, infosec, llm, malware-analysis, mcp, mitre-attack, nist-csf, osint, penetration-testing, red-team, security, security-automation, threat-hunting, threat-intelligence

**What it does:** An open-source library of 818 structured cybersecurity skills for AI agents, mapped to six frameworks (MITRE ATT&CK, NIST CSF 2.0, MITRE ATLAS, D3FEND, NIST AI RMF, MITRE F3) across 34 domains including red-team C2, malware analysis, and cloud breach scoping.

**Why now:** The repo gained 2,212 stars this week, coinciding with the broader wave of agentic coding tools (Claude Code, Gemini CLI, Codex CLI) shipping natively to developers who need security context baked in rather than bolted on.

**Build with it:** Drop the relevant domain skill files into your Claude Code or Cursor project context, then wire them to an MCP server so your agent can invoke structured threat-hunting or incident-response workflows against real tooling like Volatility3 or Sigma rule sets.

## 5. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 18156 (+4013 this week) · agent-skill, ai, anthropic, c2pa, chatgpt, claude, gemini, openai, provenance, synthid, watermark, watermark-detection, watermark-tools, watermarking, watermarks

**What it does:** A Python service plus agent skill that strips AI provenance marks from text and files — Unicode steganography, statistical token watermarks (Kirchenbauer green-list, Aaronson keyed-Gumbel), and C2PA/EXIF/XMP metadata from a broad range of formats including PNG, PDF, DOCX, and MP4.

**Why now:** The project gained 4,013 stars this week, likely tracking renewed attention on C2PA adoption and SynthID-Text's expansion — both of which have surfaced in recent AI policy and content-authenticity discussions — making watermark hygiene a live concern for developers handling AI-generated assets.

**Build with it:** Drop the `remove-ai-marks` skill into Claude Code via `python3 install_skill.py --skill remove-ai-marks --target claude-code`, point `WATERMARKS_SERVICE_URL` at a self-hosted instance, and wire the service's HTTP endpoint into a CI step to scrub provenance metadata from AI-generated content before publication.

## 6. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 236241 (+3873 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python AI agent from Nous Research that creates and refines skills from experience, maintains cross-session memory, and runs on any model endpoint via a unified CLI or messaging platforms like Telegram and Discord.

**Why now:** The project is trending at 236K stars with 3,873 added this week, coinciding with Nous Research's active push around their Portal model marketplace and the agentskills.io open standard for portable agent skills.

**Build with it:** Wire it to your own OpenRouter or local endpoint via `hermes model`, then use the built-in cron scheduler to ship autonomous nightly workflows — code audits, backups, or report generation — delivered directly to a Telegram bot without touching your laptop.

## 7. can1357/oh-my-pi

https://github.com/can1357/oh-my-pi · ★ 27353 (+1753 this week) · ai-agent, ai-coding-agent, anthropic, bun, claude, cli, coding-assistant, llm, mcp, multi-provider, openai, rust, terminal, tui, typescript

**What it does:** Oh-my-pi (omp) is a terminal-based coding agent that embeds LSP and DAP protocol support directly into the agent loop, giving it 14 language-server operations and 28 debugger operations alongside 31 built-in tools across 60+ LLM providers.

**Why now:** The repo gained 1,753 stars this week, coinciding with growing builder interest in agentic coding tools that go beyond file-editing to include live debugger and language-server feedback — a gap that Claude and Codex wrappers alone don't close.

**Build with it:** Wire omp into an existing project via `bun install -g @oh-my-pi/pi-coding-agent`, then use its MCP surface to expose your own tools or connect it to a Home Manager config with `programs.omp` to declaratively manage agent settings alongside your dev environment.

## 8. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 172141 (+3207 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is an API that scrapes, searches, and crawls websites at scale, returning clean Markdown, structured JSON, or screenshots — handling JS rendering, rotating proxies, and rate limits so callers don't have to.

**Why now:** The project gained 3,207 stars this week, coinciding with growing adoption of MCP (Model Context Protocol) clients that can connect to Firecrawl with a single command, making it a live integration target for agent toolchains being built right now.

**Build with it:** Wire Firecrawl's `/scrape` endpoint into a LangChain or LlamaIndex retrieval step to replace brittle BeautifulSoup pipelines — use the `formats: ["markdown"]` output directly as context chunks, and layer the `actions` parameter (click, scroll, wait) to reach content behind JS gates.

## 9. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 42119 (+3179 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source Chinese-language book (with 14 translations) covering AI Agent design and engineering across 10 chapters, paired with 108 runnable lab experiments spanning RAG, MCP, multi-agent systems, and reinforcement learning fine-tuning.

**Why now:** The repo jumped 3,179 stars this week and hit GitHub Trending Project of the Day, coinciding with its 2.0 restructure that added a dedicated chapter on multimodal observation/action spaces — a topic actively debated in agent framework circles right now.

**Build with it:** Clone the repo, run the chapter-specific Python labs under the `coding-agent` or `multi-agent` tracks, and use the context-engineering chapter's experiments as a structured test harness for evaluating your own LLM tool-calling pipelines against documented benchmarks.

## 10. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 48656 (+1577 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, from-scratch, generative-ai, llm, machine-learning, mcp, nlp, python, reinforcement-learning, rust, swarm-intelligence, transformers, tutorial, typescript

**What it does:** A structured, 511-lesson open curriculum spanning 20 phases that teaches AI engineering hands-on in Python, TypeScript, Rust, and Julia — each lesson produces a shippable artifact like a prompt, agent, or MCP server.

**Why now:** The repo gained 1,577 stars this week, coinciding with growing developer interest in MCP (Model Context Protocol) tooling and agent infrastructure as production AI stacks mature beyond prototype.

**Build with it:** Follow Phase 14 (Agent Engineering) to wire an agent loop, then extend it using the MCP server lessons to expose tools to Claude or any MCP-compatible host — giving you a working, deployable agent backend in days.
