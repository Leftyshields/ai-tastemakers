# Skill Tastemakers — Daily Brief — 2026-07-29

_Ranking: delta_7d · 10 repos · generated 2026-07-29T15:20:17.379Z_


## 1. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 33819 (+9202 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that routes requests across 290+ AI providers (90+ free) through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman compression that cuts token usage by 15–95%.

**Why now:** The project gained 9,202 stars this week, signaling rapid adoption, and its aggregated free tier budget of ~1.53B tokens/month makes it immediately practical as AI API costs climb.

**Build with it:** Drop OmniRoute in front of Claude Code, Cursor, or Cline to get automatic failover across free tiers—meaning your coding agent keeps running when any single provider hits rate limits, at zero marginal cost.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 32480 (+6702 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source Agent Development Environment (ADE) that lets you run multiple coding agents (Codex, Claude Code, OpenCode, or Pi) in parallel, each isolated in its own git worktree, with a unified desktop/mobile UI and Ghostty-class terminal splits for monitoring and steering them.

**Why now:** The repo jumped 6,700+ stars this week, signaling rapid community adoption at the exact moment parallel agentic coding workflows are becoming a practical daily practice rather than a novelty.

**Build with it:** Fan a single feature prompt across five agents simultaneously, compare their implementations in isolated worktrees, merge the winner, and monitor progress from your phone via the mobile companion app — cutting exploration time on complex features dramatically.

## 3. ComposioHQ/awesome-claude-skills

https://github.com/ComposioHQ/awesome-claude-skills · ★ 71248 (+5943 this week) · agent-skills, ai-agents, antigravity, automation, claude, claude-code, codex, composio, cursor, developer-tools, gemini-cli, mcp, openai-codex, rube, saas, skill, workflow-automation

**What it does:** Awesome Claude Skills is a curated collection of 1,000+ reusable instruction packages (SKILL.md files) that teach Claude and other coding agents like Cursor, Codex, and Gemini CLI how to handle specific task classes, paired with Composio's MCP Gateway for connecting those skills to real-world app actions across 1,000+ integrations.

**Why now:** The repo gained nearly 6,000 stars this week, signaling rapid adoption as Claude Code and competing CLI agents mature into production workflows where reusable, shareable skill primitives are becoming a standard pattern.

**Build with it:** Drop a SKILL.md into your Claude Code project to give any agent a repeatable, version-controlled workflow—then wire it to Composio's MCP endpoint to have that agent actually send Slack messages, create GitHub issues, or trigger automations without writing custom auth or integration code.

## 4. ogulcancelik/herdr

https://github.com/ogulcancelik/herdr · ★ 22275 (+2865 this week) · agent, agent-orchestration, ai, ai-agents, claude-code, cli, codex, coding-agents, developer-tools, devtools, multiplexer, rust, terminal, terminal-multiplexer, terminal-ui, tmux, tui, workspace-manager

**What it does:** Herdr is a Rust-based terminal multiplexer that lets you run multiple AI coding agents (Claude Code, Codex, etc.) simultaneously in split panes, with sessions that persist through detachment and restarts via a pure socket API.

**Why now:** It gained 2,865 stars this week, signaling a wave of developers hitting the coordination bottleneck of managing parallel AI agents across separate terminals and losing context on long-running tasks.

**Build with it:** Wire Herdr's socket API into your own agent orchestration pipeline so agents can programmatically spawn panes, poll output, and gate on each other's completion—turning a single coding session into a self-coordinating multi-agent workspace.

## 5. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 98216 (+4571 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using deterministic tree-sitter AST analysis locally, then exposes it as a `/graphify` skill inside Claude Code, Cursor, Codex, and Gemini CLI with every graph edge labeled as either explicitly extracted or inferred.

**Why now:** The project gained 4,571 stars this week, signaling strong developer momentum as AI coding assistants become standard workflow tools and teams need structured code intelligence that doesn't leak proprietary source to vector stores.

**Build with it:** Wire Graphify into your internal developer platform to give engineers a queryable map of a large legacy monorepo—letting an AI agent answer "what calls this function" or "which services depend on this schema" without grepping through thousands of files.

## 6. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 94233 (+2237 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a prompt skill/plugin that instructs AI coding agents (Claude Code, Cursor, Copilot, and 30+ others) to strip filler language from responses while keeping code and technical content intact, cutting output token counts by roughly 65%.

**Why now:** The project is trending hard this week with 2,237 new stars, hitting at a moment when developers running agentic coding workflows at scale are directly paying for or rate-limited by output token volume.

**Build with it:** A builder running Claude Code or Cursor on long refactoring sessions could install the one-line script, measure their actual token spend before and after using the API usage dashboard, and layer the caveman prompt style into a custom team CLAUDE.md to enforce it across an entire engineering org.

## 7. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 91469 (+3750 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces YAGNI-style minimalism—prompting the agent to reach for the simplest possible solution before writing new code, averaging 54% fewer lines of code across real tasks.

**Why now:** It hit 91,000+ stars this week with 3,750 added, and its agentic benchmark (not a single-shot prompt test) just dropped with reproducible results against a real FastAPI + React codebase—giving builders actual data to justify adding it to their workflow.

**Build with it:** Drop the skill into your Claude Code or Cursor setup to cut token costs ~20% and generation time ~27% on feature work; particularly useful if you're scaffolding a new product and want an agent that defaults to `<input type="date">` instead of installing a datepicker library.

## 8. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 54940 (+1829 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** An AI agent skill that searches Reddit, X, YouTube, TikTok, HN, Polymarket, and the web in parallel, scores results by real engagement signals (upvotes, likes, real-money prediction markets), and synthesizes a grounded summary of any topic or person from the last 30 days.

**Why now:** It hit #1 on GitHub Trending this week with nearly 55k stars and 1,800+ stars added in seven days, signaling a breakout moment for bring-your-own-keys agent tooling that bridges platform walled gardens no single AI can access natively.

**Build with it:** Drop the skill into Claude Code, Cursor, or any of 50+ agent hosts to power pre-meeting research tools, trend dashboards, or competitive intelligence pipelines that pull living, engagement-ranked signal instead of stale indexed pages.

## 9. img2threejs/img2threejs

https://github.com/img2threejs/img2threejs · ★ 8032 (+3621 this week) · 3d, ai-agents, claude-code, computer-graphics, generative, image-to-3d, procedural-generation, threejs, typescript, webgl

**What it does:** img2threejs takes a reference image and reconstructs the object as runnable Three.js TypeScript code built entirely from primitives, procedural shaders, and generated geometry — no mesh files, no photogrammetry, no asset downloads.

**Why now:** The repo gained 3,621 stars this week alone and is trending at the top of GitHub across all languages, signaling a sharp spike in developer interest around code-native 3D generation as an alternative to heavy mesh pipelines.

**Build with it:** Drop in a product photo, weapon skin, or mechanical object and get an animation-ready, orbiteable 3D model that runs in the browser — useful for e-commerce previews, game asset prototyping, or building an image-to-interactive-3D pipeline on top of Claude or any vision model.

## 10. palmier-io/palmier-pro

https://github.com/palmier-io/palmier-pro · ★ 12724 (+1802 this week) · ai-video, claude, macos, mcp, seedance2, swift, video-editor

**What it does:** Palmier Pro is an open-source macOS video editor built in Swift that lets you and AI agents collaboratively edit timelines, with built-in generative video/image models (Seedance, Kling) and an MCP server that any Claude, Codex, or Cursor agent can connect to at localhost.

**Why now:** It gained 1,802 stars this week and requires macOS 26 (Tahoe), Apple's just-announced OS, making it one of the first serious open-source apps targeting that platform as developers explore what's newly possible on Apple Silicon.

**Build with it:** Wire Claude Code to the MCP endpoint and script automated video edits—generate b-roll, splice clips, and export finished sequences entirely from agent prompts without touching a GUI.
