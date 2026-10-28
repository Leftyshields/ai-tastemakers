# AI Tastemakers — Daily Brief — 2026-10-28

_Ranking: delta_7d · 10 repos · generated 2026-10-28T18:51:04.479Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 401658 (+45681 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a Model Context Protocol (MCP) server, meaning it gives AI agents a standardized way to call external tools, pointed at reverse engineering: it lets agents inspect closed-source binaries, JavaScript/Electron apps, .NET assemblies, and websites using Ghidra, Hopper, and static analysis under the hood.

**Why now:** The repo picked up over 45,000 stars this week, a sharp signal that builders are actively experimenting with agent-driven reverse engineering workflows.

**Build with it:** Run `npx rea-agents setup` to wire REA into a compatible agent like Claude Code or Codex, then prompt it to inspect a closed-source app feature and return decompiled evidence you can port to your own codebase.

## 2. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 48762 (+15206 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency plugin for dsh (a shell-based AI coding environment) that exposes frontier models including DeepSeek V4.1 Flash and Kimi K3 for free, with no login, API key, or usage cap, routed through the OpenCode Zen and Kilo AI public gateways.

**Why now:** The repo gained over 15,000 stars this week and hit the top spot on both Trendshift's daily and JavaScript weekly charts, marking a fast adoption curve worth getting ahead of.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL to route free frontier-model calls without touching API credentials.

## 3. hypit-ai/hypit

https://github.com/hypit-ai/hypit · ★ 26219 (+1620 this week) · agentic-ai, ai, ai-agents, ai-video, compiler, dsl, ffmpeg, generative-ai, llm, markup-language, monorepo, plugin-system, programming-language, text-to-video, typescript, video, video-automation, video-clone, video-editing, video-generation

**What it does:** Hypit gives AI agents like Claude Code a markup language called SVML to describe video workflows anchored to words rather than timecodes, then compiles those workflows into finished videos with captions, B-roll, and effects via ffmpeg.

**Why now:** The repo crossed 26,000 stars this week and ranked as Trendshift's number-one TypeScript repository of the day, suggesting the window to build on it early is open right now.

**Build with it:** Drop a viral video into the CLI, let the agent generate the SVML workflow, then edit the word-anchored script to produce 100 caption or B-roll variants in one command.

## 4. Donchitos/Claude-Code-Game-Studios

https://github.com/Donchitos/Claude-Code-Game-Studios · ★ 28415 (+1364 this week) · ai-agents, ai-assisted-development, anthropic, claude, claude-code, game-design, game-development, gamedev, godot, indie-game-dev, unity, unreal-engine

**What it does:** Claude Code Game Studios wraps a single Claude Code session in a 49-agent studio hierarchy covering design, programming, art, audio, QA, and production, coordinated through 74 slash commands, 15 automated hooks, and 14 path-scoped coding rules.

**Why now:** The repo gained over 1,300 stars this week, driven by builder interest in structured multi-agent workflows inside Claude Code as teams push past single-agent limits.

**Build with it:** Drop the `.claude/` directory into an existing Godot or Unity project and run `/start` to let the producer and director agents scaffold a game design document and first sprint plan against your actual codebase.

## 5. coreyhaines31/marketingskills

https://github.com/coreyhaines31/marketingskills · ★ 57082 (+1283 this week) · agent-skills, ai-agents, ai-seo, claude, claude-code, claude-code-plugin, claude-skills, codex, content-marketing, conversion-rate-optimization, copywriting, cursor, email-marketing, generative-engine-optimization, growth-marketing, marketing, marketing-automation, saas-marketing, seo, skill-md

**What it does:** A collection of markdown skill files that give AI coding agents, including Claude Code, Cursor, Codex, and Windsurf, specialized workflows for CRO, copywriting, SEO, analytics, and growth engineering.

**Why now:** The repo crossed 57,000 total stars with 1,283 added this week, a meaningful spike signaling that agent-native marketing tooling is moving from niche to mainstream.

**Build with it:** Follow the `tools/SETUP.md` guided workflow to connect a marketing account with scoped credentials and run a first read-only result through your agent.

## 6. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 178978 (+7792 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript skill file for AI agents (Claude Code, Cursor, and others) that steers code generation toward YAGNI principles, reducing output volume, token usage, cost, and time while pushing test coverage toward risky logic.

**Why now:** The repo gained nearly 8,000 stars this week and sits on Trendshift's daily and weekly trending charts, making it one of the faster-moving agent tooling projects in the JavaScript ecosystem right now.

**Build with it:** Install `@dietrichgebert/ponytail` via npm, drop the skill into an existing Claude Code workflow, and run it against a real codebase to check whether it cuts generated code volume and raises test coverage for risky paths, as the README benchmarks claim.

## 7. rlaope/oh-my-hermes <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/rlaope/oh-my-hermes · ★ 4612 (+1089 this week) · agent, ai, ai-agent, ai-tools, claude-code, codex, hermes-agent, hermes-skill, skills

**What it does:** oh-my-hermes is an orchestration layer for Hermes Agent (a task-running AI agent framework) that categorizes each task into lanes like `ultrabrain`, `deep`, or `quick`, selects the right model chain per lane, and runs nodes in parallel via `/dag-ulw` graph execution.

**Why now:** The repo gained over 1,000 stars this week, reflecting a sharp jump in interest around Hermes Agent tooling as builders look for finer control over model routing and parallelism.

**Build with it:** Run `omh setup`, then invoke `/dag-ulw` on a real coding goal to watch the lane tree assign models and effort levels per node, and validate whether the category-to-model routing fits your stack before editing any chains.

## 8. sandbox-quantum/switch <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/sandbox-quantum/switch · ★ 1945 (+1033 this week) · agent-orchestration, ai, ai-agents, chatops, discord, langchain, mcp, microsoft-teams, multi-agent, open-source, openai, self-hosted, slack

**What it does:** Switch lets you self-host AI agents as named teammates inside Slack, Teams, Discord, Telegram, and Mattermost, where humans and agents share context from the same conversation thread.

**Why now:** The repo gained over 1,000 stars this week alongside a Product Hunt launch where it reached the number 1 product of the day, a combined signal of both developer and practitioner interest.

**Build with it:** Connect an existing LangChain or Claude Code agent to a Slack channel by registering it via Switch's agent protocol, then assign it a role and tool access to GitHub or Jira through the Switch Console desktop app.

## 9. agentscope-ai/agentscope <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/agentscope-ai/agentscope · ★ 34628 (+1032 this week) · agent, chatbot, large-language-models, llm, llm-agent, mcp, multi-agent, multi-modal, react-agent, realtime-agent, voice-agent, voice-assistant

**What it does:** AgentScope is a Python framework for building and running LLM agents that favors model reasoning and tool use over rigid prompt scaffolding or opinionated orchestration.

**Why now:** The repo gained over 1,000 stars this week, coinciding with a recently shipped experimental feature adding WebRTC-based realtime voice conversations that share session history with text interactions.

**Build with it:** Wire up the WebRTC voice session to an existing AgentScope agent to add a real-time voice interface without splitting conversation state between two separate systems.

## 10. milind-soni/OpenMausBot <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/milind-soni/OpenMausBot · ★ 6367 (+1021 this week) · ai-agents, claude-code, codex, computer-use, docker, electron, expo, grok, grok-bot, grok-bot-alternative, self-hosted, typescript

**What it does:** OpenMausBot is an Electron desktop app for Mac, Windows, and Ubuntu that gives each AI agent, Claude or Codex, its own sidebar contact, personality, model config, and sandboxed cloud computer, so you can chat with agents like teammates and approve their actions step by step.

**Why now:** The project gained over 1,000 stars this week, likely pulled along by the wave of agentic chat interfaces from xAI, Meta, OpenAI, and Manus launching in close succession.

**Build with it:** Download the signed .dmg or .exe, wire in your Claude or Codex API key, and test a bring-your-own-agent workflow where the bot executes tasks in its sandboxed VM while you approve steps from the chat sidebar.
