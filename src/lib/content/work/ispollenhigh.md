---
title: "The only question hay fever asks, answered fast"
company: "ispollenhigh.co.uk"
period: "2026"
summary: "A microsite that does one thing. Load it and it works out where you are and tells you whether pollen is high right now, with a grass, tree and weed breakdown, a five-day outlook and the dominant local species. No accounts, no ads, no blog."
order: 6
published: true
url: "https://ispollenhigh.co.uk"
---

## Context

A hay fever sufferer has one urgent question on a given morning: is pollen high where I am, right now, and which type? The existing options bury that answer inside a weather app, behind ads, content marketing or a multi-step interface.

ispollenhigh.co.uk does exactly one thing. It loads, works out where you are and tells you "yes, pollen is high" or "no" in plain British English, with a grass, tree and weed breakdown, a five-day outlook and the dominant local species. Fast enough to read before you have found your coat. No accounts, no upsells, no blog.

Historical charts, saved locations, push alerts, air quality, UV and multi-language are deliberately out of scope for the first version and noted as later phases.

## Problem

The answer is simple but badly delivered.

- **It is buried.** Pollen data sits two or three taps into a weather app, next to fourteen other things you did not ask about.
- **It is location-specific and time-specific.** "Pollen is high" only means anything attached to a place and a day, and the value the person needs is the one for this morning where they are standing.
- **Type matters.** Someone who reacts to grass does not care about a high tree count in March. Most tools give a single number rather than the breakdown.
- **The reader is in a hurry.** They are half-dressed, on a phone, deciding whether to take an antihistamine. The answer has to be the first thing on the screen, not the reward for navigating one.

## Approach

### One page, one answer

The answer is the page. On the homepage the visitor's location is resolved client-side and the verdict renders as the H1, filling roughly seventy per cent of a mobile viewport, date-stamped underneath like a newspaper, with the pollen index as a large editorial numeral. There is no dashboard, no sidebar, no chrome.

Around that sit 191 indexable pages: location pages for postcode areas, cities and Met Office regions (`/london`, `/sw`, `/region/south-east`), each server-rendered with the current reading and cached at the edge. The homepage is the only page that has to wait for the browser to say where it is.

### Three providers, one shape

Three data sources sit behind a single provider-agnostic reading, so the UI never sees a provider's quirks.

- **Google Pollen API** is the primary source: a five-day forecast keyed by the Universal Pollen Index, plus per-plant data with in-season flags. The Universal Pollen Index is mapped to a six-step level scale, from none through to very high, and up to two dominant in-season species are pulled per category when their index is high enough to matter. The key lives server-side only.
- **Open-Meteo's Air Quality API** is the free CAMS-derived fallback. It reports per-species pollen in grains per cubic metre; the adapter takes the daily maximum, maps the European species onto grass, tree and weed buckets and thresholds the counts into the same level scale using bands derived from the Met Office and Worcester NPARU methodology.
- **A deterministic synthetic stub**, seeded by date and coordinates, makes local development work with no API key and doubles as the zero-cost rollback mode: unset the key and the site serves clearly-labelled demo data with no spend.

Location comes from Vercel's IP geo headers on first paint, then from the browser's Geolocation API once the visitor taps to share it. Coordinates are only ever round-tripped through the edge function as a cache key, never stored.

### The cost lever

`/api/pollen` is the only endpoint the browser calls. It never talks to Google directly, so the key stays on the server. Before forming a cache key it rounds the coordinates to a roughly five-kilometre grid. That single decision is the difference between a free product and a £2,500-a-month bill, because pollen does not vary meaningfully below that resolution and the CDN can now serve thousands of nearby visitors from one upstream call. Non-canonical coordinates are 308-redirected to the bucketed URL, so an attacker cannot defeat the cache, and burn quota, by sending a stream of distinct floats that all resolve to the same bucket. The endpoint also snaps to the nearest known place name within fifty kilometres so the headline reads "in London" rather than "in your area".

Responses are cached for thirty minutes with a further hour of stale-while-revalidate, and carry a header naming the source so the UI can flag degraded mode. The pipeline is Google, then one retry on a 5xx, then Open-Meteo, then synthetic data marked stale, with a four-second timeout per provider. An in-memory token-bucket limiter caps a single IP at sixty requests a minute per region as defence in depth alongside the CDN cache and Google's own quota cap.

### A registry of places

The location registry hard-codes the sixteen Met Office pollen-forecast regions, around 120 UK postcode areas and the fifty largest cities by ONS population, each with a centroid used for both the live pollen call and the canonical URL. The per-location editorial copy, eighty to 120 words on the dominant local trees and grasses, the peak months and a cross-link to the region, is templated by region rather than hand-written 191 times: southern pages mention London plane and oak, northern ones birch and alder.

### Technical decisions

SvelteKit 2 with Svelte 5, TypeScript in strict mode, runes only for the few interactive pieces (search box, geolocation prompt, live refresh, install prompt) and no client-side router on first paint. Hosted on Vercel with the Node runtime on Fluid Compute, every function pinned to the London region because the audience is UK-only. Location pages use incremental static regeneration with a thirty-minute window, so hot pages serve as static HTML and the function only runs when the cache expires.

