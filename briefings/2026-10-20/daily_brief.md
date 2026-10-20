# AI Tastemakers — Daily Brief — 2026-10-20

_Ranking: delta_7d · 10 repos · generated 2026-10-20T17:57:47.307Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 345960 (+193606 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is an MCP (model context protocol) server that gives AI agents tools to inspect closed binaries, JavaScript/Electron apps, .NET assemblies, and websites without source code, routing analysis through Hopper or Ghidra under the hood.

**Why now:** The repo picked up 193,606 stars this week — a viral spike that means this is an active conversation in builder communities right now.

**Build with it:** Run `npx rea-agents setup` to register REA with your agent (Claude, Codex, etc.), then ask it to reverse-engineer a closed-app feature you want to replicate.

## 2. tt-a1i/archify

https://github.com/tt-a1i/archify · ★ 86251 (+3728 this week) · agent-skills, ai-agents, architecture-diagram, claude-code, claude-skills, codex, coding-agents, deepseek-harness, developer-tools, diagrams, diagrams-as-code, dsh-plugin, flowchart, llm, mermaid, opencode, sequence-diagram, software-architecture, system-design, visualization

**What it does:** Archify is a JavaScript agent skill for Claude Code, Codex, Cursor, and OpenCode that turns a natural-language description into a self-contained, interactive HTML diagram — flowcharts, sequence diagrams, system maps, and more.

**Why now:** The repo gained 3,728 stars this week and crossed 130K installs on skills.sh, a fast adoption curve worth watching before it plateaus.

**Build with it:** Install it as a Claude Code skill, describe your system or codebase in plain language, and drop the resulting interactive HTML directly into your docs or a pull request.

## 3. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 71702 (+3654 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, dsh, from-scratch, generative-ai, llm, machine-learning, mcp, python, rea, reinforcement-learning, rust, transformers, tutorial, typescript

**What it does:** A 542-lesson, MIT-licensed curriculum across 20 phases where learners implement AI internals — model architectures, retrieval pipelines, and agent runtimes — from scratch in Python, TypeScript, Rust, and Julia.

**Why now:** The repo picked up 3,654 stars this week, likely driven by growing demand for hands-on agent and MCP (model context protocol) engineering skills rather than just API-wrapping tutorials.

**Build with it:** Work through the retrieval pipeline phase to build a RAG system from scratch, then use your own eval results as a benchmark baseline against hosted alternatives.

## 4. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 30717 (+18893 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency dsh plugin that exposes frontier LLMs — DeepSeek V4.1 Flash, Kimi K3, and a Kilo AI free pool — with no login, API key, or usage cap, plus an OpenAI-compatible local forwarding port any existing tool can target.

**Why now:** The repo gained nearly 19,000 stars this week and hit #1 on both Trendshift's daily and JavaScript weekly charts, reflecting a sharp spike in developer interest around free, uncapped model access.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding base URL to get free model calls without touching API credentials.

## 5. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 137923 (+2772 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** UI UX Pro Max is a Python-based AI skill that loads 192 reasoning rules and 79 searchable UI styles into AI coding tools — Cursor, Windsurf, Claude Code, Copilot, Codex — to enforce consistent, professional UI/UX decisions across React, Tailwind, and HTML5 projects.

**Why now:** The repo gained roughly 2,772 stars this week, a notable spike given how narrowly it targets the AI coding tool ecosystem.

**Build with it:** Install the `ui-ux-pro-max-cli` npm package, wire it into your Cursor or Windsurf workspace, and run it against your next landing page component to see which rules fire.

## 6. microsoft/markitdown

https://github.com/microsoft/markitdown · ★ 191277 (+1489 this week) · autogen, autogen-extension, langchain, markdown, microsoft-office, openai, pdf

**What it does:** MarkItDown is a Python library and CLI that converts PDFs, Office documents, images, audio, and HTML into Markdown structured for LLM ingestion — headings, tables, and lists intact.

**Why now:** The repo is adding roughly 1,500 stars this week, a fresh adoption wave that tracks with builders wiring document pipelines into LLM and RAG workflows.

**Build with it:** Drop `markitdown[pdf,docx]` into your RAG ingestion step and replace your custom parser with `MarkItDown().convert_local("file.pdf").text_content` to feed clean, token-efficient Markdown straight to your chunker.

## 7. yetone/magpie

https://github.com/yetone/magpie · ★ 17905 (+7571 this week) · claude-code, codex, deepseek, gemini-cli, llm, macos

**What it does:** Magpie is a local gateway app (macOS, Windows, Linux, Docker) that sits between any AI coding agent — Claude Code, Codex, Gemini CLI, OpenCode — and any model provider, with automatic failover when a quota runs out.

**Why now:** The repo gained 7,571 stars this week, a surge that makes sense given multiple competing agent CLIs each hardcode their own provider config, making a neutral routing layer increasingly useful.

**Build with it:** Add a routing group in Magpie's Providers UI with your DeepSeek and Kimi API keys, then point Claude Code at Magpie's local gateway endpoint for automatic quota failover without touching Claude Code's config again.

## 8. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 169234 (+7408 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent skill that installs a "laziest senior dev" heuristic into AI coding agents (Claude Code, Cursor, and 18 others), steering them to delete code rather than add it and to write tests for risky logic without being asked.

**Why now:** Version 5 just dropped with a ground-up rebuild benchmarked across 39 real tasks on a FastAPI + React repo, showing -53% code, -41% time, and -45% token usage versus the same agent running without the skill.

**Build with it:** Drop the `@dietrichgebert/ponytail` npm package into your Claude Code setup as a plugin and check whether your next feature branch produces fewer net lines than your current baseline.

## 9. tangency-labs/solidcraft <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/tangency-labs/solidcraft · ★ 8066 (+1074 this week) · 3d-modeling, brep, cad, egui, mcp, parametric-cad, rust, step, wasm

**What it does:** SolidCraft is an open-source parametric 3D CAD application written in pure Rust that runs on desktop, in the browser, and headless via a built-in MCP server — meaning an AI agent can drive sketch constraints, extrusions, and dimension changes programmatically.

**Why now:** The v0.8 release included a public demo building a full Raspberry Pi 4 case — extrude, fillet, shell, text engraving, material mass, parametric rebuild — and drove a surge past 8,000 stars this week.

**Build with it:** Connect an AI agent to SolidCraft's MCP server to script geometry changes without touching the GUI, then export the result for fabrication.

## 10. strelov1/freehire <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/strelov1/freehire · ★ 1803 (+1037 this week) · ats, career, careers, golang, hiring, job-aggregator, job-board, job-portal, job-scraper, job-search, jobs, langchain, llm, meilisearch, postgresql, recruitment, remote-jobs, self-hosted, svelte, sveltekit

**What it does:** freehire crawls 3.3M+ live job postings directly from company ATS platforms — Workday, Greenhouse, Lever, Ashby, and 120+ others — deduplicates them into a normalized schema, and exposes them through a faceted search UI, HTTP API, and CLI, all self-hostable under MIT.

**Why now:** The repo gained 1,037 stars this week alongside a Product Hunt featured launch, putting the project and its catalog of 470,000+ companies in front of a large builder audience right now.

**Build with it:** Add a company source by inserting one row into the board catalog, then query your self-hosted instance's HTTP API to power a niche job board filtered by ATS type, region, or seniority.
