# AI Tastemakers — Daily Brief — 2026-11-22

_Ranking: delta_7d · 10 repos · generated 2026-11-22T20:59:46.323Z_


## 1. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 119748 (+1873 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** A set of 26 slash commands (spec, plan, build, test, review, ship, and more) that encode senior-engineering workflows so AI coding agents like Claude Code, Cursor, and Codex follow consistent quality gates across the full development lifecycle.

**Why now:** Nearly 1,900 stars arrived this week as more teams push AI agents into real development pipelines and need opinionated guardrails rather than free-form prompting.

**Build with it:** Run `npx skills add addyosmani/agent-skills` to install all 26 skills, then use `/build auto` to let the agent generate a plan and execute each task test-driven, committed individually, with a single approval from you.

## 2. morluto/rea

https://github.com/morluto/rea · ★ 473944 (+12290 this week) · agent-skills, ai, android, claude-code, cli, cpp, dsh-plugin, html, java, javascript, linux, mcp, nodejs, python, rea, react, rust, security, touhou, typescript

**What it does:** REA is an MCP server (a protocol for wiring tools into AI agents) that gives agents the ability to inspect closed-source binaries, JavaScript and Electron apps, .NET assemblies, and websites without needing source code.

**Why now:** The repo crossed 12,000 new stars this week, reflecting a surge of builder interest in letting agents handle reverse engineering work rather than doing it by hand.

**Build with it:** Run `npx rea-agents setup` to connect REA to Claude Code or a similar agent, then ask it to explain how a closed-source feature works before you reimplement it.

## 3. bojieli/ai-agent-book

https://github.com/bojieli/ai-agent-book · ★ 59119 (+1786 this week) · agent, agent-memory, ai-agent, book, coding-agent, context-engineering, large-language-models, llm, mcp, multi-agent, multimodal, rag, reinforcement-learning

**What it does:** An open-source Chinese-language book covering AI agent design and engineering across 10 chapters and 109 hands-on experiments, organized around the formula Agent = LLM + context + tools, with 15 community translations available.

**Why now:** The repo hit GitHub Trending as Project of the Day this week alongside a 2.0/3.0 revision that reorganized multimodal agent and async interaction content into a new Chapter 6.

**Build with it:** Clone the repo and run the Chapter 6 experiments locally to validate multimodal agent tool-call patterns against your own LLM backend.

## 4. elementalsouls/Claude-BugHunter

https://github.com/elementalsouls/Claude-BugHunter · ★ 17534 (+11282 this week) · ai-security, anthropic, application-security, bug-bounty, bugbounty, bugcrowd, claude, claude-code, claude-skills, ethical-hacking, hackerone, offensive-security, pentesting, red-team, security-tools, web-security

**What it does:** A Claude Code skill bundle that loads 83 skills and 15 slash commands covering 681 disclosed HackerOne report patterns across 24 vulnerability classes, plus enterprise identity and infrastructure attack chains for authorized red-team and bug-bounty work.

**Why now:** Over 11,000 stars arrived this week as builders explore Claude Code's plugin and skills system as a platform for security tooling.

**Build with it:** Install via `/plugin marketplace add elementalsouls/Claude-BugHunter` inside Claude Code, then describe a target in plain English to auto-load the relevant hunt skill and chain template without any manual invocation.

## 5. microsoft/TokenEconomizer

https://github.com/microsoft/TokenEconomizer · ★ 7954 (+1579 this week) · agentic-ai, agentic-coding, ai-coding, ai-coding-assistant, anthropic, artificial-intelligence, claude-code, codex, coding-agent, coding-agents, cost-optimization, cost-reduction, developer-tools, github-copilot, llm, open-source, openai, productivity, token-optimization

**What it does:** TokenEconomizer wraps existing coding agents (Claude Code, Codex, GitHub Copilot CLI) as a black-box layer that learns from past sessions in a repository to cut token costs through three mechanisms: micro-skills that cache repo-specific facts, tool pruning that drops never-used tools, and failure-loop intervention that breaks repetitive error cycles.

**Why now:** The repo hit number one on Trendshift's Python daily chart with 1,579 new stars this week, timed with an arXiv paper showing 18.4 to 30.9% cost reductions across all 30 tested repository-and-agent combinations on SWE-Bench.

**Build with it:** Point TokenEconomizer at a repository you already run Claude Code or Codex against, let it accumulate a few sessions, then measure cost per task before and after micro-skills and tool pruning activate.

