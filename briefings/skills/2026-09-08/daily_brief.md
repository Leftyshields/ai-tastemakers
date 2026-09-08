# Skill Tastemakers — Daily Brief — 2026-09-08

_Ranking: delta_7d · 10 repos · generated 2026-09-08T17:16:25.934Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 131938 (+13787 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an agent skill (npm: `@dietrichgebert/ponytail`) that injects a YAGNI-first coding persona into AI agents like Claude Code and Cursor, pushing them to reach for native browser APIs and existing code before installing dependencies or generating boilerplate.

**Why now:** It hit Hacker News this week (98 points, 17 comments) alongside a published agentic benchmark showing ~54% mean token reduction across 12 real feature tasks against a fair baseline.

**Build with it:** Drop it into an existing Claude Code or Cursor setup as a skill/rules file and run it against a feature branch to audit how much your agent over-builds.

## 2. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 253970 (+8844 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness optimization system that adds skills, memory, instincts, and security layers to AI coding agents like Claude Code, Codex, Cursor, and Opencode.

**Why now:** The repo gained nearly 9,000 stars this week, signaling a sharp spike in adoption as Claude Code usage accelerates across developer workflows.

**Build with it:** Install the `ecc-universal` npm package and drop it into an existing Claude Code project to immediately layer in ECC's memory and instinct configurations.

## 3. blader/humanizer

https://github.com/blader/humanizer · ★ 45310 (+6063 this week) · agent-skills, ai-writing, claude-code, codex, cursor, prompt-engineering, writing-tools

**What it does:** Humanizer is an agent skill (installable via `npx skills add blader/humanizer --global`) that rewrites AI-generated text by detecting 25 named patterns—staged run-ups, dramatic fragments, hollow sayings—and removing them without altering factual content.

**Why now:** The repo gained 6,063 stars this week and surfaced twice on Hacker News, signaling a spike in builder interest around AI-writing detection at exactly the moment AI-generated copy is flooding docs, launch posts, and changelogs.

**Build with it:** Drop it into Claude Code with `/plugin marketplace add blader/humanizer` and pipe your draft release notes through `/humanizer:humanizer` as a pre-publish step to catch AI tells before they ship.

## 4. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 115969 (+2988 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify turns any codebase—plus its docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using local deterministic AST parsing via Tree-sitter, with no vector store required.

**Why now:** The repo is trending on Trendshift and gaining ~3k stars this week, coinciding with early access opening on app.graphify.com ahead of the public v1 launch.

**Build with it:** Type `/graphify` inside Claude Code or Cursor to instantly expose your project's AST-derived knowledge graph as an MCP skill you can query for code relationships instead of grepping.

## 5. stablyai/orca

https://github.com/stablyai/orca · ★ 64149 (+5869 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile AI orchestration environment that runs Codex, Claude Code, OpenCode, or Pi side-by-side in isolated git worktrees, letting you fan one prompt across multiple agents and merge the best result.

**Why now:** The repo gained nearly 6,000 stars this week, signaling a sharp spike in builder interest likely tied to the current wave of agentic coding tool adoption.

**Build with it:** Point Orca at an existing repo, spawn three parallel worktrees with the same feature prompt across Codex and Claude Code, then diff the outputs to pick a winner without touching your main branch.

## 6. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 34273 (+5233 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** Diagram Design is a Claude Code skill that generates 39 editorial HTML+SVG diagram types — architecture, flowchart, Sankey, Wardley map, UML class, and more — self-contained, no build step, no generic rounded-box defaults.

**Why now:** The repo gained 5,233 stars this week, coinciding with the v2.5.10 release that added ten new layout grammars including Wardley maps and database schema diagrams.

**Build with it:** Drop the skill into a Claude Code session and point it at an existing draw.io or Mermaid file to redraw it at a chosen format and detail level — skipping Figma entirely.

## 7. headroomlabs-ai/headroom

https://github.com/headroomlabs-ai/headroom · ★ 70673 (+2480 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context-compression layer that shrinks tool outputs, logs, RAG chunks, and conversation history before they hit the LLM — 20–95% fewer tokens depending on content type — via a Python/TypeScript library, an OpenAI-compatible proxy, or a one-command agent wrapper.

**Why now:** The repo hit #1 Repository of the Day on Trendshift and gained 2,480 stars this week, signaling a surge of builder attention around context-window cost as long-context agent sessions become the norm.

**Build with it:** Drop `headroom proxy --port 8787` in front of any existing OpenAI-compatible agent and get immediate token reduction with zero code changes.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 243351 (+4421 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving AI agent with a closed learning loop — it creates and refines skills from task experience, maintains cross-session memory via FTS5 search and LLM summarization, and runs across seven terminal backends (local, Docker, SSH, Modal, Vercel Sandbox, and more) with multi-platform messaging via Telegram, Discord, Slack, and others.

**Why now:** The repo crossed 243,000 stars with 4,400 added this week, signaling a sharp spike in builder attention coinciding with the public availability of the Hermes Desktop interface and agentskills.io open standard support.

**Build with it:** Point `hermes model` at your own OpenAI-compatible endpoint, then trigger a complex task to watch the agent auto-generate a reusable skill — validating the learning loop against your specific toolchain without any code changes.

## 9. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 62865 (+3659 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted MIT-licensed AI gateway that routes requests across 352 providers (150+ free tiers) through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression claiming 15–95% savings.

**Why now:** The repo gained 3,659 stars this week, signaling a surge in builder interest likely tied to rising API costs as Claude, Gemini, and OpenAI pricing pressure mounts.

**Build with it:** Point Cursor or Cline's OpenAI base URL at your local OmniRoute instance to get automatic free-tier fallback across providers without changing any other client config.

## 10. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 92974 (+1824 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** Agent Skills packages 25 slash-command-driven workflows (`/spec`, `/plan`, `/build`, `/test`, etc.) that enforce senior-engineer practices — TDD, atomic commits, five-axis code review — inside AI coding agents like Claude Code, Cursor, and Codex.

**Why now:** The repo gained ~1,800 stars this week, signaling a surge in builder attention as teams standardize how autonomous agents handle multi-phase development without constant human stepping.

**Build with it:** Run `npx skills add addyosmani/agent-skills --skill test-driven-development` inside an existing Claude Code or Cursor project to enforce red-green-refactor on your next feature branch.
