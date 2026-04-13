---
title: "Humans can't be the bottleneck: rethinking review in the agentic SDLC"
date: "2026-03-21"
summary: "AI is producing code faster than humans can review it. The answer is not to slow it down. It is to change what review means, invest in pipelines and tooling that maintain quality at machine speed and keep engineers close enough to their systems to make informed decisions."
published: true
tags: ["engineering", "AI", "architecture"]
---

The unit of output is changing.

Early AI tools produced snippets. A function here, a completion there. The developer still did the structural work, deciding what to build and how it connected to the rest of the system.

That model is already outdated. An engineer describes a change. An agent reads the repository, understands the structure, breaks the work into tasks, implements each one, runs validation and delivers a pull request. This is not theoretical. Stripe's "Minions" and Spotify's "Honk" are AI systems embedded into engineering workflows, producing real changes against real repositories. Claude can decompose work into specialised subagents for planning, implementation and validation.

The output is no longer a code suggestion. It is a finished unit of work. And it arrives faster than any human can review it.

That is the problem worth talking about.

---

## Human review does not scale

The instinct when AI produces more code is to review more carefully. Break changes into smaller pull requests. Limit the scope of generated work. Gate everything on human approval.

This does not scale. If AI systems can generate, validate and iterate faster than a team can review, then insisting on human review for every change turns review from a safeguard into a constraint. The bottleneck is no longer implementation. It is us.

The uncomfortable implication: we cannot keep doing code review the way we have always done it and also benefit from what AI offers. Something has to give.

The answer is not to remove human oversight. It is to change its shape.

---

## Pipelines and testing have to carry the weight

If humans cannot review every line, something else must catch the problems. That means our pipelines and testing infrastructure become load-bearing in a way they have never been before.

This is where most teams are underinvested. A CI pipeline that runs a linter and a handful of unit tests was adequate when humans wrote and reviewed every change. It is not adequate when AI is producing pull requests at machine speed.

What has to get stronger:

**Testing depth and coverage.** AI can generate tests, but deciding what to test and where confidence should come from is still a human concern. Test suites need to be comprehensive enough that a passing pipeline genuinely means the change is safe. If your tests do not catch regressions, no amount of human review will compensate at this velocity.

**Security analysis as a pipeline stage.** AI-generated code introduces new attack surfaces. If an agent can write to a repository based on natural language input, adversarial prompts and subtle vulnerabilities become real concerns. Security scanning cannot be an afterthought bolted onto quarterly audits. It needs to run on every change.

**Architectural validation.** Code that passes tests and security scans can still be structurally wrong. It can introduce coupling, violate boundaries, duplicate logic in ways that compound over time. Tooling that detects architectural drift is not a luxury. It is a requirement.

**Quality metrics that surface what matters.** Instead of reviewing every diff, engineers need dashboards and signals that tell them where attention is needed. Coverage gaps, complexity trends, dependency changes, pattern violations. The human role shifts from gatekeeping individual changes to monitoring the health of the system.

This is not optional. If teams adopt agentic workflows without strengthening their pipelines, they will ship faster and break more. The speed that AI offers is only as valuable as the infrastructure that validates what it produces.

---

## Engineers must stay close to the system

There is a subtler risk that does not get enough attention.

If engineers spend less time writing code, they lose familiarity with the systems they are responsible for. Understanding how a system works comes from direct interaction with it. Reading it, changing it, debugging it. Take that away and knowledge erodes.

It is easy to imagine a workflow where an engineer spends their day writing prompts, reviewing summaries and approving pull requests without ever opening the actual code. That works until something breaks in a way that requires genuine understanding. A production incident. A performance cliff. An architectural decision that depends on knowing why the system was built the way it was.

This requires deliberate effort:

- Periodic deep reviews where engineers read through AI-generated changes in detail, not to approve them, but to maintain understanding
- Architecture sessions that go beyond the current sprint and force engagement with how the system is evolving
- Documentation that stays current, because in this model it is not just a reference for other humans. It is context for AI systems and a record of decisions that may otherwise be lost
- Tooling that provides continuous visibility into how the codebase is changing. Not just diffs, but trends. What is growing, what is drifting, where complexity is accumulating

I built [Implera](https://implera.ai) partly to explore this problem. Not the code generation side, but the visibility side. How do you keep engineers informed about what AI is producing without requiring them to review every line? That question is still open, but it is the one I think matters most.

---

## What orchestration actually looks like

The role of the engineer is shifting from writing code to shaping the system that produces it.

In practice, this means spending more time on things that used to be secondary. Defining constraints clearly enough that an AI can implement them. Writing specifications that encode security requirements, performance expectations and architectural patterns. Designing test strategies that validate intent, not just correctness.

Prompt design is an engineering skill now. Not in the superficial "write better prompts" sense, but in the sense that a poorly defined specification does not just produce low-quality code. It introduces risk. The prompt is the spec. If it is ambiguous, the output will be too.

It also means thinking about the system around the AI. What guardrails exist. How incorrect but plausible changes are detected. How consistency is maintained across dozens of generated changes a day. This is systems engineering applied to the development process itself.

---

## The shift is real and it is early

The tools are improving faster than our practices are adapting. Most teams are still treating AI as a faster way to write code. The ones that will benefit most are treating it as a reason to rethink their entire delivery pipeline.

That means stronger testing. Better observability. Clearer specifications. And a deliberate effort to keep engineers close enough to their systems to make informed decisions when it matters.

Human review does not go away. But it cannot remain the primary quality gate. The teams that figure out what replaces it will move faster without losing control. The teams that do not will either slow down to maintain quality or speed up and lose it.

That is the choice in front of us.
