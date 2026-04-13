---
title: "Reuse knowledge, not code"
date: "2026-04-13"
summary: "DRY was shaped in a world where writing code was expensive. That world is ending. A look at why shared abstractions break at scale, what AI changes about the cost of duplication and why reusing knowledge matters more than reusing code."
published: true
tags: ["engineering", "AI", "architecture", "opinion"]
---

I have spent the better part of two decades building UI systems. From individual components to large scale platforms, from writing code myself to leading teams responsible for how hundreds of engineers ship it.

One thing becomes very clear as you scale.

Building systems is hard. Building systems at enterprise scale is mind bending.

At some point, the problems stop being technical in the narrow sense. They become organisational, behavioural and more often than we admit, philosophical.

This is where our engineering principles start to matter. And also where they start to break.

---

## The comfort of DRY

Most of us were raised on a simple idea:

> Don't repeat yourself.

It has been treated as a kind of engineering hygiene for decades. If two teams build something similar, we abstract it. If a third team needs it, we generalise it. Eventually, we extract it into a shared package and call it progress.

On paper, this makes sense. Less duplication. One source of truth. Centralised fixes.

At small scale, it often works.

At the scale of hundreds of engineers, it frequently does not.

Shared abstractions tend to follow a predictable path. They start simple and useful. They accumulate edge cases from different teams. They become harder to test and reason about. They slow down change because every modification carries wider impact. They turn into a coordination problem disguised as a code problem.

What began as reuse becomes coupling. And coupling at enterprise scale is not a minor inconvenience. It is a delivery risk.

I have watched this happen first hand. A shared component library that started as six well-scoped primitives grew over three years into a tangled dependency that served fourteen teams. Every release required coordination across four time zones. A single button variant change took eleven weeks from proposal to production because the blast radius touched every consumer. Teams stopped requesting changes and started building workarounds. The library that was meant to accelerate delivery became the thing slowing it down.

That is not an edge case. At enterprise scale, it is the norm.

---

## The cost we do not talk about

We talk endlessly about the cost of duplication. We rarely talk about the cost of the wrong abstraction.

Sandi Metz wrote about this a decade ago in [The Wrong Abstraction](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction), and the argument has only become more relevant since:

> "Duplication is far cheaper than the wrong abstraction."

Metz describes a pattern I have seen play out dozens of times. A developer finds duplication and extracts it into a shared abstraction. Requirements shift. The abstraction no longer fits perfectly, but it exists, so the next developer adds a parameter. Then a conditional. Then another. Each change is small and rational in isolation. But the abstraction accumulates scar tissue until it is incomprehensible, and nobody dares touch it because the blast radius is unknown.

The psychological trap is identified clearly. Developers feel pressure to preserve existing code because complicated code looks like it represents significant effort. The sunk cost fallacy keeps teams building on top of broken abstractions rather than unwinding them.

The recommendation is direct: when the abstraction is wrong, the fastest way forward is back. Inline the code. Delete what is unnecessary. Start again from what you actually need now, not what someone needed three years ago.

I agree with all of that. But I think the ground has shifted further than even that framing accounts for. Metz was arguing for a healthier relationship with abstraction. Recognise when it is wrong, unwind it, try again. What I am arguing is that the economics of software have changed enough that our default should shift. Not from bad abstractions to better ones, but from shared implementation as the default to shared knowledge as the default. That is a bigger move, and it requires a different set of practices to support it.

---

## What has changed

For a long time, abstraction was our primary tool for managing complexity. If you could not afford to write something twice, you made sure you only wrote it once.

But the economics have changed.

AI has altered the cost profile of software development in a real and measurable way. Generating well-structured code from a clear specification is now fast. Re-implementing a piece of logic that took a developer hours in 2020 can take minutes in 2026.

I want to be precise about this, because it matters. AI has reduced the cost of producing code. It has not equally reduced the cost of producing *correct* code. Generated implementations still need testing, review and integration. Debugging AI-generated code that looks plausible but behaves subtly wrong is a real cost that teams are learning about the hard way. The economics have shifted, but they have not collapsed.

What has changed decisively is the ratio. Writing code used to be the expensive part. Now it is one of the cheaper parts. The expensive parts are coordination, integration, understanding and maintenance. Those costs have not moved.

This is the shift I think we are only just starting to reckon with. We are still optimising for a cost structure that no longer applies.

---

## Reuse knowledge, not code

If code is significantly cheaper to produce, then the value of sharing implementations diminishes relative to the cost of maintaining them. What remains valuable is sharing understanding.

That leads to a different default:

> Reuse knowledge, not code.

