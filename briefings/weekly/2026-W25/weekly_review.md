# Tastemakers Weekly — 2026-W25

_2026-06-15 – 2026-06-21 · generated 2026-06-22T06:36:14.399Z_

## Week at a glance

- **AI Tastemakers:** 19 unique repos · +170,165 stars gained (max 7d delta per repo) · top topics: claude-code, ai, claude, mcp, llm
- **Skill Tastemakers:** 18 unique repos · +176,244 stars gained (max 7d delta per repo) · top topics: claude-code, codex, claude, ai, mcp
- **Both lenses:** 15 repo(s) appeared in OSS and Skills digests (DeusData/codebase-memory-mcp, DietrichGebert/ponytail, Imbad0202/academic-research-skills, JuliusBrussee/caveman, Kilo-Org/kilocode, Leonxlnx/taste-skill, NousResearch/hermes-agent, Panniantong/Agent-Reach, affaan-m/ECC, chopratejas/headroom, elder-plinius/CL4R1T4S, farion1231/cc-switch, mvanhorn/last30days-skill, palmier-io/palmier-pro, tw93/Pake)
- **Ranking modes this week:** delta_7d
- **Sustained OSS momentum:** chopratejas/headroom (7d), DietrichGebert/ponytail (7d), elder-plinius/CL4R1T4S (7d), farion1231/cc-switch (7d), Leonxlnx/taste-skill (7d), NousResearch/hermes-agent (7d), Panniantong/Agent-Reach (7d), microsoft/markitdown (4d), DeusData/codebase-memory-mcp (3d), mvanhorn/last30days-skill (3d), affaan-m/ECC (2d), tw93/Pake (2d)
- **Sustained Skills momentum:** DietrichGebert/ponytail (7d), elder-plinius/CL4R1T4S (7d), NousResearch/hermes-agent (7d), Panniantong/Agent-Reach (7d), addyosmani/agent-skills (6d), chopratejas/headroom (6d), Egonex-AI/Understand-Anything (6d), farion1231/cc-switch (6d), Leonxlnx/taste-skill (4d), DeusData/codebase-memory-mcp (3d), affaan-m/ECC (2d), mvanhorn/last30days-skill (2d), safishamsi/graphify (2d)

## Opening

Week 25 was the week the GitHub AI ecosystem stopped asking "what can agents do?" and started asking "what should they do first?" The OSS lane pulled **170K stars** across 19 repos; skills matched with **176K** across 18 — unusually tight parity that signals the tooling and the discipline layers are maturing in lockstep. Seven repos held the #1 or #2 slot every single day of the week, a sign that this cohort wasn't riding a news cycle but compounding on genuine utility. The dominant topics — `claude-code`, `mcp`, `llm` — were identical across both lanes, which tells you something about where the gravitational center of agent development sits right now.

## AI Tastemakers

**Ponytail** (DietrichGebert/ponytail) was the undisputed story of the week, pulling **197K stars** in seven days — the kind of number that makes you check the data twice. Its premise is almost contrarian: instead of making Claude Code or Codex *more* capable, it makes them reach for the boring solution first, enforcing a laziness hierarchy from native platform features down to custom code as a last resort. Right behind it, **Headroom** (chopratejas/headroom) at **88K stars** attacked a different constraint — not what the agent writes, but what it *reads*, compressing tool outputs and RAG chunks by up to 95% before they hit the context window. Together these two repos define a clear theme: the optimization frontier has shifted from model capability to agent *efficiency*. **CL4R1T4S** at 87K stars and **Agent-Reach** at 53K round out a week where transparency (what are these models actually being told?) and reach (what can agents actually see?) drove nearly as much interest as the core tooling.

## Skill Tastemakers

The skills lane mirrored OSS in its top performers but diverged meaningfully in its fourth slot. **Ponytail** led here too with **219K stars** — actually outpacing its OSS number, which suggests the skills community is treating it less as infrastructure and more as a behavioral contract to drop directly into agent workflows. **Addy Osmani's agent-skills** (addyosmani/agent-skills) at **59K stars** over six days was the week's most *actionable* new entry: six slash commands (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`) that encode senior-engineer gate logic into the agent loop, not as suggestions but as enforced sequence. This is the skills lane doing what it does best — encoding institutional knowledge as reusable primitives rather than one-off prompts. The fact that **Headroom** and **Agent-Reach** also charted strongly in skills (not just OSS) confirms that builders are consuming context-management and data-access tools as *skills* to be composed, not just libraries to be imported.

## Cross-Lane Themes

Fifteen repos appeared in both the OSS and skills rankings this week — an unusually high overlap rate that isn't noise. It reflects a genuine architectural moment: the distinction between "a library you install" and "a skill you give your agent" is collapsing. **Headroom** is the clearest example — it ships as a Python library *and* an MCP server *and* a one-command agent wrapper, and builders are starring it in both contexts simultaneously. **Hermes Agent** (NousResearch/hermes-agent) ran all seven days in both lanes and deserves a closer look: its self-improving, cross-session memory model is less a tool than a runtime, and Nous Research building it to run on a $5 VPS signals a deliberate push toward agent deployability outside enterprise infrastructure. The cross-lane pattern to watch going forward: when a repo charts in both lanes for a full week, it's almost always because it solves a *runtime* problem (context, memory, access, behavior) rather than a task-specific one.

## Builder Takeaway

The practical signal from W25 is that **constraint-first design is winning**. Ponytail's laziness ladder and Headroom's compression layer both succeed by *reducing* what the agent does before adding new capability — and the star counts suggest the community recognizes this as the more durable architecture. If you're building agent tooling right now, the question worth asking is: does your tool make the agent *smarter*, or does it make the agent *cheaper to run and harder to break*? The latter is where the compounding stars went this week. Addy Osmani's agent-skills gives you a concrete starting point for encoding that discipline at the workflow level — worth studying before you write another custom agent loop from scratch.

