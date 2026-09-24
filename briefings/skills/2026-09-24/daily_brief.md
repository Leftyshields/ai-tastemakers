# Skill Tastemakers — Daily Brief — 2026-09-24

_Ranking: delta_7d · 10 repos · generated 2026-09-24T17:53:02.882Z_


## 1. stablyai/orca

https://github.com/stablyai/orca · ★ 77364 (+6417 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE that runs Codex, Claude Code, OpenCode, or Pi as parallel agents, each isolated in its own git worktree, with a unified UI for monitoring and merging results.

**Why now:** The repo hit the Show HN front page this week and is gaining ~6,400 stars in seven days, signaling a spike in builder attention around parallel-agent workflows.

**Build with it:** Fan a single prompt across three git worktrees using Orca's parallel worktree split, compare the diffs, and merge the winning branch — validating whether multi-agent parallelism cuts your iteration time.

## 2. Imbad0202/academic-research-skills

https://github.com/Imbad0202/academic-research-skills · ★ 49385 (+873 this week) · academic-pipeline, academic-writing, ai-research, claude, claude-code, literature-review, peer-review, prompt-engineering

**What it does:** Academic Research Skills is a Claude Code plugin suite that covers the full research-to-publication pipeline — literature review, citation verification, logical consistency checks, and style calibration — while keeping the researcher in control via blocking integrity gates at key stages.

**Why now:** The project hit Hacker News this week (82 points, 25 comments), surfacing community interest alongside v3.22.1 shipping shortly after v3.8's opt-in claim-audit pass (`ARS_CLAIM_AUDIT=1`) that checks cited sources against locator anchors to flag hallucinated citations.

**Build with it:** Install via `/plugin marketplace add Imbad0202/academic-research-skills` in Claude Code and run `/ars-plan` to wire Socratic paper-structure dialogue directly into your writing workflow.

## 3. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 266668 (+5584 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness optimization layer that adds skills, memory, instincts, and security (via `ecc-agentshield`) to AI coding agents like Claude Code, Codex, Cursor, and Opencode.

**Why now:** The repo is trending this week with over 5,500 stars gained, coinciding with rapid adoption of Claude Code and Opencode as primary agentic dev environments where harness-level configuration is an active gap.

**Build with it:** Install `ecc-universal` via npm and drop the resulting config into your Claude Code project to immediately apply ECC's pre-built instincts and memory scaffolding to your existing agent workflow.

## 4. LearnPrompt/awesome-seedance <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/LearnPrompt/awesome-seedance · ★ 1354 (+641 this week) · agent-skill, ai-video, ai-video-generation, awesome, awesome-list, bytedance, claude-code, codex, goodcase, minimax, prompt-engineering, prompt-library, prompt-templates, prompts, seedance, seedance-2-0, seedance-2-5, text-to-video, video-generation

**What it does:** Curated prompt library for Seedance 2.5/2.0 video generation — 497 verified cases traced to original posts, 264 cross-model retest runs, 25 fill-in-the-bracket templates, and 60 agent skills installable via npm.

**Why now:** Seedance 2.5 is attracting active builder attention this week (641 stars added), making a tested, cross-model prompt corpus more useful than trial-and-error from scratch.

**Build with it:** Install the `seedance-prompt-library` npm package to wire the 60 pre-built AI-video Skills directly into a Claude Code or Codex agent workflow.

## 5. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 145430 (+4222 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a skill/prompt layer for AI coding agents (Claude Code, Cursor, etc.) that enforces YAGNI by steering the agent to reach for native browser or platform primitives before installing dependencies or writing wrapper code.

**Why now:** The repo is trending on Trendshift daily and weekly with 145K+ stars and +4,222 this week, driven by its freshly published agentic benchmark showing ~54% mean token reduction across 12 real FastAPI + React tasks against a fair baseline.

**Build with it:** Drop the ponytail skill into an existing Claude Code session and run one of the 12 benchmark feature tasks yourself to measure token and cost delta against your own codebase.

## 6. MadsLorentzen/ai-job-search

