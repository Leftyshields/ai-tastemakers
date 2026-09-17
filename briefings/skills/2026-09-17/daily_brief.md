# Skill Tastemakers — Daily Brief — 2026-09-17

_Ranking: delta_7d · 10 repos · generated 2026-09-17T17:39:13.761Z_


## 1. kepano/obsidian-skills

https://github.com/kepano/obsidian-skills · ★ 48499 (+8390 this week) · agents, agentskills, bases, claude, clawdbot, cli, codex, defuddle, hermes, jsoncanvas, knap, markdown, md, obsidian, openclaw, opencode, skills

**What it does:** A collection of Agent Skills–spec–compatible skill files that teach coding agents (Claude Code, Codex, OpenCode) to read and write Obsidian's native formats — Markdown, Bases, JSON Canvas — and interact with the Obsidian CLI.

**Why now:** The repo gained 8,390 stars this week, coinciding with growing adoption of the Agent Skills specification as a cross-agent standard and Obsidian's own CLI and Bases features reaching broader availability.

**Build with it:** Clone the repo into `~/.opencode/skills/obsidian-skills/` and restart OpenCode to immediately give your agent grounded knowledge of Obsidian Flavored Markdown syntax — wikilinks, callouts, and properties — for any vault-editing workflow.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 141208 (+6731 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an agent skill (npm: `@dietrichgebert/ponytail`) that injects a YAGNI-first heuristic into AI coding agents like Claude Code and Cursor, nudging them to reach for native platform primitives before installing libraries or scaffolding boilerplate.

**Why now:** It hit Hacker News this week (98 points, 17 comments) and is trending on Trendshift daily and weekly, surfacing the debate around AI agents that over-build by default.

**Build with it:** Drop the skill into an existing Claude Code session and run it against a feature branch to measure how many dependency installs or wrapper components it eliminates before you merge.

## 3. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 261084 (+5381 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness performance optimization system that layers skills, memory, security, and research-first workflows onto AI coding agents including Claude Code, Codex, Opencode, and Cursor.

**Why now:** The repo is trending on GitHub this week with over 5,000 new stars, signaling rapid adoption as AI coding agents become a daily driver for developers.

**Build with it:** Install `ecc-universal` from npm and drop it into an existing Claude Code or Cursor project to immediately apply ECC's instinct and memory layer to your agent's sessions.

## 4. stablyai/orca

https://github.com/stablyai/orca · ★ 70947 (+5176 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile orchestration shell that runs Codex, Claude Code, OpenCode, or Pi agents in parallel git worktrees, letting you fan one prompt across multiple agents and merge the winning result.

**Why now:** The repo gained 5,176 stars this week, coinciding with its Android APK release and active iOS/TestFlight availability, signaling a live multi-platform launch moment.

**Build with it:** Point Orca at an existing repo, split a single prompt across three worktrees using the parallel-agents UI, and use Design Mode to click live UI elements and pipe their HTML/CSS directly into an agent's prompt for frontend iteration.

## 5. NVIDIA/SkillSpector <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/NVIDIA/SkillSpector · ★ 17602 (+735 this week) · agent-security, agent-skills, agentic-ai, ai-security, claude-code, mcp, prompt-injection, security-scanner, security-tools, security-workflow, supply-chain-security

**What it does:** SkillSpector is a static-plus-LLM security scanner that checks AI agent skills (Claude Code, Codex CLI, Gemini CLI, MCP) for 71 vulnerability patterns across 17 categories—including prompt injection, data exfiltration, and supply-chain risks—before you install them.

**Why now:** The repo gained 735 stars this week, coinciding with rapid adoption of agentic coding tools like Claude Code and Codex CLI where skill/extension trust is largely unvetted and researcher data shows 26.1% of analyzed skills contain vulnerabilities.

**Build with it:** Gate your team's skill installs by running `skillspector mcp` as an MCP server tool, so any agent session can invoke `/skillspector` to scan a skill URL or zip before it's added to the environment.

## 6. f/prompts.chat <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/f/prompts.chat · ★ 170546 (+683 this week) · ai, artificial-intelligence, awesome-list, chatgpt, chatgpt-prompts, claude, gemini, gpt, gpt-4, llm, machine-learning, nextjs, open-source, openai, prompt-engineering, prompts, prompts-chat, typescript

**What it does:** prompts.chat is an open-source, self-hostable library of curated AI prompts (available as CSV and Hugging Face dataset) that works across ChatGPT, Claude, Gemini, and other LLMs.

**Why now:** The repo gained 683 stars this week and remains the most-liked dataset on Hugging Face, signaling active community growth and ongoing prompt submissions through the `/prompts/new` sync pipeline.

**Build with it:** Pull the `prompts.csv` or Hugging Face dataset directly into a fine-tuning or RAG pipeline to bootstrap a domain-specific prompt retrieval layer for your app.

## 7. chaitanyagiri/munder-difflin

https://github.com/chaitanyagiri/munder-difflin · ★ 7507 (+682 this week) · agent-orchestration, agents, ai-agents, autonomous-agents, claude-code, codex, desktop-app, electron, free, gemini-cli, harness, harness-engineering, local-first, memory, multi-agent, opencode, orchestration, typescript

**What it does:** Munder Difflin is a local Electron desktop app that wraps terminal coding CLIs (Claude Code, Codex, Gemini CLI, Grok, and others) into a coordinated multi-agent harness, visualizing parallel agents as avatars on a shared office floor with a central orchestrator managing routing and memory.

**Why now:** The repo hit #1 on GitHub Trending this week and landed #5 Product of the Day on Product Hunt, surfacing it to a large builder audience at v0.4.6 with signed/notarized macOS binaries ready to run without a source build.

**Build with it:** Drop your existing Claude Code or Codex subscription credentials into Munder Difflin's bring-your-own-keys config to immediately fan out a single coding task across multiple parallel agent instances and observe where coordination bottlenecks appear in your workflow.

## 8. ningzimu/codex-ppt-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ningzimu/codex-ppt-skill · ★ 5979 (+658 this week) · agent-skills, ai-ppt, claude-code, codex, gpt-image-2, powerpoint, ppt, ppt-skill, pptx, presentation, skill

**What it does:** Codex PPT Skill converts articles, reports, or outlines into image-based `.pptx` presentations by orchestrating outline planning, per-slide image generation via GPT-Image-2 or compatible APIs, and local assembly through a Python script.

**Why now:** The repo gained 658 stars this week, driven by active community sharing of generated PPT examples in a pinned issue thread that surfaced concrete output quality and real-world use cases.

**Build with it:** Point the skill at an OpenAI-compatible image API by setting your existing `base_url`, API key, and model name in the skill config, then run it inside Claude Code or Hermes Agent to generate a slide deck from any Markdown document.

## 9. nidhinjs/prompt-master <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/nidhinjs/prompt-master · ★ 13223 (+624 this week) · claude-ai, claude-skills, llm, prompt-engineering

**What it does:** Prompt Master is a Claude skill that takes a rough intent, extracts nine structured dimensions (task, constraints, success criteria, etc.), and outputs a single token-efficient, tool-specific prompt for targets ranging from Cursor and Claude Code to Midjourney and ElevenLabs.

**Why now:** The repo gained 624 stars this week, coinciding with rising discussion around Claude's skills/MCP surface as a first-class extension point following recent Claude.ai UI updates that surfaced the Skills upload flow.

**Build with it:** Install it as a Claude.ai skill via the ZIP upload path, then wire it into your existing Cursor or Claude Code workflow so every coding prompt is pre-sharpened before it hits your API quota.

## 10. Imbad0202/academic-research-skills-codex

https://github.com/Imbad0202/academic-research-skills-codex · ★ 11112 (+590 this week) · academic-pipeline, academic-research, academic-writing, ai-research, codex, literature-review, openai-codex, peer-review, prompt-engineering, research-assistant

**What it does:** ARS-Codex vendors the Academic Research Skills suite as a single Codex-native skill, routing deep-research, paper writing, peer review, and experiment-agent workflows through a unified `SKILL.md` adapter for OpenAI Codex sessions.

**Why now:** The repo gained 590 stars this week alongside the v3.22.0 release, which ships Spanish intent routing, reviewer-calibration fixtures, output-language-pair contracts, and Windows file-lock repairs.

**Build with it:** Drop the `skills/academic-research-suite/` directory into an existing Codex project and configure `.codex/config.toml` to point at the `SKILL.md` entrypoint to get the full academic pipeline — literature review through peer review — running in your own session.
