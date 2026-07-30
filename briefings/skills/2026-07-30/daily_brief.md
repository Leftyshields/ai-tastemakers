# Skill Tastemakers — Daily Brief — 2026-07-30

_Ranking: delta_7d · 10 repos · generated 2026-07-30T15:24:11.926Z_


## 1. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 34819 (+10202 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that exposes 290+ AI providers (90+ free tiers) through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression that cuts costs by 15–95%.

**Why now:** It hit 34,819 stars with 10,202 added this week, signaling rapid community validation—and its free-tier aggregation (~1.53B tokens/month from 43 provider pools) makes it practically free to run serious LLM workloads today.

**Build with it:** Drop OmniRoute in front of any Claude Code, Cursor, or Cline setup to eliminate rate-limit interruptions, then layer in MCP/A2A support to wire multi-agent pipelines across DeepSeek, Gemini, and GPT-4o without rewriting provider logic.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 33561 (+7783 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source ADE (Agent Development Environment) that lets you run multiple coding agents—Codex, Claude Code, OpenCode, or Pi—simultaneously in isolated git worktrees, with a unified desktop/mobile interface for monitoring and steering them.

**Why now:** The project jumped 7,783 GitHub stars this week, signaling rapid community momentum around parallel agent orchestration as teams look for practical ways to scale AI-assisted coding beyond single-agent workflows.

**Build with it:** Fan a single feature prompt across five agents in parallel worktrees, compare their implementations, and merge the winner—then monitor progress and send follow-up instructions from your phone via the iOS/Android companion app.

## 3. ComposioHQ/awesome-claude-skills

https://github.com/ComposioHQ/awesome-claude-skills · ★ 71352 (+6047 this week) · agent-skills, ai-agents, antigravity, automation, claude, claude-code, codex, composio, cursor, developer-tools, gemini-cli, mcp, openai-codex, rube, saas, skill, workflow-automation

**What it does:** Awesome Claude Skills is a curated collection of 1,000+ reusable instruction packages (SKILL.md files) that teach Claude and other coding agents like Cursor, Codex, and Gemini CLI how to handle specific task classes, paired with Composio's MCP Gateway for connecting those skills to real actions across 1,000+ external apps.

**Why now:** The repo gained 6,047 stars this week, signaling a surge of developer interest in standardized, portable skill definitions as Claude Code and competing agentic coding tools compete for workflow adoption.

**Build with it:** A builder could fork the skill format to create a private internal library of company-specific agent behaviors—code review standards, incident response runbooks, or CRM update workflows—then wire them to live systems via the Composio MCP endpoint without building custom auth or integration glue.

## 4. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 98927 (+5282 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus docs, PDFs, SQL schemas, and configs—into a queryable knowledge graph using deterministic tree-sitter AST parsing, with every relationship tagged as either explicitly extracted or LLM-inferred, and no vector store required.

**Why now:** The project gained over 5,000 stars this week and ships as a native `/graphify` skill for Claude Code, Cursor, Codex, and Gemini CLI, landing exactly as those tools are becoming primary development environments.

**Build with it:** Wire Graphify into your AI coding assistant to replace grep-based code search with structured graph queries—practical starting points include cross-repo dependency audits, automated onboarding maps for large monorepos, or an MCP-backed context layer that gives your agent precise, explainable answers about unfamiliar codebases.

## 5. iOfficeAI/OfficeCLI

https://github.com/iOfficeAI/OfficeCLI · ★ 23483 (+2531 this week) · agent, ai, claude-code, cli, codex, docx, excel, office, openclaw, pptx, presentation, skills, word, xlsx

**What it does:** OfficeCLI is a single open-source binary that gives AI agents a structured CLI interface to create, read, and edit Word, Excel, and PowerPoint files — no Office installation required, with a built-in HTML/PNG rendering engine so agents can visually verify their output.

**Why now:** It gained 2,531 GitHub stars this week, signaling rapid adoption at the moment agentic coding tools like Claude Code and Cursor are becoming mainstream developer workflows.

**Build with it:** Wire it into an AI agent pipeline to automate document generation end-to-end — for example, a Claude Code agent that pulls data from an API, writes it into a formatted Excel report, renders it to PNG for visual QA, and delivers the file without any human touching a spreadsheet.

## 6. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 92215 (+4496 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt skill/plugin for AI coding agents (Claude Code, Cursor, etc.) that biases the agent toward minimal solutions—using native browser inputs instead of installing libraries, deleting abstractions instead of adding them, and generally writing less code to accomplish the same task.

**Why now:** It's trending at 92k+ stars with 4,496 added this week, and its benchmarks against a real FastAPI + React repo show measurable cuts: 54% fewer lines of code, 20% lower API cost, and no safety regressions versus a bare agent.

**Build with it:** Drop the ponytail skill into your Claude Code or Cursor setup to audit an existing codebase for over-engineering, then measure the before/after diff on token spend across a sprint's worth of feature tickets to validate whether the cost savings hold for your stack.

## 7. AgriciDaniel/claude-obsidian <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/AgriciDaniel/claude-obsidian · ★ 10120 (+2197 this week) · agent-skills, ai-note-taking, ai-second-brain, claude-code, claude-code-skill, claude-memory, claude-plugin, karpathy-llm-wiki, knowledge-graph, knowledge-management, note-taking, notion-alternative, obsidian, obsidian-ai, obsidian-plugin, obsidian-second-brain, open-source, personal-knowledge-management, pkm, second-brain

**What it does:** claude-obsidian is a local-first Python system that uses Claude Code to ingest any source material, extract claims with citations, and build a self-linking Obsidian vault of plain Markdown files you fully own.

**Why now:** It gained 2,197 stars this week, signaling real traction around the "AI second brain" pattern Karpathy popularized, and v2.0.0 just shipped with provenance-aware orchestration that prevents parallel agents from corrupting the vault.

**Build with it:** Drop it into a research workflow to automatically cross-link notes, flag unsupported claims, and generate Obsidian Canvas maps—or extend its 15 skills to build a domain-specific knowledge base (legal docs, codebases, academic papers) that compounds context across every Claude session.

## 8. img2threejs/img2threejs

https://github.com/img2threejs/img2threejs · ★ 8475 (+4064 this week) · 3d, ai-agents, claude-code, computer-graphics, generative, image-to-3d, procedural-generation, threejs, typescript, webgl

**What it does:** img2threejs takes a reference image and reconstructs the object in it as procedural Three.js code — pure geometry, shaders, and primitives, no mesh files or asset downloads, running directly in the browser.

**Why now:** The repo jumped 4,064 stars this week and is trending at the top of GitHub across all languages, meaning the tooling and community momentum are peaking right now.

**Build with it:** Point it at product photos, game assets, or real-world objects to generate animation-ready, inspectable 3D models you can drop into any Three.js scene — useful for e-commerce viewers, game prototyping, or interactive portfolios without a 3D modeling pipeline.

## 9. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 236066 (+3936 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness operating system that layers skills, memory, instincts, and security on top of AI coding agents like Claude Code, Codex, Cursor, and Opencode via a CLAUDE.md-style configuration system.

**Why now:** It gained nearly 4,000 stars this week, signaling a surge in developer interest around structured agent orchestration as Claude Code and Codex usage accelerates in production workflows.

**Build with it:** Drop ECC into an existing Claude Code or Cursor project to add persistent memory, reusable skill modules, and AgentShield security guardrails—then extend it with custom MCP tools to wire your agent into external APIs or internal infrastructure.

## 10. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 222746 (+3925 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent from Nous Research that creates and refines skills from experience, maintains persistent memory across sessions, and runs on any infrastructure from a $5 VPS to serverless backends via a single Python install.

**Why now:** The project gained nearly 4,000 stars this week, signaling a breakout moment, and its open skill standard (agentskills.io) is actively attracting community contributions that expand what the agent can do out of the box.

**Build with it:** Wire it to your own model endpoint via OpenRouter or a local server, define scheduled automations in natural language, and spawn parallel subagents to run multi-step pipelines — all without touching the core codebase.
