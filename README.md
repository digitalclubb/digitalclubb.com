# digitalclubb.com

Personal site — writing, case studies, and thoughts on building fast, accessible, and maintainable frontend systems.

## Stack

- **Framework:** SvelteKit
- **Language:** TypeScript (strict)
- **Content:** MDsveX (Markdown + Svelte)
- **Styling:** CSS custom properties, no frameworks
- **Deployment:** Vercel
- **Testing:** Vitest
- **Linting:** OXC

## Development

```bash
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:5173`.

## Build

```bash
pnpm build
pnpm preview
```

## Test

```bash
pnpm test
```

## Lint

```bash
pnpm lint
```

## Deploy

Push to `main`. Vercel deploys automatically via the `@sveltejs/adapter-vercel` adapter.

For manual deployment:

```bash
pnpm build
npx vercel --prod
```

## Project structure

```
src/
├── app.html                 # HTML shell
├── app.d.ts                 # Global type declarations
├── lib/
│   ├── components/          # Svelte components
│   ├── config.ts            # Site configuration
│   ├── content/
│   │   ├── work/            # Case study markdown files
│   │   └── writing/         # Blog post markdown files
│   ├── styles/
│   │   ├── tokens.css       # Design tokens (colours, spacing, typography)
│   │   ├── reset.css        # CSS reset and base styles
│   │   └── prose.css        # Markdown content styles
│   └── utils/               # Utility functions
├── routes/
│   ├── +layout.svelte       # Root layout
│   ├── +page.svelte         # Home
│   ├── about/               # About page
│   ├── work/                # Work listing + [slug] detail
│   ├── writing/             # Writing listing + [slug] detail
│   └── api/
│       ├── rss/             # RSS feed
│       └── sitemap/         # XML sitemap
├── static/
│   ├── favicon.svg
│   └── robots.txt
└── tests/
```
