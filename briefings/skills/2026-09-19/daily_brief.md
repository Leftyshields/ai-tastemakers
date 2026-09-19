# Skill Tastemakers — Daily Brief — 2026-09-19

_Ranking: delta_7d · 10 repos · generated 2026-09-19T16:30:10.358Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 142400 (+5992 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a skill/prompt layer for AI coding agents (Claude Code, Cursor, and ~18 others) that enforces YAGNI discipline — steering the agent toward minimal, already-available solutions instead of over-engineered ones, measured at ~54% less generated code on average across real feature tasks.

**Why now:** The project hit Hacker News this week (98 points, 17 comments) while simultaneously ranking on Trendshift's daily and weekly JavaScript charts, signaling a sharp spike in builder attention.

**Build with it:** Drop the ponytail skill into your existing Claude Code setup via the npm package `@dietrichgebert/ponytail` and run it against a feature branch to see how much code your agent stops writing.

## 2. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 262676 (+5781 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness configuration system that adds skills, memory, security (via `ecc-agentshield`), and research-first instincts to AI coding agents like Claude Code, Codex, Cursor, and Opencode.

**Why now:** The repo gained over 5,700 stars this week, signaling a surge in developer adoption coinciding with rising Claude Code usage across teams.

**Build with it:** Drop the `ecc-universal` npm package into an existing Claude Code workflow to immediately apply ECC's pre-built instincts and memory configuration without manual agent tuning.

## 3. stablyai/orca

https://github.com/stablyai/orca · ★ 72427 (+5259 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE that runs Codex, Claude Code, OpenCode, or Pi as parallel agents, each isolated in its own git worktree, tracked from a single UI.

**Why now:** The project surfaced on Hacker News this week and crossed 72K stars, signaling a sharp spike in builder attention around parallel agent orchestration workflows.

**Build with it:** Fan a single prompt across multiple worktrees using Orca's parallel worktree split feature, then diff the outputs and merge the winning branch into your main codebase.

## 4. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 83364 (+3730 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Cursor, Claude Code, etc.) authenticated read access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without API fees, handling anti-bot blocks and login walls internally.

**Why now:** The repo hit #1 on GitHub Trending this week with 83k+ stars and 3,730 new stars in seven days, signaling a surge of builders actively wiring it into agent workflows right now.

**Build with it:** Drop it into a Claude Code or Cursor MCP config to let your agent pull Reddit threads or YouTube transcripts as plain text during a research or code-review session.

## 5. QuantumNous/new-api <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/QuantumNous/new-api · ★ 48452 (+485 this week) · ai-gateway, claude, deepseek, gemini, newapi, openai, rerank

**What it does:** New API is a self-hosted Go gateway that proxies requests to OpenAI, Anthropic, Gemini, Bedrock, and other upstreams behind a single OpenAI-compatible endpoint, with built-in routing, access control, and cost accounting.

**Why now:** The repo gained 485 stars this week and covers DeepSeek, Gemini, and Claude under one roof — all three providers have active model releases drawing developer attention right now.

**Build with it:** Point an existing OpenAI SDK client at your New API instance URL and swap in a gateway-issued key to immediately route across multiple upstream providers without changing any other client code.

## 6. genspark-ai/genoffice <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/genspark-ai/genoffice · ★ 7232 (+478 this week) · ai, ai-agent, claude-code, cli, codex, cursor, docx, excel, libreoffice-alternative, local-first, markdown-editor, microsoft-office-alternative, office-suite, pdf-editor, pdf-to-word, powerpoint, pptx, skills, spreadsheet, xlsx

**What it does:** GenOffice is an open-source desktop office suite (macOS, Windows, Linux) that opens and saves native `.docx`, `.xlsx`, and `.pptx` files with a built-in AI agent that writes edits as tracked changes and ships a `genoffice` CLI for scripting and agent integration.

**Why now:** The repo crossed 7,000 stars this week with a +478 spike, coinciding with its MCP server support and published agent skill for Claude Code, Codex, and Cursor landing in the same release.

**Build with it:** Drop the `genoffice` agent skill into your Cursor or Claude Code config to let your coding agent generate or edit real `.pptx`/`.docx` files directly from prompts during a project workflow.

## 7. microsoft/generative-ai-for-beginners

https://github.com/microsoft/generative-ai-for-beginners · ★ 120073 (+473 this week) · ai, azure, chatgpt, dall-e, generative-ai, generativeai, gpt, language-model, llms, microsoft-for-beginners, openai, prompt-engineering, semantic-search, transformers

**What it does:** Microsoft's 21-lesson Jupyter Notebook curriculum teaches generative AI fundamentals through hands-on lessons covering prompt engineering, LLMs, DALL-E, and semantic search, targeted at developers starting from scratch.

**Why now:** The repo gained 473 stars this week, signaling a current wave of learners actively working through it — making it a live community resource rather than a static reference.

**Build with it:** Fork the repo, follow Lesson 7's chat application notebook, and wire it to Azure OpenAI or the OpenAI API to ship a working prompt-driven chat app with minimal boilerplate.

## 8. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 96826 (+3140 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** Agent Skills packages 25 slash-command-driven workflows (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`, and more) that enforce senior-engineering practices — TDD, incremental commits, five-axis code review — inside AI coding agents like Claude Code, Cursor, and Codex.

**Why now:** The repo gained 3,140 stars this week, signaling a surge of builder interest coinciding with broader adoption of autonomous coding agents needing structured guardrails beyond raw prompting.

**Build with it:** Run `npx skills add addyosmani/agent-skills` in any supported agent to install all 25 skills, then trigger `/build auto` to let the agent generate a plan, implement tasks test-first, and commit each slice without manual stepping between them.

## 9. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 62335 (+452 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** An installable AI agent skill that queries Reddit, X, YouTube, HN, Polymarket, and GitHub in parallel, scores results by real engagement signals (upvotes, likes, prediction-market odds), and returns a synthesized brief on any person or topic.

**Why now:** The repo hit #1 GitHub Trending this week with 62k stars, surfacing at the same moment agent skill marketplaces (Claude Code, Codex, Cursor, Copilot) are becoming a standard distribution layer for compound AI workflows.

**Build with it:** Install via `npx skills add mvanhorn/last30days-skill -g`, drop `/last30days [person or topic]` into your existing agent workflow, and use the scored output as a pre-meeting or pre-research context step without writing any API aggregation code yourself.

## 10. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 68145 (+2985 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that exposes 352 AI providers (150+ free tiers) through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression saving 15–95% per request.

**Why now:** The repo gained nearly 3,000 stars this week, signaling a surge of builders actively routing Claude Code, Cursor, and Cline traffic through it to exhaust free quotas before paying.

**Build with it:** Point your Claude Code or Cursor `OPENAI_BASE_URL` config at your OmniRoute instance to get automatic fallback across free Gemini, Groq, and Mistral tiers when any single provider's monthly cap is hit.
