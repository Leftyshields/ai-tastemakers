# Skill Tastemakers — Daily Brief — 2026-09-12

_Ranking: delta_7d · 10 repos · generated 2026-09-12T16:19:48.423Z_


## 1. DietrichGebert/ponytail

https://github.com/DietrichGebert/ponytail · ★ 136408 (+8938 this week) · agent-skills, ai-agents, claude, claude-code, claude-code-plugin, cursor-rules, developer-tools, llm, prompt-engineering, yagni

**What it does:** Ponytail is an agent skill (npm: `@dietrichgebert/ponytail`) that injects a YAGNI-first heuristic into AI coding agents like Claude Code and Cursor, steering them to reach for native browser/platform primitives before installing dependencies or writing boilerplate.

**Why now:** It hit Hacker News this week (98 points, 17 comments) while pulling nearly 9,000 new GitHub stars in seven days, signaling active builder adoption rather than passive interest.

**Build with it:** Drop the skill into an existing Claude Code workflow via the npm package and measure token reduction on your next feature branch using the benchmarking scripts in `/benchmarks/`.

## 2. kepano/obsidian-skills

https://github.com/kepano/obsidian-skills · ★ 48217 (+8108 this week) · agents, agentskills, bases, claude, clawdbot, cli, codex, defuddle, hermes, jsoncanvas, markdown, md, obsidian, openclaw, opencode, skills

**What it does:** A collection of Agent Skills spec-compatible skill files that teach AI coding agents (Claude Code, Codex, OpenCode) to read and write Obsidian-native formats — Markdown with wikilinks, Bases, JSON Canvas, and CLI interactions.

**Why now:** The repo gained 8,000+ stars this week, signaling a sharp spike in builder interest coinciding with broader agent tooling adoption around the Agent Skills spec.

**Build with it:** Drop the repo into `~/.opencode/skills/obsidian-skills/` and OpenCode will auto-discover the `SKILL.md` files, immediately enabling your agent to generate and edit `.base` or `.canvas` files inside an existing vault without any config changes.

## 3. affaan-m/ECC

https://github.com/affaan-m/ECC · ★ 256895 (+7518 this week) · ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity

**What it does:** ECC is an agent harness optimization layer that adds skills, memory, instincts, and security to AI coding agents like Claude Code, Codex, Cursor, and Opencode via configurable profiles.

**Why now:** The repo hit GitHub's trending list this week with 7,518 new stars, signaling a surge in developer interest around hardening AI coding agent workflows.

**Build with it:** Install `ecc-universal` from npm and drop the harness config into your Claude Code setup to immediately layer persistent memory and agent security rules onto your existing workflow.

## 4. cathrynlavery/diagram-design

https://github.com/cathrynlavery/diagram-design · ★ 38748 (+7248 this week) · agent-skills, claude-code, codex, data-visualization, diagrams, drawio, mermaid, svg

**What it does:** A Claude Code skill that generates 39 editorial diagram types (architecture, flowchart, Sankey, Wardley map, UML class, and more) as self-contained HTML + SVG files with no build step, no shadows, and no generic rounded-box defaults.

**Why now:** The repo gained 7,248 stars this week and hit Trendshift trending, coinciding with the v2.5.10 release that added ten new layout grammars including dependency graphs and database schema diagrams.

**Build with it:** Drop the skill into a Claude Code project and point it at an existing draw.io or Mermaid file to redraw it at a chosen format and detail level — the fastest way to validate whether it replaces your current diagram workflow.

## 5. stablyai/orca

https://github.com/stablyai/orca · ★ 67168 (+5076 this week) · ade, agent-ide, ai-agents, claude-code, cli, codex, cursor-agent, devtools, ghostty, ide, mobile-app, opencode, orchestration, parallel-agents, pi, terminal, worktrees, yc-backed

**What it does:** Orca is a desktop/mobile IDE that runs Codex, Claude Code, OpenCode, and Pi as parallel agents, each isolated in its own git worktree, with a single dashboard to compare and merge results.

**Why now:** The repo gained 5,076 stars this week, coinciding with its topics tracking live demand around Claude Code and Codex orchestration workflows that builders are actively exploring.

