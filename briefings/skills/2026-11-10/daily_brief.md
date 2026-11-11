# Skill Tastemakers — Daily Brief — 2026-11-10

_Ranking: delta_7d · 10 repos · generated 2026-11-10T21:17:46.453Z_


## 1. harry0703/MoneyPrinterTurbo

https://github.com/harry0703/MoneyPrinterTurbo · ★ 141953 (+3685 this week) · ai-video-generator, content-creation, ffmpeg, instagram-reels, llm, python, short-video, subtitles, text-to-speech, tiktok, video-automation, video-workflow, workflow-automation, youtube-shorts

**What it does:** MoneyPrinterTurbo takes a topic or keyword and runs a Python pipeline to write a video script, match stock footage, add subtitles, and produce a finished short video, accessible through a WebUI or REST API.

**Why now:** The project surfaced on Hacker News this week and picked up 3,685 stars in seven days, reflecting real builder momentum around automated short-form video workflows.

**Build with it:** Point the API at your own LLM key and call the `/video/generate` endpoint to drop a fully subtitled short into a TikTok or YouTube Shorts publishing pipeline.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 449698 (+23071 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a tool that connects AI agents to external capabilities) that lets agents reverse engineer closed binaries, apps, and runtime behavior down to the native instruction level, without source code.

**Why now:** A Hacker News thread this week drew 101 points and 39 comments discussing its agent-driven binary analysis approach, pulling in fresh builder interest.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent, have it inspect a closed app feature, and export the findings as a starting point for your own implementation.

## 3. public-apis/public-apis

https://github.com/public-apis/public-apis · ★ 497910 (+2092 this week) · api, apis, dataset, development, free, list, lists, open-source, public, public-api, public-apis, resources, software

**What it does:** A community-curated, categorized list of free public APIs spanning geolocation, aviation, finance, search, and more, maintained as an open-source dataset on GitHub.

**Why now:** A Hacker News thread this week linking directly to the repo collected 288 points and 29 comments, surfacing renewed builder interest in free API discovery.

**Build with it:** Fork the official APILayer Postman Collection to test APIs like Serpstack or Mailboxlayer against your prototype in under 60 seconds.

## 4. cheaper-inference/OmniRoute

https://github.com/cheaper-inference/OmniRoute · ★ 86265 (+2012 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted AI gateway that exposes a single OpenAI-compatible endpoint across 375 providers and 1,400+ models, with quota-aware auto-fallback and RTK+Caveman token compression that cuts usage by 15-95%.

**Why now:** The repo is trending past 86,000 stars with 2,000 added this week, coinciding with Codex CLI's public release and rising demand for routing Claude Code and Codex through free-tier providers without manual quota juggling.

**Build with it:** Point your Claude Code or Cursor base URL at the OmniRoute endpoint, configure free-tier provider credentials in the dashboard, and let auto-fallback routing absorb rate limits across Groq, Mistral, and Gemini pools without touching your existing workflow.

## 5. remotion-dev/remotion

https://github.com/remotion-dev/remotion · ★ 72227 (+1813 this week) · javascript, react, video

**What it does:** Remotion lets you build and render videos programmatically using React components, with rendering options spanning Node.js, AWS Lambda, Vercel, and the browser.

**Why now:** The repo gained over 1,800 stars this week, coinciding with new agentic video features called Agent Skills that let an AI agent turn a text prompt directly into a rendered video.

**Build with it:** Run `npx create-video@latest`, wire in the Lambda renderer, and use the Node.js API to batch-render personalized videos from a data source.

## 6. AgriciDaniel/claude-seo

https://github.com/AgriciDaniel/claude-seo · ★ 27902 (+1626 this week) · ai, ai-seo, claude-code, claude-code-skill, marketing-automation, open-source, seo

**What it does:** Claude SEO is a free, open-source Claude Code plugin that runs full SEO audits using 19 parallel agents covering technical SEO, E-E-A-T, Schema.org markup, and AI citation readiness (GEO) across Google, ChatGPT, Perplexity, and Gemini.

**Why now:** The repo hit GitHub Trending at rank 12 this week and gained over 1,600 stars, while AI search citation (GEO/AEO) remains a concrete audit surface that most existing SEO tools ignore.

**Build with it:** Install the plugin into an existing Claude Code project, run `/seo audit` against your site, and use the prioritized action plan to fix crawlability and structured data before submitting to Google Search Console.

## 7. mattpocock/skills

https://github.com/mattpocock/skills · ★ 320796 (+9505 this week) · —

**What it does:** A collection of small, composable agent skills for Claude Code, Codex, Copilot, and other coding agents, designed to give engineers fine-grained control over planning, triaging, and spec workflows without handing the entire process to the agent.

**Why now:** The repo gained over 9,500 stars this week, a spike that tracks with growing developer frustration with high-abstraction agent frameworks like BMAD and GSD.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to drop editable skill files into an existing Cursor project, then call `/setup-matt-pocock-skills` once to wire in your issue tracker and label config.

## 8. milind-soni/OpenMausBot

https://github.com/milind-soni/OpenMausBot · ★ 20580 (+8920 this week) · ai-agents, claude-code, codex, computer-use, docker, electron, grok, grok-bot, grok-bot-alternative, self-hosted, typescript

**What it does:** OpenMausBot is an open-source, local-first Electron desktop app that gives each AI agent (Claude or Codex) its own chat identity, model config, cloud computer, and connected apps, surfaced as contacts in a sidebar.

**Why now:** The repo gained roughly 8,900 stars this week, coinciding with visible builder interest in alternatives to closed agent UIs like Grok Bot and Cue by Manus following their recent launches.

**Build with it:** Download the signed .dmg or .exe, wire in your existing Claude or Codex API key, and test a custom agent personality against a connected app to validate the bring-your-own-agent workflow.

## 9. usestrix/strix

https://github.com/usestrix/strix · ★ 74854 (+1286 this week) · agents, ai-hacking, ai-penetration-testing, ai-pentesting, ai-security, artificial-intelligence, bug-bounty, code-quality, ctf-tools, cybersecurity, cybersecurity-tools, ethical-hacking, hacking, llm-security, offensive-security, penetration-testing, pentesting-tools, red-teaming, security, security-automation

**What it does:** Strix runs autonomous AI penetration testing agents that dynamically execute your code, find vulnerabilities, and produce working proof-of-concept exploits with remediation patches.

**Why now:** The repo gained over 1,200 stars this week as AI-assisted offensive security tooling moves from research into everyday dev workflows.

**Build with it:** Drop Strix into a GitHub Actions workflow using the `strix-agent` PyPI package to automatically block pull requests that introduce exploitable vulnerabilities before they reach production.

## 10. ChenLiu-1996/figures4papers <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ChenLiu-1996/figures4papers · ★ 10854 (+1281 this week) · acl, cvpr, eccv, emnlp, figures, iccv, iclr, icml, llm, llm-skills, machine-learning, nature, nature-machine-intelligence, neurips, python, scientific-figure, skill, skills

**What it does:** A collection of Python scripts by a Yale PhD student for generating publication-quality figures, including bar plots, radar plots, 3D spheres, and trend plots, used in papers at NeurIPS, ICML, ECCV, and Nature Machine Intelligence.

**Why now:** The repo gained 1,281 stars this week, a spike likely driven by conference submission season pulling researchers toward ready-made figure tooling.

**Build with it:** Drop the `scientific-figure-making/` skill folder into a Cursor or Claude Code workspace and reference `SKILL.md` in prompts to generate paper-ready figures without writing matplotlib boilerplate from scratch.
