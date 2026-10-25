# AI Tastemakers — Daily Brief — 2026-10-25

_Ranking: delta_7d · 10 repos · generated 2026-10-25T17:02:46.622Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 383092 (+64691 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is an MCP server (a standardized tool-connection layer for AI agents) that hooks agents into reverse-engineering tools—Hopper, Ghidra, static analysis—so they can inspect native binaries, Electron apps, .NET assemblies, and websites without ever having the source code.

**Why now:** The repo pulled in 64,691 stars this week, a breakout number almost certainly driven by viral demos of agents autonomously decompiling closed-source apps and generating equivalent features.

**Build with it:** Run `npx rea-agents setup` to connect REA to Claude or Codex, then prompt your agent to inspect a closed-source feature and produce equivalent code for your own project.

## 2. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 148561 (+2751 this week) · ai-tools, claude-code, codex, desktop-app, grok, grokbuild, hermes, hermes-agent, mcp, open-source, openclaw, openclaw-ui, opencode, pi, provider-management, rust, skills, skills-management, tauri, wsl-support

**What it does:** CC Switch is a Tauri/Rust desktop app (cross-platform, native performance) that lets you swap API providers and manage MCP servers, Skills, and Prompts for Claude Code, Codex, Gemini CLI, Grok Build, and several other agent tools through a GUI instead of hand-editing JSON, TOML, or YAML config files.

**Why now:** The repo crossed 148k stars with 2,751 added this week, timed to Kimi K3's launch as a supported provider—making multi-provider switching immediately useful for developers who want to test a new frontier model without reconfiguring tooling by hand.

**Build with it:** Point CC Switch at your existing Claude Code config, add a Kimi or Gemini API key through the GUI, and verify one-click provider switching before committing to a custom MCP server integration.

## 3. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 42755 (+18317 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** `dsh-our-free-model` is a zero-dependency, no-build dsh plugin that routes requests to frontier models—DeepSeek V4.1 Flash, Kimi K3, Kilo AI pool—with no login, API key, or usage cap, and exposes a local OpenAI-compatible forwarding port so any tool expecting the OpenAI API format just works.

**Why now:** It hit #1 on Trendshift's JavaScript weekly chart for 2026-10-05 to 2026-10-11 while adding 18k+ stars this week, rapid validation that free, uncapped model access is a real gap developers want filled.

**Build with it:** Point any OpenAI-compatible client at the plugin's local forwarding port—grab the base URL and key from the settings page—to run DeepSeek V4.1 Flash or Kimi K3 without touching an API account.

## 4. makecindy/cindy <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/makecindy/cindy · ★ 4653 (+1465 this week) · agent, ai-agent, ai-assistant, android, claude-code, codex, electron, ios, llm, macos, react-native, typescript, windows

**What it does:** Cindy is an open-source desktop and mobile AI agent that runs Claude Code and Codex locally against your actual files and apps, with persistent memory, skills, and MCP tool connections spanning multiple agent harnesses.

**Why now:** The repo gained 1,465 stars this week, a spike that tracks with its public launch and the appearance of downloads at cindy.app.

**Build with it:** Register an internal tool as an MCP server inside Cindy to test whether her multi-harness orchestration fits your workflow—faster than rebuilding the integration from scratch.

## 5. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 175992 (+9196 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent skill (a reusable capability you drop into an agent's config) that injects a YAGNI-first code-review heuristic into Claude Code, Cursor, and 20 other tools, nudging agents to delete or simplify code rather than pile on more.

**Why now:** The v5 release benchmarked against a real FastAPI + React repo reports -53% code, -45% token usage, and test coverage of risky logic climbing from 68% to 98%—concrete numbers for teams weighing agent cost and output quality.

**Build with it:** Add `@dietrichgebert/ponytail` to your Claude Code plugin config and run it against an existing codebase to measure how many lines your agent removes on the next feature request.

## 6. NVIDIA/SkillSpector

https://github.com/NVIDIA/SkillSpector · ★ 21557 (+1075 this week) · agent-security, agent-skills, agentic-ai, ai-security, claude-code, mcp, prompt-injection, security-scanner, security-tools, security-workflow, supply-chain-security

**What it does:** SkillSpector is a static scanner with an optional LLM analysis pass that checks AI agent skills—reusable capability packages for Claude Code, Codex CLI, Gemini CLI, MCP, and others—against 71 vulnerability patterns covering prompt injection, data exfiltration, and supply-chain risks before you install anything.

**Why now:** NVIDIA's own research dataset behind this tool shows 26.1% of analyzed skills contain vulnerabilities, and skill ecosystems are expanding across Claude Code, Codex, and Gemini CLI simultaneously—pre-install vetting is an immediate gap with no other dedicated tooling filling it.

**Build with it:** Drop `skillspector scan <url> --format sarif` into your CI pipeline to feed findings directly into GitHub Code Scanning before any skill reaches teammates.

## 7. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 134940 (+6748 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphify, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify turns a codebase—including docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using deterministic AST parsing via Tree-sitter (no vectors, no embeddings), with every graph edge explained and traceable.

**Why now:** The repo gained 6,748 stars this week while trending on Trendshift, coinciding with native `/graphify` skill support landing for Claude Code, Cursor, Codex, and Gemini CLI—usable immediately inside the editors most developers are already running.

**Build with it:** Install the `graphifyy` PyPI package, point it at a legacy repo, and connect the resulting knowledge graph to your Claude Code or Cursor session via the `/graphify` skill for precise, citation-backed code search without spinning up a vector database.

## 8. Folkbench/folkbench <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Folkbench/folkbench · ★ 3639 (+946 this week) · ai, api-relay, api-relay-pricing, benchmark, benchmarks, claude, claude-code, codex, folkbench, llm, model-evaluation, openai-api, reliability, tauri

**What it does:** Folkbench continuously measures Chinese AI API relay services (third-party endpoints that proxy Anthropic and OpenAI traffic, widely used where direct access is unreliable) for uptime, latency, and price, and ships a Tauri/Rust desktop client called Folkbench Switch that writes the winning relay endpoint directly into Claude Code or Codex config files.

**Why now:** The repo added 946 stars this week during active Claude Code and Codex adoption cycles where developers need dependable, affordable relay routing outside direct Anthropic and OpenAI access.

**Build with it:** Use Folkbench Switch to point your Claude Code `ANTHROPIC_BASE_URL` at whichever relay currently tops the uptime rankings and cut dropped-request debugging out of your dev loop.

## 9. every-app/open-seo

https://github.com/every-app/open-seo · ★ 24914 (+923 this week) · backlink-analysis, google-search-console-mcp, keyword-research, mcp, seo, seo-agent, seo-audit, seo-automation, seo-skills, seo-tools, site-audit

**What it does:** OpenSEO is a self-hostable TypeScript SEO suite—keyword research, rank tracking, backlinks, site audits—that runs against your own DataForSEO API key rather than a fixed SaaS subscription, and ships an MCP server for agent integration.

**Why now:** The repo gained 923 stars this week, and the included MCP server puts it directly in the path of developers already wiring agent tools into Claude Code and similar environments.

**Build with it:** Point Claude Code at the OpenSEO MCP server using the setup at `openseo.so/docs/mcp`, then run the pre-built Agent Skills to automate keyword research inside your coding workflow.

## 10. sgl-project/sglang

https://github.com/sgl-project/sglang · ★ 38149 (+875 this week) · attention, blackwell, cuda, deepseek, diffusion, glm, gpt-oss, inference, llama, llm, minimax, moe, qwen, qwen-image, reinforcement-learning, transformer, vlm, wan

**What it does:** SGLang is an open-source inference framework for LLMs, vision-language models, and diffusion models, built for agentic workloads, large-scale serving, and reinforcement learning rollouts across NVIDIA, AMD, TPU, and Apple Silicon.

**Why now:** The repo gained 875 stars this week and the SGLang Summit 2026 in San Francisco (November 12–13) was just announced, marking active community momentum around the current release.

**Build with it:** Pull `lmsysorg/sglang:latest` and use the [Cookbook](https://cookbook.sglang.io/) to get a hardware-matched launch command for your model—the fastest path to a running inference endpoint without manual tuning.
