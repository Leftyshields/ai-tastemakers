# Skill Tastemakers — Daily Brief — 2026-07-24

_Ranking: delta_7d · 10 repos · generated 2026-07-24T15:06:58.864Z_


## 1. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 28280 (+10310 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that routes requests across 290+ AI providers (90+ free) through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and token compression that can cut usage by 15–95%.

**Why now:** The repo gained 10,310 stars this week, signaling a sharp surge in developer interest—likely driven by tightening rate limits across major providers and the growing cost of running agentic coding tools like Claude Code, Cursor, and Codex.

**Build with it:** Point any OpenAI-compatible tool at OmniRoute's endpoint to get automatic failover across free tiers, then layer on its RTK+Caveman compression to stretch your token budget across long agentic sessions without changing your existing code.

## 2. ComposioHQ/awesome-claude-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ComposioHQ/awesome-claude-skills · ★ 69851 (+4546 this week) · agent-skills, ai-agents, antigravity, automation, claude, claude-code, codex, composio, cursor, developer-tools, gemini-cli, mcp, openai-codex, rube, saas, skill, workflow-automation

**What it does:** Awesome Claude Skills is a curated collection of 1,000+ reusable instruction packages (SKILL.md files) that teach Claude and other coding agents like Cursor, Codex, and Gemini CLI how to handle specific task classes, backed by Composio's MCP Gateway for authenticated access to real-world app integrations.

**Why now:** The repo gained 4,546 stars this week, signaling a rapid community consolidation around a standard format for packaging and sharing agent behaviors across the expanding ecosystem of Claude Code, Codex, and Gemini CLI tools.

**Build with it:** A builder could drop pre-built skills for GitHub issue triage, Slack notifications, or document processing into their agent pipeline in minutes, or contribute a new SKILL.md to standardize a repeatable workflow—like auto-generating PR summaries or syncing CRM data—across any MCP-compatible agent.

## 3. stablyai/orca

https://github.com/stablyai/orca · ★ 28099 (+7643 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source Agent Development Environment (ADE) that lets you run multiple coding agents (Claude Code, Codex, OpenCode) in parallel, each isolated in its own git worktree, with a unified desktop/mobile interface for monitoring and steering them.

**Why now:** The project gained 7,643 stars this week, signaling rapid community adoption at a moment when parallel agentic workflows are becoming a practical engineering pattern rather than a demo novelty.

**Build with it:** Fan a single feature prompt across five agents simultaneously, diff their outputs, and merge the winning branch—then monitor progress and send follow-up instructions from your phone while the agents run on your VPS.

## 4. tirth8205/code-review-graph

https://github.com/tirth8205/code-review-graph · ★ 26133 (+6645 this week) · ai-coding, claude, claude-code, code-review, graphrag, incremental, knowledge-graph, llm, mcp, python, static-analysis, tree-sitter

**What it does:** `code-review-graph` builds a persistent, incremental knowledge graph of your codebase using Tree-sitter, then exposes it via MCP so AI coding tools pull only the relevant context instead of re-reading entire repos on every review.

**Why now:** The project jumped 6,645 stars this week, signaling strong developer validation of the core idea—and it already supports 14 platforms including Claude Code, Cursor, Windsurf, and the newly released Kiro and Gemini CLI.

**Build with it:** Wire it into a CI pipeline via its GitHub Action to automatically scope AI review context to only the files changed in a PR, slashing token costs on large monorepo workflows without changing your existing toolchain.

## 5. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 95030 (+6472 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus docs, PDFs, SQL schemas, and configs—into a queryable knowledge graph using deterministic tree-sitter AST parsing locally, with every graph edge tagged as either directly extracted or inferred so you know exactly what the tool read versus reasoned.

**Why now:** The project surged to 95,030 stars with 6,472 added this week, and its native `/graphify` skill integrates directly into Claude Code, Cursor, Codex, and Gemini CLI—all platforms seeing heavy adoption right now as developers shift to agentic coding workflows.

**Build with it:** Drop `/graphify` into a large legacy codebase to instantly generate a structured map of function calls, dependencies, and doc relationships, then query that graph to power refactoring agents, automated code review tools, or onboarding assistants that answer "how does X connect to Y" without hallucinating file paths.