Instead of asking "how do we share this implementation?", the better question becomes:

- What is the canonical way this should behave?
- What constraints matter?
- What are the non-negotiables?

Then we make that knowledge easy to access, easy to consume and easy for both humans and AI to apply.

This is a subtle but important shift. We move from sharing artefacts to sharing intent. From distributing packages to distributing principles.

A design system is a useful example, though an imperfect one. The valuable part of a design system was never really the npm package. It was the decisions encoded within it. Spacing scales, colour semantics, interaction patterns, accessibility requirements. Those decisions are knowledge. The code that implements them is a vehicle.

The obvious counter-argument is that the package *enforces* those decisions. Remove the package and you are relying on every team to correctly interpret a specification and implement it faithfully. That is a weaker guarantee and I am not going to pretend otherwise.

But consider what the stronger guarantee actually costs. A shared package at enterprise scale means version pinning across dozens of consumers, coordinated releases, migration guides, breaking change negotiations and a platform team that becomes a bottleneck for visual consistency. The enforcement is real, but so is the drag. The question is not whether enforcement has value. It is whether the coordination cost of that enforcement exceeds the cost of occasional drift. In my experience, at sufficient scale, it often does.

---

## Duplication is not the enemy

Duplication, in the right places, is not a failure. It is a way of preserving local clarity.

When a team owns a domain, it should be able to express its logic in terms that make sense for that domain. Forcing everything through a shared abstraction often obscures that clarity and creates dependencies that slow teams down for the sake of a principle that was never meant to be absolute.

In an AI-assisted world, duplication becomes more viable than it used to be. Code can be generated quickly from well-defined patterns. Teams can move without waiting on central changes or negotiating with a shared library's backlog. Implementations can be re-derived from context rather than imported from a package that carries the weight of every team's edge cases.

But this only works if we are disciplined about where duplication is acceptable and where it is not.

Some things should not be duplicated:

- Security-sensitive logic, particularly authentication, authorisation and token handling
- Business rules with regulatory or compliance implications
- API contracts and shared domain types that define how services communicate
- Accessibility guarantees that carry legal obligation
- Design tokens and visual primitives that define brand
- Core interaction patterns that users rely on for consistency
- Data models that must remain consistent across services

These are not just technical concerns. They are product, legal and trust concerns. Getting authentication wrong in one team's local implementation is not a minor inconsistency. It is a vulnerability. Diverging on a data model that feeds a regulatory report is not drift. It is a compliance failure.

The line is not always clean, and reasonable people will disagree about where exactly it falls. But the principle is: the higher the cost of inconsistency, the stronger the case for a shared implementation with proper governance. Everything else is a candidate for local ownership.

Abstraction still has a place. It just needs to be applied deliberately, not reflexively. The question should always be: does this abstraction reduce coordination cost, or does it create it?

---

## From enforcement to observability

If we move away from shared code as the default, we need a different mechanism for staying aligned.

The traditional model is enforcement. Everyone uses the shared package. Compliance is checked at build time. Divergence is a linting error.

The alternative is observability. Instead of enforcing reuse upfront, we monitor and understand what exists across the organisation.

At scale, we should be able to answer:

- Where does similar logic exist across teams?
- How has it diverged?
- Where are inconsistencies emerging that actually matter?
- When a bug is fixed in one place, where else does the same pattern exist?

I want to be honest about where this stands. The tooling to do this well at enterprise scale is still emerging. We are not in a world where you can point a tool at two hundred repositories and get a reliable map of semantic duplication and meaningful drift. Some of the building blocks exist. Static analysis can find structural similarities. AI can compare implementations against a specification. But the integrated platform that makes this a workflow rather than a research project is still ahead of us.

That does not make the direction wrong. It means this is a bet, and one I think is worth making. The trajectory of AI-assisted code analysis is clear. The cost of building these capabilities is falling faster than the cost of maintaining shared abstractions at scale. Organisations that invest in this tooling now will be better positioned than those that double down on monolithic shared libraries.

What this looks like in practice today is more modest: regular cross-team reviews, automated checks for known anti-patterns, shared dashboards that surface divergence in key areas. Not the full vision, but a meaningful start.

---

## The remediation problem

This is the question I get asked most often, and it is a fair one.

If fifty teams each have their own implementation of a pattern and a critical security vulnerability is discovered in that pattern, what happens next? With a shared library, you bump the version and every consumer picks it up. Without one, you have fifty codebases to update.

This is a real cost of the model I am describing. It would be dishonest to minimise it.

