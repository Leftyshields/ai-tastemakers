# AI Tastemakers — Daily Brief — 2026-10-15

_Ranking: delta_7d · 10 repos · generated 2026-10-15T17:45:49.055Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 264932 (+251113 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is an MCP server (a standardized way to connect AI agents to external tools) that lets agents inspect closed-source binaries, JavaScript/Electron apps, .NET assemblies, and websites by driving reverse-engineering tools like Ghidra, Hopper, or IDA — no source code required.

**Why now:** The repo picked up 251,000 stars this week, a viral breakout that has spawned active Q&A and showcases on its linked Discord right now.

**Build with it:** Run `npx rea-agents setup` to register REA with your agent and point it at an existing Ghidra or Hopper install, then ask the agent to trace a closed-source feature down to its binary implementation.

## 2. corsairdev/corsair

https://github.com/corsairdev/corsair · ★ 14834 (+1412 this week) · agentic-ai, agents, ai, ai-agents, aiagents, api-integration, corsair, developer-tools, function-calling, integrations, javascript, llm, managed-oauth, mcp, oauth, oauth2, typescript, unified-api

**What it does:** Corsair is an open-source integration platform that gives every third-party API a unified REST syntax, serving AI agents, backend services, and multi-tenant user dashboards from the same layer.

**Why now:** 1,412 stars this week reflect growing demand for integration layers that work across both agent and traditional SaaS workflows without requiring MCP-native support.

**Build with it:** Wire up a multi-tenant OAuth flow with Corsair's managed-OAuth adapter so your users can connect their own third-party accounts without you storing or refreshing tokens.

## 3. career-ops-hq/career-ops

https://github.com/career-ops-hq/career-ops · ★ 74956 (+1248 this week) · agent-skills, ai-agent, ai-job-search, ats, career, career-ops, careerops, claude-code, cli, cover-letter, cv, interview-prep, job-application, job-hunting, job-search, latex, local-first, open-source, resume, terminal

**What it does:** career-ops is a local CLI agent that scores job listings 1–5 against your CV, then generates an ATS-friendly resume, cover letter, and interview prep for each application you decide to pursue.

**Why now:** The project crossed 74,000 GitHub stars with 1,248 added this week alongside Wired coverage, putting it in front of a large wave of new users right now.

**Build with it:** Point it at Claude Code or Codex as the AI backend, paste a job URL, and feed the numeric scores as a filterable signal into your own job-tracker pipeline.

## 4. anthropics/claude-plugins-official

https://github.com/anthropics/claude-plugins-official · ★ 38724 (+1227 this week) · claude-code, mcp, skills

**What it does:** Anthropic's official plugin directory for Claude Code — hosting internal and community-contributed MCP servers, slash commands, agents, and skill bundles installable via `/plugin install {name}@claude-plugins-official`.

**Why now:** 1,227 stars this week coincide with expanded Claude Code adoption and the formalization of the external plugin submission pipeline, making this the active moment to get a plugin listed.

**Build with it:** Submit a skill-bundle plugin by pointing a marketplace entry at a git subdirectory containing `SKILL.md` files with `strict: false`, registering your skills as `<plugin-name>:<skill-name>` without needing a full `plugin.json` manifest.

## 5. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 164231 (+6764 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor) that enforces a "laziest senior dev" heuristic — steering the agent toward deleting code and rejecting unnecessary additions rather than generating more.

**Why now:** v5 benchmarks against Claude Code with Opus 5.5 show a 53% reduction in generated code and test coverage of risky logic climbing from 68% to 98%, which is a concrete data point in the ongoing debate about agents writing too much.

**Build with it:** Add `@dietrichgebert/ponytail` to your Claude Code plugin config and run it against an existing FastAPI or React repo to measure how many lines your next feature actually requires.

## 6. lexmount/moli

https://github.com/lexmount/moli · ★ 18646 (+6345 this week) · ai-agents, ai-tools, browser, browser-automation, cloud-browser, kitesurf, playwright, puppeteer, rust, servo, web-crawler, web-crawling, web-scraper, web-scraping

**What it does:** Moli is a headless browser written in Rust for AI agents — supporting CDP, WebDriver Classic/BiDi, and CLI access with on-demand layout and rendering to keep resource usage low.

**Why now:** 6,345 stars this week signal sharp builder interest worth acting on before the tooling ecosystem around it solidifies.

**Build with it:** Point an existing AI agent at Moli's `moli-webfetch` skill (under `/skills` in the repo) to add structured web-fetch capability via CLI in a single install step.

## 7. genspark-ai/genoffice

https://github.com/genspark-ai/genoffice · ★ 9752 (+901 this week) · ai, ai-agent, claude-code, cli, codex, cursor, docx, excel, libreoffice-alternative, local-first, markdown-editor, microsoft-office-alternative, office-suite, pdf-editor, pdf-to-word, powerpoint, pptx, skills, spreadsheet, xlsx

**What it does:** GenOffice is a local-first, open-source office suite (macOS/Windows/Linux) that reads and writes native `.docx`, `.xlsx`, and `.pptx` files with a built-in AI agent that makes tracked, reviewable edits — plus a `genoffice` CLI and MCP server so coding agents like Claude Code, Codex, and Cursor can generate real Office files programmatically.

**Why now:** The repo crossed 9,700 stars with 900 added this week, coinciding with the CLI and MCP server launch that opened agent-driven document workflows as a concrete new integration surface.

**Build with it:** Wire the `genoffice` MCP server into Claude Code, prompt it to draft a `.pptx` report from structured data, then inspect the tracked-change diff to validate AI output before saving.

## 8. onehumanbeing/esp32-iphone-agent <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/onehumanbeing/esp32-iphone-agent · ★ 2353 (+893 this week) · ai-agent, airplay, automation, computer-use, esp32, esp32-s3, iphone, llm, usb-hid

**What it does:** An ESP32-S3 microcontroller acts as both an AirPlay receiver — giving a vision model eyes via screen mirroring — and a USB HID mouse/keyboard, giving it hands, while an on-device iPhone app runs the planner/actor loop with no Mac, jailbreak, or developer account required.

**Why now:** 893 stars this week coincide with the v0.2.0 release that eliminates the external computer entirely, with the board now handling the hotspot, H.264 passthrough, and BLE relay.

**Build with it:** Point the app at any OpenAI-compatible vision model endpoint — including a self-hosted Ollama instance — to run fully local phone automation using the existing model config surface.

## 9. heygen-com/hyperframes

https://github.com/heygen-com/hyperframes · ★ 64343 (+5921 this week) · ai, animation, ffmpeg, framework, gsap, html, mcp, puppeteer, rendering, typescript, video

**What it does:** HyperFrames is an open-source TypeScript framework that converts HTML, CSS, and seekable GSAP animations into deterministic MP4 videos via Puppeteer and FFmpeg, driven by CLI, MCP, or AI coding agent skills.

**Why now:** Nearly 6,000 stars this week followed its Claude Code plugin marketplace listing and native Mac/Linux app release, making this an active adoption moment.

**Build with it:** Install the Claude Code plugin (`claude plugin marketplace add heygen-com/hyperframes`) and run `/hyperframes` to render a branded video slide deck directly from an existing HTML file.

## 10. ruvnet/ruflo <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ruvnet/ruflo · ★ 74943 (+887 this week) · agentic-ai, agentic-framework, agentic-workflow, agents, ai-agents, ai-assistant, ai-skills, autonomous-agents, claude, codex, dsh-plugin, harness, mcp-server, multi-agent, multi-agent-systems, npm, skills, swarm, swarm-intelligence, typescript

**What it does:** Ruflo is a TypeScript meta-harness that coordinates multi-agent swarms — groups of AI agents working in parallel — across Claude Code and Codex via plugins or a local MCP server, with built-in memory, routing, and a terminal UI for monitoring cost, events, and swarm state.

**Why now:** +887 stars this week coincide with its ecosystem crossing 12.52M npm downloads over 12 months, signaling real adoption across the Claude Code and Codex toolchains.

**Build with it:** Run `npx ruflo@latest init wizard` in any project, then point your MCP client at `npx -y ruflo@latest mcp start` to expose swarm-coordination tools over stdio without installing Claude Code.
