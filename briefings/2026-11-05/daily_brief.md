# AI Tastemakers — Daily Brief — 2026-11-05

_Ranking: delta_7d · 10 repos · generated 2026-11-05T21:27:02.042Z_


## 1. D4Vinci/Scrapling

https://github.com/D4Vinci/Scrapling · ★ 97846 (+7538 this week) · ai, ai-scraping, automation, crawler, crawling, crawling-python, data, data-extraction, mcp, mcp-server, playwright, python, scraping, selectors, stealth, web-scraper, web-scraping, web-scraping-python, webscraping, xpath

**What it does:** Scrapling is a Python web scraping framework that handles everything from single HTTP requests to full browser-based crawls, with built-in stealth features, auto-adapting CSS/XPath selectors, and an MCP server interface (MCP is the protocol AI agents use to call external tools).

**Why now:** The repo gained 7,538 stars this week, timed with MCP server support and AI agent skill integrations landing, making it directly useful to builders already working in that ecosystem.

**Build with it:** Point Scrapling's MCP server at an existing AI agent workflow to give the agent live web scraping capabilities without writing a custom browser automation layer.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 434026 (+26879 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server that connects AI agents to reverse engineering tools, letting them inspect binaries, mobile apps, and runtime behavior without source code.

**Why now:** The repo is trending at over 26,000 new stars this week, a sharp signal of builder interest in agent-driven code analysis on closed-source targets.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent (Claude Code, for example) and have it audit a closed-source app feature down to the binary level.

## 3. google/elephant-goldfish-model <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/google/elephant-goldfish-model · ★ 12378 (+1797 this week) · agent-skills, ai-agents, antigravity, claude-code, claude-code-plugin, claude-skills, codex, codex-plugin, coding-agents, context-engineering, developer-tools, gemini, llm, multi-agent, prompt-engineering, spec-driven-development

**What it does:** EGM is an open-source plugin for coding agents (Claude Code, Codex, Antigravity) that runs a two-step workflow: a context-rich Elephant agent drafts a software specification, then zero-context Goldfish subagents stress-test it for unstated assumptions before any code is written.

**Why now:** The repo gained nearly 1,800 stars this week as multi-agent coding tools mature and teams look for ways to catch bad specs before they become bad implementations.

**Build with it:** Install with `claude plugin marketplace add google/elephant-goldfish-model` and run `/egm:egm-brainstorm` on your next feature to get a peer-reviewed `concepts_brief.md` before touching implementation.

## 4. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 62243 (+11430 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency dsh plugin that exposes frontier models including DeepSeek V4.1 Flash and Kimi K3 through OpenCode's Zen gateway and Kilo AI's free pool, requiring no login, API key, or build step.

**Why now:** The repo topped Trendshift's JavaScript weekly chart for the week of October 5-11, 2026 and gained over 11,000 stars this week, pointing to rapid adoption across the dsh plugin ecosystem.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL and key to route requests through the free model pool without touching gateway credentials directly.

## 5. vercel-labs/agent-desktop

https://github.com/vercel-labs/agent-desktop · ★ 16706 (+10194 this week) · accessibility, accessibility-api, ai-agents, automation, cli, computer-use, computer-use-agent, computer-use-agents, desktop-automation, macos, mcp, rust

**What it does:** agent-desktop reads the OS accessibility tree of macOS, Windows, and Linux apps and returns structured JSON with ref IDs that an AI agent can click or type on, with no screenshots or pixel matching required.

**Why now:** The repo gained over 10,000 stars this week as builder interest in accessibility-tree-based computer use grows as a cheaper, more reliable alternative to vision-model approaches.

**Build with it:** Wire `agent-desktop snapshot --app <YourApp> -i` into an LLM tool-call loop, using the returned `ref_id` values as targets for `agent-desktop click` to automate any desktop UI without touching the mouse.

## 6. The-PR-Agent/pr-agent <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/The-PR-Agent/pr-agent · ★ 15071 (+1377 this week) · ai, anthropic, code-review, coding-assistant, devtools, ollama, openai, pull-request, pull-requests

