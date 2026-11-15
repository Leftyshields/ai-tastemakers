# AI Tastemakers — Daily Brief — 2026-11-15

_Ranking: delta_7d · 10 repos · generated 2026-11-15T20:17:30.354Z_


## 1. FareedKhan-dev/kimi-k3-in-c <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/FareedKhan-dev/kimi-k3-in-c · ★ 12134 (+3167 this week) · avx2, c99, cpu-inference, deep-learning, from-scratch, inference-engine, kimi-k3, linear-attention, llm, llm-inference, machine-learning, memory-efficient, mixture-of-experts, moe, mxfp4, quantization, simd, systems-programming, transformer, zero-dependencies

**What it does:** This C99 engine runs the full 2.78-trillion-parameter Kimi K3 model on a single CPU, streaming the 1.56 TB checkpoint off disk to stay within 8 GB of RAM, with no BLAS, GPU, or external dependencies.

**Why now:** The repo crossed 12,000 stars this week on the back of its v2.0.0 release, which added MXFP4 kernels, chat mode, cgroup-aware memory admission, and macOS/Windows ports, making it usable across all major platforms for the first time.

**Build with it:** Compile the 176 KB engine with the provided Makefile, then pipe any GGUF-format prompt through it on your laptop to validate CPU-only inference before committing to GPU infrastructure.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 461654 (+18408 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a tool that plugs into AI agent frameworks) that lets AI agents reverse engineer closed binaries, apps, and runtime behavior down to the native level, without source code.

**Why now:** The repo is gaining roughly 18,000 stars per week, a sharp spike that reflects growing builder interest in AI-assisted binary analysis workflows.

**Build with it:** Run `npx rea-agents setup` to wire REA into any MCP-compatible agent such as Claude Code, then point it at a shipped app feature you want to understand or replicate.

## 3. qybaihe/bla

https://github.com/qybaihe/bla · ★ 5786 (+2143 this week) · adversarial-ai, ai-security, android-security, binary-protection, claude-code, codex, cursor, electron-security, gguf, ghidra, llm-security, mcp, mcp-server, obfuscation, python-security, reverse-engineering, safetensors, software-protection, webassembly

**What it does:** BLA (Blind LLM Agents) is an open-source MCP server and CLI that hardens software artifacts including JS/TS, Electron ASAR, WASM, Python, SQLite, GGUF, Safetensors, and Android DEX against AI reverse-engineering by injecting deterministic resource ceilings, poison paths, and hallucination traps that exhaust LLM recon pipelines.

**Why now:** The repo hit GitHub's top-5 trending daily with 2,143 stars this week, coinciding with broader awareness of autonomous coding agents like Cursor, Claude Code, and Codex being repurposed for binary recon.

**Build with it:** Run `bla harden .` via the CLI or wire the 31-tool MCP server into an existing release pipeline to automatically apply protections across your build artifacts before shipping.

## 4. Jakeschincariol/day-trader-skill

https://github.com/Jakeschincariol/day-trader-skill · ★ 7977 (+1828 this week) · backtesting, claude, claude-skills, day-trading, stock-market

**What it does:** Eleven Claude skills for day trading that chain together, covering chart scanning, entry timing, position sizing, and a Time Machine feature that replays a setup 10,000 times against historical price bars before you risk real money.

**Why now:** The repo gained 1,828 stars this week, pointing to a surge in builder interest in Claude-native trading tooling as a distinct category.

**Build with it:** Paste any single `SKILL.md` into a Claude chat to run that skill as a standalone mode without Claude Code, letting you test the Time Machine backtest logic on a specific ticker before committing to the full install.

## 5. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 75680 (+9565 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency dsh plugin that exposes frontier models including DeepSeek V4.1 Flash and Kimi K3 through the OpenCode Zen and Kilo AI public gateways, requiring no login, API key, or configuration.

**Why now:** The repo hit the top of GitHub Trending for JavaScript this week (2026-10-05 to 2026-10-11), driven by nearly 10k new stars, signaling a surge in developer adoption around free, no-auth model access.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using the documented base URL and key to get free access to the full model roster without touching provider accounts.

## 6. ChenLiu-1996/figures4papers <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ChenLiu-1996/figures4papers · ★ 11781 (+1266 this week) · acl, cvpr, eccv, emnlp, figures, iccv, iclr, icml, llm, llm-skills, machine-learning, nature, nature-machine-intelligence, neurips, python, scientific-figure, skill, skills

**What it does:** A collection of Python scripts by Yale PhD candidate Chen Liu for generating publication-quality figures, including bar plots, radar plots, 3D spheres, and trend lines, used in papers at NeurIPS, ICML, ECCV, and Nature Machine Intelligence.

