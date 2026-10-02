# AI Tastemakers — Daily Brief — 2026-10-02

_Ranking: delta_7d · 10 repos · generated 2026-10-02T18:23:59.751Z_


## 1. FareedKhan-dev/train-llm-from-scratch

https://github.com/FareedKhan-dev/train-llm-from-scratch · ★ 11919 (+2297 this week) · gemini, large-language-models, llm, openai, training, transformers

**What it does:** A pure-PyTorch implementation that walks from raw text through tokenization, transformer pretraining, SFT, reward modeling, and GRPO-style RL alignment — no `trl`, `peft`, or `transformers` library required.

**Why now:** The repo gained 2,297 stars this week, indicating a surge of builder interest likely tied to ongoing demand for hands-on GRPO and reasoning-model training tutorials that skip abstraction libraries.

**Build with it:** Swap in your own text corpus at the data-prep step and run the pretraining script on a laptop CPU to produce a small base model, then apply the included LoRA and DPO scripts to fine-tune it into an instruction-following assistant.

## 2. harry0703/MoneyPrinterTurbo

https://github.com/harry0703/MoneyPrinterTurbo · ★ 128054 (+2286 this week) · ai-video-generator, content-creation, ffmpeg, instagram-reels, llm, python, short-video, subtitles, text-to-speech, tiktok, video-automation, video-workflow, workflow-automation, youtube-shorts

**What it does:** MoneyPrinterTurbo takes a topic or keyword and runs an automated Python pipeline — LLM script generation, stock footage matching, subtitle creation, TTS, and FFmpeg compositing — to produce a finished short video.

**Why now:** The repo gained 2,286 stars this week and recently added Kimi K3 as a supported LLM, making it a concrete test case for evaluating new frontier models on end-to-end video generation tasks.

**Build with it:** Point the API endpoint at your own LLM key (OpenAI-compatible), POST a topic string, and retrieve a rendered MP4 — validating the full generation pipeline without touching the WebUI.

## 3. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 108980 (+1147 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a prompt-engineering skill and proxy that rewrites AI coding agent prompts into stripped-down, telegraphic language to cut token usage by ~65% without measurable quality loss.

**Why now:** A JetBrains study of 86 real coding tasks and an Adobe Research paper (CAVEWOMAN, arXiv 2606.24083) both published findings confirming the cost reduction is real, lending credibility to what started as a meme.

**Build with it:** Run `npx skills add JuliusBrussee/caveman -g` to install the skill globally and apply it to any compatible coding agent via its native wrap profiles.

## 4. rocketride-org/rocketride-server

https://github.com/rocketride-org/rocketride-server · ★ 17973 (+5878 this week) · ai, cpp, data-pipeline, data-processing, machine-learning, mcp, python, sdk, typescript, vscode-extension

**What it does:** RocketRide is an open-source AI pipeline builder with a multithreaded C++ runtime that executes portable JSON-defined pipelines across 100+ nodes covering 15+ LLM providers, 9 vector databases, OCR, and NER — all orchestrated from a VS Code extension or CLI.

**Why now:** The repo gained nearly 6,000 stars this week, signaling a sharp spike in builder attention that makes it worth evaluating before the ecosystem consolidates around it.

**Build with it:** Install the VS Code extension, define a multimodal retrieval pipeline in JSON using a vector database node and an LLM provider node, and run it locally against your own infrastructure via the CLI to validate latency before any cloud commitment.

## 5. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 151454 (+5560 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a skill/prompt layer for AI coding agents (Claude Code, Cursor, and 19 others) that enforces a YAGNI-first coding style — cutting generated code by ~54% on average by making the agent reach for the simplest native solution instead of installing libraries or over-building.

**Why now:** The repo hit Trendshift's daily and weekly trending charts this week with 5,560 new stars, signaling a surge of developers frustrated with agents that gold-plate simple tasks.

**Build with it:** Drop the ponytail skill into your Claude Code setup and run it against an existing feature branch to see how many dependencies or wrapper components it eliminates before you ship.

## 6. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 62637 (+5329 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, from-scratch, generative-ai, llm, machine-learning, mcp, nlp, python, reinforcement-learning, rust, swarm-intelligence, transformers, tutorial, typescript

**What it does:** A 523-lesson, 20-phase open curriculum (Python, TypeScript, Rust, Julia) that teaches AI engineering by shipping a reusable artifact—prompt, agent, or MCP server—at the end of every lesson.

