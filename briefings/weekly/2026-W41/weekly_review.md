# Tastemakers Weekly — 2026-W41

_2026-10-05 – 2026-10-11 · generated 2026-10-11T18:08:01.230Z_

Three reads of the same week, in order: **strategy**, then **the stack**, then **the counts**.

## For executives

The dominant theme of W41 is AI agents gaining direct access to previously locked surfaces — binaries, social platforms, and the open web — without needing custom API arrangements or source code. REA, a tool that lets AI agents reverse-engineer closed-source software, and Agent Reach, which gives agents authenticated access to Twitter, Reddit, YouTube, and similar platforms, both held the top of trending lists all week; together they signal that the "what can an agent see and touch?" boundary is actively being redrawn by the open-source community. HyperFrames from HeyGen — a framework for rendering deterministic video from HTML and CSS — points to AI-driven content production pipelines becoming a legitimate engineering category, not just a demo. On the education side, a structured 523-lesson AI engineering curriculum drew sustained attention, suggesting enterprises hungry to upskill engineers are turning to open-source learning paths rather than waiting for formal programs. The quarter's watch item: agent capability expansion is outpacing agent governance tooling — teams should be stress-testing what their agents can now reach before that gap widens further.

## For AI generalists

The builder stack shifted noticeably toward **agent access and perception** this week. REA (morluto/rea) is the clearest example: it wraps Hopper, Ghidra, and static JavaScript analysis behind an MCP server, so agents like Claude Code can reason about a closed binary or Electron app the same way they'd reason about readable source. Moli (lexmount/moli) tackles a different perception problem — it's a Rust-based headless browser that presents web pages to agents as structured semantic trees, Markdown, or screenshots via standard protocols, rather than raw HTML soup. Agent Reach rounds out the access theme by federating authenticated reads across Twitter, Reddit, YouTube, GitHub, and several Chinese platforms under a single MCP config, sidestepping API costs and login walls. Ponytail, which appeared across both OSS and skills editions, is worth noting for a different reason: it's a one-file agent skill (`SKILL.md`) that instructs coding agents to *delete* code rather than add it, and its benchmarks on real FastAPI and React projects are attracting serious attention from teams trying to manage context bloat and token spend.

On the learning and tooling side, HyperFrames (heygen-com/hyperframes) offers a clean TypeScript path for converting HTML/CSS animations into deterministic MP4s via Chrome's BeginFrame API — a building block that slots naturally into agent-driven content workflows. The AI engineering curriculum (rohitg00/ai-engineering-from-scratch) with 523 lessons across Python, TypeScript, Rust, and Julia held a six-day streak, which for a learning repo is a strong signal of genuine community engagement rather than a launch spike.

## The numbers

The OSS and skills editions each tracked 45 unique repos this week, but the star totals — 182K for OSS and 290K for skills — are skewed heavily upward by two repos (REA and the AI engineering curriculum) each pulling over 200K stars on their own; remove those two and the distributions look far more typical. Repos like DietrichGebert/ponytail and morluto/rea appearing all seven days of the window are meaningful persistence signals, distinct from single-day spikes that can reflect a Product Hunt post or a viral tweet. The cross-edition overlap list of 17 repos is unusually large for a single week, suggesting a cohesive community wave rather than separate trending events in each list.

- **AI Tastemakers:** 45 unique repos · +182,267 stars gained (max 7d delta per repo) · top topics: claude-code, ai-agents, mcp, llm, claude
- **Skill Tastemakers:** 45 unique repos · +290,022 stars gained (max 7d delta per repo) · top topics: mcp, ai, ai-agents, claude-code, llm
- **Both lists:** 17 repo(s) appeared in OSS and Skills (ConardLi/garden-skills, D4Vinci/Scrapling, DietrichGebert/ponytail, Graphify-Labs/graphify, NousResearch/hermes-agent, Orchestra-Research/AI-Research-SKILLs, addyosmani/agent-skills, blader/humanizer, diegosouzapw/OmniRoute, firecrawl/firecrawl, heygen-com/hyperframes, morluto/rea, nextlevelbuilder/ui-ux-pro-max-skill, rehan-remade/universal-modder, rohitg00/ai-engineering-from-scratch, tt-a1i/archify, yihui-dev/awesome-opus5-5-videos)
- **How we ranked this week:** delta_7d
- **Held the OSS list:** DietrichGebert/ponytail (7d), lexmount/moli (7d), Panniantong/Agent-Reach (7d), morluto/rea (6d), affaan-m/ECC (3d)
- **Held the Skills list:** D4Vinci/Scrapling (6d), heygen-com/hyperframes (6d), rohitg00/ai-engineering-from-scratch (6d), eternity4719/HowToLiveBetter (5d), morluto/rea (5d), DietrichGebert/ponytail (2d), mattpocock/skills (2d)

Today's ranked lists: [AI Tastemakers](../briefings/2026-10-11.html) · [Skill Tastemakers](../skills/briefings/2026-10-11.html)
