# Skill Tastemakers — Daily Brief — 2026-09-05

_Ranking: delta_7d · 10 repos · generated 2026-09-05T16:05:06.879Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 127470 (+12161 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a skill/rules layer for AI coding agents (Claude Code, Cursor, etc.) that steers them toward the laziest correct solution — using a native `<input type="date">` instead of installing flatpickr, for example.

**Why now:** It hit Hacker News this week (98 points, 17 comments) alongside a spike of 12,161 stars in seven days, surfacing active discussion around whether agent verbosity is a prompt problem or a model problem.

**Build with it:** Drop Ponytail's skill file into an existing Claude Code project and run the same feature task you already have queued — the benchmark setup in `benchmarks/` lets you measure token and line-count delta against your own baseline immediately.

## 2. K-Dense-AI/scientific-agent-skills

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 42866 (+6343 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** Scientific Agent Skills is a library of 163 validated research skills — covering genomics, drug discovery, PK/PD modelling, and 100+ scientific databases — that plugs into any Agent Skills-compatible AI agent to give it structured, procedural scientific capabilities.

**Why now:** The project crossed 42,000 GitHub stars this week with a gain of 6,343, coinciding with a recorded onboarding webinar for K-Dense BYOK, the free desktop co-scientist powered by this library.

**Build with it:** Drop the skills into an existing Cursor or Claude Code workspace via the Agent Skills config surface and immediately run live queries against scientific databases without writing custom API integrations.

## 3. stablyai/orca

https://github.com/stablyai/orca · ★ 62092 (+5966 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE (Agent Development Environment) that runs Codex, Claude Code, OpenCode, or Pi in parallel git worktrees, letting you fan one prompt across multiple agents and merge the winning result.

**Why now:** The project surfaced on Hacker News this week as a "Show HN: Open Source 'Conductor + Ghostty'" and is accumulating nearly 6,000 stars in a single week, signaling a breakout moment in developer awareness.

**Build with it:** Point Orca at an existing repo, spawn five parallel worktrees from one prompt via the Parallel Worktrees feature, and use Design Mode's Chromium click-to-capture to pipe live UI diffs directly into each agent's context.

## 4. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 249377 (+5419 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness system that layers skills, instincts, memory, and security onto AI coding agents like Claude Code, Codex, Opencode, and Cursor.

**Why now:** The repo hit GitHub's trending rank this week with over 5,000 new stars, coinciding with active multi-runtime support across Claude Code and the newly released Opencode CLI.

**Build with it:** Drop the `ecc-universal` npm package into an existing Claude Code or Cursor workflow to add persistent memory and AgentShield security without changing your underlying model config.

## 5. blader/humanizer

https://github.com/blader/humanizer · ★ 43254 (+4650 this week) · agent-skills, ai-writing, claude-code, codex, cursor, prompt-engineering, writing-tools

**What it does:** Humanizer is an agent skill (plain Markdown, works in Claude Code, Cursor, Codex) that rewrites AI-generated text using 35 specific patterns drawn from Wikipedia's "Signs of AI Writing" list, running two passes — draft then self-critique — without altering facts, code, or link targets.

**Why now:** The repo gained 4,650 stars this week, a spike that tracks the ongoing WikiProject AI Cleanup effort on Wikipedia and renewed builder interest in post-processing LLM output before it ships.

**Build with it:** Drop `/humanizer` as a skill into your existing Claude Code workflow and pipe your documentation drafts through it as a pre-commit step to catch passive voice, overused AI words, and inflated phrasing before they reach users.

## 6. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 241842 (+4109 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python agent that builds reusable skills from past tasks, maintains cross-session memory, and runs on any model endpoint via a single `hermes model` switch.

**Why now:** The repo crossed 241,000 stars this week with 4,100 added, signaling a sharp spike in builder attention around its closed learning loop and multi-platform gateway (Telegram, Discord, Slack) landing simultaneously.

**Build with it:** Point it at your own OpenAI-compatible endpoint via `hermes model`, then let it run a complex multi-step task to watch it auto-generate a reusable skill you can inspect and redeploy.

## 7. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 61499 (+3972 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an MIT-licensed AI gateway that routes requests across 352 providers (150+ free tiers, ~1.47B free tokens/month) through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman compression that cuts token usage by 15–95%.

**Why now:** The repo gained ~3,972 stars this week, signaling a surge of builders actively stress-testing it — making this a practical moment to benchmark fallback behavior against your own rate limits rather than discover gaps mid-project.

**Build with it:** Point your existing Claude Code or Cursor config at OmniRoute's endpoint and let the auto-fallback cycle through free Gemini, GPT, and Claude tiers so you can measure real token savings before committing any spend.

## 8. Nanako0129/sepia <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Nanako0129/sepia · ★ 2236 (+1962 this week) · agent-skills, ai-writing, antigravity, claude-code, codex, developer-tools, fiction, grok, humanizer, llm, prompt-engineering, writing-tools

**What it does:** sepia is a portable Agent Skill that repairs AI-written text at the narrative-architecture layer—not just word choice—using a three-pass protocol for fiction (built on StoryScope's measured structural tells) and venue-matched rule files for professional prose like PRs, postmortems, and release notes.

**Why now:** The repo gained 1,962 stars this week, signaling a sharp spike in builder attention likely tied to the StoryScope paper (arXiv:2604.03136) demonstrating that surface-level humanizers barely dent AI detection (95.5% → 93.9% F1) while structural features alone hit 93.2%.

**Build with it:** Install the skill into any of the 77+ supported agents via the Skills CLI, then wire the `refactor` operation into your existing writing or review workflow to get minimal structural edits without a full rewrite.

## 9. freestylefly/awesome-gpt-image-2

https://github.com/freestylefly/awesome-gpt-image-2 · ★ 28136 (+3921 this week) · agents, ai-image-generation, chatgpt, dsh-plugin, gpt-image-2, image-prompts, prompt-as-code, prompt-engineering, skills, workflow-automation

**What it does:** A prompt engineering library of 530+ reverse-engineered GPT-Image-2 cases and 20+ industrial templates, organized as reusable "Skills" with a browsable gallery at gpt-image2.canghe.ai for copying, filtering, and testing prompts.

**Why now:** The repo gained 3,921 stars this week, placing it on Trendshift's trending repositories list at a moment when GPT-Image-2's API availability is driving active demand for production-grade prompt patterns.

**Build with it:** Pull a template from the `/data` directory, wire it to APIMart's async GPT-Image-2 API (`$0.006/image`), and run batch image generation against your own product catalog without writing prompt logic from scratch.

## 10. elder-plinius/CL4R1T4S

https://github.com/elder-plinius/CL4R1T4S · ★ 49013 (+1816 this week) · agents, ai, chatgpt, gemini, google, grok, hacking, leak, leaked, openai, prompt, prompt-engineering, prompts, red-team, red-teaming, system, system-info, system-prompts, tools, transparency

**What it does:** CL4R1T4S is a public repository of extracted and leaked system prompts from major AI models and agents — including ChatGPT, Claude, Gemini, and Grok — exposing the hidden instructions that shape their behavior.

**Why now:** The repo gained 1,816 stars this week, signaling a surge of interest likely tied to ongoing public scrutiny of AI model behavior and persona constraints across the industry.

**Build with it:** Pull the extracted system prompts as reference fixtures when writing your own prompt evaluation tests — comparing your app's instructions against real-world examples to spot unintended behavior patterns before shipping.