## 6. langgenius/dify

https://github.com/langgenius/dify · ★ 150105 (+5847 this week) · agent, agentic-ai, agentic-framework, agentic-workflow, ai, automation, claude, genai, gpt, llm, low-code, mcp, nextjs, no-code, openai, orchestration, python, rag, skills, workflow

**What it does:** Dify is an open-source platform for building agentic workflows and RAG pipelines, offering a visual editor, broad LLM support (GPT, Claude, etc.), and MCP integration that lets teams deploy AI apps to cloud, VPC, or self-hosted environments without rebuilding infrastructure between stages.

**Why now:** Dify hit 150K GitHub stars this week with nearly 6K new stars in seven days, signaling a sharp surge in adoption at a moment when teams are actively moving from AI prototypes to production-grade agentic systems.

**Build with it:** A builder could wire together a multi-step research agent—combining web search, a vector knowledge base, and a Claude or GPT model—then expose it as a REST API or embedded chat widget in under an hour, without writing orchestration boilerplate.

## 7. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 88830 (+4333 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that installs a "laziest senior dev" persona, steering the agent toward minimal solutions—replacing over-engineered implementations with native browser primitives, stdlib calls, or nothing at all.

**Why now:** It's trending at +4,333 stars this week, likely surfacing as teams running Claude Code on real codebases notice token costs and bloated diffs piling up; the benchmarks show a measurable 54% LOC reduction and 20% cost drop on a real FastAPI + React project.

**Build with it:** Drop the skill into your Claude Code or Cursor setup and run it against any feature backlog to audit which tickets your agent is over-building—use the included benchmark harness to measure before/after diffs on your own repo and set a team-wide "complexity budget" for AI-generated PRs.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 219861 (+4015 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is an open-source, self-improving AI agent from Nous Research that builds persistent skills from experience, maintains cross-session memory, and runs on any model or infrastructure—from a $5 VPS to serverless GPU clusters.

**Why now:** The project gained over 4,000 stars this week, signaling rapid community traction, and its compatibility with the open agentskills.io standard makes it a timely entry point as the ecosystem around reusable agent skills solidifies.

**Build with it:** Use the built-in subagent spawning and cron scheduler to ship autonomous workflows—nightly data pipelines, multi-step research agents, or Telegram bots—that learn and improve across runs without manual prompt engineering.

## 9. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 60237 (+1919 this week) · ai, ai-agents, ai-prompts, anthropic, chatbot, chatgpt, claude, claude-code, codex, cursor, gemini, generative-ai, google, grok, llm, openai, prompt, prompt-engineering, system-prompt, system-prompts

**What it does:** This repository collects and publishes verbatim system prompts extracted from major AI products — Claude, ChatGPT, Gemini, Grok, Cursor, and others — updated regularly as new model versions ship.

**Why now:** Claude Fable 5, Opus 4.8, Sonnet 5, GPT-5.6, and Claude Design (with 53 tools and 22 skills) all dropped system prompts this month, making this the most current public reference for how frontier models are actually instructed.

**Build with it:** Use the prompts as blueprints to reverse-engineer persona design, tool-calling patterns, and safety framing for your own agents — or diff prompts across model versions to track how Anthropic and OpenAI are quietly shifting model behavior over time.

## 10. iOfficeAI/OfficeCLI

https://github.com/iOfficeAI/OfficeCLI · ★ 21850 (+3622 this week) · agent, ai, claude-code, cli, codex, docx, excel, office, openclaw, pptx, presentation, skills, word, xlsx

**What it does:** OfficeCLI is a single binary, dependency-free CLI that lets AI agents programmatically create, read, and edit Word, Excel, and PowerPoint files, with a built-in HTML/PNG rendering engine so agents can visually verify what they produced.

**Why now:** It gained 3,622 stars this week, signaling a sharp surge in developer interest around giving coding agents (Claude Code, Cursor, Copilot) reliable, native Office file manipulation without shelling out to expensive APIs or requiring a local Office install.

**Build with it:** Drop the skill file into any AI coding agent and build automated document pipelines — generated sales reports, client proposals, or data-populated spreadsheets triggered by code, APIs, or natural language with no manual formatting step.
