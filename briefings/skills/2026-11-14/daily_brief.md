# Skill Tastemakers — Daily Brief — 2026-11-14

_Ranking: delta_7d · 10 repos · generated 2026-11-14T19:53:40.961Z_


## 1. anthropics/skills

https://github.com/anthropics/skills · ★ 194543 (+5938 this week) · agent-skills

**What it does:** Anthropic's official Agent Skills repo is a collection of self-contained folders, each containing instructions and scripts that Claude loads dynamically to handle specialized tasks like document creation, MCP server generation, and enterprise workflows.

**Why now:** The repo picked up nearly 6,000 stars this week alongside a PromptArmor report on backdoored skills, making it a live reference for anyone weighing real security tradeoffs in skill-based agents.

**Build with it:** Register it as a Claude Code plugin marketplace with `/plugin marketplace add anthropics/skills`, then install the `document-skills` plugin to give Claude file-creation capabilities backed by Anthropic's own production SKILL.md implementations.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 459530 (+19011 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a tool that exposes capabilities to AI agents over a standard protocol) that lets agents inspect closed binaries, apps, and runtime behavior down to the native binary level, no source code required.

**Why now:** The project hit Hacker News this week under "Reverse engineer anything with agents" and drew real discussion around using MCP tooling for binary analysis.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent and have it explain how a specific closed-source app feature works before you implement your own version.

## 3. Vincentwei1021/video-shotcraft

https://github.com/Vincentwei1021/video-shotcraft · ★ 19521 (+1898 this week) · agent-skills, ai-agents, ai-video, claude-code, claude-code-skills, claude-skills, codex, motion-design, motion-graphics, product-video, promo-video, remotion, video-generation, video-production

**What it does:** video-shotcraft is a Claude Code and Codex agent skill that screenshots your real product pages, picks from 124 shot recipe cards, animates everything in Remotion with beat sync and sound design, and renders a finished MP4.

**Why now:** The shot library just received a full refresh in 2026-10, cutting 216 demos down to 150 curated shots with new Gallery previews, making this a good moment to evaluate the updated motion recipes.

**Build with it:** Point the agent at an existing product landing page and use the SKILL.md config to generate a Remotion-animated promo MP4 you can keep editing in Motion Workbench.

## 4. alibaba/open-code-review

https://github.com/alibaba/open-code-review · ★ 51313 (+1701 this week) · agent, agent-skills, code-review, code-review-assistant, harness, repository-level-context

**What it does:** OpenCodeReview is a CLI tool that reads Git diffs, runs an LLM agent with tool-use capabilities against changed files, and produces structured review comments with line-level precision, covering NPE, thread-safety, XSS, and SQL injection rules out of the box.

**Why now:** The repo gained 1,701 stars this week and was trending on Trendshift in both weekly and monthly Go rankings, a sharp spike worth paying attention to.

**Build with it:** Point it at any OpenAI-compatible or Anthropic-compatible model endpoint, run it against an open pull request, and check whether its repository-level context catches issues your existing diff-only review step misses.

## 5. career-ops-hq/career-ops

https://github.com/career-ops-hq/career-ops · ★ 82560 (+1665 this week) · agent-skills, ai-agent, ai-job-search, ats, career, career-ops, claude-code, claude-code-plugin, claude-plugin, cover-letter, cv, good-first-issue, interview-preparation, interview-questions, job-application, job-hunting, job-search, latex, open-source, resume

**What it does:** career-ops is an open-source AI job search agent that scores job listings against your CV, tailors an ATS-friendly resume and cover letter, and tracks applications locally inside Codex, OpenCode, or as a Claude Code plugin.

**Why now:** The repo gained 1,665 stars this week and already carries a Claude Code plugin topic, putting it squarely in the path of current Claude Code ecosystem momentum.

**Build with it:** Install it as a Claude Code plugin and wire your own job board scraper to its scoring pipeline to filter for fit before any application is submitted.

