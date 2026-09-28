# Skill Tastemakers — Daily Brief — 2026-09-28

_Ranking: delta_7d · 10 repos · generated 2026-09-28T20:08:21.481Z_


## 1. stablyai/orca

https://github.com/stablyai/orca · ★ 80592 (+6060 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile agent orchestration environment that runs Codex, Claude Code, OpenCode, or Pi side-by-side, each in an isolated git worktree, with a mobile companion for remote monitoring and steering.

**Why now:** The project hit Hacker News this week framed as an open-source "Conductor + Ghostty" combo, drawing early community attention to its parallel-agent workflow.

**Build with it:** Fan a single feature prompt across three agents in parallel worktrees, compare diffs, and merge the winning branch — validating whether multi-agent parallelism actually cuts your iteration time on real tasks.

## 2. tigerless-labs/autoharness

https://github.com/tigerless-labs/autoharness · ★ 5258 (+840 this week) · agent-skills, claude-code, claude-code-plugin, llm-agents, python

**What it does:** AutoHarness is a Claude Code plugin that distills reusable skills from your live coding sessions, merges near-duplicate scenarios instead of stacking them, and prunes skills that fall out of use — all written to `.claude/skills/` with zero manual curation.

**Why now:** The project hit 5,258 stars with 840 added this week, coinciding with a fresh Show HN submission, signaling a rapid spike in builder attention around Claude Code's plugin ecosystem.

**Build with it:** Install via `/plugin marketplace add tigerless-labs/autoharness` and `/plugin install autoharness@autoharness`, then run `/learn` after solving a tricky problem in your repo to immediately validate whether the skill-distillation loop captures your team's workflow patterns.

## 3. dimthink/PriceAI <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/dimthink/PriceAI · ★ 3474 (+784 this week) · ai, ai-subscription, chatgpt, claude, gemini, grok, nextjs, price-comparison, price-tracker, supabase

**What it does:** PriceAI aggregates 200+ Chinese AI subscription card shops (卡网) and API relay stations, letting users compare prices, stock, and risk across ChatGPT Plus, Claude Pro, Gemini, and similar services alongside official regional pricing and API relay multipliers.

**Why now:** The repo gained 784 stars this week, signaling a surge of interest likely tied to ongoing pricing volatility across major AI subscriptions as providers adjust regional and tier pricing mid-2025.

**Build with it:** Fork the Next.js + Supabase codebase and add a new channel entry to the card-shop comparison table to validate whether your own relay API or reseller listing surfaces competitively against existing indexed vendors.

## 4. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 268891 (+4287 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness layer that adds skills, memory, security (AgentShield), and research-first workflows on top of coding agents like Claude Code, Codex, Cursor, and Opencode.

**Why now:** The repo is trending on GitHub this week with over 4,000 new stars, coinciding with rapid adoption of Claude Code as a primary agentic dev tool across the builder community.

**Build with it:** Drop the `ecc-universal` npm package into an existing Claude Code setup to layer persistent memory and instinct-style behavioral configs onto your agent without rewriting your workflow.

## 5. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 138104 (+4144 this week) · ai-tools, claude-code, codex, desktop-app, grok, grokbuild, hermes, hermes-agent, mcp, open-source, openclaw, openclaw-ui, opencode, pi, provider-management, rust, skills, skills-management, tauri, wsl-support

**What it does:** CC Switch is a cross-platform Tauri desktop app that lets developers switch API providers (Claude, Codex, Gemini, Grok, and others) and manage MCP servers, Skills, and Prompts through a GUI instead of hand-editing JSON/TOML/YAML config files.

