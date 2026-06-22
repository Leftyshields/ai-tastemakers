# AI Tastemakers — Daily Brief — 2026-06-22

_Ranking: delta_7d · 10 repos · generated 2026-06-22T15:33:14.304Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 48837 (+35665 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt/plugin that installs a "laziest senior dev" persona into AI coding agents (Claude Code, Cursor, etc.), pushing them to prefer native browser APIs, stdlib, and deletions over generating new code.
**Why now:** It went viral this week with 48K+ stars, validating a growing builder frustration that AI agents over-engineer by default and that a well-placed constraint prompt measurably cuts LOC, cost, and latency.
**Build with it:** Drop the skill file into your Claude Code or Cursor setup and wire it into an agent that audits PRs or greenfield scaffolds — you get a automated "do we actually need this dependency?" gate before code lands in your repo.

## 2. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 37620 (+7953 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents free, zero-API-key access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more — handling auth, cookie management, and platform-specific scraping under a single unified interface.

**Why now:** The project hit 37,620 stars with nearly 8,000 added this week, signaling a sharp spike in demand for agent-native internet access tooling as developers push Claude Code and Cursor agents beyond local codebases into real-time web research.

**Build with it:** Wire Agent Reach into a Claude Code or Cursor workflow to build a competitive intelligence agent that autonomously pulls product sentiment from Twitter and XiaoHongShu, surfaces relevant Reddit threads, and summarizes YouTube explainers — all without paying for a single API.

## 3. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 11117 (+7568 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that indexes codebases into a persistent knowledge graph using tree-sitter AST parsing across 158 languages, answering structural queries (functions, call chains, HTTP routes) in under 1ms with zero dependencies.

**Why now:** It jumped 7,568 GitHub stars this week, signaling rapid adoption across the major AI coding agents (Cursor, Claude Code, Windsurf, Gemini CLI, Codex), and its backing arXiv paper demonstrates 83% answer quality with 10× fewer tokens than file-by-file exploration.

**Build with it:** Drop it into any agent workflow to give your AI a persistent, queryable map of a large monorepo without burning context — or use its 14 MCP tools to build custom code-navigation tooling that survives across sessions and scales to kernel-sized codebases.

## 4. tw93/Pake

https://github.com/tw93/Pake · ★ 56659 (+6161 this week) · chatgpt, claude, desktop, gemini, hight-performance, linux, macos, no-electron, package, rust, tauri, windows, youtube

**What it does:** Pake is a Rust/Tauri-based CLI tool that wraps any URL into a native desktop app for macOS, Windows, and Linux, producing installers under 10MB—roughly 20x smaller than Electron equivalents.

**Why now:** The project jumped 6,161 stars this week, signaling a surge of builders looking to ship lightweight desktop clients for AI tools like DeepSeek, Grok, and Claude without the overhead of a full Electron stack.

**Build with it:** Run `pake <url>` to instantly package any internal tool, SaaS dashboard, or AI chat interface into a distributable desktop app with custom icons, keyboard shortcuts, and ad-stripping—no Rust experience required.

## 5. ZhuLinsen/daily_stock_analysis <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ZhuLinsen/daily_stock_analysis · ★ 45595 (+2961 this week) · a-stock, ai-agent, aigc, llm, quant, quantitative-finance, quantitative-trading

**What it does:** An LLM-powered stock analysis system that pulls multi-source market data (A-share, HK, US, JP, KR), real-time news, and technical indicators, then generates daily AI decision reports with buy/sell signals pushed to WeChat Work, Feishu, Telegram, Slack, or email via GitHub Actions at zero hosting cost.

**Why now:** It gained nearly 3,000 stars this week alone, hitting #1 Python Repository of the Day on Trendshift, signaling strong community momentum and active real-world use during a period of high retail investor interest in AI-augmented trading tools.

**Build with it:** Fork the repo, wire in your own LLM API key (DeepSeek, Gemini, or Ollama locally), add your watchlist, and extend the 15 built-in strategy agents—momentum, Chan theory, wave analysis—to build a personalized automated research assistant that pushes nightly briefings to your team's Slack channel.

## 6. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 199680 (+5475 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent from Nous Research that creates and refines skills from experience, maintains persistent memory across sessions, and runs across terminals, Telegram, Discord, Slack, and more — all pointing at any model you choose via a single config swap.

**Why now:** The project crossed 199K stars with 5,475 added this week, signaling a sharp spike in builder attention likely tied to its multi-platform messaging support and serverless deployment options that make always-on agents cheap to run.

**Build with it:** Drop it on a $5 VPS, wire it to Telegram or Discord, and let it autonomously schedule nightly backups, run parallel subagents on long research tasks, or accumulate a persistent skill library tailored to your specific workflow — without touching a line of model-switching code.

## 7. palmier-io/palmier-pro

https://github.com/palmier-io/palmier-pro · ★ 6822 (+5324 this week) · ai-video, claude, macos, mcp, seedance2, swift, video-editor

**What it does:** Palmier Pro is an open-source macOS video editor built in Swift that lets you and AI agents edit the same timeline together, with built-in generative video/image models (Seedance, Kling) and an MCP server exposed locally at port 19789.

**Why now:** It gained 5,324 stars this week, signaling strong builder interest, and ships with native MCP support for Claude Code, Codex, and Cursor—making it immediately usable with the agent toolchains most developers already run.

**Build with it:** Connect your Claude or Cursor agent via MCP to programmatically cut, arrange, and generate video clips inside a real timeline editor, or fork the open-source Swift core to build your own AI-native video tooling on top of a working AVFoundation foundation.

## 8. mukul975/Anthropic-Cybersecurity-Skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/mukul975/Anthropic-Cybersecurity-Skills · ★ 18328 (+2544 this week) · ai-agents, claude-code, cloud-security, cybersecurity, devsecops, ethical-hacking, incident-response, infosec, llm, malware-analysis, mcp, mitre-attack, nist-csf, osint, penetration-testing, red-team, security, security-automation, threat-hunting, threat-intelligence

**What it does:** This open-source library provides 762 structured cybersecurity skills for AI agents across 26 security domains, each mapped to six industry frameworks (MITRE ATT&CK, NIST CSF 2.0, MITRE ATLAS, D3FEND, NIST AI RMF, and MITRE F3) in a standardized format compatible with Claude Code, Copilot, Cursor, and 20+ other platforms.

**Why now:** The repo gained 2,544 stars this week, signaling strong community momentum, and the timing aligns with rapid adoption of agentic coding tools that lack domain-specific security context out of the box.

**Build with it:** Drop these skill files into your AI agent's context to give it analyst-grade guidance for tasks like scoping a cloud breach, writing Sigma detection rules, or triaging a memory dump — without hand-crafting security prompts from scratch.

## 9. asgeirtj/system_prompts_leaks <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/asgeirtj/system_prompts_leaks · ★ 44900 (+2537 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** A GitHub repository that extracts and publishes the hidden system prompts governing major AI assistants—Claude, ChatGPT, Gemini, Grok, Copilot, and others—making the exact instructions shaping their behavior publicly readable.

**Why now:** The repo crossed 44,900 stars this week and added prompts for Claude Fable 5, GPT-5.5 Codex, and Claude Design, making it one of the most current public records of how frontier AI systems are actually instructed.

**Build with it:** Use the leaked prompts as a reference corpus to reverse-engineer persona design, safety framing, and tool-use patterns—then apply those structures when writing system prompts for your own agents or fine-tuning datasets.

## 10. hugohe3/ppt-master <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/hugohe3/ppt-master · ★ 30307 (+2499 this week) · ai-agent, aippt, office, powerpoint, powerpoint-generation, ppt, pptx, presentation, slide, slides

**What it does:** PPT Master is a Python tool that uses AI to generate fully editable PPTX files—with native shapes, animations, speaker notes, and optional audio narration—from any input document, and can match an existing `.pptx` template you provide.

**Why now:** The repo jumped 2,499 stars this week, signaling a surge of developer interest, and v2.11.0 just shipped with expanded template-following and narration features that make it practically useful rather than just a demo.

**Build with it:** Wire it into a document pipeline—legal briefs, research papers, sales docs—to auto-generate client-ready decks on demand, or wrap it in an API endpoint that lets users upload a PDF and download a branded, editable PPTX in seconds.
