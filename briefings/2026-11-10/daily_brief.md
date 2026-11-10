# AI Tastemakers — Daily Brief — 2026-11-10

_Ranking: delta_7d · 10 repos · generated 2026-11-10T21:15:44.040Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 449694 (+23073 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (MCP is the protocol that lets AI agents call external tools) that lets agents reverse engineer binaries, mobile apps, and runtime behavior without source code, bridging tools like Hopper to explain features down to the native binary level.

**Why now:** The repo is trending at nearly 450k stars with 23k added this week, a sharp spike tied to growing builder interest in agent-driven reverse engineering workflows.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent (Claude Code, for example), then point it at a closed app to extract and replicate a specific feature for your own project.

## 2. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 110895 (+2493 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, Codex, and similar) authenticated read and search access to platforms they cannot reach on their own, including X, Reddit, YouTube, Bilibili, and XiaoHongshu, with no API fees.

**Why now:** The repo hit GitHub Trending number one this week with over 110,000 stars, at a moment when CLI-first agent workflows have become mainstream and free data access is a real competitive advantage.

**Build with it:** Point an MCP-compatible agent at Agent Reach using `agent-reach channels` to list available tools, then wire a specific channel like `agent-reach youtube transcript <url>` directly into your agent's tool-call loop.

## 3. ccch1mneyyy/dsh-Go

https://github.com/ccch1mneyyy/dsh-Go · ★ 18632 (+11278 this week) · ai-agent, android, android-app, coding-agent, deepseek, deepseek-harness, dsh, dsh-plugin, dsh-tui, flutter, llm

**What it does:** DSH Go is an Android app (Flutter/Dart, Android 8+) that runs DeepSeek Harness, an agentic coding tool, locally on a phone or remotely controls a desktop DSH instance, with animated on-screen pets that reflect agent state (typing, done, waiting for confirmation, idle).

**Why now:** The repo gained 11,278 stars this week and landed at Trendshift's number-one daily spot across all languages on 2026-10-30, a sharp spike in developer attention.

**Build with it:** Point the app at an existing DSH server over your local network and use the DSH plugin interface to trigger and confirm agentic coding tasks from your phone without touching the desktop.

## 4. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 68662 (+9738 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency dsh plugin that gives you free, uncapped access to frontier models including DeepSeek V4.1 Flash and Kimi K3, with no login, API key, or build step required.

**Why now:** The repo hit the top of Trendshift's JavaScript weekly chart for the week of October 5-11, 2026, pulling nearly 10,000 stars in a single week as builders chase no-credential access to current frontier models.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using its base URL and key to route requests through DeepSeek V4.1 Flash or Kimi K3 without touching an API account.

## 5. milind-soni/OpenMausBot

https://github.com/milind-soni/OpenMausBot · ★ 20580 (+8920 this week) · ai-agents, claude-code, codex, computer-use, docker, electron, grok, grok-bot, grok-bot-alternative, self-hosted, typescript

**What it does:** OpenMausBot is an Electron desktop app (Mac, Windows, Ubuntu) that gives each AI agent its own chat contact, model config, and sandboxed cloud computer, running Claude or Codex locally under a chat-app interface.

**Why now:** The repo gained roughly 8,900 stars this week, coinciding with fresh competitive positioning against Grok Bot, Meta Muse, OpenAI dots, and Cue by Manus as that product category heats up.

**Build with it:** Download the signed .dmg or .deb, wire in your Anthropic or OpenAI key, and test a Claude agent that browses and executes tasks inside its isolated VM without touching your host machine.

## 6. vercel-labs/agent-desktop

https://github.com/vercel-labs/agent-desktop · ★ 21294 (+8867 this week) · accessibility, accessibility-api, ai-agents, automation, cli, computer-use, computer-use-agent, computer-use-agents, desktop-automation, macos, mcp, rust

**What it does:** agent-desktop reads the OS accessibility tree of desktop apps on macOS, Windows, and Linux and returns JSON snapshots with stable refs that an AI agent can click or type on, with no screenshots or pixel matching required.

**Why now:** The repo gained nearly 9,000 stars this week as builders look for alternatives to vision-model screen control, and accessibility-tree-based computer use is the leading candidate.

**Build with it:** Run `agent-desktop snapshot --app <AppName> -i` to get a JSON ref map of a local app, feed those refs into tool calls, and drive `agent-desktop click` to automate UI workflows without touching the mouse.

## 7. homeassistant-ai/ha-mcp <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/homeassistant-ai/ha-mcp · ★ 6564 (+1152 this week) · ai, claude, hacs, home-assistant, home-automation, llm, mcp, model-context-protocol

**What it does:** HA-MCP is a Model Context Protocol server with 87 tools that lets AI assistants like Claude and ChatGPT control and configure a Home Assistant smart-home instance through natural language.

**Why now:** The project gained 1,152 stars this week, coinciding with the v9.0.0 release on October 28, 2026, which added a Marketplace install path for Home Assistant 2026.11 and an in-process server mode covering all HA installation types.

**Build with it:** Install the HA-MCP integration via the Home Assistant Marketplace or HACS, then connect Claude Desktop to the exposed MCP endpoint to drive automations and config changes through the 87 available tools.

## 8. lobehub/lobehub <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/lobehub/lobehub · ★ 84859 (+1078 this week) · agent, agent-collaboration, agent-harness, loop-engineering, mcp, personal-assistant, proactive-agent, skills, super-agent, task-management

**What it does:** LobeHub adds persistent AI agents to team chat workflows, where each agent takes on tasks autonomously and improves over time through a skills and memory loop.

**Why now:** The repo gained over 1,000 stars this week and topped Product Hunt's daily rankings, a signal of real builder traction around autonomous agent collaboration.

**Build with it:** Deploy the Docker Compose setup, connect an agent via the MCP integration surface, and assign it a recurring task to validate the autonomous loop firsthand.

## 9. NVIDIA/SkillSpector

https://github.com/NVIDIA/SkillSpector · ★ 25199 (+1007 this week) · agent-security, agent-skills, agentic-ai, ai-security, claude-code, mcp, prompt-injection, security-scanner, security-tools, security-workflow, supply-chain-security

**What it does:** SkillSpector is a static and LLM-assisted security scanner for AI agent skills (plugins for tools like Claude Code, Codex CLI, Gemini CLI, and MCP servers) that checks for 71 vulnerability patterns across 17 categories, including prompt injection, data exfiltration, and supply-chain risks, before installation.

**Why now:** The repo is gaining over 1,000 stars this week, and NVIDIA's own research found 26.1% of a 31,132-skill dataset contained vulnerabilities, making pre-install scanning a practical necessity as agent skill ecosystems grow fast.

**Build with it:** Add SkillSpector to a CI gate using `uv tool install` and pipe its SARIF output into GitHub Advanced Security to block pull requests that introduce malicious or vulnerable skills.

## 10. QingYunA/answer-me-with-html

https://github.com/QingYunA/answer-me-with-html · ★ 6203 (+1000 this week) · agent-skill, ai-agent, claude-code, claude-code-skill, claude-skill, claude-skills, cli, diagram, dsh-plugin, explainer, html, llm, ste100

**What it does:** answer-me-with-html is an agent skill for Claude Code, Codex, Cursor, and similar tools that converts a plain question into a styled single-page HTML document, with the model writing only Markdown content while a CLI generates the SVG diagrams, CSS, and HTML tags, cutting token usage to roughly one-eighth of hand-written HTML.

**Why now:** The repo gained 1,000 stars this week, likely tied to growing adoption of agent skill ecosystems around Claude Code and the practical cost pressure of high token usage.

**Build with it:** Install the skill into your Claude Code setup and add a CLAUDE.md trigger so any question prefixed with a keyword automatically pipes the model's Markdown draft through the bundled CLI to produce a shareable HTML page.
