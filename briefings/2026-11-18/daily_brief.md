# AI Tastemakers — Daily Brief — 2026-11-18

_Ranking: delta_7d · 10 repos · generated 2026-11-18T22:33:17.861Z_


## 1. lemomo-ai/lemo-opuscar

https://github.com/lemomo-ai/lemo-opuscar · ★ 18314 (+3437 this week) · agent-skills, ai-agents, ai-short-film, ai-video, animation, canvas, claude, claude-code, claude-code-plugin, claude-code-skill, creative-coding, ffmpeg, filmmaking, motion-graphics, opus-5-5, prompt-library, text-to-speech, threejs, video-production, webgl

**What it does:** Lemo-Opuscar gives Claude Code (Anthropic's AI coding agent) a library of 99 cinematic film styles, each paired with a style prompt and a demo short film generated entirely in code using Three.js, Canvas, WebGL, and ffmpeg, with no video model involved.

**Why now:** The project just added 33 new styles across 15 visual categories and launched a bilingual gallery site, with a 2026-11-12 release coinciding with this week's star surge.

**Build with it:** Install the Claude Code plugin with `claude plugin marketplace add lemomo-ai/lemo-opuscar`, then prompt your agent with a single sentence naming a style and a subject to generate a finished short film in your current folder.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 468184 (+15668 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a tool that connects AI agents to external capabilities) that lets AI agents reverse engineer binaries, mobile apps, and running processes without source code, down to the native instruction level.

**Why now:** The repo is trending at 468k stars with 15k added this week, a sudden spike likely tied to community showcases and broader momentum around MCP tooling.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent (Claude Code, for example), then point it at a closed app to extract and replicate a feature into your own project.

## 3. Donchitos/Claude-Code-Game-Studios

https://github.com/Donchitos/Claude-Code-Game-Studios · ★ 40068 (+1634 this week) · ai-agents, ai-assisted-development, anthropic, claude, claude-code, game-design, game-development, gamedev, godot, indie-game-dev, unity, unreal-engine

**What it does:** Claude Code Game Studios turns a text description into a playable browser game by running Claude Code through a structured pipeline of questions, a one-page brief, a first build, and automated checks before handing off to you.

**Why now:** The repo gained over 1,600 stars this week, a sharp spike in builder interest around agentic game-dev workflows.

**Build with it:** Run `/prototype` inside Claude Code against this repo with any game idea, then use `/cut` to scope a shippable version once the prototype is working.

## 4. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 79764 (+9794 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency dsh (DeepSeek Harness) plugin that exposes frontier LLMs including DeepSeek V4.1 Flash and Kimi K3 through the OpenCode Zen and Kilo AI public gateways, with no login, API key, or usage cap required.

**Why now:** The repo hit the top of GitHub Trending for JavaScript this week (2026-10-05 to 2026-10-11), coinciding with active model availability probing, a live announcement push system, and the Kilo free-pool channel landing in the same release window.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using the base URL it exposes to get immediate access to the full model roster without managing credentials.

## 5. ccch1mneyyy/dsh-Go

https://github.com/ccch1mneyyy/dsh-Go · ★ 27142 (+7470 this week) · ai-agent, android, android-app, coding-agent, deepseek, deepseek-harness, dsh, dsh-plugin, dsh-tui, flutter, llm

**What it does:** DSH Go is a Flutter-based Android app (with iOS in development) that runs DeepSeek Harness, an AI coding agent, on mobile so you can interact with it locally or use it to remote-control your desktop.

**Why now:** The repo gained 7,470 stars this week and hit the Trendshift all-language daily top spot, a sharp spike in builder attention.

**Build with it:** Sideload the arm64 APK from GitHub Releases, connect it to your existing DeepSeek Harness setup via the dsh-plugin interface, and validate mobile-to-desktop agent control as a lightweight alternative to a dedicated machine.

## 6. pingdotgg/t3code

https://github.com/pingdotgg/t3code · ★ 65171 (+6916 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code is an open-source, MIT-licensed desktop and mobile control plane that runs Claude Code, Codex, Cursor, and other ACP-compatible coding agents locally while exposing a single unified thread interface across desktop, web, iOS, and Android.

**Why now:** The repo gained nearly 7,000 stars this week, tracking a broader surge in agentic coding tool adoption.

**Build with it:** Install the `t3` CLI via the one-liner, sign into Claude Code or Codex, and use T3's built-in Git worktree support to run agent threads against isolated branches with one-button commit and pull request creation.

## 7. Thysrael/Horizon

https://github.com/Thysrael/Horizon · ★ 14716 (+1013 this week) · aggregator, feishu-bot, llm, mcp, news, openclaw, python, webhook

**What it does:** Horizon is a Python pipeline that pulls from configurable news sources, summarizes them with LLMs (Claude or GPT), and delivers daily bilingual briefings in English and Chinese via webhooks or a static site.

**Why now:** The repo gained over 1,000 stars this week and currently ranks on Trendshift's daily Python chart, a notable spike for a personal productivity tool.

**Build with it:** Add a custom RSS source to the sources config and wire the output to a Feishu bot webhook to get a team-facing daily digest running in one deploy.

## 8. TauricResearch/TradingAgents

https://github.com/TauricResearch/TradingAgents · ★ 123070 (+987 this week) · agent, finance, llm, multiagent, trading

**What it does:** TradingAgents is a Python framework that coordinates multiple LLM-powered analyst and manager agents to research stocks and produce dated trading decisions, with backtesting over a ticker-and-date grid and point-in-time data integrity across SEC filings, FRED macro, and price feeds.

**Why now:** Version 0.7.1 shipped this week with a fix for model dates that could read filings made after the run date, correcting a core look-ahead bias that was undermining backtest validity.

**Build with it:** Run a backtest against a specific ticker and date range using the CLI flags `--ticker` and `--date` to validate decision quality on historical closes without writing any orchestration code.

## 9. irinabuht12-oss/marketing-skills

https://github.com/irinabuht12-oss/marketing-skills · ★ 8321 (+980 this week) · ai-visibility, claude-code, claude-desktop, claude-marketing-skills, claude-plugin, claude-skills, claude-skills-for-marketing, cursor, geo, google-ads, google-ads-mcp, marketing, marketing-skills, mcp, mcp-server, meta-ads, meta-ads-mcp, seo

**What it does:** This repo provides 49 prompt-based Claude skills for marketing tasks including Google Ads audits, Meta creative fatigue detection, SEO, and AI visibility, backed by the Ryze MCP connector that feeds live Google Ads, Meta Ads, GA4, and Search Console data into Claude.

**Why now:** The repo gained 980 stars this week, tracking a spike in interest around Claude Code plugins as a workflow surface for non-engineering teams.

**Build with it:** Run `claude mcp add ryze --transport http https://connector.get-ryze.ai/mcp` to wire live ad account data into Claude, then trigger the Google Ads Audit skill to surface wasted spend and negative keyword gaps against your actual account.

## 10. irinabuht12-oss/google-ads-meta-ads-mcp

https://github.com/irinabuht12-oss/google-ads-meta-ads-mcp · ★ 8324 (+913 this week) · advertising, chatgpt, claude, cursor, facebook-ads, facebook-ads-mcp, ga4, google-ads, google-ads-mcp, google-ads-mcp-server, google-analytics, google-analytics-mcp, mcp, mcp-server, meta-ads, meta-ads-mcp, meta-ads-mcp-server, model-context-protocol, n8n, remote-mcp

**What it does:** Ryze AI's hosted remote MCP server unifies Google Ads, Meta Ads (Facebook and Instagram), GA4, and Google Search Console into 250+ tools accessible from Claude, ChatGPT, Cursor, and n8n via OAuth login, with no API keys or developer token required.

**Why now:** The repo gained over 900 stars this week, aligning with growing adoption of remote MCP endpoints as a simpler alternative to self-hosted servers.

**Build with it:** Run `claude mcp add ryze --transport http https://connector.get-ryze.ai/mcp` to connect your ad accounts and prompt Claude to pull campaign performance data and generate an audit report directly in your chat session.
