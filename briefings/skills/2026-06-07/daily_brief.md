# Skill Tastemakers — Daily Brief — 2026-06-07

_Ranking: bootstrap_total_stars · 10 repos · generated 2026-06-07T16:25:53.136Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_total_stars`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. manaflow-ai/cmux

https://github.com/manaflow-ai/cmux · ★ 21355 (★ 21355 total) · amp, claude-code, codex, gemini, ghostty, opencode, terminal, tmux

**What it does:** cmux is a macOS terminal built on Ghostty that adds vertical tabs, split panes, a built-in browser, and notification rings specifically designed to manage multiple AI coding agents (Claude Code, Codex, Gemini) running simultaneously without losing track of which one needs your input.

**Why now:** With Claude Code's teammate/multi-agent mode gaining traction, the bottleneck has shifted from writing code to supervising parallel agents — cmux directly targets that workflow with a single `cmux claude-teams` command that spawns teammates as native splits with no tmux configuration required.

**Build with it:** Use cmux as the shell layer for a multi-agent orchestration setup — pipe agent stdout through its notification API to surface blocking prompts, use the scriptable in-app browser to let agents interact with localhost previews over SSH tunnels, or fork the Swift codebase to add custom sidebar metadata (cost tracking, token counts, task state) per agent pane.

## 2. VoltAgent/awesome-claude-code-subagents

https://github.com/VoltAgent/awesome-claude-code-subagents · ★ 21320 (★ 21320 total) · ai-agent-framework, ai-agent-tools, ai-agents, awesome, awesome-list, claude, claude-ai, claude-code-subagents, claude-subagents, subagents

**What it does:** A curated collection of 154+ specialized Claude Code subagents organized into 10 categories (core development, infrastructure, language specialists, meta-orchestration, etc.) that can be installed globally or per-project to give Claude Code focused personas for specific tasks.

**Why now:** Claude Code's subagent architecture is seeing rapid adoption this week, and having a plug-and-play library of pre-configured specialists removes the friction of writing custom system prompts from scratch.

**Build with it:** Install the meta-orchestration agents alongside domain-specific ones (e.g., `voltagent-infra` + `voltagent-lang`) to wire up a multi-agent pipeline where a planner agent delegates backend, API design, and deployment tasks to specialist subagents automatically.

## 3. Donchitos/Claude-Code-Game-Studios

https://github.com/Donchitos/Claude-Code-Game-Studios · ★ 21090 (★ 21090 total) · ai-agents, ai-assisted-development, anthropic, claude, claude-code, game-design, game-development, gamedev, godot, indie-game-dev, unity, unreal-engine

**What it does:** Claude Code Game Studios installs 49 specialized AI agents into a Claude Code session, organized into a three-tier studio hierarchy (directors, department leads, specialists) with 73 slash-command workflow skills and automated validation hooks that enforce code standards and design review gates.

**Why now:** With 21,000+ stars and active development, this is gaining serious traction as Claude Code's subagent capabilities mature, making structured multi-agent workflows in a single session genuinely practical for the first time.

**Build with it:** Clone the repo, run the setup script, and use `/start` to kick off a new game project — then try using `/design-system` and `/create-epics` to see how the director-tier agents challenge your design decisions before a line of code gets written.

## 4. zarazhangrui/frontend-slides

https://github.com/zarazhangrui/frontend-slides · ★ 20630 (★ 20630 total) · ai-slides, anthropic, claude, claude-code, claude-skill, generative-ui, html, presentation, slides, vibe-coding

**What it does:** Frontend Slides is a Claude Code plugin (and portable `SKILL.md` skill) that turns a text prompt or an existing PowerPoint file into a single self-contained HTML presentation, using a coding agent's frontend skills so non-designers get production-quality slides without writing CSS or JavaScript.

**Why now:** The repo crossed 20,000 stars this week, signaling strong builder momentum around Claude Code plugins and vibe-coded UI generation as practical daily workflows rather than demos.

**Build with it:** Drop it into any Claude Code setup and build a custom slide generator for your team's recurring decks—pitch templates, sprint reviews, client reports—or wire the `SKILL.md` into another agent (Gemini CLI, Kimi Code) to add slide export to an existing documentation or research pipeline.

## 5. AI4Finance-Foundation/FinGPT

https://github.com/AI4Finance-Foundation/FinGPT · ★ 20428 (★ 20428 total) · chatgpt, finance, fingpt, fintech, large-language-models, machine-learning, nlp, prompt-engineering, pytorch, reinforcement-learning, robo-advisor, sentiment-analysis, technical-analysis

**What it does:** FinGPT is an open-source suite of financial large language models built on top of bases like LLaMA2, fine-tuned for tasks including sentiment analysis, market forecasting, and robo-advisory using instruction tuning and LoRA adapters.

**Why now:** With 20,428 stars and active model releases on HuggingFace, FinGPT gives builders a ready alternative to closed, proprietary financial AI APIs that Wall Street firms won't open-source.

**Build with it:** Use the pre-trained FinGPT-Forecaster or sentiment models via HuggingFace to add financial signal generation—stock sentiment scoring, earnings forecasting, or portfolio commentary—into a trading dashboard or investment app without training from scratch.

## 6. Kilo-Org/kilocode

https://github.com/Kilo-Org/kilocode · ★ 19901 (★ 19901 total) · ai, ai-age, ai-coding, ai-developer-tools, chatgpt, claude, cli, gemini, jetbrains, sonnet, vscode, vscode-extension

**What it does:** Kilo is an open-source agentic coding platform that runs inside VS Code, JetBrains, CLI, and Slack, giving developers access to 500+ AI models to generate code, automate tasks, refactor, and control the browser from a single agent.

**Why now:** With 19,901 stars and active development, Kilo recently expanded support across JetBrains and a dedicated CLI (`npm install -g @kilocode/cli`), making it a timely option for teams evaluating multi-IDE AI tooling as the agentic coding space consolidates.

**Build with it:** Use Kilo's custom modes and MCP server marketplace to wire up a multi-step agent that plans architecture, writes and tests code, then deploys—all without leaving your editor or switching between AI providers.

## 7. comet-ml/opik

https://github.com/comet-ml/opik · ★ 19445 (★ 19445 total) · evaluation, hacktoberfest, hacktoberfest2025, langchain, llama-index, llm, llm-evaluation, llm-observability, llmops, open-source, openai, playground, prompt-engineering

**What it does:** Opik is an open-source platform for tracing, evaluating, and optimizing LLM applications—covering RAG pipelines, agentic workflows, and prompt engineering—with integrations for OpenAI, LangChain, and LlamaIndex.

**Why now:** With nearly 20,000 GitHub stars and active Hacktoberfest 2025 participation, Opik is attracting contributors and shipping new features rapidly, making this a good moment to adopt it before the ecosystem solidifies.

**Build with it:** Wire Opik into your existing LLM app to get end-to-end trace visibility, then run automated LLM-as-a-judge evaluations against your prompts to catch regressions before they hit production.

## 8. tirth8205/code-review-graph

https://github.com/tirth8205/code-review-graph · ★ 18180 (★ 18180 total) · ai-coding, claude, claude-code, code-review, graphrag, incremental, knowledge-graph, llm, mcp, python, static-analysis, tree-sitter

**What it does:** `code-review-graph` builds a persistent structural map of your codebase using Tree-sitter, then exposes it via MCP so AI coding tools receive only the relevant context for each review task instead of re-reading entire repos.

**Why now:** With AI coding tools now standard in daily dev workflows, token waste on large-repo reviews is a real cost and latency problem—this project benchmarks 38x–528x token reductions across real codebases, making it immediately practical.

**Build with it:** Wire it into a custom CI pipeline that automatically surfaces dependency-aware review context for every pull request, or extend its MCP tools to power a graph-backed chat interface that answers precise questions about code relationships without full-file retrieval.

## 9. alirezarezvani/claude-skills

https://github.com/alirezarezvani/claude-skills · ★ 17395 (★ 17395 total) · agent-plugins, agent-skills, agentic-ai, ai-coding-agent, anthropic-claude, claude-ai, claude-code, claude-code-plugins, claude-code-skills, claude-skills, codex-skills, coding-agent-plugins, cursor-skills, developer-tools, gemini-cli-skills, openai-codex, openclaw, openclaw-plugins, openclaw-skills, prompt-engineering

**What it does:** A library of 338 modular "skill" packages — each a SKILL.md file plus Python scripts and reference docs — that inject domain expertise (security, compliance, marketing, CFO/CMO personas, research ops) into Claude Code, Codex, Gemini CLI, Cursor, and 10 other AI coding agents.

**Why now:** Gemini CLI launched recently and is listed as a supported target this week, making this one of the first cross-agent skill libraries to explicitly support it alongside Claude Code and Codex in a single install.

**Build with it:** Clone the repo, run the one-line install script for your agent, and wire in a pre-built CFO or CISO persona to give your coding agent real advisory judgment — or strip out a single SKILL.md and use it as the backbone for your own domain-specific agent plugin.

## 10. decolua/9router

https://github.com/decolua/9router · ★ 16729 (★ 16729 total) · ai-agents, ai-gateway, anthropic, chatgpt, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, gemini-cli, llm, llm-gateway, openai, openai-proxy, qwen, token-saver

**What it does:** 9Router is a local proxy server that sits between AI coding tools (Claude Code, Cursor, Cline, Codex) and 40+ model providers, handling automatic fallback across subscription, paid, and free tiers while compressing tool output tokens by 20-40% via its RTK system.

**Why now:** Free tiers from Kiro AI and OpenCode just became viable coding backends, and 9Router's 16K+ stars this month signal developers are actively routing around expensive API costs rather than paying per provider.

**Build with it:** Wire 9Router as a unified OpenAI-compatible endpoint for an internal dev platform that lets your team burn through free quotas first, falls back to cheap models automatically, and gives you a dashboard to track exactly where tokens are being spent across every coding agent you run.
