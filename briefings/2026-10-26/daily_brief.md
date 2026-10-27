# AI Tastemakers — Daily Brief — 2026-10-26

_Ranking: delta_7d · 10 repos · generated 2026-10-26T19:17:14.013Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 390678 (+72277 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a Model Context Protocol (MCP) server that connects AI agents to reverse-engineering tools for native binaries, JavaScript and Electron apps, .NET assemblies, and websites without source code, using decompilers like Ghidra and Hopper.

**Why now:** The repo gained over 72,000 stars this week, a pace that suggests the ecosystem around agent-driven reverse engineering is forming fast.

**Build with it:** Run `npx rea-agents setup` to register the MCP server with your agent (Claude Code, Codex, or similar), then prompt it to reverse-engineer a closed app feature and return a working reimplementation in your codebase.

## 2. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 103312 (+4350 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent-Reach is a Python CLI that lets AI agents read and search Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu without API fees or login walls, returning clean structured data.

**Why now:** The repo hit GitHub Trending number one this week, gaining over 4,350 stars in seven days across agent-tooling builders.

**Build with it:** Wire it into a Cursor or Claude Code session via its MCP integration to give your coding agent live web context during research or debugging tasks.

## 3. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 44724 (+20286 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency dsh plugin that exposes frontier models including DeepSeek V4.1 Flash and Kimi K3 with no login, API key, or usage cap, via the OpenCode Zen and Kilo AI public gateways.

**Why now:** The repo gained over 20,000 stars this week and hit the top spot on both Trendshift's daily and JavaScript weekly charts.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL to route free model calls without touching your own API credentials.

## 4. thesysdev/openui

https://github.com/thesysdev/openui · ★ 14162 (+2451 this week) · ag-ui, agent, agents, ai, generative-ui, javascript, langchain, llm, mastra, react

**What it does:** OpenUI is a full-stack, framework-agnostic generative UI framework built around OpenUI Lang, a streaming-first language that lets React, Vue, Svelte, and Angular renderers parse and display model output progressively as tokens arrive.

**Why now:** The repo gained 2,451 stars this week, placing it on Trendshift's trending list and marking a sharp spike in builder attention.

**Build with it:** Run `npx @openuidev/cli@latest create --name genui-chat-app` to scaffold a working chat app with OpenUI Lang support, library-driven prompt generation, and a streaming renderer already wired together.

## 5. K-Dense-AI/scientific-agent-skills

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 54753 (+2146 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** Scientific Agent Skills is a Python library of 177 validated, procedural skills for AI agents covering biology, chemistry, medicine, physics, and drug discovery, with connectors to 100+ scientific databases.

**Why now:** The repo gained 2,146 stars this week and recently rebranded from Claude-specific to the open Agent Skills standard, making the library compatible with Cursor, Codex, and other agents beyond Claude Code.

**Build with it:** Drop the skills into a Cursor or Claude Code project via the Agent Skills config surface to give your coding agent direct, structured access to genomics and cheminformatics databases without writing custom API wrappers.

## 6. JetBrains/thinkrail <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/JetBrains/thinkrail · ★ 2668 (+1916 this week) · agent, agent-skills, agentic-ai, agentic-workflow, ai-coding, ai-tools, pi-agent, pi-agent-extension, spec-driven, spec-driven-coding, spec-driven-development, vibe-coding, vibecoding

**What it does:** ThinkRail is a JetBrains agentic IDE that wraps the `pi` coding agent in isolated git-worktree workspaces, persists project knowledge through living specs and reusable skills, and manages the full GitHub PR lifecycle from branch to merge.

**Why now:** The repo gained nearly 1,900 stars in a single week, making it a conversation worth joining before conventions solidify.

**Build with it:** Clone a repo, open it as a ThinkRail project, and cut a worktree workspace to let `pi` run an isolated agent session against a real branch without touching your main checkout.

## 7. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 176967 (+10171 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent skill that steers AI coding agents toward minimal, YAGNI-compliant output, replacing verbose generated code with the least code that actually works.

**Why now:** The repo gained over 10,000 stars this week, driven by teams already running Claude Code and Cursor-based workflows who want tighter output control.

**Build with it:** Drop the skill into an existing Claude Code setup and run it against a real feature branch to measure whether risky logic ships with tests, using the benchmark approach the README documents.

## 8. lyogavin/airllm

https://github.com/lyogavin/airllm · ★ 40756 (+1451 this week) · chinese-llm, chinese-nlp, finetune, generative-ai, instruct-gpt, instruction-set, llama, llm, lora, open-models, open-source, open-source-models, qlora

**What it does:** AirLLM streams model layers from disk one at a time during inference, letting you run models up to 2.8T parameters (Kimi K3) on a single GPU with under 4GB of VRAM, no quantization required.

**Why now:** The repo gained 1,451 stars this week, coinciding with freshly added training support that streams frozen weights layer by layer while keeping LoRA adapters on-GPU, enabling fine-tuning of a 125B model on an RTX 3060 Ti under 6GB.

**Build with it:** Drop in `AutoModelForCausalLM` from `airllm` in place of the standard HuggingFace loader, point it at a local or Hub checkpoint, and run inference or LoRA fine-tuning on hardware you already own.

## 9. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 135989 (+7797 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphify, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify parses any codebase, including docs, SQL schemas, configs, and PDFs, into a queryable knowledge graph using local deterministic AST parsing via tree-sitter, with every edge explained and no vector store required.

**Why now:** The repo gained roughly 7,800 stars this week, driven by its positioning as a native `/graphify` skill for Claude Code, Cursor, Codex, and Gemini CLI at a moment when agentic coding tools are the default workflow for many developers.

**Build with it:** Install the `graphifyy` PyPI package and wire it as an MCP skill inside your existing Claude Code or Cursor config to give the agent structured, graph-backed answers about your codebase instead of raw retrieval.

## 10. kajisho5/ffmpeg-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/kajisho5/ffmpeg-skill · ★ 3023 (+1036 this week) · agent-skills, ai-agents, audio-processing, captions, claude-code, codex, coding-agent, cursor, ffmpeg, loudness-normalization, mcp, mcp-server, model-context-protocol, python, subtitles, transcoding, video, video-editing, video-processing, whisper

**What it does:** ffmpeg-skill gives coding agents (Claude Code, Cursor, Codex, or any MCP client) a set of 42 local FFmpeg tools covering cuts, captions, reframing, loudness normalization, and platform delivery checks, with no cloud upload required.

**Why now:** The repo gained over 1,000 stars this week, aligned with the current wave of agent-native tooling built around MCP servers.

**Build with it:** Point any MCP client at the server with `npx ffmpeg-skill` and invoke the default 12 advertised tools, or set `FFMPEG_SKILL_MCP_FULL=1` to unlock all 42 and let your agent handle silence removal or aspect-ratio reframing directly from a chat prompt.
