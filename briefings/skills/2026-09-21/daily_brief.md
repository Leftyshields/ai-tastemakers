# Skill Tastemakers — Daily Brief — 2026-09-21

_Ranking: delta_7d · 10 repos · generated 2026-09-21T18:42:47.671Z_


## 1. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 264604 (+6348 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness configuration system that layers skills, memory, security (AgentShield), and research-first workflows onto Claude Code, Codex, Opencode, and Cursor via installable npm packages and a GitHub App.

**Why now:** The repo is trending this week with over 6,300 new stars, coinciding with active multi-language community expansion and a live GitHub Marketplace app install base.

**Build with it:** Install `ecc-universal` from npm and drop its configuration into an existing Claude Code project to immediately apply ECC's memory and instinct layers to your agent sessions.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 74532 (+5955 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE (Agent Development Environment) that runs Codex, Claude Code, OpenCode, or Pi side-by-side in isolated git worktrees, letting you fan one prompt across multiple agents and merge the best result.

**Why now:** A "Show HN: Open Source 'Conductor + Ghostty'" thread surfaced the project this week, driving early community attention at 74k+ stars.

**Build with it:** Point Orca at an existing repo, split one refactor prompt across three parallel worktrees, and use the built-in diff view to cherry-pick the winning output into your main branch.

## 3. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 143635 (+5406 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a skill/prompt layer for AI coding agents (Claude Code, Cursor, etc.) that enforces YAGNI discipline — steering the agent to reach for native browser APIs or built-ins before installing a library or writing wrapper code.

**Why now:** The repo hit Hacker News this week (98 points, 17 comments) alongside a published agentic benchmark showing ~54% mean code reduction across 12 real feature tasks against a fair baseline.

**Build with it:** Drop the ponytail skill into an existing Claude Code or Cursor session and run a feature task you know tends to over-build (a date picker, a modal, a form validator) to immediately see whether the agent reaches for a native solution first.

## 4. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 98074 (+3788 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** Agent Skills packages 25 slash-command-driven workflows (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`, and more) as installable rules that enforce senior-engineering practices inside AI coding agents.

**Why now:** The repo gained nearly 4,000 stars this week, signaling a rapid spike in adoption as teams standardize how agents like Claude Code, Cursor, and Codex handle the full dev lifecycle.

**Build with it:** Run `npx skills add addyosmani/agent-skills` to drop all 25 skills into your agent, then trigger `/build auto` to let it generate a plan, implement tasks test-first, and commit each slice without manual stepping between them.

## 5. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 120153 (+3469 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify turns any codebase—including docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph via a `/graphify` slash command in Claude Code, Cursor, Codex, or Gemini CLI, using local deterministic AST parsing with no vector store.

**Why now:** The repo is trending at 120K+ stars with a YC S26 badge and an open early-access period ahead of the public v1 launch, making this the practical window to ship integrations before API surfaces stabilize.

**Build with it:** Drop the `/graphify` skill into an existing Cursor or Claude Code workflow to replace `grep`-based code search with graph queries across your repo's AST edges.

## 6. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 22505 (+507 this week) · agent-skill, ai, anthropic, c2pa, chatgpt, claude, gemini, openai, provenance, synthid, watermark, watermark-detection, watermark-tools, watermarking, watermarks

**What it does:** `watermarks-remover` strips AI provenance marks from text and files across three layers — invisible Unicode/bidi characters (deterministic), statistical token-sampling watermarks (agent rewrite), and file-embedded metadata (C2PA/EXIF/XMP/doc props) — covering Claude, Gemini/SynthID-Text, OpenAI, and open-LLM Kirchenbauer/EXP schemes across 20+ file formats.

**Why now:** The project gained 507 stars this week, coinciding with growing scrutiny of SynthID-Text and C2PA provenance embedding as vendors quietly expand watermarking coverage in production models.

**Build with it:** Wire the `remove-ai-marks` skill into Claude Code via `python3 install_skill.py --skill remove-ai-marks --target claude-code`, then point `WATERMARKS_SERVICE_URL` at the local Python service to scrub agent-generated text before it ships in any downstream artifact.

## 7. Observal/Observal <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Observal/Observal · ★ 2860 (+500 this week) · agents, analytics, antigravity, claude-code, cli-tool, codex, cursor, cursor-ai, insights, kiro, large-language-models, mcp, open-source, pi, playground, registry, self-hosted, skills

**What it does:** Observal is a self-hosted registry and control plane for internal AI components—Skills, Agents, and MCP servers—with a built-in insight engine for tracking usage and sharing them across a team.

**Why now:** The repo gained 500 stars this week, coinciding with the surge in teams building coding-agent extensions for tools like Cursor, Claude Code, and Codex that need a central place to version and distribute those components.

**Build with it:** Install `observal-cli` from PyPI, point it at your existing MCP server, and use the registry to share that server with teammates instead of passing around config files manually.

## 8. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 84300 (+3231 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) read and search access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paid APIs or manual scraper setup.

**Why now:** The repo hit GitHub Trending #1 of the day this week with 84k+ stars and 3,200+ stars added in seven days, signaling a sharp spike in builder interest around MCP-based agent tooling.

**Build with it:** Drop Agent Reach in as an MCP server for Claude Code or Cursor, then prompt your agent to summarize YouTube transcripts or scrape Reddit threads directly inside your existing coding workflow.

## 9. JCodesMore/ai-website-cloner-template

https://github.com/JCodesMore/ai-website-cloner-template · ★ 34738 (+457 this week) · ai, ai-agents, ai-tools, automation, boilerplate, claude, claude-code, clone, developer-tools, nextjs, react, reverse-engineering, shadcn-ui, skills, tailwindcss, template, typescript, web-scraping, website-clone

**What it does:** A Next.js template that accepts a URL via `/clone-website` slash command and uses an AI coding agent to regenerate the target site as a local TypeScript/Tailwind/shadcn-ui app.

**Why now:** The repo gained 457 stars this week and sits in Trendshift's trending list, coinciding with widening access to Claude Opus 4/5-class models that make single-pass UI reconstruction viable.

**Build with it:** Point Claude Code at a competitor's landing page using `/clone-website <url>`, then swap in your own copy and branding to ship a fast prototype without starting from a blank canvas.

## 10. jlcodes99/cockpit-tools

https://github.com/jlcodes99/cockpit-tools · ★ 18099 (+453 this week) · account-manager, ai, antigravity, codebuddy, codex, cursor, github-copilot, kiro, windsurf

**What it does:** Cockpit Tools is a Rust-built desktop account manager for AI IDEs (Cursor, Windsurf, GitHub Copilot, Codex, Kiro, and a dozen more) that handles one-click account switching, quota monitoring, wake-up scheduling, and parallel multi-instance launches from a single dashboard.

**Why now:** The repo gained 453 stars this week alongside freshly added support for Kiro (Amazon's new AI IDE) and Grok CLI, making it one of the first tools to consolidate management across that expanding roster of competing editors.

**Build with it:** Wire Cockpit's local Codex API sidecar (CLIProxyAPI) into your existing OpenAI-compatible toolchain by pointing your Base URL and API Key at the local endpoint — rotating across multiple Codex accounts without changing any client code.
