# Skill Tastemakers — Daily Brief — 2026-09-11

_Ranking: delta_7d · 10 repos · generated 2026-09-11T17:02:53.527Z_


## 1. kepano/obsidian-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/kepano/obsidian-skills · ★ 48175 (+8066 this week) · agents, agentskills, bases, claude, clawdbot, cli, codex, defuddle, hermes, jsoncanvas, markdown, md, obsidian, openclaw, opencode, skills

**What it does:** A collection of Agent Skills–spec–compliant skill definitions that teach Claude Code, Codex, or OpenCode how to read and write Obsidian-native formats — Markdown with wikilinks, Bases, JSON Canvas, and CLI commands.

**Why now:** The repo gained over 8,000 stars this week, coinciding with broad builder interest in the newly published Agent Skills specification at agentskills.io that lets a single skill file work across multiple AI coding agents.

**Build with it:** Clone the repo into `~/.opencode/skills/obsidian-skills/` and restart OpenCode to give your agent native Obsidian Markdown and Bases editing without any config changes.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 135612 (+10606 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an agent skill / prompt layer that steers AI coding agents (Claude Code, Cursor, and ~18 others) toward YAGNI-style minimal solutions, trading library installs and boilerplate for native platform primitives.

**Why now:** A Hacker News thread this week drove attention to the repo, which also topped Trendshift's daily and weekly JavaScript rankings with over 10,000 new stars in seven days.

**Build with it:** Drop the ponytail skill config into your Claude Code project and run a feature task you know tends to over-build — like a date picker — to immediately benchmark how much generated code it eliminates.

## 3. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 256344 (+8237 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness optimization layer that adds persistent skills, memory, instincts, and security controls to AI coding agents like Claude Code, Codex, Cursor, and Opencode.

**Why now:** The repo gained over 8,000 stars this week, coinciding with surging adoption of Claude Code as a primary coding agent, making agent harness tooling a live production concern rather than a research topic.

**Build with it:** Install `ecc-universal` via npm and drop the configuration into your Claude Code project to immediately apply ECC's memory and instinct layer to your existing agent workflow.

## 4. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 38362 (+7624 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** A Claude Code skill that generates 39 editorial diagram types (including Sankey, Wardley maps, UML class, and database schema) as self-contained HTML + SVG — no build step, no Figma, no generic rounded boxes.

**Why now:** The repo gained 7,624 stars this week, signaling a sharp spike in visibility, and the freshly released v2.5.10 adds ten new layout grammars including dependency graphs and story maps.

**Build with it:** Drop the skill into a Claude Code project and point it at an existing Mermaid or draw.io file to redraw it at your chosen format and detail level.

## 5. freestylefly/awesome-gpt-image-2

https://github.com/freestylefly/awesome-gpt-image-2 · ★ 31313 (+3308 this week) · agents, ai-image-generation, chatgpt, dsh-plugin, gpt-image-2, image-prompts, prompt-as-code, prompt-engineering, skills, workflow-automation

**What it does:** A library of 530+ reverse-engineered GPT-Image-2 prompts organized into 20+ reusable industrial templates, with a live gallery site for browsing, filtering, and copying full prompts.

**Why now:** The repo added a GPT Image 2.5 spotlight this week comparing the new Sunburst and Flare model variants side-by-side using shared prompts and draggable dividers, making it a concrete reference point as 2.5 rolls out.

**Build with it:** Copy a template prompt directly from [gpt-image2.canghe.ai](https://gpt-image2.canghe.ai/) into the `images.generate` API call with `model: "gpt-image-2.5-sunburst"` to benchmark 2.5 output against the gallery's documented results.

## 6. stablyai/orca

https://github.com/stablyai/orca · ★ 66602 (+5048 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE that runs multiple coding agents (Codex, Claude Code, OpenCode, Pi) in parallel git worktrees, letting you fan one prompt across agents and merge the winning result.

**Why now:** The repo gained 5,048 stars this week, coinciding with OpenAI Codex's re-launch and renewed builder interest in agent orchestration workflows.

**Build with it:** Point Orca at an existing repo, spawn three parallel worktrees with the same feature prompt across Codex and Claude Code, then diff and cherry-pick the best output directly from the UI.

## 7. blader/humanizer

https://github.com/blader/humanizer · ★ 46833 (+4416 this week) · agent-skills, ai-writing, claude-code, codex, cursor, prompt-engineering, writing-tools

**What it does:** Humanizer is an agent skill that detects 25 named AI-writing patterns and rewrites flagged text to read like a specific person wrote it, without altering facts or inventing details.

**Why now:** The repo gained 4,416 stars this week, signaling a sharp spike in builder interest likely tied to growing demand for AI-output post-processing in publishing and docs workflows.

**Build with it:** Drop it into Claude Code via `/plugin marketplace add blader/humanizer` and pipe your docs folder through `/humanizer docs/launch-post.md` to strip AI tells from release copy before shipping.

## 8. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 64757 (+3605 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted AI gateway that exposes 352 providers and 1,200+ models behind a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression (15–95% savings) so tools like Claude Code, Cursor, and Cline keep working when any single free tier runs dry.

**Why now:** The repo gained 3,605 stars this week, signaling a spike in developer interest likely tied to rising API costs and the proliferation of free-tier models from providers like Kimi, MiniMax, and Groq.

**Build with it:** Point your existing Cursor or Cline `baseURL` config at OmniRoute's single endpoint, drop in your free-tier API keys, and let the auto-fallback routing cycle through ~1.47B free tokens/month without changing any other code.

## 9. mksglu/context-mode

https://github.com/mksglu/context-mode · ★ 22150 (+1798 this week) · antigravity, claude, claude-code, claude-code-hooks, claude-code-plugins, claude-code-skill, codex, codex-cli, context-mode, copilot, cursor-plugin, kiro, mcp, mcp-server, mcp-tools, openclaw, opencode, pi-agent, skills, zed-extension

**What it does:** Context Mode sandboxes MCP tool output to cut context window consumption by up to 98%, while persisting session memory and enforcing prompt routing across 17 AI coding platforms via MCP hooks.

**Why now:** It hit #1 on Hacker News this week with 570+ points, surfacing active builder discussion around context exhaustion as a day-to-day friction point with tools like Claude Code and Cursor.

**Build with it:** Wire it into an existing Claude Code setup via the MCP server config to immediately cap how much a single Playwright or GitHub tool call costs in tokens.

## 10. didilili/ai-agents-from-zero <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/didilili/ai-agents-from-zero · ★ 4547 (+1610 this week) · agent, agent-framework, agentic-ai, ai-agent, aigc, coze, cursor, deepagents, dify, gpt, langchain, langgraph, llm, mcp, rag, skills, tutorial

**What it does:** A Chinese-language, open-source AI agent curriculum covering LangChain, LangGraph, RAG, MCP, and tool calling — with runnable code, two complete enterprise projects (NL2SQL e-commerce chatbot and a multi-agent deep-search system), and an interview question bank aligned to LLM engineer job descriptions.

**Why now:** The repo gained 1,610 stars this week, coinciding with the May 17 completion of the DeepAgents multi-agent "deep research" project, giving builders a freshly finished, runnable reference implementation.

**Build with it:** Clone the `deepsearch-agents` source repo and run the multi-agent pipeline locally as a concrete starting point for wiring LangGraph orchestration into your own research or retrieval workflow.
