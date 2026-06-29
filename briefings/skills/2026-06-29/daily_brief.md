# Skill Tastemakers — Daily Brief — 2026-06-29

_Ranking: delta_7d · 10 repos · generated 2026-06-29T14:38:33.475Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 66578 (+21702 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces a "laziest senior dev" philosophy—systematically pushing the agent toward minimal, already-available solutions instead of over-engineered ones, cutting generated code by ~54% on average.

**Why now:** It hit 66K+ stars with 21K added this week alone, suggesting a wave of developers are actively fighting AI agent bloat and looking for practical constraints rather than more capabilities.

**Build with it:** Drop the skill into your Claude Code or Cursor setup and run it against any feature branch to audit where your agent over-builds—then use the benchmark harness in `benchmarks/` to measure LOC, token cost, and time savings against your own codebase as a baseline.

## 2. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 28151 (+13768 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that gives your AI coding assistant 12 pipelines and 52 tools to handle scripting, asset generation, editing, and final rendering — producing real motion-clip videos, not just slideshows of stills.

**Why now:** It hit #1 on GitHub Trending this week with 13,768 stars in seven days, signaling a breakout moment of community adoption and active contribution.

**Build with it:** Drop in your own pipeline to generate product demo videos, YouTube shorts, or training content programmatically — the demonstrated $0.02–$1.33 per video cost makes high-volume automated content generation economically viable to prototype today.

## 3. DeusData/codebase-memory-mcp

https://github.com/DeusData/codebase-memory-mcp · ★ 20918 (+11039 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that parses any codebase into a persistent knowledge graph using tree-sitter AST analysis across 158 languages, answering structural queries about functions, call chains, and HTTP routes in under 1ms with 99% fewer tokens than file-by-file exploration.

**Why now:** The project gained over 11,000 stars this week, signaling rapid adoption across major AI coding agents (Cursor, Claude Code, Windsurf, Gemini CLI, Codex), and its backing arXiv paper documents 83% answer quality with 10× token reduction across 31 real-world repos — making it a credible drop-in for production agent workflows right now.

**Build with it:** Plug it into any MCP-compatible coding agent to give it persistent, structured memory of a large codebase — enabling agents to navigate the Linux kernel or a monorepo without burning context on raw file reads, or build custom code intelligence tooling on top of its 14 MCP tools and SQLite knowledge graph.

## 4. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 45360 (+8858 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI and MCP toolkit that gives AI agents authenticated, parsed access to Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and more — without paid APIs, by routing through free backends and browser login state.

**Why now:** It hit #1 on GitHub Trending this week with 8,858 stars added, signaling a breakout moment where developers are actively standardizing how agents consume live internet data rather than building one-off scrapers per platform.

**Build with it:** Wire it into a Claude Code or Cursor workflow to build agents that do real-time competitive research, social sentiment analysis, or content summarization across Chinese and Western platforms simultaneously — without writing a single scraper or paying for a single API key.

## 5. headroomlabs-ai/headroom

https://github.com/headroomlabs-ai/headroom · ★ 53597 (+7032 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 60–95% before they hit the model—as a Python/TypeScript library, a drop-in proxy, or an MCP server.

**Why now:** Context windows are filling up fast as agents run longer multi-step tasks, and this week's 7,000-star surge signals the community is hitting that wall and actively hunting solutions.

**Build with it:** Wrap your existing Claude Code, Cursor, or LangChain agent with a single `headroom wrap` command to immediately slash token costs and extend how far your agent can reason before hitting context limits—no code changes required.

## 6. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 205496 (+6798 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is an open-source, self-improving AI agent from Nous Research that maintains a persistent learning loop — creating and refining skills from experience, modeling users across sessions, and running on any infrastructure from a $5 VPS to serverless Modal deployments via any LLM provider.

**Why now:** The repo pulled nearly 7,000 stars this week, signaling a surge of builder interest likely tied to the growing demand for agents that persist state and learn without manual prompt engineering.

**Build with it:** Wire Hermes into a Telegram or Discord bot that autonomously handles recurring workflows — code reviews, data pulls, nightly reports — while it accumulates domain-specific skills over time, reducing the prompt overhead on every subsequent run.

## 7. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 67886 (+3335 this week) · agent-skills, antigravity, antigravity-ide, claude-code, cursor, skills

**What it does:** Agent Skills is a collection of production-grade slash commands (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`) that encode senior engineering workflows into AI coding agents like Claude Code and Cursor, enforcing quality gates at every phase of development.

**Why now:** The project gained 3,335 stars this week, reflecting a surge of developer interest in structuring AI-assisted coding beyond raw autocomplete — specifically around making agents follow consistent, verifiable processes rather than generating untested one-shot code.

**Build with it:** Clone the repo and wire it into Claude Code or Cursor to give your AI agent opinionated guardrails for any new project — use `/build auto` to let the agent autonomously plan, implement, and commit an entire feature slice while still running tests and pausing on failures.

## 8. nextlevelbuilder/ui-ux-pro-max-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · ★ 97775 (+3181 this week) · ai-skills, antigravity, claude, claude-code, codex, command-line, copilot, cursor-ai, html5, kiro, landing-page, mobile-ui, qoder, react, tailwindcss, trae, ui-design, uikit, windsurf-ai

**What it does:** UI UX Pro Max is a Python-based AI skill that injects design intelligence into coding assistants like Claude, Cursor, and Copilot, giving them 161 reasoning rules and 67 UI styles to generate professional, conversion-optimized interfaces across web and mobile frameworks.

**Why now:** With AI coding tools becoming the default development environment, the missing layer has been design judgment — this week's spike in stars (3,181) suggests builders are actively looking for a way to close that gap without hiring a designer.

**Build with it:** Drop the skill into your AI coding workflow and prompt it with a project brief — a spa booking app, a SaaS dashboard, a mobile checkout flow — and get back a complete, opinionated design system with layout patterns, component hierarchy, and style choices ready to scaffold into real code.

## 9. JCodesMore/ai-website-cloner-template

https://github.com/JCodesMore/ai-website-cloner-template · ★ 23343 (+6027 this week) · ai, ai-agents, ai-tools, automation, boilerplate, claude, claude-code, clone, developer-tools, nextjs, react, reverse-engineering, shadcn-ui, skills, tailwindcss, template, typescript, web-scraping, website-clone

**What it does:** AI Website Cloner Template is a Next.js boilerplate that lets you point any AI coding agent at a target URL and automatically reverse-engineer it into a clean TypeScript/Tailwind codebase using a single `/clone-website` command.

**Why now:** It gained over 6,000 stars this week, signaling strong developer traction, and its explicit support for Claude Code with the newly released Opus 4.7 makes it immediately practical with today's most capable frontier model.

**Build with it:** Use it to rapidly prototype competitor analyses, recreate UI patterns you admire as editable components, or bootstrap client projects by cloning reference sites and stripping them down to a clean starting point.

## 10. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 47030 (+2954 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** A public GitHub repository that extracts and documents the hidden system prompts governing AI assistants including Claude, ChatGPT, Gemini, Grok, Copilot, and Cursor, covering model behavior rules, tool definitions, and internal instructions that normally never reach end users.

**Why now:** The repo gained nearly 3,000 stars this week, coinciding with fresh leaks of Claude Fable 5, GPT-5.5 Codex, and Gemini 3.5 Flash prompts—giving builders a rare side-by-side view of how competing frontier models are actually instructed right now.

**Build with it:** Use the extracted prompts as a reference library to reverse-engineer guardrail patterns, benchmark your own system prompt designs against production-grade examples, or build tooling that diffs prompt changes across model versions to track how AI behavior shifts over time.
