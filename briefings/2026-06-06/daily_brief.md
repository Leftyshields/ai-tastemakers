# AI Tastemakers — Daily Brief — 2026-06-06

_Ranking: bootstrap_since_first_seen · 10 repos · generated 2026-06-07T00:03:55.728Z_


> ⚠️ **Bootstrap ranking** (`bootstrap_since_first_seen`): 7-day star history is still maturing. Rankings will improve after a week of daily snapshots.


## 1. santifer/career-ops

https://github.com/santifer/career-ops · ★ 49327 (+21 this week) · ai-agent, anthropic, automation, career, careerops, claude, claude-code, cli, golang, interview-prep, job-search, open-source, resume

Career-Ops is an open-source CLI system that uses Claude Code and Playwright to autonomously scrape job portals, score listings across 10 weighted dimensions, and generate ATS-optimized PDFs tailored to each job description. It's timely because it directly counters the AI screening arms race — companies filter candidates with AI, and this gives candidates an equivalent tool to filter companies at scale. A builder could fork it to add new scoring dimensions for niche industries, wire it into a notification pipeline, or adapt the multi-agent batch architecture for any domain requiring parallel document evaluation against structured criteria.

## 2. Panniantong/Agent-Reach

https://github.com/Panniantong/Agent-Reach · ★ 22306 (+18 this week) · agent-infrastructure, ai-agent, ai-search, automation, bilibili, claude-code, cli, cursor, free-api, llm-tools, mcp, python, reddit-scraper, twitter-scraper, web-scraper, xiaohongshu, youtube-transcript

Agent Reach is a Python CLI that gives AI agents (Claude Code, Cursor, etc.) the ability to read and search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, and a dozen other platforms without paying for any APIs, using a combination of open-source scrapers, cookie-based auth, and MCP tool integrations. It's timely because the bottleneck for autonomous agents is increasingly internet access rather than reasoning ability, and most scraping solutions either cost money, require per-platform engineering, or break constantly. A builder could use it to rapidly prototype research agents, competitive intelligence tools, or social listening pipelines that span both Western and Chinese platforms from a single unified interface.

## 3. mvanhorn/last30days-skill

https://github.com/mvanhorn/last30days-skill · ★ 28781 (+17 this week) · ai-prompts, ai-skill, bluesky, claude, claude-code, clawhub, deep-research, hackernews, instagram, openclaw, polymarket, recency, reddit, research, social-media, tiktok, trends, twitter, web-search, youtube

/last30days is an AI agent skill that searches Reddit, X, YouTube, TikTok, HN, Polymarket, and the web in parallel, then synthesizes results ranked by real engagement signals—upvotes, likes, and prediction-market odds—rather than editorial curation. It's compelling right now because no single AI platform has native access to all these walled gardens simultaneously, and this skill bridges them using bring-your-own-keys auth at a moment when recency and community signal are critical for staying ahead in fast-moving domains like AI. A builder could wire it into a sales intelligence pipeline, a competitive monitoring agent, or a pre-meeting briefing tool that surfaces what a person or company has actually been doing in the last 30 days—not what their PR team wants indexed.

## 4. chopratejas/headroom

https://github.com/chopratejas/headroom · ★ 15823 (+17 this week) · agent, ai, anthropic, claude-code, compression, context-engineering, context-window, cursor, fastapi, langchain, llm, mcp, openai, prompt-engineering, proxy, python, rag, token-optimization, tokens, typescript

Headroom is a context compression layer that sits between your AI agent and the LLM, shrinking tool outputs, logs, RAG chunks, and conversation history by 60–95% before they consume context window space — exposable as a Python/TypeScript library, a drop-in OpenAI-compatible proxy, or an MCP server. It's particularly relevant now because long-context costs and context window exhaustion are the primary bottlenecks in production agentic systems, and the proliferation of Claude Code, Cursor, and similar tools means developers are hitting these limits daily without good tooling to address them. A builder could wrap an existing LangChain or Strands agent with `headroom wrap` to immediately cut API costs and extend effective context, or embed the library directly into a RAG pipeline to fit more retrieved chunks per query without upgrading to a larger model.

## 5. MemPalace/mempalace

https://github.com/MemPalace/mempalace · ★ 54269 (+11 this week) · ai, chromadb, llm, mcp, memory, python

MemPalace is a local-first AI memory system that stores conversation history as verbatim text and retrieves it via semantic search, organized into a structured hierarchy of people, projects, and topics — all without sending data to any external API. It's particularly relevant now as developers hit the limits of stateless LLM sessions and context windows, and its 96.6% R@5 score on LongMemEval gives it credible benchmark standing against commercial alternatives. A builder could wire it into Claude Code or any MCP-compatible client to give an AI assistant persistent, searchable memory across sessions, or use the pluggable backend interface to swap ChromaDB for a custom retrieval layer tuned to a specific domain.

