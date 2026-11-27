# Skill Tastemakers — Daily Brief — 2026-11-27

_Ranking: delta_7d · 10 repos · generated 2026-11-27T23:23:53.453Z_


## 1. pingdotgg/t3code

https://github.com/pingdotgg/t3code · ★ 82154 (+14427 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code is an open-source control plane that runs Claude Code, Codex, and other ACP-compatible coding agents on your machine and exposes them through a single interface across desktop, web, iOS, and Android.

**Why now:** The project crossed 82,000 GitHub stars this week and is syncing to GitCafe, pointing to fast cross-community adoption.

**Build with it:** Install the `t3` CLI via the one-line curl script, sign into Claude Code or Codex, and use the phone app to approve agent commands remotely over Tailscale or T3 Connect.

## 2. OpenMontageInc/OpenMontage

https://github.com/OpenMontageInc/OpenMontage · ★ 83856 (+1923 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system where an AI coding assistant handles scripting, asset generation, clip retrieval from free stock archives, and final timeline rendering using real motion footage rather than animated stills.

**Why now:** The repo hit number one on GitHub Trending this week and pulled nearly 2,000 stars, with an active early-access discussion thread drawing in contributors and first users.

**Build with it:** Point your Cursor or Copilot agent at the included pipeline configs to produce a finished video from a plain-language prompt, pulling stock footage via the built-in corpus builder and rendering through Remotion.

## 3. elementalsouls/Claude-BugHunter

https://github.com/elementalsouls/Claude-BugHunter · ★ 26026 (+11950 this week) · ai-security, anthropic, application-security, bug-bounty, bugbounty, bugcrowd, claude, claude-code, claude-skills, ethical-hacking, hackerone, offensive-security, pentesting, red-team, security-tools, web-security

**What it does:** A Claude Code skill bundle that loads 85 skills and 16 slash commands into Claude Code, giving it structured bug-hunting workflows derived from 681 disclosed HackerOne report patterns across 24 vulnerability classes, plus enterprise identity and infrastructure attack chains.

**Why now:** The project was posted to Hacker News this week and gained roughly 12,000 stars in a single week, reflecting a surge of practitioner interest.

**Build with it:** Install via `/plugin marketplace add elementalsouls/Claude-BugHunter` inside Claude Code, then describe a target surface in plain English to trigger the relevant `hunt-*` skill and get per-class payloads, bypass tables, and chain templates automatically.

## 4. stablyai/orca

https://github.com/stablyai/orca · ★ 142421 (+11458 this week) · agent-ide, ai-agents, automation, bot, claude-code, codex, ghostty, grok-bot, hermes-agent, mobile-app, muse, openclaw, opencode, orchestration, pi, runtime, swarm, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop, mobile, and remote IDE that runs fleets of AI agents (Claude Code, Codex, Grok) across parallel workspaces, with a bot layer that accepts tasks from Slack, Linear, or GitHub and returns pull requests.

**Why now:** The repo gained over 11,000 stars this week, a sharp spike in builder attention around autonomous agent orchestration.

**Build with it:** Connect the Orca Bots integration to a GitHub repo, assign it a bug-fix task from a GitHub issue, and use the coordinator-plus-worker orchestration to get a tested PR without leaving your existing tools.

## 5. JuliusBrussee/caveman

https://github.com/JuliusBrussee/caveman · ★ 123319 (+1541 this week) · ai, anthropic, caveman, claude, claude-code, llm, meme, prompt-engineering, skill, tokens

**What it does:** Caveman is a local proxy and prompt harness for coding agents (Claude Code, Codex, and 30+ others) that compresses agent output and tool responses to cut input tokens by 33% across a session without changing the underlying model or losing any original content.

**Why now:** The project hit number one on Hacker News and GitHub Trending on the back of its Terminal-Bench 4 results showing 21% lower cost per solved task versus Codex using the same model on both sides.

**Build with it:** Drop the `@caveman-ai/cli` npm package into an existing Claude Code or Codex workflow and enable the Blocks setting to shrink verbose tool output, cutting test-run responses from 397 tokens down to 76 before the agent reads them.

