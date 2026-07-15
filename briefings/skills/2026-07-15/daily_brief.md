# Skill Tastemakers — Daily Brief — 2026-07-15

_Ranking: delta_7d · 10 repos · generated 2026-07-15T15:02:53.891Z_


## 1. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 87406 (+8103 this week) · antigravity, claude-code, codex, gemini, graphrag, knowledge-graph, leiden, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase, SQL schema, docs, or media into a queryable knowledge graph using tree-sitter AST for code (fully local, no LLM) and your configured model for semantic content like PDFs and images, with every edge tagged as `EXTRACTED` or `INFERRED` so you know exactly what was read versus inferred.

**Why now:** The project gained 8,000+ stars this week and is backed by YC S26, landing as AI coding assistants like Claude Code and Gemini CLI become standard dev tools—Graphify plugs directly into them via a `/graphify` slash command.

**Build with it:** Wire Graphify into a Claude Code or Cursor workflow to let your AI assistant traverse the full graph of a legacy monorepo—finding which SQL tables a given API endpoint touches, or which shell scripts depend on a specific env var—without manually grepping across hundreds of files.

## 2. iOfficeAI/OfficeCLI

https://github.com/iOfficeAI/OfficeCLI · ★ 17478 (+7928 this week) · agent, ai, claude-code, cli, codex, docx, excel, office, openclaw, pptx, presentation, skills, word, xlsx

**What it does:** OfficeCLI is an open-source, single-binary CLI tool that lets AI agents create, read, and edit `.docx`, `.xlsx`, and `.pptx` files without requiring a Microsoft Office installation, and includes a built-in HTML/PNG rendering engine so agents can visually inspect what they've produced.

**Why now:** It gained nearly 8,000 GitHub stars this week and hit the top of Hacker News, signaling that agent-driven document automation is becoming a real workflow—not just a demo—and tooling is consolidating around it.

**Build with it:** Drop the skill file into Claude Code, Cursor, or Copilot and build an agent that generates polished client-facing reports, financial spreadsheets, or slide decks directly from structured data, closing the full loop from data input to formatted, reviewable Office file output.

## 3. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 31758 (+3932 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that indexes codebases into a persistent SQLite-backed knowledge graph using tree-sitter AST parsing across 158 languages, exposing 15 tools for sub-millisecond structural queries about functions, call chains, classes, and HTTP routes with 99% fewer tokens than file-by-file exploration.

**Why now:** The project gained nearly 4,000 stars this week, signaling rapid adoption among teams building with Claude Code, Cursor, Windsurf, and other agent surfaces that benefit from structured codebase context rather than raw file dumps.

**Build with it:** Drop it into any AI coding agent setup to give your agent a persistent, queryable map of a large monorepo or multi-service codebase — particularly powerful for automating refactors, dependency tracing, or cross-service call graph analysis without burning context on file reads.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 83696 (+7072 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces YAGNI discipline—steering the agent toward minimal solutions like a native `<input type="date">` instead of installing a full date-picker library.

**Why now:** It hit 83,696 stars with 7,072 added this week, signaling rapid adoption at the moment agentic coding tools are becoming standard workflow—making token and cost reduction a real budget concern.

**Build with it:** Drop the npm package or cursor-rules config into your existing Claude Code or Cursor setup and immediately cut generated LOC by ~54% on average, reducing API costs and review burden on any greenfield or maintenance project.

## 5. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 78497 (+6712 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** Agent Skills is a collection of 24 production-grade slash commands (like `/spec`, `/build`, `/review`, `/ship`) that encode senior engineering workflows—spec writing, TDD, code review, performance auditing—so AI coding agents follow them consistently across every development phase.

**Why now:** The project gained 6,712 stars this week, likely driven by the Claude Code plugin marketplace launch, which lets developers install the full skill set in two commands and wire it directly into their agent workflow.

**Build with it:** Install the skills into Claude Code or Cursor, then use `/build auto` to let an agent autonomously plan, implement, test, and commit an entire feature slice—intervening only on failures—while `/review` enforces a five-axis quality gate before any merge.

## 6. stablyai/orca

https://github.com/stablyai/orca · ★ 19687 (+6391 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source ADE (Agent Development Environment) that lets you run multiple coding agents—Claude Code, Codex, OpenCode, or Pi—simultaneously in isolated git worktrees, with a mobile companion app for monitoring and steering agents remotely.

**Why now:** It gained 6,391 GitHub stars this week, signaling a sharp surge in developer interest around parallel agent orchestration as teams push beyond single-agent workflows.

**Build with it:** Fan a single prompt across five agents in parallel worktrees, compare their outputs, and merge the best result—cutting iteration time on complex features while keeping your own API subscriptions and model choices intact.

## 7. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 229986 (+3082 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an operator system that layers skills, memory, security scanning, and research-first workflows on top of AI coding agents like Claude Code, Codex, and Cursor—functioning as a harness-level OS rather than a collection of config files.

**Why now:** With 3,082 stars added this week alone, ECC is hitting escape velocity at exactly the moment developers are moving from single-agent experiments to multi-harness production workflows.

**Build with it:** Drop ECC into your Claude Code or Cursor setup to give your agent persistent memory, cross-session instincts, and security scanning—then wire multiple harnesses together for autonomous, research-driven development pipelines.

## 8. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 57988 (+5387 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** This repo systematically extracts and publishes the hidden system prompts controlling AI assistants like Claude Opus 4.8, GPT-5.6, and Gemini 3.5 Flash, including full tool definitions and skill configurations that companies don't publicly document.

**Why now:** The repo just hit 57,988 stars with 5,387 added this week, driven by fresh drops of Claude Sonnet 5, GPT-5.6, and Kimi K2.6 prompts — the most current public record of how frontier models are actually instructed as of July 2026.

**Build with it:** Use the extracted prompts as baselines to reverse-engineer effective system prompt patterns for your own agents, or diff competing models' instructions (e.g., Claude Fable 5 vs. Opus 4.8) to identify which constraints and tool configurations produce specific behaviors in your product.

## 9. coreyhaines31/marketingskills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/coreyhaines31/marketingskills · ★ 39484 (+2452 this week) · claude, codex, marketing

**What it does:** A collection of markdown-based skill files that give AI coding agents (Claude Code, Codex, Cursor, etc.) structured marketing knowledge across CRO, SEO, copywriting, ads, growth, and GTM—each skill reads a shared `product-marketing` foundation before executing any task.

**Why now:** The repo gained 2,452 stars this week, signaling a surge of technical founders and marketers experimenting with agent-driven marketing workflows as tools like Claude Code hit mainstream adoption.

**Build with it:** Drop these skills into your agent project to let it autonomously audit your landing page for conversion issues, generate SEO-optimized content at scale, or run a full competitor analysis—without hand-holding the agent on marketing fundamentals each time.

## 10. MadsLorentzen/ai-job-search <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/MadsLorentzen/ai-job-search · ★ 22822 (+2440 this week) · ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume

**What it does:** AI Job Search is a Claude Code–powered framework that automates the full job application pipeline on your local machine—scraping postings, scoring fit, tailoring LaTeX CVs, writing cover letters, and generating interview prep through a drafter-reviewer agent loop.

**Why now:** The repo gained 2,440 stars this week, likely fueled by the author's credibility story: a geophysicist who used this exact workflow to land 20 first interviews from 69 applications and signed as an AI engineer in 2026.

**Build with it:** Fork the repo, swap the Danish job board scrapers for your local portals (Indeed, LinkedIn, Greenhouse), and extend the `/apply` command with domain-specific evaluation rubrics—for example, weighting technical skills differently for engineering versus product roles.
