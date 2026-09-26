# Skill Tastemakers — Daily Brief — 2026-09-26

_Ranking: delta_7d · 10 repos · generated 2026-09-26T17:10:06.847Z_


## 1. stablyai/orca

https://github.com/stablyai/orca · ★ 78775 (+6348 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile ADE that runs Codex, Claude Code, OpenCode, or Pi agents in parallel git worktrees, letting you fan one prompt across multiple isolated agents and merge the best result.

**Why now:** A Show HN thread surfaced this week alongside 6,000+ new stars, pulling it into active builder conversation at the same moment agentic coding tools are proliferating across the ecosystem.

**Build with it:** Point Orca at an existing repo, split one prompt across three worktrees running Claude Code, and use the built-in compare view to pick and merge the winning branch.

## 2. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 267822 (+5146 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness optimization layer that adds skills, memory, security (via `ecc-agentshield`), and research-first development workflows to AI coding agents like Claude Code, Codex, Cursor, and Opencode.

**Why now:** The repo gained over 5,000 stars this week and holds a GitHub Trending top rank, signaling a surge in developer interest around structured agent tooling.

**Build with it:** Install `ecc-universal` from npm and drop it into an existing Claude Code workflow to immediately layer memory and instinct primitives onto your agent sessions.

## 3. irinabuht12-oss/marketing-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/irinabuht12-oss/marketing-skills · ★ 2263 (+664 this week) · ai-visibility, claude-code, claude-desktop, claude-marketing-skills, claude-plugin, claude-skills, claude-skills-for-marketing, cursor, geo, google-ads, google-ads-mcp, marketing, marketing-skills, mcp, mcp-server, meta-ads, meta-ads-mcp, seo

**What it does:** A collection of 49 markdown-based Claude skills covering Google Ads audits, Meta Ads diagnostics, SEO, and AI visibility, paired with the Ryze MCP connector that pipes live Google Ads, Meta Ads, GA4, and Search Console data directly into Claude.

**Why now:** The repo gained 664 stars this week, signaling a surge in adoption as marketers act on Claude Code's plugin system becoming a viable distribution channel for domain-specific skill sets.

