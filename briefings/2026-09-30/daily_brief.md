# AI Tastemakers — Daily Brief — 2026-09-30

_Ranking: delta_7d · 10 repos · generated 2026-09-30T18:26:15.594Z_


## 1. spinabot/brigade <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/spinabot/brigade · ★ 10592 (+1308 this week) · agent-runtime, ai, ai-crew, autonomous-agents, brigade, brigade-agent, chatgpt, clawdbot, codex, crustacean, hermes, hermes-agent, llm, moltbot, molty, multi-agent, openclaw, pride-of-agents, self-improving-ai, spinabot

**What it does:** Brigade is a TypeScript multi-agent runtime that lets you run AI crews using existing Claude, ChatGPT, or Copilot subscriptions—no API keys required—and expose those agents to the public internet via `brigade bloody benchmark` (backed by Cloudflare or open-source relays like `bore`/`frp`/`sish`).

**Why now:** The repo added 1,308 stars this week alongside the v1.9.0 release of the B³ (Brigade Bloody Benchmark) command, a concrete new surface for stress-testing agent crews against live external traffic.

**Build with it:** Run `brigade expose` on a local multi-agent workflow to get a secret-key-gated HTTPS tunnel, then swap in `bore` or `frp` as the relay if you need a self-hosted edge.

## 2. walkinglabs/learn-harness-engineering

https://github.com/walkinglabs/learn-harness-engineering · ★ 17078 (+1237 this week) · agent, agentic, agentic-ai, ai, ai-agent, ai-agents, dsh, dsh-plugin, harness, harness-engineering, harness-framework, llm

**What it does:** A 14-lecture, 8-project course teaching harness engineering — the environment setup, state management, verification, and control layers that make AI coding agents run reliably.

**Why now:** The August 2026 update added a "Frontier Harness Design Breakdowns" section that reverse-engineers how Claude Code, Codex, and Pi structure their harnesses using a five-subsystem framework (instructions, tools, environment, state, feedback).

**Build with it:** Work through the Claude Code breakdown to map its four-layer memory and five-level compaction design onto your own agent's state management layer.

## 3. rocketride-org/rocketride-server

https://github.com/rocketride-org/rocketride-server · ★ 18029 (+7644 this week) · ai, cpp, data-pipeline, data-processing, machine-learning, mcp, python, sdk, typescript, vscode-extension

**What it does:** RocketRide is an open-source AI pipeline engine with a multithreaded C++ runtime, 100+ nodes covering 15+ LLM providers and 9 vector databases, and a VS Code extension that lets you compose, debug, and deploy pipelines defined as portable JSON directly from your IDE.

**Why now:** The repo gained 7,644 stars this week, signaling a sharp spike in builder attention that makes it worth evaluating before the ecosystem around it solidifies.

**Build with it:** Install the VS Code extension, wire a retrieval pipeline using one of the built-in vector database nodes, and execute it locally via the CLI to validate end-to-end latency before touching any hosted infrastructure.

## 4. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 62069 (+6350 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, from-scratch, generative-ai, llm, machine-learning, mcp, nlp, python, reinforcement-learning, rust, swarm-intelligence, transformers, tutorial, typescript

**What it does:** A 523-lesson, 20-phase open curriculum (Python/TypeScript/Rust/Julia) that takes builders from math foundations through LLM engineering, agent design, and MCP servers, with every lesson producing a reusable artifact.

**Why now:** The repo gained 6,350 stars this week, signaling a surge of builder attention likely timed to rising demand for structured AI engineering paths as agent tooling matures.

**Build with it:** Jump directly to Phase 14 (Agent Engineering) and ship a working agent loop using the provided lesson scaffolding at `phases/14-agent-engineering/`.

## 5. filtalgo/Filtmall-Shopping-Skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/filtalgo/Filtmall-Shopping-Skill · ★ 1984 (+916 this week) · agent-skills, ai-agent, claude-skills, ecommerce, filtalgo, filtmall, openclaw, product-search, shopping, skillsmp

**What it does:** Filtmall Shopping is an agent-native skill that gives AI agents live product search, same-specification price comparison evidence, cart/checkout, order tracking, and after-sales workflows for the Filtmall beauty and personal care catalog via a single CLI command interface.

**Why now:** The repo gained 916 stars this week, signaling a sharp spike in attention likely tied to growing builder interest in MCP-style agent skill registries and the `skillsmp` / `openclaw` ecosystem it targets.

**Build with it:** Install with `npx skills add filtalgo/Filtmall-Shopping-Skill --skill filtmall-shopping -g` and wire the `node scripts/filtalgo.js <command> --json` interface into an existing agent to add end-to-end shopping — from natural-language product query through checkout link generation — without a separate `npm install`.

## 6. helloianneo/ian-xiaohei-illustrations

