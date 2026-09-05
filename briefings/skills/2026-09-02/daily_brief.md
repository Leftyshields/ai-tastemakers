# Skill Tastemakers — Daily Brief — 2026-09-02

_Ranking: delta_7d · 10 repos · generated 2026-09-02T17:11:18.470Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 121056 (+9076 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an AI agent skill that injects a "laziest senior dev" heuristic into agents like Claude Code, pushing them to prefer native browser primitives and minimal diffs over generated boilerplate.

**Why now:** It hit Hacker News this week (98 points, 17 comments) off the back of a published agentic benchmark showing a ~54% mean reduction in lines of code across 12 real feature tasks on a FastAPI + React repo.

**Build with it:** Drop the ponytail skill into your Claude Code setup and run it against a feature ticket that typically over-builds (a form field, a modal, a date input) to see the diff shrink.

## 2. K-Dense-AI/scientific-agent-skills

https://github.com/K-Dense-AI/scientific-agent-skills · ★ 42038 (+7478 this week) · agent-skills, ai-scientist, bioinformatics, chemoinformatics, claude, claude-skills, claudecode, clinical-research, computational-biology, data-analysis, drug-discovery, genomics, materials-science, metabolomics, proteomics, scientific-computing, scientific-visualization

**What it does:** Scientific Agent Skills is a library of 163 validated, ready-to-use research skills covering genomics, drug discovery, proteomics, and more, compatible with any AI agent supporting the open Agent Skills standard (Cursor, Claude Code, Codex, Antigravity).

**Why now:** The project gained 7,478 stars this week and published an accompanying arXiv paper (*arXiv:2609.00065*) formalizing the skills as a reusable library of procedural knowledge for research agents.

**Build with it:** Drop the skills into K-Dense BYOK — the free, open-source desktop co-scientist included in the repo — point it at your own API keys, and run queries against 100+ scientific databases without any additional infrastructure setup.

## 3. freestylefly/awesome-gpt-image-2

https://github.com/freestylefly/awesome-gpt-image-2 · ★ 27315 (+6618 this week) · agents, ai-image-generation, chatgpt, dsh-plugin, gpt-image-2, image-prompts, prompt-as-code, prompt-engineering, skills, workflow-automation

**What it does:** A prompt engineering library for GPT-Image-2 with 500+ reverse-engineered cases, 20+ industrial templates, and a browsable gallery at gpt-image2.canghe.ai where you can copy full prompts and filter by style or scenario.

**Why now:** The repo gained 6,618 stars this week, signaling a surge of builder interest coinciding with active GPT-Image-2 adoption across the community.

**Build with it:** Drop a template prompt from the library into APIMart's async API (`$0.006/image`) to batch-generate styled outputs without touching model-switching code.

## 4. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 113891 (+3022 this week) · ai-agents, antigravity, ast, claude-code, code-analysis, code-search, codex, cursor, developer-tools, gemini, graphrag, knowledge-graph, leiden, llm, mcp, openclaw, rag, skills, tree-sitter

**What it does:** Graphify maps any codebase—plus its docs, PDFs, SQL schemas, and configs—into a queryable knowledge graph via a `/graphify` slash command in Claude Code, Cursor, Codex, or Gemini CLI, using local deterministic AST parsing with no vector store.

**Why now:** Graphify just opened early access ahead of its public v1 launch, with YC S26 backing and 113K+ stars signaling sharp developer attention this week.

**Build with it:** Drop `/graphify` into an existing Claude Code session to index your repo and replace ad-hoc grep workflows with structured graph queries against your own codebase.

## 5. stablyai/orca

https://github.com/stablyai/orca · ★ 59850 (+5802 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile orchestrator that runs Codex, Claude Code, OpenCode, or Pi as parallel agents — each in an isolated git worktree — with a companion app to monitor and redirect them from your phone.

**Why now:** The repo crossed 59,000 GitHub stars this week (+5,800 in seven days), signaling a rapid community spike likely tied to growing adoption of parallel agentic coding workflows as Codex and Claude Code mature.

**Build with it:** Fan a single feature prompt across three isolated git worktrees using Orca's parallel worktree UI, then diff the outputs and merge the winning branch.

## 6. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 55600 (+4905 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that lets an AI coding assistant (Claude, Cursor, Copilot) handle research, scripting, asset generation, and final composition across 12 production pipelines using 100+ tools.

**Why now:** The repo hit #1 on GitHub Trending this week, surfacing it to a large wave of builders actively looking for entry points.

**Build with it:** Drop a YouTube URL into the "Paste A Video" workflow and let the agent reverse-engineer its structure into a reusable pipeline script you can modify for your own content.

## 7. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 60243 (+4426 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a free MIT-licensed AI gateway that routes requests across 352 providers and 1,200+ models through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression that cuts usage 15–95%.

**Why now:** The repo crossed 60,000 stars this week (+4,426 in seven days), signaling a sharp spike in developer adoption that makes free-tier capacity and routing behavior worth validating before pool limits tighten.

**Build with it:** Point your existing Claude Code or Cursor config at OmniRoute's endpoint and let the auto-fallback cycle through free-tier providers — the `/dashboard/free-tiers` page shows live used/remaining against the ~1.51B monthly token budget so you can see exactly when compression saves a quota hit.

## 8. blader/humanizer

https://github.com/blader/humanizer · ★ 40106 (+2095 this week) · agent-skills, ai-writing, claude-code, codex, cursor, prompt-engineering, writing-tools

**What it does:** Humanizer is an agent skill that rewrites AI-generated text using 35 named patterns from Wikipedia's AI writing cleanup guide, preserving all factual claims while stripping hallmarks like inflated language, forced triads, and passive voice.

**Why now:** The repo gained 2,095 stars this week, signaling a sharp spike in builder interest likely tied to growing demand for post-processing steps in LLM pipelines.

**Build with it:** Drop `/humanizer` as a post-generation step in your Claude Code or Cursor workflow to clean AI-drafted docs before they ship, using voice-matching by pasting two to three paragraphs of your own prose alongside the target text.

## 9. MadsLorentzen/ai-job-search

https://github.com/MadsLorentzen/ai-job-search · ★ 40195 (+4126 this week) · ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume

**What it does:** A Claude Code workflow that scrapes job portals, scores posting fit against your profile, and runs a drafter-reviewer pipeline to produce tailored LaTeX CVs and cover letters locally.

**Why now:** The repo gained 4,126 stars this week, driven by the author's documented proof-of-concept: 69 tailored applications, 20 first interviews, and a signed AI engineering role using this exact workflow.

**Build with it:** Fork the repo, drop your profile into the provided profile files, and run `/apply <url>` against any job posting to exercise the full fit-score-to-cover-letter pipeline immediately.

## 10. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 91663 (+1745 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** Agent Skills packages 25 slash-command workflows (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`, and more) that enforce senior-engineer practices — TDD, atomic commits, quality gates — inside AI coding agents like Claude Code, Cursor, and Codex.

**Why now:** The repo gained 1,745 stars this week, signaling a spike in developer interest aligned with the current wave of autonomous coding agents being adopted in production workflows.

**Build with it:** Run `npx skills add addyosmani/agent-skills --skill test-driven-development` to drop the red-green-refactor enforcement skill directly into your existing agent setup and immediately gate code generation behind failing tests.
