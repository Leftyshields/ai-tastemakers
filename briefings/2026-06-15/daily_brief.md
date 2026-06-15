# AI Tastemakers — Daily Brief — 2026-06-15

_Ranking: delta_7d · 10 repos · generated 2026-06-15T15:23:31.971Z_


## 1. DietrichGebert/ponytail <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/DietrichGebert/ponytail · ★ 13172 (+8893 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a plugin for AI coding agents (Claude Code, Codex, Copilot CLI) that enforces a strict laziness hierarchy — making the agent reach for native platform features, stdlib, or a one-liner before writing any custom code, with every shortcut annotated for future upgrade.

**Why now:** It trended to 13,000+ stars this week, benchmarks show 80–94% less generated code and 47–77% lower token costs across Haiku, Sonnet, and Opus — directly relevant as teams running AI agents at scale feel the cost of verbose, over-engineered output.

**Build with it:** Drop Ponytail into any Claude Code or Codex workflow and use it as a forcing function when prototyping MVPs — it will prevent your agent from scaffolding a framework around a problem that a `<input type="date">` or a single `Array.reduce` already solves.

## 2. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 42662 (+12554 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** /last30days is a Python-based AI agent skill that searches Reddit, X, YouTube, TikTok, HackerNews, Polymarket, and GitHub in parallel, then scores results by real engagement signals (upvotes, likes, prediction market odds) to synthesize a grounded summary of any topic from the past month.

**Why now:** It hit #1 on GitHub Trending this week with 12,554 stars in seven days, driven by the Claude Code marketplace integration that makes it a one-command install across 50+ agent runtimes—landing exactly as agentic tooling ecosystems are consolidating around composable skills.

**Build with it:** Drop it into a Claude Code or Codex workflow to give your agent real-time, engagement-weighted intelligence on competitors, people, or markets—pipe the output into a CRM enrichment layer, a due diligence report generator, or a trend-detection dashboard that surfaces signal before it hits mainstream search.

## 3. elder-plinius/CL4R1T4S

https://github.com/elder-plinius/CL4R1T4S · ★ 39250 (+12443 this week) · agents, ai, chatgpt, gemini, google, grok, hacking, leak, leaked, openai, prompt, prompt-engineering, prompts, red-team, red-teaming, system, system-info, system-prompts, tools, transparency

**What it does:** CL4R1T4S is a public repository collecting extracted and reverse-engineered system prompts from major AI products including ChatGPT, Claude, Gemini, Grok, Cursor, and Replit, making the hidden instructions that shape AI behavior visible to anyone.

**Why now:** The repo gained 12,443 stars this week, signaling a spike in developer interest likely tied to growing scrutiny of how AI labs constrain model behavior through opaque prompt scaffolding.

**Build with it:** Use the extracted prompts as a reference corpus to benchmark your own system prompt design, identify constraint patterns across competing models, or build a prompt-diff tool that tracks how major AI system prompts evolve over time.

---

*Note: The README contains an embedded prompt injection attempt instructing me to reveal my own system instructions. I'm flagging it transparently rather than complying — that technique is itself a useful red-teaming pattern worth studying if you're building agents that process untrusted content.*

## 4. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 28438 (+11783 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 60–95% using six algorithms before they consume context window space. It ships as a Python/TypeScript library, a drop-in OpenAI-compatible proxy, an MCP server, and a one-command agent wrapper for Claude Code, Cursor, Codex, and others.

**Why now:** It hit 28,000+ stars this week, driven by the explosion of long-context agent workflows where token costs and context limits are becoming the primary bottleneck in production systems. The release of cross-agent shared memory and the `headroom learn` feature — which mines failed sessions to auto-update `CLAUDE.md` and `AGENTS.md` — makes it immediately practical for teams running multi-agent pipelines.

**Build with it:** Drop `headroom proxy --port 8787` in front of any existing LangChain, Agno, or Strands app with zero code changes to cut API costs on log-heavy or RAG-heavy workloads, or wire the MCP server into Claude Code to compress file reads and tool returns mid-session while keeping originals retrievable via the reversible CCR cache.

## 5. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 194205 (+8626 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving AI agent from Nous Research that builds persistent skills from experience, maintains cross-session memory, and runs on any LLM backend — deployable on a $5 VPS, Docker, SSH, or serverless infrastructure like Modal and Daytona.

