# Skill Tastemakers — Daily Brief — 2026-10-27

_Ranking: delta_7d · 10 repos · generated 2026-10-27T18:43:45.219Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 396392 (+50412 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a Model Context Protocol (MCP) server, meaning it gives AI agents a standardized way to call external tools. It connects agents to inspection tools for native binaries, JavaScript and Electron apps, .NET assemblies, and websites, all without source code access.

**Why now:** A Hacker News thread titled "Reverse engineer anything with agents, from app behavior down to native binaries" pulled 101 points and 39 comments this week, reflecting fresh builder interest in AI-assisted reverse engineering.

**Build with it:** Run `npx rea-agents setup` to wire REA into Claude Code, Codex, or any MCP-compatible client, then point it at a closed-source app to extract and replicate a specific feature.

## 2. Gathin23/cleanyourtv

https://github.com/Gathin23/cleanyourtv · ★ 41358 (+30747 this week) · adb, adblock, android-tv, android-tv-launcher, apple-tv, bloatware-removal, claude-code, debloat, fire-tv, google-tv, launcher, privacy, smart-tv, sony-bravia, tcl, vibe-coding, xiaomi

**What it does:** CleanYourTV connects to any Android TV or Google TV over Wi-Fi via ADB (Android Debug Bridge, a standard device control interface), disables bloatware and ad packages without uninstalling them, and replaces the default home screen with a minimal 532 KB launcher styled after Apple TV, with a one-line restore command.

**Why now:** A before-and-after tweet posted October 17, 2026 hit 7.4M views and triggered a wave of community contributions that expanded device support to 341 TV models across 93 brands, making this week the peak moment for community-sourced compatibility data.

**Build with it:** Fork the repo, add your TV model's package blocklist to the community device list, and validate it by running the Wi-Fi ADB debloat script against your own set-top box.

## 3. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 103560 (+3790 this week) · agent-skills, ai-agents, anti-slop, claude-code, codex, cursor, design-system, frontend, landing-page, ui-design, web-design

**What it does:** Taste Skill is an agent skill (a reusable capability you drop into AI coding tools like Cursor, Codex, or Claude Code) that gives those agents art direction, real archival photographs, and a live browser check so they produce designed pages instead of generic AI layouts.

**Why now:** The project surfaced on Hacker News this week under an "anti-slop" framing, reflecting a concrete builder reaction against uniform AI-generated frontend output.

**Build with it:** Drop the skill into your Claude Code or Cursor workflow and give it a one-line brief to generate a fully art-directed page with sourced, credited photographs instead of placeholder assets.

## 4. makecindy/cindy <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/makecindy/cindy · ★ 7343 (+2688 this week) · agent, ai-agent, ai-assistant, android, claude-code, codex, electron, ios, llm, macos, react-native, typescript, windows

**What it does:** Cindy is an open-source, cross-device AI agent that runs on your own hardware, supporting Claude Code, Codex, and its own Pi harness, with shared tools, automations, and MCP/plugin integration across all of them.

**Why now:** The repo gained over 2,600 stars this week, pointing to a sharp spike in builder attention tied to its public launch and download availability.

**Build with it:** Wire in an existing Claude Code or Codex workflow by selecting the matching harness in Cindy's interface, then expose it across devices without any server rental or self-hosting setup.

## 5. google/elephant-goldfish-model <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/google/elephant-goldfish-model · ★ 2912 (+2638 this week) · agent-skills, ai-agents, antigravity, claude-code, claude-code-plugin, claude-skills, codex, codex-plugin, coding-agents, context-engineering, developer-tools, gemini, llm, multi-agent, prompt-engineering, spec-driven-development

**What it does:** EGM is an open-source plugin for Antigravity, Claude Code, and Codex that runs a two-agent design loop: a context-rich "Elephant" agent drafts a spec, then zero-context "Goldfish" subagents stress-test it for unstated assumptions before any code is written.

**Why now:** The repo gained 2,638 stars this week, likely tied to growing adoption of spec-driven workflows as coding agents become capable enough to handle multi-step design tasks on their own.

**Build with it:** Install via `claude plugin marketplace add google/elephant-goldfish-model`, then run `/egm:egm-brainstorm` on a feature branch to produce a `concepts_brief.md` that blind reviewers have already challenged before you write a line of implementation code.

## 6. Jakeschincariol/replica-skill

https://github.com/Jakeschincariol/replica-skill · ★ 6009 (+2301 this week) · agent, agent-skills, app-clone, claude, claude-code, claude-skills, indie-hacker, reverse-engineering, saas

**What it does:** Replica is a set of eleven Claude skills that reverse-engineer any app's screens, flows, and data model, then rebuild, test, and ship a clean-room clone under your own brand.

**Why now:** The repo gained 2,301 stars this week, reflecting sharp builder interest in AI-assisted SaaS cloning as a viable indie path.

**Build with it:** Paste a competitor's URL into `/replica-recon`, then run `/replica-entrepreneur` to pull real user complaints from reviews and fold them into your positioning before writing a line of code.

## 7. JoasASantos/REA-Prompts <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/JoasASantos/REA-Prompts · ★ 2959 (+2206 this week) · prompt-engineering, rea, reverse-enginnering

**What it does:** REAP is a curated library of 26 skill packs and paste-ready prompts for REA (Reverse Engineer Anything), covering native binaries, firmware, Android APKs, Electron apps, games, and malware analysis through your AI coding agent.

**Why now:** The repo gained 2,206 stars this week, driven by an intro thread from @0xCodila calling REA "the most dangerous thing on the internet right now," pulling in builders curious about AI-assisted reverse engineering.

**Build with it:** Run `setup.sh` to install the skill packs into your existing Claude Code, Hermes, or Codex agent, then use the feature-tracing prompts to map how a specific function works in any target binary.

## 8. alchaincyf/huashu-design <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/alchaincyf/huashu-design · ★ 27698 (+2134 this week) · agent-skills, ai-design, claude-code, claude-skills, codex, cursor, design, html, pptx, prototype

**What it does:** Huashu Design is an agent skill that takes a single text prompt and outputs finished design artifacts including clickable app prototypes, editable PPTX decks, animated product launches, and infographics, backed by an 84-style library with thumbnails and a per-project appearance ledger that learns your brand over time.

**Why now:** Version 3.0 shipped this week, introducing a six-thumbnail direction-picking flow, two new style categories for app UI and CJK typography, and a reference-screenshot step that pulls real app captures before generating. The release brought in 2,134 stars in the past week.

**Build with it:** Run `npx skills add alchaincyf/huashu-design` inside Claude Code or Cursor, then prompt it with a one-line brief like "make a product launch animation for my SaaS" to validate the full generation pipeline against your own brand assets.

## 9. NVIDIA/SkillSpector

https://github.com/NVIDIA/SkillSpector · ★ 22698 (+2000 this week) · agent-security, agent-skills, agentic-ai, ai-security, claude-code, mcp, prompt-injection, security-scanner, security-tools, security-workflow, supply-chain-security

**What it does:** SkillSpector is a static and LLM-assisted security scanner for AI agent skills (Claude Code, Codex CLI, Gemini CLI, MCP) that checks for 71 vulnerability patterns across 17 categories, including prompt injection, data exfiltration, and supply-chain risks, before installation.

**Why now:** The repo gained 2,000 stars this week as agentic coding tools spread rapidly. The underlying research dataset found that 26.1% of analyzed skills contain vulnerabilities and 5.2% show likely malicious intent.

**Build with it:** Drop SkillSpector into a CI gate using `uv tool install` and run it against any skill repo URL or zip file to block risky installs before they reach a developer machine.

## 10. SnailSploit/Claude-Red <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/SnailSploit/Claude-Red · ★ 9606 (+1973 this week) · claude-ai, claude-pt, claude-skills, redteam, redteam-tools, skills

**What it does:** claude-red is a library of 78 structured `SKILL.md` files that load domain-specific offensive security methodology into Claude on demand, covering SQLi, EDR evasion, wireless protocols, exploit development, and more.

**Why now:** The repo gained nearly 2,000 stars this week as Claude Skills (a way to give Claude reusable, loadable domain knowledge) becomes a practical surface for operator tooling.

**Build with it:** Pipe a category of skills directly into Claude Code using `cat Skills/web/**/SKILL.md | claude --system-file -` to get a context-aware web vulnerability assistant scoped to a live engagement.
