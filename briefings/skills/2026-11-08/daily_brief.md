# Skill Tastemakers — Daily Brief — 2026-11-08

_Ranking: delta_7d · 10 repos · generated 2026-11-08T19:30:59.228Z_


## 1. stablyai/orca

https://github.com/stablyai/orca · ★ 119161 (+7530 this week) · agent-ide, ai-agents, automation, bot, claude-code, codex, ghostty, grok-bot, hermes-agent, mobile-app, muse, openclaw, opencode, orchestration, pi, runtime, swarm, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop, mobile, and remote app that runs multiple coding agents (Claude Code, Codex, and others) in parallel git worktrees, with a coordinator agent that splits tasks across workers and collects results.

**Why now:** A "Show HN: Open Source 'Conductor + Ghostty'" thread surfaced the project on Hacker News this week, putting it in front of builders actively evaluating agent-orchestration tooling.

**Build with it:** Point Orca at an existing repo, assign a large feature task to a coordinator agent, and let it spin up worker agents in isolated worktrees to test whether parallel execution cuts your iteration time.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 443248 (+28228 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a protocol for connecting AI agents to external tools) that lets agents inspect closed binaries, mobile apps, and runtime behavior without source code.

**Why now:** A Hacker News thread this week drew 101 points and 39 comments, surfacing real builder interest in agent-driven binary analysis.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent and have it explain how a specific closed-source app feature works down to the binary level.

## 3. firecrawl/firecrawl

https://github.com/firecrawl/firecrawl · ★ 199746 (+2383 this week) · ai, ai-agents, ai-crawler, ai-scraping, ai-search, crawler, data-extraction, html-to-markdown, llm, markdown, scraper, scraping, web-crawler, web-data, web-data-extraction, web-scraper, web-scraping, web-search, webscraping

**What it does:** Firecrawl is a web scraping and crawling API that converts any URL into LLM-ready markdown, structured JSON, or screenshots, handling JS rendering, proxies, and rate limits automatically.

**Why now:** The team shipped an llms.txt generator that turns any website into a single text file for LLM consumption, surfacing this week on Hacker News alongside growing momentum around agent-ready data pipelines.

**Build with it:** Point the `/scrape` endpoint at a competitor's docs site and pipe the markdown output directly into your RAG pipeline using the Python or Node SDK.

## 4. ai-job-search-dev/ai-job-search

https://github.com/ai-job-search-dev/ai-job-search · ★ 70493 (+2109 this week) · ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume

**What it does:** A forkable Claude Code framework that runs six slash commands (`/scrape`, `/rank`, `/apply`, `/interview`, `/outcome`) to evaluate job postings, tailor LaTeX CVs, write cover letters, and track results, all locally on your machine.

**Why now:** The repo crossed 2,000 stars this week, driven by the author's documented real-world result: 69 tailored applications, 20 first interviews, and a signed engineering role starting June 2026.

**Build with it:** Fork the repo, fill in your profile via `/setup`, and pipe a job posting URL into `/apply` to generate a tailored CV and cover letter against your own career data.

## 5. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 114073 (+1896 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** agent-skills packages 25 production-grade workflow skills (spec, plan, build, test, review, ship, and more) as slash commands that AI coding agents follow consistently across the development lifecycle.

**Why now:** The repo gained nearly 1,900 stars this week, reflecting strong builder interest in structured, repeatable agent workflows as an alternative to ad-hoc prompting.

**Build with it:** Run `npx skills add addyosmani/agent-skills` to install all 25 skills into Claude Code, Cursor, or Codex, then use `/build auto` to let the agent generate a plan and implement every task in a single approved pass.

## 6. earendil-works/pi

https://github.com/earendil-works/pi · ★ 120807 (+1642 this week) · —

**What it does:** Pi is a minimal, extensible coding agent CLI and TypeScript SDK built around a unified LLM API and agent loop, customizable through extensions, skills, prompt templates, and shareable npm packages.

**Why now:** The repo gained over 1,600 stars this week, with the spike tied directly to its extension and packaging model, which lets teams distribute agent behavior the same way they distribute libraries.

**Build with it:** Write a Pi extension or skill, bundle it as an npm package, and wire it into an existing project using the TypeScript SDK's RPC interface.

## 7. mattpocock/skills

https://github.com/mattpocock/skills · ★ 318390 (+10209 this week) · —

**What it does:** A collection of small, composable agent skills for Claude Code, Codex, Copilot, and other coding agents, designed to give engineers fine-grained control over planning, triaging, and spec workflows without handing the process to an opinionated framework.

**Why now:** The repo crossed 318k stars with 10k added this week, signaling a sharp surge in adoption as developers react against all-or-nothing agent frameworks like BMAD and GSD.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to drop editable skill files into an existing Cursor project, then call `/setup-matt-pocock-skills` to wire in your issue tracker and start using `/triage` against real tickets.

## 8. yihui-dev/awesome-opus5-5-videos

https://github.com/yihui-dev/awesome-opus5-5-videos · ★ 14332 (+1442 this week) · ai-video, awesome, awesome-list, claude, claude-opus, creative-coding, motion-graphics, prompts, threejs

**What it does:** A curated list of 703 prompts behind viral Claude Opus 5.5 animation videos, each generating runnable HTML, Canvas, SVG, or Three.js code, with 418 entries paired to live remakes on Skillry.

**Why now:** The repo gained 1,442 stars this week and added 285 prompts on 2026-10-12, making it a current snapshot of what Opus 5.5 can produce in a single code-generation pass.

**Build with it:** Copy a prompt from the `prompts/` directory, feed it directly to Claude Opus 5.5, and use the returned HTML file as a self-contained animation asset in your project.

## 9. D4Vinci/Scrapling

https://github.com/D4Vinci/Scrapling · ★ 99769 (+8961 this week) · ai, ai-scraping, automation, crawler, crawling, crawling-python, data, data-extraction, mcp, mcp-server, playwright, python, scraping, selectors, stealth, web-scraper, web-scraping, web-scraping-python, webscraping, xpath

**What it does:** Scrapling is a Python web scraping framework covering single requests through full crawls, with built-in stealth capabilities, Playwright integration, adaptive CSS/XPath selectors that survive site redesigns, and an MCP server interface for AI agents.

**Why now:** The repo gained nearly 9,000 stars this week, likely tied to its MCP server and AI agent skill support landing just as those integration patterns are going mainstream.

**Build with it:** Point Scrapling's MCP server at an existing AI agent workflow to add authenticated, stealth-capable scraping as a tool call without writing custom browser automation code.

## 10. milind-soni/OpenMausBot

https://github.com/milind-soni/OpenMausBot · ★ 18050 (+8606 this week) · ai-agents, claude-code, codex, computer-use, docker, electron, grok, grok-bot, grok-bot-alternative, self-hosted, typescript

**What it does:** OpenMausBot is an Electron desktop app for macOS, Windows, and Ubuntu that puts a team of AI agents, each running Claude or Codex with its own personality, model, and cloud computer, into a chat-style sidebar where you talk to them like contacts and approve their actions before they execute.

**Why now:** The repo gained over 8,600 stars this week as developers searched for open-source alternatives after xAI's Grok Bot drew public attention, making this the top result in that space.

**Build with it:** Download the signed .dmg or .exe release, wire in your own Anthropic or OpenAI API key, and assign a bot a connected app to test the approve-before-execute workflow on a real task.
