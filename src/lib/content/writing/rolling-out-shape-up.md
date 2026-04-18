---
title: "Rolling out Shape Up in a large organisation"
date: "2026-04-18"
summary: "Shape Up promises uninterrupted delivery cycles, real cooldowns and a healthier relationship with backlogs. Rolling it out in an established organisation is harder than it looks. The parts that have worked, the parts that fight back and what I am still figuring out."
published: true
tags: ["engineering", "leadership", "process", "delivery"]
---

[Chris Boakes](https://chrisboakes.com/) introduced me to Shape Up while we were at Houseful. I was sceptical at first. Another methodology, new vocabulary, promising to fix what the last one left behind. Then we tried it. A first phase on a subset of teams, then wider. It is now in full swing across the organisation. Not perfect. Short-lived teams still wobble. But delivery is predictable and stakeholders are properly engaged in making bets rather than filling up sprints.

I am now introducing Shape Up at another established organisation. It is harder this time. This is what I have learned from both.

---

## What Shape Up actually is

Shape Up is Basecamp's alternative to Scrum and it is [documented openly](https://basecamp.com/shapeup) if you want the full reference. The short version.

Work happens in fixed cycles of uninterrupted delivery time. Between cycles, teams go into cooldown. Senior people shape pitches that describe a problem, a rough solution and a boundary. At the start of each cycle, a betting table decides which pitches get resourced. That is the bet. The team commits to landing the work at the shaped scope inside the cycle. If they cannot, scope is cut or the bet fails. Cycles do not extend.

Three ideas carry most of the value.

**Appetite replaces estimate.** The question is not "how long will this take?" It is "how much time is this worth?" One is a cost question. The other is a business question. Only the second produces commitment.

**Betting tables replace backlogs.** Stakeholders stop hoarding ideas and start committing to a small number of them. Every cycle is a fresh decision about what matters most.

**Circuit breakers replace scope creep.** If the cycle cannot hold the work, you stop. You do not slip. This sounds harsh until you experience how quickly teams learn to shape better when they know the cycle will not bail them out.

It is not revolutionary. Most of the individual ideas exist elsewhere. What Shape Up does is combine them into a system that protects focus and forces honest decisions about what to actually build.

---

## Why I think we need it

The Agile Manifesto was written in 2001. Scrum was formalised in 1995. Both predate modern cloud, modern frontends, distributed systems at the scale most companies now operate and the entire mobile era. They are older than most engineers on my team.

Software has become more complex, more interconnected and more dependent on third-party systems than anyone imagined when those frameworks were defined. The way we plan and ship has not really caught up. We still have standups, two-week sprints and backlogs that grow faster than anyone can refine them.

Shape Up is not the final answer. AI and agentic workflows are already changing the question again. But for now it is the first process I have used that feels designed for how modern software actually ships.

---

## What has worked

**Uninterrupted delivery time.** You cannot ship anything meaningful in a two-week sprint. Meaningful work means research, experimentation, iteration and real integration. Shape Up gives the team enough runway to actually deliver something of substance. That alone changes the quality of the conversation.

**Adapting the cycle length.** Basecamp uses six weeks. That is not gospel. We run two five-week cycles per quarter, with a two-week cooldown at the start of the quarter and a one-week cooldown between cycles. It is not perfect but it fits the shape of how the rest of the organisation plans. You can adjust without breaking the spirit of it. Pick a length that works for your delivery rhythm, not the one on the tin.

**Cooldowns are real time.** Self-development is usually paid lip service. Companies say "use 10% of your sprint" and nobody does because sprints feel too short to spare the hours. Shape Up bakes in dedicated cooldown time between cycles. That is when engineers pick up side investigations, fix the tooling that has been annoying them for months, explore something new or try a technology they have been reading about. It is also where innovation genuinely happens. Innovation does not arrive on a Jira ticket.

**A healthier relationship with backlogs.** Shape Up argues for decentralised lists and no central backlog. I have struggled with this one, especially leading centralised teams that support many product teams. But Shape Up is right that backlogs are a time sink. I have seen backlogs grow into thousands of issues nobody ever revisits.

What I have settled on. New items get added as they come up. During cooldowns, those items get two chances. If they do not make it into a cycle or get picked up during a cooldown across those two reviews, they are deleted. If it matters, it will come back. The list stays small. The priorities stay current. The effort we used to spend grooming a graveyard is gone.

---

## The shift that told me it was working

The clearest signal Shape Up was working at Houseful was not delivery pace. It was the shape of stakeholder conversations.

Before Shape Up, product and engineering argued about priorities and timelines. After Shape Up, we argued about appetite. "Is this worth six weeks to us?" is a different question from "can you do it in six weeks?" The first puts the stakeholder in the position of making a business trade-off. The second puts engineering in the position of defending an estimate. One produces commitment. The other produces negotiation.

Once stakeholders understood that a bet was a commitment to finish or stop, their behaviour changed. They shaped fewer pitches but shaped them better. They argued harder at the betting table and less during the cycle. Engineering stopped defending estimates and started defending the scope everyone had agreed to.

That was the shift. Everything else followed from it.

---

## Where it fights back

Rolling Shape Up out in an established organisation is where the theory meets the concrete.

**Quarterly planning is hard-coded.** The company expects quarters. Finance expects quarters. Leadership reports in quarters. Shape Up's pure form ignores that. We adjusted cycle length to land cleanly inside a quarter, which is a concession to reality. You can fight this battle or you can work with it. I chose to work with it.

**Disciplines are siloed.** This is the one that hurts most. In many established organisations design does its own thing. Backend and cloud engineers build APIs. UI engineers work from whatever design hands over. Shape Up assumes collaboration from the start. A team in a room, virtually or physically, shaping the work together. What can we realistically ship in five weeks? Where are the risks? What is the rough shape of the solution? Most large organisations are not structured for this. Discipline leaders have their own roadmaps, their own targets and sometimes their own processes. Getting cross-discipline collaboration onto shaping sessions takes more effort than the methodology suggests.

**Jira gets in the way.** The existing toolset was built around a traditional SDLC. Required fields, workflow assumptions, sprint artefacts everywhere. We worked around it in the short term until we understood enough to make small tweaks. I would not fight the tool first. Learn what you actually need, then adjust. Replacing Jira is a bigger project than changing how you deliver.

**Priorities change faster than cycles.** This is the one I am still wrestling with. Shape Up is supposed to give you stability by protecting the cycle. Quarterly planning is supposed to give you direction. In the AI era, company priorities shift more often than either of those rhythms assumes. You need short-term pivots without losing the longer company vision. I do not have a clean answer yet. What has helped is keeping cycle scope narrow enough that a mid-cycle pivot is painful but survivable. Keeping the vision explicit enough that any pivot has to justify itself against it.

---

## A playbook to try it yourself

Do not try to roll Shape Up out across the whole organisation at once. I have seen that fail. Start small, learn fast, share everything.

**Before your first cycle.**

- Pick two teams willing to experiment. Not ten. Change that works at small scale is cheap to expand. Change that fails at small scale is cheap to walk back.
- Agree a cycle length that fits your financial and leadership reporting rhythm. Six weeks is not mandatory. We run two five-week cycles inside a quarter with cooldowns around them.
- Pair each team with a senior engineer who can help shape pitches. Shaping is not a product manager's job alone. It needs technical judgement about what is actually buildable in the appetite.
- Find a programme manager willing to be your documentation and accountability partner. They are your political cover inside the wider organisation and the most underrated role in a rollout.

**Running the first cycle.**

- Hold a real betting table before the cycle starts. Write down what is in, what is out and why. Share it.
- Protect the cycle. No mid-cycle injections. If urgent work lands, it becomes a conversation about whether to kill an existing bet, not whether to stretch the cycle.
- Run a real cooldown at the end. Not catch-up time. Not an extra sprint. Protected time for self-development, tooling and exploration.
- Capture what shipped against what was bet on. The delta is your learning.

**After your first cycle.**

- Share the outcome widely. Engineering rollouts live or die on narrative. If nobody outside the two teams knows what happened, the experiment failed regardless of the result.
- Tune the rhythm. Cycle length, shaping process, cooldown use. Expect to adjust.
- Resist scaling too fast. Two more teams before ten.

Small, deliberate, documented. That is how new processes survive contact with a big organisation.

---

## Why I enjoy it

The reason I keep reaching for Shape Up is that it is honest.

It forces real conversations about scope and appetite instead of pretending estimates are predictions. It gives engineers protected time without having to negotiate for it. It treats disagreement about what to build as a feature of the process, not a blocker.

Standups and sprint planning ask "what are we doing today?" Shape Up asks "is this still the right bet?" The second question is harder to answer and more useful to the business. Every team I have run this with ends up shipping fewer things and caring more about what they ship. That is the outcome I want as an engineering leader.

---

## What AI changes

This is the open question. If [agentic workflows](/writing/agentic-sdlc) continue to shorten the time between specification and shipped code, do we still need cycles at all? Is this the return of continuous delivery and Kanban, with shaping happening on a much shorter loop?

I do not know yet. My instinct is that cycles still matter because humans still need protected time to think, collaborate and decide. Agents can produce code faster. They cannot decide what to build. The shape of the cycle may shrink, the cooldown may change character and the balance between human and agent work inside a cycle will keep moving.

For now, Shape Up is the process I reach for. It is the first one in a long time that feels like it respects both the complexity of modern software and the attention of the people building it.
