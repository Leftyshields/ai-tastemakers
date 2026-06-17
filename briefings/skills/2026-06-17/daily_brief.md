# Skill Tastemakers — Daily Brief — 2026-06-17

_Ranking: delta_7d · 10 repos · generated 2026-06-17T14:28:26.047Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 29458 (+28897 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt ruleset ("skill") for AI coding agents that forces them to check whether native browser APIs, stdlib, or a single expression already solve the problem before writing any custom code.

**Why now:** It gained 28,897 GitHub stars this week, signaling strong developer frustration with AI agents that install npm packages and scaffold abstractions for problems a one-liner already solves.

**Build with it:** Drop the ruleset into your Claude Code, Cursor, or compatible agent config to immediately constrain it toward minimal, auditable output—useful when scaffolding microservices, internal tools, or any codebase where you'll own the maintenance bill.

## 2. elder-plinius/CL4R1T4S

https://github.com/elder-plinius/CL4R1T4S · ★ 41451 (+14641 this week) · agents, ai, chatgpt, gemini, google, grok, hacking, leak, leaked, openai, prompt, prompt-engineering, prompts, red-team, red-teaming, system, system-info, system-prompts, tools, transparency

**What it does:** CL4R1T4S is a public repository that collects and publishes extracted system prompts from major AI products including ChatGPT, Claude, Gemini, Grok, Cursor, and Replit, making visible the hidden instructions that shape model behavior.

**Why now:** The repo gained 14,641 stars this week, signaling a surge of developer interest likely tied to growing scrutiny of AI agent scaffolding and the expanding use of system prompts in production pipelines.

**Build with it:** Use the extracted prompts as a benchmark corpus to audit your own system prompt design, identify constraint patterns across competing models, or build a tool that diffs prompt architectures to surface behavioral divergence between AI providers.

## 3. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 61950 (+11353 this week) · agent-skills, antigravity, antigravity-ide, claude-code, cursor, skills

**What it does:** Agent Skills is a collection of production-grade slash commands (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`) that encode senior engineering workflows—spec writing, TDD, incremental commits, quality gates—into reusable plugins for AI coding agents like Claude Code, Cursor, and Gemini CLI.

**Why now:** The project gained 11,353 GitHub stars this week alone, signaling a breakout moment as developers standardize how AI agents handle full development lifecycles rather than one-off code generation.

**Build with it:** Drop the skills into your Claude Code or Cursor setup and run `/build auto` to have an agent autonomously plan, implement, test, and commit a feature end-to-end—then extend or write your own `SKILL.md` files to encode your team's specific quality gates and workflows.

## 4. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 30768 (+9412 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, compressing tool outputs, logs, RAG chunks, and conversation history by 60–95% before they hit the model's context window—available as a Python/TypeScript library, drop-in proxy, or MCP server.

**Why now:** With agents like Claude Code, Codex, and Cursor hitting context limits on real codebases and long-running tasks, this week's explosive growth (9,412 stars) reflects how token costs and window exhaustion have become the dominant pain point in production agent deployments.

**Build with it:** Wrap any agent workflow with `headroom wrap claude` or drop `compress(messages)` into your LangChain/LangGraph pipeline to cut API costs by 60–95%, extend effective context on large repos, and add reversible cross-agent memory that persists compressed history across Claude, Codex, and Gemini sessions.

## 5. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 32778 (+6855 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP toolkit that gives AI agents free, pre-configured access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more — handling authentication, scraping, and data cleaning so the agent receives readable output instead of blocked requests or raw HTML.

**Why now:** It hit #1 on GitHub Trending this week with 6,855 new stars, driven by developers who are actively building agentic workflows and hitting the exact wall this tool solves — paid APIs and platform blocks killing real-world agent usefulness.

**Build with it:** Wire Agent Reach into a Claude Code or Cursor agent to build a competitive intelligence tool that monitors Twitter sentiment, Reddit bug reports, and XiaoHongShu reviews for any product — all in one pipeline, zero API spend.

## 6. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 195933 (+6355 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent framework from Nous Research that maintains persistent memory, autonomously creates and refines skills from experience, runs across six compute backends (local, Docker, SSH, Modal, etc.), and connects to messaging platforms like Telegram and Discord through a single gateway process.

**Why now:** The project gained 6,355 stars this week, signaling strong community momentum, and its model-agnostic design now spans an unusually broad roster of providers including Xiaomi MiMo, GLM, Kimi, and MiniMax alongside the standard OpenAI/Anthropic options.

**Build with it:** Deploy a serverless agent on Modal or Daytona that costs near zero when idle, wire it to a Telegram bot for remote task delegation, and plug in your own model endpoint to run parallel subagents that generate and compress training trajectories for fine-tuning the next iteration of your model.

## 7. Egonex-AI/Understand-Anything

https://github.com/Egonex-AI/Understand-Anything · ★ 62446 (+6073 this week) · antigravity-skills, business-knowledge, claude-code, claude-skills, codebase-analysis, codex, codex-skills, developer-tools-ai-agent, gemini-cli-skills, karpathy-llm-wiki, knowledge-base, knowledge-graph, memory, opencode-skills, pi-agent, understandcode, vibe-coding

**What it does:** Understand Anything converts any codebase, knowledge base, or documentation into an interactive knowledge graph — letting you visually explore files, functions, classes, and dependencies — with a built-in Q&A interface powered by Claude Code, Codex, Gemini CLI, and other AI agents.

**Why now:** The project hit 62,000+ stars this week with 6,000+ added in seven days, signaling a surge of developer interest likely driven by the current wave of AI coding tools making large, unfamiliar codebases a daily reality.

**Build with it:** Drop it into a multi-agent pipeline to auto-document legacy repos, wire the knowledge graph output into a RAG system for codebase-aware chat, or use the plugin hooks to build onboarding tools that generate per-repo visual guides for new engineers.

## 8. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 103296 (+6014 this week) · ai-tools, claude-code, codex, desktop-app, hermes, hermes-agent, mcp, minimax, omo, open-source, openclaw, openclaw-ui, opencode, provider-management, rust, skills, skills-management, tauri, typescript, wsl-support

**What it does:** CC Switch is a cross-platform desktop app (built with Tauri/Rust) that centralizes management of multiple AI coding agents—Claude Code, Codex, Gemini CLI, OpenCode, and others—letting you switch providers, manage API keys, and configure MCP tools from a single UI.

**Why now:** It gained over 6,000 GitHub stars this week, signaling rapid developer adoption at the exact moment the AI coding agent ecosystem is fragmenting across incompatible CLIs and auth systems.

**Build with it:** Use CC Switch as a reference architecture for multi-provider AI tool orchestration—its provider-switching and MCP integration patterns are directly reusable if you're building an agent IDE, a team tooling layer, or a unified API proxy dashboard.

## 9. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 45769 (+5526 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a collection of portable agent skills (markdown instruction files) that you drop into AI coding tools like Codex, Cursor, or Claude Code to enforce opinionated layout, typography, spacing, and motion rules instead of generic boilerplate UI output.

**Why now:** The repo spiked 5,526 stars this week, signaling that the "vibe coding produces ugly defaults" problem has hit a critical mass of frustration among builders shipping AI-generated frontends.

**Build with it:** Install a skill via `npx skills add` and immediately constrain your AI agent to produce tighter, more considered UI while pairing image-generation skills with ChatGPT Images to generate reference boards that feed directly into your implementation pipeline.

## 10. Imbad0202/academic-research-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Imbad0202/academic-research-skills · ★ 32365 (+2563 this week) · academic-pipeline, academic-writing, ai-research, claude, claude-code, literature-review, peer-review, prompt-engineering

**What it does:** Academic Research Skills is a Claude Code plugin that runs a structured pipeline—plan, research, write, review, revise, finalize—with integrity gates that block hallucinated citations and fabricated methodology before they reach submission.

**Why now:** Zhao et al.'s audit of 111M references found ~147K hallucinated citations in 2025 alone, and this week's v3.8 release adds an opt-in claim-audit pass (`ARS_CLAIM_AUDIT=1`) that fetches cited sources and verifies whether each anchor actually supports the claim made.

**Build with it:** Install via `/plugin marketplace add Imbad0202/academic-research-skills`, run `/ars-plan` to scaffold your paper structure, then hook the 7-mode integrity checklist into your own CI pipeline to gate any AI-assisted writing workflow against fabrication before it ships.
