# Skill Tastemakers — Daily Brief — 2026-08-21

_Ranking: delta_7d · 10 repos · generated 2026-08-21T13:58:46.112Z_


## 1. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 16411 (+12108 this week) · agent-skill, ai, c2pa, claude, provenance, synthid, watermark

**What it does:** A Python stdlib service plus agent skill that strips multi-vendor AI provenance marks — invisible Unicode, statistical token-sampling watermarks, and C2PA/EXIF/XMP metadata — from text and files including PNG, PDF, DOCX, MP4, and a dozen other formats.

**Why now:** The project hit Hacker News this week alongside a v0.5.0 release that expanded vendor coverage to Claude, Gemini/SynthID-Text, OpenAI, and Kirchenbauer/Gumbel-style open-LLM marks.

**Build with it:** Symlink `skills/remove-ai-marks/` into `.grok/skills/`, run `make serve`, and invoke `/remove-ai-marks` inside your agent to pipe owned documents through the HTTP service before publishing.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 50486 (+5838 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE (Agent Development Environment) that runs Codex, Claude Code, OpenCode, or Pi side-by-side in isolated git worktrees, with a mobile companion app for monitoring and steering agents remotely.

**Why now:** The project surfaced on Hacker News this week as a "Conductor + Ghostty" alternative and has crossed 50K GitHub stars, signaling a fast-growing builder audience experimenting with parallel agent workflows.

**Build with it:** Point Orca at an existing repo, fan a single prompt across three parallel worktrees each running Claude Code, then compare diffs and merge the winning branch — validating the core parallel-agent orchestration loop with your own API subscription.

## 3. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 52355 (+5300 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted AI gateway that routes requests across 346 providers (90+ with free tiers) through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression that cuts usage by 15–95%.

**Why now:** The repo gained 5,300 stars this week, surfacing it as a trending TypeScript project at a moment when Claude Code, Codex CLI, and OpenCode are all competing for the same free-tier quota.

**Build with it:** Point your Claude Code or Cursor `OPENAI_BASE_URL` at your OmniRoute instance to automatically fall back across free Gemini, GPT-4o mini, and DeepSeek tiers when any single provider hits its rate limit.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 107159 (+5201 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an AI agent skill (compatible with Claude Code, Cursor, and 20 other agents) that biases code generation toward deletion and native primitives — fewer lines, lower cost, no new dependencies where the platform already provides one.

**Why now:** The repo gained 5,201 stars this week and the team published a new agentic benchmark this month (2026-06-18) showing a fair head-to-head against a no-skill baseline: −54% LOC, −20% cost, −27% time, with safety held at 100%.

**Build with it:** Drop the skill into an existing Claude Code session via the npm package `@dietrichgebert/ponytail` and run it against a feature branch to measure the `git diff` reduction before merging.

## 5. holaboss-ai/holaOS

https://github.com/holaboss-ai/holaOS · ★ 10544 (+4273 this week) · agent, agent-harness, agent-os, agentic, ai, ai-agent, ai-agents, artificial-intelligence, claude-code, codex, electron, holaboss, holaos, llm, mcp, memory, model-context-protocol, runtime, typescript, workspace

**What it does:** HolaOS is a local-first, Electron-based agentic workspace that runs apps (Notion, browser, custom URLs) side-by-side with AI agents — Claude Code, Codex, or BYOK models — wired together via MCP and shared memory across 100+ integrations.

**Why now:** The repo gained 4,273 stars this week, signaling a sharp spike in builder attention that makes this a practical moment to evaluate it before the integration ecosystem solidifies around competing platforms.

**Build with it:** Point a HolaApp at any URL plus an MCP server config to wire your own internal tool into the workspace and let an agent drive it while you watch and intervene side-by-side.

## 6. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 88898 (+2122 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** Agent Skills packages eight slash commands (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/webperf`, `/code-simplify`, `/ship`) that enforce senior-engineer workflows — spec-first, test-driven, atomic commits — inside AI coding agents.

**Why now:** The repo gained 2,122 stars this week, signaling rapid adoption as teams standardize how agents like Claude Code and Cursor handle structured development cycles rather than freeform generation.

**Build with it:** Run `npx skills add addyosmani/agent-skills --skill test-driven-development` inside a Cursor or Claude Code project to enforce red-green-refactor on your next feature branch.

## 7. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 233823 (+3881 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python agent that builds reusable skills from experience, searches past conversations via FTS5, and runs across seven terminal backends (local, Docker, SSH, Modal, and others) with any OpenAI-compatible model endpoint.

**Why now:** The repo crossed 233,000 stars with 3,881 added this week, signaling a sharp spike in builder attention likely tied to its public launch on Nous Research's hosted portal.

**Build with it:** Point it at your own model endpoint via `hermes model`, then wire the Telegram gateway to a Modal backend so the agent runs serverless and hibernates between sessions at near-zero cost.

## 8. santifer/career-ops

https://github.com/santifer/career-ops · ★ 67183 (+3474 this week) · ai, ai-agent, anthropic, ats, automation, beginner-friendly, career, careerops, claude, claude-code, cli, first-timers-only, golang, good-first-issue, interview-prep, job-application, job-hunting, job-search, open-source, resume

**What it does:** career-ops is an open-source multi-agent system that scans job portals, scores listings A–F (1.0–5.0) against your profile, tailors your CV per application, and tracks the pipeline — all running locally inside AI coding CLIs like Claude Code or Codex.

**Why now:** Business Insider and WIRED both covered it this week, and it hit Trendshift trending with 3,474 stars added in seven days, surfacing it to a builder audience that missed the initial launch.

**Build with it:** Drop your resume and role criteria into the agent config, point it at a job board, and use the structured rubric output as a filter stage before any human review time is spent.

## 9. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 108978 (+3051 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify maps any codebase — including docs, SQL schemas, configs, and PDFs — into a queryable knowledge graph using local, deterministic AST parsing via Tree-sitter, with every edge explained and no vector store required.

**Why now:** The project is a YC S26 company with early platform access open ahead of a public v1 launch, making this the window to shape usage patterns before the API surface locks.

**Build with it:** Type `/graphify` inside Claude Code or Cursor to generate a knowledge graph of your repo, then query cross-file relationships that grep and symbol search miss.

## 10. Wei-Shaw/sub2api <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Wei-Shaw/sub2api · ★ 38431 (+1513 this week) · 2api, antigravity2api, cc2api, claude, claude-code, codex, crs, crs2, gemini

**What it does:** Sub2API is an open-source gateway that pools Claude, OpenAI, Gemini, and Grok subscriptions into a single API endpoint with shared quota distribution across users.

**Why now:** The repo gained 1,513 stars this week, tracking alongside sustained developer interest in Claude Code and Codex as cost-splitting infrastructure for team AI tooling.

**Build with it:** Point Claude Code's API base URL at a self-hosted Sub2API instance to share a single Anthropic subscription across multiple developers via Docker Compose.
