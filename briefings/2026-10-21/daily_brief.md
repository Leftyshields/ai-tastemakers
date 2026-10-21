# AI Tastemakers — Daily Brief — 2026-10-21

_Ranking: delta_7d · 10 repos · generated 2026-10-21T18:01:15.637Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 355977 (+120311 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is an MCP server (a standardized interface for connecting tools to AI agents) that lets agents inspect closed-source software—native binaries, Electron apps, .NET assemblies, and websites—using Hopper or Ghidra as the disassembly backend.

**Why now:** The repo crossed 120,000 stars this week, a rare velocity spike that puts it ahead of most tooling projects before the broader developer crowd arrives.

**Build with it:** Run `npx rea-agents setup` to register REA with your agent, then point it at a closed-source app to extract and replicate a specific feature into your own codebase.

## 2. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 33556 (+17550 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency plugin for the DeepSeek Harness (`dsh`) runtime that routes calls to DeepSeek V4.1 Flash, Kimi K3, and a Kilo AI free pool with no account, API key, or quota approval required.

**Why now:** It hit #1 on GitHub Trending (daily and JavaScript weekly, week of 2026-10-05) with 17,550 stars added in a week—the clearest current signal of builder hunger for no-auth LLM access.

**Build with it:** Point any OpenAI-compatible tool at the plugin's local forwarding port (`base URL` plus the provided key) to drop free, cap-less model calls into an existing chat or agent workflow.

## 3. D4Vinci/Scrapling

https://github.com/D4Vinci/Scrapling · ★ 89016 (+1479 this week) · ai, ai-scraping, automation, crawler, crawling, crawling-python, data, data-extraction, mcp, mcp-server, playwright, python, scraping, selectors, stealth, web-scraper, web-scraping, web-scraping-python, webscraping, xpath

**What it does:** Scrapling is a Python web-scraping framework covering single HTTP requests through full browser-based crawls, with built-in stealth, adaptive element tracking that survives page layout changes, and an MCP server interface for wiring scrapers directly into AI agents.

**Why now:** The repo gained ~1,479 stars this week as MCP-based tool integrations become a standard pattern for giving agents live web access—Scrapling's native MCP support puts it ahead of wrappers built on top of general-purpose scrapers.

**Build with it:** Point Scrapling's MCP server at an existing AI agent workflow to add live web-scraping without writing custom fetch logic.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 171186 (+7788 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent skill—a drop-in behavior layer—that steers AI coding agents (Claude Code, Cursor, and 18 others) toward YAGNI decisions: less code, fewer tokens, and focused test coverage on logic identified as risky.

**Why now:** The v5 release benchmarked a 53% code reduction and 98% risky-logic test coverage versus a 68% baseline across 39 real tasks on Claude Code with Opus 5.5, giving teams a concrete reference point rather than anecdotal claims.

**Build with it:** Add `@dietrichgebert/ponytail` to your Claude Code config as a skill, then measure token and line-count deltas on your own repo against those published benchmarks.

## 5. citrolabs/ego-lite

https://github.com/citrolabs/ego-lite · ★ 18488 (+1101 this week) · agent-skills, ai-agent, automation, browser, browser-automation, claude-code, codex, hermes-agent, skills, skills-sh

**What it does:** ego lite is a macOS/Windows desktop browser that runs AI agent tasks in isolated "Spaces" alongside normal browsing, exposing your real logins and open tabs to agents like Codex or Claude Code via the `ego-browser` package without surrendering full browser control.

**Why now:** The repo gained 1,101 stars this week as authenticated browser access remains one of the most common blockers for autonomous coding agents during active Codex and Claude Code adoption cycles.

**Build with it:** Wire an existing Claude Code or Codex workflow to `ego-browser` to hand the agent authenticated sessions, then compare task completion speed and token cost against a Playwright or browser-use setup.

## 6. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 55292 (+1074 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source book covering AI agent design and engineering across 10 chapters—using the framing Agent = LLM + Context + Tools—with 109 hands-on Python experiments and translations into 15 languages.

**Why now:** The repo hit GitHub Trending as Project of the Day this week on the back of a v2.0 restructure that pulled multimodal agents and async interaction into a new dedicated chapter on observation and action spaces.

**Build with it:** Clone the repo and run the chapter-aligned experiments locally to test RAG, MCP, or multi-agent patterns against your own LLM endpoint before committing to a framework.

## 7. vllm-project/vllm <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/vllm-project/vllm · ★ 94771 (+982 this week) · amd, blackwell, cuda, deepseek, deepseek-v3, gpt, gpt-oss, inference, kimi, llama, llm, llm-serving, model-serving, moe, openai, pytorch, qwen, qwen3, tpu, transformer

**What it does:** vLLM is a Python inference engine for self-hosting LLMs at high throughput, using PagedAttention and continuous batching to serve 200+ Hugging Face model architectures across NVIDIA, AMD, and other hardware behind an OpenAI-compatible API.

**Why now:** The repo gained nearly 1,000 stars this week and explicitly tags DeepSeek-V3, Qwen3, and Kimi—three models dominating builder conversations right now—making it the lowest-friction path to self-hosting any of them.

**Build with it:** Run `uv pip install vllm && vllm serve <model>` to stand up a local endpoint, then swap it into any existing OpenAI SDK client by changing the base URL.

## 8. vibheksoni/stealth-browser-mcp <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/vibheksoni/stealth-browser-mcp · ★ 3196 (+973 this week) · ai-agent-tools, ai-tools, anthropic, anti-bot-bypass, automation-tools, browser-automation, chrome-devtools, claude-mcp, cloudflare-bypass, developer-tools, fastmcp, mcp-server, model-context-protocol, network-interception, nodriver, python, stealth-browser, undetectable-browser, web-automation, web-scraping

**What it does:** Stealth Browser MCP exposes 101 Chrome DevTools Protocol-backed browser-automation tools over MCP (the standard interface for connecting tools to AI agents), letting agents navigate Cloudflare challenges, intercept network traffic, and clone DOM elements using real Chrome instances via the nodriver library.

**Why now:** The repo gained ~973 stars this week as agent workflows increasingly hit bot-protected and paywalled pages that standard Playwright or Selenium setups fail on.

**Build with it:** Point a Claude Desktop or FastMCP client at the server and use the network-hook tools to intercept request payloads from a login-walled site—the fastest way to confirm whether its bypass capability holds against your specific target.

## 9. nano-muse/nanoMuse <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/nano-muse/nanoMuse · ★ 2137 (+957 this week) · agent-skills, ai-agent, android, computer-use, cross-device, desktop-app, gui-agent, ios, linux, llm, mcp, meta-muse, mobile-agent, muse, nanomuse, openminis, openmuse, personal-agent

**What it does:** nanoMuse is an open-source personal agent that runs across iOS, Android, Windows, macOS, Linux, and browser, executes tasks autonomously in the background, persists memory across sessions, and asks before taking irreversible actions.

**Why now:** The project shipped v1.0.5 ("Lookout") and gained 957 stars in seven days, positioning itself as the self-hostable counterpart to Meta's newly announced Muse personal AI agent.

**Build with it:** Deploy the self-hosted relay from this repo, point it at your own LLM API key via `docs/own-key.md`, and connect existing MCP-compatible tools to give the agent real actions on your infrastructure.

## 10. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 285430 (+6229 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC (Enhanced Coding Companion) is a harness layer that adds configurable skills, persistent memory, instincts, and security controls to AI coding agents—Claude Code, Codex, Cursor, and Opencode—via the `AgentShield` npm package and profile-based configs.

**Why now:** The repo gained over 6,000 stars this week as Claude Code and Opencode see rapid adoption and teams hit the gap where raw agent runtimes offer no built-in memory or guardrail layer.

**Build with it:** Install `ecc-universal` from npm and drop the generated config into your Claude Code project to apply memory and instinct profiles to your existing agent workflow immediately.
