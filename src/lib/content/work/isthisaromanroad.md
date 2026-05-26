---
title: "Telling Roman roads from any other road, from where you stand"
company: "isthisaromanroad.com"
period: "2026"
summary: "A single-page oracle for the question a child asks from the back of the car. Tap once and it checks your phone against the Itiner-e dataset of Roman roads in Britain and returns one of five verdicts, with a paragraph of history for the famous roads. The verdict bands respect the dataset's own admitted uncertainty: a 51 m gap on a road reconstructed from a Roman documentary source is not the same as a 51 m gap on a surveyed line."
order: 8
published: true
url: "https://isthisaromanroad.com"
---

## Context

The question came from the back of the car. My son started asking it on long drives. "Is this a Roman road?" Most of the time I had no idea. The Romans built a network across Britain, but the lines are now mostly under modern A-roads, under fields, or vanished entirely. The honest answer sits in academic data.

There is no consumer-facing way to look up the question. Wikipedia has lists, the Ordnance Survey shows the famous roads on raster historic mapping, the Roman Roads Research Association curates careful archaeology. None of them answer the live version of the question, from where you happen to be standing, in one tap.

isthisaromanroad.com does exactly that. Share your location once and it tells you whether you are on a Roman line, near one, probably not on one, or beyond the empire's reach, then names the road and gives you a paragraph about it if it is one of the famous ones.

## Problem

The data is there. The interface is not.

- **The good data is academic.** Itiner-e, the 2025 dataset that finally puts the Roman road network of the empire into machine-readable line geometry, sits on Zenodo as a 78 MB GeoJSON. It is the right source. It is not the kind of thing you open on a phone.
- **The popular alternatives are not networks.** Ordnance Survey historic mapping is raster only. OpenStreetMap's `historic=roman_road` tag has poor coverage and no certainty information. Historic England's scheduled-monument GIS lists fragments, not a network. None of them lets you ask "is the line I am standing on one of yours?".
- **Distance alone is the wrong question.** A road that was surveyed last week and a road reconstructed from the Antonine Itinerary are both modelled as a line on a map, but the second carries 50 to 200 metres of survey uncertainty. A fixed "within 50 m counts" rule treats them the same and gets one of them wrong.
- **The question is asked in a moment.** It is a back-of-the-car, on-foot, halfway-through-a-walk question. The answer has to arrive in one tap, in plain English, before the moment has passed.

## Approach

### One screen, one question

The product is a single route. A cold load shows a serif wordmark, a thin gold rule and one button: "Ask the road." Tap it and the browser asks for geolocation; the answer renders in a few hundred milliseconds. If you would rather type, a tertiary text link opens a search field that geocodes a UK town or postcode through Nominatim. No accounts, no settings, no map up front.

### Five tiers, not two

The verdict is one of five, each phrased as a complete sentence.

- **Yes. And you're walking the line of Watling Street.** Within 10 metres of any segment, on any road.
- **Yes. You stand on the line of Ermine Street.** Within 80 metres on a Certain segment, within 150 metres on a Conjectured or Hypothetical one.
- **Nearly. Close to Fosse Way, 240 m north-east of here.** Within 500 metres.
- **Probably not. The nearest is Sarn Helen, 32 km west.** Outside the buffer, but still inside Roman Britain.
- **Out of reach. The Romans didn't build this far. The nearest known line is Crawford-Cramond, 75 km west.** Beyond the network's edge.

Two yes tiers do real work. "Walking the line" rewards a precise hit on a well-surveyed road. "On the line" is honest about modelling error elsewhere.

### One dataset, with caveats

The source is Itiner-e, the 2025 publication by de Soto et al. in Scientific Data, released under CC BY 4.0 on Zenodo. It is the only dataset that combines three things: machine-readable line geometry for the whole Roman road network, per-segment certainty tagging (Certain, Conjectured or Hypothetical) and a permissive licence.

