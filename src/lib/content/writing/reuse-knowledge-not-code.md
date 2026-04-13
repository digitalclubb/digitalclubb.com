---
title: "Reuse knowledge, not code"
date: "2026-04-13"
summary: "DRY was shaped in a world where writing code was expensive. That world is ending. A look at why shared abstractions break at scale, what AI changes about the cost of duplication and why reusing knowledge matters more than reusing code."
published: true
tags: ["engineering", "AI", "architecture", "opinion"]
---

A shared component library that started as six well-scoped primitives grew over three years into a tangled dependency that served fourteen teams. Every release required coordination across four time zones. A single button variant change took eleven weeks from proposal to production because the blast radius touched every consumer. Teams stopped requesting changes and started building workarounds.

The library that was meant to accelerate delivery became the thing slowing it down.

That is not an edge case. At enterprise scale, it is the norm. And it starts with a principle most of us have never seriously questioned.

---

## DRY was built for a different cost structure

Don't Repeat Yourself made sense when writing code was expensive. If you could not afford to write something twice, you made sure you only wrote it once.

But shared abstractions follow a predictable decay. They start simple. They accumulate edge cases from different teams. They become harder to reason about. Every modification carries wider impact. What began as reuse becomes coupling and coupling at enterprise scale is a delivery risk.

Sandi Metz identified this a decade ago in [The Wrong Abstraction](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction):

> "Duplication is far cheaper than the wrong abstraction."

Sandi described the pattern precisely. A developer extracts duplication into a shared abstraction. Requirements shift. The next developer adds a parameter. Then a conditional. Each change is rational in isolation. But the abstraction accumulates scar tissue until nobody dares touch it because the blast radius is unknown.

Sandi argued for a healthier relationship with abstraction. Recognise when it is wrong, unwind it, try again.

I am arguing something different. The economics have shifted enough that our default should change.

---

## What has changed

AI has altered the cost profile of software development. Generating well-structured code from a clear specification is now fast. Re-implementing logic that took a developer hours in 2020 can take minutes in 2026.

To be precise: AI has reduced the cost of producing code. It has not equally reduced the cost of producing *correct* code. Generated implementations still need testing, review and integration. The economics have shifted, but they have not collapsed.

What has changed decisively is the ratio. Writing code used to be the expensive part. Now it is one of the cheaper parts. The expensive parts, coordination, integration, understanding, maintenance, have not moved.

We are still optimising for a cost structure that no longer applies.

---

## Reuse knowledge, not code

If code is cheap to produce, the value of sharing implementations diminishes relative to the cost of maintaining them. What remains valuable is sharing understanding.

Instead of asking "how do we share this implementation?", the better question becomes: what is the canonical way this should behave? What constraints matter? What are the non-negotiables?

A design system makes this concrete. The valuable part was never the npm package. It was the decisions encoded within it. Spacing scales, colour semantics, interaction patterns, accessibility requirements. Those decisions are knowledge. The code that implements them is a vehicle.

The obvious counter-argument: the package *enforces* those decisions. Remove it and you are relying on every team to correctly interpret a specification.

That is a weaker guarantee. But consider what the stronger guarantee actually costs. A shared package at enterprise scale means version pinning across dozens of consumers, coordinated releases, migration guides, breaking change negotiations and a platform team that becomes a bottleneck for visual consistency. The enforcement is real, but so is the drag.

The question is not whether enforcement has value. It is whether the coordination cost of that enforcement exceeds the cost of occasional drift. At sufficient scale, it often does.

---

## What this looks like in practice

This is where most "rethink DRY" arguments stop. Here is what it actually takes.

**Specifications become the product.** Platform teams stop shipping packages and start shipping specifications that are precise enough for both humans and AI to implement from. Not vague design principles. Versioned, testable definitions of behaviour, constraints and acceptance criteria. If your specification is ambiguous enough that two engineers would interpret it differently, it is too loose for AI to implement reliably.

**Observability replaces enforcement.** Instead of enforcing reuse at build time, you monitor what exists across the organisation. Where does similar logic exist? How has it diverged? Where are inconsistencies emerging that actually matter? The tooling for this at enterprise scale is still maturing, but the building blocks exist: static analysis for structural similarity, AI for comparing implementations against specifications. Organisations investing here now will be better positioned than those doubling down on monolithic shared libraries.

**The "do not duplicate" list is explicit.** Some things should never be locally owned:

- Security-sensitive logic: authentication, authorisation, token handling
- Business rules with regulatory or compliance implications
- API contracts and shared domain types
- Accessibility guarantees with legal obligation
- Data models that must remain consistent across services

These are not just technical concerns. Getting authentication wrong in a local implementation is a vulnerability. Diverging on a data model that feeds a regulatory report is a compliance failure. The higher the cost of inconsistency, the stronger the case for a shared implementation with proper governance. Everything else is a candidate for local ownership.

**Remediation changes shape.** The hardest question: if fifty teams each have their own implementation and a critical vulnerability is found, what happens?

The shared library answer sounds clean: bump the version. In practice it means: publish the fix, communicate the urgency, wait for fifty teams to update, handle the ones pinned to older versions, deal with builds that break from unrelated changes in the same release and manage the three teams two major versions behind.

The knowledge-first alternative: strong observability identifies every instance of the affected pattern. AI generates targeted patches accounting for local context. Patches are raised as pull requests, reviewed by owning teams, merged independently. No shared dependency chain. No cascading version conflicts.

Neither model handles cross-cutting fixes elegantly. The shared library centralises the fix and distributes the upgrade pain. The knowledge-first model distributes the fix and centralises the detection. Pick the pain you can manage.

---

## Where this breaks

Duplication increases the surface area for drift, inconsistent behaviour and repeated mistakes. Without strong observability and clear standards, this model produces distributed chaos, not distributed ownership.

It places a higher burden on individual teams to make good local decisions. Not every team has the judgement to know when they are diverging in ways that matter. A shared library makes that decision for them. Removing it means something else has to fill the gap.

And there is a maturity threshold. Organisations that lack strong platform teams, consistent engineering standards and a culture of documentation will not succeed with this approach. If your teams cannot maintain a README, they cannot maintain a knowledge-first model. This is not a shortcut away from discipline. It is a different form of discipline that requires more organisational maturity, not less.

---

## The uncomfortable part

DRY has served us well. But it was shaped in a world where writing code was the dominant cost.

That world is ending.

The teams that will move fastest are not the ones with the most shared libraries. They are the ones with the clearest shared understanding. This requires admitting that principles we built careers on may no longer serve us the way they once did. Not because they were wrong, but because the conditions that made them right have changed.

The way we build software is changing. At enterprise scale, we cannot afford to pretend otherwise.
