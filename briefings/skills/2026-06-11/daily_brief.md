# Skill Tastemakers — Daily Brief — 2026-06-11

_Ranking: bootstrap_since_first_seen · 10 repos · generated 2026-06-11T14:30:32.976Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_since_first_seen`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 22726 (+6070 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 60–95% tokens while preserving answer quality, available as a Python/TypeScript library, drop-in proxy, or MCP server.

**Why now:** It hit 22,000+ stars this week with a 6,000-star spike, signaling the community is actively hitting context window limits as agent workflows grow longer and more tool-heavy.

**Build with it:** Wrap any existing Claude Code, Cursor, or LangChain agent with a single `headroom wrap` command to immediately cut costs and latency, or use the MCP server to add `headroom_compress` and `headroom_retrieve` tools to a custom agent that handles large codebases or log-heavy debugging sessions.

## 2. op7418/guizang-ppt-skill

https://github.com/op7418/guizang-ppt-skill · ★ 16587 (+1045 this week) · ai-agent, claude-code, codex, html-deck, image-generation, ppt, presentation, skill, skills, swiss-design, web-ppt

**What it does:** Guizang PPT Skill is an AI-agent skill for Claude Code and Codex that generates polished single-file HTML slide decks in two distinct visual systems—editorial magazine style and Swiss International typography—plus matching image prompts and multi-platform social covers.

**Why now:** The repo gained 1,045 stars this week, signaling strong builder interest in agent-native presentation workflows at a moment when Claude Code and Codex are becoming primary development environments.

**Build with it:** Drop in a Markdown document or article and have an agent produce a ready-to-present HTML deck with generated images at the correct aspect ratios—no build step, no server, just a browser-openable file you can hand off at a demo day.

## 3. can1357/oh-my-pi

https://github.com/can1357/oh-my-pi · ★ 11858 (+814 this week) · ai-agent, ai-coding-agent, anthropic, bun, claude, cli, coding-assistant, llm, mcp, multi-provider, openai, rust, terminal, tui, typescript

**What it does:** oh-my-pi (omp) is a terminal-based AI coding agent with 40+ LLM providers, 32 built-in tools, LSP/DAP integration, and a Rust core that uses hash-anchored edits to dramatically reduce failed patch attempts across models like Grok, Gemini, and Claude.

**Why now:** The project gained 814 stars this week, signaling breakout traction, and its benchmarks show concrete gains (e.g., Grok Code Fast 1 jumping from 6.7% to 68.3% pass rate) that make it a credible alternative to Claude Code and Aider for serious terminal workflows.

**Build with it:** Drop omp into a CI pipeline or local dev loop as a drop-in coding agent that handles multi-file edits, browser automation, and subagents — swap models freely via `--model` without rewriting prompts or worrying about format failures eating your token budget.

## 4. getpaseo/paseo <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/getpaseo/paseo · ★ 8342 (+390 this week) · ade, agents, claude-code, codex, copilot, developer-tools, gemini, mobile, opencode, orchestration, pi

**What it does:** Paseo is a self-hosted orchestration layer that lets you run Claude Code, Codex, Copilot, OpenCode, and Pi agents in parallel from a single interface across desktop, mobile, web, and CLI.

**Why now:** It gained 390 stars this week, signaling sharp developer interest as teams look for practical ways to coordinate multiple competing AI coding agents without vendor lock-in.

**Build with it:** Wire up a CI-style pipeline that fans tasks out to the cheapest or fastest agent per job type—use Codex for boilerplate, Claude for architecture decisions—then monitor and steer everything from your phone while away from your desk.

## 5. jlcodes99/cockpit-tools

https://github.com/jlcodes99/cockpit-tools · ★ 11138 (+701 this week) · account-manager, ai, antigravity, codebuddy, codex, cursor, github-copilot, kiro, windsurf

**What it does:** Cockpit Tools is a Rust-built desktop app that manages multiple accounts across 12 AI IDEs (Cursor, Copilot, Windsurf, Codex, Kiro, and more), enabling one-click account switching, quota monitoring, and parallel multi-instance runs from a single dashboard.

**Why now:** It gained 701 stars this week, likely driven by the simultaneous proliferation of free-tier AI coding tools—developers are juggling accounts across Kiro (newly launched by AWS), Codex, and Cursor to maximize free quota before limits reset.

**Build with it:** Use the local Codex API proxy sidecar to route requests across multiple accounts programmatically, effectively multiplying your available free-tier compute for automated coding pipelines or agent loops without manual re-authentication.

## 6. Donchitos/Claude-Code-Game-Studios <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Donchitos/Claude-Code-Game-Studios · ★ 21417 (+327 this week) · ai-agents, ai-assisted-development, anthropic, claude, claude-code, game-design, game-development, gamedev, godot, indie-game-dev, unity, unreal-engine

**What it does:** Claude Code Game Studios wraps a single Claude Code session in a 49-agent hierarchy — directors, department leads, and specialists — plus 73 slash commands, 12 validation hooks, and 41 document templates that mirror how a real game studio operates.

**Why now:** It hit 21,417 stars with 327 added this week, signaling strong momentum as developers actively experiment with multi-agent Claude Code setups for complex, long-running creative projects.

**Build with it:** Drop it into your game project directory and use commands like `/start`, `/design-system`, and `/dev-story` to coordinate AI agents across design, programming, QA, and narrative — letting you ship a structured indie game with enforced quality gates instead of ad-hoc prompting.

## 7. rohitg00/agentmemory

https://github.com/rohitg00/agentmemory · ★ 22346 (+650 this week) · agentmemory, agents, ai, claude, claudecode, codex, copilot, cursor, genai, harness, hermes, memory, openclaw

**What it does:** agentmemory is a persistent memory layer for AI coding agents (Claude Code, Cursor, Copilot CLI, etc.) that stores context across sessions using an MCP server with hybrid search, confidence scoring, and knowledge graphs so agents stop asking you to re-explain your codebase.

**Why now:** The repo gained 650 stars this week, signaling a breakout moment as developers hit the wall of stateless AI agents repeatedly losing project context across long-running codebases.

**Build with it:** Wire the MCP server into your Claude Code or Cursor setup to give your agent persistent memory of architecture decisions, coding conventions, and past debugging sessions—or extend the 53 MCP tools to build a team-shared memory store that multiple agents can read and write against the same project knowledge base.

## 8. liyupi/ai-guide <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/liyupi/ai-guide · ★ 15600 (+310 this week) · ai, algorithm, artificial-intelligence, chatgpt, claude, cursor, deep-learning, deepseek, gemini, generative-ai, gpt, llm, mcp, openai, python, rag, vibe-coding, vibecoding, vue, vuepress

**What it does:** A free, open-source AI knowledge base and Vibe Coding tutorial platform covering tools like Cursor, Claude, DeepSeek, and GPT—with guides on RAG, MCP, agents, prompt engineering, and monetizing AI-built products.

**Why now:** The repo gained 310 stars this week, reflecting surging demand for structured Vibe Coding resources as non-technical builders increasingly ship real products using AI coding tools.

**Build with it:** Fork the VuePress-based docs site to launch your own AI learning hub, or use the prompt templates, tool comparisons, and MCP/RAG guides as a curated reference stack while building LLM-powered applications.

## 9. zarazhangrui/frontend-slides

https://github.com/zarazhangrui/frontend-slides · ★ 21249 (+618 this week) · ai-slides, anthropic, claude, claude-code, claude-skill, generative-ui, html, presentation, slides, vibe-coding

**What it does:** Frontend Slides is a Claude Code plugin (and portable `SKILL.md` skill) that turns a plain text prompt or an existing PowerPoint file into a single self-contained HTML presentation, no CSS or JS knowledge required.

**Why now:** The repo crossed 21,000 stars this week, signaling real traction as Claude Code's plugin marketplace matures into a viable distribution channel for agentic dev tools.

**Build with it:** Drop it into any coding agent workflow to auto-generate pitch decks, technical explainers, or client-ready slide exports — or fork the `SKILL.md` pattern to ship your own shareable agent skill as a zero-dependency HTML artifact.

## 10. jnMetaCode/superpowers-zh <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/jnMetaCode/superpowers-zh · ★ 5176 (+308 this week) · agent-skills, agentic-coding, ai-coding, chinese, claude-code, code-review, cursor, gemini-cli, kiro, mcp, npm-package, prompt-engineering, skills, superpowers, tdd, trae

**What it does:** superpowers-zh is a Chinese-localized and expanded fork of the superpowers AI coding skills framework, delivering 20 structured workflow prompts (think TDD, code review, debugging methodologies) installable via a single `npx superpowers-zh` command across 18 AI coding tools including Claude Code, Cursor, Kiro, and Gemini CLI. It adds China-specific skills for Gitee/Coding CI pipelines, CNB deployments, and Chinese documentation style conventions.

**Why now:** The repo spiked 308 stars this week, likely driven by Kiro's recent launch and growing Chinese developer adoption of agentic coding tools that need structured prompting to avoid the "just starts writing code" failure mode.

**Build with it:** Drop it into any existing project to immediately give your AI coding agent guardrails — wire the `workflow-runner` skill to a YAML file defining multi-role review stages, or use `mcp-builder` as a starting scaffold for shipping your own MCP server with built-in methodology prompts baked in.