Margary's numbering system is the cultural reference for Roman roads in Britain, but it has no public machine-readable form. OS historic mapping is raster only. OSM `historic=roman_road` is patchy. Historic England's monument GIS is fragments rather than a network. Itiner-e wins by being the only honest option.

A build-time script downloads the 78 MB empire-wide GeoJSON, reprojects from EPSG:3395 to WGS84 with proj4, filters to a UK bounding box and slims the per-feature properties that arrived from a shapefile export. The output is `static/roads.geojson`, around 600 KB raw and 150 KB gzipped, holding roughly 1,400 features.

Matching is a two-phase nearest-point-on-line search using an RBush spatial index over each segment's bounding box, built on first lookup. An expanding-radius search finds a tentative nearest, then a safety re-search using the tentative distance plus margin catches the case where a long road's bounding box sits just outside the initial pad and would otherwise be missed.

The site refers to roads by their English names. Itiner-e is silently consulted behind them.

### Certainty-aware distance bands

This is the project's most interesting technical decision and the one it earns its name on.

A fixed buffer ("anything within 50 metres counts as on the road") is wrong for Itiner-e. The dataset's own paper admits that a Conjectured line, reconstructed from a Roman documentary source such as the Itinerarium Antonini, may sit 50 to 200 metres off the ground. Applying the same rule to a Certain segment, surveyed from a physical Roman engineering feature, and a Conjectured one, inferred from a road list, treats two very different claims the same.

The current scheme reads each segment's `certainty` tag and chooses the buffer. The "walking the line" band stays at 10 metres for every road, because that is a claim about your distance from the line as drawn. The "on the line" band is 80 metres for Certain segments and 150 metres for Conjectured or Hypothetical ones. The "nearly" band is a flat 500 metres. Past that the answer drops to "probably not" or "out of reach" depending on whether you are still inside Roman Britain.

The cost is that the rule changes invisibly across the dataset. The benefit is that the answer tells you what the dataset itself is willing to tell you, no more and no less.

### A parchment map, not a basemap

Below the verdict, a map shows the whole road. Watling Street is 56 Itiner-e segments rendered as one line. The basemap is a bespoke MapLibre GL style at `src/lib/map/style-parchment.ts`, around twelve hand-authored layers over OpenFreeMap vector tiles. No API key, no rate limit.

There are two palettes, parchment and walnut, switched by `prefers-color-scheme`. Roughly half a day of MapLibre style spec work goes into making the basemap fit the atmosphere. The win is a map that reads as a chart in a journal rather than a Google Maps embed. The cost is one more thing to maintain when OpenFreeMap or the OpenMapTiles schema changes.

### The famous twenty-two

Twenty-two named roads carry a hand-written paragraph of history, 100 to 150 words each. Watling Street, Ermine Street, Fosse Way, Sarn Helen, Dere Street and so on. The "More about this road" disclosure beneath the verdict carries the academic citation.

For the rest of the network, a fallback narrative is templated from the road's type and certainty. That is roughly 60 per cent of the segments. The fallback is shorter and more honest than padding would be, but the experience is uneven by geography: more in the south-east, where Itiner-e is denser and the named roads are famous, and less in the upland north and west.

### A small share artifact

A second tap turns the answer into a downloadable image. Two formats: 1200 × 630 landscape for social cards, 1080 × 1350 portrait for stories and reels. Both are typeset as small artifacts in their own right, with an italic VIA ROMANA eyebrow, a big serif headline, a gold rule, a sketch of the road and the latitude and longitude in old-style numerals.

The rasterisation is done by html-to-image, dynamic-imported so the library only loads on the first share. Open Graph and icon assets are pre-rendered at build time with @resvg/resvg-js.

### Technical decisions