**What it does:** PR-Agent is a community-maintained, open-source AI code review agent that runs automated pull request analysis via GitHub Actions, CLI, or webhooks across GitHub, GitLab, Bitbucket, and Azure DevOps.

**Why now:** The repo gained 1,377 stars this week and recently migrated its Docker Hub namespace to `pragent/pr-agent` starting at release 0.34.2, making it a live upgrade decision for any team with pinned image references.

**Build with it:** Drop the provided `.github/workflows/pr-agent.yml` into your repo, add `OPENAI_KEY` as a secret, and get automated review comments on every opened or synchronized pull request within minutes.

## 7. ccch1mneyyy/dsh-Go

https://github.com/ccch1mneyyy/dsh-Go · ★ 11368 (+9010 this week) · ai-agent, android, android-app, coding-agent, deepseek, deepseek-harness, dsh, dsh-plugin, dsh-tui, flutter, llm

**What it does:** DSH Go is an Android client (Flutter/Dart, Android 8+) that runs DeepSeek Harness locally on your phone or remotely controls a desktop DSH instance, with animated on-screen pets that reflect agent state: typing, done, waiting for confirmation, or idle.

**Why now:** The repo gained 9,010 stars this week and hit Trendshift's number-one daily spot across all languages, a clear signal of fast-moving community attention.

**Build with it:** Install the arm64 APK from GitHub Releases, point it at an existing DSH session on your machine, and use remote-control mode to monitor and confirm agent tool calls from your phone without touching the desktop.

## 8. thedotmack/claude-mem

https://github.com/thedotmack/claude-mem · ★ 113492 (+8900 this week) · ai, ai-agents, ai-memory, anthropic, artificial-intelligence, chromadb, claude, claude-agent-sdk, claude-agents, claude-code, claude-code-plugin, claude-skills, embeddings, long-term-memory, mem0, memory-engine, openmemory, rag, sqlite, supermemory

**What it does:** claude-mem is a persistent memory compression system for Claude Code and other AI agents that captures session activity, compresses it with AI, and injects relevant context back into future sessions via SQLite and embedding-based retrieval.

**Why now:** The repo gained roughly 8,900 stars this week as builder interest in long-term agent memory grows alongside Claude Code usage expanding beyond single-session workflows.

**Build with it:** Install the plugin into an existing Claude Code project and point it at a local SQLite store to test cross-session context recall on a real codebase.

## 9. beenuar/AiSOC <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/beenuar/AiSOC · ★ 7269 (+1180 this week) · agentic-ai, ai-security, alert-triage, blue-team, cybersecurity, detection-engineering, incident-response, langgraph, llm-agents, mcp, mitre-attack, model-context-protocol, purple-team, security-operations, self-hosted, siem, soar, soc, threat-detection, threat-intelligence

**What it does:** AiSOC is a self-hostable Python security operations center that ingests telemetry, runs a 2,966-rule detection engine, groups alerts into incidents, and dispatches LLM agents to investigate each one with a fully recorded prompt-and-tool-call ledger before proposing a human-approved response.

**Why now:** The repo gained 1,180 stars this week alongside shipping MCP server support for Claude, Cursor, and Continue, connecting it directly to tools already open in most builders' editors.

**Build with it:** Point the bundled MCP server at your Cursor or Continue setup and use it to query the agent decision ledger from inside your editor while writing detection rules against the existing 7,407-rule library.

## 10. citrolabs/ego-lite

https://github.com/citrolabs/ego-lite · ★ 21782 (+1124 this week) · agent-skills, ai-agent, automation, browser, browser-automation, claude-code, codex, hermes-agent, skills, skills-sh

**What it does:** ego lite is a browser that runs AI agent web automation in isolated Spaces alongside your own session, exposing your real logins and tabs to agents like Codex or Claude Code via the `ego-browser` package without handing over control of the browser.

**Why now:** The repo gained over 1,100 stars this week at a moment when Claude Code and Codex are both shipping agentic browsing workflows that need exactly this kind of shared-session access.

**Build with it:** Point an existing Claude Code or Codex agent at `ego-browser` to let it hit your authenticated sessions directly, skipping any manual cookie-export or login replay step.
