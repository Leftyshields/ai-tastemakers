# Skill Tastemakers — Daily Brief — 2026-07-13

_Ranking: delta_7d · 10 repos · generated 2026-07-13T15:53:05.609Z_


## 1. calesthio/OpenMontage

https://github.com/calesthio/OpenMontage · ★ 37900 (+4434 this week) · agent, agentic-ai, ai, claude, copilot, cursor, elevenlabs, ffmpeg, flux, image-generation, open-source, openai, python, remotion, stable-diffusion, text-to-speech, text-to-video, video-generation, video-production

**What it does:** OpenMontage is an open-source agentic video production system that gives your AI coding assistant 12 pipelines, 52 tools, and 500+ skills to handle research, scripting, asset generation, editing, and final rendering — producing real motion-clip timelines, not just animated stills.

**Why now:** It hit #1 on GitHub Trending this week with nearly 4,500 new stars, signaling a wave of builders looking for a programmable, open alternative to closed AI video tools.

**Build with it:** Wire it into a Claude or GPT-4 agent to auto-produce explainer videos, stock-footage documentaries, or text-to-video pipelines driven by nothing more than a plain-language prompt.

## 2. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 77818 (+8490 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** Agent Skills is a collection of 24 production-grade workflow instructions for AI coding agents, packaged as slash commands (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`) that enforce senior-engineer practices like test-driven development, atomic commits, and five-axis code review across tools like Claude Code, Cursor, and Codex.

**Why now:** The repo gained 8,490 stars this week, signaling a wave of developers moving past basic AI autocomplete toward structured, repeatable agent workflows that mirror real engineering processes.

**Build with it:** Install the full skill set in one command (`npx skills add addyosmani/agent-skills`) and immediately give your agent a consistent development lifecycle — letting it autonomously plan, implement, test, and commit features end-to-end while still pausing for human approval on risky steps.

## 3. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 57117 (+7584 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** A public GitHub repository that extracts and publishes the hidden system prompts governing AI assistants from Anthropic, OpenAI, Google, xAI, and others, including full tool definitions and skill listings.

**Why now:** The repo gained 7,584 stars this week alongside fresh additions of GPT-5.6 and Claude Sonnet 5 prompts, making it the most current public reference for how leading production AI systems are actually instructed.

**Build with it:** Use the leaked prompts as a reverse-engineering baseline to identify constraint patterns, safety framing, and tool-calling conventions, then design your own system prompts that deliberately diverge from or deliberately mimic those conventions for your product's specific tone and capability boundaries.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 82016 (+7583 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces YAGNI discipline—prompting the agent to reach for the simplest possible solution, like a native `<input type="date">` instead of a full datepicker library, averaging 54% fewer lines of code written.

**Why now:** It hit 82k GitHub stars with 7,583 added this week, suggesting a wave of developers are actively burning money on over-engineered AI-generated code and looking for a practical brake pedal.

**Build with it:** Drop the ponytail skill into your Claude Code or Cursor workflow before tackling any greenfield feature and measure how much your token spend drops; or fork the benchmark suite to test it against your own codebase and ticket backlog to make the ROI case to your team.

## 5. iOfficeAI/OfficeCLI

https://github.com/iOfficeAI/OfficeCLI · ★ 15956 (+7575 this week) · agent, ai, claude-code, cli, codex, docx, excel, office, openclaw, pptx, presentation, skills, word, xlsx

**What it does:** OfficeCLI is a single open-source binary that lets AI agents read, write, and render Word, Excel, and PowerPoint files without any Office installation, exposing a CLI interface with a built-in HTML/PNG rendering engine so agents can visually verify what they produce.

**Why now:** It gained 7,575 GitHub stars this week, signaling rapid adoption at the moment agent-driven document workflows are becoming a real production use case rather than a demo.

**Build with it:** Drop the skill file into Claude Code or Cursor and build an agent that auto-generates client reports, financial models, or slide decks from live data — then renders them to PNG for a visual review step before delivery.

