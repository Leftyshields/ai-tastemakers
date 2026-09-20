# AI Tastemakers — Daily Brief — 2026-09-20

_Ranking: delta_7d · 10 repos · generated 2026-09-20T16:47:18.040Z_


## 1. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 263470 (+6575 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness configuration layer that adds persistent memory, security guardrails, and behavioral instincts to AI coding agents like Claude Code, Codex, Cursor, and Opencode via drop-in CLAUDE.md/agent config files.

**Why now:** Claude Code's rapid adoption as a terminal-native coding agent has created demand for standardized harness configs that survive context resets — ECC directly addresses that gap as Claude Code usage scales across teams this week.

**Build with it:** Drop `ecc-universal` from npm into your repo's agent config directory, wire it to your CLAUDE.md or `.cursor/rules` file, and get persistent project memory and prompt-injection defense without modifying the underlying agent.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 142926 (+6520 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin/skill for AI coding agents (Claude Code, Cursor, etc.) that injects a YAGNI-first heuristic, steering the agent toward minimal solutions and discouraging over-built code before a single line is written.

**Why now:** The repo gained 6,520 stars this week, coinciding with rapid adoption of agentic coding tools where verbose, over-engineered AI output is a recognized pain point among teams running Claude Code in production.

**Build with it:** Drop the npm package (`@dietrichgebert/ponytail`) into your Claude Code or Cursor setup as an agent skill, then measure token and line-count reduction per task using the included benchmark suite against your own codebase.

## 3. aipoch/open-science <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/aipoch/open-science · ★ 4787 (+2877 this week) · agent-skills, ai-agent, ai-for-science, ai-research, ai-research-workbench, ai-workbench, bioinformatics, desktop-app, local-first, mcp, model-agnostic, open-science, open-source, reproducible-research, research-tools, science, science-agent, scientific-ai, scientific-computing, scientific-research

**What it does:** AIPOCH Open-Science is a local-first, model-agnostic desktop app (macOS/Windows/Linux) that runs scientific AI agent workflows—handling Python/R code execution, literature search, scientific database queries, and traceable report generation—within a single project workspace.

**Why now:** v0.31.1 just shipped with ENA/INSDC accession resolution tools, directly expanding bioinformatics data access at a moment when agentic research tooling is consolidating around MCP-based skill architectures.

**Build with it:** Wire your own LLM backend via the model-agnostic config, then expose domain-specific data sources as MCP tools to extend the agent's skill set—giving you a reproducible, auditable pipeline from raw accession IDs to figures without leaving the workbench.

## 4. microsoft/markitdown

https://github.com/microsoft/markitdown · ★ 185890 (+2799 this week) · autogen, autogen-extension, langchain, markdown, microsoft-office, openai, pdf

**What it does:** MarkItDown is a Python library and CLI that converts PDFs, Office documents, images, audio, HTML, and more into Markdown optimized for LLM ingestion, preserving headings, tables, and lists.

**Why now:** The project crossed 185,000 GitHub stars with nearly 2,800 added this week, coinciding with active community discussion around using it as a preprocessing step in RAG and AutoGen pipelines.

**Build with it:** Drop it into a LangChain or AutoGen document ingestion pipeline via `pip install 'markitdown[pdf,docx,xlsx]'`, call `convert_local()` on uploaded files, and feed the resulting Markdown directly into a chunker before embedding.

## 5. heygen-com/hyperframes

https://github.com/heygen-com/hyperframes · ★ 51869 (+2727 this week) · ai, animation, ffmpeg, framework, gsap, html, mcp, puppeteer, rendering, typescript, video

**What it does:** HyperFrames is an open-source TypeScript framework that renders HTML, CSS, and GSAP-seekable animations into deterministic MP4 videos via Puppeteer and FFmpeg, usable via CLI or as an MCP-compatible rendering backend for AI coding agents.

**Why now:** The repo jumped 2,727 stars this week, coinciding with growing adoption of MCP tool ecosystems and agent-native workflows — HyperFrames ships 21 agent skills targeting Claude Code, Cursor, Gemini CLI, and Codex directly.

**Build with it:** Wire it into a Claude Code or Cursor agent session via `npx hyperframes skills update`, then drive the full production loop — HTML authoring, animation timing, media layering, and MP4 export — through natural-language prompts without leaving your editor.

