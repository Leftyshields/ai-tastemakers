# Skill Tastemakers — Daily Brief — 2026-08-14

_Ranking: delta_7d · 10 repos · generated 2026-08-14T14:21:03.601Z_


## 1. stablyai/orca

https://github.com/stablyai/orca · ★ 45420 (+6002 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source Agent Development Environment (ADE) that runs Codex, Claude Code, OpenCode, or Pi agents in parallel git worktrees, with a companion mobile app for monitoring and steering agents remotely.

**Why now:** The project hit a Show HN thread this week and is trending at +6,002 stars, coinciding with the broader wave of CLI coding agents (Codex, Claude Code) that teams are actively trying to orchestrate rather than run one at a time.

**Build with it:** Wire your existing Claude Code or Codex subscription into Orca's parallel worktree workflow — fan a single prompt across five isolated branches, let agents race, then diff and merge the winning branch directly from the terminal-split UI.

## 2. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 47705 (+5520 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that exposes 330+ AI providers through a single OpenAI-compatible endpoint, with quota-aware auto-fallback across free tiers and RTK+Caveman token compression that cuts context size by 15–95%.

**Why now:** The repo gained 5,520 stars this week, coinciding with the project surfacing on Trendshift's trending list — a signal that developers are actively looking for ways to stretch free-tier Claude, Gemini, and GPT quotas as personal API spend climbs.

**Build with it:** Point Claude Code, Cursor, or Cline at OmniRoute's endpoint by swapping the `OPENAI_BASE_URL` config variable, then let the 19 routing strategies distribute load across free-tier providers — effectively giving coding assistants a ~1.51B token/month budget without touching paid credits.

## 3. guillaumemeyer/watermarks-remover <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/guillaumemeyer/watermarks-remover · ★ 6944 (+2641 this week) · agent-skill, ai, c2pa, claude, provenance, synthid, watermark

**What it does:** watermarks-remover strips AI provenance signals from text and files across three layers: deterministic Unicode hygiene (invisible chars, bidi, tag codepoints), statistical token-watermark rewrites via a pluggable backend hook, and C2PA/EXIF/XMP metadata removal from PNG, JPEG, SVG, PDF, DOCX, and Markdown.

**Why now:** The project gained 2,641 stars this week, surfacing on Hacker News as C2PA adoption accelerates across major AI image pipelines and SynthID-Text rolls into broader Gemini surfaces — making provenance stripping a live practical concern rather than a theoretical one.

