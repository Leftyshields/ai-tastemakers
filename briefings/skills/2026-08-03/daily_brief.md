# Skill Tastemakers — Daily Brief — 2026-08-03

_Ranking: delta_7d · 10 repos · generated 2026-08-03T15:52:16.494Z_


## 1. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 38531 (+6691 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that routes requests across 290+ AI providers (90+ free tiers) through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression that cuts usage by 15–95%.

**Why now:** The repo gained 6,691 stars this week, coinciding with active provider catalog expansion and a re-audited free-tier budget landing at ~1.53B tokens/month across 43 provider pools — a concrete, recomputed number rather than a marketing estimate.

**Build with it:** Point Claude Code, Cursor, or Cline at OmniRoute's endpoint via their OpenAI-compatible base URL config, then set a fallback chain across Gemini 2.5 Flash, GPT-4o mini, and DeepSeek free tiers so your coding session never hard-stops on a rate limit.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 36427 (+5856 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile/VPS app that orchestrates parallel AI coding agents (Codex, Claude Code, OpenCode, Pi) across isolated git worktrees, with Ghostty-class terminal splits and a browser Design Mode that pipes live HTML/CSS into agent prompts.

**Why now:** It surfaced on Hacker News this week as an open-source alternative combining Conductor-style agent orchestration with Ghostty-quality terminals, hitting 36K stars with 5,856 added in a single week — signaling rapid community adoption at a moment when multi-agent coding workflows are becoming a daily practice.

**Build with it:** Wire your existing Claude Code or Codex subscription into Orca's worktree config, spawn five parallel agents against the same prompt, then use the mobile companion app (iOS/Android) to receive finish notifications and send follow-up instructions without touching your desk.

## 3. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 101621 (+4666 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase (plus SQL schemas, configs, PDFs, and docs) into a queryable knowledge graph using tree-sitter AST locally, exposing it as a `/graphify` skill inside Claude Code, Cursor, Codex, and Gemini CLI via MCP.

**Why now:** The project is being actively submitted to Hacker News this week under multiple framings ("Turn any folder of code, SQL schemas into a queryable knowledge graph"), suggesting the team is iterating on positioning around a public v1 launch with early access currently open at app.graphify.com.

