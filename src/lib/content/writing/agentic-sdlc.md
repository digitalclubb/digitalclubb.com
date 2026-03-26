---
title: "Rethinking the agentic SDLC: how AI is changing how we build software"
date: "2026-03-21"
summary: "A practical look at the agentic SDLC, how AI is changing software development workflows and what this means for engineering teams, review and system design."
published: true
tags: ["engineering", "AI", "architecture"]
---

AI is starting to change how software gets built. Not in a sudden shift, but through a series of small changes that are beginning to compound.

Tools have moved beyond autocomplete. They can read a codebase, plan a change, implement it across multiple files, run tests and open a pull request. This is no longer theoretical. Teams at Stripe, Spotify and others are already working in this way. Stripe's "Minions" and Spotify's "Honk" are examples of AI systems embedded into engineering workflows, triggered through Slack or internal tooling, producing real changes against real repositories.

We are also seeing this pattern emerge in tools like Claude, where work can be decomposed into specialised subagents. Planning, implementation and validation are handled by separate processes rather than a single interaction. The shape of the workflow starts to look less like a tool and more like a system.

The question is not whether this affects how engineering teams work. It already does. The more useful question is what this means for how we organise work, maintain quality and decide where human judgement still matters.

## What is actually changing

The most significant shift is not that AI writes code. It is that the unit of output is changing.

Early tools produced snippets. A function here, a completion there. The developer still did the structural work, deciding what to build and how it connected to the rest of the system.

The newer model is different. An engineer describes a change. An agent reads the repository, understands the structure and conventions, breaks the work into tasks, implements each one, runs validation and delivers the result as a pull request. The engineer's role shifts from writing code to defining intent and reviewing output.

This is not pair programming with a chatbot. It is closer to delegating work to a junior engineer who happens to operate at machine speed, follow conventions consistently and always run tests before raising a PR.

## What an agentic SDLC might look like

I built [Implera](https://implera.ai) to explore this in practice. Not as a product pitch, but as a way of understanding what happens when you treat the agentic model as the default.

The initial version focused on generating pull requests for human review. An agent would read the repository, plan changes, implement them and submit a PR. But as AI tools improved and the volume of generated code increased, it became clear that gating everything on human review was not sustainable.

The current approach is different. Implera connects to your GitHub repository and uses AI to evaluate security, testing and architecture, providing real-time insights and actionable fixes as your code evolves. Rather than inserting itself into the delivery pipeline, it watches what is happening and surfaces what matters.

This maps closely to how newer systems are evolving. Claude subagents allow different stages of work to be handled by separate processes with distinct responsibilities. Rather than a single model doing everything, you start to see a team-like structure emerge.

What became clear is that the interesting problems are not in code generation. They are in maintaining visibility. Capturing key quality metrics. Offering context about the repository and codebase so that humans retain control and understanding without needing to manually review every line.

## Moving beyond the review bottleneck

If AI can produce code faster than humans can review it, then review becomes the constraint. The natural instinct is to limit the size of generated changes or break work into smaller pull requests. But as AI improves and the volume of generated code increases, this approach does not scale.

We cannot make human review the bottleneck. If AI systems can generate, validate and iterate faster than a team can review, then insisting on human review for every change turns it into a constraint rather than a safeguard.

The alternative is not to remove human oversight but to change its shape. Instead of reviewing every line, humans need tools that surface what matters. Quality metrics, security signals, architectural drift, test coverage gaps. This is the approach [Implera](https://implera.ai) takes. Rather than asking humans to review AI-generated pull requests, it gives them continuous visibility into what AI is producing and where attention is needed.

This lets teams lean into the speed that AI offers while retaining the control that matters. The human role shifts from gatekeeping individual changes to monitoring the health of the system as a whole.

## Where humans stay involved

Not everything shifts at the same rate.

Product definition remains a human responsibility. Deciding what to build, for whom and why still requires judgement.

There is also a question of how product leadership interacts with this model. If agents can plan and break down work, product managers may increasingly work directly with systems to explore options and define scope before anything reaches engineering.

Planning and design remain human-led. Architectural decisions and tradeoffs require context that spans the codebase, the team and the business.

Review and validation remain critical, but the mechanism is shifting. Rather than manually reviewing every change, engineers need platforms that provide visibility into what AI is producing, flagging risks and surfacing areas that need human attention.

Testing strategy also remains important. AI can generate tests, but deciding what to test and where confidence should come from is still a human concern.

In larger organisations, involvement becomes more nuanced. Not every change needs the same level of oversight. The challenge is applying the right level of review to the right type of work.

## Engineering as orchestration

As implementation shifts toward AI, the role of the engineer changes.

This sounds abstract, but in practice it changes where effort goes.

Prompt design becomes an engineering skill. Not as a way of coaxing better output, but as a way of specifying constraints. Security requirements, performance expectations, accessibility standards and architectural patterns all need to be defined clearly.

The prompt is not just a request. It is a specification. Poorly defined inputs do not just produce low-quality code, they introduce risk.

It also requires thinking about the system around the AI. What guardrails exist. How incorrect but plausible changes are detected. How consistency is maintained.

The role shifts from writing code to shaping the system that produces it. That includes defining constraints, reviewing output and deciding where automation should stop.

## Risks that need attention

There are real risks in this shift.

AI systems introduce new attack surfaces. If an agent can write to a repository based on natural language input, then adversarial prompts become a concern.

AI reviewing its own output is effective at catching certain classes of issues, but it can miss structural or contextual problems that require a different perspective.

Speed can also hide problems. If changes are produced faster than they are evaluated, low-quality code can accumulate.

These are not reasons to avoid AI. They are reasons to be deliberate about how it is introduced.

## Staying close to the system

There is a more subtle concern.

If engineers spend less time writing code, they may lose familiarity with the systems they are responsible for. Understanding how a system works comes from direct interaction with it.

It is not hard to imagine a workflow where engineers rarely open an IDE, instead interacting with higher-level systems. If that happens, maintaining understanding becomes more important.

This requires deliberate effort. Periodic deep reviews. Asking questions about how systems behave. Keeping documentation current. Tools like [Implera](https://implera.ai) can help here by providing ongoing context about the repository, surfacing changes in architecture and quality so that engineers stay informed even when they are not writing the code themselves.

The goal is not to resist automation but to ensure that engineers remain capable of making informed decisions.

## What remains unclear

There is still a lot we do not know.

It is not clear how team structures will change. Whether fewer engineers are needed, or different skills become more important.

It is not clear where the limits of AI-generated code are, particularly in complex or poorly structured systems.

It is not clear how to measure productivity in this model. Traditional metrics become less meaningful.

## Closing

The shift toward an AI-driven software development lifecycle is real, but it is early.

The tools are improving quickly. The workflows are still emerging. The organisational implications are not fully understood.

Engineering judgement does not become less important. It becomes differently applied. Less time writing code. More time defining intent, evaluating output and maintaining understanding.

The teams that navigate this well will be those that build the tools and platforms to lean into what AI offers. Not by slowing it down with manual review at every step, but by retaining visibility, control and understanding as the pace of delivery increases.

That work is still ahead of us.
