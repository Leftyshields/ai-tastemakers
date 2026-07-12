# Skill Tastemakers — Daily Brief — 2026-07-12

_Ranking: delta_7d · 10 repos · generated 2026-07-12T14:38:45.807Z_


## 1. NousResearch/hermes-agent

https://github.com/NousResearch/hermes-agent · ★ 213552 (+4523 this week) · ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

**What it does:** Hermes Agent is an open-source, self-improving AI agent from Nous Research that maintains a persistent learning loop — creating and refining skills from experience, modeling the user across sessions, and running tools across local, Docker, SSH, and serverless backends with any LLM provider via a single config swap.

**Why now:** The repo crossed 213K stars with 4,500 added this week, signaling a sharp spike in community attention that makes it a strong foundation for shipping agent-based products before the pattern saturates.

**Build with it:** Wire it to a $5 VPS via Telegram, point it at your own Nous Portal or OpenRouter endpoint, and use its batch trajectory generation pipeline to collect fine-tuning data for a domain-specific tool-calling model trained on real task completions.

## 2. addyosmani/agent-skills

https://github.com/addyosmani/agent-skills · ★ 77507 (+8629 this week) · agent-skills, antigravity, claude-code, codex, cursor, skills

**What it does:** Agent Skills packages production engineering workflows—spec, plan, build, test, review, ship—as slash commands that AI coding agents (Claude Code, Cursor, Codex, etc.) follow consistently across every development phase.

**Why now:** The project gained 8,629 GitHub stars this week, signaling a surge of developer interest in standardizing how AI agents handle real codebases beyond one-off prompts.

**Build with it:** Run `npx skills add addyosmani/agent-skills` to drop 24 opinionated skills into your agent, then use `/build auto` to let it generate a plan and implement every task autonomously—pausing only on failures—while keeping each commit test-driven and atomic.

## 3. asgeirtj/system_prompts_leaks

https://github.com/asgeirtj/system_prompts_leaks · ★ 56516 (+8002 this week) · ai, ai-agents, anthropic, awesome, chatbot, chatgpt, claude, claude-code, codex, deep-learning, education, gemini, generative-ai, google, llm, machine-learning, nlp, open-source, openai, prompt-engineering

**What it does:** A public GitHub repository that extracts and documents the hidden system prompts governing AI assistants from Anthropic, OpenAI, Google, xAI, and others—including full tool definitions, skill lists, and model-specific configurations.

**Why now:** The repo gained 8,000 stars this week, likely driven by fresh additions of GPT-5.6 and Claude Sonnet 5 prompts alongside a Washington Post feature, making it the most current public reference for how frontier models are actually instructed.

**Build with it:** Use the extracted prompts as reverse-engineered blueprints to understand constraint boundaries, tool-calling patterns, and persona construction—then apply those structures to craft tighter system prompts for your own agents or to stress-test where competitor products will refuse or comply.

## 4. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 81103 (+7510 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is a JavaScript plugin for AI coding agents (Claude Code, Cursor, etc.) that enforces YAGNI-style minimalism—prompting the agent to reach for the simplest possible solution before writing new code, averaging 54% fewer lines of code produced across real agentic sessions.

**Why now:** It hit 81K GitHub stars with 7,510 added this week, signaling a sharp community reaction against AI agents that over-engineer solutions and bloat codebases with unnecessary dependencies.

**Build with it:** Drop the skill into your Claude Code or Cursor workflow to audit how much code your agent is actually generating versus what the task requires, or fork it to craft domain-specific minimalism rules for your own stack.

## 5. iOfficeAI/OfficeCLI

https://github.com/iOfficeAI/OfficeCLI · ★ 15317 (+6954 this week) · agent, ai, claude-code, cli, codex, docx, excel, office, openclaw, pptx, presentation, skills, word, xlsx

**What it does:** OfficeCLI is a single binary CLI tool that lets AI agents read, write, and render Word, Excel, and PowerPoint files without any Office installation, exposing a structured command interface plus an HTML/PNG rendering engine so agents can visually verify what they produce.

**Why now:** It gained nearly 7,000 stars this week, signaling rapid adoption at the exact moment coding agents like Claude Code and Cursor are being used to automate real knowledge-work tasks that inevitably involve Office formats.

**Build with it:** Drop it into an agentic workflow to give your AI pipeline end-to-end document automation — generate a financial model in Excel, populate a Word report from its output, and render both to PNG for a visual diff check, all from a single agent loop with no human in the middle.

## 6. xbtlin/ai-berkshire

https://github.com/xbtlin/ai-berkshire · ★ 12856 (+3313 this week) · ai, ai-agent, anthropic, berkshire-hathaway, charlie-munger, china-stock, claude, claude-code, financial-analysis, fintech, fundamental-analysis, investment, investment-research, llm, mcp, portfolio-management, stock-analysis, stock-market, value-investing, warren-buffett

