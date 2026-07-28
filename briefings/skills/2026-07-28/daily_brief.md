# Skill Tastemakers — Daily Brief — 2026-07-28

_Ranking: delta_7d · 10 repos · generated 2026-07-28T15:35:06.704Z_


## 1. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 32804 (+9833 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that routes requests across 290+ AI providers (90+ free) through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression that cuts token usage by 15–95%.

**Why now:** The repo gained nearly 10,000 stars this week, signaling rapid community adoption, and the free-tier aggregation (~1.53B tokens/month from 43 provider pools) makes it immediately practical as API costs and rate limits tighten across major providers.

**Build with it:** Drop OmniRoute in front of any tool that speaks the OpenAI API—Claude Code, Cursor, Cline, Copilot—and get automatic failover across free tiers, so a quota hit on one provider transparently routes to the next without changing a line of client code.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 31541 (+7017 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source Agent Development Environment (ADE) that lets you run multiple coding agents (Codex, Claude Code, OpenCode, or Pi) in parallel, each isolated in its own git worktree, with a unified desktop/mobile interface for monitoring and steering them.

**Why now:** The project gained 7,017 GitHub stars this week, signaling a sharp spike in developer interest as parallel agentic workflows move from experimental to practical, particularly alongside the rapid adoption of Claude Code and Codex CLI.

**Build with it:** Fan a single feature prompt across five agents simultaneously, compare their divergent implementations, and merge the winner — then monitor the whole fleet from your phone while agents run overnight on a VPS.

## 3. op7418/guizang-ppt-skill

https://github.com/op7418/guizang-ppt-skill · ★ 22592 (+2937 this week) · ai-agent, claude-code, codex, html-deck, image-generation, ppt, presentation, skill, skills, swiss-design, web-ppt

**What it does:** Guizang PPT Skill is an AI-agent skill for Claude Code and Codex that generates self-contained single-file HTML slide decks in two distinct visual systems—an editorial magazine style and a Swiss International grid style—with support for image prompts, social covers, and a WebGL presentation runtime.

**Why now:** The project surged 2,937 stars this week, signaling strong developer interest in agent-driven design workflows as Claude Code and Codex usage scales; it ships 22 locked Swiss layouts and a full GPT-Image 2.0 image-generation pipeline ready to use today.

**Build with it:** Drop it into a Claude Code or Codex environment, point it at a Markdown doc or article, and get a polished 7–10 slide HTML deck with auto-generated documentary photos, diagrams, and platform-specific social covers (WeChat 21:9, Xiaohongshu 3:4, landscape video) in one prompt.

## 4. ComposioHQ/awesome-claude-skills

https://github.com/ComposioHQ/awesome-claude-skills · ★ 71166 (+5861 this week) · agent-skills, ai-agents, antigravity, automation, claude, claude-code, codex, composio, cursor, developer-tools, gemini-cli, mcp, openai-codex, rube, saas, skill, workflow-automation

**What it does:** A curated, open collection of 1,000+ reusable Claude Skills—structured markdown instruction packages that teach AI agents how to handle specific tasks—paired with a Composio MCP Gateway that gives those agents authenticated access to real-world apps like GitHub, Slack, and Gmail.

**Why now:** The repo gained nearly 6,000 stars this week, signaling a surge of developer interest in portable, composable agent behavior as Claude Code, Cursor, and Gemini CLI all mature simultaneously into production workflows.

**Build with it:** Drop a skill folder into your Claude Code or Cursor setup to instantly give your agent repeatable behaviors—then wire it to Composio's single MCP endpoint to let it take real actions across 1,000+ apps without writing custom auth or integration code.

## 5. 1jehuang/jcode

https://github.com/1jehuang/jcode · ★ 12590 (+2453 this week) · ai, ai-agent, ai-coding-agent, claude, cli, coding-agent, llm, mcp, openai, rust, terminal, tui

**What it does:** jcode is a Rust-based terminal AI coding agent that integrates with Claude, OpenAI, and other LLMs via MCP, running at as little as 27.8 MB PSS compared to Claude Code's 386.6 MB.

**Why now:** It gained 2,453 GitHub stars this week, signaling rapid community adoption at a moment when multi-agent, parallel coding workflows are making per-session RAM costs a real infrastructure concern.

**Build with it:** A builder could use jcode to run dozens of simultaneous AI coding sessions on a single machine without memory constraints, or embed it as a lightweight agent harness inside a CI pipeline or resource-limited edge environment.

## 6. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 97555 (+4673 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus its docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using deterministic tree-sitter AST analysis locally, with every graph edge tagged as either explicitly extracted or LLM-inferred.

**Why now:** The project gained 4,673 stars this week and ships as a `/graphify` skill directly inside Claude Code, Cursor, Codex, and Gemini CLI, making it immediately usable inside the tools developers already have open.

**Build with it:** Wire Graphify into a code review pipeline to surface hidden dependency chains across microservices, or use its MCP interface to give an AI agent structured, graph-traversable context about a legacy codebase instead of raw file dumps.

## 7. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 43094 (+2329 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that lets your AI coding assistant (Claude, Cursor, Copilot) execute full production pipelines — scripting, asset generation via Flux/Stable Diffusion, voiceover via ElevenLabs, and final composition via FFmpeg/Remotion — using 100+ tools and 700+ agent skill files.

**Why now:** It hit #1 on GitHub Trending this week with 43K stars and 2,329 new stars in seven days, signaling a breakout moment where the community is actively building on and contributing to its 12 pipelines.

**Build with it:** Clone the repo, point your Claude or Cursor agent at the AGENT_GUIDE.md, and ship a custom pipeline — a product demo generator, a faceless YouTube channel engine, or an automated ad creative tool — without writing a video editing framework from scratch.

## 8. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 90773 (+3654 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces YAGNI discipline—pushing the agent to reach for the simplest possible solution, like an `<input type="date">` instead of a full flatpickr integration, averaging 54% fewer lines of code written.

**Why now:** The repo jumped 3,654 stars this week and is trending daily on Trendshift, signaling a wave of developers feeling the pain of AI agents that over-engineer by default and burn tokens doing it.

**Build with it:** Drop Ponytail into your Claude Code or Cursor setup to cut agentic build costs ~20% and output time ~27% on real codebases—useful if you're scaffolding a side project or running AI agents at scale where token costs compound fast.

## 9. lidge-jun/opencodex

https://github.com/lidge-jun/opencodex · ★ 5510 (+3609 this week) · ai-gateway, ai-tools, anthropic, chatgpt, claude, claude-code, codex, codex-cli, deepseek, developer-tools, gemini, grok, kiro, llm, llm-proxy, ollama, openai, openrouter, proxy, typescript

**What it does:** opencodex is a local proxy server that intercepts OpenAI Codex CLI/App and Claude Code API calls and reroutes them to any LLM provider — Anthropic, Gemini, Grok, DeepSeek, Ollama, OpenRouter — by translating the Responses API into each provider's native protocol, including streaming, tool calls, and reasoning tokens.

**Why now:** It spiked 3,600+ stars this week, likely riding the simultaneous buzz around Claude Code's growing adoption and OpenAI Codex CLI's expanding user base — both tools now have active communities looking to escape per-provider lock-in and token cost ceilings.

**Build with it:** Run `npm install -g @bitkyc08/opencodex && ocx start`, then wire Claude Code or Codex CLI to `localhost:10100` and build multi-agent workflows where, for example, a Claude Desktop session orchestrates a GPT subagent and a Kimi K3 subagent in the same thread — all from a single dashboard without touching each provider's native tooling.

## 10. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 221775 (+3546 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving CLI/cloud AI agent from Nous Research that maintains persistent memory, autonomously creates and refines skills from experience, runs scheduled tasks, and connects to Telegram, Discord, Slack, and other platforms from a single deployable process supporting any OpenAI-compatible model.

**Why now:** The repo crossed 221,000 stars with 3,500+ added this week, signaling a sharp surge in developer adoption and making it a high-momentum open-source project worth integrating before the ecosystem solidifies around it.

**Build with it:** Deploy it on a $5 VPS connected to your Telegram, point it at your own fine-tuned Nous Hermes model via a custom endpoint, and wire up scheduled automations that run nightly code audits or data pipelines — all without modifying source code.
