---
title: "Telling you whether to get in the water today, in one tap"
company: "isitsafetoswim.com"
period: "2026"
summary: "A single-page answer to a question whose data is scattered across seven feeds and four regulators. Tap once and it fuses the official bathing-water classification, today's pollution forecast, any sewage discharged nearby in the last 48 hours, recent rainfall and the latest bacteria readings into one plain verdict, Yes, Caution or No, for all 701 designated bathing waters in the UK."
order: 9
published: true
url: "https://isitsafetoswim.com"
---

## Context

You are standing at a beach, a lake or a river and you want to know one thing before you get in: is it safe to swim here today? The data to answer that exists. It is just scattered across seven feeds and four regulators, each speaking its own dialect, none of them answering the live, plain-English version of the question.

isitsafetoswim.com answers it in one tap. Share your location or type a postcode and it returns a single verdict, Yes, Caution or No, the one-line reason behind it, and the data it stands on: the official classification, today's pollution forecast, any sewage discharged nearby in the last 48 hours, recent rainfall, the latest bacteria readings and, on the coast, the sea temperature. It covers all 701 designated bathing waters across England, Wales, Scotland and Northern Ireland.

## Problem

The data is public. The fusion is not.

- **The system of record answers the wrong question.** The Environment Agency's Swimfo is organised around the annual classification, Excellent, Good, Sufficient or Poor. That is a multi-year statistical rating, updated each November. It tells you what a beach is usually like, not whether to get in today.
- **Sewage maps are pins, not verdicts.** The water companies' own storm-overflow maps, the national discharge maps and Surfers Against Sewage's alerts all show overflows in isolation. A map of pins, no verdict, and nothing tying a discharge to the bathing water nearest you. You have to interpret it yourself.
- **The apps solve a different problem.** Surf and water-quality apps tend to be paid, region-specific or focused on surf and tide rather than a clean is-it-safe answer.
- **Each source speaks part of the question in its own jargon.** Nobody fuses the annual classification, the daily forecast, live sewage and rainfall into one tap, one verdict, one sentence, UK-wide. That fusion is the product.

## Approach

### One question, one verdict

The product is a single page. Tap "Use my location", or type a postcode or place name, and you land on a ranked list of the closest designated bathing waters, each with a verdict pill. Open one and the answer renders as an editorial card: a tone-coloured stripe, the bathing-water name in a big serif, then a huge "Yes.", "Caution." or "No." with the plain-English reason beside it and an "Updated 2 minutes ago" line beneath. No accounts, no settings, no map of pins to decode.

Geolocation or a postcode resolves to a coordinate, postcodes through the free postcodes.io, and the nearest sites are found by great-circle distance over a pre-built index of all 701 waters.

### Seven feeds, fused

The verdict stands on seven live sources, fanned out in parallel per request.

- **Environment Agency (England) and Natural Resources Wales** share the same linked-data host: designated bathing waters, the annual classification, the daily pollution-risk forecast and the latest sample. Classification is annual, the forecast daily in season, the sample weekly in season. Both under OGL v3.
- **SEPA (Scotland) and DAERA (Northern Ireland)** publish sites and classification through ArcGIS, but no per-site daily forecast feed.
- **Nine water companies' storm-overflow feeds**, plus Thames Water's open v2 API, give near-real-time discharge status, event-driven and roughly every fifteen minutes.
- **EA flood-monitoring** gives the nearest rainfall station and its 24-hour total, hourly.
- **Open-Meteo Marine** gives the coastal sea-surface temperature from a roughly fifteen-minute model.

Two feeds earned their own handling. Thames Water, covering London and the tidal Thames, is on a separate, newly-opened, keyless v2 API; the old credentialed one is being retired. It returns coordinates as OSGB36 eastings and northings, which the site reprojects to WGS84. And the EA and NRW host geo-blocks non-UK IP addresses, which forced a hosting decision covered under technical decisions.

Everything is fetched live and edge-cached for five minutes, so the user always sees data that is at most a few minutes stale and each upstream is hit at most once per site per five minutes regardless of traffic.

### How a discharge becomes a verdict

Sewage discharges are matched to a bathing water by distance with recency gating. An overflow discharging now, or finished within the last 12 hours, within 5 km drives a No. One within 10 km in the last 48 hours drives a Caution. Older or further drops out. The rule is deliberately blunt because the honest claim is "something discharged near here recently", not "this exact plume reached this exact spot".

### Three tiers, worst signal wins

The verdict is one of three, with a "Hard to say" fallback if every live source is unreachable. It is a deterministic pure function, no model anywhere, with every branch pinned by unit tests. The logic is worst-signal-wins.

- **No.** Sewage discharging now or just finished nearby, or a Poor classification in season, or a latest sample over the high bacteria threshold, or the site is closed.
- **Caution.** A discharge within 10 km in the last 48 hours, or the daily forecast says raised risk, or heavy rain at a site the EA flags as rain-affected, or only Sufficient or unclassified, or an elevated sample, or out of bathing season.
- **Yes.** Excellent or Good, a clean sample, no sewage in 48 hours, forecast normal.

