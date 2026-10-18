# Tastemakers Weekly — 2026-W42

_2026-10-12 – 2026-10-18 · generated 2026-10-18T16:35:35.238Z_

Three reads of the same week, in order: **strategy**, then **the stack**, then **the counts**.

## For executives

The dominant story of the week is the accelerating specialization of AI coding agents: developers are no longer just using agents to write code, they are equipping them with purpose-built "skills" and server bridges that let agents interact with external tools, render video, clone voices, and even reverse-engineer compiled software. The project drawing the most sustained attention — morluto/rea, an MCP server that connects agents to professional reverse-engineering tools like Ghidra and IDA — signals that AI agents are being adopted inside security, compliance, and legacy-system teams, not just greenfield development. A parallel trend is the rise of lightweight skill files (small instruction sets dropped into an agent's context) as an alternative to heavyweight orchestration frameworks, lowering the bar to standardize how AI agents behave across a whole engineering org. Teams that have not yet defined a policy for agent skills — what agents are permitted to do, and how — should treat that as a near-term governance gap. The watch item for Q4: whether MCP (the standardized protocol connecting agents to external tools) consolidates further as a de facto integration layer, or fragments as competing agent platforms assert proprietary alternatives.

## For AI generalists

The builder stack moved in two directions simultaneously this week: deeper tool integration and leaner control primitives. On the integration side, morluto/rea emerged as the most-watched project — it is an MCP server that hands AI coding agents like Claude Code and Cursor a direct interface into professional reverse-engineering tools (Ghidra, Hopper, IDA), enabling agents to reason about compiled binaries, Electron apps, and .NET assemblies without source code. Alongside it, lexmount/moli offers a Rust-built headless browser designed from the ground up for agent use, exposing the control surfaces (CDP, WebDriver BiDi) that agent frameworks already speak. On the infrastructure side, Ebony-Vinyl/dsh-our-free-model gained traction fast by solving a practical friction point: routing agent requests to capable frontier models through public gateways with no signup or API key required.

The leaner-control thread is equally notable. mattpocock/skills and cathrynlavery/diagram-design both exemplify the "skill file" pattern — small, composable instruction sets that nudge agents toward specific workflows (ticket triage, spec generation, diagram rendering) without requiring a new framework or runtime. DietrichGebert/ponytail takes this further by steering agents toward YAGNI-style discipline, actively reducing generated code volume and token use. Taken together, these projects suggest the community is converging on a model where agents are general-purpose runtimes and behavior is shaped by layered, swappable skills rather than monolithic prompts or hardcoded pipelines.

## The numbers

The ranking mode this week is `delta_7d` — seven-day star momentum — which means projects that appeared every day of the window (like morluto/rea and DietrichGebert/ponytail) accumulate totals that reflect sustained viral spread rather than a single spike, so treat their figures as a ceiling for week-long compounding rather than a literal one-day event. The cross-edition overlap list (ten repos appearing in both the OSS and skills editions) is unusually long, suggesting a cohort of projects that are genuinely dual-natured — infrastructure tools that also ship usable agent skills — rather than miscategorized entries. Star totals for morluto/rea are notably large relative to the rest of the field; treat that outlier as a signal of category interest (agent-assisted reverse engineering) more than a precise popularity benchmark.

- **AI Tastemakers:** 44 unique repos · +369,266 stars gained (max 7d delta per repo) · top topics: llm, ai-agents, claude-code, mcp, developer-tools
- **Skill Tastemakers:** 40 unique repos · +409,312 stars gained (max 7d delta per repo) · top topics: claude-code, agent-skills, codex, ai-agents, mcp
- **Both lists:** 10 repo(s) appeared in OSS and Skills (Imbad0202/academic-research-skills, Ryze-AI-Adgent/open-seo-mcp-skills, affaan-m/ECC, anthropics/claude-plugins-official, career-ops-hq/career-ops, mksglu/context-mode, morluto/rea, ruvnet/ruflo, thedotmack/claude-mem, yetone/magpie)
- **How we ranked this week:** delta_7d
- **Held the OSS list:** DietrichGebert/ponytail (7d), morluto/rea (7d), Ebony-Vinyl/dsh-our-free-model (4d), heygen-com/hyperframes (4d), lexmount/moli (4d), affaan-m/ECC (3d), yetone/magpie (3d), DuarteSantos8/openGym (2d)
- **Held the Skills list:** cathrynlavery/diagram-design (7d), mattpocock/skills (7d), morluto/rea (7d), debpalash/VoiceStudio (6d), eternity4719/HowToLiveBetter (6d), wheresryan22/anatomy (3d)

Today's ranked lists: [AI Tastemakers](../briefings/2026-10-18.html) · [Skill Tastemakers](../skills/briefings/2026-10-18.html)