SvelteKit 2 with Svelte 5 runes, TypeScript in strict mode, pnpm, Biome for lint and format and @sveltejs/adapter-vercel for hosting. MapLibre GL JS over OpenFreeMap vector tiles with a bespoke parchment vector style. Cormorant Garamond and Inter delivered via @fontsource, preloaded via `?url` imports to remove the flash of unstyled text. @vite-pwa/sveltekit with Workbox for offline, with the roads dataset and the map tiles runtime-cached after first use. Turf.js (`@turf/nearest-point-on-line`) and RBush for the geometry work. proj4 for the EPSG:3395 to WGS84 reprojection at build time. html-to-image for the client-side share-card raster. @resvg/resvg-js for icon and Open Graph asset generation at build time. @vercel/analytics/sveltekit dynamic-imported in `+layout.svelte` so its 1.2 KB gzipped chunk never blocks first paint.

Vanilla CSS, design tokens in `src/app.css` as custom properties and mirrored in `src/lib/theme.ts` for the three contexts that cannot read CSS variables: MapLibre paint, html-to-image and Resvg at build time.

There is no database, no API and no backend. The dataset is a static file shipped with the bundle. The stack is consistent with my other side projects, and with nothing to manage it ships from one person's evenings.

## Tradeoffs

### Itiner-e over Margary

Margary's numbering system is the cultural reference for British Roman roads. The product does not use it.

Margary has no public machine-readable form, so an answer keyed off it would be a re-typed gazetteer. Itiner-e has the line geometry, the per-segment certainty and a permissive licence. The cost is that the famous numbers do not appear on screen. The site refers to roads by their English names and Itiner-e is silently consulted behind them.

### Heuristic distance over route-matching

There is no snap-to-road, no road-graph routing and no map-matching. The match is the closest point on the closest line.

The simpler approach is also the more honest one, because the dataset's lines are already an approximation. Snap-to-road would suggest a precision the source data does not have. A user 51 metres off Watling Street is "on it" because the model of Watling Street may itself be 100 metres off the ground.

### Certainty-aware bands over a fixed buffer

The default "anything within 50 metres counts" was wrong. The current scheme widens the buffer for Conjectured and Hypothetical segments and tightens it for Certain ones.

The answers are now correct on the dataset's own terms. The downside is that the rule changes invisibly across the country: 80 metres on one road, 150 metres on the next. A casual user has no way to see why a given answer landed where it did. Defensible, but not transparent.

### Hand-written for the famous, templated for the rest

Twenty-two named roads carry a hand-written paragraph. Roughly 60 per cent of the network falls back to a short templated answer based on the road's type and certainty.

The hand-written copy is what makes the product feel like a museum tile rather than a database query. Writing 1,400 of them is not realistic for an evenings project. The compromise is uneven by geography and the gradient runs roughly south-east to upland north and west. The fallback is shorter and more honest than padding it would be.

### A bespoke basemap

The parchment map is around twelve hand-authored MapLibre style layers over OpenFreeMap tiles, about half a day to write.

The win is a basemap that reads as a chart in a journal rather than a Google Maps embed. The cost is one more thing to maintain when OpenFreeMap or the OpenMapTiles schema changes. For a small site that wants to look like a small museum, the maintenance bill is the right one to take.

## Outcome

isthisaromanroad.com is live. Share your location and get one of five verdicts in a few hundred milliseconds, see the whole road on a parchment map and read a paragraph about it if it is one of the famous twenty-two.

Roughly 1,400 Roman road features cover Britain, sourced from Itiner-e (de Soto et al., 2025, CC BY 4.0). The match is a two-phase nearest-point-on-line search with an RBush index and the verdict bands respect each segment's stated certainty. The whole dataset ships as a static file in the bundle. There is no database, no API, no backend and nothing to keep running. The map style is bespoke, the share cards rasterise client-side and analytics is a 1.2 KB lazy chunk.

The brief was a small museum tile, not a tourism app: parchment ground, Cormorant Garamond, Roman pigments, italic small caps under a hair of gold. The honest answer for most of Britain is that you are not on a Roman road. The site says so, then names the nearest one and tells you how far away it is.
