---
title: "One word for whether electricity is cheap right now"
company: "ispowercheap.co.uk"
period: "2026"
summary: "One huge word that answers 'is it cheap to use electricity right now?'. For the 95% of UK households on a flat rate the honest answer is about carbon intensity, not money, so that is what it shows, with a plain-English reason. The half-hourly minority get an opt-in price overlay."
order: 7
published: true
url: "https://ispowercheap.co.uk"
---

## Context

Someone is standing in the kitchen deciding whether to start the dishwasher, or walking home wondering whether to plug in the car. The question is: is it cheap to use electricity right now?

Nobody answered it well. The Octopus Agile tools show real half-hourly retail prices, but only around five per cent of UK households are on a half-hourly tariff. The carbon-intensity tools cover everyone but feel scientific and eco-niche, a dashboard rather than a domestic answer. Nobody had fused the two into a plain-English yes or no aimed at an ordinary household.

The insight is that for the other ninety-five per cent the bill is identical at 3am or 6pm, so "is electricity cheap?" cannot honestly be answered in money for them. It can be answered in carbon intensity: when wind and solar are meeting most of demand the grid is green, wholesale prices are low, and over time that pressure pushes fixed rates down. So the site says "yes, it's cheap" when carbon intensity is in the bottom national band, with a one-line human reason: "wind is meeting 62% of demand right now". There are four states, YES, SORT OF, NO and UNKNOWN, each rendered as one huge word filling the viewport on a background tinted to match.

## Problem

The honest answer for most people is not a price.

- **A flat unit rate does not change by the half-hour.** Telling a flat-rate household that electricity is "cheap" right now in pounds implies a saving that does not exist.
- **The existing tools split the audience.** Retail half-hourly prices serve the small Agile minority. Carbon dashboards serve the eco-curious. Neither speaks to a household just trying to make a decision.
- **The data that does cover everyone is presented as science.** Carbon intensity is public, national and regional, and updated every half hour, but it arrives as charts and indices, not as an answer.
- **People want a decision, not a chart.** Start the dishwasher or do not. Wait two hours or do not.

## Approach

### One word, one reason

The answer is one word. Four states, YES, SORT OF, NO and UNKNOWN, each set huge above the fold on a full-viewport background tinted to match, with a single line of human reasoning underneath and the mobile browser's address bar tinted the same colour. There is no logo, no navigation, no header and no cookie banner. The answer is server-rendered, so it is in the HTML before any JavaScript runs.

### Carbon, not money

Because the bill does not change by the half-hour for most households, the site does not pretend it does. It maps the Carbon Intensity API's index band straight onto the state: very low or low becomes YES, moderate becomes SORT OF, high or very high becomes NO, and a failed or stale fetch becomes UNKNOWN. The state is deliberately not computed on site. The API derives its bands from a UK-wide rolling distribution, which is more authoritative than anything worked out client-side and removes the need to hold thirty days of history. For the Agile minority there is an opt-in overlay showing their actual pence per kilowatt-hour.

The data comes from four sources, all free and most needing no key. The Carbon Intensity API (run by NESO, EDF, the University of Oxford and WWF, CC BY 4.0 with attribution required) provides the current national and regional half-hour readings and a 48-hour forecast, and is the primary source. The Octopus Energy API provides the optional Agile price overlay, server-proxied because it has no CORS headers, across the fourteen distribution-network regions. postcodes.io turns a postcode into an outward code and a coordinate. Vercel's edge geo headers give a first-paint default region with no prompt, accurate to the region for roughly seventy per cent of UK IPs. Every upstream fetch has a five-second abort timeout, so a slow upstream cannot pin the serverless function and inflate the bill, and any failure becomes UNKNOWN rather than a fabricated answer.

### Region without a prompt

Region resolution has a strict priority order: an explicit postcode in the URL always wins, then the Vercel IP postal-code header but only when the country is GB, then a GB national fallback. There is no geolocation prompt on page load, ever. First paint uses the IP header. A returning visitor who has already granted geolocation gets a silent precision upgrade after hydration: the code only calls the browser Geolocation API if a permissions query reports it is already granted, so a new visitor is never interrupted. Manual entry takes the outward part of the postcode only, SW1 or RG41, never the full thing, so it is not personal data.

### Caching is the backend

There is no database and no key-value store. Edge cache headers do all the caching, and the header set is a single function of where the region came from and what the state is. URL-derived and national answers are public with a short max-age and stale-while-revalidate, so they are shareable and hit the shared edge cache. IP-header-derived answers are private, so one user's region can never leak into another user's cached response. UNKNOWN gets a ten-second TTL, so a transient upstream blip does not get pinned for long. Unknown query parameters are 308-redirected to the canonical URL in a server hook, so a link with tracking junk appended collapses to one cache entry and cache-buster amplification does not work. Rate limiting is left to the Vercel WAF layer, because in-memory limiters on serverless are unreliable across cold starts. The security headers are set centrally in the same hook.

### Live, but only when you are looking

The page re-polls the current reading every five minutes, but only while the tab is visible. Hidden tabs pause, and returning to one triggers an immediate refresh. A state change cross-fades over 200 milliseconds. An outlook strip shows the upcoming cheapest and peak windows, which answers "should I wait?" and matters most in the SORT OF state. Action chips map common appliances to a typical run length, dishwasher two hours, EV full charge eight, immersion ninety minutes, scan the forecast for the cheapest window of that length, and show a tick if it starts now or a cross with the next start time.

### Technical decisions