### The one judgement call

There is no statutory single-sample bacteria standard. The official classification is a multi-year percentile, not a pass or fail on today's water. So the site adopts the revised Bathing Water Directive percentile boundaries as proxy cut-offs, assesses both E. coli and intestinal enterococci and takes the worse of the two, with different thresholds for coastal and inland waters. That is an editorial proxy, not a regulator's line, and the site says so plainly rather than implying an authority it does not have.

### Technical decisions

SvelteKit 2 with Svelte 5 runes, TypeScript and vanilla CSS, deployed on Vercel. A build step compiles the roughly 700-site catalogue into static JSON and the pages are prerendered with ISR. Live data is fetched per request inside the verdict API, fanned out in parallel and edge-cached for five minutes with `s-maxage=300`, so there is no datastore and no stale snapshot to manage.

The one forced decision was hosting region. `environment.data.gov.uk`, which serves both EA and NRW, returns 403 to non-UK IP addresses. Vercel's default region is in the US, so the live fetch failed in production while passing locally. The fix was pinning the functions to London, `lhr1` on AWS `eu-west-2`, so egress is UK-geolocated.

There is no database, no cron and no backend state. The stack is consistent with my other side projects, and with nothing to keep running it ships from one person's evenings.

## Tradeoffs

### UK-wide over England-only

Covering all four regulators rather than just England is a deliberate choice, and it forces an honest asymmetry. England and Wales expose a daily pollution-risk forecast and weekly samples. Scotland and Northern Ireland do not publish a per-site daily forecast feed.

So Scottish and NI verdicts lean on the annual classification, rainfall and any directly observable sewage data, and are correspondingly less live than English and Welsh ones. The win is that the site answers the question anywhere in the UK. The cost is that the answer is sharper in some nations than others, and the site is honest about that rather than faking parity.

### Live fetch over a stored snapshot

An earlier version scheduled a GitHub Actions job to snapshot the feeds into blob storage on a timer. It was built, and then deleted once the London region fix made the live fetch work in production.

Fetching live and edge-caching for five minutes means there is no datastore, no snapshot to go stale and nothing to keep in sync. The cost is a hard dependency on the upstreams being reachable at request time, mitigated by the parallel fan-out, the "Hard to say" fallback and the five-minute cache that caps the load on any one source. For a site of this size that is the right bill to pay.

### A deterministic function over a model

A language model could weigh the signals and write a verdict. The product does not use one. The engine is a pure function with every branch named and tested.

The benefit is that every verdict is explainable, reproducible and free to run, and the same inputs always read the same way. The cost is that the rules are blunt instruments, the 5 km and 12-hour cut-offs especially, and a clever weighting might be more nuanced. For a tool whose whole value is being trusted, a verdict a person can read and disagree with beats one they have to take on faith.

### An editorial threshold over no answer

Because there is no statutory single-sample standard, the alternative to adopting the Directive percentile boundaries as a proxy would be to say nothing about a fresh sample at all.

Picking a cut-off lets the live layer do its job. The downside is that it is an editorial judgement standing in for a regulator's line that does not exist, so a sample near the boundary is a call the site is making, not a fact it is reporting. Stating that openly is the only honest way to use it.

### A pollution answer, not a safety answer

The single biggest limit is one of scope. The site answers a water-quality question, not a safety-of-the-water one. It says nothing about tides, currents, rip, depth, cold-water shock beyond temperature, jellyfish or your own ability. It is not a lifeguard.

And "no discharge shown" is not "definitely clean". Not every overflow is monitored, monitors go offline, coverage and latency vary by company, and a spill can reach the water before a monitor flips. The classification lags reality too, an annual percentile, so a Poor beach can be clean today and an Excellent one spiking, which is exactly why the live layer exists, but the baseline still anchors on a rating that is months old.

## Outcome

isitsafetoswim.com is live. Share your location or type a postcode and get one of three verdicts, Yes, Caution or No, with the reason and the data behind it, for any of the 701 designated bathing waters in the UK.

Seven feeds across four regulators fuse into one deterministic verdict: the official classification, the daily forecast, near-real-time sewage from ten company sources, hourly rainfall, weekly samples and coastal sea temperature. Data is fetched live, fanned out in parallel and edge-cached for five minutes. There is no database, no cron and no backend state. The functions are pinned to London so the UK-only feeds will answer at all.

The known limits are stated, not hidden. Scotland and NI are weaker for want of a daily forecast feed. The bacteria thresholds are an editorial proxy for a standard that does not exist. Sea temperature is a model, not a buoy. Out of season the official forecast stops and the verdict says so. A couple of edge cases remain on the list: brand-new 2026 river designations have no classification yet and read "Caution, no verified classification", and a handful of inland Scottish lochs are mis-tagged coastal in the catalogue. It fails safe, but it is a follow-up.

The brief was GOV.UK credibility filtered through editorial typography: warm paper, a serif verdict and a green, amber and red rule under the masthead echoing the three tiers. The honest answer is often Caution, and the site would rather say that, with its reasons, than a confident Yes it cannot stand behind.
