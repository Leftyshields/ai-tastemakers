# Skill Tastemakers — Daily Brief — 2026-11-19

_Ranking: delta_7d · 10 repos · generated 2026-11-19T22:40:17.032Z_


## 1. blader/humanizer

https://github.com/blader/humanizer · ★ 71241 (+2858 this week) · agent-skills, ai-humanizer, ai-writing, chatgpt, claude, claude-code, codex, cursor, humanize-ai-text, humanizer, llm, prompt-engineering, writing-tools

**What it does:** Humanizer is an agent skill that rewrites AI-generated text by targeting 26 specific patterns, such as one-line closers and staged run-ups, without changing the underlying meaning.

**Why now:** The project surfaced on Hacker News this week and is picking up momentum fast, making it worth evaluating before AI-writing tells become a harder editorial problem to fix.

**Build with it:** Install it into Claude Code with `/plugin marketplace add blader/humanizer`, pipe your draft release notes through `/humanizer`, and check the output against your own voice sample.

## 2. Gathin23/cleanyourtv

https://github.com/Gathin23/cleanyourtv · ★ 59587 (+2604 this week) · adb, adblock, android-tv, android-tv-launcher, apple-tv, bloatware-removal, claude-code, debloat, fire-tv, google-tv, launcher, privacy, smart-tv, sony-bravia, tcl, vibe-coding, xiaomi

**What it does:** CleanYourTV uses ADB over Wi-Fi to strip bloatware and ads from any Android TV or Google TV device, then swaps the default home screen for a clean, Apple TV-style launcher, with no root or USB cable required.

**Why now:** The repo hit the number-one trending position for the week of Oct 19-25 2026 and is drawing fresh Hacker News threads, putting it in front of a large builder audience right now.

**Build with it:** Point a coding assistant at the Python scripts to add a new device profile, using the existing 492-model device list as the config surface to validate your changes.

## 3. morluto/rea

https://github.com/morluto/rea · ★ 469918 (+14820 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP server (a protocol for connecting AI agents to external tools) that lets agents reverse engineer apps and native binaries without source code, tracing behavior down to the binary level.

**Why now:** An HN thread this week drew 101 points and 39 comments around agent-driven binary inspection, signaling fresh builder interest.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent, then have it explain how a closed-source app feature works before you re-implement it.

## 4. avelino/awesome-go

https://github.com/avelino/awesome-go · ★ 194834 (+1287 this week) · awesome, awesome-list, go, golang, golang-library, hacktoberfest

**What it does:** Awesome-go is a community-curated index of Go frameworks, libraries, and tools organized by category, covering authentication, bot building, data structures, CI, and more.

**Why now:** The repo gained 1,287 stars this week, reflecting a sustained spike in Go ecosystem interest worth tracking for library discovery.

**Build with it:** Browse a specific category, such as Data Integration Frameworks or Authentication, to shortlist candidate libraries before writing a line of Go, cutting research time on dependency choices.

## 5. pingdotgg/t3code

https://github.com/pingdotgg/t3code · ★ 66347 (+8088 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code is an open-source control plane that runs Claude Code, Codex, Cursor, and other ACP-compatible coding agents on your local machine and exposes them through a single interface accessible from desktop, web, iOS, and Android.

**Why now:** The repo gained over 8,000 stars this week, tied to its public launch and app store availability on iOS and Google Play.

**Build with it:** Install the `t3` CLI via the one-liner curl script, connect your existing Claude Code or Codex login, and use the phone app to approve agent commands remotely over Tailscale or T3 Connect without changing your current agent setup.

## 6. elementalsouls/Claude-BugHunter

https://github.com/elementalsouls/Claude-BugHunter · ★ 12423 (+6798 this week) · ai-security, anthropic, application-security, bug-bounty, bugbounty, bugcrowd, claude, claude-code, claude-skills, ethical-hacking, hackerone, offensive-security, pentesting, red-team, security-tools, web-security

**What it does:** Claude-BugHunter is a Claude Code skill bundle that loads 83 skills and 15 slash commands covering 681 disclosed HackerOne report patterns across 24 vulnerability classes, plus enterprise identity and infrastructure attack chains for authorized red-team and bug-bounty work.

**Why now:** The repo gained nearly 6,800 stars this week, reflecting a sharp spike in community attention around AI-assisted offensive security tooling.

**Build with it:** Install via `/plugin marketplace add elementalsouls/Claude-BugHunter` inside Claude Code, then describe a target surface in plain English to trigger the relevant hunt skill and get per-class payloads, bypass tables, and chain templates without manual invocation.

## 7. stablyai/orca

https://github.com/stablyai/orca · ★ 129824 (+6426 this week) · agent-ide, ai-agents, automation, bot, claude-code, codex, ghostty, grok-bot, hermes-agent, mobile-app, muse, openclaw, opencode, orchestration, pi, runtime, swarm, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop, mobile, and remote app that runs multiple coding agents, including Claude Code and Codex, in parallel across isolated git worktrees, with chat UI, terminal, diffs, and a browser in one interface.

**Why now:** The repo gained over 6,400 stars this week as Claude Code and Codex usage grows and builders look for ways to coordinate parallel agent workstreams.

**Build with it:** Point Orca at an existing repo, assign a large feature task to a coordinator agent, and let it spin up worker agents in separate worktrees to test the parallel-execution model against your own codebase.

## 8. K-Dense-AI/scientific-agent-skills

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 57849 (+891 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** Scientific Agent Skills is a Python library of 177 validated skills that give AI agents procedural knowledge across biology, chemistry, medicine, physics, and drug discovery, with access to over 100 scientific databases.

**Why now:** The repo gained 891 stars this week and recently rebranded from Claude-only to a broader open Agent Skills standard, adding compatibility with Cursor, Codex, and Google Antigravity alongside a free companion desktop tool, K-Dense BYOK.

**Build with it:** Drop the skills into a Cursor or Claude Code project using the Agent Skills config surface to give your coding agent structured access to genomics and cheminformatics database queries without writing the integration logic yourself.

## 9. Yuan1z0825/nature-skills

https://github.com/Yuan1z0825/nature-skills · ★ 54229 (+876 this week) · codex-skills, nature, nature-skills

**What it does:** Nature Skills is a reusable research-skill library for AI-assisted academic workflows, covering paper polishing and scientific figure generation, installable into Claude Code, Codex, or Chatbox via `npx skills`.

**Why now:** The repo crossed 54,000 stars with 876 added this week, pointing to a real uptick in adoption among researchers building agent-driven local workflows.

**Build with it:** Point Codex at the GitHub URL to auto-learn the skill schema, then generate a domain-specific `.skill` file tailored to your own research pipeline.

## 10. multica-ai/multica <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/multica-ai/multica · ★ 56755 (+865 this week) · —

**What it does:** Multica is a self-hostable project management workspace that lets you assign GitHub issues directly to AI coding agents, including Claude Code, Codex, Cursor, and Kimi, which pick up work, post progress comments, and return a diff for human review.

**Why now:** The repo has over 56,000 stars with 865 added in seven days, and builders are actively evaluating it this week.

**Build with it:** Connect your existing Claude Code or Codex CLI to a self-hosted Multica instance using the agent runtime config, assign one real issue to an agent, and verify that intent, run logs, and diffs stay linked to that issue.
