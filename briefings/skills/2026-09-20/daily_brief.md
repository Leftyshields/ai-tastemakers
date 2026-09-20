# Skill Tastemakers — Daily Brief — 2026-09-20

_Ranking: delta_7d · 10 repos · generated 2026-09-20T16:48:52.444Z_


## 1. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 263470 (+6575 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness optimization layer that adds skills, memory, security (via `ecc-agentshield`), and research-first workflows to AI coding agents like Claude Code, Codex, Cursor, and Opencode.

**Why now:** The repo is trending on GitHub this week with over 6,500 new stars, coinciding with accelerating adoption of Claude Code as a primary development environment.

**Build with it:** Install `ecc-universal` from npm and drop the generated config into your Claude Code project to immediately add structured memory and instinct layers to your existing agent sessions.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 142927 (+6519 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt skill / agent configuration layer that makes AI coding agents (Claude Code, Cursor, etc.) default to the minimal viable implementation — preferring native browser APIs over installed libraries, one-liners over wrapper components, and nothing over something.

**Why now:** The project hit Hacker News this week (98 points, 17 comments) alongside a new agentic benchmark showing a mean ~54% token reduction across 12 real feature tasks against a fair baseline.

**Build with it:** Drop the published npm package (`@dietrichgebert/ponytail`) into your Claude Code skill configuration and immediately test it against a UI feature request — like a date picker — to see whether the agent reaches for a native `<input type="date">` instead of installing flatpickr.

## 3. stablyai/orca

https://github.com/stablyai/orca · ★ 73340 (+6172 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE that runs Codex, Claude Code, OpenCode, or Pi in parallel git worktrees, letting you fan one prompt across multiple agents and merge the winning result.

**Why now:** The project hit Hacker News this week as an open-source "Conductor + Ghostty" alternative, drawing early builder attention around its terminal and orchestration combination.

**Build with it:** Point Orca at an existing repo, split it into parallel worktrees from the UI, and run the same refactor prompt across three agents simultaneously to compare diffs before merging.

## 4. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 83758 (+4124 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) authenticated read/search access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paying for platform APIs or writing scraper code.

**Why now:** The repo hit GitHub Trending #1 this week with 4,124 new stars, signaling a sharp uptick in builders hitting the same wall — agents that can reason but can't fetch platform-locked content.

**Build with it:** Point your MCP-compatible agent at Agent Reach's CLI to let it pull YouTube transcripts or Reddit threads as clean text, replacing brittle custom scrapers in one config change.

## 5. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 97521 (+3835 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** A set of 25 slash-command skills (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`, and more) that enforce senior-engineer workflows — spec-first design, TDD, atomic commits, quality gates — inside AI coding agents like Claude Code, Cursor, and Codex.

**Why now:** The repo gained 3,835 stars this week, signaling a spike in developer interest likely tied to the growing adoption of agentic coding tools where unguided agents skip planning and testing steps.

**Build with it:** Run `npx skills add addyosmani/agent-skills --skill test-driven-development` to drop the red-green-refactor skill directly into your existing agent and enforce TDD on your next feature.

## 6. AgriciDaniel/claude-seo

https://github.com/AgriciDaniel/claude-seo · ★ 17291 (+510 this week) · ai, ai-seo, claude-code, claude-code-skill, marketing-automation, open-source, seo

**What it does:** Claude SEO is an open-source Claude Code skill that runs 25 sub-skills and 18 specialist agents in parallel across technical SEO, E-E-A-T, Schema.org, GEO/AEO, local, e-commerce, and international SEO, producing a prioritized action plan with falsifiability checks grounded in Google's primary-source documentation.

**Why now:** The repo gained 510 stars this week, coinciding with growing builder interest in AI-search optimization workflows aligned with Google's published AI Optimization Guide.

**Build with it:** Drop the skill into an existing Claude Code project and invoke `/seo audit` on a client domain to get a scored, agent-generated report you can deliver before writing a proposal.

## 7. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 68499 (+3339 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted AI gateway that exposes a single OpenAI-compatible endpoint across 352 providers (150+ free tiers), with quota-aware auto-fallback and RTK+Caveman token compression saving 15–95% per request.

**Why now:** The repo gained 3,339 stars this week and crossed 68K total, signaling a sharp spike in builder attention likely tied to rising API costs as Claude and GPT-4o pricing pressures mount.

**Build with it:** Point Claude Code or Cursor's OpenAI-compatible base URL at your local OmniRoute instance and let the 19 routing strategies automatically drain free-tier quotas before touching paid keys.

## 8. blader/humanizer

https://github.com/blader/humanizer · ★ 50549 (+3335 this week) · agent-skills, ai-writing, claude-code, codex, cursor, prompt-engineering, writing-tools

**What it does:** Humanizer is an agent skill that detects 25 named AI-writing patterns and rewrites flagged text to read like a specific person wrote it, without altering facts or inventing details.

**Why now:** With 3,335 stars added this week, it's seeing a sharp surge in adoption at the same moment AI-generated prose is becoming a documented liability in publishing and technical documentation.

**Build with it:** Drop it into Claude Code via `/plugin marketplace add blader/humanizer` and pipe your docs folder through `/humanizer docs/` to strip AI tells from release notes or technical write-ups before shipping.

## 9. FailproofAI/failproofai

https://github.com/FailproofAI/failproofai · ★ 4464 (+3297 this week) · agent-failure, agent-harness, agent-observability, agent-reliability, agent-tracing, ai-agent, claude-code, codex, enforcement, evals, guardrails, hermes, hooks, llm, llm-failures, llm-observability, npm-package, observability, openclaw, reliability

**What it does:** Failproof hooks into 12 agent harnesses — including Claude Code, OpenAI Codex, and chat gateways like Hermes and OpenClaw — to capture every tool call and block dangerous ones before execution using 39 built-in policies, all running locally with no added latency.

**Why now:** The repo gained 3,297 stars this week, signaling a sharp spike in developer attention likely tied to the current wave of Claude Code and Codex CLI adoption where unguarded tool execution is an active concern.

**Build with it:** Install the `failproofai` npm package, point it at your Claude Code sessions, and use the policy API to block specific tool calls — validating enforcement before you write any custom guardrail logic.

## 10. citrolabs/ego-lite

https://github.com/citrolabs/ego-lite · ★ 16275 (+491 this week) · agent-skills, ai-agent, automation, browser, browser-automation, claude-code, codex, hermes-agent, skills, skills-sh

**What it does:** ego lite is a macOS browser that gives AI agents (Codex, Claude Code, etc.) isolated "Spaces" to run web automation tasks in parallel with your own browsing, sharing your real logins and cookies via the `ego-browser` skill without handing over control of your browser.

**Why now:** The repo gained 491 stars this week and sits in the Trendshift trending chart, coinciding with active Codex and Claude Code adoption cycles where browser access for agents is a common friction point.

**Build with it:** Run `npx skills add citrolabs/ego-lite` to drop the `ego-browser` skill into your Claude Code or Codex agent's skills directory, then prompt it to open a browser task — it auto-installs the app on first run.
