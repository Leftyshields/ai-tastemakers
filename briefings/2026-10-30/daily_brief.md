# AI Tastemakers — Daily Brief — 2026-10-30

_Ranking: delta_7d · 10 repos · generated 2026-10-30T19:57:55.778Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 411772 (+39844 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a Model Context Protocol (MCP) server that lets AI agents inspect closed-source binaries, JavaScript and Electron apps, .NET assemblies, and websites by wiring into decompilers like Ghidra and Hopper, giving agents real reverse-engineering reach without source code.

**Why now:** The repo picked up nearly 40,000 new stars this week, a breakout signal that agent-assisted reverse engineering has hit mainstream builder interest.

**Build with it:** Run `npx rea-agents setup` to connect REA to an MCP-compatible agent like Claude Code, then prompt it to analyze a closed-source app feature and return decompiled evidence you can reimplement.

## 2. op7418/guizang-ppt-skill

https://github.com/op7418/guizang-ppt-skill · ★ 28974 (+3301 this week) · ai-agent, claude-code, codex, html-deck, image-generation, ppt, presentation, skill, skills, swiss-design, web-ppt

_[brief unavailable]_

## 3. op7418/guizang-social-card-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/op7418/guizang-social-card-skill · ★ 7862 (+2145 this week) · agent-skill, ai-agent, anthropic, claude-code, claude-skill, codex, editorial-design, html-template, image-generation, playwright, rednote, social-cards, swiss-design, wechat, xiaohongshu

**What it does:** An agent skill for Claude Code and Codex that converts articles, screenshots, and videos into Xiaohongshu carousels and WeChat cover pairs, picking from 28 layout templates across Editorial and Swiss visual systems, then rendering the result as single-file HTML exported to PNG via Playwright.

**Why now:** The repo gained 2,145 stars this week as Claude Code adoption pulls builder attention toward agent-native design workflows that skip manual layout tools entirely.

**Build with it:** Run `npx skills add https://github.com/op7418/guizang-social-card-skill --skill guizang-social-card-skill` inside a Claude Code session, then prompt the agent with a source article and a target style like Swiss, IKB blue, and 5 cards to get a renderable HTML file and exported PNGs in one pass.

## 4. career-ops-hq/career-ops

https://github.com/career-ops-hq/career-ops · ★ 78865 (+2075 this week) · agent-skills, ai-agent, ai-job-search, ats, career, career-ops, claude-code, claude-code-plugin, claude-plugin, cover-letter, cv, good-first-issue, interview-preparation, interview-questions, job-application, job-hunting, job-search, latex, open-source, resume

**What it does:** career-ops is an open-source AI agent that scores job listings against your CV, rewrites your resume and cover letter for ATS compatibility, and tracks applications locally via Codex, OpenCode, or as a Claude Code plugin.

**Why now:** The repo gained 2,075 stars this week and carries an active `claude-code-plugin` topic, putting it squarely in the current wave of Claude Code extension exploration.

**Build with it:** Drop it in as a Claude Code plugin, point it at a job board URL, and get a scored, filtered shortlist before writing a single line of application text.

## 5. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 52704 (+13770 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency dsh plugin that routes requests to frontier models including DeepSeek V4.1 Flash and Kimi K3 through the OpenCode Zen and Kilo AI public gateways, with no login, API key, or build step required.

**Why now:** The repo hit number one on both the Trendshift daily and JavaScript weekly charts this week, reflecting a sharp spike in builder interest around no-credential LLM access.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's built-in forwarding port to route requests through these free model pools without touching your own API credentials.

## 6. ruvnet/ruflo

https://github.com/ruvnet/ruflo · ★ 80272 (+1574 this week) · agentic-ai, agentic-framework, agentic-workflow, agents, ai-agents, ai-assistant, ai-skills, autonomous-agents, claude, codex, dsh-plugin, harness, mcp-server, multi-agent, multi-agent-systems, npm, skills, swarm, swarm-intelligence, typescript

**What it does:** Ruflo is a TypeScript meta-harness for Claude Code and Codex that coordinates multi-agent swarms with adaptive memory, vector RAG, federation, and an MCP server interface for wiring everything together.

**Why now:** The repo gained over 1,500 stars this week, riding the current surge of Claude Code plugin ecosystem activity and its positioning as an early agent coordination harness.

**Build with it:** Run `npx ruflo@latest init wizard` in a Codex project, then connect your client to the local stdio MCP server using command `npx` with arguments `["-y", "ruflo@latest", "mcp", "start"]` to expose Ruflo's swarm-coordination tools directly to your agent.

## 7. macro-inc/macro <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/macro-inc/macro · ★ 5817 (+1559 this week) · agent, ai, ai-agents, all-in-one, crm, crm-system, email, linear, mcp, messaging, notes, notion, office, rust, slack, slack-alternative, startup, startup-tools, typescript, workspace

**What it does:** Macro is a unified team workspace built in Rust and SolidJS that folds email, chat, docs, tasks, CRM, calls, and AI agents into one app, storing every item as a bidirectional graph and cross-referencing them with @links.

**Why now:** The repo gained 1,559 stars this week following its public GitHub launch, drawing builders who want a single system in place of Slack, Notion, and Linear running in parallel.

**Build with it:** Connect your GitHub repos via the pull request block to link PRs directly to Macro tasks and surface them to the built-in agents for context-aware triage.

## 8. lexmount/moli

https://github.com/lexmount/moli · ★ 21729 (+1429 this week) · ai-agents, ai-tools, browser, browser-automation, cloud-browser, headless, headless-browser, kitesurf, playwright, puppeteer, rust, servo, web-crawler, web-crawling, web-scraper, web-scraping

**What it does:** Moli is a headless browser written in Rust for AI agents, exposing page fetch, web search, and browser automation through CLI, CDP, WebDriver Classic, or WebDriver BiDi, giving agents structured web access without a full browser stack.

**Why now:** The repo hit number one Product of the Day on Product Hunt at launch and gained 1,429 stars this week, reflecting active builder discovery across communities.

**Build with it:** Drop the `moli-webfetch` skill into your agent's tool set and point it at Moli's prebuilt binary to give the agent structured page extraction without spinning up a full browser stack.

## 9. chatanywhere/GPT_API_free <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/chatanywhere/GPT_API_free · ★ 45103 (+1407 this week) · api, chatgpt, claude, deepseek, gemini, gpt, grok, llm-agents

**What it does:** GPT-API-free is an OpenAI-compatible API proxy covering GPT, DeepSeek, Claude, Gemini, and other major models, accessible from mainland China without a VPN, offering 50,000 free points per week and 100 requests per day per key.

**Why now:** The repo gained over 1,400 stars this week, a spike likely tied to sustained developer demand for affordable DeepSeek access after the r1 and v3 releases pushed builders to seek low-cost relay options.

**Build with it:** Point any OpenAI SDK client at `https://api.chatanywhere.tech` and swap in a free key from chatanywhere.tech to prototype against GPT-4o or DeepSeek-V3 without touching your own API spend.

## 10. anthropics/claude-plugins-official

https://github.com/anthropics/claude-plugins-official · ★ 45420 (+1348 this week) · claude-code, mcp, skills

**What it does:** Anthropic's official curated directory of Claude Code plugins, hosting both internal and community-submitted entries that add MCP servers, slash commands, agents, and reusable skills to Claude Code.

**Why now:** The repo gained 1,348 stars this week, a signal that Claude Code adoption is pulling builders toward exploring what the plugin ecosystem already offers before building from scratch.

**Build with it:** Submit a skill-bundle plugin via the plugin directory submission form using `strict: false` and an explicit `skills` array in your marketplace entry to expose `SKILL.md` files from an existing git repo without writing a full `plugin.json` manifest.
