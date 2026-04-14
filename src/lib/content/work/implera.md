---
title: "Watching the quality of AI-written code"
company: "Implera"
role: "Built independently"
period: "2026"
summary: "A codebase quality intelligence platform that scores repositories across seven domains. Deterministic static analysis runs first, then AI specialist reviewers examine high-signal files. The output is a single explainable score that tracks over time."
order: 2
published: true
url: "https://implera.ai"
---

## Context

AI coding assistants are writing more code than ever. Teams merge dozens of AI-generated pull requests a week, but nobody is watching what that does to the codebase. Test coverage drops, security patterns slip in, architectural boundaries erode.

Existing tools focus on either security scanning or code metrics in isolation. SonarQube gives you code smells. Snyk gives you vulnerabilities. CodeClimate gives you maintainability grades. None give you a single, explainable score across all quality dimensions that tracks over time. And none combine deterministic static analysis with AI-powered contextual review.

Implera started as an AI code generation platform. Ideas went in, pull requests came out via an agent pipeline running on AWS ECS workers. That put it in direct competition with Cursor, Copilot and every other AI coding tool. The pivot was to stop generating code and start watching what those tools produce. Complementary rather than competitive. The technical pivot was equally deliberate: ripping out the entire agent, worker and queue infrastructure and replacing it with a single serverless function running 21 deterministic analysis steps. Simpler, cheaper and faster to ship.

## Problem

The question Implera answers is straightforward: is my codebase getting better or worse?

Teams adopting AI coding tools see velocity increase but have no structured way to track the quality impact. Test ratios decline. Security anti-patterns appear. Dependency hygiene slips. These changes are individually small but compound over time.

Manual code review catches some of this, but reviewers are optimising for correctness and functionality, not for systemic quality trends. By the time someone notices that test coverage has dropped from 80% to 55%, the debt is already significant.

## Approach

### Connecting a repository

A GitHub App handles repository access with read-only permissions. Installation tokens are cached for 55 minutes with in-flight deduplication for concurrent requests. All GitHub API calls go through a rate-limit-aware fetch wrapper with exponential backoff.

Implera never writes to your repository. No pull requests, no commits, no branch creation. This limits what the product can do (no auto-fix, no suggested changes in diffs) but it means the GitHub App needs minimal permissions and users trust it faster.

### Seven quality domains

Each repository is scored out of 100 across seven weighted domains:

- **Security (20%)** — committed secrets, dangerous APIs, dependency vulnerabilities, licence compliance
- **Testing (20%)** — test ratio, real coverage from LCOV and Istanbul reports, CI presence, test quality
- **Architecture (20%)** — circular dependencies, change coupling, complexity hotspots, module boundaries
- **Performance (10%)** — N+1 patterns, heavy imports, sequential awaits, file size
- **Dependencies (10%)** — vulnerability scanning against OSV for npm and PyPI, licence classification via SPDX, lockfile integrity
- **Accessibility (10%)** — 10 WCAG patterns across templates and CSS
- **Documentation (10%)** — README quality, environment variable coverage, documentation sync, key file presence

### Two-layer analysis

Analysis runs in two layers.

The deterministic layer runs first as a single serverless function. Twenty-one sequential steps fetch the repository tree via a single recursive GitHub API call, filter and process up to 500 files and run pattern-based detections: 13 secret patterns, 16 dangerous API patterns, 10 accessibility patterns and 13 heavy import detections. It parses coverage reports, lockfiles and import graphs, detects circular dependencies via depth-first search, analyses 30 commits of git history for change coupling and scans transitive dependencies against OSV. This completes in 20 to 30 seconds for most repositories and produces a baseline score.

The AI layer runs in the background. Seven domain-specific reviewers are queued and processed by a cron worker running every minute. Each reviewer selects 10 to 15 high-signal files for its domain and sends them to Claude Haiku with a structured prompt requesting JSON output: summary, up to 8 findings with severity, confidence, file, line, evidence, explanation and recommendation. Findings are validated against actual file contents to prevent hallucination. If Claude references a file that does not exist, the finding is filtered out.

AI scores replace the deterministic scores when they complete. The bet is that an AI examining actual test quality and real code patterns is more accurate than counting test files. Once all seven reviewers finish, the overall score is recomputed.

### PR quality gates