https://github.com/helloianneo/ian-xiaohei-illustrations · ★ 12247 (+5498 this week) · ai-agent, chinese, codex-skill, handdrawn, illustration, image-generation, xiaohei

**What it does:** Ian Xiaohei Illustrations is a Codex Skill that reads Chinese articles and generates 16:9 hand-drawn inline illustrations featuring "Xiaohei" — a deadpan black stick figure — actively enacting the article's core judgment, process, or metaphor on a white background with sparse red/orange/blue Chinese annotations.

**Why now:** The repo gained ~5,500 stars this week, signaling a sudden surge of interest likely tied to growing Codex Skill ecosystem adoption as builders look for reusable visual-language layers on top of AI agents.

**Build with it:** Drop the `ian-xiaohei-illustrations/` subdirectory into `~/.codex/skills/`, then invoke `Use $ian-xiaohei-illustrations` with a pasted Chinese article to get a shot list and generate PNGs saved to `assets/<article-slug>-illustrations/` — validating the skill's core loop before customizing the QA checklist in `references/qa-checklist.md`.

## 7. JCodesMore/ai-website-cloner-template

https://github.com/JCodesMore/ai-website-cloner-template · ★ 35505 (+660 this week) · ai, ai-agents, ai-tools, automation, boilerplate, claude, claude-code, clone, developer-tools, nextjs, react, reverse-engineering, shadcn-ui, skills, tailwindcss, template, typescript, web-scraping, website-clone

**What it does:** A Next.js template that accepts a URL via a `/clone-website` slash command and uses an AI coding agent to reproduce that site as clean TypeScript/Tailwind/shadcn-ui code.

**Why now:** The repo gained 660 stars this week, coinciding with the Claude Opus 4/3.5 agent wave that made browser-capable coding agents practical enough for multi-step scrape-and-reconstruct workflows.

**Build with it:** Point Claude Code at a competitor's landing page using `/clone-website <url>`, then swap in your own copy and assets to produce a deployable Next.js site without touching the scaffold yourself.

## 8. genspark-ai/genoffice

https://github.com/genspark-ai/genoffice · ★ 8242 (+644 this week) · ai, ai-agent, claude-code, cli, codex, cursor, docx, excel, libreoffice-alternative, local-first, markdown-editor, microsoft-office-alternative, office-suite, pdf-editor, pdf-to-word, powerpoint, pptx, skills, spreadsheet, xlsx

**What it does:** GenOffice is an open-source, local-first office suite (macOS/Windows/Linux) that opens and saves native `.docx`, `.xlsx`, and `.pptx` files with a built-in AI agent that applies edits as tracked changes with one-click rollback.

**Why now:** The repo gained 644 stars this week alongside its `genoffice` CLI and MCP server launch, which directly enables Claude Code, Codex, and Cursor to create and edit real Office files programmatically.

**Build with it:** Wire the `genoffice` CLI as an agent skill in Claude Code or Cursor to let your AI coding workflow output actual `.docx`/`.xlsx`/`.pptx` files instead of markdown stubs — bring your own API key and files never leave your machine.

## 9. career-ops-hq/career-ops <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/career-ops-hq/career-ops · ★ 73137 (+631 this week) · ai-agent, ai-job-search, ats, career, careerops, claude-code, cli, cover-letter, cv, interview-prep, job-application, job-hunting, job-search, job-tracker, jobsearch, jobseekers, local-first, open-source, resume, resume-builder

**What it does:** career-ops is a local-first JavaScript CLI agent that takes a pasted job listing, scores it A–H with a 1–5 global rating, checks whether the position is still open, tailors your CV, and drafts application answers — all inside AI coding CLIs like Claude Code or Codex.

**Why now:** The repo crossed 73,000 stars with 631 added this week, coinciding with WIRED coverage that surfaced it to a wider developer audience actively searching for ATS-counter tooling.

**Build with it:** Drop your resume and a job URL into the agent's config surface and extend the A–H evaluation rubric with a custom scoring criterion (say, remote-only or visa-sponsorship filters) to see how the structured report changes before submitting a single application.

## 10. langgenius/dify <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/langgenius/dify · ★ 157596 (+614 this week) · agent, agentic-ai, agentic-framework, agentic-workflow, ai, automation, claude, deepseek, genai, gpt, llm, low-code, mcp, nextjs, no-code, openai, python, skills, workflow

**What it does:** Dify is a collaborative workspace for building agentic workflows and RAG pipelines, with built-in support for models like GPT, Claude, and DeepSeek, deployable to cloud, VPC, or self-hosted infrastructure.

**Why now:** The repo added MCP (Model Context Protocol) as a topic this week, signaling active integration with the emerging tool-calling standard gaining traction across the AI tooling ecosystem.

**Build with it:** Connect an external data source via Dify's RAG pipeline config, then expose it as a chat API endpoint to validate retrieval quality before committing to any custom backend.
