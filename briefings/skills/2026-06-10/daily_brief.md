# Skill Tastemakers — Daily Brief — 2026-06-10

_Ranking: bootstrap_since_first_seen · 10 repos · generated 2026-06-10T14:13:15.045Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_since_first_seen`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 21356 (+4700 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 60–95% using six algorithms while keeping answers accurate and originals retrievable on demand.

**Why now:** It gained 4,700 stars this week, likely riding the wave of developers hitting context-window limits as agents grow longer-running and tool-heavy—a pain point that's become unavoidable with complex Claude Code and Cursor workflows.

**Build with it:** Drop `compress(messages)` into any Python or TypeScript app, run it as a zero-code-change proxy in front of any OpenAI-compatible endpoint, or expose it as an MCP server so your agent automatically compresses inputs and retrieves originals only when needed—cutting API costs on long agentic loops immediately.

## 2. op7418/guizang-ppt-skill

https://github.com/op7418/guizang-ppt-skill · ★ 16304 (+762 this week) · ai-agent, claude-code, codex, html-deck, image-generation, ppt, presentation, skill, skills, swiss-design, web-ppt

**What it does:** Guizang PPT Skill is an AI-agent skill for Claude Code and Codex that generates polished single-file HTML slide decks in two distinct visual systems—editorial magazine style and Swiss International typography—plus matching images and multi-platform social covers.

**Why now:** The repo gained 762 stars this week, signaling strong builder momentum around agent-native presentation workflows that skip PowerPoint entirely and treat HTML/CSS as the output format.

**Build with it:** Install the skill, point it at a Markdown doc or article, and have an agent produce a complete 6–10 slide deck with generated images and social cover variants—then script the Swiss-style layout validator to enforce visual consistency across a batch of decks.

## 3. alistaitsacle/free-llm-api-keys · **NEW**

https://github.com/alistaitsacle/free-llm-api-keys · ★ 2102 (+378 this week) · ai, api, api-key, api-keys, chatgpt, claude, deepseek, free, free-api, free-api-key, free-gpt, free-llm, gemini, gpt, gpt4, grok, large-language-models, llm, llm-api, openai

**What it does:** A GitHub repository that publishes rotating, pre-funded LLM API keys (GPT-5.5, Claude, Gemini, DeepSeek, Grok) compatible with the OpenAI SDK, refreshed multiple times daily with no registration or credit card required.

**Why now:** The repo gained 378 stars this week, signaling a surge in developer interest likely tied to the GPT-5.5 and Grok 4.3 key availability at a moment when frontier model access costs are a real barrier.

**Build with it:** Drop a key into any OpenAI-compatible client to prototype multi-model comparisons, test prompts across 90+ models, or scaffold a small app without touching billing—ideal for rapid weekend experiments before committing to paid access.

## 4. can1357/oh-my-pi

https://github.com/can1357/oh-my-pi · ★ 11677 (+633 this week) · ai-agent, ai-coding-agent, anthropic, bun, claude, cli, coding-assistant, llm, mcp, multi-provider, openai, rust, terminal, tui, typescript

**What it does:** oh-my-pi (omp) is a terminal-based AI coding agent with 40+ LLM providers, 32 built-in tools, LSP/DAP integration, and a Rust core that handles hash-anchored file edits, browser automation, subagents, and Python execution out of the box.

**Why now:** It gained 633 stars this week, likely driven by benchmark results showing dramatic improvements over standard tool formats — including a tenfold SWE-bench lift on Grok Code Fast and 61% token reduction on Grok 4 Fast — at a moment when developers are actively comparing coding agent harnesses.

**Build with it:** Drop omp into a CI pipeline or local workflow as a programmable coding agent that can read, edit, debug, and browse across any model without prompt-tuning per provider; or extend it via MCP to wire your own tools into the same optimized harness.

## 5. alirezarezvani/claude-skills · **NEW**

https://github.com/alirezarezvani/claude-skills · ★ 17711 (+316 this week) · agent-plugins, agent-skills, agentic-ai, ai-coding-agent, anthropic-claude, claude-ai, claude-code, claude-code-plugins, claude-code-skills, claude-skills, codex-skills, coding-agent-plugins, cursor-skills, developer-tools, gemini-cli-skills, openai-codex, openclaw, openclaw-plugins, openclaw-skills, prompt-engineering

**What it does:** A library of 338 modular instruction packages ("skills") that give AI coding agents like Claude Code, Codex, and Gemini CLI domain expertise — engineering, compliance, finance, marketing, research — via structured SKILL.md files, 533 Python CLI scripts, and 676 reference templates.

**Why now:** Claude Code and competing agentic coding tools have hit mainstream adoption, but teams are still copy-pasting prompts ad hoc; this repo hit 17,711 stars with 316 added this week, signaling developers are actively looking for structured, reusable agent behavior packages right now.

**Build with it:** Drop the security or compliance skill pack into your Claude Code setup to get automated PreToolUse hooks and audit workflows, or wire the C-level persona commands into a Cursor workspace so your agent reviews architecture decisions from a CFO or CISO perspective without manual prompting.

## 6. mksglu/context-mode · **NEW**

https://github.com/mksglu/context-mode · ★ 16904 (+312 this week) · antigravity, claude, claude-code, claude-code-hooks, claude-code-plugins, claude-code-skill, codex, codex-cli, context-mode, copilot, cursor-plugin, kiro, mcp, mcp-server, mcp-tools, openclaw, opencode, pi-agent, skills, zed-extension

**What it does:** Context Mode intercepts MCP tool calls from AI coding agents and sandboxes their raw output—compressing things like Playwright snapshots and GitHub issue dumps by up to 98% before they consume context window space across 15 platforms including Claude Code, Cursor, and Copilot.

**Why now:** With Claude Code hooks now widely adopted and agentic coding sessions routinely hitting context limits mid-task, the week's +312 GitHub stars signal developers are actively hitting this wall and looking for infrastructure-level fixes rather than workarounds.

**Build with it:** Wire it into a long-running Claude Code or Codex CLI agent that crawls repos or scrapes docs, and you can run sessions 10x longer without hitting limits—making it practical to build autonomous refactoring pipelines or multi-step code review agents that previously fell apart after a few dozen tool calls.

## 7. manaflow-ai/cmux · **NEW**

https://github.com/manaflow-ai/cmux · ★ 21664 (+308 this week) · amp, claude-code, codex, gemini, ghostty, opencode, terminal, tmux

**What it does:** cmux is a macOS terminal built on Ghostty that adds vertical tabs, split panes, an in-app browser, and notification rings specifically designed to manage multiple AI coding agents (Claude Code, Codex, Gemini) running simultaneously without losing track of which one needs your input.

**Why now:** With 308 stars added this week and Claude Code's teammate mode becoming a practical multi-agent workflow, the bottleneck has shifted from running agents to monitoring them—cmux directly addresses that with its notification system and `cmux claude-teams` command that spawns teammates as native splits.

**Build with it:** Wire cmux into a multi-agent CI-style local setup where each branch runs its own Claude Code instance in a sidebar tab, use the scriptable in-app browser API (ported from agent-browser) to let agents interact with localhost previews, and hook SSH workspaces to run remote agents while routing browser panes through the remote network automatically.

## 8. jlcodes99/cockpit-tools

https://github.com/jlcodes99/cockpit-tools · ★ 11043 (+606 this week) · account-manager, ai, antigravity, codebuddy, codex, cursor, github-copilot, kiro, windsurf

**What it does:** Cockpit Tools is a Rust-built desktop app that manages multiple accounts across 12 AI IDEs simultaneously—Cursor, Copilot, Windsurf, Codex, Kiro, and more—with one-click account switching, quota monitoring, and parallel multi-instance launching.

**Why now:** It gained 606 stars this week, likely driven by the rapid proliferation of AI IDE free tiers and the friction developers face juggling accounts across Kiro (just launched by AWS), Codex, and Cursor to maximize free quotas.

**Build with it:** Use the local Codex API proxy sidecar to route requests across multiple accounts programmatically, letting you build a load-balancing layer that distributes AI coding tasks across accounts before any single quota ceiling is hit.

## 9. jnMetaCode/agency-agents-zh · **NEW**

https://github.com/jnMetaCode/agency-agents-zh · ★ 14452 (+301 this week) · agency-orchestrator, agent-definitions, ai-agents, ai-roles, chinese, claude, claude-code, copilot-agent, cursor-rules, deepseek, hermes-agent, llm, multi-agent, no-code, prompt-engineering, qwen, system-prompt, workbuddy, workflow

**What it does:** A Chinese-localized library of 215 plug-and-play AI agent role definitions, each with distinct personas, workflows, and deliverables, covering 18 departments and 17 AI coding tools including Claude Code, Cursor, and Copilot. It adds 50 China-specific agents for platforms like Xiaohongshu, Douyin, WeChat, and vertical domains like cross-border e-commerce and industrial Qt applications.

**Why now:** The project gained 301 stars this week, coinciding with growing adoption of agentic coding tools and a paired orchestration layer (Agency Orchestrator) that lets these roles execute as automated multi-agent DAG workflows with no code required.

**Build with it:** Drop the role definitions into Claude Code or Cursor, then use the Agency Orchestrator CLI to compose multi-agent pipelines in plain Chinese or YAML—prototype a full content marketing workflow for a Chinese platform launch, or wire together a security engineer and product manager agent to audit and spec a feature in one command.

## 10. wanshuiyin/Auto-claude-code-research-in-sleep · **NEW**

https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep · ★ 11861 (+282 this week) · ai-research, ai-tools, aris, autonomous-agent, claude, claude-code, claude-code-skills, codex, deep-learning, gpt, idea-generation, llm, machine-learning, mcp, mcp-server, ml-research, openai, paper-review, paper-writing, research-automation

**What it does:** ARIS is a Markdown-only skill library that wires autonomous ML research loops—idea generation, cross-model peer review, experiment automation, and paper drafting—into any LLM agent (Claude Code, Codex, Cursor, Copilot CLI) without requiring a dedicated framework or platform lock-in.

**Why now:** With 282 stars added this week and fresh adapters landing for Codex CLI and GitHub Copilot CLI, it's hitting critical mass as developers standardize on agent-native workflows and Claude's Opus 4.8 ultracode mode makes long-horizon research loops practically viable.

**Build with it:** Drop the skill files into your Claude Code or Codex project, point the `/cross-review` loop at your experiment outputs, and let the adversarial jury + research wiki accumulate structured findings overnight—then extend the same five-step loop to non-academic domains like investment due diligence or engineering postmortems using the ARIS-Anything fork.
