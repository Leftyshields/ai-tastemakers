# Skill Tastemakers — Daily Brief — 2026-10-11

_Ranking: delta_7d · 10 repos · generated 2026-10-11T18:05:56.425Z_


## 1. morluto/rea

https://github.com/morluto/rea · ★ 96046 (+90730 this week) · agent-skills, ai-agents, binary-analysis, claude-code, cli, codex, cordis, ctf, decompiler, developer-tools, disassembler, dsh, dsh-plugin, ghidra, hopper, llm, mcp, model-context-protocol, reverse-engineering, static-analysis

**What it does:** REA is a TypeScript MCP server (a protocol layer that connects AI agents to external tools) that bridges agents like Claude to reverse-engineering tools—Hopper, Ghidra, IDA, and static JS analysis—so they can inspect native binaries, Electron apps, and .NET assemblies without source code.

**Why now:** The repo hit #1 trending on GitHub this week, pulling 90,000+ stars in seven days and drawing multiple Hacker News submissions.

**Build with it:** Run `npx rea-agents setup`, point it at an Electron app you want to replicate a feature from, and let your agent walk the decompiled output to spec out an implementation.

## 2. Orchestra-Research/AI-Research-SKILLs <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Orchestra-Research/AI-Research-SKILLs · ★ 13443 (+2694 this week) · ai, ai-research, claude, claude-code, claude-skills, codex, gemini, gpt-5, grpo, huggingface, machine-leanring, megatron, skills, vllm

**What it does:** Orchestra-Research/AI-Research-SKILLs is an npm-packaged library of 98 categorized skills (covering training, evaluation, RAG, inference, paper writing, and more) that you feed to an AI coding agent — Claude Code, Codex, or Gemini — so it can autonomously run the full AI research lifecycle.

**Why now:** The repo gained 2,694 stars in a single week, coinciding with active community growth on its Slack and explicit support for GPT-5, Claude, and Gemini in its topic tags — signaling a surge of builders wiring it to newly released frontier models.

**Build with it:** Install `@orchestra-research/ai-research-skills` via npm, attach the autoresearch skill to a Claude Code agent, and let the two-loop orchestrator route to domain skills like TRL or vLLM to run an end-to-end experiment autonomously.

## 3. ConardLi/garden-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/ConardLi/garden-skills · ★ 12823 (+2611 this week) · agent, claude, gpt-image-2, rag, skills, web-design

**What it does:** Garden Skills is a set of plug-and-play SKILL.md agent skills—covering web video presentations, design engineering, GPT Image 2 generation, article rendering, motion showreels, and local knowledge retrieval—installable into Claude Code, Cursor, Codex, and similar AI coding agents.

**Why now:** The repo gained 2,611 stars this week as Claude Code's skill marketplace matures into a real distribution surface for reusable agent behaviors.

**Build with it:** Run `npx skills` in your project to pull the `web-design-engineer` or `kb-retriever` skill into your Claude Code workspace and invoke it from existing agent prompts.

## 4. eternity4719/HowToLiveBetter

https://github.com/eternity4719/HowToLiveBetter · ★ 59801 (+16445 this week) · —

**What it does:** A Chinese-language evidence-based guide with 677 prioritized recommendations across health, law, finance, and social policy, each citing peer-reviewed journals or official documents with graded evidence levels (A/B/C).

**Why now:** The repo gained 16,445 stars this week—a viral spike that has already produced reader-built apps, browser extensions, and datasets listed in the project's own derivative-projects file.

**Build with it:** Install the included Claude Code / Codex skill (`skills/life-decision-guide/`) to wire the 677-item corpus into an AI assistant that cites specific section and item numbers when answering life-decision queries.

## 5. mattpocock/skills

https://github.com/mattpocock/skills · ★ 285901 (+9976 this week) · —

**What it does:** `mattpocock/skills` is a collection of small, composable agent skill files for Claude Code, Codex, Copilot, and others that enforce structured workflows (issue triage, spec creation, docs generation) without handing over process control to an opinionated framework.

