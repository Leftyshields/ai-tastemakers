# Skill Tastemakers — Daily Brief — 2026-08-20

_Ranking: delta_7d · 10 repos · generated 2026-08-20T13:59:29.181Z_


## 1. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 15772 (+11469 this week) · agent-skill, ai, c2pa, claude, provenance, synthid, watermark

**What it does:** `watermarks-remover` strips multi-vendor AI provenance marks from text and files — covering invisible Unicode, statistical token-sampling watermarks (SynthID-class, Kirchenbauer, Aaronson/EXP), and C2PA/EXIF/XMP metadata from formats including PNG, JPEG, PDF, DOCX, and MP4.

**Why now:** The project surfaced on Hacker News this week and hit 15,772 stars, coinciding with heightened industry attention on AI provenance standards like C2PA being adopted across major platforms.

**Build with it:** Drop the skill into `.grok/skills/remove-ai-marks`, run `make serve` to start the local HTTP service, and invoke `/remove-ai-marks` from your agent to strip watermarks from any file you own as a post-generation pipeline step.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 49732 (+6228 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE that runs Codex, Claude Code, OpenCode, or Pi in parallel git worktrees, letting you fan one prompt across multiple agents and merge the winning result.

**Why now:** It surfaced on Hacker News this week as an open-source "Conductor + Ghostty" alternative, sparking early builder discussion around parallel agent orchestration workflows.

**Build with it:** Point Orca at an existing repo, spawn three worktrees from one prompt using your own Claude Code subscription, and compare diffs before merging — validating whether parallel agents cut your iteration time on a real feature branch.

## 3. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 51666 (+5338 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a free, self-hosted AI gateway that routes requests across 340+ providers (90+ free tiers) through a single OpenAI-compatible endpoint, with quota-aware fallback and RTK+Caveman compression that cuts token usage by 15–95%.

**Why now:** The repo gained 5,338 stars this week, signaling a surge of builders actively stress-testing it against tools like Claude Code and Cursor — making it a live moment to catch real usage patterns and community workarounds in the GitHub Discussions.

**Build with it:** Point your Cursor or Claude Code `OPENAI_BASE_URL` at your OmniRoute instance and let the 19 routing strategies drain free tiers automatically before touching paid quota.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 106476 (+5160 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an AI agent skill that steers models like Claude Code toward minimal solutions — replacing over-engineered output with the smallest code that works, measured at ~54% fewer lines of code on real FastAPI + React tasks.

**Why now:** The repo gained 5,160 stars this week and is trending on Trendshift daily and weekly charts, signaling a wave of developers actively evaluating it against their own Claude Code workflows.

**Build with it:** Drop the ponytail skill into an existing Claude Code session and run it against one feature ticket to benchmark your own `git diff` against the no-skill baseline.

## 5. holaboss-ai/holaOS

https://github.com/holaboss-ai/holaOS · ★ 10380 (+4418 this week) · agent, agent-harness, agent-os, agentic, ai, ai-agent, ai-agents, artificial-intelligence, claude-code, codex, electron, holaboss, holaos, llm, mcp, memory, model-context-protocol, runtime, typescript, workspace

**What it does:** holaOS is an Electron desktop workspace that runs Claude Code, Codex, or its own built-in agent side by side over shared local memory, 100+ tool integrations, and MCP — with frontier models included or BYOK.

**Why now:** The repo gained 4,418 stars this week, signaling a surge of builder attention at the exact moment multi-agent workflows (Claude Code + Codex in one session) are a live, practical concern rather than a roadmap item.

**Build with it:** Point an existing MCP server at holaOS and run Claude Code alongside the built-in agent in the same workspace to validate whether shared memory actually preserves context across agent switches.

## 6. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 233377 (+3975 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving AI agent with a built-in learning loop that creates and refines skills from experience, searches past conversations, and builds a persistent user model across sessions — deployable on local terminals, Docker, SSH, or serverless backends like Modal and Daytona.

**Why now:** The repo crossed 233K stars with nearly 4K added this week, signaling a sharp spike in builder attention around its multi-platform gateway and serverless deployment story.

**Build with it:** Point it at your own model endpoint via `hermes model` and wire its Telegram gateway to a Modal backend so the agent hibernates between sessions and costs nothing when idle.

## 7. geeklee/srt-whiteboard-animation <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/geeklee/srt-whiteboard-animation · ★ 2029 (+1777 this week) · ai-skill, hand-drawn, opencv, python, srt, subtitle, whiteboard-animation

**What it does:** SRT Whiteboard Animation is a Python skill that converts SRT subtitle files into hand-drawn whiteboard videos on warm beige backgrounds, using mask-based region sequencing and streaming ink-then-color strokes that follow subtitle narrative order.

**Why now:** The repo gained 1,777 stars this week, signaling a rapid uptake likely tied to builder interest in subtitle-driven video automation as short-form educational content pipelines mature.

**Build with it:** Drop your existing SRT file into `parse_srt.py`, confirm the generated storyboard, then render directly with `render_stream_whiteboard.py` using `--ink-path grid --color-fill contour-wipe` to validate the core subtitle-to-MP4 pipeline on your own content.

## 8. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 241316 (+1662 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness operating system that adds skills, instincts, memory, and security primitives on top of Claude Code, Codex, Opencode, and Cursor.

**Why now:** The repo hit GitHub's trending rank this week alongside rapid growth in Claude Code adoption, making it a live signal for where agentic dev tooling is consolidating.

**Build with it:** Drop the `ecc-universal` npm package into an existing Claude Code workflow to layer persistent memory and AgentShield security onto your current agent loop without changing the underlying model setup.

## 9. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 108564 (+3012 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify maps any codebase — including docs, SQL schemas, configs, and PDFs — into a queryable knowledge graph via a `/graphify` slash command in Claude Code, Cursor, Codex, or Gemini CLI, using local deterministic AST parsing with no vector store required.

**Why now:** Graphify is a YC S26 company with early platform access open ahead of its public v1 launch, putting it in active pre-launch builder recruitment right now.

**Build with it:** Drop the `/graphify` skill into an existing Claude Code or Cursor project and query cross-file symbol relationships instead of grepping to validate the graph's AST-derived edges against your own codebase structure.

## 10. herdrdev/herdr

https://github.com/herdrdev/herdr · ★ 30912 (+2836 this week) · agent, agent-orchestration, ai, ai-agents, claude-code, cli, codex, coding-agents, developer-tools, devtools, multiplexer, rust, terminal, terminal-multiplexer, terminal-ui, tmux, tui, workspace-manager

**What it does:** herdr is a Rust-based terminal multiplexer that keeps coding agents (Claude Code, Codex, Cursor, etc.) running in a persistent background server, surfacing which panes are working, blocked, or idle so you never lose a stuck agent.

**Why now:** The repo gained 2,836 stars this week, signaling a sharp spike in developer attention likely tied to the current wave of CLI-native agent workflows replacing GUI-heavy setups.

**Build with it:** Drop herdr into an existing Claude Code or Codex workflow using its socket API to programmatically spawn panes and poll for blocked state — replacing manual terminal babysitting with scriptable agent orchestration.
