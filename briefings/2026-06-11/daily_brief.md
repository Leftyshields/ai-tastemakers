# AI Tastemakers — Daily Brief — 2026-06-11

_Ranking: bootstrap_since_first_seen · 10 repos · generated 2026-06-11T14:28:34.004Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_since_first_seen`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 39558 (+10794 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** `/last30days` is a Python agent skill that queries Reddit, X, YouTube, HN, TikTok, Polymarket, and the open web in parallel, scores results by real engagement signals (upvotes, likes, prediction-market odds), and synthesizes them into a single grounded brief via an AI judge.

**Why now:** It hit #1 on GitHub Trending this week with nearly 11k new stars, and the v3 pipeline now installs in one command across Claude Code, Codex, Cursor, Copilot, and 50+ agent hosts—making cross-platform social intelligence a drop-in skill rather than a bespoke integration project.

**Build with it:** Wire `/last30days` into a sales-prep or due-diligence agent that auto-briefs your team on a company or person before every meeting, pulling the last 30 days of actual discourse instead of stale LinkedIn snapshots.

## 2. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 22723 (+6917 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 60–95% using six algorithms, available as a Python/TypeScript library, an OpenAI-compatible proxy, or an MCP server.

**Why now:** It gained nearly 7,000 stars this week, signaling strong builder demand as long-context models still charge per token and agent loops routinely blow past context limits with repetitive tool output.

**Build with it:** Drop `headroom proxy --port 8787` in front of any existing OpenAI-compatible stack for zero-code token savings, or use `compress(messages)` inline to cut costs on RAG pipelines, log analysis agents, or multi-step coding agents that churn through large file reads.

## 3. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 41272 (+6056 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a collection of portable agent skills (markdown files) that inject design taste—layout, typography, motion, spacing—into AI coding agents like Codex, Cursor, and Claude Code, replacing generic boilerplate UI output with higher-quality frontend work.

**Why now:** The repo gained 6,056 stars this week, signaling a sharp increase in builders noticing that AI-generated frontends tend toward the same mediocre defaults and actively looking for a fix.

**Build with it:** Drop a skill file into your Codex or Claude Code project via `npx skills add` and immediately steer your next AI-built interface away from cookie-cutter components toward deliberate typography, spacing, and motion choices.

## 4. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 26284 (+3996 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI toolkit that gives AI agents free, zero-API-key access to Twitter, Reddit, YouTube, GitHub, Bilibili, and Xiaohongshu through a single install command, handling cookie auth, scraping, and data cleaning under the hood.

**Why now:** It gained nearly 4,000 stars this week, signaling rapid community adoption, and ships a timely fix for Bilibili's yt-dlp block by routing through bili-cli—exactly the kind of active maintenance that makes scraping infrastructure trustworthy.

**Build with it:** Drop it into any Claude Code, Cursor, or MCP-compatible agent to instantly add multi-platform web research—useful for building competitive intelligence tools, content aggregators, or research assistants that pull live social data without paying for platform APIs.

## 5. santifer/career-ops

https://github.com/santifer/career-ops · ★ 52650 (+3344 this week) · ai-agent, anthropic, automation, career, careerops, claude, claude-code, cli, golang, interview-prep, job-search, open-source, resume

**What it does:** Career-Ops is an open-source CLI system that uses Claude Code to evaluate job listings, generate tailored CVs, and run batch processing across 14 skill-matching modes, with a Go dashboard and PDF output baked in.

**Why now:** The repo gained 3,344 stars this week and is trending on GitHub, signaling a moment of high community attention and active contribution velocity worth riding.

**Build with it:** Fork the pipeline and extend it into a SaaS layer—add a web UI, a user-uploaded resume intake flow, and a job board API connector to turn the CLI into a multi-tenant job search tool.

## 6. FareedKhan-dev/train-llm-from-scratch <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/FareedKhan-dev/train-llm-from-scratch · ★ 5518 (+1187 this week) · gemini, large-language-models, llm, openai, training, transformers

**What it does:** A complete PyTorch implementation for training transformer-based LLMs from scratch — covering data ingestion from The Pile dataset through pretraining, then the full post-training stack (SFT, Reward Model, PPO, DPO, GRPO) with no dependencies on HuggingFace TRL or PEFT.

**Why now:** It gained 1,187 stars this week, likely driven by the newly added post-training suite that mirrors the exact alignment pipeline (including GRPO/RLVR) used in models like DeepSeek-R1, making it one of the few self-contained references for that full stack.

**Build with it:** Use it as a transparent baseline to experiment with custom reward functions, tweak GRPO for domain-specific reasoning tasks (e.g., code or math), or study exactly where alignment techniques diverge — without black-box library abstractions hiding the mechanics.

## 7. esengine/DeepSeek-Reasonix

https://github.com/esengine/DeepSeek-Reasonix · ★ 21158 (+2323 this week) · agent, agent-framework, ai-agent, ai-coding, cli, coding-agent, deepseek, developer-tools, ink, llm, prompt-caching, r1, terminal, tool-use, tui, typescript

**What it does:** DeepSeek-Reasonix is a terminal-based AI coding agent written in Go, built specifically around DeepSeek's prefix-cache architecture to keep token costs low across long, continuous sessions.

**Why now:** It gained 2,323 stars this week and just shipped a ground-up 1.0 rewrite in Go, replacing the legacy TypeScript codebase with a single static binary that's faster and more portable.

**Build with it:** Drop it into a long-running dev workflow to automate multi-step coding tasks — file edits, tool calls, and reasoning chains — without burning your DeepSeek API budget on repeated context re-encoding.

## 8. Imbad0202/academic-research-skills

https://github.com/Imbad0202/academic-research-skills · ★ 30179 (+2106 this week) · academic-pipeline, academic-writing, ai-research, claude, claude-code, literature-review, peer-review, prompt-engineering

**What it does:** Academic Research Skills is a Claude Code plugin that wraps the full paper pipeline—literature search, citation verification, writing quality checks, and integrity gates—into slash commands like `/ars-plan`, keeping a human researcher in control at each stage rather than automating the whole thing away.

**Why now:** This week's star surge (30K+, +2K this week) coincides with growing scrutiny of AI-generated citations after Zhao et al.'s audit found ~147K hallucinated references in 2025 alone; ARS v3.8's new `ARS_CLAIM_AUDIT=1` pass directly addresses that problem by fetching cited sources and verifying claim support at the anchor level.

**Build with it:** Fork the pipeline to add a domain-specific integrity gate—swap in a field's preprint server (e.g., SSRN, bioRxiv) for the citation trust-chain fetcher, tune the HIGH-WARN classifiers against your own gold set, and ship a discipline-specific variant of ARS for law, medicine, or social science where citation accuracy carries real professional stakes.

## 9. ZhuLinsen/daily_stock_analysis <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ZhuLinsen/daily_stock_analysis · ★ 42110 (+1051 this week) · a-stock, ai-agent, aigc, llm, quant, quantitative-finance, quantitative-trading

**What it does:** An LLM-powered stock analysis system that aggregates market data, real-time news, and technical indicators for A/H/US markets, then generates AI decision reports with buy/sell signals and risk alerts, delivered to WeChat/Slack/Telegram on a schedule.

**Why now:** It gained over 1,000 stars this week, signaling sharp community momentum, and its multi-LLM, multi-data-source architecture makes it a practical reference as developers race to build agentic financial tooling on top of cheap API models.

**Build with it:** Fork the repo and wire in your own watchlist plus a DeepSeek or Gemini API key to get a zero-cost daily briefing, or extend the 15 built-in agent strategies to prototype a custom quant signal pipeline with push notifications to any channel you already use.

## 10. QuantumNous/new-api <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/QuantumNous/new-api · ★ 38332 (+993 this week) · ai-gateway, claude, deepseek, gemini, newapi, openai, rerank

**What it does:** New API is an open-source Go-based gateway that translates between OpenAI, Claude, and Gemini API formats, letting you route requests across dozens of LLM providers through a single authenticated endpoint with usage tracking and cost accounting.

**Why now:** It gained 993 stars this week, signaling a surge in developer interest likely tied to the current wave of multi-model workflows where teams need to swap providers without rewriting client code.

**Build with it:** Deploy it as a self-hosted proxy to A/B test Claude vs. Gemini vs. DeepSeek on the same prompt pipeline, or use it as the auth and billing layer for a multi-tenant SaaS product that resells LLM access.
