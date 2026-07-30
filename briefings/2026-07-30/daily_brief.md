# AI Tastemakers — Daily Brief — 2026-07-30

_Ranking: delta_7d · 10 repos · generated 2026-07-30T15:22:26.141Z_


## 1. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 34818 (+10203 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that routes requests across 290+ AI providers (90+ free tiers) through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression that cuts token usage by 15–95%.

**Why now:** The project gained 10,203 stars this week, signaling rapid community adoption, and its free-tier aggregation (~1.53B tokens/month from 43 provider pools) makes it immediately practical as AI API costs and rate limits tighten.

**Build with it:** Drop OmniRoute in front of any tool that speaks the OpenAI API—Claude Code, Cursor, Cline, Codex—and get seamless failover across free providers without changing your client code or hitting dead ends on quota limits.

## 2. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 27219 (+10124 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source Chinese book (with 10 community translations) covering AI Agent design and engineering, structured around the formula Agent = LLM + Context + Tools, with 94 hands-on experiments across 10 chapters available as free PDF/EPUB downloads.

**Why now:** The repo gained 10,124 stars this week alone, hitting GitHub's Project of the Day, signaling a surge in developer demand for structured, practical Agent engineering resources beyond scattered blog posts.

**Build with it:** Use the 94 labeled experiments as a curriculum scaffold to prototype your own agent stack—covering RAG, MCP, multi-agent coordination, memory, and reinforcement learning—with ready-to-run Python code organized chapter by chapter.

## 3. koala73/worldmonitor

https://github.com/koala73/worldmonitor · ★ 76830 (+8844 this week) · agent, ai, dashboard, geopolitics, mcp, mcp-server, monitoring, news, opensource, osint, palantir, situation

**What it does:** World Monitor is an open-source TypeScript dashboard that aggregates real-time news, geopolitical events, and infrastructure signals into a single situational awareness interface, with an MCP server for piping that intelligence into AI agents.

**Why now:** The project gained nearly 9,000 GitHub stars this week, signaling a sharp spike in developer interest and making it a live, actively maintained dependency worth evaluating before the community fragments into forks.

**Build with it:** Use the MCP server endpoint to feed curated geopolitical or commodity signals directly into an AI agent workflow—pairing `npx worldmonitor` with a Claude or GPT tool-call loop to trigger alerts or draft briefings when specific regions or topics cross a risk threshold.

## 4. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 45086 (+3115 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, from-scratch, generative-ai, llm, machine-learning, mcp, nlp, python, reinforcement-learning, rust, swarm-intelligence, transformers, tutorial, typescript

**What it does:** A free, open-source, 503-lesson curriculum spanning 20 phases that teaches AI engineering end-to-end—from linear algebra and backprop to LLMs, agents, and production systems—in Python, TypeScript, Rust, and Julia, with every lesson producing a reusable artifact.

**Why now:** It crossed 45K stars with 3,115 added this week, signaling a sharp spike in developer attention likely tied to growing demand for engineers who can build AI systems from first principles rather than just wire together APIs.

**Build with it:** Use the MCP server and agent phases to ship a production-ready autonomous agent with persistent memory, grounded in enough math and architecture knowledge to debug it when it breaks.

## 5. ComposioHQ/awesome-claude-skills

https://github.com/ComposioHQ/awesome-claude-skills · ★ 71352 (+6047 this week) · agent-skills, ai-agents, antigravity, automation, claude, claude-code, codex, composio, cursor, developer-tools, gemini-cli, mcp, openai-codex, rube, saas, skill, workflow-automation

**What it does:** Awesome Claude Skills is a curated collection of 1,000+ reusable instruction packages ("skills") that extend Claude and other coding agents like Cursor, Codex, and Gemini CLI with structured, task-specific behaviors backed by Composio's MCP Gateway for live app integrations.

**Why now:** The repo gained 6,047 stars this week, signaling a surge in developer interest around agent skill composition as Claude Code, Codex, and Gemini CLI mature into daily coding workflows.