https://github.com/MadsLorentzen/ai-job-search · ★ 43831 (+607 this week) · ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume

**What it does:** A Claude Code–powered CLI framework that scrapes job portals, scores posting fit against your profile, then runs a drafter-reviewer pipeline to produce tailored LaTeX CVs and cover letters.

**Why now:** The repo is trending on Trendshift with 43 k+ stars and 607 added this week, fueled by the author's documented case of 69 applications → 20 interviews → 1 signed offer using the exact workflow in the repo.

**Build with it:** Fork the repo, drop your profile into the provided profile files, and swap the hardcoded Danish job-board URLs in `/scrape` for your local portals to run the full `/scrape` → `/apply` → `/interview` loop against your own market.

## 7. Donchitos/Claude-Code-Game-Studios

https://github.com/Donchitos/Claude-Code-Game-Studios · ★ 25413 (+3492 this week) · ai-agents, ai-assisted-development, anthropic, claude, claude-code, game-design, game-development, gamedev, godot, indie-game-dev, unity, unreal-engine

**What it does:** Claude Code Game Studios structures a single Claude Code session into a 49-agent hierarchy — directors, department leads, and specialists across design, programming, art, QA, and production — enforced by 74 slash commands, 12 automated hooks, and 13 path-scoped coding rules.

**Why now:** The repo gained 3,492 stars this week, coinciding with growing builder experimentation around Claude's subagent and multi-agent capabilities following Anthropic's recent Claude Code expansions.

**Build with it:** Drop the `.claude/` directory into an existing Godot or Unity project and run `/start` to immediately route your session through the studio's vision-guarding creative-director agent before writing a single line of code.

## 8. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 136419 (+3044 this week) · ai-tools, claude-code, codex, desktop-app, grok, grokbuild, hermes, hermes-agent, mcp, open-source, openclaw, openclaw-ui, opencode, pi, provider-management, rust, skills, skills-management, tauri, wsl-support

**What it does:** CC Switch is a cross-platform Tauri desktop app that centralizes API provider configuration and switching across nine AI coding tools including Claude Code, Codex, Gemini CLI, and Grok Build.

**Why now:** The repo is trending at 136K stars with 3,044 added this week, coinciding with the recent addition of Kimi K3 (a 2.8T-parameter open model) as a supported provider.

**Build with it:** Point CC Switch at your existing Claude Code config directory to swap API endpoints between providers like ZetaAPI or PackyCode without touching config files manually.

## 9. iOfficeAI/OfficeCLI

https://github.com/iOfficeAI/OfficeCLI · ★ 31195 (+432 this week) · agent, ai, claude-code, cli, codex, docx, excel, office, openclaw, pptx, presentation, skills, word, xlsx

**What it does:** OfficeCLI is a single binary (no Office installation required) that lets AI agents read, create, and edit `.docx`, `.xlsx`, and `.pptx` files, with a built-in HTML/PNG rendering engine so agents can visually inspect their own output.

**Why now:** The repo crossed 31,000 stars with 432 added this week, signaling a rapid surge in adoption likely tied to the current wave of agentic coding tools like Claude Code and Codex.

**Build with it:** Run `officecli install` to auto-inject the OfficeCLI skill into Claude Code or Cursor, then prompt your agent directly to generate and iterate on a `.pptx` or `.xlsx` file without writing any Office automation code yourself.

## 10. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 98842 (+2856 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** Agent Skills packages 25 slash-command-driven workflows (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`, and more) that enforce senior-engineer practices — TDD, atomic commits, five-axis code review — inside AI coding agents like Claude Code, Cursor, and Codex.

**Why now:** The repo gained nearly 3,000 stars this week, signaling a sharp spike in builder interest around structured agent workflows at a moment when autonomous coding agents are moving from demos to daily use.

**Build with it:** Run `npx skills add addyosmani/agent-skills --skill test-driven-development` to drop the red-green-refactor enforcement skill directly into your existing agent setup and validate whether codified TDD gates actually change your agent's output quality.
