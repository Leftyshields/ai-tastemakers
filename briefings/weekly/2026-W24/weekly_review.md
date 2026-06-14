# Tastemakers Weekly — 2026-W24

_2026-06-08 – 2026-06-14 · generated 2026-06-14T13:58:49.095Z_

## Week at a glance

- **AI Tastemakers:** 30 unique repos · +108,694 stars gained (max 7d delta per repo) · top topics: claude-code, claude, ai, llm, ai-agent
- **Skill Tastemakers:** 34 unique repos · +29,380 stars gained (max 7d delta per repo) · top topics: claude-code, claude, codex, cursor, llm
- **Both lenses:** 3 repo(s) appeared in OSS and Skills digests (Panniantong/Agent-Reach, chopratejas/headroom, op7418/guizang-ppt-skill)
- **Ranking modes this week:** bootstrap_since_first_seen, delta_7d
- **Sustained OSS momentum:** chopratejas/headroom (7d), Leonxlnx/taste-skill (7d), mvanhorn/last30days-skill (7d), Panniantong/Agent-Reach (7d), esengine/DeepSeek-Reasonix (5d), santifer/career-ops (5d), Imbad0202/academic-research-skills (4d), elder-plinius/CL4R1T4S (3d), aaif-goose/goose (2d), JuliusBrussee/caveman (2d), rtk-ai/rtk (2d)
- **Sustained Skills momentum:** op7418/guizang-ppt-skill (7d), can1357/oh-my-pi (6d), jlcodes99/cockpit-tools (6d), chopratejas/headroom (5d), rohitg00/agentmemory (4d), zarazhangrui/frontend-slides (4d), mukul975/Anthropic-Cybersecurity-Skills (3d), open-gsd/gsd-core (3d), decolua/9router (2d), DietrichGebert/ponytail (2d), Imbad0202/academic-research-skills-codex (2d), JimLiu/baoyu-design (2d), NarratorAI-Studio/narrator-ai-cli-skill (2d), ogulcancelik/herdr (2d)

## Opening

Week 24 was a compression week in both senses: the OSS lane pulled in **108,694 stars** across 30 repos while the skills lane added **29,380** across 34 — and the dominant technical idea underneath both numbers was *doing more with less context*. Five repos appeared every single day of the week, a sign that the community found genuine signal rather than novelty spikes. A caveat worth keeping front of mind: several early-week rankings ran on bootstrap mode while 7-day star histories were still accumulating, so treat the precise star counts as directional rather than definitive.

## AI Tastemakers

**mvanhorn/last30days-skill** was the week's blowout at nearly 70K stars — a parallel-query agent that hits Reddit, X, YouTube, TikTok, HN, and Polymarket simultaneously and weights results by actual engagement signals, not recency alone. It's a practical answer to a real problem: agents that hallucinate "current events" because their retrieval is either stale or unweighted. **chopratejas/headroom** (48K stars, all seven days) kept its grip on the leaderboard by doing the unglamorous work of shrinking context 60–95% before it ever reaches the model — the fact that it surfaces in *both* lanes tells you this isn't a niche optimization anymore. **elder-plinius/CL4R1T4S** punched hard for a three-day appearance (16K stars), cataloguing leaked system prompts from ChatGPT, Claude, Gemini, and Grok; the community's appetite for that kind of transparency isn't slowing down.

## Skill Tastemakers

**chopratejas/headroom** led the skills lane too (23K stars in five days), which reinforces the point: context budget management is graduating from tip to infrastructure. **op7418/guizang-ppt-skill** was the quiet seven-day constant — a Claude Code / Codex skill that generates single-file HTML decks in editorial and Swiss typography styles — proof that aesthetic scaffolding for agents has a hungry audience. **DietrichGebert/ponytail** only appeared two days but landed 4,300 stars with a blunt premise: enforce a strict YAGNI hierarchy before writing a single line, cutting agent output by 80–94%; that kind of aggressive constraint-as-skill is a pattern worth watching. **jlcodes99/cockpit-tools** (3,670 stars, six days) is pragmatic in a different direction — multi-account orchestration across 12 AI IDEs, which signals that serious builders are now running heterogeneous toolchains and need glue, not more agents.

## Cross-Lane Themes

Three repos crossed both lanes this week — **Panniantong/Agent-Reach**, **chopratejas/headroom**, and **op7418/guizang-ppt-skill** — and the overlap is instructive: the community is converging on *agent plumbing* (reach, context, output format) as the shared foundation regardless of whether you're building OSS infrastructure or composable skills. The top topics list is nearly identical across lanes (`claude-code`, `claude`, `llm`) which means the audience is the same people wearing different hats on different days. The divergence to watch: OSS standouts tend to be broader middleware plays, while skills standouts are increasingly opinionated constraints — laziness hierarchies, typography rules, compression budgets — suggesting that the skills format is maturing into a way to encode hard-won engineering judgment, not just shortcuts.

## Builder Takeaway

If you're shipping agent tooling right now, context management and retrieval grounding are the two bets with the most community validation behind them this week — not new model wrappers. The ponytail / headroom pairing suggests a meta-pattern: builders want agents that generate *less* output more precisely, and they'll reach for explicit constraint layers to get there. Keep an eye on the IDE orchestration space too; cockpit-tools signals that multi-tool, multi-account workflows are a real pain point that nobody has cleanly solved yet.

