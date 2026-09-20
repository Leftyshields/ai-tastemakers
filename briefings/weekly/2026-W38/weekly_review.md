# Tastemakers Weekly — 2026-W38

_2026-09-14 – 2026-09-20 · generated 2026-09-20T16:50:10.817Z_

Three reads of the same week, in order: **strategy**, then **the stack**, then **the counts**.

## For executives

AI coding agents are rapidly accumulating a support ecosystem of configuration layers, routing infrastructure, and domain-specific skill packs — meaning the agent itself is increasingly just one component in a larger stack your teams will need to manage. The breakout project this week, Ponytail, is a discipline plug-in that steers coding agents toward deleting or skipping code rather than over-building, a direct response to a well-documented cost and quality problem with agentic code generation. ECC pairs well with it: it adds persistent memory, security guardrails, and shared instruction files across whichever agent tools your developers are already using. On the infrastructure side, OmniRoute — a self-hosted gateway routing across hundreds of AI providers with automatic fallback — signals that teams are starting to treat model access as a reliability problem, not just a vendor choice. Watch whether agent skill standardization (the emerging "Agent Skills spec") becomes a coordination layer teams adopt the way they adopted shared linting rules — if it does, the skills repositories trending this week are early templates worth evaluating.

## For AI generalists

The dominant theme of W38 is the maturing agent toolchain: the raw models are being wrapped in increasingly opinionated configuration and orchestration layers, and those wrappers are what developers are actually starring and sharing.

**Ponytail** grabbed the most attention — it's a prompt/plugin layer that instills YAGNI ("you aren't gonna need it") discipline into Claude Code, Cursor, and similar tools, pushing agents toward smaller, more surgical edits. **ECC** complements it by acting as a harness layer that wires persistent memory, a security module, and cross-tool instruction files across multiple agent environments simultaneously. **kepano/obsidian-skills** is a tidy example of the emerging Agent Skills specification in practice: it teaches coding agents how to correctly read and write Obsidian's native formats (wikilinks, JSON Canvas, Bases), and its appearance in both the OSS and Skills charts suggests the spec is gaining real traction as a distribution format. **Orca** by StablyAI takes a different angle — parallel execution: it fans a single prompt across Codex, Claude Code, and others in separate git worktrees so you can compare outputs and merge the best result. Rounding things out, **WeKnora** from Tencent is a self-hostable knowledge platform that ingests from a dozen sources and auto-generates a self-maintaining wiki via a ReAct agent — enterprise-flavored RAG infrastructure for teams that can't (or won't) send documents to a third-party SaaS.

## The numbers

Both the OSS and Skills editions this week rank purely on seven-day star delta, so a project that appeared all seven days and sustained momentum — like Ponytail and ECC — will naturally dominate the totals over newer entrants that spiked on a single day. The cross-edition overlap list (eight repos appearing in both) is the more reliable signal of genuine, broad interest rather than audience-specific virality. Star totals here reflect cumulative gains across the week, not single-day peaks, so a mid-week launch with a strong tail can outscore a launch-day spike that faded quickly.

- **AI Tastemakers:** 33 unique repos · +100,503 stars gained (max 7d delta per repo) · top topics: claude-code, llm, claude, ai-agents, mcp
- **Skill Tastemakers:** 49 unique repos · +84,722 stars gained (max 7d delta per repo) · top topics: claude-code, claude, codex, ai-agents, llm
- **Both lists:** 8 repo(s) appeared in OSS and Skills (DietrichGebert/ponytail, Panniantong/Agent-Reach, addyosmani/agent-skills, affaan-m/ECC, blader/humanizer, calesthio/OpenMontage, diegosouzapw/OmniRoute, kepano/obsidian-skills)
- **How we ranked this week:** delta_7d
- **Held the OSS list:** affaan-m/ECC (7d), DietrichGebert/ponytail (7d), diegosouzapw/OmniRoute (6d), Panniantong/Agent-Reach (5d), Tencent/WeKnora (5d), kepano/obsidian-skills (4d), addyosmani/agent-skills (3d), miuuyy/codex-chatgpt-web (3d), asgeirtj/system_prompts_leaks (2d), blader/humanizer (2d), heygen-com/hyperframes (2d), microsoft/markitdown (2d), nextlevelbuilder/ui-ux-pro-max-skill (2d)
- **Held the Skills list:** DietrichGebert/ponytail (7d), affaan-m/ECC (5d), stablyai/orca (5d), kepano/obsidian-skills (4d), Panniantong/Agent-Reach (3d), addyosmani/agent-skills (2d), diegosouzapw/OmniRoute (2d)

Today's ranked lists: [AI Tastemakers](../briefings/2026-09-20.html) · [Skill Tastemakers](../skills/briefings/2026-09-20.html)
