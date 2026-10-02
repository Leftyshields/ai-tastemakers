# Skill Tastemakers — Daily Brief — 2026-10-02

_Ranking: delta_7d · 10 repos · generated 2026-10-02T18:25:30.456Z_


## 1. stablyai/orca

https://github.com/stablyai/orca · ★ 83745 (+5601 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE that runs Codex, Claude Code, OpenCode, or Pi side-by-side in isolated git worktrees, letting you fan one prompt across multiple agents and merge the best result.

**Why now:** The project surfaced on Hacker News this week and is pulling ~5,600 stars in seven days, signaling a sharp spike in builder attention around parallel-agent workflows.

**Build with it:** Point Orca at an existing repo, split one prompt across three worktrees each running a different agent, then diff and cherry-pick the winning branch directly from the UI.

## 2. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 151456 (+5562 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript agent skill (npm: `@dietrichgebert/ponytail`) that injects a YAGNI-first heuristic into AI coding agents like Claude Code and Cursor, steering them toward minimal solutions instead of over-engineered ones.

**Why now:** The repo hit Hacker News this week and is trending on Trendshift daily and weekly charts, surfacing the debate about AI agents that install libraries and scaffold boilerplate when a single HTML attribute would do.

**Build with it:** Drop the skill into your Claude Code setup via the npm package and run it against an existing feature branch to measure how many lines your agent's next PR sheds.

## 3. NVIDIA/SkillSpector

https://github.com/NVIDIA/SkillSpector · ★ 19073 (+780 this week) · agent-security, agent-skills, agentic-ai, ai-security, claude-code, mcp, prompt-injection, security-scanner, security-tools, security-workflow, supply-chain-security

**What it does:** SkillSpector is a static + optional LLM-based security scanner that checks AI agent skills (Claude Code, Codex CLI, Gemini CLI, MCP) for 71 vulnerability patterns across 17 categories—including prompt injection, data exfiltration, and supply-chain risks—before you install them.

**Why now:** The project hit Hacker News this week, surfacing alongside NVIDIA's finding that 26.1% of a 31,000-skill dataset contain vulnerabilities, putting agent skill supply-chain risk on builders' radar.

**Build with it:** Drop SkillSpector into your CI pipeline using `uv tool install` and run it against any skill repo URL or zip before merge, gating installs on its 0–100 risk score output.

## 4. mvschwarz/openrig <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/mvschwarz/openrig · ★ 4165 (+605 this week) · agent-harness, agent-orchestration, agent-skills, ai-coding, claude-code, cli, codex-cli, multi-agent, multi-agent-systems, tmux, typescript

**What it does:** OpenRig is a TypeScript CLI that wraps Claude Code and Codex agents into persistent, YAML-defined teams managed through a single TUI, letting a lead agent coordinate specialists and surface decisions without manual terminal juggling.

**Why now:** The repo gained 605 stars this week, signaling a spike in builder interest likely tied to growing experimentation with multi-agent coding workflows as both Claude Code and Codex have seen recent active development.

**Build with it:** Define a two-agent rig in YAML (`rig setup`), point it at an existing repository, and let the lead agent drive a reviewed code change end-to-end — the fastest path to validating whether agent orchestration fits your workflow.

## 5. f/prompts.chat

https://github.com/f/prompts.chat · ★ 171850 (+599 this week) · ai, artificial-intelligence, awesome-list, chatgpt, chatgpt-prompts, claude, gemini, gpt, gpt-4, llm, machine-learning, nextjs, open-source, openai, prompt-engineering, prompts, prompts-chat, typescript

**What it does:** An open-source library of curated AI prompts (available as CSV, Markdown, or a Hugging Face dataset) that works across ChatGPT, Claude, Gemini, and other LLMs, with a self-hostable Next.js frontend.

**Why now:** The repo gained 599 stars this week and recently rebranded from "Awesome ChatGPT Prompts" to prompts.chat, signaling a push toward a broader multi-model community platform with new contribution tooling at prompts.chat/prompts/new.

**Build with it:** Pull the `prompts.csv` or Hugging Face dataset directly into a fine-tuning or RAG pipeline to seed a domain-specific prompt retrieval system for your app.

## 6. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 271053 (+3704 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness system that layers skills, memory, security, and instinct-driven workflows on top of AI coding agents like Claude Code, Codex, Cursor, and Opencode.