## 6. ChromeDevTools/chrome-devtools-mcp

https://github.com/ChromeDevTools/chrome-devtools-mcp · ★ 56199 (+1268 this week) · browser, chrome, chrome-devtools, debugging, devtools, mcp, mcp-server, puppeteer

**What it does:** `chrome-devtools-mcp` is an MCP server that lets coding agents (Claude, Cursor, Copilot, and others) control a live Chrome browser using Puppeteer for automation and Chrome DevTools APIs for network analysis, console inspection, screenshots, and performance tracing.

**Why now:** The repo gained over 1,200 stars this week, a signal likely tied to growing MCP adoption across AI coding assistants.

**Build with it:** Add the one-line `npx -y chrome-devtools-mcp@latest` MCP server config to your Claude or Cursor client, then instruct the agent to record a performance trace and surface Core Web Vitals insights for any URL.

## 7. backnotprop/plannotator <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/backnotprop/plannotator · ★ 10975 (+1094 this week) · agents, claude-code, code-review, codex, obsidian, opencode, pi-mono, plan-mode, skills

**What it does:** Plannotator is a local, browser-based review surface that intercepts AI coding agent output (Claude Code, Codex, Gemini CLI, and others) so you can annotate plans, comment on diffs, and send structured feedback back to the agent in one click.

**Why now:** The repo gained over 1,000 stars this week alongside the launch of Plannotator Inbox, a new surface that exposes agent decisions, prototypes, and variations across multi-agent workflows.

**Build with it:** Wire it into Claude Code via its hooks config to auto-open the annotation UI whenever the agent proposes a plan, then send your marked-up feedback back as a single command.

## 8. modelflare-ai/AnyModelBot <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/modelflare-ai/AnyModelBot · ★ 3812 (+1079 this week) · ai-agent, ai-assistant, chatbot, claude, computer-use, deepseek, desktop-app, dsh, electron, feishu, gemini, gpt, grok, llm, local-first, modelflare, multi-model, openai-compatible, personal-ai-agent, wechat

**What it does:** AnyModelBot is a local-first desktop app (Windows, macOS, Linux) that runs a team of AI bots with individual personas, memory, and workspaces, reachable via built-in chat or through WeChat, Feishu, Telegram, Slack, and Discord, using 70-plus models through a single Modelflare key or direct provider API keys.

**Why now:** The project gained over 1,000 stars this week alongside the v0.1.35 release, which shipped a simplified sidebar, in-app balance display, and fixes across rules, permissions, and seven language localizations.

**Build with it:** Connect a bot to an existing Feishu or WeChat workspace using the built-in channel integration, give it a scoped working directory, and let it run scheduled background tasks against your chosen model without managing separate API keys per provider.

## 9. mattpocock/skills

https://github.com/mattpocock/skills · ★ 324393 (+6875 this week) · —

**What it does:** A collection of small, composable agent skills for Claude Code, Codex, Copilot, and other coding agents, designed to give engineers fine-grained control over tasks like triaging issues and generating docs without handing the whole process to the agent.

**Why now:** The repo gained roughly 6,875 stars this week, a clear signal of growing builder interest in structured agent workflows as an alternative to heavier frameworks like BMAD and Spec-Kit.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to drop editable skill files into an existing Cursor project, then call `/setup-matt-pocock-skills` once to wire up your issue tracker and label config.

## 10. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 110565 (+6875 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a fully local, open-source Python app for voice cloning, video dubbing, transcription, text-to-speech, and audiobook creation across 646 languages, running on laptops, phones, and servers without sending data to external APIs.

**Why now:** The repo gained roughly 6,875 stars this week, likely driven by its positioning as a self-hosted ElevenLabs alternative amid ongoing pricing and API-access concerns.

**Build with it:** Pull the latest release, point it at a short audio sample, and use the voice-cloning workflow to generate localized dubbed audio for an existing video file entirely on-device.
