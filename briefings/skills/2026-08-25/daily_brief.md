# Skill Tastemakers — Daily Brief — 2026-08-25

_Ranking: delta_7d · 10 repos · generated 2026-08-25T14:04:04.542Z_


## 1. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 80366 (+2741 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste Skill is a set of agent skills (prompt rules / config) that stops AI coding agents like Claude Code or Codex from generating generic, visually boring frontend output.

**Why now:** The project hit Hacker News this week, surfacing active builder interest in the "anti-slop" framing at a moment when vibe-coding workflows are mainstream enough to have a slop problem.

**Build with it:** Drop the skill config into your Claude Code or Codex agent setup and run it against an existing UI component to see the delta in generated output quality.

## 2. freestylefly/awesome-gpt-image-2

https://github.com/freestylefly/awesome-gpt-image-2 · ★ 16709 (+5455 this week) · agents, ai-image-generation, chatgpt, dsh-plugin, gpt-image-2, image-prompts, prompt-as-code, prompt-engineering, skills, workflow-automation

**What it does:** A curated prompt engineering library for GPT-Image-2 with 530+ reverse-engineered cases, 20+ industrial templates, and a browsable gallery at gpt-image2.canghe.ai where prompts can be copied and tested directly.

**Why now:** The repo gained 5,455 stars this week, signaling a sharp spike in practitioner interest around structured GPT-Image-2 prompt patterns.

**Build with it:** Pull a template from the `/cases` directory, adapt its structured prompt fields to your subject, and call GPT-Image-2 via the APIMart async API (`$0.006/image`) to batch-generate variants without modifying code between runs.

## 3. stablyai/orca

https://github.com/stablyai/orca · ★ 53339 (+5401 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE that runs Codex, Claude Code, OpenCode, or Pi as parallel agents, each isolated in its own git worktree, with a companion app for monitoring and steering from your phone.

**Why now:** The project surfaced on Hacker News this week as an open-source "Conductor + Ghostty" alternative, drawing early discussion and accumulating 53K+ stars rapidly.

**Build with it:** Fan a single prompt across multiple Claude Code instances using Orca's parallel worktrees feature, then compare diffs and merge the winning branch directly from the UI.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 110434 (+5277 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an agent skill (compatible with Claude Code, Cursor, and 20 others) that steers your AI agent toward the laziest correct solution — native APIs, fewer abstractions, no unnecessary installs.

**Why now:** The agentic benchmark published June 18, 2026 shows a measurable, reproducible result: the same Claude Code agent with Ponytail produces 54% fewer lines of code, costs 20% less, and runs 27% faster than the no-skill baseline across 12 real feature tasks.

**Build with it:** Drop the skill into your Claude Code setup and run it against an existing feature branch to see how much of your last PR's diff it would have deleted.

## 5. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 54842 (+4607 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted AI gateway that exposes a single OpenAI-compatible endpoint across 353 providers and 1,200+ models, with quota-aware auto-fallback and RTK+Caveman token compression (15–95% reduction) to route tools like Claude Code, Cursor, and Cline through free tiers without interruption.

**Why now:** The repo gained 4,607 stars this week, signaling a breakout moment that typically precedes provider catalog changes and community-contributed routing rules worth catching early.

**Build with it:** Point your existing Cursor or Cline `baseURL` config at the OmniRoute endpoint and let the 19 routing strategies automatically cycle through free-tier providers when one hits its quota limit.

## 6. mukul975/Anthropic-Cybersecurity-Skills

https://github.com/mukul975/Anthropic-Cybersecurity-Skills · ★ 31071 (+2212 this week) · ai-agents, claude-code, cloud-security, cybersecurity, devsecops, ethical-hacking, incident-response, infosec, llm, malware-analysis, mcp, mitre-attack, nist-csf, osint, penetration-testing, red-team, security, security-automation, threat-hunting, threat-intelligence

