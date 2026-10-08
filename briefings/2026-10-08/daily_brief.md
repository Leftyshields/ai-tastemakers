# AI Tastemakers — Daily Brief — 2026-10-08

_Ranking: delta_7d · 10 repos · generated 2026-10-08T19:16:08.827Z_


## 1. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 103313 (+3013 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** Agent Skills packages 25 slash-command-driven workflows (`/spec`, `/build`, `/test`, `/review`, `/ship`, etc.) as installable rules that steer AI coding agents through the full development lifecycle with consistent quality gates.

**Why now:** The repo crossed 103K stars with 3,000+ added this week, signaling a sharp spike in adoption as Claude Code, Cursor, and Codex users standardize agent workflows around shared skill sets.

**Build with it:** Run `npx skills add addyosmani/agent-skills --skill test-driven-development` to drop a red-green-refactor enforcement skill into your Claude Code or Cursor project and immediately gate any `/build` session behind passing tests.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 22653 (+17340 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, ctf, decompiler, developer-tools, disassembler, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, reverse-engineering, static-analysis

**What it does:** REA is a TypeScript MCP server that connects AI agents (Claude Code, Cursor, Codex, Gemini CLI) to local reverse-engineering tools—Hopper, Ghidra, and static JS analysis—so agents can inspect closed-source binaries, Electron apps, and .NET assemblies without source code.

**Why now:** The repo gained 17,340 stars this week, signaling a sharp spike in builder attention that makes it a live target for MCP-based tooling experiments right now.

**Build with it:** Run `npx rea-agents setup`, point it at an Electron app you want to replicate a feature from, and let your agent walk the decompiled output through REA's binary-analysis MCP tools.

## 3. TencentCloud/Octop

https://github.com/TencentCloud/Octop · ★ 7981 (+1766 this week) · agent, agentic-ai, ai, ai-agent, ai-agents, local-first, long-term-memory

**What it does:** Octop is a self-hosted, multi-user AI assistant that runs multiple specialized agents in parallel, accessible via web dashboard, CLI, or IM platforms (Feishu, Telegram, Discord, WeChat, and others) with JWT-based user isolation and pluggable memory.

**Why now:** The repo gained 1,766 stars this week, signaling a fast-moving adoption spike for its AgentTeams beta — a coordinator-driven multi-agent workflow feature released at v1.0.2b6.

**Build with it:** Deploy Octop locally via `pip install octop`, then wire a custom expert to an MCP-compatible tool through the Connector gateway to validate its OAuth + tool-approval flow in a real multi-user session.

## 4. lexmount/moli

https://github.com/lexmount/moli · ★ 13769 (+10739 this week) · ai-agents, ai-tools, browser, browser-automation, cloud-browser, kitesurf, playwright, puppeteer, rust, servo, web-crawler, web-crawling, web-scraper, web-scraping

**What it does:** Moli is a headless browser built in Rust for AI agents, supporting CDP, WebDriver Classic, and WebDriver BiDi, with on-demand layout and rendering to keep resource use low while delivering a full browser runtime.

**Why now:** The repo gained 10,739 stars this week, signaling a sharp spike in developer attention likely tied to growing demand for lightweight, agent-native browser tooling as an alternative to Playwright/Puppeteer stacks.

**Build with it:** Point an existing AI agent at the `moli-webfetch` skill in the repo, install the prebuilt binary via the one-line curl installer, and use `moli fetch --dump semantic_tree_text` to pipe structured page content directly into your agent's context.

## 5. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 158275 (+8059 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript skill/ruleset for AI coding agents (Claude Code, Cursor, and 19 others) that enforces a "laziest senior dev" heuristic — writing less code, fewer tokens, and shipping tests for risky logic by default.

**Why now:** Ponytail 5 launched this week with a ground-up rebuild benchmarked against Claude Code on a real FastAPI + React repo, showing −53% code and −45% tokens versus the no-skill baseline, driving 8,059 new stars in seven days.

**Build with it:** Install `@dietrichgebert/ponytail` from npm and wire it into your Claude Code setup as a plugin to immediately constrain your agent's output toward minimal, tested implementations.

## 6. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 94031 (+6699 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) authenticated, parsed access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu with no API fees or manual scraper setup.

**Why now:** The repo hit GitHub Trending #1 this week with 6,699 new stars, signaling a breakout moment driven by builder demand for free-tier internet access in agentic workflows.

**Build with it:** Point your MCP-compatible agent at Agent Reach's CLI to pull structured Reddit threads or YouTube transcripts directly into a research or summarization workflow — no API key configuration required.

## 7. yihui-dev/awesome-opus5-5-videos <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/yihui-dev/awesome-opus5-5-videos · ★ 3100 (+866 this week) · ai-video, awesome, awesome-list, claude, claude-opus, creative-coding, motion-graphics, prompts, threejs

**What it does:** A curated list of 513 prompts behind viral Claude Opus 5.5 animation videos (HTML Canvas, SVG, Three.js), each linking to the creator's original post and a live remake on Skillry.

**Why now:** The repo gained 866 stars this week alongside a batch update adding 38 motion graphics and explainer videos on 2026-10-08, making it a fresh signal of what Opus 5.5 can generate in a single code-writing pass.

**Build with it:** Copy a prompt from `prompts/` directly into a Claude Opus 5.5 session to generate a self-contained animation file you can embed or extend immediately.

## 8. Oldcircle/geo-sleuth <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Oldcircle/geo-sleuth · ★ 1432 (+860 this week) · agent-skills, ai-agents, claude-code, codex, computer-vision, cursor, gemini-cli, geoguessr, geoint, geolocation, github-copilot, image-geolocation, opencode, openstreetmap, osint, photo-geolocation, reverse-image-search, satellite-imagery

**What it does:** geo-sleuth is a Python agent skill that locates where a photo was taken using OpenStreetMap geometry, elevation skyline matching, satellite imagery, and street view — without relying on text, plates, or named landmarks — then returns camera position, facing direction, and a satellite evidence image.

**Why now:** The repo gained 860 stars this week, driven by visible traction around SKILL.md-compatible agents (Claude Code, Gemini CLI, Codex, Cursor), which are all converging on a shared skill-installation convention at the same moment.

**Build with it:** Run `npx skills add Oldcircle/geo-sleuth` to wire it into your existing Claude Code or Gemini CLI setup, then trigger it by passing a photo and saying *find where this photo was taken* — making geolocated photo analysis a one-sentence agent command in any pipeline that shells out to those tools.

## 9. QingYunA/answer-me-with-html <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/QingYunA/answer-me-with-html · ★ 2319 (+848 this week) · agent-skill, ai-agent, claude-code, claude-code-skill, claude-skill, claude-skills, cli, diagram, explainer, html, llm, ste100

**What it does:** An agent skill for Claude Code, Codex, Cursor, and similar tools that intercepts a question, has the model write a Markdown draft (~612 tokens), then uses a local CLI to compile it into a full one-page HTML with SVG diagrams and CSS — producing output 2.6× faster than asking the model to hand-write HTML.

**Why now:** The repo gained 848 stars this week, coinciding with benchmarked evidence (reproducible via `node bench/corpus.mjs`) that the skill cuts model-written tokens 8× versus direct HTML generation.

**Build with it:** Drop the skill into an existing Claude Code setup using always-on mode, then route explanation-heavy prompts — architecture walkthroughs, tech comparisons, onboarding docs — through it to get readable single-file HTML pages without touching CSS or SVG by hand.

## 10. CursorTouch/Windows-MCP <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/CursorTouch/Windows-MCP · ★ 8304 (+710 this week) · ai, desktop, mcp, tools, windows, windows-automation

**What it does:** Windows-MCP is a Python MCP server that exposes Windows UI automation to any LLM—keyboard/mouse input, window control, app launching, and a DOM mode for browser scraping—without requiring computer vision or fine-tuned models.

**Why now:** The repo gained 710 stars this week and recently crossed 2 million users in the Claude Desktop Extensions directory, signaling sharp adoption momentum.

**Build with it:** Wire it into Claude Desktop via `uvx windows-mcp` and use the `use_dom=True` flag on the State-Tool to drive Chrome or Edge workflows directly from natural-language prompts.
