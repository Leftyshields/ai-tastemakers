# Skill Tastemakers — Daily Brief — 2026-09-22

_Ranking: delta_7d · 10 repos · generated 2026-09-22T17:39:43.249Z_


## 1. herdrdev/herdr

https://github.com/herdrdev/herdr · ★ 40206 (+1739 this week) · agent, agent-orchestration, ai, ai-agents, claude-code, cli, codex, coding-agents, developer-tools, devtools, multiplexer, rust, terminal, terminal-multiplexer, terminal-ui, tmux, tui, workspace-manager

**What it does:** herdr is a Rust terminal multiplexer built for coding agents — it keeps agent sessions alive across SSH drops, marks each pane as working/blocked/idle, and exposes a CLI and socket API so agents can spawn panes, prompt each other, and wait on blocked peers.

**Why now:** A community discussion this week pushed for multi-remote-server support, signaling active adoption of herdr as shared infrastructure across teams running distributed agent fleets.

**Build with it:** Wire an existing Claude Code or Codex workflow into herdr using the agent skill CLI so agents can programmatically spawn and query pane states without manual terminal babysitting.

## 2. K-Dense-AI/scientific-agent-skills

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 46110 (+1202 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** Scientific Agent Skills is a Python library of 166 validated research skills covering genomics, drug discovery, cheminformatics, and 100+ scientific databases, installable as an Agent Skills–standard plugin for any compatible AI agent including Cursor, Claude Code, and Codex.

**Why now:** The project just crossed 46,000 GitHub stars with 1,200 added this week, coinciding with a renamed rebranding from "Claude Scientific Skills" to "Scientific Agent Skills" that broadens compatibility beyond Claude to any Agent Skills–standard runtime.

**Build with it:** Drop the skills package into a Cursor or Claude Code project via the Agent Skills config, then invoke skills like AlphaGenome Atlas variant-effect queries or live pathogen-variant surveillance directly from your agent's tool-use loop.

## 3. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 265226 (+6970 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness optimization layer that adds skills, memory, security, and research-first workflows to AI coding agents like Claude Code, Codex, Cursor, and Opencode.

**Why now:** The repo is trending this week with nearly 7,000 new stars, coinciding with rapid adoption of Claude Code as a primary agentic coding environment.

**Build with it:** Install the `ecc-universal` npm package and drop it into an existing Claude Code project to immediately layer in its memory and security primitives.

## 4. stablyai/orca

https://github.com/stablyai/orca · ★ 75409 (+6832 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile AI orchestration environment that runs Codex, Claude Code, OpenCode, or Pi side-by-side in isolated git worktrees, letting you fan one prompt across multiple agents and merge the best result.

**Why now:** The repo surged 6,832 stars this week, coinciding with growing builder interest in parallel agent workflows as Codex and Claude Code have both shipped recent updates that make multi-agent comparison genuinely useful.

**Build with it:** Point Orca at an existing repo, split a single prompt across three worktrees using different agents, then diff the branches to validate which agent produces the cleanest implementation before merging.

## 5. coreyhaines31/marketingskills

https://github.com/coreyhaines31/marketingskills · ★ 51199 (+992 this week) · claude, codex, marketing

**What it does:** A collection of markdown skill files that give AI coding agents (Claude Code, Cursor, Codex, Windsurf) specialized workflows for marketing tasks — CRO, SEO, copywriting, paid ads, and growth engineering — anchored by a `product-marketing` skill that every other skill reads first for context.

**Why now:** The repo crossed 51k stars with ~1k added this week, signaling a rapid surge in developers wiring marketing workflows directly into agent-native tooling rather than SaaS dashboards.

**Build with it:** Drop the `cro` skill file into your Claude Code project and point it at a landing page to get structured conversion audit workflows without writing any prompt boilerplate yourself.

## 6. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 144283 (+6054 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent skill (compatible with Claude Code, Cursor rules, and 20 other agents) that steers AI coding agents toward minimal, YAGNI-compliant output — measurably cutting generated code by ~54% on average and up to 94% on over-built features.

**Why now:** The repo gained 6,054 stars this week and is trending on Trendshift daily and weekly charts, signaling a sharp spike in developer interest around constraining AI agent verbosity.

**Build with it:** Drop the skill into an existing Claude Code project via the npm package `@dietrichgebert/ponytail` and immediately benchmark whether your agent's next feature branch produces fewer files and dependencies.

## 7. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 98394 (+4108 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** Agent Skills packages 25 slash-command-driven workflows (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`, etc.) that encode senior-engineer practices — TDD, incremental commits, quality gates — into a form AI coding agents follow consistently across every dev phase.

**Why now:** The repo gained 4,108 stars this week, signaling a surge in builder attention likely tied to growing Claude Code and Cursor adoption where consistent agent behavior across multi-step tasks is an active pain point.

**Build with it:** Run `npx skills add addyosmani/agent-skills` in a Claude Code or Cursor project to install all 25 skills, then trigger `/build auto` to let the agent plan and implement a feature end-to-end with per-task commits and test-driven verification, pausing only on failures.

## 8. Asymptote-Labs/agent-beacon <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Asymptote-Labs/agent-beacon · ★ 1053 (+607 this week) · agent-ai-cli, agent-harnesses, agent-security, browser-extension, ci, claude-code, cloud, codex, cursor, detection-engineering, jev, knowledge-base, memory, mobile-device-management, observability, security, security-information-and-event-management, security-tools, telemetry, traces

**What it does:** Beacon is a local-first, open-source memory layer for AI coding agents that captures full session history across Claude Code, Cursor, Codex, and 20+ other harnesses, then surfaces reusable workflows, corrections, and debugging patterns to future agents via MCP or Agent Skills.

**Why now:** The repo gained 607 stars this week, coinciding with growing multi-harness adoption as teams run Claude Code, Cursor, and Codex side-by-side and lose context at every session boundary.

**Build with it:** Install via Homebrew (`brew install beacon && beacon endpoint install`), then expose your captured session knowledge to Claude Code by wiring Beacon's MCP server as a context source in your project's MCP config.

## 9. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 120475 (+3791 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase—plus its docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using local deterministic AST parsing via Tree-sitter, with no vector store required.

**Why now:** The repo gained nearly 3,800 stars this week and is in early access ahead of a public v1 launch, with a YC S26 badge indicating a fresh funding announcement driving current attention.

**Build with it:** Drop the `/graphify` skill into Claude Code or Cursor and run a natural-language query against your repo's knowledge graph to replace ad-hoc grep workflows immediately.

## 10. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 84725 (+3656 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) read/search access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without paid APIs or manual scraper setup.

**Why now:** The repo hit GitHub Trending #1 globally this week, driven by 3,600+ stars in seven days — signaling a sharp surge in demand for zero-cost internet access layers for local AI agent workflows.

**Build with it:** Point your MCP-compatible agent (e.g. Claude Code) at Agent Reach's CLI to immediately unlock Twitter search and YouTube transcript fetching inside existing chat sessions, no API keys required.