**What it does:** An open-source library of 818 structured cybersecurity skills across 34 domains — covering forensics, red-team C2, cloud breach scoping, and more — formatted to the agentskills.io standard and mapped to MITRE ATT&CK, NIST CSF 2.0, D3FEND, ATLAS, NIST AI RMF, and MITRE F3 for direct consumption by AI agents.

**Why now:** The repo gained 2,212 stars this week, signaling a fast-moving adoption spike worth tracking before the skill set becomes a default dependency in agent security toolchains.

**Build with it:** Drop the relevant domain skill files into your Claude Code or Cursor context to give your agent grounded, framework-mapped procedures for a specific task — such as Kerberoasting detection via Sigma rules — without prompting from scratch.

## 7. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 18159 (+4014 this week) · agent-skill, ai, anthropic, c2pa, chatgpt, claude, gemini, openai, provenance, synthid, watermark, watermark-detection, watermark-tools, watermarking, watermarks

**What it does:** `watermarks-remover` is a Python service + agent skill that strips multi-vendor AI provenance marks from text and files — covering invisible Unicode, statistical token-sampling watermarks (SynthID-Text, Kirchenbauer, Aaronson/EXP), and file-embedded metadata (C2PA, EXIF, XMP, doc properties) across PNG, JPEG, PDF, DOCX, MP4, and a dozen other formats.

**Why now:** The repo gained 4,014 stars this week, a spike that tracks the growing developer conversation around C2PA adoption and AI-generated content disclosure mandates surfacing in platform policy discussions.

**Build with it:** Wire it into a Claude Code project by running `python3 install_skill.py --skill remove-ai-marks --target claude-project --project-dir PATH`, then point `WATERMARKS_SERVICE_URL` at the local service to automatically scrub outbound text and files before they leave your pipeline.

## 8. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 236242 (+3874 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, codex, hermes, hermes-agent, llm, nous-research, openai

**What it does:** Hermes Agent is a self-improving AI agent with a built-in learning loop that creates and refines skills from experience, searches past conversations via FTS5, and runs across terminals, messaging platforms, and serverless backends.

**Why now:** The repo crossed 236K stars with 3,874 added this week, signaling a sharp spike in builder attention that makes this a live coordination moment for early integrations.

**Build with it:** Point Hermes at your own model endpoint via `hermes model` and wire it to Telegram using the built-in gateway to get a persistent, skill-accumulating agent you can query remotely while it runs on a $5 VPS.

## 9. VoltAgent/awesome-agent-skills

https://github.com/VoltAgent/awesome-agent-skills · ★ 32176 (+1690 this week) · agent-skills, ai-agents, awesome, awesome-list, claude-code, claude-code-skills, claude-skills, codex-skills, cursor-skills, gemini-skills, opencode-skills, skills

**What it does:** A hand-curated library of 1,497+ agent skills from official engineering teams (Anthropic, Stripe, Vercel, Cloudflare, Supabase, and others) compatible with Claude Code, Gemini CLI, Cursor, Codex, and Windsurf.

**Why now:** The repo gained 1,690 stars this week, reflecting the current surge in teams adopting agentic coding workflows where reusable, battle-tested skills reduce prompt engineering overhead.

**Build with it:** Drop a skill file from the Stripe or Supabase official sets directly into your Claude Code or Cursor config to give your agent scoped, team-validated instructions without writing them from scratch.

## 10. img2threejs/img2threejs

https://github.com/img2threejs/img2threejs · ★ 13645 (+1518 this week) · 3d, ai-agents, claude-code, computer-graphics, generative, image-to-3d, procedural-generation, threejs, typescript, webgl

**What it does:** img2threejs takes a reference image and reconstructs the object in it as a procedural, animation-ready Three.js model expressed entirely in code — no mesh files, no asset downloads, no photogrammetry.

**Why now:** The repo gained 1,518 stars this week, surfacing it atop GitHub Trending in both Python daily and weekly rankings, which signals active builder attention right now.

**Build with it:** Point the forge pipeline at your own reference image to get a self-contained Three.js snippet you can drop directly into a browser-based 3D scene.
