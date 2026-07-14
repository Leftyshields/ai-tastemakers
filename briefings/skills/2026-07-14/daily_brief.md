# Skill Tastemakers — Daily Brief — 2026-07-14

_Ranking: delta_7d · 10 repos · generated 2026-07-14T15:04:27.783Z_


## 1. iOfficeAI/OfficeCLI

https://github.com/iOfficeAI/OfficeCLI · ★ 16526 (+8123 this week) · agent, ai, claude-code, cli, codex, docx, excel, office, openclaw, pptx, presentation, skills, word, xlsx

**What it does:** OfficeCLI is an open-source, single-binary CLI tool that lets AI agents create, read, and edit `.docx`, `.xlsx`, and `.pptx` files without requiring Microsoft Office, using a built-in HTML rendering engine so agents can visually verify their output.

**Why now:** It gained 8,000+ GitHub stars this week and landed on Hacker News, signaling fast community uptake at the exact moment AI coding agents like Claude Code and Cursor are becoming standard dev tools.

**Build with it:** Drop the skill file into your agent's context and wire OfficeCLI into any document-heavy workflow — automated report generation, spreadsheet pipelines, or slide decks built entirely from structured data with no human formatting step.

## 2. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 78216 (+7716 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** Agent Skills is a collection of 24 slash-command-driven workflows (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`, etc.) that encode senior-engineer practices—TDD, atomic commits, five-axis code review, web performance audits—into reusable skills any AI coding agent can follow consistently.

**Why now:** The repo gained 7,716 stars this week and is trending #1 on Trendshift, driven by a blog post generating 376 HN points and 212 comments, landing right as Claude Code, Cursor, and Codex all support installable plugin/skill ecosystems simultaneously.

**Build with it:** Install all 24 skills into your agent in one command (`npx skills add addyosmani/agent-skills`), then use `/build auto` to let the agent generate a plan, implement every task test-first, and commit each slice autonomously—pausing only on failures—while you stay in the reviewer seat rather than the driver seat.

## 3. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 85818 (+7263 this week) · antigravity, claude-code, codex, gemini, graphrag, knowledge-graph, leiden, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase, SQL schema, docs, or media into a queryable knowledge graph using tree-sitter AST for code (fully local, no LLM) and your configured model for semantic passes on unstructured content, with every edge tagged as `EXTRACTED` or `INFERRED` so you know exactly what was read versus resolved.

**Why now:** The project gained 7,263 stars this week and sits at 85,818 total, signaling a wave of adoption among developers integrating it as a `/graphify` skill directly inside Claude Code, Codex, Cursor, and Gemini CLI workflows.