## 6. github/spec-kit

https://github.com/github/spec-kit · ★ 152298 (+1481 this week) · ai, copilot, development, engineering, prd, spec, spec-driven

**What it does:** Spec Kit is an open-source toolkit that gives AI coding agents structured processes, templates, and documented outcomes for spec-driven development, bug fixing, and idea assessment.

**Why now:** The repo is gaining roughly 1,500 stars per week as teams standardize how they hand off work to coding agents like GitHub Copilot.

**Build with it:** Install the bug-fixing extension, point it at a broken behavior in your repo, and let the agent produce a scoped fix with a recorded verification step using the built-in process template.

## 7. morluto/rea

https://github.com/morluto/rea · ★ 481100 (+9691 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is a Model Context Protocol (MCP) server, meaning it gives AI agents a standardized way to call external tools, connecting them to reverse-engineering tooling so they can inspect native binaries, JavaScript and Electron apps, .NET assemblies, and websites without source code.

**Why now:** The repo gained nearly 10,000 stars this week, likely tied to growing interest in agentic code analysis workflows.

**Build with it:** Run `npx rea-agents setup` to wire REA into your existing agent (Claude Code or similar) and have it reverse-engineer a closed-source app feature you want to replicate.

## 8. mjmirza/app-store-compliance <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/mjmirza/app-store-compliance · ★ 7872 (+1414 this week) · accessibility, ai-agents, android, app-review-guidelines, app-store, app-store-connect, app-store-rejection, app-store-review, claude-code, coppa, data-safety, eu-ai-act, gdpr, google-play, google-play-policy, ios, mobile-compliance, play-console, pre-submission-checklist, privacy-manifest

**What it does:** A shell-based pre-submission guard that scans iOS and Android project folders against 125 documented rejection patterns, checks privacy manifests and Data Safety forms, and tracks 117 regulatory deadlines covering GDPR, COPPA, EU AI Act, and DSA.

**Why now:** The repo gained 1,414 stars this week, suggesting a surge of builders hitting App Store or Google Play rejections and searching for structured pre-submission tooling.

**Build with it:** Drop `app-store-compliance-guard.sh` into your Claude Code, Copilot, or Cursor workflow via the AI coding tool install path so the scan runs automatically before every submission.

## 9. ZhuLinsen/daily_stock_analysis <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ZhuLinsen/daily_stock_analysis · ★ 75008 (+1375 this week) · a-stock, ai-agent, aigc, llm, quant, quantitative-finance, quantitative-trading

**What it does:** An LLM-powered Python system that pulls multi-market stock data (A-share, HK, US, JP, KR, TW) daily, runs AI analysis to generate scored decision dashboards, and pushes results to WeChat Work, Feishu, Telegram, Discord, Slack, or email via GitHub Actions at zero infrastructure cost.

**Why now:** The repo gained 1,375 stars this week, a good time to fork before community conventions around the codebase harden.

**Build with it:** Fork the repo, drop your stock watchlist and LLM API key into the GitHub Actions secrets, and let the scheduled workflow deliver daily decision reports to a Telegram channel without running any local infrastructure.

## 10. ayghri/i-have-adhd

https://github.com/ayghri/i-have-adhd · ★ 62778 (+1281 this week) · adhd, claude-, claude-code-plugin, claude-skills, developer-tools, productivity

**What it does:** A Claude Code plugin that rewrites your coding agent's response style to lead with the action, number steps, and cut all filler, using 10 enforceable rules defined in a plain `SKILL.md` file.

**Why now:** The repo has crossed 62,000 stars with over 1,200 added this week, reflecting developer frustration with verbose LLM responses as agentic coding tools become daily drivers.

**Build with it:** Fork the repo, edit `skills/i-have-adhd/SKILL.md` to tighten or relax any of the 10 rules for your team, and reinstall your custom version via `claude plugin marketplace add <your-username>/i-have-adhd`.
