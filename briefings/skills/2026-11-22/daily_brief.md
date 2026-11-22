# Skill Tastemakers — Daily Brief — 2026-11-22

_Ranking: delta_7d · 10 repos · generated 2026-11-22T21:01:38.169Z_


## 1. obra/superpowers

https://github.com/obra/superpowers · ★ 324066 (+6061 this week) · ai, brainstorming, coding, obra, sdlc, skills, subagent-driven-development, superpowers

**What it does:** Superpowers is a shell-based plugin for AI coding agents (Claude Code, Codex, Cursor, and others) that enforces a spec-first, plan-then-build workflow with TDD, YAGNI, and DRY baked in, then hands off subtasks to specialized subagents automatically.

**Why now:** Competing skill-suite projects like JDS and Arxitect surfaced on Hacker News this week with minimal traction, suggesting builders are actively sizing up this category and Superpowers is the most established option in it.

**Build with it:** Install via `/plugin install superpowers@claude-plugins-official` inside Claude Code and point it at a greenfield feature to get automatic spec review and subagent task execution without any manual prompting.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 196827 (+5474 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, and others) that pushes the agent toward deleting or skipping code rather than over-engineering it, using what the author calls a "laziest senior dev" heuristic.

**Why now:** The project hit Hacker News this week and version 5 ships with benchmarked results of -53% code and -45% token usage on a real FastAPI and React repo, giving builders concrete numbers to test against their own workflows.

**Build with it:** Drop the npm package into an existing Claude Code project and run your next feature task to compare output verbosity and test coverage against your current baseline.

## 3. morluto/rea

https://github.com/morluto/rea · ★ 473944 (+12285 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is an MCP server (a standard interface for wiring tools into AI agents) that gives agents the ability to inspect native binaries, JavaScript and Electron apps, .NET assemblies, and websites without access to source code.

**Why now:** The project hit Hacker News this week with an active thread discussing its agent-driven binary analysis approach, drawing fresh builder attention to reverse-engineering use cases for coding agents.

**Build with it:** Run `npx rea-agents setup` to wire REA into your agent environment, then point it at a closed-source app to extract and replicate a specific feature.

## 4. paperclipai/paperclip

https://github.com/paperclipai/paperclip · ★ 115934 (+1821 this week) · acpx, agent-orchestration, agent-skills, agentic-ai, ai-agents, ai-engineering, ai-governance, ai-tools, autonomous-agents, claude, claude-code, claude-skills, codex, hermes, llm, mcp, multi-agent, openclaw, project-management, workflow-automation

**What it does:** Paperclip is an open-source Node.js server with a React dashboard that lets you define a business goal, assign it to a team of AI agents with roles like CEO, CTO, and engineer across any provider, and track tasks, budgets, and costs from one place.

**Why now:** The repo gained over 1,800 stars this week as tools like Claude Code and Codex become practical daily drivers, and builders are looking for orchestration layers that keep multi-agent costs visible and controlled.

**Build with it:** Point an existing Claude Code or Codex agent at Paperclip's orchestration layer, assign it a scoped goal, and use the dashboard's budget controls to cap spend while testing autonomous task delegation.

## 5. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 59119 (+1786 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source book on AI agent design and engineering, written primarily in Chinese but available in 16 languages as PDF and EPUB, covering 10 chapters from LLM-plus-tools fundamentals through production patterns, with 109 hands-on Python experiments included.

**Why now:** The repo hit GitHub Trending as Project of the Day this week and recently released versions 2.0 and 3.0, which restructured chapters around multimodal agents and expanded the section on interaction models.

**Build with it:** Clone the repo and run one of the 109 bundled Python experiments locally to validate a specific agent pattern such as RAG, MCP tool use, or multi-agent coordination before wiring it into your own application.

## 6. elementalsouls/Claude-BugHunter

