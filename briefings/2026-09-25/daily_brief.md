# AI Tastemakers — Daily Brief — 2026-09-25

_Ranking: delta_7d · 10 repos · generated 2026-09-25T17:56:41.646Z_


## 1. helloianneo/ian-xiaohei-illustrations <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/helloianneo/ian-xiaohei-illustrations · ★ 12093 (+5344 this week) · ai-agent, chinese, codex-skill, handdrawn, illustration, image-generation, xiaohei

**What it does:** A Codex Skill that reads Chinese articles and generates 16:9 hand-drawn "Xiaohei" character illustrations — one cognitive anchor per image — with minimal red/orange/blue Chinese annotations on a pure white background.

**Why now:** The repo gained 5,344 stars this week, signaling sharp breakout traction likely tied to growing Codex agent skill-sharing culture and demand for non-PPT Chinese content visuals.

**Build with it:** Install the `ian-xiaohei-illustrations/` subdirectory into `~/.codex/skills/`, then invoke it via `Use $ian-xiaohei-illustrations` inside a Codex workflow to auto-generate shot lists and PNG assets into `assets/<article-slug>-illustrations/` for any Markdown or Notion article pipeline.

## 2. hypit-ai/hypit

https://github.com/hypit-ai/hypit · ★ 16381 (+6455 this week) · agentic-ai, ai, ai-agents, ai-video, compiler, dsl, ffmpeg, generative-ai, llm, markup-language, monorepo, plugin-system, programming-language, text-to-video, typescript, video, video-automation, video-clone, video-editing, video-generation

**What it does:** Hypit is a TypeScript monorepo that uses a custom DSL and agentic AI pipeline to clone viral videos at scale — swapping faces, voiceovers, and B-roll, then shipping up to 100 variants in a single CLI command via FFmpeg under the hood.

**Why now:** The repo hit #1 on Trendshift for both daily overall and daily TypeScript repositories this week, signaling a sharp spike in builder attention around automated short-form video arbitrage workflows.

**Build with it:** Wire your own video source into the plugin system, define variant parameters in the DSL config, and pipe the output to a TikTok or YouTube Shorts upload step to run a systematic A/B test across 100 auto-generated clones.

## 3. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 267350 (+5595 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness optimization layer that adds persistent skills, memory, instincts, and security guardrails (via `ecc-agentshield`) to AI coding agents including Claude Code, Codex, Opencode, and Cursor.

**Why now:** Claude Code's rapid adoption as a terminal-native coding agent has created demand for structured harness configs that survive context resets — ECC's `CLAUDE.md`-style skill files and MCP integration directly address that gap as Claude Code usage spikes this week.

**Build with it:** Drop ECC's `ecc-universal` npm package into an existing Claude Code or Cursor workflow to wire up persistent memory files and AgentShield prompt-injection protection as a pre-execution security layer.

## 4. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 70129 (+2372 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that exposes a single OpenAI-compatible endpoint routing across 359 AI providers (150+ with free tiers), with quota-aware auto-fallback and RTK+Caveman prompt compression claiming 15–95% token reduction.

**Why now:** The repo gained 2,372 stars this week, likely tracking alongside renewed cost pressure from Claude Code and Codex CLI users burning through paid API quotas and actively seeking free-tier arbitrage.

**Build with it:** Point Claude Code, Cursor, or Cline at the local gateway URL via their `OPENAI_BASE_URL` / `ANTHROPIC_BASE_URL` config, enable the fallback chain across Groq, Mistral, and Gemini free tiers, and let the `/dashboard/free-tiers` page track remaining quota per pool in real time.

## 5. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 57308 (+2345 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, from-scratch, generative-ai, llm, machine-learning, mcp, nlp, python, reinforcement-learning, rust, swarm-intelligence, transformers, tutorial, typescript

**What it does:** A 523-lesson, 20-phase open curriculum covering AI engineering end-to-end—from math foundations through LLM engineering, agent loops, MCP servers, and computer vision—in Python, TypeScript, Rust, and Julia, where every lesson produces a shippable artifact.

**Why now:** The repo gained 2,345 stars this week, likely driven by renewed builder interest in MCP (Model Context Protocol) tooling as the standard gains adoption across agent frameworks.

**Build with it:** Use Phase 14 (Agent Engineering) alongside Phase 11 (LLM Engineering) to wire a multi-step agent that exposes capabilities as an MCP server—the curriculum includes lesson-level code you can drop directly into an existing LangChain or custom agent scaffold.

