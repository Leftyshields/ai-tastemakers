# Skill Tastemakers — Daily Brief — 2026-09-10

_Ranking: delta_7d · 10 repos · generated 2026-09-10T17:01:39.595Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 134477 (+13421 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an agent skill (npm package `@dietrichgebert/ponytail`) that instructs AI coding agents to prefer native browser primitives and minimal code over installing libraries, measured at ~54% fewer lines written across 12 real feature tasks.

**Why now:** It hit Hacker News this week (98 points, 17 comments) alongside a spike of 13,421 stars in seven days, surfacing active discussion around agentic over-building.

**Build with it:** Drop the skill into your Claude Code or Cursor setup and run it against a feature task that currently pulls in an unnecessary dependency — the date picker example in the README (`<input type="date">` vs. flatpickr) is a ready-made validation test.

## 2. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 255703 (+9584 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness optimization system that layers skills, memory, security, and research-first workflows onto AI coding agents like Claude Code, Codex, and Cursor.

**Why now:** The repo gained nearly 9,600 stars in a single week, signaling a surge in developer adoption coinciding with broad interest in structuring agentic coding workflows beyond raw LLM prompting.

**Build with it:** Drop the `ecc-universal` npm package into an existing Claude Code or Cursor project to immediately apply ECC's instinct and memory layer to your agent's task loop.

## 3. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 37500 (+8078 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** A Claude Code skill that generates 39 editorial HTML/SVG diagram types — architecture, flowchart, Sankey, Wardley map, UML class, and more — with no build step, no shadows, and no generic rounded boxes.

**Why now:** The repo gained 8,000+ stars this week and is trending on Trendshift, surfacing it to a large wave of Claude Code and Codex users looking for non-Mermaid diagramming options.

**Build with it:** Drop the skill into a Claude Code project and point it at an existing draw.io or Mermaid file to get a redraw in any of the 39 editorial formats at a chosen size and detail level.

## 4. blader/humanizer

https://github.com/blader/humanizer · ★ 46361 (+6255 this week) · agent-skills, ai-writing, claude-code, codex, cursor, prompt-engineering, writing-tools

**What it does:** Humanizer is an agent skill that detects 25 named patterns of AI-sounding prose and rewrites text to sound human-authored, without altering facts or inventing details.

**Why now:** The repo gained 6,255 stars this week, signaling a spike in demand likely tied to growing scrutiny of AI-generated content across publishing and developer documentation workflows.

**Build with it:** Add it globally via `npx skills add blader/humanizer --global` and pipe your documentation drafts through `/humanizer docs/launch-post.md` before publishing.

## 5. stablyai/orca

https://github.com/stablyai/orca · ★ 65771 (+5921 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile AI orchestration environment that runs Codex, Claude Code, OpenCode, or Pi side-by-side, each in an isolated git worktree, with a mobile companion app for monitoring and steering agents remotely.

**Why now:** The repo gained nearly 6,000 stars this week, signaling a surge of builder attention likely tied to the parallel proliferation of competing coding agents (Codex, Claude Code, OpenCode) making multi-agent orchestration an immediate practical need.

**Build with it:** Fan a single feature prompt across three parallel worktrees—one per agent—using Orca's worktree UI, then diff and merge the winning implementation directly from the interface.

## 6. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 126622 (+2400 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** UI UX Pro Max is a Python-based AI skill that injects 192 reasoning rules and 79 searchable UI styles into AI coding tools (Cursor, Windsurf, Claude Code, Copilot) to produce consistent, professional UI/UX output across React, Tailwind, HTML5, and mobile targets.

**Why now:** The repo gained ~2,400 stars this week, signaling a surge in builder adoption likely tied to the growing ecosystem of agentic coding tools listed in its topics (Kiro, Trae, Qoder) entering wider use.

**Build with it:** Install the `ui-ux-pro-max-cli` npm package and wire the skill into your Cursor or Windsurf project to have the 192 design rules applied automatically during component generation.

## 7. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 104702 (+2207 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a two-part token-reduction tool — a rule-file skill and a local proxy — that rewrites AI coding agent responses into stripped-down prose while leaving code, paths, and error messages untouched, cutting output tokens by ~65% and input tokens by ~33%.

**Why now:** The repo crested 104k stars with 2,207 added this week, coinciding with its Product Hunt featured launch, putting it in front of a large wave of builders actively looking to cut API costs.

**Build with it:** Run `npx skills add JuliusBrussee/caveman` inside a Claude Code project to drop in the rule file, then trigger it with `/caveman` to immediately validate token savings on your own codebase.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 244144 (+4183 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving AI agent with a built-in learning loop — it creates and refines skills from experience, searches past conversations via FTS5, and runs across Telegram, Discord, Slack, and seven terminal backends including serverless Modal and Daytona environments.

**Why now:** The repo crossed 244K stars with 4,183 added this week, signaling a sharp spike in builder attention likely tied to the Hermes Desktop launch listed on the project's homepage.

**Build with it:** Point it at your own model endpoint via `hermes model` and wire a Telegram gateway to an existing cloud VM so the agent handles async tasks while you're away from your terminal.

## 9. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 64006 (+3763 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted AI gateway that exposes 352 providers (150+ free tiers, ~1.47B free tokens/month) through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression (15–95% reduction).

**Why now:** The repo gained 3,763 stars this week, signaling a surge in builders actively looking for alternatives as paid API costs compound across Claude Code, Cursor, and Codex workflows.

**Build with it:** Point your Claude Code or Cursor `OPENAI_BASE_URL` at the local OmniRoute endpoint to get automatic fallback across free Gemini, GPT, and Claude tiers without changing any other tooling config.

## 10. ruvnet/ruflo <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ruvnet/ruflo · ★ 71943 (+1715 this week) · agentic-ai, agentic-framework, agentic-workflow, agents, ai-agents, ai-assistant, ai-skills, autonomous-agents, claude-code, codex, dsh-plugin, harness, mcp-server, multi-agent, multi-agent-systems, npm, skills, swarm, swarm-intelligence, typescript

**What it does:** Ruflo is a TypeScript meta-harness for Claude Code and Codex that orchestrates multi-agent swarms with adaptive memory, RAG integration, and autonomous workflow coordination across a shared tool surface.

**Why now:** The repo gained 1,715 stars this week, coinciding with active ecosystem momentum around Claude Code tooling and a live UI beta at flo.ruv.io that makes swarm behavior directly observable.

**Build with it:** Run `npx ruflo` to scaffold a multi-agent project, then wire your own task pipeline through the MCP server config to coordinate autonomous sub-agents without writing orchestration logic from scratch.
