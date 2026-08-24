# Skill Tastemakers — Daily Brief — 2026-08-24

_Ranking: delta_7d · 10 repos · generated 2026-08-24T14:03:04.552Z_


## 1. stablyai/orca

https://github.com/stablyai/orca · ★ 52535 (+5419 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE that runs Codex, Claude Code, OpenCode, or Pi agents in parallel git worktrees, letting you fan one prompt across multiple agents and merge the winning result.

**Why now:** A Show HN thread this week surfaced Orca as an open-source alternative combining conductor-style orchestration with Ghostty-class terminal rendering, drawing early community attention.

**Build with it:** Point Orca at an existing repo, spin up three parallel worktrees with the same refactor prompt, and use the built-in diff view to pick the cleanest output before merging.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 109441 (+4905 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an AI agent skill that instructs your coding agent to prefer the smallest possible solution — native APIs, zero new dependencies, and deleted code over written code.

**Why now:** The project hit Hacker News this week (98 points, 17 comments) alongside a new agentic benchmark showing a fair, reproducible comparison against a no-skill Claude Code baseline across 12 real feature tasks.

**Build with it:** Drop the ponytail skill into your Claude Code or Cursor config and run it against one feature ticket to measure your own `git diff` reduction against the baseline.

## 3. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 17751 (+4872 this week) · agent-skill, ai, anthropic, c2pa, chatgpt, claude, gemini, openai, provenance, synthid, watermark, watermark-detection, watermark-tools, watermarking, watermarks

**What it does:** `watermarks-remover` is a Python service + agent skill that strips multi-vendor AI provenance marks — invisible Unicode, statistical token-sampling watermarks, and C2PA/EXIF/XMP metadata — from text and files across formats including PNG, PDF, DOCX, MP4, and Markdown.

**Why now:** The project hit Hacker News this week alongside a v0.5.0 release that expanded vendor coverage to Claude, Gemini/SynthID-Text, OpenAI, and open-LLM Kirchenbauer/Gumbel schemes.

**Build with it:** Install the `remove-ai-marks` skill into Claude Code via `python3 install_skill.py --skill remove-ai-marks --target claude-code`, point `WATERMARKS_SERVICE_URL` at a local instance, and add watermark stripping as a pre-publish step in any content pipeline.

## 4. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 54216 (+4643 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted AI gateway that exposes a single OpenAI-compatible endpoint across 350 providers (90+ free tiers), with quota-aware auto-fallback and RTK+Caveman compression that cuts token usage 15–95%.

**Why now:** The repo crossed 54,000 stars this week with 4,643 added in seven days, signaling a sharp spike in developer discovery that makes this a live conversation in builder communities right now.

**Build with it:** Point Claude Code or Cursor at OmniRoute's local endpoint via their OpenAI-base-URL config field and immediately get free-tier rotation across Gemini, DeepSeek, and Kimi without changing any other tooling.

## 5. freestylefly/awesome-gpt-image-2

https://github.com/freestylefly/awesome-gpt-image-2 · ★ 14985 (+3990 this week) · agents, ai-image-generation, chatgpt, dsh-plugin, gpt-image-2, image-prompts, prompt-as-code, prompt-engineering, skills, workflow-automation

**What it does:** A curated library of 530+ reverse-engineered GPT-Image-2 prompts organized into 20+ industrial templates, with a live gallery at gpt-image2.canghe.ai for browsing, copying, and testing prompts after Google sign-in.

**Why now:** The repo gained ~3,990 stars this week, signaling a surge of builder interest that makes this a high-signal moment to benchmark prompt patterns before the community moves on.

**Build with it:** Drop a template prompt from the library into APIMart's async API (`$0.006/image`) to batch-generate variations without writing prompt logic from scratch.

## 6. santifer/career-ops

https://github.com/santifer/career-ops · ★ 68091 (+3813 this week) · ai, ai-agent, anthropic, ats, automation, beginner-friendly, career, careerops, claude, claude-code, cli, first-timers-only, golang, good-first-issue, interview-prep, job-application, job-hunting, job-search, open-source, resume

**What it does:** career-ops is an open-source multi-agent system that scans job portals, scores each listing A–H with a 1–5 global rating, tailors your CV per role, and tracks applications — all running locally inside your AI coding CLI.

**Why now:** Business Insider and WIRED both covered it this week, surfacing the author's account of using it to evaluate 740+ listings and land a Head of AI role.

**Build with it:** Point it at a target job portal via your Claude Code session and let the evaluation pipeline generate a structured A–H report against your own CV to find your highest-signal applications first.

## 7. Leonxlnx/unlazy <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Leonxlnx/unlazy · ★ 2146 (+1879 this week) · ai-agents, claude, claude-code, llm, productivity, prompt-engineering, skill

**What it does:** unlazy is a Node.js skill for AI agents that enforces completion discipline by requiring a runnable acceptance ledger (GATES.md) with shell-verified gates before any work is reported as done.

**Why now:** The repo gained 1,879 stars this week, signaling a surge of developer interest likely tied to growing frustration with AI agents that hallucinate completion — a pattern the 2025–2026 research this tool explicitly cites.

**Build with it:** Drop `templates/gates-leaf.md` into your next Claude Code task as `GATES.md`, wire your test command into a `CHECK:` line, and run `node scripts/gate-check.mjs --approve GATES.md` to make the agent prove its output before it reports done.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 235504 (+3675 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving AI agent that builds skills from experience, stores and searches past conversations, and runs across terminals, messaging platforms, and cloud backends using any OpenAI-compatible model endpoint.

**Why now:** The repo crossed 235,000 stars with 3,675 added this week, signaling a sharp spike in builder attention worth riding while onboarding friction is low.

**Build with it:** Point `hermes model` at your own OpenRouter or Nous Portal endpoint and test the skill-creation loop by running a multi-step coding task — then inspect what reusable skills the agent writes back to itself.

## 9. can1357/oh-my-pi

https://github.com/can1357/oh-my-pi · ★ 27048 (+1662 this week) · ai-agent, ai-coding-agent, anthropic, bun, claude, cli, coding-assistant, llm, mcp, multi-provider, openai, rust, terminal, tui, typescript

**What it does:** oh-my-pi (`omp`) is a terminal coding agent that embeds a full IDE surface — 31 built-in tools, 14 LSP ops, 28 DAP ops, and 60+ model providers — into a single CLI backed by an ~80k-line Rust core.

**Why now:** The repo gained 1,662 stars this week and PR access was just opened to everyone without a vouch, making it an active contribution window rather than a read-only project.

**Build with it:** Install via `bun install -g @oh-my-pi/pi-coding-agent`, wire in your preferred model with `--model`, and drop it into a CI step to run DAP-backed debugging on failing test suites without leaving the terminal.

## 10. MadsLorentzen/ai-job-search

https://github.com/MadsLorentzen/ai-job-search · ★ 33546 (+1500 this week) · ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume

**What it does:** A Claude Code workflow that scrapes job portals, scores posting fit against your profile, then runs a drafter-reviewer pipeline to produce tailored LaTeX CVs and cover letters.

**Why now:** The repo gained ~1,500 stars this week, driven by the author's verified account of 69 tailored applications, 20 first interviews, and a signed AI engineer contract — a concrete funnel benchmark rarely attached to job-search tools.

**Build with it:** Fork the repo, drop your profile into the profile files, and run `/apply <url>` on a live job posting to test the fit-score and cover letter output against your own career history.
