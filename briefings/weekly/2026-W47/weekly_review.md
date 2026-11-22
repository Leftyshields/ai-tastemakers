# Tastemakers Weekly — 2026-W47

_2026-11-16 – 2026-11-22 · generated 2026-11-22T21:04:00.832Z_

Three reads of the same week, in order: **strategy**, then **the stack**, then **the counts**.

## For executives

This was a week when developer tooling for AI coding agents reached a new level of ambition. REA, a tool that lets AI agents reverse-engineer closed software without source code, dominated attention across both open-source and agent-skills tracking. T3 Code, an open-source desktop and mobile control plane that unifies Claude Code, Codex, Cursor, and other coding agents under one interface, held strong for five days straight. Claude-BugHunter, a skill bundle that equips agents to systematically search for security vulnerabilities using patterns from nearly 700 real bug-bounty reports, appeared in both editions as well, signaling that security teams are starting to bring structured agent workflows into authorized red-team work. The watch-item for the quarter is the emerging category of "agent control planes," software that orchestrates multiple AI coding agents in parallel across devices, because whichever tool wins that layer will have significant leverage over developer productivity workflows.

## For AI generalists

The story of W47 is consolidation around agent orchestration and tool-use. REA topped both editions by giving AI agents the ability to inspect compiled binaries and running processes at the instruction level via an MCP server, filling a real gap for security and reverse-engineering workflows that have historically required human expertise. Meanwhile, two separate projects, T3 Code and Orca, are competing in the same space: running multiple coding agents locally, side by side, with unified interfaces across desktop, mobile, and web. T3 Code takes a broader ACP-compatible approach across Claude Code, Codex, and Cursor; Orca focuses on parallel git worktrees with an integrated browser and diff viewer.

The dsh (DeepSeek Harness) ecosystem also had a noticeable week, with both a zero-dependency free-model plugin and a Flutter-based Android client landing in the top five OSS standouts. That points to a growing community building peripheral tooling around a specific agent shell runtime, similar to how the VS Code extension ecosystem developed. Claude-BugHunter, with its structured library of 83 skills mapped to real vulnerability classes, illustrates a broader shift: skill bundles are starting to look less like prompt collections and more like tradecraft libraries with real structure behind them.

## The numbers

The ranking method this week is seven-day star delta only, so projects that launched earlier in the week and built momentum have a natural advantage over anything that surfaced late Friday. REA's star counts in the OSS and skills editions differ by just 12 stars (107,205 vs. 107,193), which is a good calibration check showing consistent cross-edition signal rather than duplication artifacts. Any repo appearing all seven days should be read as a genuine sustained trend, not a single viral spike.

- **AI Tastemakers:** 47 unique repos · +142,733 stars gained (max 7d delta per repo) · top topics: claude-code, llm, ai-agents, mcp, dsh-plugin
- **Skill Tastemakers:** 53 unique repos · +163,338 stars gained (max 7d delta per repo) · top topics: claude-code, agent-skills, codex, claude, mcp
- **Both lists:** 20 repo(s) appeared in OSS and Skills (Appllama/appllama-skills, Tencent/LoopForge, affaan-m/ECC, bojieli/ai-agent-book, citrolabs/ego-lite, elementalsouls/Claude-BugHunter, emilkowalski/skills, erkamyaman/rust-anything, ethanplusai/sellbird, gamedev-skills/awesome-gamedev-agent-skills, irinabuht12-oss/google-ads-meta-ads-mcp, irinabuht12-oss/marketing-skills, lemomo-ai/lemo-opuscar, morluto/rea, mvanhorn/last30days-skill, nexu-io/openmotion, pingdotgg/t3code, thedotmack/claude-mem, tt-a1i/archify, yetone/magpie)
- **How we ranked this week:** delta_7d
- **Held the OSS list:** Ebony-Vinyl/dsh-our-free-model (7d), morluto/rea (7d), ccch1mneyyy/dsh-Go (5d), pingdotgg/t3code (5d), elementalsouls/Claude-BugHunter (4d)
- **Held the Skills list:** morluto/rea (7d), elementalsouls/Claude-BugHunter (5d), pingdotgg/t3code (5d), stablyai/orca (4d)

Today's ranked lists: [AI Tastemakers](../briefings/2026-11-22.html) · [Skill Tastemakers](../skills/briefings/2026-11-22.html)
