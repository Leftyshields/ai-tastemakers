# Skill Tastemakers — Daily Brief — 2026-11-23

_Ranking: delta_7d · 10 repos · generated 2026-11-24T02:09:23.560Z_


## 1. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 207977 (+5625 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is a web scraping and crawling API that converts websites, PDFs, and Office documents into clean markdown for AI agents, with access to search and 550+ data providers through a single API.

**Why now:** The project gained 5,625 stars this week alongside a community-built llms.txt generator that turns any scraped site into a single LLM-ready text file, reflecting fresh demand for structured web-to-AI pipelines.

**Build with it:** Run `cargo install firecrawl-local` and use `firecrawl-local init` to wire Firecrawl into Claude Desktop or Cursor as an MCP server, giving your local AI agent live web scraping without any external service.

## 2. elementalsouls/Claude-BugHunter

https://github.com/elementalsouls/Claude-BugHunter · ★ 19863 (+12435 this week) · ai-security, anthropic, application-security, bug-bounty, bugbounty, bugcrowd, claude, claude-code, claude-skills, ethical-hacking, hackerone, offensive-security, pentesting, red-team, security-tools, web-security

**What it does:** Claude-BugHunter is a skill bundle for Claude Code (Anthropic's coding agent) that loads 84 skills and 15 slash commands covering 681 curated HackerOne report patterns across 24 vulnerability classes, plus enterprise identity and infrastructure attack chains.

**Why now:** The project surfaced on Hacker News this week and crossed 12,000 stars in a single week, pointing to rapid uptake among bug-bounty hunters and red teams.

**Build with it:** Install via `/plugin marketplace add elementalsouls/Claude-BugHunter` inside Claude Code and run the `hunt` engagement scaffolder against an authorized target to generate scoped recon folders and chain templates.

## 3. pingdotgg/t3code

https://github.com/pingdotgg/t3code · ★ 74939 (+12176 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code is an MIT-licensed control plane that runs Claude Code, Codex, and other ACP-compatible coding agents on your local machine and surfaces them through a single interface across desktop, web, iOS, and Android.

**Why now:** The repo crossed 12,000 stars this week and landed on Hacker News, reflecting sharp builder interest in running multiple coding agents from one place.

**Build with it:** Install the `t3` CLI via the one-liner curl script, connect an existing Claude Code or Codex login, and use the ACP provider config to route tasks between agents mid-thread without touching each tool's separate UI.

## 4. morluto/rea

https://github.com/morluto/rea · ★ 475681 (+11603 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is an MCP server (a standard interface for wiring tools to AI agents) that lets agents inspect native binaries, JavaScript and Electron apps, .NET assemblies, and websites without access to source code.

**Why now:** The repo gained over 11,000 stars this week, pointing to a surge of interest in agent-driven reverse engineering workflows.

**Build with it:** Run `npx rea-agents setup` to wire REA into your agent as an MCP tool, then prompt it to analyze a closed-source app feature and return a working reimplementation.

## 5. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 120010 (+1686 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** A set of 26 slash-command skills, including spec, plan, build, test, review, and ship, that encode senior-engineer workflows into AI coding agents like Claude Code, Cursor, and Codex.

**Why now:** The repo gained over 1,600 stars this week and is trending on Trendshift, as teams look to standardize AI agent behavior across development workflows.

**Build with it:** Run `npx skills add addyosmani/agent-skills` to install all 26 skills into your existing Claude Code or Cursor setup and immediately gate code merges behind the `/review` quality checklist.

## 6. D4Vinci/Scrapling

https://github.com/D4Vinci/Scrapling · ★ 105305 (+1668 this week) · ai, ai-scraping, automation, crawler, crawling, crawling-python, data, data-extraction, mcp, mcp-server, playwright, python, scraping, selectors, stealth, web-scraper, web-scraping, web-scraping-python, webscraping, xpath

**What it does:** Scrapling is a Python web scraping framework that handles static requests, JS-rendered pages via Playwright, stealth browser automation, and adaptive element re-location when site layouts change.

**Why now:** The repo gained 1,668 stars this week and recently added MCP server support, making it directly callable by AI agents without custom glue code.

**Build with it:** Point an AI agent at Scrapling's published agent skill endpoint to add authenticated, stealth-capable web scraping to any MCP-compatible workflow in one config step.

## 7. EL4CTEO/fast-anything <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/EL4CTEO/fast-anything · ★ 3167 (+1434 this week) · agent-skills, ai-agents, claude-code, claude-code-plugin, codex, developer-tools, ffi, mcp, mcp-server, napi-rs, nodejs, optimization, performance, profiler, pyo3, python, rewrite-it-in-rust, ruby, rust, typescript

**What it does:** fast-anything profiles a Python, Node, Ruby, or other supported app, isolates the slowest functions, uses a coding agent to port only those to Rust, and replays up to 500 recorded real calls plus derived edge cases to verify correctness before swapping the port in.

**Why now:** The repo gained 1,434 stars this week, with interest likely tied to the Claude Code plugin ecosystem and the MCP server integrations it ships alongside.

**Build with it:** Point it at an existing Python script with `fast-anything go --agent claude -- python app.py` and let the `verify` step confirm the Rust port matches the original on real call recordings before you commit anything.

## 8. earendil-works/pi

https://github.com/earendil-works/pi · ★ 123535 (+1183 this week) · —

**What it does:** Pi is a minimal TypeScript agent harness with a coding-agent CLI, built-in TUI, and a unified LLM API that you extend through skills, prompt templates, and themes packaged as ordinary npm modules.

**Why now:** The repo is gaining roughly 1,183 stars this week as builders look for composable agent tooling they can actually customize and redistribute.

**Build with it:** Write a Pi extension or skill in TypeScript, publish it to npm as a Pi package, and drop it into any project via `pi` to wire custom agent behavior into your existing coding workflow.

## 9. HKUDS/CLI-Anything

https://github.com/HKUDS/CLI-Anything · ★ 63722 (+7856 this week) · —

**What it does:** CLI-Anything wraps existing desktop and CLI software in structured, agent-callable interfaces so AI agents can drive tools like CAD editors, 3D renderers, and subtitle generators without custom integration code.

**Why now:** The repo gained nearly 8,000 stars this week and landed on GitHub Trending, with community tooling and CLI submissions flowing into its public CLI-Hub registry.

**Build with it:** Install a community harness via `pip install cli-anything-hub` and `cli-hub install <name>`, then wire the resulting JSON-output CLI into your agent's tool-call loop as a named function.

## 10. stablyai/orca

https://github.com/stablyai/orca · ★ 134595 (+7840 this week) · agent-ide, ai-agents, automation, bot, claude-code, codex, ghostty, grok-bot, hermes-agent, mobile-app, muse, openclaw, opencode, orchestration, pi, runtime, swarm, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop, mobile, and remote IDE for running fleets of AI coding agents, including Claude Code, Codex, and Grok, across parallel workspaces, with orchestration, Slack/Linear/GitHub bot integrations, and a chat-or-terminal UI.

**Why now:** The repo gained roughly 7,840 stars this week, coinciding with broader momentum around autonomous coding agents running unsupervised across large codebases.

**Build with it:** Connect an existing Claude Code or Codex subscription, then configure an Orca Bot in your GitHub repo to automatically open pull requests when triggered by issue comments.
