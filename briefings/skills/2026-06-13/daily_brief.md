# Skill Tastemakers — Daily Brief — 2026-06-13

_Ranking: bootstrap_since_first_seen · 10 repos · generated 2026-06-13T13:57:28.480Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_since_first_seen`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. op7418/guizang-ppt-skill

https://github.com/op7418/guizang-ppt-skill · ★ 16970 (+1428 this week) · ai-agent, claude-code, codex, html-deck, image-generation, ppt, presentation, skill, skills, swiss-design, web-ppt

**What it does:** Guizang PPT Skill is an AI-agent skill for Claude Code and Codex that generates single-file HTML slide decks in two visual systems—editorial magazine and Swiss International typography—plus image prompts and multi-platform social covers, all runnable directly in a browser with no build step.

**Why now:** It jumped 1,428 stars this week, signaling a surge of builders looking to replace clunky PowerPoint workflows with agent-generated, code-editable presentations that LLMs can produce and modify as plain text.

**Build with it:** Clone the skill into `~/.claude/skills/`, then prompt Claude Code to turn any long-form article, product spec, or methodology doc into a polished 6–10 slide HTML deck with generated hero images and matching social covers for WeChat, Xiaohongshu, or video channels.

## 2. can1357/oh-my-pi

https://github.com/can1357/oh-my-pi · ★ 12188 (+1144 this week) · ai-agent, ai-coding-agent, anthropic, bun, claude, cli, coding-assistant, llm, mcp, multi-provider, openai, rust, terminal, tui, typescript

**What it does:** oh-my-pi (omp) is a terminal-based AI coding agent with 40+ LLM providers, 32 built-in tools, LSP/DAP integration, and a Rust core that uses hash-anchored edits to land file changes reliably on the first attempt across any supported model.

**Why now:** The project jumped 1,144 stars this week, likely on the strength of its benchmark results showing dramatic gains on models like Grok 4 Fast (−61% tokens) and MiniMax (2.1× pass rate) purely from a better edit harness—no model changes required.

**Build with it:** A builder could wire omp into a CI pipeline or local dev loop to automate multi-file refactors, run subagents against specific language servers, or benchmark their own prompting strategies across dozens of providers from a single CLI.

## 3. DietrichGebert/ponytail <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/DietrichGebert/ponytail · ★ 1133 (+572 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a plugin for AI coding agents (Claude Code, Codex, etc.) that enforces a strict laziness hierarchy—YAGNI first, stdlib second, native platform third—before writing any new code, consistently producing 80–94% fewer lines than an unconstrained agent.

**Why now:** It's trending this week with 572 stars, likely catching the wave of developers frustrated that AI agents over-engineer simple tasks and burn tokens on unnecessary abstractions like installing flatpickr when `<input type="date">` exists.

**Build with it:** Drop it into your Claude Code or Codex setup and use `/ponytail-review` as a post-generation audit step to systematically strip bloat from AI-written code before it lands in your codebase.

## 4. rohitg00/agentmemory

https://github.com/rohitg00/agentmemory · ★ 22624 (+928 this week) · agentmemory, agents, ai, claude, claudecode, codex, copilot, cursor, genai, harness, hermes, memory, openclaw

**What it does:** agentmemory is an MCP-compatible persistent memory layer for AI coding agents (Claude Code, Copilot, Cursor, Codex, etc.) that stores context across sessions using hybrid search, confidence scoring, and knowledge graphs so agents stop asking you to re-explain your codebase.

**Why now:** The repo jumped 928 stars this week, signaling a wave of developers actively hitting the context-reset wall with agentic coding tools and looking for a drop-in fix.

**Build with it:** Wire it into your Claude Code or Cursor setup via the npm MCP package to give your agent durable project memory, or extend the 53 exposed MCP tools to build a shared memory backend that multiple agents on the same team can read and write.

## 5. jlcodes99/cockpit-tools

https://github.com/jlcodes99/cockpit-tools · ★ 11295 (+858 this week) · account-manager, ai, antigravity, codebuddy, codex, cursor, github-copilot, kiro, windsurf

**What it does:** Cockpit Tools is a Rust-built desktop app that manages multiple accounts across 12 AI IDEs—Cursor, Windsurf, GitHub Copilot, Codex, Kiro, and others—with one-click account switching, quota monitoring, and parallel multi-instance launching from a single dashboard.

**Why now:** It gained 858 stars this week, likely driven by the explosion of overlapping free-tier AI coding tools where developers are juggling accounts across Kiro (just launched), Codex, and Cursor to maximize quota.

**Build with it:** Use the local Codex API proxy sidecar to route requests across multiple accounts programmatically, or script the multi-instance launch to run parallel agents on separate projects under different account quotas simultaneously.

## 6. zarazhangrui/frontend-slides

https://github.com/zarazhangrui/frontend-slides · ★ 21475 (+844 this week) · ai-slides, anthropic, claude, claude-code, claude-skill, generative-ui, html, presentation, slides, vibe-coding

**What it does:** Frontend Slides is a Claude Code plugin (and portable `SKILL.md`) that turns a coding agent into a presentation designer — generating single-file HTML slide decks with curated styles, visual style-picking previews, and optional PowerPoint conversion, all with zero npm dependencies.

**Why now:** It hit 21,475 stars with 844 added this week, signaling a sharp spike in developers using Claude Code's new plugin/marketplace system to extend agents with domain-specific skills rather than building standalone tools.

**Build with it:** Drop the plugin into Claude Code and wire it to your own content pipeline — auto-generate slide decks from meeting transcripts, research summaries, or API-fetched data, then serve the output HTML directly as a shareable URL or export to PDF via the included script.

## 7. mukul975/Anthropic-Cybersecurity-Skills

https://github.com/mukul975/Anthropic-Cybersecurity-Skills · ★ 15575 (+835 this week) · ai-agents, claude-code, cloud-security, cybersecurity, devsecops, ethical-hacking, incident-response, infosec, llm, malware-analysis, mcp, mitre-attack, nist-csf, osint, penetration-testing, red-team, security, security-automation, threat-hunting, threat-intelligence

**What it does:** This repo provides 754 structured cybersecurity skills for AI agents across 26 security domains, each mapped to five frameworks (MITRE ATT&CK, NIST CSF 2.0, MITRE ATLAS, D3FEND, NIST AI RMF) following the agentskills.io open standard for consistent agent consumption.

**Why now:** The project gained 835 stars this week, signaling a surge in developer interest in giving AI coding agents (Claude Code, Gemini CLI, Cursor, etc.) grounded, framework-backed security reasoning rather than relying on general training data.

**Build with it:** Point any compatible AI agent at these skill files to enable expert-level workflows like scoping cloud breaches, generating Sigma rules for Kerberoasting detection, or running memory forensics triage — essentially embedding a senior analyst's decision logic directly into your agent's context.

## 8. shuvonsec/claude-bug-bounty <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/shuvonsec/claude-bug-bounty · ★ 2832 (+415 this week) · ai-security, bug-bounty, bugcrowd, claude-ai, claude-code, ethical-hacking, hackerone, penetration-testing, recon, vulnerability-scanner

**What it does:** BugHunter is a Python CLI toolkit that automates the full bug bounty pipeline—recon, testing across 20 vulnerability classes, finding validation, and HackerOne/Bugcrowd-ready report generation—using local or free-tier AI providers like Ollama and Groq without requiring any paid subscription.

**Why now:** The project gained 415 stars this week, signaling a surge of interest likely driven by the Claude Code plugin ecosystem maturing and growing demand for offline-capable AI security tooling that doesn't route sensitive recon data through paid cloud APIs.

**Build with it:** A builder could fork the 7-Question validation gate and integrate it as a pre-submission filter into an internal security pipeline, or extend the provider abstraction layer to plug in any OpenAI-compatible endpoint—turning the standalone CLI into a team-shared vulnerability triage service.

## 9. open-gsd/gsd-core

https://github.com/open-gsd/gsd-core · ★ 3822 (+801 this week) · claude-code, context-engineering, meta-prompting, spec-driven-development

**What it does:** GSD Core is a meta-prompting framework that runs AI coding agents (Claude Code, Gemini CLI, Cursor, and others) through a structured five-phase loop—Discuss, Plan, Execute, Verify, Ship—using isolated subagents to prevent context rot across a 200k-token window.

**Why now:** The repo gained 801 stars this week, likely riding the current wave of "context engineering" discourse as developers hit real limits with long-running AI coding sessions losing coherence mid-project.

**Build with it:** Run `npx @opengsd/gsd-core@latest` to scaffold the phase loop into any existing codebase, then use it to coordinate parallel execution waves across multiple AI agents—useful if you're building something large enough that a single Claude Code session degrades before you ship.

## 10. AgriciDaniel/claude-seo <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/AgriciDaniel/claude-seo · ★ 8795 (+389 this week) · ai, ai-seo, claude-code, claude-code-skill, marketing-automation, open-source, seo

**What it does:** Claude SEO is an open-source Python plugin for Claude Code that runs 25 SEO sub-skills and 18 specialist agents in parallel, covering technical audits, schema markup, E-E-A-T scoring, local SEO, and AI search optimization (GEO/AEO) with falsifiable, source-backed recommendations.

**Why now:** The project gained 389 stars this week, signaling strong traction, and its alignment with Google's recently published AI Optimization Guide makes it directly relevant as search engines accelerate their shift toward AI-cited results.

**Build with it:** A freelance SEO consultant or agency could drop this into their Claude Code workflow to automate client site audits in minutes, generate prioritized action plans with verifiable evidence, and extend the tool with optional DataForSEO or Firecrawl integrations for deeper crawl data.
