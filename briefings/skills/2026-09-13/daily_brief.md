# Skill Tastemakers — Daily Brief — 2026-09-13

_Ranking: delta_7d · 10 repos · generated 2026-09-13T16:59:49.886Z_


## 1. FailproofAI/failproofai <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/FailproofAI/failproofai · ★ 3114 (+1947 this week) · agent-failure, agent-harness, agent-observability, agent-reliability, agent-tracing, ai-agent, claude-code, codex, enforcement, evals, guardrails, hermes, hooks, llm, llm-failures, llm-observability, npm-package, observability, openclaw, reliability

**What it does:** Failproof hooks into 12 agent harnesses — including Claude Code, OpenAI Codex, and GitHub Copilot CLI — to capture every tool call and enforce 39 built-in policies (block, warn, or audit) before execution, with a local dashboard and no account required.

**Why now:** The repo gained nearly 2,000 stars this week, coinciding with surging developer use of coding CLIs like Claude Code and Codex that ship with minimal built-in guardrails.

**Build with it:** Wrap your existing Claude Code or Codex workflow with the `failproofai` npm package and use a built-in policy to block dangerous shell tool calls before they reach your filesystem.

## 2. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 65850 (+1575 this week) · ai, ai-agents, ai-prompts, anthropic, chatbot, chatgpt, claude, claude-code, codex, cursor, gemini, generative-ai, google, grok, llm, openai, prompt, prompt-engineering, system-prompt, system-prompts

**What it does:** A community-maintained collection of verbatim system prompts extracted from major AI chatbots — Claude, ChatGPT, Gemini, Grok, Codex, Perplexity, and others — organized by provider and model version.

**Why now:** An HN thread flagged that Claude's system prompt exceeds 24k tokens with tools, and the repo just added Claude Code headless (Fable 5.1) and Codex GPT-6-Astra prompts this week, making it the freshest public snapshot of frontier model instructions available.

**Build with it:** Pull the raw prompt files for your target model into your eval harness as baseline context to benchmark how much your own system prompt diverges from what the original ships with.

## 3. tigerless-labs/autoharness <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/tigerless-labs/autoharness · ★ 4421 (+1466 this week) · agent-skills, claude-code, claude-code-plugin, llm-agents, python

**What it does:** AutoHarness is a Claude Code plugin that distills skills from your live coding sessions into a self-pruning `.claude/skills/` library — merging near-duplicate scenarios and retiring unused skills automatically, with no separate data collection loop.

**Why now:** The project surfaced on Hacker News this week and gained 1,466 stars in seven days, signaling fresh builder attention around the "Big Harness" framing and Claude Code's plugin ecosystem.

**Build with it:** Install via `/plugin marketplace add tigerless-labs/autoharness` inside Claude Code, then use `/learn` mid-session after solving a tricky problem to immediately distill that solution into a reusable, versioned skill.

## 4. chuspeeism/dashi-ppt-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/chuspeeism/dashi-ppt-skill · ★ 8127 (+1400 this week) · agent-skill, ai-agent, ai-ppt, claude, claude-code, dashial, html-presentation, ppt, pptx, presentation, presentation-generator, skill, slide-generator, slides

**What it does:** Dashi PPT Skill is a JavaScript agent skill that takes a document as input and generates browser-renderable presentations across 12 visual themes and 1,020 slide layouts, with per-slide editing controls and one-click export to real, editable PPTX.

**Why now:** The repo gained 1,400 stars this week, signaling a breakout moment likely tied to growing interest in Claude Code and Codex-based agentic workflows where presentation generation is a natural terminal step.

**Build with it:** Run `npx dashi-ppt-skill@latest` to register the skill, then invoke it from Claude Code by passing a markdown brief to get a themed, browser-editable deck without leaving your coding environment.

## 5. decolua/9router

https://github.com/decolua/9router · ★ 28626 (+1387 this week) · ai-agents, ai-gateway, anthropic, chatgpt, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, gemini-cli, llm, llm-gateway, openai, openai-proxy, qwen, token-saver

**What it does:** 9Router is a local proxy (running at `localhost:20128`) that routes requests from AI coding tools like Claude Code, Cursor, and Cline across 40+ providers with automatic tier-based fallback (subscription → cheap → free) and an RTK token compressor that trims 20–40% of tokens from tool_result payloads.

**Why now:** The repo gained 1,387 stars this week, coinciding with active interest in free-tier AI coding workflows as Kiro AI and OpenCode Free emerged as zero-signup model sources the router already supports natively.

