# AI Tastemakers — Daily Brief — 2026-09-23

_Ranking: delta_7d · 10 repos · generated 2026-09-23T17:51:11.351Z_


## 1. Donchitos/Claude-Code-Game-Studios <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Donchitos/Claude-Code-Game-Studios · ★ 25376 (+3455 this week) · ai-agents, ai-assisted-development, anthropic, claude, claude-code, game-design, game-development, gamedev, godot, indie-game-dev, unity, unreal-engine

**What it does:** A Shell-based configuration layer for Claude Code that installs 49 specialized subagents (directors, leads, specialists), 74 slash commands, and 12 automated hooks to impose real studio hierarchy and quality gates on solo AI-assisted game development.

**Why now:** Claude Code's recently shipped native subagents feature made multi-agent coordination within a single session practical, and this repo is one of the first public configurations to wire that capability into a structured domain-specific workflow.

**Build with it:** Drop the `.claude/` directory into an existing Godot, Unity, or Unreal project, then drive your sprint with the `/create-epics` → `/create-stories` → `/dev-story` → `/story-done` slash-command chain to enforce design-review and QA gates before any code lands.

## 2. hypit-ai/hypit

https://github.com/hypit-ai/hypit · ★ 15312 (+6751 this week) · agentic-ai, ai, ai-agents, ai-video, compiler, dsl, ffmpeg, generative-ai, llm, markup-language, monorepo, plugin-system, programming-language, text-to-video, typescript, video, video-automation, video-clone, video-editing, video-generation

**What it does:** Hypit is a TypeScript monorepo that lets you analyze a viral video and auto-generate up to 100 remixed variants by swapping face, voiceover, and B-roll through a DSL-driven pipeline built on FFmpeg and AI agents.

**Why now:** The repo hit #1 on Trendshift for both daily overall and daily TypeScript repositories this week, signaling a rapid community surge around agentic video-automation tooling.

**Build with it:** Wire it into a content CI pipeline: define a `.hypit` DSL template for your target format, run `hypit clone <url> --variants 100` in a GitHub Actions step, and push rendered outputs directly to an S3 bucket or a scheduled social-publishing queue.

## 3. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 266034 (+6087 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is a configuration and prompt layer ("agent harness") that adds persistent memory, security guardrails, and research-first behavioral instincts to AI coding agents like Claude Code, Codex, Cursor, and Opencode.

**Why now:** Claude Code has seen a surge in production adoption this week following Anthropic's expanded API access, making harness-layer tooling like this directly relevant to teams hitting context and safety limits in real workflows.

**Build with it:** Drop ECC's CLAUDE.md configuration into an existing Claude Code project to wire in AgentShield's security layer and persistent memory via the `ecc-universal` npm package, giving your agent guardrails without changing your underlying model or editor.

## 4. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 135567 (+2379 this week) · ai-tools, claude-code, codex, desktop-app, grok, grokbuild, hermes, hermes-agent, mcp, open-source, openclaw, openclaw-ui, opencode, pi, provider-management, rust, skills, skills-management, tauri, wsl-support

**What it does:** CC Switch is a Tauri 2/Rust desktop app that centralizes configuration and provider switching for multiple AI coding agents—Claude Code, Codex, OpenCode, Grok Build, Hermes Agent, and others—from a single cross-platform GUI on Windows, macOS, and Linux.

**Why now:** The repo is trending at +2,379 stars this week, coinciding with rapid fragmentation across AI coding CLIs (Gemini CLI, MiniMax Code, Grok Build), making unified provider management an acute friction point for developers juggling multiple tools.

**Build with it:** Use CC Switch's provider-management and MCP config surfaces to wire a custom API relay (e.g., a self-hosted OpenAI-compatible endpoint) into multiple agentic tools simultaneously, cutting per-tool configuration overhead when testing model swaps across Claude Code and Codex in the same project.

## 5. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 144914 (+4755 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, and ~18 others) that injects a "laziest senior dev" heuristic — preferring native browser APIs, existing dependencies, and deleted code over new abstractions.

**Why now:** The repo is trending sharply this week (+4,755 stars), coinciding with broader developer conversation around Claude Code's agentic over-building behavior and the cost of unchecked token generation in multi-step sessions.

**Build with it:** Drop the npm package (`@dietrichgebert/ponytail`) into your Claude Code project and wire it as an agent skill or cursor rule to gate feature tasks — particularly useful on frontend tickets where agents default to installing libraries instead of using `<input type="date">`.

## 6. Tencent/WeKnora

