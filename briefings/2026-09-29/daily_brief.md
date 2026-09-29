# AI Tastemakers — Daily Brief — 2026-09-29

_Ranking: delta_7d · 10 repos · generated 2026-09-29T18:38:12.848Z_


## 1. VectifyAI/PageIndex <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/VectifyAI/PageIndex · ★ 37136 (+1331 this week) · agentic-ai, agents, ai, ai-agents, context-engineering, information-retrieval, llm, rag, reasoning, retrieval, retrieval-augmented-generation, vector-database

**What it does:** PageIndex replaces vector databases with a hierarchical tree index that an LLM reasons over to retrieve document sections, skipping chunking and embedding entirely.

**Why now:** The repo gained 1,331 stars this week alongside the release of PageIndex Flash, a faster tree-index generation method now shipped as the default in `pip install -U pageindex` local mode.

**Build with it:** Point `pageindex` in local mode at a financial report or legal PDF, supply your own LLM API key, and validate whether tree-based retrieval surfaces relevant passages that your current vector pipeline misses.

## 2. rocketride-org/rocketride-server

https://github.com/rocketride-org/rocketride-server · ★ 17691 (+8278 this week) · ai, cpp, data-pipeline, data-processing, machine-learning, mcp, python, sdk, typescript, vscode-extension

**What it does:** RocketRide is an open-source AI pipeline runtime with a multithreaded C++ core that connects 100+ nodes across 15+ LLM providers, 9 vector databases, OCR, and NER — defined as portable JSON and built visually inside VS Code.

**Why now:** The repo gained 8,278 stars this week, signaling a sharp spike in builder attention that makes it worth evaluating before the ecosystem around it solidifies.

**Build with it:** Install the VS Code extension, wire a pipeline JSON using the visual node editor, and point it at a local LLM provider to run a multimodal search workflow on your own infrastructure.

## 3. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 61151 (+5908 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, from-scratch, generative-ai, llm, machine-learning, mcp, nlp, python, reinforcement-learning, rust, swarm-intelligence, transformers, tutorial, typescript

**What it does:** A 523-lesson, 20-phase open curriculum (~342 hours) that teaches AI engineering by having you ship a reusable artifact—prompt, skill, agent, or MCP server—in every lesson, across Python, TypeScript, Rust, and Julia.

**Why now:** The repo gained nearly 6,000 stars this week, signaling a surge of builder interest that makes community-sourced lesson PRs and issue discussions unusually active right now.

**Build with it:** Fork the repo, start at Phase 14 (Agent Engineering), and follow the MCP server lessons to wire a working tool-using agent you can deploy against your own APIs.

## 4. mnfst/awesome-free-llm-apis <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/mnfst/awesome-free-llm-apis · ★ 8648 (+885 this week) · ai-agents, anthropic, awesome, awesome-list, gemini, llm, llm-router, llm-routing, ollama, openai, openclaw, openclaw-plugin, router

**What it does:** A curated list of LLM APIs with permanent free tiers (no credit card required), covering providers like Google Gemini, Cohere, and Aion Labs, all exposing OpenAI SDK-compatible endpoints.

**Why now:** The repo gained 885 stars this week, reflecting a spike in builder interest likely tied to tightening free-tier policies elsewhere pushing developers to catalog alternatives.

**Build with it:** Swap your OpenAI SDK base URL to one of the listed provider endpoints—such as `https://generativelanguage.googleapis.com/v1beta` for Gemini—to prototype agents at zero cost without touching your existing client code.

## 5. Ryze-AI-Adgent/open-seo-mcp-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Ryze-AI-Adgent/open-seo-mcp-skills · ★ 2913 (+860 this week) · ai-seo, ai-visibility, backlinks, claude, claude-code, claude-skills, dataforseo, generative-engine-optimization, geo, geo-mcp, keyword-research, llm-seo, mcp, mcp-server, open-source-seo, rank-tracking, seo, seo-audit, seo-mcp, seo-mcp-server

**What it does:** An MIT-licensed Claude plugin that wires keyword research, rank tracking, site audits, backlink analysis, and AI-referral visibility directly to your own GSC, GA4, and Google Ads data via the Ryze MCP connector, with DataForSEO handling competitor and SERP data at cost with no markup.

**Why now:** The repo gained 860 stars this week, coinciding with rising builder interest in MCP-based tooling and the `claude plugin marketplace` surface becoming a practical distribution channel for Claude Code extensions.

**Build with it:** Run `claude plugin marketplace add Ryze-AI-Adgent/open-seo-mcp-skills` inside Claude Code, connect your Search Console account once through the Ryze connector, then use the `seo-vs-ads` skill to immediately surface queries you're paying for in Google Ads that you already rank for organically.