**Build with it:** Drop the skill into a Grok agent via `ln -sfn` into `~/.grok/skills/` and invoke `/remove-ai-marks` as a pipeline step in any content workflow; or call `clean_file.py` directly in a CI job to scrub metadata from AI-generated assets before publishing.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 102583 (+4569 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code skill/agent plugin that injects a "laziest senior dev" heuristic into AI coding agents, steering them toward built-ins and minimal diffs instead of new dependencies and boilerplate.

**Why now:** The project is trending this week (+4,569 stars) alongside the public launch of Claude Code's agent-skills ecosystem, making it a timely reference point for anyone evaluating how prompt-layer constraints compare to model-level guardrails for agentic coding.

**Build with it:** Drop the skill into your Claude Code `CLAUDE.md` or cursor rules config and run it against a real feature branch — the benchmarks are reproducible in `benchmarks/` against `tiangolo/full-stack-fastapi-template`, so you can validate the LOC and cost deltas on your own codebase before committing.

## 5. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 87166 (+3651 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** A collection of 24 slash-command-driven skills (`/spec`, `/plan`, `/build`, `/test`, etc.) that encode senior engineering workflows — spec writing, TDD, code review, web performance auditing — into a format AI coding agents follow consistently across a project lifecycle.

**Why now:** The repo gained 3,651 stars this week, coinciding with growing adoption of agentic coding tools (Claude Code, Codex, Cursor) where the missing piece is not raw capability but structured, repeatable process — exactly the gap these skills target.

**Build with it:** Run `npx skills add addyosmani/agent-skills` to install all 24 skills into Claude Code or Cursor, then drop `/build auto` into an existing project to generate a plan and execute every task autonomously with per-task commits and test gates, without wiring up any custom prompts.

## 6. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 230471 (+3553 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python agent from Nous Research that creates and refines skills from experience, maintains cross-session memory with FTS5 search, and runs across seven execution backends (local, Docker, SSH, Modal, Vercel Sandbox, and others) against any OpenAI-compatible endpoint.

**Why now:** The project crossed 230K stars this week with 3,553 new stars, coinciding with growing builder interest in agents that aren't tied to a single provider or laptop — particularly as Claude Code and Codex comparisons drive traffic toward self-hosted alternatives.

**Build with it:** Wire it to your existing OpenRouter or Nous Portal key via `hermes model`, deploy the agent process on a Modal serverless backend so it hibernates when idle, then add a Telegram gateway so it receives tasks remotely while executing code on cloud VMs — all without touching application code.

## 7. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 71638 (+3495 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP server that gives AI agents authenticated, structured access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paid API keys, handling anti-bot bypasses and HTML-to-readable-text conversion internally.

**Why now:** Claude Code and Cursor's MCP plugin ecosystems are maturing rapidly this month, and Agent Reach ships a ready-made MCP config that drops directly into those tools — meeting builders exactly where agent tooling adoption is accelerating.

**Build with it:** Drop the provided `mcp.json` config into Cursor or Claude Code's MCP settings, then wire `reach_search` and `reach_read` tool calls into any agent loop to give it live web context without touching a single API billing dashboard.

## 8. herdrdev/herdr

https://github.com/herdrdev/herdr · ★ 28968 (+3482 this week) · agent, agent-orchestration, ai, ai-agents, claude-code, cli, codex, coding-agents, developer-tools, devtools, multiplexer, rust, terminal, terminal-multiplexer, terminal-ui, tmux, tui, workspace-manager

**What it does:** Herdr is a Rust-based terminal multiplexer and background server that runs coding agents (Claude Code, Codex, Cursor, etc.) persistently, exposing each pane's state — working, blocked, or idle — through a CLI and socket API.

**Why now:** The project gained 3,482 stars this week, coinciding with the current wave of multi-agent coding workflows where the missing primitive is exactly this: a persistent runtime that lets agents spawn panes, query each other's blocked state, and survive network drops without babysitting.

**Build with it:** Wire an orchestration script to the socket API to auto-route prompts — when one agent pane reports `blocked`, use `herdr`'s CLI to dispatch the question to a second pane running a different model, implementing a cheap supervisor loop without any custom daemon code.

## 9. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 240098 (+1618 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness layer that adds skills, memory, instincts, and security hooks to AI coding agents like Claude Code, Codex, Cursor, and Opencode via a plugin system and CLAUDE.md-style configuration.

**Why now:** Claude Code's plugin/slash-command ecosystem is actively maturing, and ECC ships a one-command install (`/plugin install ecc@ecc`) that drops directly into that surface — making it immediately usable as Claude Code adoption accelerates post-Anthropic's recent push on agentic tooling.

**Build with it:** Drop ECC's `CLAUDE.md` skills and AgentShield hooks into an existing Claude Code project to enforce security guardrails and persistent memory across sessions, or wrap it around a multi-agent pipeline using the `ecc-universal` npm package as a shared harness layer.

## 10. img2threejs/img2threejs

https://github.com/img2threejs/img2threejs · ★ 11697 (+1552 this week) · 3d, ai-agents, claude-code, computer-graphics, generative, image-to-3d, procedural-generation, threejs, typescript, webgl

**What it does:** img2threejs takes a reference image and rebuilds the depicted object as procedural Three.js code — using only primitives, shaders, and generated geometry — with a quality gate and animation hooks baked in, no mesh files or art assets involved.

**Why now:** The repo hit GitHub's weekly trending chart with +1,552 stars this week, surfacing alongside rising interest in Claude Code as an agentic coding tool, which this project explicitly uses as part of its reconstruction pipeline.

**Build with it:** Drop img2threejs into a content pipeline by pointing it at product photos or concept art and piping the emitted Three.js module directly into an existing scene's `scene.add()` call — the procedural output is animation-ready, so rigging idle or interaction animations requires no additional geometry work.
