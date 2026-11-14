# AI Tastemakers — Daily Brief — 2026-11-14

_Ranking: delta_7d · 10 repos · generated 2026-11-14T19:51:31.663Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 459527 (+19015 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server that lets AI agents reverse engineer closed binaries, apps, and runtime behavior down to the native-binary level, without source code.

**Why now:** The repo picked up 19,000 new stars this week after appearing on trending charts, a sharp signal of builder interest in agent-driven reverse engineering.

**Build with it:** Run `npx rea-agents setup` to wire REA into any MCP-compatible agent (Claude Code, for example), then point it at a competitor app to extract and replicate a specific feature into your own codebase.

## 2. career-ops-hq/career-ops

https://github.com/career-ops-hq/career-ops · ★ 82560 (+1665 this week) · agent-skills, ai-agent, ai-job-search, ats, career, career-ops, claude-code, claude-code-plugin, claude-plugin, cover-letter, cv, good-first-issue, interview-preparation, interview-questions, job-application, job-hunting, job-search, latex, open-source, resume

**What it does:** career-ops is an open-source AI job search agent that scores job listings against your CV, tailors your resume and cover letter for ATS systems, and drafts interview prep answers, running locally inside Codex, OpenCode, or as a Claude Code plugin.

**Why now:** The repo added roughly 1,665 stars this week and carries a `claude-code-plugin` topic, putting it squarely in the current wave of Claude Code plugin experimentation.

**Build with it:** Install it as a Claude Code plugin, point it at a job board URL, and run the scoring-to-application workflow against your own CV as a concrete integration smoke test.

## 3. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 74259 (+8907 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency dsh (DeepSeek Harness, an open agent shell) plugin that exposes frontier models including DeepSeek V4.1 Flash and Kimi K3 through the OpenCode Zen and Kilo AI public gateways, with no login, API key, or build step required.

**Why now:** The repo topped the Trendshift JavaScript weekly chart for the week of 2026-10-05 to 2026-10-11, adding over 8,900 stars in that window.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL and key to route free model calls without touching upstream credentials.

## 4. ChromeDevTools/chrome-devtools-mcp <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ChromeDevTools/chrome-devtools-mcp · ★ 56199 (+1268 this week) · browser, chrome, chrome-devtools, debugging, devtools, mcp, mcp-server, puppeteer

**What it does:** `chrome-devtools-mcp` is an MCP server that gives coding agents (Claude, Cursor, Copilot, and others) direct control of a live Chrome browser to automate actions, capture performance traces, analyze network requests, and read console messages with source-mapped stack traces.

**Why now:** The repo gained over 1,200 stars this week as developers actively test MCP-based browser tooling inside agent workflows.

**Build with it:** Add the one-line `mcpServers` config block to your MCP client, then prompt your agent to record a performance trace on a target URL and return insights pulled straight from Chrome DevTools.

## 5. ccch1mneyyy/dsh-Go

https://github.com/ccch1mneyyy/dsh-Go · ★ 22669 (+8442 this week) · ai-agent, android, android-app, coding-agent, deepseek, deepseek-harness, dsh, dsh-plugin, dsh-tui, flutter, llm

**What it does:** DSH Go is an Android client (Flutter/Dart, Android 8+) that runs DeepSeek Harness locally on your phone or remotely controls a desktop DSH instance, with animated on-screen pets that reflect agent state: typing, done, waiting for confirmation, or idle.

**Why now:** The repo gained 8,442 stars this week and hit Trendshift's all-language daily number-one spot.

**Build with it:** Sideload the arm64 APK from GitHub Releases, point it at an existing DSH server on your local network, and use it as a mobile approval interface for agent tool-call confirmations.

## 6. haydenschmitty/floorplan <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/haydenschmitty/floorplan · ★ 4293 (+1149 this week) · ai-coding, architecture-diagram, claude, claude-code, claude-code-plugin, codebase-visualization, codex, codex-plugin, developer-tools, onboarding, openai, vibe-coding

**What it does:** Floorplan is a Claude Code or Codex plugin that reads your codebase and generates an interactive, zoomable map of every component, file, and HTTP endpoint, with plain-English labels and annotated connections between them.

**Why now:** The repo gained 1,149 stars this week and is trending on Trendshift, driven by builders who want visibility into what their AI coding tool actually produced.

**Build with it:** Install the Claude Code plugin, run it against an existing vibe-coded project, and use the resulting map to audit which parts Claude touched in your last session before making the next change.

## 7. elie222/rakazo

https://github.com/elie222/rakazo · ★ 8404 (+962 this week) · ai-agents, chatgpt, docker, electron, expo, grok, llm, self-hosted, typescript

**What it does:** Rakazo is a self-hosted, open-source alternative to Grok Bot that gives each AI agent its own persistent memory, a browser-and-desktop computer, scheduled routines, and app integrations, running on any model you supply.

**Why now:** The repo gained roughly 962 stars this week, tracking a broader push from builders who want self-hosted agent infrastructure instead of closed platforms.

**Build with it:** Run the one-liner Docker Compose installer, point it at your own OpenAI or local model key, then wire a Gmail or Slack integration from the catalog to test a scheduled routine against a real workflow.

## 8. KKKKhazix/AIHOT

https://github.com/KKKKhazix/AIHOT · ★ 10685 (+959 this week) · ai, chinese, content-curation, daily-digest, docker-compose, llm, mcp, news-aggregator, postgresql, rss, self-hosted, typescript

**What it does:** AIHOT is a self-hosted TypeScript framework that ingests RSS, web, JSON, X, and WeChat sources, runs dual-scored LLM curation against configurable prompts, clusters duplicate coverage into single events, ranks them by independent-source heat, and publishes daily, weekly, and monthly digests automatically.

**Why now:** The repo gained nearly 1,000 stars this week, with builders using the included prompt and scoring scaffolding to spin up vertical news sites for their own industries.

**Build with it:** Fork the repo, replace the 18 demo RSS feeds with your own industry sources, and edit the prompts in `industry/prompts/` to set your selection criteria and scoring thresholds without touching any application code.

## 9. anthropics/claude-plugins-official

https://github.com/anthropics/claude-plugins-official · ★ 47283 (+934 this week) · claude-code, mcp, skills

**What it does:** This is Anthropic's official plugin directory for Claude Code, hosting first-party plugins and serving as the `claude-plugins-official` marketplace from which users install plugins via `/plugin install {plugin-name}@claude-plugins-official`.

**Why now:** The repo's structure is shifting this week: third-party plugin submissions are moving to claude.ai/directory/manage and `marketplace.json` is being narrowed to Anthropic-only entries, so now is the moment to understand the new submission boundary before the old path closes.

**Build with it:** Reference `/plugins/example-plugin` to scaffold a compliant plugin folder structure, then submit it at claude.ai/directory/manage to get it listed across Claude products.

## 10. can1357/oh-my-pi

https://github.com/can1357/oh-my-pi · ★ 39026 (+890 this week) · ai-agent, ai-coding-agent, anthropic, bun, claude, cli, coding-assistant, llm, mcp, multi-provider, openai, rust, terminal, tui, typescript

**What it does:** oh-my-pi (omp) is a terminal-based coding agent with built-in IDE capabilities, shipping 60+ LLM providers, 31 tools, 14 LSP operations, 28 DAP (debugger protocol) operations, and roughly 80k lines of Rust core.

**Why now:** The repo crossed 39k stars, adding 890 this week, and pull requests are now open to all contributors after previously requiring a vouch, making this a practical window to get changes merged.

**Build with it:** Install via `bun install -g @oh-my-pi/pi-coding-agent` and wire it into an existing project using the MCP config surface to expose custom tools to the agent loop.
