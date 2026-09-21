# AI Tastemakers — Daily Brief — 2026-09-21

_Ranking: delta_7d · 10 repos · generated 2026-09-21T18:41:03.861Z_


## 1. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 264603 (+6349 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness optimization layer that adds skills, memory, security (AgentShield), and research-first workflows to AI coding agents like Claude Code, Codex, Cursor, and Opencode via CLAUDE.md config files and npm packages.

**Why now:** The repo is trending on GitHub this week with +6,349 stars, coinciding with rapid adoption of Claude Code and the broader shift toward agentic coding workflows where prompt discipline and memory management are active pain points.

**Build with it:** Drop `ecc-universal` via npm into an existing Claude Code or Cursor project, configure agent behavior through CLAUDE.md, and wire in `ecc-agentshield` as a security middleware layer for sandboxed agent execution.

## 2. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 49682 (+2743 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source Chinese-authored book, *AI Agents in Depth*, covering agent design and engineering across 10 chapters with 109 hands-on experiments spanning RAG, MCP, multi-agent systems, context engineering, and RL-based post-training.

**Why now:** The repo gained 2,743 stars this week and hit GitHub Trending Project of the Day, coinciding with its v2.0 restructure that reorganized multimodal agent and async interaction content into a new dedicated chapter.

**Build with it:** Clone the repo, run the per-chapter Python experiments against your own LLM backend, and use the MCP and multi-agent chapters as a structured blueprint for wiring tool-calling pipelines into production coding agents.

## 3. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 143632 (+5403 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent-skill plugin for Claude Code and Cursor that injects a "laziest senior dev" heuristic into AI coding agents, steering them toward minimal, already-existing solutions instead of scaffolding new dependencies.

**Why now:** The repo is trending hard this week (+5,403 stars), coinciding with broader builder interest in cost and token reduction for agentic Claude Code workflows following Anthropic's Haiku 4.5 release.

**Build with it:** Drop the `@dietrichgebert/ponytail` npm package into your Claude Code or Cursor setup as a cursor-rules plugin, then benchmark your own feature tasks against the provided agentic benchmark scripts in `/benchmarks` to measure actual code-reduction gains.

## 4. Tencent/WeKnora

https://github.com/Tencent/WeKnora · ★ 28440 (+5275 this week) · agent, agentic, ai, chatbot, dsh-plugin, embeddings, evaluation, generative-ai, golang, knowledge-base, llm, multi-tenant, ollama, openai, question-answering, rag, reranking, semantic-search, vector-search, wiki

**What it does:** WeKnora is a Go-based, self-hostable knowledge platform that ingests documents from 10+ sources (Feishu, Notion, GitLab, RSS, etc.), exposes them via RAG Q&A and a ReAct agent, and continuously distills content into a self-maintaining interlinked markdown Wiki with revision history.

**Why now:** The repo spiked 5,275 stars this week following its public release under Tencent's GitHub org, surfacing a production-grade Go alternative to Python-heavy RAG stacks like Dify and RAGFlow at a moment when teams are actively evaluating LLM knowledge-base infrastructure.

**Build with it:** Wire your existing Notion or GitLab workspace to WeKnora's multi-source ingestor, then expose a scoped API key with a principal model to embed a context-aware agent widget into an internal tool — chunk editing and Langfuse observability give you a feedback loop to tune retrieval without touching model weights.

## 5. hypit-ai/hypit

https://github.com/hypit-ai/hypit · ★ 12563 (+4002 this week) · agentic-ai, ai, ai-agents, ai-video, compiler, dsl, ffmpeg, generative-ai, llm, markup-language, monorepo, plugin-system, programming-language, text-to-video, typescript, video, video-automation, video-clone, video-editing, video-generation

**What it does:** Hypit is a TypeScript monorepo that uses AI agents, a custom DSL/compiler, and FFmpeg to analyze a viral video then generate 100 variants — swapping face, voiceover, and B-roll — from a single CLI command.

**Why now:** The repo hit #1 on Trendshift for both daily overall and daily TypeScript repositories this week, signaling a concentrated wave of builders actively evaluating it for video automation workflows.