**Why now:** The repo is pulling 4,144 stars this week, coinciding with the newly added support for Kimi K3 (Moonshot AI's 2.8T-parameter open model) as a switchable provider target.

**Build with it:** Point CC Switch at your existing Claude Code config to swap in a Kimi or Gemini endpoint and validate that your MCP server definitions survive the provider switch without touching a config file manually.

## 6. Ryze-AI-Adgent/open-seo-mcp-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Ryze-AI-Adgent/open-seo-mcp-skills · ★ 2672 (+619 this week) · ai-seo, ai-visibility, backlinks, claude, claude-code, claude-skills, dataforseo, generative-engine-optimization, geo, geo-mcp, keyword-research, llm-seo, mcp, mcp-server, open-source-seo, rank-tracking, seo, seo-audit, seo-mcp, seo-mcp-server

**What it does:** Open-source Claude skills (MIT) that run SEO workflows—audit, rank tracking, keyword research, competitor gap, backlink check, AI visibility—against your real Google Search Console, GA4, and Google Ads data via the Ryze MCP connector, with DataForSEO handling competitor and SERP data at no markup.

**Why now:** The repo gained 619 stars this week, coinciding with rising builder interest in MCP-connected SEO tooling as an alternative to Semrush/Ahrefs subscriptions.

**Build with it:** Run `claude mcp add ryze --transport http https://connector.get-ryze.ai/mcp` and `claude plugin marketplace add Ryze-AI-Adgent/open-seo-mcp-skills`, then prompt Claude with *"run an SEO audit on mysite.com"* to validate the GSC + GA4 data pipeline against your own property.

## 7. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 147470 (+3835 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a skill/prompt layer for AI coding agents (Claude Code, Cursor, and 20 others) that enforces a "laziest senior dev" heuristic — preferring native browser APIs and existing primitives over installing libraries, cutting a measured ~54% of generated code on average.

**Why now:** The repo gained 3,835 stars this week and hit Trendshift's daily and weekly trending charts, signaling a rapid spike in builder attention around token-cost and over-engineering complaints in agentic coding workflows.

**Build with it:** Drop the ponytail skill config into your Claude Code project to immediately gate your next feature task against unnecessary dependency installs and wrapper components.

## 8. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 68544 (+567 this week) · ai, ai-agents, ai-prompts, anthropic, chatbot, chatgpt, claude, claude-code, codex, cursor, gemini, generative-ai, google, grok, llm, openai, prompt, prompt-engineering, system-prompt, system-prompts

**What it does:** A curated collection of verbatim system prompts extracted from major AI products — Claude Fable 5.1/Opus 5.5, GPT-6 Codex variants, Gemini 3.8 Flash, and Grok 4.7 — updated as new model versions ship.

**Why now:** The Washington Post built an interactive story directly from this repo's prompts (May 2026), and CEPS' AI World built a live dashboard from its files (July 2026), signaling the collection has reached reference-source status for editorial and research use.

**Build with it:** Pull the raw `.md` prompt files for competing models into a side-by-side diff to reverse-engineer constraint patterns — persona framing, refusal language, tool-call formatting — before writing your own production system prompt.

## 9. alirezarezvani/claude-skills

https://github.com/alirezarezvani/claude-skills · ★ 26759 (+549 this week) · agent-plugins, agent-skills, agentic-ai, ai-coding-agent, anthropic-claude, claude-ai, claude-code, claude-code-plugins, claude-code-skills, claude-skills, codex-skills, coding-agent-plugins, cursor-skills, developer-tools, gemini-cli-skills, openai-codex, openclaw, openclaw-plugins, openclaw-skills, prompt-engineering

**What it does:** A library of 388 modular SKILL.md instruction packages for AI coding agents—covering engineering, DevOps, security, compliance, and C-level advisory—that work natively across Claude Code, Gemini CLI, Cursor, Aider, and nine other platforms via a shared agentskills.io standard.

**Why now:** The repo gained 549 stars this week, signaling active adoption momentum as Claude Code's plugin ecosystem matures and builders look for reusable skill primitives beyond raw prompts.

**Build with it:** Drop a domain-specific SKILL.md (e.g., the PreToolUse security hooks skill) into your Claude Code project's `.claude/` config directory to add structured, auditable security guardrails to any agentic coding workflow.

## 10. Donchitos/Claude-Code-Game-Studios

https://github.com/Donchitos/Claude-Code-Game-Studios · ★ 25505 (+3584 this week) · ai-agents, ai-assisted-development, anthropic, claude, claude-code, game-design, game-development, gamedev, godot, indie-game-dev, unity, unreal-engine

**What it does:** Claude Code Game Studios is a `.claude/` configuration layer — 49 subagents, 74 slash commands, 12 hooks, and 13 rules — that imposes a real studio hierarchy (directors, department leads, specialists) onto a Claude Code session for solo game development.

**Why now:** The repo gained 3,584 stars this week, coinciding with a surge in developer interest in Claude Code's subagent and hooks infrastructure as a structured automation surface beyond simple chat.

**Build with it:** Clone the repo into your existing Godot or Unity project, then run `/start` to trigger the creative-director and producer agents and generate a structured GDD before writing a single line of game code.
