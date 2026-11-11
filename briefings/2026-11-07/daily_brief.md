# AI Tastemakers — Daily Brief — 2026-11-07

_Ranking: delta_7d · 10 repos · generated 2026-11-07T19:21:09.825Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 440512 (+25495 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a Model Context Protocol (MCP) server that connects AI agents to reverse engineering tools, letting them inspect binaries, applications, and runtime behavior without source code.

**Why now:** The repo gained over 25,000 stars this week, a sharp signal of builder interest in agent-driven binary analysis workflows.

**Build with it:** Run `npx rea-agents setup` to wire REA into an MCP-compatible agent like Claude Code, then point it at a closed app to inspect features down to the native binary level.

## 2. vercel-labs/agent-desktop

https://github.com/vercel-labs/agent-desktop · ★ 18748 (+12236 this week) · accessibility, accessibility-api, ai-agents, automation, cli, computer-use, computer-use-agent, computer-use-agents, desktop-automation, macos, mcp, rust

**What it does:** `agent-desktop` reads the OS accessibility tree of macOS, Windows, and Linux desktop apps and exposes every interactive element as a JSON ref, letting an AI agent click, type, and verify UI state without screenshots or pixel matching.

**Why now:** The repo gained over 12,000 stars this week, reflecting a surge of builder interest in accessibility-tree-based computer control as an alternative to vision-model approaches.

**Build with it:** Run `agent-desktop snapshot --app <AppName> -i` to capture an app's element tree, then drive actions against the returned refs with `agent-desktop click @<ref_id>` to test the full read-act-verify cycle.

## 3. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 113873 (+1696 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** A set of 25 slash-command skills, including spec, plan, build, test, review, and ship, that encode senior-engineer workflows into AI coding agents like Claude Code, Cursor, and Codex.

**Why now:** The repo gained roughly 1,700 stars this week and landed on Trendshift's trending list, tracking with broader adoption of agentic coding tools.

**Build with it:** Run `npx skills add addyosmani/agent-skills` to install all 25 skills, then trigger `/build auto` to have the agent plan and implement a feature autonomously while still committing each task individually with tests.

## 4. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 65352 (+11130 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency dsh plugin that grants free, uncapped access to frontier models including DeepSeek V4.1 Flash and Kimi K3, with no login, sign-up, or API key required.

**Why now:** The repo topped both the Trendshift daily chart and the JavaScript weekly chart for the week of 2026-10-05 to 2026-10-11, marking a sharp spike in builder attention.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL and key to route requests through the free model pool without touching upstream credentials.

## 5. ccch1mneyyy/dsh-Go

https://github.com/ccch1mneyyy/dsh-Go · ★ 14227 (+10700 this week) · ai-agent, android, android-app, coding-agent, deepseek, deepseek-harness, dsh, dsh-plugin, dsh-tui, flutter, llm

**What it does:** DSH Go is an Android client built in Flutter and Dart for Android 8 and above that runs DeepSeek Harness locally on your phone or remotely controls a desktop DSH instance, with animated desktop-pet companions that show agent status.

**Why now:** The repo gained 10,700 stars this week and hit the Trendshift all-language daily top spot on 2026-10-30, a clear signal of rapid community interest.

**Build with it:** Sideload the arm64 APK from GitHub Releases, point it at an existing DSH server, and use the DSH plugin surface to wire phone-triggered agent confirmations into your current coding workflow.

## 6. D4Vinci/Scrapling

https://github.com/D4Vinci/Scrapling · ★ 99233 (+8426 this week) · ai, ai-scraping, automation, crawler, crawling, crawling-python, data, data-extraction, mcp, mcp-server, playwright, python, scraping, selectors, stealth, web-scraper, web-scraping, web-scraping-python, webscraping, xpath

**What it does:** Scrapling is a Python web scraping framework covering everything from single HTTP requests to full browser-based crawls, with built-in stealth features, adaptive element tracking, and an MCP server interface for AI agents.

**Why now:** The repo gained over 8,400 stars this week, rising alongside active demand for MCP server tooling from builders wiring AI agents into live web data.

**Build with it:** Point an AI agent at Scrapling's published agent skill endpoint to scrape and extract structured data from dynamic sites without managing browser infrastructure yourself.

## 7. microsoft/TokenEconomizer <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/microsoft/TokenEconomizer · ★ 4943 (+1202 this week) · agentic-ai, agentic-coding, ai-coding, ai-coding-assistant, anthropic, artificial-intelligence, claude-code, codex, coding-agent, coding-agents, cost-optimization, cost-reduction, developer-tools, github-copilot, llm, open-source, openai, productivity, token-optimization

**What it does:** TokenEconomizer wraps existing coding agents, including Claude Code, Codex, and GitHub Copilot CLI, as a black-box layer that cuts API costs 18-31% by learning three things across sessions: repo-specific command facts called micro-skills, which tools are never used so they can be pruned, and when an agent is stuck in a failure loop so it can intervene.

**Why now:** The repo gained 1,200 stars this week alongside an arXiv paper drop and an X post from the lead author, marking its public research release.

**Build with it:** Point TokenEconomizer at a repository you run agents in repeatedly and let it accumulate micro-skills over three sessions to see whether the cost reduction holds for your specific codebase and agent combination.

## 8. ConardLi/garden-skills

https://github.com/ConardLi/garden-skills · ★ 14602 (+1166 this week) · agent, claude, gpt-image-2, rag, skills, web-design

**What it does:** Garden Skills is a curated set of six plug-and-play SKILL.md-spec agent skills covering motion video rendering, web design, GPT Image 2 prompting, article generation, and local knowledge retrieval for Claude Code, Cursor, and Codex.

**Why now:** The repo gained over 1,100 stars this week, tracking with broader adoption of Claude Code's plugin marketplace where these skills can be installed directly.

**Build with it:** Install a skill via `npx skills` into an existing Claude Code project, then invoke the `kb-retriever` skill to add local document retrieval to your agent workflow without writing custom RAG tooling.

## 9. yihui-dev/awesome-opus5-5-videos

https://github.com/yihui-dev/awesome-opus5-5-videos · ★ 14040 (+1151 this week) · ai-video, awesome, awesome-list, claude, claude-opus, creative-coding, motion-graphics, prompts, threejs

**What it does:** A curated list of 703 prompts behind viral Claude Opus 5.5 animation videos, each producing runnable HTML, Canvas, SVG, or Three.js code, with 418 entries paired to live remakes on Skillry.

**Why now:** The repo added 285 prompts and 10 new videos on 2026-10-12, the largest single batch since launch, making it a timely reference for anyone benchmarking Opus 5.5's creative-coding output.

**Build with it:** Copy a prompt from the `prompts/` directory into your Claude Opus 5.5 agent and use the returned HTML file as a drop-in animation asset for a landing page or demo reel.

## 10. FailproofAI/failproofai

https://github.com/FailproofAI/failproofai · ★ 8222 (+1130 this week) · agent-failure, agent-harness, agent-observability, agent-reliability, agent-tracing, ai-agent, claude-code, codex, enforcement, evals, guardrails, hermes, hooks, llm, llm-failures, llm-observability, npm-package, observability, openclaw, reliability

**What it does:** Failproof hooks into 12 agent harnesses, including Claude Code and Codex, to capture every tool call and block dangerous actions before they execute using 40 built-in policies, all running locally with no added latency.

**Why now:** The repo gained 1,130 stars this week, coinciding with rising adoption of coding CLI agents where unguarded tool execution is an active concern for teams shipping agentic workflows.

**Build with it:** Install the `failproofai` npm package, point it at your Claude Code sessions, and use the policy API to block specific tool calls without modifying your agent code.
