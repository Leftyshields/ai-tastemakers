# Skill Tastemakers — Daily Brief — 2026-11-13

_Ranking: delta_7d · 10 repos · generated 2026-11-13T21:24:57.326Z_


## 1. HKUDS/DeepTutor

https://github.com/HKUDS/DeepTutor · ★ 58924 (+3039 this week) · ai-agents, ai-tutor, clawbot, cli-tool, deepresearch, interactive-learning, learning, multi-agent-systems, rag

**What it does:** DeepTutor is a Python multi-agent tutoring system that uses RAG (retrieval-augmented generation) to run personalized learning sessions grounded in documents you provide, with desktop apps for macOS and Windows.

**Why now:** The project hit Hacker News this week and picked up roughly 3,000 new stars, reflecting real builder interest in agent-native education tooling rather than wrapper-style chatbots.

**Build with it:** Point the RAG pipeline at your own PDF corpus to create a domain-specific tutoring agent that answers questions with source-grounded explanations.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 457440 (+19819 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP (Model Context Protocol) server that lets AI agents reverse engineer binaries, applications, and runtime behavior down to the native binary level, no source code required.

**Why now:** An HN thread this week drew 101 points and 39 comments on agent-driven binary analysis, marking it as an approach builders are actively debating right now.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent and have it inspect a closed app feature you want to replicate in your own project.

## 3. openfilm/openfilm <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/openfilm/openfilm · ★ 6474 (+1407 this week) · ai-video, claude-code, codex, coding-agents, html, motion-graphics, video-agent, video-editor

**What it does:** OpenFilm turns any coding agent (Codex, Claude Code, or similar) into a video producer by having it write films as a single `film.html` file, then opens that file in a browser-based editor called Studio where you can trim, restyle, and re-prompt anything.

**Why now:** The project launched on Hacker News as a Show HN this week and gained over 6,400 stars, a clear signal that builders are ready to push agentic workflows into creative production.

**Build with it:** Run `npx skills add openfilm/openfilm` inside a Claude Code or Codex session, then prompt your agent to produce a short demo video for an existing CLI or library to test the full write-render loop.

## 4. microsoft/TokenEconomizer <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/microsoft/TokenEconomizer · ★ 6054 (+1286 this week) · agentic-ai, agentic-coding, ai-coding, ai-coding-assistant, anthropic, artificial-intelligence, claude-code, codex, coding-agent, coding-agents, cost-optimization, cost-reduction, developer-tools, github-copilot, llm, open-source, openai, productivity, token-optimization

**What it does:** TokenEconomizer wraps existing coding agents (Claude Code, Codex, GitHub Copilot CLI) as a black-box layer that learns from past sessions in a repo to cut token costs through three mechanisms: micro-skills that cache repo-specific facts, tool pruning that removes unused tools, and failure-loop intervention that breaks repetitive error cycles.

**Why now:** The repo hit number 1 Python repository of the day on Trendshift this week with a 1,286-star spike, backed by published SWE-Bench results showing 18.4-30.9% cost reduction across five agent-model combinations, with Pass@1 improving in four of five.

**Build with it:** Point TokenEconomizer at a repository you already run Claude Code or Codex against regularly, let it accumulate a few sessions, and measure whether the learned micro-skills cut your per-task token spend against your baseline.

## 5. pingdotgg/t3code <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/pingdotgg/t3code · ★ 59486 (+1227 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code is an open-source control plane that runs Claude Code, Codex, Cursor, and other ACP-compatible coding agents on your local machine and exposes them through a single interface across desktop, web, iOS, and Android.

**Why now:** The repo crossed 59,000 stars with 1,227 added this week, tracking builder demand for unified agent orchestration as Claude Code and Codex CLI both reached general availability at the same time.

**Build with it:** Install the `t3` CLI via the one-liner, point it at an already-authenticated Claude Code or Codex session, then use the phone app to approve agent commands remotely over Tailscale or T3 Connect.

## 6. NVIDIA/SkillSpector

https://github.com/NVIDIA/SkillSpector · ★ 25877 (+1218 this week) · agent-security, agent-skills, agentic-ai, ai-security, claude-code, mcp, prompt-injection, security-scanner, security-tools, security-workflow, supply-chain-security

**What it does:** SkillSpector is a static and LLM-assisted security scanner for AI agent skills (Claude Code, Codex CLI, Gemini CLI, MCP) that checks for 71 vulnerability patterns across 17 categories, including prompt injection, data exfiltration, and supply-chain risks, before you install anything.

**Why now:** The repo gained over 1,200 stars this week as scrutiny of MCP and agentic skill ecosystems grows, and the project's own dataset shows 26.1% of analyzed skills contain vulnerabilities.

**Build with it:** Add SkillSpector as a pre-install gate in your CI pipeline using `uv tool install` and pipe its SARIF output into GitHub Advanced Security to block risky skills before they reach agent environments.

## 7. mattpocock/skills

https://github.com/mattpocock/skills · ★ 323749 (+7180 this week) · —

**What it does:** A collection of small, composable agent skill files for Claude Code, Codex, Copilot, and other coding agents that guide real engineering workflows, including issue triage, spec creation, and doc generation, without handing over full process control.

**Why now:** The repo gained over 7,000 stars this week, a sharp spike tied to builder interest in structured agent workflows as a lighter alternative to heavier frameworks like BMAD and GSD.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to drop editable skill files into an existing Cursor project, then trigger `/setup-matt-pocock-skills` once to wire in your issue tracker and label config.

## 8. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 109902 (+7135 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a fully local, open-source Python app covering voice cloning, voice design, video dubbing, dictation, transcription, and audiobook creation across 646 languages, with no cloud dependency.

**Why now:** The repo gained over 7,000 stars this week, making now a good time to evaluate it before the ecosystem fragments into competing forks.

**Build with it:** Point VoiceStudio at a short audio sample and use its voice-cloning workflow to generate narration for a local audiobook pipeline without touching an external TTS API.

## 9. milind-soni/OpenMausBot

https://github.com/milind-soni/OpenMausBot · ★ 22138 (+7090 this week) · ai-agents, claude-code, codex, computer-use, docker, electron, grok, grok-bot, grok-bot-alternative, self-hosted, typescript

**What it does:** OpenMausBot is an Electron desktop app for Mac, Windows, and Ubuntu that puts Claude and Codex agents in a chat sidebar, each with its own personality, model config, and sandboxed cloud computer, so you interact with them like contacts and approve their actions one at a time.

**Why now:** The repo gained 7,090 stars this week alongside visible builder interest in Grok Bot and Manus-style agent UX, both of which the README cites as direct comparison points.

**Build with it:** Fork the repo, wire in your own Anthropic or OpenAI key, and define a custom agent persona in the bot config to test a bring-your-own-agent workflow against your existing tools.

## 10. f/prompts.chat

https://github.com/f/prompts.chat · ★ 177087 (+1049 this week) · ai, artificial-intelligence, awesome-list, chatgpt, chatgpt-prompts, claude, gemini, gpt, gpt-4, llm, machine-learning, nextjs, open-source, openai, prompt-engineering, prompts, prompts-chat, typescript

**What it does:** prompts.chat is an open-source library of curated system prompts for ChatGPT, Claude, Gemini, and other models, available as a browsable site, CSV, and Hugging Face dataset, now also hosting always-on AI agents called Bots.

**Why now:** The repo gained over 1,000 stars this week, signaling renewed interest at a moment when the site is expanding beyond static prompts into live agent hosting.

**Build with it:** Pull the `prompts.csv` file directly into your app or fine-tuning pipeline to seed a model with community-vetted system prompts without writing them from scratch.
