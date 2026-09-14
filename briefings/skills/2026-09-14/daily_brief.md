# Skill Tastemakers — Daily Brief — 2026-09-14

_Ranking: delta_7d · 10 repos · generated 2026-09-14T18:38:58.857Z_


## 1. langwatch/langwatch <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/langwatch/langwatch · ★ 4779 (+1254 this week) · agent-testing, ai, analytics, datasets, dspy, evaluation, gpt, llm, llm-ops, llmops, low-code, observability, observability-platform, openai, prompt-engineering, simulation-testing

**What it does:** LangWatch is an open-source LLMOps platform covering tracing, evaluation, prompt management, an AI gateway with virtual keys, and coding-agent cost tracking across tools like Claude Code and Codex.

**Why now:** The repo gained 1,254 stars this week alongside a Hacker News thread surfacing its DSPy optimizer experiment-tracking UI, placing it in front of the growing DSPy community at a moment of active discovery.

**Build with it:** Run `npx langwatch claude` to proxy your Claude Code sessions and immediately see per-pull-request token costs in the LangWatch dashboard.

## 2. kepano/obsidian-skills

https://github.com/kepano/obsidian-skills · ★ 48315 (+8206 this week) · agents, agentskills, bases, claude, clawdbot, cli, codex, defuddle, hermes, jsoncanvas, markdown, md, obsidian, openclaw, opencode, skills

**What it does:** A collection of Agent Skills–spec–compliant skill files that teach Claude Code, Codex, or OpenCode how to read and write Obsidian-native formats — Markdown with wikilinks, Bases, JSON Canvas, and CLI commands.

**Why now:** The repo gained over 8,000 stars this week, coinciding with fresh Agent Skills specification tooling (`npx skills`) and OpenCode's auto-discovery support landing as first-class installation paths.

**Build with it:** Clone the repo into `~/.opencode/skills/obsidian-skills/` and restart OpenCode to immediately give your agent grounded knowledge of Obsidian Bases syntax for querying vault data without hallucinating unsupported filters.

## 3. career-ops-hq/career-ops <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/career-ops-hq/career-ops · ★ 71589 (+1148 this week) · ai, ai-agent, anthropic, ats, automation, beginner-friendly, career, careerops, claude, claude-code, cli, first-timers-only, golang, good-first-issue, interview-prep, job-application, job-hunting, job-search, open-source, resume

**What it does:** career-ops is an open-source multi-agent system that runs inside AI coding CLIs (Claude Code, Codex, OpenCode) to scan job portals, score listings A–H on a 1–5 scale, tailor your CV per role, and track applications locally.

**Why now:** Business Insider and WIRED both ran features on the project this week, surfacing it to a wider builder audience as it crossed 71k stars.

**Build with it:** Drop the CLAUDE.md agent config into an existing Claude Code workspace and point it at a job board URL to get a structured evaluation report without writing any scraper code yourself.

## 4. pacifio/atlas <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/pacifio/atlas · ★ 4397 (+1131 this week) · ai, ai-coding-assistant, claude-code, codex, coding-agents, git, gitops, kilo-code, mcp, mcp-client, opencode, opencode-ai, opencode-skills, self-hosted, skills

**What it does:** Atlas is a macOS desktop app (Tauri/Rust) that wraps multiple coding agents—Claude Code, Codex, and ACP registry agents—under a shared Git checkpoint layer, linking every commit to the prompts, tool calls, and reasoning that produced it.

**Why now:** The repo gained 1,131 stars this week, reflecting spiking builder interest in multi-agent orchestration as Claude Code and Codex usage converges on the same codebases.

**Build with it:** Drop a `CLAUDE.md` or `AGENTS.md` into an existing project, open it in Atlas, and run Claude Code and Codex side by side against the same branch to compare checkpoint histories across agents.

## 5. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 138229 (+7502 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a skill/prompt layer for AI coding agents (Claude Code, Cursor, and 20 others) that enforces YAGNI discipline — replacing verbose, over-engineered output with the minimal code that actually solves the task.

**Why now:** The repo gained 7,502 stars this week and is trending on Trendshift daily and weekly charts, with a freshly published agentic benchmark (2026-06-18) showing a measured ~54% mean token/code reduction against a fair baseline across 12 real feature tasks.

**Build with it:** Drop the ponytail skill into your Claude Code setup via `@dietrichgebert/ponytail` on npm and immediately test it against a known over-builder task — like a date picker — to see the reduction in generated code versus your current baseline.

## 6. can1357/oh-my-pi

