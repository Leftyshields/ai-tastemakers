# AI Tastemakers — Daily Brief — 2026-11-27

_Ranking: delta_7d · 10 repos · generated 2026-11-27T23:21:46.843Z_


## 1. milind-soni/OpenMausBot

https://github.com/milind-soni/OpenMausBot · ★ 28542 (+2363 this week) · ai-agents, claude-code, codex, computer-use, docker, electron, grok, grok-bot, grok-bot-alternative, self-hosted, typescript

**What it does:** OpenMausBot is an Electron desktop app for Mac, Windows, and Ubuntu that runs a sidebar of AI agents, each with its own personality, model (Claude or Codex), and sandboxed cloud computer, all controlled through a chat interface.

**Why now:** The repo crossed 2,300 stars this week while explicitly positioning itself against closed competitors like Meta Muse, OpenAI Dots, and Manus Cue.

**Build with it:** Bring your own Claude or Codex API key, assign it to a custom bot persona, and test agent-driven file and app tasks through the native approval flow.

## 2. pingdotgg/t3code

https://github.com/pingdotgg/t3code · ★ 82152 (+14426 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code is an open-source control plane, a single interface across desktop, web, iOS, and Android, that orchestrates Claude Code, Codex, Cursor, and other ACP-compatible coding agents running on your own machine.

**Why now:** The repo picked up over 14,000 stars this week, the clearest signal yet of how quickly builder interest around multi-agent orchestration is compressing.

**Build with it:** Install the `t3` CLI with the one-liner, sign into an existing Claude Code or Codex session, and use the built-in worktree and Git integration to run agent threads that commit, push, and open pull requests without leaving the interface.

## 3. elementalsouls/Claude-BugHunter

https://github.com/elementalsouls/Claude-BugHunter · ★ 26026 (+11952 this week) · ai-security, anthropic, application-security, bug-bounty, bugbounty, bugcrowd, claude, claude-code, claude-skills, ethical-hacking, hackerone, offensive-security, pentesting, red-team, security-tools, web-security

**What it does:** Claude-BugHunter is a skill bundle for Claude Code (the terminal-based AI coding agent) that loads 85 skills and 16 slash commands covering 681 disclosed HackerOne report patterns across 24 vulnerability classes, turning Claude Code into a scoped bug-hunting and red-team operator.

**Why now:** Nearly 12,000 stars landed this week, tracking a surge in interest around AI-assisted offensive security tooling.

**Build with it:** Install via `/plugin marketplace add elementalsouls/Claude-BugHunter` inside Claude Code, describe a target surface in plain English, and the relevant hunt skill fires automatically against a training platform like OWASP Juice Shop or DVWA.

## 4. BaaRai/ARTEX

https://github.com/BaaRai/ARTEX · ★ 23511 (+9899 this week) · ai, ai-agents, artex, autonomous-agents, bug-bounty, docker, golang, linux, llm, mcp, nextjs, penetration-testing, pentest, postgresql, rea, red-team, security, security-automation, sqlite, typescript

**What it does:** ARTEX is a self-hosted, LLM-driven penetration testing platform where a planner decomposes goals into intents, workers execute them with real tools, and every finding links back to captured HTTP traffic through a dual-graph audit trail.

**Why now:** The repo gained roughly 9,900 stars this week as autonomous offensive security tooling draws sustained community attention.

**Build with it:** Point ARTEX at a scoped target, wire in a local Ollama endpoint under System, then LLM, and use the multi-LLM worker rotation config to run evidence-backed recon without routing traffic to external model APIs.

## 5. morluto/rea

https://github.com/morluto/rea · ★ 481099 (+9690 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is an MCP server (a standard protocol for wiring tools into AI agents) that gives agents the ability to inspect native binaries, JavaScript and Electron apps, .NET assemblies, and websites at the binary level, all without source code.

**Why now:** The repo is gaining roughly 9,690 stars this week, reflecting sharp builder interest in agent-driven reverse engineering workflows.

**Build with it:** Run `npx rea-agents setup` to wire REA into your agent as an MCP tool, then prompt it to analyze a closed-source app feature and return a working reimplementation for your own project.

## 6. coreyhaines31/marketingskills