**What it does:** AI Berkshire is a Python framework that runs four parallel AI agents—each embodying a different value investor's methodology (Buffett, Munger, Duan Yongping, Li Lu)—to produce structured stock research with forced buy/pass verdicts, price targets, and built-in anti-bias checks like mandatory reverse stress tests and red-line rejection criteria.

**Why now:** The repo spiked 3,313 stars this week, coinciding with Claude Code and Codex gaining traction as agentic coding environments, making this one of the first public frameworks to show multi-agent financial research running natively inside those tools.

**Build with it:** Fork the skill templates to create your own adversarial analyst personas for a specific sector (e.g., biotech or semiconductors), wire in real-time earnings data via MCP, and use the built-in Python `decimal`-based financial verification tools to cross-check AI-generated valuations against live market data before any capital is deployed.

## 7. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 62363 (+6206 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a set of portable agent skills (Markdown instruction files) you drop into Codex, Cursor, or Claude Code to enforce strong layout, typography, motion, and spacing rules so AI-generated frontends stop looking like generic boilerplate.

**Why now:** It gained 6,200+ stars this week as developers are actively shipping AI-coded UIs and hitting a quality ceiling—tools like Claude Code and Codex are everywhere, but the output still looks mediocre without opinionated design constraints baked in.

**Build with it:** Run `npx skills add https://github.com/Leonxlnx/taste-skill` to install the skills, then use the image-generation skills to produce reference boards in ChatGPT Images and hand those frames directly to your AI coding agent as a visual spec for implementation.

## 8. Egonex-AI/Understand-Anything

https://github.com/Egonex-AI/Understand-Anything · ★ 73527 (+2747 this week) · antigravity-skills, business-knowledge, claude-code, claude-skills, codebase-analysis, codex, codex-skills, developer-tools-ai-agent, gemini-cli-skills, karpathy-llm-wiki, knowledge-base, knowledge-graph, memory, opencode-skills, pi-agent, understandcode, vibe-coding

**What it does:** Understand Anything analyzes any codebase using a multi-agent pipeline and renders it as an interactive knowledge graph where you can explore files, functions, classes, and dependencies visually, then ask questions about the structure in plain language.

**Why now:** The project gained 2,747 stars this week, signaling a surge in developer interest likely tied to the proliferation of AI coding agents like Claude Code, Codex, and Gemini CLI that leave developers navigating unfamiliar, AI-generated codebases at scale.

**Build with it:** Drop it into a large inherited or AI-generated codebase as a Claude Code plugin to instantly map architecture before touching a single file, or use the knowledge graph output as structured context to feed more precise prompts into your coding agent.

## 9. Graphify-Labs/graphify

https://github.com/Graphify-Labs/graphify · ★ 82815 (+5359 this week) · antigravity, claude-code, codex, gemini, graphrag, knowledge-graph, leiden, openclaw, rag, skills, tree-sitter

**What it does:** Graphify turns any codebase, schema, docs, or media into a queryable knowledge graph via a `/graphify` slash command inside AI coding assistants like Claude Code, Cursor, and Gemini CLI, parsing code locally with tree-sitter AST at no cost. Each graph edge is labeled `EXTRACTED` or `INFERRED` so you know exactly what was read from source versus resolved by the tool.

**Why now:** The project gained over 5,000 stars this week and carries a YC S26 badge, signaling a sharp rise in developer interest at the moment AI coding assistants are becoming standard workflow tools. GraphRAG over real codebases is an unsolved pain point, and this appears to be a credible early answer.

**Build with it:** A builder could wire Graphify into a CI pipeline to auto-generate and diff knowledge graphs on each PR, giving reviewers a structural map of what changed across app code, database schema, and infrastructure simultaneously. Alternatively, you could expose the graph via an API to power a natural-language code search tool for large monorepos where grep and embeddings alone fall short.

## 10. JCodesMore/ai-website-cloner-template

https://github.com/JCodesMore/ai-website-cloner-template · ★ 27890 (+2446 this week) · ai, ai-agents, ai-tools, automation, boilerplate, claude, claude-code, clone, developer-tools, nextjs, react, reverse-engineering, shadcn-ui, skills, tailwindcss, template, typescript, web-scraping, website-clone

**What it does:** AI Website Cloner Template is a Next.js boilerplate that lets you point any AI coding agent at a target URL and automatically reverse-engineer it into a clean TypeScript/Tailwind codebase, extracting design tokens, assets, and components section by section.

**Why now:** The repo jumped nearly 2,500 stars this week, signaling strong momentum, and its explicit support for Claude's newly released Opus 4.8 model makes it a timely testbed for the latest frontier coding agent.

**Build with it:** Use it to rapidly prototype competitor-inspired UI, migrate legacy marketing sites into maintainable Next.js codebases, or build a paid service that delivers pixel-close website clones to clients on demand.
