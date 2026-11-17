# Skill Tastemakers — Daily Brief — 2026-11-17

_Ranking: delta_7d · 10 repos · generated 2026-11-17T22:52:42.342Z_


## 1. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 305445 (+4712 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC (agent harness optimization system) layers skills, memory, security, and research-first workflows onto Claude Code, Codex, Opencode, and Cursor through shared configuration files, acting as a common runtime across those tools.

**Why now:** The project framed itself as "the operating system for AI harnesses" on Hacker News this week and picked up over 4,700 stars in seven days.

**Build with it:** Install the `ecc-universal` npm package, drop its config into an existing Claude Code project, and you get ECC's memory and instinct primitives without rebuilding your setup from scratch.

## 2. mudler/LocalAI <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/mudler/LocalAI · ★ 50419 (+3691 this week) · agents, ai, api, audio-generation, decentralized, distributed, image-generation, libp2p, llama, llm, mamba, mcp, musicgen, object-detection, rerank, stable-diffusion, text-generation, tts

**What it does:** LocalAI is a self-hosted AI engine that serves LLMs, vision, speech, image, and video models through an OpenAI-compatible API, running on CPU or GPU under Docker, Kubernetes, or bare metal.

**Why now:** Version 2.14.0 landed this week alongside a Hacker News trending run, making it a reasonable moment to evaluate the build before it stabilizes further.

**Build with it:** Run `docker run -ti -p 8080:8080 localai/localai:latest`, install a model from the web UI, then point any OpenAI SDK client at `http://localhost:8080` to validate local inference as a drop-in for a hosted API call.

## 3. morluto/rea

https://github.com/morluto/rea · ★ 466199 (+16501 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a tool that plugs into agent frameworks using the Model Context Protocol) that lets AI agents reverse engineer binaries and applications down to the native binary level, without needing source code.

**Why now:** A Hacker News thread this week on agent-driven binary reverse engineering pointed directly at this project, surfacing active builder interest in the approach.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent, then point it at a closed-source app to inspect a feature and port that behavior into your own codebase.

## 4. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 112768 (+1873 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

**What it does:** Agent-Reach is a Python CLI that gives AI agents structured read and search access to platforms they cannot reach on their own, including X, Reddit, YouTube, Bilibili, and XiaoHongShu, with no API fees required.

**Why now:** The repo hit GitHub Trending rank 1 this week and pulled nearly 1,900 stars in seven days, indicating a large wave of builders actively wiring it into agent workflows right now.

**Build with it:** Run `agent-reach channels` to see available platforms, then pipe the output of `agent-reach youtube transcript <url>` directly into your Claude Code context to give your agent clean transcript data it cannot fetch itself.

## 5. emilkowalski/skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/emilkowalski/skills · ★ 57779 (+1387 this week) · agent-skills, animation, claude-code, codex, cursor, design-engineering

**What it does:** A set of Markdown-based agent skills installable via `npx skills@latest add emilkowalski/skills` that give AI coding agents opinionated rules for animation and motion, drawn from Emil Kowalski's work at Vercel and Linear.

**Why now:** The repo gained roughly 1,387 stars this week, tracking with broader adoption of agent-driven workflows in tools like Cursor, Claude Code, and Codex.

**Build with it:** Run `npx skills@latest add emilkowalski/skills` in your project, then invoke the `animate` or `review-animations` skill inside your agent to get easing curves, durations, and property choices corrected before shipping.

## 6. nexu-io/openmotion <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/nexu-io/openmotion · ★ 10890 (+1371 this week) · agent-skills, ai, ai-agents, animation, claude-code, codex, deepseek-harness, dsh, dsh-plugin, ffmpeg, generative-ai, html, javascript, local-first, mcp, motion-graphics, openmotion, typescript, video-editing, video-generation

**What it does:** OpenMotion is an open-source, full-stack agentic video studio that takes a reference video and rebuilds it with your brand kit, producing editable Motion.md shot files and rendered MP4s.