**Build with it:** Drop it into a monorepo to build a cross-layer impact analysis tool that traces a schema column change through ORM models, API handlers, and downstream SQL views in a single graph query rather than a manual grep chain.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 82886 (+7160 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces a "laziest senior dev" heuristic—pushing the agent to delete or avoid code rather than generate it, favoring native browser/platform primitives and YAGNI principles.

**Why now:** It's trending at +7,160 stars this week, likely surfacing alongside the rapid adoption of agentic coding tools where runaway code generation is a real cost and complexity problem.

**Build with it:** Drop the skill/plugin into your Claude Code or Cursor setup to immediately cut token spend and diff size on greenfield features—especially useful if you're scaffolding a new SaaS or internal tool where accumulated over-engineering compounds fast.

## 5. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 57641 (+6598 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** This repo collects and publishes extracted system prompts from major AI products—Claude, ChatGPT, Gemini, Grok, Copilot, and others—updated regularly as new model versions ship.

**Why now:** The repo gained 6,598 stars this week, driven by fresh leaks including GPT-5.6, Claude Sonnet 5, and Kimi K2.6 prompts, giving builders a rare side-by-side look at how frontier labs are actually instructing their models right now.

**Build with it:** Use the prompts as reference architecture to design your own system prompts—study how Anthropic structures tool definitions across 48 tools in Claude Design, or reverse-engineer OpenAI's safety framing in GPT-5.6 to inform guardrails in your own agent.

## 6. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 117148 (+3245 this week) · ai-tools, claude-code, codex, desktop-app, hermes, hermes-agent, mcp, minimax, omo, open-source, openclaw, openclaw-ui, opencode, provider-management, rust, skills, skills-management, tauri, typescript, wsl-support

**What it does:** CC Switch is a Tauri-built desktop app that centralizes management of multiple AI coding agents—Claude Code, Codex, Gemini CLI, OpenCode, OpenClaw, and Hermes Agent—along with their API providers, MCP servers, and account switching from one interface.

**Why now:** It hit 117K stars with 3,245 added this week, signaling a sharp spike in developer interest as teams juggle increasingly fragmented AI coding toolchains across multiple providers.

**Build with it:** A builder could use CC Switch as a foundation or reference architecture for multi-agent orchestration UIs—specifically borrowing its Rust/Tauri patterns for cross-platform credential management, provider switching logic, and WSL support to ship their own agent management tooling fast.

## 7. stablyai/orca

https://github.com/stablyai/orca · ★ 18922 (+6159 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source Agent Development Environment (ADE) that lets you run multiple coding agents (Claude Code, Codex, OpenCode, Pi) in parallel, each isolated in its own git worktree, with a mobile companion app for monitoring and steering them remotely.

**Why now:** It gained 6,159 GitHub stars this week, signaling a breakout moment as developers scramble for tooling that manages fleets of agents rather than single-session AI pair programming.

**Build with it:** Fan a single feature prompt across five parallel agents, diff their implementations against each other, merge the winning branch, and get a push notification on your phone when each finishes — cutting exploratory coding cycles from hours to minutes.

## 8. router-for-me/CLIProxyAPI <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/router-for-me/CLIProxyAPI · ★ 41841 (+2487 this week) · antigravity, claude-code, cluade, codex, gemini, openai

**What it does:** CLIProxyAPI is a Go-based proxy server that wraps CLI tools like Claude Code, Codex, Antigravity, and Grok Build behind standard OpenAI, Gemini, and Claude-compatible API interfaces, letting you access frontier models programmatically without direct API billing.

**Why now:** The project gained 2,487 stars this week alongside the availability of new model versions including GPT-5.6, Claude Fable 5, Gemini 3.5 Flash, and Grok 4.5, making it a live aggregation point for the current generation of flagship models.

**Build with it:** Route your existing OpenAI SDK–based app through this proxy to A/B test responses across GPT-5.6, Claude Fable, and Gemini 3.5 Flash without changing client code, or use multi-account pooling to increase throughput on free or subscription-tier CLI accounts.

## 9. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 17192 (+4794 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, gemini-cli, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hostable TypeScript gateway that exposes a single OpenAI-compatible endpoint routing requests across 250+ AI providers, including 90+ free tiers, with automatic fallback and RTK+Caveman token compression that cuts token usage by up to 95%.

**Why now:** The project gained nearly 5,000 stars this week, signaling rapid adoption at a moment when API costs and rate limits are actively blocking developer workflows across Claude Code, Cursor, Codex, and Copilot.

**Build with it:** Point any OpenAI-compatible tool at your local OmniRoute instance to get free, uninterrupted inference with zero code changes—or build a cost-aware multi-model agent that automatically degrades to cheaper providers when quotas are hit.

## 10. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 63356 (+4753 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a set of portable agent skills (markdown instruction files) that you drop into Codex, Cursor, or Claude Code to enforce opinionated layout, typography, spacing, and motion rules, steering AI code generation away from generic-looking UIs toward polished frontends.

**Why now:** It gained 4,753 stars this week, likely riding the wave of Codex's public launch and the broader shift toward agentic coding workflows where prompt-level design constraints are becoming a real bottleneck.

**Build with it:** Run `npx skills add https://github.com/Leonxlnx/taste-skill` to inject the design skill into your agent workflow, then use the image-generation skills to produce reference boards in ChatGPT Images and hand those frames directly to your coding agent as visual specs.
