---
title: "Making AI-written code reviewable by default"
company: "Implera"
role: "Built independently"
period: "2026"
summary: "An AI development platform where every code change arrives as a GitHub pull request. The developer describes a change, the AI plans and implements it, and nothing ships without human review."
order: 2
published: true
url: "https://implera.ai"
---

## Context

AI code generation has improved quickly, but the way it integrates into real workflows has not.

Most tools rely on chat interfaces or inline copilots. That works for small completions, but breaks down for larger changes. Developers end up managing the session themselves, copying code between tools, creating branches manually and trying to make the output fit their codebase.

The deeper issue is trust. AI can produce plausible code, but plausible is not the same as correct. And correct in isolation is not the same as correct within an existing system.

Implera is built around a simple constraint. Every change should go through the same workflow as any other contribution. The output is always a GitHub pull request.

The AI reads the repository, plans the work, implements it in isolation, runs tests and opens a PR. The developer reviews and merges using the same process they already trust.

## Problem

AI code generation lacks context. Chat-based tools do not understand repository structure, naming conventions, test patterns or dependency choices. The output is generic and requires significant adjustment.

There is no real review surface. When code is generated inside an editor, review becomes informal. There is no structured diff, no discussion and no audit trail.

Sessions tend to drift. Without a planning step, the AI makes decisions about scope that were never intended.

Validation happens too late. Most tools generate code without running it, so issues are discovered after the code has already been introduced into the project.

## Approach

### Task-based interaction

Instead of a conversation, the developer describes a change. This can be a feature, a bug fix or a refactor, with references to specific files or patterns.

The developer defines intent, then steps away.

### Agent pipeline

The system is built as a set of specialised agents rather than a single model.

A Planner analyses the repository and breaks the idea into scoped tasks. An Engineer implements each task in line with the existing codebase.

On higher tiers:

- a Designer handles UI decisions
- a Code Reviewer checks quality
- a QA agent runs the test suite

This mirrors how engineering teams operate. Planning and implementation are treated as separate concerns.

### Isolated execution

Each task runs in its own environment. Changes do not interfere with each other and can be reasoned about independently.

### PR as the interface

The system never commits directly to a branch. Every change is delivered as a pull request with a clear description and focused diffs.

Branch protections are respected. The developer reviews, comments and merges through GitHub.

### Validation before review

Tests run before a pull request is created. Failures are surfaced in the execution logs, so problems are caught before review.

### Technical decisions

SvelteKit frontend, Supabase for authentication and data and the GitHub API for repository access and pull request creation.

Execution runs in isolated compute environments for each task.

## Tradeoffs

### Asynchronous workflow

This is not real-time pair programming. There is a delay between submitting an idea and receiving a result.

For small changes, a copilot is faster. Implera is designed for work that benefits from planning, isolation and review.

### GitHub-only

The platform is tightly coupled to GitHub. Other providers are not supported.

This limits adoption but allows deeper integration with pull requests, branch protections and review workflows.

### Small diffs

The planner favours smaller, focused changes to keep pull requests reviewable.

This can result in multiple PRs for a single idea, but improves clarity and reduces risk.

### Billing not yet live

Pricing tiers are defined but billing is not yet implemented. Early users can use the product without restriction.

The focus is on getting the workflow right before introducing payment.

## Outcome

The platform is live and operating on real repositories.

The pipeline produces pull requests that follow existing conventions and include tests.

The most useful signal is how developers respond. They review the output as they would any other contributor. They comment, request changes and merge selectively.

That behaviour is the goal. The system fits into existing workflows rather than replacing them.
