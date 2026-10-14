# AI Tastemakers — Daily Brief — 2026-10-14

_Ranking: delta_7d · 10 repos · generated 2026-10-14T17:59:57.857Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 235666 (+227456 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is an MCP server (a standardized tool-connection layer for AI agents) that wires Claude, Codex, and similar agents directly into local reverse-engineering tools—Hopper, Ghidra, IDA—so they can inspect native binaries, Electron apps, .NET assemblies, and websites without source code.

**Why now:** The repo crossed 227,000 stars in a single week, an unusually sharp spike that puts it ahead of the tooling ecosystem forming around it.

**Build with it:** Run `npx rea-agents setup` to register REA as an MCP tool, then prompt your agent to analyze a closed-source app feature and return decompiled evidence alongside a working reimplementation.

## 2. ruvnet/RuView

https://github.com/ruvnet/RuView · ★ 97945 (+1250 this week) · awesome, claude, densepose, esp32, firmware, home-assistant, home-automation, iot, monitoring, networking, npm, pose-estimation, react, rf, self-learning, skills, spatial-intelligence, typescript, wifi, wifi-security

**What it does:** RuView uses ESP32 microcontroller nodes to capture WiFi Channel State Information (CSI)—subtle signal distortions caused by movement—and runs DensePose-style body-mapping inference to detect presence, pose, breathing, and heart rate through walls with no cameras or wearables.

**Why now:** The repo gained 1,250 stars this week, likely tied to the pretrained model drop at `ruvnet/wifi-densepose-pretrained` on Hugging Face giving builders a ready starting point.

**Build with it:** Flash an ESP32 node with the included firmware, then launch the pipeline with `--mqtt` to auto-discover 21 sensor entities in Home Assistant via HA-DISCO.

## 3. paperclipai/paperclip <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/paperclipai/paperclip · ★ 102031 (+1122 this week) · acpx, agent-orchestration, agent-skills, agentic-ai, ai-agents, ai-engineering, ai-governance, ai-tools, autonomous-agents, claude, claude-code, claude-skills, codex, hermes, llm, mcp, multi-agent, openclaw, project-management, workflow-automation

**What it does:** Paperclip is an open-source Node.js server with a React dashboard that lets you assemble named AI agents (CEO, CTO, engineers, etc.), assign them a shared business goal, and track tasks, budgets, and permissions from one place.

**Why now:** The repo pulled 1,100+ stars this week as multi-agent orchestration discussions heat up around tools like OpenClaw and Claude Code, and budget-tracking is still a weak spot in most competing frameworks.

**Build with it:** Clone the repo, wire in an existing OpenClaw or Claude Code agent via the adapter config, define a single scoped goal, and use the dashboard to validate budget tracking before expanding the team.

## 4. lexmount/moli

https://github.com/lexmount/moli · ★ 18342 (+7381 this week) · ai-agents, ai-tools, browser, browser-automation, cloud-browser, kitesurf, playwright, puppeteer, rust, servo, web-crawler, web-crawling, web-scraper, web-scraping

**What it does:** Moli is a headless browser—a scriptable, display-less web renderer—built in Rust for AI agents, with a lightweight footprint and support for CLI, CDP, WebDriver Classic, and WebDriver BiDi control interfaces.

**Why now:** 7,381 stars in one week is a fast breakout for infrastructure tooling, and the ecosystem of agent-compatible browser tools around it is still forming.

**Build with it:** Point an AI agent at the `moli-webfetch` skill in the repo's `/skills` directory to fetch and extract web pages as Markdown or a compact semantic tree without writing any browser automation code.

## 5. Ryze-AI-Adgent/open-seo-mcp-skills

https://github.com/Ryze-AI-Adgent/open-seo-mcp-skills · ★ 5335 (+1053 this week) · ai-seo, ai-visibility, backlinks, claude, claude-code, claude-skills, dataforseo, generative-engine-optimization, geo, geo-mcp, keyword-research, llm-seo, mcp, mcp-server, open-source-seo, rank-tracking, seo, seo-audit, seo-mcp, seo-mcp-server

**What it does:** A set of open-source Claude skills—seo-audit, keyword-research, rank-tracking, competitor-gap, ai-visibility, and more—connected to a free Ryze MCP server that pulls your own Google Search Console, GA4, and Google Ads data, with DataForSEO handling competitor keywords, backlinks, and SERPs at no markup.

**Why now:** The repo gained 1,053 stars this week as builders look for MCP-connected SEO tooling that avoids the subscription-plus-markup pricing of DataForSEO-backed SaaS dashboards.

**Build with it:** Run `claude mcp add ryze --transport http https://connector.get-ryze.ai/mcp` and `claude plugin marketplace add Ryze-AI-Adgent/open-seo-mcp-skills`, then prompt Claude with "run an SEO audit on mysite.com" to validate the GSC/GA4 pipeline against your actual traffic data.

## 6. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 163398 (+6731 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent skill that constrains AI coding agents—Claude Code, Cursor, and 19 others—to behave like a senior dev who deletes code rather than adds it, enforcing YAGNI (you aren't gonna need it) as a hard default.

**Why now:** Version 5 just shipped with a ground-up rebuild claiming -53% code, -41% time, and -45% tokens versus baseline, benchmarked across 39 real tasks on a FastAPI + React repo.

**Build with it:** Add the npm package `@dietrichgebert/ponytail` to your Claude Code setup as a plugin, then measure whether your next feature request produces fewer net lines than without it.

## 7. DuarteSantos8/openGym

https://github.com/DuarteSantos8/openGym · ★ 11703 (+6285 this week) · bodyweight, docker, fitness, fitness-tracker, gym, health, mcp, nodejs, passkeys, progressive-web-applications, pwa, react, self-hosted, self-hosting, vite, webauthn, weightlifting, workout-tracker

**What it does:** openGym is a self-hosted progressive web app (with Android APK) for planning weekly routines, logging sets and body weight, visualizing muscle fatigue via heatmaps, and importing data from FitNotes, Strong, or Hevy—all behind passkey (WebAuthn) login on your own server.

**Why now:** 6,285 stars in one week marks a clear breakout, and the listed MCP topic suggests active integration work that builders can get ahead of before patterns solidify.

**Build with it:** Deploy the Docker image from the self-hosting guide, then wire openGym's REST API into an MCP client to expose workout and body-weight history as a data source for an AI coaching prompt.

## 8. mnfst/awesome-free-llm-apis

https://github.com/mnfst/awesome-free-llm-apis · ★ 10212 (+906 this week) · ai-agents, anthropic, awesome, awesome-list, gemini, llm, llm-router, llm-routing, ollama, openai, openclaw, openclaw-plugin, router

**What it does:** A curated list of LLM APIs with permanent free tiers—covering providers like Google Gemini, Cohere, and Aion Labs—all OpenAI SDK-compatible unless noted, so switching requires changing only the base URL.

**Why now:** The repo gained 906 stars this week as budgets tighten and multiple providers have simultaneously expanded free-tier model offerings.

**Build with it:** Swap your paid OpenAI SDK endpoint for one of the listed base URLs—for example, `https://generativelanguage.googleapis.com/v1beta` for Gemini—to prototype agents at zero cost before committing to a paid tier.

## 9. router-for-me/CLIProxyAPI

https://github.com/router-for-me/CLIProxyAPI · ★ 55214 (+884 this week) · antigravity, claude-code, cluade, codex, devin, gemini, muse, openai

**What it does:** CLIProxyAPI is a Go-based proxy that exposes OpenAI-, Gemini-, and Claude-compatible API endpoints backed by CLI tool accounts (Codex, Claude Code, Gemini CLI, Grok Build, and others), letting any standard SDK reach those models without direct API keys.

**Why now:** This week added Kimi K3—a 2.8-trillion-parameter model with a 1M-token context window—concretely expanding the model roster available through the proxy.

**Build with it:** Point an existing OpenAI SDK client at the local CLIProxyAPI endpoint and switch between Kimi K3, Claude Fable 5.1, or Grok 4.7 by changing only the `model` parameter, with no per-provider SDK changes required.

## 10. heygen-com/hyperframes

https://github.com/heygen-com/hyperframes · ★ 63518 (+5710 this week) · ai, animation, ffmpeg, framework, gsap, html, mcp, puppeteer, rendering, typescript, video

**What it does:** HyperFrames is an open-source TypeScript framework that converts HTML, CSS, and seekable GSAP animations into deterministic MP4 videos via Puppeteer and FFmpeg, controllable through a CLI, MCP, or AI coding agent skills.

**Why now:** The repo gained 5,710 stars this week alongside the release of native Mac and Linux desktop apps and a Claude Code plugin on the marketplace.

**Build with it:** Install the Claude Code plugin (`claude plugin marketplace add heygen-com/hyperframes`) and use the `/hyperframes` router skill to have an agent write, lint, preview, and render an HTML-based video in a single session.