**Why now:** The repo gained 1,371 stars this week, alongside growing attention on agentic video as a category and the project's support for 22 agents including Claude Code and Codex.

**Build with it:** Point Claude Code at a reference social video, let it generate a Motion.md shot breakdown, edit timing in Studio, then export a Shorts-formatted MP4 using your own API keys.

## 7. patch-gg/pixelfx

https://github.com/patch-gg/pixelfx · ★ 7973 (+1332 this week) · agent-skills, animation, canvas, claude-code-plugin, gamedev, pixel-art, sprite-sheet, vfx

**What it does:** pixelfx is a library of 244 single-file JavaScript pixel art effects, covering fire, explosions, lightning, critters, UI elements, and more, each living in `src/fx/`, with a Claude Code skill that drafts, renders, and refines new effects iteratively.

**Why now:** The repo gained 1,332 stars this week, a spike likely tied to the Claude Code skill angle as agentic coding tools pull more builder attention.

**Build with it:** Drop a single effect file from `src/fx/<category>/<name>.js` into a canvas-based browser game and call it directly, or export a sprite sheet for use in any engine.

## 8. haydenschmitty/floorplan

https://github.com/haydenschmitty/floorplan · ★ 4730 (+1289 this week) · ai-coding, architecture-diagram, claude, claude-code, claude-code-plugin, codebase-visualization, codex, codex-plugin, developer-tools, onboarding, openai, vibe-coding

**What it does:** Floorplan is a Claude Code and Codex plugin that reads your codebase and generates an interactive, zoomable map of every component, file, and HTTP endpoint, with plain-English names and drawn connections between them.

**Why now:** The repo gained 1,289 stars this week and appeared on Trendshift's daily JavaScript chart, reflecting a surge of interest in AI-assisted codebase visualization.

**Build with it:** Install the Claude Code plugin, run it against an existing project, and use the resulting map to audit which files an AI touched during a recent change before merging.

## 9. ethanplusai/sellbird <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ethanplusai/sellbird · ★ 6354 (+1273 this week) · ai-agent, autonomous-agent, claude, claude-code, codex, cold-email, email-verification, harvey, lead-generation, outreach, prospecting, python, sales-automation, sellbird

**What it does:** Sellbird is an open-source cold outreach pipeline that finds companies, identifies decision makers, verifies email addresses, writes personalized sequences using your Claude or ChatGPT API key, and handles replies from your own machine.

**Why now:** The repo gained 1,273 stars this week, coinciding with a rebranding from Harvey to Sellbird and an early-access launch of the hosted version at sellbird.ai.

**Build with it:** Configure your buying signals, run the verification step, then use `sellbird export` to get a sequencer-ready CSV you can drop into any existing sending tool without touching the email-sending layer.

## 10. irinabuht12-oss/marketing-skills

https://github.com/irinabuht12-oss/marketing-skills · ★ 8164 (+989 this week) · ai-visibility, claude-code, claude-desktop, claude-marketing-skills, claude-plugin, claude-skills, claude-skills-for-marketing, cursor, geo, google-ads, google-ads-mcp, marketing, marketing-skills, mcp, mcp-server, meta-ads, meta-ads-mcp, seo

**What it does:** A set of 49 prompt-based Claude skills covering Google Ads audits, Meta Ads diagnostics, SEO, and AI visibility, backed by the Ryze MCP connector that pipes live account data from Google Ads, Meta Ads, GA4, and Search Console directly into Claude.

**Why now:** The repo gained roughly 1,000 stars this week as Claude Code plugin installs become a more common distribution path and MCP-connected marketing workflows attract more builder attention.

**Build with it:** Run `claude mcp add ryze --transport http https://connector.get-ryze.ai/mcp`, then trigger the Google Ads Audit skill against a live account to surface wasted spend and negative keyword gaps in a single conversation.
