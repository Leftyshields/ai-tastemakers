# Skill Tastemakers — Daily Brief — 2026-09-16

_Ranking: delta_7d · 10 repos · generated 2026-09-16T17:39:04.961Z_


## 1. kepano/obsidian-skills

https://github.com/kepano/obsidian-skills · ★ 48442 (+8333 this week) · agents, agentskills, bases, claude, clawdbot, cli, codex, defuddle, hermes, jsoncanvas, knap, markdown, md, obsidian, openclaw, opencode, skills

**What it does:** A collection of Agent Skills-spec-compatible skill files that teach Claude Code, Codex, or OpenCode how to read and write Obsidian-native formats — Markdown with wikilinks, Bases, JSON Canvas, and CLI commands.

**Why now:** The repo gained 8,333 stars this week, signaling a surge of interest likely tied to growing adoption of the Agent Skills specification across major coding agents.

**Build with it:** Drop the repo into `~/.opencode/skills/obsidian-skills/` and restart OpenCode to give your agent native Obsidian vault editing — no config changes needed, skills auto-discover via `SKILL.md` files.

## 2. danny-avila/LibreChat <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/danny-avila/LibreChat · ★ 44106 (+1141 this week) · ai, anthropic, artifacts, aws, azure, chatgpt, chatgpt-clone, claude, clone, deepseek, gemini, google, gpt-5, librechat, mcp, o1, openai, responses-api, vision, webui

**What it does:** LibreChat is a self-hosted web UI that lets users switch between OpenAI, Anthropic, Google Gemini, DeepSeek, and other LLM providers in one interface, with Agents, MCP support, Code Interpreter, file search, and multi-user auth built in.

**Why now:** v0.8.8-rc3 just shipped a beta Agent Management API with OIDC machine-client auth and attached workspaces that let Agents read, write, and execute Bash — a concrete new surface that didn't exist last week.

**Build with it:** Point the Agent Management API at your own backend by registering a deployment-bound OIDC identity, then wire up a custom Agent with file-write and Bash-execution permissions to automate a dev workflow directly inside LibreChat.

## 3. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 140160 (+6980 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a skill/prompt layer for AI coding agents (Claude Code, Cursor, and 19 others) that enforces a "laziest senior dev" heuristic — preferring native browser APIs, built-ins, and fewer lines over installing libraries or over-engineering.

**Why now:** It hit Hacker News this week (98 points, 17 comments) alongside a published agentic benchmark showing ~54% mean token reduction across 12 real feature tasks against a fair baseline.

**Build with it:** Drop the ponytail skill into your Claude Code setup and run it against a feature branch to measure how many library installs or wrapper components it eliminates before merging.

## 4. stablyai/orca

https://github.com/stablyai/orca · ★ 70121 (+5180 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile orchestration layer that runs Codex, Claude Code, OpenCode, or Pi in parallel git worktrees — letting you fan one prompt across multiple agents, compare outputs, and merge the winner.

**Why now:** The repo gained 5,180 stars this week, coinciding with visible traction around parallel agentic coding workflows as teams push Codex and Claude Code into daily CI loops.

**Build with it:** Point Orca at an existing repo, split one prompt across three worktrees each running a different agent (e.g., Codex vs. Claude Code vs. OpenCode), then use the built-in merge workflow to ship the winning diff.

## 5. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 43524 (+761 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a native C binary MCP server that indexes a codebase into a persistent knowledge graph using tree-sitter AST parsing across 162 languages, answering structural queries (functions, call chains, HTTP routes) in under 1ms with 15 exposed MCP tools.

**Why now:** The project hit 43K+ stars and published a backing arXiv preprint (2603.27277) benchmarked across 31 real-world repos showing 10× fewer tokens and 2.1× fewer tool calls versus file-by-file exploration.

**Build with it:** Point it at an existing repo, run `install` to auto-configure one of the 45 supported client surfaces (Cursor, Claude Code, Windsurf, etc.), and replace ad-hoc file-read tool calls in your agent with graph queries against the generated knowledge graph.