## 6. Tracer-Cloud/opensre <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Tracer-Cloud/opensre · ★ 14353 (+1520 this week) · alerting, ci-cd, cli, datadog, devops, gitlab-ci, grafana, incident-management, llm, observability, ollama, remediation, root-cause-analysis, site-reliability-engineering, slack

**What it does:** OpenSRE is a self-hosted CLI agent that reads a failed CI/CD run, traces the root cause, and opens a fix for review using your own LLM.

**Why now:** The repo gained 1,520 stars this week, landing on Trendshift's trending list during active public alpha development with evolving integrations.

**Build with it:** Point OpenSRE at a failing GitHub Actions or GitLab CI run and wire it to a local Ollama model to validate the root-cause-analysis loop without sending data to third-party APIs.

## 7. pingdotgg/t3code

https://github.com/pingdotgg/t3code · ★ 71401 (+10007 this week) · agent-orchestration, agents, ai, chatgpt, claude, claude-code, code, vibe-coding

**What it does:** T3 Code is an MIT-licensed control plane that runs Claude Code, Codex, Cursor, and other ACP-compatible coding agents on your local machine and exposes them through a single interface across desktop, web, iOS, and Android.

**Why now:** The repo added over 10,000 stars this week as builders look for ways to orchestrate multiple agents without juggling each one's native interface separately.

**Build with it:** Install the `t3` CLI via the one-liner, point it at an already-authenticated Claude Code or Codex install, and use the ACP provider config to route tasks between agents mid-thread without touching each agent's native interface.

## 8. erkamyaman/rust-anything <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/erkamyaman/rust-anything · ★ 7915 (+1358 this week) · agent-skills, claude-code, cli, code-migration, codex, ffi, golang, java, javascript, mcp, migration, napi, performance, porting, pyo3, python, rewrite, ruby, rust, typescript

**What it does:** rust-anything records the runtime behavior of an existing app written in TypeScript, Python, Go, Ruby, Java, or C, then guides a coding agent to rewrite it in Rust one piece at a time, verifying each piece against that recording before moving on.

**Why now:** The repo reached 7,915 total stars with 1,358 added this week and sits at number one on Trendshift's Rust daily chart, reflecting sharp builder interest in automated, verified rewrites.

**Build with it:** Point the Claude Code plugin at an existing Python or TypeScript CLI, let rust-anything record its behavior, and use the MCP server integration to port and verify one function at a time.

## 9. gamedev-skills/awesome-gamedev-agent-skills

https://github.com/gamedev-skills/awesome-gamedev-agent-skills · ★ 10325 (+1345 this week) · agent-skills, ai-agents, awesome-list, bevy, claude-code, codex, cursor, game-dev, game-development, gamedev, gemini-cli, github-copilot, godot, kiro, phaser, roblox, skills, threejs, unity, unreal

**What it does:** A collection of 79 agent skills (reusable instruction bundles that give AI coding agents engine-specific knowledge) plus a router that auto-selects the right 2 to 3 skills for your engine and task across Godot, Unity, Unreal, Roblox, three.js, Phaser, and 6 more.

**Why now:** The repo gained 1,345 stars this week and targets current 2026 releases including Godot 4.7.2, Unity 6.3 LTS, and Unreal 5.8, with 98.7% correct skill routing validated across 366 blind test prompts.

**Build with it:** Run `npx skills add gamedev-skills/awesome-gamedev-agent-skills` in your project, then describe your game task to your agent and let the router load the matching engine skill before the agent writes any code.

## 10. Ebony-Vinyl/dsh-our-free-model

https://github.com/Ebony-Vinyl/dsh-our-free-model · ★ 83919 (+8239 this week) · ai-agents, deepseek, deepseek-harness, developer-tools, dsh, dsh-plugin, free-model, llm, model-provider, openai-compatible

**What it does:** A zero-dependency dsh plugin (dsh is a developer shell environment) that forwards requests to frontier models including DeepSeek V4.1 Flash, Kimi K3, and the Kilo AI free pool through a local OpenAI-compatible port, with no login, API key, or usage cap required.

**Why now:** The repo hit number one on both the Trendshift daily chart and the JavaScript weekly chart for the week of 2026-10-05 to 2026-10-11.

**Build with it:** Point any OpenAI-compatible tool at the plugin's local base URL to route requests through the free model pool without touching an API key or quota dashboard.
