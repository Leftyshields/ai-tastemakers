# Skill Tastemakers — Daily Brief — 2026-10-12

_Ranking: delta_7d · 10 repos · generated 2026-10-12T21:45:49.734Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 152410 (+147094 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, ctf, decompiler, developer-tools, disassembler, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, reverse-engineering, static-analysis

**What it does:** REA is an MCP server (a standardized bridge between AI agents and external tools) that connects Claude Code, Cursor, and Codex to reverse-engineering tools like Hopper, Ghidra, and IDA, letting agents inspect native binaries, Electron apps, .NET assemblies, and JavaScript without source code.

**Why now:** An HN thread titled "Reverse engineer anything with agents, from app behavior down to native binaries" pulled 72 points and 24 comments this week, surfacing real builder demand for agent-driven binary analysis.

**Build with it:** Run `npx rea-agents setup`, point it at an existing Hopper or Ghidra install, and add REA's MCP server to your agent config to decompile and interrogate closed-source app features on demand.

## 2. eternity4719/HowToLiveBetter

https://github.com/eternity4719/HowToLiveBetter · ★ 61025 (+17669 this week) · —

**What it does:** A Chinese-language life-optimization reference covering health, law, finance, and social policy across 687 prioritized tips, each citing peer-reviewed journals or official documents with graded evidence levels (A/B/C).

**Why now:** The repo gained roughly 17,600 stars in a single week — a viral breakout that makes community-built tooling like apps, plugins, and structured datasets immediately useful territory.

**Build with it:** Install the provided Claude Code or Codex skill from `skills/life-decision-guide/` and wire it to a chatbot UI so users can query tips by section number with cited sources returned inline.

## 3. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 95116 (+2286 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste Skill is a set of portable agent skills you drop into Codex, Cursor, or Claude Code to push layout, typography, motion, and spacing decisions toward something defensible rather than generic AI default output.

**Why now:** The repo surfaced on Hacker News this week and has crossed 95,000 stars as vibe-coding — using AI agents to ship frontends fast from rough prompts — becomes a default workflow and produces predictably mediocre UI.

**Build with it:** Pull the layout and typography skills into an existing Claude Code session and use the bundled image-generation skills to produce a reference board the agent treats as a visual spec during implementation.

## 4. mksglu/context-mode

https://github.com/mksglu/context-mode · ★ 27202 (+1732 this week) · antigravity, claude, claude-code, claude-code-hooks, claude-code-plugins, claude-code-skill, codex, codex-cli, context-mode, copilot, cursor-plugin, kiro, mcp, mcp-server, mcp-tools, openclaw, opencode, pi-agent, skills, zed-extension

**What it does:** Context Mode is a TypeScript MCP layer that sandboxes tool output from coding agents — compressing raw context like Playwright snapshots and GitHub issue dumps by up to 98% and persisting session memory across 17 platforms.

**Why now:** The project hit #1 on Hacker News this week with 570+ points, reflecting real pain around context window exhaustion in agentic coding workflows where MCP tool calls quietly eat most of your available tokens.

**Build with it:** Wire it into an existing Claude Code setup via its hooks interface to measure exactly how much context your MCP tool calls consume before and after sandboxing.

## 5. mattpocock/skills

https://github.com/mattpocock/skills · ★ 287840 (+10823 this week) · —

**What it does:** A collection of small, composable agent skill files for Claude Code, Codex, Copilot, and others that guide coding agents through structured workflows — triaging tickets, generating specs — without handing over process control to a heavier framework.

**Why now:** The repo gained over 10,000 stars this week, marking it as the current reference point for developers looking for a lighter alternative to AI workflow frameworks like BMAD and Spec-Kit.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to drop editable skill files into an existing Cursor project, then invoke `/setup-matt-pocock-skills` once to wire in your issue tracker and label conventions.

## 6. Jakeschincariol/replica-skill <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Jakeschincariol/replica-skill · ★ 2142 (+1484 this week) · agent, agent-skills, app-clone, claude, claude-code, claude-skills, indie-hacker, reverse-engineering, saas

**What it does:** Eleven Claude skills that reverse-engineer any app from its public pages and screenshots, then rebuild it screen by screen — covering stack planning, design tokens, auth, payments, testing, and deploy — with a dedicated `/replica-entrepreneur` skill that scrapes real user reviews to surface fixable weaknesses you can compete on.

**Why now:** The repo gained 1,484 stars this week, a spike likely tied to the Claude Code plugin marketplace opening as an installation path.

**Build with it:** Paste a competitor's URL into `/replica-recon` inside a Claude Code session, let it write `replica/recon.md`, then pipe that into `/replica-architect` to get a concrete Next.js + Postgres schema before writing a line of code.

## 7. Oldcircle/geo-sleuth <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Oldcircle/geo-sleuth · ★ 2178 (+1451 this week) · agent-skills, ai-agents, claude-code, codex, computer-vision, cursor, gemini-cli, geoguessr, geoint, geolocation, github-copilot, image-geolocation, opencode, openstreetmap, osint, photo-geolocation, reverse-image-search, satellite-imagery

**What it does:** geo-sleuth is an agent skill that locates where a photo was taken using OpenStreetMap geometry, elevation skyline matching, satellite tiles, and street view — returning a coordinate, heading, and satellite evidence image with every claim tied to a named script output.

**Why now:** The repo gained 1,451 stars this week, reflecting growing builder interest in OSINT and geolocation tooling within the agent-skills ecosystem.

**Build with it:** Install via `npx skills add Oldcircle/geo-sleuth`, wire it into Claude Code or Gemini CLI, and invoke it with a plain prompt — "find where this photo was taken" — to validate the geolocation pipeline against your own imagery.

## 8. QingYunA/answer-me-with-html <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/QingYunA/answer-me-with-html · ★ 3101 (+1361 this week) · agent-skill, ai-agent, claude-code, claude-code-skill, claude-skill, claude-skills, cli, diagram, dsh-plugin, explainer, html, llm, ste100

**What it does:** A CLI agent skill for Claude Code, Codex, and Cursor that intercepts a question, has the model draft Markdown first, then generates a full HTML page with SVG diagrams and CSS — cutting token output to roughly one-eighth what hand-written HTML would cost.

**Why now:** The repo gained 1,361 stars this week, riding the current wave of agentic coding tool adoption across Claude Code and Codex workflows.

**Build with it:** Drop the skill into an existing Claude Code setup via the always-on mode config so every technical question in your dev session returns a readable HTML explainer with diagrams instead of a plain text dump.

## 9. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 52438 (+9007 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** An agent skill that generates self-contained HTML + SVG diagram files across 45 diagram types, styled to your brand's palette and fonts, installable in Cursor, Claude Code, Codex, Copilot, and others via `npx skills add cathrynlavery/diagram-design`.

**Why now:** The repo gained 9,007 stars this week, making it a live reference point in agent-tooling conversations right now.

**Build with it:** Run `npx skills add cathrynlavery/diagram-design`, prompt your agent with a plain-English description of an architecture or flow, and get a double-clickable `.html` diagram scoped to your site's brand via the onboarding URL command.

## 10. MadsLorentzen/ai-job-search

https://github.com/MadsLorentzen/ai-job-search · ★ 46360 (+1321 this week) · ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume

**What it does:** A Claude Code–based CLI framework that scrapes job portals, scores posting fit against a user-filled profile, then runs a drafter-reviewer pipeline to produce tailored LaTeX CVs and cover letters plus interview prep.

**Why now:** The repo added 1,321 stars this week and has a concrete proof-of-use case circulating on LinkedIn: the geophysicist who built it used the exact `/scrape` → `/apply` → `/interview` workflow to land an AI engineering role after a 2025 layoff.

**Build with it:** Fork the repo, fill in your profile files, and swap the Danish job-board scraper commands for your local portals to plug the `/apply <url>` workflow into any regional job market.
