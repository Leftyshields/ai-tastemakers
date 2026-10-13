# AI Tastemakers — Daily Brief — 2026-10-13

_Ranking: delta_7d · 10 repos · generated 2026-10-13T19:51:17.997Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 201913 (+193703 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, ctf, decompiler, developer-tools, disassembler, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, reverse-engineering, static-analysis

**What it does:** REA is an MCP server (a standardized bridge that lets AI agents call external tools) that connects agents like Claude Code or Codex to local reverse-engineering tools — Hopper, Ghidra, IDA, .NET decompilers, and JS/Electron inspectors — so they can analyze closed-source binaries and explain feature implementations with cited evidence.

**Why now:** The repo picked up roughly 194,000 stars this week, a spike large enough to make this a live conversation topic among builders before the pattern settles.

**Build with it:** Run `npx rea-agents setup` to register REA with Claude Code or Codex, then prompt your agent to reverse-engineer a specific feature directly from a competitor app's binary.

## 2. hypit-ai/hypit

https://github.com/hypit-ai/hypit · ★ 21894 (+2227 this week) · agentic-ai, ai, ai-agents, ai-video, compiler, dsl, ffmpeg, generative-ai, llm, markup-language, monorepo, plugin-system, programming-language, text-to-video, typescript, video, video-automation, video-clone, video-editing, video-generation

**What it does:** Hypit gives AI agents a markup language called SVML that describes video as word-anchored workflows — footage, captions, B-roll, and effects — so agents can clone, template, or generate videos and compile them via FFmpeg without calling a generation model.

**Why now:** The repo hit #1 on Trendshift for both daily and weekly TypeScript repositories, adding 2,227 stars in seven days.

**Build with it:** Point Claude Code at an existing viral video, let Hypit's agent clone it into an SVML workflow, then edit the caption and B-roll slots and run `hypit build` to produce branded variants.

## 3. Ebony-Vinyl/dsh-our-free-model <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 13989 (+2165 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-config dsh plugin that routes requests to frontier models — DeepSeek V4.1 Flash, Kimi K3, and others — through the OpenCode Zen and Kilo AI public gateways with no account, API key, or usage cap required.

**Why now:** The repo hit #1 on Trendshift's JavaScript weekly chart (2026-10-05 to 2026-10-11) and gained 2,165 stars this week, driven by developer demand for free-tier LLM access that doesn't require billing setup.

**Build with it:** Set the plugin's forwarding port as the `base URL` in your tool's settings to get free access to the full model roster without touching your existing LLM client code.

## 4. coreyhaines31/marketingskills

https://github.com/coreyhaines31/marketingskills · ★ 54539 (+1075 this week) · agent-skills, ai-agents, ai-seo, claude, claude-code, claude-code-plugin, claude-skills, codex, content-marketing, conversion-rate-optimization, copywriting, cursor, email-marketing, generative-engine-optimization, growth-marketing, marketing, marketing-automation, saas-marketing, seo, skill-md

**What it does:** A set of markdown skill files that give AI coding agents — Claude Code, Cursor, Codex, Windsurf — specialized workflows for CRO, copywriting, SEO, email, and analytics, anchored by a `product-marketing` skill that grounds every other skill in your product's positioning.

**Why now:** The repo crossed 54K stars this week with 1,075 new additions, tracking the maturation of Claude Code's plugin ecosystem as marketers start wiring agents into growth workflows.

**Build with it:** Drop the `.md` skill files into your Claude Code project, then follow `tools/SETUP.md` to connect a live data source so the agent reads real marketing account data on its first run.

## 5. TencentCloud/TencentDB-Agent-Memory

https://github.com/TencentCloud/TencentDB-Agent-Memory · ★ 28792 (+1057 this week) · agent, ai-agent, embedding, llm, local-first, long-term-memory, memory, openclaw-plugin, vector-search

**What it does:** A team-level memory hub that intercepts agent traffic via a local proxy and converts conversations, docs, and code into four typed memory assets — Chat Memory, Skill, LLM-Wiki, and Code-Graph — shared across agents like Claude Code, Codex, and DeepSeek Harness without any plugin or code change.

**Why now:** The repo gained over 1,000 stars this week and hit Trendshift trending, coinciding with the release of its v2→v3 migration tooling.

**Build with it:** Clone the repo, fill in two LLM parameter sets in `.env`, run `./start-all.sh`, then point Claude Code's base URL at the local proxy to get persistent memory across sessions immediately.

## 6. lexmount/moli

https://github.com/lexmount/moli · ★ 17905 (+6944 this week) · ai-agents, ai-tools, browser, browser-automation, cloud-browser, kitesurf, playwright, puppeteer, rust, servo, web-crawler, web-crawling, web-scraper, web-scraping

**What it does:** Moli is a headless browser — a rendering engine you control programmatically, no visible window — built in Rust for AI agents, with on-demand layout and rendering via CDP, WebDriver Classic, and WebDriver BiDi interfaces for fetching, scraping, and task automation.

**Why now:** The repo gained nearly 7,000 stars this week, a pace fast enough to influence which tooling defaults the ecosystem settles on.

**Build with it:** Point an AI agent at the bundled `moli-webfetch` skill to fetch and extract pages as Markdown or a semantic tree via the CLI, and test whether it can replace Playwright in your scraping pipeline.

## 7. kaankiziltug/logo-design-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/kaankiziltug/logo-design-skill · ★ 3153 (+1012 this week) · agent-skills, branding, claude, claude-skills, codex, gemini-cli, logo-design, svg

**What it does:** A plug-in skill for Claude Code, Gemini CLI, Codex CLI, and Cursor that runs a full identity-design workflow — brief → SVG concepts → audit → lockups — backed by a 1,400+ logo reference library and dependency-free Python testing tools.

**Why now:** The repo gained 1,012 stars this week and ranks #14 on the Agentic Leaderboard, tracking the rapid maturation of agent-skill ecosystems around Claude and Gemini CLI.

**Build with it:** Install via `/plugin marketplace add kaankiziltug/logo-design-skill` in Claude Code, then prompt with a brand brief to get audited SVG concepts and a pixel/one-colour/shelf test sheet before committing to a full kit.

## 8. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 162627 (+5960 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent skill that injects a "laziest senior dev" heuristic into AI coding agents — Claude Code, Cursor, and 18 others — steering them to delete or skip code rather than add it.

**Why now:** The v5 release benchmarked against Claude's Opus 5.5 model shows 53% less code and 45% fewer tokens in output, which is directly relevant as teams move Opus 5.5 into production Claude Code workflows.

**Build with it:** Add the `@dietrichgebert/ponytail` npm package as a plugin to an existing Claude Code project and run your next feature task to see whether risky logic ships with a test without extra prompting.

## 9. DuarteSantos8/openGym

https://github.com/DuarteSantos8/openGym · ★ 10989 (+5571 this week) · bodyweight, docker, fitness, fitness-tracker, gym, health, mcp, nodejs, passkeys, progressive-web-applications, pwa, react, self-hosted, self-hosting, vite, webauthn, weightlifting, workout-tracker

**What it does:** openGym is a self-hosted progressive web app (with Android APK) for planning weekly routines, running guided workouts, and logging sets and body weight — with passkey auth, muscle fatigue tracking, and import from FitNotes, Strong, and Hevy.

**Why now:** The repo gained 5,571 stars in a single week, a breakout pace that puts it in front of a large new audience evaluating it as a Fitbod or Strong alternative they can self-host.

**Build with it:** Deploy the Docker image per the self-hosting guide, then use the exposed MCP endpoint to pipe workout log data into your own tooling or AI assistant.

## 10. irinabuht12-oss/marketing-skills

https://github.com/irinabuht12-oss/marketing-skills · ★ 4438 (+729 this week) · ai-visibility, claude-code, claude-desktop, claude-marketing-skills, claude-plugin, claude-skills, claude-skills-for-marketing, cursor, geo, google-ads, google-ads-mcp, marketing, marketing-skills, mcp, mcp-server, meta-ads, meta-ads-mcp, seo

**What it does:** A collection of 49 Claude skills — structured prompts and plugins — covering Google Ads audits, Meta Ads creative fatigue detection, SEO, and AI visibility, backed by the Ryze MCP server, which pipes live Google Ads, Meta Ads, GA4, and Search Console data directly into Claude.

**Why now:** The repo gained 729 stars this week, tracking rapid uptake as MCP-connected Claude workflows attract non-developer marketers who want live ad account data without writing code.

**Build with it:** Run `claude mcp add ryze --transport http https://connector.get-ryze.ai/mcp` then `claude plugin install marketing-skills@ryze` to wire live ad data into Claude Code and query "audit my Google Ads for wasted spend" against real campaign data.
