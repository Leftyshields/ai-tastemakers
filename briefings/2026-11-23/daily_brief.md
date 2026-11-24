# AI Tastemakers — Daily Brief — 2026-11-23

_Ranking: delta_7d · 10 repos · generated 2026-11-24T02:07:16.169Z_


## 1. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 207977 (+5625 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl converts websites into clean markdown and structured data through a scrape/crawl/map API, and now ships a Rust binary called `firecrawl-local` that doubles as an MCP server (a protocol letting AI agents call external tools), with a hosted option adding search and 550+ data providers through Alexandria.

**Why now:** The repo picked up over 5,600 stars this week, coinciding with `firecrawl-local` landing on crates.io as a zero-infrastructure alternative to the hosted service.

**Build with it:** Run `firecrawl-local init` to auto-register Firecrawl as an MCP server in Claude Desktop, Cursor, or Windsurf and give your agent live web scraping and crawling with no API key or container required.

## 2. blader/humanizer

https://github.com/blader/humanizer · ★ 72761 (+2863 this week) · agent-skills, ai-humanizer, ai-writing, chatgpt, claude, claude-code, codex, cursor, humanize-ai-text, humanizer, llm, prompt-engineering, writing-tools

**What it does:** Humanizer is an agent skill that rewrites AI-generated text by targeting 26 specific patterns, like staged run-ups and one-line closers, without changing the underlying meaning.

**Why now:** The repo gained roughly 2,863 stars this week at a moment when AI-written content is under growing scrutiny from readers and platforms alike.

**Build with it:** Install it into Claude Code with `/plugin marketplace add blader/humanizer`, then pipe your draft release notes through `/humanizer` to validate its rewriting logic against real output.

## 3. elementalsouls/Claude-BugHunter

https://github.com/elementalsouls/Claude-BugHunter · ★ 19861 (+12434 this week) · ai-security, anthropic, application-security, bug-bounty, bugbounty, bugcrowd, claude, claude-code, claude-skills, ethical-hacking, hackerone, offensive-security, pentesting, red-team, security-tools, web-security

**What it does:** Claude-BugHunter is a Claude Code skill bundle that loads 84 skills and 15 slash commands covering 24 vulnerability classes, enterprise identity attack chains, and 681 disclosed HackerOne report patterns, turning Claude Code into a structured bug-hunting and red-team assistant.

**Why now:** The repo gained over 12,000 stars this week, reflecting a sharp spike in adoption among security researchers evaluating AI-assisted offensive tooling.

**Build with it:** Install via `/plugin marketplace add elementalsouls/Claude-BugHunter` inside Claude Code, then run a `hunt-*` skill against a scoped target like DVWA or Juice Shop to test the detection patterns and chain templates against a known-vulnerable app.

## 4. pingdotgg/t3code

https://github.com/pingdotgg/t3code · ★ 74931 (+12170 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code is an MIT-licensed control plane (a central interface for managing and running AI coding agents) that runs Claude Code, Codex, Cursor, and other ACP-compatible agents locally while exposing them through a single interface across desktop, web, iOS, and Android.

**Why now:** The repo gained over 12,000 stars this week as builder interest in multi-agent orchestration workflows keeps accelerating.

**Build with it:** Install the `t3` CLI via the one-liner curl script, connect an existing Claude Code or Codex session, and use the Git worktree-per-thread feature to review diffs and open pull requests without leaving the interface.

## 5. cheaper-inference/OmniRoute

https://github.com/cheaper-inference/OmniRoute · ★ 89900 (+1791 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted MIT-licensed AI gateway that routes requests across 375 providers and 1,400+ models through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression that cuts usage by 15-95%.

**Why now:** The repo gained 1,791 stars this week while developer interest in stacking free tiers across Claude, Gemini, and Groq keeps climbing.

**Build with it:** Point Claude Code or Cursor at OmniRoute's local endpoint and let the auto-fallback routing absorb rate-limit errors across connected free-tier providers without changing any other config.

