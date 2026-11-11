# Tastemakers Weekly — 2026-W45

_2026-11-02 – 2026-11-08 · generated 2026-11-08T19:33:07.736Z_

Three reads of the same week, in order: **strategy**, then **the stack**, then **the counts**.

## For executives

The clearest signal from W45 is that developer teams are building a layer of specialized, connectable tools on top of frontier AI models rather than waiting for a single platform to do everything. The week's most-starred project, REA, gives AI agents the ability to inspect compiled software without source code, a capability with obvious value for security, compliance, and legacy-system teams. Vercel's agent-desktop project attracted sustained attention by letting AI agents read and control desktop applications directly, which moves automation beyond the browser. A free-model router that requires no API key and no usage cap drew strong interest, signaling continued pressure on proprietary API businesses. Watch whether the "agent skills" category, small composable instructions that tune AI coding assistants without full automation, becomes a standard part of engineering onboarding in Q1 2027.

## For AI generalists

The builder story this week was about connective tissue. REA, an MCP server for reverse engineering binaries, Electron apps, and websites, held the top spot in both the open-source and skills rankings for all seven days, which almost never happens. Its staying power suggests the community sees a genuine gap in giving agents structured access to closed or compiled systems. On the agent-desktop side, Vercel Labs shipped a CLI and C library that serializes the OS accessibility tree as JSON, giving agents a stable handle on native apps rather than relying on fragile screenshot-based approaches.

The skills category had its own standouts. Impeccable adds slash-commands to Claude Code, Cursor, and Codex specifically to push back against AI design defaults, things like overused gradients and automatic Inter font choices, using 62 rule-based checks with no external API required. mattpocock/skills took a broader approach, offering a library of small composable agent instructions for multiple coding assistants. Both reflect a maturing pattern: engineers want to stay in the loop rather than hand off entire workflows, and they want reusable primitives to do it.

## The numbers

Both editions tracked 44-45 unique repos, and the star totals are skewed heavily by REA, which alone accounts for more stars than many full weeks across both lists combined. The seven-day repeat streaks for REA and dsh-our-free-model are genuine sustained-interest signals, not launch-day spikes, while four-day appearances like Scrapling and dsh-Go are more typical new-entry momentum. Cross-edition overlap at 15 repos is high, meaning the open-source and skills audiences are converging on the same projects this week.

- **AI Tastemakers:** 44 unique repos · +179,905 stars gained (max 7d delta per repo) · top topics: ai-agents, claude-code, llm, mcp, ai
- **Skill Tastemakers:** 45 unique repos · +193,713 stars gained (max 7d delta per repo) · top topics: claude-code, ai, agent-skills, ai-agents, codex
- **Both lists:** 15 repo(s) appeared in OSS and Skills (ConardLi/garden-skills, D4Vinci/Scrapling, FailproofAI/failproofai, addyosmani/agent-skills, affaan-m/ECC, blader/humanizer, calesthio/OpenMontage, firecrawl/firecrawl, gamedev-skills/awesome-gamedev-agent-skills, milind-soni/OpenMausBot, morluto/rea, thedotmack/claude-mem, tt-a1i/archify, yetone/magpie, yihui-dev/awesome-opus5-5-videos)
- **How we ranked this week:** delta_7d
- **Held the OSS list:** Ebony-Vinyl/dsh-our-free-model (7d), morluto/rea (7d), vercel-labs/agent-desktop (6d), ccch1mneyyy/dsh-Go (4d), D4Vinci/Scrapling (4d), thedotmack/claude-mem (4d)
- **Held the Skills list:** morluto/rea (7d), pbakaus/impeccable (5d), D4Vinci/Scrapling (4d), debpalash/VoiceStudio (4d), mattpocock/skills (4d), thedotmack/claude-mem (4d), Gathin23/cleanyourtv (3d), milind-soni/OpenMausBot (2d)

Today's ranked lists: [AI Tastemakers](../briefings/2026-11-08.html) · [Skill Tastemakers](../skills/briefings/2026-11-08.html)
