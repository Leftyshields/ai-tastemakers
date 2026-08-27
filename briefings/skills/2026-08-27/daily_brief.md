# Skill Tastemakers — Daily Brief — 2026-08-27

_Ranking: delta_7d · 10 repos · generated 2026-08-27T19:10:55.865Z_


## 1. freestylefly/awesome-gpt-image-2

https://github.com/freestylefly/awesome-gpt-image-2 · ★ 22900 (+11471 this week) · agents, ai-image-generation, chatgpt, dsh-plugin, gpt-image-2, image-prompts, prompt-as-code, prompt-engineering, skills, workflow-automation

**What it does:** A prompt engineering library for GPT-Image-2 with 530+ reverse-engineered cases, 20+ industrial templates, and a browsable gallery at gpt-image2.canghe.ai where you can copy full prompts and filter by style or scenario.

**Why now:** The repo gained 11,471 stars this week, signaling a surge of developer interest likely tied to GPT-Image-2 adoption accelerating in production workflows.

**Build with it:** Copy a template prompt from the gallery, pipe it into the APIMart async API (`$0.006/image`), and batch-generate product images without changing code when switching models.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 113855 (+7379 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an AI agent skill that steers code-generating agents toward minimal solutions — native browser inputs instead of installed libraries, one line instead of fifty — while preserving safety guardrails.

**Why now:** It hit Hacker News this week (98 points, 17 comments), surfacing the benchmark showing a fair agentic baseline drops 54% of generated LOC on real FastAPI + React tasks without losing any safety checks.

**Build with it:** Drop the ponytail skill into a Claude Code session on an existing project and diff the output against your current agent's output on the same feature ticket to measure LOC reduction directly.

## 3. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 111540 (+2976 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify maps any codebase—plus its docs, SQL schemas, configs, and PDFs—into a queryable knowledge graph using local deterministic AST parsing, exposed as a `/graphify` skill inside Claude Code, Cursor, Codex, and Gemini CLI with no vector store required.

**Why now:** The project is circulating on Hacker News this week with threads specifically calling out reduced token usage in Claude Code, hitting at a moment when AI coding assistant cost and context efficiency are active builder concerns.

**Build with it:** Drop the `/graphify` skill into an existing Claude Code workflow and query cross-file call graphs instead of grepping—using the MCP surface the README documents—to validate whether graph-based context retrieval cuts your prompt token count on a real project.

## 4. stablyai/orca

https://github.com/stablyai/orca · ★ 55113 (+5381 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile orchestration app that runs coding agents (Codex, Claude Code, OpenCode, Pi) in parallel git worktrees, letting you compare outputs and merge the winner from one interface.

**Why now:** The repo crossed 55,000 stars with 5,381 added this week, signaling a sharp spike in builder attention likely tied to the parallel-agents workflow gaining traction as Codex and Claude Code usage converges.

**Build with it:** Point Orca at an existing repo, fan one prompt across three agents in isolated worktrees, and use the built-in terminal splits to diff and cherry-pick the winning branch without leaving the app.

## 5. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 56854 (+5188 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a free MIT-licensed AI gateway that routes requests across 357 providers and 1,200+ models through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression saving 15–95% on context size.

**Why now:** The repo gained 5,188 stars this week, signaling a spike in discovery — likely from builders hitting rate limits on Claude Code and Codex as free-tier quotas tighten across Anthropic and OpenAI.

**Build with it:** Point your existing Claude Code or Cursor `OPENAI_BASE_URL` at the OmniRoute endpoint and let the 19 routing strategies handle fallback across 90+ free-tier providers automatically — no SDK changes required.

## 6. MadsLorentzen/ai-job-search

https://github.com/MadsLorentzen/ai-job-search · ★ 37198 (+4719 this week) · ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume

**What it does:** An open-source Claude Code workflow that evaluates job postings for fit, generates tailored LaTeX CVs and cover letters via a drafter-reviewer pipeline, and preps you for interviews — all running locally from your own profile files.

**Why now:** The repo gained 4,719 stars this week and carries a verified origin story: the author used this exact `/scrape` → `/apply` → `/interview` workflow to land an AI engineering role after 69 tailored applications, giving it rare real-world signal among job-search automation tools.

**Build with it:** Fork the repo, drop your profile into the designated files, then point `/apply <url>` at a job posting to run the full drafter-reviewer loop and get a scored fit evaluation alongside a compiled cover letter.

## 7. chaitanyagiri/munder-difflin <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/chaitanyagiri/munder-difflin · ★ 5019 (+2035 this week) · agents, claude-code, free, harness, harness-engineering, memory

**What it does:** Munder Difflin is an Electron app that wraps terminal coding CLIs (Claude Code, Gemini, Codex, Grok, and others) into a self-coordinating multi-agent office, where each agent gets long-term memory, a mailbox, and a 2D desk avatar managed by a routing agent called Michael.

**Why now:** The repo hit #1 on GitHub Trending this week and landed #5 Product of the Day on Product Hunt, signaling a live wave of builders actively experimenting with it right now.

**Build with it:** Point Munder Difflin at your existing `claude` or `codex` subscription — no new API keys required — and assign parallel tasks across agents via Michael's Command Center to test how multi-agent task routing holds up on a real codebase.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 237278 (+3901 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving Python agent with a closed learning loop — it creates and refines skills from experience, searches past conversations via FTS5, and builds a persistent user model across sessions using Honcho dialectic modeling.

**Why now:** The repo gained nearly 4,000 stars this week, signaling a spike in builder attention worth acting on before the ecosystem around it solidifies.

**Build with it:** Point it at your own OpenAI-compatible endpoint via `hermes model`, then let it run a scheduled task with the built-in cron scheduler to validate whether its autonomous skill creation actually reduces repeated tool calls over time.

## 9. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 27868 (+3850 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** Diagram Design is a Claude Code skill that generates 39 editorial diagram types (architecture, flowchart, Sankey, Wardley map, UML class, and more) as self-contained HTML + SVG — no Figma, no Mermaid, no build step.

**Why now:** The repo gained 3,850 stars this week, coinciding with the 2.5.10 release that added ten new layout grammars including Wardley maps and database schema diagrams.

**Build with it:** Drop the skill into an existing Claude Code project and call it on a draw.io or Mermaid source file to redraw it at your site's brand, format, and detail level in one step.

## 10. Wei-Shaw/sub2api

https://github.com/Wei-Shaw/sub2api · ★ 39639 (+1834 this week) · 2api, antigravity2api, cc2api, claude, claude-code, codex, crs, crs2, gemini

**What it does:** Sub2API is an open-source gateway that converts Claude, OpenAI, Gemini, and Grok subscriptions into shared API endpoints, enabling quota pooling and cost splitting across users.

**Why now:** The repo gained 1,834 stars this week, spiking alongside active community demand around Claude Code and Codex integration workflows where per-seat subscription costs are a friction point.

**Build with it:** Point Claude Code's API base URL at a self-hosted Sub2API instance (via Docker) to share a single Anthropic subscription across a team without each member needing their own account.
