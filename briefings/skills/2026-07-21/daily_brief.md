# Skill Tastemakers — Daily Brief — 2026-07-21

_Ranking: delta_7d · 10 repos · generated 2026-07-21T15:18:40.961Z_


## 1. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 92882 (+7064 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus docs, SQL schemas, PDFs, and configs—into a queryable knowledge graph using deterministic tree-sitter AST parsing, with every edge tagged as either directly extracted or inferred, no vector store or LLM required for code.

**Why now:** It ships as a `/graphify` slash command for Claude Code, Cursor, Codex, and Gemini CLI—exactly the AI coding environments seeing mass adoption right now—and gained 7,000+ stars this week, signaling strong developer validation at the moment these assistant workflows are being standardized.

**Build with it:** Drop it into a large legacy monorepo to generate a navigable dependency graph, then query cross-file call chains, SQL schema relationships, and config references without grep—or expose the graph via MCP to give your AI agent precise, structured codebase context instead of raw file dumps.

## 2. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 22971 (+5779 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that exposes 268+ AI providers through a single OpenAI-compatible endpoint, with quota-aware auto-fallback, RTK+Caveman token compression (15–95% savings), and support for tools like Claude Code, Cursor, Cline, and Copilot.

**Why now:** The project gained 5,779 stars this week, signaling strong community momentum, and its free-tier aggregation (~1.4B tokens/month across 39 provider pools) makes it immediately practical as providers tighten rate limits and costs rise.

**Build with it:** Point your existing OpenAI SDK calls at OmniRoute's endpoint and get instant multi-provider fallback with zero code changes—ship a coding assistant, agent pipeline, or MCP-connected tool that never goes down due to a single provider quota.

## 3. stablyai/orca

https://github.com/stablyai/orca · ★ 24524 (+5602 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source Agent Development Environment (ADE) that lets you run multiple coding agents (Codex, Claude Code, OpenCode) simultaneously, each isolated in its own git worktree, with a unified desktop/mobile interface and Ghostty-class WebGL terminals.

**Why now:** The project surged 5,600+ stars this week, signaling strong builder momentum around parallel agent workflows as Claude Code and Codex usage hits critical mass and developers need orchestration tooling rather than single-agent interfaces.

**Build with it:** Fan a single feature prompt across five agents in parallel worktrees, compare their diffs, and merge the winner—then monitor agent completion from your phone via the iOS/Android companion app while your machines run unattended overnight.

## 4. langgenius/dify

https://github.com/langgenius/dify · ★ 149631 (+5373 this week) · agent, agentic-ai, agentic-framework, agentic-workflow, ai, automation, claude, genai, gpt, llm, low-code, mcp, nextjs, no-code, openai, orchestration, python, rag, skills, workflow

**What it does:** Dify is an open-source platform for building LLM-powered applications—RAG pipelines, agentic workflows, and multi-model chatbots—with a visual builder, API layer, and self-hosting option that takes you from prototype to production on your own infrastructure.

**Why now:** Dify gained 5,373 GitHub stars this week, signaling a surge in developer interest likely tied to its recent MCP (Model Context Protocol) integration, making it one of the fastest-moving agentic frameworks in the ecosystem right now.

**Build with it:** Deploy a self-hosted AI assistant that pulls from your internal docs via RAG, chains tool calls through an agentic workflow, and exposes a clean API to your product—without rebuilding the stack when you switch underlying models.

## 5. MadsLorentzen/ai-job-search

https://github.com/MadsLorentzen/ai-job-search · ★ 24745 (+2433 this week) · ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume

**What it does:** AI Job Search is a TypeScript framework that wires Claude Code into a structured job application pipeline—scraping local job boards, scoring fit, generating tailored LaTeX CVs and cover letters, and running interview prep through a drafter-reviewer agent loop.

**Why now:** The repo spiked 2,433 stars this week, likely driven by the creator's documented case study: 69 tailored applications, 20 first interviews, one signed offer as an AI engineer—concrete funnel data that builders can benchmark against.