**Build with it:** Run `claude mcp add ryze --transport http https://connector.get-ryze.ai/mcp` and then invoke the Ad Spend Allocator skill to get live cross-channel budget reallocation recommendations against your actual account data.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 146343 (+3943 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript skill/prompt layer for AI coding agents (Claude Code, Cursor, and 20 others) that enforces YAGNI discipline — steering agents toward minimal code rather than over-built solutions, averaging ~54% fewer lines across real feature tasks.

**Why now:** The repo gained nearly 4,000 stars this week, surfacing it on Trendshift's daily and weekly trending charts alongside a freshly published agentic benchmark writeup comparing it against a fair baseline.

**Build with it:** Drop the skill into an existing Claude Code project via the npm package `@dietrichgebert/ponytail` and immediately measure token cost reduction on a feature branch where your agent previously over-built.

## 5. anthropics/claude-plugins-official

https://github.com/anthropics/claude-plugins-official · ★ 37049 (+553 this week) · claude-code, mcp, skills

**What it does:** Anthropic's official Claude Code plugin directory hosts curated internal and community-submitted plugins—MCP servers, slash commands, agents, and skill bundles—installable via `/plugin install {plugin-name}@claude-plugins-official`.

**Why now:** The repo gained 553 stars this week, signaling a surge in builder interest coinciding with the plugin submission pipeline going live at clau.de/plugin-directory-submission.

**Build with it:** Submit a skill-bundle plugin by pointing a marketplace entry at a git subdirectory of `SKILL.md` files using `strict: false` and an explicit `skills` array, then register it under a permanent slug via the submission form.

## 6. Donchitos/Claude-Code-Game-Studios

https://github.com/Donchitos/Claude-Code-Game-Studios · ★ 25450 (+3529 this week) · ai-agents, ai-assisted-development, anthropic, claude, claude-code, game-design, game-development, gamedev, godot, indie-game-dev, unity, unreal-engine

**What it does:** Claude Code Game Studios installs 49 specialized subagents (directors, department leads, and specialists), 74 slash commands like `/start`, `/design-system`, and `/dev-story`, plus 12 automated hooks into a Claude Code project to enforce studio-grade structure on solo AI game development sessions.

**Why now:** The repo gained 3,529 stars this week, coinciding with rising builder interest in Claude Code's subagent and hooks system as a coordination layer rather than a simple chat interface.

**Build with it:** Clone the repo into your Godot or Unity project root, run the setup script to register the `.claude/agents` and `.claude/skills` directories, then open Claude Code and call `/start` to trigger the creative director's vision intake and get a structured GDD before writing a line of code.

## 7. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 137133 (+3472 this week) · ai-tools, claude-code, codex, desktop-app, grok, grokbuild, hermes, hermes-agent, mcp, open-source, openclaw, openclaw-ui, opencode, pi, provider-management, rust, skills, skills-management, tauri, wsl-support

**What it does:** CC Switch is a Tauri-built cross-platform desktop app that lets you switch API providers (Claude, Codex, Gemini, Grok, and others) across multiple AI coding tools and manage their MCP, Skills, and Prompts configs without hand-editing JSON/TOML/YAML files.

**Why now:** The repo gained 3,472 stars this week and recently added support for Kimi K3—a 2.8-trillion-parameter open model—making it a timely integration point for builders evaluating new frontier models.

**Build with it:** Point CC Switch at your existing Claude Code setup and use its provider-switching UI to test Kimi K3 or another relay API against the same MCP server config, without touching the underlying JSON.

## 8. mksglu/context-mode

https://github.com/mksglu/context-mode · ★ 24082 (+451 this week) · antigravity, claude, claude-code, claude-code-hooks, claude-code-plugins, claude-code-skill, codex, codex-cli, context-mode, copilot, cursor-plugin, kiro, mcp, mcp-server, mcp-tools, openclaw, opencode, pi-agent, skills, zed-extension

**What it does:** Context Mode intercepts MCP tool output before it hits your context window, compressing payloads by up to 98% and persisting session memory across 17 AI coding platforms via hooks.

**Why now:** It hit #1 on Hacker News this week with 570+ points, surfacing active builder discussion around MCP context blowout as a concrete daily pain point.

**Build with it:** Wire it into an existing Claude Code or Cursor workflow via the MCP server config to immediately sandbox tool output like Playwright snapshots or GitHub issue fetches that otherwise consume tens of kilobytes per call.

## 9. mukul975/Anthropic-Cybersecurity-Skills

https://github.com/mukul975/Anthropic-Cybersecurity-Skills · ★ 33410 (+422 this week) · ai-agents, claude-code, cloud-security, cybersecurity, devsecops, ethical-hacking, incident-response, infosec, llm, malware-analysis, mcp, mitre-attack, nist-csf, osint, penetration-testing, red-team, security, security-automation, threat-hunting, threat-intelligence

**What it does:** A community-maintained library of 818 structured cybersecurity skills across 34 domains — covering red-team, forensics, threat hunting, cloud security, and AI-security — each following the agentskills.io standard and mapped to MITRE ATT&CK, NIST CSF 2.0, MITRE ATLAS, D3FEND, NIST AI RMF, and MITRE F3.

**Why now:** The repo gained 422 stars this week and sits at 33k+, signaling a surge in builders actively wiring security tooling into AI agent workflows.

**Build with it:** Drop the relevant skill definitions into a Claude Code or Cursor context window to give your agent grounded, framework-mapped instructions for a specific task like Kerberoasting detection or cloud breach scoping.

## 10. matt1398/claude-devtools <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/matt1398/claude-devtools · ★ 3950 (+403 this week) · ai, ai-agent, ai-debugging, ai-tools, anthropic, claude, claude-code, claude-code-tools, debugging, desktop-app, developer-tools, devtools, electron, llm, macos-app, observability, open-source, session-viewer, token-usage, typescript

**What it does:** claude-devtools is an open-source desktop app that reads Claude Code's local session logs to surface tool call inputs/outputs, chain-of-thought reasoning, subagent activity, and token breakdowns in a visual UI — replacing the choice between opaque summaries and raw `--verbose` JSON.

**Why now:** Claude Code v2.1.20 replaced detailed terminal output with one-line summaries ("Read 3 files"), triggering an immediate HN backlash thread, making session inspection newly painful for anyone debugging agentic workflows.

**Build with it:** Point the app at your existing `~/.claude` session logs directory to get a structured transcript view of any past Claude Code run without changing your existing workflow or CLI flags.