## 6. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 145894 (+4005 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin/skill layer for AI coding agents (Claude Code, Cursor, and ~18 others) that injects YAGNI-first heuristics, pushing agents to delete or skip code rather than generate it.

**Why now:** The repo is trending steeply (+4,005 stars this week), coinciding with growing community frustration over Claude Code's tendency to over-engineer solutions — a concrete pain point this directly addresses.

**Build with it:** Drop the npm package (`@dietrichgebert/ponytail`) into an existing Claude Code workflow via its plugin config, or wire the cursor-rules file into `.cursor/rules` to constrain agent output on any new feature branch before code review.

## 7. rocketride-org/rocketride-server

https://github.com/rocketride-org/rocketride-server · ★ 12095 (+3639 this week) · ai, cpp, data-pipeline, data-processing, machine-learning, mcp, python, sdk, typescript, vscode-extension

**What it does:** RocketRide is an open-source AI pipeline engine with a multithreaded C++ runtime, 100+ nodes spanning 15+ LLM providers and 9 vector databases, pipelines defined as portable JSON, and a VS Code extension for visual composition and debugging.

**Why now:** The project gained 3,639 stars this week, signaling a notable discovery or community surge, coinciding with broad developer interest in self-hosted, vendor-lock-in-free alternatives to managed AI orchestration platforms.

**Build with it:** Wire a multimodal RAG pipeline using the Python SDK to connect an ingestion node (OCR or NER) to a vector database of your choice, then expose it via the built-in MCP server endpoint for tool-calling integration with any LLM agent framework.

## 8. Donchitos/Claude-Code-Game-Studios

https://github.com/Donchitos/Claude-Code-Game-Studios · ★ 25438 (+3517 this week) · ai-agents, ai-assisted-development, anthropic, claude, claude-code, game-design, game-development, gamedev, godot, indie-game-dev, unity, unreal-engine

**What it does:** Claude Code Game Studios is a Shell-based configuration layer that installs 49 specialized subagents, 74 slash commands, 12 hooks, and 13 rules into a Claude Code session to enforce a real studio hierarchy — directors, department leads, and specialists — across design, programming, art, audio, QA, and production.

**Why now:** Claude Code's subagents feature is seeing rapid community experimentation this week, and this repo is one of the highest-velocity agent configuration projects surfacing in that wave, offering a concrete reference for how to structure multi-agent Claude Code workflows at scale.

**Build with it:** Drop the `.claude/` directory into an existing Godot, Unity, or Unreal project, then drive full game production through slash commands like `/start`, `/design-system`, `/create-epics`, and `/dev-story` — each routed to the appropriate specialized agent with built-in quality gates and escalation paths.

## 9. pacifio/atlas <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/pacifio/atlas · ★ 6440 (+1723 this week) · ai, ai-coding-assistant, claude-code, codex, coding-agents, git, gitops, kilo-code, mcp, mcp-client, opencode, opencode-ai, opencode-skills, self-hosted, skills

**What it does:** Atlas is a desktop app that wraps multiple coding agents (Claude Code, Codex, ACP registry agents) in a shared Git-aware session layer, linking every commit back to the prompts, tool calls, and reasoning that produced it.

**Why now:** The repo gained 1,723 stars this week, coinciding with rapid real-world adoption of multi-agent coding workflows where teams are hitting the pain point of losing context when switching between Claude Code and Codex mid-task.

**Build with it:** Drop a `CLAUDE.md` or `AGENTS.md` in your repo and add structured notes to `.atlas/knowledge/` to feed shared memory across agents — then use the `@`-mention prompt surface to inject specific commits, branches, or past sessions directly into your next agent run.

## 10. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 136818 (+3268 this week) · ai-tools, claude-code, codex, desktop-app, grok, grokbuild, hermes, hermes-agent, mcp, open-source, openclaw, openclaw-ui, opencode, pi, provider-management, rust, skills, skills-management, tauri, wsl-support

**What it does:** CC Switch is a Tauri 2/Rust desktop app that centralizes API provider switching, MCP server config, skills, and prompts across Claude Code, Codex, OpenCode, Grok Build, Hermes Agent, and several other agentic CLI tools — eliminating manual JSON/TOML/YAML edits.

**Why now:** The repo is trending at +3,268 stars this week, coinciding with rapid fragmentation across competing agentic coding tools (Codex, OpenCode, Grok Build) that each demand separate config management, making a unified switcher immediately practical.

**Build with it:** Use CC Switch's provider-management layer as a testbed for routing the same MCP server config across multiple agentic tools simultaneously — letting you benchmark Claude Code vs. Codex vs. OpenCode against identical tool surfaces without duplicating setup.
