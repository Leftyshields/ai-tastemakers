# AI Tastemakers — Daily Brief — 2026-09-17

_Ranking: delta_7d · 10 repos · generated 2026-09-17T17:37:16.584Z_


## 1. kepano/obsidian-skills

https://github.com/kepano/obsidian-skills · ★ 48499 (+8390 this week) · agents, agentskills, bases, claude, clawdbot, cli, codex, defuddle, hermes, jsoncanvas, knap, markdown, md, obsidian, openclaw, opencode, skills

**What it does:** A set of agent skills for teaching Claude Code, Codex, and OpenCode to read and write Obsidian-native formats — Markdown with wikilinks, Bases, JSON Canvas, and CLI operations — following the Agent Skills specification.

**Why now:** The repo gained 8,390 stars this week, coinciding with the rapid adoption of agent skill/tool ecosystems across Claude Code, OpenCode, and Codex as structured skill formats become a shared interoperability layer.

**Build with it:** Drop this into `~/.opencode/skills/obsidian-skills/` and wire an agent workflow that scrapes URLs via Defuddle, renders structured notes from CSV data with Knap, and commits them to a vault — all without custom tool definitions.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 141207 (+6737 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin/skill for AI coding agents (Claude Code, Cursor, and ~18 others) that injects YAGNI-style constraints, steering agents toward the minimal viable implementation rather than over-engineered solutions.

**Why now:** The project is trending at +6,737 stars this week, coinciding with surging real-world use of agentic coding tools where runaway code generation (unnecessary dependencies, wrapper components, boilerplate) has become a concrete daily frustration for teams.

**Build with it:** Drop the npm package `@dietrichgebert/ponytail` into your Claude Code or Cursor setup via its agent-skills config surface, and pair it with your existing `CLAUDE.md` or `.cursorrules` to enforce a no-over-build policy on every agent session.

## 3. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 261084 (+5381 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness layer for AI coding tools—Claude Code, Codex, Opencode, Cursor—that adds structured skills, memory, instincts, and security controls via configuration and MCP integration.

**Why now:** Claude Code's rapid adoption as a terminal-native coding agent has created demand for persistent context and guardrails that the base tool doesn't ship; ECC fills that gap as the ecosystem matures around it this week.

**Build with it:** Drop ECC's CLAUDE.md skill files into your repo root and wire up `ecc-agentshield` via npm to gate agent tool calls with security policies before they hit production codebases.

## 4. harry0703/MoneyPrinterTurbo

https://github.com/harry0703/MoneyPrinterTurbo · ★ 124450 (+2266 this week) · ai-video-generator, content-creation, ffmpeg, instagram-reels, llm, python, short-video, subtitles, text-to-speech, tiktok, video-automation, video-workflow, workflow-automation, youtube-shorts

**What it does:** MoneyPrinterTurbo is a Python pipeline that takes a topic or keyword and automatically generates a script via LLM, sources stock footage, synthesizes subtitles and TTS audio, then mixes everything into a short-form video using FFmpeg.

**Why now:** The project gained 2,266 stars this week and recently integrated Kimi K3 — Moonshot AI's newly released open-source 3T-parameter model with 1M-token context — as a supported script and keyword-generation backend.

**Build with it:** Drop it into a content scheduling workflow by hitting its REST API to programmatically submit topics, then pipe the returned video files to a platform uploader (TikTok, YouTube Shorts, Reels) — the `config.toml` surface lets you swap LLM providers and TTS engines without touching application code.

## 5. Tencent/WeKnora

https://github.com/Tencent/WeKnora · ★ 26174 (+4104 this week) · agent, agentic, ai, chatbot, dsh-plugin, embeddings, evaluation, generative-ai, golang, knowledge-base, llm, multi-tenant, ollama, openai, question-answering, rag, reranking, semantic-search, vector-search, wiki

**What it does:** WeKnora is a Go-based, self-hostable knowledge platform that ingests documents from 10+ sources (Feishu, Notion, GitLab, RSS, etc.), exposes them via RAG Q&A and a ReAct agent with sandbox execution, and auto-generates a self-maintaining interlinked markdown Wiki with revision history.

**Why now:** The repo spiked 4,104 stars this week, coinciding with v0.8.0 shipping Wiki Mode — a new agent-driven capability that distills raw document uploads into a queryable, rollback-capable knowledge graph rather than static embeddings.

**Build with it:** Drop WeKnora into an internal tooling stack by pointing its multi-instance storage backend at your existing object store, wiring LiteLLM to your preferred model provider, and publishing a scoped API key to expose a retrieval endpoint or embed a chat widget directly on an internal site.

## 6. TencentCloud/Octop <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/TencentCloud/Octop · ★ 3339 (+1815 this week) · agent, agentic-ai, ai, ai-agent, ai-agents, local-first, long-term-memory

**What it does:** Octop is a self-hosted, multi-user AI assistant framework that runs multiple specialized agents in parallel, with pluggable memory, RAG knowledge bases, OAuth/MCP connectors, and integrations across Feishu, DingTalk, Discord, QQ, and WeCom.

**Why now:** The project spiked 1,815 stars this week, coinciding with its v1.0.0 release on PyPI, signaling a coordinated public launch moment that typically drives early adopter tooling and integrations.

**Build with it:** Wire Octop into an existing team workflow by deploying the `octop acp` bridge to connect IDE agents bidirectionally, then extend via the MCP gateway to expose internal APIs as connectors — giving each user role a distinct MBTI-persona agent scoped to specific tool permissions.

## 7. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 82813 (+3596 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP server that gives AI agents free, scrape-ready access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu — handling auth, anti-bot bypasses, and HTML-to-readable-text conversion without paid APIs.

**Why now:** The repo hit GitHub Trending #1 this week with 3,596 stars in seven days, coinciding with a surge in Claude Code and Cursor users hunting zero-cost data tools to wire into agentic workflows.

**Build with it:** Drop it into a Claude Code or Cursor project as an MCP server, then prompt your agent to pull Reddit threads or YouTube transcripts directly as context — no scraper boilerplate, no API keys required.

## 8. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 67366 (+3361 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hostable TypeScript gateway that exposes 1,200+ models across 352 providers through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression claimed to reduce token usage by 15–95%.

**Why now:** The repo gained 3,361 stars this week, a spike consistent with viral distribution among developers actively hitting rate limits on Claude Code, Codex, and Cursor as those tools see heavy adoption.

**Build with it:** Point Claude Code or Cursor's OpenAI base URL at your OmniRoute instance, configure provider API keys in the dashboard, and let the fallback routing transparently swap between free-tier Gemini, DeepSeek, and Groq when any single provider quota exhausts.

## 9. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 106290 (+1588 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a Go-based proxy and prompt skill that rewrites AI coding agent output into stripped-down, token-minimal language, claiming a 65% token reduction with negligible quality loss.

**Why now:** An Adobe Research paper (CAVEWOMAN, arxiv 2606.24083) independently measured caveman-style prompting cutting costs 1.4–2.4×, and JetBrains published benchmark results across 86 coding tasks this week, giving the approach third-party validation beyond the meme.

**Build with it:** Drop it into any Claude Code or similar agent workflow via `npx skills add JuliusBrussee/caveman -g`, then point the proxy at your existing LLM API endpoint to intercept and compress agent responses without changing your toolchain.

## 10. blader/humanizer

https://github.com/blader/humanizer · ★ 49503 (+3144 this week) · agent-skills, ai-writing, claude-code, codex, cursor, prompt-engineering, writing-tools

**What it does:** Humanizer is a Markdown-based agent skill that rewrites AI-generated text using 25 specific anti-pattern rules—catching tells like "not X but Y" framing, dramatic one-line closers, and staged run-ups—without altering facts or inventing details.

**Why now:** The repo gained 3,144 stars this week, coinciding with renewed platform-level support as Claude Code 2.1.142 shipped native `/plugin` install for it, lowering the friction to deploy it inside an existing agent workflow.

**Build with it:** Drop it into Claude Code via `/plugin marketplace add blader/humanizer`, then wire `/humanizer path/to/post.md` as a post-processing step in your content pipeline to strip AI tells from draft copy before publication.