## 6. morluto/rea

https://github.com/morluto/rea · ★ 475679 (+11603 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is an MCP server (a protocol layer that lets AI agents call external tools) that connects agents to reverse-engineering tools for inspecting native binaries, JavaScript and Electron apps, .NET assemblies, and websites without source code.

**Why now:** The repo gained over 11,600 stars this week, reflecting a sharp surge in builder interest around agent-driven binary analysis workflows.

**Build with it:** Run `npx rea-agents setup` to wire REA into your existing MCP-compatible agent and point it at a closed-source app to extract feature behavior you want to replicate.

## 7. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 85110 (+7833 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency, zero-configuration dsh plugin that provides free, uncapped access to frontier models including DeepSeek V4.1 Flash and Kimi K3, with no login, API key, or quota approval required.

**Why now:** The repo hit number one on both the GitHub daily trending chart and the Trendshift JavaScript weekly chart for the week of 2026-10-05 to 2026-10-11.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's built-in forwarding port using its base URL and key to route requests through the free model pool without touching upstream credentials.

## 8. xerj-org/xerj

https://github.com/xerj-org/xerj · ★ 20255 (+1100 this week) · agent-memory, ai-agents, bm25, claude-code, cli, code-search, cursor, database, elasticsearch, full-text-search, hybrid-search, jsonl, local-first, mcp, mcp-server, model-context-protocol, rag, rust, search-engine, vector-search

**What it does:** XERJ is a single Rust binary that indexes code, docs, logs, JSONL, CSV, and PDFs for BM25 full-text, vector, and hybrid search, exposing an Elasticsearch-compatible API with native MCP server support so agents can query it directly.

**Why now:** The project hit rc.101 this week, shipping a new query layer called XERJ Query-1, and landed the number-one Rust repository of the week on Trendshift with 1,100 new stars.

**Build with it:** Point an MCP client like Claude Code or Cursor at the XERJ MCP server endpoint to give your coding agent hybrid search over a local codebase, with zero config via the autoindex CLI.

## 9. jiwoochris/artex-global <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/jiwoochris/artex-global · ★ 4717 (+1094 this week) · ai-agent, autonomous-agents, blue-team, cybersecurity, detection-engineering, i18n, korean, llm, penetration-testing, security, security-research, security-tools, sigma-rules, threat-detection

**What it does:** ARTEX is an LLM multi-agent system that autonomously runs penetration tests end-to-end, from reconnaissance through exploitation, storing discovered assets and vulnerabilities in a PostgreSQL-backed knowledge graph via a single Go binary with an embedded Next.js frontend.

**Why now:** The repo gained over 1,000 stars this week, likely driven by reporting that linked the upstream Autumn-27/ARTEX to personal-data breaches at Korean financial institutions in October 2026, drawing urgent interest from defenders studying how autonomous AI attacks unfold.

**Build with it:** Point the framework at a local DVWA or Juice Shop instance and feed its agent output into your existing Sigma rule pipeline using the detection signatures in `docs/defense-en.md` to validate coverage against autonomous attack chains.

## 10. aoci-spec/aoci-code <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/aoci-spec/aoci-code · ★ 2971 (+1042 this week) · agent-memory, agents-md, ai-coding, ai-context, claude-code, code-indexing, code-intelligence, codex, coding-agent, context-engineering, cursor, database-schema, golang, llm, local-first, mcp, mcp-server, model-context-protocol, opencode, repo-map

**What it does:** AOCI-CODE runs a local MCP server that maintains a Git-versioned, one-line-per-file index of your codebase, so coding agents like Claude Code, Codex, and Cursor read the index once per task instead of re-scanning the entire repo each time.

**Why now:** The repo gained over 1,000 stars this week and hit GitHub Trending, tracking with a broader wave of builders hitting context-window limits on long-running agent projects.

**Build with it:** Point your MCP-compatible agent at an existing codebase, ask it to build the initial index, and configure the MCP server so subsequent tasks auto-update index entries after each code change.
