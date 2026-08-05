# Skill Tastemakers — Daily Brief — 2026-08-05

_Ranking: delta_7d · 10 repos · generated 2026-08-05T15:27:46.139Z_


## 1. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 40425 (+6606 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that proxies 290+ AI providers through a single OpenAI-compatible endpoint, with quota-aware auto-fallback across 90+ free tiers and RTK+Caveman prompt compression that cuts token usage by 15–95%.

**Why now:** The repo gained 6,606 stars this week, coinciding with active community growth across Discord/Telegram and a re-audited free-tier catalog that now tracks ~1.53B free tokens/month across 43 provider pools including newly surfaced Kimi and GLM-Flash no-cap tiers.

**Build with it:** Point Claude Code, Cursor, or Cline at the single endpoint by swapping the `OPENAI_BASE_URL` config to your OmniRoute instance — you get automatic failover across DeepSeek, Gemini, and GPT-4o mini free tiers without changing any other tooling.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 37976 (+5496 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source ADE (Agent Development Environment) that runs multiple coding agents — Codex, Claude Code, OpenCode, or Pi — in parallel git worktrees, with a unified desktop/mobile UI and Ghostty-class terminal splits.

**Why now:** The project surfaced on Hacker News this week as a "Show HN: Open Source 'Conductor + Ghostty'" and crossed 37,976 stars with +5,496 in a single week, signaling a breakout moment driven by the parallel-agents workflow hitting a practical threshold.

**Build with it:** Wire your existing Claude Code or Codex subscription into Orca's worktree config, fan a single prompt across five isolated branches, then use the Design Mode browser integration to pipe live HTML/CSS diffs directly into each agent's context for UI-heavy tasks.

## 3. iOfficeAI/OfficeCLI

https://github.com/iOfficeAI/OfficeCLI · ★ 25751 (+2661 this week) · agent, ai, claude-code, cli, codex, docx, excel, office, openclaw, pptx, presentation, skills, word, xlsx

**What it does:** OfficeCLI is a single-binary CLI tool that lets AI agents read, write, and render Word, Excel, and PowerPoint files without any Office installation, using a built-in HTML/PNG rendering engine to close the render→inspect→fix loop.

**Why now:** It hit Hacker News this week with 215 points and 62 comments, surfacing active builder interest in the agent-native Office automation gap that existing libraries like python-docx or openpyxl don't close end-to-end.

**Build with it:** Drop the SKILL.md into a Claude Code or Cursor project via `curl -fsSL https://officecli.ai/SKILL.md`, and your agent can generate, diff, and re-render `.pptx`/`.xlsx`/`.docx` files as part of a code-generation or report-automation workflow without any manual templating step.

## 4. AgriciDaniel/claude-obsidian

https://github.com/AgriciDaniel/claude-obsidian · ★ 10428 (+2505 this week) · agent-skills, ai-note-taking, ai-second-brain, claude-code, claude-code-skill, claude-memory, claude-plugin, karpathy-llm-wiki, knowledge-graph, knowledge-management, note-taking, notion-alternative, obsidian, obsidian-ai, obsidian-plugin, obsidian-second-brain, open-source, personal-knowledge-management, pkm, second-brain

**What it does:** claude-obsidian is a Python skill layer for Claude Code that ingests any source file into a local Obsidian vault, generates linked Markdown notes with source citations and claim ledgers, and maintains a queryable knowledge graph you own as plain files.

**Why now:** The project gained 2,500+ stars this week, likely driven by Karpathy's recent amplification of the LLM Wiki pattern — the idea that an LLM should maintain a persistent, self-updating knowledge base rather than answer from scratch each session.

**Build with it:** Drop the skills into a Claude Code plugin config, point `VAULT_PATH` at an existing Obsidian directory, and wire the `ingest` skill into a local watch folder so any PDF or URL you save auto-processes into cited, cross-linked notes without leaving your filesystem.

## 5. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 96474 (+5005 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a Claude Code / cursor-rules plugin that injects a "laziest senior dev" heuristic into AI agents, steering them toward minimal diffs — replacing a custom date picker with `<input type="date">` rather than installing flatpickr.

**Why now:** The project is trending this week (ranked on Trendshift daily and weekly), coinciding with growing practitioner frustration that agentic coding tools over-build by default — making a YAGNI-enforcement layer newly practical rather than theoretical.

**Build with it:** Drop the skill into an existing Claude Code session via `@dietrichgebert/ponytail` on npm, or paste the cursor-rules config into `.cursor/rules`, then measure the before/after `git diff` on any feature ticket to see LOC reduction without touching your safety guards.

## 6. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 102888 (+4672 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus its docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using tree-sitter AST locally, exposing it as a `/graphify` skill inside Claude Code, Cursor, Codex, and Gemini CLI via MCP.

**Why now:** The project is trending at +4,672 stars this week, coinciding with the rapid adoption of agentic coding assistants (Claude Code, Gemini CLI) where context retrieval over large codebases is an active, unsolved pain point for teams moving beyond single-file edits.

**Build with it:** Wire the MCP server into your Claude Code or Cursor config, then query cross-file call graphs and schema dependencies directly from the assistant prompt—replacing ad-hoc grep workflows with structured graph traversal over your own codebase.

## 7. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 66835 (+4567 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents free, scrape-ready access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu — handling anti-bot workarounds, login walls, and HTML cleanup so agents get clean structured output instead of raw markup.

**Why now:** The repo hit GitHub's #1 trending spot this week with 4,567 stars added, coinciding with a surge in MCP-based agent tooling where web-access gaps are a common friction point developers are actively trying to solve.

**Build with it:** Drop it into a Claude Code or Cursor workflow via its MCP server config — point your agent at the install URL (`raw.githubusercontent.com/.../install.md`) and it self-configures, after which you can pipe Reddit threads or YouTube transcripts directly into a summarization or RAG pipeline without writing any scraper code.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 225901 (+3725 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is a self-improving Python agent from Nous Research that creates and refines skills from experience, maintains cross-session memory, and runs tool-use workloads across seven execution backends including Modal and Daytona serverless environments.

**Why now:** The project crossed 225K stars with 3,725 added this week, coinciding with growing builder interest in agents that persist state and self-modify without requiring a local machine — a direct response to the operational gaps exposed by Claude Code and Codex workflows.

**Build with it:** Point it at your own model endpoint via `hermes model` and wire the Telegram gateway to a $5 VPS, then use the cron scheduler to run nightly audit scripts that deliver results to any connected platform — no laptop required.

## 9. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 72389 (+3501 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a collection of portable agent skills (markdown/config files) that inject layout, typography, motion, and spacing rules into AI coding agents like Codex, Cursor, and Claude Code to prevent generic-looking UI output.

**Why now:** The repo is trending this week with 3,500+ stars gained, coinciding with widespread Claude Code and Codex CLI adoption where vibe-coded frontends have become a visible pain point in developer discourse.

**Build with it:** Drop the skill files into your `.cursor/rules` or Claude Code project config, then use the bundled image-generation skills to produce reference boards via ChatGPT Images and feed those frames directly into your agent as visual targets before it writes component code.

## 10. blader/humanizer <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/blader/humanizer · ★ 33672 (+1718 this week) · agent-skills, ai-writing, claude-code, codex, cursor, prompt-engineering, writing-tools

**What it does:** Humanizer is a portable Markdown-based agent skill that rewrites AI-generated text by detecting 33 specific patterns (significance inflation, vague attributions, promotional language, etc.) and stripping them out, with an optional voice-calibration pass against your own writing samples.

**Why now:** The project pulled 1,718 stars this week, tracking directly with Wikipedia's newly prominent "Signs of AI writing" cleanup guide going mainstream as a reference — the skill is explicitly built on that guide, giving it a concrete editorial grounding that's suddenly broadly cited.

**Build with it:** Drop `SKILL.md` into your existing Claude Code, Cursor, or Codex skill directory, then wire it into a docs pipeline with `npx skills add blader/humanizer --global` so any agent session can run `/humanizer` against draft files like `docs/launch-post.md` before publish.
