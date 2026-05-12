---
title: "Telling scams from the real thing, in plain English"
company: "isthisdodgy.co.uk"
role: "Built independently"
period: "2026"
summary: "A single-purpose scam checker. Paste a link, email address, phone number or message and get one of four plain-English verdicts, the reasons behind it and what to do next. No signup, no database, nothing about what you paste is stored."
order: 5
published: true
url: "https://isthisdodgy.co.uk"
---

## Context

UK consumers are bombarded with scam texts, phishing emails, dodgy delivery links and spoofed phone calls. The existing options are poor. People paste the thing into a generic URL scanner full of jargon and red warnings, ask in a Facebook group or just guess.

There is no calm, plain-English, UK-specific "is this dodgy?" answer in one place. And the people most exposed, elderly relatives and anyone acting under pressure, are exactly the ones who bounce off technical tools.

isthisdodgy.co.uk is deliberately small. Paste one thing: a link, an email address, a phone number or the text of a message. Get back one of four plain verdicts with the reasons behind it and what to do next. No signup, no ads, no analytics on what you paste, no database. The copy is hedged on purpose, because false confidence is its own harm.

## Problem

The problem is well known but badly served.

- **Generic tools are hostile to the people who need them.** Threat scores, jargon and walls of red are useful to a security analyst and useless to someone's nan.
- **The signal is UK-specific.** Royal Mail redelivery fees, HMRC tax refunds, "Hi Mum" WhatsApp messages, Winter Fuel rebates and TV Licensing. A generic scanner does not recognise the patterns that actually circulate here.
- **People decide under pressure.** Scams work by manufacturing urgency. The answer needs to be fast, clear and calm enough to break that.
- **There is no neutral place to ask.** The current choice is a Facebook group or a guess.

## Approach

### One box

There is a single input. The first job is working out what was pasted: a URL, an email address, a phone number, a message or something unrecognised. Classification is regex plus simple heuristics. An email is a single token with one `@`. A phone number is phone-shaped characters with six to fifteen digits. Anything longer and looser is treated as message text.

The same engine sits behind a JSON endpoint as well as the form, capped at 4,000 characters of input and 16 KB of request body, with a no-store cache header so nothing about a check lingers anywhere.

### Heuristics first

The core is a deterministic engine. Each check emits weighted reasons and the verdict is the sum.

- **URLs** are checked for raw-IP hosts, userinfo before the `@`, punycode, high-risk TLDs, very long or many-subdomain hostnames, random-looking domains, link shorteners, plain `http://` and brand impersonation: a hostname that mentions a bank or courier but is not on that organisation's real domain. Known official domains such as gov.uk, nhs.uk and police.uk get a negative weight.
- **Email addresses** are checked for disposable domains, auto-generated-looking local parts and brand impersonation in the local part or domain. Official domains get a negative weight. A normal address at a free provider gets a neutral note rather than a warning.
- **Phone numbers** are parsed to E.164 with libphonenumber-js, then checked against Ofcom ranges: 09xx premium, 084x and 087x service-rate, 070x personal numbers and international numbers claiming to be UK. Recognised official lines such as Action Fraud, HMRC and Royal Mail get a negative weight plus the caveat that the number on a screen can be spoofed.
- **Messages** are run against a library of ten named UK scam patterns, each a bundle of keyword regexes with a headline and tailored advice. Two signal hits is a match. Generic signals such as urgency language, requests for money or gift cards and shortened links add weight on top. Any URLs in the message body are extracted and run through the URL checks.

The point is that the heuristic core always produces a sensible answer on its own, with no network calls.

### Enrichment, never blocking

On top of the heuristics, an async layer queries external reputation sources. They run in parallel through `Promise.allSettled` with per-source timeouts of roughly 1.5 to 6 seconds. Each one returns a result with `failed` and `skipped` flags and never throws. If a service is slow, down or missing a key, the verdict still makes sense. It is just less informed.

Eight sources, four of which need a free key:

- **RDAP:** domain registration date, so a domain registered last week is weighted heavily and one older than three years gets a small negative weight
- **DNS:** does the site resolve, does the mail domain have an MX record
- **Google Safe Browsing:** malware and social-engineering flags
- **URLhaus:** known malware-distribution URLs
- **OpenPhish:** a community phishing-URL feed, refreshed every twelve hours and held in memory
- **StopForumSpam:** spam senders reported by email address
- **EmailRep.io:** email reputation and breach history
- **IPQualityScore:** fraud scores for URLs, emails and phone numbers, behind a circuit breaker that skips the endpoint for an hour if the quota is exhausted

There is no free public feed of UK crowd-sourced reported scam phone numbers. IPQS's abuse-network score is the closest freely available signal, and the privacy page says so plainly rather than implying more coverage than exists.

A couple of optimisations matter. If the input is already on a known official domain or line, per-address reputation lookups are skipped: a scammer cannot send from gov.uk, and a spoofed official number tends to collect spurious abuse reports. And the engine can be told to skip every network call, which is how the offline smoke test runs.

### Verdict model

Weights are summed into a score and mapped to one of four levels: probably safe under 10, be careful 10 to 29, looks suspicious 30 to 59 and likely dodgy 60 and above. The top four reasons are surfaced, most alarming first on a risky verdict and most reassuring first on a safe one, with a deterministic tiebreak so the same input always reads the same way. Every verdict carries default advice: forward scam texts to 7726, never share verification codes and report to Action Fraud. Stronger summary wording is only used when a specific named pattern actually matched.

