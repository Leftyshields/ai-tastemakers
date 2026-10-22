# AI Tastemakers — Daily Brief — 2026-10-22

_Ranking: delta_7d · 10 repos · generated 2026-10-22T17:58:14.546Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 364569 (+99637 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is an MCP server (a standardized bridge that lets AI agents call external tools) that routes reverse-engineering tasks—inspecting closed-source native binaries, JavaScript/Electron apps, .NET assemblies, and websites—through Hopper or Ghidra running locally, no source code required.

**Why now:** The repo picked up nearly 100,000 stars this week, an unusually sharp spike that suggests the tooling ecosystem around it is still forming and early adopters have room to shape it.

**Build with it:** Run `npx rea-agents setup` to register REA with your agent, then point it at a closed-source app to extract and replicate a specific feature in your own codebase.

## 2. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 132678 (+5862 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphify, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify turns a codebase—plus its docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using deterministic AST parsing via tree-sitter, exposing every relationship with an explanation and no vector store or embedding infrastructure required.

**Why now:** The repo gained 5,862 stars this week and ships as a native `/graphify` skill for Claude Code, Cursor, Codex, and Gemini CLI—the four AI coding environments currently fighting for developer workflow lock-in—making now a practical time to evaluate it before patterns solidify.

**Build with it:** Install the `graphifyy` PyPI package, register the MCP skill in your Cursor or Claude Code config, and get natural-language code search over a local knowledge graph without standing up any embedding infrastructure.

## 3. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 101027 (+3872 this week) · agent-skills, ai-agents, anti-slop, claude-code, codex, cursor, design-system, frontend, landing-page, ui-design, web-design

**What it does:** Taste Skill is an agent skill for Claude Code, Cursor, and Codex that injects art direction, real archival photographs, and a live browser check into the generation loop so AI-built pages look deliberately designed rather than templated.

**Why now:** The companion desktop app TasteCode—Taste Skill bundled with a built-in design agent—launched this week, making the underlying skill accessible without manual agent configuration for the first time.

**Build with it:** Drop the skill into a Claude Code session, prompt it with a one-line page brief, and get a styled, photo-sourced page you can inspect in a real browser immediately.

## 4. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 36565 (+18849 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency plugin for dsh (a shell-layer agent runtime) that routes requests to DeepSeek V4.1 Flash, Kimi K3, and a Kilo AI free pool with no login, API key, or usage cap, and exposes a local OpenAI-compatible port so any tool that speaks that protocol can use it.

**Why now:** The repo hit #1 on Trendshift's JavaScript weekly chart for 2026-10-05 to 2026-10-11 and gained 18,849 stars in a single week, timing that coincides with rising frustration over API costs across the competing frontier models.

**Build with it:** Point any OpenAI-compatible tool—Cursor, Continue, or a local script—at the plugin's local forwarding base URL to get free DeepSeek V4.1 Flash or Kimi K3 completions without touching an API key.

## 5. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 256179 (+2125 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python AI agent from Nous Research that closes a learning loop across sessions—creating and refining skills from experience, persisting memory, and swapping providers without code changes via `hermes model`, running anywhere from a $5 VPS to Modal serverless.

**Why now:** The repo is pulling 2,125 stars this week, likely tied to its public launch and the agentskills.io open standard it ships with, which positions it as infrastructure rather than a one-off demo.

**Build with it:** Point it at your own OpenAI-compatible endpoint using `hermes model`, then trigger the cron scheduler in natural language to run a nightly task delivered to Telegram—validating both provider portability and the messaging gateway in a single workflow.

## 6. gamedev-skills/awesome-gamedev-agent-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/gamedev-skills/awesome-gamedev-agent-skills · ★ 2869 (+1334 this week) · agent-skills, ai-agents, antigravity, awesome-list, claude-code, cline, codex, cursor, game-dev, game-development, gamedev, gemini-cli, github-copilot, godot, kiro, oh-my-pi, skills, unity, unreal, windsurf

**What it does:** A collection of 74 versioned `SKILL.md` files—structured instruction sets that tell AI coding agents how to work with specific frameworks—covering Godot, Unity, Unreal, Phaser, Bevy, and six other engines, with a router that auto-detects your engine and task so the agent loads only relevant skills before generating code.

**Why now:** The repo gained 1,334 stars this week as builder interest in portable agent skill formats spiked following Anthropic's Claude Skills launch and Kiro's spec-driven agent workflow, making a cross-agent format immediately practical rather than speculative.

**Build with it:** Run `npx skills add gamedev-skills/awesome-gamedev-agent-skills` in an existing game project, then describe a task in plain language to your agent—"add a double jump to my Godot player"—and let the router wire the correct skill files without manual selection.

## 7. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 173061 (+8830 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent skill that installs a "laziest senior dev" heuristic into AI coding agents (Claude Code, Cursor, and 20 others), steering them toward deleting or skipping code rather than generating new code by default.

**Why now:** The v5 release, benchmarked against Claude Code with Opus 5.5 this week, claims -53% generated code and a jump from 68% to 98% test coverage on risky logic across 39 real tasks—concrete numbers that make it worth testing against your own codebase.

**Build with it:** Drop the npm package `@dietrichgebert/ponytail` into an existing Claude Code workflow as a skill to immediately test whether your agent stops over-engineering a FastAPI or React codebase.

## 8. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 286307 (+6192 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is a harness layer that adds skills, persistent memory, instincts, and security controls on top of AI coding agents—Claude Code, Codex, Opencode, and Cursor—without replacing them.

**Why now:** The repo gained over 6,000 stars this week and surfaced on GitHub Trending at the same moment Claude Code and Opencode are seeing heavy adoption as daily coding drivers, meaning the gap it fills is a live pain point rather than a hypothetical one.

**Build with it:** Drop the `ecc-universal` npm package into an existing Claude Code workflow to immediately layer persistent memory and agent security guards onto your sessions.

## 9. Louis-CFM/coucou

https://github.com/Louis-CFM/coucou · ★ 6203 (+913 this week) · ai-agents, anthropic, antigravity, claude, claude-code, codex, cursor, dynamic-island, gemini-cli, ios, iphon, linux, macos, macos-app, menubar-app, notch, open-source, swift, swiftui, windows

**What it does:** Coucou is an open-source Mac/iOS/Android/Windows app that surfaces AI coding agent activity—Claude Code, Codex, Cursor, Gemini CLI—in your Mac's notch or Dynamic Island so you can approve permissions and monitor sessions without switching windows; v0.4 adds a dictation layer powered by NVIDIA's Parakeet model running fully offline on Apple Silicon via FluidAudio.

**Why now:** The v0.4 release this week is the first credible open-source Wispr Flow alternative for offline dictation on Apple Silicon, and its notch integration pattern is still early enough that forking it to support other agents is straightforward.

**Build with it:** Fork the Swift 6 / SwiftUI notch integration and wire your own agent's stdout to Coucou's notification surface using the existing Claude Code session-watching pattern as a template.

## 10. yetone/magpie

https://github.com/yetone/magpie · ★ 19475 (+6079 this week) · claude-code, codex, deepseek, gemini-cli, llm, macos

**What it does:** Magpie is a local gateway and menu-bar app that sits between AI coding agents—Claude Code, Codex, Gemini CLI, OpenCode—and any provider or model, including free-tier subscriptions, automatically failing over to the next account when a quota runs out.

**Why now:** The repo gained 6,079 stars this week as provider fragmentation and competing coding agents have made multi-account quota juggling a concrete daily problem rather than an edge case.

**Build with it:** Add a routing group in the Providers page with multiple DeepSeek or Kimi accounts, point Codex or Claude Code at Magpie's local gateway endpoint, and get automatic quota failover without touching each agent's config file again.