## 6. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 259948 (+5010 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness layer that adds skills, memory, security (via `ecc-agentshield`), and research-first workflows on top of Claude Code, Codex, Opencode, and Cursor.

**Why now:** The repo gained over 5,000 stars this week, coinciding with rapid ecosystem growth around Claude Code and MCP tooling as developers race to extend agentic coding setups.

**Build with it:** Install `ecc-universal` from npm and drop it into an existing Claude Code workflow to immediately layer persistent memory and agent security checks onto your coding sessions.

## 7. langgenius/dify

https://github.com/langgenius/dify · ★ 155966 (+748 this week) · agent, agentic-ai, agentic-framework, agentic-workflow, ai, automation, claude, deepseek, genai, gpt, llm, low-code, mcp, nextjs, no-code, openai, python, skills, workflow

**What it does:** Dify is a collaborative workspace for building agentic workflows and RAG pipelines, with connectors for models (GPT, Claude, DeepSeek), tools, and MCP, deployable on cloud, VPC, or self-hosted infrastructure.

**Why now:** The repo gained 748 stars this week and recently added MCP support, tracking one of the fastest-moving integration surfaces in the LLM tooling ecosystem right now.

**Build with it:** Wire a DeepSeek model into a Dify RAG pipeline using the low-code workflow editor to validate retrieval quality before committing to a custom stack.

## 8. alsk1992/CloddsBot <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/alsk1992/CloddsBot · ★ 2752 (+718 this week) · agi, ai, arbitrage, claude, crypto, defi, ethereum, futures, hft, hyperliquid, kalshi, polymarket, prediction-markets, pumpswap, solana, telegram-bot, trading, trading-bot, typescript, x402

**What it does:** Clodds is a self-hosted TypeScript trading agent that connects Claude to 10 prediction markets (Polymarket, Kalshi), 7 futures exchanges (Hyperliquid, Binance), Solana DEXs (Jupiter, Pump.fun), and 5 EVM chains via 118+ built-in strategies including whale tracking, arbitrage detection, and DCA bots.

**Why now:** The repo hit 10,700 Git clones in 14 days and gained 718 stars this week after being built for the Colosseum Agent Hackathon on Solana, surfacing it to a concentrated audience of on-chain builders.

**Build with it:** Run `npm install -g` from the latest GitHub release, then use the `clodds onboard` wizard to wire your Anthropic API key to a Polymarket or Kalshi account and test natural-language order routing against live prediction market odds.

## 9. SenteLabsAI/OpenExecutive <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/SenteLabsAI/OpenExecutive · ★ 4740 (+711 this week) · ai, anthropic, claude, fastapi, llm, multi-agent, nextjs, python, rag, typescript

**What it does:** OpenExecutive runs eight specialist AI agents (CSO, CFO, GC, etc.) behind a single FastAPI + Next.js interface, giving businesses a unified executive voice with RAG over company documents and cross-session episodic memory in SQLite.

**Why now:** The repo gained 711 stars this week, coinciding with the project's public demo drop on YouTube — a common inflection point where early adopters stress-test real workflows and surface integration gaps.

**Build with it:** Drop your own Markdown files into `knowledge/builtin/` to replace or extend the default MBA knowledge base, then query the CFO or GC agents to validate whether your custom domain expertise surfaces correctly in synthesized responses.

## 10. Wei-Shaw/sub2api

https://github.com/Wei-Shaw/sub2api · ★ 41705 (+695 this week) · 2api, antigravity2api, cc2api, claude, claude-code, codex, crs, crs2, gemini

**What it does:** Sub2API is an open-source gateway that pools Claude, OpenAI, Gemini, and Grok subscriptions behind a single API endpoint, enabling quota sharing and cost splitting across users.

**Why now:** The repo gained ~695 stars this week and is trending on Trendshift, coinciding with active developer interest in cost-sharing workarounds for Claude Code and Codex usage limits.

**Build with it:** Point Claude Code's API base URL at a self-hosted Sub2API instance to distribute a shared Anthropic subscription across a team without each member needing their own plan.
