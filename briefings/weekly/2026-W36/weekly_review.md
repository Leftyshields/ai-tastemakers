# Tastemakers Weekly — 2026-W36

_2026-08-31 – 2026-09-06 · generated 2026-09-06T16:18:26.818Z_

Three reads of the same week, in order: **strategy**, then **the stack**, then **the counts**.

## For executives

The dominant theme of W36 is **agentic cost discipline**: the most-watched projects this week are fundamentally about doing more with less — fewer tokens, fewer lines of generated code, fewer API bills. **Ponytail** (a coding-agent rule set that reduces generated code by roughly half) and **OmniRoute** (a self-hosted gateway routing across 352 AI providers to find free or cheaper capacity) both held the top of trending charts for the entire seven-day period, signaling that teams are moving past "can AI build this?" toward "can AI build this cheaply and correctly?" **Scientific Agent Skills** — a validated library of 163 research functions covering genomics, drug discovery, and materials science — points to a parallel shift in regulated and technical industries: domain-specific agent tooling is maturing fast. **Meetily**, a fully local meeting-transcription app, appeared for only two days yet rivaled week-long projects in momentum, a sign that privacy-preserving AI tooling is hitting an inflection point. The bet for Q4: teams that standardize on an agent-skills interface now will be positioned to swap models and providers without rebuilding workflows from scratch.

## For AI generalists

The builder stack shifted noticeably toward **orchestration and frugality** this week. Ponytail introduced what it calls a "laziest senior dev" heuristic for Claude Code and Cursor — a concise rules file that nudges agents to reach for browser-native primitives and short diffs rather than installing new dependencies. Measured across real tasks on a FastAPI/React codebase, it cut generated line counts by roughly 54%. On the routing side, OmniRoute gives any OpenAI-compatible client a single endpoint backed by 352 providers and over 1,200 models, with automatic quota-aware fallback and token compression baked in — useful for teams that want resilience without committing to one vendor.

The scientific and multi-agent layers both moved forward too. K-Dense-AI's Scientific Agent Skills library ships 163 callable research functions (genomics, proteomics, molecular dynamics, PK/PD modelling) as plug-and-play skills for any agent runtime supporting the open Agent Skills standard — lowering the barrier for LLM-powered research pipelines considerably. Stablyai's Orca takes a different angle on multi-agent orchestration: it runs Codex, Claude Code, OpenCode, or Pi in parallel git worktrees from a single desktop shell, with a mobile companion for remote monitoring. Together, these projects suggest the emerging pattern is **composable skill registries + thin routing layers + isolated execution environments**, rather than monolithic agent frameworks.

## The numbers

Star totals this week are heavily concentrated: Ponytail alone accounts for a large share of the OSS edition's aggregate, which means the aggregate figure overstates broad-market activity. The seven-day streak repos (OmniRoute, Ponytail, Scientific Agent Skills, TradingAgents, Orca) reflect genuine sustained discovery rather than a single viral spike — when a repo holds trending position across all seven days, it is typically being reshared across multiple communities sequentially. Meetily's two-day appearance with star gains competitive with seven-day projects is the week's real anomaly worth watching; short, steep curves like that often indicate a mainstream press pickup or a viral social post rather than organic developer discovery.

- **AI Tastemakers:** 30 unique repos · +111,480 stars gained (max 7d delta per repo) · top topics: claude, llm, claude-code, ai-agents, ai
- **Skill Tastemakers:** 24 unique repos · +103,039 stars gained (max 7d delta per repo) · top topics: claude-code, claude, ai-agents, codex, agent-skills
- **Both lists:** 14 repo(s) appeared in OSS and Skills (DietrichGebert/ponytail, Graphify-Labs/graphify, Imbad0202/academic-research-skills, JuliusBrussee/caveman, K-Dense-AI/scientific-agent-skills, Leonxlnx/taste-skill, NousResearch/hermes-agent, Panniantong/Agent-Reach, affaan-m/ECC, calesthio/OpenMontage, diegosouzapw/OmniRoute, elder-plinius/CL4R1T4S, guillaumemeyer/watermarks-remover, nextlevelbuilder/ui-ux-pro-max-skill)
- **How we ranked this week:** delta_7d
- **Held the OSS list:** diegosouzapw/OmniRoute (7d), DietrichGebert/ponytail (7d), K-Dense-AI/scientific-agent-skills (7d), TauricResearch/TradingAgents (7d), NousResearch/hermes-agent (6d), calesthio/OpenMontage (5d), affaan-m/ECC (4d), bojieli/ai-agent-book (2d), firecrawl/firecrawl (2d), rohitg00/ai-engineering-from-scratch (2d), Zackriya-Solutions/meetily (2d)
- **Held the Skills list:** diegosouzapw/OmniRoute (7d), DietrichGebert/ponytail (7d), K-Dense-AI/scientific-agent-skills (7d), stablyai/orca (7d), freestylefly/awesome-gpt-image-2 (6d), affaan-m/ECC (4d), blader/humanizer (4d), calesthio/OpenMontage (4d), MadsLorentzen/ai-job-search (4d), NousResearch/hermes-agent (3d), cathrynlavery/diagram-design (2d), guillaumemeyer/watermarks-remover (2d), Leonxlnx/taste-skill (2d)

Today's ranked lists: [AI Tastemakers](../briefings/2026-09-06.html) · [Skill Tastemakers](../skills/briefings/2026-09-06.html)