https://github.com/elementalsouls/Claude-BugHunter · ★ 17539 (+11285 this week) · ai-security, anthropic, application-security, bug-bounty, bugbounty, bugcrowd, claude, claude-code, claude-skills, ethical-hacking, hackerone, offensive-security, pentesting, red-team, security-tools, web-security

**What it does:** Claude-BugHunter is a Claude Code skill bundle that loads 83 skills and 15 slash commands into Claude, covering 681 disclosed HackerOne report patterns across 24 vulnerability classes, enterprise identity attack matrices, and engagement scaffolding for authorized bug-hunting and red-team work.

**Why now:** The repo gained over 11,000 stars this week, reflecting a sharp surge in interest around Claude Code's plugin and skills system as a surface for security tooling.

**Build with it:** Install via `/plugin marketplace add elementalsouls/Claude-BugHunter` inside Claude Code, then describe a target in plain English to trigger the relevant hunt skill automatically, without naming skills by hand.

## 7. pingdotgg/t3code

https://github.com/pingdotgg/t3code · ★ 71403 (+10009 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code is an open-source control plane that runs Claude Code, Codex, Cursor, and other ACP-compatible coding agents on your local machine and surfaces them through a single interface across desktop, web, iOS, and Android.

**Why now:** The repo gained over 10,000 stars this week, reflecting a sharp spike in builder interest around running multi-agent setups on personal hardware rather than cloud-hosted surfaces.

**Build with it:** Install the `t3` CLI via the one-liner in the README, sign into Claude Code or Codex, then use the ACP provider config to route tasks between agents mid-thread without touching your existing subscriptions.

## 8. google-labs-code/stitch-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/google-labs-code/stitch-skills · ★ 11860 (+1480 this week) · —

**What it does:** A collection of agent skills and plugins for Google Stitch, a design-to-code tool, following the Agent Skills open standard so that coding agents like Codex, Claude Code, and Cursor can drive Stitch's design, build, and utility features over MCP.

**Why now:** The repo gained 1,480 stars this week, coinciding with Google Stitch's public MCP server rollout and growing adoption of standardized skill plugins across coding agents.

**Build with it:** Register the marketplace in Codex with `codex plugin marketplace add google-labs-code/stitch-skills --ref main` and install `stitch-design` to let your coding agent drive Stitch design generation directly from the CLI.

## 9. vectorize-io/hindsight

https://github.com/vectorize-io/hindsight · ★ 62665 (+1466 this week) · agentic-ai, agents, ai-memory, memory

**What it does:** Hindsight is an agent memory system that lets agents learn from past interactions rather than just replay conversation history, using retain, recall, and reflect operations backed by its own decision, rerank, and embedding models.

**Why now:** The project released Hindsight Models this week, open-weight models on Hugging Face purpose-built for agent memory tasks, with benchmarks showing state-of-the-art results on LongMemEval.

**Build with it:** Wrap an existing LLM client with the Hindsight LLM Wrapper, a two-line change per the README, to add persistent learning memory to any agent without touching the rest of your stack.

## 10. erkamyaman/rust-anything <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/erkamyaman/rust-anything · ★ 7917 (+1359 this week) · agent-skills, claude-code, cli, code-migration, codex, ffi, golang, java, javascript, mcp, migration, napi, performance, porting, pyo3, python, rewrite, ruby, rust, typescript

**What it does:** rust-anything records the runtime behavior of an existing app written in TypeScript, Python, Go, Ruby, Java, or C, then guides a coding agent to rewrite it in Rust one piece at a time, verifying each piece against that recording before moving on.

**Why now:** The repo hit 7,917 stars with 1,359 added this week and reached the number-one Rust repository of the day on Trendshift, a sharp spike driven by builders looking for a safe, incremental path to Rust rewrites.

**Build with it:** Point the Claude Code plugin at an existing Python or TypeScript CLI, let rust-anything record its behavior, and use the MCP server integration to drive the incremental rewrite with automated behavioral checks at each step.