https://github.com/can1357/oh-my-pi · ★ 31106 (+1116 this week) · ai-agent, ai-coding-agent, anthropic, bun, claude, cli, coding-assistant, llm, mcp, multi-provider, openai, rust, terminal, tui, typescript

**What it does:** oh-my-pi (omp) is a terminal coding agent that bundles 60+ LLM providers, 31 built-in tools, LSP and DAP integrations, and an ~80k-line Rust core into a single CLI with the IDE wired directly in.

**Why now:** The repo gained over 1,100 stars this week, and PRs are temporarily open to all contributors without the previous vouch requirement — a concrete window to get changes merged.

**Build with it:** Install via `bun install -g @oh-my-pi/pi-coding-agent` and wire omp into an existing project's workflow by pointing it at your codebase to exercise its 14 LSP operations against your language server.

## 7. rtk-ai/rtk

https://github.com/rtk-ai/rtk · ★ 80350 (+1098 this week) · agentic-coding, ai-coding, anthropic, claude-code, cli, command-line-tool, cost-reduction, developer-tools, llm, open-source, productivity, rust, token-optimization

**What it does:** RTK is a single Rust binary that intercepts shell commands (ls, git diff, cargo test, pytest, and 100+ others) and compresses their output before it reaches an LLM agent's context window, cutting bash output by up to 90%.

**Why now:** The repo crossed 80K stars with 1,098 added this week, signaling a sharp spike in adoption likely tied to the current wave of agentic coding tools burning through context limits.

**Build with it:** Drop `rtk` in front of your Claude Code or Cursor shell commands as a transparent proxy and immediately measure real token reduction on your own codebase using the usage stats RTK prints per invocation.

## 8. sergebulaev/linkedin-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/sergebulaev/linkedin-skills · ★ 2336 (+1078 this week) · agent-skill, agent-skills, ai-agents, ai-content, ai-marketing, anthropic, awesome-claude, claude-code, claude-skills, content-creation, content-engineering, linkedin, linkedin-automation, linkedin-engineering, llm-tools, openclaw-skill, personal-branding, prompt-engineering, skill-md, social-media-automation

**What it does:** A set of 12 Claude Code / Codex skills—installed via `codex plugin add` or a claude.ai Plugin tab—that draft LinkedIn posts, comments, and replies in your voice, strip AI tells, and gate publishing behind an explicit approval step.

**Why now:** The repo gained 1,078 stars this week, signaling a spike in builder interest likely tied to growing experimentation with Claude Code as an agentic workflow tool beyond coding tasks.

**Build with it:** Clone the repo, drop it into an OpenClaw working directory, and add the provided system-prompt snippet to route any LinkedIn task through the skill's `SKILL.md` files—validating the approve-before-publish flow without touching the publishing API.

## 9. ahujasid/blender-mcp <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ahujasid/blender-mcp · ★ 28558 (+1040 this week) · 3d-modeling, ai, blender, blender-addon, claude, generative-ai, llm, mcp, model-context-protocol, python

**What it does:** blender-mcp is a Python package and Blender addon that bridges Blender's 3D viewport to any MCP-compatible LLM client (Claude Desktop, Cursor, VS Code, etc.) so you can drive object creation, scene manipulation, and modeling via natural-language prompts.

**Why now:** The repo gained 1,040 stars this week, signaling a sharp spike in developer attention that makes it a timely integration target before the ecosystem tooling consolidates.

**Build with it:** Add `uvx blender-mcp` to your Claude Desktop MCP config, install the addon via `uvx blender-mcp install-addon`, and use Claude to procedurally generate 3D scenes directly from a chat prompt.

## 10. Egonex-AI/Understand-Anything

https://github.com/Egonex-AI/Understand-Anything · ★ 82729 (+986 this week) · antigravity-skills, business-knowledge, claude-code, claude-skills, codebase-analysis, codex, codex-skills, developer-tools-ai-agent, gemini-cli-skills, karpathy-llm-wiki, knowledge-base, knowledge-graph, memory, opencode-skills, pi-agent, understandcode, vibe-coding

**What it does:** Understand Anything runs a multi-agent pipeline over any codebase or docs, builds a knowledge graph of every file, function, class, and dependency, then serves an interactive dashboard for visual exploration, search, and Q&A.

**Why now:** The repo has crossed 82K stars with nearly 1,000 added this week, driven by fresh plugin integrations across Claude Code, Gemini CLI, Codex, and OpenCode that make it drop-in usable across most current AI coding workflows.

**Build with it:** Install it as a Claude Code plugin and point it at an unfamiliar monorepo to get an explorable dependency graph before touching a single file.