But the shared library story is not as clean as it sounds either. In practice, "bump the version" means: publish the fix, communicate the urgency, wait for fifty teams to update their dependency, handle the ones that are pinned to an older version, deal with the teams whose builds break because of an unrelated change that shipped in the same release and manage the three teams that are two major versions behind and cannot upgrade without a migration. I have lived through this. It is not a one-line fix. It is a project.

The alternative in a knowledge-first model is different but not necessarily worse. If you have strong observability, you can identify every instance of the affected pattern across the organisation. AI can generate targeted patches for each implementation, accounting for local context. The patches can be raised as pull requests against each repository, reviewed by the owning team and merged independently. No shared dependency chain. No cascading version conflicts. No waiting for a coordinated release.

Is that more work than a clean version bump? Possibly. Is it more work than how version bumps actually play out at enterprise scale? I am not convinced it is.

The honest answer is that neither model handles critical cross-cutting fixes elegantly. The shared library model centralises the fix and distributes the upgrade pain. The knowledge-first model distributes the fix and centralises the detection. Pick the pain you can manage.

---

## The role of platform teams

None of this works without strong platform investment.

If we are asking teams to rely less on shared packages, we must give them better alternatives:

- A well-maintained source of truth for design and interaction principles
- Tooling that surfaces patterns and inconsistencies across codebases
- High quality examples and specifications that AI systems can use as context
- Mechanisms to propagate fixes and improvements without requiring package upgrades
- Clear ownership of the "do not duplicate" list and the governance around it

The responsibility shifts. We are no longer curating shared code. We are curating shared context.

That is genuinely harder in some ways. Code is concrete. You can version it, test it, publish it and validate it in CI. Context is softer. A specification document can go stale without anyone noticing. A set of design principles can be interpreted differently by different teams, or by different AI models on different days.

This is not a minor concern. If the whole argument rests on "share knowledge instead of code", then the quality, accuracy and currency of that knowledge becomes load-bearing. Platform teams in this model need to treat their documentation and specifications with the same rigour they currently apply to their packages. That means versioning, review processes, automated validation where possible and a clear deprecation path when guidance changes.

It also means accepting that AI systems will not always produce consistent implementations from the same specification. Two teams feeding the same design principles into different models, with different prompts and different surrounding context, will get different output. That is the nature of the tool. The question is whether those differences matter. If your specification defines the constraints clearly enough, the variations should fall within acceptable bounds. If they do not, that is a signal that the specification needs to be tighter, not that you need a shared package.

---

## Where this breaks

I am not going to pretend this is without risk.

Duplication increases the surface area for drift, inconsistent behaviour and repeated mistakes. Without strong observability and clear standards, things will fragment. I have seen organisations attempt to give teams autonomy without investing in the tooling and governance to make it work. The result is not distributed ownership. It is distributed chaos.

This model also places a higher burden on individual engineers to make good local decisions. Not every team has the experience or judgement to know when they are diverging in ways that matter. In a shared library model, the library makes that decision for them. Removing it means something else has to fill the gap.

And there is a maturity threshold. Organisations that lack strong platform teams, consistent engineering standards and a culture of documentation will not succeed with this approach. If your teams cannot maintain a README, they will not maintain a knowledge-first model. This is not a shortcut away from discipline. It is a different form of discipline that requires more organisational maturity, not less.

This is not an argument for less rigour. It is an argument for moving rigour to a different layer. Away from compile-time enforcement of shared dependencies and toward continuous awareness of how systems actually behave.

---

## Rethinking our defaults

DRY has served us well. But it was shaped in a world where writing and maintaining code was the dominant cost of software development.

That world is ending. Not overnight, and not uniformly. But the direction is clear.

As Metz put it, "prefer duplication over the wrong abstraction." I would go further. In a world where AI can produce code at dramatically lower cost, prefer duplication over most abstractions, unless the abstraction is genuinely reducing coordination overhead rather than creating it. That is a stronger claim than Metz was making, and I am making it deliberately. The economics that justified aggressive abstraction have shifted enough that our defaults should shift with them.

The teams that will move fastest are not the ones with the most shared libraries. They are the ones with the clearest shared understanding. Organisations that invest in high quality specifications, strong observability and platform teams focused on context rather than code will outpace those still trying to govern delivery through package dependencies.

This requires something uncomfortable. It requires admitting that principles we built careers on may no longer serve us the way they once did. Not because they were wrong, but because the conditions that made them right have changed.

DRY is the most visible example, but it is not the only one. The instinct to centralise, to standardise, to enforce consistency through shared tooling rather than shared understanding, runs deep in how we think about engineering at scale. Questioning it is not recklessness. It is the job.

The way we build software is changing. At enterprise scale, we cannot afford to pretend otherwise.
