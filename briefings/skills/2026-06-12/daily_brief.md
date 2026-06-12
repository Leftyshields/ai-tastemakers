# Skill Tastemakers — Daily Brief — 2026-06-12

_Ranking: bootstrap_since_first_seen · 10 repos · generated 2026-06-12T14:18:45.452Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_since_first_seen`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 24108 (+7452 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

**What it does:** Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 60–95% using six algorithms, available as a Python/TypeScript library, a drop-in proxy, or an MCP server.

**Why now:** It hit 24,000 stars this week with 7,452 new stars, signaling a wave of builders hitting context-window ceilings as agentic workflows grow longer and tool call chains get expensive.

**Build with it:** Drop `headroom proxy --port 8787` in front of any existing OpenAI-compatible agent to instantly cut token costs with zero code changes, or use the MCP server to add compression and cross-agent shared memory to Claude Code or Cursor today.

## 2. op7418/guizang-ppt-skill

https://github.com/op7418/guizang-ppt-skill · ★ 16845 (+1303 this week) · ai-agent, claude-code, codex, html-deck, image-generation, ppt, presentation, skill, skills, swiss-design, web-ppt

**What it does:** Guizang PPT Skill is an AI-agent skill (targeting Claude Code and Codex) that generates polished single-file HTML slide decks in two distinct visual systems—an editorial magazine style and a Swiss International grid style—plus image prompts and multi-platform social covers.

**Why now:** The repo gained 1,303 stars this week, signaling rapid adoption as developers look for agent-native alternatives to PowerPoint generation; it ships 22 locked Swiss layouts and a GPT-Image 2.0 image pipeline that are immediately usable inside Codex workflows.

**Build with it:** Install the skill into Claude Code, feed it a Markdown doc or article, and have it generate a 6–10 slide deck with auto-generated documentary photos and flow diagrams, then export matching WeChat, Xiaohongshu, and video channel covers from the same content in one session.

## 3. can1357/oh-my-pi

https://github.com/can1357/oh-my-pi · ★ 12045 (+1001 this week) · ai-agent, ai-coding-agent, anthropic, bun, claude, cli, coding-assistant, llm, mcp, multi-provider, openai, rust, terminal, tui, typescript

**What it does:** oh-my-pi (omp) is a terminal-based AI coding agent with 40+ LLM providers, 32 built-in tools, LSP/DAP integration, and a Rust core that uses hash-anchored edits to make file modifications land reliably across any model.

**Why now:** It jumped 1,001 stars this week, likely driven by its documented benchmark results showing dramatic improvements on newly-released models like Grok 4 Fast (−61% tokens) and Grok Code Fast 1 (6.7% → 68.3% task pass rate) — making it a practical testbed as those models drop.

**Build with it:** Wire it into a CI pipeline or Dockerfile as a headless coding agent (`omp` ships non-interactive flags), swap models per task using `--smol`/`--slow`/`--plan` flags, or extend it via MCP to give the agent access to your own internal tools and APIs.

## 4. Agents365-ai/drawio-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Agents365-ai/drawio-skill · ★ 2581 (+416 this week) · agent-skill, agent-skills, architecture-diagram, claude-code, claude-code-skill, claude-skills, diagram, drawio, erd, flowchart, openclaw, openclaw-skills, skill-md, skillsmp, uml

**What it does:** drawio-skill converts natural-language descriptions into production-ready `.drawio` XML diagrams (ERD, UML, sequence, architecture, flowchart, ML pipelines) and exports PNG/SVG/PDF/JPG via the draw.io CLI, with built-in shape search across 10,000+ official AWS/Azure/GCP/Kubernetes icons and 321 AI/LLM brand logos.

**Why now:** The project gained 416 stars this week, signaling a surge of interest likely tied to growing Claude Code adoption and the need for agents that can produce structured visual artifacts — not just text — as outputs.

**Build with it:** Drop `SKILL.md` into your Claude Code, Cursor, or Copilot workspace and have an agent auto-generate architecture diagrams directly from your codebase's import graph, or wire it into a multi-agent pipeline to produce exportable system diagrams as a build step.

## 5. jlcodes99/cockpit-tools

https://github.com/jlcodes99/cockpit-tools · ★ 11236 (+799 this week) · account-manager, ai, antigravity, codebuddy, codex, cursor, github-copilot, kiro, windsurf

**What it does:** Cockpit Tools is a Rust-built desktop app that lets you manage multiple accounts across a dozen AI IDEs—Cursor, Copilot, Windsurf, Kiro, Codex, and more—with one-click account switching, quota monitoring, and parallel multi-instance launching from a single dashboard.

**Why now:** The repo jumped 799 stars this week, likely tracking the explosion of competing AI IDEs and the real pain of juggling free-tier quotas across Kiro (just launched), Codex, and Copilot simultaneously.

**Build with it:** Use Cockpit's multi-instance isolation to run automated parallel coding agents across different accounts and projects—pair it with the exposed local Codex API proxy to build quota-aware orchestration scripts that route tasks to whichever account has remaining capacity.

## 6. rohitg00/agentmemory

https://github.com/rohitg00/agentmemory · ★ 22488 (+792 this week) · agentmemory, agents, ai, claude, claudecode, codex, copilot, cursor, genai, harness, hermes, memory, openclaw

**What it does:** agentmemory is a persistent memory layer for AI coding agents (Claude Code, Copilot, Cursor, Codex, etc.) that stores context across sessions using a hybrid search engine with confidence scoring, knowledge graphs, and lifecycle management exposed via 53 MCP tools.

**Why now:** The repo spiked 792 stars this week, signaling strong developer demand as MCP becomes the de facto integration standard and teams hit the wall of re-explaining project context to agents every session.

**Build with it:** Drop it into any MCP-compatible agent to give it cross-session memory of your codebase conventions, decisions, and preferences—or extend it to build team-shared memory stores where multiple agents and developers share a single persistent knowledge graph.

## 7. zarazhangrui/frontend-slides

https://github.com/zarazhangrui/frontend-slides · ★ 21384 (+753 this week) · ai-slides, anthropic, claude, claude-code, claude-skill, generative-ui, html, presentation, slides, vibe-coding

**What it does:** Frontend Slides is a Claude Code plugin (and portable `SKILL.md`) that turns a coding agent into a presentation designer — generating single-file HTML slide decks with inline CSS/JS, no build tools required, from a text prompt or an uploaded PowerPoint file.

**Why now:** The repo gained 753 stars this week, signaling a surge of interest in vibe-coded, agent-driven UI generation as Claude Code's plugin marketplace makes skills like this trivially installable with two commands.

**Build with it:** Drop it into Claude Code and have it generate a client-facing demo deck, internal spec presentation, or investor pitch in one session — then own a clean, commented HTML file you can host anywhere or hand off to a designer to restyle.

## 8. mukul975/Anthropic-Cybersecurity-Skills

https://github.com/mukul975/Anthropic-Cybersecurity-Skills · ★ 15467 (+727 this week) · ai-agents, claude-code, cloud-security, cybersecurity, devsecops, ethical-hacking, incident-response, infosec, llm, malware-analysis, mcp, mitre-attack, nist-csf, osint, penetration-testing, red-team, security, security-automation, threat-hunting, threat-intelligence

**What it does:** This open-source library provides 754 structured cybersecurity skills for AI agents across 26 domains, each mapped to five industry frameworks (MITRE ATT&CK, NIST CSF 2.0, MITRE ATLAS, D3FEND, and NIST AI RMF) and compatible with Claude Code, Cursor, GitHub Copilot, and 20+ other platforms.

**Why now:** The repo gained 727 stars this week, signaling strong community momentum, and sits at the intersection of two accelerating trends: agentic AI tooling going mainstream and enterprise demand for framework-compliant security automation.

**Build with it:** Drop these skills into a Claude Code or Cursor agent to build a threat-hunting copilot that automatically maps detections to ATT&CK techniques, generates NIST CSF-aligned incident reports, or guides analysts through memory forensics and cloud breach scoping with senior-level context.

## 9. open-gsd/gsd-core

https://github.com/open-gsd/gsd-core · ★ 3747 (+726 this week) · claude-code, context-engineering, meta-prompting, spec-driven-development

**What it does:** GSD Core is a meta-prompting framework that runs AI coding agents (Claude Code, Gemini CLI, Cursor, etc.) through a structured five-phase loop—Discuss, Plan, Execute, Verify, Ship—spinning up fresh-context subagents for each phase to prevent context rot from degrading output quality.

**Why now:** The project gained 726 stars this week, coinciding with surging adoption of agentic coding tools and growing frustration with long-running sessions where AI output degrades as the context window fills up.

**Build with it:** Drop it into any existing codebase with `npx @opengsd/gsd-core@latest`, then use `/gsd-new-project` to scaffold a spec-driven milestone and let parallel executors each start with a clean 200k-token context—practical for teams shipping features with Claude Code or Codex who want repeatable, reviewable AI-assisted workflows.

## 10. DeusData/codebase-memory-mcp <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/DeusData/codebase-memory-mcp · ★ 3369 (+347 this week) · aider, ast, claude-code, code-analysis, code-intelligence, codex, cursor, cypher, developer-tools, gemini-cli, graph-visualization, kilocode, knowledge-graph, mcp, mcp-server, model-context-protocol, opencode, sqlite, tree-sitter, windsurf

**What it does:** codebase-memory-mcp is a single static binary MCP server that parses any codebase into a persistent knowledge graph using tree-sitter AST analysis across 158 languages, answering structural queries (functions, call chains, HTTP routes, cross-service links) in under 1ms with 14 MCP tools.

**Why now:** It surged 347 stars this week, likely driven by the proliferation of AI coding agents (Cursor, Claude Code, Codex, Gemini CLI) that burn massive token budgets re-reading files — this tool cuts that by 99% and reduces tool calls by 2.1× according to its published benchmark across 31 real repos.

**Build with it:** Drop this into any multi-agent pipeline where one agent needs to reason about a large unfamiliar codebase — wire it to Claude Code or Cursor via the MCP config, then build agents that navigate call graphs, trace HTTP route ownership, or detect cross-service dependencies without ever loading raw source files.