https://github.com/Tencent/WeKnora · ★ 29294 (+4212 this week) · agent, agentic, ai, chatbot, dsh-plugin, embeddings, evaluation, generative-ai, golang, knowledge-base, llm, multi-tenant, ollama, openai, question-answering, rag, reranking, semantic-search, vector-search, wiki

**What it does:** WeKnora is a Go-based, self-hostable LLM knowledge platform that ingests documents from sources like Feishu, Notion, and GitLab, then exposes them via RAG Q&A, a ReAct agent with sandbox execution, and a Wiki mode that auto-generates interlinked markdown from raw uploads.

**Why now:** The repo spiked 4,212 stars this week alongside a v0.8.0 release that added the self-maintaining Wiki mode, knowledge-graph visualization, and chunk-level revision history with rollback — concrete new surface area rather than a routine patch.

**Build with it:** Wire your existing Ollama or LiteLLM endpoint into WeKnora's multi-instance storage backend, then use the scoped API keys with a principal model to expose a tenant-isolated RAG agent as an embedded website widget for internal tooling or customer-facing Q&A.

## 7. rocketride-org/rocketride-server <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/rocketride-org/rocketride-server · ★ 10385 (+1928 this week) · ai, cpp, data-pipeline, data-processing, machine-learning, mcp, python, sdk, typescript, vscode-extension

**What it does:** RocketRide is an open-source AI pipeline engine with a multithreaded C++ runtime, 100+ nodes covering 15+ LLM providers and 9 vector databases, visual pipeline editing via a VS Code extension, and portable JSON pipeline definitions deployable on your own infrastructure.

**Why now:** The project gained nearly 2,000 stars this week, coinciding with growing developer interest in self-hosted, vendor-lock-in-free alternatives to managed AI orchestration platforms and MCP-compatible tooling.

**Build with it:** Wire a retrieval-augmented generation pipeline by connecting a vector database node (Qdrant, Weaviate, etc.) to an LLM provider node in the VS Code extension, then expose it via the built-in MCP HTTP server using the Python or TypeScript SDK for integration into an existing agent workflow.

## 8. TencentCloud/Octop

https://github.com/TencentCloud/Octop · ★ 4734 (+1836 this week) · agent, agentic-ai, ai, ai-agent, ai-agents, local-first, long-term-memory

**What it does:** Octop is a self-hosted, multi-user AI assistant built on a multi-agent architecture with pluggable memory (harness-memory), RAG knowledge bases, MCP/OAuth connectors, and integrations for Telegram, DingTalk, Feishu, and WeCom — all running in a single process on your own machine.

**Why now:** The repo gained 1,836 stars this week, signaling a spike in community discovery likely tied to its v1.0.2b2 release and Trendshift ranking surge, making this a practical window to evaluate it before the ecosystem fragments into forks.

**Build with it:** Wire up the `octop acp` CLI to your IDE, configure MCP connectors for your existing tooling, and expose agents over the HTTP/SSE/WebSocket interface to drop persistent, memory-carrying agents into a team workflow without a managed backend.

## 9. XiaoDuoYa/codex-with-chatgpt <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/XiaoDuoYa/codex-with-chatgpt · ★ 6513 (+1736 this week) · ai-agents, chatgpt, codex, mcp, model-context-protocol, oauth

**What it does:** Bridges ChatGPT's web UI to OpenAI's Codex agent via an OAuth-protected, read-only MCP connection, so ChatGPT handles planning and code review while Codex executes — consuming web subscription quota instead of API tokens.

**Why now:** The 1,736-star spike this week coincides with rising complaints about Codex API token costs eating into budgets, making a no-API-key planning layer immediately practical for teams already paying for ChatGPT Plus or Pro.

**Build with it:** Drop the provided SKILL.md into `~/.codex/skills/codex-with-chatgpt/` and wire the `c2c setup` pairing flow into your existing Codex session to route all planning prompts through the ChatGPT connector without touching your API quota.

## 10. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 98665 (+3417 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** A collection of 25 slash-command skills (`/spec`, `/plan`, `/build`, `/test`, `/ship`, etc.) that encode senior-engineer workflows into AI coding agents, enforcing quality gates at each phase of the development lifecycle.

**Why now:** The repo gained 3,417 stars this week, coinciding with the launch of a companion `npx skills` CLI that distributes individual skills across 70+ agents including Claude Code, Cursor, Codex, and Copilot — making the workflow portable beyond any single tool.

**Build with it:** Drop `/build auto` into a Claude Code session to generate a spec-driven plan and run all tasks autonomously in a single approved pass, or install only the `test-driven-development` skill via `npx skills add addyosmani/agent-skills --skill test-driven-development` to enforce red-green-refactor on an existing project.
