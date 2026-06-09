# Skill Tastemakers — Daily Brief — 2026-06-09

_Ranking: bootstrap_since_first_seen · 10 repos · generated 2026-06-09T13:34:18.358Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_since_first_seen`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 19877 (+3221 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 60–95% tokens while preserving answer quality, available as a Python/TypeScript library, drop-in proxy, or MCP server.

**Why now:** It hit nearly 20k stars this week with 3,221 added, landing as context window costs and agent loop token bloat are becoming the dominant scaling bottleneck for production AI systems.

**Build with it:** Wrap an existing Claude Code or Cursor workflow with `headroom wrap` to immediately cut API costs, or integrate the `compress(messages)` call into a LangChain or custom RAG pipeline to fit more retrieval chunks into a fixed context budget without rewriting your architecture.

## 2. WenyuChiou/awesome-agentic-ai-zh

https://github.com/WenyuChiou/awesome-agentic-ai-zh · ★ 2238 (+336 this week) · agentic-ai, agentic-workflows, ai-agent, ai-agents, awesome-list, chinese-llm, claude-code, claude-skills, cli, learning-roadmap, llm, llm-agents, mcp, model-context-protocol, multi-agent-systems, prompt-engineering, rag, trilingual, tutorial

**What it does:** A trilingual (Traditional Chinese, Simplified Chinese, English) structured learning roadmap that guides learners from LLM fundamentals through multi-agent system design across 8 stages, with 240+ curated resources, 23 hands-on exercise folders, and dual-path SDK examples using Ollama and Anthropic.

**Why now:** The repo gained 336 stars this week, signaling a surge of Chinese-speaking developers actively seeking structured entry points into agentic AI—particularly around MCP, Claude Code workflows, and multi-agent orchestration patterns that are maturing rapidly right now.

**Build with it:** Use the Stage 5 MCP/Skills catalog (65 entries) and the dual-path Ollama/Anthropic starter exercises to scaffold a local multi-agent prototype, then follow the Agent Builder track (Stage 3–8) to wire ReAct loops, tool use, and a custom MCP server without getting lost in framework docs.

## 3. 2aronS/Duel-Agents

https://github.com/2aronS/Duel-Agents · ★ 1063 (+321 this week) · ai-agents, anthropic, claude-code, cli, cursor, duel-agents, llm, npm, openai-compatible, openclaw, sdk, typescript

**What it does:** Duel Agents is a CLI, SDK, and IDE plugin layer that routes prompts to multiple LLM backends simultaneously and returns the cheapest response that meets a quality threshold, proxied through a single API endpoint at duelagents.com.

**Why now:** The repo gained 321 stars this week, signaling fresh traction, and the integrations cover the current dominant AI coding tools—Claude Code, Cursor, and Codex CLI—making it immediately relevant to active developer workflows.

**Build with it:** Drop in the `@duel-agents/sdk` or set `OPENAI_BASE_URL=https://duelagents.com/v1` to add cost-optimized model routing to any agent, LangChain pipeline, or LlamaIndex app without changing your existing OpenAI-compatible code.

## 4. zarazhangrui/frontend-slides

https://github.com/zarazhangrui/frontend-slides · ★ 20947 (+316 this week) · ai-slides, anthropic, claude, claude-code, claude-skill, generative-ui, html, presentation, slides, vibe-coding

**What it does:** Frontend Slides is a Claude Code plugin (and portable `SKILL.md` skill) that turns a coding agent into a presentation designer — generating single-file HTML slide decks with curated styles, visual style-picker previews, and optional PowerPoint-to-web conversion, all with zero npm dependencies.

**Why now:** It hit 20,947 stars with 316 added this week, signaling a sharp spike in builders using Claude Code as a frontend coding agent and wanting polished output beyond generic AI aesthetics.

**Build with it:** Drop it into any Claude Code workflow to auto-generate pitch decks, technical walkthroughs, or client-facing demos from a one-line prompt — or wire the `extract-pptx.py` script into a pipeline that converts uploaded `.pptx` files to shareable, self-contained HTML pages.

## 5. mukul975/Anthropic-Cybersecurity-Skills

https://github.com/mukul975/Anthropic-Cybersecurity-Skills · ★ 15007 (+267 this week) · ai-agents, claude-code, cloud-security, cybersecurity, devsecops, ethical-hacking, incident-response, infosec, llm, malware-analysis, mcp, mitre-attack, nist-csf, osint, penetration-testing, red-team, security, security-automation, threat-hunting, threat-intelligence

**What it does:** This open-source library provides 754 structured cybersecurity skills for AI agents, spanning 26 security domains and mapped across five industry frameworks (MITRE ATT&CK, NIST CSF 2.0, MITRE ATLAS, D3FEND, and NIST AI RMF) in a standard format compatible with Claude Code, Cursor, Copilot, and 20+ other platforms.

**Why now:** The repo gained 267 stars this week, signaling a surge in developer interest in giving AI coding agents real security context rather than generic LLM knowledge—a gap that's becoming critical as agentic workflows handle more sensitive infrastructure tasks.