**Why now:** The repo gained 1,266 stars this week, a spike that lines up with conference submission season and growing interest in reproducible figure tooling.

**Build with it:** Drop the `scientific-figure-making/` skill folder into a Cursor or Claude Code workspace and reference `SKILL.md` in your prompts to generate paper-ready figures without writing matplotlib boilerplate from scratch.

## 7. ccch1mneyyy/dsh-Go

https://github.com/ccch1mneyyy/dsh-Go · ★ 23698 (+7744 this week) · ai-agent, android, android-app, coding-agent, deepseek, deepseek-harness, dsh, dsh-plugin, dsh-tui, flutter, llm

**What it does:** DSH Go is an Android client (Flutter/Dart, Android 8 and up) that runs DeepSeek Harness locally on a phone or remotely controls a desktop DSH instance, with animated on-screen pets that reflect agent state such as typing, done, or waiting for confirmation.

**Why now:** The repo gained 7,744 stars this week and landed at Trendshift's number-one daily spot across all languages on 2026-10-30, a sharp jump in attention for mobile-first agent interfaces.

**Build with it:** Sideload the arm64 APK from GitHub Releases, point it at an existing desktop DSH session, and use the DSH plugin surface to pipe mobile-triggered confirmations into your current coding-agent workflow.

## 8. kajisho5/ffmpeg-skill

https://github.com/kajisho5/ffmpeg-skill · ★ 5931 (+1117 this week) · agent-skills, ai-agents, audio-processing, captions, claude-code, codex, coding-agent, cursor, ffmpeg, gemini-cli-extension, loudness-normalization, mcp, mcp-server, model-context-protocol, python, subtitles, transcoding, video, video-editing, whisper

**What it does:** ffmpeg-skill gives coding agents like Claude Code, Cursor, and Codex a local video editor by exposing 42 FFmpeg operations, covering cut, captions, reframe, loudness, and platform delivery checks, through a machine-readable `SKILL.md` contract and an MCP server with no cloud or API keys required.

**Why now:** The repo gained over 1,100 stars this week, coinciding with growing adoption of agent skill patterns and MCP servers as the standard way to extend coding agents with external tool access.

**Build with it:** Point your MCP client at the server via `npx ffmpeg-skill`, then issue natural-language edit requests against local footage to exercise the probe-to-check workflow end to end.

## 9. obsidianmd/obsidian-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/obsidianmd/obsidian-skills · ★ 52797 (+1099 this week) · agents, agentskills, bases, chatgpt, claude, claude-code, claude-skills, cli, codex, defuddle, grok-bot, hermes, jsoncanvas, knap, markdown, md, obsidian, openclaw, opencode, skills

**What it does:** obsidian-skills packages Agent Skills-spec-compatible files that teach Claude Code, Codex, OpenCode, and Cursor how to read and write Obsidian formats including Flavored Markdown, Bases, and JSON Canvas via the Obsidian CLI.

**Why now:** The repo gained over 1,000 stars this week, reflecting a rise in developer interest around agentic workflows tied to Obsidian knowledge vaults.

**Build with it:** Run `npx skills add https://github.com/obsidianmd/obsidian-skills` in your vault root, then prompt Claude Code to generate or update `.base` files using the obsidian-bases skill.

## 10. Ryze-AI-Adgent/open-seo-mcp-skills

https://github.com/Ryze-AI-Adgent/open-seo-mcp-skills · ★ 9959 (+1000 this week) · ai-seo, ai-visibility, backlinks, claude, claude-code, claude-skills, dataforseo, generative-engine-optimization, geo, geo-mcp, keyword-research, llm-seo, mcp, mcp-server, open-source-seo, rank-tracking, seo, seo-audit, seo-mcp, seo-mcp-server

**What it does:** Open-source SEO and GEO (generative engine optimization, tracking visibility in AI-generated answers) skills for Claude that pull real rankings from Google Search Console, real traffic from GA4 including AI referrers like ChatGPT and Perplexity, and competitor and backlink data from DataForSEO through the Ryze MCP connector, with no markup on API calls.

**Why now:** The repo gained 1,000 stars this week at a moment when AI-referral tracking is moving from buzzword to a measurable workflow that marketing and engineering teams need to actually instrument.

**Build with it:** Run `claude plugin marketplace add Ryze-AI-Adgent/open-seo-mcp-skills` inside Claude Code, connect your GSC and GA4 accounts once via the Ryze connector, and invoke the `ai-visibility` skill to get a concrete breakdown of which AI engines send your site traffic and which pages they cite.
