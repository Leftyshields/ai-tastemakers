# Skill Tastemakers — Daily Brief — 2026-11-18

_Ranking: delta_7d · 10 repos · generated 2026-11-18T22:35:42.380Z_


## 1. yetone/magpie

https://github.com/yetone/magpie · ★ 38601 (+3925 this week) · claude-code, codex, deepseek, gemini-cli, llm, macos

**What it does:** Magpie is a local gateway and menu-bar app that routes coding agents (Claude Code, Codex, Gemini CLI) to any model provider you choose, automatically switching to the next configured account when a quota runs out.

**Why now:** The project hit Hacker News this week and is picking up momentum fast, so it is worth evaluating before the community tooling around it hardens.

**Build with it:** Point Claude Code at a Kimi or DeepSeek account by selecting it from Magpie's Agents page, which edits the agent's config file directly, letting you test cheaper or higher-quota backends without touching your Claude subscription.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 468188 (+15670 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a plugin interface for AI agents) that lets agents reverse engineer binaries, mobile apps, and running processes down to native code, without needing source access.

**Why now:** A Hacker News thread this week pulled 101 points and 39 comments around agent-driven binary analysis, signaling real builder interest rather than casual curiosity.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent, then point it at a closed app to extract and explain a specific feature for reimplementation.

## 3. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 68203 (+1685 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** An agent skill that generates 51 diagram types as self-contained HTML and SVG files, with brand-matched colors and fonts pulled from your site, installable in Cursor, Claude Code, Copilot, and other agent hosts via `npx skills add cathrynlavery/diagram-design`.

**Why now:** The repo is trending at 68k stars with 1,685 added this week, and HN threads surfaced it as a designer-friendly alternative to Mermaid output.

**Build with it:** Run the onboarding prompt against your production URL to extract your palette and fonts, then pipe architecture diagram requests through your existing Claude Code session to get brand-consistent SVG files you can drop directly into docs or presentations.

## 4. coreyhaines31/marketingskills

https://github.com/coreyhaines31/marketingskills · ★ 61241 (+1475 this week) · agent-skills, ai-agents, ai-seo, claude, claude-code, claude-code-plugin, claude-skills, codex, content-marketing, conversion-rate-optimization, copywriting, cursor, email-marketing, generative-engine-optimization, growth-marketing, marketing, marketing-automation, saas-marketing, seo, skill-md

**What it does:** A collection of markdown-based skill files for AI coding agents (Claude Code, Cursor, Codex, Windsurf) covering CRO, copywriting, SEO, analytics, and growth engineering tasks, structured so the agent can follow repeatable marketing workflows without custom prompting each time.

**Why now:** The repo is spiking at 1,475 stars this week, coinciding with broader adoption of Claude Code's plugin and skills spec as a standard agent extension format.

**Build with it:** Follow the guided tool connection workflow in `tools/SETUP.md` to wire scoped credentials and run a first read-only marketing data pull through your agent.

## 5. EL4CTEO/blender-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/EL4CTEO/blender-skills · ★ 2198 (+1080 this week) · 3d, agent-skills, ai-agents, blender, blender-python, bpy, claude-code, claude-skills, codex, game-assets, gemini-cli, godot, mcp, pbr, rigging, roblox, unity, unreal-engine

**What it does:** Blender Agent Skills packages 28 professional Blender 5.3 workflows, covering modeling, rigging, baking, game-engine export (Unity, Unreal, Godot), and QA, as installable skill files that give AI agents like Claude Code and Codex structured knowledge to run real Blender Python tasks.

**Why now:** The repo gained 1,080 stars this week alongside Blender 5.3's release, the version the skills are verified against, which adds KTX2 web export, compositor effects, and Gaussian splat support.

**Build with it:** Install via `/plugin marketplace add EL4CTEO/blender-skills` in Claude Code, then prompt it to generate a game-ready asset with baked normals and LODs for a specific export target like Unreal or Roblox.

## 6. pingdotgg/t3code

https://github.com/pingdotgg/t3code · ★ 65171 (+6912 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code is an open-source, MIT-licensed control plane that runs Claude Code, Codex, Cursor, and other ACP-compatible coding agents on your machine and surfaces them through a single interface across desktop, web, iOS, and Android.

