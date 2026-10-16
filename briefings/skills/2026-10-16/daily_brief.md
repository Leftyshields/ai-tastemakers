# Skill Tastemakers — Daily Brief — 2026-10-16

_Ranking: delta_7d · 10 repos · generated 2026-10-16T17:25:04.242Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 287189 (+264517 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a single MCP server (a protocol layer for connecting AI agents to external tools) that lets agents inspect closed-source binaries, JavaScript/Electron apps, .NET assemblies, and websites by bridging existing Hopper, Ghidra, or IDA disassembler installations — no source code required.

**Why now:** A Hacker News thread this week pulled 99 points and 38 comments, signaling real builder interest in agent-driven reverse engineering rather than just curiosity.

**Build with it:** Run `npx rea-agents setup` to register REA with your agent, then point it at a closed-source app to extract and replicate a specific feature in your own codebase.

## 2. farion1231/cc-switch

https://github.com/farion1231/cc-switch · ★ 145180 (+3846 this week) · ai-tools, claude-code, codex, desktop-app, grok, grokbuild, hermes, hermes-agent, mcp, open-source, openclaw, openclaw-ui, opencode, pi, provider-management, rust, skills, skills-management, tauri, wsl-support

**What it does:** CC Switch is a cross-platform Tauri/Rust desktop app that swaps API providers — Claude, Codex, Gemini, Grok, and others — across agentic CLI tools like Claude Code, OpenCode, and Grok Build through a GUI instead of hand-editing JSON/TOML/YAML config files.

**Why now:** The project hit Hacker News this week and jumped 3,846 stars, tracking a real surge among builders who are juggling multiple agentic CLI tools simultaneously.

**Build with it:** If you're running Claude Code against a third-party API relay, use CC Switch to point it at a different base URL without touching `~/.claude/settings.json` directly, then compare cost or latency across providers in a single session.

## 3. anthropics/claude-plugins-official

https://github.com/anthropics/claude-plugins-official · ★ 40191 (+2645 this week) · claude-code, mcp, skills

**What it does:** An Anthropic-managed directory of installable Claude Code plugins — MCP servers, slash commands, agents, and skill bundles — split into internal (Anthropic-built) and external (community/partner) categories.

**Why now:** An iMessage plugin just appeared in the external directory and surfaced on Hacker News this week, a concrete sign the third-party plugin ecosystem is actively filling in.

**Build with it:** Submit a skill-bundle plugin via the directory's submission form using `strict: false` and an explicit `skills` array in your marketplace entry to ship `SKILL.md`-based capabilities without needing a full `plugin.json` manifest.

## 4. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 70556 (+15391 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a local-first Electron desktop app for voice cloning, video dubbing, dictation, transcription, and audiobook generation across 646 languages, powered by k2-fsa/OmniVoice with optional remote engine support.

**Why now:** The repo gained 15,391 stars this week — a sharp enough spike that early integration partners and community support are available right now.

**Build with it:** Point VoiceStudio's watch-folder workflow at a directory of script files to generate a batch audiobook pipeline without writing any synthesis code.

## 5. mattpocock/skills

https://github.com/mattpocock/skills · ★ 293806 (+12961 this week) · —

**What it does:** A collection of small, composable agent skill files for Claude Code, Codex, Copilot, and similar coding agents that enforce structured workflows — issue triage, spec-writing — without handing full process control to the agent.

**Why now:** The repo gained nearly 13,000 stars this week, likely driven by growing frustration with opaque agent frameworks like BMAD and the looseness of "vibe coding" approaches.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to drop editable skill files into a Cursor project, then invoke `/setup-matt-pocock-skills` to wire in your issue tracker and triage labels.

## 6. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 56315 (+10250 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** An agent skill that generates self-contained HTML + SVG diagram files across 45 diagram types, styled to match your brand, installable in Cursor, Claude Code, Codex, Copilot, and other skill-aware agents via `npx skills add cathrynlavery/diagram-design`.

**Why now:** The repo gained 10,250 stars this week as agentic coding workflows shift from experiment to default dev infrastructure.

**Build with it:** Run `npx skills add cathrynlavery/diagram-design` in an existing Cursor or Claude Code project, prompt your agent with your app's architecture, and get a double-clickable `.html` diagram ready to drop straight into docs or PRs.

## 7. eternity4719/HowToLiveBetter

https://github.com/eternity4719/HowToLiveBetter · ★ 64483 (+10119 this week) · —

**What it does:** A 765-entry evidence-graded life guide for mainland China covering health, finances, law, social insurance, and business compliance — each entry cites the cost, benefit, and source, drawing from peer-reviewed journals or official government documents.

**Why now:** The repo gained over 10,000 stars this week, making it a high-signal dataset for anyone building Chinese-language practical knowledge tools while community momentum is high.

**Build with it:** Install the included Claude Code or Codex skill (`skills/life-decision-guide/`) to query the guide's entries by natural language and get cited, section-numbered answers.

## 8. ruvnet/ruflo

https://github.com/ruvnet/ruflo · ★ 75516 (+1382 this week) · agentic-ai, agentic-framework, agentic-workflow, agents, ai-agents, ai-assistant, ai-skills, autonomous-agents, claude, codex, dsh-plugin, harness, mcp-server, multi-agent, multi-agent-systems, npm, skills, swarm, swarm-intelligence, typescript

**What it does:** Ruflo is a TypeScript meta-harness for Claude Code and Codex that orchestrates multi-agent swarms — groups of coordinated AI agents — with adaptive memory, MCP server support, and a visual terminal UI for managing autonomous workflows.

**Why now:** The repo gained 1,382 stars this week, tracking closely with the Claude Code plugin ecosystem maturing around the `/plugin marketplace` command surface introduced in Claude Code 2.1.287.

**Build with it:** Run `npx ruflo@latest init wizard` in any project, then point an MCP-enabled client at `npx -y ruflo@latest mcp start` to expose Ruflo's swarm tools over stdio.

## 9. avelino/awesome-go <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/avelino/awesome-go · ★ 188734 (+1372 this week) · awesome, awesome-list, go, golang, golang-library, hacktoberfest

**What it does:** A community-curated index of Go frameworks, libraries, and tools organized by category — CLI, auth, AI, data structures, bots, and more — covering the practical breadth of the Go ecosystem.

**Why now:** The repo gained 1,372 stars this week, a useful signal when you're evaluating library choices and want to know what the Go community is actually paying attention to.

**Build with it:** Use the categorized index as a dependency shortlist during your project's `go.mod` initialization phase to pick vetted libraries before writing any scaffolding code.

## 10. Ryze-AI-Adgent/open-seo-mcp-skills

https://github.com/Ryze-AI-Adgent/open-seo-mcp-skills · ★ 5831 (+1252 this week) · ai-seo, ai-visibility, backlinks, claude, claude-code, claude-skills, dataforseo, generative-engine-optimization, geo, geo-mcp, keyword-research, llm-seo, mcp, mcp-server, open-source-seo, rank-tracking, seo, seo-audit, seo-mcp, seo-mcp-server

**What it does:** An open-source MCP server that pipes real Google Search Console, GA4, and Google Ads data into Claude skills for keyword research, rank tracking, site audits, backlink analysis, and AI-referral visibility — with DataForSEO handling competitor and SERP data at cost, no markup.

**Why now:** The repo gained 1,252 stars this week as builder interest in MCP-based tooling grows alongside GEO (generative engine optimization) — the practice of optimizing for AI-driven traffic sources like ChatGPT and Perplexity that are now measurable.

**Build with it:** Run `claude plugin marketplace add Ryze-AI-Adgent/open-seo-mcp-skills` inside Claude Code, connect your GSC account via the Ryze connector, then invoke `"run an SEO audit on mysite.com"` to validate the full skill pipeline against your own search data.
