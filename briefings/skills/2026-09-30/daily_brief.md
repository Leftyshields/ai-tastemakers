# Skill Tastemakers — Daily Brief — 2026-09-30

_Ranking: delta_7d · 10 repos · generated 2026-09-30T18:27:53.734Z_


## 1. getpaseo/paseo

https://github.com/getpaseo/paseo · ★ 19095 (+924 this week) · ade, agents, android, claude-code, codex, copilot, developer-tools, hermes, ios, linux, mobile, opencode, orchestration, pi, windows

**What it does:** Paseo is a self-hosted orchestration layer that runs Claude Code, Codex, Copilot, OpenCode, and other coding agents in parallel, accessible from a single interface across iOS, Android, desktop, web, and CLI.

**Why now:** A "Show HN" thread this week pulled 92 points and 54 comments, surfacing real builder interest in multi-agent workflows and cross-device control.

**Build with it:** Install the CLI (`npm install -g @getpaseo/cli`), wire in your existing Claude Code or Codex credentials, and run parallel agents across multiple repos from a single terminal session.

## 2. stablyai/orca

https://github.com/stablyai/orca · ★ 82220 (+5796 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile AI orchestration environment that runs Codex, Claude Code, OpenCode, or Pi side-by-side in isolated git worktrees, with a mobile companion for monitoring and steering agents remotely.

**Why now:** The project hit a Show HN thread this week and is gaining rapid traction, coinciding with broad developer interest in parallel agent workflows as coding agents like Codex and Claude Code mature.

**Build with it:** Fan a single feature prompt across three parallel worktrees using Orca's split UI, compare diffs, and merge the winning branch — validating whether multi-agent parallelism cuts your iteration time on real tasks.

## 3. Vincentwei1021/video-shotcraft

https://github.com/Vincentwei1021/video-shotcraft · ★ 10025 (+723 this week) · agent-skills, ai-agents, ai-video, claude-code, claude-code-skills, claude-skills, codex, motion-design, motion-graphics, product-video, promo-video, remotion, video-generation, video-production

**What it does:** video-shotcraft is a Claude Code / Codex agent skill that storyboards, animates, and sound-designs cinematic product promo videos using Remotion, drawing from 157 shot recipe cards across 214 motion styles with 2.5D camera moves and beat-synced cuts.

**Why now:** The project hit 10,000+ GitHub stars this week (+723) and just shipped a CapCut-style Motion Workbench (`node workbench/scripts/open.mjs <project>`) that lets you edit shot copy, font sizes, colors, and timing directly in the browser after delivery.

**Build with it:** Point Claude Code at a product URL, run the skill to generate a Remotion project, then open the Motion Workbench to swap one of the nine built-in film themes (Midnight, Obsidian Violet, etc.) without losing your edits.

## 4. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 42858 (+697 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** Diagram-design is a Claude Code / Codex skill that generates self-contained HTML + SVG editorial diagrams — architecture maps, flowcharts, Sankey charts, Wardley maps, and ten other layout grammars — with no build step, no JavaScript runtime, and no generic rounded-box defaults.

**Why now:** The repo gained 697 stars this week and is trending on Trendshift, coinciding with the v2.5.10 release that added ten new layout grammars including dependency graphs, UML class diagrams, and database schemas.

**Build with it:** Drop the skill into an existing Claude Code project and point it at a draw.io or Mermaid source file to have it redrawn at a specified format, size, and detail level as a static HTML artifact you can commit directly to a docs folder.

## 5. router-for-me/CLIProxyAPI

https://github.com/router-for-me/CLIProxyAPI · ★ 53635 (+624 this week) · antigravity, claude-code, cluade, codex, devin, gemini, muse, openai

**What it does:** CLIProxyAPI is a Go proxy server that exposes OpenAI-, Gemini-, and Claude-compatible API endpoints backed by CLI tool accounts (Kimi, OpenAI Codex, Claude Code, Grok, Gemini) so you can hit them from any standard SDK without managing separate integrations.

**Why now:** The repo gained 624 stars this week alongside the README's prominent feature of Kimi K3 — a newly released 2.8-trillion-parameter model with a 1M-token context window — making it a timely on-ramp to that model via familiar OpenAI-compatible calls.

**Build with it:** Point an existing OpenAI SDK client at the local CLIProxyAPI endpoint, swap in a Kimi or Claude Code credential, and run your current agentic coding workflow against whichever CLI-backed model you want to benchmark.