**Why now:** The repo gained 5,329 stars this week, placing it among the fastest-moving AI education resources on GitHub at a moment when MCP tooling and agent frameworks are actively being standardized.

**Build with it:** Start at Phase 11 (LLM Engineering) and follow the prompt-engineering lesson to produce a reusable prompt artifact you can drop directly into your existing Python project.

## 7. irinabuht12-oss/google-ads-meta-ads-mcp <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/irinabuht12-oss/google-ads-meta-ads-mcp · ★ 3351 (+698 this week) · advertising, chatgpt, claude, cursor, facebook-ads, facebook-ads-mcp, ga4, google-ads, google-ads-mcp, google-ads-mcp-server, google-analytics, google-analytics-mcp, mcp, mcp-server, meta-ads, meta-ads-mcp, meta-ads-mcp-server, model-context-protocol, n8n, remote-mcp

**What it does:** A hosted remote MCP server that exposes Google Ads, Meta Ads (Facebook/Instagram), GA4, and Search Console as 250+ tools — accessible via OAuth login with no API keys or developer tokens required.

**Why now:** The repo gained 698 stars this week, coinciding with broad builder interest in remote MCP endpoints now that Claude, ChatGPT, and Cursor all support custom connector URLs natively.

**Build with it:** Add the server to Claude Desktop or Cursor by pasting `https://connector.get-ryze.ai/mcp` into Settings › Connectors, then prompt your way through a cross-platform campaign audit without touching the Google Ads or Meta dashboards.

## 8. shanraisshan/claude-code-best-practice

https://github.com/shanraisshan/claude-code-best-practice · ★ 66998 (+647 this week) · agentic-ai, agentic-coding, agentic-engineering, agentic-workflow, ai, ai-agents, anthropic, best-practices, boris, claude, claude-ai, claude-code, claude-code-agents, claude-code-best-practices, claude-code-commands, claude-code-skills, context-engineering, pakistan, pakistani-developer, vibe-coding

**What it does:** A structured reference repo covering Claude Code's core primitives — subagents (`.claude/agents/`), commands (`.claude/commands/`), skills (`.claude/skills/`), hooks, and orchestration workflows — with best-practice guides and working implementations for each.

**Why now:** The repo hit GitHub Trending #1 this week with 67k stars and 647 added in seven days, signaling a spike in developer interest around agentic Claude Code patterns.

**Build with it:** Drop the provided `.claude/commands/weather-orchestrator.md` into an existing project as a concrete starting point for wiring a multi-step orchestration workflow inside Claude Code.

## 9. tradecatlabs/vibe-coding-cn <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/tradecatlabs/vibe-coding-cn · ★ 17028 (+646 this week) · ai, ai-agent, ai-agents, ai-coding, ai-programming, chinese, claude-code, codex, cursor, developer-tools, gemini-cli, glue-coding, prompt-engineering, prompts, skills, tutorial, vibe-coding, workflow

**What it does:** A Chinese-language guide and toolkit for AI pair-programming workflows, covering prompt engineering, skill libraries, context management, and quality gates from idea to shipped product using tools like Cursor, Claude Code, and Codex.

**Why now:** The repo gained 646 stars this week as Gemini CLI and Codex both landed as listed topics, signaling active alignment with the current wave of terminal-native AI coding agents.

**Build with it:** Drop the prebuilt Codex config from `tools/config/.codex/` into your project to get a structured vibe-coding workflow with context constraints and quality gates already wired.

## 10. yb2460/harness-anything <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/yb2460/harness-anything · ★ 2154 (+627 this week) · ai-agent, automation, cli, cli-anything, com, office, python, windows, wps

**What it does:** A Python CLI toolkit that drives WPS/MS Office, Adobe Illustrator, Photoshop, and Zotero over Windows COM automation — 47 office commands, 27 academic research skills, and vector/raster editing all scriptable from an AI agent loop.

**Why now:** The repo gained 627 stars this week, signaling a surge of builder interest likely tied to growing demand for local, COM-based desktop automation as an alternative to cloud API-dependent office integrations.

**Build with it:** Wire `cli-anything-zotero skills pipeline meta_analysis` into an LLM agent's tool-call layer to automate the full literature-to-draft workflow using Zotero's 27 academic skills as discrete, callable steps.