**Why now:** The repo added roughly 6,900 stars this week, with momentum driven by simultaneous support for newly released agents like Grok Build and Kiro alongside the established Claude Code and Codex.

**Build with it:** Install the `t3` CLI via the one-liner curl script, point it at an existing Claude Code or Codex login, and use the ACP provider config to route tasks between agents mid-thread without touching each agent's native UI.

## 7. NVIDIA/SkillEvaluator <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/NVIDIA/SkillEvaluator · ★ 3686 (+1034 this week) · agent-evaluation, agent-plugins, agent-security, agent-skills, agentic-ai, benchmark, claude-code, codex, evaluate, evaluation, plugin, plugin-evaluation, security-scanner, skill-eval, skill-evals, skill-evaluation, skill-evaluator, skills

**What it does:** SkillEvaluator is a multi-tier CLI framework from NVIDIA that checks AI agent skills and plugins across 500-plus static rules, semantic overlap detection, and live agent evaluation to measure how a skill affects actual task outcomes.

**Why now:** The repo gained 1,034 stars this week alongside an NVIDIA-hosted livestream on evaluating agent skills and a linked arXiv paper, marking an active release push.

**Build with it:** Run `skillevaluator ci init` in your GitHub repo to open a setup PR that wires automated quality and security gates into your skill merge workflow.

## 8. citrolabs/ego-lite

https://github.com/citrolabs/ego-lite · ★ 23564 (+1019 this week) · agent-skills, ai-agent, automation, browser, browser-automation, claude-code, codex, hermes-agent, skills, skills-sh

**What it does:** ego lite is a browser that runs AI agent automation tasks in isolated "Spaces" alongside your own session, letting agents like Codex or Claude Code access your real logins and tabs via the `ego-browser` package without interrupting your browsing.

**Why now:** The repo gained over 1,000 stars this week and sits in the GitHub trending charts, coinciding with active Codex and Claude Code adoption cycles where giving agents browser access without breaking your own session is a known friction point.

**Build with it:** Point an existing Claude Code or Codex workflow at `ego-browser` to let the agent reuse your authenticated browser session instead of spinning up a headless instance from scratch.

## 9. stablyai/orca

https://github.com/stablyai/orca · ★ 128833 (+6522 this week) · agent-ide, ai-agents, automation, bot, claude-code, codex, ghostty, grok-bot, hermes-agent, mobile-app, muse, openclaw, opencode, orchestration, pi, runtime, swarm, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop, mobile, and remote app that runs multiple coding agents (Claude Code, Codex, and others) in parallel, each isolated in its own git worktree, with chat UI, terminal, diffs, and a browser unified in one interface.

**Why now:** The repo gained over 6,500 stars this week as builder interest in multi-agent coding workflows accelerates following Claude Code's recent widespread adoption.

**Build with it:** Point Orca at an existing repo, configure a coordinator agent via the orchestration CLI, and let it spawn worker agents in separate worktrees to tackle independent feature branches simultaneously.

## 10. irinabuht12-oss/google-ads-meta-ads-mcp

https://github.com/irinabuht12-oss/google-ads-meta-ads-mcp · ★ 8324 (+913 this week) · advertising, chatgpt, claude, cursor, facebook-ads, facebook-ads-mcp, ga4, google-ads, google-ads-mcp, google-ads-mcp-server, google-analytics, google-analytics-mcp, mcp, mcp-server, meta-ads, meta-ads-mcp, meta-ads-mcp-server, model-context-protocol, n8n, remote-mcp

**What it does:** Ryze AI bundles Google Ads, Meta Ads, GA4, and Google Search Console into a single hosted remote MCP server (a standardized plugin interface for AI agents) with 250-plus tools, OAuth login, and approval-gated writes for Claude, ChatGPT, Cursor, and n8n.

**Why now:** The repo gained 913 stars this week as Claude and ChatGPT both expand native connector support, pushing remote MCP adoption into mainstream builder workflows.

**Build with it:** Run `claude mcp add ryze --transport http https://connector.get-ryze.ai/mcp` to connect your ad accounts and prompt Claude to pull a cross-platform campaign performance audit without touching an API key or developer token.