**Build with it:** Fork the repo, swap the Danish job portal scrapers for your local boards, plug in your profile files, and extend the reviewer agent with domain-specific evaluation rubrics—or wrap the `/apply` workflow into a scheduled pipeline that monitors new postings and fires applications automatically.

## 6. tirth8205/code-review-graph

https://github.com/tirth8205/code-review-graph · ★ 24313 (+4825 this week) · ai-coding, claude, claude-code, code-review, graphrag, incremental, knowledge-graph, llm, mcp, python, static-analysis, tree-sitter

**What it does:** `code-review-graph` builds a persistent structural map of your codebase using Tree-sitter and GraphRAG, then exposes it via MCP so AI coding tools pull only the relevant context instead of re-reading entire repositories on every review.

**Why now:** It gained 4,825 stars this week, signaling strong developer appetite for token-efficient AI workflows as teams hit real cost and latency walls running LLM-assisted reviews on large codebases.

**Build with it:** Wire it into a CI pipeline as a GitHub Action to automatically scope AI code review context to only the files and symbols touched by each PR, cutting token usage and review latency without changing your existing AI tooling.

## 7. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 231793 (+2239 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness operating system that layers skills, memory, security scanning, and instinct-based behaviors on top of AI coding agents like Claude Code, Codex, Cursor, and Opencode to make them perform better across real engineering workflows.

**Why now:** With 2,239 stars added this week, ECC is clearly catching momentum as developers push Claude Code and similar agents into serious production use and hit the limits of raw prompting.

**Build with it:** Drop ECC into your existing Claude Code or Cursor setup to give your agent persistent memory, project-specific skills, and security guardrails — then extend it to wire multi-agent workflows across harnesses for complex, long-running engineering tasks.

## 8. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 33552 (+2147 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that indexes entire codebases into a persistent SQLite knowledge graph using tree-sitter AST parsing across 158 languages, answering structural queries about functions, call chains, classes, and HTTP routes in under 1ms with 99% fewer tokens than file-by-file exploration.

**Why now:** The project gained 2,147 stars this week and sits at 33,552 total, signaling rapid adoption across major AI coding clients — Cursor, Claude Code, Windsurf, Gemini CLI, and others — just as agent-driven development workflows are becoming standard practice.

**Build with it:** Drop this into any AI coding agent setup to give it persistent, queryable memory of a codebase without burning context on file reads — or build on top of the 15 MCP tools to create custom code navigation, dependency auditing, or cross-service call-graph analysis pipelines.

## 9. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 87119 (+4233 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt/skill layer for AI coding agents (Claude Code, Cursor, etc.) that enforces a "laziest senior dev" heuristic—preferring deletion, native APIs, and minimal diffs over generated boilerplate, cutting LOC by ~54% on average across real agentic sessions.

**Why now:** It hit 87k stars this week with 4,233 added, riding the wave of developers noticing that Claude Code and similar agents consistently over-build, and looking for lightweight interventions that don't sacrifice correctness.

**Build with it:** Drop the ponytail skill into your Claude Code or Cursor setup before tackling any greenfield feature or refactor, and use the included benchmark harness against your own repo to measure whether your agent is over-engineering specific problem areas.

## 10. iOfficeAI/OfficeCLI

https://github.com/iOfficeAI/OfficeCLI · ★ 20522 (+3996 this week) · agent, ai, claude-code, cli, codex, docx, excel, office, openclaw, pptx, presentation, skills, word, xlsx

**What it does:** OfficeCLI is an open-source, single-binary CLI tool that lets AI agents read, write, and render Word, Excel, and PowerPoint files without requiring Microsoft Office, exposing document manipulation as simple commands any agent can call.

**Why now:** It gained nearly 4,000 GitHub stars this week, signaling real traction at the moment agentic workflows are moving from toy demos to practical file-based tasks that touch Office formats.

**Build with it:** Drop the skill file into Claude Code or Cursor and build an agent that ingests a sales CSV, writes analysis to a formatted Excel workbook, and exports a polished PowerPoint deck — all programmatically, no human in the loop.