**Build with it:** Fan a single feature prompt across three parallel worktrees using Orca's built-in worktree orchestration, then compare diffs and cherry-pick the winning branch directly from the UI.

## 6. blader/humanizer

https://github.com/blader/humanizer · ★ 47214 (+3960 this week) · agent-skills, ai-writing, claude-code, codex, cursor, prompt-engineering, writing-tools

**What it does:** Humanizer is an agent skill that detects 25 named AI-writing patterns and rewrites flagged text to sound human, leaving factual content, code, and data untouched.

**Why now:** The repo gained nearly 4,000 stars this week, signaling a spike in builder attention likely tied to growing platform-level scrutiny of AI-generated content in docs and posts.

**Build with it:** Drop it into Claude Code via `/plugin marketplace add blader/humanizer` and pipe your docs folder through `/humanizer docs/` to strip AI tells from release notes or technical prose before publishing.

## 7. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 86498 (+1971 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

**What it does:** Taste-Skill is a JavaScript framework that gives AI coding agents (Claude Code, Codex, etc.) opinionated frontend "skills" to steer generated UI away from generic, template-looking output.

**Why now:** The repo is pulling nearly 2,000 stars this week, signaling a surge of interest from builders frustrated with low-effort vibe-coded frontends flooding the market.

**Build with it:** Drop a taste-skill agent skill into your Claude Code workflow to constrain its component output style before it writes a single line of UI.

## 8. diegosouzapw/OmniRoute

https://github.com/diegosouzapw/OmniRoute · ★ 65160 (+3661 this week) · a2a, ai-agents, ai-gateway, anthropic, claude, claude-code, cline, codex, copilot, cursor, deepseek, free-ai, gemini, kimi, llm-gateway, mcp, openai, openai-proxy, qwen, token-saver

**What it does:** OmniRoute is a self-hosted AI gateway that exposes 352 providers and 1,200+ models through a single OpenAI-compatible endpoint, with quota-aware auto-fallback and RTK+Caveman token compression (15–95% reduction) to keep free-tier budgets (~1.47B tokens/month) from running dry.

**Why now:** The repo gained 3,661 stars this week, signaling a surge in developer interest likely tied to rising API costs as Claude Code, Codex CLI, and Cursor usage scales up.

**Build with it:** Point your Claude Code or Cursor `OPENAI_BASE_URL` at OmniRoute's local endpoint and immediately get automatic fallback across 150+ free-tier providers when any single quota exhausts.

## 9. trailhq/Graft <span class="new-repo-badge" style="display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;">New</span>

https://github.com/trailhq/Graft · ★ 7252 (+1674 this week) · ai-agents, anthropic, claude-code, cli, code-graph, codex, context-engineering, cursor, developer-tools, gemini, knowledge-graph, llm, mcp, mcp-server, open-source, openai, tree-sitter

**What it does:** Graft builds a code-knowledge graph of your codebase using Tree-sitter and serves it to coding agents (Claude Code, Cursor, Codex, Gemini) via an MCP server, reducing tool calls by 46% and tokens by 42% in benchmarks.

**Why now:** The repo gained 1,674 stars this week and ranks on Trendshift's daily TypeScript chart, surfacing alongside the current surge in Claude Code and MCP-based agent tooling.

**Build with it:** Add Graft's MCP server to your Claude Code config (`npx @nanonets/graft mcp`) and let it replace cold repo-crawling with pre-indexed graph lookups on your next feature branch.

## 10. freestylefly/awesome-gpt-image-2

https://github.com/freestylefly/awesome-gpt-image-2 · ★ 31474 (+3338 this week) · agents, ai-image-generation, chatgpt, dsh-plugin, gpt-image-2, image-prompts, prompt-as-code, prompt-engineering, skills, workflow-automation

**What it does:** A curated library of 530+ reverse-engineered GPT-Image-2 prompts organized into 20+ reusable industrial templates, with a live gallery site for browsing, copying, and testing prompts.

**Why now:** The repo added a GPT Image 2.5 spotlight this week comparing the new Sunburst and Flare model variants side-by-side using shared prompts and draggable preview tools.

**Build with it:** Pull a tagged template (e.g., product campaign or diorama) from the gallery, copy its full prompt, and drop it directly into the `gpt-image-1` Images API call as a baseline for your own image generation pipeline.