Plain CSS with custom properties: design tokens, a reset and a base layer, no Tailwind, lightningcss for minification. One self-hosted variable font, subsetted to woff2, preloaded, with size-adjust on the fallback to kill layout shift. Biome for lint and format, Vitest for tests across two projects, Node unit tests and happy-dom component tests. A hand-written service worker provides offline support. Analytics is Vercel's cookieless mode, mounted so client-side route changes are still counted, and there are no other third-party scripts.

There is exactly one environment variable, the Google API key. Without it the site self-degrades to synthetic data, so it always works. The stack is consistent with my other side projects, and with nothing to manage it ships from one person's evenings.

One detail worth calling out: `app.html` carries a tiny inline pre-paint script that checks localStorage for a returning visitor's cached coordinates and sets a `data-geo` attribute so CSS can reveal the skeleton from the very first paint, before the JS bundle has even downloaded. That script's bytes are pinned by a SHA-256 hash in the content security policy.

### Fast and indexable

The performance budget is strict and enforced. LCP under 1.5 seconds on throttled 4G mobile, CLS under 0.05, INP under 200 milliseconds, homepage HTML under 25 KB gzipped, client JS under 30 KB, the one font under 35 KB, Lighthouse 100 across all four categories. CI runs Lighthouse against the live production domain on every push to main and fails the build below a perfect score. The accessibility target is WCAG 2.2 AA: the answer is the first thing a screen reader announces and is carried in text rather than colour alone, primary text holds a 7:1 contrast ratio, tap targets are at least 44 by 44 pixels, and reduced-motion preferences kill all motion.

Each route gets a unique title and meta description whose text includes today's level, so the search snippet is fresh on every crawl. There is hand-written structured data on every page, with Place and GeoCoordinates on location pages and an FAQ block on the homepage answering real "people also ask" queries, a canonical link on every route and a sitemap whose lastmod is honestly today, because the copy genuinely references today's level. Per-location dynamic share images were attempted, hit a bundler incompatibility between @vercel/og and the SvelteKit Vercel adapter, and are documented in the runbook with the recommended alternatives.

### Security and privacy

A strict content security policy is generated per response, nonces on dynamic pages and hashes on prerendered ones, with script-src limited to self, the analytics origin and that one inline-script hash. Violation reports go to an internal endpoint that logs them and always returns 204. The usual hardening is in place: HSTS with preload, frame-busting, nosniff, a tight referrer policy, a permissions policy that allows geolocation only on the same origin, cross-origin opener isolation, and a year-long immutable cache on the fonts. JSON-LD is serialised with `<` escaped so a payload cannot break out of the script tag. There are no cookies and no third-party trackers, geolocation is never persisted server-side and the IP-based fallback location is not stored.

## Tradeoffs

### One thing, on purpose

The first version answers whether pollen is high, breaks it down by type, shows the five-day outlook and names the dominant local species. Charts, saved locations, alerts, air quality and UV are all out.

This keeps the surface tiny and the product instantly understandable. It also means a returning user who wants to track a trend has to look elsewhere for now. Those are real features, deferred deliberately rather than forgotten.

### Bucketed coordinates

Rounding to a five-kilometre grid means two people a few kilometres apart see the same reading.

Pollen does not vary meaningfully at that resolution, and the bucketing is what turns a per-request API cost into a near-zero one by making the CDN cache actually hit. The loss of precision is imperceptible. The cost saving is the whole business model.

### Templated copy over hand-written

The editorial paragraph on each location page is generated from a regional template, not written individually for 191 places.

A bespoke paragraph per city would read a little better. At 191 pages it would also be 191 things to keep accurate. Regional templates, plane and oak in the south, birch and alder in the north, are accurate enough and maintainable, which matters more than the marginal polish.

### The fallback is coarser

Google Pollen is the primary source, and the product is only as good as that data. When it is down the site falls back to Open-Meteo's CAMS data, which is lower resolution and maps a fixed set of European species onto the grass, tree and weed buckets.

The level scale stays the same across all three sources, so the headline always makes sense even in degraded mode. A coarser answer beats no answer. Building a UK pollen model from sensor data would be a more accurate product and an entirely different one.

### IP location until you tap

Without browser geolocation the homepage uses Vercel's IP geo headers, which can place someone a town or two off.

The fix is one tap to share precise location, and the page asks for that only on user action. For a first paint, an approximate "near you" from the IP beats making someone pick their location off a list before they have seen anything.

## Outcome

ispollenhigh.co.uk is live: 191 indexable pages, an answer on the homepage before the JS bundle has finished downloading, and a five-day outlook and species breakdown a tap away.

The whole thing is built to run on free or near-free tiers. Coordinate bucketing, a thirty-minute edge cache and incremental static regeneration keep the Google API call volume tiny, with the acceptance criteria requiring over a 90 per cent cache-hit rate under simulated traffic of ten thousand checks a day. There is one environment variable, and without it the site falls back to synthetic data rather than breaking. CI gates the perfect Lighthouse score on every deploy, and the runbook covers the failure modes that matter: source flips to the fallback, redirect loops, Lighthouse regressions.

The design is the part people notice: a British weather almanac, modernised. Warm off-white paper, printer's-ink text, a confident colour state for each pollen level, the answer set as the headline and the index as a big editorial numeral. One column, no sidebar, no dashboard, no generic gradient. The page is the answer.
