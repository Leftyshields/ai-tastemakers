# AI Tastemakers — Daily Brief — 2026-07-25

_Ranking: delta_7d · 10 repos · generated 2026-07-25T14:41:41.403Z_


## 1. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 19597 (+16399 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source Chinese-authored book on AI Agent design and engineering, covering the core formula Agent = LLM + Context + Tools across 10 chapters with 92 runnable code experiments, available free in PDF/EPUB across 7 languages.

**Why now:** The repo gained 16,399 stars this week, signaling a surge of developer interest in structured, engineering-focused AI Agent resources as teams move from LLM prototypes to production agent systems.

**Build with it:** Use the chapter-paired Python experiments to prototype specific agent capabilities—memory, RAG, multi-agent coordination, MCP tool use, or RL-based decision loops—as ready-made starting points for your own agent stack.

## 2. koala73/worldmonitor

https://github.com/koala73/worldmonitor · ★ 73925 (+11930 this week) · agent, ai, dashboard, geopolitics, mcp, mcp-server, monitoring, news, opensource, osint, palantir, situation

**What it does:** World Monitor is an open-source TypeScript dashboard that aggregates real-time geopolitical news, infrastructure signals, and OSINT data into a single situational awareness interface, with an MCP server for AI agent integration.

**Why now:** The project surged 11,930 GitHub stars this week, signaling strong developer interest in programmatic geopolitical awareness tooling at a moment when agentic AI workflows are actively seeking structured real-world data feeds.

**Build with it:** Wire the MCP server into a Claude or GPT-based agent to trigger automated alerts or summaries when specific geopolitical conditions are detected; alternatively, use the Python/Go/Ruby SDKs to pull structured news signals into a risk-scoring pipeline or trading strategy.

## 3. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 29641 (+11065 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that routes requests across 290+ AI providers through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and a token compression layer (RTK+Caveman) that cuts token usage by 15–95%.

**Why now:** The project gained 11,065 stars this week, signaling rapid community adoption, and its free-tier aggregation (~1.53B tokens/month from 43 provider pools) makes it immediately practical for builders hitting rate limits across fragmented AI APIs.

**Build with it:** Drop OmniRoute in front of any tool that speaks the OpenAI API spec—Claude Code, Cursor, Cline, Codex—and get silent failover across free tiers without changing your existing code or paying for quota headroom.

## 4. tirth8205/code-review-graph

https://github.com/tirth8205/code-review-graph · ★ 26337 (+6342 this week) · ai-coding, claude, claude-code, code-review, graphrag, incremental, knowledge-graph, llm, mcp, python, static-analysis, tree-sitter

**What it does:** `code-review-graph` builds a persistent structural map of your codebase using Tree-sitter and GraphRAG, then exposes it via MCP so AI coding tools pull only the relevant context instead of re-reading entire repos on every review.

**Why now:** The project jumped 6,342 stars this week, signaling a wave of adoption from developers actively cutting LLM token costs on large-repo workflows where context bloat is a real bottleneck.

**Build with it:** Wire it into your Claude Code or Cursor setup to slash context sent per review, then extend the MCP server to add domain-specific graph queries—like surfacing all callers of a changed function across a monorepo before a merge.

## 5. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 60760 (+3098 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents free, zero-API-key access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more through a single install command, with built-in multi-backend routing so when one scraping path gets blocked, it silently falls back to another.

**Why now:** The project hit GitHub trending #1 this week with 60K+ stars and 3K new stars in seven days, and it just shipped a live example of its resilience promise — Bilibili's wind-control killed yt-dlp so it rerouted to bili-cli with zero user action required.

**Build with it:** Drop this into a Claude Code or Cursor workflow to let your agent autonomously research competitors on Twitter, pull Reddit bug threads, summarize YouTube tutorials, or monitor RSS feeds — without writing a single scraper or paying for a single API key.

## 6. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 109989 (+2743 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** UI UX Pro Max is a rules-based AI skill — a structured prompt file you drop into Claude, Cursor, or Copilot — that encodes 161 design reasoning rules and 84 UI styles to guide AI code generation toward professional-grade interfaces across web and mobile frameworks.

**Why now:** AI coding tools are shipping faster than their design judgment is improving, and the gap shows in generic, inconsistent UIs; this week's 2,743 new stars suggest developers are actively looking for a layer that fixes that gap without requiring a human designer in the loop.

