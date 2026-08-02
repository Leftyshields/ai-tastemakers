# Tastemakers Weekly — 2026-W31

_2026-07-27 – 2026-08-02 · generated 2026-08-02T16:28:25.957Z_

## Week at a glance

- **AI Tastemakers:** 28 unique repos · +122,339 stars gained (max 7d delta per repo) · top topics: mcp, claude-code, claude, codex, llm
- **Skill Tastemakers:** 26 unique repos · +95,471 stars gained (max 7d delta per repo) · top topics: claude-code, ai-agents, claude, codex, mcp
- **Both lenses:** 19 repo(s) appeared in OSS and Skills digests (1jehuang/jcode, ComposioHQ/awesome-claude-skills, DeusData/codebase-memory-mcp, DietrichGebert/ponytail, Graphify-Labs/graphify, JuliusBrussee/caveman, Leonxlnx/taste-skill, NousResearch/hermes-agent, Panniantong/Agent-Reach, affaan-m/ECC, calesthio/OpenMontage, citrolabs/ego-lite, diegosouzapw/OmniRoute, farion1231/cc-switch, lidge-jun/opencodex, mvanhorn/last30days-skill, nextlevelbuilder/ui-ux-pro-max-skill, op7418/guizang-ppt-skill, tirth8205/code-review-graph)
- **Ranking modes this week:** delta_7d
- **Sustained OSS momentum:** bojieli/ai-agent-book (7d), diegosouzapw/OmniRoute (7d), koala73/worldmonitor (7d), citrolabs/ego-lite (6d), Graphify-Labs/graphify (6d), DietrichGebert/ponytail (5d), ComposioHQ/awesome-claude-skills (4d), affaan-m/ECC (3d), ruvnet/RuView (3d), 1jehuang/jcode (2d), every-app/open-seo (2d), Panniantong/Agent-Reach (2d)
- **Sustained Skills momentum:** diegosouzapw/OmniRoute (7d), DietrichGebert/ponytail (7d), Graphify-Labs/graphify (7d), stablyai/orca (7d), img2threejs/img2threejs (6d), affaan-m/ECC (5d), NousResearch/hermes-agent (5d), ComposioHQ/awesome-claude-skills (4d), 1jehuang/jcode (3d), MadsLorentzen/ai-job-search (2d), Panniantong/Agent-Reach (2d)

## Opening

W31 was a dense week for the open-source AI layer: 28 OSS repos and 26 skill repos moved the needle, pulling in **122K and 95K stars** respectively across seven days. The dominant topics — `mcp`, `claude-code`, `claude`, `codex`, `llm` — are essentially the same list in both lanes, which tells you the ecosystem is converging fast around a shared toolchain rather than fragmenting. Several repos held the trending chart every single day of the week, suggesting sustained developer interest rather than viral spikes. The infrastructure-versus-behavior split is getting sharper: one lane is building the pipes, the other is building the personalities that run through them.

## AI Tastemakers

The undisputed gravity well this week was **bojieli/ai-agent-book** (71K stars, 7/7 days) — a rigorous, multilingual engineering text with 92 runnable experiments that reads less like a tutorial and more like a field manual for production agent work. Right behind it, **diegosouzapw/OmniRoute** (63K stars) and **koala73/worldmonitor** (55K stars) held all seven days, together sketching a pattern: builders want a single normalized gateway into the model zoo *and* a normalized feed of real-world signal for agents to act on. **citrolabs/ego-lite** and **Graphify-Labs/graphify** rounded out the top five with strong six-day runs — ego-lite solving the "agent browser isolation" problem on macOS, Graphify solving the "agent codebase comprehension" problem with deterministic AST parsing. The OSS lane this week was overwhelmingly about *plumbing*: routing, monitoring, isolation, and graph-based memory.

## Skill Tastemakers

**stablyai/orca** ran all seven days and 48K stars for a reason: a dedicated Agent Development Environment that parallelizes Codex, Claude Code, and friends into isolated git worktrees is the missing IDE layer most teams are hacking together themselves. **Graphify** also topped the skills chart (33K), reinforcing that knowledge-graph-backed context isn't just an OSS infrastructure play — it's becoming a first-class skill primitive. **DietrichGebert/ponytail** (28K, 7/7) is the week's most interesting philosophical entrant: a skill that explicitly fights agent over-engineering, nudging models toward the simplest viable implementation. **ComposioHQ/awesome-claude-skills** (24K, 4 days) reflects a real market dynamic — the skills ecosystem is still young enough that *curation* is itself a high-value product, and 1,000+ reusable instruction packages is a meaningful catalog to anchor around.

## Cross-Lane Themes

Nineteen repos appeared in both the OSS and skills charts this week, which is an unusually high overlap and not accidental — it reflects that the most useful projects right now are simultaneously infrastructure *and* behavioral primitives. **OmniRoute**, **Graphify**, **ponytail**, **ECC**, and **awesome-claude-skills** all landed on both lists, meaning builders are treating them as composable layers rather than slotting them into a single category. The `claude-code` topic topping both topic charts is the clearest signal of the week: Claude Code has become the reference runtime that the rest of the ecosystem is tooling against, in the same way VS Code became the reference editor. Watch whether `codex` maintains parity here or begins to diverge in the skills lane specifically, where prompt-level behavior matters more than raw model routing.

## Builder Takeaway

If you're building agent tooling right now, the week's data argues for two immediate priorities: **context fidelity** (Graphify-style structured memory over raw embedding search) and **runtime isolation** (ego-lite/orca-style worktree or browser sandboxing). The ponytail signal is worth taking seriously too — as agents get more capable, the failure mode is over-engineering, not under-engineering, and skills that constrain rather than expand agent behavior will become load-bearing. The ai-agent-book's multilingual reach and runnable experiments format is a template worth stealing: comprehensive, executable, and language-accessible documentation is pulling massive community gravity right now.