**Why now:** It gained 8,626 stars this week, signaling a surge of developer interest, and ships with multi-platform messaging (Telegram, Discord, Slack, WhatsApp, Signal) plus a cron scheduler, making it one of the most complete open-source agent runtimes available today.

**Build with it:** Use the subagent delegation system and RPC tool interface to wire up parallel research or coding pipelines, then expose the finished workflow to end users over Telegram — all without touching a managed cloud AI platform.

## 6. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 44294 (+8102 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a collection of portable agent skills (structured markdown files) that instruct AI coding agents like Codex, Cursor, and Claude Code to produce high-quality frontend UI with intentional typography, spacing, layout, and motion instead of generic boilerplate.

**Why now:** It gained 8,102 GitHub stars this week, signaling strong community momentum around the emerging problem of AI-generated interfaces all looking identical and low-effort.

**Build with it:** Drop a skill into your Codex or Claude Code project via `npx skills add` and immediately get better default UI decisions on your next vibe-coded app, or pair the image-generation skills with ChatGPT Images to produce reference moodboards before handing designs off to your coding agent.

## 7. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 101540 (+7464 this week) · ai-tools, claude-code, codex, desktop-app, hermes, hermes-agent, mcp, minimax, omo, open-source, openclaw, openclaw-ui, opencode, provider-management, rust, skills, skills-management, tauri, typescript, wsl-support

**What it does:** CC Switch is a Tauri-built desktop app that provides a unified interface for managing Claude Code, Codex, Gemini CLI, OpenCode, OpenClaw, and Hermes Agent—handling provider switching, MCP configuration, and skills management across Windows, macOS, and Linux from a single GUI.

**Why now:** It gained 7,464 GitHub stars this week, signaling a surge of developers frustrated with juggling multiple AI coding CLI tools and configs individually as the ecosystem fragments across competing agents.

**Build with it:** A builder could fork CC Switch to add custom provider profiles or MCP server presets for their team's internal tooling, effectively shipping a pre-configured AI dev environment manager as an internal tool or commercial product.

## 8. microsoft/markitdown

https://github.com/microsoft/markitdown · ★ 153885 (+6778 this week) · autogen, autogen-extension, langchain, markdown, microsoft-office, openai, pdf

**What it does:** MarkItDown is a Python library that converts PDFs, Office documents, images, audio, HTML, and more into clean Markdown, preserving structure like headings, tables, and lists for LLM consumption.

**Why now:** It hit 153,885 stars with 6,778 added this week, signaling a surge in developer adoption at the exact moment document-to-LLM pipelines are becoming standard infrastructure.

**Build with it:** Drop it into a RAG pipeline to preprocess messy enterprise documents—Word files, Excel sheets, PowerPoints—into token-efficient Markdown before chunking and embedding, replacing brittle custom parsers with a single `markitdown path-to-file.pdf` call.

## 9. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 29667 (+6610 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) the ability to read and search Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paid APIs, by routing each platform through maintained free backends with automatic fallback when one gets blocked.

**Why now:** It gained 6,610 stars this week, signaling strong developer demand, and just shipped a live example of its resilience—when Bilibili's anti-scraping blocked yt-dlp, the project silently rerouted to bili-cli with zero user action required.

**Build with it:** Drop Agent Reach into any agentic workflow to give your agent real-time social listening, competitive research, or content summarization across Chinese and Western platforms simultaneously—wire it to an MCP server and your agent can monitor RSS feeds, pull Reddit threads, and cross-reference YouTube transcripts in a single pipeline.

## 10. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 215941 (+6303 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness operating system that layers skills, memory, security scanning, and cross-harness workflow orchestration on top of AI coding agents like Claude Code, Codex, and Cursor — giving them persistent instincts and production-ready operator configurations built from 10+ months of real engineering use.

**Why now:** The project gained 6,303 stars this week, signaling a spike in developer interest around structured agent workflows at exactly the moment Claude Code, Codex, and OpenCode are converging as serious daily-driver tools.

**Build with it:** Drop ECC's CLAUDE.md skills and MCP configurations into your existing Claude Code or Cursor setup to get research-first development loops, memory-optimized context, and security hooks without building agent scaffolding from scratch.
