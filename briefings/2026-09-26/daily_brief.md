# AI Tastemakers — Daily Brief — 2026-09-26

_Ranking: delta_7d · 10 repos · generated 2026-09-26T17:08:41.761Z_


## 1. zhouxiaoka/autoclip <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/zhouxiaoka/autoclip · ★ 8947 (+1528 this week) · ai, ai-agents, ai-tools, ai-video, ai-video-editor, auto, auto-highlight, highlight, llm, video, video-editing, video-processing, videos

**What it does:** AutoClip analyzes video subtitles with an LLM to locate highlights, generate titles, and automatically cut clips and reels — available as a desktop app (macOS/Windows), Docker web UI, or CLI/MCP pipeline.

**Why now:** The repo gained 1,528 stars this week and recently shipped v1.3.2, adding multi-platform publishing (TikTok, YouTube, Bilibili, and more) and automatic cover generation in the same release.

**Build with it:** Point the MCP interface at an existing MCP-compatible client to batch-process interview or podcast recordings through the same highlight-extraction pipeline without touching the GUI.

## 2. can1357/oh-my-pi

https://github.com/can1357/oh-my-pi · ★ 33388 (+1463 this week) · ai-agent, ai-coding-agent, anthropic, bun, claude, cli, coding-assistant, llm, mcp, multi-provider, openai, rust, terminal, tui, typescript

**What it does:** oh-my-pi (`omp`) is a terminal coding agent with a built-in IDE layer — LSP, DAP, 60+ model providers, and 31 tools — backed by an ~80k-line Rust core.

**Why now:** The repo gained 1,463 stars this week and just opened pull requests to all contributors without a vouch requirement, making it an active moment to contribute or fork.

**Build with it:** Install via `bun install -g @oh-my-pi/pi-coding-agent` and wire it into an existing project's debug loop using its 28 DAP operations to drive breakpoint-aware edits from the CLI.

## 3. cactus-compute/needle <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/cactus-compute/needle · ★ 12685 (+1185 this week) · cactus, edge-ai, foundation-model, function-calling, llm, on-device-ai, tinyml, tool-calling

**What it does:** Needle is an 8–29 MB on-device model that handles tool calling, structured JSON extraction, and text embeddings on phones, wearables, microcontrollers, and similar constrained hardware using a byte-level grammar that constrains every output token.

**Why now:** The repo gained 1,185 stars this week, coinciding with the Needle 3 release and its interactive benchmark page going live at cactuscompute.com/needle.

**Build with it:** Decorate a Python function with `@needle.tool`, pass it to `needle.Needle(tools=[...])`, and call `.run()` to validate the model's tool-selection accuracy on your own app's API surface before committing to an on-device deployment.

## 4. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 44973 (+1165 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a native C binary MCP server that indexes codebases into a persistent knowledge graph via tree-sitter AST parsing across 162 languages, answering structural queries (functions, call chains, HTTP routes) in under 1ms with 17 exposed MCP tools.

**Why now:** The project just published a supporting arXiv preprint (2603.27277) benchmarked across 31 real-world repos, reporting 83% answer quality at 10× fewer tokens than file-by-file exploration — giving builders a citable basis for agent architecture decisions.

**Build with it:** Point the server at an existing repo using the `install` command, then wire it into Cursor or Claude Code via its auto-configured MCP client surface to replace manual file-browsing tool calls with sub-millisecond graph queries.

## 5. Observal/Observal <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Observal/Observal · ★ 3506 (+1122 this week) · agents, analytics, antigravity, claude-code, cli-tool, codex, cursor, cursor-ai, insights, kiro, large-language-models, mcp, open-source, pi, playground, registry, self-hosted, skills

**What it does:** Observal is a self-hosted registry and control plane for internal AI components — Skills, Agents, and MCP servers — with a built-in insight engine for tracking usage and sharing across teams.

**Why now:** The repo gained 1,122 stars this week, coinciding with rapid organizational adoption of coding-agent tooling across Cursor, Claude Code, Codex, and Kiro (all listed as explicit topics), making a shared internal registry a practical coordination layer rather than a nice-to-have.

**Build with it:** Install `observal-cli` from PyPI, register your team's existing MCP servers, and use the registry to surface which agents and skills peers are actually using via the insight engine.

