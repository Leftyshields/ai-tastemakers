# Skill Tastemakers — Daily Brief — 2026-08-17

_Ranking: delta_7d · 10 repos · generated 2026-08-17T13:54:21.205Z_


## 1. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 12879 (+8576 this week) · agent-skill, ai, c2pa, claude, provenance, synthid, watermark

**What it does:** `watermarks-remover` is a Python stdlib service plus agent skill that strips multi-vendor AI provenance marks — invisible Unicode, statistical token-sampling watermarks, and C2PA/EXIF/XMP metadata — from text and files including PNG, JPEG, PDF, DOCX, and Markdown.

**Why now:** The project surfaced on Hacker News this week alongside a v0.5.0 release that expanded vendor coverage to Claude, Gemini/SynthID-Text, OpenAI provenance surfaces, and Kirchenbauer-style open-LLM marks.

**Build with it:** Point a Cursor project at the `clean-user-facing-text` skill via `python3 install_skill.py`, then invoke it on manuscript or documentation drafts to scrub statistical watermarks before publishing.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 47116 (+6561 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an agent development environment (ADE) that runs Codex, Claude Code, OpenCode, or Pi side-by-side in isolated git worktrees, with a mobile companion app for monitoring and steering agents remotely.

**Why now:** The project surfaced on Hacker News this week as an open-source "Conductor + Ghostty" alternative, drawing early community discussion around parallel agent orchestration workflows.

**Build with it:** Fan a single prompt across multiple parallel worktrees using Orca's built-in orchestration, then compare diffs and merge the winning branch — validating whether parallel-agent iteration actually beats single-agent iteration on your codebase.

## 3. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 107371 (+2876 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify maps a codebase (code, docs, SQL schemas, PDFs, configs) into a queryable knowledge graph via local deterministic AST parsing, surfaced as a `/graphify` skill inside Claude Code, Cursor, Codex, and Gemini CLI — no vector store required.

**Why now:** The project is drawing early Hacker News attention specifically framed around reducing token use in Claude Code, making it timely as developers actively look for context-efficiency tools in AI coding workflows.

**Build with it:** Drop the `/graphify` skill into an existing Claude Code project to replace file-grep context-building with structured graph queries against your repo's AST edges.

## 4. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 49573 (+5680 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a free MIT-licensed AI gateway that routes requests across 341 providers and 1,200+ models through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman compression that cuts token usage 15–95%.

**Why now:** The repo gained 5,680 stars this week, signaling a surge of builders actively stress-testing its free-tier aggregation across 90+ providers — making this a live moment to learn from early adopters in the Discord before routing patterns solidify.

**Build with it:** Point your existing Claude Code or Cursor config at OmniRoute's single endpoint and let the auto-fallback cycle through free tiers on `/dashboard/free-tiers` to find your practical monthly ceiling before committing to paid quota.

## 5. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 104536 (+5416 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an AI agent skill that steers code agents (Claude Code, Cursor, etc.) toward the laziest-correct solution — replacing over-built implementations with native primitives, like swapping a flatpickr date picker for `<input type="date">`.

**Why now:** The project hit 104K stars with 5,400 added this week, and its agentic benchmark — measuring real Claude Code sessions on a live FastAPI + React repo — was published June 18, giving the LOC/cost/speed claims an auditable baseline for the first time.

**Build with it:** Drop the ponytail skill into a Claude Code session on your own repo and score the `git diff` against your no-skill baseline to see where your agent is over-building.

## 6. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 231829 (+4049 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving AI agent that creates and refines skills from experience, searches past conversations, and builds a persistent user model across sessions — deployable on any infra from a $5 VPS to serverless Modal/Daytona environments.

**Why now:** The repo crossed 231K stars with 4,049 added this week, signaling a sharp surge in builder attention likely tied to its recent public launch by Nous Research.

**Build with it:** Point it at your own model endpoint via `hermes model` and wire it to Telegram using the built-in gateway to get a persistent, cross-session agent without touching any application code.

## 7. herdrdev/herdr

https://github.com/herdrdev/herdr · ★ 29947 (+3760 this week) · agent, agent-orchestration, ai, ai-agents, claude-code, cli, codex, coding-agents, developer-tools, devtools, multiplexer, rust, terminal, terminal-multiplexer, terminal-ui, tmux, tui, workspace-manager

**What it does:** herdr is a Rust terminal multiplexer that runs as a persistent background server, keeping Claude Code, Codex, and other coding agents alive across disconnects while surfacing each pane's status as working, blocked, or idle.

**Why now:** The repo gained 3,760 stars this week, signaling a sharp spike in developer interest likely tied to the current wave of autonomous coding agent workflows where session persistence is a hard daily pain point.

**Build with it:** Drop herdr into an existing Claude Code workflow by launching `herdr`, spawning your agent in a pane, and using the socket API to poll for blocked-state events so your orchestration script can inject answers without manual watching.

## 8. holaboss-ai/holaOS

https://github.com/holaboss-ai/holaOS · ★ 8998 (+3505 this week) · agent, agent-harness, agent-os, agentic, ai, ai-agent, ai-agents, artificial-intelligence, claude-code, codex, electron, holaboss, holaos, llm, mcp, memory, model-context-protocol, runtime, typescript, workspace

**What it does:** holaOS is a local-first Electron desktop workspace that runs Claude Code, Codex, or its own built-in agent over shared memory, tools, and 100+ integrations — without switching contexts between them.

**Why now:** The repo gained 3,505 stars this week, signaling a sharp spike in builder attention coinciding with active positioning against Claude Code and Codex as those tools see wider adoption.

**Build with it:** Connect an existing MCP server via holaOS's MCP integration surface and run Claude Code against it to verify that tool calls and memory persist correctly across agent switches.

## 9. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 98672 (+1674 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a two-part token-reduction toolkit — a skills-based prompt that compresses agent output into terse caveman-speak, and a local proxy that shrinks input context (tool schemas, files, logs, history) before provider calls, with byte-exact recovery.

**Why now:** Caveman 2 launched this week with a pinned Claude Code benchmark showing 33.2% fewer provider-reported input tokens, moving the project from an output-only novelty to a measurable input-cost tool.

**Build with it:** Run `npm install -g @caveman-ai/cli && caveman setup --install && caveman claude` to wrap Claude Code with the proxy and validate the input-token reduction against your own session logs.

## 10. blader/humanizer

https://github.com/blader/humanizer · ★ 36100 (+1658 this week) · agent-skills, ai-writing, claude-code, codex, cursor, prompt-engineering, writing-tools

**What it does:** Humanizer is an agent skill (plain Markdown) that rewrites AI-generated text by detecting and removing 35 documented patterns—sourced from Wikipedia's AI Cleanup project—without altering facts, meaning, or citations.

**Why now:** The repo gained 1,658 stars this week, signaling a sharp uptick in demand for post-processing steps that make LLM output less detectable before publication.

**Build with it:** Add it globally with `npx skills add blader/humanizer --global`, then pipe draft copy through `/humanizer` as a final step in any Claude Code or Cursor writing workflow before committing docs or posts.