**Why now:** The repo is trending on GitHub this week with over 3,700 stars added, coinciding with rapid adoption of agentic coding tools like Claude Code and Opencode entering mainstream developer workflows.

**Build with it:** Drop the `ecc-universal` npm package into an existing Claude Code setup to immediately apply ECC's skill and memory layer to your agent sessions.

## 7. yetone/magpie <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/yetone/magpie · ★ 4255 (+547 this week) · claude-code, codex, deepseek, gemini-cli, llm, macos

**What it does:** Magpie is a menu-bar app (plus TUI and CLI) that lists every AI coding agent on your machine—Claude Code, Codex, Gemini CLI, OpenCode, Goose—and lets you swap each one's model or provider from a single screen, editing config files surgically without disturbing comments or formatting.

**Why now:** The repo gained 547 stars this week, tracking the moment developers are actively juggling Claude Code, Codex, and Gemini CLI simultaneously and burning time manually editing `settings.json` and `config.toml` files per agent.

**Build with it:** Point all your agents at magpie's local gateway (`http://127.0.0.1:3425/v1`) and use its Profiles feature to snapshot and switch full multi-agent model configurations in one keystroke—validating cost or capability differences across providers without touching individual config files.

## 8. Louis-CFM/coucou <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Louis-CFM/coucou · ★ 2872 (+545 this week) · ai-agents, anthropic, antigravity, claude, claude-code, codex, cursor, dynamic-island, gemini-cli, linux, macos, macos-app, menubar-app, notch, open-source, swift, swiftui, windows

**What it does:** Coucou is a cross-platform desktop companion (macOS notch, Windows/Linux top bar) that surfaces Claude Code, Codex, Cursor, and Gemini CLI agent sessions in real time — showing file reads, edits, and permission requests with one-click Allow/Deny controls.

**Why now:** The repo gained 545 stars this week, coinciding with rising developer frustration around context-switching to approve AI agent permissions mid-session — a workflow pain Coucou directly addresses.

**Build with it:** Tag any webhook payload with `coucou_agent` (documented in `docs/AGENTS.md`) to give a custom agent its own notch pill and live activity feed without modifying the core app.

## 9. google/mantis <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/google/mantis · ★ 2215 (+504 this week) · adk, adk-python, ai-agents, antigravity, antigravity-cli, application-security, application-security-tools, code-review, devsecops, gemini-api, gemini-cli, hardware-security, llm, multi-agent-systems, prompt-engineering, sast, security, static-analysis, threat-modeling, vulnerability-detection

**What it does:** Mantis is a Python toolkit built on Google ADK that chains AI agents to autonomously find, reproduce, and patch vulnerabilities in a codebase — covering threat modeling, exploit reproduction, deduplication, severity calibration, and patch verification in a single `./run.sh` pipeline.

**Why now:** The repo gained 504 stars this week following its public release under the `google` GitHub org, surfacing it as a notable new open-source security tool from Google's AI/ADK ecosystem.

**Build with it:** Point `./run.sh path/to/code --focus "look for IDOR"` at a private codebase and use the `workflow.json` ADK config to customize which agent graph stages run, giving you a tunable static audit loop without standing up additional infrastructure.

## 10. sergebulaev/linkedin-skills

https://github.com/sergebulaev/linkedin-skills · ★ 3965 (+482 this week) · agent-skill, agent-skills, ai-agents, ai-content, ai-marketing, anthropic, awesome-claude, claude-code, claude-skills, content-creation, content-engineering, linkedin, linkedin-automation, linkedin-engineering, llm-tools, openclaw-skill, personal-branding, prompt-engineering, skill-md, social-media-automation

**What it does:** A set of 12 Claude Code / Codex skills (SKILL.md files) that draft LinkedIn posts, comments, and replies in your voice, strip AI tells, and hold for approval before publishing via `lib/publora_client.py`.

**Why now:** The repo gained 482 stars this week, signaling a surge of builder interest that aligns with Claude Code's rapid adoption as a terminal-native agentic workflow tool.

**Build with it:** Clone the repo, wire it into OpenClaw by adding the three-line system prompt from the README, then run a post-drafting skill against your own LinkedIn feed using `lib/apify_client.py` to validate the voice-matching pipeline end to end.
