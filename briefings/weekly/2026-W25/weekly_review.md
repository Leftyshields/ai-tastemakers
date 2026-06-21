# Tastemakers Weekly — 2026-W25

_2026-06-15 – 2026-06-21 · generated 2026-06-21T13:59:15.043Z_

## Week at a glance

- **AI Tastemakers:** 19 unique repos · +162,197 stars gained (max 7d delta per repo) · top topics: claude-code, ai, claude, mcp, llm
- **Skill Tastemakers:** 18 unique repos · +169,059 stars gained (max 7d delta per repo) · top topics: claude-code, codex, claude, ai, mcp
- **Both lenses:** 15 repo(s) appeared in OSS and Skills digests (DeusData/codebase-memory-mcp, DietrichGebert/ponytail, Imbad0202/academic-research-skills, JuliusBrussee/caveman, Kilo-Org/kilocode, Leonxlnx/taste-skill, NousResearch/hermes-agent, Panniantong/Agent-Reach, affaan-m/ECC, chopratejas/headroom, elder-plinius/CL4R1T4S, farion1231/cc-switch, mvanhorn/last30days-skill, palmier-io/palmier-pro, tw93/Pake)
- **Ranking modes this week:** delta_7d
- **Sustained OSS momentum:** chopratejas/headroom (7d), DietrichGebert/ponytail (7d), elder-plinius/CL4R1T4S (7d), farion1231/cc-switch (7d), Leonxlnx/taste-skill (7d), NousResearch/hermes-agent (7d), Panniantong/Agent-Reach (7d), microsoft/markitdown (4d), DeusData/codebase-memory-mcp (3d), mvanhorn/last30days-skill (3d), affaan-m/ECC (2d), tw93/Pake (2d)
- **Sustained Skills momentum:** DietrichGebert/ponytail (7d), elder-plinius/CL4R1T4S (7d), NousResearch/hermes-agent (7d), Panniantong/Agent-Reach (7d), addyosmani/agent-skills (6d), chopratejas/headroom (6d), Egonex-AI/Understand-Anything (6d), farion1231/cc-switch (6d), Leonxlnx/taste-skill (4d), DeusData/codebase-memory-mcp (3d), affaan-m/ECC (2d), mvanhorn/last30days-skill (2d), safishamsi/graphify (2d)

## Opening

Week 25 was dense: 19 OSS repos and 18 skill repos tracked, generating **162K and 169K stars gained** respectively — with the skills lane narrowly outpacing open source for the second consecutive week. The dominant topics tell the whole story: `claude-code`, `mcp`, and `llm` sat at the top of both lanes, and seven repos held perfect 7-day streaks, signaling sustained builder interest rather than viral spikes. The week's clearest signal is structural — builders aren't just shipping models or wrappers anymore, they're engineering the operating conditions *around* agents: how much context they consume, what they're allowed to reach for, and what they remember between sessions.

## AI Tastemakers

**DietrichGebert/ponytail** led the OSS lane with ~195K stars gained across all seven days — an unusual sustained run for a tool whose core premise is restraint: make agents prefer existing platform primitives over writing new code, and annotate every shortcut for future upgrade. It reads like a linter for agent ambition, and builders are responding to that framing. **chopratejas/headroom** (~86K stars) and **Panniantong/Agent-Reach** (~53K) rounded out the persistent performers, addressing orthogonal but related problems — headroom attacks context bloat at the token level, Agent-Reach attacks the data-access gap by routing around paywalled platform APIs. **elder-plinius/CL4R1T4S** (~87K stars, 7 days) continued its run as the system-prompt transparency project people keep returning to; its staying power is a reminder that *legibility* of AI behavior is its own category of tooling demand.

## Skill Tastemakers

The skills lane was even more concentrated at the top, with **ponytail** pulling ~217K stars — higher than its OSS-lane number, which is worth noting: the skill packaging of the "laziness ladder" concept resonated *more* with the agent-workflow audience than with the general OSS audience. **addyosmani/agent-skills** (~59K stars, 6 days) was the week's clearest new entrant with staying power — it operationalizes a full engineering lifecycle (`/spec` → `/plan` → `/build` → `/test` → `/review` → `/ship`) as slash commands, essentially encoding senior-engineer judgment as reusable agent behavior. **Egonex-AI/Understand-Anything** held a 6-day streak without cracking the top-5 star count, which suggests a loyal niche rather than mass virality — worth watching for what problem it's quietly solving. **mvanhorn/last30days-skill** appeared in both lanes with modest but persistent numbers, pointing to growing appetite for time-bounded memory primitives.

## Cross-Lane Themes

Fifteen repos appeared in both the OSS and skills lanes this week — a record overlap for this digest — and the pattern isn't coincidence: the tools builders want *as infrastructure* (headroom, codebase-memory-mcp, hermes-agent) are the same ones they want *as callable skills*, which means the boundary between "library" and "agent capability" is collapsing in practice. **NousResearch/hermes-agent** is the clearest example: a self-improving agent that builds persistent skills from experience belongs in both categories simultaneously, and its 7-day streak in both lanes (~46K stars OSS) confirms builders are evaluating it from both angles. The **DeusData/codebase-memory-mcp** cross-lane presence is quieter but arguably more telling — persistent codebase memory is becoming a baseline expectation, not a differentiator, and its 3-day streak in both lanes suggests it's being adopted as plumbing rather than celebrated as a feature.

## Builder Takeaway

The week's throughline is **agent operating conditions** — context budgets (headroom), behavioral constraints (ponytail), data access (Agent-Reach), and persistent memory (hermes-agent, codebase-memory-mcp) are all attempts to make agents predictable and resource-efficient at runtime, not just capable in demos. If you're building on top of Claude Code or Codex right now, the repos that held 6–7 day streaks are the ones worth pulling into your stack before they become invisible dependencies everyone assumes you're already using. The skills lane outperforming OSS on stars for the second week running is a structural shift worth tracking: composable, slash-command-style agent behaviors are becoming a first-class distribution format.