"Probably safe" deliberately says it spotted nothing obviously dodgy and to stay alert if anything still feels off. It does not say "safe".

### A content site behind the tool

The tool is the product. The acquisition channel is a set of hand-written explainers for the common UK scam patterns and nine how-to guides: spotting a phishing email, scam-text warning signs, WhatsApp scams, why scammers use urgency, what to do after clicking a scam link, how to report a scam in the UK, protecting elderly relatives, avoiding investment scams and recovering after being scammed. These are prerendered, carry Article and FAQ structured data and sit in the sitemap. The on-demand `/url/[domain]` and `/number/[number]` pages are CDN-cached, with deliberately no stale-while-revalidate so a "safe" answer cannot be served for hours after a feed has flipped it to "dodgy".

### Technical decisions

SvelteKit with Svelte 5 runes and TypeScript, deployed on Vercel on the Node 22 runtime, a mix of prerendered pages and serverless functions. Biome for lint and format, pnpm, Vite. Key libraries are libphonenumber-js for phone parsing, tldts for Public-Suffix-List domain extraction and @vercel/og for the dynamic share image. The build date is injected at build time so the sitemap's lastmod tracks real deploys.

There is no database, no Redis and no auth. The only state that exists, caches, rate-limit buckets and the phishing feed, lives in memory scoped to the warm serverless container. The stack is consistent with my other side projects. With no infrastructure to manage, the whole thing is one person's evenings.

### Security and privacy

Every outbound request goes through a hardened fetch wrapper. Redirects are followed manually, at most three hops, and each hop is re-validated. The protocol must be http or https. It refuses to connect to localhost, private ranges and link-local addresses, which is where the cloud metadata endpoint lives, checking the literal hostname with a regex first and then the resolved IP numerically. Responses are size-capped.

API keys go in headers, never in URLs, so they cannot leak into proxy logs or error stacks. The one exception is IPQS, whose API only accepts the key as a path segment, where it is URL-encoded. Input is regex-validated before any external URL is built, so the same patterns lock the cache key, the outbound URL path and the upstream contract together.

Rate limiting is an in-memory fixed-window limiter, applied only to the expensive routes. Prerendered pages never touch it. It caps tracked keys and fails open when full, because evicting entries would just let an attacker churn them. It is per-container, not global, and that is documented honestly: it blocks the realistic abuse case, not a distributed flood. Swapping the map for a shared store is the obvious next step before the JSON API is publicised.

On privacy: input is processed in memory and discarded. No database, no analytics on what you paste. When you check a link or address it may be forwarded to one of the reputation sources, because that is what the lookup is, and the privacy page enumerates every external service a check might touch.

## Tradeoffs

### Heuristics over a model

A language model could read messages and catch phrasings the pattern library has never seen. The product does not use one.

The heuristic engine is explainable, free to run, works offline and never produces false confidence. Every weight has a named reason a person can read and disagree with. The cost is real: a genuinely novel scam, worded unlike any of the ten known patterns, may only be caught by the generic urgency and money signals rather than flagged outright. That is an acceptable trade for a tool whose whole value is being trusted.

### No database

There is no persistent store. Caches, rate-limit buckets and the phishing feed are all per-container and cold on a fresh instance.

This keeps the system tiny and removes a whole class of concerns. It also means rate limiting is not global and caches do not survive a deploy. For the current scale that is fine. Before the JSON API is promoted, the rate limiter needs a shared backend.

### Free sources only

Every external source is free, some behind a free key. There is no paid threat-intelligence subscription.

This keeps running costs near zero and the product honest about what it can see. The gaps are real, particularly the absence of any free UK scam-phone-number feed, and they are stated rather than papered over. A paid feed would improve phone coverage most.

### Calm over comprehensive

Four verdicts, hedged language, the top four reasons and nothing more. A technical user might want the full signal dump.

The product is built for someone acting under pressure, not for an analyst. Surfacing every weight would make it the noisy tool it exists to replace.

### Conservative weighting

A third-party risk score on its own cannot push a verdict to "dodgy" without corroboration, and a generic risk-score reason is suppressed when a specific flag has already fired.

This avoids double-counting and keeps false alarms down. It also means a single strong external signal, with nothing else behind it, lands as "suspicious" rather than "dodgy". Erring quiet is the deliberate choice.

### No monetisation

The tool is free, with no ads and no data collection, and the content site is the only growth lever. The repository is at v0.0.1.

This is early. If it gets traction the question of how it sustains itself is open, and the answer needs to not compromise the privacy position.

## Outcome

isthisdodgy.co.uk is live.

It does one thing: takes a pasted link, email address, phone number or message and returns a calm, plain verdict with its reasoning and a next step. Ten named UK scam patterns, around twenty-five impersonated brands, roughly thirty-five high-risk TLDs, eight reputation sources and four verdict levels. The deterministic core answers on its own and the external sources inform it without ever blocking it.

The technical footprint is deliberately minimal. No database, no auth, no queue. One SvelteKit app on Vercel, in-memory state and graceful degradation when anything external is unavailable. The known debt is small and documented: the rate limiter wants a shared backend before the API is promoted, and Google Safe Browsing v4 sunsets in March 2027, so a v5 migration is on the list.

The content layer, the scam explainers and the how-to guides, is the bet for reaching people through search rather than through anyone having to already know the tool exists.
