# Skill Tastemakers — Daily Brief — 2026-10-15

_Ranking: delta_7d · 10 repos · generated 2026-10-15T17:48:00.755Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 264970 (+251144 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, decompiler, developer-tools, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, rea, reverse-engineering, static-analysis, touhou

**What it does:** REA is a TypeScript MCP server (a protocol layer that lets AI agents call external tools) that gives agents access to reverse-engineering tools — Hopper, Ghidra, or IDA — so they can inspect native binaries, JavaScript/Electron apps, .NET assemblies, and websites without source code.

**Why now:** The project landed on Hacker News this week with 98 points and 38 comments, marking real builder interest in agent-driven reverse engineering rather than one-off scripting.

**Build with it:** Run `npx rea-agents setup` to register REA with your agent, then point it at a closed-source app to pull decompiled evidence of how a specific feature actually works.

## 2. debpalash/VoiceStudio

https://github.com/debpalash/VoiceStudio · ★ 68490 (+13883 this week) · ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, omnivoice-studio, speech-to-text, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, voicestudio, workflow

**What it does:** VoiceStudio is a local-first, open-source Electron + Python desktop app covering voice cloning, video dubbing, dictation, transcription, and audiobook generation across 646 languages, with k2-fsa/OmniVoice as the default model.

**Why now:** The repo picked up 13,883 stars this week and surfaced on Hacker News — a clear signal that developers are actively hunting self-hosted alternatives to ElevenLabs.

**Build with it:** Use the local MCP endpoint to wire voice cloning into an agent workflow — clone a voice from a short sample and have the agent synthesize spoken responses with no third-party API calls.

## 3. eternity4719/HowToLiveBetter

https://github.com/eternity4719/HowToLiveBetter · ★ 63811 (+13673 this week) · —

**What it does:** A 765-item evidence-graded guide for mainland China covering health, finance, law, and social systems — each entry cites journal papers or official documents and states explicit costs, benefits, and evidence level.

**Why now:** The repo gained 13,673 stars this week, a spike in Chinese-language developer attention that makes integrations worth building now rather than later.

**Build with it:** Install the provided Claude Code or Codex skill (under `skills/life-decision-guide/`) so any AI assistant answers life questions by citing the specific section and item number from the structured Markdown source.

## 4. mattpocock/skills

https://github.com/mattpocock/skills · ★ 292510 (+13179 this week) · —

**What it does:** A set of small, composable agent skills for Claude Code, Codex, Copilot, and others that enforce structured engineering workflows — issue triage, spec writing, and docs — while keeping the developer in control of the process rather than delegating it wholesale to the agent.

**Why now:** The repo crossed 13,000 stars this week, likely driven by growing frustration with "vibe coding" approaches like BMAD and GSD that obscure bugs in the AI-driven process itself.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to drop editable skill files into your Cursor project, then invoke `/setup-matt-pocock-skills` once to wire up your issue tracker and triage labels.

## 5. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 55792 (+10995 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** An agent skill that generates self-contained HTML + SVG diagram files across 45 diagram types, installable into Cursor, Claude Code, Codex, Copilot, and other agent hosts via `npx skills add cathrynlavery/diagram-design`.

**Why now:** The repo gained nearly 11,000 stars this week, a fast uptake across the agent-tooling community that suggests the format has hit a usable threshold.

**Build with it:** Run `npx skills add cathrynlavery/diagram-design`, then prompt your agent to onboard against your live site URL — it pulls your palette and fonts so every generated diagram matches your brand automatically.

## 6. Vincentwei1021/video-shotcraft

https://github.com/Vincentwei1021/video-shotcraft · ★ 12049 (+1394 this week) · agent-skills, ai-agents, ai-video, claude-code, claude-code-skills, claude-skills, codex, motion-design, motion-graphics, product-video, promo-video, remotion, video-generation, video-production

**What it does:** video-shotcraft is a Claude Code / Codex agent skill that screenshots your real product pages, picks from 152 shot recipe cards, and renders a finished MP4 using Remotion — no generative video model required.

**Why now:** The repo gained 1,394 stars this week alongside a shot library refresh that consolidated 216 demos into 124 polished cards with updated Gallery previews, making the starting point noticeably cleaner than it was a month ago.

**Build with it:** Point the agent at your product URL, let it run the storyboard-to-render pipeline, then open the output in Motion Workbench to swap shots using the recipe cards directly in the browser.

## 7. HKUDS/CLI-Anything <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/HKUDS/CLI-Anything · ★ 53016 (+1336 this week) · —

**What it does:** CLI-Anything auto-generates structured CLI wrappers around existing desktop and web software so AI agents can operate those tools programmatically, with a community hub (`pip install cli-anything-hub`) for browsing and installing pre-built harnesses.

**Why now:** The repo hit GitHub Trending this week with 53k stars and a fresh arXiv tech report (2606.03854), signaling active research publication momentum rather than a dormant project.

**Build with it:** Install a community CLI via `cli-hub install <name>` and wire the JSON output directly into your agent's tool-call loop to give it control over a real application without writing a custom integration.

## 8. anthropics/skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/anthropics/skills · ★ 181347 (+1310 this week) · agent-skills

**What it does:** Anthropic's skills repo is a collection of self-contained instruction folders — each a `SKILL.md` file — that Claude loads dynamically to handle specialized tasks: DOCX/PDF/PPTX generation, MCP server creation, and brand-compliant communications, among others.

**Why now:** The repo crossed 181K stars with 1,310 added this week, coinciding with Anthropic's public Agent Skills spec and the rollout of Claude's native document creation features backed by production skills.

**Build with it:** Register the repo as a Claude Code plugin source with `/plugin marketplace add anthropics/skills`, install `example-skills`, then swap in your own `SKILL.md` and test it against the published spec in `./spec`.

## 9. tigerless-labs/cost-xray <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/tigerless-labs/cost-xray · ★ 5088 (+1254 this week) · claude-code, codex-cli, cost-tracking, observability, prompt-caching, proxy, token-counting

**What it does:** cost-xray intercepts local API traffic from Claude Code and Codex via a transparent mitmproxy hop, then breaks down token usage and dollar cost by source — system prompts, tool schemas, MCP blocks, cache reads/writes, and thinking blocks — in a drillable terminal UI.

**Why now:** The repo gained 1,254 stars this week, tracking the surge in Claude Code adoption and developer frustration with opaque per-session billing as agentic workflows grow longer and more tool-heavy.

**Build with it:** Set `COST_XRAY_AGENTS=claude` and run `cx` after your next Claude Code session to see immediately which MCP server or tool schema is consuming the largest share of your context window.

## 10. career-ops-hq/career-ops

https://github.com/career-ops-hq/career-ops · ★ 74958 (+1249 this week) · agent-skills, ai-agent, ai-job-search, ats, career, career-ops, careerops, claude-code, cli, cover-letter, cv, interview-prep, job-application, job-hunting, job-search, latex, local-first, open-source, resume, terminal

**What it does:** career-ops is a local-first AI agent that scores job listings against your CV on a 1–5 scale, then generates ATS-tailored resumes, cover letters, and interview prep inside Claude Code, Codex, or OpenCode.

**Why now:** The project crossed 74,000 stars with 1,249 added this week and picked up coverage from Wired Greece, marking a concrete spike in builder attention rather than slow organic growth.

**Build with it:** Drop your CV and a job URL into the CLI prompt to immediately test the scoring and CV-tailoring pipeline against a real listing.
