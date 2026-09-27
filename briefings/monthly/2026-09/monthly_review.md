# Tastemakers Monthly — 2026-09

_2026-09-01 – 2026-09-30 · generated 2026-09-27T17:46:50.006Z_

Three reads of the same month, in order: **strategy**, then **the stack**, then **the counts**.

## For executives

September 2026's defining signal is that AI agent infrastructure is maturing from capability to discipline. The month's most sustained momentum — across all three weeks — belonged to projects that constrain and configure agents rather than expand them: Ponytail's YAGNI-first coding rules, ECC's memory-and-guardrails harness, and OmniRoute's multi-provider routing gateway all held top positions week after week, signaling that teams are moving from "can AI build this?" to "can AI build this cheaply, safely, and predictably?" A parallel theme is the emergence of the Agent Skills specification as a genuine coordination layer — domain-specific skill packs for scientific research, Obsidian knowledge management, diagram generation, and social-media access all gained significant traction, suggesting that composable skill registries may soon function the way shared linting configs do today. Enterprise-grade infrastructure (Tencent's self-hostable WeKnora RAG platform, Meetily's fully local meeting transcription) confirms that data-sovereignty concerns are driving a meaningful segment of adoption. The strategic bet for Q4: standardize on an agent configuration and skills interface now, so your teams can swap models and providers without rebuilding workflows from scratch.

## For AI generalists

The arc of September is a stack story: the models themselves receded into the background, and the tooling *around* them — routing layers, behavioral constraint plugins, skill registries, and orchestration shells — became the center of gravity for open-source attention. Early in the month, OmniRoute (a self-hosted gateway across 352 providers with quota-aware fallback and token compression) and Ponytail (a "laziest senior dev" rule set cutting generated code by ~54%) set the tone. By mid-month, ECC had joined Ponytail as a fixture across both OSS and skills charts, adding persistent memory, a security module called AgentShield, and shared CLAUDE.md-style instruction files that span Claude Code, Codex, Cursor, and Opencode simultaneously. Stablyai's Orca provided the parallel-execution angle: fan one prompt across multiple agents in isolated git worktrees, compare outputs, merge the winner.

The skills ecosystem deepened noticeably across the month. K-Dense-AI's Scientific Agent Skills library (163 validated research functions spanning genomics, drug discovery, and molecular dynamics) arrived early and pointed at regulated industries adopting agent tooling fast. Kepano's Obsidian Skills and cathrynlavery's diagram-design skill showed the Agent Skills spec working as intended — distributable, zero-dependency capabilities that teach an agent a new domain without touching the model. The month closed with the pattern clear: composable skill registries feeding into thin routing layers feeding into isolated execution environments (Orca's worktree model being the clearest expression) is the architecture developers are converging on, not monolithic agent frameworks.

## The numbers

September's ~327K OSS stars and ~300K skills stars are heavily skewed by a handful of projects — Ponytail alone accounted for a disproportionate share of all three weekly totals, so aggregate figures reflect concentrated breakout momentum rather than broad-market lift. The more reliable signal is streak length: projects that held trending position across all seven days of a given week (Ponytail, ECC, OmniRoute, TradingAgents) were being discovered sequentially across communities, not riding a single viral moment. Totals are summed across weeks W36–W38 and are not deduplicated, meaning a project like Ponytail that appeared in all three weekly rollups contributes to the month total multiple times.

- **AI Tastemakers:** +327,394 stars gained (summed across weekly rollups) · top topics: c, l, a, u, d
- **Skill Tastemakers:** +300,467 stars gained (summed across weekly rollups) · top topics: c, l, a, u, d
- **Weekly sources:** 2026-W36, 2026-W37, 2026-W38
