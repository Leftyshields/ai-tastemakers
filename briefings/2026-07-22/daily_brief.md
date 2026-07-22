# AI Tastemakers — Daily Brief — 2026-07-22

_Ranking: delta_7d · 10 repos · generated 2026-07-22T15:16:49.622Z_


## 1. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 17095 (+16087 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source Chinese book (with English, Russian, Vietnamese, and Tamil translations) covering AI Agent design and engineering across 10 chapters, backed by 92 runnable code experiments spanning RAG, MCP, multi-agent systems, context engineering, and reinforcement learning.

**Why now:** It gained 16,087 stars this week alone, signaling a massive surge in developer demand for structured, practical AI Agent education at exactly the moment agentic frameworks are maturing into production tooling.

**Build with it:** Fork the chapter-aligned code experiments to rapidly prototype agents with real memory, tool use, and multi-agent coordination — or use the context engineering and RAG chapters as a blueprint to architect production-grade retrieval and state management into your own LLM applications.

## 2. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 24615 (+7007 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is an open-source TypeScript gateway that exposes 268+ AI providers and 500+ models through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression that cuts usage by 15–95%.

**Why now:** The project gained 7,007 stars this week, signaling a surge of developer interest likely tied to rising API costs and the proliferation of tools like Claude Code, Codex, and Cursor that each consume separate quotas.

**Build with it:** Point any OpenAI-compatible tool at OmniRoute's endpoint to get free-tier stacking across 50+ providers (~1.53B tokens/month documented), then add fallback chains so your coding agent never stops mid-task when one provider rate-limits you.

## 3. koala73/worldmonitor

https://github.com/koala73/worldmonitor · ★ 67986 (+6099 this week) · agent, ai, dashboard, geopolitics, mcp, mcp-server, monitoring, news, opensource, osint, palantir, situation

**What it does:** World Monitor is an open-source TypeScript dashboard that aggregates real-time news, geopolitical events, and infrastructure signals into a unified situational awareness interface, with an MCP server for AI agent integration and SDKs in Python, Go, Ruby, and Node.

**Why now:** The project gained 6,099 stars this week, signaling strong builder interest in AI-powered OSINT tooling at a moment when geopolitical volatility and agent-based workflows are both accelerating.

**Build with it:** Use the MCP server to plug live geopolitical and infrastructure event streams directly into an AI agent, or fork one of the thematic variants (finance, energy, commodity) as a starting point for a domain-specific monitoring product with its own data sources and alert logic.

## 4. lidge-jun/opencodex <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/lidge-jun/opencodex · ★ 3370 (+2993 this week) · ai-gateway, ai-tools, anthropic, chatgpt, claude, claude-code, codex, codex-cli, deepseek, developer-tools, gemini, grok, kiro, llm, llm-proxy, ollama, openai, openrouter, proxy, typescript

**What it does:** opencodex is a local TypeScript proxy that translates OpenAI's Responses API into the format required by any LLM provider, letting you run Codex CLI, the Codex app, and Claude Code against Claude, Gemini, Grok, DeepSeek, Ollama, or any other backend without modifying the clients themselves.

**Why now:** It gained nearly 3,000 stars this week, likely driven by developers frustrated with Codex CLI's locked provider model and looking for a drop-in escape hatch as competing models catch up to or surpass GPT-4o on coding benchmarks.

**Build with it:** Point your Codex CLI at localhost:10100 and wire it to a self-hosted Ollama instance for a fully local, zero-cost coding agent, or build a multi-tenant dev tool that routes different team members to different LLM backends based on cost or capability without touching any client-side code.

## 5. tirth8205/code-review-graph

https://github.com/tirth8205/code-review-graph · ★ 25128 (+5640 this week) · ai-coding, claude, claude-code, code-review, graphrag, incremental, knowledge-graph, llm, mcp, python, static-analysis, tree-sitter

**What it does:** code-review-graph builds a persistent structural map of your codebase using Tree-sitter, then serves precise, change-aware context to AI coding tools via MCP so they pull only the relevant code instead of re-reading everything on every review.

**Why now:** The project gained 5,640 stars this week, signaling a wave of developer adoption, and its benchmarked 38x–528x token reductions across real repositories make it immediately practical for teams hitting context limits or API cost ceilings.

