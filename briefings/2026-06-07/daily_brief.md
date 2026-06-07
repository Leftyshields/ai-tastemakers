# AI Tastemakers — Daily Brief — 2026-06-07

_Ranking: bootstrap_since_first_seen · 10 repos · generated 2026-06-07T14:11:07.477Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_since_first_seen`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 29753 (+988 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

/last30days is an AI agent skill that searches Reddit, X, YouTube, TikTok, Hacker News, Polymarket, and the open web in parallel, then scores results by upvotes, likes, and real-money prediction market odds to synthesize a grounded summary of any topic from the past month. It's compelling right now because no single AI platform has native access to all these walled gardens simultaneously, and this skill bridges them using bring-your-own credentials — giving Claude Code and other agents a recency layer that Google, ChatGPT, and Gemini each lack individually. A builder could wire it into a sales intelligence pipeline to auto-brief reps before calls, embed it in a research agent to surface emerging community pain points before they hit mainstream coverage, or use it as a signal layer in a trend-detection system that flags topics gaining real engagement velocity across platforms.

## 2. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 35953 (+735 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

Taste-Skill is a collection of installable "agent skills" — structured markdown instruction files — that constrain AI coding agents like Codex, Cursor, and Claude Code to produce frontend interfaces with intentional typography, spacing, motion, and layout instead of generic boilerplate. It's timely because the explosion of AI-generated UIs has created a recognizable aesthetic problem: functional but visually mediocre output that looks identical across projects, and this directly addresses that gap at the prompt/instruction layer rather than requiring post-hoc design fixes. A builder could drop these skills into any AI-assisted project to get production-quality visual output from day one, or combine the image-generation skills with tools like ChatGPT Images to produce reference boards that feed directly into implementation agents.

## 3. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 16534 (+728 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

Headroom is a token compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 60–95% before they hit the context window, using six algorithms including a locally-run neural model, with no code changes required via its proxy mode. It's timely because context costs and limits are the dominant bottleneck for production agentic systems right now, especially as agents accumulate long tool-call histories and multi-step reasoning chains that burn through expensive tokens. A builder could drop it in front of Claude Code or a LangChain pipeline today to cut API bills, extend effective context length for long-running agents, or use the MCP server to add compression and semantic retrieval as tools any MCP-compatible client can call.

## 4. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 22978 (+689 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) the ability to read and search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and a dozen other platforms without paying for APIs, by wrapping open-source scrapers and free endpoints into a single installable tool. It's timely because the gap between what LLM agents can reason about and what they can actually fetch from the live web is a major bottleneck right now, and this project attacks that problem across both Western and Chinese platforms simultaneously. A builder could use it to wire up an autonomous research agent that monitors competitor mentions across Twitter and Xiaohongshu, summarizes relevant YouTube and Bilibili tutorials, and surfaces Reddit bug reports—all without touching a paid API.

## 5. santifer/career-ops

https://github.com/santifer/career-ops · ★ 49733 (+427 this week) · ai-agent, anthropic, automation, career, careerops, claude, claude-code, cli, golang, interview-prep, job-search, open-source, resume

Career-Ops is an open-source CLI pipeline that uses Claude Code and other AI coding agents to automatically scrape job listings, score them across 10 weighted dimensions, and generate ATS-optimized PDFs tailored to each job description. It's interesting right now because the AI agent CLI ecosystem (Claude Code, Gemini CLI, Codex) just matured enough to handle multi-step autonomous workflows, and the 49k stars suggest job seekers are actively weaponizing these tools against AI-powered applicant filters. A builder could fork this to add new data sources (LinkedIn, niche job boards), swap in their own scoring rubric, or repurpose the batch evaluation and PDF generation pipeline for adjacent use cases like grant applications or RFP responses.

## 6. Imbad0202/academic-research-skills

https://github.com/Imbad0202/academic-research-skills · ★ 28412 (+339 this week) · academic-pipeline, academic-writing, ai-research, claude, claude-code, literature-review, peer-review, prompt-engineering

Academic Research Skills for Claude Code is a Python toolkit that wires Claude into a structured academic pipeline — literature search, citation verification, style calibration, peer-review simulation, and claim-level audit — with human checkpoints blocking fully-automated output at each integrity gate. It lands at a precise moment when corpus-scale studies are documenting ~147,000 hallucinated citations per year in AI-assisted research, making the claim-audit pass (which fetches sources and flags unsupported assertions) immediately practical rather than theoretical. A builder could extend the audit infrastructure to run continuous citation integrity checks on a lab's living paper drafts, or repurpose the reviewer calibration loop — where the tool measures its own false-negative rate against a gold set — as a quality-control layer for any high-stakes document generation system.

## 7. rohitg00/ai-engineering-from-scratch

https://github.com/rohitg00/ai-engineering-from-scratch · ★ 29696 (+317 this week) · agents, ai, ai-agents, ai-engineering, computer-vision, course, deep-learning, from-scratch, generative-ai, llm, machine-learning, mcp, nlp, python, reinforcement-learning, rust, swarm-intelligence, transformers, tutorial, typescript

This is a free, MIT-licensed curriculum of 503 lessons across 20 phases that teaches AI engineering bottom-up — from raw linear algebra and backpropagation through transformers, LLMs, agents, and production deployment — in Python, TypeScript, Rust, and Julia, with every lesson producing a reusable artifact. It's particularly relevant right now because the gap between "AI user" and "AI engineer" is widening fast, and most existing resources teach APIs without the underlying mechanics that matter when things break or need to scale. A builder could work through it to go from zero to shipping production agents with genuine understanding of what's happening inside the model, or mine specific phases (e.g., the LLM-from-scratch or MCP server sections) to fill targeted knowledge gaps in an existing project.

## 8. CopilotKit/CopilotKit

https://github.com/CopilotKit/CopilotKit · ★ 33562 (+375 this week) · agent, agent-native, agentic-ai, agents, ai, ai-agent, ai-assistant, assistant, assistant-chat-bots, copilot, copilot-chat, generative-ui, js, llm, nextjs, open-source, react, reactjs, ts, typescript

CopilotKit is a full-stack SDK for embedding AI agents directly into web, mobile, and Slack applications, providing ready-made components for chat UI, generative UI, shared agent-app state, and human-in-the-loop workflows across React, Angular, and Vue. It's particularly relevant right now because it's the team behind the AG-UI Protocol, which is rapidly becoming an industry standard adopted by Google, LangChain, AWS, and Microsoft for how frontends communicate with agents. A builder could use it to ship a production-grade AI assistant into an existing Next.js app in under an hour, complete with streaming responses, backend tool calls that render live UI components, and pause-and-confirm checkpoints where users can intervene before the agent proceeds.

## 9. esengine/DeepSeek-Reasonix

https://github.com/esengine/DeepSeek-Reasonix · ★ 19107 (+272 this week) · agent, agent-framework, ai-agent, ai-coding, cli, coding-agent, deepseek, developer-tools, ink, llm, prompt-caching, r1, terminal, tool-use, tui, typescript

DeepSeek-Reasonix is a terminal-based AI coding agent written in Go that wraps DeepSeek's R1 model in a config-driven, plugin-extensible harness, letting you run multi-step coding tasks from the CLI while its architecture actively minimizes token costs by stabilizing DeepSeek's prefix cache across long sessions. It's timely because DeepSeek's pricing makes long agentic loops economically viable in a way they weren't with OpenAI, and the rewrite from TypeScript to a single static Go binary signals a maturity push toward production use. A builder could drop it into a CI pipeline or dev container to automate refactoring, test generation, or code review workflows entirely from the terminal, with costs that stay predictable even across hour-long sessions.

## 10. D4Vinci/Scrapling

https://github.com/D4Vinci/Scrapling · ★ 61841 (+253 this week) · ai, ai-scraping, automation, crawler, crawling, crawling-python, data, data-extraction, mcp, mcp-server, playwright, python, scraping, selectors, stealth, web-scraper, web-scraping, web-scraping-python, webscraping, xpath

Scrapling is a Python web scraping framework that combines stealth browser automation (via Playwright), adaptive CSS/XPath selectors that self-heal when page layouts change, and built-in proxy rotation to extract data from sites that actively resist scraping. It's gaining traction now because anti-bot measures have made traditional scrapers nearly useless against modern sites, and Scrapling's MCP server integration means AI agents can trigger live web data extraction directly from LLM tool calls. A builder could use it to power a competitive intelligence product, a real-time price monitor, or an AI research agent that pulls fresh web data on demand without constantly breaking when target sites redesign their pages.