## 6. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 84120 (+6157 this week) · antigravity, claude-code, codex, gemini, graphrag, knowledge-graph, leiden, openclaw, rag, skills, tree-sitter

**What it does:** Graphify turns any codebase, schema, documentation, or mixed media folder into a queryable knowledge graph by parsing code deterministically with tree-sitter AST and using LLMs only for semantic passes on unstructured content like PDFs and images. Every graph edge is labeled as either directly extracted or inferred, so you can trust what the graph is telling you.

**Why now:** The project gained over 6,000 stars this week and just launched as a YC S26 company, signaling strong builder momentum and likely active development velocity right now. It ships as a `/graphify` slash command for Claude Code, Codex, Cursor, and Gemini CLI, landing exactly as those AI coding assistants are becoming primary development environments.

**Build with it:** Drop it into a large monorepo where code, SQL schemas, and infrastructure live together, then query cross-cutting relationships that grep and embeddings-only RAG miss entirely. You could build a refactor safety tool that surfaces every downstream consumer of a database column before a migration runs.

## 7. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 62843 (+5779 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a set of portable agent skills (markdown instruction files) that you drop into Codex, Cursor, or Claude Code to steer AI-generated frontends away from generic layouts toward stronger typography, spacing, motion, and visual hierarchy. It also ships image-generation skills for producing reference boards you can hand directly to the coding agent.

**Why now:** It jumped 5,779 stars this week, landing during a moment when vibe-coding workflows are mainstream but the output quality gap is a real friction point—developers are actively hunting for ways to make AI-built UIs look intentional rather than boilerplate.

**Build with it:** Drop the `design-taste-frontend` skill into your Claude Code or Codex project, generate a reference board with ChatGPT Images using the included image skills, then build a polished SaaS landing page or dashboard that would otherwise take multiple design-review cycles to stop looking like a template.

## 8. stablyai/orca

https://github.com/stablyai/orca · ★ 17956 (+5709 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is an open-source ADE (Agent Development Environment) that lets you run Codex, Claude Code, OpenCode, or Pi as parallel agents, each isolated in its own git worktree, managed from a single desktop or mobile interface.

**Why now:** It gained 5,709 stars this week, signaling a sharp spike in developer interest around orchestrating multiple coding agents simultaneously rather than running them one at a time.

**Build with it:** Fan a single prompt across five parallel agents, let them each attempt a solution in isolated worktrees, then compare diffs and merge the best result — dramatically compressing iteration time on hard engineering problems.

## 9. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 51896 (+2831 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

**What it does:** /last30days is a Python-based AI agent skill that searches Reddit, X, YouTube, TikTok, HN, Polymarket, and the web in parallel, then scores results by real engagement metrics (upvotes, likes, prediction market odds) to synthesize a grounded summary of any topic from the past 30 days.

**Why now:** It hit #1 on GitHub Trending this week with 2,831 stars, surfacing at a moment when every major AI (ChatGPT, Gemini, Claude) has partial platform access but none can cross all the walled gardens simultaneously — this skill bridges them through bring-your-own-keys auth.

**Build with it:** Drop it into Claude Code or any of 50+ agent hosts to power tools like pre-meeting intelligence briefs, real-time competitor monitoring, or trend-validated market research that pulls signal from where people actually talk, not where editors publish.

## 10. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 16653 (+5064 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, gemini-cli, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted TypeScript gateway that exposes a single OpenAI-compatible endpoint routing requests across 250+ AI providers (90+ free tiers), with RTK+Caveman token compression cutting costs by up to 95% and auto-fallback so your tools never stall on rate limits.

**Why now:** The repo gained 5,064 stars this week, signaling rapid community validation, and the timing aligns with developers hitting free-tier limits on Claude Code, Codex, and Gemini CLI as those tools see mainstream adoption.

**Build with it:** Wire Cursor, Cline, or Claude Code to OmniRoute locally in minutes and let it silently rotate through free Gemini, GPT, and Claude capacity—then layer in the compression middleware to stretch a hobby project's token budget across a full month without touching a credit card.
