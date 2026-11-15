# Tastemakers Weekly — 2026-W46

_2026-11-09 – 2026-11-15 · generated 2026-11-15T20:21:51.245Z_

Three reads of the same week, in order: **strategy**, then **the stack**, then **the counts**.

## For executives

Reverse-engineering AI, free frontier models without accounts, and desktop agent interfaces were the defining themes of W46. The standout project, REA, lets AI agents analyze compiled software at the binary level with no source code, a capability that matters deeply for security, legacy modernization, and competitive intelligence. Meanwhile, two projects in the DeepSeek Harness ecosystem attracted sustained attention by letting teams run capable AI models at zero cost and with no login requirements, lowering the barrier for teams that cannot or will not route work through major cloud vendors. OpenMausBot, which puts coding agents into a chat-style desktop interface with sandboxed cloud computers per agent, appeared in both the open-source and skills rankings all week, suggesting real builder appetite for human-in-the-loop agent workflows. The quarter's watch item: access to frontier models is decoupling from accounts and API keys faster than most procurement teams expect, and that changes your vendor-lock-in calculus.

## For AI generalists

The most technically striking project this week was REA, a Model Context Protocol server that gives AI agents the ability to reverse-engineer binaries and mobile apps at the native level, no source code required. MCP continues to anchor the open-source AI tooling conversation, appearing as a top topic across both the open-source and skills rankings. The week also saw continued momentum for the DeepSeek Harness (dsh) ecosystem: dsh-Go runs the agent framework locally on Android with animated desktop-pet companions that signal agent state, and the dsh-our-free-model plugin surfaces models like DeepSeek V4.1 Flash and Kimi K3 through public gateways with no authentication at all.

On the skills and agent-control side, Matt Pocock's skills repo held the top-seven-day streak in the skills edition with a library of small, composable instructions for Claude Code, Codex, and Copilot that keep engineers in charge of planning and spec workflows. vercel-labs/agent-desktop is a quieter but technically important entry: it reads the OS accessibility tree on macOS, Windows, and Linux and returns stable JSON references that any agent can act on, skipping screenshots entirely. Orca, from Stably AI, rounds out the picture by running multiple coding agents in parallel across isolated git worktrees in a single window, pointing toward a future where multi-agent parallelism is a standard part of the developer desktop.

## The numbers

REA dominates raw totals in both editions, so the aggregate star figures for the week are heavily skewed by a single project rather than broad momentum. The seven-day streaks for repos like morluto/rea, mattpocock/skills, and the dsh projects are a more reliable signal of sustained interest than one-day spikes. Cross-edition overlap of 18 repos is notably high this week, meaning the same projects are resonating with both general open-source audiences and agent-skill builders, which is rarer than it might look.

- **AI Tastemakers:** 47 unique repos · +133,738 stars gained (max 7d delta per repo) · top topics: mcp, claude-code, llm, dsh-plugin, ai-agents
- **Skill Tastemakers:** 52 unique repos · +152,289 stars gained (max 7d delta per repo) · top topics: claude-code, ai, codex, agent-skills, ai-agents
- **Both lists:** 18 repo(s) appeared in OSS and Skills (ChenLiu-1996/figures4papers, ChromeDevTools/chrome-devtools-mcp, Imbad0202/academic-research-skills, Jakeschincariol/day-trader-skill, NVIDIA/SkillSpector, OpenMontageInc/OpenMontage, Ryze-AI-Adgent/open-seo-mcp-skills, career-ops-hq/career-ops, chuspeeism/dashi-ppt-skill, elder-plinius/CL4R1T4S, f/prompts.chat, farion1231/cc-switch, homeassistant-ai/ha-mcp, kajisho5/ffmpeg-skill, milind-soni/OpenMausBot, morluto/rea, obsidianmd/obsidian-skills, pingdotgg/t3code)
- **How we ranked this week:** delta_7d
- **Held the OSS list:** ccch1mneyyy/dsh-Go (7d), Ebony-Vinyl/dsh-our-free-model (7d), morluto/rea (7d), milind-soni/OpenMausBot (4d), vercel-labs/agent-desktop (3d)
- **Held the Skills list:** mattpocock/skills (7d), morluto/rea (7d), milind-soni/OpenMausBot (5d), debpalash/VoiceStudio (3d)

Today's ranked lists: [AI Tastemakers](../briefings/2026-11-15.html) · [Skill Tastemakers](../skills/briefings/2026-11-15.html)
