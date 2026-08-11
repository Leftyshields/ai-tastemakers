# Skill Tastemakers — Daily Brief — 2026-08-11

_Ranking: delta_7d · 10 repos · generated 2026-08-11T14:32:52.942Z_


## 1. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 45654 (+7123 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that proxies requests across 290+ AI providers through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman prompt compression that cuts token usage by 15–95%.

**Why now:** The repo gained 7,123 stars this week, coinciding with active community growth across Discord and Telegram and a re-audited free-tier catalog now documenting ~1.53B free tokens/month across 43 provider pools — a concrete number builders can plan around.

**Build with it:** Point Claude Code, Cursor, or Cline at the OmniRoute endpoint by swapping the base URL in their OpenAI-compatible config, then enable the fallback chain so quota exhaustion on one provider silently rolls to the next without interrupting a coding session.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 100597 (+5941 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code agent skill (also works as cursor rules / agent config) that installs a "laziest senior dev" heuristic into your AI agent, steering it toward YAGNI decisions like replacing a flatpickr date-picker installation with `<input type="date">`.

**Why now:** It hit Hacker News this week with 98 points and is trending on Trendshift as a weekly top repository, timed to growing frustration with AI agents that over-build — the benchmark shows a 54% mean LOC reduction across 12 real FastAPI + React feature tasks against a fair agentic baseline.

**Build with it:** Drop the npm package `@dietrichgebert/ponytail` into your Claude Code setup via the agent-skills config surface, or copy the cursor-rules file into `.cursor/rules`, and it will constrain every subsequent codegen session without touching your existing safety guards.

## 3. iOfficeAI/OfficeCLI

https://github.com/iOfficeAI/OfficeCLI · ★ 27637 (+2952 this week) · agent, ai, claude-code, cli, codex, docx, excel, office, openclaw, pptx, presentation, skills, word, xlsx

**What it does:** OfficeCLI is a single C# binary that lets AI agents read, write, and render `.docx`, `.xlsx`, and `.pptx` files without any Office installation, exposing a CLI interface and a SKILL.md skill file that agents like Claude Code and Cursor can self-install and invoke.

**Why now:** The project hit HN this week with 215 points and 62 comments, surfacing alongside the broader wave of agentic coding tools where file I/O on Office formats is a recurring gap agents can't cleanly close.

**Build with it:** Drop the skill into a Claude Code or Cursor project via `officecli install`, then wire it into an agentic workflow that drafts a `.pptx` report or fills an `.xlsx` template from structured data — the built-in HTML/PNG render step gives the agent a feedback loop to verify layout before delivering the file.

## 4. stablyai/orca

https://github.com/stablyai/orca · ★ 42285 (+5858 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source desktop, mobile, and VPS app that orchestrates multiple coding agents (Claude Code, Codex, OpenCode, Pi) in parallel git worktrees, letting you fan one prompt across several agents and merge whichever result wins.

**Why now:** The repo gained 5,858 stars this week, signaling a surge of interest likely tied to the broader parallel-agent workflow conversation following Anthropic's Claude Code GA launch and the OpenAI Codex CLI release — both of which Orca supports natively.

**Build with it:** Drop Orca into an existing repo, configure your API keys for Claude Code or Codex, then use the parallel worktrees feature to run the same feature branch task across three agents simultaneously — compare diffs in-app and `git merge` the winner without ever leaving the terminal splits.

## 5. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 70574 (+5085 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP server that lets AI agents read and search Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paid API keys, handling auth, anti-bot bypasses, and HTML cleaning under the hood.

**Why now:** The project hit #1 on GitHub Trending this week with 5,085 stars added, coinciding with accelerating Claude Code and Cursor adoption where agents routinely stall on web-research tasks that require real-time social data.

**Build with it:** Drop it into a Claude Code or Cursor workflow via MCP config, then wire the `twitter_search` and `reddit_search` tools directly into a research or monitoring agent that surfaces structured results without touching a paid API.

## 6. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 86078 (+4654 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** A collection of 24 slash-command-driven engineering skills (spec, plan, build, test, review, ship) that wire senior-engineer workflows—TDD, API design, web perf audits—into AI coding agents like Claude Code, Cursor, and Codex via a single `npx skills add` command.

**Why now:** The repo gained 4,654 stars this week, coinciding with growing adoption of Claude Code's plugin marketplace and Codex CLI, making structured agent behavior a live pain point developers are actively solving right now.

**Build with it:** Drop `/build auto` into a Claude Code session to run a fully autonomous plan-then-implement loop—spec approval once, then the agent commits each task individually with tests, pausing only on failures—using the `npx skills add addyosmani/agent-skills` install path.

## 7. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 75334 (+4445 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a collection of portable agent skills (markdown rule files) that constrain AI coding tools to produce tighter layout, typography, motion, and spacing — replacing default boilerplate output with more considered frontend decisions.

**Why now:** The repo gained 4,445 stars this week, coinciding with active discussion around Claude Code and Codex skill/rules systems becoming a real configuration surface — making prompt-layer design constraints newly practical rather than aspirational.

**Build with it:** Drop the skill files into your `.claude`, Cursor rules, or Codex agent config, then pair the included image-generation skills with ChatGPT Images to produce reference frames before handing implementation to the agent — giving the model a visual target instead of guessing.

## 8. blader/humanizer

https://github.com/blader/humanizer · ★ 34930 (+2050 this week) · agent-skills, ai-writing, claude-code, codex, cursor, prompt-engineering, writing-tools

**What it does:** Humanizer is a portable Markdown skill file that rewrites AI-generated text by detecting and eliminating 33 documented patterns — significance inflation, vague attributions, promotional filler — using the Wikipedia "Signs of AI writing" guide as its pattern library.

**Why now:** The repo gained 2,050 stars this week, likely tracking the broader moment where AI-detection pressure is hitting publishing, hiring, and academic workflows simultaneously, making output cleanup a repeatable production step rather than a one-off edit.

**Build with it:** Drop `SKILL.md` into your Claude Code, Cursor, or Codex skill directory via `npx skills add blader/humanizer --global`, then wire it into a pre-publish step that pipes draft files through `/humanizer` before they hit your CMS or docs repo.

## 9. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 228842 (+4099 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving Python agent from Nous Research with a closed learning loop — it creates and refines skills from experience, maintains cross-session memory via FTS5 search and LLM summarization, and runs across seven terminal backends including Modal and Daytona serverless.

**Why now:** The project is gaining sharp traction this week (228K+ stars, +4K in the past seven days), coinciding with visible community interest in persistent, model-agnostic agents as alternatives to Claude Code and Codex for long-running workflows.

**Build with it:** Wire it to your own OpenAI-compatible endpoint using `hermes model`, deploy on a Modal serverless backend so the agent hibernates when idle, then hook the built-in cron scheduler to deliver nightly audit reports over the Telegram gateway — no laptop required.

## 10. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 105203 (+3582 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus its docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using deterministic tree-sitter AST parsing, with every edge explained and nothing sent to a vector store or external server.

**Why now:** The project gained 3,582 stars this week and carries a YC S26 badge alongside topics like `claude-code`, `codex`, and `gemini`, placing it squarely in the current wave of MCP-compatible tooling as developers standardize agentic coding workflows across multiple AI assistants.

**Build with it:** Add the `/graphify` skill to Claude Code or Cursor, point it at a monorepo with mixed SQL schemas and Python modules, then query cross-file call graphs and schema relationships directly from your assistant's chat interface instead of running manual `grep` or `ctags` pipelines.
