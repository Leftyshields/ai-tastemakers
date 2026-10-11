# AI Tastemakers — Daily Brief — 2026-10-11

_Ranking: delta_7d · 10 repos · generated 2026-10-11T18:03:49.389Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 95997 (+90684 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, ctf, decompiler, developer-tools, disassembler, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, reverse-engineering, static-analysis

**What it does:** REA is a TypeScript MCP server (a protocol layer that connects AI agents to external tools) that hooks Claude, Codex, and similar agents into local reverse-engineering tools—Hopper, Ghidra, IDA, or static JS analysis—so they can inspect binaries, Electron apps, and .NET assemblies without source code.

**Why now:** The repo picked up roughly 90,000 stars in a single week, which is unusually fast movement and signals an active community forming around it right now.

**Build with it:** Run `npx rea-agents setup`, point it at an existing Hopper or Ghidra install, and wire the resulting MCP server into Claude Code to let your agent decompile and explain native binaries directly inside your workflow.

## 2. Orchestra-Research/AI-Research-SKILLs <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Orchestra-Research/AI-Research-SKILLs · ★ 13443 (+2694 this week) · ai, ai-research, claude, claude-code, claude-skills, codex, gemini, gpt-5, grpo, huggingface, machine-leanring, megatron, skills, vllm

**What it does:** Orchestra-Research/AI-Research-SKILLs is a 98-skill open-source library spanning 23 categories (ideation, fine-tuning, GRPO post-training, vLLM inference, mech interp, and more) that packages domain expertise so AI coding agents can autonomously run the full research lifecycle from idea to paper.

**Why now:** The repo gained 2,694 stars this week, coinciding with active community momentum on its Slack and coverage tied to agent-native tooling for Claude Code, Codex, and Gemini—frameworks builders are actively wiring into research workflows right now.

**Build with it:** Install `@orchestra-research/ai-research-skills` via npm, then pass the skill context to your Claude Code or Codex agent to let it autonomously orchestrate experiments using the `autoresearch` skill's two-loop architecture.

## 3. ConardLi/garden-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ConardLi/garden-skills · ★ 12823 (+2611 this week) · agent, claude, gpt-image-2, rag, skills, web-design

**What it does:** Garden Skills is a set of drop-in SKILL.md-spec agent instructions—structured config files that tell Claude Code, Cursor, or Codex how to handle a task—covering six production workflows: web video presentations, design engineering, GPT Image 2 generation, article rendering, motion showreels, and local knowledge retrieval.

**Why now:** The repo gained 2,611 stars this week, riding rapid adoption of Claude Code's native Skills system after Anthropic formalized the agent-skill spec at agentskills.io.

**Build with it:** Install a skill via `npx skills` into your Claude Code project, then prompt the agent to convert a product brief into a record-ready 1920×1080 Vite + React presentation using the `web-video-presentation` skill.

## 4. lexmount/moli

https://github.com/lexmount/moli · ★ 16306 (+9032 this week) · ai-agents, ai-tools, browser, browser-automation, cloud-browser, kitesurf, playwright, puppeteer, rust, servo, web-crawler, web-crawling, web-scraper, web-scraping

**What it does:** Moli is a headless browser built in Rust for AI agents that exposes web fetch, DOM extraction, and browser automation via CLI, CDP, WebDriver Classic, or WebDriver BiDi, using an on-demand layout model to keep resource use low.

**Why now:** The repo crossed 9,000 new stars this week, putting it among the fastest-trending Rust projects and in front of builders actively comparing headless browser options for agent pipelines.

**Build with it:** Point an AI agent at Moli's `skills/` directory to auto-install the binary, then wire `moli fetch --dump semantic_tree_text` into your agent's tool-call loop as a lighter, more structured alternative to Playwright or Puppeteer for web retrieval.

## 5. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 160971 (+6447 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent skill that injects a YAGNI-first "laziest senior dev" heuristic into AI coding agents, cutting code volume and token usage while increasing test coverage of risky logic.

**Why now:** The v5 release benchmarked a -53% code reduction and -45% token reduction across 39 real tasks in Claude Code using Opus 5.5, giving builders concrete numbers to check against their own workflows this week.

**Build with it:** Drop the `@dietrichgebert/ponytail` npm package into your Claude Code plugin config and run it against an existing FastAPI or React repo to verify the coverage and token claims on your own codebase.

## 6. lyogavin/airllm

https://github.com/lyogavin/airllm · ★ 36293 (+923 this week) · chinese-llm, chinese-nlp, finetune, generative-ai, instruct-gpt, instruction-set, llama, llm, lora, open-models, open-source, open-source-models, qlora

**What it does:** AirLLM streams model weights one layer at a time to run large language models—up to 2.8T parameters—on a single GPU with as little as 4GB VRAM, without quantization or pruning.

**Why now:** The repo added training support this month, enabling fine-tuning of a 125B model (Qwen3.8-Flash-Next) under 6GB VRAM on a single RTX 3060 Ti by streaming frozen weights layer-by-layer and keeping only adapters on the GPU.

**Build with it:** Install `airllm`, point it at a Hugging Face checkpoint, and use the built-in layer-streaming loader to run or fine-tune a 70B+ model on consumer hardware without changing your existing inference code.

## 7. K-Dense-AI/scientific-agent-skills

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 48387 (+815 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** Scientific Agent Skills is a library of 177 validated, procedural-knowledge skills—callable units following the open Agent Skills standard—that give Cursor, Claude Code, Codex, and compatible agents structured access to 100+ scientific databases spanning biology, chemistry, medicine, and drug discovery.

**Why now:** The repo gained 815 stars this week alongside the release of K-Dense BYOK, a free open-source desktop co-scientist that ships these skills pre-integrated and supports 40+ models via bring-your-own API keys.

**Build with it:** Drop the skills into a Claude Code or Cursor project as Agent Skills config files to give your coding agent immediate, tested access to genomics, proteomics, and cheminformatics data sources without writing custom API wrappers.

## 8. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 95868 (+5263 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents read and search access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu via MCP (a protocol layer connecting agents to external tools)—no API fees or manual scraper setup required.

**Why now:** The repo hit GitHub Trending #1 this week with nearly 96,000 total stars and 5,263 new stars in seven days, reflecting a sharp surge of builders wiring live internet access into local agent workflows.

**Build with it:** Point your MCP-compatible client—Claude Code, Cursor, or similar—at Agent Reach's CLI and query Twitter or Reddit inside an agent loop without touching a paid API.

## 9. can1357/oh-my-pi

https://github.com/can1357/oh-my-pi · ★ 35036 (+768 this week) · ai-agent, ai-coding-agent, anthropic, bun, claude, cli, coding-assistant, llm, mcp, multi-provider, openai, rust, terminal, tui, typescript

**What it does:** OMP is a terminal coding agent with a Rust core that bundles 60+ LLM providers, 31 built-in tools, and LSP and DAP support (language server and debugger adapter protocols) into a single CLI, eliminating the need to wire up external IDE integrations manually.

**Why now:** The repo gained 768 stars this week and PR contributions are temporarily open without the previous vouch requirement, making this a direct window to ship tool integrations or provider support.

**Build with it:** Install via `bun install -g @oh-my-pi/pi-coding-agent` and wire OMP into a project's CI step to run agent-driven edits using its built-in DAP ops for breakpoint-driven debugging context.

## 10. thesysdev/openui <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/thesysdev/openui · ★ 10713 (+734 this week) · ag-ui, agent, agents, ai, generative-ui, javascript, langchain, llm, mastra, react

**What it does:** OpenUI is a full-stack, framework-agnostic generative UI framework built around OpenUI Lang—a streaming-first output format that uses up to 67% fewer tokens than JSON—with first-party renderers for React, Vue, Svelte, and Angular.

**Why now:** The repo gained 734 stars this week and is trending on Trendshift, tracking closely with builder demand for structured LLM output that goes beyond plain text.

**Build with it:** Scaffold a working streaming chat app with `npx @openuidev/cli@latest create --name genui-chat-app`, drop in your OpenAI key, and get a live UI that renders model output progressively via OpenUI Lang.