**Why now:** The repo crossed 285k stars with nearly 10k added this week, signaling a sharp spike in developer interest likely tied to growing fatigue with heavier agent orchestration tools like BMAD and GSD.

**Build with it:** Run `npx skills@latest add mattpocock/skills -a cursor` to drop editable skill files into an existing Cursor project, then invoke `/setup-matt-pocock-skills` to wire in your issue tracker and start using `/triage` against real tickets.

## 6. Yuan1z0825/nature-skills <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/Yuan1z0825/nature-skills · ★ 47355 (+1492 this week) · codex-skills, nature, nature-skills

**What it does:** A reusable research-skill library for AI-assisted academic work, providing 22 installable skills—paper polishing, figure generation, literature workflows—deployable via `npx skills` into Claude Code, Codex, or compatible agents.

**Why now:** The repo gained nearly 1,500 stars this week, making this a good moment to evaluate it before the skill set stabilizes.

**Build with it:** Run `npx skills` to install the Nature Polishing skill into an existing Codex or Claude Code project and drop it into a manuscript-revision step in your research pipeline.

## 7. public-apis/public-apis <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/public-apis/public-apis · ★ 487513 (+1473 this week) · api, apis, dataset, development, free, list, lists, open-source, public, public-api, public-apis, resources, software

**What it does:** A community-curated, categorized directory of free public APIs spanning geolocation, aviation, stock data, email validation, and dozens of other domains, browsable as a structured dataset.

**Why now:** The repo gained roughly 1,473 stars this week, making it a timely index to mine before you commit budget to a paid provider.

**Build with it:** Query the repo's raw JSON or Markdown table directly in a prototype to swap in a free API—say, Aviationstack for flight data—and validate the integration before signing up for anything paid.

## 8. usestrix/strix <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/usestrix/strix · ★ 67910 (+1449 this week) · agents, ai-hacking, ai-penetration-testing, ai-pentesting, ai-security, artificial-intelligence, bug-bounty, code-quality, ctf-tools, cybersecurity, cybersecurity-tools, ethical-hacking, hacking, llm-security, offensive-security, penetration-testing, pentesting-tools, red-teaming, security, security-automation

**What it does:** Strix runs autonomous AI pentesting agents that execute code dynamically, produce working proof-of-concept exploits, and generate remediation patches—covering reconnaissance through validation without manual steps.

**Why now:** The repo added native GitHub Actions integration this week, letting teams gate pull requests on live exploit validation rather than static analysis alone.

**Build with it:** Drop the `strix-agent` PyPI package into a GitHub Actions workflow to automatically block PRs when the agent surfaces a validated vulnerability.

## 9. remotion-dev/remotion <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/remotion-dev/remotion · ★ 63241 (+1410 this week) · javascript, react, video

**What it does:** Remotion lets you create videos programmatically using React, with rendering options across Node.js, AWS Lambda, Vercel, and the browser.

**Why now:** The repo gained 1,410 stars this week alongside new Agent Skills docs and prompt templates explicitly targeting coding-agent workflows, repositioning it for agentic video generation.

**Build with it:** Scaffold a data-driven video with `npx create-video@latest`, then wire it to a Lambda renderer to batch-produce personalized clips from a JSON dataset.

## 10. harry0703/MoneyPrinterTurbo <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/harry0703/MoneyPrinterTurbo · ★ 129677 (+1265 this week) · ai-video-generator, content-creation, ffmpeg, instagram-reels, llm, python, short-video, subtitles, text-to-speech, tiktok, video-automation, video-workflow, workflow-automation, youtube-shorts

**What it does:** MoneyPrinterTurbo takes a topic or keyword and runs an automated pipeline—script generation, stock footage matching, subtitle creation, TTS, and FFmpeg compositing—to produce a finished short video via Web UI or REST API.

**Why now:** The repo gained 1,265 stars this week and added Kimi K3—Moonshot AI's newly released 3-trillion-parameter open model—as a supported LLM for script and keyword generation.

**Build with it:** Set `llm_provider` and the corresponding API key in `config.toml`, then POST a topic to `/api/v1/video` to get a rendered short without touching the UI.
