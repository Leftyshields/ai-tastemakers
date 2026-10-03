# AI Tastemakers — Daily Brief — 2026-10-03

_Ranking: delta_7d · 10 repos · generated 2026-10-03T17:15:36.870Z_


## 1. isjiamu/gzh-design-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/isjiamu/gzh-design-skill · ★ 3885 (+1007 this week) · agent-skill, ai-agent, claude-code, codex, cursor, gongzhonghao, html, markdown, rich-text, skill, typesetting, wechat, weixin

**What it does:** `gzh-design-skill` is an AI-agent skill (Claude Code / Codex / Cursor) that converts Markdown into fully inline-styled HTML ready to paste directly into the WeChat Official Account (公众号) editor, across 6 curated themes with auto chapter numbering, keyword underlines, code blocks, and a two-stage lint/validate quality gate.

**Why now:** The repo gained 1,007 stars this week, signaling a sharp spike in Chinese developer interest in AI-assisted WeChat publishing workflows.

**Build with it:** Install via `npx skills add https://github.com/isjiamu/gzh-design-skill`, drop your Markdown into a Claude Code session, and use `validate_gzh_html.py` to verify the output clears WeChat's HTML filter before pasting.

## 2. hugohe3/ppt-master

https://github.com/hugohe3/ppt-master · ★ 57484 (+987 this week) · ai-agent, aippt, office, powerpoint, powerpoint-generation, ppt, pptx, presentation, slide, slides

**What it does:** PPT Master is a Python AI agent that converts documents (PDF, DOCX, web pages) into natively editable PPTX files with real shapes, transitions, animations, charts, tables, and optional audio narration from speaker notes.

**Why now:** The repo gained nearly 1,000 stars this week and recently integrated Kimi K3—a newly released 3-trillion-parameter open model with a 1M-token context window—as a supported backend.

**Build with it:** Drop your own `.pptx` template into the config to generate on-brand slide decks from any long-form document using your existing PowerPoint styles.

## 3. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 152901 (+6558 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an agent skill (compatible with Claude Code, Cursor, and 20 other agents) that injects a YAGNI-enforcing senior-dev persona, pushing AI agents to reach for the platform's built-in solution before installing a dependency or scaffolding boilerplate.

**Why now:** The repo is trending on Trendshift daily and weekly charts this week, coinciding with a published agentic benchmark showing ~54% mean code reduction across 12 real feature tasks against a fair no-skill baseline.

**Build with it:** Drop the skill into an existing Claude Code project via the npm package `@dietrichgebert/ponytail` and run it on a feature branch to measure token and line-count delta before merging.

## 4. TauricResearch/TradingAgents

https://github.com/TauricResearch/TradingAgents · ★ 109606 (+866 this week) · agent, finance, llm, multiagent, trading

**What it does:** TradingAgents orchestrates a multi-agent LLM pipeline—analysts, traders, and risk managers—to research stocks and generate dated trading decisions using providers like OpenAI, Anthropic, Groq, and others.

**Why now:** Version 0.5.2 shipped this week with parallel analysts for faster runs, point-in-time backtest integrity (no look-ahead), and a flag-driven CLI (`--ticker`, `--date`) that removes manual prompts.

**Build with it:** Run a backtest over a ticker-date grid using the CLI flags and the built-in SEC EDGAR fundamentals feed to validate signal quality against filed data before connecting a live broker.

## 5. rocketride-org/rocketride-server

https://github.com/rocketride-org/rocketride-server · ★ 17938 (+5212 this week) · ai, cpp, data-pipeline, data-processing, machine-learning, mcp, python, sdk, typescript, vscode-extension

**What it does:** RocketRide is an open-source AI pipeline builder with a multithreaded C++ runtime, 100+ nodes covering 15+ LLM providers and 9 vector databases, pipelines defined as portable JSON, and a VS Code extension for visual composition.

**Why now:** The repo gained 5,212 stars this week, signaling a sharp spike in builder attention worth catching before the ecosystem around it solidifies.

**Build with it:** Install the VS Code extension, wire a retrieval pipeline using the built-in vector database nodes and your chosen LLM provider, and run it locally against your own infrastructure via the CLI.

