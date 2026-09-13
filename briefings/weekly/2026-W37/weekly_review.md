# Tastemakers Weekly — 2026-W37

_2026-09-07 – 2026-09-13 · generated 2026-09-13T17:01:39.116Z_

Three reads of the same week, in order: **strategy**, then **the stack**, then **the counts**.

## For executives

The dominant theme of 2026-W37 is discipline: the open-source community's most-starred work this week is not about making AI agents more powerful, but about making them more restrained and predictable. Ponytail, a JavaScript plugin that appeared every day of the week, steers coding agents toward the simplest possible solution rather than layering in dependencies — a direct response to the sprawl that unconstrained agents produce. ECC, similarly persistent, adds memory, security guardrails, and research-first instincts on top of agents like Claude Code and Cursor. Microsoft's MarkItDown — a document-to-Markdown converter optimized for LLM ingestion — signals how seriously enterprises are treating the "data preparation" layer as infrastructure, not an afterthought. The watch-item for the quarter: the gap between raw agent capability and production-readiness is closing fastest through behavioral constraint tooling, and teams that don't standardize agent configuration and guardrails now will retrofit that work under pressure later.

## For AI generalists

The builder stack shifted noticeably toward **agent behavior shaping** this week. Two repos led both the open-source and skills charts simultaneously: **Ponytail** (a plugin that injects YAGNI-first constraints into Claude Code, Cursor, and similar tools, nudging agents to use a native `<input type="date">` instead of pulling in a date-picker library) and **ECC** (a configuration harness that gives agents persistent memory, a security layer called `ecc-agentshield`, and research-first habits). These aren't model improvements — they're opinionated wrappers that change how existing agents decide and act. Also notable: **HyperFrames** from HeyGen opened a TypeScript framework that lets agents author and render MP4 video programmatically via Puppeteer and FFmpeg, with an MCP-compatible skill interface. That's a meaningful expansion of the agent action space beyond text and code.

On the skills side, **cathrynlavery/diagram-design** was the surprise: a Claude Code skill that can produce 39 distinct diagram types — Wardley maps, Sankey charts, UML class diagrams — as self-contained HTML/SVG with zero build steps or external dependencies. **Humanizer** rounds out the picture, offering a rewriting skill that identifies 25 specific AI prose patterns (staged phrasing, hollow emphasis, dramatic fragments) and replaces them with direct language — useful for any team publishing agent-drafted content.

## The numbers

Both the open-source and skills editions tracked roughly 35 repos each, so the per-repo star averages are dominated by a handful of breakouts — Ponytail alone accounts for a substantial share of the ~115K and ~113K total stars gained in each edition, so treat aggregate totals as skewed rather than broad. The repos appearing all seven days (Ponytail, ECC, HyperFrames, MarkItDown on the OSS side; Ponytail and ECC on skills) represent genuine week-long sustained interest, not a single viral day; the high cross-edition overlap of 16 repos confirms that the same projects are resonating with both general and skills-focused audiences this week.

- **AI Tastemakers:** 35 unique repos · +115,411 stars gained (max 7d delta per repo) · top topics: claude, claude-code, ai-agents, llm, mcp
- **Skill Tastemakers:** 34 unique repos · +112,706 stars gained (max 7d delta per repo) · top topics: claude-code, codex, ai-agents, claude, llm
- **Both lists:** 16 repo(s) appeared in OSS and Skills (DietrichGebert/ponytail, Graphify-Labs/graphify, Imbad0202/academic-research-skills, JuliusBrussee/caveman, K-Dense-AI/scientific-agent-skills, Leonxlnx/taste-skill, NousResearch/hermes-agent, Panniantong/Agent-Reach, affaan-m/ECC, blader/humanizer, coreyhaines31/marketingskills, diegosouzapw/OmniRoute, headroomlabs-ai/headroom, kepano/obsidian-skills, mksglu/context-mode, nextlevelbuilder/ui-ux-pro-max-skill)
- **How we ranked this week:** delta_7d
- **Held the OSS list:** affaan-m/ECC (7d), DietrichGebert/ponytail (7d), heygen-com/hyperframes (7d), microsoft/markitdown (7d), diegosouzapw/OmniRoute (4d), NousResearch/hermes-agent (4d), blader/humanizer (3d), kepano/obsidian-skills (3d), coreyhaines31/marketingskills (2d)
- **Held the Skills list:** DietrichGebert/ponytail (7d), affaan-m/ECC (6d), blader/humanizer (6d), cathrynlavery/diagram-design (6d), diegosouzapw/OmniRoute (6d), stablyai/orca (6d), NousResearch/hermes-agent (4d), freestylefly/awesome-gpt-image-2 (2d), kepano/obsidian-skills (2d)

Today's ranked lists: [AI Tastemakers](../briefings/2026-09-13.html) · [Skill Tastemakers](../skills/briefings/2026-09-13.html)
