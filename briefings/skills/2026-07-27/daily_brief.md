# Skill Tastemakers — Daily Brief — 2026-07-27

_Ranking: delta_7d · 10 repos · generated 2026-07-27T15:51:45.407Z_


## 1. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 31840 (+10795 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that routes requests across 290+ AI providers through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and token compression that can cut usage by up to 95%.

**Why now:** The project gained nearly 11,000 stars this week, signaling rapid community adoption, and its aggregated free tier pool of ~1.53B tokens/month makes it immediately practical for builders who are hitting rate limits or API costs.

**Build with it:** Drop OmniRoute in front of any tool that speaks the OpenAI API—Claude Code, Cursor, Cline, or your own agent—and get automatic failover across free tiers so your coding sessions or production pipelines never stall on a quota error.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 30571 (+7407 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source Agent Development Environment (ADE) that lets you run multiple coding agents (Codex, Claude Code, OpenCode, or Pi) in parallel, each isolated in its own git worktree, with a unified desktop/mobile interface and Ghostty-class terminal splits for monitoring and steering them.

**Why now:** The project surged 7,400+ stars this week, signaling strong builder momentum around parallel agent orchestration at the same moment Claude Code and Codex are becoming default coding workflows.

**Build with it:** Fan a single feature prompt across five agents simultaneously, compare their implementations side-by-side in isolated worktrees, then merge the winner—cutting the trial-and-error cycle that slows solo developers working with AI.

## 3. MadsLorentzen/ai-job-search

https://github.com/MadsLorentzen/ai-job-search · ★ 27567 (+3286 this week) · ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume

**What it does:** AI Job Search is a TypeScript framework that wraps Claude Code into a structured job application pipeline—scraping local job boards, scoring fit against your profile, generating tailored LaTeX CVs and cover letters, and running a drafter-reviewer critique loop before final output.

**Why now:** The repo spiked to 27,567 stars with 3,286 added this week, driven by the author's credible proof-of-use story: 69 applications, 20 interviews, one signed offer as an AI engineer after a late-2025 layoff.

**Build with it:** Fork the repo, swap the Danish job portal scrapers for your local boards (the skill pattern is explicitly designed for this), wire in your own profile YAML, and extend the `/interview` command with domain-specific question banks for whatever role you're targeting.

## 4. ComposioHQ/awesome-claude-skills

https://github.com/ComposioHQ/awesome-claude-skills · ★ 71044 (+5739 this week) · agent-skills, ai-agents, antigravity, automation, claude, claude-code, codex, composio, cursor, developer-tools, gemini-cli, mcp, openai-codex, rube, saas, skill, workflow-automation

**What it does:** Awesome Claude Skills is a curated collection of 1,000+ reusable instruction packages ("skills") that give Claude and other coding agents like Cursor, Codex, and Gemini CLI structured, repeatable behaviors for tasks ranging from document processing to app automation via Composio's MCP Gateway.

**Why now:** The repository gained 5,739 stars this week, likely driven by the rapid adoption of Claude Code and the growing ecosystem around MCP-based agent tooling that lets AI agents authenticate and act across real external services.

**Build with it:** A builder could drop a skill folder into their Claude Code setup to give it production-ready workflows—like auto-triaging GitHub issues, sending Slack digests, or processing PDFs—without writing custom tool integration code from scratch.

## 5. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 35838 (+2673 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that parses any codebase into a persistent knowledge graph using tree-sitter AST analysis across 158 languages, answering structural queries about functions, call chains, and HTTP routes in under 1ms with 99% fewer tokens than file-by-file exploration.

**Why now:** The project gained 2,673 stars this week, signaling rapid adoption as AI coding agents (Cursor, Claude Code, Codex, Gemini CLI) become standard workflow tools that desperately need efficient codebase context beyond naive file reads.

**Build with it:** Drop this into any AI coding agent setup to give it instant, cheap structural awareness of large repos — or build a custom code review pipeline that queries cross-service call graphs and HTTP route maps without burning token budgets on raw file ingestion.

## 6. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 233952 (+2493 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness operating system that adds skills, memory, security scanning, and research-first workflows on top of AI coding tools like Claude Code, Codex, Cursor, and Opencode — treating the agent's operating environment as a configurable, optimizable layer rather than a black box.

**Why now:** With 233K+ stars and 2,493 added this week, ECC is spiking in adoption precisely as Claude Code and Opencode hit mainstream developer use, making cross-harness workflow portability an immediate practical problem rather than a theoretical one.

**Build with it:** Drop ECC into your Claude Code or Cursor setup to give your agent persistent memory, reusable skill definitions, and prompt-injection security scanning out of the box — then extend it to wire multiple harnesses together into a single coordinated pipeline across a real codebase.

## 7. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 96955 (+4907 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus its docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using deterministic tree-sitter AST parsing locally, with every graph edge tagged as either explicitly extracted or LLM-inferred.

**Why now:** The project gained nearly 5,000 stars this week and ships as a `/graphify` skill natively integrated into Claude Code, Cursor, Codex, and Gemini CLI, hitting at the moment developers are actively wiring tools into those AI coding environments.

**Build with it:** Use the MCP server and GraphRAG layer to build a code-aware agent that answers "what calls this function," "what tables does this service touch," or "where is this config value used"—without a vector store or sending code to an external API.

## 8. img2threejs/img2threejs <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/img2threejs/img2threejs · ★ 6695 (+2284 this week) · 3d, ai-agents, claude-code, computer-graphics, generative, image-to-3d, procedural-generation, threejs, typescript, webgl

**What it does:** img2threejs takes a reference image and reconstructs the object as fully procedural Three.js code — no mesh files, no photogrammetry, just parametric geometry and shaders that run live in the browser.

**Why now:** The repo jumped 2,284 stars this week alone, signaling strong builder momentum, and the timing aligns with growing demand for lightweight, asset-free 3D pipelines that skip the bloat of traditional 3D workflows.

**Build with it:** Drop in a product photo or game asset reference and generate an animation-ready, orbitable 3D model you can embed directly in a web app — useful for e-commerce previews, game item showcases, or any UI that needs 3D without the file size overhead.

## 9. tirth8205/code-review-graph

https://github.com/tirth8205/code-review-graph · ★ 26863 (+4245 this week) · ai-coding, claude, claude-code, code-review, graphrag, incremental, knowledge-graph, llm, mcp, python, static-analysis, tree-sitter

**What it does:** `code-review-graph` builds a persistent structural map of your codebase using Tree-sitter and serves it to AI coding tools via MCP, so the model reads only the relevant files and symbols instead of your entire repo on every review.

**Why now:** It gained 4,245 stars this week, signaling strong traction as developers hit real token cost and context-window limits with tools like Claude Code and Cursor on large codebases.

**Build with it:** Wire it into a CI pipeline using the provided GitHub Action to automatically scope AI review context to changed call graphs, or extend the MCP server to expose custom graph queries tailored to your team's architecture patterns.

## 10. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 90233 (+3762 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a plugin/skill for AI coding agents (Claude Code, Cursor, etc.) that enforces YAGNI-style minimalism, steering the agent toward the simplest possible implementation—like replacing a third-party date picker with a native `<input type="date">`.

**Why now:** It hit 90k+ GitHub stars this week with 3,762 new stars, and benchmarks on a real FastAPI + React codebase show a 54% reduction in generated lines of code, 20% lower cost, and no safety regressions versus a baseline agent.

**Build with it:** Drop the skill into your Claude Code or Cursor setup to keep AI-generated pull requests lean by default, or fork the benchmark harness to measure how much your own agent over-builds on your actual codebase.