## 6. Asymptote-Labs/agent-beacon <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Asymptote-Labs/agent-beacon · ★ 1573 (+1115 this week) · agent-ai-cli, agent-harnesses, agent-security, browser-extension, ci, claude-code, cloud, codex, cursor, detection-engineering, jev, knowledge-base, memory, mobile-device-management, observability, security, security-information-and-event-management, security-tools, telemetry, traces

**What it does:** Beacon is a local-first, open-source memory layer for AI coding agents that captures full session history across Claude Code, Cursor, Codex, and 20+ other harnesses, then surfaces reusable workflows, corrections, and debugging patterns to future agents via MCP or Agent Skills.

**Why now:** The repo gained 1,115 stars this week, coinciding with rapid adoption of multi-harness agent workflows where context loss between sessions is a daily friction point for teams using Claude Code and Cursor in parallel.

**Build with it:** Install via `brew install beacon && beacon endpoint install`, then wire the MCP endpoint into Claude Code to let it retrieve past debugging patterns from your existing session history without any manual knowledge curation.

## 7. davila7/claude-code-templates <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/davila7/claude-code-templates · ★ 31904 (+1106 this week) · anthropic, anthropic-claude, claude, claude-code

**What it does:** `claude-code-templates` is a CLI tool (`npx claude-code-templates@latest`) that installs pre-built configurations—agents, custom commands, hooks, MCP integrations, and project templates—into Anthropic's Claude Code environment.

**Why now:** The repo gained 1,106 stars this week, coinciding with rapid adoption of Claude Code as a primary agentic coding tool and a fresh Bright Data MCP skill bundle added directly to the installer.

**Build with it:** Run `npx claude-code-templates@latest` in an existing project to drop in framework-specific CLAUDE.md configs and MCP wiring without manually editing Claude Code settings.

## 8. browser-use/browser-use

https://github.com/browser-use/browser-use · ★ 116383 (+1099 this week) · ai-agents, ai-tools, browser-automation, browser-use, llm, playwright, python

**What it does:** Browser Use is an open-source Python library that lets LLM-powered agents control a real browser — clicking, form-filling, CAPTCHA-solving, and booking flows — via a Playwright-backed action loop.

**Why now:** The project gained over 1,000 stars this week and crossed 116K total, signaling sustained builder momentum around agentic web automation as a practical pattern rather than a research curiosity.

**Build with it:** Point the `Agent` class at a task prompt and a supported LLM (e.g. `gpt-4o`), run it against your own web workflow, and inspect the recorded action trace to validate where the agent breaks down before wiring it into a pipeline.

## 9. K-Dense-AI/scientific-agent-skills

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 46719 (+1099 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** Scientific Agent Skills is a Python library of 166 validated research skills covering genomics, drug discovery, cheminformatics, and 100+ scientific databases, installable as an Agent Skills-standard plugin into Cursor, Claude Code, Codex, or the free K-Dense BYOK desktop app.

**Why now:** The repo gained 1,099 stars this week and recently rebranded from Claude-specific to the open Agent Skills standard, making the full skill set available to any compatible agent runtime beyond Anthropic's tooling.

**Build with it:** Drop the skills into a Cursor or Claude Code project via the Agent Skills config to get live pathogen-variant surveillance and genome-wide AlphaGenome Atlas queries inside your existing coding agent without writing custom API wrappers.

## 10. strands-agents/harness-sdk <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/strands-agents/harness-sdk · ★ 8450 (+1083 this week) · agent-framework, agentic, agentic-ai, agents, ai, ai-agents, anthropic, autonomous-agents, bedrock, generative-ai, harness, llm, llm-agent, mcp, multi-agent-systems, openai, python, sdk, strands-agents, typescript

**What it does:** Strands Agents is an open-source Python/TypeScript SDK that replaces a hand-rolled agent loop with built-in lifecycle controls, tool use, MCP support, multi-agent patterns, memory, sessions, and evals — all running in-process with no hosted control plane.

**Why now:** The repo gained 1,083 stars this week, signaling a sharp uptick in developer attention coinciding with active multi-agent and MCP tooling discussions across the AI builder community.

**Build with it:** Drop in an MCP server via the `strands-mcp` package to give an existing agent access to external tools without rewriting your agent loop.