https://github.com/coreyhaines31/marketingskills · ★ 63022 (+1308 this week) · agent-skills, ai-agents, ai-seo, claude, claude-code, claude-code-plugin, claude-skills, codex, content-marketing, conversion-rate-optimization, copywriting, cursor, email-marketing, generative-engine-optimization, growth-marketing, marketing, marketing-automation, saas-marketing, seo, skill-md

**What it does:** A collection of markdown skill files for AI coding agents, including Claude Code, Cursor, Codex, and Windsurf, covering CRO, copywriting, SEO, analytics, and growth engineering tasks that the agent can execute directly.

**Why now:** The repo sits at 63K stars with 1,308 added this week, riding the Agent Skills spec gaining traction across multiple coding tools and the broader shift toward agent-native workflows.

**Build with it:** Drop the skill files into a Claude Code project, follow the `tools/SETUP.md` credential guide to connect a live marketing account, and run your first read-only audit in the terminal.

## 7. XinaTian/MROffice <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/XinaTian/MROffice · ★ 5023 (+1258 this week) · ai, ai-agent, claude-code, codex, copilot, cursor, document-editor, docx, embed, excel, mcp, mcp-server, microsoft-office-alternative, office-suite, pdf-editor, powerpoint, pptx, spreadsheet, word, xlsx

**What it does:** MR Office is an open-source, browser-based office suite covering documents, spreadsheets, presentations, PDF, and code, with an AI copilot that edits real .docx, .xlsx, and .pptx files directly rather than converting to an intermediate format.

**Why now:** The repo gained 1,258 stars this week alongside its MCP server launch, which lets Claude, ChatGPT, Cursor, and Codex create and edit Office files programmatically through a standard agent tool interface.

**Build with it:** Point your Claude or Cursor setup at the MCP server to have the AI agent generate and modify real Word or Excel files inside your existing workflow.

## 8. beenuar/AiSOC

https://github.com/beenuar/AiSOC · ★ 8341 (+1233 this week) · agentic-ai, ai-security, alert-triage, blue-team, cybersecurity, detection-engineering, incident-response, langgraph, llm-agents, mcp, mitre-attack, model-context-protocol, purple-team, security-operations, self-hosted, siem, soar, soc, threat-detection, threat-intelligence

**What it does:** AiSOC is a self-hostable Python security operations center that ingests telemetry, runs a 3,026-rule detection engine, groups alerts into incidents, and routes each one through an auditable LLM agent that records every prompt and tool call before proposing a human-approved response.

**Why now:** The repo gained 1,233 stars this week and ships an MCP server, putting it squarely in the wave of builders connecting Claude and Cursor to security workflows via the Model Context Protocol.

**Build with it:** Point the bundled MCP server at your Claude or Cursor instance, then replay the agent decision ledger against your own ingested telemetry to validate triage logic without touching a live environment.

## 9. guillaumemeyer/watermarks-remover

https://github.com/guillaumemeyer/watermarks-remover · ★ 28982 (+1081 this week) · agent-skill, ai, anthropic, c2pa, chatgpt, claude, gemini, openai, provenance, synthid, watermark, watermark-detection, watermark-tools, watermarking, watermarks

**What it does:** watermarks-remover strips AI provenance marks from text and files you own, covering invisible Unicode and statistical watermarks (SynthID-Text, Kirchenbauer, Aaronson/EXP) as well as C2PA, EXIF, and XMP metadata across more than 20 file formats.

**Why now:** The repo crossed 1,000 stars this week as provenance-marking schemes from Claude, Gemini, and OpenAI become more widely documented and builders start treating output hygiene as a production concern.

**Build with it:** Install the `remove-ai-marks` skill into Claude Code via `python3 install_skill.py --skill remove-ai-marks --target claude-code`, then point `WATERMARKS_SERVICE_URL` at the local Python service to strip marks from generated content inside your existing Claude Code workflow.

## 10. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 89094 (+7027 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency plugin for dsh (a shell scripting tool) that routes requests to frontier models including DeepSeek V4.1 Flash and Kimi K3 through OpenCode's Zen gateway and Kilo AI's free pool, with no login, account, or API key required.

**Why now:** The repo hit number one on both the Trendshift JavaScript daily and weekly charts for the week of 2026-10-05 to 2026-10-11.

**Build with it:** Point any OpenAI-compatible local tool at the plugin's forwarding port using the documented base URL and key to get free-tier model access without changing your upstream client.