SvelteKit 2 with Svelte 5, TypeScript in strict mode, pnpm, Biome for lint and format, Vitest for unit tests. Hosted on Vercel with the Node 22 runtime, deliberately not the edge runtime because the share-image route needs sharp. Vanilla CSS with custom properties, one global token file and scoped styles per component, no Tailwind. The headline word is Inter at weight 900, self-hosted and subsetted to about twelve glyphs, every letter that can appear in a state word, which comes to roughly 1.7 KB of WOFF2, preloaded and used only on that word; everything else is system-ui, so there is no layout shift and no font round-trip for body copy. Analytics is anonymous and cookieless, so there is no consent banner. The performance budget targets Lighthouse 100 across the board: HTML under 8 KB gzipped, total first load under 35 KB, LCP under half a second on 4G. The stack is consistent with my other side projects, and with nothing to manage it ships from one person's evenings.

### A PWA, and three self-healing nets

There is a web app manifest, a service worker and an offline last-known answer. The service worker caches only 200 responses, so a sticky 5xx cannot poison it, caps its runtime cache at thirty-two entries on a first-in-first-out basis, and falls back to any cached copy of the homepage for navigation. Three layered nets handle the classic PWA failure of a worker stuck on a dead build: a development net that unregisters a leftover production worker serving stale HTML, a production net that reloads the page once when a new build's worker takes control, and a critical-asset net that wipes the worker and all caches if any immutable application asset returns a 404, which is the symptom of a worker pinned to a build whose hashes no longer exist. All three are guarded against reload loops. The install prompt only appears after the second visit; iOS, which has no install event, gets an "add to home screen" hint instead.

### SEO and sharing

There are 44 location landing pages, the fourteen distribution-network regions plus thirty cities, each with a handful of deterministic cross-links to sibling pages and a question-shaped title, "Is electricity cheap in Manchester?", to match how people search. Each page carries its own meta tags and JSON-LD, all serialised through a helper that escapes the angle bracket so a payload cannot break out of the script tag. The sitemap, robots file and humans file are generated, and the API path is disallowed for crawlers. The public JSON endpoint returns the state, the current reading, the forecast and the sources, CORS-enabled with attribution required, and the share image is a server-rendered 1200 by 630 PNG of the live answer.

### Design

The look is deliberate brutalism, modelled on isitchristmas.com: one bold word above the fold, a full-viewport background tinted to the state, the address bar tinted to match. No logo, no navigation, no banner, no newsletter, no popups. Lower-case declarative copy, no exclamation marks, no emoji. The state is carried by colour and shape and word at the same time, so a colour-blind user, a screen reader and a four-year-old all get the answer: an Okabe-Ito-derived palette of green, amber, red and slate, each meeting WCAG AA on its paired text colour and nudged lighter in dark mode, paired with a filled circle, triangle, octagon or square. The only motion is the 200-millisecond cross-fade on a state change, and reduced-motion is respected globally. The brand is positioned as a small public utility, honest, civic and calm: trust through restraint, not a SaaS product.

## Tradeoffs

### Answering carbon, not money

People ask whether electricity is cheap, and for ninety-five per cent of them the honest answer is that their bill does not change. So the site answers in carbon intensity instead, and says so plainly. The assertion that it is "cheap" rests on low carbon intensity tracking low wholesale prices and, over time, downward pressure on fixed rates.

That is the central bet, and the carbon-to-cost link is real but loose. Showing half-hourly retail prices to the people who cannot act on them would be worse, though, because it implies a saving that is not there. For a flat-rate household nothing puts money in their pocket today; the value is in shifting load to when the grid is cleanest and wholesale is cheapest, which is the same advice an honest pricing answer would give if one existed. The about page explains the reframe in full.

### Trusting the upstream's classification

The state comes straight from the Carbon Intensity API's index band, not from a distribution computed on site.

This means the product inherits that methodology, and a change to the banding changes the answers. But the banding is derived from a UK-wide rolling distribution by the people who run the grid data, which is more authoritative than a homegrown version and removes the need to store and process history. Delegating the hard judgement to the authoritative source is the right call.

### Region from IP, roughly

Without a postcode the region comes from the IP header, which is about seventy per cent accurate for UK IPs and never prompts.

A wrong region shows a plausible but not-quite-local answer. The fix is typing an outward code, which the page makes easy. Not asking for location on load is a deliberate trade: an approximate answer with zero friction beats an exact one behind a permission dialog.

### No money in it

There is no login, no email capture, no advertising and no premium tier. The privacy stance is the point.

That is a positioning choice rather than a business model. Run on free tiers with edge-cache-only infrastructure it costs almost nothing, but if it had to sustain itself the answer would need to not compromise the restraint that makes it trustworthy in the first place.

## Outcome

ispowercheap.co.uk is live. It loads, works out roughly where you are without asking, and shows one word, yes, sort of, no or unknown, on a background tinted to match, with a one-line reason and an outlook for when to wait. There are 44 location pages, a public JSON API with attribution required, and a share image rendered from the live answer.

The backend is the edge cache. No database, no key-value store, no cookies, no consent banner: outward postcodes are the only location data the site ever takes, IP-derived answers are kept out of the shared cache, and a failed upstream fetch becomes "unknown" rather than a guess. The performance budget, a perfect Lighthouse score, sub-8 KB HTML and a 1.7 KB headline font, is as much the product as the answer is.

It is built to be a small public utility and to read like one: one honest word, the reason behind it, and nothing else asking for your attention.
