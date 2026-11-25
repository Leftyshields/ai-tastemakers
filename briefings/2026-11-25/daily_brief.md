# AI Tastemakers — Daily Brief — 2026-11-25

_Ranking: delta_7d · 10 repos · generated 2026-11-25T23:33:30.086Z_


## 1. pingdotgg/t3code

https://github.com/pingdotgg/t3code · ★ 79389 (+14218 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code is an open-source control plane that runs Claude Code, Codex, and other ACP-compatible coding agents on your local machine and exposes them through a single interface across desktop, web, iOS, and Android.

**Why now:** The repo crossed 14,000 stars this week, a signal that multi-agent orchestration workflows have hit a tipping point for builders.

**Build with it:** Install via `npx t3@latest`, connect an existing Claude Code or Codex login, and use the Git worktree feature to run agent threads in isolated branches with one-click commit and pull request creation.

## 2. elementalsouls/Claude-BugHunter

https://github.com/elementalsouls/Claude-BugHunter · ★ 22945 (+11675 this week) · ai-security, anthropic, application-security, bug-bounty, bugbounty, bugcrowd, claude, claude-code, claude-skills, ethical-hacking, hackerone, offensive-security, pentesting, red-team, security-tools, web-security

**What it does:** Claude-BugHunter is a skill bundle for Claude Code (Anthropic's agentic coding tool) that loads 85 skills and 16 slash commands covering 681 disclosed HackerOne report patterns across 24 vulnerability classes, turning Claude Code into a scoped bug-hunting assistant that maps findings to Vulnerability Rating Taxonomy categories.

**Why now:** The repo gained over 11,000 stars this week as builders started treating Claude Code's plugin and skills system as a real surface for security tooling.

**Build with it:** Install via `/plugin marketplace add elementalsouls/Claude-BugHunter` inside Claude Code, then point it at a scoped target on a training platform like OWASP Juice Shop to validate the `hunt-*` skill trigger behavior before using it on authorized engagements.

## 3. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 114720 (+1671 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, MCP-compatible tools) structured access to walled-off platforms like X, Reddit, YouTube, Bilibili, and XiaoHongShu without API keys or login credentials.

**Why now:** The repo hit GitHub Trending number one this week with 1,671 new stars, driven by developers building CLI agents who keep hitting the wall of platforms that block unauthenticated or programmatic access.

**Build with it:** Point an MCP-compatible agent at Agent Reach by running `agent-reach channels` to enumerate available tools, then wire a channel like `agent-reach youtube transcript <url>` directly into your agent's tool-call loop.

## 4. morluto/rea

https://github.com/morluto/rea · ★ 478432 (+10248 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is an MCP server (a standard interface for wiring tools into AI agents) that connects agents to reverse-engineering tools for inspecting native binaries, JavaScript and Electron apps, .NET assemblies, and websites without source code.

**Why now:** The repo gained over 10,000 stars this week as agent-driven code analysis workflows moved from niche to mainstream.

**Build with it:** Run `npx rea-agents setup` to wire REA into your agent as an MCP tool, then prompt it to inspect a closed-source app feature and return a working reimplementation for your own project.

## 5. dimthink/PriceAI

https://github.com/dimthink/PriceAI · ★ 6068 (+1470 this week) · ai, ai-subscription, chatgpt, claude, gemini, grok, nextjs, price-comparison, price-tracker, supabase

**What it does:** PriceAI aggregates 200-plus third-party card-shop channels alongside official regional prices to compare subscriptions (ChatGPT Plus, Claude Pro, Gemini, Grok) and API relay services across price, stock status, and delivery risk.

**Why now:** The repo gained 1,470 stars this week, tracking closely with ongoing regional pricing shifts and builder demand for lower-cost AI API relay access.

**Build with it:** Fork the Next.js and Supabase stack, point it at a new vertical (e.g., Cursor or Codex plans), and use the existing channel-comparison data model to surface stock and price from additional card-shop sources.

## 6. mdiri-ai/SoduWork <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/mdiri-ai/SoduWork · ★ 8117 (+1307 this week) · agent-harness, agent-orchestration, agent-workflows, ai-agents, ai-workflows, anti-slop, claude-code, codex, deepseek, electron, fastapi, harness, human-in-the-loop, llm, mcp, multi-agent, opencode, plugin-system, self-hosted, team-collaboration

**What it does:** SoduWork is a self-hosted, multi-agent orchestration platform where tasks move between AI harnesses (Pi, OpenCode, DeepSeek, Codex, and others) and stay open until a human requester signs off on the acceptance criteria.

**Why now:** The repo hit number one on GitHub Trending this week, gaining over 1,300 stars, with active public beta momentum across its Discord community.

**Build with it:** Clone the repo, run `sh start.sh --desktop`, and wire a two-harness review loop where one model does the work and a second checks it against written acceptance criteria before human sign-off.

## 7. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 87083 (+7319 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** dsh-our-free-model is a zero-dependency, no-build plugin for the dsh agent harness that routes requests to free public gateways (OpenCode Zen and Kilo AI), giving you access to models like DeepSeek V4.1 Flash and Kimi K3 without an account, API key, or usage cap.

**Why now:** The repo topped both the Trendshift JavaScript daily and weekly charts for the week of 2026-10-05 to 2026-10-11, reflecting real builder demand for free frontier-model access.

**Build with it:** Drop the plugin into a dsh composition, then point any OpenAI-compatible local tool at the forwarding port the plugin exposes to get free model access in your existing workflow with no credential setup.

## 8. vercel-labs/ui <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/vercel-labs/ui · ★ 7490 (+1068 this week) · accessibility, agent, agents, ai, aria, behaviors, component, component-library, headless, mcp, react, solid, svelte, vue, web-components, webmcp

**What it does:** UI SDK is a headless TypeScript library of UI behaviors, including keyboard navigation, focus, selection, drag-and-drop, ARIA, and popups, packaged in `@ui-sdk/core` with adapters for React, Vue, Svelte, Solid, and Web Components, and designed to be authored and driven by AI agents.

**Why now:** The repo gained over 1,000 stars this week as its agent-skill tooling (`npx skills@latest add vercel-labs/ui --skill ui-sdk`) went into public beta, landing directly in the current wave of agent-based UI generation workflows.

**Build with it:** Install `@ui-sdk/core` and `@ui-sdk/react`, run `npx skills@latest add vercel-labs/ui --skill ui-sdk` to give an AI agent the skill, then have it scaffold a `definePrimitive` component with correct ARIA and keyboard behavior from a plain description.

## 9. BaaRai/ARTEX

https://github.com/BaaRai/ARTEX · ★ 20721 (+7109 this week) · ai, ai-agents, autonomous-agents, bug-bounty, docker, golang, linux, llm, mcp, nextjs, penetration-testing, pentest, postgresql, rea, react, red-team, security, security-automation, sqlite, typescript

**What it does:** ARTEX is a self-hosted, LLM-driven penetration testing platform where a planner decomposes goals into intents, workers execute them with real tools, and every finding is backed by captured HTTP traffic stored in linked asset and exploration graphs.

**Why now:** The repo gained over 7,000 stars this week as builder interest in autonomous offensive security tooling moved into the mainstream.

**Build with it:** Point ARTEX at a staging environment, configure an Ollama endpoint in System, then LLM, and use the multi-LLM worker rotation with at least two concurrent workers to run a scoped recon task and inspect the evidence-linked findings it produces.

## 10. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 210000 (+6894 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl turns websites into clean markdown via a scrape, crawl, and map API, with a local binary (`firecrawl-local`) that runs without a database or container and plugs into AI agents as an MCP server.

**Why now:** The repo gained nearly 7,000 stars this week alongside the launch of `firecrawl-local` as a Rust-installable binary that connects directly to Claude Code, Cursor, Windsurf, and Codex via `firecrawl-local init`.

**Build with it:** Run `cargo install firecrawl-local && firecrawl-local init` to wire Firecrawl into your existing Cursor or Claude Code setup as an MCP server, giving your agent live web-scraping access with no API key required for local static pages.