## 6. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 62993 (+4844 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, from-scratch, generative-ai, llm, machine-learning, mcp, nlp, python, reinforcement-learning, rust, swarm-intelligence, transformers, tutorial, typescript

**What it does:** A 523-lesson, 20-phase open curriculum (Python, TypeScript, Rust, Julia) that teaches AI engineering by having you ship a reusable artifact—prompt, agent, or MCP server—at the end of every lesson.

**Why now:** The repo gained 4,844 stars this week, signaling a surge of builders actively enrolling rather than bookmarking.

**Build with it:** Start at Phase 11 (LLM Engineering) and follow the prompt-engineering lesson to produce a versioned, reusable prompt artifact you can drop directly into your existing Python project.

## 7. thedotmack/claude-mem <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/thedotmack/claude-mem · ★ 95416 (+689 this week) · ai, ai-agents, ai-memory, anthropic, artificial-intelligence, chromadb, claude, claude-agent-sdk, claude-agents, claude-code, claude-code-plugin, claude-skills, embeddings, long-term-memory, mem0, memory-engine, openmemory, rag, sqlite, supermemory

**What it does:** claude-mem is a TypeScript plugin that captures Claude Code session activity, compresses it with AI, and injects relevant compressed context back into future sessions using SQLite and embedding-based retrieval.

**Why now:** The repo is trending at 95K+ stars with 689 added this week, coinciding with broad adoption of Claude Code as a daily driver across agent workflows where session amnesia is the top friction point.

**Build with it:** Drop it into an existing Claude Code project as a plugin and immediately test cross-session memory recall by asking Claude to reference a decision made in a prior session.

## 8. zeronsh/zeron <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/zeronsh/zeron · ★ 2916 (+677 this week) · ai, claude-code, codex, coding-agent, cursor, developer-tools, gpui, local-first, open-source, rust

**What it does:** Zeron is a local-first Rust daemon and desktop sidebar that lets you launch, monitor, and drive coding agents (Claude Code, Codex, Cursor, Devin) from a single control plane, with optional encrypted multi-device sync via a signed-in account.

**Why now:** The repo gained 677 stars this week, coinciding with rapid adoption of agentic coding workflows where developers are running multiple AI coding tools simultaneously and need a unified session manager rather than juggling terminal windows.

**Build with it:** Install the daemon with the one-liner (`curl -fsSL https://zeron.sh/install.sh | sh`), then point it at an existing Claude Code session to test whether the sidebar's live branch diff view fits your agent review loop before adding any sync configuration.

## 9. feder-cr/dots <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/feder-cr/dots · ★ 2572 (+644 this week) · ai-agent, ai-agents, ai-browser, anti-detect-browser, browser-agent, browser-automation, chatgpt, dotfiles, dots, firefox, llm-agent, mcp, open-source-alternative, openai, openai-dots, openrouter, playwright, stealth-browser, web-agent, web-automation

**What it does:** dots is a web AI agent pairing any OpenRouter model with a patched Firefox engine that spoofs fingerprints at the C++ level—no WebDriver flag, no automation globals—so pages can't detect or block it.

**Why now:** The repo gained 644 stars this week, signaling a surge of builder interest likely tied to growing frustration with detection-prone Playwright/CDP setups being blocked by modern anti-bot systems.

**Build with it:** Point Claude Code or Gemini CLI at `invisible_playwright_mcp` to drop this stealth browser in as an MCP server, giving your existing AI assistant undetected browser actions without rewriting your agent loop.

## 10. p-e-w/heretic

https://github.com/p-e-w/heretic · ★ 33024 (+634 this week) · abliteration, llm, transformer

**What it does:** Heretic removes safety alignment from transformer-based language models by combining directional ablation with a TPE-based parameter optimizer (Optuna) that automatically minimizes refusals while preserving model capability via KL divergence from the original weights.

**Why now:** The repo hit #1 Repository of the Day on Trendshift and is pulling 634 stars this week, signaling a sharp spike in practitioner interest around automated abliteration as an alternative to manual fine-tuning.

**Build with it:** Run `heretic --model <your-hf-model>` against any dense or MoE model to produce a decensored checkpoint, then validate it immediately with the built-in `--evaluate-model` flag to measure refusal rate and KL divergence before shipping.
