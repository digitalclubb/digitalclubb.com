---
title: "Structured decision-making without the research rabbit hole"
company: "Comparia"
role: "Built independently"
period: "2026"
summary: "A decision tool that replaces hours of tab-hopping with a structured comparison. Describe what you're deciding, set your priorities and get a scored recommendation with transparent reasoning."
order: 3
published: true
url: "https://comparia.ai"
---

## Context

Most non-trivial purchase decisions follow the same pattern. You start with a question, open a number of tabs, read conflicting reviews, compare specifications across different sites, then either make a quick decision or defer it altogether.

Search is not the problem. Finding information is easy. The difficulty is turning that information into something structured and useful.

Comparia focuses on that step. You describe the decision, define what matters and receive a structured comparison with a recommendation and clear reasoning.

## Problem

Research is fragmented. Information is spread across review sites, forums, manufacturer specifications and retail listings. Each source presents data differently and with its own bias.

Opinions conflict. One reviewer prioritises gaming performance, another focuses on colour accuracy. There is no shared framework, so comparisons are difficult to trust.

Decisions become harder over time. The more options you consider, the less certain the outcome feels.

Most tools are not personalised. Rankings are based on general criteria rather than what the individual actually cares about.

## Approach

### Three-step interaction

The flow is deliberately simple:

- Describe the decision in natural language
- Set priorities using relative importance
- Receive a scored comparison with a recommendation

Each option is scored against the chosen criteria. Scores are weighted by the user's priorities and combined into a final ranking.

### Transparent reasoning

Every score includes an explanation. The recommendation shows how it was derived.

This was a deliberate choice. Opaque recommendations are difficult to trust. Showing the reasoning allows users to challenge or adjust the result.

### Scoring engine

Score generation is split into two layers. GPT-4o-mini generates initial scores from 1 to 10 per option per criterion. These are stored in the database. A deterministic weighted-average engine then calculates final results: each criterion's weight as a proportion of total weight, multiplied by the raw score, summed across all criteria. Strengths and weaknesses are derived automatically from scores relative to the set average.

The LLM step is non-deterministic. Two identical queries can produce different initial scores. But once scores are stored, the calculation is fully reproducible. The creative judgement comes from the model. The maths is transparent and auditable.

### Pre-built comparisons

Alongside the custom flow, the product includes around 44 hand-authored comparison pages covering common categories such as televisions, laptops and smartphones.

These are fully static Svelte pages with hardcoded product data, scores and narratives. They are not connected to the database or AI service. Maintenance is manual. They provide immediate value, demonstrate how the system works without requiring input and drive organic search traffic.

### Technical decisions

SvelteKit frontend, Supabase for authentication and data and OpenAI for analysis. Deployed on Vercel with the marketing site and application on separate subdomains.

Authentication uses the PKCE flow with HTTP-only cookies.

The AI relies entirely on GPT-4o-mini's training data. There is no web search, RAG pipeline or live product feed. When a user pastes a URL, the server fetches that page, extracts structured data from title, meta tags, JSON-LD and the first 6000 characters of text and passes it to the model for enrichment and scoring. This is user-initiated, not automated.

### Monetisation

The product is free to use. Revenue comes from affiliate links to retailers.

The integration is rule-based. The system detects the decision category from the title and generates appropriate links. Product decisions link to Amazon Associates search URLs. Travel decisions link to Booking.com and Expedia. Property decisions link to Zoopla and Rightmove.

Affiliate relationships do not influence scores or rankings and this is stated explicitly on every comparison.

## Tradeoffs

### AI-dependent output

Recommendation quality depends on the underlying model and available data.

For well-documented consumer products this works well. For niche or recently released products, the system may have limited information. In those cases, uncertainty is surfaced rather than hidden.

### Free-only model

There is no paid tier. Revenue relies on affiliate conversion.

This keeps the product accessible but introduces a dependency on user behaviour. If that does not scale, the model would need to change.

### UK-first content

Pre-built comparisons focus on UK pricing and availability.

The core system works internationally, but the editorial layer is intentionally localised.

### Simplicity over control

The interaction model limits how much users can configure.

More advanced controls could be added, but the goal is to provide an answer quickly rather than replicate a spreadsheet.

## Outcome

The product is live and used for decisions across consumer electronics, education, career choices and property.

The comparison library drives organic traffic and allows users to understand the system without signing up.

The most consistent feedback relates to transparency. Users trust the output because they can see how each recommendation is constructed.
