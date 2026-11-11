# Skill Tastemakers — Daily Brief — 2026-11-09

_Ranking: delta_7d · 10 repos · generated 2026-11-09T23:47:10.777Z_


## 1. heygen-com/hyperframes

https://github.com/heygen-com/hyperframes · ★ 81679 (+3972 this week) · ai, ai-agents, animation, claude-code, ffmpeg, framework, gsap, html, html-to-video, mcp, motion-graphics, puppeteer, rendering, typescript, video-editor

**What it does:** HyperFrames is an open-source TypeScript framework that renders HTML, CSS, and seekable animations into deterministic MP4 videos using Chrome's BeginFrame API, operable via CLI, AI coding agents, or a hosted studio.

**Why now:** The project surfaced on Hacker News this week and is trending sharply, reflecting fresh builder appetite for HTML-to-video pipelines as AI coding agents become a standard part of dev workflows.

**Build with it:** Run `claude plugin marketplace add heygen-com/hyperframes` inside a Claude Code project, then prompt your agent to generate a video directly from an HTML template.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 446873 (+24152 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (Model Context Protocol, the standard for wiring tools into AI agents) that lets agents reverse-engineer binaries, mobile apps, and runtime behavior down to the native binary level, no source code required.

**Why now:** A Hacker News thread this week drew 101 points and 39 comments around the core pitch of using agents to inspect compiled code, signaling active builder interest.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent, then point it at a closed app to extract and replicate a specific feature for your own project.

## 3. vercel-labs/agent-browser <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/vercel-labs/agent-browser · ★ 48436 (+3311 this week) · —

**What it does:** agent-browser is a native Rust CLI that opens a browser, returns each page as a compact accessibility-tree snapshot with element refs like `@e1`, and lets an AI agent act on those refs one shell command at a time.

**Why now:** A competing token-efficient browser for AI agents (Smooth CLI) hit Hacker News this week with 109 points and active discussion, putting the agent-browser space directly in builders' feeds.

**Build with it:** Wire `agent-browser snapshot -i` into your LLM agent's tool loop so the model receives the ref list, calls `agent-browser click <ref>`, then re-snapshots to verify state before the next action.

## 4. nextlevelbuilder/ui-ux-pro-max-skill

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 147354 (+3087 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** UI UX Pro Max is a Python-based AI skill that injects 192 reasoning rules and 80 searchable UI styles into coding agents (Cursor, Windsurf, Claude Code, Copilot, and others) to guide professional UI/UX output across React, HTML5, TailwindCSS, and mobile frameworks.

**Why now:** The repo gained over 3,000 stars this week at a moment when AI coding agents are becoming the default UI authoring layer, and builders are hunting for ways to raise output quality without switching tools.

**Build with it:** Install the `ui-ux-pro-max-cli` npm package and wire it into your existing Cursor or Claude Code project to let the skill's reasoning rules steer component generation without changing your stack.

## 5. hugohe3/ppt-master

https://github.com/hugohe3/ppt-master · ★ 75246 (+2663 this week) · ai-agent, aippt, office, powerpoint, powerpoint-generation, ppt, pptx, presentation, slide, slides

**What it does:** PPT Master is a Python AI agent that converts documents, PDFs, and topics into natively editable PPTX files with real shapes, transitions, animations, data-backed charts, and optional audio narration from speaker notes.

**Why now:** The repo gained over 2,600 stars this week and recently added Kimi K3 support, a 3-trillion-parameter open model with a 1-million-token context window that can digest long source documents before generating slides.

**Build with it:** Point the agent at an existing `.pptx` template via the template config option to generate branded decks from internal reports without touching slide layouts manually.

## 6. awesome-selfhosted/awesome-selfhosted

https://github.com/awesome-selfhosted/awesome-selfhosted · ★ 335490 (+2369 this week) · awesome, awesome-list, cloud, free-software, hosting, privacy, self-hosted, selfhosted

**What it does:** Awesome-selfhosted is a curated directory of free software network services and web applications you can run on your own servers, spanning categories from analytics and automation to email, CMS, and federated identity.

**Why now:** The repo added 2,369 stars this week, a signal that a fresh wave of builders is actively scanning it for SaaS alternatives to self-host.

**Build with it:** Pick a category you currently pay for (bookmarks, feed readers, or calendar, for example), find the matching entry, and deploy that single app to validate your self-hosting setup before expanding further.

## 7. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 262066 (+2219 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python agent from Nous Research that creates and refines skills from experience, maintains cross-session memory, and runs across local, SSH, Docker, Modal, and other terminal backends with any OpenAI-compatible model endpoint.

**Why now:** The repo crossed 262,000 stars with over 2,200 added this week, a sharp surge in builder attention worth tracking.

**Build with it:** Point it at your own model endpoint via `hermes model`, then wire a Telegram gateway to an existing cloud VM so the agent runs scheduled automations unattended using its built-in cron scheduler.

## 8. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 78148 (+1754 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, dsh, from-scratch, generative-ai, llm, machine-learning, mcp, python, rea, reinforcement-learning, rust, transformers, tutorial, typescript

**What it does:** A 542-lesson, 20-phase open curriculum for building AI systems hands-on, covering model internals, retrieval pipelines, and agent runtimes in Python, TypeScript, Rust, Julia, and Go.

**Why now:** The repo gained over 1,750 stars this week, aligned with rising demand for practical agent and LLM engineering skills that go beyond API wrappers.

**Build with it:** Pick the retrieval pipeline phase, implement a RAG system (retrieval-augmented generation, where a model answers questions using documents you supply) from scratch using the provided labs, and keep the evaluation results to benchmark against your own production setup.

## 9. mattpocock/skills

https://github.com/mattpocock/skills · ★ 319705 (+9524 this week) · —

**What it does:** A collection of small, composable agent skills for Claude Code, Codex, Copilot, and other coding agents, designed to give engineers fine-grained control over planning, triaging, and spec workflows without handing the process over to the agent.

**Why now:** The repo gained over 9,500 stars this week, a spike likely tied to growing frustration with high-abstraction agent frameworks like BMAD and GSD that make it hard to intervene at specific steps.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to drop editable skill files into an existing Cursor project, then call `/setup-matt-pocock-skills` once to wire up your issue tracker and label config.

## 10. milind-soni/OpenMausBot

https://github.com/milind-soni/OpenMausBot · ★ 19633 (+8436 this week) · ai-agents, claude-code, codex, computer-use, docker, electron, grok, grok-bot, grok-bot-alternative, self-hosted, typescript

**What it does:** OpenMausBot is an Electron desktop app for Mac, Windows, and Ubuntu that gives each AI agent its own sidebar contact, personality, model selection, and sandboxed cloud computer, letting you chat with Claude or Codex instances as if they were teammates.

**Why now:** The repo gained over 8,400 stars this week, riding visible interest in alternatives to closed agent UIs like Grok Bot, Meta Muse, and OpenAI dots at a moment when those products are actively shipping.

**Build with it:** Fork the repo, wire in your own Anthropic or OpenAI key, and test a bring-your-own-agent workflow by assigning a custom persona and tool set to a single bot in the sidebar config.
