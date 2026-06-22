# AI Tastemakers — Daily Brief — 2026-06-22

_Ranking: delta_7d · 10 repos · generated 2026-06-22T15:07:29.237Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 48761 (+44482 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt/skill layer that makes AI coding agents default to the simplest possible solution—native browser inputs instead of installed libraries, one line instead of fifty—while preserving safety guardrails that naive "write less" prompts drop.
**Why now:** Claude Code and similar agentic tools went mainstream this month, and the default failure mode is over-building; ponytail benchmarked a 54% mean LOC reduction and 20% cost cut on real agentic sessions against a real open-source repo this week.
**Build with it:** Drop the skill into your Claude Code, Cursor, or any of the 14 supported agents, then ship features on top of tiangolo's full-stack-fastapi-template or your own codebase knowing the agent will reach for `<input type="date">` before it reaches for flatpickr.

## 2. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 37603 (+9258 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents free, zero-configuration access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more by handling authentication, scraping, and data cleaning under the hood.

**Why now:** It hit #1 on GitHub Trending this week with 9,258 stars in seven days, signaling a breakout moment for AI agent tooling that extends beyond code tasks into real-time web data retrieval.

**Build with it:** Drop it into any Claude Code, Cursor, or Windsurf workflow to let your agent pull live social sentiment, YouTube transcripts, or Reddit threads as grounded context — no API keys, no scraper maintenance, no blocked requests.

## 3. elder-plinius/CL4R1T4S

https://github.com/elder-plinius/CL4R1T4S · ★ 43356 (+7931 this week) · agents, ai, chatgpt, gemini, google, grok, hacking, leak, leaked, openai, prompt, prompt-engineering, prompts, red-team, red-teaming, system, system-info, system-prompts, tools, transparency

**What it does:** CL4R1T4S is a public repository that collects and publishes extracted system prompts from major AI products including ChatGPT, Claude, Gemini, Grok, Cursor, and Replit, making the hidden instruction layers that shape AI behavior visible to anyone.

**Why now:** The repo gained nearly 8,000 stars this week, signaling a surge of developer interest likely tied to growing scrutiny of how AI agents are being instructed behind the scenes across competing platforms.

**Build with it:** Use the extracted prompts as a reference corpus to benchmark your own agent's instruction design, identify constraint patterns across competitors, or build a prompt-auditing tool that flags when your system prompt shares structural similarities with known commercial scaffolds.

## 4. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 11097 (+7621 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that indexes entire codebases into a persistent knowledge graph using tree-sitter AST parsing across 158 languages, answering structural queries in under 1ms with 99% fewer tokens than file-by-file exploration.

**Why now:** It gained 7,621 GitHub stars this week, signaling rapid adoption across AI coding agent workflows, and its support for Claude Code, Cursor, Windsurf, Gemini CLI, and 7 other agents makes it immediately relevant as those tools compete for developer attention.

**Build with it:** Drop it into any agent setup to give your AI instant, cheap structural awareness of a large codebase — then build on top of its 14 MCP tools to create code navigation features, automated refactoring assistants, or cross-service dependency trackers without burning context on raw file reads.

## 5. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 199663 (+6449 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is an open-source, self-improving AI agent from Nous Research that builds persistent skills from experience, maintains cross-session memory, and runs across Telegram, Discord, Slack, and CLI — against any model provider, on any infrastructure from a $5 VPS to serverless GPU.

**Why now:** The repo crossed 199K stars with 6,449 added this week, signaling a sharp surge in adoption, and its multi-platform messaging gateway plus model-agnostic design make it a timely foundation as builders race to ship persistent, deployable agents rather than single-session chatbots.

**Build with it:** Wire it to your own model endpoint via OpenRouter or a custom URL, deploy it serverless on Modal so it costs nothing when idle, and extend it with the agentskills.io standard to ship reusable, auto-improving tool sets your agent writes and refines itself.

## 6. tw93/Pake

https://github.com/tw93/Pake · ★ 56654 (+6192 this week) · chatgpt, claude, desktop, gemini, hight-performance, linux, macos, no-electron, package, rust, tauri, windows, youtube

**What it does:** Pake is a Rust/Tauri-based CLI tool that wraps any URL into a native desktop app for macOS, Windows, and Linux, producing installers under 10MB—roughly 20x smaller than Electron equivalents.

**Why now:** It gained 6,192 stars this week, signaling a surge of developer interest likely tied to demand for lightweight desktop wrappers around AI tools like DeepSeek, Grok, Claude, and Gemini—all included as prebuilt packages.

**Build with it:** Run `pake [url]` to ship a branded desktop client for your web app in minutes, or fork the repo to inject custom CSS, remove ads, and add keyboard shortcuts—a fast path to a polished desktop distribution without maintaining a full Electron stack.

## 7. ZhuLinsen/daily_stock_analysis <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ZhuLinsen/daily_stock_analysis · ★ 45570 (+3071 this week) · a-stock, ai-agent, aigc, llm, quant, quantitative-finance, quantitative-trading

**What it does:** An LLM-powered stock analysis system that pulls multi-source market data (A-share, HK, US, JP, KR) and generates daily AI decision dashboards—scoring, buy/sell levels, risk alerts—then pushes reports to WeChat Work, Feishu, Telegram, Slack, or email via GitHub Actions at zero infrastructure cost.

**Why now:** It gained 3,071 stars this week alone, hitting #1 Python repository of the day on Trendshift, signaling strong momentum among quant-curious developers looking for a practical LLM-meets-finance starting point.

**Build with it:** Fork the repo, wire in your own LLM provider (DeepSeek, Gemini, Ollama, etc.) and a watchlist of tickers, then extend the 15 built-in agent strategies with custom rules—momentum, earnings surprise, sector rotation—to ship a personalized daily briefing bot in under a day.

## 8. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 106304 (+5827 this week) · ai-tools, claude-code, codex, desktop-app, hermes, hermes-agent, mcp, minimax, omo, open-source, openclaw, openclaw-ui, opencode, provider-management, rust, skills, skills-management, tauri, typescript, wsl-support

**What it does:** CC Switch is a cross-platform Tauri/Rust desktop app that centralizes management of multiple AI coding agents—Claude Code, Codex, Gemini CLI, OpenCode, and others—into a single interface with unified provider and credential switching.

**Why now:** It gained 5,827 GitHub stars this week, signaling a sharp spike in developer interest around multi-agent workflow tooling at exactly the moment teams are juggling several competing AI coding tools simultaneously.

**Build with it:** Use CC Switch as a base or reference architecture to build your own multi-provider AI tool switcher—the Rust/Tauri stack and open-source codebase make it straightforward to fork and add custom provider integrations or team-level credential management features.

## 9. hugohe3/ppt-master <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/hugohe3/ppt-master · ★ 30306 (+2888 this week) · ai-agent, aippt, office, powerpoint, powerpoint-generation, ppt, pptx, presentation, slide, slides

**What it does:** PPT Master is a Python tool that takes any document and generates a fully editable .pptx file with native shapes, animations, speaker notes, and optional audio narration — using your own template if you provide one.

**Why now:** It hit 30,306 stars with nearly 2,900 added this week, signaling a sharp spike in developer interest that makes it worth evaluating before the ecosystem around it solidifies.

**Build with it:** Wire it into a document pipeline — research reports, technical specs, sales briefs — to auto-generate client-ready slide decks, then expose it as an internal API so teams can ship presentations without touching PowerPoint manually.

## 10. asgeirtj/system_prompts_leaks <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/asgeirtj/system_prompts_leaks · ★ 44895 (+2791 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** A GitHub repository that collects and publishes extracted system prompts from major AI assistants including Claude, ChatGPT, Gemini, Grok, Copilot, and others, updated regularly as new model versions ship.

**Why now:** The repo crossed 44,000 stars this week and added prompts for Claude Fable 5, GPT-5.5 Codex, and Claude Design, making it the most current public snapshot of how frontier AI products are actually instructed.

**Build with it:** Use the prompt diffs to reverse-engineer persona design, safety framing, and tool-calling patterns, then apply those techniques directly when writing system prompts for your own agents or products.