**Build with it:** Wire it into Claude Code as an MCP skill, then query cross-file call graphs and schema relationships with natural language instead of grep — concrete starting point is the `/graphify` command against a monorepo with mixed Python, SQL, and config files.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 94656 (+4423 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code / cursor-rules skill that injects a YAGNI constraint into AI agents, nudging them to reach for `<input type="date">` instead of flatpickr and a timezone discussion — measured at ~54% fewer lines of code across 12 real feature tasks on a FastAPI + React codebase.

**Why now:** The project is trending at +4,423 stars this week, coinciding with broader developer conversation about AI agents over-building and the cost of unchecked token burn in agentic loops — Haiku 4.5 sessions with the skill run ~20% cheaper and ~27% faster than the bare baseline.

**Build with it:** Drop the `CLAUDE.md` skill file into any repo Claude Code already reads, or wire the cursor-rules variant into your `.cursorrules` config, and every subsequent agent session in that repo inherits the constraint with no prompt engineering required.

## 5. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 44853 (+2206 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source Python system that routes natural-language prompts through 12 production pipelines and 100+ tools to produce finished videos — handling scripting, asset generation via Flux/Stable Diffusion, TTS via ElevenLabs, and final composition via Remotion or FFmpeg.

**Why now:** The repo hit #1 on GitHub Trending this week with 2,206 stars added, coinciding with Anthropic's push on agentic Claude workflows — making it a practical testbed for multi-step Claude tool-use chains in a domain (video) where agentic loops have clear success criteria.

**Build with it:** Drop the included `AGENT_GUIDE.md` and the 700+ skill files into your Cursor or Claude project context, wire Atlas Cloud's unified API for model calls, then extend an existing pipeline config to add a custom render stage — the pipeline abstraction is the integration surface.

## 6. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 65489 (+4280 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that routes AI agents to Twitter, Reddit, YouTube, Bilibili, XiaoHongShu, GitHub, and more without paid API keys, handling auth, cookie management, and HTML cleaning so agents receive readable output.

**Why now:** The project hit GitHub trending #1 this week with 4,280 stars added, surfacing alongside active discussion about MCP tooling and the cost of wiring agents to live web data — the Bilibili backend was also just swapped from yt-dlp to bili-cli after a platform ban, signaling active maintenance.

**Build with it:** Drop the install instruction URL into Claude Code or Cursor as a single prompt (`帮我安装 Agent Reach: https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md`), then call `agent-reach doctor` to verify which platform connectors are live before wiring them into your agent's tool loop.

## 7. 1jehuang/jcode

https://github.com/1jehuang/jcode · ★ 15474 (+3672 this week) · ai, ai-agent, ai-coding-agent, claude, cli, coding-agent, llm, mcp, openai, rust, terminal, tui

**What it does:** jcode is a Rust-based terminal UI coding agent that connects to LLM providers (Claude, OpenAI) and MCP servers, designed to run multi-session agentic workflows with minimal memory overhead — as low as 27.8 MB PSS per session with local embeddings disabled.

**Why now:** The project gained 3,672 stars this week, suggesting a viral spike likely tied to growing frustration with the RAM footprint of Node.js-based alternatives like Claude Code (386 MB) and GitHub Copilot CLI (333 MB) as developers scale agentic pipelines beyond single sessions.

**Build with it:** Wire jcode into a multi-agent CI pipeline via its MCP integration — run parallel coding sessions on a memory-constrained server where Node-based tools would OOM, using the SDK at jcode.sh/sdk to script session orchestration.

## 8. microsoft/generative-ai-for-beginners <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/microsoft/generative-ai-for-beginners · ★ 115350 (+1784 this week) · ai, azure, chatgpt, dall-e, generative-ai, generativeai, gpt, language-model, llms, microsoft-for-beginners, openai, prompt-engineering, semantic-search, transformers

**What it does:** Microsoft's open curriculum of 21 Jupyter Notebook lessons walks developers through core generative AI concepts—prompt engineering, RAG, function calling, image generation with DALL-E, and deploying LLM-powered apps—using OpenAI and Azure OpenAI APIs throughout.

**Why now:** The repo gained 1,784 stars this week, a spike consistent with semester starts and corporate onboarding cycles, and its newly automated Co-op Translator pipeline now keeps all 40+ language translations current via GitHub Actions—lowering the barrier for non-English teams picking it up right now.

**Build with it:** Fork the repo, drop your `OPENAI_API_KEY` into the provided `.env` template, and run the Lesson 7 notebook to wire a RAG pipeline using Azure AI Search as the retrieval backend—then swap in your own document corpus to build a domain-specific Q&A tool in a single afternoon.

## 9. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 224743 (+3467 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving Python AI agent from Nous Research that creates and refines skills from experience, maintains cross-session memory, runs scheduled automations, and supports seven terminal backends including serverless options like Modal and Daytona.

**Why now:** The project gained 3,467 stars this week, coinciding with visible momentum around agentic coding tools and Nous Research's active push on open, model-agnostic alternatives to Claude Code and Codex.

**Build with it:** Wire it to your own model endpoint via `hermes model` and the OpenRouter or Nous Portal integration, then use the built-in cron scheduler to ship unattended nightly workflows — code review, backup reports, or dataset generation — delivered straight to Telegram or Slack.

## 10. lidge-jun/opencodex

https://github.com/lidge-jun/opencodex · ★ 6905 (+1677 this week) · ai-gateway, ai-tools, anthropic, chatgpt, claude, claude-code, codex, codex-cli, deepseek, developer-tools, gemini, grok, kiro, llm, llm-proxy, ollama, openai, openrouter, proxy, typescript

**What it does:** opencodex is a local TypeScript proxy that translates OpenAI's Responses API into provider-specific formats, letting Codex CLI, Claude Code, Claude Desktop, and Grok Build route requests to Claude, Gemini, DeepSeek, Ollama, or any OpenAI-compatible endpoint without modifying the client tools.

**Why now:** The repo gained 1,677 stars this week, coinciding with active community interest in routing around OpenAI Codex's closed model lock-in and the recent proliferation of competing coding agents (Kiro, Grok Build) that share similar API shapes.

**Build with it:** Run `ocx init` to wire your existing Codex CLI or Claude Code install to a self-hosted Ollama instance, then use the `ocx provider add` command and the `localhost:10100` dashboard to swap models mid-project without touching client config.
