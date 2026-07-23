# Skill Tastemakers — Daily Brief — 2026-07-23

_Ranking: delta_7d · 10 repos · generated 2026-07-23T15:25:23.985Z_


## 1. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 26576 (+8606 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that exposes 278+ AI providers (90+ free tiers) through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression that cuts usage by 15–95%.

**Why now:** The repo gained 8,606 stars this week, signaling rapid community validation, and the ~1.53B free tokens/month figure gives builders a concrete, audited budget to prototype against without touching a credit card.

**Build with it:** Drop OmniRoute in front of Claude Code, Cursor, or Cline as a local proxy and get automatic failover across Gemini, DeepSeek, Kimi, and GPT-4o mini when any single provider hits its rate limit—keeping CI pipelines and coding agents running uninterrupted.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 27048 (+6592 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source AI Development Environment (ADE) that orchestrates fleets of parallel coding agents—Codex, Claude Code, OpenCode, or Pi—each running in isolated git worktrees, with a unified desktop/mobile interface and Ghostty-class terminal rendering.

**Why now:** The project gained 6,592 stars this week and is trending as a direct open-source alternative to closed orchestration tools, landing as builders increasingly need to manage multiple concurrent AI coding sessions without vendor lock-in.

**Build with it:** Fan a single feature prompt across five agents simultaneously, let them each implement a solution in their own worktree, then diff and merge the winning result—cutting exploration time from hours to minutes on complex refactors or greenfield modules.

## 3. tirth8205/code-review-graph

https://github.com/tirth8205/code-review-graph · ★ 25739 (+6251 this week) · ai-coding, claude, claude-code, code-review, graphrag, incremental, knowledge-graph, llm, mcp, python, static-analysis, tree-sitter

**What it does:** `code-review-graph` builds a persistent structural map of your codebase using Tree-sitter, then serves precise, change-aware context to AI coding tools via MCP so they read only the files and symbols that matter for a given review. Benchmarks show 38x–528x token reductions across real repositories.

**Why now:** The project gained 6,251 stars this week and just shipped v2.1.0 with an 8x token reduction specifically for code reviews, landing as AI coding tool costs and context window abuse become a mainstream pain point for engineering teams.

**Build with it:** Wire it into a CI pipeline using the included GitHub Action to gate PRs with graph-aware AI review that only pulls relevant context, or expose the MCP server to any of the 14 supported platforms—Cursor, Claude Code, Copilot, and others—to give your team a shared, incrementally-updated code intelligence layer without per-query re-indexing.

## 4. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 94391 (+5833 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify turns any codebase—including docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using deterministic tree-sitter AST parsing, with every edge tagged as either directly extracted or inferred, and no vector store required.

**Why now:** The project gained 5,833 stars this week and ships as a `/graphify` skill for Claude Code, Cursor, Codex, and Gemini CLI, landing at the exact moment those AI coding assistants are becoming primary development environments.

**Build with it:** Wire Graphify into your CI pipeline to auto-generate a living knowledge graph of your codebase, then expose it via MCP so your AI assistant can answer precise dependency and call-chain questions without hallucinating file structure.

## 5. langgenius/dify

https://github.com/langgenius/dify · ★ 149957 (+5699 this week) · agent, agentic-ai, agentic-framework, agentic-workflow, ai, automation, claude, genai, gpt, llm, low-code, mcp, nextjs, no-code, openai, orchestration, python, rag, skills, workflow

**What it does:** Dify is an open-source platform for building LLM-powered applications—RAG pipelines, agentic workflows, and multi-model chatbots—with a visual editor, API layer, and self-hosting option so you own your stack.

**Why now:** It gained nearly 5,700 stars this week, likely driven by its newly added MCP (Model Context Protocol) support, making it one of the fastest ways to wire external tools into agentic workflows without writing orchestration glue code from scratch.

**Build with it:** Deploy a self-hosted AI assistant that ingests your internal docs via RAG, routes tasks through an agent with MCP-connected tools, and ships a production API—all without rebuilding the pipeline when you swap underlying models.

## 6. ogulcancelik/herdr

https://github.com/ogulcancelik/herdr · ★ 19830 (+2730 this week) · agent, agent-orchestration, ai, ai-agents, claude-code, cli, codex, coding-agents, developer-tools, devtools, multiplexer, rust, terminal, terminal-multiplexer, terminal-ui, tmux, tui, workspace-manager

**What it does:** herdr is a Rust-based terminal multiplexer purpose-built for running multiple AI coding agents (Claude Code, Codex, etc.) simultaneously, with a socket API that lets agents spawn panes, read output, and coordinate with each other.

**Why now:** It gained 2,730 stars this week, signaling the developer community is actively searching for infrastructure to wrangle parallel agent workflows rather than running them one at a time in isolated terminals.

**Build with it:** Wire herdr's socket API into a CI-style orchestration script that spawns one agent per feature branch, monitors each pane's output for completion signals, and automatically merges finished branches — turning a single prompt into a parallelized coding pipeline.

## 7. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 92332 (+2226 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a prompt skill/plugin that instructs AI coding agents (Claude Code, Cursor, Copilot, and 30+ others) to strip conversational filler from responses, cutting output tokens by 65% while keeping code, commands, and error messages completely intact.

**Why now:** The project spiked to 92,332 stars with 2,226 added this week, signaling that token costs and response verbosity have hit a real pain point for developers running agents in tight loops or high-volume workflows.

**Build with it:** Install the skill as a baseline in any agent-powered dev tool or internal coding assistant to reduce API costs at scale, or fork the prompt logic to experiment with domain-specific compression styles (e.g., terse security audits, one-line PR summaries) tuned for your team's workflow.

## 8. lidge-jun/opencodex <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/lidge-jun/opencodex · ★ 4016 (+2115 this week) · ai-gateway, ai-tools, anthropic, chatgpt, claude, claude-code, codex, codex-cli, deepseek, developer-tools, gemini, grok, kiro, llm, llm-proxy, ollama, openai, openrouter, proxy, typescript

**What it does:** opencodex is a local proxy server that translates OpenAI Codex's Responses API into the format expected by any LLM provider—Claude, Gemini, Grok, DeepSeek, Ollama, and others—with full support for streaming, tool calls, and reasoning tokens in both directions.

**Why now:** The project gained 2,115 stars this week, likely driven by growing frustration with Codex CLI's locked provider model and the rapid cost/capability improvements across non-OpenAI models like Gemini 2.5 and DeepSeek.

**Build with it:** Route your existing Codex CLI or Claude Code workflows to cheaper or faster models without changing your tooling—or build a multi-account Codex session manager that automatically load-balances across ChatGPT accounts to maximize free quota.

## 9. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 88267 (+3770 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces a "laziest senior dev" heuristic—pushing agents toward minimal, already-available solutions like native HTML inputs instead of importing full libraries.

**Why now:** It's pulling 3,770 GitHub stars this week, signaling the developer community is actively pushing back against AI agents that over-engineer and over-spend on tokens.

**Build with it:** Drop the skill into your Claude Code or Cursor setup to cut generated code volume by ~54% on average, reducing both API costs and review burden on any project where AI is writing first drafts.

## 10. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 219349 (+3503 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving, model-agnostic AI agent from Nous Research that builds persistent skills from experience, maintains cross-session memory, and runs across terminals, messaging platforms, and cloud backends from a single install.

**Why now:** The project gained 3,503 stars this week, signaling a surge in developer interest likely tied to growing demand for agents that aren't locked to a single model provider or local machine.

**Build with it:** Use the built-in cron scheduler and Telegram gateway to ship a personal automation agent that learns your workflows over time — or leverage the subagent spawning and RPC tooling to parallelize multi-step pipelines without burning context on coordination overhead.