PR quality gates enforce per-domain thresholds on every pull request via GitHub Check Runs. When a pull request is opened, analysis runs against the branch and results appear as inline annotations on the diff (security and accessibility detections, capped at 50) alongside a PR comment with the full score breakdown. A CI/CD integration via a GitHub Action and public API lets teams run analysis in their own pipelines.

### Webhook-driven analysis

Push events trigger analysis automatically for Pro users. The webhook handler validates the event, triggers the deterministic layer and queues the AI reviews. This means the score stays current without manual intervention.

### Technical decisions

SvelteKit with Svelte 5 runes, TypeScript, Tailwind CSS v4, Supabase for authentication and Postgres with row-level security and Vercel for deployment. The codebase is structured as a pnpm monorepo: a prerendered marketing site, the SSR application and the GitHub Action package.

The frontend polls every 5 seconds while AI reviews are running. Score trend charts use ResizeObserver for responsive SVG rendering. Server-side syntax highlighting uses Shiki with dual-theme support via CSS variables.

The test suite has 373 unit tests across 20 files, running in under a second on Vitest. Tests encode what users expect, not how code works. Mocking happens at boundaries only: Supabase and GitHub API.

### Performance hardening

Demo pages use incremental static regeneration with a 24-hour edge cache and Cache-Control headers. The root layout skips all database queries for demo routes. GitHub installation tokens are cached with in-flight deduplication. The cron worker processes two jobs per invocation to stay within execution limits.

## Tradeoffs

### Deterministic-first, AI-second

Users see a dashboard with no scores while the AI layer runs. The deterministic layer completes in under 30 seconds, but those scores are deliberately hidden. A score of 95 that drops to 20 after AI review would destroy trust. The alternative was showing the deterministic score with a "provisional" label, but that felt worse than showing nothing. Users wait 2 to 5 minutes for the full result.

### 500 file cap

The analysis runs in a single serverless function with a 60-second timeout. Fetching and processing 500 files via the GitHub API is the practical ceiling. Files are risk-prioritised for security scanning: configuration files, authentication paths and API handlers go first. A 10,000-file hard limit prevents the function from even attempting repositories that would time out.

Most repositories under 1,000 files complete in 15 to 25 seconds. Repositories with 2,000 to 5,000 files take 40 to 55 seconds and occasionally time out on the content-fetching step. Root path scoping lets monorepo users target a specific workspace. For very large repositories, the public API and CI integration run analysis in a less time-constrained environment.

The alternative was a queue-based architecture. The previous version of the product ran on AWS ECS with SQS workers. That infrastructure was deliberately removed. The simplicity of one function and one request is worth the constraint.

### AI scores replace deterministic scores

When Claude reviews a domain, its score overwrites the heuristic score entirely. The risk is hallucination. Mitigation is structural: findings are validated against actual file contents, capped at 8 per domain and rejected if they reference files that do not exist. When a user dismisses a finding, the domain score recalculates in real time and the overall score updates.

### Claude Haiku over larger models

Each analysis triggers 8 API calls (7 domain reviewers plus a context review). At Haiku pricing, a full analysis costs roughly $0.08. With Sonnet that would be roughly $0.80. With Opus, roughly $8. At scale, the difference between $0.08 and $8 per analysis is the difference between a viable free tier and unsustainable unit economics.

Haiku's structured output quality is sufficient. The prompts constrain output to JSON with a fixed schema, which smaller models handle reliably. Prompt engineering (structural context, file-level test coverage data, directory tree and API route enumeration) matters more than model size.

### Read-only access

Implera never writes to your repository. This rules out auto-fix suggestions and inline code changes. But it means the GitHub App needs minimal permissions and reduces the trust barrier to connecting a codebase. Every competitor in this space asks for write access.

### Cloud-only

Supabase and Vercel mean no self-hosting option. Enterprise teams with air-gapped environments cannot use it. The tradeoff is velocity: deploying to Vercel with zero infrastructure management lets one person ship weekly.

## Outcome

The platform is live with Stripe billing active. The free tier offers 10 analyses per month across all seven domain reviews. Pro unlocks unlimited analyses, automatic scanning on every push, PR quality gates and organisation sharing.

The analysis engine handles repositories across JavaScript, TypeScript, Python and Go. The features that get the most immediate response are the code quality pattern scanner (surfacing TODO and debug statements people know are there but have never quantified) and the async anti-pattern detector. The score trend over time is the stickiest feature. Once someone sees their score move from 55 to 68 over three weeks, they keep coming back.
