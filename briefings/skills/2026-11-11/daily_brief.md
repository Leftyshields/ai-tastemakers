# Skill Tastemakers — Daily Brief — 2026-11-11

_Ranking: delta_7d · 10 repos · generated 2026-11-11T21:52:47.072Z_


## 1. google/elephant-goldfish-model

https://github.com/google/elephant-goldfish-model · ★ 17625 (+5932 this week) · agent-skills, ai-agents, antigravity, claude-code, claude-code-plugin, claude-skills, codex, codex-plugin, coding-agents, context-engineering, developer-tools, gemini, llm, multi-agent, prompt-engineering, spec-driven-development

**What it does:** EGM is an open-source plugin for Claude Code, Codex, and Antigravity that splits specification work between a context-rich "Elephant" drafting agent and fresh "Goldfish" reviewer agents that examine the draft without prior conversation, catching unstated assumptions before any code is written.

**Why now:** The repo picked up nearly 6,000 stars this week, landing on trending lists at a moment when spec-driven and context-engineering workflows are being actively debated across developer communities.

**Build with it:** Install via `claude plugin marketplace add google/elephant-goldfish-model`, then run `/egm:egm-review docs/designs/your-spec.md` to get a cold-eyes review of an existing design doc checked against your live codebase.

## 2. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 113521 (+3531 this week) · agent-skills, ai-agents, anti-slop, claude-code, codex, cursor, design-system, frontend, landing-page, ui-design, web-design

**What it does:** Taste Skill is an agent skill (v2.5.1) that constrains coding agents like Cursor, Codex, and Claude Code to produce professional company websites using a strict design system, real photography, brand icons, and a browser-verified finish gate, replacing the generic landing pages these tools usually produce.

**Why now:** The project surfaced on Hacker News this week under the "anti-slop front end framework" framing, reaching builders who are frustrated with AI-generated UI.

**Build with it:** Drop the skill into a Cursor or Claude Code project and run it against a single-page brief to see the design rules and browser checker enforce output quality on a client site.

## 3. morluto/rea

https://github.com/morluto/rea · ★ 452518 (+22006 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a TypeScript MCP (Model Context Protocol) server that lets AI agents reverse engineer closed apps and native binaries without source code, analyzing behavior down to the binary level.

**Why now:** An HN thread this week drew 101 points and 39 comments on its agent-driven binary analysis approach, pulling meaningful builder attention to the project.

**Build with it:** Run `npx rea-agents setup` to wire REA into your MCP-compatible agent, then point it at a closed app to extract and replicate a specific feature into your own codebase.

## 4. Fission-AI/OpenSpec <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Fission-AI/OpenSpec · ★ 74630 (+2693 this week) · ai, context-engineering, engineering, planning, prd, sdd, sdlc, spec, spec-driven-development, specification

**What it does:** OpenSpec is a spec-driven development framework for AI coding assistants that structures changes as versioned Markdown folders containing a proposal, requirements, design, and task checklist before any code is written.

**Why now:** The repo gained over 2,600 stars this week, a sharp jump tied to growing developer interest in context-engineering workflows for AI pair programmers.

**Build with it:** Install `@fission-ai/openspec` and run `/openspec-propose` inside your AI coding assistant to generate a structured change folder for your next feature, reviewing the spec before implementation begins.

## 5. janestreet/agent_skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/janestreet/agent_skills · ★ 5660 (+2022 this week) · —

**What it does:** A collection of `SKILL.md` files that configure AI agents or plain chatbots to follow structured teaching protocols, starting with a Socratic tutor that runs diagnostics, skill maps, and spaced review for any topic.

**Why now:** The repo gained over 2,000 stars this week, reflecting a notable spike in builder interest around reusable agent instruction formats.

**Build with it:** Drop the `socratic-tutor` directory into your coding agent's skills folder and prompt it with "teach me X" to validate the SKILL.md format against your own agent runtime.