## 6. helloianneo/ian-xiaohei-illustrations

https://github.com/helloianneo/ian-xiaohei-illustrations · ★ 12223 (+5474 this week) · ai-agent, chinese, codex-skill, handdrawn, illustration, image-generation, xiaohei

**What it does:** Ian Xiaohei Illustrations is a Codex Skill that analyzes Chinese-language articles and generates 16:9 hand-drawn inline illustrations featuring "Xiaohei," a minimalist black character, turning abstract judgments, workflows, and metaphors into annotated PNG images saved to a local `assets/` directory.

**Why now:** The repo gained over 5,400 stars this week, signaling rapid community pickup among Chinese-language knowledge creators looking for a repeatable visual language beyond generic PPT-style diagrams.

**Build with it:** Drop the `ian-xiaohei-illustrations/` skill folder into your Codex skills directory and invoke `Use $ian-xiaohei-illustrations` on a pasted Chinese article to produce a ready-to-review shot list before committing to any image generation.

## 7. ruvnet/RuView

https://github.com/ruvnet/RuView · ★ 95506 (+758 this week) · awesome, claude, densepose, esp32, firmware, home-assistant, home-automation, iot, monitoring, networking, npm, pose-estimation, react, rf, self-learning, skills, spatial-intelligence, typescript, wifi, wifi-security

**What it does:** RuView uses CSI data from ESP32 sensors to detect presence, measure breathing and heart rate, estimate body pose, and classify activity — through walls, without cameras or wearables.

**Why now:** The repo gained 758 stars this week, signaling a current spike in builder attention around WiFi-based sensing as a privacy-preserving alternative to camera systems.

**Build with it:** Run RuView with the `--mqtt` flag against an existing Home Assistant install to immediately surface its 21 per-node entities — including occupancy, breathing rate, and sleep state — in HA automations via the built-in HA-DISCO MQTT publisher.

## 8. EverMind-AI/Raven <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/EverMind-AI/Raven · ★ 4751 (+729 this week) · ai, ai-agents, anthropic, chatgpt, claude, codex, evermind, hermes, hermes-agent, llm, openai, openclaw, openhuman, recursive-self-improvement, rsi, rsi-ai, self-evolving, self-improving

**What it does:** Raven is a Host Agent that generates DAGs and orchestrates built-in specialized agents (Research, Code, Design, Oncall) across sessions, with a modular architecture designed for recursive self-improvement of its own planning and execution harness.

**Why now:** The repo hit 4,751 stars with 729 added this week, coinciding with the release of its technical report and a documented 4-day autonomous run that produced a complete Godot 4 FPS game through 42 self-directed planning and verification cycles.

**Build with it:** Clone the repo, wire in your own third-party agent via EverOS's agent interface, and validate it by assigning a multi-step task to see how Raven decomposes it into a DAG and delegates sub-tasks.

## 9. router-for-me/CLIProxyAPI

https://github.com/router-for-me/CLIProxyAPI · ★ 53539 (+696 this week) · antigravity, claude-code, cluade, codex, devin, gemini, muse, openai

**What it does:** CLIProxyAPI is a Go proxy server that exposes OpenAI-, Gemini-, and Claude-compatible API endpoints for CLI tools like Claude Code, Codex, and Grok Build, letting you route requests through multiple provider accounts locally.

**Why now:** The repo gained 696 stars this week alongside the README highlighting Kimi K3—a newly launched 2.8-trillion-parameter model with a 1-million-token context window—as a supported backend.

**Build with it:** Point an existing OpenAI-compatible SDK or client at the local proxy endpoint and swap `OPENAI_BASE_URL` to `http://localhost:{port}` to route Claude Code or Codex sessions through Kimi K3 or Gemini 3.5 Flash without changing application code.

## 10. OpenHands/OpenHands <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/OpenHands/OpenHands · ★ 89525 (+683 this week) · agent, artificial-intelligence, chatgpt, claude-ai, cli, developer-tools, gpt, llm, openai

**What it does:** OpenHands Agent Canvas is a self-hosted developer control center that lets you run and orchestrate coding agents (OpenHands, Claude Code, Codex, Gemini, or any ACP-compatible agent) across local, Docker, VM, or cloud backends with built-in automation support for workflows like Slack reporting and GitHub issue decomposition.

**Why now:** The repo gained 683 stars this week and shipped the Agent Canvas layer — now listed as beta — which surfaces multi-backend switching and prebuilt automations as first-class features rather than experimental add-ons.

**Build with it:** Wire an ACP-compatible agent to an existing GitHub repo via the automations config, then set a trigger to auto-decompose new issues into tasks — validating the orchestration layer without standing up cloud infrastructure.