**Build with it:** Install the CLI, point it at a project brief, and get a full design system recommendation — layout patterns, color logic, component hierarchy, and CTA placement — before writing a single line of code, then let your AI editor execute against that spec instead of guessing.

## 7. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 67491 (+2676 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a collection of portable agent skills (structured prompt/config files) that instruct AI coding agents like Codex, Cursor, and Claude Code to apply stronger layout, typography, motion, and spacing decisions instead of defaulting to generic boilerplate UI patterns.

**Why now:** With 67,000+ stars and 2,676 added this week, it's hitting critical mass as developers increasingly use agentic coding tools and want output that doesn't look machine-stamped; the timing tracks with widespread Claude Code and Codex adoption reaching mainstream builders.

**Build with it:** Drop the skills into your Cursor or Claude Code project, then prompt your agent to build a dashboard, landing page, or mobile UI and get back something with deliberate visual hierarchy instead of default Tailwind gray boxes—or pair the image-generation skills with ChatGPT Images to generate reference boards first, then hand those frames to your agent for implementation.

## 8. ruvnet/RuView

https://github.com/ruvnet/RuView · ★ 86225 (+5126 this week) · awesome, claude, densepose, esp32, firmware, home-assistant, home-automation, iot, monitoring, networking, npm, pose-estimation, react, rf, self-learning, skills, spatial-intelligence, typescript, wifi, wifi-security

**What it does:** RuView uses ESP32 sensors (~$9/node) to extract Channel State Information from ambient WiFi signals, converting radio disturbances into real-time presence detection, contactless vital sign monitoring, and room-level activity recognition — no cameras, no cloud, no wearables required. It runs spiking neural networks entirely on edge hardware and exposes 21 entities per node to Home Assistant, Apple Home, Google Home, and Alexa via Matter or MQTT.

**Why now:** The project gained 5,126 stars this week, signaling a sharp surge in builder attention — likely driven by growing interest in privacy-preserving sensing as an alternative to camera-based home monitoring. With Matter integration now mainstream and ESP32 hardware cheap and accessible, the infrastructure to ship this as a real product is finally in place.

**Build with it:** Wire up a two-node ESP32 mesh, point RuView at your Home Assistant instance with the `--mqtt` flag, and build a fall-detection or sleep-apnea screening automation using the pre-shipped `someone-sleeping`, `possible-distress`, and `fall-risk-elevated` semantic entities. A more ambitious build: use the RF fingerprinting layer to map room occupancy across a multi-unit building and feed that data into an energy management system.

## 9. ComposioHQ/awesome-claude-skills

https://github.com/ComposioHQ/awesome-claude-skills · ★ 70393 (+5088 this week) · agent-skills, ai-agents, antigravity, automation, claude, claude-code, codex, composio, cursor, developer-tools, gemini-cli, mcp, openai-codex, rube, saas, skill, workflow-automation

**What it does:** A curated collection of 1,000+ reusable Claude Skills—modular `SKILL.md` instruction packages that teach AI agents like Claude Code, Cursor, and Codex how to handle specific task classes, backed by Composio's MCP Gateway for authenticated access to real-world app integrations.

**Why now:** The repo gained 5,088 stars this week, coinciding with rapid adoption of Claude Code and agentic coding workflows where teams need pre-built, production-ready skill primitives rather than writing custom agent instructions from scratch.

**Build with it:** Drop in existing skills for document processing, Slack posting, or GitHub issue creation, then author your own `SKILL.md` files to encode your team's workflows as reusable agent behaviors deployable across any MCP-compatible coding agent.

## 10. citrolabs/ego-lite <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/citrolabs/ego-lite · ★ 3219 (+2453 this week) · agent-skills, ai-agent, browser, skills, skills-sh

**What it does:** ego lite is a macOS browser that lets AI agents (Codex, Claude Code, etc.) run web automation tasks in isolated "Spaces" while sharing your real logged-in browser state, so agents can act on your behalf without hijacking your tabs or requiring fresh logins.

**Why now:** It hit 3,219 stars with 2,453 added this week, driven by the surge in agentic coding tools where browser access is the missing last mile—agents can write code but struggle to act on the web as you.

**Build with it:** Drop the `ego-browser` skill into any agent workflow to automate authenticated tasks (form submissions, social actions, SaaS dashboards) against your live session, then ship that workflow as a reusable skill others can install with a single `npx skills add` command.