## 6. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 67834 (+2653 this week) · ai, ai-agents, ai-prompts, anthropic, chatbot, chatgpt, claude, claude-code, codex, cursor, gemini, generative-ai, google, grok, llm, openai, prompt, prompt-engineering, system-prompt, system-prompts

**What it does:** A crowd-sourced collection of verbatim system prompts extracted from major AI assistants — Claude, ChatGPT, Gemini, Grok, Codex, Cursor, and others — organized by provider and model version in plain Markdown files.

**Why now:** The repo gained 2,653 stars this week, coinciding with fresh captures of Codex GPT-6-Astra, Gemini 3.8 Flash, and Claude Fable 5.1 headless mode, giving builders the most current cross-provider prompt snapshot available in one place.

**Build with it:** Feed competitor system prompts directly into an evals pipeline — diff Claude Design's 53 tools against your own agent's tool definitions, or use Grok/Gemini prompts as baseline fixtures in a prompt-regression test suite to surface behavioral gaps in your own models.

## 7. Tencent/WeKnora

https://github.com/Tencent/WeKnora · ★ 27904 (+5301 this week) · agent, agentic, ai, chatbot, dsh-plugin, embeddings, evaluation, generative-ai, golang, knowledge-base, llm, multi-tenant, ollama, openai, question-answering, rag, reranking, semantic-search, vector-search, wiki

**What it does:** WeKnora is a Go-based, self-hostable knowledge platform that ingests documents from sources like Notion, GitLab, and Feishu, then exposes them through RAG Q&A, a ReAct agent with sandbox execution, and a Wiki mode that auto-generates interlinked markdown from raw uploads.

**Why now:** The repo spiked 5,300+ stars this week coinciding with its v0.8.0 release, which added cross-session long-term memory, a runtime task-queue dashboard, and worker-pool governance — concrete production-readiness features that shifted it from prototype toward deployable infrastructure.

**Build with it:** Wire WeKnora's scoped API keys and principal-model config into an existing internal tool to serve department-specific RAG over a Feishu or Notion workspace, using the DSH plugin (`@wxg-prc-cpg/dsh-weknora`) or website embed widget as the front-end surface without writing a custom UI.

## 8. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 129270 (+2173 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** UI UX Pro Max is a Python-based AI skill that injects design intelligence into AI coding tools (Claude, Cursor, Copilot, Windsurf, Kiro, and others) via 192 reasoning rules and 79 searchable UI styles to produce professional-grade UI/UX output.

**Why now:** The repo gained 2,173 stars this week, coinciding with growing builder interest in prompt-layer tooling for AI editors as Kiro and Windsurf expand their agent skill ecosystems.

**Build with it:** Install the CLI via `npm install -g ui-ux-pro-max-cli`, drop the skill into your Cursor or Claude Code project config, then invoke specific named styles (e.g., mobile-ui, landing-page) in your prompts to steer generated React/Tailwind components toward consistent design patterns.

## 9. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 83758 (+4124 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP server that lets AI agents read and search Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paid APIs, handling authentication, anti-bot bypasses, and HTML cleaning automatically.

**Why now:** The repo hit GitHub's #1 trending position this week, driven by Claude Code and Cursor users looking for zero-cost web-scraping tools they can wire into agentic workflows via MCP without per-request API fees.

**Build with it:** Drop it into a Claude Code or Cursor MCP config as a local server, then invoke platform-specific tools (e.g., `youtube_transcript`, `reddit_search`, `twitter_search`) directly from your agent's tool-calling loop to feed live web context into prompts without leaving the IDE.

## 10. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 97521 (+3835 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** A collection of 25 slash-command-driven engineering skills (spec, plan, build, test, review, ship, and more) that encode senior-engineer workflows into AI coding agents like Claude Code, Cursor, and Codex.

**Why now:** The repo surged ~4,000 stars this week, coinciding with growing adoption of autonomous coding agents and the launch of the `skills` CLI from Vercel Labs that enables one-command install into 70+ agent tools.

**Build with it:** Run `npx skills add addyosmani/agent-skills` to wire all 25 skills into Claude Code or Cursor, then use `/build auto` to let the agent autonomously execute a spec-to-commit cycle with per-task test gates and pause-on-failure guardrails.