**Build with it:** Drop a skill folder into your Claude setup to give it repeatable, production-ready behaviors—then wire it to Composio's MCP endpoint to have it autonomously send emails, file GitHub issues, or post Slack updates without writing custom integration code.

## 6. citrolabs/ego-lite

https://github.com/citrolabs/ego-lite · ★ 6362 (+5315 this week) · agent-skills, ai-agent, automation, browser, browser-automation, claude-code, codex, hermes-agent, skills, skills-sh

**What it does:** ego lite is a macOS browser that lets AI agents (Claude Code, Codex, etc.) run browser automation tasks in isolated "Spaces" while sharing your existing logged-in sessions, cookies, and extensions via a single `ego-browser` skill command.

**Why now:** It gained 5,315 stars this week, signaling the developer community is actively looking for a cleaner alternative to browser-use and Playwright-based setups that require separate browser instances and manual login re-entry.

**Build with it:** Drop the `ego-browser` skill into a Claude Code or Codex workflow to automate authenticated tasks—form submissions, dashboard scraping, social actions—against your real logged-in accounts without writing any browser configuration code.

## 7. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 98925 (+5280 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus docs, PDFs, SQL schemas, and configs—into a queryable knowledge graph using deterministic tree-sitter AST locally, with every graph edge labeled as either explicitly extracted or LLM-inferred, and no vector store required.

**Why now:** It gained nearly 5,300 stars this week and ships as a `/graphify` skill directly inside Claude Code, Cursor, Codex, and Gemini CLI, hitting exactly as those tools become primary development environments for working developers.

**Build with it:** Use it to power precise cross-repo impact analysis—ask "what breaks if I change this SQL schema column" and get a traced answer across code, configs, and docs rather than a grep guess.

## 8. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 94567 (+2571 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a prompt skill/plugin for Claude Code and 30+ other AI coding agents that forces the model to respond in stripped-down caveman-speak, cutting output tokens by ~65% while keeping all code, commands, and error messages byte-for-byte intact.

**Why now:** It hit 94,567 stars with 2,571 added this week, signaling strong developer traction around practical LLM cost reduction as token bills on agentic workflows become a real pain point.

**Build with it:** Drop the install script into your team's onboarding docs or CI agent config so every developer automatically runs a leaner Claude Code instance; or fork the prompt logic to experiment with other compression dialects (terse military, bullet-only, etc.) and benchmark quality-versus-token tradeoffs across different coding tasks.

## 9. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 92213 (+4495 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt-based skill/plugin for AI coding agents (Claude Code, Cursor, etc.) that biases the agent toward minimal solutions—reaching for native browser APIs, stdlib, or a single line before installing a dependency or scaffolding a component.

**Why now:** It gained 4,495 stars this week, likely driven by growing frustration with AI agents that over-engineer simple tasks and inflate token costs; the repo's benchmarks show ~54% fewer lines of code and ~20% lower cost on real Claude Code sessions against a real FastAPI + React codebase.

**Build with it:** Drop the skill file into your Claude Code or Cursor setup and use it as a forcing function when prototyping features where token budget or codebase bloat matters—or fork the benchmark harness to measure how your own agent prompting strategies compare on a standardized open-source repo.

## 10. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 55337 (+2226 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** /last30days is an AI agent skill that queries Reddit, X, YouTube, HN, Polymarket, TikTok, and the web in parallel, scores results by real engagement signals (upvotes, likes, prediction-market odds), and synthesizes a grounded summary of any topic from the past 30 days.

**Why now:** It hit #1 on GitHub Trending this week with 2,226 stars in seven days, signaling strong developer adoption at the exact moment walled-garden API access and agent skill ecosystems are converging into a viable distribution layer.

**Build with it:** Drop it into Claude Code, Codex, or any of 50+ agent hosts to power pre-meeting research tools, real-time trend monitors, or competitor intelligence pipelines that pull signal from platforms no single LLM touches natively.