## 6. homeassistant-ai/ha-mcp <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/homeassistant-ai/ha-mcp · ★ 7277 (+1852 this week) · ai, claude, hacs, home-assistant, home-automation, llm, mcp, model-context-protocol

**What it does:** HA-MCP is a Model Context Protocol server that exposes 87 tools for controlling and configuring Home Assistant via AI assistants like Claude and ChatGPT.

**Why now:** The project gained 1,852 stars this week alongside its v9.0.0 release and a new Marketplace install path available in Home Assistant 2026.11.

**Build with it:** Install the HA-MCP integration through HACS, connect it with an administrator access token, and wire Claude Desktop to the MCP endpoint to let the model read and set entity states directly.

## 7. milind-soni/OpenMausBot

https://github.com/milind-soni/OpenMausBot · ★ 21201 (+9208 this week) · ai-agents, claude-code, codex, computer-use, docker, electron, grok, grok-bot, grok-bot-alternative, self-hosted, typescript

**What it does:** OpenMausBot is an Electron desktop app for Mac, Windows, and Ubuntu that runs Claude or Codex agents as chat contacts, each with its own personality, model, and sandboxed cloud computer for autonomous task execution.

**Why now:** The repo gained over 9,000 stars this week, riding direct comparisons to Grok Bot, Meta Muse, OpenAI dots, and Cue by Manus as those products drew builder attention.

**Build with it:** Download the signed .dmg or .exe, wire in your existing Claude or Codex API key, and test a bring-your-own-agent workflow where the bot approves shell actions on its connected VM before they run.

## 8. mattpocock/skills

https://github.com/mattpocock/skills · ★ 321937 (+8820 this week) · —

**What it does:** A collection of small, composable agent skills for Claude Code, Codex, Copilot, and other coding agents, designed to give engineers fine-grained control over planning, triaging, and building without handing off the process to opinionated frameworks.

**Why now:** The repo gained roughly 8,820 stars this week, a spike likely tied to growing frustration with all-in-one "vibe coding" agent workflows.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to drop editable skill files into an existing Cursor project, then call `/setup-matt-pocock-skills` once to wire in your issue tracker and triage labels.

## 9. chuspeeism/dashi-ppt-skill

https://github.com/chuspeeism/dashi-ppt-skill · ★ 10618 (+1234 this week) · agent-skill, ai-agent, ai-ppt, claude, claude-code, dashial, html-presentation, ppt, pptx, presentation, presentation-generator, skill, slide-generator, slides

**What it does:** Dashi PPT Skill is a JavaScript agent skill that takes a document, renders it as a browser-based slide deck across 12 visual themes and 1,020 layout pages, and exports the result as editable HTML, PDF, or PPTX.

**Why now:** The repo gained 1,234 stars this week, reflecting builder interest in agent-native document workflows that bypass traditional slide tooling.

**Build with it:** Run `npx dashi-ppt-skill@latest` to install the skill, then wire it into a Claude Code or Doubao agent session to auto-generate presentation drafts from raw meeting notes or spec docs.

## 10. Imbad0202/academic-research-skills

https://github.com/Imbad0202/academic-research-skills · ★ 56524 (+1158 this week) · academic-pipeline, academic-writing, ai-research, claude, claude-code, literature-review, peer-review, prompt-engineering

**What it does:** Academic Research Skills is a Claude Code plugin suite that walks researchers through a full paper pipeline, from literature review to finalization, with human-confirmation gates at each stage to block hallucinated citations and fabricated methodology.

**Why now:** The repo gained 1,158 stars this week, coinciding with active builder interest in Claude Code's plugin marketplace as a distribution channel for structured AI workflows.

**Build with it:** Run `/plugin marketplace add Imbad0202/academic-research-skills` in Claude Code, then trigger `/ars-plan` to test the Socratic paper-structuring dialogue against your own draft outline.
