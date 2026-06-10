# AI Tastemakers — Daily Brief — 2026-06-10

_Ranking: bootstrap_since_first_seen · 10 repos · generated 2026-06-10T14:10:36.756Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_since_first_seen`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 38734 (+9970 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** /last30days is a Python-based AI agent skill that runs parallel searches across Reddit, X, YouTube, TikTok, HN, Polymarket, and GitHub, then scores results by real engagement signals (upvotes, likes, prediction market odds) to synthesize a grounded 30-day topic brief.

**Why now:** It hit #1 on GitHub Trending this week with nearly 10,000 new stars, driven by growing demand for AI research workflows that bypass stale training data and pull live, community-validated signals from walled-garden platforms no single AI natively accesses.

**Build with it:** Drop it into Claude Code or any of 50+ agent runtimes via one install command to add real-time research grounding to your own agents—useful for competitive intelligence tools, pre-meeting briefing bots, or trend-detection pipelines that need human-weighted signal rather than SEO-ranked noise.

## 2. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 21356 (+5550 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, compressing tool outputs, logs, RAG chunks, and conversation history by 60–95% before they hit the model—available as a Python/TypeScript library, a drop-in proxy, or an MCP server.

**Why now:** It's trending at 21,356 stars with 5,550 added this week, landing as context window costs and agent loop token bloat are becoming the primary scaling bottleneck for production AI systems.

**Build with it:** Drop `headroom proxy --port 8787` in front of any existing Claude Code, Cursor, or LangChain app with zero code changes, or use the MCP server to add `headroom_compress` and `headroom_retrieve` tools to any agent that reads large files or long log outputs.

## 3. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 40241 (+5025 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste Skill is a collection of portable agent skills (markdown files) that inject design rules—layout, typography, spacing, motion—into AI coding agents like Codex, Cursor, and Claude Code to prevent generic-looking UI output.

**Why now:** It gained 5,025 stars this week, signaling that developers are actively hitting the "AI slop UI" wall as vibe-coding workflows mature and the gap between functional and polished AI-generated frontends becomes harder to ignore.

**Build with it:** Run `npx skills add` to drop a skill into your existing Codex or Claude Code project and immediately raise the visual baseline of any AI-generated interface—useful for shipping demos, client work, or side projects where first impressions matter.

## 4. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 25920 (+3632 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI toolkit that gives AI agents (Claude Code, Cursor, etc.) the ability to read and search Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paying for any platform APIs, handling auth, cookie management, and HTML cleaning automatically.

**Why now:** The project gained 3,632 stars this week, signaling strong developer interest in grounding AI agents with live web data as agentic workflows move from toy demos to real automation pipelines that actually need current information.

**Build with it:** Drop it into a Claude Code or Cursor workflow to build a competitive intelligence agent that monitors Reddit threads, Twitter sentiment, and GitHub issues around a product or library in real time, all from a single CLI with no API keys required.

## 5. santifer/career-ops

https://github.com/santifer/career-ops · ★ 52333 (+3027 this week) · ai-agent, anthropic, automation, career, careerops, claude, claude-code, cli, golang, interview-prep, job-search, open-source, resume

**What it does:** Career-Ops is an open-source, Claude Code-powered job search automation system that evaluates job listings, generates personalized CVs, and runs 14 distinct skill modes — all from a CLI with a Go-based terminal dashboard and PDF output.

**Why now:** The repo is trending at 52,333 stars with 3,027 added this week, likely riding the wave of Anthropic's Claude Code momentum and growing developer interest in agentic CLI tooling for real-world workflows.

**Build with it:** Fork the pipeline to target a specific niche — swap in your own resume schema, add a scoring layer that filters by compensation data from a public API, or extend the batch processor to auto-draft outreach emails via a transactional mail service.

## 6. esengine/DeepSeek-Reasonix

https://github.com/esengine/DeepSeek-Reasonix · ★ 20717 (+1882 this week) · agent, agent-framework, ai-agent, ai-coding, cli, coding-agent, deepseek, developer-tools, ink, llm, prompt-caching, r1, terminal, tool-use, tui, typescript

**What it does:** DeepSeek-Reasonix is a terminal-based AI coding agent written in Go, built specifically around DeepSeek's prefix-caching architecture to keep token costs low across long, persistent sessions.

**Why now:** It gained nearly 1,900 stars this week and just shipped a ground-up 1.0 rewrite in Go, replacing the legacy TypeScript build with a single static binary and a fully config- and plugin-driven tool harness.

**Build with it:** Drop it into a long-running dev workflow to autonomously handle multi-step coding tasks — write a custom plugin to extend its tool set, or wire it into a CI environment where persistent prefix-cache reuse keeps API costs predictable at scale.

## 7. op7418/guizang-ppt-skill · **NEW**

https://github.com/op7418/guizang-ppt-skill · ★ 16304 (+920 this week) · ai-agent, claude-code, codex, html-deck, image-generation, ppt, presentation, skill, skills, swiss-design, web-ppt

**What it does:** Guizang PPT Skill is an AI-agent skill for Claude Code and Codex that generates polished single-file HTML slide decks in two distinct visual systems—editorial magazine style and Swiss International typography—plus matching social covers and image prompts, all without a build step or server.

**Why now:** The repo spiked 920 stars this week, signaling strong builder interest as Claude Code and Codex workflows mature into practical production pipelines for design-quality output.

**Build with it:** Install the skill, feed it a Markdown doc or article, and get a deployable HTML presentation with layout variants, a WebGL runtime, and coordinated cover images for WeChat, Xiaohongshu, and video formats—no design tools required.

## 8. Imbad0202/academic-research-skills

https://github.com/Imbad0202/academic-research-skills · ★ 29802 (+1729 this week) · academic-pipeline, academic-writing, ai-research, claude, claude-code, literature-review, peer-review, prompt-engineering

**What it does:** Academic Research Skills is a Claude Code plugin that runs a structured pipeline (plan → research → write → review → revise → finalize) with integrity gates that block hallucinated citations, unsupported claims, and fabricated references before they reach your manuscript.

**Why now:** Zhao et al.'s audit of 111M references found ~147K hallucinated citations in 2025 alone, and this week's v3.12.0 release builds on the v3.8 claim-audit pass (`ARS_CLAIM_AUDIT=1`) that actively fetches cited sources and flags five specific failure classes including fabricated references and claim-not-supported mismatches.

**Build with it:** Drop it into a Claude Code workflow to add citation trust-chain frontmatter and three-layer locator anchors to any research project, or extend the 7-mode integrity checklist in `ai_research_failure_modes.md` to gate AI-assisted writing in your own domain-specific pipeline.

## 9. aaif-goose/goose

https://github.com/aaif-goose/goose · ★ 48696 (+1698 this week) · acp, ai, ai-agents, mcp

**What it does:** Goose is an open-source, general-purpose AI agent built in Rust that runs locally as a desktop app, CLI, or API, supporting 15+ LLM providers and 70+ extensions via MCP to autonomously install, execute, edit, and test across code and workflow tasks.

**Why now:** The project just moved to the Linux Foundation's Agentic AI Foundation (AAIF) and gained 1,698 stars this week, signaling a major legitimacy shift from a company-backed tool to a vendor-neutral open standard under formal governance.

**Build with it:** Fork the repo to create a custom goose distribution with your own preconfigured provider, extensions, and branding — or embed the API into an internal developer platform to give your team a self-hosted agent that never sends data to a third-party cloud.

## 10. shareAI-lab/learn-claude-code · **NEW**

https://github.com/shareAI-lab/learn-claude-code · ★ 65856 (+808 this week) · agent, agent-development, ai-agent, claude, claude-code, educational, llm, python, teaching, tutorial

**What it does:** learn-claude-code is a minimal Python implementation of a Claude Code-style agent harness, walking you through how to wrap a language model with bash tooling, a perception-action loop, and just enough scaffolding to turn model outputs into real system actions.

**Why now:** The repo jumped 808 stars this week and is trending on Trendshift, signaling a surge of builders trying to understand what sits beneath Claude Code and similar agentic CLI tools before those patterns ossify into black-box frameworks.

**Build with it:** Fork the harness as a skeleton to wire your own LLM into a terminal-native coding agent—swap in a local model, add custom tools (file diffing, test runners, git ops), and study exactly which scaffolding choices affect reliability versus which ones are just boilerplate.
