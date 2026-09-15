# AI Tastemakers — Daily Brief — 2026-09-15

_Ranking: delta_7d · 10 repos · generated 2026-09-15T17:39:51.506Z_


## 1. kepano/obsidian-skills

https://github.com/kepano/obsidian-skills · ★ 48376 (+8267 this week) · agents, agentskills, bases, claude, clawdbot, cli, codex, defuddle, hermes, jsoncanvas, knap, markdown, md, obsidian, openclaw, opencode, skills

**What it does:** A collection of agent skills that teach AI coding agents (Claude Code, Codex, OpenCode) to read and write Obsidian-native formats—Obsidian Flavored Markdown, Bases, JSON Canvas—and interact with Obsidian vaults via CLI.

**Why now:** The repo gained 8,267 stars this week, coinciding with the emergence of the Agent Skills specification as a cross-agent standard, making this an early practical implementation builders can reference or extend.

**Build with it:** Clone into `~/.opencode/skills/obsidian-skills` or drop into `/.claude` in your vault root, then wire the `knap` skill to batch-generate structured notes from CSV data or use `defuddle` in an agent pipeline to scrape and store clean markdown directly into your vault.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 139199 (+7261 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent-skill / prompt plugin for Claude Code and Cursor that steers AI coding agents toward minimal solutions — deleting unnecessary abstractions, skipping over-engineered dependencies, and favoring the smallest correct implementation.

**Why now:** The repo surged 7,261 stars this week, coinciding with heavy Claude Code adoption and growing builder frustration with agents that scaffold entire component libraries to solve a two-line problem.

**Build with it:** Drop the skill into your `CLAUDE.md` or Cursor rules file and point it at feature tasks where your agent habitually over-builds — the benchmarks folder includes a reproducible agentic test suite against FastAPI + React you can run to validate behavior on your own codebase.

## 3. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 259050 (+5081 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness configuration layer that adds skills, memory, instincts, and security scaffolding on top of AI coding agents like Claude Code, Codex, Opencode, and Cursor.

**Why now:** Claude Code's rapid adoption as a terminal-native coding agent has created demand for standardized harness configs; ECC targets that gap directly as Claude Code usage spikes among developers this week.

**Build with it:** Drop ECC's CLAUDE.md skill definitions and AgentShield security package (`ecc-agentshield` on npm) into an existing Claude Code project to enforce guardrails and persistent memory across sessions.

## 4. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 47558 (+2275 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source Chinese-authored book (with 15-language community translations) covering AI Agent design and engineering across 10 chapters, paired with 109 runnable Python experiments spanning RAG, MCP, multi-agent systems, context engineering, and reinforcement learning fine-tuning.

**Why now:** The repo hit GitHub's trending #1 project of the day this week, pulling 2,275 stars in seven days, coinciding with its v2.0 restructure that reorganized multimodal agent and async interaction content into a new dedicated chapter.

**Build with it:** Clone the repo, run the chapter-matched experiments under the `labs/` structure to wire up a working MCP-based tool-calling agent, then use the context-engineering and memory chapters as a spec for designing your own agent's state management layer.

## 5. Tencent/WeKnora <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Tencent/WeKnora · ★ 23965 (+2129 this week) · agent, agentic, ai, chatbot, dsh-plugin, embeddings, evaluation, generative-ai, golang, knowledge-base, llm, multi-tenant, ollama, openai, question-answering, rag, reranking, semantic-search, vector-search, wiki

**What it does:** WeKnora is a Go-based, self-hostable knowledge platform that ingests documents from 10+ sources (Notion, GitLab, Feishu, etc.), exposes them via RAG Q&A and a ReAct agent, and auto-generates a self-maintaining interlinked markdown Wiki with revision history and rollback.

**Why now:** The repo spiked 2,129 stars this week, coinciding with v0.8.0 shipping Wiki Mode—a net-new capability that converts raw document ingestion into an agent-maintained knowledge graph with one-click rollback.

**Build with it:** Wire your existing Ollama or LiteLLM endpoint into WeKnora's multi-tenant workspace, then use the scoped API keys and the `dsh-weknora` npm plugin to embed a domain-specific Q&A agent directly into an internal dashboard or customer-facing site.

## 6. trailhq/Graft <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/trailhq/Graft · ★ 8015 (+1878 this week) · ai-agents, anthropic, claude-code, cli, code-graph, codex, context-engineering, cursor, developer-tools, gemini, knowledge-graph, llm, mcp, mcp-server, open-source, openai, tree-sitter

**What it does:** Graft is an open-source MCP server and CLI that builds a Tree-sitter-powered code knowledge graph of your repo, then feeds precise symbol-level context to coding agents like Claude Code, Cursor, and Codex — cutting token usage by ~42% and improving correctness scores on SWE-bench Verified.

**Why now:** The repo spiked 1,878 stars this week, coinciding with broad builder interest in context-engineering as a discipline distinct from prompting, and Graft directly targets the token-cost pain of agentic coding loops that is a current focal point across developer communities.

**Build with it:** Drop Graft in as an MCP server via `npx @nanonets/graft mcp`, wire it into your Claude Code or Cursor config, then use `graft grep` and `graft map` to expose the call-graph surface your agent queries instead of blindly reading whole files.

## 7. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 66517 (+3652 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hostable TypeScript gateway that exposes 352 AI providers and 1,200+ models behind a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman prompt compression claiming 15–95% token reduction.

**Why now:** The repo gained 3,652 stars this week, placing it among trending TypeScript projects at a moment when Codex CLI and Claude Code are pushing developers to wire multiple provider APIs into autonomous coding workflows.

**Build with it:** Point Cursor, Cline, or Claude Code's `OPENAI_BASE_URL` at your OmniRoute instance to get automatic free-tier rotation across providers like Gemini, DeepSeek, and Groq without changing any other tooling config.

## 8. D4Vinci/Scrapling

https://github.com/D4Vinci/Scrapling · ★ 81117 (+1748 this week) · ai, ai-scraping, automation, crawler, crawling, crawling-python, data, data-extraction, mcp, mcp-server, playwright, python, scraping, selectors, stealth, web-scraper, web-scraping, web-scraping-python, webscraping, xpath

**What it does:** Scrapling is a Python web scraping framework that handles everything from single HTTP requests to full browser-based crawls with stealth Playwright support, adaptive CSS/XPath selectors, and a built-in MCP server for agent integration.

**Why now:** The repo gained 1,748 stars this week, coinciding with its addition of MCP server support and an agent skill interface — landing precisely as AI agent tooling becomes a primary adoption driver for scraping infrastructure.

**Build with it:** Wire Scrapling's MCP server directly into a Claude or OpenAI agent loop to give it autonomous, bot-detection-resistant web access, using `StealthyFetcher` for JS-heavy pages and the adaptive selector engine to survive DOM changes across runs.

## 9. didilili/ai-agents-from-zero <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/didilili/ai-agents-from-zero · ★ 4647 (+1710 this week) · agent, agent-framework, agentic-ai, ai-agent, aigc, coze, cursor, deepagents, dify, gpt, langchain, langgraph, llm, mcp, rag, skills, tutorial

**What it does:** A Chinese-language, open-source curriculum for building AI agents end-to-end, covering LangChain, LangGraph, Coze, Dify, MCP, RAG, and prompt engineering with runnable code, two complete production projects (NL2SQL e-commerce query agent and multi-agent deep research), and an interview question bank.

**Why now:** The repo gained 1,710 stars this week, coinciding with the May 17 completion of the DeepAgents multi-agent "deep research" project module — giving builders a fresh, self-contained reference implementation at the moment multi-agent patterns are seeing peak engineering interest.

**Build with it:** Fork the `deepsearch-agents` source repo and swap in your own domain-specific tools via LangGraph's node/edge config to produce a research agent pipeline, then use the included NL2SQL LangGraph project as a template for wiring structured data retrieval into the same agent loop.

## 10. addyosmani/agent-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/addyosmani/agent-skills · ★ 94636 (+1662 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** A collection of 25 slash-command-driven engineering skills (spec, plan, build, test, review, ship) that encode senior-engineer workflows into AI coding agents like Claude Code, Cursor, and Codex.

**Why now:** The repo surged 1,662 stars this week, coinciding with rapid adoption of agentic coding tools and the launch of a companion skills CLI (`npx skills`) supporting 70+ agents from a single install command.

**Build with it:** Run `npx skills add addyosmani/agent-skills` to drop all 25 skills into Claude Code or Cursor, then wire `/build auto` into your CI review step so the agent runs spec-to-commit autonomously, pausing only on test failures.