**Build with it:** Wire it into a CI pipeline using its GitHub Action to auto-generate scoped review context on every PR, or expose its MCP server as a shared service so multiple AI agents in a monorepo workflow each query only their relevant subgraph.

## 6. op7418/guizang-ppt-skill

https://github.com/op7418/guizang-ppt-skill · ★ 22100 (+2445 this week) · ai-agent, claude-code, codex, html-deck, image-generation, ppt, presentation, skill, skills, swiss-design, web-ppt

**What it does:** Guizang PPT Skill is an AI-agent skill for Claude Code and Codex that generates self-contained single-file HTML slide decks in two visual systems—an editorial magazine style and a Swiss International grid style—plus image prompts and social media covers.

**Why now:** It hit 22,100 GitHub stars with 2,445 added this week, signaling rapid adoption as developers look for agent-native alternatives to PowerPoint that produce deployable HTML output rather than proprietary files.

**Build with it:** Drop the skill into Claude Code or Codex and point it at a Markdown doc or article to get a polished 16:10 presentation with keyboard/swipe navigation, 22 locked Swiss layouts, GPT-Image-generated diagrams, and a `B`-key WebGL kill-switch for low-power environments—all in one HTML file you can ship anywhere.

## 7. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 41107 (+2280 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that gives your AI coding assistant 12 production pipelines and 700+ skill files to handle scripting, asset generation, stock footage retrieval, and final video composition from a plain-language brief.

**Why now:** It hit #1 on GitHub Trending this week with 2,280 stars in seven days, signaling a breakout moment for agentic media tooling as builders look to replace expensive, closed video platforms.

**Build with it:** Wire OpenMontage into a Claude or Cursor workflow to auto-produce narrated explainer videos, AI-generated short-form content, or a stock-footage documentary pipeline—without touching a timeline editor.

## 8. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 34027 (+2270 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that indexes entire codebases into a persistent knowledge graph using tree-sitter AST parsing across 158 languages, answering structural queries about functions, call chains, and HTTP routes in under 1ms with 99% fewer tokens than file-by-file exploration.

**Why now:** The project gained 2,270 stars this week and sits at 34K total, signaling rapid adoption as AI coding agents (Cursor, Claude Code, Codex, Gemini CLI) become standard developer tools that need efficient codebase context without burning token budgets.

**Build with it:** Drop this into any AI coding agent setup to give it persistent, queryable memory of a large monorepo or multi-service codebase — then build agent workflows that navigate cross-service call chains, locate HTTP routes, or audit dependencies without repeatedly re-reading source files.

## 9. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 87718 (+4025 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces a "laziest senior dev" heuristic—pushing agents to reach for native browser features, delete code, or write nothing at all before adding dependencies or abstractions.

**Why now:** The repo jumped 4,025 stars this week and benchmarks show it cuts generated LOC by ~54% and cost by ~20% on real agentic Claude Code sessions against a real FastAPI + React codebase, making it immediately practical for teams running high-volume AI coding workflows.

**Build with it:** Drop ponytail into your Claude Code or Cursor setup to constrain an agent building a greenfield SaaS—especially useful when scaffolding forms, dashboards, or CRUD UIs where agents notoriously over-install libraries and wrap native elements unnecessarily.

## 10. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 41971 (+3604 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, from-scratch, generative-ai, llm, machine-learning, mcp, nlp, python, reinforcement-learning, rust, swarm-intelligence, transformers, tutorial, typescript

**What it does:** A fully open-source, 503-lesson curriculum spanning 20 phases that teaches AI engineering from raw linear algebra through production LLM systems, agents, and swarms — in Python, TypeScript, Rust, and Julia, with every lesson producing a shippable artifact.

**Why now:** It gained 3,604 stars this week alone and crossed 41K total, signaling a breakout moment of community adoption; the MCP and swarm-intelligence coverage makes it immediately relevant to the agent tooling wave dominating AI infrastructure right now.

**Build with it:** Work through the transformer and LLM-from-scratch phases to understand exactly what's running under your inference stack, then use the MCP server lessons to ship production-grade tool integrations that most developers copy-paste without understanding.