**Build with it:** Point an existing Claude Code or Cline install at `http://localhost:20128/v1` with the dashboard-generated API key, then enable a free Kiro AI provider to validate the full fallback chain without spending a dollar.

## 6. jordan-gibbs/hyperresearch <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/jordan-gibbs/hyperresearch · ★ 3176 (+1341 this week) · agents, agentskills, claude-code, deep-research, deep-research-agent

**What it does:** Hyperresearch is a Claude Code slash-command agent that runs a 16-step research pipeline — width sweep, independence audit, adversarial critique, and cite-checking — against 250+ sources per run, storing everything in a persistent SQLite-backed markdown vault that subsequent sessions reuse.

**Why now:** The repo gained 1,341 stars this week, coinciding with growing builder interest in Claude Code as an agentic substrate and the project's claim of leading the DeepResearch-Bench leaderboard ahead of Gemini and OpenAI Deep Research.

**Build with it:** Install via `pip install hyperresearch && hyperresearch install` inside any project directory, then invoke `/hyperresearch <query>` from Claude Code to drop a fully cited, adversarially audited report into your existing workflow without writing any agent scaffolding yourself.

## 7. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 132637 (+1306 this week) · ai-tools, claude-code, codex, desktop-app, grok, grokbuild, hermes, hermes-agent, mcp, open-source, openclaw, openclaw-ui, opencode, pi, provider-management, rust, skills, skills-management, tauri, wsl-support

**What it does:** CC Switch is a cross-platform Tauri/Rust desktop app that manages API keys, providers, and configuration for eight AI coding tools — Claude Code, Codex, Gemini CLI, Grok Build, OpenCode, OpenClaw, and Hermes Agent — from a single GUI.

**Why now:** The repo gained 1,306 stars this week, coinciding with active support for Grok Build and Hermes Agent, two recently launched agentic tools that lack native multi-provider switching.

**Build with it:** Point CC Switch at your existing Claude Code config and use its provider-switching UI to test a third-party relay (such as PackyAPI or ZetaAPI) against Anthropic's official endpoint without editing environment variables manually.

## 8. chatanywhere/GPT_API_free <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/chatanywhere/GPT_API_free · ★ 42446 (+1268 this week) · api, chatgpt, claude, deepseek, gemini, gpt, grok, llm-agents

**What it does:** ChatAnywhere provides a reverse-proxy API gateway that lets you call GPT, DeepSeek, Claude, Gemini, and other major LLMs through a single OpenAI-compatible endpoint, with a free tier of 50,000 points/week and 100 requests/day via Chinese domestic routing that requires no VPN.

**Why now:** The repo gained 1,268 stars this week, likely tracking renewed builder interest in DeepSeek-v3.2 and the newly listed gpt-5 series models added to the free tier.

**Build with it:** Point an existing OpenAI SDK integration at `https://api.chatanywhere.tech` and swap in a free API key from chatanywhere.tech to test DeepSeek or gpt-5 calls without changing any other client code.

## 9. AgriciDaniel/claude-ads <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/AgriciDaniel/claude-ads · ★ 9230 (+1261 this week) · agent-skills, ai, ai-marketing, claude-code, claude-code-skill, google-ads, marketing-automation, meta-ads, open-source, paid-advertising, ppc

**What it does:** Claude Ads is a Claude Code skill that connects to 12 paid-media platforms (Google, Meta, Amazon, TikTok, and others) to run source-grounded audits, draft optimization plans, and produce versioned JSON reports — all read-only by default, with write operations gated behind approval and rollback checks.

**Why now:** The repo gained 1,261 stars this week, signaling a sharp uptick in builder attention around agentic marketing workflows as Claude Code's plugin ecosystem matures.

**Build with it:** Drop the skill into Claude Code, run `/ads audit meta` against an exported Meta Ads dataset, and inspect the versioned JSON output to validate the evidence-grounding and confidence-scoring workflow before wiring in any live account reads.

## 10. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 137138 (+8205 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a skill/prompt layer for AI coding agents (Claude Code, Cursor, and 19 others) that enforces YAGNI discipline — steering agents toward the smallest working solution instead of over-engineered defaults.

**Why now:** The repo gained 8,205 stars this week, surfacing as a top Trendshift daily and weekly trending JavaScript repo, with a newly published agentic benchmark showing ~54% mean code reduction against a fair Claude Code baseline across 12 real feature tasks.

**Build with it:** Drop the ponytail skill into your Claude Code setup and run it against a feature prompt known to trigger over-building (a date picker, a form validator) to immediately benchmark how much scaffolding it suppresses.