## 6. Leonxlnx/taste-skill

https://github.com/Leonxlnx/taste-skill · ★ 35227 (+11 this week) · agent, ai, claude, claude-code, codex, coding, design, frontend, lowcode, nocode, skill, skills, vibecoding

Taste-Skill is a collection of installable "agent skills" — structured markdown instruction files — that steer AI coding agents like Codex, Cursor, and Claude Code toward better layout, typography, spacing, and motion instead of generic boilerplate UI output. It's timely because the explosion of vibe-coding tools has created a glut of identically mediocre AI-generated interfaces, and this is one of the first systematic attempts to treat design taste itself as a portable, version-controlled artifact. A builder could drop these skills into any agent workflow to immediately raise the baseline visual quality of generated frontends, or fork the skill format to encode their own design system conventions for consistent output across a team.

## 7. nexu-io/html-video

https://github.com/nexu-io/html-video · ★ 1717 (+11 this week) · ai-agent, apache-2, coding-agent, css, ffmpeg, html, html-to-video, hyperframes, mp4, open-design, open-source, programmatic-video, video, video-as-code, video-generation

html-video lets you point any local AI coding agent at a prompt, article URL, or GitHub repo and get back a real MP4 file rendered entirely on your machine — no cloud API, no per-render fee, just HTML and CSS compiled through FFmpeg. It's interesting right now because the explosion of agentic coding tools means developers want programmatic, code-driven media generation that fits naturally into an automated workflow rather than a GUI video editor. A builder could use it to auto-generate product demo videos from a changelog, turn weekly data reports into animated chart videos on a cron job, or wire it into a CI pipeline that produces a visual summary every time a repo ships a release.

## 8. danny-avila/LibreChat

https://github.com/danny-avila/LibreChat · ★ 38393 (+10 this week) · ai, anthropic, artifacts, aws, azure, chatgpt, chatgpt-clone, claude, clone, deepseek, gemini, google, gpt-5, librechat, mcp, o1, openai, responses-api, vision, webui

LibreChat is an open-source, self-hostable chat interface that unifies virtually every major AI provider — OpenAI, Anthropic, Google, AWS Bedrock, Azure, and dozens more — behind a single ChatGPT-style UI with agents, code execution, and MCP server support. It's particularly relevant right now as GPT-5, Claude, and Gemini compete aggressively, because it lets you benchmark and switch between frontier models without rebuilding your stack or surrendering data to a SaaS intermediary. A builder could deploy it as a private company AI hub with multi-user auth and per-endpoint access controls, wire in custom OpenAI-compatible local models via Ollama, or extend it with MCP servers to give employees a single interface that connects AI to internal tools and APIs.

## 9. CopilotKit/CopilotKit

https://github.com/CopilotKit/CopilotKit · ★ 33197 (+10 this week) · agent, agent-native, agentic-ai, agents, ai, ai-agent, ai-assistant, assistant, assistant-chat-bots, copilot, copilot-chat, generative-ui, js, llm, nextjs, open-source, react, reactjs, ts, typescript

CopilotKit is an open-source TypeScript SDK that lets developers embed AI copilots, agentic workflows, and generative UI into React, Angular, Vue, and React Native apps, with built-in support for shared state, human-in-the-loop pauses, and streaming chat interfaces. It's particularly relevant right now because the team created the AG-UI Protocol, which has been adopted by Google, LangChain, AWS, and Microsoft as a standard for agent-to-frontend communication, making CopilotKit a serious infrastructure bet rather than just a UI library. A builder could use it to wire a LangGraph or PydanticAI agent directly into a Next.js dashboard where the agent can read app state, render custom UI components mid-conversation, and hand off decisions to users before proceeding — all without building the plumbing from scratch.

## 10. helloianneo/ian-xiaohei-illustrations

https://github.com/helloianneo/ian-xiaohei-illustrations · ★ 3032 (+9 this week) · ai-agent, chinese, codex-skill, handdrawn, illustration, image-generation, xiaohei

Ian Xiaohei Illustrations is a Codex Skill that analyzes Chinese articles and generates 16:9 hand-drawn editorial illustrations featuring "Xiaohei," a minimalist black character who physically enacts the article's core argument, process, or metaphor — not just decorates it. It's interesting right now because it solves a real pain point in Chinese knowledge content creation: generic AI images that don't reinforce ideas, at a moment when Codex Skills are becoming a serious distribution format for reusable AI workflows. A builder could fork this to create their own house-style illustration skill — swapping Xiaohei for a different IP, adapting the QA checklist for a brand's visual language, or extending it to generate shot lists for video scripts and slide decks.
