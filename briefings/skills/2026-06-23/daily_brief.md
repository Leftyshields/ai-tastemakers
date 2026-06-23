# Skill Tastemakers — Daily Brief — 2026-06-23

_Ranking: delta_7d · 10 repos · generated 2026-06-23T14:06:48.668Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 51540 (+38363 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that installs a "lazy senior dev" heuristic, pushing the agent to reach for native browser APIs, built-in language features, and existing dependencies before writing new code—measured at a 54% mean reduction in lines of code across real agentic sessions.

**Why now:** Claude Code and Cursor-style agentic workflows went mainstream this month, and the default failure mode is over-building: agents install libraries, scaffold wrappers, and open timezone debates when a single HTML attribute would do—Ponytail spiked 38,000 GitHub stars this week as developers hit this wall in production.

**Build with it:** Drop the skill file into any Claude Code or Cursor project to immediately constrain your agent toward minimal, native solutions—then extend the heuristic rules to encode your own team's simplicity standards, ship a domain-specific fork for embedded or mobile contexts where dependency cost is even higher, or wrap it as a CI gate that flags agent-generated PRs exceeding a complexity threshold.

## 2. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 12423 (+8874 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that indexes entire codebases into a persistent SQLite knowledge graph using tree-sitter AST parsing across 158 languages, answering structural queries about functions, classes, call chains, and HTTP routes in under 1ms with zero dependencies.

**Why now:** The project gained 8,874 stars this week, signaling rapid adoption across major AI coding agents (Cursor, Claude Code, Windsurf, Gemini CLI, Codex), and its accompanying arXiv paper benchmarks it at 83% answer quality with 10× fewer tokens than file-by-file exploration — making it a credible alternative to expensive context stuffing.

**Build with it:** Drop this into any agent workflow to give your coding AI structural awareness of a large monorepo without burning context — or use its 14 MCP tools and graph API to build your own code navigation, dependency analysis, or automated refactoring tooling on top of a pre-built, locally-running knowledge graph.

## 3. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 38393 (+8723 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) the ability to read and search Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paying for APIs, by routing each platform through free scrapers and browser-cookie-based authentication stored locally.

**Why now:** It hit #1 on GitHub Trending this week with 8,723 stars added, driven by demand for AI agents that can actually pull live internet data rather than hallucinating or hitting paywalls.

**Build with it:** Wire it into any agent loop to automate competitive research pipelines — for example, have Claude Code pull Reddit threads, Twitter sentiment, and GitHub issues on a target library, then synthesize a weekly digest with zero API spend.

## 4. mukul975/Anthropic-Cybersecurity-Skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/mukul975/Anthropic-Cybersecurity-Skills · ★ 19294 (+3509 this week) · ai-agents, claude-code, cloud-security, cybersecurity, devsecops, ethical-hacking, incident-response, infosec, llm, malware-analysis, mcp, mitre-attack, nist-csf, osint, penetration-testing, red-team, security, security-automation, threat-hunting, threat-intelligence

**What it does:** This repo provides 817 structured cybersecurity skills for AI agents across 29 domains—covering threat hunting, malware analysis, red teaming, and incident response—each mapped to six industry frameworks including MITRE ATT&CK and NIST CSF 2.0, following the agentskills.io standard.

**Why now:** The project gained 3,509 stars this week, signaling strong developer momentum, and its recent addition of the MITRE Fight Fraud Framework (F3 v1.1) makes it one of the most comprehensively mapped open-source security skill sets available for agent development today.

**Build with it:** Drop these skills into a Claude Code, Cursor, or Gemini CLI agent to give it analyst-level reasoning for tasks like scoping cloud breaches, generating Sigma rules for Kerberoasting detection, or automating NIST CSF compliance gap analysis across your infrastructure.

## 5. palmier-io/palmier-pro

https://github.com/palmier-io/palmier-pro · ★ 8214 (+6715 this week) · ai-video, claude, macos, mcp, seedance2, swift, video-editor

**What it does:** Palmier Pro is an open-source macOS video editor built in Swift that lets you and AI agents collaboratively edit timelines, with built-in generative video/image models (Seedance, Kling) and an MCP server that Claude, Cursor, or Codex can connect to directly.

**Why now:** It gained 6,715 stars this week, likely driven by macOS 26 Tahoe excitement and the growing appetite for MCP-native tools that let coding agents operate creative software rather than just write code.

**Build with it:** Wire Claude Code to the local MCP server and script repeatable video workflows—auto-cut footage, inject generated B-roll, or build a pipeline where an agent assembles a rough cut from a transcript without you touching the timeline.

## 6. Egonex-AI/Understand-Anything

https://github.com/Egonex-AI/Understand-Anything · ★ 66631 (+6519 this week) · antigravity-skills, business-knowledge, claude-code, claude-skills, codebase-analysis, codex, codex-skills, developer-tools-ai-agent, gemini-cli-skills, karpathy-llm-wiki, knowledge-base, knowledge-graph, memory, opencode-skills, pi-agent, understandcode, vibe-coding

**What it does:** Understand Anything is an open-source TypeScript tool that runs a multi-agent pipeline over any codebase to build an interactive knowledge graph mapping files, functions, classes, and dependencies, then serves a searchable dashboard you can pan, zoom, and query in plain language.

**Why now:** The repo jumped 6,519 stars this week, signaling strong developer interest, and it ships ready-made integrations for every major AI coding agent—Claude Code, Codex, Gemini CLI, Copilot, and Cursor—making it immediately usable wherever your team already works.

**Build with it:** Drop it into a large legacy repo to generate an onboarding dashboard that new engineers can query instead of asking senior developers; or wire its knowledge graph output into a CI pipeline to automatically flag when a PR introduces unexpected cross-module dependencies.

## 7. tw93/Pake

https://github.com/tw93/Pake · ★ 56975 (+6477 this week) · chatgpt, claude, desktop, gemini, hight-performance, linux, macos, no-electron, package, rust, tauri, windows, youtube

**What it does:** Pake wraps any webpage into a native desktop app using Rust and Tauri, producing installers under 10MB — roughly 20x smaller than Electron equivalents — with a single CLI command.

**Why now:** The project gained 6,477 stars this week, signaling a surge of developer interest likely driven by demand for lightweight desktop wrappers around AI tools like DeepSeek, Grok, and Claude.

**Build with it:** Use Pake's CLI to ship a branded desktop client for your web app in minutes — no Electron bloat, no complex config — or fork it to build a custom wrapper with injected CSS, keyboard shortcuts, and ad removal for any internal tool.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 200533 (+6325 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent framework from Nous Research that builds persistent memory, auto-generates reusable skills from completed tasks, and runs across Telegram, Discord, Slack, and CLI from a single process — deployable on anything from a $5 VPS to serverless GPU infrastructure.

**Why now:** The project gained 6,325 stars this week, signaling a breakout moment, and its model-agnostic design lets builders immediately swap in newly released models from providers like Xiaomi MiMo, GLM, or NVIDIA Nemotron without touching code.

**Build with it:** Wire it to a Telegram bot, point it at your codebase via SSH or Docker, and let it autonomously run nightly audits or refactor pipelines — then watch it generate and refine its own skill library so each subsequent task costs less context and fewer prompts.

## 9. asgeirtj/system_prompts_leaks <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/asgeirtj/system_prompts_leaks · ★ 45289 (+2925 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** A regularly updated GitHub repository that extracts and publicly documents the full system prompts from major AI products including Claude, ChatGPT, Gemini, Grok, Copilot, and Cursor.

**Why now:** The repo crossed 45K stars this week with 2,925 new additions, driven by fresh additions of Claude Fable 5, GPT-5.5 Codex, and Claude Design's complete 50-tool prompt stack — giving builders an unusually detailed view of how production AI products are actually instructed.

**Build with it:** Use the documented prompts as reference architecture to structure your own agent system prompts, reverse-engineer tool-calling patterns from Claude Code and Codex, or diff model versions (e.g., Opus 4.8 → Fable 5) to understand how frontier labs iterate on persona, safety framing, and capability boundaries.

## 10. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 65767 (+5673 this week) · agent-skills, antigravity, antigravity-ide, claude-code, cursor, skills

**What it does:** A collection of slash commands (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`) that encode senior-engineering workflows — spec writing, TDD, incremental commits, PR review gates — as installable plugins for Claude Code, Cursor, and other AI coding agents.

**Why now:** The repo gained 5,673 stars this week, coinciding with growing Claude Code adoption and the emergence of agentic coding loops where agents execute multi-step builds autonomously — making consistent, auditable quality gates increasingly necessary.

**Build with it:** Drop the skills into your Claude Code or Cursor setup to enforce structured development on any project: wire `/build auto` to a CI trigger so an agent self-manages an entire feature branch — planning, implementing, testing, and committing each task — while pausing only on failures or risky steps.