**Build with it:** Drop the skill files into your Claude Code or Cursor workspace to give your security agent expert-level guidance on tasks like scoping a cloud breach, writing Sigma detection rules, or triaging a memory dump—without hand-crafting prompts from scratch.

## 6. open-gsd/gsd-core

https://github.com/open-gsd/gsd-core · ★ 3287 (+266 this week) · claude-code, context-engineering, meta-prompting, spec-driven-development

**What it does:** GSD Core is a meta-prompting framework that structures AI coding agents through a five-phase loop (Discuss → Plan → Execute → Verify → Ship), running heavy work in isolated subagents to prevent context rot from degrading output quality across long sessions.

**Why now:** Claude Code and competing AI coding agents are seeing rapid adoption this week, but developers are hitting a real ceiling where long sessions produce increasingly unreliable code—GSD Core directly addresses that failure mode with a concrete, installable system.

**Build with it:** Drop it into any active project with `npx @opengsd/gsd-core@latest`, then use it to drive a multi-phase feature build across Claude Code or Cursor where each execution wave gets a clean 200k-token context instead of inheriting accumulated drift.

## 7. revfactory/harness

https://github.com/revfactory/harness · ★ 6638 (+256 this week) · claude-code, claude-code-plugin, harness, harness-engineering

**What it does:** Harness is a Claude Code plugin that takes a plain-language domain description and outputs a coordinated agent team — generating both agent definitions (`.claude/agents/`) and skill files (`.claude/skills/`) across six architectural patterns like Pipeline, Fan-out/Fan-in, and Hierarchical Delegation.

**Why now:** With 256 stars added this week, Harness is gaining traction as Claude Code's agent and sub-agent capabilities become a serious building surface, making team-architecture scaffolding a real bottleneck worth solving.

**Build with it:** Drop Harness into an existing codebase, say "build a harness for this project," and get a ready-made multi-agent review pipeline, expert pool, or supervisor hierarchy — then extend the generated skill files to encode your domain logic directly into the team structure.

## 8. jlcodes99/cockpit-tools

https://github.com/jlcodes99/cockpit-tools · ★ 10921 (+484 this week) · account-manager, ai, antigravity, codebuddy, codex, cursor, github-copilot, kiro, windsurf

**What it does:** Cockpit Tools is a Rust-built desktop app that manages multiple accounts across 12 AI IDEs simultaneously—Cursor, Windsurf, GitHub Copilot, Codex, Kiro, and more—with one-click account switching, quota monitoring, and parallel multi-instance launching from a single dashboard.

**Why now:** With Kiro launching this week and developers juggling free tiers across an expanding roster of AI IDEs, the cost of manually context-switching between accounts has become a real workflow tax—484 stars this week signals builders are feeling that pain now.

**Build with it:** Use the multi-instance API and account injection layer as a foundation for an automated quota-aware task router that dispatches coding jobs to whichever account has remaining credits, effectively building a free-tier compute scheduler across IDE providers.

## 9. nexu-io/html-anything

https://github.com/nexu-io/html-anything · ★ 6479 (+226 this week) · agent-skills, agentic, ai-agents, ai-design, ai-editor, byok, claude, claude-code, claude-skills, coding-agents, generative-ai, html, html-editor, hyperframes, local-first, markdown, nextjs, vibe-coding, wechat, xiaohongshu

**What it does:** HTML Anything is a local-first HTML editor that routes natural language prompts through whichever coding agent CLI you already have installed (Claude Code, Codex, Gemini CLI, and five others) to generate production-ready HTML across nine output formats—magazine articles, decks, résumés, Xiaohongshu cards, and more—with one-click export to WeChat, X, Zhihu, or PNG.

**Why now:** The repo gained 226 stars this week, signaling real traction, and the timing aligns with Claude Code and Gemini CLI both maturing as local agent runtimes that developers already have authenticated on their machines—making the zero-API-key promise immediately practical rather than theoretical.

**Build with it:** Clone the repo, point it at your existing Claude Code or Gemini CLI session, and use the 75 skill templates to automate a content pipeline that turns Markdown drafts into branded HTML cards or data reports ready to post directly to Chinese and Western social platforms without touching a design tool.

## 10. op7418/guizang-ppt-skill

https://github.com/op7418/guizang-ppt-skill · ★ 15991 (+449 this week) · ai-agent, claude-code, codex, html-deck, image-generation, ppt, presentation, skill, skills, swiss-design, web-ppt

**What it does:** Guizang PPT Skill is an AI-agent skill for Claude Code and Codex that generates single-file HTML slide decks in two distinct visual systems—editorial magazine style and Swiss International typographic style—plus matching social covers and AI-generated slide imagery.

**Why now:** The repo gained 449 stars this week, signaling rapid community uptake, and its native Claude Code and Codex integration makes it immediately usable as AI coding agents become a standard part of developer workflows.

**Build with it:** Drop in your Markdown or raw notes and let the agent produce a polished, browser-ready HTML deck with no build step—then extend it by wiring GPT-Image generation into the pipeline to auto-populate diagram and photo slots at the correct aspect ratios.
