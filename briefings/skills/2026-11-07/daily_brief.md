# Skill Tastemakers — Daily Brief — 2026-11-07

_Ranking: delta_7d · 10 repos · generated 2026-11-07T19:23:10.478Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 186293 (+4868 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent skill (a small installable behavior module for AI coding agents) that pushes agents toward YAGNI-style restraint, cutting generated code, time, cost, and token usage while keeping test coverage high on risky logic.

**Why now:** The project hit Hacker News this week and is picking up momentum fast, so the conversation about minimal-output agent behavior is worth joining before it hardens into a default assumption.

**Build with it:** Drop the skill into a Claude Code project and benchmark your next feature task against a baseline run to see how much code the agent stops writing.

## 2. obra/superpowers

https://github.com/obra/superpowers · ★ 314020 (+4086 this week) · ai, brainstorming, coding, obra, sdlc, skills, subagent-driven-development, superpowers

**What it does:** Superpowers is a shell-based framework of installable agent skills that wires spec-first, test-driven, subagent-driven workflows into coding agents like Claude Code, Cursor, and Codex without requiring manual prompting each time.

**Why now:** Competing agentic skill suites like JDS and Arxitect are surfacing on Hacker News this week, marking a fast-moving moment for structured AI coding behavior before one approach dominates.

**Build with it:** Install into Claude Code via `/plugin install superpowers@superpowers-marketplace`, then run the spec-gathering and subagent loop against an existing feature request to see how the workflow holds up against your codebase.

## 3. morluto/rea

https://github.com/morluto/rea · ★ 440519 (+25499 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a protocol layer that connects AI agents to external tools) that gives agents access to reverse engineering tooling, letting them inspect binaries, app behavior, and runtime internals without source code.

**Why now:** A Hacker News thread this week pulled 101 points and 39 comments around agent-driven binary analysis, pointing to genuine builder curiosity rather than hype.

**Build with it:** Run `npx rea-agents setup` to connect REA to your MCP-compatible agent and have it trace how a closed-source app feature works down to the binary level.

## 4. vectorize-io/hindsight

https://github.com/vectorize-io/hindsight · ★ 59703 (+2756 this week) · agentic-ai, agents, ai-memory, memory

**What it does:** Hindsight is a Python agent memory system that learns from past interactions rather than just replaying conversation history, reaching state-of-the-art results on the LongMemEval benchmark.

**Why now:** The project gained roughly 2,756 stars this week and recently shipped Hindsight Models, open-weight decision, rerank, and embedding models built specifically for agent memory and available on Hugging Face.

**Build with it:** Wrap an existing LLM client with Hindsight's two-line LLM Wrapper integration to add persistent, learning memory to any agent without touching the rest of your stack.

## 5. paperclipai/paperclip

https://github.com/paperclipai/paperclip · ★ 111966 (+2595 this week) · acpx, agent-orchestration, agent-skills, agentic-ai, ai-agents, ai-engineering, ai-governance, ai-tools, autonomous-agents, claude, claude-code, claude-skills, codex, hermes, llm, mcp, multi-agent, openclaw, project-management, workflow-automation

**What it does:** Paperclip is an open-source Node.js server and React UI that lets you assemble a team of AI agents (CEO, engineers, marketers, any provider), assign a business goal, set budgets, and monitor work and costs from one dashboard.

**Why now:** The repo gained roughly 2,600 stars this week as tools like OpenClaw, Claude Code, and Codex converge on similar multi-agent workflows, putting cost governance front and center for teams evaluating these setups.

**Build with it:** Clone the repo, wire in an existing agent via the adapter config, define a goal, and use the dashboard's budget controls to test how cost governance behaves across a small agent team.

## 6. google/skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/google/skills · ★ 23259 (+1538 this week) · google, googlecloud, skills

**What it does:** A collection of installable agent skills (small behavior modules that plug into coding agents) covering Google Cloud auth, RAG, multi-agent security, GKE AI migration, and more, installed via `npx skills add google/skills`.

**Why now:** The repo gained over 1,500 stars this week, tracking with builder interest in Google Cloud's agent tooling ecosystem as the skills spec gains wider adoption.

**Build with it:** Run `npx skills add google/skills`, select the "Build and deploy AI agents on Google Cloud" skill, and plug it into your coding agent to get structured, Google-validated guidance directly inside your agentic workflow.

## 7. mattpocock/skills

https://github.com/mattpocock/skills · ★ 317518 (+9337 this week) · —

**What it does:** A collection of small, composable agent skills for Claude Code, Codex, Copilot, and other coding agents, targeting specific failure modes in real engineering workflows rather than handing everything to an opinionated framework.

**Why now:** The repo gained over 9,000 stars this week as developers look for alternatives to full-autopilot approaches like BMAD and GSD that often skip steps or ignore project context.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to drop editable skill files into an existing Cursor project, then trigger `/setup-matt-pocock-skills` to connect your issue tracker and triage labels.

## 8. D4Vinci/Scrapling

https://github.com/D4Vinci/Scrapling · ★ 99234 (+8426 this week) · ai, ai-scraping, automation, crawler, crawling, crawling-python, data, data-extraction, mcp, mcp-server, playwright, python, scraping, selectors, stealth, web-scraper, web-scraping, web-scraping-python, webscraping, xpath

**What it does:** Scrapling is a Python web scraping framework covering everything from single HTTP requests to full browser-based crawls, with built-in stealth, adaptive element tracking that survives layout changes, and an MCP server for agent integration.

**Why now:** The repo gained over 8,000 stars this week, making it a practical moment to evaluate Scrapling before the tooling ecosystem around it locks in.

**Build with it:** Point Scrapling's Playwright-backed fetcher at a bot-protected site and let the adaptive selector engine pull data that holds up through layout changes without rewriting your scraper.

## 9. ConardLi/garden-skills

https://github.com/ConardLi/garden-skills · ★ 14602 (+1166 this week) · agent, claude, gpt-image-2, rag, skills, web-design

**What it does:** Garden Skills is a curated set of six plug-and-play agent skills (following the SKILL.md spec) covering motion video rendering, web design, GPT Image 2 prompting, article generation, and local knowledge retrieval for Claude Code, Cursor, and Codex.

**Why now:** The repo gained over 1,100 stars this week, tracking with rising builder interest in Claude Code's plugin ecosystem since Anthropic formalized the Skills spec.

**Build with it:** Install a skill into a Claude Code project using `npx skills`, then invoke the `web-design-engineer` skill to get agent-driven frontend generation without writing any custom prompt scaffolding.

## 10. milind-soni/OpenMausBot

https://github.com/milind-soni/OpenMausBot · ★ 16779 (+7335 this week) · ai-agents, claude-code, codex, computer-use, docker, electron, expo, grok, grok-bot, grok-bot-alternative, self-hosted, typescript

**What it does:** OpenMausBot is an Electron desktop app for Mac, Windows, and Ubuntu that runs Claude or Codex agents as chat-sidebar contacts, each with its own personality, model config, and sandboxed cloud computer for tool use.

**Why now:** The repo gained 7,335 stars this week as builders look for self-hosted alternatives to closed agent UIs like Grok Bot, Meta Muse, and OpenAI dots.

**Build with it:** Wire in your own Claude or Codex API key, assign the agent a persona and connected app, and use the built-in approval flow to review what the agent plans to execute before it acts.