**Build with it:** Wire it into a content pipeline by writing a `.hypit` DSL script that targets a source video URL, configure the plugin system to call your preferred TTS and face-swap APIs, then run `hypit generate --variants 100` to batch-render and A/B test hooks across short-form platforms.

## 6. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 98074 (+3788 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** A collection of 25 slash-command-driven "skills" (spec, plan, build, test, review, ship, etc.) that encode senior-engineer workflows into structured prompts for AI coding agents like Claude Code, Cursor, and Codex.

**Why now:** The repo gained nearly 4,000 stars this week, coinciding with rapid adoption of agentic coding tools and the launch of a `skills` CLI (`npx skills add`) that supports 70+ agents in a single install command.

**Build with it:** Drop `/build auto` into a Claude Code session after running `npx skills add addyosmani/agent-skills` — it generates a plan, runs test-driven tasks autonomously, commits each slice individually, and pauses on failures, giving you an auditable agentic build loop without manual task-stepping.

## 7. D4Vinci/Scrapling

https://github.com/D4Vinci/Scrapling · ★ 82802 (+1875 this week) · ai, ai-scraping, automation, crawler, crawling, crawling-python, data, data-extraction, mcp, mcp-server, playwright, python, scraping, selectors, stealth, web-scraper, web-scraping, web-scraping-python, webscraping, xpath

**What it does:** Scrapling is a Python web scraping framework that handles adaptive element selection, stealth browser automation via Playwright, and full-crawl orchestration — with built-in MCP server support for agent integration.

**Why now:** The repo gained 1,875 stars this week and recently shipped an MCP server interface plus an agent skill endpoint, landing squarely in the current wave of LLM-driven tool-use pipelines.

**Build with it:** Wire Scrapling's MCP server into a Claude or LangChain agent to give it live web-scraping capability — use the `scrapling.readthedocs.io/en/latest/ai/agent-skill.html` skill definition as the integration entry point.

## 8. FailproofAI/failproofai <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/FailproofAI/failproofai · ★ 5058 (+1765 this week) · agent-failure, agent-harness, agent-observability, agent-reliability, agent-tracing, ai-agent, claude-code, codex, enforcement, evals, guardrails, hermes, hooks, llm, llm-failures, llm-observability, npm-package, observability, openclaw, reliability

**What it does:** Failproof hooks into 12 AI agent harnesses (Claude Code, Codex, Hermes, OpenClaw, and others) to capture every tool call, enforce 39 built-in policies locally before execution, and maintain a unified session audit trail across all runtimes.

**Why now:** The repo jumped 1,765 stars this week, coinciding with rapid adoption of Claude Code and Codex CLI as primary coding agents — both of which are now natively supported harnesses with verified pre-execution blocking.

**Build with it:** Install the `failproofai` npm package, wire it into your Claude Code or Codex workflow via its hook config, and use the policy API to block dangerous tool calls (file deletions, shell escapes) before they run — no proxy or network hop required.

## 9. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 120153 (+3469 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus its docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using local deterministic AST parsing via tree-sitter, with every edge explicitly explained and no vector store required. It exposes a `/graphify` slash command as a skill for Claude Code, Cursor, Codex, and Gemini CLI.

**Why now:** Graphify is trending at +3,469 stars this week, coinciding with the rapid adoption of agentic coding tools (Claude Code, Gemini CLI) that support custom slash-command skills, making a graph-native code-understanding layer immediately pluggable into workflows developers are actively building today.

**Build with it:** Register the `/graphify` MCP skill in your Claude Code or Cursor config, then query cross-file call graphs, SQL schema relationships, and doc linkages directly from your agent chat instead of writing bespoke grep or embedding pipelines.

## 10. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 84300 (+3232 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that scrapes Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu for AI agents without paid APIs, returning clean text instead of raw HTML.

**Why now:** The repo hit GitHub Trending #1 this week with 3,232 new stars, coinciding with widespread Claude Code and Cursor adoption where agents routinely stall on internet-access tasks.

**Build with it:** Wire it into a Claude Code or Cursor MCP config as a tool server so your coding agent can pull YouTube transcripts, Reddit threads, or GitHub Issues inline during a session — no separate scraper setup required.