## 6. lidge-jun/opencodex

https://github.com/lidge-jun/opencodex · ★ 16713 (+623 this week) · ai-gateway, ai-tools, anthropic, chatgpt, claude, claude-code, codex, codex-cli, deepseek, developer-tools, gemini, grok, kiro, llm, llm-proxy, ollama, openai, openrouter, proxy, typescript

**What it does:** opencodex is a local proxy (`ocx start`) that intercepts API calls from OpenAI Codex, Claude Code, Claude Desktop, and Grok Build, routing them to any OpenAI-compatible backend — Claude, Gemini, DeepSeek, Ollama, OpenRouter, and others.

**Why now:** The repo gained 623 stars this week alongside support for Grok Build and Claude Desktop subagent routing, making it one of the broadest multi-client proxy surfaces currently available across the four major coding-agent UIs.

**Build with it:** Install via `npm install -g @bitkyc08/opencodex`, run `ocx start`, and swap your Claude Code model picker to a locally-hosted Ollama endpoint without changing any client config.

## 7. tradecatlabs/vibe-coding-cn <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/tradecatlabs/vibe-coding-cn · ★ 16981 (+613 this week) · ai, ai-agent, ai-agents, ai-coding, ai-programming, chinese, claude-code, codex, cursor, developer-tools, gemini-cli, glue-coding, prompt-engineering, prompts, skills, tutorial, vibe-coding, workflow

**What it does:** A Chinese-language guide and toolkit for AI pair-programming workflows, covering prompt engineering, skill libraries, context management, and quality gates from idea to shipped product using tools like Cursor, Claude Code, and Codex.

**Why now:** The repo gained 613 stars this week alongside active Gemini CLI and Codex tooling support, reflecting the current surge in agentic coding tool adoption across Chinese developer communities.

**Build with it:** Drop the pre-built Codex configuration from `tools/config/.codex/` into your project to immediately apply the repo's structured prompt-and-constraint workflow to an OpenAI Codex agent session.

## 8. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 270095 (+4060 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness layer that adds skills, memory, instincts, and security to AI coding agents like Claude Code, Codex, Opencode, and Cursor via MCP and npm packages (`ecc-universal`, `ecc-agentshield`).

**Why now:** The repo is trending this week with over 4,000 new stars, coinciding with active developer adoption of Claude Code and the expanding MCP ecosystem as a standard agent integration surface.

**Build with it:** Install `ecc-universal` via npm and wire it into your Claude Code workflow to immediately layer persistent memory and security guardrails onto agent sessions.

## 9. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 148945 (+4031 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a prompt skill (npm: `@dietrichgebert/ponytail`) that installs into AI coding agents like Claude Code or Cursor to enforce YAGNI discipline — steering the agent toward the smallest working solution instead of over-engineered scaffolding.

**Why now:** The repo hit ~149K stars with 4K added this week, riding the current Claude Code agent-skill ecosystem maturing around shareable `.claude` configs and cursor rules.

**Build with it:** Drop the skill into an existing Claude Code project via npm and run it on a feature branch to measure token and line-count reduction against your current agent baseline.

## 10. irinabuht12-oss/google-ads-meta-ads-mcp <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/irinabuht12-oss/google-ads-meta-ads-mcp · ★ 3225 (+572 this week) · advertising, chatgpt, claude, cursor, facebook-ads, facebook-ads-mcp, ga4, google-ads, google-ads-mcp, google-ads-mcp-server, google-analytics, google-analytics-mcp, mcp, mcp-server, meta-ads, meta-ads-mcp, meta-ads-mcp-server, model-context-protocol, n8n, remote-mcp

**What it does:** A single hosted remote MCP server that exposes Google Ads, Meta Ads (Facebook/Instagram), GA4, and Google Search Console as 250+ tools to Claude, ChatGPT, Cursor, and n8n via OAuth — no API keys or developer tokens required.

**Why now:** The repo gained 572 stars this week, signaling a surge of builder interest coinciding with growing MCP adoption across Claude Desktop, ChatGPT connectors, and Cursor as teams standardize on remote MCP endpoints.

**Build with it:** Run `claude mcp add ryze --transport http https://connector.get-ryze.ai/mcp` and immediately prompt Claude to pull cross-channel campaign performance data and generate an audit report — no local server setup needed.
